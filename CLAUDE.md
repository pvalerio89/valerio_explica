# Valerio Explica — contexto do projeto

Canal **Valerio Explica** (@ValerioExplica, ID `UCpt3lpOipp-lWumvdIUD9jg`) sobre crescer e monetizar no YouTube, em PT-BR. Responder sempre em português do Brasil, curto e simples.
**Nunca ligar publicamente ao Quiz Palito** (sem voz/visual do Palito, sem destaque cruzado, sem o e-mail quizpalito como contato). Narrar em terceira pessoa, sem inventar resultados.

## Pastas
- `canal/` — foto, banner, mascote (`gerar_canal.py`).
- `motion/` — pipeline dos vídeos (`hf/` HyperFrames para o estilo claro; Remotion/HTML com `seek(t)`, `render.mjs`, `audio_full.py`, `shorts.py N` para Shorts).
- `video-01-70-views/`, `video-02-titulos-thumbs/`, `video-03-primeiros-30s/`, `video-04-ia-sem-desmonetizar/` (https://youtu.be/aTwwTp0bwV0, 31/out) — vídeos publicados (vídeo 4: cenas em `motion/hf/v04/`, render em 3 partes com `render.mjs --inicio`), `video-05-quanto-o-youtube-paga/`, `video-06-4000-horas/` (https://youtu.be/cSI3xtbYbM8, 9/nov; cenas em `motion/hf/v06/cenas.js` + `montar.py`, som `motion/audio_v06.py`), `video-07-shorts-sem-aparecer/` (https://youtu.be/Lc0lDUSic2o, 10/nov, feito todo pelo GitHub; cenas em `motion/hf/v07/`) (cada um com `gerar_voz.py` e `publicar/`).
- `gemini_voz.py` — voz (Gemini TTS); a chave fica em `~/.config/watch/.env`.

## GitHub (desde 09/nov/2026)
- Repositório privado `pvalerio89/valerio_explica`: só código, roteiros, imagens e textos. `.mp4` e `.wav` ficam fora do Git (ver `.gitignore`).
- Vídeo final + `narracao.wav` + thumbnail de cada vídeo vão para a Release `video-NN` do repositório.
- Chaves (Gemini, YouTube) só em Secrets do GitHub ou no `.env` do PC, nunca no repositório.
- Automação (ver `COMO-USAR.md`): workflow **Gerar vídeo** (Windows; `automacao/gerar.py`: voz → `alinhar_whisper.py` → `montar.py` → eventos → `motion/audio.py NN pasta` → render em 3 pedaços) e **Enviar ao YouTube** (`automacao/youtube.py`, lê `publicar/titulo-descricao.txt` e `publicar/thumbnail*.jpg`; registra em `publicados.json`). Para um vídeo novo o Claude só precisa deixar no repositório: `video-NN-*/roteiro.md` (blocos `## BLOCO N` com falas `> ...`), `gerar_voz.py`, `publicar/` e `motion/hf/vNN/index.html` (ou `cenas.js` + `montar.py`).
- `render.mjs` aceita `CHROME=<caminho>` (e `CHROME_NO_SANDBOX=1` no Linux) para rodar fora do PC.

## Regras principais
- Voz oficial: Gemini **Sadaltager**, estilo "youtuber brasileiro explicando um segredo". Grátis = 10 pedidos/dia → narrar em blocos grandes.
- **Duração (desde 04/nov/2026): vídeos longos com 8 minutos ou mais** (cerca de 1.300+ palavras de narração; planejar 9–10 blocos, respeitando a cota de 10 vozes/dia).
- **Sem gancho pro próximo vídeo (desde 09/nov/2026):** o fim do vídeo não promete nem anuncia o próximo vídeo (nada de "no próximo vídeo eu mostro..."); fechar com resumo + inscrição. Também não citar que "o vídeo anterior prometeu este".
- Ritmo pausado: cena a cada 3–4 s, cartões/janelas + ícones, câmera deslizando.
- **Estilo claro (a partir do vídeo 4)**: fundo creme `#f3eee4` com grade de pontos, cartões `#fffdf8` com borda `#d8cfbe` e sombra leve, texto `#16191c`, acento verde `#149a55` (o `#22e07a` não lê no claro), Bahnschrift (títulos) + Segoe UI + Consolas (rótulos/relógio). Textos entram palavra por palavra no tempo da fala. Modelo: `motion/hf/previa-claro/index.html` (prévia aprovada). Vídeos 1–3 eram escuros (`#0e1114`/`#22e07a`).
- Ferramentas: cenas em **HyperFrames** (`motion/hf/`, GSAP pausado + `window.seek`, `npx hyperframes check` e `snapshot` para conferir); render final pelo `motion/render.mjs` (o render do HyperFrames recusa com disco quase cheio). Batida de **120 BPM** com `beats/batida.json` (batidas + cliques nos momentos-chave), mixada baixa sob a voz. Voz continua Sadaltager (não usar Fish Audio).
- **Mascote desenhado (aprovado)**: personagem de capuz em SVG feito em código, contorno preto grosso, moletom `#2c3238` com cordões verdes; partes separadas (cabeça, olhos, bocas, braço, mão) animadas com GSAP: respirar, piscar, apontar, boca no ritmo da fala. Grátis, sem IA de imagem/vídeo. Modelo: `motion/hf/teste-desenho/index.html`.
- Prancha + nota própria 8+ antes de mostrar. Som -14 LUFS. Render: no máximo 3 Chromes em paralelo.
- Thumbs: bem chamativas (fundo vibrante com raios e brilho, texto gigante com contorno, dinheiro/ícones) com o personagem realista de capuz, rosto escondido. Poses prontas (recortadas) em `canal/thumb-chamativa/capuz-poses/`; modelo em `video-07-shorts-sem-aparecer/publicar/thumb.html`. Poses novas: ChatGPT do Patrick pelo Chrome do PC.
- Postar: **Chrome do perfil "Valerio Explica"** (nunca o Quiz nem o Patrick; não trocar sem perguntar). Conferir o canal antes de agir. Sempre **"Não é conteúdo para crianças"**. Esperar a verificação de direitos autorais antes de Publicar. Shorts com "Vídeo relacionado" = vídeo longo.
- Economizar o plano: uma conversa por tarefa, ler páginas por texto, não repetir ações falhas — perguntar ao usuário.
