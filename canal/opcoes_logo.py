"""Gera 4 opções de logo (800x800) e uma prancha comparando, com prévia em círculo.

Uso: py -3 opcoes_logo.py
"""
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

from gerar_canal import (AQUI, F_BLACK, F_BOLD, BG, GREEN, YELLOW, WHITE,
                         font, glow, grade)

S = 800
OUT = os.path.join(AQUI, "opcoes-logo")


def centro_texto(d, txt, f, cy, cor, cx=S // 2):
    d.text((cx, cy), txt, font=f, fill=cor, anchor="mm")


def opcao_a():
    """Monograma VE: fundo verde, letras escuras grossas."""
    img = Image.new("RGBA", (S, S), GREEN + (255,))
    d = ImageDraw.Draw(img)
    f = font(F_BLACK, 380)
    centro_texto(d, "VE", f, S // 2 + 10, BG)
    # sublinhado amarelo
    d.rounded_rectangle([230, 585, 570, 625], 20, fill=BG)
    return img


def opcao_b():
    """Lupa com V dentro: 'investigando o YouTube'."""
    img = Image.new("RGBA", (S, S), BG + (255,))
    img.alpha_composite(glow((S, S), (370, 360), 260, GREEN, 60))
    d = ImageDraw.Draw(img)
    cx, cy, r = 360, 350, 210
    # cabo
    d.line([(cx + r * 0.68, cy + r * 0.68), (640, 640)], fill=YELLOW, width=80)
    d.ellipse([640 - 40, 640 - 40, 640 + 40, 640 + 40], fill=YELLOW)
    # aro
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(26, 32, 38), outline=WHITE, width=42)
    f = font(F_BLACK, 270)
    d.text((cx, cy + 12), "V", font=f, fill=GREEN, anchor="mm")
    return img


def opcao_c():
    """Balão de fala (explicar) com V, estilo app."""
    img = Image.new("RGBA", (S, S), (24, 28, 34, 255))
    img = grade(img, 80, (255, 255, 255, 10))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([150, 160, 650, 580], 110, fill=GREEN)
    d.polygon([(260, 560), (230, 690), (380, 570)], fill=GREEN)
    f = font(F_BLACK, 300)
    d.text((400, 375), "V", font=f, fill=BG, anchor="mm")
    # três pontinhos amarelos tipo "explicando..."
    for x in (500, 548, 596):
        d.ellipse([x - 15, 535 - 15, x + 15, 535 + 15], fill=YELLOW)
    return img


def opcao_d():
    """Letra V amarela grande, com contorno, sobre fundo escuro em gradiente."""
    img = Image.new("RGBA", (S, S), BG + (255,))
    img.alpha_composite(glow((S, S), (400, 420), 330, YELLOW, 55))
    d = ImageDraw.Draw(img)
    f = font(F_BLACK, 560)
    # sombra
    sh = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((415, 425), "V", font=f, fill=(0, 0, 0, 200), anchor="mm")
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(10)))
    d.text((400, 410), "V", font=f, fill=YELLOW, anchor="mm", stroke_width=14, stroke_fill=WHITE)
    fe = font(F_BLACK, 70)
    d.text((400, 690), "EXPLICA", font=fe, fill=WHITE, anchor="mm")
    return img


def circulo(img, tam):
    """Prévia como o YouTube mostra (círculo)."""
    im = img.resize((tam, tam), Image.LANCZOS).convert("RGBA")
    m = Image.new("L", (tam, tam), 0)
    ImageDraw.Draw(m).ellipse([0, 0, tam - 1, tam - 1], fill=255)
    out = Image.new("RGBA", (tam, tam), (0, 0, 0, 0))
    out.paste(im, (0, 0), m)
    return out


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    opcoes = {"A": opcao_a(), "B": opcao_b(), "C": opcao_c(), "D": opcao_d()}
    for k, im in opcoes.items():
        im.convert("RGB").save(os.path.join(OUT, f"logo-{k}.png"))

    # prancha: cada opção em círculo grande + pequenininha (como nos comentários)
    W, H = 4 * 420 + 60, 560
    pr = Image.new("RGBA", (W, H), (245, 245, 245, 255))
    d = ImageDraw.Draw(pr)
    fl = font(F_BLACK, 64)
    for i, (k, im) in enumerate(opcoes.items()):
        x = 40 + i * 420
        pr.alpha_composite(circulo(im, 360), (x, 40))
        pr.alpha_composite(circulo(im, 48), (x + 300, 440))
        d.text((x + 180, 470), k, font=fl, fill=(30, 30, 30), anchor="mm")
    pr.convert("RGB").save(os.path.join(OUT, "prancha.jpg"), quality=92)
    print("ok")
