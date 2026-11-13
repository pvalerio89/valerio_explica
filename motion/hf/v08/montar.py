"""Monta hf/v08/index.html: estrutura do vídeo 6 (estilo, mascote, câmera, legenda) + peças dos vídeos 6 e 7 + cenas.js do vídeo 8.

Uso: py -3 montar.py
"""
import json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "..", "v06", "index.html"), encoding="utf-8").read()
pecas6 = open(os.path.join(AQUI, "..", "v06", "cenas.js"), encoding="utf-8").read()
pecas6 = pecas6[:pecas6.index("let P,t;")]
pecas7 = open(os.path.join(AQUI, "..", "v07", "cenas.js"), encoding="utf-8").read()
pecas7 = pecas7[:pecas7.index("let P,t;")]
cenas = open(os.path.join(AQUI, "cenas.js"), encoding="utf-8").read()

ini = src.index("/* =================== CENAS")
fim = src.index("/* ---------- legenda")
cab, cauda = src[:ini], src[fim:]

cab = cab.replace("Video 6 - 4.000 horas antes de fevereiro", "Video 8 - 5 numeros do Studio")
cab = cab.replace("../../v06/", "../../v08/")
tempos = os.path.join(AQUI, "..", "..", "v08", "tempos.json")
dur = json.load(open(tempos, encoding="utf-8"))["total"] + 1.6 if os.path.exists(tempos) else 540
cab = re.sub(r'data-duration="\d+"', f'data-duration="{int(dur + 0.999)}"', cab)

cauda = re.sub(r"const VERDE=new Set\(\[.*?\]\);",
               "const VERDE=new Set(['cliques','retencao','origens','recorrentes','posicao','comparar','compare','caminho','normal','voltam','abertura','sugeridos','pesquisa','habito','cinco']);", cauda)
cauda = re.sub(r"const VERM=new Set\(\[.*?\]\);",
               "const VERM=new Set(['ignorar','problema','ansiedade','desastre','enganam','cair','fracas','sai','chutar']);", cauda)

open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(cab + pecas6 + "\n" + pecas7 + "\n" + cenas + "\n" + cauda)
print("ok index.html")
