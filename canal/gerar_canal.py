"""Imagens do canal Valerio Explica: foto de perfil 800x800 e banner 2048x1152.

Uso: py -3 gerar_canal.py
A área segura do banner (aparece em celular e computador) é o centro de 1235x338.
Identidade própria: fundo escuro, verde elétrico e amarelo (nada do Quiz Palito).
"""
import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

AQUI = os.path.dirname(os.path.abspath(__file__))
FONTES = r"C:\Windows\Fonts"
F_BLACK = os.path.join(FONTES, "seguibl.ttf")
F_BOLD = os.path.join(FONTES, "segoeuib.ttf")

BG = (17, 20, 24)
GREEN = (34, 224, 122)
YELLOW = (255, 200, 61)
WHITE = (245, 247, 250)
GREY = (120, 130, 140)

BW, BH = 2048, 1152
SX0, SY0, SX1, SY1 = 406, 407, 1641, 745  # área segura


def font(path, size):
    return ImageFont.truetype(path, size)


def glow(size, center, radius, color, alpha=110):
    """Brilho radial suave."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    d.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color + (alpha,))
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.45))


def grade(img, passo, cor=(255, 255, 255, 14)):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    w, h = img.size
    for x in range(0, w, passo):
        d.line([(x, 0), (x, h)], fill=cor, width=2)
    for y in range(0, h, passo):
        d.line([(0, y), (w, y)], fill=cor, width=2)
    return Image.alpha_composite(img, layer)


def seta(d, p0, p1, cor, largura, ponta):
    """Linha com ponta de seta em p1."""
    ang = math.atan2(p1[1] - p0[1], p1[0] - p0[0])
    ux, uy = math.cos(ang), math.sin(ang)
    px, py = -uy, ux  # perpendicular
    base = (p1[0] - ux * ponta, p1[1] - uy * ponta)
    # a linha termina dentro da ponta, sem sobrar canto
    fim = (base[0] + ux * 4, base[1] + uy * 4)
    d.line([p0, fim], fill=cor, width=largura)
    meia = ponta * 0.78
    d.polygon([p1,
               (base[0] + px * meia, base[1] + py * meia),
               (base[0] - px * meia, base[1] - py * meia)], fill=cor)


def simbolo_v(img, cx, cy, escala, sombra=True):
    """O 'V' do canal: braço esquerdo + braço direito que vira seta de crescimento."""
    s = escala
    esq = (cx - 175 * s, cy - 150 * s)
    fundo = (cx - 20 * s, cy + 190 * s)
    dir_ = (cx + 200 * s, cy - 220 * s)
    larg = int(78 * s)
    if sombra:
        sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ds = ImageDraw.Draw(sh)
        off = 10 * s
        ds.line([(esq[0] + off, esq[1] + off), (fundo[0] + off, fundo[1] + off)], fill=(0, 0, 0, 170), width=larg)
        seta(ds, (fundo[0] + off, fundo[1] + off), (dir_[0] + off, dir_[1] + off), (0, 0, 0, 170), larg, 120 * s)
        img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(8 * s)))
    d = ImageDraw.Draw(img)
    d.line([esq, fundo], fill=WHITE, width=larg)
    r = larg / 2
    d.ellipse([esq[0] - r, esq[1] - r, esq[0] + r, esq[1] + r], fill=WHITE)
    d.ellipse([fundo[0] - r, fundo[1] - r, fundo[0] + r, fundo[1] + r], fill=GREEN)
    seta(d, fundo, dir_, GREEN, larg, 125 * s)


MASCOTE = os.path.join(AQUI, "logos-ia", "mascote-final.png")


def mascote_circulo(tam, borda=0):
    """Mascote (gerado no Gemini) recortado em círculo, sem os cantos brancos."""
    im = Image.open(MASCOTE).convert("RGBA")
    w = im.size[0]
    corte = int(w * 0.012)  # tira a beirada clara do círculo
    im = im.crop((corte, corte, w - corte, w - corte)).resize((tam, tam), Image.LANCZOS)
    m = Image.new("L", (tam * 4, tam * 4), 0)
    ImageDraw.Draw(m).ellipse([0, 0, tam * 4 - 1, tam * 4 - 1], fill=255)
    m = m.resize((tam, tam), Image.LANCZOS)
    im.putalpha(m)
    if not borda:
        return im
    out = Image.new("RGBA", (tam + 2 * borda, tam + 2 * borda), (0, 0, 0, 0))
    ImageDraw.Draw(out).ellipse([0, 0, tam + 2 * borda - 1, tam + 2 * borda - 1], fill=GREEN)
    out.alpha_composite(im, (borda, borda))
    return out


def foto_perfil(saida):
    S = 800
    img = Image.new("RGBA", (S, S), (28, 35, 43, 255))
    img.alpha_composite(mascote_circulo(S))
    img.convert("RGB").save(saida, quality=95)


def banner(saida, guia=False):
    img = Image.new("RGBA", (BW, BH), BG + (255,))
    img = grade(img, 64)
    img.alpha_composite(glow((BW, BH), (BW // 2, BH // 2), 520, GREEN, 45))

    # gráfico de crescimento ao fundo, cruzando o banner
    layer = Image.new("RGBA", (BW, BH), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pts = [(0, 1010), (260, 960), (430, 990), (640, 880), (820, 905), (1010, 790),
           (1220, 820), (1420, 660), (1600, 690), (1800, 470), (2048, 300)]
    d.line(pts, fill=GREEN + (60,), width=10, joint="curve")
    for p in pts[1:-1]:
        d.ellipse([p[0] - 12, p[1] - 12, p[0] + 12, p[1] + 12], fill=GREEN + (80,))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img)
    cx = BW // 2

    # mascote à esquerda, dentro da área segura
    tam = 310
    mc = mascote_circulo(tam, borda=8)
    sh = Image.new("RGBA", (BW, BH), (0, 0, 0, 0))
    my = (SY0 + SY1) // 2 - mc.size[1] // 2
    ImageDraw.Draw(sh).ellipse([SX0 + 14, my + 14, SX0 + 14 + mc.size[0], my + 14 + mc.size[1]], fill=(0, 0, 0, 160))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(14)))
    img.alpha_composite(mc, (SX0 + 4, my))
    d = ImageDraw.Draw(img)

    # nome do canal
    tx = SX0 + 370
    f = font(F_BLACK, 92)
    d.text((tx, 545), "VALERIO", font=f, fill=WHITE, anchor="ls")
    w = d.textlength("VALERIO ", font=f)
    d.text((tx + w, 545), "EXPLICA", font=f, fill=GREEN, anchor="ls")

    # slogan
    fs = font(F_BOLD, 50)
    d.text((tx + 4, 625), "O que o YouTube não te conta.", font=fs, fill=WHITE, anchor="ls")

    # faixa amarela
    fb = font(F_BLACK, 34)
    txt = "VÍDEO NOVO TODA SEMANA"
    tw = d.textlength(txt, font=fb)
    y0 = 662
    d.rounded_rectangle([tx, y0, tx + tw + 56, y0 + 62], 31, fill=YELLOW)
    d.text((tx + 28, y0 + 31), txt, font=fb, fill=BG, anchor="lm")

    # temas (fora da área segura: só em TV/computador grande)
    ft = font(F_BOLD, 40)
    temas = "ALGORITMO  •  RETENÇÃO  •  TÍTULOS  •  THUMBNAILS  •  CANAIS COM IA"
    d.text((cx, 860), temas, font=ft, fill=GREY, anchor="mm")

    if guia:
        d.rectangle([SX0, SY0, SX1, SY1], outline=(255, 0, 0), width=4)
    img.convert("RGB").save(saida, quality=93)


if __name__ == "__main__":
    foto_perfil(os.path.join(AQUI, "foto-perfil.png"))
    banner(os.path.join(AQUI, "banner.jpg"))
    banner(os.path.join(AQUI, "banner-com-guia.jpg"), guia=True)
    print("ok")
