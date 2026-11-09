"""Gera imagens com o Gemini (Nano Banana) usando a chave em ~/.config/watch/.env.

Uso: py -3 gemini_imagem.py saida.png "prompt" [proporcao] [modelo]
proporcao: 1:1 (padrão), 16:9 ...
"""
import base64, json, os, re, sys, urllib.request, urllib.error


def chave():
    env = open(os.path.expanduser("~/.config/watch/.env"), encoding="utf-8").read()
    return re.search(r"^GEMINI_API_KEY=(.+)$", env, re.M).group(1).strip().strip('"')


def gerar(saida, prompt, proporcao="1:1", modelo="gemini-3.1-flash-image"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{modelo}:generateContent"
    corpo = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"],
                             "imageConfig": {"aspectRatio": proporcao}},
    }
    req = urllib.request.Request(url, data=json.dumps(corpo).encode(),
                                 headers={"x-goog-api-key": chave(),
                                          "Content-Type": "application/json"})
    try:
        resp = json.load(urllib.request.urlopen(req, timeout=180))
    except urllib.error.HTTPError as e:
        print("ERRO", e.code, e.read().decode()[:600])
        return False
    for parte in resp["candidates"][0]["content"]["parts"]:
        if "inlineData" in parte:
            open(saida, "wb").write(base64.b64decode(parte["inlineData"]["data"]))
            print("ok", saida)
            return True
    print("sem imagem:", json.dumps(resp)[:600])
    return False


if __name__ == "__main__":
    a = sys.argv[1:]
    gerar(a[0], a[1], *(a[2:4]))
