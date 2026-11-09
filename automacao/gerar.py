"""Gera um vídeo longo do Valerio Explica do começo ao fim (no PC ou no GitHub).

Uso: python automacao/gerar.py <pasta do vídeo> [--previa]
     ex.: python automacao/gerar.py video-07-tema

Passos (cada um é pulado se o resultado já existe):
  1. voz       video-NN-*/gerar_voz.py  -> voz/narracao.wav   (Gemini, precisa de GEMINI_API_KEY)
  2. tempos    motion/alinhar_whisper.py -> motion/vNN/tempos.js e palavras.js
  3. cenas     motion/hf/vNN/montar.py (se existir) -> motion/hf/vNN/index.html
  4. eventos   node render.mjs --eventos -> motion/vNN/eventos.json
  5. som       motion/audio.py -> motion/hf/vNN/out/mix.wav (-14 LUFS)
  6. vídeo     3 pedaços em paralelo + junta com o som -> saida/video-NN-final.mp4
--previa: para depois do passo 4 e gera só a prancha (1 quadro a cada 15 s) em saida/prancha.jpg.
"""
import json, os, re, subprocess, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MOTION = os.path.join(RAIZ, "motion")
PY = sys.executable
PEDACOS = 3


def rodar(cmd, cwd):
    print(">", " ".join(cmd), flush=True)
    subprocess.run(cmd, cwd=cwd, check=True)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    pasta = os.path.basename(sys.argv[1].replace("\\", "/").rstrip("/"))
    vid = os.path.join(RAIZ, pasta)
    m = re.match(r"video-(\d+)", pasta)
    if not m or not os.path.isdir(vid):
        sys.exit(f"ERRO: pasta de vídeo não encontrada: {pasta}")
    nn = m.group(1).zfill(2)
    hf = os.path.join(MOTION, "hf", f"v{nn}")
    dados = os.path.join(MOTION, f"v{nn}")
    saida = os.path.join(RAIZ, "saida")
    os.makedirs(saida, exist_ok=True)
    os.makedirs(dados, exist_ok=True)

    if not os.path.exists(os.path.join(vid, "voz", "narracao.wav")):
        rodar([PY, "gerar_voz.py"], vid)
    if not os.path.exists(os.path.join(dados, "palavras.js")):
        rodar([PY, "alinhar_whisper.py", vid, dados], MOTION)
    if os.path.exists(os.path.join(hf, "montar.py")):
        rodar([PY, "montar.py"], hf)
    if not os.path.exists(os.path.join(hf, "index.html")):
        sys.exit(f"ERRO: faltam as cenas em motion/hf/v{nn}/index.html")
    rodar(["node", "render.mjs", f"hf/v{nn}/index.html", "--eventos", f"v{nn}/eventos.json"], MOTION)

    total = json.load(open(os.path.join(dados, "tempos.json"), encoding="utf-8"))["total"] + 1.6

    if "--previa" in sys.argv:
        marcas = ",".join(f"{t:.1f}" for t in [x * 15 + 2 for x in range(int(total // 15) + 1)] if t < total)
        rodar(["node", "render.mjs", f"hf/v{nn}/index.html", "--quadros", marcas], MOTION)
        q = os.path.join(hf, "quadros")
        fotos = [os.path.join(q, f"q-{s}.png") for s in marcas.split(",")]
        lista = os.path.join(saida, "quadros.txt")
        with open(lista, "w") as f:
            for p in fotos:
                f.write(f"file '{p}'\n")
        cols = 6
        rodar(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", lista,
               "-vf", f"scale=480:270,tile={cols}x{(len(fotos) + cols - 1) // cols}:padding=6:color=black",
               "-frames:v", "1", os.path.join(saida, "prancha.jpg")], RAIZ)
        print("prévia pronta: saida/prancha.jpg")
        return

    rodar([PY, "audio.py", nn, pasta], MOTION)
    mix = os.path.join(hf, "out", "mix.wav")

    # vídeo em pedaços paralelos (no máximo 3 Chromes)
    trecho = total / PEDACOS
    procs, partes = [], []
    for i in range(PEDACOS):
        p = os.path.join(hf, "out", f"p{i + 1}.mp4")
        partes.append(p)
        dur = min(trecho, total - i * trecho)
        cmd = ["node", "render.mjs", f"hf/v{nn}/index.html", p, "--dur", f"{dur:.3f}", "--fps", "30",
               "--inicio", f"{i * trecho:.3f}"]
        print(">", " ".join(cmd), flush=True)
        procs.append(subprocess.Popen(cmd, cwd=MOTION))
    if any(pr.wait() for pr in procs):
        sys.exit("ERRO: algum pedaço do vídeo falhou")
    lista = os.path.join(hf, "out", "lista.txt")
    with open(lista, "w") as f:
        for p in partes:
            f.write(f"file '{p}'\n")
    final = os.path.join(saida, f"video-{nn}-final.mp4")
    rodar(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", lista, "-i", mix,
           "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-shortest",
           "-movflags", "+faststart", final], RAIZ)
    print("vídeo pronto:", final)


if __name__ == "__main__":
    main()
