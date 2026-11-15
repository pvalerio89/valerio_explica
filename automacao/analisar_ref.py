"""Pede ao Gemini para assistir um vídeo do YouTube e descrever slides, ritmo e efeitos sonoros."""
import json, os, sys, time, urllib.request

URL = os.environ["REF_URL"]
KEY = os.environ["GEMINI_API_KEY"]
PROMPTS = {
 "conteudo": """Assista este vídeo inteiro e descreva em português, com MUITO detalhe, o CONTEÚDO, para que outro canal faça um vídeo próprio sobre o mesmo tema (sem copiar):
1. Título do vídeo, canal (se aparecer), duração, idioma, público-alvo.
2. Tema central e a promessa do vídeo (o que o espectador ganha).
3. Gancho dos primeiros 30 segundos (o que é dito e mostrado).
4. Estrutura completa em seções com tempos (mm:ss) e, em cada seção, TODOS os pontos, passos, exemplos, números, dados e afirmações (diga quais são fatos verificáveis e quais são opinião ou promessa do autor).
5. Ferramentas, sites ou recursos citados.
6. Como termina (chamada final).
7. O que funciona bem e o que é exagero, promessa duvidosa ou desatualizado.
8. 5 ideias de título em português do Brasil para um vídeo próprio sobre o mesmo tema, para um canal que explica como crescer e monetizar no YouTube.""",
}

def chamar(model, prompt):
    body = {"contents": [{"parts": [{"file_data": {"file_uri": URL}}, {"text": prompt}]}],
            "generationConfig": {"temperature": 0.3}}
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={KEY}",
        data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    return "".join(p.get("text", "") for p in d["candidates"][0]["content"]["parts"])

os.makedirs("saida", exist_ok=True)
try:
    with urllib.request.urlopen(f"https://generativelanguage.googleapis.com/v1beta/models?key={KEY}&pageSize=200") as r:
        nomes = [m["name"].split("/")[1] for m in json.load(r)["models"] if "generateContent" in m.get("supportedGenerationMethods", [])]
    print("MODELOS:", ", ".join(nomes), flush=True)
except Exception as e:
    nomes = []
flash = [n for n in nomes if "flash" in n and "image" not in n and "tts" not in n and "live" not in n and "audio" not in n]
ordem = ["gemini-3.8-flash"] + [n for n in flash if n != "gemini-3.8-flash"][:4]
for nome, prompt in PROMPTS.items():
    for model in ordem * 4:
        if os.path.exists(f"saida/{nome}.md"):
            break
        try:
            txt = chamar(model, prompt)
            open(f"saida/{nome}.md", "w", encoding="utf-8").write(f"<!-- {model} -->\n{txt}")
            print(f"===== {nome} ({model}) =====\n{txt}\n", flush=True)
            break
        except Exception as e:
            msg = e.read().decode()[:500] if hasattr(e, "read") else str(e)
            print(f"[{nome}] {model} falhou: {msg}", file=sys.stderr, flush=True)
            time.sleep(20)
