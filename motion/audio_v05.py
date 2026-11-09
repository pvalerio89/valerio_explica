"""Som do vídeo 5 inteiro: batida 120 BPM baixa + efeitos das cenas + voz, mix em -14 LUFS.

Uso: py -3 audio_v05.py
Lê:  v05/eventos.json (exportado por: node render.mjs hf/v05/index.html --eventos v05/eventos.json)
     ../video-05-quanto-o-youtube-paga/voz/narracao.wav
Gera em hf/v05/out/: batida.wav, mix.wav (-14 LUFS)
"""
import json, os, re, subprocess, wave
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "hf", "v05", "out")
VOZ = os.path.join(AQUI, "..", "video-05-quanto-o-youtube-paga", "voz", "narracao.wav")
EVENTOS = json.load(open(os.path.join(AQUI, "v05", "eventos.json")))
TEMPOS = json.load(open(os.path.join(AQUI, "v05", "tempos.json"), encoding="utf-8"))
SR, BPM = 48000, 120
DUR = TEMPOS["total"] + 1.6
B = 60 / BPM
N = int(SR * DUR)
rng = np.random.default_rng(7)


def env(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))


def put(buf, t, sig, g=1.0):
    i = int(t * SR)
    if i >= len(buf) or i < 0:
        return
    s = sig[: len(buf) - i]
    buf[i:i + len(s)] += g * s


def lp(x, fc):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    return np.fft.irfft(X / np.sqrt(1 + (f / fc) ** 2), len(x))


def tom(f, dur, tau, harm=(1, .3, .1)):
    n = int(SR * dur); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * (k + 1) * t) for k, a in enumerate(harm)) * env(n, tau)


def kick():
    n = int(SR * 0.35); t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.12)


def hat():
    n = int(SR * 0.05); x = np.diff(np.concatenate([[0], rng.standard_normal(n)]))
    return x * env(n, 0.012) * 0.5


def pop(f=900):
    n = int(SR * 0.09); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f + 600 * np.exp(-t * 60)) * t) * env(n, 0.03)


def whoosh(dur=0.6):
    n = int(SR * dur); w = np.sin(np.linspace(0, np.pi, n)) ** 2
    return lp(rng.standard_normal(n), 900) * w * 1.6


def impacto():
    n = int(SR * 0.6); t = np.arange(n) / SR
    k = np.sin(2 * np.pi * (40 + 120 * np.exp(-t * 25)) * t) * env(n, 0.18)
    return k * 1.2 + lp(rng.standard_normal(n), 3000) * env(n, 0.07) * 0.8


def risca():
    n = int(SR * 0.25)
    return lp(rng.standard_normal(n), 5000) * np.sin(np.linspace(0, np.pi, n)) * 0.9


def moeda():
    a = tom(2093, 0.25, 0.08, (1, .5)); b = tom(2637, 0.4, 0.12, (1, .5))
    s = np.zeros(int(SR * 0.5)); s[:len(a)] += a; s[int(SR * .07):int(SR * .07) + len(b)] += b
    return s * 0.6


def clique():
    return tom(1800, 0.05, 0.01, (1, .5)) + tom(900, 0.05, 0.015, (1,)) * 0.6


SONS = {"pop": lambda: pop(700 + rng.integers(0, 500)), "up": lambda: whoosh(0.35) * 0.5, "whoosh": whoosh,
        "impacto": impacto, "risca": risca, "moeda": moeda, "clique": clique,
        "tick": lambda: tom(2400, 0.03, 0.006, (1,)), "ding": lambda: tom(1320, 0.8, 0.25, (1, .4, .15)) * 0.7}
GAN = {"pop": 0.6, "up": 0.35, "whoosh": 0.45, "impacto": 0.6, "risca": 0.8, "moeda": 0.8, "clique": 0.9, "tick": 0.45, "ding": 0.7}

# ---------- batida ----------
mus = np.zeros(N)
notas = [55.0, 55.0, 43.65, 49.0]  # A, A, F, G
for i in range(int(DUR / B)):
    t = i * B
    put(mus, t, kick(), 0.9 if i % 2 == 0 else 0.55)
    put(mus, t + B / 2, hat(), 0.35)
    if i % 4 == 2:
        put(mus, t, hat(), 0.5)
    if i % 4 == 0:
        f = notas[(i // 16) % 4]
        put(mus, t, tom(f, B * 4, 1.2, (1, .5, .25)), 0.35)
        for r in (1, 1.26, 1.5):
            put(mus, t, tom(f * 4 * r, B * 4, 2.0, (1,)) * np.sin(np.linspace(0, np.pi, int(SR * B * 4))), 0.06)
fade = np.ones(N); fl = int(SR * 1.5); fade[-fl:] = np.linspace(1, 0, fl); fade[:int(SR * 0.3)] = np.linspace(0, 1, int(SR * 0.3))
mus *= fade

# ---------- efeitos ----------
sfx = np.zeros(N)
ult = {}
for t, k, g in EVENTOS:
    if k not in SONS:
        continue
    if t - ult.get(k, -9) < (0.05 if k == "tick" else 0.12):  # evita empilhar o mesmo som
        continue
    ult[k] = t
    put(sfx, t, SONS[k](), GAN[k] * g)


def ler_voz(f):
    tmp = os.path.join(OUT, "_voz48.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f, "-ac", "1", "-ar", str(SR), tmp], check=True)
    with wave.open(tmp) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    os.remove(tmp)
    return x


def salvar(nome, x):
    x = np.clip(x, -1, 1)
    with wave.open(nome, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def rms(x):
    return np.sqrt(np.mean(x ** 2) + 1e-12)


os.makedirs(OUT, exist_ok=True)
voz = np.zeros(N); v = ler_voz(VOZ)[:N]; voz[:len(v)] = v
mus *= rms(voz) / rms(mus) * 10 ** (-20 / 20)   # batida ~20 dB abaixo da voz
sfx *= rms(voz) / rms(sfx) * 10 ** (-15 / 20)   # efeitos ~15 dB abaixo
salvar(os.path.join(OUT, "batida.wav"), mus * 0.5)
bruto = os.path.join(OUT, "_bruto.wav")
salvar(bruto, (voz + mus + sfx) * 0.5)
saida = os.path.join(OUT, "mix.wav")
e = subprocess.run(["ffmpeg", "-hide_banner", "-i", bruto, "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
j = json.loads(re.findall(r"{[^{}]*}", e)[-1])
filtro = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
          f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", bruto, "-af", filtro, "-ar", str(SR), "-ac", "2", saida], check=True)
os.remove(bruto)
e = subprocess.run(["ffmpeg", "-hide_banner", "-i", saida, "-af", "loudnorm=I=-14:TP=-1:print_format=json", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
m = json.loads(re.findall(r"{[^{}]*}", e)[-1])
print("mix.wav:", m["input_i"], "LUFS, pico", m["input_tp"], "dBTP,", round(DUR, 2), "s,", len(EVENTOS), "eventos")
# ajuste fino: o loudnorm linear às vezes fica alguns décimos abaixo; corrige com ganho simples
if abs(float(m["input_i"]) + 14) > 0.1 and float(m["input_tp"]) - float(m["input_i"]) - 14 < -1:
    tmp = saida + ".tmp.wav"; os.replace(saida, tmp)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-af", f"volume={-14 - float(m['input_i']):.2f}dB", saida], check=True)
    os.remove(tmp)
    e = subprocess.run(["ffmpeg", "-hide_banner", "-i", saida, "-af", "loudnorm=I=-14:TP=-1:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    m = json.loads(re.findall(r"{[^{}]*}", e)[-1])
    print("ajustado:", m["input_i"], "LUFS, pico", m["input_tp"], "dBTP")
