"""Shorts verticais (1080x1920) a partir dos vídeos longos do Valerio Explica.

Cada quadro é uma função pura do tempo t: manchete no topo, trecho do vídeo no meio,
legenda grande (palavra falada em verde) e, no fim, a chamada falada
"Se você quer saber mais, me segue!" puxando para o vídeo completo no canal.

Os tempos da legenda são MEDIDOS no áudio final com o faster-whisper (não estimados);
o texto continua sendo o do roteiro, só o tempo vem da medição.

Uso: py -3 shorts.py 1   |   py -3 shorts.py 2
"""
import difflib, json, math, os, re, subprocess, sys, unicodedata
from PIL import Image, ImageDraw, ImageFont

RAIZ = os.path.dirname(os.path.abspath(__file__)) + "/.."
W, H, FPS = 1080, 1920, 30
BG, ACC, TXT, MUT = (14, 17, 20), (34, 224, 122), (242, 244, 246), (138, 147, 158)

CTA_VOZ = "motion/shorts-voz/cta.wav"
CTA_TXT = "Se você quer saber mais, me segue! E toca aqui embaixo pra assistir o vídeo completo no canal."
MUSICA = "motion/v01/musica-full.wav"

SHORTS = {
    "1": dict(video="video-01-70-views/video-01-final.mp4", palavras="motion/v01/palavras.json",
              ini=0.0, corte=28.1, texto_ate=26.6, musica_em=40.0,  # "...que não existe mais." termina em 27,92 s (medido)
              manchete=("SEU VÍDEO TRAVOU", "EM 70 VIEWS?"),
              saida="video-01-70-views/short-01.mp4"),
    "2": dict(video="video-02-titulos-thumbs/video-02-final-v2.mp4", palavras="motion/remotion/src/v02/palavras.json",
              ini=0.0, corte=27.3, musica_em=90.0,
              manchete=("POR QUE NINGUÉM", "CLICA NO SEU VÍDEO?"),
              saida="video-02-titulos-thumbs/short-02.mp4"),
    # vídeo 5: estilo claro; "trechos" emenda pedaços do vídeo longo; "recorte" tira a legenda embutida
    "5a": dict(video="video-05-quanto-o-youtube-paga/video-05-final.mp4", palavras="motion/v05/palavras.json",
               trechos=[(10.35, 21.0), (85.75, 107.55)], claro=True, recorte="1180:880:720:30",
               musica="motion/hf/v05/out/batida.wav", musica_em=30.0,
               manchete=("1 MILHÃO DE VIEWS", "= R$ 50 OU R$ 20 MIL?"),
               # gancho falado no começo (abre a pergunta; a sigla fica só no vídeo completo)
               gancho="motion/shorts-voz/gancho-5a-pronto.wav", gancho_completo=7.2,
               gancho_txt=[("MESMO 1 MILHÃO", 0, 0), ("DE VIEWS:", 0, 0), ("R$ 50 × R$ 20 MIL", 1, 2.9), ("A DIFERENÇA", 0, 5.65), ("TEM NOME.", 1, 6.1)],
               saida="video-05-quanto-o-youtube-paga/shorts/short-1.mp4"),
    "5b": dict(video="video-05-quanto-o-youtube-paga/video-05-final.mp4", palavras="motion/v05/palavras.json",
               trechos=[(260.0, 285.38)], claro=True, recorte="1180:880:720:30",  # para em "mais um detalhe:"
               musica="motion/hf/v05/out/batida.wav", musica_em=120.0,
               manchete=("O YOUTUBE VAI DOBRAR", "A REGRA EM FEVEREIRO"),
               gancho="motion/shorts-voz/gancho-5b-pronto.wav", gancho_completo=5.5,
               gancho_txt=[("FEVEREIRO:", 0, 0), ("O YOUTUBE", 0, 0), ("DOBRA A REGRA", 1, 0), ("E TEM UM DETALHE", 0, 2.4), ("QUE NINGUÉM VIU", 1, 3.6)],
               saida="video-05-quanto-o-youtube-paga/shorts/short-2.mp4"),
}
DOT, STROKE, CAIXA, BOTAO_TXT = (35, 42, 50), (0, 0, 0), (10, 12, 15, 255), None


def estilo(cfg):
    """Troca as cores para o estilo claro do canal (vídeo 4 em diante)."""
    global BG, ACC, TXT, MUT, DOT, STROKE, CAIXA, BOTAO_TXT, VY, VH, LY
    if cfg.get("recorte"):  # janela com a mesma proporção do recorte (sem distorcer)
        cw, ch = map(int, cfg["recorte"].split(":")[:2])
        VH = int(round(VW * ch / cw / 2) * 2); VY = 470; LY = VY + VH + 70
    if cfg.get("claro"):
        BG, ACC, TXT, MUT = (243, 238, 228), (20, 154, 85), (22, 25, 28), (92, 87, 78)
        DOT, STROKE, CAIXA, BOTAO_TXT = (207, 197, 178), (255, 253, 248), (255, 253, 248, 255), (255, 255, 255)


def preparar(n, cfg):
    """Emenda os trechos num clipe temporário e remapeia os tempos das palavras para ele."""
    if "trechos" not in cfg:
        return cfg
    clip = f"{RAIZ}/motion/quadros/short-{n}-clip.mp4"
    partes = "".join(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,"
                     f"afade=t=in:d=0.03,afade=t=out:st={b - a - 0.05}:d=0.05[a{i}];" for i, (a, b) in enumerate(cfg["trechos"]))
    ent = "".join(f"[v{i}][a{i}]" for i in range(len(cfg["trechos"])))
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f"{RAIZ}/{cfg['video']}", "-filter_complex",
                    partes + f"{ent}concat=n={len(cfg['trechos'])}:v=1:a=1[v][a]", "-map", "[v]", "-map", "[a]",
                    "-c:v", "libx264", "-crf", "12", "-preset", "fast", "-c:a", "pcm_s16le", clip.replace(".mp4", ".mov")], check=True)
    pal = json.load(open(f"{RAIZ}/{cfg['palavras']}", encoding="utf-8"))["palavras"]
    novo, off = [], 0.0
    for a, b in cfg["trechos"]:
        novo += [dict(w, ini=round(w["ini"] - a + off, 3), fim=round(w["fim"] - a + off, 3)) for w in pal if a <= w["ini"] < b]
        off += b - a
    pj = f"{RAIZ}/motion/quadros/short-{n}-pal.json"
    json.dump({"palavras": novo}, open(pj, "w", encoding="utf-8"), ensure_ascii=False)
    return dict(cfg, video=os.path.relpath(clip.replace(".mp4", ".mov"), RAIZ), palavras=os.path.relpath(pj, RAIZ), ini=0.0, corte=off)
PAUSA = 0.3   # silêncio entre o trecho e a chamada
CAUDA = 0.8   # depois da chamada


def fonte(tam, peso="Bold"):
    f = ImageFont.truetype("C:/Windows/Fonts/bahnschrift.ttf", tam)
    try:
        f.set_variation_by_name(peso)
    except Exception:
        pass
    return f


def fonte_ui(tam):
    return ImageFont.truetype("C:/Windows/Fonts/seguibl.ttf", tam)


def ease_back(x):
    x = max(0.0, min(1.0, x)); c = 1.70158
    return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2


def ease_out(x):
    x = max(0.0, min(1.0, x)); return 1 - (1 - x) ** 3


def dur_wav(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                capture_output=True, text=True).stdout)


# ---------- áudio ----------
def montar_audio(n, cfg):
    """Trecho falado do vídeo + pausa + chamada falada com a trilha baixinha por baixo. Volume final -14 LUFS."""
    dcta = dur_wav(f"{RAIZ}/{CTA_VOZ}")
    tc = cfg["corte"] + PAUSA
    dur = tc + dcta + CAUDA
    wav = f"{RAIZ}/motion/quadros/short-{n}.wav"
    ms = int(tc * 1000); ms_m = int(cfg["corte"] * 1000)
    filtro = (f"[0:a]atrim=0:{cfg['corte']},afade=t=out:st={cfg['corte'] - 0.12}:d=0.12,asetpts=PTS-STARTPTS[a];"
              f"[1:a]adelay={ms}|{ms}[c];"
              f"[2:a]atrim=0:{dur - cfg['corte']},asetpts=PTS-STARTPTS,volume=0.28,afade=t=in:d=0.4,"
              f"afade=t=out:st={dur - cfg['corte'] - 0.6}:d=0.6,adelay={ms_m}|{ms_m}[m];"
              f"[a][c][m]amix=inputs=3:normalize=0:duration=longest,apad=whole_dur={dur},"
              f"loudnorm=I=-14:TP=-1.5:LRA=11[o]")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", str(cfg["ini"]), "-i", f"{RAIZ}/{cfg['video']}",
                    "-i", f"{RAIZ}/{CTA_VOZ}", "-ss", str(cfg["musica_em"]), "-i", f"{RAIZ}/{cfg.get('musica', MUSICA)}",
                    "-filter_complex", filtro, "-map", "[o]", "-ar", "48000", "-ac", "2", wav], check=True)
    return wav, dur, tc


# ---------- tempos medidos ----------
def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in w if unicodedata.category(c) != "Mn"))


def medir(n, cfg, wav, tc):
    """Texto do roteiro + tempo de cada palavra medido pelo Whisper (casando palavra a palavra)."""
    cache = f"{RAIZ}/motion/quadros/short-{n}-palavras.json"
    pal = json.load(open(f"{RAIZ}/{cfg['palavras']}", encoding="utf-8"))["palavras"]
    # palavras do roteiro dentro do trecho (texto_ate: limite pelos tempos ESTIMADOS, que no vídeo 1 vêm adiantados)
    ref = [w["w"] for w in pal if cfg["ini"] <= w["ini"] < cfg.get("texto_ate", cfg["corte"])] + CTA_TXT.split()
    from faster_whisper import WhisperModel
    modelo = WhisperModel("small", device="cpu", compute_type="int8")
    import numpy as np  # o leitor de áudio do faster-whisper (av) falha nesta versão: decodifica com ffmpeg
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", wav, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                         capture_output=True).stdout
    audio = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768.0
    segs, _ = modelo.transcribe(audio, language="pt", word_timestamps=True, vad_filter=False,
                                initial_prompt=" ".join(ref))
    med = [(w.word.strip(), w.start, w.end) for s in segs for w in s.words]
    a = [norm(x) for x in ref]; b = [norm(x[0]) for x in med]
    tempos = [None] * len(ref)
    for bl in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(bl.size):
            tempos[bl.a + k] = (med[bl.b + k][1], med[bl.b + k][2])
    # palavras sem par: espalha entre os vizinhos medidos
    i = 0
    while i < len(ref):
        if tempos[i] is None:
            j = i
            while j < len(ref) and tempos[j] is None:
                j += 1
            t0 = tempos[i - 1][1] if i > 0 else 0.0
            t1 = tempos[j][0] if j < len(ref) else t0 + 0.4 * (j - i)
            passo = (t1 - t0) / (j - i)
            for k in range(i, j):
                tempos[k] = (t0 + passo * (k - i), t0 + passo * (k - i + 1))
            i = j
        i += 1
    # nenhuma palavra da chamada aparece antes da fala da chamada começar
    for k in range(len(ref) - len(CTA_TXT.split()), len(ref)):
        a0, a1 = tempos[k]
        if a0 < tc:
            tempos[k] = (tc, max(a1, tc + 0.2))
    out = [{"w": w, "ini": round(t[0], 3), "fim": round(t[1], 3)} for w, t in zip(ref, tempos)]
    casadas = sum(1 for x in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks() for _ in range(x.size))
    json.dump(out, open(cache, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"short {n}: {casadas}/{len(ref)} palavras casadas com a medição")
    return out


# ---------- camadas fixas ----------
def fundo():
    im = Image.new("RGB", (W, H), BG); d = ImageDraw.Draw(im)
    for y in range(20, H, 64):
        for x in range(20, W, 64):
            d.ellipse((x - 3, y - 3, x + 3, y + 3), fill=DOT)
    return im


def manchete(linhas):
    im = Image.new("RGBA", (W, 400), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for k, (txt, cor) in enumerate(zip(linhas, (TXT, ACC))):
        tam = 132
        while fonte(tam).getlength(txt) > W - 90:
            tam -= 4
        d.text((W / 2, 110 + k * 150), txt, font=fonte(tam), fill=cor, anchor="mm")
    return im


VX, VY, VW, VH = 30, 520, 1020, 574  # janela do vídeo (quadro 16:9 inteiro)
LY, LH = 1200, 190                    # faixa da legenda


def mascara_arredondada():
    m = Image.new("L", (VW, VH), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, VW - 1, VH - 1), 34, fill=255)
    return m


# ---------- legenda ----------
def blocos(ws):
    """Blocos curtos: até 3 palavras / ~16 letras, quebrando na pontuação."""
    out, cur = [], []
    for w in ws:
        cur.append(w)
        if len(cur) >= 3 or len(" ".join(x["w"] for x in cur)) >= 16 or w["w"][-1] in ".,:?!…":
            out.append(cur); cur = []
    if cur:
        out.append(cur)
    return out


FL = fonte(112)


def legenda_img(bloco, ativo):
    palavras = [w["w"] for w in bloco]
    FL_ = FL
    while True:  # encolhe a fonte até a frase caber na largura
        esp = FL_.getlength(" ")
        larg = sum(FL_.getlength(p) for p in palavras) + esp * (len(palavras) - 1)
        if larg <= W - 70 or FL_.size <= 60:
            break
        FL_ = fonte(FL_.size - 6)
    im = Image.new("RGBA", (W, LH), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    x = (W - larg) / 2
    for i, p in enumerate(palavras):
        d.text((x, LH / 2), p, font=FL_, fill=ACC if i == ativo else TXT, anchor="lm", stroke_width=8, stroke_fill=STROKE)
        x += FL_.getlength(p) + esp
    return im


# ---------- chamada final ----------
def cta_img(capuz):
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = VX, VY - 30, VX + VW, VY + VH + 30
    d.rounded_rectangle((x0, y0, x1, y1), 34, fill=CAIXA, outline=ACC, width=6)
    # personagem do canal à esquerda, dentro da caixa, com a borda direita sumindo no fundo
    alt = y1 - y0 - 24
    c = capuz.resize((alt, alt)).crop((int(alt * 0.12), 0, int(alt * 0.12) + 450, alt))
    m = Image.new("L", c.size, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, c.width - 1, c.height - 1), 26, fill=255)
    gr = Image.linear_gradient("L").rotate(-90).resize((120, alt))  # 255 à esquerda → 0 à direita
    m.paste(Image.composite(gr, Image.new("L", gr.size, 0), m.crop((c.width - 120, 0, c.width, alt))), (c.width - 120, 0))
    im.paste(c, (x0 + 12, y0 + 12), m)
    cx = 770
    y0 = y0 + ((y1 - y0) - 634) // 2  # centra os textos quando a caixa é mais alta
    d.text((cx, y0 + 150), "QUER SABER", font=fonte(84), fill=TXT, anchor="mm")
    d.text((cx, y0 + 240), "MAIS?", font=fonte(84), fill=TXT, anchor="mm")
    d.rounded_rectangle((cx - 235, y0 + 300, cx + 235, y0 + 415), 26, fill=ACC)
    d.text((cx, y0 + 356), "ME SEGUE!", font=fonte(86), fill=BOTAO_TXT or BG, anchor="mm")
    d.text((cx, y0 + 485), "vídeo completo", font=fonte_ui(44), fill=TXT, anchor="mm")
    d.text((cx, y0 + 540), "aqui no canal ↓", font=fonte_ui(44), fill=ACC, anchor="mm")
    return im


def seta(d, cx, cy):
    d.polygon([(cx - 70, cy - 40), (cx + 70, cy - 40), (cx, cy + 50)], fill=ACC)
    d.rectangle((cx - 24, cy - 120, cx + 24, cy - 38), fill=ACC)


def selo(d, alfa):
    c = tuple(int(BG[i] + (ACC[i] - BG[i]) * alfa) for i in range(3))
    d.text((W / 2, 1840), "@ValerioExplica", font=fonte(48), fill=c, anchor="mm")


# ---------- gancho do começo (vídeo 5 em diante) ----------
GPAUSA = 0.2  # entre o gancho e o trecho


def juntar_gancho(n, cfg, wav_main):
    """Gancho falado + pausa + áudio do Short. Volume final -14 LUFS."""
    g = f"{RAIZ}/{cfg['gancho']}"
    G = dur_wav(g) + GPAUSA
    out = f"{RAIZ}/motion/quadros/short-{n}-final.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", g, "-i", wav_main, "-filter_complex",
                    f"[0:a]aresample=48000,apad=pad_dur={GPAUSA}[g];[1:a]aresample=48000[m];[g][m]concat=n=2:v=0:a=1,"
                    "loudnorm=I=-14:TP=-1.5:LRA=11[o]", "-map", "[o]", "-ar", "48000", "-ac", "2", out], check=True)
    import numpy as np  # volume do gancho por quadro (boca do mascote)
    pcm = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", g, "-ac", "1", "-ar", "48000", "-f", "s16le", "-"],
                         capture_output=True).stdout
    a = np.abs(np.frombuffer(pcm, np.int16).astype(np.float32) / 32768.0)
    passo = 48000 // FPS
    vol = [float(a[i:i + passo].mean()) for i in range(0, len(a), passo)]
    top = max(vol) or 1
    return out, G, [v / top for v in vol]


def mascote(video):
    """Recorta o mascote desenhado do vídeo longo (boca fechada e aberta) e tira o fundo creme."""
    from PIL import ImageFilter
    out = []
    for t in (11.2, 11.3):
        raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", str(t), "-i", f"{RAIZ}/{video}", "-frames:v", "1",
                              "-vf", "crop=560:820:100:130", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                             capture_output=True).stdout
        im = Image.frombytes("RGB", (560, 820), raw)
        marca = im.copy()
        for xy in ((0, 0), (559, 0), (0, 819), (559, 819), (280, 0), (0, 400), (559, 400)):
            ImageDraw.floodfill(marca, xy, (255, 0, 255), thresh=60)
        px = marca.load(); m = Image.new("L", im.size, 255); pm = m.load()
        for y in range(820):
            for x in range(560):
                if px[x, y] == (255, 0, 255):
                    pm[x, y] = 0
        m = m.filter(ImageFilter.GaussianBlur(1.2))
        rgba = im.convert("RGBA"); rgba.putalpha(m)
        out.append(rgba.resize((int(560 * 0.78), int(820 * 0.78)), Image.LANCZOS))
    return out


def fonte_cabe(txt, tam, larg):
    while fonte(tam).getlength(txt) > larg:
        tam -= 4
    return fonte(tam)


def selo_completo(escala=1.0):
    """Selo grande 'VÍDEO COMPLETO NO CANAL'."""
    w0, h0 = 960, 150
    im = Image.new("RGBA", (w0, h0), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, w0 - 1, h0 - 1), 40, fill=ACC)
    d.text((w0 / 2, h0 / 2 + 2), "VÍDEO COMPLETO NO CANAL", font=fonte_cabe("VÍDEO COMPLETO NO CANAL", 92, w0 - 70),
           fill=(255, 255, 255), anchor="mm")
    return im if abs(escala - 1) < 0.002 else im.resize((int(w0 * escala), int(h0 * escala)))


def gancho_camadas(cfg):
    linhas = []
    for txt, cor, t0 in cfg["gancho_txt"]:
        f = fonte_cabe(txt, 150, W - 80)
        im = Image.new("RGBA", (W, 170), (0, 0, 0, 0))
        ImageDraw.Draw(im).text((W / 2, 85), txt, font=f, fill=ACC if cor else TXT, anchor="mm")
        linhas.append((im, t0))
    card = Image.new("RGBA", (500, 440), (0, 0, 0, 0)); d = ImageDraw.Draw(card)
    d.rounded_rectangle((8, 8, 492, 432), 34, fill=(255, 253, 248), outline=(216, 207, 190), width=4)
    d.text((250, 190), "?", font=fonte(260), fill=ACC, anchor="mm")
    d.text((250, 345), "a resposta tá", font=fonte_ui(40), fill=TXT, anchor="mm")
    d.text((250, 395), "no vídeo completo", font=fonte_ui(40), fill=TXT, anchor="mm")
    return linhas, card


def quadro_gancho(t, base, linhas, card, masc, vol, cfg):
    im = base.copy(); d = ImageDraw.Draw(im)
    y = 70
    for k, (li, t0) in enumerate(linhas):
        if k == 3:
            y += 40  # respiro entre as duas frases
        if t >= t0:
            p = 1.0 if t0 == 0 else ease_back((t - t0) / 0.22)
            l2 = li if p >= 0.999 else li.resize((max(1, int(W * p)), max(1, int(170 * p))))
            im.paste(l2, ((W - l2.width) // 2, y + (170 - l2.height) // 2), l2)
        y += 150
    # mascote à esquerda, apontando para o cartão da pergunta; boca no volume da fala
    q = int(t * FPS)
    aberta = q < len(vol) and vol[q] > 0.28
    mm = masc[1 if aberta else 0]
    by = int(8 * math.sin(t * 3.2))
    im.paste(mm, (20, 905 + by), mm)
    cp = 1.0 + 0.02 * math.sin(t * 4)
    c2 = card.resize((int(500 * cp), int(440 * cp)))
    im.paste(c2, (540 + (500 - c2.width) // 2, 960 + (440 - c2.height) // 2), c2)
    # selo grande + seta para o link do "Vídeo relacionado"
    tc = t - cfg.get("gancho_completo", 99)
    pulso = 1 + (0.08 * math.sin(min(1, max(0, tc / 0.45)) * math.pi) if tc > 0 else 0)
    sl = selo_completo(pulso)
    im.paste(sl, ((W - sl.width) // 2, 1530 + (150 - sl.height) // 2), sl)
    seta(d, W // 2, int(1790 + 16 * math.sin(t * 7)))
    return im


def selo_canto():
    """Selo pequeno fixo durante o Short."""
    txt = "vídeo completo no canal"
    f = ImageFont.truetype("C:/Windows/Fonts/seguisb.ttf", 34)
    w0 = int(f.getlength(txt)) + 80
    im = Image.new("RGBA", (w0, 58), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, w0 - 1, 57), 29, fill=(255, 253, 248), outline=ACC, width=3)
    d.polygon([(24, 17), (24, 41), (45, 29)], fill=ACC)  # ícone de play
    d.text((58, 29), txt, font=f, fill=ACC, anchor="lm")
    return im


def cta_novo(capuz):
    """Chamada final do vídeo 5: 'Assiste o vídeo completo: link aqui embaixo'."""
    im = cta_img(capuz)
    d = ImageDraw.Draw(im)
    x0, y0, x1, y1 = VX, VY - 30, VX + VW, VY + VH + 30
    d.rectangle((470, y0 + 20, x1 - 14, y1 - 20), fill=CAIXA)  # limpa o texto antigo (fica só o personagem)
    cx = 770; yc = (y0 + y1) // 2
    d.text((cx, yc - 220), "ASSISTE O", font=fonte(80), fill=TXT, anchor="mm")
    d.text((cx, yc - 130), "VÍDEO COMPLETO", font=fonte_cabe("VÍDEO COMPLETO", 80, 540), fill=TXT, anchor="mm")
    d.rounded_rectangle((cx - 270, yc - 60, cx + 270, yc + 60), 28, fill=ACC)
    d.text((cx, yc + 2), "LINK AQUI EMBAIXO", font=fonte_cabe("LINK AQUI EMBAIXO", 70, 500), fill=(255, 255, 255), anchor="mm")
    d.text((cx, yc + 130), "e me segue pra mais", font=fonte_ui(44), fill=TXT, anchor="mm")
    d.text((cx, yc + 190), "↓", font=fonte_ui(60), fill=ACC, anchor="mm")
    return im


# ---------- render ----------
def main(n):
    cfg = SHORTS[n]
    estilo(cfg)
    cfg = preparar(n, cfg)
    os.makedirs(os.path.dirname(f"{RAIZ}/{cfg['saida']}"), exist_ok=True)
    wav, dur, tc = montar_audio(n, cfg)
    bls = blocos(medir(n, cfg, wav, tc))
    capuz = Image.open(f"{RAIZ}/canal/rosto-real/capuz-patrick.jpg").convert("RGB")
    G = 0.0
    if cfg.get("gancho"):
        wav, G, vol = juntar_gancho(n, cfg, wav)
        g_linhas, g_card = gancho_camadas(cfg)
        masc, CANTO = mascote(SHORTS[n]["video"]), selo_canto()
    BASE, MAN, MASK = fundo(), manchete(cfg["manchete"]), mascara_arredondada()
    CTA = cta_novo(capuz) if G else cta_img(capuz)
    cache = {}

    leitor = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-ss", str(cfg["ini"]), "-t", str(dur), "-i", f"{RAIZ}/{cfg['video']}",
                               "-vf", (f"crop={cfg['recorte']}," if cfg.get("recorte") else "") + f"scale={VW}:{VH}:flags=lanczos,fps={FPS}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                              stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    saida = f"{RAIZ}/{cfg['saida']}"
    escritor = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                                 "-r", str(FPS), "-i", "-", "-i", wav, "-c:v", "libx264", "-crf", "16", "-preset", "medium",
                                 "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", saida],
                                stdin=subprocess.PIPE)
    nq = int(round((dur + G) * FPS)); tam = VW * VH * 3; ultimo = None
    marcas = {0, int(G * FPS * 0.5), int((G + 1) * FPS), int(nq * 0.4), int(nq * 0.7), int((G + tc + 1.5) * FPS), nq - 15}
    for q in range(nq):
        t = q / FPS - G
        if t < 0:  # gancho
            im = quadro_gancho(t + G, BASE, g_linhas, g_card, masc, vol, cfg)
            escritor.stdin.write(im.tobytes())
            if q in marcas:
                im.save(f"{RAIZ}/motion/quadros/short-{n}-q{q}.png")
            continue
        bruto = leitor.stdout.read(tam)
        if len(bruto) == tam:
            ultimo = Image.frombytes("RGB", (VW, VH), bruto)
        im = BASE.copy()
        s = 0.92 + 0.08 * ease_out(t / 0.6)
        v = ultimo if s >= 0.999 else ultimo.resize((int(VW * s), int(VH * s)))
        m = MASK if s >= 0.999 else MASK.resize(v.size)
        im.paste(v, (VX + (VW - v.width) // 2, VY + (VH - v.height) // 2), m)
        k = max(0.05, ease_back(t / 0.5) * (1 + 0.012 * math.sin(t * 2.2)))
        mh = MAN.resize((int(W * k), int(400 * k))) if abs(k - 1) > 0.002 else MAN
        im.paste(mh, ((W - mh.width) // 2, 40 + (400 - mh.height) // 2), mh)
        # chamada final (entra quando a fala da chamada começa)
        d = ImageDraw.Draw(im)
        tcta = t - tc
        if tcta >= -0.1:
            a = ease_out((tcta + 0.1) / 0.35)
            c = CTA.copy(); c.putalpha(c.getchannel("A").point(lambda p: int(p * a)))
            im.paste(c, (0, 0), c)
            seta(d, W // 2, int(1640 + 18 * math.sin(tcta * 7)))
        # legenda medida
        for bi, bl in enumerate(bls):
            fim_bl = min(bls[bi + 1][0]["ini"], bl[-1]["fim"] + 0.6) if bi + 1 < len(bls) else bl[-1]["fim"] + 0.4
            if bl[0]["ini"] - 0.04 <= t < fim_bl:
                at = max([i for i, w in enumerate(bl) if w["ini"] - 0.04 <= t] or [0])
                if (bi, at) not in cache:
                    cache[(bi, at)] = legenda_img(bl, at)
                li = cache[(bi, at)]
                pop = max(0.3, ease_back((t - bl[0]["ini"] + 0.04) / 0.16))
                if pop < 0.999:
                    li = li.resize((int(W * pop), int(LH * pop)))
                im.paste(li, ((W - li.width) // 2, LY + (LH - li.height) // 2), li)
                break
        if G:
            im.paste(CANTO, (36, 396), CANTO)
        if t < 2.5 and not G:
            selo(d, 1 - ease_out((t - 1.8) / 0.7))
        elif tcta >= 0:
            selo(d, ease_out(tcta / 0.5))
        escritor.stdin.write(im.tobytes())
        if q in marcas:
            im.save(f"{RAIZ}/motion/quadros/short-{n}-q{q}.png")
    escritor.stdin.close(); escritor.wait(); leitor.kill()
    print("ok", saida, nq, "quadros", round(dur + G, 2), "s")


if __name__ == "__main__":
    main(sys.argv[1])
