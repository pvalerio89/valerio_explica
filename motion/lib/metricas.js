// Ícones extras e componentes de métrica do Valerio Explica.
// Carregar depois de lib/motor.js. Tudo é função pura do tempo (update recebe o tempo local).
// Os números mostrados são de EXEMPLO; quando a cena mostra dados ilustrativos, use d.nota ("dados de exemplo").

// ================= ícones extras (viewBox 400; traço branco se desenha, .a = preenchimento verde, .a2 = traço verde) =================
Object.assign(ICONES, {
  clique: `<path d="M150 90 L150 330 L210 270 L255 360 L295 340 L250 255 L330 255Z"/><path class="a2" d="M150 40 V10 M80 70 L60 50 M220 70 L240 50"/>`,
  like: `<path d="M60 190 H120 V350 H60Z"/><path d="M120 190 L190 60 Q235 60 225 120 L215 170 H320 Q350 175 340 210 L310 330 Q300 350 275 350 H120"/>`,
  comentario: `<path d="M60 80 H340 Q360 80 360 100 V260 Q360 280 340 280 H170 L100 340 V280 H60 Q40 280 40 260 V100 Q40 80 60 80Z"/><circle class="a" cx="130" cy="180" r="18"/><circle class="a" cx="200" cy="180" r="18"/><circle class="a" cx="270" cy="180" r="18"/>`,
  compartilhar: `<circle cx="300" cy="90" r="50"/><circle cx="100" cy="200" r="50"/><circle cx="300" cy="310" r="50"/><path class="a2" d="M145 177 L255 113 M145 223 L255 287"/>`,
  inscrever: `<path d="M120 280 V180 Q120 90 200 90 Q280 90 280 180 V280 H330 H70Z"/><circle class="a" cx="200" cy="325" r="24"/><path class="a2" d="M330 40 V120 M290 80 H370"/>`,
  barras: `<path d="M40 360 H370"/><rect x="70" y="230" width="60" height="130" rx="8"/><rect x="170" y="160" width="60" height="200" rx="8"/><rect class="a" x="270" y="70" width="60" height="290" rx="8"/>`,
  linha: `<path d="M40 360 H370 M40 360 V40"/><path class="a2" d="M60 300 L140 230 L210 260 L280 150 L350 90"/><circle class="a" cx="350" cy="90" r="20"/>`,
  porcentagem: `<circle cx="120" cy="120" r="55"/><circle cx="280" cy="280" r="55"/><path class="a2" d="M320 70 L80 330"/>`,
  cronometro: `<circle cx="200" cy="220" r="150"/><path d="M170 40 H230 M200 40 V70"/><path class="a2" d="M200 220 L270 150"/>`,
  celular: `<rect x="110" y="30" width="180" height="340" rx="34"/><path d="M175 70 H225"/><rect class="a" x="140" y="110" width="120" height="80" rx="10"/>`,
  lupa: `<circle cx="170" cy="170" r="120"/><path class="a2" d="M255 255 L360 360"/>`,
  trofeu: `<path d="M120 50 H280 V150 Q280 240 200 240 Q120 240 120 150Z"/><path d="M120 80 H60 Q60 170 130 180 M280 80 H340 Q340 170 270 180"/><path d="M200 240 V300 M130 350 H270"/><rect class="a" x="160" y="295" width="80" height="30" rx="8"/>`,
  fogo: `<path d="M200 360 Q90 360 90 250 Q90 170 170 100 Q170 170 210 190 Q200 110 260 40 Q320 140 320 250 Q320 360 200 360Z"/><path class="a2" d="M200 330 Q150 330 150 280 Q150 240 195 210 Q200 260 230 270 Q250 290 240 310 Q230 330 200 330Z"/>`,
  foguete: `<path d="M200 30 Q290 110 280 250 H120 Q110 110 200 30Z"/><circle class="a" cx="200" cy="150" r="32"/><path d="M120 250 L70 320 L140 290 M280 250 L330 320 L260 290"/><path class="a2" d="M170 290 L200 370 L230 290"/>`,
  imagem: `<rect x="30" y="70" width="340" height="260" rx="30"/><circle class="a" cx="130" cy="150" r="30"/><path d="M50 300 L160 200 L240 270 L290 220 L360 290"/>`,
  texto: `<path d="M80 80 H320 M200 80 V340 M150 340 H250"/>`,
  calendario: `<rect x="40" y="70" width="320" height="290" rx="30"/><path d="M40 150 H360 M120 40 V100 M280 40 V100"/><rect class="a" x="230" y="220" width="70" height="70" rx="10"/>`,
});

let GID = 0; // ids únicos e determinísticos para gradientes

// helper: ícone pequeno embutido em qualquer elemento (traço se desenha com prog p)
function iconeMini(nome, tam = 90) {
  const s = el(`<svg width="${tam}" height="${tam}" viewBox="0 0 400 400" style="overflow:visible">
    <g fill="none" stroke="#f2f4f6" stroke-width="30" stroke-linecap="round" stroke-linejoin="round">${ICONES[nome]}</g></svg>`);
  s.querySelectorAll("path, circle, rect").forEach((p) => {
    if (p.classList.contains("a")) { p.setAttribute("fill", "#22e07a"); p.setAttribute("stroke", "none"); }
    else { if (p.classList.contains("a2")) p.setAttribute("stroke", "#22e07a"); p.setAttribute("pathLength", 1); p.setAttribute("stroke-dasharray", 1); }
  });
  return s;
}
function iconeMiniUpdate(svg, lt, t0, sa = 1) {
  svg.querySelectorAll("[pathLength]").forEach((p, k) => p.setAttribute("stroke-dashoffset", 1 - outCubic(prog(lt, t0 + k * 0.08, t0 + 0.6 + k * 0.08)) * sa));
  svg.querySelectorAll(".a").forEach((p) => { p.style.transformBox = "fill-box"; p.style.transformOrigin = "50% 50%"; p.style.transform = `scale(${pop(lt, t0 + 0.4, 0.35, 2.2) * sa})`; });
}
function formata(v, f, casas = 0) {
  if (f === "pct") return v.toFixed(casas).replace(".", ",") + "%";
  if (f === "tempo") return `${Math.floor(v / 60)}:${String(Math.floor(v % 60)).padStart(2, "0")}`;
  if (f === "mil") return v >= 1e6 ? (v / 1e6).toFixed(1).replace(".", ",") + " mi" : v >= 1e4 ? (v / 1e3).toFixed(1).replace(".", ",") + " mil" : fmt(v);
  return fmt(v);
}
// título + nota (comum aos componentes de métrica)
function cabecalho(c, d, top = 110) {
  if (d.titulo) { d._tit = el(`<div class="mask" style="left:140px;top:${top}px;width:1640px;height:130px"><span class="disp" style="font-size:120px">${d.titulo}</span></div>`); c.appendChild(d._tit); }
  if (d.nota) { d._nota = el(`<div class="abs ui" style="left:144px;top:1000px;font-size:30px;color:#5d6670">${d.nota}</div>`); c.appendChild(d._nota); }
}
function cabecalhoUpdate(lt, sai, d) {
  if (d._tit) linha(d._tit.firstChild, lt, 0, sai);
  if (d._nota) d._nota.style.clipPath = `inset(0 ${(1 - outExpo(prog(lt, 0.8, 1.4)) * (1 - prog(lt, sai, sai + 0.2))) * 100}% 0 0)`;
}

// ================= cartões de métrica (KPI) =================
// d.cards: [{icone, rotulo, de, ate, f:'num'|'pct'|'tempo'|'mil', casas, delta, deltaRuim, em}]
M.kpi = {
  build(c, d) {
    cabecalho(c, d);
    const n = d.cards.length, gap = 40, w = (1640 - gap * (n - 1)) / n;
    d._cs = d.cards.map((k, i) => {
      const card = el(`<div class="card" style="left:${140 + i * (w + gap)}px;top:${d.titulo ? 300 : 220}px;width:${w}px;height:${d.alto || 520}px">
        <div class="ic" style="position:absolute;left:40px;top:40px"></div>
        <div class="ui" style="position:absolute;left:40px;top:160px;font-size:40px;color:var(--text)">${k.rotulo}</div>
        <div class="disp val" style="position:absolute;left:36px;top:225px;font-size:${d.tamVal || Math.min(170, Math.round(w * 0.3))}px;font-variant-numeric:tabular-nums"></div>
        <div class="ui delta" style="position:absolute;left:40px;bottom:44px;font-size:40px;padding:8px 22px;border-radius:999px"></div></div>`);
      const ic = iconeMini(k.icone, 96); card.querySelector(".ic").appendChild(ic); k._ic = ic;
      c.appendChild(card); return card;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3; cabecalhoUpdate(lt, sai, d);
    d._cs.forEach((card, i) => {
      const k = d.cards[i], em = k.em != null ? k.em - t0 : 0.25 + i * 0.3;
      const e = outExpo(prog(lt, em, em + 0.5)), s = inCubic(prog(lt, sai, sai + 0.3));
      card.style.clipPath = `inset(${(1 - e) * 100}% 0 0 0 round 28px)`;
      card.style.transform = `translateY(${(1 - e) * 80 + s * 1100}px)`;
      iconeMiniUpdate(k._ic, lt, em + 0.1);
      const v = lerp(k.de ?? 0, k.ate, outExpo(prog(lt, em + 0.3, em + 1.6)));
      card.querySelector(".val").textContent = formata(v, k.f, k.casas);
      const dl = card.querySelector(".delta");
      if (k.delta) {
        dl.textContent = (k.deltaRuim ? "▼ " : "▲ ") + k.delta;
        dl.style.background = k.deltaRuim ? "var(--surface2)" : "var(--accent)";
        dl.style.color = k.deltaRuim ? "var(--muted)" : "var(--bg)";
        dl.style.transform = `scale(${pop(lt, em + 1.5, 0.35, 2)})`; dl.style.transformOrigin = "0 50%";
      } else dl.style.display = "none";
    });
  },
  eventos(d, t0) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    d.cards.forEach((k, i) => {
      const em = k.em != null ? k.em - t0 : 0.25 + i * 0.3;
      ev.push({ t: em, tipo: "pop" });
      for (let j = 0; j < 6; j++) ev.push({ t: em + 0.3 + j * 0.12, tipo: "tick" });
      if (k.delta) ev.push({ t: em + 1.5, tipo: k.deltaRuim ? "tick" : "moeda" });
    });
    return ev;
  },
};

// ================= medidor (velocímetro) =================
// d.valor (0..d.max), d.rotulo, d.f, d.casas, d.linhas [[txt, ac]], d.zona: [ini, fim] faixa boa em verde
M.medidor = {
  build(c, d) {
    cabecalho(c, d);
    const R = 330, cx = 560, cy = 650;
    const arco = (a0, a1, r) => {
      const p = (a) => [cx + Math.cos(Math.PI + a * Math.PI) * r, cy + Math.sin(Math.PI + a * Math.PI) * r];
      const [x0, y0] = p(a0), [x1, y1] = p(a1);
      return `M${x0} ${y0} A${r} ${r} 0 ${a1 - a0 > 1 ? 1 : 0} 1 ${x1} ${y1}`;
    };
    const z = d.zona || [0.6, 1];
    d._svg = el(`<svg class="abs" style="left:0;top:0" width="1920" height="1080">
      <path d="${arco(0, 1, R)}" fill="none" stroke="#2a3038" stroke-width="56" stroke-linecap="round"/>
      <path class="zona" d="${arco(z[0], z[1], R + 52)}" fill="none" stroke="#22e07a" stroke-opacity="0.35" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/>
      <path class="val" d="${arco(0, 1, R)}" fill="none" stroke="#22e07a" stroke-width="56" stroke-linecap="round" pathLength="1" stroke-dasharray="1"/>
      <g class="ponteiro" transform="translate(${cx} ${cy})"><path d="M0 -22 L${-R + 70} 0 L0 22Z" fill="#f2f4f6"/><circle r="40" fill="#f2f4f6"/></g>
    </svg>`);
    c.appendChild(d._svg);
    d._num = el(`<div class="abs disp" style="left:${cx - 300}px;top:${cy + 60}px;width:600px;text-align:center;font-size:170px;font-variant-numeric:tabular-nums"></div>`);
    d._rot = el(`<div class="abs ui" style="left:${cx - 300}px;top:${cy + 230}px;width:600px;text-align:center;font-size:46px;color:var(--text)">${d.rotulo || ""}</div>`);
    c.appendChild(d._num); c.appendChild(d._rot);
    d._ls = (d.linhas || []).map(([txt, ac], i) => {
      const m = el(`<div class="mask" style="left:1060px;top:${360 + i * 140}px;width:760px;height:130px"><span class="disp ${ac ? "ac" : ""}" style="font-size:125px">${txt}</span></div>`);
      c.appendChild(m); return m.firstChild;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)); cabecalhoUpdate(lt, sai, d);
    const em = d.em != null ? d.em - t0 : 0.4;
    const prop = outBack(prog(lt, em, em + 1.4), 1.3);
    const p = clamp(d.valor / (d.max || 100)) * prop;
    d._svg.querySelector(".val").setAttribute("stroke-dashoffset", 1 - clamp(p));
    d._svg.querySelector(".zona").setAttribute("stroke-dashoffset", 1 - outCubic(prog(lt, 0.2, 0.9)));
    const tremor = lt > em + 1.4 ? Math.sin(lt * 23) * 0.6 : 0;
    d._svg.querySelector(".ponteiro").setAttribute("transform", `translate(560 650) rotate(${p * 180 + tremor})`);
    d._svg.style.transform = `translateY(${(1 - sa) * 1100}px)`;
    d._num.textContent = formata(d.valor * clamp(prop), d.f || "pct", d.casas || 0);
    d._num.style.transform = d._rot.style.transform = `translateY(${(1 - sa) * 1100}px)`;
    d._ls.forEach((s, i) => linha(s, lt, (d.linhasEm != null ? d.linhasEm - t0 : 0.6) + i * 0.15, sai));
  },
  eventos(d, t0) {
    const em = d.em != null ? d.em - t0 : 0.4;
    const ev = [{ t: 0, tipo: "whoosh" }];
    for (let j = 0; j < 10; j++) ev.push({ t: em + j * 0.1, tipo: "tick" });
    ev.push({ t: em + 1.0, tipo: "pop" });
    return ev;
  },
};

// ================= barras (comparação / teste A-B) =================
// d.itens [{txt, valor, icone?}], d.f, d.casas, d.vencedorEm, d.max
M.barras = {
  build(c, d) {
    cabecalho(c, d);
    const n = d.itens.length, h = Math.min(150, 560 / n), gap = h * 0.35;
    const top0 = 330 + (600 - n * (h + gap)) / 2;
    d._max = d.max || Math.max(...d.itens.map((x) => x.valor));
    d._bs = d.itens.map((it, i) => {
      const y = top0 + i * (h + gap);
      const r = el(`<div class="abs" style="left:140px;top:${y}px;width:1640px;height:${h}px">
        <div class="disp" style="position:absolute;left:0;top:${h * 0.12}px;width:330px;font-size:${h * 0.62}px;white-space:nowrap;overflow:hidden">${it.txt}</div>
        <div class="trilho" style="position:absolute;left:360px;top:0;width:1060px;height:${h}px;border-radius:${h * 0.2}px;background:var(--surface)">
          <div class="f" style="height:100%;width:0;border-radius:${h * 0.2}px;background:var(--surface2)"></div></div>
        <div class="disp v" style="position:absolute;left:1450px;top:${h * 0.12}px;font-size:${h * 0.62}px;font-variant-numeric:tabular-nums"></div>
        <div class="tr" style="position:absolute;left:1690px;top:${(h - 80) / 2}px"></div></div>`);
      const t = iconeMini("trofeu", 80); r.querySelector(".tr").appendChild(t); it._tr = t;
      c.appendChild(r); return r;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)); cabecalhoUpdate(lt, sai, d);
    const tv = d.vencedorEm != null ? d.vencedorEm - t0 : 999;
    const venc = d.itens.reduce((m, x, i) => (x.valor > d.itens[m].valor ? i : m), 0);
    d._bs.forEach((r, i) => {
      const it = d.itens[i], em = it.em != null ? it.em - t0 : 0.3 + i * 0.25;
      const e = outExpo(prog(lt, em, em + 0.4));
      r.style.clipPath = `inset(0 ${(1 - e) * 100}% 0 0)`;
      r.style.transform = `translateX(${(1 - sa) * -1900}px)`;
      const g = outCubic(prog(lt, em + 0.2, em + 1.4));
      r.querySelector(".f").style.width = (it.valor / d._max) * g * 100 + "%";
      const ganhou = i === venc && lt >= tv;
      r.querySelector(".f").style.background = ganhou ? "var(--accent)" : "var(--surface2)";
      r.querySelector(".v").textContent = formata(it.valor * g, d.f, d.casas);
      r.querySelector(".v").style.color = ganhou ? "var(--accent)" : "var(--text)";
      it._tr.style.display = i === venc ? "block" : "none";
      if (i === venc) iconeMiniUpdate(it._tr, lt, tv, lt >= tv ? 1 : 0);
    });
  },
  eventos(d, t0) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    d.itens.forEach((it, i) => ev.push({ t: it.em != null ? it.em - t0 : 0.3 + i * 0.25, tipo: "subir" }));
    if (d.vencedorEm != null) ev.push({ t: d.vencedorEm - t0, tipo: "moeda" });
    return ev;
  },
};

// ================= gráfico de linha com anotações =================
// d.pontos [números], d.rotulosX [txt], d.anotacoes [{i, txt, em, ac}], d.cor2: segunda linha opcional (cinza) d.pontos2
M.grafico = {
  build(c, d) {
    cabecalho(c, d);
    const X0 = 140, X1 = 1780, Y0 = 940, Y1 = 330;
    const max = d.max || Math.max(...d.pontos, ...(d.pontos2 || [0])) * 1.1;
    const P = (arr) => arr.map((v, i) => [X0 + (i / (arr.length - 1)) * (X1 - X0), Y0 - (v / max) * (Y0 - Y1)]);
    d._pts = P(d.pontos); d._pts2 = d.pontos2 ? P(d.pontos2) : null;
    const path = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    let grade = "";
    for (let k = 0; k <= 4; k++) { const y = Y0 - (k / 4) * (Y0 - Y1); grade += `<line x1="${X0}" y1="${y}" x2="${X1}" y2="${y}" stroke="#20262e" stroke-width="3"/>`; }
    d._svg = el(`<svg class="abs" style="left:0;top:0" width="1920" height="1080">
      <defs><linearGradient id="gArea${d._id = ++GID}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22e07a" stop-opacity="0.28"/><stop offset="1" stop-color="#22e07a" stop-opacity="0"/></linearGradient></defs>
      ${grade}
      <path class="area" d="${path(d._pts)} L${X1} ${Y0} L${X0} ${Y0}Z" fill="url(#gArea${d._id})"/>
      ${d._pts2 ? `<path class="l2" d="${path(d._pts2)}" fill="none" stroke="#8a939e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"/>` : ""}
      <path class="l1" d="${path(d._pts)}" fill="none" stroke="#22e07a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1"/>
      <g class="pts">${d._pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="#0e1114" stroke="#22e07a" stroke-width="6"/>`).join("")}</g>
    </svg>`);
    c.appendChild(d._svg);
    d._xs = (d.rotulosX || []).map((t, i) => {
      const x = X0 + (i / (d.rotulosX.length - 1)) * (X1 - X0);
      const e = el(`<div class="abs ui" style="left:${x - 100}px;top:${Y0 + 22}px;width:200px;text-align:center;font-size:34px">${t}</div>`);
      c.appendChild(e); return e;
    });
    d._ans = (d.anotacoes || []).map((a) => {
      const [x, y] = d._pts[a.i];
      const dir = x > 1450;
      const e = el(`<div class="abs ui" style="${dir ? `right:${1920 - x}px` : `left:${x}px`};top:${y - 120}px;font-size:42px;color:${a.ac === false ? "var(--text)" : "var(--bg)"};background:${a.ac === false ? "var(--surface2)" : "var(--accent)"};padding:12px 26px;border-radius:14px;white-space:nowrap;transform-origin:${dir ? "100%" : "0"} 100%">${a.txt}</div>`);
      c.appendChild(e); return e;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)); cabecalhoUpdate(lt, sai, d);
    const em = d.em != null ? d.em - t0 : 0.3, dd = d.durDesenho || 1.8;
    const p = outCubic(prog(lt, em, em + dd));
    d._svg.querySelector(".l1").setAttribute("stroke-dashoffset", 1 - p);
    if (d._pts2) d._svg.querySelector(".l2").setAttribute("stroke-dashoffset", 1 - outCubic(prog(lt, em + 0.2, em + 0.2 + dd)));
    d._svg.querySelector(".area").style.opacity = outCubic(prog(lt, em + dd * 0.6, em + dd + 0.4));
    d._svg.querySelectorAll(".pts circle").forEach((ci, i) => {
      const ti = em + (i / (d._pts.length - 1)) * dd;
      ci.setAttribute("r", 14 * pop(lt, ti, 0.3, 2));
    });
    d._svg.style.transform = `translateY(${(1 - sa) * 1100}px)`;
    d._xs.forEach((e, i) => { e.style.opacity = lt > em + (i / Math.max(1, d._xs.length - 1)) * dd ? 1 : 0; e.style.transform = `translateY(${(1 - sa) * 1100}px)`; });
    d._ans.forEach((e, k) => {
      const a = d.anotacoes[k], ta = a.em != null ? a.em - t0 : em + dd + 0.2 + k * 0.4;
      e.style.transform = `scale(${pop(lt, ta, 0.35, 2) * sa})`;
    });
  },
  eventos(d, t0) {
    const em = d.em != null ? d.em - t0 : 0.3, dd = d.durDesenho || 1.8;
    const ev = [{ t: 0, tipo: "whoosh" }, { t: em, tipo: "subir" }];
    d.pontos.forEach((_, i) => ev.push({ t: em + (i / (d.pontos.length - 1)) * dd, tipo: "tick" }));
    (d.anotacoes || []).forEach((a, k) => ev.push({ t: a.em != null ? a.em - t0 : em + dd + 0.2 + k * 0.4, tipo: "pop" }));
    return ev;
  },
};

// ================= anéis de porcentagem =================
// d.itens [{rotulo, valor (0-100), icone?, em, ac}]
M.aneis = {
  build(c, d) {
    cabecalho(c, d);
    const n = d.itens.length, w = 1640 / n, R = Math.min(200, w * 0.36);
    d._as = d.itens.map((it, i) => {
      const cx = 140 + w * (i + 0.5), cy = 600;
      const g = el(`<div class="abs" style="left:${cx - R - 40}px;top:${cy - R - 40}px;width:${2 * R + 80}px;height:${2 * R + 260}px">
        <svg width="${2 * R + 80}" height="${2 * R + 80}"><circle cx="${R + 40}" cy="${R + 40}" r="${R}" fill="none" stroke="#20262e" stroke-width="40"/>
        <circle class="v" cx="${R + 40}" cy="${R + 40}" r="${R}" fill="none" stroke="${it.ac === false ? "#8a939e" : "#22e07a"}" stroke-width="40" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" transform="rotate(-90 ${R + 40} ${R + 40})"/></svg>
        <div class="disp n" style="position:absolute;left:0;top:${R + 40 - R * 0.42}px;width:100%;text-align:center;font-size:${R * 0.75}px;font-variant-numeric:tabular-nums"></div>
        <div class="ui" style="position:absolute;left:0;top:${2 * R + 110}px;width:100%;text-align:center;font-size:44px;color:var(--text)">${it.rotulo}</div></div>`);
      c.appendChild(g); return g;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)); cabecalhoUpdate(lt, sai, d);
    d._as.forEach((g, i) => {
      const it = d.itens[i], em = it.em != null ? it.em - t0 : 0.3 + i * 0.35;
      g.style.transform = `scale(${pop(lt, em, 0.45, 1.4) * sa})`;
      const p = outCubic(prog(lt, em + 0.2, em + 1.5));
      g.querySelector(".v").setAttribute("stroke-dashoffset", 100 - it.valor * p);
      g.querySelector(".n").textContent = Math.round(it.valor * p) + "%";
    });
  },
  eventos(d, t0) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    d.itens.forEach((it, i) => { const em = it.em != null ? it.em - t0 : 0.3 + i * 0.35; ev.push({ t: em, tipo: "pop" }, { t: em + 1.4, tipo: "check" }); });
    return ev;
  },
};

// ================= fileira de ícones grandes com rótulo =================
// d.itens [{icone, rotulo, valor?, em, ac}]
M.icones = {
  build(c, d) {
    cabecalho(c, d);
    const n = d.itens.length, w = 1640 / n;
    d._is = d.itens.map((it, i) => {
      const g = el(`<div class="abs" style="left:${140 + w * i}px;top:${d.titulo ? 300 : 240}px;width:${w}px;text-align:center">
        <div class="ic" style="display:inline-block"></div>
        <div class="disp v ${it.ac ? "ac" : ""}" style="margin-top:24px;font-size:150px;font-variant-numeric:tabular-nums"></div>
        <div class="ui" style="margin-top:6px;font-size:44px;color:var(--text)">${it.rotulo}</div></div>`);
      const ic = iconeMini(it.icone, Math.min(300, w * 0.7)); g.querySelector(".ic").appendChild(ic); it._ic = ic;
      c.appendChild(g); return g;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)); cabecalhoUpdate(lt, sai, d);
    d._is.forEach((g, i) => {
      const it = d.itens[i], em = it.em != null ? it.em - t0 : 0.3 + i * 0.3;
      g.style.transform = `translateY(${(1 - outExpo(prog(lt, em, em + 0.5))) * 120 + (1 - sa) * 1100}px)`;
      g.style.clipPath = `inset(${(1 - outExpo(prog(lt, em, em + 0.5))) * 100}% 0 0 0)`;
      iconeMiniUpdate(it._ic, lt, em, sa);
      // pulso a cada 2,5 s (algo novo na tela)
      const k = Math.floor((lt - em - 1) / 2.5), fase = lt - em - 1 - k * 2.5;
      const pulso = lt > em + 3.5 ? Math.sin(Math.PI * clamp(fase / 0.35)) : 0;
      it._ic.style.transform = `scale(${1 + 0.1 * pulso}) rotate(${pulso * (i % 2 ? 6 : -6)}deg)`;
      const v = g.querySelector(".v");
      v.textContent = it.valor != null ? formata(it.valor * outExpo(prog(lt, em + 0.3, em + 1.4)), it.f, it.casas) : "";
    });
  },
  eventos(d, t0, dur) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    d.itens.forEach((it, i) => { const em = it.em != null ? it.em - t0 : 0.3 + i * 0.3; ev.push({ t: em, tipo: "pop" }); for (let t = em + 3.5; t < dur - 0.5; t += 2.5) ev.push({ t, tipo: "tick" }); });
    return ev;
  },
};
