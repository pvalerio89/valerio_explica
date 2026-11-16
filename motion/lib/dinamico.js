/* Motor "dinâmico" do Valerio Explica (a partir do vídeo 10).
   Ideia: a imagem muda a cada ideia/menção (1,5–3 s por cena), tela cheia, cortes com punch/whip/flash,
   texto gigante com contorno, legenda palavra por palavra, câmera tremendo nos impactos e um som em cada corte.

   A página é função pura do tempo: window.seek(t) pinta o quadro (render.mjs). window.EVENTOS = sons.
   Precisa antes: gsap, window.TEMPOS (tempos.js) e window.PAL (palavras.js).
   Depois do motor, o cenas.js chama as funções de cena e no fim fechar().
*/
const TP = window.TEMPOS, PAL = window.PAL.palavras;
const DUR = +(TP.total + 1.6).toFixed(2);
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, '');
function T(b, f) { const B = TP.blocos.find(x => x.n === b); return B.inicio_global + B.frases[f].ini; }
function TF(b, f) { const B = TP.blocos.find(x => x.n === b); return B.inicio_global + B.frases[f].fim; }
function W(b, f, word, nth = 0) {
  const ws = PAL.filter(p => p.b === b && p.f === f); const n = norm(word); let c = 0;
  for (const p of ws) { if (norm(p.w).startsWith(n)) { if (c === nth) return p.ini; c++; } }
  console.log('palavra nao achada', b, f, word); return T(b, f) + 0.3;
}

/* ---------- cores ---------- */
const COR = { lar: '#ff5a1f', ver: '#12a150', esc: '#0f1215', ama: '#ffd23f', cre: '#f3eee4', azu: '#1f6fff', roxo: '#7b3ff2', verm: '#e5322d', bra: '#ffffff' };
const K = '#0f1215';

/* ---------- estrutura ---------- */
const root = document.getElementById('root');
const cam = document.getElementById('cam');
const palco = document.getElementById('palco');
const tl = gsap.timeline({ paused: true });
const EVENTOS = []; function EV(t, k, g = 1) { if (t >= 0) EVENTOS.push([+t.toFixed(3), k, g]); }
let uid = 0;
let _seed = 7; const rnd = () => ((_seed = (_seed * 16807) % 2147483647) / 2147483647);  // aleatório fixo (pedaços em paralelo iguais)
const SHOTS = [];
function el(pai, html, css = '', cls = '') {
  const d = document.createElement('div'); d.id = 'e' + (uid++); if (cls) d.className = cls;
  d.style.cssText = 'position:absolute;' + css; d.innerHTML = html; pai.appendChild(d); return d;
}

/* ---------- transições de entrada (no começo de cada cena) ---------- */
const TR = {
  punch: (s, t) => { tl.fromTo(s, { scale: 1.32 }, { scale: 1, duration: 0.38, ease: 'expo.out' }, t); flash(t, 0.35); EV(t, 'whoosh', 0.7); },
  whipL: (s, t) => { tl.fromTo(s, { x: 1920, filter: 'blur(28px)' }, { x: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' }, t); EV(t, 'whip'); },
  whipR: (s, t) => { tl.fromTo(s, { x: -1920, filter: 'blur(28px)' }, { x: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' }, t); EV(t, 'whip'); },
  whipU: (s, t) => { tl.fromTo(s, { y: 1080, filter: 'blur(24px)' }, { y: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power3.out' }, t); EV(t, 'whip'); },
  flash: (s, t) => { flash(t, 0.9); tl.fromTo(s, { scale: 1.12 }, { scale: 1, duration: 0.5, ease: 'power2.out' }, t); EV(t, 'impacto', 0.8); },
  zoom: (s, t) => { tl.fromTo(s, { scale: 0.55, rotation: -4 }, { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(1.6)' }, t); EV(t, 'pop'); },
  gira: (s, t) => { tl.fromTo(s, { scale: 0.2, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.4)' }, t); EV(t, 'whoosh'); },
  corte: (s, t) => { EV(t, 'tick', 0.8); },
};
const TRS = ['punch', 'whipL', 'punch', 'zoom', 'whipR', 'punch', 'whipU', 'corte'];
let trI = 0;

/* cria uma cena (fica visível de t até a próxima cena começar) */
function cena(t, { bg = COR.esc, tr, sem_legenda = false } = {}) {
  const d = el(palco, '', `inset:0;overflow:hidden;background:${bg};visibility:hidden`, 'shot');
  d.style.zIndex = SHOTS.length + 1;
  const tr2 = tr || TRS[trI++ % TRS.length];
  SHOTS.push({ t, d, tr: tr2, sem_legenda });
  return d;
}

/* ---------- efeitos globais ---------- */
const flashEl = document.getElementById('flash');
function flash(t, a = 0.8) { tl.fromTo(flashEl, { opacity: a }, { opacity: 0, duration: 0.18, ease: 'power1.out', immediateRender: false }, t); }
function treme(t, f = 1, d = 0.35) {
  const n = Math.round(d / 0.04);
  for (let i = 0; i < n; i++) { const k = f * (1 - i / n); tl.to(cam, { x: (rnd() - .5) * 34 * k, y: (rnd() - .5) * 26 * k, rotation: (rnd() - .5) * 1.2 * k, duration: 0.04, ease: 'none' }, t + i * 0.04); }
  tl.to(cam, { x: 0, y: 0, rotation: 0, duration: 0.05 }, t + d);
}
function zoomBate(s, t, sc = 1.12) { tl.to(s, { scale: sc, duration: 0.18, ease: 'expo.out' }, t); EV(t, 'tick', 0.6); }

/* ---------- peças ---------- */
// texto grande com contorno (estilo thumbnail). cor: 'b' branco, 'a' amarelo, 'v' verde, 'r' vermelho, 'k' preto
const TC = { b: '#fff', a: '#ffd23f', v: '#3be37f', r: '#ff4b3e', k: K };
function big(txt, cor = 'b', fs = 150, extra = '') {
  return `<div class="big" style="font-size:${fs}px;color:${TC[cor] || cor};${extra}">${txt}</div>`;
}
// raios girando atrás (fundo vibrante)
function raios(d, t, cor = 'rgba(255,255,255,.13)') {
  const r = el(d, '', `left:-540px;top:-960px;width:3000px;height:3000px;background:repeating-conic-gradient(from 0deg, ${cor} 0deg 8deg, transparent 8deg 20deg);`);
  tl.fromTo(r, { rotation: 0 }, { rotation: 40, duration: 8, ease: 'none' }, t);
  el(d, '', 'inset:0;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,.18), transparent 60%);');
  return r;
}
// grade de pontos (fundos claros)
function pontos(d, cor = 'rgba(0,0,0,.12)') { el(d, '', `inset:0;background-image:radial-gradient(${cor} 2px,transparent 2.2px);background-size:40px 40px;`); }

/* FOTO: imagem tela cheia com Ken Burns. txt opcional por cima (com tempo próprio). */
function FOTO(t, src, o = {}) {
  const d = cena(t, o);
  const kb = o.kb || ['in', 'out', 'esq', 'dir'][uid % 4];
  const img = el(d, `<img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block">`, 'inset:0;' + (o.css || ''));
  const dur = o.dur || 4;
  const a = { in: [1.04, 1.16, 0, 0], out: [1.18, 1.05, 0, 0], esq: [1.14, 1.14, 40, -40], dir: [1.14, 1.14, -40, 40] }[kb];
  tl.fromTo(img, { scale: a[0], x: a[2] }, { scale: a[1], x: a[3], duration: dur, ease: 'none' }, t);
  if (o.escuro !== false) el(d, '', 'inset:0;background:linear-gradient(180deg,rgba(0,0,0,.0) 45%,rgba(0,0,0,.55) 100%)');
  if (o.txt) { const tt = o.tt ?? t + 0.12; const s = el(d, big(o.txt, o.cor || 'b', o.fs || 140), `left:0;right:0;top:${o.y ?? 90}px;text-align:center`); tl.from(s, { scale: 2, opacity: 0, duration: 0.25, ease: 'power4.in' }, tt); EV(tt + 0.2, 'impacto', 0.7); if (o.treme !== false) treme(tt + 0.22, 0.7); }
  if (o.sub) { const ts = o.ts ?? t + 0.35; const s = el(d, `<span class="faixa">${o.sub}</span>`, `left:0;right:0;top:${o.ysub ?? 300}px;text-align:center`); tl.from(s, { y: 40, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, ts); EV(ts, 'pop', 0.6); }
  return d;
}

/* TEXTO: palavras gigantes entrando uma a uma (cada uma no tempo dela). linhas = [[palavra, tempo, cor], ...] */
function TEXTO(t, itens, o = {}) {
  const d = cena(t, { bg: o.bg || COR.lar, tr: o.tr, sem_legenda: true });
  if (o.raios !== false) raios(d, t, o.rc);
  const box = el(d, '', 'left:80px;right:80px;top:0;bottom:0;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:0 34px');
  itens.forEach(([w, tw, cor], i) => {
    const s = document.createElement('div'); s.innerHTML = big(w, cor || (o.cor || 'b'), o.fs || 190); box.appendChild(s);
    if (w === '|') { s.style.flexBasis = '100%'; s.innerHTML = ''; return; }
    tl.from(s, { scale: 2.4, opacity: 0, y: 30, duration: 0.2, ease: 'power4.in' }, tw ?? t + i * 0.2);
    EV((tw ?? t + i * 0.2) + 0.18, i === itens.length - 1 ? 'impacto' : 'pop', 0.7);
  });
  const fim = itens.length ? (itens[itens.length - 1][1] ?? t) + 0.2 : t;
  if (o.treme !== false) treme(fim, 0.8);
  return d;
}

/* NUM: número gigante contando. */
function NUM(t, ate, o = {}) {
  const d = cena(t, { bg: o.bg || COR.esc, tr: o.tr, sem_legenda: true });
  raios(d, t, o.rc || 'rgba(255,210,63,.10)');
  const k = uid++;
  el(d, `${o.pre ? `<span>${o.pre}</span>` : ''}<span id="n${k}">0</span>${o.suf ? `<span>${o.suf}</span>` : ''}`, `left:0;right:0;top:${o.lab ? 230 : 330}px;text-align:center`, 'big num').style.color = TC[o.cor || 'a'];
  const obj = { v: o.de || 0 }; const nEl = document.getElementById('n' + k);
  const fmt = v => Math.round(v).toLocaleString('pt-BR');
  tl.to(obj, { v: ate, duration: o.dc || 0.9, ease: 'power2.out', onUpdate: () => { nEl.textContent = fmt(obj.v); } }, t + 0.1);
  tl.set(nEl, { textContent: fmt(o.de || 0) }, t);
  for (let i = 0; i < 8; i++) EV(t + 0.1 + i * 0.1, 'tick', 0.5);
  EV(t + (o.dc || 0.9) + 0.1, 'ding');
  if (o.lab) { const s = el(d, `<span class="faixa">${o.lab}</span>`, 'left:0;right:0;top:700px;text-align:center'); tl.from(s, { y: 40, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, t + 0.5); }
  return d;
}

/* POSE: personagem de capuz (recorte PNG) entrando de baixo, com fala ao lado. */
function POSE(t, src, o = {}) {
  const d = cena(t, { bg: o.bg || COR.lar, tr: o.tr || 'corte', sem_legenda: o.sem_legenda });
  raios(d, t);
  const lado = o.lado || 'dir';
  const p = el(d, `<img src="${src}" style="height:1080px;display:block">`, `bottom:-40px;${lado === 'dir' ? 'right:40px' : 'left:40px'}`);
  tl.from(p, { y: 700, duration: 0.42, ease: 'back.out(1.3)' }, t); EV(t, 'whoosh', 0.8);
  tl.fromTo(p, { scale: 1 }, { scale: 1.06, duration: 4, ease: 'none', transformOrigin: '50% 100%' }, t + 0.42);
  if (o.txt) { const tt = o.tt ?? t + 0.3; const s = el(d, big(o.txt, o.cor || 'b', o.fs || 150), `${lado === 'dir' ? 'left:90px' : 'right:90px'};top:${o.y ?? 260}px;width:1000px;text-align:center`); tl.from(s, { scale: 2, opacity: 0, rotation: -6, duration: 0.25, ease: 'power4.in' }, tt); EV(tt + 0.2, 'impacto', 0.7); treme(tt + 0.22, 0.6); }
  return d;
}

/* CARTAS: até 4 cartões (ícone/emoji grande + texto) batendo um a um. itens = [[html, rótulo, tempo], ...] */
function CARTAS(t, itens, o = {}) {
  const d = cena(t, { bg: o.bg || COR.cre, tr: o.tr, sem_legenda: o.sem_legenda });
  if ((o.bg || COR.cre) === COR.cre) pontos(d); else raios(d, t);
  if (o.titulo) { const s = el(d, big(o.titulo, o.tc || ((o.bg || COR.cre) === COR.cre ? 'k' : 'b'), o.fst || 100, (o.bg || COR.cre) === COR.cre ? '-webkit-text-stroke:0;text-shadow:none' : ''), 'left:0;right:0;top:90px;text-align:center'); tl.from(s, { y: -60, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, t + 0.05); }
  const n = itens.length, w = Math.min(420, (1760 - (n - 1) * 40) / n);
  itens.forEach(([ic, lab, tw], i) => {
    const x = 960 - (n * w + (n - 1) * 40) / 2 + i * (w + 40);
    const c = el(d, `<div class="ic">${ic}</div><div class="lab">${lab}</div>`, `left:${x}px;top:${o.titulo ? 300 : 230}px;width:${w}px;height:${o.h || 520}px`, 'carta');
    const tt = tw ?? t + 0.2 + i * 0.25;
    tl.from(c, { y: 120, scale: 0.6, opacity: 0, rotation: (i % 2 ? 6 : -6), duration: 0.35, ease: 'back.out(1.8)' }, tt); EV(tt, 'pop');
  });
  return d;
}

/* VS: duas metades (errado x certo), a segunda bate depois. */
function VS(t, a, b, tb, o = {}) {
  const d = cena(t, { bg: COR.esc, tr: o.tr, sem_legenda: o.sem_legenda });
  const L = el(d, `<div class="vsico">${a[0]}</div>${big(a[1], 'b', 92)}`, `left:0;top:0;width:960px;height:1080px;background:${COR.verm};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px`);
  const R2 = el(d, `<div class="vsico">${b[0]}</div>${big(b[1], 'b', 92)}`, `left:960px;top:0;width:960px;height:1080px;background:${COR.ver};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px`);
  tl.from(L, { x: -960, duration: 0.3, ease: 'power3.out' }, t); EV(t, 'whip');
  tl.from(R2, { x: 960, duration: 0.3, ease: 'power3.out' }, tb); EV(tb, 'whip');
  const v = el(d, big('VS', 'a', 120), 'left:860px;top:470px;width:200px;text-align:center'); tl.from(v, { scale: 3, opacity: 0, duration: 0.2, ease: 'power4.in' }, tb + 0.15); EV(tb + 0.33, 'impacto'); treme(tb + 0.35, 0.8);
  return d;
}

/* TELA: imagem dentro de uma "janela" inclinada sobre fundo colorido (bom para prints/telas). */
function TELA(t, src, o = {}) {
  const d = cena(t, { bg: o.bg || COR.azu, tr: o.tr, sem_legenda: o.sem_legenda });
  raios(d, t);
  const w = el(d, `<div class="jtop"><i></i><i></i><i></i></div><img src="${src}" style="width:100%;height:calc(100% - 46px);object-fit:cover;display:block">`, `left:260px;top:${o.txt ? 250 : 150}px;width:1400px;height:${o.txt ? 760 : 800}px`, 'janela');
  tl.from(w, { y: 300, rotationX: 30, opacity: 0, duration: 0.45, ease: 'back.out(1.4)' }, t + 0.05);
  tl.fromTo(w, { rotation: -1.5, scale: 1 }, { rotation: 1, scale: 1.05, duration: 4, ease: 'none' }, t + 0.5);
  if (o.txt) { const s = el(d, big(o.txt, o.cor || 'b', o.fs || 110), 'left:0;right:0;top:60px;text-align:center'); tl.from(s, { scale: 2, opacity: 0, duration: 0.25, ease: 'power4.in' }, o.tt ?? t + 0.25); EV((o.tt ?? t + 0.25) + 0.2, 'impacto', 0.6); }
  return d;
}

/* selo carimbado por cima da cena atual */
function SELO(d, txt, t, o = {}) {
  const s = el(d, txt, `left:${o.x ?? 560}px;top:${o.y ?? 640}px;transform:rotate(${o.rot ?? -8}deg)`, 'selo' + (o.cls ? ' ' + o.cls : ''));
  tl.from(s, { scale: 2.6, opacity: 0, duration: 0.2, ease: 'power4.in' }, t); EV(t + 0.18, 'impacto'); treme(t + 0.2, 0.7); return s;
}
/* seta desenhada apontando */
function SETA(d, x, y, rot, t, cor = '#ffd23f') {
  const s = el(d, `<svg width="260" height="140" viewBox="0 0 260 140"><path d="M10 70 H190 M150 20 L215 70 L150 120" fill="none" stroke="${K}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 70 H190 M150 20 L215 70 L150 120" fill="none" stroke="${cor}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/></svg>`, `left:${x}px;top:${y}px;transform:rotate(${rot}deg)`);
  tl.from(s, { scale: 0, opacity: 0, duration: 0.25, ease: 'back.out(2)' }, t); tl.to(s, { x: 18, duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 0.25); EV(t, 'pop'); return s;
}

/* ---------- legenda (palavra por palavra, grupos de até 3 palavras) ---------- */
const leg = document.getElementById('legenda');
const DESTAQUE = new Set(window.DESTAQUE || []);
function montarLegenda() {
  const grupos = []; let g = [];
  PAL.forEach((p, i) => {
    const prox = PAL[i + 1];
    g.push(p);
    const fimFrase = !prox || prox.f !== p.f || prox.b !== p.b || /[.,!?;:]$/.test(p.w);
    if (g.length >= 3 || fimFrase || (prox && prox.ini - p.fim > 0.35)) { grupos.push(g); g = []; }
  });
  grupos.forEach((gr, gi) => {
    const box = el(leg, '', 'left:0;right:0;bottom:0;text-align:center;visibility:hidden');
    const ini = gr[0].ini, fim = gi + 1 < grupos.length ? Math.min(grupos[gi + 1][0].ini, gr[gr.length - 1].fim + 0.6) : gr[gr.length - 1].fim + 0.6;
    gr.forEach((p, j) => {
      const s = document.createElement('span'); s.textContent = p.w.replace(/[.,;:]$/, ''); box.appendChild(s);
      if (DESTAQUE.has(norm(p.w))) s.className = 'hl';
      tl.fromTo(s, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.12, ease: 'back.out(3)', immediateRender: false }, p.ini);
      tl.set(s, { color: '#ffd23f' }, p.ini); tl.set(s, { color: s.className === 'hl' ? '#3be37f' : '#fff' }, p.fim + 0.02);
    });
    tl.set(box, { visibility: 'visible' }, ini); tl.set(box, { visibility: 'hidden' }, fim);
  });
}

/* ---------- fechar: liga/desliga as cenas, transições, legenda ---------- */
function fechar() {
  SHOTS.sort((a, b) => a.t - b.t);
  SHOTS.forEach((s, i) => {
    const fim = i + 1 < SHOTS.length ? SHOTS[i + 1].t + 0.4 : DUR + 1;
    tl.set(s.d, { visibility: 'visible' }, s.t); tl.set(s.d, { visibility: 'hidden' }, fim);
    TR[s.tr](s.d, s.t);
  });
  // legenda some nas cenas de texto gigante
  SHOTS.forEach((s, i) => { const fim = i + 1 < SHOTS.length ? SHOTS[i + 1].t : DUR; tl.set(leg, { opacity: s.sem_legenda ? 0 : 1 }, s.t + (s.sem_legenda ? 0 : 0.0)); });
  montarLegenda();
  // barra de progresso
  tl.fromTo('#prog', { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none' }, 0);
  tl.set({}, {}, DUR);
  window.EVENTOS = EVENTOS.sort((a, b) => a[0] - b[0]);
  window.seek = t => { tl.time(Math.max(0, Math.min(t, DUR))); };
  window.seek(0);
  window.__ok = true;
}
