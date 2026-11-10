"""Pede ao Gemini para assistir um vídeo do YouTube e descrever slides, ritmo e efeitos sonoros."""
import json, os, sys, time, urllib.request

URL = os.environ["REF_URL"]
KEY = os.environ["GEMINI_API_KEY"]
PROMPTS = {
 "geral": """Você é editor de vídeo. Assista este vídeo inteiro e descreva em português, com MUITO detalhe técnico, para que um editor consiga reproduzir o ESTILO (não o conteúdo):
1. Visão geral: tema, duração, formato (narração + slides? rosto? b-roll?).
2. SLIDES/VISUAL: paleta de cores (hex aproximado), fundo, tipografia (peso, tamanho, caixa alta?), como o texto entra (palavra por palavra, máquina de escrever, pop, slide), uso de ícones/emoji/imagens/prints/setas/destaques/marca-texto, layout, molduras, zoom/câmera.
3. RITMO/FLOW: duração média de cada cena/corte, quantos cortes por minuto, como as transições acontecem (corte seco, whip, zoom, slide), como o visual acompanha a fala, pausas, ganchos, estrutura do começo (primeiros 30 s) e do fim.
4. EFEITOS SONOROS: liste TODOS os tipos de SFX que você ouve (whoosh, pop, click, ding, riser, swoosh, teclado, caixa registradora, boom, glitch...), quando cada um toca (em que tipo de evento visual), volume relativo à voz, frequência. Música de fundo: estilo, BPM aproximado, volume, se para em momentos-chave.
5. Voz: ritmo, energia, pausas.
6. Lista de 10 a 15 'receitas' concretas e reproduzíveis desse estilo.""",
 "linha_do_tempo": """Assista os primeiros 90 segundos deste vídeo e faça uma linha do tempo segundo a segundo (formato mm:ss - o que aparece na tela - animação/transição - efeito sonoro que toca - o que a voz diz resumido). Seja exato nos tempos e descreva cada efeito sonoro e cada mudança visual. Em português.""",
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
for nome, prompt in PROMPTS.items():
    for model in ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"]:
        try:
            txt = chamar(model, prompt)
            open(f"saida/{nome}.md", "w", encoding="utf-8").write(f"<!-- {model} -->\n{txt}")
            print(f"===== {nome} ({model}) =====\n{txt}\n", flush=True)
            break
        except Exception as e:
            msg = e.read().decode()[:500] if hasattr(e, "read") else str(e)
            print(f"[{nome}] {model} falhou: {msg}", file=sys.stderr, flush=True)
            time.sleep(5)
