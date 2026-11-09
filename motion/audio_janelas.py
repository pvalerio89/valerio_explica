"""Som do teste "janelas": efeitos nos momentos-chave (mesmos tempos do Janelas.jsx), trilha média, mix -14 LUFS."""
import json, os, re, sys
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "lib"))
from som import Som  # noqa: E402
R = os.path.join(AQUI, "remotion")
pal = json.load(open(os.path.join(R, "src", "palavras.json"), encoding="utf-8"))
def quando(w):
    for p in pal["palavras"]:
        if re.sub(r"[^a-zà-ú]", "", p["w"].lower()) == w:
            return p["ini"]
T = {k: quando(k) for k in ["para", "por", "descrição", "tags", "inscritos", "imagem", "pequena", "curta", "segundo"]}
ev = [{"t": 0.0, "tipo": "pop"}, {"t": 0.55, "tipo": "whoosh"}]
for k in ["por", "imagem"]:
    ev.append({"t": T[k] - (0.15 if k == "por" else 1.0), "tipo": "whoosh"})
ev += [{"t": T["descrição"] - 1.4, "tipo": "pop"}, {"t": T["tags"] - 0.9, "tipo": "pop"}, {"t": T["inscritos"] - 1.2, "tipo": "pop"},
       {"t": T["segundo"] - 1.5, "tipo": "pop"}, {"t": T["para"] + 0.1, "tipo": "check"}]
ev += [{"t": T[k] + d, "tipo": "risca"} for k, d in (("descrição", 0.2), ("tags", 0.2), ("inscritos", 0.5))]
ev += [{"t": T["inscritos"] - 1.0 + j * 0.1, "tipo": "tick"} for j in range(10)]
ev += [{"t": T["pequena"], "tipo": "pop"}, {"t": T["curta"], "tipo": "pop"}]
ev += [{"t": T["segundo"] - 1.2 + j * 0.15, "tipo": "tick"} for j in range(12)]
s = Som(pal["duracao"])
s.trilha([(0, pal["duracao"], [57, 53, 60, 55], "media")])
s.medir_batidas()
n = s.efeitos(ev)
print(n, "efeitos", s.mixar(os.path.join(R, "out", "mix-janelas.wav"), voz_wav=os.path.join(R, "public", "narracao-teste.wav")))
