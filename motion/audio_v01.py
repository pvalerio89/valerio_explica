"""Som da abertura do vídeo 1: trilha + SFX sintetizados, grade de batidas medida, mix -14 LUFS.

Uso: py -3 audio_v01.py
Gera em v01/:
  musica.wav   trilha 96 BPM (kick, hat, baixo, pad)
  beats.json   batidas MEDIDAS na trilha (onsets do kick) + cues em índice de batida
  beats.js     o mesmo, como window.BEATS, para a página (file:// não deixa usar fetch)
  sfx.wav      efeitos posicionados nas batidas dos cues
  mix.wav      narração + trilha (abaixa sob a voz) + SFX, normalizado em -14 LUFS
"""
import json, os, re, subprocess, wave
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "v01")
VOZ = os.path.join(AQUI, "..", "video-01-70-views", "voz", "bloco-1.wav")
SR, DUR, BPM = 48000, 10.0, 96
BEAT = 60 / BPM  # 0.625 s
N = int(SR * DUR)
T = np.arange(N) / SR

# cues: em qual batida cada evento acontece (a página usa os mesmos índices)
CUES = {
    "abre": 0, "linha2": 1, "dias": 2, "calendario": 3,
    "check1": 4, "check2": 5, "check3": 6, "wipe_noite": 7,
    "noite": 8, "ansioso": 9, "corre": 10, "acorda": 11,
    "celular": 12, "conta": 13, "pousa": 14, "parado": 15,
}


def rng(seed):
    return np.random.default_rng(seed)


def env_exp(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))


def put(buf, start_s, sig, gain=1.0):
    i = int(start_s * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.zeros_like(x)
    acc = 0.0
    for k in range(len(x)):
        acc = (1 - a) * x[k] + a * acc
        y[k] = acc
    return y


def onepole_hp(x, cutoff):
    return x - lowpass(x, cutoff)


# ---------------- trilha ----------------
def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 45 + 95 * np.exp(-t / 0.04)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env_exp(n, 0.12)


def hat(seed):
    n = int(0.06 * SR)
    r = rng(seed).standard_normal(n)
    return onepole_hp(r, 7000) * env_exp(n, 0.015)


def nota(freq, dur, seed=0, brilho=2200):
    n = int(dur * SR)
    t = np.arange(n) / SR
    det = [0.997, 1.0, 1.004]
    s = sum(np.sign(np.sin(2 * np.pi * freq * d * t)) * 0.33 for d in det)  # 3 ondas quadradas desafinadas
    s = lowpass(s, brilho)
    a = np.minimum(1, t / 0.4) * np.minimum(1, (dur - t) / 0.5)
    return s * a


def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)


musica = np.zeros(N)
nb = int(DUR / BEAT) + 1
for b in range(nb):
    put(musica, b * BEAT, kick(), 0.55 if b % 4 == 0 else 0.4)
    put(musica, b * BEAT + BEAT / 2, hat(b), 0.12)
# acordes: Am (0-5 s), F (5-7.5 s), E (7.5-10 s) - tensão crescente
for t0, t1, notas in [(0, 5.0, [57, 60, 64]), (5.0, 7.5, [53, 57, 60]), (7.5, 10.0, [52, 56, 59])]:
    for m in notas:
        put(musica, t0, nota(hz(m), t1 - t0 + 0.2, brilho=1500), 0.05)
    # baixo pulsando nas batidas
    for b in range(int(round(t0 / BEAT)), int(round(t1 / BEAT))):
        n = int(BEAT * 0.9 * SR)
        tt = np.arange(n) / SR
        put(musica, b * BEAT, np.sin(2 * np.pi * hz(notas[0] - 12) * tt) * env_exp(n, 0.25), 0.18)

os.makedirs(OUT, exist_ok=True)


def salvar(nome, x):
    x = np.clip(x, -1, 1)
    with wave.open(os.path.join(OUT, nome), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


salvar("musica.wav", musica)

# ---------------- medir a grade (onsets de grave) ----------------
grave = lowpass(lowpass(musica, 150), 150)
hop = 256
energia = np.array([np.sum(grave[i:i + hop] ** 2) for i in range(0, N - hop, hop)])
fluxo = np.maximum(0, np.diff(energia, prepend=0))
lim = fluxo.max() * 0.25
picos = []
for i in range(1, len(fluxo) - 1):
    if fluxo[i] > lim and fluxo[i] >= fluxo[i - 1] and fluxo[i] >= fluxo[i + 1]:
        tt = i * hop / SR
        if not picos or tt - picos[-1] > BEAT * 0.5:
            picos.append(tt)
batidas = [round(p, 4) for p in picos]
desvio = max(abs(b - round(b / BEAT) * BEAT) for b in batidas)
dados = {"bpm": BPM, "beats": batidas, "cues": CUES, "desvio_max_s": round(desvio, 4)}
json.dump(dados, open(os.path.join(OUT, "beats.json"), "w"), indent=1)
open(os.path.join(OUT, "beats.js"), "w").write("window.BEATS = " + json.dumps(dados) + ";\n")
print(f"{len(batidas)} batidas medidas, desvio máx {desvio * 1000:.1f} ms")


def tb(cue):
    return batidas[CUES[cue]]


# ---------------- SFX ----------------
def whoosh(dur=0.45, seed=1, sobe=True):
    n = int(dur * SR)
    r = rng(seed).standard_normal(n)
    t = np.arange(n) / n
    corte = (400 + 5000 * (t if sobe else 1 - t))
    y = np.zeros(n); acc = 0
    for k in range(n):
        a = np.exp(-2 * np.pi * corte[k] / SR)
        acc = (1 - a) * r[k] + a * acc
        y[k] = acc
    return y * np.sin(np.pi * t) ** 1.5 * 3


def pop(freq=880, dur=0.09):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-t / 0.01))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, 0.03)


def tick(seed):
    n = int(0.03 * SR)
    return onepole_hp(rng(seed).standard_normal(n), 2500) * env_exp(n, 0.004)


def ding(f=1320, dur=0.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.4 * np.sin(2 * np.pi * f * 2.76 * t)) * env_exp(n, 0.18)


def impacto():
    n = int(0.9 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(38 + 60 * np.exp(-t / 0.05)) / SR) * env_exp(n, 0.35)
    ruido = lowpass(rng(5).standard_normal(n), 1800) * env_exp(n, 0.06) * 1.5
    return boom + ruido


sfx = np.zeros(N)
put(sfx, tb("abre"), whoosh(0.35, 1), 0.35)
put(sfx, tb("linha2"), pop(660), 0.35)
put(sfx, tb("dias") - 0.2, whoosh(0.35, 2), 0.3)
for k in range(7):  # calendário enchendo
    put(sfx, tb("calendario") + k * 0.07, tick(10 + k), 0.25)
for c, f in (("check1", 880), ("check2", 988), ("check3", 1175)):
    put(sfx, tb(c), pop(f), 0.45)
put(sfx, tb("wipe_noite") - 0.05, whoosh(0.6, 3), 0.45)
for b in range(CUES["noite"], CUES["acorda"]):  # relógio tiquetaqueando
    put(sfx, batidas[b], tick(30 + b), 0.35)
    put(sfx, batidas[b] + BEAT / 2, tick(60 + b), 0.2)
put(sfx, tb("acorda"), ding(), 0.4)
put(sfx, tb("acorda") + 0.16, ding(1568), 0.3)
put(sfx, tb("celular") - 0.1, whoosh(0.4, 4), 0.35)
for k in range(10):  # contador subindo
    put(sfx, tb("conta") + k * 0.06, tick(80 + k), 0.18)
put(sfx, tb("pousa"), pop(523, 0.14), 0.4)
put(sfx, tb("parado"), impacto(), 0.6)
salvar("sfx.wav", sfx)

# ---------------- mix ----------------
with wave.open(VOZ) as w:
    vsr = w.getframerate()
    v = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(float) / 32768
idx = np.arange(N) * vsr / SR  # reamostra para 48 kHz
voz = np.interp(idx, np.arange(len(v)), v)[:N]
# abaixa a trilha quando a voz fala (envelope da voz)
envv = lowpass(np.abs(voz), 8)
duck = 1 - 0.6 * np.clip(envv / (envv.max() * 0.35), 0, 1)
fade = np.minimum(1, (DUR - T) / 0.3)
mix = (voz * 1.0 + musica * duck * 0.5 + sfx * 0.6) * fade
bruto = os.path.join(OUT, "mix-bruto.wav")
salvar("mix-bruto.wav", mix / max(1e-9, np.abs(mix).max()) * 0.9)

# loudnorm em 2 passadas para -14 LUFS
med = subprocess.run(["ffmpeg", "-hide_banner", "-i", bruto, "-af",
                      "loudnorm=I=-14:TP=-1:LRA=11:print_format=json", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
j = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", med, re.S).group(0))
filtro = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
          f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", bruto, "-af", filtro, "-ar", str(SR),
                os.path.join(OUT, "mix.wav")], check=True)
def medir(f):
    e = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "loudnorm=I=-14:print_format=json",
                        "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", e, re.S).group(0))["input_i"])


# o modo linear pode ficar abaixo da meta por causa do teto de pico: corrige com ganho + limitador
final = os.path.join(OUT, "mix.wav")
for _ in range(4):
    lufs = medir(final)
    if abs(lufs + 14) <= 0.3:
        break
    tmp = os.path.join(OUT, "mix-tmp.wav")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", final, "-af",
                    f"volume={-14 - lufs:.2f}dB,alimiter=limit=0.891:level=false", "-ar", str(SR), tmp], check=True)
    os.replace(tmp, final)
print("mix.wav pronto, loudness integrada:", medir(final), "LUFS")
