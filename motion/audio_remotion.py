"""Som do teste Remotion: efeitos a partir de remotion/src/cortes.json, trilha 96 BPM, narração, mix -14 LUFS.
Uso: py -3 audio_remotion.py   (gera remotion/out/mix.wav)
"""
import json, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "lib"))
from som import Som  # noqa: E402
R = os.path.join(AQUI, "remotion")
pal = json.load(open(os.path.join(R, "src", "palavras.json"), encoding="utf-8"))
cortes = json.load(open(os.path.join(R, "src", "cortes.json"), encoding="utf-8"))["cortes"]
ev = []
for c in cortes:
    for s in c["sfx"]:
        tipo, _, off = s.partition("@")
        t = c["ini"] + float(off or 0)
        if tipo == "contador":
            ev += [{"t": t + k * 0.1, "tipo": "tick"} for k in range(12)]
        elif tipo == "tique":
            ev += [{"t": t + 0.1 + k * 0.12, "tipo": "tick"} for k in range(8)]
        else:
            ev.append({"t": t, "tipo": tipo})
s = Som(pal["duracao"])
s.trilha([(0, pal["duracao"], [57, 53, 60, 55], "cheia")])
s.medir_batidas()
n = s.efeitos(ev)
print(n, "efeitos", s.mixar(os.path.join(R, "out", "mix.wav"), voz_wav=os.path.join(R, "public", "narracao-teste.wav")))
