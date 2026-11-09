"""Tempos palavra por palavra de um vídeo inteiro (sem modelo de fala).

Usa o tempos.json (frases alinhadas por alinhar.py) e as pausas de cada bloco: dentro de cada frase,
distribui as palavras pelo tempo de fala proporcional ao tamanho delas, pulando os silêncios.
Saída: {duracao, palavras: [{w, ini, fim, b, f}]} com tempos GLOBAIS (b = bloco, f = índice da frase).

Uso: py -3 palavras.py <tempos.json> <pasta voz/> <saida.json>
"""
import json, re, subprocess, sys

tempos = json.load(open(sys.argv[1], encoding="utf-8"))
VOZ, SAIDA = sys.argv[2], sys.argv[3]


def silencios(wav):
    e = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", "silencedetect=noise=-35dB:d=0.12", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    return list(zip([float(x) for x in re.findall(r"silence_start: ([\d.]+)", e)],
                    [float(x) for x in re.findall(r"silence_end: ([\d.]+)", e)]))


pal = []
for b in tempos["blocos"]:
    sil = silencios(f"{VOZ}/bloco-{b['n']}.wav")
    g0 = b["inicio_global"]
    for fi, f in enumerate(b["frases"]):
        a, z = f["ini"], f["fim"]
        segs, cur = [], a
        for s0, s1 in sil:
            if s1 <= a or s0 >= z:
                continue
            if s0 > cur:
                segs.append((cur, min(s0, z)))
            cur = max(cur, s1)
        if cur < z:
            segs.append((cur, z))
        segs = segs or [(a, z)]
        tot = sum(y - x for x, y in segs)
        ws = f["txt"].split()
        pesos = [max(2, len(re.sub(r"\W", "", w))) for w in ws]
        P = sum(pesos)

        def tempo(x):
            alvo = x / P * tot
            for s0, s1 in segs:
                if alvo <= s1 - s0:
                    return s0 + alvo
                alvo -= s1 - s0
            return segs[-1][1]

        acc = 0
        for w, p in zip(ws, pesos):
            pal.append({"w": w, "ini": round(g0 + tempo(acc), 3), "fim": round(g0 + tempo(acc + p), 3), "b": b["n"], "f": fi})
            acc += p
json.dump({"duracao": round(tempos["total"] + 0.8, 3), "palavras": pal}, open(SAIDA, "w", encoding="utf-8"), ensure_ascii=False)
print(len(pal), "palavras;", tempos["total"], "s")
