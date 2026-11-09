// Roteiro de tomadas do vídeo 2. Cada tomada = um grupo de janelas numa área local de ~2000 x 1000.
// A câmera desliza para o grupo em "ini" e enquadra todas as janelas dele.
// Tempos sempre presos à fala: F(bloco, frase) = início da frase; P(bloco, frase, "palavra") = início da palavra.
// Números que aparecem como exemplo (contadores, barras) são ilustrativos.
import PAL from "./palavras.json";

const norm = (w) => w.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
const F = (b, f) => {
  const p = PAL.palavras.find((x) => x.b === b && x.f === f);
  if (!p) throw new Error(`frase ${b}.${f} não existe`);
  return p.ini;
};
const P = (b, f, palavra) => {
  const alvo = norm(palavra);
  const p = PAL.palavras.find((x) => x.b === b && x.f === f && norm(x.w).startsWith(alvo));
  if (!p) throw new Error(`palavra "${palavra}" não está na frase ${b}.${f}`);
  return p.ini;
};

// layouts (coordenadas locais do grupo)
const solo = (w = 1500, h = 800) => ({ x: (2000 - w) / 2, y: (1000 - h) / 2, w, h });
const duo = (w1, w2, h1, h2 = h1) => {
  const x0 = (2000 - (w1 + 80 + w2)) / 2;
  return [{ x: x0, y: (1000 - h1) / 2, w: w1, h: h1 }, { x: x0 + w1 + 80, y: (1000 - h2) / 2, w: w2, h: h2 }];
};
const pilha = (w, h1, h2) => [{ x: (2000 - w) / 2, y: (1000 - h1 - 60 - h2) / 2, w, h: h1 }, { x: (2000 - w) / 2, y: (1000 - h1 - 60 - h2) / 2 + h1 + 60, w, h: h2 }];
const trio = (wg = 1000, hg = 820, wp = 760, hp = 380) => {
  const x0 = (2000 - (wg + 80 + wp)) / 2, y0 = (1000 - hg) / 2;
  return [{ x: x0, y: y0, w: wg, h: hg }, { x: x0 + wg + 80, y: y0, w: wp, h: hp }, { x: x0 + wg + 80, y: y0 + hg - hp, w: wp, h: hp }];
};
const T = (ini, janelas) => ({ ini, janelas });

export const TOMADAS = [
  // ============ BLOCO 1: gancho ============
  T(0, [{ tipo: "feed", titulo: "Página inicial", em: 0.6, para: P(1, 2, "para"), ...solo(1300, 820) }]),
  T(F(1, 3) - 0.25, [{ tipo: "icone", titulo: "Por quê?", em: F(1, 3) - 0.1, icone: "interrogacao", texto: "por quê?", ...solo(700, 620) }]),
  T(F(1, 4) - 0.4, (() => { const [a, b, c] = trio(860, 820, 760, 380); return [
    { tipo: "lista", titulo: "Descrição", em: F(1, 4) - 0.2, riscada: P(1, 4, "descri") + 0.3, marca: "none", itens: [{ txt: "Assista até o fim…", em: F(1, 4) }, { txt: "Links e redes", em: F(1, 4) + 0.2 }, { txt: "Capítulos", em: F(1, 4) + 0.4 }], tam: 52, ...a },
    { tipo: "fluxo", titulo: "Tags", em: F(1, 5) - 0.3, riscada: P(1, 5, "tags") + 0.3, passos: [{ txt: "#dicas", em: F(1, 5) - 0.1 }, { txt: "#viral", em: F(1, 5) + 0.1 }], tam: 46, ...b },
    { tipo: "contador", titulo: "Inscritos", em: F(1, 6) - 0.3, riscada: P(1, 6, "inscritos") + 0.4, icone: "pessoa", ate: 12483, tam: 96, ...c },
  ]; })()),
  T(F(1, 7) - 0.3, (() => { const [a, b] = duo(1000, 620, 820, 560); return [
    { tipo: "mock", titulo: "O que a pessoa vê", em: F(1, 7) - 0.1, thumb: { destaque: true }, rotulos: [{ txt: "imagem pequena", em: P(1, 7, "pequena"), x: 520, y: 60 }, { txt: "frase curta", em: P(1, 7, "curta"), x: 520, y: 600 }], ...a, tituloVideo: "O título do seu vídeo" },
    { tipo: "icone", titulo: "Decisão", em: P(1, 7, "decidiu") - 0.3, icone: "cronometro", texto: "< 1 segundo", sans: true, ac: true, tam: 70, ...b },
  ]; })()),
  T(F(1, 8) - 0.2, (() => { const [a, b] = duo(780, 780, 600); return [
    { tipo: "icone", titulo: "Seu vídeo", em: F(1, 8), icone: "olho", texto: "milhares de vezes por dia", ...a },
    { tipo: "icone", titulo: "Se não funciona", em: F(1, 9), icone: "imagem", texto: "ninguém entra pra descobrir", riscada: P(1, 9, "ninguem") + 0.2, ...b },
  ]; })()),
  T(F(1, 10) - 0.2, [{ tipo: "escada", titulo: "No vídeo 1: a escada", em: F(1, 10), sobe: [F(1, 10) + 1.3, F(1, 10) + 2.2, F(1, 11) + 1.6], rotulo1: "título + thumb", rotulo1Em: F(1, 11), ...solo(1400, 780) }]),
  T(F(1, 12) - 0.2, [{ tipo: "lista", titulo: "4 missões", em: F(1, 12), marca: "num", tam: 66,
    itens: [{ txt: "O QUE FAZER ANTES DE GRAVAR", em: F(1, 13) }, { txt: "A REGRA DA DUPLA", em: F(1, 14) }, { txt: "A THUMB DE 1 SEGUNDO", em: F(1, 15) },
      { txt: "O TÍTULO HONESTO", em: F(1, 16), ac: true, tag: "a mais perigosa" }], ...solo(1500, 640) }]),

  // ============ BLOCO 2: missão 1 ============
  T(F(2, 0) - 0.2, [{ tipo: "missao", titulo: "ANTES DE GRAVAR", em: F(2, 0), n: 1, ...solo(1400, 520) }]),
  T(F(2, 1) - 0.2, (() => { const [a, b] = pilha(1800, 330, 330); return [
    { tipo: "fluxo", titulo: "A maioria", em: F(2, 1), passos: [{ txt: "IDEIA", em: F(2, 1) + 0.3 }, { txt: "GRAVA", em: P(2, 1, "grava") }, { txt: "EDITA", em: P(2, 1, "edita") }, { txt: "TÍTULO ÀS 23H", em: F(2, 2) }], ...a },
    { tipo: "fluxo", titulo: "Os grandes canais", em: F(2, 3), passos: [{ txt: "IDEIA", em: F(2, 3) + 0.3 }, { txt: "EMBALAGEM", em: F(2, 4), ac: true }, { txt: "GRAVA", em: F(2, 4) + 0.6 }, { txt: "EDITA", em: F(2, 4) + 0.9 }], ...b },
  ]; })()),
  T(F(2, 5) - 0.3, (() => { const [a, b, c] = trio(1000, 820, 760, 380); return [
    { tipo: "feed", titulo: "Página inicial", em: F(2, 5) - 0.2, para: F(2, 5) + 0.6, ...a },
    { tipo: "icone", titulo: "A imagem", em: F(2, 5), icone: "imagem", texto: "qual é a imagem?", lado: true, tam: 54, ...b },
    { tipo: "icone", titulo: "A frase", em: F(2, 6), icone: "texto", texto: "qual é a frase?", lado: true, tam: 54, ...c },
  ]; })()),
  T(F(2, 7) - 0.2, (() => { const [a, b] = duo(900, 760, 560); return [
    { tipo: "texto", titulo: "Sem vontade de clicar?", em: F(2, 7), txt: "muda a ideia.", sobre: "os grandes canais…", ...a },
    { tipo: "texto", titulo: "Ou…", em: F(2, 8), txt: "nem faz o vídeo.", ac: true, ...b },
  ]; })()),
  T(F(2, 9) - 0.2, (() => { const [a, b] = duo(820, 820, 620); return [
    { tipo: "icone", titulo: "O público", em: F(2, 9), icone: "olho", texto: "a embalagem vem primeiro", ...a },
    { tipo: "icone", titulo: "O resto", em: F(2, 10), icone: "imagem", texto: "nem tem chance", riscada: F(2, 10) + 0.9, ...b },
  ]; })()),
  T(F(2, 11) - 0.2, (() => { const [a, b] = duo(1000, 640, 600, 420); return [
    { tipo: "lista", titulo: "Antes de gravar", em: F(2, 11), marca: "check", tam: 62,
      itens: [{ txt: "escreve o título", em: P(2, 11, "escreve"), check: P(2, 11, "escreve") + 0.8 }, { txt: "desenha a thumb", em: P(2, 11, "desenha"), check: P(2, 11, "desenha") + 0.8 }, { txt: "nem que seja um rabisco", em: P(2, 11, "rabisco") }], ...a },
    { tipo: "texto", titulo: "O teste", em: F(2, 12), txt: "você clicaria?", ac: true, tam: 100, ...b },
  ]; })()),

  // ============ BLOCO 3: missão 2 ============
  T(F(3, 0) - 0.2, [{ tipo: "missao", titulo: "A REGRA DA DUPLA", em: F(3, 0), n: 2, ...solo(1400, 520) }]),
  T(F(3, 1) - 0.2, [{ tipo: "mock", titulo: "Página inicial", em: F(3, 1), thumb: { texto: "A THUMB", tam: 110 },
    rotulos: [{ txt: "aparecem juntos", em: F(3, 1) + 1.2, x: 760, y: 470 }, { txt: "não repetem", em: F(3, 2), x: 760, y: 560, ac: false }], ...solo(1100, 820), tituloVideo: "E o título, do lado dela" }]),
  T(F(3, 3) - 0.2, [{ tipo: "mock", titulo: "O erro mais comum", em: F(3, 3), thumb: { texto: "COMO FAZER PÃO CASEIRO", tam: 96 },
    rotulos: [{ txt: "na thumb", em: P(3, 3, "thumbnail"), x: 820, y: 120, ac: false }, { txt: "no título", em: P(3, 3, "titulo"), x: 820, y: 600, ac: false }],
    selo: { txt: "REPETIU", em: F(3, 4), x: 640, y: 300 }, ...solo(1100, 820), tituloVideo: "Como fazer pão caseiro" }]),
  T(F(3, 5) - 0.2, (() => { const [a, b] = duo(820, 820, 520); return [
    { tipo: "texto", titulo: "Thumbnail", em: F(3, 5) + 0.3, txt: "mostra", sobre: "a imagem…", depois: "cena · emoção · resultado", depoisEm: F(3, 6), ...a },
    { tipo: "texto", titulo: "Título", em: F(3, 7) - 0.3, txt: "explica", sobre: "a frase…", depois: "contexto ou pergunta", depoisEm: F(3, 7) + 0.4, ...b },
  ]; })()),
  T(F(3, 8) - 0.2, [{ tipo: "mock", titulo: "O jeito certo", em: F(3, 8), thumb: { paes: true },
    rotulos: [{ txt: "pão perfeito", em: P(3, 8, "perfeito"), x: 120, y: 470, ac: false }, { txt: "pão queimado", em: P(3, 8, "queimado"), x: 600, y: 470, ac: false }, { txt: "qual é o erro?", em: F(3, 9) + 0.6, x: 640, y: 640 }],
    selo: { txt: "MINI-HISTÓRIA", em: F(3, 10), x: 560, y: 40, tam: 60 }, ...solo(1100, 820), tituloVideo: "O erro que estraga seu pão caseiro" }]),
  T(F(3, 11) - 0.2, (() => { const [a, b] = duo(1000, 620, 820, 420); return [
    { tipo: "mock", titulo: "O teste da mão", em: F(3, 11), thumb: { paes: true }, tapa: [{ alvo: "titulo", em: F(3, 11) + 1.0 }, { alvo: "thumb", em: F(3, 12) + 0.2 }], ...a, tituloVideo: "O erro que estraga seu pão caseiro" },
    { tipo: "texto", titulo: "Juntos", em: F(3, 13), txt: "dizem mais.", ac: true, tam: 100, ...b },
  ]; })()),
  T(F(3, 14) - 0.2, (() => { const [a, b, c] = trio(960, 760, 760, 350); return [
    { tipo: "inscreva", titulo: "Rapidinho", em: F(3, 14), ...a },
    { tipo: "icone", titulo: "Cada vídeo", em: P(3, 15, "pesquisado"), icone: "lupa", texto: "pesquisado", lado: true, tam: 54, ...b },
    { tipo: "icone", titulo: "Cada vídeo", em: P(3, 15, "estudado"), icone: "barras", texto: "estudado", lado: true, tam: 54, ...c },
  ]; })()),

  // ============ BLOCO 4: missão 3 ============
  T(F(4, 0) - 0.2, [{ tipo: "missao", titulo: "A THUMB DE 1 SEGUNDO", em: F(4, 0), n: 3, tam: 92, ...solo(1500, 520) }]),
  T(F(4, 1) - 0.2, (() => { const [a, b] = duo(640, 900, 560, 760); return [
    { tipo: "icone", titulo: "A decisão", em: F(4, 1), icone: "cronometro", texto: "< 1 segundo", sans: true, ac: true, tam: 70, ...a },
    { tipo: "celular", titulo: "Onde assistem", em: F(4, 2), ...b },
  ]; })()),
  T(F(4, 3) - 0.2, [{ tipo: "celular", titulo: "Na tela do celular", em: F(4, 3), encolheEm: P(4, 3, "selo") - 0.8, ...solo(1300, 800) }]),
  T(F(4, 4) - 0.2, (() => { const [a, b] = duo(1000, 640, 620, 520); return [
    { tipo: "lista", titulo: "Faz o teste agora", em: F(4, 4), marca: "check", tam: 60,
      itens: [{ txt: "abre a última thumb", em: P(4, 4, "abre"), check: P(4, 4, "abre") + 0.9 }, { txt: "diminui bem", em: P(4, 4, "diminui"), check: P(4, 4, "diminui") + 0.9 },
        { txt: "dá pra entender?", em: F(4, 5) }, { txt: "dá pra ler o texto?", em: F(4, 6) }], ...a },
    { tipo: "mock", titulo: "Sua thumb", em: F(4, 4) + 0.6, thumb: { texto: "MEU VÍDEO NOVO", tam: 70 }, ...b, tituloVideo: "" },
  ]; })()),
  T(F(4, 7) - 0.2, [{ tipo: "texto", titulo: "Se não dá…", em: F(4, 7), txt: "não está funcionando.", depois: "pra maior parte do seu público", depoisEm: P(4, 7, "maior"), ...solo(1300, 520) }]),
  T(F(4, 8) - 0.2, [{ tipo: "lista", titulo: "3 regras dos grandes canais", em: F(4, 8), marca: "num", tam: 76, previaEm: P(4, 8, "tres"),
    itens: [{ txt: "POUCOS ELEMENTOS", em: F(4, 9) }, { txt: "CONTRASTE", em: F(4, 11) }, { txt: "UM PONTO DE FOCO", em: F(4, 13), ac: true }], ...solo(1300, 560) }]),
  T(F(4, 10) - 0.2, [{ tipo: "mock", titulo: "Regra 1", em: F(4, 10), thumb: { rosto: true, rotulo: "3 PALAVRAS AQUI" },
    rotulos: [{ txt: "1 rosto ou objeto", em: P(4, 10, "rosto"), x: 60, y: 620 }, { txt: "até 4 palavras", em: P(4, 10, "palavras"), x: 560, y: 620 }], ...solo(1100, 800), tituloVideo: "" }]),
  T(F(4, 11) - 0.2, (() => { const [a, b] = duo(820, 820, 640); return [
    { tipo: "mock", titulo: "Cor clara em cima de clara", em: P(4, 12, "nada") - 0.3, thumb: { texto: "SEM CONTRASTE", tam: 80 }, riscada: P(4, 12, "clara") + 0.4, ...a, tituloVideo: "" },
    { tipo: "mock", titulo: "Destaca do fundo", em: F(4, 12), thumb: { texto: "CONTRASTE", tam: 90, destaque: true }, ...b, tituloVideo: "" },
  ]; })()),
  T(F(4, 13) - 0.2, (() => { const [a, b] = duo(700, 800, 620); return [
    { tipo: "icone", titulo: "Regra 3", em: F(4, 13), icone: "alvo", texto: "um ponto de foco", ...a },
    { tipo: "icone", titulo: "O olho", em: F(4, 14), icone: "olho", texto: "sabe pra onde ir", ac: true, ...b },
  ]; })()),

  // ============ BLOCO 5: rostos e canto ============
  T(F(5, 0) - 0.15, (() => { const [a, b] = duo(760, 820, 700, 560); return [
    { tipo: "mascote", titulo: "E o rosto?", em: F(5, 0), ...a },
    { tipo: "icone", titulo: "Por quê funciona", em: F(5, 2), icone: "olho", texto: "a gente olha pra pessoas", ...b },
  ]; })()),
  T(F(5, 3) - 0.2, (() => { const [a, b] = pilha(1500, 560, 240); return [
    { tipo: "rostos", titulo: "Uma expressão que conta algo", em: F(5, 3), itens: [{ txt: "surpresa", em: P(5, 4, "surpresa") }, { txt: "dúvida", em: P(5, 4, "duvida") }, { txt: "alívio", em: P(5, 4, "alivio") }], ...a },
    { tipo: "texto", titulo: "Regra", em: F(5, 5), txt: "combina com a história do vídeo", tam: 70, ...b },
  ]; })()),
  T(F(5, 6) - 0.2, (() => { const [a, b] = duo(1000, 640, 640, 460); return [
    { tipo: "lista", titulo: "Canal sem rosto?", em: F(5, 6), marca: "seta", tam: 60,
      itens: [{ txt: "objeto forte", em: P(5, 8, "objeto") }, { txt: "antes e depois", em: P(5, 8, "antes") }, { txt: "personagem", em: P(5, 8, "personagem") }, { txt: "número grande", em: P(5, 8, "numero") }], ...a },
    { tipo: "texto", titulo: "O que a pessoa pensa", em: F(5, 9), txt: "“espera, o que é isso?”", ac: true, tam: 76, ...b },
  ]; })()),
  T(F(5, 10) - 0.2, [{ tipo: "mock", titulo: "Zona proibida", em: F(5, 10), thumb: { texto: "NÃO COLOQUE NADA NO CANTO", tam: 80 }, cantoEm: P(5, 10, "canto"),
    rotulos: [{ txt: "a duração cobre aqui", em: F(5, 11) + 0.5, x: 560, y: 640 }], ...solo(1100, 820), tituloVideo: "" }]),
  T(F(5, 12) - 0.2, [{ tipo: "lista", titulo: "Missão 3, resumida", em: F(5, 12), marca: "check", tam: 70,
    itens: [{ txt: "entendida pequena", em: P(5, 12, "pequena"), check: P(5, 12, "pequena") + 0.6 }, { txt: "em menos de 1 segundo", em: P(5, 12, "menos"), check: P(5, 12, "menos") + 0.8 }], ...solo(1300, 460) }]),

  // ============ BLOCO 6: missão 4 ============
  T(F(6, 0) - 0.2, [{ tipo: "missao", titulo: "O TÍTULO HONESTO", em: F(6, 0), n: 4, ...solo(1400, 520) }]),
  T(F(6, 1) - 0.2, (() => { const [a, b, c] = trio(960, 820, 800, 380); return [
    { tipo: "balanca", titulo: "Um bom título", em: F(6, 1), esq: "CLAREZA", dir: "CURIOSIDADE",
      estados: [{ em: F(6, 1), ang: 0 }, { em: F(6, 3), ang: -14 }, { em: F(6, 4), ang: 14 }, { em: F(6, 5) - 0.4, ang: 0 }], ...a },
    { tipo: "texto", titulo: "Só clareza", em: F(6, 3), txt: "“Dicas de thumbnail”", tam: 60, depois: "sem graça", depoisEm: F(6, 3) + 1.2, depoisAc: false, ...b },
    { tipo: "texto", titulo: "Só curiosidade", em: F(6, 4), txt: "“Eu não acreditei nisso”", tam: 60, depois: "confuso", depoisEm: F(6, 4) + 1.4, depoisAc: false, ...c },
  ]; })()),
  T(F(6, 5) - 0.2, [{ tipo: "mock", titulo: "Os dois juntos", em: F(6, 5), thumb: { texto: "INVISÍVEL?", tam: 120, destaque: true }, tamTit: 46,
    rotulos: [{ txt: "sabe do que se trata", em: F(6, 6), x: 70, y: 400 }, { txt: "quer saber qual é o erro", em: P(6, 6, "quer"), x: 70, y: 490 }], ...solo(1100, 840), tituloVideo: "O erro que deixa sua thumbnail invisível no celular" }]),
  T(F(6, 7) - 0.2, [{ tipo: "lista", titulo: "Costuma ajudar", em: F(6, 7), marca: "seta", tam: 66,
    itens: [{ txt: "um número específico", em: P(6, 7, "numero") }, { txt: "um resultado concreto", em: P(6, 7, "resultado") }, { txt: "o que está em jogo", em: P(6, 7, "palavra") },
      { txt: "título curto, que aparece inteiro", em: F(6, 8), ac: true }], ...solo(1500, 640) }]),

  // ============ BLOCO 7: clickbait e teste ============
  T(F(7, 0) - 0.15, [{ tipo: "texto", titulo: "Atenção", em: F(7, 0), txt: "Agora, o perigo.", ac: true, tam: 130, ...solo(1200, 440) }]),
  T(F(7, 1) - 0.2, [{ tipo: "grafico", titulo: "Prometeu e não cumpriu", em: F(7, 1), pontos: [10, 30, 70, 95, 100, 100], cor1: "#22e07a", dur: 1.6,
    pontos2: [100, 90, 40, 18, 10, 6], cor2: "#8a939e", em2: F(7, 3) - 0.3,
    anot: [{ i: 1, txt: "promete", em: F(7, 1) + 0.9 }, { i: 4, txt: "todo mundo clica", em: P(7, 1, "clicar") }, { i: 2, txt: "não entrega", em: P(7, 1, "entrega"), ac: false }, { i: 3, txt: "uns segundos", em: F(7, 2), ac: false }, { i: 3, txt: "e sai", serie: 2, em: F(7, 3) + 0.6, ac: false }], ...solo(1500, 760) }]),
  T(F(7, 4) - 0.2, (() => { const [a, b] = duo(1000, 660, 760, 460); return [
    { tipo: "escada", titulo: "Lembra da escada?", em: F(7, 4), sobe: [F(7, 4) + 1.0], falhaEm: F(7, 7) + 0.6, ...a },
    { tipo: "texto", titulo: "O que ele mede", em: F(7, 5), txt: "não só o clique.", sobre: "o YouTube mede…", depois: "se a pessoa ficou", depoisEm: F(7, 6), ...b },
  ]; })()),
  T(F(7, 8) - 0.2, [{ tipo: "icone", titulo: "Pior", em: F(7, 8), icone: "clique", texto: "ela aprende a não clicar mais", riscada: P(7, 8, "canal") , ...solo(1100, 640) }]),
  T(F(7, 9) - 0.2, (() => { const [a, b] = duo(1000, 680, 520, 440); return [
    { tipo: "texto", titulo: "Regra de ouro", em: F(7, 9), txt: "Intrigante, sim. Mentirosa, não.", sans: true, tam: 84, ...a },
    { tipo: "lista", titulo: "A promessa", em: P(7, 9, "promessa"), marca: "check", tam: 54, itens: [{ txt: "cumprida", em: P(7, 9, "cumprida"), check: P(7, 9, "cumprida") + 0.5 }, { txt: "logo no começo", em: P(7, 9, "comeco"), check: P(7, 9, "comeco") + 0.5 }], ...b },
  ]; })()),
  T(F(7, 10) - 0.2, (() => { const [a, b] = duo(760, 760, 600); return [
    { tipo: "icone", titulo: "Qual versão?", em: F(7, 10), icone: "interrogacao", texto: "qual funciona melhor?", ...a },
    { tipo: "icone", titulo: "Não precisa", em: F(7, 11), icone: "barras", texto: "adivinhar", ac: true, ...b },
  ]; })()),
  T(F(7, 12) - 0.2, [{ tipo: "barras", titulo: "Testar e comparar (exemplo)", em: F(7, 12), cresceEm: P(7, 12, "mostra"), vencedorEm: P(7, 12, "melhor"),
    itens: [{ txt: "Thumb A", valor: 4.1 }, { txt: "Thumb B", valor: 6.8 }, { txt: "Thumb C", valor: 5.2 }], ...solo(1500, 520) }]),
  T(F(7, 13) - 0.2, (() => { const [a, b] = duo(800, 640, 560); return [
    { tipo: "icone", titulo: "Os grandes", em: F(7, 13), icone: "trofeu", texto: "testam o tempo todo", ...a },
    { tipo: "texto", titulo: "E você", em: F(7, 14), txt: "também pode.", ac: true, tam: 100, ...b },
  ]; })()),

  // ============ BLOCO 8: resumo e chamada ============
  T(F(8, 0) - 0.1, [{ tipo: "lista", titulo: "Recapitulando", em: F(8, 0) + 0.2, marca: "check", tam: 56,
    itens: [{ txt: "embalagem antes de gravar", em: F(8, 1), check: F(8, 1) + 1.4 }, { txt: "título + thumb: uma dupla", em: F(8, 2), check: F(8, 2) + 2.0 },
      { txt: "entendida pequena, em < 1 s", em: F(8, 3), check: F(8, 3) + 2.4 }, { txt: "clareza + curiosidade, promessa cumprida", em: F(8, 4), check: F(8, 4) + 2.6 }], ...solo(1600, 640) }]),
  T(F(8, 5) - 0.2, [{ tipo: "icone", titulo: "Na dúvida", em: F(8, 5), icone: "barras", texto: "teste.", ac: true, tam: 110, lado: true, ...solo(1000, 480) }]),
  T(F(8, 6) - 0.2, [{ tipo: "escada", titulo: "As duas metades da escada", em: F(8, 6), sobe: [P(8, 6, "video") , P(8, 6, "video") + 0.6, P(8, 6, "segura")], rotulo1: "embalagem", rotulo1Em: P(8, 6, "embalagem"), ...solo(1400, 780) }]),
  T(F(8, 7) - 0.2, [{ tipo: "contador", titulo: "No próximo vídeo", em: F(8, 7), icone: "cronometro", contaEm: P(8, 7, "trinta") - 0.6, ate: 30, suf: " s", rotulo: "os primeiros segundos", ac: true, ...solo(1200, 520) }]),
  T(F(8, 8) - 0.2, [{ tipo: "inscreva", titulo: "Muita novidade vindo", em: F(8, 8), ...solo(1200, 480) }]),
  T(F(8, 9) - 0.2, (() => { const [a, b, c] = trio(900, 760, 760, 340); return [
    { tipo: "lista", titulo: "Cada vídeo aqui é", em: F(8, 9), marca: "check", tam: 62,
      itens: [{ txt: "pensado", em: P(8, 9, "pensado"), check: P(8, 9, "pensado") + 0.4 }, { txt: "estudado", em: P(8, 9, "estudado"), check: P(8, 9, "estudado") + 0.4 }, { txt: "calculado", em: P(8, 9, "calculado"), check: P(8, 9, "calculado") + 0.4 }], ...a },
    { tipo: "icone", titulo: "Fontes", em: P(8, 9, "sites"), icone: "lupa", texto: "vários sites e fontes", lado: true, tam: 46, ...b },
    { tipo: "icone", titulo: "Análise", em: P(8, 9, "claude"), icone: "barras", texto: "com o Claude Code", lado: true, tam: 46, ...c },
  ]; })()),
  T(F(8, 10) - 0.2, (() => { const [a, b] = duo(900, 760, 520); return [
    { tipo: "texto", titulo: "Num lugar só", em: F(8, 10), txt: "o que quase ninguém junta", ...a },
    { tipo: "texto", titulo: "Aqui", em: F(8, 11), txt: "de graça.", ac: true, tam: 110, ...b },
  ]; })()),
  T(F(8, 12) - 0.2, [{ tipo: "fim", titulo: "Toda semana", em: F(8, 12), ...solo(1600, 640) }]),
];
