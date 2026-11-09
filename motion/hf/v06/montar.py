"""Monta hf/v06/index.html: estrutura do vídeo 5 (estilo, mascote, câmera, legenda) + cenas.js do vídeo 6.

Uso: py -3 montar.py
"""
import os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "..", "v05", "index.html"), encoding="utf-8").read()
cenas = open(os.path.join(AQUI, "cenas.js"), encoding="utf-8").read()

ini = src.index("/* =================== CENAS")
fim = src.index("/* ---------- legenda")
cab, cauda = src[:ini], src[fim:]

cab = cab.replace("Video 5 - Quanto o YouTube paga", "Video 6 - 4.000 horas antes de fevereiro")
cab = cab.replace("../../v05/", "../../v06/")
cab = cab.replace('data-duration="384"', 'data-duration="514"')
# poses novas do mascote: ampulheta e câmera (gravando)
novas = '''<g id="pAmp" opacity="0">
            <rect x="972" y="296" width="116" height="18" rx="7" fill="#a87545" class="ln" style="stroke-width:5"/>
            <rect x="972" y="436" width="116" height="18" rx="7" fill="#a87545" class="ln" style="stroke-width:5"/>
            <path d="M990 314 Q990 356 1030 375 Q1070 356 1070 314 Z M990 436 Q990 394 1030 375 Q1070 394 1070 436 Z" fill="#e6f5ec" class="ln" style="stroke-width:5"/>
            <path d="M1004 328 Q1030 346 1056 328 Q1048 350 1030 364 Q1012 350 1004 328Z" fill="#e9b949"/>
            <path d="M1002 432 Q1030 400 1058 432 Z" fill="#e9b949"/>
            <path d="M1030 366 V428" stroke="#e9b949" stroke-width="4"/>
          </g>
          <g id="pCam" opacity="0">
            <rect x="972" y="372" width="128" height="80" rx="14" fill="#2c3238" class="ln" style="stroke-width:6"/>
            <path d="M1100 392 L1150 368 L1150 456 L1100 432 Z" fill="#5d6670" class="ln" style="stroke-width:6"/>
            <circle cx="1022" cy="412" r="22" fill="#5d6670" class="ln" style="stroke-width:5"/>
            <circle cx="1022" cy="412" r="9" fill="#9fd6b5"/>
            <circle id="rec" cx="1078" cy="390" r="8" fill="#d14343"/>
          </g>
          <g id="pLupa" opacity="0">'''
cab = cab.replace('<g id="pLupa" opacity="0">', novas, 1)

cauda = re.sub(r"const VERDE=new Set\(\[.*?\]\);",
               "const VERDE=new Set(['conta','tempo','metade','buscado','encadear','minutos','prender','portas','trailer','salva','salvas','ganhar','verdade','barata','sequencia','ponte','retencao','qualidade','fraca','medio']);", cauda)
cauda = re.sub(r"const VERM=new Set\(\[.*?\]\);",
               "const VERM=new Set(['dobro','prazo','apagar','embora','enrolacao','despenca','comprar','loop','risco','pressa','perde','punir']);", cauda)
# contadores: o mesmo id pode ter várias contagens em sequência; vale a última que já começou
velho = "for(const n of NUME){const p=Math.min(1,Math.max(0,(t-n.t0)/(n.t1-n.t0)));const v=n.a+(n.b-n.a)*p*p;n.el.textContent=fmt(v)+n.suf;}"
assert velho in cauda
cauda = cauda.replace(velho, "for(const id in NBY){const L=NBY[id];let n=L[0];for(const x of L)if(t>=x.t0)n=x;const p=Math.min(1,Math.max(0,(t-n.t0)/Math.max(0.01,n.t1-n.t0)));const v=n.a+(n.b-n.a)*p*p;n.el.textContent=fmt(v)+n.suf;}")
cauda = cauda.replace("function vivo(t){", "const NBY={};for(const n of NUME)(NBY[n.id]=NBY[n.id]||[]).push(n);\nfunction vivo(t){", 1)

open(os.path.join(AQUI, "index.html"), "w", encoding="utf-8").write(cab + cenas + "\n" + cauda)
print("ok index.html")
