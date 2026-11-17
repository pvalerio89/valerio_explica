"""YouTube do Valerio Explica pela API oficial (usado pelos workflows do GitHub).

Uso:
  python automacao/youtube.py link                 -> link para autorizar o canal (1ª vez)
  python automacao/youtube.py trocar <endereço>    -> troca o código e grava o token cifrado (automacao/yt-token.enc)
  python automacao/youtube.py enviar <pasta do vídeo> <arquivo.mp4> [--publico | --agendar AAAA-MM-DDTHH:MM] [--short N]
      Título, descrição e thumbnail vêm de <pasta>/publicar/ (titulo-descricao.txt e thumbnail*.jpg).
      --short N: envia o Short N do vídeo. Título e descrição vêm do bloco "SHORT N" de <pasta>/shorts/titulos.txt;
      LINK_DO_VIDEO_LONGO na descrição vira o link do vídeo longo (do publicados.json). Short não leva thumbnail.
      Sem --publico/--agendar o vídeo sobe PRIVADO (só você vê). --agendar usa horário de Brasília.
      Anota tudo em publicados.json e não envia de novo o que já está lá.
Variáveis (no GitHub vêm dos Secrets e nunca são impressas): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
"""
import base64, datetime, glob, hashlib, hmac, json, os, re, sys, urllib.error, urllib.parse, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRO = os.path.join(RAIZ, "publicados.json")
API_UP = "https://www.googleapis.com/upload/youtube/v3"
ESCOPOS = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl"
REDIRECT = "http://127.0.0.1:8765"
TAGS_FIXAS = ["youtube", "como crescer no youtube", "monetização", "dicas para youtubers", "valerio explica"]


def env(*nomes):
    falta = [n for n in nomes if not os.environ.get(n)]
    if falta:
        sys.exit(f"ERRO: faltam os Secrets {', '.join(falta)} (Settings > Secrets and variables > Actions).")
    return [os.environ[n] for n in nomes]


TOKEN_ARQ = os.path.join(RAIZ, "automacao", "yt-token.enc")


def _chaves(segredo):
    return hashlib.sha256(b"cifra" + segredo.encode()).digest(), hashlib.sha256(b"mac" + segredo.encode()).digest()


def _fluxo(chave, nonce, n):
    out, i = b"", 0
    while len(out) < n:
        out += hmac.new(chave, nonce + i.to_bytes(4, "big"), hashlib.sha256).digest(); i += 1
    return out[:n]


def cifrar(txt, segredo):
    """Cifra o token com uma chave tirada do YT_CLIENT_SECRET (o repositório é público: nunca o token em texto)."""
    ck, mk = _chaves(segredo)
    nonce, dado = os.urandom(16), txt.encode()
    ct = bytes(a ^ b for a, b in zip(dado, _fluxo(ck, nonce, len(dado))))
    return base64.b64encode(nonce + ct + hmac.new(mk, nonce + ct, hashlib.sha256).digest()).decode()


def decifrar(b64, segredo):
    ck, mk = _chaves(segredo)
    raw = base64.b64decode(b64)
    nonce, ct, tag = raw[:16], raw[16:-32], raw[-32:]
    if not hmac.compare_digest(tag, hmac.new(mk, nonce + ct, hashlib.sha256).digest()):
        raise ValueError("token cifrado não confere com o YT_CLIENT_SECRET")
    return bytes(a ^ b for a, b in zip(ct, _fluxo(ck, nonce, len(ct)))).decode()


def token():
    cid, cs = env("YT_CLIENT_ID", "YT_CLIENT_SECRET")
    candidatos = []
    if os.path.exists(TOKEN_ARQ):  # gravado pelo "Autorizar YouTube" (o mais novo)
        try:
            candidatos.append(decifrar(open(TOKEN_ARQ).read().strip(), cs))
        except Exception as e:
            print("aviso: não deu para ler automacao/yt-token.enc:", e)
    if os.environ.get("YT_REFRESH_TOKEN"):
        candidatos.append(os.environ["YT_REFRESH_TOKEN"])
    if not candidatos:
        sys.exit("ERRO: sem token do YouTube. Rode o workflow 'Autorizar YouTube'.")
    erro = None
    for rt in candidatos:
        dados = urllib.parse.urlencode({"client_id": cid, "client_secret": cs, "refresh_token": rt,
                                        "grant_type": "refresh_token"}).encode()
        try:
            return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", dados, timeout=30))["access_token"]
        except urllib.error.HTTPError as e:
            erro = f"HTTP {e.code}"
    sys.exit(f"ERRO ao renovar o acesso ao YouTube ({erro}). Rode o workflow 'Autorizar YouTube' de novo.")


def link():
    (cid,) = env("YT_CLIENT_ID")
    print("https://accounts.google.com/o/oauth2/v2/auth?" + urllib.parse.urlencode({
        "client_id": cid, "redirect_uri": REDIRECT, "response_type": "code", "scope": ESCOPOS,
        "access_type": "offline", "prompt": "consent", "state": "valerioexplica"}))


def trocar(endereco):
    cid, cs = env("YT_CLIENT_ID", "YT_CLIENT_SECRET")
    q = urllib.parse.parse_qs(urllib.parse.urlparse(endereco.strip()).query)
    code = (q.get("code") or [endereco.strip()])[0]
    try:
        r = json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", urllib.parse.urlencode({
            "code": code, "client_id": cid, "client_secret": cs, "redirect_uri": REDIRECT,
            "grant_type": "authorization_code"}).encode(), timeout=30))
    except urllib.error.HTTPError as e:
        sys.exit(f"ERRO na troca do código (HTTP {e.code}): {e.read().decode(errors='replace')[:300]}")
    if "refresh_token" not in r:
        sys.exit("O Google não devolveu o token de longa duração. Gere o link de novo e autorize outra vez.")
    # repositório público: o token nunca aparece no log; vai cifrado para automacao/yt-token.enc
    open(TOKEN_ARQ, "w").write(cifrar(r["refresh_token"], cs) + "\n")
    print("OK: token novo guardado (cifrado) em automacao/yt-token.enc. Não precisa mexer nos Secrets.")


def ler_publicar(pasta):
    """Lê publicar/titulo-descricao.txt: linha depois de TÍTULO e tudo depois de DESCRIÇÃO."""
    txt = open(os.path.join(pasta, "publicar", "titulo-descricao.txt"), encoding="utf-8").read()
    m = re.search(r"^T[IÍ]TULO[^\n]*\n+(.+)$", txt, re.M)
    d = re.search(r"^DESCRI[CÇ][AÃ]O[^\n]*\n(.*)\Z", txt, re.M | re.S)
    if not m or not d:
        sys.exit("ERRO: titulo-descricao.txt precisa das seções TÍTULO e DESCRIÇÃO.")
    titulo, descricao = m.group(1).strip()[:100], d.group(1).strip()[:5000]
    tags = TAGS_FIXAS + [h.lower() for h in re.findall(r"#(\w+)", descricao)]
    return titulo, descricao, list(dict.fromkeys(tags))


def ler_short(pasta, n, doc, pasta_nome):
    """Lê o bloco "SHORT n" de shorts/titulos.txt (Título: ... / Descrição: ... até o próximo SHORT)."""
    txt = open(os.path.join(pasta, "shorts", "titulos.txt"), encoding="utf-8").read()
    bloco = re.search(rf"^SHORT {re.escape(str(n))}\b[^\n]*\n(.*?)(?=^SHORT \S|\Z)", txt, re.M | re.S)
    if not bloco:
        sys.exit(f"ERRO: não achei o bloco 'SHORT {n}' em {pasta_nome}/shorts/titulos.txt.")
    b = bloco.group(1)
    m = re.search(r"^T[ií]tulo:\s*(.+)$", b, re.M)
    d = re.search(r"^Descri[cç][aã]o:\s*\n?(.*?)(?=^V[ií]deo relacionado:|\Z)", b, re.M | re.S)
    if not m or not d:
        sys.exit(f"ERRO: o bloco SHORT {n} precisa das linhas 'Título:' e 'Descrição:'.")
    titulo, descricao = m.group(1).strip(), d.group(1).strip()
    if "#shorts" not in titulo.lower() and "#shorts" not in descricao.lower():
        descricao += "\n#shorts"
    if "LINK_DO_VIDEO_LONGO" in descricao:
        url = doc["videos"].get(pasta_nome, {}).get("youtube", {}).get("url")
        if not url:
            sys.exit("PARADO: a descrição tem LINK_DO_VIDEO_LONGO, mas o vídeo longo ainda não tem link no publicados.json.")
        descricao = descricao.replace("LINK_DO_VIDEO_LONGO", url)
    tags = TAGS_FIXAS + ["shorts"] + [h.lower() for h in re.findall(r"#(\w+)", titulo + " " + descricao)]
    return titulo[:100], descricao[:5000], list(dict.fromkeys(tags))


def thumbnail(pasta):
    for nome in ("thumbnail.jpg", "thumbnail-nova-chamativa.jpg"):
        p = os.path.join(pasta, "publicar", nome)
        if os.path.exists(p):
            return p
    achadas = sorted(glob.glob(os.path.join(pasta, "publicar", "thumbnail*.jpg")))
    return achadas[0] if achadas else None


def registro():
    return json.load(open(REGISTRO, encoding="utf-8")) if os.path.exists(REGISTRO) else {"videos": {}}


def enviar(pasta_arg, mp4, publico=False, agendar=None, short=None):
    pasta_nome = os.path.basename(pasta_arg.replace("\\", "/").rstrip("/"))
    pasta = os.path.join(RAIZ, pasta_nome)
    doc = registro()
    chave = f"short-{short}" if short else "youtube"
    if short:  # registro antigo guardava o short-1 do vídeo 5 direto em videos[pasta]["short-1"]
        ja = doc["videos"].get(pasta_nome, {}).get(chave, {})
    else:
        ja = doc["videos"].get(pasta_nome, {}).get("youtube", {})
    if ja.get("status") in ("publicado", "privado", "agendado"):
        sys.exit(f"PARADO: {pasta_nome} {chave} já foi enviado ({ja.get('status')}, {ja.get('url')}). Nada foi enviado.")
    h = hashlib.sha256(open(mp4, "rb").read()).hexdigest()
    titulo, descricao, tags = ler_short(pasta, short, doc, pasta_nome) if short else ler_publicar(pasta)
    status = {"privacyStatus": "public" if publico else "private", "selfDeclaredMadeForKids": False,
              "containsSyntheticMedia": False}
    if agendar:
        quando = datetime.datetime.fromisoformat(agendar).replace(tzinfo=datetime.timezone(datetime.timedelta(hours=-3)))
        status["publishAt"] = quando.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        status["privacyStatus"] = "private"
    meta = {"snippet": {"title": titulo, "description": descricao, "tags": tags, "categoryId": "27",
                        "defaultLanguage": "pt-BR", "defaultAudioLanguage": "pt-BR"}, "status": status}
    tk = token()
    tam = os.path.getsize(mp4)
    req = urllib.request.Request(
        f"{API_UP}/videos?uploadType=resumable&part=snippet,status", data=json.dumps(meta).encode(),
        headers={"Authorization": f"Bearer {tk}", "Content-Type": "application/json; charset=UTF-8",
                 "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": str(tam)})
    try:
        destino = urllib.request.urlopen(req, timeout=60).headers["Location"]
        print(f"Enviando {os.path.basename(mp4)} ({tam / 1e6:.0f} MB): {titulo}", flush=True)
        with open(mp4, "rb") as f:
            up = urllib.request.Request(destino, data=f, method="PUT", headers={
                "Authorization": f"Bearer {tk}", "Content-Type": "video/mp4", "Content-Length": str(tam)})
            resp = json.load(urllib.request.urlopen(up, timeout=3600))
    except urllib.error.HTTPError as e:
        sys.exit(f"ERRO no envio (HTTP {e.code}): {e.read().decode(errors='replace')[:500]}")
    vid = resp["id"]
    thumb = None if short else thumbnail(pasta)
    if thumb:
        try:
            urllib.request.urlopen(urllib.request.Request(
                f"{API_UP}/thumbnails/set?videoId={vid}", data=open(thumb, "rb").read(),
                headers={"Authorization": f"Bearer {tk}", "Content-Type": "image/jpeg"}), timeout=120)
            print("Thumbnail enviada:", os.path.basename(thumb))
        except urllib.error.HTTPError as e:
            print(f"::warning::thumbnail não aceita (HTTP {e.code}); suba pelo Studio.")
    gravado = resp.get("status", {}).get("privacyStatus", "?")
    st = "agendado" if agendar else ("publicado" if gravado == "public" else "privado")
    e = doc["videos"].setdefault(pasta_nome, {})
    if not short:
        e["titulo"] = titulo
    url = f"https://youtube.com/shorts/{vid}" if short else f"https://youtu.be/{vid}"
    e[chave] = {"status": st, "id": vid, "url": url, **({"titulo": titulo} if short else {}),
                    "data": datetime.date.today().isoformat(), "sha256": h,
                    **({"agendado_para": agendar} if agendar else {})}
    with open(REGISTRO, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
        f.write("\n")
    if publico and gravado != "public":
        print(f"::warning::Pedi PÚBLICO mas o YouTube deixou '{gravado}'. Publique pelo Studio.")
    print(f"OK ({st}): {url}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if a[:1] == ["link"]:
        link()
    elif a[:1] == ["trocar"] and len(a) > 1:
        trocar(a[1])
    elif a[:1] == ["enviar"] and len(a) > 2:
        ag = a[a.index("--agendar") + 1] if "--agendar" in a else None
        sh = a[a.index("--short") + 1] if "--short" in a else None
        enviar(a[1], os.path.abspath(a[2]), publico="--publico" in a, agendar=ag, short=sh)
    else:
        sys.exit(__doc__)
