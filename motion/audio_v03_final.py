"""Som final do vídeo 3: narração completa + trilha por bloco + SFX do roteiro, mix -14 LUFS.
Uso: py -3 audio_v03_final.py  -> remotion/out/mix-v03.wav"""
import json, os, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "lib"))
from som import Som  # noqa: E402
R = os.path.join(AQUI, "remotion")
pal = json.load(open(os.path.join(R, "src", "v03", "palavras.json"), encoding="utf-8"))
tempos = json.load(open(os.path.join(R, "src", "v03", "tempos.json"), encoding="utf-8"))
CLIMA = {1: ([57, 53, 60, 55], "media"), 2: ([57, 55, 53, 52], "media"), 3: ([50, 53, 57, 55], "media"), 4: ([52, 55, 57, 53], "media"),
         5: ([57, 53, 55, 52], "leve"), 6: ([53, 55, 57, 60], "media"), 7: ([60, 55, 57, 53], "media"), 8: ([57, 53, 60, 55], "leve")}
bl = tempos["blocos"]; dur = pal["duracao"]
secoes = [(b["inicio_global"], bl[i + 1]["inicio_global"] if i + 1 < len(bl) else dur, *CLIMA[b["n"]]) for i, b in enumerate(bl)]
s = Som(dur)
s.trilha(secoes)
s.medir_batidas()
n = s.efeitos(json.load(open(os.path.join(R, "out", "eventos-v03.json"))))
print(n, "efeitos", s.mixar(os.path.join(R, "out", "mix-v03.wav"), voz_wav=os.path.join(R, "public", "narracao-v03.wav")))
