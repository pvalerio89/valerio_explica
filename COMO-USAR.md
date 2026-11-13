# Como usar o Valerio Explica no GitHub

## Configurar uma vez
Tudo em **Settings → Secrets and variables → Actions** deste repositório.

1. **Voz:** Secret `GEMINI_API_KEY` = a mesma chave do `.env` do PC (`C:\Users\pvale\.config\watch\.env`).
2. **YouTube:** use o mesmo app do Google que o Quiz Palito já usa.
   - Variable `YT_CLIENT_ID` e Secret `YT_CLIENT_SECRET`: os mesmos valores do Quiz Palito (estão no Google Cloud, em APIs e serviços → Credenciais).
   - Se o app do Google estiver em modo "Teste", adicione a conta do Valerio Explica em "Usuários de teste".
3. **Autorizar o canal:** aba **Actions → Autorizar YouTube → Run workflow** (campo vazio). Abra o link do log, entre na conta do **Valerio Explica** e aceite. A página final não abre: copie o endereço inteiro, rode de novo colando no campo e salve o valor que aparecer como Secret `YT_REFRESH_TOKEN`. Depois apague essa execução.

## No dia a dia
1. **Criar:** peça ao Claude o vídeo novo. Ele escreve o roteiro (`video-NN-tema/roteiro.md`), as cenas (`motion/hf/vNN/`) e o texto de publicação, e manda para cá.
2. **Gerar:** Actions → **Gerar vídeo** → pasta `video-NN-tema`.
   - `previa`: gera a narração e uma prancha com um quadro a cada 15 s (em Actions → a execução → Artifacts).
   - `completo`: gera o vídeo final (leva uns 30 a 60 min) e guarda na Release `video-NN`.
3. **Postar:** Actions → **Enviar ao YouTube** → pasta `video-NN-tema` → `publico` (padrão), `privado` ou `agendado` (com data e hora de Brasília). O link fica anotado no `publicados.json`.
   - **Short:** mesmo workflow, preencha `short` com o número (1, 2...). O arquivo `short-N.mp4` fica em `video-NN-tema/shorts/` (pode ir no repositório) e o título/descrição no bloco `SHORT N` de `shorts/titulos.txt`. Se a descrição tiver `LINK_DO_VIDEO_LONGO`, vira o link do vídeo longo sozinho.
   - O "Vídeo relacionado" do Short a API do YouTube não deixa pôr: coloque depois no Studio (ou peça ao Claude pelo Chrome do PC).

### Tudo de uma vez
Actions → **Gerar e publicar** → pasta `video-NN-tema` (e, se quiser, `shorts` = `1,2`). Ele gera o vídeo (se ainda não estiver na Release), posta público no YouTube e depois os Shorts. É o que o Claude dispara quando você pede "faz e posta".

## Bom saber
- Repositório privado no plano grátis: 2.000 minutos de Actions por mês, e cada minuto em Windows conta como 2. Dá para uns 8 a 10 vídeos completos por mês.
- A voz do Gemini grátis tem 10 pedidos por dia. A narração fica guardada na Release, então gerar de novo não gasta a cota.
- Vídeos antigos (1 a 6) continuam no PC/OneDrive e no YouTube. Os novos ficam nas Releases daqui.
