"""Alinha as frases do roteiro com a narração (sem modelo de fala).

Para cada bloco: acha os trechos com voz (silencedetect), distribui o texto ao longo da fala
proporcional ao número de letras e prende o início de cada frase na pausa mais próxima.
Saída: v01/tempos.json  {blocos: [{n, inicio_global, dur, frases: [{txt, ini, fim}]}]}
Uso: py -3 alinhar_v01.py
"""
import json, os, re, subprocess

AQUI = os.path.dirname(os.path.abspath(__file__))
VID = os.path.join(AQUI, "..", "video-01-70-views")
PAUSA_ENTRE_BLOCOS = 0.45  # igual ao gerar_voz.py


def blocos_roteiro():
    t = open(os.path.join(VID, "roteiro.md"), encoding="utf-8").read()
    partes = re.split(r"^## BLOCO (\d+)", t, flags=re.M)
    out = {}
    for i in range(1, len(partes), 2):
        linhas = [l[1:].strip() for l in partes[i + 1].splitlines() if l.startswith(">")]
        out[int(partes[i])] = " ".join(l for l in linhas if l)
    return out


def frases(txt):
    # quebra em frases e também em vírgulas longas (para ter mais pontos de sincronia)
    fs = re.findall(r"[^.!?…]+[.!?…]+\"?(?:\s|$)|[^.!?…]+$", txt)
    out = []
    for f in fs:
        f = f.strip().lstrip('" ').strip()
        if not f:
            continue
        if out and len(re.sub(r"\W", "", f)) < 4:  # pedaço minúsculo (aspas, reticências) junta na anterior
            out[-1] += " " + f
        else:
            out.append(f)
    return out


def silencios(wav):
    e = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=noise=-35dB:d=0.18",
                        "-f", "null", "-"], capture_output=True, text=True).stderr
    ini = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", e)]
    fim = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", e)]
    return list(zip(ini, fim))


def duracao(wav):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav],
                                capture_output=True, text=True).stdout)


def alinhar(wav, fs):
    dur = duracao(wav)
    sil = silencios(wav)
    # trechos de fala
    fala, t = [], 0.0
    for a, b in sil:
        if a > t + 0.05:
            fala.append((t, a))
        t = b
    if dur > t + 0.05:
        fala.append((t, dur))
    total_fala = sum(b - a for a, b in fala)

    def tempo_de(frac):  # fração da fala -> tempo real (pula as pausas)
        alvo = frac * total_fala
        for a, b in fala:
            if alvo <= b - a:
                return a + alvo
            alvo -= b - a
        return dur

    letras = [len(re.sub(r"\W", "", f)) for f in fs]
    tot = sum(letras)
    acum, out = 0, []
    fins_pausa = [b for a, b in sil]  # onde a voz recomeça
    for f, n in zip(fs, letras):
        ini = tempo_de(acum / tot)
        acum += n
        fim = tempo_de(acum / tot)
        out.append([f, ini, fim])
    # prende cada início (menos o 1º) no fim de pausa mais próximo, se estiver perto
    for k in range(1, len(out)):
        perto = min(fins_pausa, key=lambda x: abs(x - out[k][1]), default=None)
        if perto is not None and abs(perto - out[k][1]) < 0.9:
            out[k][1] = perto
            out[k - 1][2] = min(out[k - 1][2], perto)
    out[0][1] = fala[0][0] if fala else 0
    for k in range(1, len(out)):  # nenhuma frase com menos de 0,3 s
        if out[k][1] < out[k - 1][1] + 0.3:
            out[k][1] = out[k - 1][1] + 0.3
    for k in range(len(out)):  # cada frase vai até a próxima começar
        out[k][2] = out[k + 1][1] if k + 1 < len(out) else dur
    return dur, [{"txt": f, "ini": round(a, 3), "fim": round(b, 3)} for f, a, b in out]


if __name__ == "__main__":
    rot = blocos_roteiro()
    res, g = [], 0.0
    for n in sorted(rot):
        wav = os.path.join(VID, "voz", f"bloco-{n}.wav")
        dur, fs = alinhar(wav, frases(rot[n]))
        res.append({"n": n, "inicio_global": round(g, 3), "dur": round(dur, 3), "frases": fs})
        g += dur + PAUSA_ENTRE_BLOCOS
    os.makedirs(os.path.join(AQUI, "v01"), exist_ok=True)
    json.dump({"total": round(g - PAUSA_ENTRE_BLOCOS, 3), "blocos": res},
              open(os.path.join(AQUI, "v01", "tempos.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    for b in res:
        print(f"--- bloco {b['n']} (início {b['inicio_global']} s, {b['dur']} s)")
        for f in b["frases"]:
            print(f"  {f['ini']:6.2f}-{f['fim']:6.2f}  {f['txt'][:70]}")
