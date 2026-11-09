// Roteiro de tomadas do vídeo 3 (os primeiros 30 segundos). Mesmo esquema do vídeo 2:
// cada tomada = um grupo de janelas; a câmera desliza para o grupo em "ini".
// F(bloco, frase) = início da frase; P(bloco, frase, "palavra") = início da palavra. Números de exemplo são ilustrativos.
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
  T(0, [{ tipo: "feed", titulo: "Página inicial", em: 0.6, para: P(1, 0, "clicou"), ...solo(1300, 820) }]),
  T(F(1, 1) - 0.2, (() => { const [a, b] = duo(700, 900, 560, 560); return [
    { tipo: "icone", titulo: "Clicou", em: F(1, 1), icone: "clique", texto: "parabéns.", ...a },
    { tipo: "texto", titulo: "Só que…", em: F(1, 2), txt: "ainda não decidiu ficar.", ac: true, tam: 84, ...b },
  ]; })()),
  T(F(1, 3) - 0.2, (() => { const [a, b] = duo(760, 900, 560, 560); return [
    { tipo: "contador", titulo: "Os próximos", em: F(1, 3), icone: "cronometro", contaEm: P(1, 3, "trinta") - 0.3, ate: 30, suf: " s", rotulo: "segundos", ac: true, ...a },
    { tipo: "texto", titulo: "A pergunta silenciosa", em: P(1, 3, "esse") - 0.2, txt: "“é o que eu achei que era?”", tam: 76, ...b },
  ]; })()),
  T(F(1, 4) - 0.2, (() => { const [a, b] = duo(900, 640, 560, 480); return [
    { tipo: "texto", titulo: "Se a resposta demora", em: F(1, 4), txt: "volta pra página inicial.", tam: 80, ...a },
    { tipo: "icone", titulo: "Um toque", em: F(1, 5), icone: "clique", texto: "e acabou.", ac: true, riscada: F(1, 5) + 0.9, ...b },
  ]; })()),
  T(F(1, 6) - 0.2, [{ tipo: "escada", titulo: "A escada", em: F(1, 6), sobe: [P(1, 6, "traz"), P(1, 7, "fica")],
    rotulo1: "embalagem", rotulo1Em: P(1, 6, "embalagem"), rotulos: [{ k: 1, txt: "os primeiros 30 s", em: P(1, 7, "primeiros") }], ...solo(1400, 780) }]),
  T(F(1, 8) - 0.2, [{ tipo: "lista", titulo: "4 missões", em: F(1, 8), marca: "num", tam: 66,
    itens: [{ txt: "A PRIMEIRA FRASE", em: F(1, 9) }, { txt: "A PROMESSA", em: F(1, 10) }, { txt: "O MOTIVO PRA FICAR", em: F(1, 11) },
      { txt: "CORTAR", em: F(1, 12), ac: true, tag: "quase ninguém faz" }], ...solo(1500, 640) }]),
  T(F(1, 13) - 0.2, [{ tipo: "icone", titulo: "Presta atenção", em: F(1, 13), icone: "olho", texto: "nesse começo aqui", ac: true, ...solo(1000, 620) }]),

  // ============ BLOCO 2: por que pesa tanto ============
  T(F(2, 0) - 0.2, [{ tipo: "texto", titulo: "Antes das missões", em: F(2, 0), txt: "por que esse pedaço pesa tanto?", tam: 96, ...solo(1300, 480) }]),
  T(F(2, 1) - 0.2, [{ tipo: "grafico", titulo: "Retenção de quase qualquer vídeo (exemplo)", em: P(2, 1, "retencao"), pontos: [100, 64, 54, 49, 46, 43, 40], cor1: "#22e07a", dur: 2.2,
    anot: [{ i: 1, txt: "queda forte no começo", em: P(2, 1, "queda") }, { i: 4, txt: "depois, mais tranquila", em: P(2, 1, "tranquila"), ac: false }], ...solo(1500, 760) }]),
  T(F(2, 2) - 0.2, (() => { const [a, b] = duo(760, 760, 600); return [
    { tipo: "icone", titulo: "Esse tombo", em: F(2, 2), icone: "pessoa", texto: "entrou, olhou…", ...a },
    { tipo: "icone", titulo: "E saiu", em: P(2, 2, "encontrou") - 0.2, icone: "interrogacao", texto: "não achou o que procurava", ac: true, tam: 56, ...b },
  ]; })()),
  T(F(2, 3) - 0.2, (() => { const [a, b] = duo(1000, 660, 760, 460); return [
    { tipo: "escada", titulo: "Lembra da escada?", em: F(2, 3), sobe: [P(2, 4, "grupo")], falhaEm: P(2, 5, "degrau"), ...a },
    { tipo: "texto", titulo: "Se metade sai", em: F(2, 5), txt: "não sobe de degrau.", ac: true, tam: 80, ...b },
  ]; })()),
  T(F(2, 6) - 0.2, [{ tipo: "texto", titulo: "O minuto 5", em: F(2, 6), sobre: "pode ser incrível…", txt: "quase ninguém chegou lá.", tam: 100, depois: "pra ver", depoisEm: P(2, 6, "ver"), ...solo(1400, 520) }]),
  T(F(2, 7) - 0.2, (() => { const [a, b] = duo(1000, 700, 340, 480); return [
    { tipo: "lista", titulo: "YouTube Studio · Retenção", em: F(2, 7), marca: "seta", tam: 60,
      itens: [{ txt: "Momentos-chave", em: P(2, 7, "retencao") }, { txt: "Introdução: ??%", em: P(2, 7, "introducao"), ac: true }], ...a },
    { tipo: "contador", titulo: "Depois de", em: P(2, 7, "assistindo"), icone: "cronometro", contaEm: P(2, 7, "trinta") - 0.5, ate: 30, suf: " s", rotulo: "ainda assistindo?", ...b },
  ]; })()),
  T(F(2, 8) - 0.2, [{ tipo: "icone", titulo: "Hoje", em: F(2, 8), icone: "alvo", texto: "o número que você vai melhorar", ...solo(1100, 620) }]),

  // ============ BLOCO 3: missão 1, a primeira frase ============
  T(F(3, 0) - 0.2, (() => { const [a, b] = pilha(1500, 460, 300); return [
    { tipo: "missao", titulo: "A PRIMEIRA FRASE", em: F(3, 0), n: 1, ...a },
    { tipo: "icone", titulo: "Um trabalho só", em: F(3, 1), icone: "check", texto: "confirmar o clique", ac: true, lado: true, tam: 72, ...b },
  ]; })()),
  T(F(3, 2) - 0.2, (() => { const [a, b] = duo(760, 900, 600, 560); return [
    { tipo: "icone", titulo: "Ela clicou por", em: F(3, 2), icone: "imagem", texto: "uma promessa", ...a },
    { tipo: "texto", titulo: "A primeira coisa que ouve", em: F(3, 3), txt: "“sim, você está no lugar certo.”", ac: true, tam: 76, ...b },
  ]; })()),
  T(F(3, 4) - 0.2, [{ tipo: "mock", titulo: "Por exemplo", em: F(3, 4), thumb: { paes: true }, ...solo(1100, 820), tituloVideo: "O erro que estraga seu pão caseiro" }]),
  T(F(3, 5) - 0.2, (() => { const [a, b] = duo(1100, 600, 640, 520); return [
    { tipo: "lista", titulo: "Começo fraco", em: F(3, 5), marca: "seta", tam: 50,
      itens: [{ txt: "“Fala pessoal, tudo bem?”", em: P(3, 5, "fala") }, { txt: "“Hoje eu tô aqui na cozinha…”", em: F(3, 6) },
        { txt: "“antes de começar…”", em: P(3, 6, "antes") }, { txt: "“eu queria agradecer…”", em: P(3, 6, "agradecer") }], ...a },
    { tipo: "contador", titulo: "Ainda assistindo", em: F(3, 5) + 0.4, icone: "pessoa", de: 100, ate: 41, contaEm: F(3, 5) + 0.8, dur: 6, suf: "%", rotulo: "exemplo", ...b },
  ]; })()),
  T(F(3, 7) - 0.2, (() => { const [a, b] = duo(1100, 560, 600, 480); return [
    { tipo: "texto", titulo: "Começo forte", em: F(3, 7), txt: "“Se o seu pão sai pesado e duro…”", tam: 70, depois: "o problema não é a receita", depoisEm: P(3, 7, "problema"), ...a },
    { tipo: "texto", titulo: "É…", em: F(3, 8), txt: "um erro de 3 minutos.", ac: true, tam: 72, ...b },
  ]; })()),
  T(F(3, 9) - 0.2, (() => { const [a, b] = duo(1060, 640, 560, 480); return [
    { tipo: "lista", titulo: "Repara", em: F(3, 9), marca: "check", tam: 54,
      itens: [{ txt: "repete a promessa", em: P(3, 9, "repete"), check: P(3, 9, "repete") + 0.7 }, { txt: "fala com quem tem o problema", em: P(3, 9, "fala"), check: P(3, 9, "fala") + 0.7 },
        { txt: "entra no assunto", em: P(3, 9, "entra"), check: P(3, 9, "entra") + 0.6 }], ...a },
    { tipo: "contador", titulo: "Em", em: F(3, 10), icone: "cronometro", contaEm: F(3, 10) + 0.2, ate: 5, suf: " s", rotulo: "sabe que clicou certo", ac: true, tam: 110, ...b },
  ]; })()),
  T(F(3, 11) - 0.2, [{ tipo: "texto", titulo: "Regra prática", em: F(3, 11), sobre: "a primeira frase…", txt: "faz sentido logo depois do título?", tam: 84, ...solo(1400, 520) }]),
  T(F(3, 12) - 0.2, (() => { const [a, b] = duo(900, 700, 560, 480); return [
    { tipo: "lista", titulo: "A mesma frase em…", em: F(3, 12), marca: "seta", tam: 54,
      itens: [{ txt: "um vídeo de pão", em: P(3, 12, "qualquer") - 0.3 }, { txt: "um vídeo de viagem", em: P(3, 12, "qualquer") + 0.1 }, { txt: "um vídeo de jogo", em: P(3, 12, "qualquer") + 0.5 }], ...a },
    { tipo: "texto", titulo: "Se encaixa em todos?", em: P(3, 12, "trabalho") - 0.6, txt: "genérica.", ac: true, tam: 110, ...b },
  ]; })()),

  // ============ BLOCO 4: missão 2, a promessa ============
  T(F(4, 0) - 0.2, (() => { const [a, b] = pilha(1500, 460, 300); return [
    { tipo: "missao", titulo: "A PROMESSA", em: F(4, 0), n: 2, ...a },
    { tipo: "texto", titulo: "Confirmar o clique", em: F(4, 1), txt: "“você está no lugar certo”", tam: 66, ...b },
  ]; })()),
  T(F(4, 2) - 0.2, [{ tipo: "texto", titulo: "A promessa", em: F(4, 2), txt: "“é isso que você leva daqui”", ac: true, tam: 90, ...solo(1300, 460) }]),
  T(F(4, 3) - 0.2, [{ tipo: "texto", titulo: "Uma promessa boa é", em: F(4, 3), txt: "concreta.", ac: true, tam: 140, ...solo(1100, 460) }]),
  T(F(4, 4) - 0.2, (() => { const [a, b] = duo(760, 900, 520, 560); return [
    { tipo: "texto", titulo: "Assunto", em: F(4, 4), txt: "“Hoje vou falar sobre pão”", tam: 62, riscada: P(4, 4, "assunto") + 0.2, ...a },
    { tipo: "texto", titulo: "Promessa", em: F(4, 5), txt: "“…por que seu pão não cresce, e como resolver”", ac: true, tam: 58, depois: "dá pra imaginar o resultado", depoisEm: F(4, 6), ...b },
  ]; })()),
  T(F(4, 7) - 0.2, [{ tipo: "texto", titulo: "O truque", em: F(4, 7), txt: "mostrar um pedaço do resultado", tam: 90, depois: "logo no começo", depoisEm: P(4, 7, "comeco"), ...solo(1400, 520) }]),
  T(F(4, 8) - 0.2, (() => { const [a, b, c] = trio(1000, 760, 760, 340); return [
    { tipo: "mock", titulo: "Saindo do forno", em: F(4, 8), thumb: { paes: true, destaque: true }, rotulos: [{ txt: "pão perfeito", em: P(4, 8, "perfeito"), x: 80, y: 600 }], ...a, tituloVideo: "" },
    { tipo: "icone", titulo: "Ou", em: F(4, 9), icone: "barras", texto: "antes e depois", lado: true, tam: 54, ...b },
    { tipo: "icone", titulo: "Ou", em: F(4, 10) + 0.2, icone: "porcentagem", texto: "o número final", lado: true, tam: 54, ...c },
  ]; })()),
  T(F(4, 11) - 0.2, [{ tipo: "fluxo", titulo: "O caminho", em: F(4, 11), tam: 60,
    passos: [{ txt: "AGORA", em: F(4, 11) + 0.2 }, { txt: "…", em: P(4, 11, "chegar") - 0.4 }, { txt: "ONDE VAI CHEGAR", em: P(4, 11, "chegar"), ac: true }], ...solo(1500, 380) }]),
  T(F(4, 12) - 0.2, (() => { const [a, b] = duo(860, 820, 640, 520); return [
    { tipo: "mock", titulo: "A thumb promete", em: F(4, 12), thumb: { texto: "SEU PÃO NÃO CRESCE?", tam: 70 }, ...a, tituloVideo: "" },
    { tipo: "texto", titulo: "A introdução promete", em: F(4, 13), txt: "“hoje: 5 receitas de bolo”", tam: 64, riscada: P(4, 13, "armadilha"), depois: "caiu numa armadilha", depoisEm: P(4, 13, "armadilha"), depoisAc: false, ...b },
  ]; })()),

  // ============ BLOCO 5: missão 3, motivo pra ficar ============
  T(F(5, 0) - 0.2, [{ tipo: "missao", titulo: "O MOTIVO PRA FICAR", em: F(5, 0), n: 3, tam: 92, ...solo(1500, 520) }]),
  T(F(5, 1) - 0.2, (() => { const [a, b] = duo(700, 900, 560); return [
    { tipo: "icone", titulo: "A promessa", em: F(5, 1), icone: "foguete", texto: "faz começar", ...a },
    { tipo: "texto", titulo: "Mas…", em: F(5, 2), txt: "entendeu tudo cedo demais?", tam: 74, depois: "sai satisfeita, e o vídeo perde igual", depoisEm: P(5, 2, "perde"), depoisAc: false, ...b },
  ]; })()),
  T(F(5, 3) - 0.2, [{ tipo: "texto", titulo: "Por isso o começo deixa", em: F(5, 3), txt: "uma porta aberta.", ac: true, tam: 130, depois: "algo que só vai descobrir lá na frente", depoisEm: F(5, 4), ...solo(1400, 560) }]),
  T(F(5, 5) - 0.2, [{ tipo: "lista", titulo: "Jeitos de abrir a porta", em: F(5, 5), marca: "seta", tam: 64,
    itens: [{ txt: "o melhor guardado pro final", em: P(5, 5, "passo") }, { txt: "uma lista com número definido", em: P(5, 5, "lista") },
      { txt: "“já já eu mostro”", em: P(5, 5, "simplesmente"), ac: true }], ...solo(1500, 560) }]),
  T(F(5, 6) - 0.2, [{ tipo: "fluxo", titulo: "Vídeo 1: as missões do videogame", em: F(5, 6), tam: 56,
    passos: [{ txt: "PERGUNTA ABERTA", em: P(5, 6, "pergunta") }, { txt: "CURIOSIDADE", em: P(5, 6, "puxa") }, { txt: "PRA FRENTE", em: P(5, 6, "frente"), ac: true }], ...solo(1600, 380) }]),
  T(F(5, 7) - 0.2, (() => { const [a, b, c] = trio(960, 760, 760, 350); return [
    { tipo: "inscreva", titulo: "Rapidinho", em: F(5, 7), ...a },
    { tipo: "icone", titulo: "Cada vídeo", em: P(5, 8, "pesquisado"), icone: "lupa", texto: "pesquisado", lado: true, tam: 54, ...b },
    { tipo: "icone", titulo: "Cada vídeo", em: P(5, 8, "estudado"), icone: "calendario", texto: "estudado", lado: true, tam: 54, ...c },
  ]; })()),
  T(F(5, 9) - 0.2, [{ tipo: "texto", titulo: "Agora", em: F(5, 9), txt: "a missão que quase ninguém faz.", ac: true, tam: 96, ...solo(1300, 480) }]),

  // ============ BLOCO 6: missão 4, cortar ============
  T(F(6, 0) - 0.2, (() => { const [a, b] = pilha(1500, 460, 300); return [
    { tipo: "missao", titulo: "CORTAR", em: F(6, 0), n: 4, ...a },
    { tipo: "icone", titulo: "Pega o começo", em: F(6, 1), icone: "texto", texto: "escreve os primeiros 30 s", lado: true, tam: 60, ...b },
  ]; })()),
  T(F(6, 2) - 0.2, [{ tipo: "lista", titulo: "Marca cada frase que não…", em: F(6, 2), marca: "seta", tam: 64,
    itens: [{ txt: "confirma o clique", em: P(6, 2, "confirma") }, { txt: "faz a promessa", em: P(6, 2, "promessa") }, { txt: "abre a porta pro final", em: P(6, 2, "porta") }], ...solo(1300, 520) }]),
  T(F(6, 3) - 0.2, [{ tipo: "texto", titulo: "Normalmente", em: F(6, 3), txt: "sobra bastante coisa.", tam: 110, ...solo(1200, 440) }]),
  T(F(6, 4) - 0.2, [{ tipo: "lista", titulo: "O que costuma sobrar", em: F(6, 4) - 0.1, marca: "seta", tam: 56,
    itens: [{ txt: "VINHETA DE 10 s", em: F(6, 4), risca: F(6, 4) + 1.0 }, { txt: "“FALA GALERA, TUDO BEM?”", em: F(6, 5), risca: F(6, 5) + 1.4 },
      { txt: "LIKE ANTES DA HORA", em: F(6, 6), risca: F(6, 6) + 1.6 }, { txt: "COMO TIVE A IDEIA", em: F(6, 7), risca: F(6, 7) + 1.4 },
      { txt: "CONTEXTO QUE NINGUÉM PEDIU", em: F(6, 8), risca: F(6, 8) + 1.2 }], ...solo(1500, 720) }]),
  T(F(6, 9) - 0.2, [{ tipo: "texto", titulo: "Calma", em: F(6, 9), txt: "Nada disso é proibido.", tam: 100, depois: "só não precisa estar no começo", depoisEm: F(6, 10), ...solo(1400, 500) }]),
  T(F(6, 11) - 0.2, (() => { const [a, b] = pilha(1700, 320, 320); return [
    { tipo: "fluxo", titulo: "Inscrição", em: F(6, 11), passos: [{ txt: "AJUDA", em: F(6, 11) + 0.3 }, { txt: "DEPOIS: INSCREVA-SE", em: P(6, 11, "depois"), ac: true }], ...a },
    { tipo: "fluxo", titulo: "História pessoal", em: F(6, 12), passos: [{ txt: "COMEÇO", em: F(6, 12) + 0.2 }, { txt: "DECIDIU FICAR", em: P(6, 12, "decidiu") - 0.3 }, { txt: "NO MEIO", em: P(6, 12, "meio"), ac: true }], ...b },
  ]; })()),
  T(F(6, 13) - 0.2, [{ tipo: "texto", titulo: "Começo bom não é começo apressado", em: F(6, 13), sobre: "é começo…", txt: "sem nada sobrando.", ac: true, tam: 120, ...solo(1400, 500) }]),

  // ============ BLOCO 7: a receita e a revelação ============
  T(F(7, 0) - 0.15, [{ tipo: "lista", titulo: "A receita", em: F(7, 0), marca: "num", tam: 62,
    itens: [{ txt: "CONFIRMA O CLIQUE", em: F(7, 1) }, { txt: "PROMESSA + PEDAÇO DO RESULTADO", em: F(7, 2) }, { txt: "PORTA ABERTA PRO FINAL", em: F(7, 3) },
      { txt: "NADA SOBRANDO", em: F(7, 4), ac: true }], ...solo(1600, 620) }]),
  T(F(7, 5) - 0.2, (() => { const [a, b] = duo(800, 700, 560); return [
    { tipo: "icone", titulo: "Lembra?", em: F(7, 5), icone: "olho", texto: "o começo deste vídeo", ...a },
    { tipo: "contador", titulo: "Volta comigo", em: F(7, 6) - 0.1, icone: "cronometro", de: 312, ate: 0, contaEm: F(7, 6), dur: 1.0, suf: " s", rotulo: "de volta ao 0", ac: true, ...b },
  ]; })()),
  T(F(7, 7) - 0.2, [{ tipo: "texto", titulo: "A primeira frase foi", em: F(7, 7), txt: "“Alguém viu a sua thumbnail, leu o seu título e clicou.”", tam: 70, depois: "① confirmou: lugar certo", depoisEm: F(7, 8), ...solo(1500, 560) }]),
  T(F(7, 9) - 0.2, [{ tipo: "lista", titulo: "O começo deste vídeo", em: F(7, 9), marca: "check", tam: 58,
    itens: [{ txt: "confirmou o clique", em: F(7, 9), check: F(7, 9) + 0.3 }, { txt: "a promessa: decidir se fica", em: P(7, 9, "promessa"), check: P(7, 9, "promessa") + 1.2 },
      { txt: "4 missões, a última guardada", em: F(7, 10), check: P(7, 10, "ultima") + 0.4 }, { txt: "sem vinheta, sem “fala galera”", em: F(7, 11), check: P(7, 11, "fala") + 0.3 }], ...solo(1500, 620) }]),
  T(F(7, 12) - 0.2, (() => { const [a, b] = duo(700, 960, 560); return [
    { tipo: "contador", titulo: "Testa o seu", em: F(7, 12), icone: "cronometro", contaEm: P(7, 12, "trinta") - 0.4, ate: 30, suf: " s", rotulo: "só o começo", ac: true, ...a },
    { tipo: "texto", titulo: "Mostra pra alguém", em: F(7, 13), txt: "“você continuaria assistindo?”", tam: 70, depois: "por quê?", depoisEm: F(7, 14), ...b },
  ]; })()),
  T(F(7, 15) - 0.2, [{ tipo: "texto", titulo: "Não sabe o que vai ganhar?", em: F(7, 15), txt: "volta pra missão 2.", ac: true, tam: 120, ...solo(1300, 460) }]),

  // ============ BLOCO 8: resumo e chamada ============
  T(F(8, 0) - 0.1, [{ tipo: "lista", titulo: "Recapitulando", em: F(8, 0) + 0.2, marca: "check", tam: 54,
    itens: [{ txt: "clicou ≠ decidiu ficar", em: F(8, 1), check: F(8, 1) + 1.4 }, { txt: "1ª frase confirma o clique", em: F(8, 2), check: F(8, 2) + 1.2 },
      { txt: "promessa = a da embalagem", em: F(8, 3), check: F(8, 3) + 2.4 }, { txt: "porta aberta pro final", em: F(8, 4), check: F(8, 4) + 1.6 },
      { txt: "o resto sai do começo", em: F(8, 5), check: F(8, 5) + 1.4 }], ...solo(1500, 720) }]),
  T(F(8, 6) - 0.2, [{ tipo: "escada", titulo: "Três degraus", em: F(8, 6), sobe: [P(8, 6, "testando"), P(8, 6, "traz"), P(8, 6, "ficar")],
    rotulos: [{ k: 0, txt: "teste", em: P(8, 6, "youtube") }, { k: 1, txt: "embalagem", em: P(8, 6, "embalagem") }, { k: 2, txt: "os 30 s", em: P(8, 6, "comeco") }], ...solo(1400, 780) }]),
  T(F(8, 7) - 0.2, [{ tipo: "inscreva", titulo: "Muita novidade vindo", em: F(8, 7), ...solo(1200, 480) }]),
  T(F(8, 8) - 0.2, (() => { const [a, b, c] = trio(900, 760, 760, 340); return [
    { tipo: "lista", titulo: "Cada vídeo aqui é", em: F(8, 8), marca: "check", tam: 62,
      itens: [{ txt: "pensado", em: P(8, 8, "pensado"), check: P(8, 8, "pensado") + 0.4 }, { txt: "estudado", em: P(8, 8, "estudado"), check: P(8, 8, "estudado") + 0.4 }, { txt: "calculado", em: P(8, 8, "calculado"), check: P(8, 8, "calculado") + 0.4 }], ...a },
    { tipo: "icone", titulo: "Fontes", em: P(8, 8, "sites"), icone: "lupa", texto: "vários sites e fontes", lado: true, tam: 46, ...b },
    { tipo: "icone", titulo: "Análise", em: P(8, 8, "claude"), icone: "foguete", texto: "com o Claude Code", lado: true, tam: 46, ...c },
  ]; })()),
  T(F(8, 9) - 0.2, [{ tipo: "texto", titulo: "Aqui", em: F(8, 9), txt: "de graça.", ac: true, tam: 130, ...solo(1000, 460) }]),
  T(F(8, 10) - 0.2, [{ tipo: "fim", titulo: "Toda semana", em: F(8, 10), ...solo(1600, 640) }]),
];
