"""Som da prévia do vídeo 5 (bloco 1): batida 120 BPM baixa + efeitos + voz, mix em -14 LUFS.

Uso: py -3 audio_v05_previa.py
Lê ../video-05-quanto-o-youtube-paga/voz/bloco-1.wav; gera hf/v05-previa/assets/{batida,mix}.wav
"""
import json, os, re, subprocess, wave
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "hf", "v05-previa", "assets")
VOZ = os.path.join(AQUI, "..", "video-05-quanto-o-youtube-paga", "voz", "bloco-1.wav")
SR, BPM, DUR = 48000, 120, 32.8
B = 60 / BPM
N = int(SR * DUR)
rng = np.random.default_rng(7)


def env(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))


def put(buf, t, sig, g=1.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    s = sig[: len(buf) - i]
    buf[i:i + len(s)] += g * s


def lp(x, a=0.2):  # passa-baixa simples
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += a * (v - acc); y[i] = acc
    return y


def kick():
    n = int(SR * 0.35); t = np.arange(n) / SR
    f = 50 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.12)


def hat():
    n = int(SR * 0.05); x = rng.standard_normal(n)
    x = np.diff(np.concatenate([[0], x]))  # agudo
    return x * env(n, 0.012) * 0.5


def tom(f, dur, tau, harm=(1, .3, .1)):
    n = int(SR * dur); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * (k + 1) * t) for k, a in enumerate(harm)) * env(n, tau)


def pop(f=900):
    n = int(SR * 0.09); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (f + 600 * np.exp(-t * 60)) * t) * env(n, 0.03)


def tick():
    return tom(2400, 0.03, 0.006, (1,))


def whoosh(dur=0.6):
    n = int(SR * dur); x = rng.standard_normal(n)
    w = np.sin(np.linspace(0, np.pi, n)) ** 2
    return lp(x, 0.08) * w * 1.6


def impacto():
    n = int(SR * 0.6); t = np.arange(n) / SR
    k = np.sin(2 * np.pi * (40 + 120 * np.exp(-t * 25)) * t) * env(n, 0.18)
    r = lp(rng.standard_normal(n), 0.3) * env(n, 0.07)
    return k * 1.2 + r * 0.8


def risca():
    n = int(SR * 0.25); x = lp(rng.standard_normal(n), 0.5)
    return x * np.sin(np.linspace(0, np.pi, n)) * 0.9


def ding():
    return tom(1320, 0.8, 0.25, (1, .4, .15)) * 0.7


def moeda():
    a = tom(2093, 0.25, 0.08, (1, .5)); b = tom(2637, 0.4, 0.12, (1, .5))
    s = np.zeros(int(SR * 0.5)); s[:len(a)] += a; s[int(SR * .07):int(SR * .07) + len(b)] += b
    return s * 0.6


def clique():
    return tom(1800, 0.05, 0.01, (1, .5)) + tom(900, 0.05, 0.015, (1,)) * 0.6


# ---------- batida ----------
mus = np.zeros(N)
notas = [55.0, 55.0, 43.65, 49.0]  # A, A, F, G (baixo, um acorde a cada 2 compassos)
nb = int(DUR / B)
for i in range(nb):
    t = i * B
    put(mus, t, kick(), 0.9 if i % 2 == 0 else 0.55)
    put(mus, t + B / 2, hat(), 0.35)
    if i % 4 == 2:
        put(mus, t, hat(), 0.5)
    if i % 4 == 0:
        f = notas[(i // 16) % 4]
        put(mus, t, tom(f, B * 4, 1.2, (1, .5, .25)), 0.35)
        for k, m in enumerate([4, 5, 6]):  # pad suave (tríade)
            fr = f * 4 * [1, 1.26, 1.5][k] if f == 55.0 or f == 49.0 else f * 4 * [1, 1.26, 1.5][k]
            put(mus, t, tom(fr, B * 4, 2.0, (1,)) * np.sin(np.linspace(0, np.pi, int(SR * B * 4))), 0.06)
fade = np.ones(N); fl = int(SR * 0.8); fade[-fl:] = np.linspace(1, 0, fl)
mus *= fade

# ---------- efeitos (tempos da página) ----------
sfx = np.zeros(N)
for k in range(14):  # contador girando
    put(sfx, 0.3 + k * 0.15, tick(), 0.5)
put(sfx, 2.41, ding(), 0.8)
put(sfx, 2.86, pop(700), 0.8)
for t in (3.75, 15.25, 20.2, 25.0):
    put(sfx, t, whoosh(), 0.5)
put(sfx, 7.55, moeda(), 0.9)
put(sfx, 9.92, moeda(), 0.9)
put(sfx, 10.15, impacto(), 0.5)
put(sfx, 11.2, pop(1000), 0.5); put(sfx, 11.45, pop(1000), 0.5)
put(sfx, 13.82, impacto(), 1.1)
put(sfx, 16.05, pop(800), 0.6); put(sfx, 16.75, pop(900), 0.6)
put(sfx, 18.6, risca(), 0.8); put(sfx, 18.72, risca(), 0.8)
put(sfx, 19.05, ding(), 0.9)
for t in (20.75, 20.87, 20.99, 21.11):
    put(sfx, t, pop(1100), 0.4)
for t in (23.48, 23.95, 24.3, 24.65):
    put(sfx, t, clique(), 0.8)
put(sfx, 25.85, pop(600), 0.6)
put(sfx, 28.95, impacto(), 0.5)
put(sfx, 29.2, clique(), 1.2)
put(sfx, 29.95, pop(900), 0.5)


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
# batida ~20 dB abaixo da voz, efeitos ~12 dB abaixo
mus *= rms(voz) / rms(mus) * 10 ** (-20 / 20)
sfx *= rms(voz) / rms(sfx) * 10 ** (-13 / 20)
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
print("mix.wav:", m["input_i"], "LUFS, pico", m["input_tp"], "dBTP")
