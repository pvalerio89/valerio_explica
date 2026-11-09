// Roteiro de cenas do vídeo 1 (a partir de 11,9 s; antes disso é a abertura.html).
// em: início da cena (tempo global, já na grade). F(bloco, frase) = início da frase na grade.
// Os tempos internos (checkEm, riscaEm, passos...) também são globais.
const MISSOES = ["COMO O YOUTUBE DECIDE", "INSCRITOS NÃO SALVAM", "O ERRO DOS 5 SEGUNDOS", "O VÍDEO-VIDEOGAME"];

montar([
  // ===================== BLOCO 1 =====================
  { tipo: "titulo", em: F(1, 7), linhas: [["O ALGORITMO"], ["RINDO DA"], ["SUA CARA.", 1]], lado: "ha" },
  { tipo: "titulo", em: F(1, 8), linhas: [["QUASE NINGUÉM"], ["TE CONTA ISSO:", 1]], tam: 190, icone: "interrogacao" },
  { tipo: "titulo", em: F(1, 8) + 3.75, linhas: [["O PROBLEMA"], ["NÃO É O SEU"], ["VÍDEO.", 1]], tam: 170, lado: "x", sub: "na maioria das vezes" },
  { tipo: "titulo", em: F(1, 9), linhas: [["VOCÊ JOGA COM"], ["AS REGRAS DE UM"], ["YOUTUBE QUE"], ["NÃO EXISTE MAIS.", 1]], tam: 130, icone: "controle" },
  { tipo: "contador", em: F(1, 10), rotulo: "NESSE VÍDEO", de: 0, ate: 4, legenda: "COISAS.", tam: 420, durConta: 0.8, ac: true },
  { tipo: "linhas", em: F(1, 11), titulo: "O QUE VOCÊ VAI VER", tam: 104, numLado: true, numTam: 560, numTop: 300,
    itens: MISSOES.map((m, k) => ({ txt: m, marca: "check", em: F(1, 11 + k), ac: k === 3, tag: k === 3 ? "MAIS IMPORTANTE" : null })) },
  { tipo: "titulo", em: F(1, 15), linhas: [["FICA ATÉ"], ["O FINAL.", 1]], tam: 210, sub: "a última parte muda o jeito de escrever roteiro", lado: "barra" },

  // ===================== BLOCO 2 =====================
  { tipo: "titulo", em: F(2, 0), linhas: [["COMO ERA"], ["ANTES.", 1]], tam: 230, sub: "o YouTube de alguns anos atrás", icone: "relogio" },
  { tipo: "linhas", em: F(2, 1), titulo: "O SISTEMA ANTIGO", tam: 110, gap: 140, numLado: true, numTam: 520, numTop: 330,
    itens: [
      { txt: "VOCÊ CONQUISTA INSCRITOS", marca: "seta", em: F(2, 1) },
      { txt: "POSTA UM VÍDEO", marca: "seta", em: F(2, 1) + 2.5 },
      { txt: "ELES RECEBEM O SININHO", marca: "seta", em: F(2, 1) + 5 },
      { txt: "E VÊM ASSISTIR", marca: "seta", em: F(2, 1) + 7.5, ac: true },
    ] },
  { tipo: "titulo", em: F(2, 2), linhas: [["+ INSCRITOS"], ["= + VIEWS.", 1]], tam: 220, sub: "simples assim", icone: "seta" },
  { tipo: "linhas", em: F(2, 4), titulo: "TODO MUNDO FALAVA", tam: 120,
    itens: [
      { txt: "“CRESÇA O NÚMERO", marca: "none", em: F(2, 4), riscaEm: F(2, 6) },
      { txt: "DE INSCRITOS”", marca: "none", em: F(2, 4) + 0.2, riscaEm: F(2, 6) + 0.2 },
      { txt: "CANAL GRANDE = VIEW GARANTIDA", marca: "none", em: F(2, 5), riscaEm: F(2, 6) + 0.4 },
    ] },
  { tipo: "linhas", em: F(2, 7), titulo: "O PROBLEMA", tam: 112, gap: 142, icone: "sino", icX: 1380,
    itens: [
      { txt: "CANAL ENORME", marca: "num", em: F(2, 7) },
      { txt: "POSTA UM VÍDEO FRACO", marca: "num", em: F(2, 7) + 2 },
      { txt: "MILHÕES CLICAM", marca: "num", em: F(2, 7) + 4 },
      { txt: "SE DECEPCIONAM…", marca: "num", em: F(2, 7) + 6, ac: true },
    ] },
  { tipo: "titulo", em: F(2, 8), linhas: [["E FECHAM O"], ["YOUTUBE.", 1]], tam: 220, lado: "x" },
  { tipo: "titulo", em: F(2, 9), linhas: [["O YOUTUBE QUER"], ["QUE VOCÊ"], ["FIQUE.", 1]], tam: 180, icone: "olho" },
  { tipo: "linhas", em: F(2, 10), titulo: "O NEGÓCIO DO YOUTUBE", tam: 140, gap: 175, numLado: true, numTam: 560, numTop: 280,
    itens: [
      { txt: "MAIS TEMPO", marca: "seta", em: F(2, 10) },
      { txt: "MAIS ANÚNCIOS", marca: "seta", em: F(2, 11) },
      { txt: "MAIS DINHEIRO", marca: "seta", em: F(2, 12), ac: true },
    ] },
  { tipo: "linhas", em: F(2, 13), titulo: "A PERGUNTA MUDOU", tam: 104, gap: 140,
    itens: [
      { txt: "QUEM É INSCRITO NESSE CANAL?", marca: "none", em: F(2, 13), riscaEm: F(2, 14) },
      { txt: "ESSE VÍDEO FAZ AS", marca: "none", em: F(2, 14) + 0.3, ac: true },
      { txt: "PESSOAS FICAREM AQUI?", marca: "none", em: F(2, 14) + 0.5, ac: true },
    ] },

  // ===================== BLOCO 3 =====================
  { tipo: "missao", em: F(3, 0), n: 1, linhas: ["COMO O YOUTUBE", "DECIDE QUEM VÊ"], sub: "quem vê o seu vídeo, e por quê" },
  { tipo: "citacao", em: F(3, 1), linhas: ["O ALGORITMO NÃO SEGUE", "VÍDEOS. ELE SEGUE", "PESSOAS."], destaque: ["PESSOAS"], autor: "o que a equipe do YouTube costuma repetir" },
  { tipo: "titulo", em: F(3, 2), linhas: [["ELE TENTA"], ["ADIVINHAR O QUE"], ["VOCÊ QUER VER.", 1]], tam: 170, icone: "alvo" },
  { tipo: "escada", em: F(3, 3), passos: [
      { em: F(3, 3) + 0.6, acao: "rotulo:VOCÊ POSTA.|GRUPO PEQUENO" },
      { em: F(3, 3) + 2.5, acao: "pessoas" }, { em: F(3, 3) + 4.375, acao: "rotulo:10 PESSOAS|VEEM PRIMEIRO" },
      { em: F(3, 4), acao: "medidores" },
      { em: F(3, 4) + 0.1, acao: "rotulo:ELE MEDE|DUAS COISAS" },
      { em: F(3, 5), acao: "degrau:2" }, { em: F(3, 5) + 0.6, acao: "sobe:2" },
      { em: F(3, 5) + 0.1, acao: "rotulo:FOI BEM?|GRUPO MAIOR" },
      { em: F(3, 6), acao: "degrau:3" }, { em: F(3, 6) + 0.6, acao: "sobe:3" }, { em: F(3, 6) + 1.2, acao: "degrau:4" },
      { em: F(3, 7), acao: "rotulo:É UMA|ESCADA." },
      { em: F(3, 8), acao: "falha" }, { em: F(3, 8) + 0.1, acao: "rotulo:NÃO CLICOU?|A ESCADA PARA." },
      { em: F(3, 9), acao: "setenta" }, { em: F(3, 9) + 0.1, acao: "rotulo:AQUI NASCE|O VÍDEO DE 70." },
    ] },
  { tipo: "titulo", em: F(3, 10), linhas: [["NÃO É"], ["CASTIGO.", 1]], tam: 240, impacto: true },
  { tipo: "citacao", em: F(3, 11), linhas: ["TESTEI, E AS PESSOAS", "NÃO FICARAM."], destaque: ["FICARAM"], autor: "o YouTube, basicamente", tam: 140 },
  { tipo: "duelo", em: F(3, 12), topo: "MESMO CANAL, MESMA SEMANA",
    lados: [
      { titulo: "Vídeo A", valor: { de: 0, ate: 214, em: F(3, 12) + 1.0, dur: 1.2 }, sub: "visualizações", em: F(3, 12) + 0.6 },
      { titulo: "Vídeo B", valor: { de: 0, ate: 1200000, em: F(3, 12) + 3.0, dur: 1.6, fmt: "mi" }, sub: "visualizações", em: F(3, 12) + 2.6, ac: true },
    ] },
  { tipo: "titulo", em: F(3, 13), linhas: [["CADA VÍDEO SOBE"], ["A ESCADA"], ["SOZINHO.", 1]], tam: 170, icone: "escada" },
  { tipo: "titulo", em: F(3, 14), linhas: [["MUITO PARECIDO"], ["COM O TIKTOK.", 1]], tam: 170, icone: "play" },
  { tipo: "contador", em: F(3, 15), rotulo: "CANAL COM 0 INSCRITOS, PRIMEIRO VÍDEO", de: 0, ate: 1000000, contaEm: F(3, 15) + 1.25, durConta: 2.2, legenda: "VIEWS. É POSSÍVEL.", tam: 330, barras: true },

  // ===================== BLOCO 4 =====================
  { tipo: "missao", em: F(4, 0), n: 2, linhas: ["INSCRITOS", "NÃO SALVAM"], sub: "por que eles não garantem views" },
  { tipo: "escada", em: F(4, 1), passos: [
      { em: F(4, 1) + 0.2, acao: "rotulo:LEMBRA DA|ESCADA?" },
      { em: F(4, 1) + 0.5, acao: "degrau:2" }, { em: F(4, 1) + 0.8, acao: "degrau:3" }, { em: F(4, 1) + 1.1, acao: "degrau:4" },
      { em: F(4, 2), acao: "inscritos" }, { em: F(4, 2) + 0.3, acao: "pessoas" }, { em: F(4, 2) + 0.1, acao: "rotulo:1º DEGRAU:|SEUS INSCRITOS" },
      { em: F(4, 3), acao: "rotulo:ELES CONFIAM|EM VOCÊ." },
      { em: F(4, 4), acao: "sobe:2" }, { em: F(4, 4) + 1.2, acao: "sobe:3" }, { em: F(4, 4) + 0.1, acao: "desconhecidos" },
      { em: F(4, 4) + 0.2, acao: "rotulo:DEPOIS:|DESCONHECIDOS." },
    ] },
  { tipo: "linhas", em: F(4, 5), titulo: "PRO DESCONHECIDO", tam: 150, gap: 180, icone: "pessoa",
    itens: [
      { txt: "SEUS INSCRITOS", marca: "none", em: F(4, 5), riscaEm: F(4, 5) + 1.4 },
      { txt: "NÃO IMPORTAM.", marca: "none", em: F(4, 5) + 1.8, ac: true },
    ] },
  { tipo: "feed", em: F(4, 6), linhas: [["ELE SÓ VÊ"], ["TÍTULO E"], ["THUMBNAIL.", 1]], paraEm: F(4, 7) - 0.4, segEm: F(4, 7) },
  { tipo: "titulo", em: F(4, 8), linhas: [["DEPOIS DO CLIQUE,"], ["O VÍDEO PRECISA"], ["SEGURAR.", 1]], tam: 160, icone: "relogio" },
  { tipo: "linhas", em: F(4, 9), titulo: "A CONTA", tam: 140, gap: 180,
    itens: [
      { txt: "TÍTULO + THUMB = CLIQUE", marca: "none", em: F(4, 9) },
      { txt: "VÍDEO = FICAR", marca: "none", em: F(4, 10), ac: true },
      { txt: "UM FALHA? A ESCADA PARA.", marca: "none", em: F(4, 11) },
    ] },
  { tipo: "linhas", em: F(4, 12), titulo: "ONDE O TEMPO VAI", tam: 140, gap: 170,
    itens: [
      { txt: "TAGS", marca: "none", em: F(4, 12) + 0.2, riscaEm: F(4, 13) },
      { txt: "HORÁRIO PERFEITO", marca: "none", em: F(4, 12) + 2.5, riscaEm: F(4, 13) + 0.3 },
      { txt: "DESCRIÇÃO LONGA", marca: "none", em: F(4, 12) + 4.0, riscaEm: F(4, 13) + 0.6 },
      { txt: "O VÍDEO. É O PRODUTO.", marca: "none", em: F(4, 14), ac: true, circuloEm: F(4, 15) },
    ] },

  // ===================== BLOCO 5 =====================
  { tipo: "missao", em: F(5, 0), n: 3, linhas: ["O ERRO DOS", "5 SEGUNDOS"], sub: "o que trava os canais pequenos" },
  { tipo: "duelo", em: F(5, 2), topo: "PENSA NUM VIDEOGAME",
    lados: [
      { titulo: "Jogo bom: tutorial", valor: { de: 0, ate: 5, em: F(5, 2), dur: 1.0, fmt: "tempo" }, sub: "você já sabe por que continuar", em: F(5, 2), barra: { em: F(5, 2) + 0.2, dur: 1.0 }, carimbo: { txt: "JOGAR ▶", em: F(5, 3) }, ac: true },
      { titulo: "Jogo ruim: tutorial", valor: { de: 0, ate: 900, em: F(5, 4), dur: 3.8, fmt: "tempo", lin: true }, sub: "instrução, instrução, instrução…", em: F(5, 4), barra: { em: F(5, 4), dur: 6, ate: 0.12, lin: true }, carimbo: { txt: "DESISTI", em: F(5, 5) } },
    ] },
  { tipo: "titulo", em: F(5, 6), linhas: [["TODO MUNDO"], ["DESISTE.", 1]], tam: 230, lado: "x" },
  { tipo: "titulo", em: F(5, 7), linhas: [["A INTRODUÇÃO"], ["É O TUTORIAL"], ["DO JOGO.", 1]], tam: 170, icone: "controle" },
  { tipo: "titulo", em: F(5, 8), linhas: [["É AÍ QUE A"], ["MAIORIA TRAVA.", 1]], tam: 190, icone: "interrogacao" },
  { tipo: "bolhas", em: F(5, 9), falas: ["Fala galera, tudo bem?", "Antes de começar…", "deixa o like", "se inscreve", "ativa o sininho", "hoje o vídeo é sobre…"], fimEm: F(5, 11), fim: "A PESSOA JÁ FOI EMBORA." },
  { tipo: "linhas", em: F(5, 12), titulo: "UMA BOA INTRO FAZ 3 COISAS", tam: 140, gap: 180, numLado: true, numIni: 3, numTam: 560, numTop: 280,
    itens: [
      { txt: "MOSTRA A PROMESSA", marca: "num", em: F(5, 13) },
      { txt: "DÁ MOTIVO PRA FICAR", marca: "num", em: F(5, 14) },
      { txt: "VAI DIRETO AO PONTO", marca: "num", em: F(5, 15), ac: true },
    ] },
  { tipo: "linhas", em: F(5, 16), titulo: "REPARA: FOI O QUE EU FIZ NO COMEÇO", tam: 104,
    itens: MISSOES.map((m, k) => ({ txt: m, marca: "check", em: F(5, 16) + 0.3 + k * 0.5, checkEm: k < 2 ? F(5, 16) : k === 2 ? F(5, 16) + 4 : null, ac: k === 3, tag: k === 3 ? "A ÚLTIMA É A MAIS IMPORTANTE" : null })) },
  { tipo: "titulo", em: F(5, 17), linhas: [["VOCÊ AINDA"], ["ESTÁ AQUI.", 1]], tam: 230, icone: "olho" },

  // ===================== BLOCO 6 =====================
  { tipo: "missao", em: F(6, 0), n: 4, linhas: ["O VÍDEO-", "VIDEOGAME"], sub: "a mais importante" },
  { tipo: "jogo", em: F(6, 1), cab: "MISSÕES (1)", linhas: [["UM JOGO COM"], ["UMA MISSÃO SÓ?", 1]],
    missoes: [{ txt: "DERROTE O CHEFÃO", em: F(6, 1) + 2.5 }], sairEm: F(6, 3), linhas2Em: F(6, 3), linhas2: [["NINGUÉM"], ["JOGA ISSO.", 1]] },
  { tipo: "jogo", em: F(6, 4), cab: "MISSÕES", moedas: true, linhas: [["O QUE PRENDE"], ["É A SEQUÊNCIA.", 1]],
    missoes: [
      { txt: "MATE 10 ZUMBIS", em: F(6, 4) + 0.6, ok: F(6, 4) + 2.6, rec: "+50", moedas: 50 },
      { txt: "DERROTE 10 BRUXAS", em: F(6, 5), ok: F(6, 5) + 1.6, rec: "+80", moedas: 80 },
      { txt: "MAIS UMA…", em: F(6, 6), ok: F(6, 6) + 1.2, rec: "+120", moedas: 120 },
      { txt: "CHEFÃO", em: F(6, 7) - 0.4 },
    ], linhas2Em: F(6, 7), linhas2: [["E PASSARAM"], ["3 HORAS.", 1]] },
  { tipo: "retencao", em: F(6, 8), titulo: "PROMESSA SÓ NO FINAL", rotuloRuim: "a pessoa sai no meio", ruimEm: F(6, 11),
    marcos: [{ em: F(6, 8) + 2.5, txt: "promessa", x: 0, y: -10, ac: true }, { em: F(6, 8) + 4.375, txt: "entrega", x: 1440, y: 440, ac: true }, { em: F(6, 9), txt: "UMA MISSÃO SÓ", x: 700, y: 170 }],
    faixa: { em: F(6, 10), x0: 380, x1: 1180, txt: "nada puxando pra frente" } },
  { tipo: "linhas", em: F(6, 12), titulo: "NO VÍDEO-VIDEOGAME", tam: 128, gap: 160,
    itens: [
      { txt: "OS PAPÉIS SE INVERTEM:", marca: "none", em: F(6, 12) + 0.4 },
      { txt: "O ESPECTADOR = JOGADOR", marca: "none", em: F(6, 13) },
      { txt: "VOCÊ = QUEM DÁ", marca: "none", em: F(6, 14), ac: true },
      { txt: "AS MISSÕES", marca: "none", em: F(6, 14) + 0.25, ac: true },
    ] },
  { tipo: "retencao", em: F(6, 15), titulo: "MISSÕES DO COMEÇO AO FIM", rotuloRuim: "uma missão só", ruimEm: F(6, 15) + 0.2, bomEm: F(6, 15) + 1.2, rotuloBom: "missões o tempo todo" },

  // ===================== BLOCO 7 =====================
  { tipo: "linhas", em: F(7, 0), titulo: "UMA MISSÃO É", tam: 130, gap: 175,
    itens: [
      { txt: "PROBLEMA → SOLUÇÃO", marca: "none", em: F(7, 0) + 0.4, ac: true },
      { txt: "PERGUNTA → RESPOSTA", marca: "none", em: F(7, 1) },
      { txt: "CURIOSIDADE → REVELAÇÃO", marca: "none", em: F(7, 2) },
    ] },
  { tipo: "mapa", em: F(7, 3), titulo: "EXEMPLO: MACARRÃO", preEm: F(7, 5),
    fases: [
      { txt: "A MASSA GRUDA?", em: F(7, 6), ok: F(7, 8) },
      { txt: "INGREDIENTE SECRETO", em: F(7, 9), ok: F(7, 10) },
      { txt: "ERRO AO ESCORRER", em: F(7, 11), ok: F(7, 12) },
      { txt: "PRATO PRONTO: O CHEFÃO", em: F(7, 4) },
    ] },
  { tipo: "ciclo", em: F(7, 13), titulo: ["O CICLO QUE", "PRENDE"],
    nos: [{ txt: "PERGUNTA", em: F(7, 13) + 0.3 }, { txt: "CURIOSIDADE", em: F(7, 13) + 1.6 }, { txt: "RESPOSTA", em: F(7, 14) }, { txt: "RECOMPENSA", em: F(7, 14) + 1.6 }],
    loopEm: F(7, 15) },
  { tipo: "linhas", em: F(7, 16), titulo: "ESSE VÍDEO FOI MONTADO ASSIM", tam: 104,
    itens: MISSOES.map((m, k) => ({ txt: m, marca: "check", em: F(7, 16) + 0.3 + k * 0.4, checkEm: F(7, 17) + k * 0.6, ac: k === 3 })) },
  { tipo: "titulo", em: F(7, 18), linhas: [["FOI ISSO QUE"], ["TE TROUXE"], ["ATÉ AQUI.", 1]], tam: 180, icone: "seta" },
  { tipo: "papel", em: F(7, 19), linhas: [["ANTES DE GRAVAR,"], ["LISTE AS"], ["MISSÕES.", 1]], tagEm: F(7, 20),
    linhas2Em: F(7, 21), linhas2: [["NINGUÉM FICA"], ["NUM JOGO"], ["ASSIM.", 1]] },

  // ===================== BLOCO 8 =====================
  { tipo: "titulo", em: F(8, 0), linhas: [["RECAPITULANDO."]], tam: 220, icone: "check" },
  { tipo: "linhas", em: F(8, 1), titulo: "RESUMO", tam: 96, gap: 128,
    itens: [
      { txt: "O YOUTUBE TESTA CADA VÍDEO", marca: "check", em: F(8, 1), checkEm: F(8, 2) },
      { txt: "INSCRITO = SÓ O 1º DEGRAU", marca: "check", em: F(8, 3), checkEm: F(8, 3) + 1.2 },
      { txt: "TÍTULO + THUMB TRAZEM, O VÍDEO SEGURA", marca: "check", em: F(8, 4), checkEm: F(8, 4) + 1.2 },
      { txt: "INTRO = TUTORIAL RÁPIDO", marca: "check", em: F(8, 5), checkEm: F(8, 5) + 1.2 },
      { txt: "VÁRIAS MISSÕES, NÃO UMA SÓ", marca: "check", em: F(8, 6), checkEm: F(8, 6) + 1.0, ac: true },
    ] },
  { tipo: "contador", em: F(8, 7), rotulo: "SEU ÚLTIMO VÍDEO TRAVOU EM", de: 0, ate: 70, durConta: 0.9, legenda: "NÃO DESISTE.", legEm: F(8, 7) + 1.6, tam: 420 },
  { tipo: "titulo", em: F(8, 8), linhas: [["NÃO FOI FRACASSO."], ["FOI UM TESTE.", 1]], tam: 160, passo: 0.9, icone: "escada" },
  { tipo: "titulo", em: F(8, 10), linhas: [["AGORA VOCÊ SABE"], ["O QUE ELE MEDE.", 1]], tam: 160, icone: "olho" },
  { tipo: "titulo", em: F(8, 11), linhas: [["PRÓXIMO VÍDEO:"], ["TÍTULOS E"], ["THUMBNAILS.", 1]], tam: 170, sub: "a outra metade da escada", icone: "play" },
  { tipo: "fim", em: F(8, 12), botaoEm: F(8, 12) + 2.0 },
]);
