"""Monta hf/v08/index.html: estrutura do vídeo 6 (estilo, mascote, câmera, legenda) + peças dos vídeos 6, 7 e 8 + cenas.js do vídeo 9.

Uso: py -3 montar.py
"""
import json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "..", "v06", "index.html"), encoding="utf-8").read()
pecas6 = open(os.path.join(AQUI, "..", "v06", "cenas.js"), encoding="utf-8").read()
pecas6 = pecas6[:pecas6.index("let P,t;")]
pecas7 = open(os.path.join(AQUI, "..", "v07", "cenas.js"), encoding="utf-8").read()
pecas7 = pecas7[:pecas7.index("let P,t;")]
pecas8 = open(os.path.join(AQUI, "..", "v08", "cenas.js"), encoding="utf-8").read()
pecas8 = pecas8[:pecas8.index("let P,t;")]
cenas = open(os.path.join(AQUI, "cenas.js"), encoding="utf-8").read()

ini = src.index("/* =================== CENAS")
fim = src.index("/* ---------- legenda")
cab, cauda = src[:ini], src[fim:]

cab = cab.replace("Video 6 - 4.000 horas antes de fevereiro", "Video 9 - Plano de 90 dias")
cab = cab.replace("../../v06/", "../../v09/")
tempos = os.path.join(AQUI, "..", "..", "v09", "tempos.json")
dur = json.load(open(tempos, encoding="utf-8"))["total"] + 1.6 if os.path.exists(tempos) else 540
cab = re.sub(r'data-duration="\d+"', f'data-duration="{int(dur + 0.999)}"', cab)

cauda = re.sub(r"const VERDE=new Set\(\[.*?\]\);",
               "const VERDE=new Set(['base','sprint','caprichado','receita','compromisso','aprender','aprendizado','pratica','dados','informacao','repeticao','publica','qualidade','dobro','folga','ideias']);", cauda)
cauda = re.sub(r"const VERM=new Set\(\[.*?\]\);",
               "const VERM=new Set(['desiste','abandonar','parado','errado','cansado','fracasso','achismo','esgotar','perfeito','perfeicao','chutando']);", cauda)

open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(cab + pecas6 + "\n" + pecas7 + "\n" + pecas8 + "\n" + cenas + "\n" + cauda)
print("ok index.html")
