# Valerio Explica

Tudo que faz os vídeos do canal **Valerio Explica** (roteiros, cenas animadas, mascote, thumbs e textos de publicação).

## Onde fica cada coisa
- `CLAUDE.md` — estilo e regras do canal (o Claude lê isso antes de trabalhar).
- `canal/` — foto, banner, mascote e modelo das thumbs.
- `video-NN-.../` — um vídeo por pasta: `roteiro.md`, `gerar_voz.py` e `publicar/` (título, descrição, thumbnail).
- `motion/` — as animações. `motion/hf/vNN/` são as cenas no HyperFrames; `render.mjs` gera o vídeo; `audio_vNN.py` faz a batida e mistura com a voz.
- `gemini_voz.py` — narração com a voz Sadaltager (Gemini).

## Vídeos e áudios
Arquivos `.mp4` e `.wav` **não** ficam no código (são grandes demais). O vídeo final, a narração e a thumbnail de cada vídeo ficam na aba **Releases** do repositório, uma por vídeo (`video-01`, `video-02`, ...).

## Chaves
Nenhuma senha ou chave fica aqui. A chave do Gemini e o acesso ao YouTube ficam em **Settings → Secrets and variables → Actions**.
