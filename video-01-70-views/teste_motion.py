"""Teste de motion graphics (10 s) do vídeo 1, sincronizado com o começo do bloco 1.

Feito só com Pillow + ffmpeg. Uso: py -3 teste_motion.py
Gera teste-motion.mp4 (1920x1080, 30 fps) e quadros de conferência em quadros/.
"""
import math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

AQUI = os.path.dirname(os.path.abspath(__file__))
W, H, FPS, DUR = 1920, 1080, 30, 10.0
AUDIO = os.path.join(AQUI, "voz", "bloco-1.wav")
SAIDA = os.path.join(AQUI, "teste-motion.mp4")

F_BLACK = r"C:\Windows\Fonts\seguibl.ttf"
F_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
BG = (17, 20, 24)
BG2 = (26, 32, 38)
GREEN = (34, 224, 122)
YELLOW = (255, 200, 61)
WHITE = (245, 247, 250)
GREY = (140, 150, 160)
RED = (255, 72, 72)
NIGHT = (14, 18, 44)

_fontes = {}


def font(path, size):
    k = (path, size)
    if k not in _fontes:
        _fontes[k] = ImageFont.truetype(path, size)
    return _fontes[k]


# ---------- tempo e easing ----------
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def prog(t, t0, t1):
    return clamp((t - t0) / (t1 - t0))


def out_cubic(x):
    return 1 - (1 - x) ** 3


def in_out(x):
    return 3 * x * x - 2 * x * x * x


def out_back(x, s=1.7):
    x -= 1
    return 1 + x * x * ((s + 1) * x + s)


def lerp(a, b, x):
    return a + (b - a) * x


def mix(c1, c2, x):
    return tuple(int(lerp(a, b, x)) for a, b in zip(c1, c2))


# ---------- legenda (tempos tirados das pausas do áudio) ----------
LEGENDAS = [
    (0.00, 1.10, "Você posta um vídeo.", ["vídeo."]),
    (1.15, 2.40, "Passou dias nele.", ["dias"]),
    (2.45, 4.95, "Roteiro, edição, thumbnail...", ["Roteiro,", "edição,", "thumbnail..."]),
    (5.05, 7.35, "Vai dormir ansioso, acorda,", ["ansioso,"]),
    (7.40, 9.10, "abre o YouTube Studio...", ["Studio..."]),
    (9.15, 10.0, "e ele está lá.", ["lá."]),
]


def legenda(img, t):
    for t0, t1, txt, destaque in LEGENDAS:
        if t0 <= t < t1:
            a = prog(t, t0, t0 + 0.15) * (1 - prog(t, t1 - 0.08, t1))
            f = font(F_BLACK, 58)
            d = ImageDraw.Draw(img)
            palavras = txt.split()
            esp = d.textlength(" ", font=f)
            larg = sum(d.textlength(p, font=f) for p in palavras) + esp * (len(palavras) - 1)
            x = W / 2 - larg / 2
            y = 960 + (1 - out_cubic(prog(t, t0, t0 + 0.2))) * 20
            camada = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            dc = ImageDraw.Draw(camada)
            for p in palavras:
                cor = GREEN if p in destaque else WHITE
                dc.text((x, y), p, font=f, fill=cor + (255,), anchor="lm",
                        stroke_width=7, stroke_fill=(0, 0, 0, 255))
                x += dc.textlength(p, font=f) + esp
            camada.putalpha(camada.getchannel("A").point(lambda v: int(v * a)))
            img.alpha_composite(camada)


# ---------- fundo ----------
def _fundo_base():
    img = Image.new("RGBA", (W, H), BG + (255,))
    d = ImageDraw.Draw(img)
    for x in range(0, W, 80):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 10))
    for y in range(0, H, 80):
        d.line([(0, y), (W, y)], fill=(255, 255, 255, 10))
    g = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(g).ellipse([W / 2 - 600, H / 2 - 450, W / 2 + 600, H / 2 + 450], fill=GREEN + (40,))
    img.alpha_composite(g.filter(ImageFilter.GaussianBlur(220)))
    return img


FUNDO = _fundo_base()


def sombra(img, caixa, raio, forca=150, blur=28, off=16):
    x0, y0, x1, y1 = caixa
    if x1 - x0 < 4 or y1 - y0 < 4:
        return
    s = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(s).rounded_rectangle([x0, y0 + off, x1, y1 + off], raio, fill=(0, 0, 0, forca))
    img.alpha_composite(s.filter(ImageFilter.GaussianBlur(blur)))


def colar_escala(img, elem, cx, cy, escala, alpha=1.0, rot=0):
    if escala <= 0.01 or alpha <= 0.01:
        return
    w, h = elem.size
    e = elem.resize((max(1, int(w * escala)), max(1, int(h * escala))), Image.LANCZOS)
    if rot:
        e = e.rotate(rot, resample=Image.BICUBIC, expand=True)
    if alpha < 1:
        e.putalpha(e.getchannel("A").point(lambda v: int(v * alpha)))
    img.alpha_composite(e, (int(cx - e.size[0] / 2), int(cy - e.size[1] / 2)))


# ---------- elementos ----------
def play(d, cx, cy, r, cor):
    d.polygon([(cx - r * 0.45, cy - r * 0.6), (cx - r * 0.45, cy + r * 0.6), (cx + r * 0.65, cy)], fill=cor)


def check(d, x, y, s, cor, larg=10):
    d.line([(x, y + s * 0.5), (x + s * 0.38, y + s * 0.85), (x + s, y + s * 0.1)], fill=cor, width=larg, joint="curve")


def card_video(p_envio):
    """Cartão de vídeo 760x520: miniatura + barra de envio."""
    cw, ch = 760, 540
    c = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, cw, ch], 34, fill=BG2 + (255,), outline=(255, 255, 255, 30), width=2)
    # miniatura
    th = Image.new("RGBA", (cw - 48, 380), (0, 0, 0, 0))
    dt = ImageDraw.Draw(th)
    for i in range(380):
        dt.line([(0, i), (cw, i)], fill=mix((30, 90, 70), (16, 40, 50), i / 380) + (255,))
    for k in range(6):  # barrinhas de "gráfico" na miniatura
        hh = 40 + k * 38
        dt.rounded_rectangle([60 + k * 95, 330 - hh, 120 + k * 95, 330], 8, fill=GREEN + (70,))
    m = Image.new("L", th.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, th.size[0], th.size[1]], 22, fill=255)
    c.paste(th, (24, 24), m)
    d.ellipse([cw / 2 - 58, 214 - 58, cw / 2 + 58, 214 + 58], fill=(0, 0, 0, 150))
    play(d, cw / 2 + 4, 214, 52, WHITE)
    # barra de envio
    y = 450
    d.rounded_rectangle([24, y, cw - 24, y + 22], 11, fill=(255, 255, 255, 25))
    if p_envio > 0:
        d.rounded_rectangle([24, y, 24 + (cw - 48) * p_envio, y + 22], 11, fill=GREEN)
    f = font(F_BOLD, 30)
    if p_envio < 1:
        d.text((24, y + 52), f"Enviando... {int(p_envio * 100)}%", font=f, fill=GREY, anchor="lm")
    else:
        d.text((64, y + 52), "Publicado", font=f, fill=GREEN, anchor="lm")
        check(d, 24, y + 36, 30, GREEN, 6)
    return c


def pilula(texto, cor_txt, cor_fundo, tam=44):
    f = font(F_BLACK, tam)
    tmp = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    w = int(tmp.textlength(texto, font=f)) + 70
    h = tam + 40
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, w - 1, h - 1], h // 2, fill=cor_fundo)
    d.text((w / 2, h / 2), texto, font=f, fill=cor_txt, anchor="mm")
    return c


def linha_check(texto, p):
    """Item de checklist; p = progresso do check (0..1)."""
    w, h = 620, 120
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, w - 1, h - 1], 26, fill=BG2 + (255,), outline=(255, 255, 255, 30), width=2)
    bx = 26
    cor_box = mix((70, 78, 88), GREEN, out_cubic(p))
    d.rounded_rectangle([bx, 24, bx + 72, 96], 18, fill=cor_box)
    if p > 0.15:
        check(d, bx + 14, 38, 44 * min(1, (p - 0.15) / 0.5 + 0.3), BG, 11)
    d.text((bx + 104, h / 2), texto, font=font(F_BLACK, 52), fill=WHITE, anchor="lm")
    return c


def relogio(ang_h, ang_m, r=230, cor=WHITE):
    s = r * 2 + 40
    c = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    cx = cy = s / 2
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(24, 30, 64, 255), outline=cor, width=14)
    for k in range(12):
        a = math.radians(k * 30)
        r0 = r - 34 if k % 3 == 0 else r - 24
        d.line([(cx + math.sin(a) * r0, cy - math.cos(a) * r0),
                (cx + math.sin(a) * (r - 12), cy - math.cos(a) * (r - 12))], fill=cor, width=8)
    for ang, comp, larg, c2 in ((ang_h, r * 0.5, 16, cor), (ang_m, r * 0.78, 10, YELLOW)):
        a = math.radians(ang)
        d.line([(cx, cy), (cx + math.sin(a) * comp, cy - math.cos(a) * comp)], fill=c2, width=larg)
    d.ellipse([cx - 16, cy - 16, cx + 16, cy + 16], fill=YELLOW)
    return c


def lua(r=90):
    s = r * 2 + 20
    c = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.ellipse([10, 10, 10 + 2 * r, 10 + 2 * r], fill=(240, 236, 210, 255))
    d.ellipse([10 + r * 0.55, 10 - r * 0.15, 10 + r * 0.55 + 2 * r, 10 - r * 0.15 + 2 * r], fill=(0, 0, 0, 0))
    return c


def celular(views, p_grafico):
    """Celular 620x1100 com uma tela de painel de estatísticas."""
    w, h = 640, 1120
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([0, 0, w - 1, h - 1], 80, fill=(8, 9, 11, 255), outline=(70, 76, 84, 255), width=6)
    sx0, sy0, sx1, sy1 = 26, 26, w - 26, h - 26
    d.rounded_rectangle([sx0, sy0, sx1, sy1], 58, fill=(24, 26, 30, 255))
    d.rounded_rectangle([w / 2 - 80, 44, w / 2 + 80, 76], 16, fill=(8, 9, 11, 255))
    # cabeçalho
    d.rounded_rectangle([60, 120, 116, 160], 12, fill=RED)
    play(d, 90, 140, 16, WHITE)
    d.text((132, 140), "Studio", font=font(F_BLACK, 44), fill=WHITE, anchor="lm")
    d.text((60, 230), "Seu vídeo mais recente", font=font(F_BOLD, 30), fill=GREY, anchor="lm")
    # miniatura pequena
    d.rounded_rectangle([60, 270, w - 60, 520], 22, fill=(30, 90, 70, 255))
    d.ellipse([w / 2 - 44, 395 - 44, w / 2 + 44, 395 + 44], fill=(0, 0, 0, 140))
    play(d, w / 2 + 4, 395, 40, WHITE)
    # visualizações
    d.text((60, 590), "Visualizações", font=font(F_BOLD, 34), fill=GREY, anchor="lm")
    d.text((60, 700), f"{views}", font=font(F_BLACK, 170), fill=WHITE, anchor="lm")
    # gráfico quase reto
    gx0, gx1, gy = 60, w - 60, 930
    d.line([(gx0, gy + 40), (gx1, gy + 40)], fill=(255, 255, 255, 30), width=3)
    pts = [(0, 0), (0.12, 30), (0.22, 52), (0.3, 60), (0.45, 64), (0.65, 66), (0.85, 67), (1.0, 67)]
    n = max(2, int(len(pts) * p_grafico))
    seg = [(gx0 + (gx1 - gx0) * px, gy + 40 - py * 1.6) for px, py in pts[:n]]
    if len(seg) >= 2:
        d.line(seg, fill=GREEN, width=8, joint="curve")
    return c


def carimbo(texto):
    f = font(F_BLACK, 110)
    tmp = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
    w = int(tmp.textlength(texto, font=f)) + 90
    h = 190
    c = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    d.rounded_rectangle([6, 6, w - 6, h - 6], 26, outline=RED, width=14, fill=(255, 72, 72, 40))
    d.text((w / 2, h / 2 + 4), texto, font=f, fill=RED, anchor="mm")
    return c


# ---------- quadro ----------
def quadro(t):
    img = FUNDO.copy()

    # noite (5.0 -> 6.45), amanhecer no "acorda" (6.45 -> 6.9), volta ao normal no celular
    noite = prog(t, 4.85, 5.25) * (1 - prog(t, 6.45, 6.9))
    if noite > 0:
        ov = Image.new("RGBA", (W, H), NIGHT + (int(235 * noite),))
        img.alpha_composite(ov)
    flash = prog(t, 6.45, 6.55) * (1 - prog(t, 6.55, 7.0))
    if flash > 0:
        img.alpha_composite(Image.new("RGBA", (W, H), YELLOW + (int(90 * flash),)))

    # ----- cena 1 e 2: cartão de vídeo (0 -> 4.95) -----
    if t < 5.1:
        sai = in_out(prog(t, 4.6, 5.0))
        entra = out_back(prog(t, 0.05, 0.55))
        p_envio = out_cubic(prog(t, 0.25, 1.05))
        lado = in_out(prog(t, 2.05, 2.45))  # vai para a esquerda na cena 2
        cx = lerp(W / 2, 560, lado)
        cy = lerp(500, 470, lado) - sai * 60
        esc = entra * lerp(1.0, 0.92, lado)
        cv = card_video(p_envio)
        sombra(img, (cx - 380 * esc, cy - 270 * esc, cx + 380 * esc, cy + 270 * esc), 34)
        colar_escala(img, cv, cx, cy, esc, 1 - sai)

        # "passou dias nele": contador de dias
        if 1.15 <= t < 2.3:
            p = prog(t, 1.15, 1.45)
            dias = 1 + int(6 * out_cubic(prog(t, 1.25, 1.95)))
            some = prog(t, 2.0, 2.25)
            pl = pilula(f"DIA {dias}", BG, YELLOW, 50)
            colar_escala(img, pl, W / 2 + 330, 250, out_back(p), 1 - some, rot=-6)

        # checklist (cena 2)
        itens = [("ROTEIRO", 2.50), ("EDIÇÃO", 3.20), ("THUMBNAIL", 3.95)]
        for k, (txt, tk) in enumerate(itens):
            if t >= tk - 0.25:
                e = out_back(prog(t, tk - 0.25, tk + 0.15))
                pc = prog(t, tk, tk + 0.35)
                lc = linha_check(txt, pc)
                y = 330 + k * 150
                colar_escala(img, lc, 1330 + (1 - e) * 120, y - sai * 60, 1.0, min(1, e) * (1 - sai))

    # ----- cena 3: noite, relógio girando (5.0 -> 7.4) -----
    if 4.95 <= t < 7.5:
        a = prog(t, 4.95, 5.35) * (1 - prog(t, 7.1, 7.45))
        giro = in_out(prog(t, 5.2, 6.45))
        horas = 23 + giro * 8  # 23:00 -> 07:00
        ang_m = (horas % 1) * 360 + giro * 360 * 7
        ang_h = (horas % 12) * 30
        tremor = math.sin(t * 90) * 7 * prog(t, 6.45, 6.55) * (1 - prog(t, 6.9, 7.2))
        rl = relogio(ang_h, ang_m, cor=mix(WHITE, YELLOW, prog(t, 6.45, 6.6)))
        colar_escala(img, rl, W / 2 + tremor, 470, out_back(prog(t, 4.95, 5.4)), a)
        hh = int(horas) % 24
        mm = int((horas % 1) * 60)
        txt = f"{hh:02d}:{mm:02d}"
        d = ImageDraw.Draw(img)
        cor = mix(GREY, YELLOW, prog(t, 6.45, 6.6))
        d.text((W / 2, 790), txt, font=font(F_BLACK, 64), fill=cor + (int(255 * a),), anchor="mm")
        # lua e Zzz só durante a noite
        if noite > 0.05:
            colar_escala(img, lua(), 1500, 200, 1.0, noite)
            for k in range(3):
                fase = (t * 0.9 + k * 0.33) % 1
                dz = ImageDraw.Draw(img)
                dz.text((W / 2 + 270 + fase * 120 + k * 10, 330 - fase * 160 - k * 10), "Z",
                        font=font(F_BLACK, 44 + k * 14),
                        fill=WHITE + (int(200 * noite * (1 - fase)),), anchor="mm")

    # ----- cena 4: celular com 70 views (7.35 -> 10) -----
    if t >= 7.3:
        sob = out_cubic(prog(t, 7.3, 7.85))
        n = int(round(70 * out_cubic(prog(t, 7.75, 8.9))))
        zoom = in_out(prog(t, 9.15, 9.7))
        esc = lerp(0.82, 1.12, zoom)
        cy = lerp(H + 600, 540, sob) - zoom * 230  # sobe para centralizar o número
        tremor = math.sin(t * 70) * 6 * prog(t, 9.7, 9.78) * (1 - prog(t, 9.85, 10.0))
        cel = celular(n, prog(t, 7.8, 8.9))
        sombra(img, (W / 2 - 320 * esc, cy - 560 * esc, W / 2 + 320 * esc, cy + 560 * esc), 80, 180, 40, 24)
        colar_escala(img, cel, W / 2 + tremor, cy, esc)
        if t >= 9.68:
            e = out_back(prog(t, 9.68, 9.88), 2.4)
            colar_escala(img, carimbo("PARADO"), W / 2 + 250, cy + 150 * esc, lerp(1.8, 0.9, e), min(1, e * 1.5), rot=-12)

    legenda(img, t)
    # fade de entrada e saída
    f_in = prog(t, 0, 0.12)
    f_out = 1 - prog(t, DUR - 0.12, DUR)
    if min(f_in, f_out) < 1:
        img.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * (1 - min(f_in, f_out))))))
    return img.convert("RGB")


if __name__ == "__main__":
    pasta_q = os.path.join(AQUI, "quadros")
    os.makedirs(pasta_q, exist_ok=True)
    if len(sys.argv) > 1:  # só quadros de conferência: py -3 teste_motion.py 0.5 3.5 ...
        for s in sys.argv[1:]:
            quadro(float(s)).save(os.path.join(pasta_q, f"q-{s}.jpg"), quality=88)
        sys.exit()
    cmd = ["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-", "-t", str(DUR), "-i", AUDIO,
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-af", f"afade=t=out:st={DUR - 0.3}:d=0.3",
           "-t", str(DUR), "-shortest", SAIDA]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    total = int(DUR * FPS)
    for i in range(total):
        p.stdin.write(quadro(i / FPS).tobytes())
        if i % 60 == 0:
            print(f"{i}/{total}", flush=True)
    p.stdin.close()
    p.wait()
    print("ok", SAIDA)
