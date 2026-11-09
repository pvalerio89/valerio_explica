"""Narração do vídeo com a voz oficial do Valerio Explica (Gemini TTS "Sadaltager").

Lê os trechos "> ..." de cada "## BLOCO N" do roteiro.md e gera voz/bloco-N.wav.
Pula blocos já gerados (o plano grátis do Gemini dá 10 pedidos por dia).
No fim junta tudo em voz/narracao.wav com uma pausa curta entre blocos.

Uso: py -3 gerar_voz.py           (gera o que falta e junta)
     py -3 gerar_voz.py 3         (refaz só o bloco 3)
"""
import os, re, sys, wave

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, ".."))  # gemini_voz.py na raiz do Valerio Explica
from gemini_voz import falar  # noqa: E402

VOZ = "Sadaltager"
ESTILO = ("youtuber brasileiro explicando um segredo para o espectador, tom de conversa, "
          "confiante, próximo e envolvente, ritmo natural de vídeo do YouTube")
PASTA = os.path.join(AQUI, "voz")
PAUSA = 0.45  # segundos entre blocos


def blocos():
    t = open(os.path.join(AQUI, "roteiro.md"), encoding="utf-8").read()
    partes = re.split(r"^## BLOCO (\d+)", t, flags=re.M)
    out = {}
    for i in range(1, len(partes), 2):
        linhas = [l[1:].strip() for l in partes[i + 1].splitlines() if l.startswith(">")]
        out[int(partes[i])] = "\n".join(l for l in linhas if l).replace("\n", " ")
    return out


def juntar(n):
    saida = os.path.join(PASTA, "narracao.wav")
    with wave.open(saida, "wb") as w:
        params = None
        for k in range(1, n + 1):
            with wave.open(os.path.join(PASTA, f"bloco-{k}.wav")) as r:
                if params is None:
                    params = r.getparams()
                    w.setparams(params)
                w.writeframes(r.readframes(r.getnframes()))
                if k < n:
                    w.writeframes(b"\x00" * int(params.framerate * PAUSA) * params.sampwidth * params.nchannels)
    print("narração completa:", saida)


if __name__ == "__main__":
    os.makedirs(PASTA, exist_ok=True)
    bs = blocos()
    so = {int(a) for a in sys.argv[1:]}
    for k, texto in sorted(bs.items()):
        f = os.path.join(PASTA, f"bloco-{k}.wav")
        if so and k not in so:
            continue
        if os.path.exists(f) and not so:
            print("já existe:", f)
            continue
        print(f"gerando bloco {k} ({len(texto.split())} palavras)...", flush=True)
        falar(texto, f, voz=VOZ, estilo=ESTILO)
        with wave.open(f) as r:
            print(f"  ok, {r.getnframes() / r.getframerate():.1f} s", flush=True)
    if all(os.path.exists(os.path.join(PASTA, f"bloco-{k}.wav")) for k in bs):
        juntar(len(bs))
