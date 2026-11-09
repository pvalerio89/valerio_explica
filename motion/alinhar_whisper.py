"""Alinha o roteiro com a narração usando tempos reais de palavra (faster-whisper small, CPU).

O Whisper só dá os TEMPOS; o texto é sempre o do roteiro. Cada palavra do roteiro é casada com a
palavra reconhecida (difflib); as que não casam ficam interpoladas entre vizinhas.
Saída em <pasta_saida>: tempos.json/js (frases por bloco) e palavras.json/js (window.PAL).

Uso: py -3 alinhar_whisper.py <pasta do vídeo> <pasta_saida>
"""
import difflib, json, os, re, subprocess, sys, unicodedata, wave
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from alinhar import blocos_roteiro, frases  # noqa: E402  (mesma quebra de frases)
import alinhar
from faster_whisper import WhisperModel

VID, OUT = os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2])
alinhar.VID = VID
PAUSA = 0.45


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return re.sub(r"[^a-z0-9]", "", "".join(c for c in s if unicodedata.category(c) != "Mn"))


def dur_wav(f):
    with wave.open(f) as r:
        return r.getnframes() / r.getframerate()


CFILE = os.path.join(OUT, "_whisper_cache.json")
CACHE = json.load(open(CFILE)) if os.path.exists(CFILE) else {}
modelo = WhisperModel("small", device="cpu", compute_type="int8")
rot = blocos_roteiro()
tempos, pal, g = [], [], 0.0
for n in sorted(rot):
    wav = os.path.join(VID, "voz", f"bloco-{n}.wav")
    if not os.path.exists(wav):
        print("sem áudio:", n); break
    dur = dur_wav(wav)
    aud = np.frombuffer(subprocess.run(["ffmpeg", "-loglevel", "error", "-i", wav, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True).stdout, dtype=np.float32)
    fs = frases(rot[n])
    sw = [(fi, w) for fi, f in enumerate(fs) for w in f.split()]
    a = [norm(w) or "_" for _, w in sw]
    melhor = None
    for kw in ({"initial_prompt": rot[n][:400]}, {"condition_on_previous_text": False}):
        # com o texto de dica os números saem por extenso; às vezes ele alucina, então fica o que casar mais
        ck = f"{n}-{'p' if 'initial_prompt' in kw else 'n'}-{os.path.getmtime(wav):.0f}"
        if ck not in CACHE:
            segs, _ = modelo.transcribe(aud, language="pt", word_timestamps=True, vad_filter=False, **kw)
            CACHE[ck] = [(norm(w.word), w.start, w.end) for s in segs for w in s.words if norm(w.word)]
            json.dump(CACHE, open(CFILE, "w"))
        w_ = [tuple(x) for x in CACHE[ck]]
        c_ = sum(m.size for m in difflib.SequenceMatcher(None, a, [x[0] for x in w_], autojunk=False).get_matching_blocks())
        # cobertura: a fala reconhecida tem que começar perto do início e terminar perto do fim do áudio
        buraco = (w_[0][1] if w_ else dur) + max(0, dur - (w_[-1][2] if w_ else 0) - 1.0)
        nota = c_ - 3 * len(a) * max(0, buraco - 1.0) / dur
        if melhor is None or nota > melhor[0]:
            melhor = (nota, w_)
    ww = melhor[1]
    b = [x[0] for x in ww]
    t = [None] * len(sw)
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        tag, i1, i2, j1, j2 = blk
        if tag == "equal" or (tag == "replace" and i2 - i1 == j2 - j1):
            for k in range(i2 - i1):
                t[i1 + k] = (ww[j1 + k][1], ww[j1 + k][2])
        elif tag == "replace":  # n palavras do roteiro x m reconhecidas: espalha no intervalo
            s0, s1 = ww[j1][1], ww[j2 - 1][2]
            for k in range(i2 - i1):
                t[i1 + k] = (s0 + (s1 - s0) * k / (i2 - i1), s0 + (s1 - s0) * (k + 1) / (i2 - i1))
    # interpola buracos
    for i in range(len(t)):
        if t[i] is None:
            j = i
            while j < len(t) and t[j] is None:
                j += 1
            a0 = t[i - 1][1] if i > 0 else 0.1
            a1 = t[j][0] if j < len(t) else dur - 0.1
            for k in range(i, j):
                t[k] = (a0 + (a1 - a0) * (k - i) / (j - i), a0 + (a1 - a0) * (k - i + 1) / (j - i))
    # palavras "esmagadas" (duração ~0): espalha o trecho entre vizinhos confiáveis
    ini_fala = next((x[1] for x in ww), 0.1)
    e = [False] * len(t)
    for i in range(len(t)):
        e[i] = t[i][1] - t[i][0] < 0.05
    i = 0
    while i < len(t):
        if not e[i]:
            i += 1; continue
        j = i
        while j < len(t) and e[j]:
            j += 1
        i0 = max(0, i - 1) if i > 0 else 0          # inclui a palavra anterior (costuma estar mal posta)
        lo = t[i0 - 1][1] if i0 > 0 else min(0.1, ini_fala)
        if i0 <= 2:
            i0, lo = 0, 0.08
        hi = t[j][0] if j < len(t) else dur - 0.1
        pesos = [max(2, len(a[k])) for k in range(i0, j)]
        P_, acc = sum(pesos), 0
        for k, pw in zip(range(i0, j), pesos):
            t[k] = (lo + (hi - lo) * acc / P_, lo + (hi - lo) * (acc + pw) / P_); acc += pw
        i = j
    casadas = sum(1 for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks() for _ in range(blk.size))
    print(f"bloco {n}: {dur:.1f} s, {len(sw)} palavras, {casadas} casadas")
    fr = []
    for fi, f in enumerate(fs):
        ks = [k for k, (x, _) in enumerate(sw) if x == fi]
        fr.append({"txt": f, "ini": round(t[ks[0]][0], 3), "fim": round(t[ks[-1]][1], 3)})
    for k in range(len(fr) - 1):
        fr[k]["fim"] = fr[k + 1]["ini"]
    fr[-1]["fim"] = round(dur, 3)
    tempos.append({"n": n, "inicio_global": round(g, 3), "dur": round(dur, 3), "frases": fr})
    for k, (fi, w) in enumerate(sw):
        pal.append({"w": w, "ini": round(g + t[k][0], 3), "fim": round(g + t[k][1], 3), "b": n, "f": fi})
    g += dur + PAUSA

os.makedirs(OUT, exist_ok=True)
T = {"total": round(g - PAUSA, 3), "blocos": tempos}
P = {"duracao": round(g - PAUSA + 0.8, 3), "palavras": pal}
for nome, obj, var in (("tempos", T, "TEMPOS"), ("palavras", P, "PAL")):
    json.dump(obj, open(os.path.join(OUT, nome + ".json"), "w", encoding="utf-8"), ensure_ascii=False)
    open(os.path.join(OUT, nome + ".js"), "w", encoding="utf-8").write(f"window.{var}=" + json.dumps(obj, ensure_ascii=False) + ";\n")
print("total", T["total"], "s")
for B in tempos:
    for i, f in enumerate(B["frases"]):
        print(f"  {B['n']}.{i} {B['inicio_global'] + f['ini']:7.2f}  {f['txt'][:80]}")
