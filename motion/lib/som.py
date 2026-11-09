"""Som sintetizado do Valerio Explica (reutilizável): filtros por FFT, instrumentos, SFX, mix em -14 LUFS.

Uso típico:
    from som import Som
    s = Som(duracao)
    s.trilha(secoes)          # [(t0, t1, [raízes MIDI], 'cheia'|'media'|'leve')]
    batidas = s.medir_batidas()
    s.efeitos(eventos)        # [{t, tipo}] exportados pelo render.mjs --eventos
    s.mixar(saida_wav, voz_wav=None)
"""
import json, os, re, subprocess, wave
import numpy as np

SR, BPM = 48000, 96
BEAT = 60 / BPM
MAIOR = {60, 55, 53}
rng = np.random.default_rng


def _resp(n, fc, tipo):
    f = np.fft.rfftfreq(n, 1 / SR)
    h = 1 / np.sqrt(1 + (f / fc) ** 2)
    return h if tipo == "lp" else np.sqrt(np.maximum(0, 1 - h ** 2))


def lp(x, fc, o=1):
    return np.fft.irfft(np.fft.rfft(x) * _resp(len(x), fc, "lp") ** o, len(x))


def hp(x, fc, o=1):
    return np.fft.irfft(np.fft.rfft(x) * _resp(len(x), fc, "hp") ** o, len(x))


def env(n, tau):
    return np.exp(-np.arange(n) / (SR * tau))


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


# ---------- instrumentos ----------
def kick():
    n = int(0.35 * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(45 + 95 * np.exp(-t / 0.04)) / SR) * env(n, 0.12)


def hat(seed):
    n = int(0.06 * SR)
    return hp(rng(seed).standard_normal(n), 7000, 2) * env(n, 0.015)


def pad(freq, dur, brilho=1400):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(np.sign(np.sin(2 * np.pi * freq * d * t)) for d in (0.997, 1.0, 1.004)) / 3
    return lp(s, brilho, 2) * np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.6)


def baixo(freq, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t) * env(n, 0.25)


def pluck(freq, dur=0.4):
    n = int(dur * SR); t = np.arange(n) / SR
    return lp(np.sign(np.sin(2 * np.pi * freq * t)), 2600) * env(n, 0.12)


# ---------- efeitos ----------
def whoosh(dur=0.45, seed=1):
    n = int(dur * SR); t = np.arange(n) / n
    r = rng(seed).standard_normal(n)
    return (lp(r, 600, 2) * (1 - t) + lp(r, 4500, 2) * t) * np.sin(np.pi * t) ** 1.5 * 2.5


def pop(freq=880, dur=0.09):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.sin(2 * np.pi * np.cumsum(freq * (1 + 0.6 * np.exp(-t / 0.01))) / SR) * env(n, 0.03)


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
    return np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.5 * t / 0.25)) / SR) * env(n, 0.12)


GANHO = {"whoosh": 0.28, "pop": 0.32, "tick": 0.16, "check": 0.4, "risca": 0.3, "moeda": 0.3,
         "subir": 0.25, "bolha": 0.3, "impacto": 0.45}


def efeito(tipo, k):
    return {"whoosh": lambda: whoosh(0.4, k), "pop": lambda: pop(700 + (k % 4) * 110), "tick": lambda: tick(k),
            "check": lambda: pop(988), "risca": lambda: risca(k), "moeda": moeda,
            "subir": lambda: subir(330 + (k % 3) * 110), "bolha": lambda: pop(500 + (k % 5) * 90, 0.08),
            "impacto": lambda: impacto(k)}[tipo]()


class Som:
    def __init__(self, duracao):
        self.dur = duracao
        self.N = int(SR * duracao)
        self.T = np.arange(self.N) / SR
        self.musica = np.zeros(self.N)
        self.sfx = np.zeros(self.N)
        self.batidas = []

    def put(self, buf, t0, sig, g=1.0):
        i = int(round(t0 * SR))
        if i < 0:
            sig, i = sig[-i:], 0
        j = min(len(buf), i + len(sig))
        if j > i:
            buf[i:j] += sig[: j - i] * g

    def trilha(self, secoes):
        for t0, t1, prog, dens in secoes:
            b0, b1 = int(np.ceil(t0 / BEAT - 1e-6)), int(np.floor(t1 / BEAT))
            for bt in range(b0, b1):
                tb, k = bt * BEAT, bt - b0
                self.put(self.musica, tb, kick(), 0.5 if bt % 4 == 0 else 0.36)
                if dens != "leve":
                    self.put(self.musica, tb + BEAT / 2, hat(bt), 0.11)
                if dens == "cheia" and bt % 2 == 1:
                    self.put(self.musica, tb + BEAT * 0.75, hat(bt + 999), 0.06)
                raiz = prog[(k // 4) % len(prog)]
                if bt % 4 == 0:
                    terca = 4 if raiz in MAIOR else 3
                    for m in (raiz, raiz + terca, raiz + 7):
                        self.put(self.musica, tb, pad(hz(m), min(4 * BEAT, t1 - tb) + 0.3), 0.045)
                self.put(self.musica, tb, baixo(hz(raiz - 12), BEAT * 0.9), 0.16)
                if dens == "cheia" and bt % 4 in (1, 3):
                    self.put(self.musica, tb + BEAT / 2, pluck(hz(raiz + 12 + (7 if bt % 4 == 3 else 0))), 0.035)
        self.musica *= np.minimum(1, self.T / 0.05)

    def medir_batidas(self):
        grave, hop, N = lp(self.musica, 150, 2), 256, self.N
        en = np.add.reduceat(grave[: (N // hop) * hop] ** 2, np.arange(0, (N // hop) * hop, hop))
        fl = np.maximum(0, np.diff(en, prepend=0))
        lim = np.percentile(fl[fl > 0], 90) * 0.35
        p = []
        for i in range(1, len(fl) - 1):
            if fl[i] > lim and fl[i] >= fl[i - 1] and fl[i] >= fl[i + 1]:
                tt = i * hop / SR
                if not p or tt - p[-1] > BEAT * 0.5:
                    p.append(round(tt, 4))
        self.batidas = p
        return p

    def efeitos(self, eventos, depois_de=0.0):
        b = np.array(self.batidas) if self.batidas else None
        usados = set()
        for k, e in enumerate(eventos):
            t, tipo = e["t"], e["tipo"]
            if t < depois_de:
                continue
            if b is not None and tipo in ("whoosh", "impacto", "check", "pop"):
                j = np.argmin(np.abs(b - t))
                if abs(b[j] - t) <= 0.12:
                    t = float(b[j])
            if (round(t, 2), tipo) in usados:
                continue
            usados.add((round(t, 2), tipo))
            self.put(self.sfx, t - (0.18 if tipo == "whoosh" else 0), efeito(tipo, k), GANHO[tipo])
        return len(usados)

    def _salvar(self, caminho, x):
        x = np.clip(x, -1, 1)
        with wave.open(caminho, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((x * 32767).astype("<i2").tobytes())

    @staticmethod
    def _medir(f):
        e = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "loudnorm=I=-14:TP=-1:LRA=11:print_format=json",
                            "-f", "null", "-"], capture_output=True, text=True).stderr
        return json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", e, re.S).group(0))

    def mixar(self, saida, voz_wav=None, ganho_musica=0.5):
        voz = np.zeros(self.N)
        if voz_wav:
            with wave.open(voz_wav) as w:
                vsr = w.getframerate()
                v = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(float) / 32768
            voz = np.interp(np.arange(self.N) * vsr / SR, np.arange(len(v)), v, right=0)
            envv = lp(np.abs(voz), 6, 2)
            duck = 1 - 0.6 * np.clip(envv / (np.percentile(envv, 95) * 0.5 + 1e-9), 0, 1)
        else:
            duck = np.ones(self.N)
        fade = np.minimum(1, np.maximum(0, (self.dur - 0.3 - self.T) / 1.0))
        mix = (voz + self.musica * duck * ganho_musica + self.sfx * 0.6) * fade
        bruto = saida.replace(".wav", "-bruto.wav")
        self._salvar(bruto, mix / np.abs(mix).max() * 0.9)
        j = self._medir(bruto)
        filtro = (f"loudnorm=I=-14:TP=-1:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
                  f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", bruto, "-af", filtro, "-ar", str(SR), saida], check=True)
        for _ in range(4):
            l = float(self._medir(saida)["input_i"])
            if abs(l + 14) <= 0.3:
                break
            tmp = saida.replace(".wav", "-tmp.wav")
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", saida, "-af",
                            f"volume={-14 - l:.2f}dB,alimiter=limit=0.891:level=false", "-ar", str(SR), tmp], check=True)
            os.replace(tmp, saida)
        # teto de pico: se passou de -1 dBTP, limita (com sobreamostragem) e reajusta o volume
        for _ in range(3):
            m = self._medir(saida)
            if float(m["input_tp"]) <= -1.0:
                break
            tmp = saida.replace(".wav", "-tmp.wav")
            ganho = -14 - float(m["input_i"]) + 0.4  # +0,4 dB: compensa o que o limitador tira
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", saida, "-af",
                            f"aresample=192000,volume={ganho:.2f}dB,alimiter=limit=0.82:attack=1:release=60:level=false,aresample={SR}",
                            tmp], check=True)
            os.replace(tmp, saida)
        m = self._medir(saida)
        return float(m["input_i"]), float(m["input_tp"])
