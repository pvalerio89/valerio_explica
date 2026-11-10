"""Gera o personagem do canal com o rosto do Patrick (Gemini, foto de referência).

Uso: python automacao/gerar_personagem.py [nomes...]   (sem nomes = todas as poses)
Precisa de GEMINI_API_KEY no ambiente. Saída: saida/personagem/<nome>.png
"""
import base64, json, os, sys, time, urllib.request, urllib.error

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(RAIZ, "canal", "thumb-chamativa", "rosto-patrick-original.png")
SAIDA = os.path.join(RAIZ, "saida", "personagem")
MODELO = os.environ.get("MODELO", "gemini-3.1-flash-image")

BASE = ("Use the man in the reference photo. Keep his exact face and identity: same face shape, same short dark hair, "
        "same thick dark mustache, same eyes, eyebrows and skin tone. He wears a dark charcoal grey hoodie with the hood DOWN "
        "and a small bright green 'VE' logo on the chest. Waist-up portrait, centered, plain pure white background, "
        "bright studio light with a soft green rim light, sharp focus, YouTube thumbnail style, very expressive. No text. ")
POSES = {
    "surpreso": "Photorealistic. He is shocked and amazed: mouth wide open, eyebrows raised high, both hands on his cheeks.",
    "pensativo": "Photorealistic. He is thinking with one hand on his chin, eyes looking up to the side, slightly suspicious smile.",
    "apontando": "Photorealistic. Confident big smile, pointing with his index finger to the right side of the image.",
    "desconfiado": "Photorealistic. Suspicious look, one eyebrow raised, arms crossed, head slightly tilted.",
    "comemorando": "Photorealistic. Celebrating with both fists up, huge open smile, very happy.",
    "cartoon-3d": "Stylized 3D animated movie character version of him (Pixar-like), friendly big smile, pointing to the right, "
                  "keep his face recognizable.",
}


def gerar(nome, pose):
    corpo = {"contents": [{"parts": [
        {"inlineData": {"mimeType": "image/png", "data": base64.b64encode(open(REF, "rb").read()).decode()}},
        {"text": BASE + pose}]}],
        "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "1:1"}}}
    req = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODELO}:generateContent",
                                 data=json.dumps(corpo).encode(),
                                 headers={"x-goog-api-key": os.environ["GEMINI_API_KEY"], "Content-Type": "application/json"})
    try:
        r = json.load(urllib.request.urlopen(req, timeout=240))
    except urllib.error.HTTPError as e:
        print("ERRO", nome, e.code, e.read().decode()[:400]); return False
    for p in r.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        if "inlineData" in p:
            open(os.path.join(SAIDA, nome + ".png"), "wb").write(base64.b64decode(p["inlineData"]["data"]))
            print("ok", nome); return True
    print("sem imagem", nome, json.dumps(r)[:400]); return False


if __name__ == "__main__":
    os.makedirs(SAIDA, exist_ok=True)
    nomes = sys.argv[1:] or list(POSES)
    ok = 0
    for n in nomes:
        ok += gerar(n, POSES[n]); time.sleep(4)
    sys.exit(0 if ok else 1)
