"""Som do vídeo 1 inteiro: trilha + SFX sintetizados, grade medida, mix em -14 LUFS.

Uso: py -3 audio_full.py
Lê:  v01/tempos.json (duração), v01/eventos.json (SFX das cenas, exportado por render.mjs --eventos),
     voz/narracao.wav (narração completa)
Gera em v01/: musica-full.wav, beats.json + beats.js (batidas MEDIDAS + cues da abertura),
     sfx-full.wav, mix-full.wav (-14 LUFS)
"""
import json, os, re, subprocess, wave
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
V = os.path.join(AQUI, "v01")
VOZ = os.path.join(AQUI, "..", "video-01-70-views", "voz", "narracao.wav")
SR, BPM = 48000, 96
BEAT = 60 / BPM
TEMPOS = json.load(open(os.path.join(V, "tempos.json"), encoding="utf-8"))
DUR = TEMPOS["total"] + 1.0
N = int(SR * DUR)
T = np.arange(N) / SR
# cues da abertura (mesmos índices de batida do abertura.html)
CUES = {"abre": 0, "linha2": 1, "dias": 2, "calendario": 3, "check1": 4, "check2": 5, "check3": 6,
        "wipe_noite": 7, "noite": 8, "ansioso": 9, "corre": 10, "acorda": 11, "celular": 12,
        "conta": 13, "pousa": 14, "parado": 15}
rng = np.random.default_rng


# ---------- filtros por FFT (rápidos para sinais longos) ----------
def _resp(n, fc, tipo):
    f = np.fft.rfftfreq(n, 1 / SR)
    h = 1 / np.sqrt(1 + (f / fc) ** 2)  # mesmo módulo de um filtro de 1 polo
    return h if tipo == "lp" else np.sqrt(np.maximum(0, 1 - h ** 2))


def lp(x, fc, ordem=1):
    X = np.fft.rfft(x)
    return np.fft.irfft(X * _resp(len(x), fc, "lp") ** ordem, len(x))


def hp(x, fc, ordem=1):
    X = np.fft.rfft(x)
    return np.fft.irfft(X * _resp(len(x), fc, "hp") ** ordem, len(x))


def env(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))


def put(buf, t0, sig, g=1.0):
    i = int(round(t0 * SR))
    if i < 0:
        sig, i = sig[-i:], 0
    j = min(len(buf), i + len(sig))
    if j > i:
        buf[i:j] += sig[: j - i] * g


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------- instrumentos ----------
def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    f = 45 + 95 * np.exp(-t / 0.04)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.12)


def hat(seed):
    n = int(0.06 * SR)
    return hp(rng(seed).standard_normal(n), 7000, 2) * env(n, 0.015)


def pad(freq, dur, brilho=1400):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(np.sign(np.sin(2 * np.pi * freq * d * t)) for d in (0.997, 1.0, 1.004)) / 3
    s = lp(s, brilho, 2)
    a = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.6)
    return s * a


def baixo(freq, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t) * env(n, 0.25)


def pluck(freq, dur=0.4):
    n = int(dur * SR); t = np.arange(n) / SR
    return lp(np.sign(np.sin(2 * np.pi * freq * t)), 2600) * env(n, 0.12)


# ---------- trilha por seções (uma por bloco) ----------
# cada bloco: progressão (raízes MIDI de acordes menores/maiores), densidade
SECOES = {
    1: ([57, 53, 60, 55], "cheia"),     # Am F C G  (abertura e promessa)
    2: ([57, 55, 53, 52], "media"),     # Am G F E  (passado)
    3: ([50, 53, 57, 55], "cheia"),     # Dm F Am G (missão 1)
    4: ([57, 53, 55, 52], "media"),     # missão 2
    5: ([52, 55, 57, 53], "cheia"),     # missão 3
    6: ([53, 55, 57, 60], "cheia"),     # missão 4 (sobe)
    7: ([60, 55, 57, 53], "cheia"),     # C G Am F (resolução)
    8: ([57, 53, 60, 55], "leve"),      # final
}
MAIOR = {60, 55, 53}  # raízes tocadas como acorde maior
musica = np.zeros(N)
blocos = TEMPOS["blocos"]
for i, b in enumerate(blocos):
    t0 = b["inicio_global"]
    t1 = blocos[i + 1]["inicio_global"] if i + 1 < len(blocos) else DUR
    prog_, dens = SECOES[b["n"]]
    compasso = 4 * BEAT
    b0 = int(np.ceil(t0 / BEAT - 1e-6))
    b1 = int(np.floor(t1 / BEAT))
    for bt in range(b0, b1):
        tb = bt * BEAT
        k = bt - b0
        put(musica, tb, kick(), 0.5 if bt % 4 == 0 else 0.36)
        if dens != "leve":
            put(musica, tb + BEAT / 2, hat(bt), 0.11)
        if dens == "cheia" and bt % 2 == 1:
            put(musica, tb + BEAT * 0.75, hat(bt + 999), 0.06)
        raiz = prog_[(k // 4) % 4]
        if bt % 4 == 0:  # acorde novo a cada compasso
            terca = 4 if raiz in MAIOR else 3
            for m in (raiz, raiz + terca, raiz + 7):
                put(musica, tb, pad(hz(m), min(compasso, t1 - tb) + 0.3), 0.045)
        put(musica, tb, baixo(hz(raiz - 12), BEAT * 0.9), 0.16)
        if dens == "cheia" and bt % 4 in (1, 3):  # arpejo discreto
            put(musica, tb + BEAT / 2, pluck(hz(raiz + 12 + (7 if bt % 4 == 3 else 0))), 0.035)
musica *= np.minimum(1, T / 0.05)


def salvar(nome, x):
    x = np.clip(x, -1, 1)
    with wave.open(os.path.join(V, nome), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


salvar("musica-full.wav", musica)

# ---------- medir as batidas (onsets do grave) ----------
grave = lp(musica, 150, 2)
hop = 256
en = np.add.reduceat(grave[: (N // hop) * hop] ** 2, np.arange(0, (N // hop) * hop, hop))
fl = np.maximum(0, np.diff(en, prepend=0))
lim = np.percentile(fl[fl > 0], 90) * 0.35
picos = []
for i in range(1, len(fl) - 1):
    if fl[i] > lim and fl[i] >= fl[i - 1] and fl[i] >= fl[i + 1]:
        tt = i * hop / SR
        if not picos or tt - picos[-1] > BEAT * 0.5:
            picos.append(round(tt, 4))
desvio = max(abs(p - round(p / BEAT) * BEAT) for p in picos)
dados = {"bpm": BPM, "beats": picos, "cues": CUES, "desvio_max_s": round(desvio, 4)}
json.dump(dados, open(os.path.join(V, "beats.json"), "w"), indent=0)
open(os.path.join(V, "beats.js"), "w").write("window.BEATS = " + json.dumps(dados) + ";\n")
print(f"{len(picos)} batidas medidas (esperado ~{int(TEMPOS['total'] / BEAT)}), desvio máx {desvio * 1000:.1f} ms")
beats = np.array(picos)


def na_grade(t, tol=0.12):
    """Prende o efeito na batida medida mais próxima, se estiver perto."""
    k = np.argmin(np.abs(beats - t))
    return float(beats[k]) if abs(beats[k] - t) <= tol else t


# ---------- SFX ----------
def whoosh(dur=0.45, seed=1):
    n = int(dur * SR); t = np.arange(n) / n
    r = rng(seed).standard_normal(n)
    a, b = lp(r, 600, 2), lp(r, 4500, 2)  # cruzamento grave -> agudo
    return (a * (1 - t) + b * t) * np.sin(np.pi * t) ** 1.5 * 2.5


def pop(freq=880, dur=0.09):
    n = int(dur * SR); t = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-t / 0.01))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.03)


def tick(seed):
    n = int(0.03 * SR)
    return hp(rng(seed).standard_normal(n), 2500, 2) * env(n, 0.004)


def ding(f=1320, dur=0.6):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.76 * t)) * env(n, 0.18)


def impacto(seed=5):
    n = int(0.9 * SR); t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / 0.05)) / SR) * env(n, 0.35)
    return boom + lp(rng(seed).standard_normal(n), 1800) * env(n, 0.06) * 1.5


def moeda():
    return np.concatenate([pop(1568, 0.07), pop(2093, 0.12)])


def risca(seed):
    n = int(0.3 * SR); t = np.arange(n) / n
    return hp(rng(seed).standard_normal(n), 1500) * np.sin(np.pi * t) * 0.8


def subir(f0=440):
    n = int(0.25 * SR); t = np.arange(n) / SR
    f = f0 * (1 + 1.5 * t / 0.25)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.12)


def bolha(seed):
    return pop(500 + (seed % 5) * 90, 0.08)


sfx = np.zeros(N)
# abertura (0 a 11,9 s): mesmos efeitos aprovados no teste
tb = lambda c: picos[CUES[c]]
put(sfx, tb("abre"), whoosh(0.35, 1), 0.35)
put(sfx, tb("linha2"), pop(660), 0.35)
put(sfx, tb("dias") - 0.2, whoosh(0.35, 2), 0.3)
for k in range(7): put(sfx, tb("calendario") + k * 0.07, tick(10 + k), 0.25)
for c, f in (("check1", 880), ("check2", 988), ("check3", 1175)): put(sfx, tb(c), pop(f), 0.45)
put(sfx, tb("wipe_noite") - 0.05, whoosh(0.6, 3), 0.45)
for b in range(CUES["noite"], CUES["acorda"]):
    put(sfx, picos[b], tick(30 + b), 0.35); put(sfx, picos[b] + BEAT / 2, tick(60 + b), 0.2)
put(sfx, tb("acorda"), ding(), 0.4); put(sfx, tb("acorda") + 0.16, ding(1568), 0.3)
put(sfx, tb("celular") - 0.1, whoosh(0.4, 4), 0.35)
for k in range(10): put(sfx, tb("conta") + k * 0.06, tick(80 + k), 0.18)
put(sfx, tb("pousa"), pop(523, 0.14), 0.4)
put(sfx, tb("parado"), impacto(), 0.6)

# resto do vídeo: eventos exportados pelas cenas
eventos = json.load(open(os.path.join(V, "eventos.json")))
GANHO = {"whoosh": 0.28, "pop": 0.32, "tick": 0.16, "check": 0.4, "risca": 0.3, "moeda": 0.3,
         "subir": 0.25, "bolha": 0.3, "impacto": 0.45}
usados = {}
for k, e in enumerate(eventos):
    t = e["t"]
    if t < 11.8:
        continue
    tipo = e["tipo"]
    # whoosh, impacto e check caem na batida medida; ticks rápidos ficam onde estão
    if tipo in ("whoosh", "impacto", "check", "pop"):
        t = na_grade(t)
    chave = (round(t, 2), tipo)
    if chave in usados:  # não empilhar o mesmo efeito no mesmo instante
        continue
    usados[chave] = 1
    sig = {"whoosh": lambda: whoosh(0.4, k), "pop": lambda: pop(700 + (k % 4) * 110),
           "tick": lambda: tick(k), "check": lambda: pop(988), "risca": lambda: risca(k),
           "moeda": moeda, "subir": lambda: subir(330 + (k % 3) * 110), "bolha": lambda: bolha(k),
           "impacto": lambda: impacto(k)}[tipo]()
    put(sfx, t - (0.18 if tipo == "whoosh" else 0), sig, GANHO[tipo])
salvar("sfx-full.wav", sfx)
print(len(usados), "efeitos posicionados depois da abertura")

# ---------- mix ----------
with wave.open(VOZ) as w:
    vsr = w.getframerate()
    v = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(float) / 32768
voz = np.interp(np.arange(N) * vsr / SR, np.arange(len(v)), v, right=0)
envv = lp(np.abs(voz), 6, 2)
duck = 1 - 0.6 * np.clip(envv / (np.percentile(envv, 95) * 0.5), 0, 1)
fade = np.minimum(1, np.maximum(0, (DUR - 0.5 - T) / 1.5))
mix = (voz + musica * duck * 0.5 + sfx * 0.6) * fade
bruto = os.path.join(V, "mix-full-bruto.wav")
salvar("mix-full-bruto.wav", mix / np.abs(mix).max() * 0.9)


def medir(f):
    e = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json",
                        "-f", "null", "-"], capture_output=True, text=True).stderr
    return json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", e, re.S).group(0))


j = medir(bruto)
final = os.path.join(V, "mix-full.wav")
filtro = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
          f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", bruto, "-af", filtro, "-ar", str(SR), final], check=True)
for _ in range(4):
    lufs = float(medir(final)["input_i"])
    if abs(lufs + 14) <= 0.3:
        break
    tmp = os.path.join(V, "mix-tmp.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", final, "-af",
                    f"volume={-14 - lufs:.2f}dB,alimiter=limit=0.891:level=false", "-ar", str(SR), tmp], check=True)
    os.replace(tmp, final)
m = medir(final)
print("mix-full.wav pronto:", m["input_i"], "LUFS, pico", m["input_tp"], "dBTP")
