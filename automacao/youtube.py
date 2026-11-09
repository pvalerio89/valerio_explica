"""YouTube do Valerio Explica pela API oficial (usado pelos workflows do GitHub).

Uso:
  python automacao/youtube.py link                 -> link para autorizar o canal (1ª vez)
  python automacao/youtube.py trocar <endereço>    -> troca o código pelo YT_REFRESH_TOKEN
  python automacao/youtube.py enviar <pasta do vídeo> <arquivo.mp4> [--publico | --agendar AAAA-MM-DDTHH:MM]
      Título, descrição e thumbnail vêm de <pasta>/publicar/ (titulo-descricao.txt e thumbnail*.jpg).
      Sem --publico/--agendar o vídeo sobe PRIVADO (só você vê). --agendar usa horário de Brasília.
      Anota tudo em publicados.json e não envia de novo o que já está lá.
Variáveis (no GitHub vêm dos Secrets e nunca são impressas): YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN.
"""
import datetime, glob, hashlib, json, os, re, sys, urllib.error, urllib.parse, urllib.request

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


def token():
    cid, cs, rt = env("YT_CLIENT_ID", "YT_CLIENT_SECRET", "YT_REFRESH_TOKEN")
    dados = urllib.parse.urlencode({"client_id": cid, "client_secret": cs, "refresh_token": rt,
                                    "grant_type": "refresh_token"}).encode()
    try:
        return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", dados, timeout=30))["access_token"]
    except urllib.error.HTTPError as e:
        sys.exit(f"ERRO ao renovar o acesso ao YouTube (HTTP {e.code}). Rode o workflow 'Autorizar YouTube' de novo.")


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
    print("OK: copie a linha abaixo para o Secret YT_REFRESH_TOKEN e depois apague esta execução.")
    print(r["refresh_token"])


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


def thumbnail(pasta):
    for nome in ("thumbnail.jpg", "thumbnail-nova-chamativa.jpg"):
        p = os.path.join(pasta, "publicar", nome)
        if os.path.exists(p):
            return p
    achadas = sorted(glob.glob(os.path.join(pasta, "publicar", "thumbnail*.jpg")))
    return achadas[0] if achadas else None


def registro():
    return json.load(open(REGISTRO, encoding="utf-8")) if os.path.exists(REGISTRO) else {"videos": {}}


def enviar(pasta_arg, mp4, publico=False, agendar=None):
    pasta_nome = os.path.basename(pasta_arg.replace("\\", "/").rstrip("/"))
    pasta = os.path.join(RAIZ, pasta_nome)
    doc = registro()
    ja = doc["videos"].get(pasta_nome, {}).get("youtube", {})
    if ja.get("status") in ("publicado", "privado", "agendado"):
        sys.exit(f"PARADO: {pasta_nome} já foi enviado ({ja.get('status')}, {ja.get('url')}). Nada foi enviado.")
    h = hashlib.sha256(open(mp4, "rb").read()).hexdigest()
    titulo, descricao, tags = ler_publicar(pasta)
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
    thumb = thumbnail(pasta)
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
    e["titulo"] = titulo
    e["youtube"] = {"status": st, "id": vid, "url": f"https://youtu.be/{vid}",
                    "data": datetime.date.today().isoformat(), "sha256": h,
                    **({"agendado_para": agendar} if agendar else {})}
    with open(REGISTRO, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=2)
        f.write("\n")
    if publico and gravado != "public":
        print(f"::warning::Pedi PÚBLICO mas o YouTube deixou '{gravado}'. Publique pelo Studio.")
    print(f"OK ({st}): https://youtu.be/{vid}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if a[:1] == ["link"]:
        link()
    elif a[:1] == ["trocar"] and len(a) > 1:
        trocar(a[1])
    elif a[:1] == ["enviar"] and len(a) > 2:
        ag = a[a.index("--agendar") + 1] if "--agendar" in a else None
        enviar(a[1], os.path.abspath(a[2]), publico="--publico" in a, agendar=ag)
    else:
        sys.exit(__doc__)
