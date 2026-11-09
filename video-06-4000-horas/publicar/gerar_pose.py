"""Pose nova do personagem de capuz (segurando ampulheta) a partir da foto de referência, com o Gemini.
Uso: py -3 gerar_pose.py
"""
import base64, json, os, sys, urllib.request, urllib.error
AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(AQUI, "..", "..", "canal"))
from gemini_imagem import chave
REF = os.path.join(AQUI, "..", "..", "canal", "thumb-chamativa", "capuz-patrick.png")
SAIDA = os.path.join(AQUI, "capuz-ampulheta-bruto.png")
prompt = ("Same man, same dark grey hoodie with the green VE logo, same hood covering the eyes, same smile and beard, "
          "same studio lighting with green rim light. Now he holds a large classic wooden hourglass with golden sand "
          "in one hand, raised next to his face at chest height, looking toward the camera. Waist-up portrait, "
          "plain pure white background, photorealistic, sharp, no text.")
corpo = {"contents": [{"parts": [{"inlineData": {"mimeType": "image/png", "data": base64.b64encode(open(REF, "rb").read()).decode()}},
                                 {"text": prompt}]}],
         "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "1:1"}}}
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent",
                             data=json.dumps(corpo).encode(), headers={"x-goog-api-key": chave(), "Content-Type": "application/json"})
try:
    r = json.load(urllib.request.urlopen(req, timeout=180))
except urllib.error.HTTPError as e:
    sys.exit(f"ERRO {e.code} {e.read().decode()[:400]}")
for p in r["candidates"][0]["content"]["parts"]:
    if "inlineData" in p:
        open(SAIDA, "wb").write(base64.b64decode(p["inlineData"]["data"])); print("ok", SAIDA); break
else:
    print("sem imagem:", json.dumps(r)[:400])
