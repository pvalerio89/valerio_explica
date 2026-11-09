"""Gera fala com o Gemini TTS (Google). A chave fica em C:\\Users\\pvale\\.config\\watch\\.env (GEMINI_API_KEY=...).

Uso como amostra:  py -3 gemini_voz.py amostras
Uso em código:     from gemini_voz import falar; falar("texto", "saida.wav", voz="Puck")
"""
import base64, json, os, re, sys, time, urllib.error, urllib.request

MODELO = "gemini-3.8-flash-tts"
ESTILO = "narrador brasileiro de quiz do YouTube, animado, sorridente, falando rápido e com energia"
ENV = os.path.join(os.path.expanduser("~"), ".config", "watch", ".env")


def chave():
    if os.environ.get("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"]
    for linha in open(ENV, encoding="utf-8"):
        m = re.match(r'\s*GEMINI_API_KEY\s*=\s*"?([^"\s]+)"?', linha)
        if m:
            return m.group(1)
    sys.exit("Chave GEMINI_API_KEY não encontrada no arquivo .env")


def falar(texto, saida, voz="Puck", estilo=ESTILO):
    body = {
        "model": MODELO,
        "input": [{"type": "user_input", "content": [{
            "type": "text", "text": texto,
            "annotations": [{"type": "speech_metadata", "style": estilo}]}]}],
        "response_format": {"type": "audio"},
        "generation_config": {"speech_config": [{"voice": voz}]},
    }
    req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/interactions",
                                 data=json.dumps(body).encode(), method="POST",
                                 headers={"Content-Type": "application/json", "x-goog-api-key": chave()})
    for tentativa in range(5):
        try:
            resp = urllib.request.urlopen(req, timeout=120)
            break
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:400]
            if e.code == 429 and tentativa < 4:
                time.sleep(20 * (tentativa + 1))
                continue
            sys.exit(f"Erro {e.code} do Gemini: {msg}")
    data = resp.read()
    ctype = resp.headers.get("Content-Type", "")
    if "json" in ctype:
        # procura o áudio em base64 dentro da resposta
        j = json.loads(data)
        txt = json.dumps(j)
        m = re.search(r'"data"\s*:\s*"([A-Za-z0-9+/=]{200,})"', txt)
        if not m:
            sys.exit("Resposta sem áudio: " + txt[:400])
        data = base64.b64decode(m.group(1))
    if not data.startswith(b"RIFF"):
        # PCM cru 24 kHz mono 16-bit -> embrulha em WAV
        import wave
        with wave.open(saida, "wb") as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(data)
    else:
        open(saida, "wb").write(data)


if __name__ == "__main__" and len(sys.argv) > 1 and sys.argv[1] == "amostras":
    pasta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "amostras-vozes")
    T = "Número sete. Olha as consoantes! <short pause> México! Mais um ponto. Número oito. Repara no cedilha! <short pause> É a França!"
    for v in ("Puck", "Fenrir", "Orus", "Charon"):
        out = os.path.join(pasta, f"gemini-{v}.wav")
        falar(T, out, voz=v)
        print("ok", v, flush=True)
        time.sleep(3)
