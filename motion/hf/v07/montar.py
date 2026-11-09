"""Monta hf/v07/index.html: estrutura do vídeo 6 (estilo, mascote, câmera, legenda, peças reutilizáveis) + cenas.js do vídeo 7.

Uso: py -3 montar.py
"""
import json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "..", "v06", "index.html"), encoding="utf-8").read()
pecas6 = open(os.path.join(AQUI, "..", "v06", "cenas.js"), encoding="utf-8").read()
pecas6 = pecas6[:pecas6.index("let P,t;")]  # ícones e peças do vídeo 6 (relogio, studio, seta, risco, thumb...)
cenas = open(os.path.join(AQUI, "cenas.js"), encoding="utf-8").read()

ini = src.index("/* =================== CENAS")
fim = src.index("/* ---------- legenda")
cab, cauda = src[:ini], src[fim:]

cab = cab.replace("Video 6 - 4.000 horas antes de fevereiro", "Video 7 - Shorts sem aparecer")
cab = cab.replace("../../v06/", "../../v07/")
tempos = os.path.join(AQUI, "..", "..", "v07", "tempos.json")
dur = json.load(open(tempos, encoding="utf-8"))["total"] + 1.6 if os.path.exists(tempos) else 540
cab = re.sub(r'data-duration="\d+"', f'data-duration="{int(dur + 0.999)}"', cab)

cauda = re.sub(r"const VERDE=new Set\(\[.*?\]\);",
               "const VERDE=new Set(['ranking','prende','voz','original','variedade','porta','licenca','comentario','vista','engajadas','quarenta','pagas','material','ideia','diferente','alcance']);", cauda)
cauda = re.sub(r"const VERM=new Set\(\[.*?\]\);",
               "const VERM=new Set(['quebra','reutilizado','inautentico','zero','desmonetizado','recusado','massa','compilados','reivindicacao','derrubar','iguais','permissao','sumir']);", cauda)

open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(cab + pecas6 + "\n" + cenas + "\n" + cauda)
print("ok index.html")
