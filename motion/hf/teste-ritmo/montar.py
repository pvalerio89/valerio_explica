"""Monta index.html do teste de ritmo: estrutura do vídeo 7 (_base.html: estilo, mascote, legenda) + cenas.js.

Uso: python montar.py
"""
import os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "_base.html"), encoding="utf-8").read()
cenas = open(os.path.join(AQUI, "cenas.js"), encoding="utf-8").read()

ini = src.index("let P,t;\n/* ---- BLOCO 1")
fim = src.index("/* ---------- legenda")
cab, cauda = src[:ini], src[fim:]
cab = cab.replace("Video 7 - Shorts sem aparecer", "Teste de ritmo")
cab = cab.replace("../../v07/", "../../vteste/")
cab = re.sub(r'data-duration="\d+"', 'data-duration="32"', cab)
cauda = re.sub(r"const VERDE=new Set\(\[.*?\]\);", "const VERDE=new Set(['trinta','segundos','retencao','clique','grafico']);", cauda)
cauda = re.sub(r"const VERM=new Set\(\[.*?\]\);", "const VERM=new Set(['trava','duzentas','titulo','ninguem']);", cauda)
cauda = cauda.replace("tl.to('#root',{opacity:1,duration:0.01},DUR-0.01);", "fechaPalco(DUR);\ntl.to('#root',{opacity:1,duration:0.01},DUR-0.01);")
open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(cab + cenas + "\n" + cauda)
print("ok index.html")
