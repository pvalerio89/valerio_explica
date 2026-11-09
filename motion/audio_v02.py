"""Som do vídeo 2: junta a narração dos blocos prontos, trilha por bloco, SFX das cenas, mix -14 LUFS.

Uso: py -3 audio_v02.py
Lê v02/tempos.json e v02/eventos.json; gera v02/narracao.wav, v02/beats.json e v02/mix.wav.
Funciona com só parte dos blocos gerados (usa os que existem no tempos.json).
"""
import json, os, sys, wave
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "lib"))
from som import Som, SR, BPM  # noqa: E402

V = os.path.join(AQUI, "v02")
VOZ = os.path.join(AQUI, "..", "video-02-titulos-thumbs", "voz")
tempos = json.load(open(os.path.join(V, "tempos.json"), encoding="utf-8"))
dur = tempos["total"] + 0.6

# narração: blocos nas posições do tempos.json (0,45 s de pausa entre eles)
narr = np.zeros(int(SR * dur))
for b in tempos["blocos"]:
    with wave.open(os.path.join(VOZ, f"bloco-{b['n']}.wav")) as w:
        vsr = w.getframerate()
        v = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(float) / 32768
    v = np.interp(np.arange(int(len(v) * SR / vsr)) * vsr / SR, np.arange(len(v)), v)
    i = int(b["inicio_global"] * SR)
    narr[i:i + len(v)] += v[: len(narr) - i]
with wave.open(os.path.join(V, "narracao.wav"), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(narr, -1, 1) * 32767).astype("<i2").tobytes())

# trilha: um clima por bloco
CLIMA = {1: ([57, 53, 60, 55], "cheia"), 2: ([57, 55, 53, 52], "media"), 3: ([50, 53, 57, 55], "cheia"),
         4: ([52, 55, 57, 53], "media"), 5: ([57, 53, 55, 52], "cheia"), 6: ([53, 55, 57, 60], "cheia"),
         7: ([60, 55, 57, 53], "cheia"), 8: ([57, 53, 60, 55], "leve")}
bl = tempos["blocos"]
secoes = []
for k, b in enumerate(bl):
    t1 = bl[k + 1]["inicio_global"] if k + 1 < len(bl) else dur
    secoes.append((b["inicio_global"], t1, *CLIMA[b["n"]]))
s = Som(dur)
s.trilha(secoes)
batidas = s.medir_batidas()
json.dump({"bpm": BPM, "beats": batidas}, open(os.path.join(V, "beats.json"), "w"))
n = s.efeitos(json.load(open(os.path.join(V, "eventos.json"))))
lufs, tp = s.mixar(os.path.join(V, "mix.wav"), voz_wav=os.path.join(V, "narracao.wav"))
print(f"{len(batidas)} batidas, {n} efeitos, mix {lufs} LUFS, pico {tp} dBTP, {dur:.1f} s")
