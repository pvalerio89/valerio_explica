// Roteiro de cenas do vídeo 2 (títulos e thumbnails). F(bloco, frase) = início da frase na grade.
// Blocos 4 a 8 entram quando a narração deles existir.
const MISSOES2 = ["ANTES DE GRAVAR", "A REGRA DA DUPLA", "A THUMB DE 1 SEGUNDO", "O TÍTULO HONESTO"];

montar([
  // ===================== BLOCO 1: gancho =====================
  { tipo: "feed", em: 0, linhas: [["ROLA A"], ["PÁGINA"], ["INICIAL.", 1]], paraEm: F(1, 2), segEm: F(1, 3) },
  { tipo: "linhas", em: F(1, 4), titulo: "O QUE VOCÊ NEM OLHOU", tam: 140, gap: 170, icone: "lupa", icX: 1320,
    itens: [
      { txt: "A DESCRIÇÃO", marca: "none", em: F(1, 4), riscaEm: F(1, 4) + 0.9 },
      { txt: "AS TAGS", marca: "none", em: F(1, 5), riscaEm: F(1, 5) + 0.7 },
      { txt: "OS INSCRITOS", marca: "none", em: F(1, 6), riscaEm: F(1, 6) + 0.9 },
      { txt: "IMAGEM + FRASE.", marca: "none", em: F(1, 7), ac: true, circuloEm: F(1, 7) + 1.25 },
    ] },
  { tipo: "icones", em: F(1, 8), titulo: "MILHARES DE VEZES POR DIA",
    itens: [{ icone: "celular", rotulo: "a página inicial", em: F(1, 8) + 0.3 }, { icone: "olho", rotulo: "a pessoa vê", em: F(1, 8) + 1.2 },
            { icone: "cronometro", rotulo: "menos de 1 s", em: F(1, 8) + 2.1, ac: true }, { icone: "clique", rotulo: "clica ou passa", em: F(1, 8) + 3.0 }] },
  { tipo: "titulo", em: F(1, 9), linhas: [["SE NÃO FUNCIONA,"], ["NINGUÉM ENTRA"], ["PRA VER.", 1]], tam: 170, lado: "x" },
  { tipo: "escada", em: F(1, 10), passos: [
      { em: F(1, 10) + 0.2, acao: "rotulo:NO VÍDEO 1:|A ESCADA" },
      { em: F(1, 10) + 0.6, acao: "degrau:2" }, { em: F(1, 10) + 0.9, acao: "degrau:3" }, { em: F(1, 10) + 1.2, acao: "degrau:4" },
      { em: F(1, 10) + 1.6, acao: "sobe:2" }, { em: F(1, 10) + 2.4, acao: "sobe:3" },
      { em: F(1, 11), acao: "deg1:título + thumb" }, { em: F(1, 11) + 0.1, acao: "rotulo:HOJE: O|1º DEGRAU" },
    ] },
  { tipo: "linhas", em: F(1, 12), titulo: "4 MISSÕES", tam: 112, numLado: true, numTam: 560, numTop: 300,
    itens: MISSOES2.map((m, k) => ({ txt: m, marca: "check", em: F(1, 13 + k), ac: k === 3, tag: k === 3 ? "A MAIS PERIGOSA" : null })) },

  // ===================== BLOCO 2: missão 1 =====================
  { tipo: "missao", em: F(2, 0), n: 1, linhas: ["ANTES DE", "GRAVAR"], sub: "a embalagem vem primeiro" },
  { tipo: "fluxos", em: F(2, 1), cab: "QUANDO VEM O TÍTULO?", tam: 84,
    linhas: [
      { rotulo: "A MAIORIA", em: F(2, 1), ate: F(2, 2), passos: [{ txt: "IDEIA" }, { txt: "GRAVA" }, { txt: "EDITA" }, { txt: "TÍTULO ÀS 23H 😩".replace(" 😩", "") }] },
      { rotulo: "OS GRANDES CANAIS", ac: true, em: F(2, 3), ate: F(2, 3) + 1.6, passos: [{ txt: "IDEIA" }, { txt: "EMBALAGEM", ac: true }, { txt: "GRAVA" }, { txt: "EDITA" }] },
    ] },
  { tipo: "vitrine", em: F(2, 4), modo: "grade", vazio: 4, pergunta: "como o seu vídeo vai aparecer aqui?",
    rotulos: [{ txt: "SEU VÍDEO", em: F(2, 4) + 2.5, x: 760, y: 560, tam: 52, ac: false }, { txt: "QUAL É A IMAGEM?", em: F(2, 5), x: 1180, y: 610, tam: 52 }, { txt: "QUAL É A FRASE?", em: F(2, 6), x: 1180, y: 700, tam: 52 }] },
  { tipo: "titulo", em: F(2, 7), linhas: [["SEM EMBALAGEM"], ["QUE DÁ VONTADE,"], ["MUDA A IDEIA.", 1]], tam: 160, sub: "ou nem faz o vídeo", icone: "imagem" },
  { tipo: "titulo", em: F(2, 9), linhas: [["A EMBALAGEM É"], ["O QUE O PÚBLICO"], ["VÊ PRIMEIRO.", 1]], tam: 160, icone: "olho" },
  { tipo: "titulo", em: F(2, 11), linhas: [["ESCREVE O TÍTULO."], ["DESENHA A THUMB."], ["ANTES DE GRAVAR.", 1]], tam: 150, icone: "texto", sub: "nem que seja um rabisco no papel",
    selo: { txt: "VOCÊ CLICARIA?", em: F(2, 12), x: 1080, y: 790, tam: 90 } },

  // ===================== BLOCO 3: missão 2 =====================
  { tipo: "missao", em: F(3, 0), n: 2, linhas: ["A REGRA", "DA DUPLA"], sub: "título + thumbnail" },
  { tipo: "vitrine", em: F(3, 1), thumb: { texto: "A THUMB" }, titulo: "E o título, do lado dela", x: 140, y: 150,
    rotulos: [{ txt: "APARECEM JUNTOS", em: F(3, 1) + 1.0, x: 1350, y: 420 }, { txt: "NÃO REPETEM", em: F(3, 2), x: 1350, y: 520, ac: false }] },
  { tipo: "vitrine", em: F(3, 3), cab: "O ERRO MAIS COMUM", thumb: { texto: "COMO FAZER PÃO CASEIRO", tam: 140 }, titulo: "Como fazer pão caseiro", x: 140, y: 230,
    rotulos: [{ txt: "NA THUMB", em: F(3, 3) + 2.5, x: 1350, y: 380, ac: false }, { txt: "NO TÍTULO", em: F(3, 3) + 5.0, x: 1350, y: 930, ac: false }],
    selo: { txt: "REPETIU", em: F(3, 4), x: 1330, y: 620 } },
  { tipo: "linhas", em: F(3, 5), titulo: "UMA DUPLA QUE SE COMPLETA", tam: 98, gap: 140, icone: "imagem", icX: 1430, icY: 300,
    itens: [
      { txt: "THUMB:", marca: "none", em: F(3, 5) + 0.3, ac: true },
      { txt: "CENA, EMOÇÃO, RESULTADO", marca: "seta", em: F(3, 6) },
      { txt: "TÍTULO:", marca: "none", em: F(3, 6) + 1.9, ac: true },
      { txt: "CONTEXTO OU PERGUNTA", marca: "seta", em: F(3, 7) },
    ] },
  { tipo: "vitrine", em: F(3, 8), cab: "O JEITO CERTO", thumb: { paes: true }, titulo: "O erro que estraga seu pão caseiro", x: 140, y: 230,
    rotulos: [{ txt: "PÃO PERFEITO", em: F(3, 8) + 1.6, x: 1350, y: 330, ac: false }, { txt: "PÃO QUEIMADO", em: F(3, 8) + 2.8, x: 1350, y: 430, ac: false }, { txt: "QUAL É O ERRO?", em: F(3, 9) + 0.6, x: 1350, y: 930 }],
    selo: { txt: "MINI-HISTÓRIA", em: F(3, 10), x: 1180, y: 640, tam: 88 } },
  { tipo: "vitrine", em: F(3, 11), cab: "O TESTE DA MÃO", thumb: { paes: true }, titulo: "O erro que estraga seu pão caseiro", x: 140, y: 230,
    tapa: [{ alvo: "titulo", em: F(3, 11) + 1.25 }, { alvo: "thumb", em: F(3, 12) + 0.3 }],
    rotulos: [{ txt: "JUNTOS DIZEM MAIS", em: F(3, 13), x: 1350, y: 500 }] },
  { tipo: "icones", em: F(3, 14), titulo: "RAPIDINHO:",
    itens: [{ icone: "inscrever", rotulo: "se inscreve", em: F(3, 14) + 0.3, ac: true },
            { icone: "lupa", rotulo: "pesquisado", em: F(3, 15) }, { icone: "calendario", rotulo: "estudado", em: F(3, 15) + 1.25 }] },
  { tipo: "titulo", em: F(3, 16), linhas: [["AGORA,"], ["A MISSÃO 3.", 1]], tam: 220 },
]);
