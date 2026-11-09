// Componentes "de YouTube": vitrine (mockups de vídeo na página inicial) e fluxos de etapas.
// Carregar depois de lib/motor.js e lib/metricas.js. Funções puras do tempo.
// Mockups são genéricos (sem logo nem layout copiado do YouTube): só a ideia de thumb + título.

// ---------- ampliações de componentes do motor ----------
// título com selo: d.selo = {txt, em}
(function () {
  const b0 = M.titulo.build, u0 = M.titulo.update, e0 = M.titulo.eventos;
  M.titulo.build = function (c, d) {
    b0(c, d);
    if (d.selo) {
      d._selo = el(`<div class="abs disp" style="left:${d.selo.x ?? 1180}px;top:${d.selo.y ?? 720}px;font-size:${d.selo.tam || 96}px;color:var(--bg);background:var(--accent);padding:8px 34px 18px;border-radius:18px;transform-origin:50% 50%">${d.selo.txt}</div>`);
      c.appendChild(d._selo);
    }
  };
  M.titulo.update = function (c, lt, dur, d, t0, rnd) {
    u0(c, lt, dur, d, t0, rnd);
    if (d._selo) d._selo.style.transform = `scale(${pop(lt, d.selo.em - t0, 0.35, 2.4) * (1 - prog(lt, dur - 0.3, dur - 0.1))}) rotate(-7deg)`;
  };
  M.titulo.eventos = function (d, t0, dur) {
    const ev = e0(d, t0, dur);
    if (d.selo) ev.push({ t: d.selo.em - t0, tipo: "impacto" });
    return ev;
  };
})();
// escada: passo "deg1:TEXTO" troca o rótulo do 1º degrau (o "inscritos" do vídeo 1 vira qualquer texto)
(function () {
  const u0 = M.escada.update;
  M.escada.update = function (c, lt, dur, d, t0, rnd) {
    u0(c, lt, dur, d, t0, rnd);
    const p = d.passos.find((x) => x.acao.startsWith("deg1:"));
    if (p && lt >= p.em - t0) {
      const g = d._deg[0];
      g.style.borderTopColor = "var(--accent)";
      g.querySelector(".sub").textContent = p.acao.slice(5);
      g.querySelector(".lbl").style.color = "var(--accent)";
    }
  };
})();

// ---------- vitrine: um vídeo grande (modo "card") ou a página inicial (modo "grade") ----------
// d.thumb: {texto, sub, paes} | d.titulo | d.rotulos [{txt, em, x, y, ac}] | d.selo {txt, em} | d.tapa [{alvo:'titulo'|'thumb', em}]
// modo grade: d.vazio (índice do espaço vazio), d.pergunta (texto dentro do vazio)
M.vitrine = {
  build(c, d) {
    if (d.cab) { d._cab = el(`<div class="mask" style="left:140px;top:70px;width:1640px;height:120px"><span class="disp" style="font-size:110px">${d.cab}</span></div>`); c.appendChild(d._cab); }
    if (d.modo === "grade") {
      d._cards = [];
      for (let k = 0; k < 6; k++) {
        const x = 140 + (k % 3) * 560, y = 230 + Math.floor(k / 3) * 400;
        const vazio = k === d.vazio;
        const card = el(`<div class="abs" style="left:${x}px;top:${y}px;width:520px;height:370px">
          <div style="width:520px;height:292px;border-radius:18px;${vazio ? "border:6px dashed var(--accent);background:transparent" : "background:var(--surface2)"};position:relative">
            ${vazio ? `<div class="ui" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:30px;font-size:44px;color:var(--text);white-space:normal;line-height:1.2">${d.pergunta || "?"}</div>` : ""}</div>
          <div style="display:flex;gap:16px;margin-top:18px">
            <div style="width:44px;height:44px;border-radius:50%;background:${vazio ? "transparent" : "var(--line)"}"></div>
            <div style="flex:1"><div style="height:18px;width:${vazio ? 0 : 300 + (k * 37) % 120}px;border-radius:9px;background:var(--line)"></div>
            <div style="height:14px;width:${vazio ? 0 : 180}px;border-radius:7px;background:#232931;margin-top:12px"></div></div></div></div>`);
        c.appendChild(card); d._cards.push(card);
      }
    } else {
      const T = d.thumb || {};
      d._card = el(`<div class="abs" style="left:${d.x ?? 380}px;top:${d.y ?? 200}px;width:1160px">
        <div class="th" style="position:relative;width:1160px;height:652px;border-radius:26px;background:var(--surface2);overflow:hidden">
          ${T.texto ? `<div class="disp" style="position:absolute;left:60px;top:70px;width:1040px;font-size:${T.tam || 130}px;line-height:0.95;white-space:normal">${T.texto}</div>` : ""}
          ${T.paes ? `<div style="position:absolute;left:150px;top:150px;width:330px;height:330px;border-radius:50%;background:#e9e4d8"></div>
                      <div style="position:absolute;left:680px;top:150px;width:330px;height:330px;border-radius:50%;background:#2a2d31;border:10px solid #44494f"></div>
                      <div class="disp ac" style="position:absolute;left:270px;top:500px;font-size:110px">✓</div>
                      <div class="disp" style="position:absolute;left:800px;top:500px;font-size:110px;color:var(--muted)">✗</div>` : ""}
          <div class="ui" style="position:absolute;right:20px;bottom:18px;font-size:34px;color:var(--text);background:rgba(0,0,0,.75);padding:4px 12px;border-radius:8px">8:12</div>
        </div>
        <div class="tt" style="display:flex;gap:26px;margin-top:30px">
          <div style="width:86px;height:86px;border-radius:50%;background:var(--line);flex:none"></div>
          <div><div class="ui" style="font-size:58px;color:var(--text);white-space:normal;line-height:1.15">${d.titulo || ""}</div>
          <div class="ui" style="font-size:38px;margin-top:8px">${d.canal || "Seu canal"}</div></div></div></div>`);
      c.appendChild(d._card);
      d._maos = (d.tapa || []).map((tp) => {
        const alvo = tp.alvo === "titulo" ? { top: 652 + 16, h: 180 } : { top: -10, h: 672 };
        const m = el(`<div class="abs" style="left:-20px;top:${alvo.top}px;width:1200px;height:${alvo.h}px;border-radius:26px;background:var(--surface);border:6px solid var(--line);display:flex;align-items:center;justify-content:center;gap:30px">
          <span class="ui" style="font-size:52px;color:var(--text)">${tp.alvo === "titulo" ? "título tapado" : "thumb tapada"}</span>
          <span class="disp ac ck" style="font-size:110px">✓</span></div>`);
        d._card.appendChild(m); return m;
      });
    }
    d._rot = (d.rotulos || []).map((r) => {
      const e = el(`<div class="abs ui" style="left:${r.x}px;top:${r.y}px;font-size:${r.tam || 48}px;color:${r.ac === false ? "var(--text)" : "var(--bg)"};background:${r.ac === false ? "var(--surface2)" : "var(--accent)"};padding:14px 32px;border-radius:16px;white-space:nowrap;transform-origin:0 50%">${r.txt}</div>`);
      c.appendChild(e); return e;
    });
    if (d.selo) {
      d._selo = el(`<div class="abs disp" style="left:${d.selo.x ?? 1240}px;top:${d.selo.y ?? 150}px;font-size:${d.selo.tam || 110}px;color:var(--bg);background:var(--text);padding:6px 36px 18px;border-radius:18px">${d.selo.txt}</div>`);
      c.appendChild(d._selo);
    }
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3)), L = (x) => x - t0;
    if (d._cab) linha(d._cab.firstChild, lt, 0, sai);
    if (d._cards) d._cards.forEach((card, k) => {
      const e = outExpo(prog(lt, 0.1 + k * 0.08, 0.6 + k * 0.08));
      card.style.transform = `translateY(${(1 - e) * 80 + (1 - sa) * 1100}px)`;
      card.style.clipPath = `inset(${(1 - e) * 100}% 0 0 0)`;
      if (k === d.vazio) card.style.transform += ` scale(${1 + 0.03 * Math.sin(lt * 4)})`;
    });
    if (d._card) {
      const e = outExpo(prog(lt, 0.05, 0.6));
      d._card.style.clipPath = `inset(${(1 - e) * 100}% 0 0 0)`;
      d._card.style.transform = `translateY(${(1 - e) * 100 + (1 - sa) * 1100}px)`;
      d._maos.forEach((m, k) => {
        const tp = d.tapa[k], tk = L(tp.em), sai2 = d.tapa[k + 1] ? L(d.tapa[k + 1].em) - 0.25 : sai;
        const ent = outExpo(prog(lt, tk, tk + 0.4)), s2 = inCubic(prog(lt, sai2, sai2 + 0.25));
        m.style.transform = `translateX(${(1 - ent) * -1300 + s2 * 1300}px)`;
        m.querySelector(".ck").style.transform = `scale(${pop(lt, tk + 0.6, 0.35, 2.4)})`;
      });
    }
    d._rot.forEach((e, k) => { e.style.transform = `scale(${pop(lt, L(d.rotulos[k].em), 0.35, 1.8) * sa})`; });
    if (d._selo) d._selo.style.transform = `scale(${pop(lt, L(d.selo.em), 0.35, 2.4) * sa}) rotate(-8deg)`;
  },
  eventos(d, t0) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    if (d.modo === "grade") for (let k = 0; k < 6; k++) ev.push({ t: 0.1 + k * 0.08, tipo: "tick" });
    (d.rotulos || []).forEach((r) => ev.push({ t: r.em - t0, tipo: "pop" }));
    if (d.selo) ev.push({ t: d.selo.em - t0, tipo: "impacto" });
    (d.tapa || []).forEach((tp) => ev.push({ t: tp.em - t0, tipo: "whoosh" }, { t: tp.em - t0 + 0.6, tipo: "check" }));
    return ev;
  },
};

// ---------- fluxos: linhas de etapas lado a lado ----------
// d.linhas [{rotulo, em, passos:[{txt, ac, em?}]}]; passos sem "em" se espalham entre em e d.linhas[i].ate
M.fluxos = {
  build(c, d) {
    if (d.cab) { d._cab = el(`<div class="mask" style="left:140px;top:110px;width:1640px;height:120px"><span class="disp" style="font-size:110px">${d.cab}</span></div>`); c.appendChild(d._cab); }
    const n = d.linhas.length;
    d._ls = d.linhas.map((ln, i) => {
      const y = 330 + i * (n > 2 ? 220 : 300);
      const r = el(`<div class="abs" style="left:140px;top:${y}px;width:1680px">
        <div class="ui" style="font-size:46px;color:${ln.ac ? "var(--accent)" : "var(--muted)"};margin-bottom:24px">${ln.rotulo}</div>
        <div class="passos" style="display:flex;align-items:center;gap:22px;flex-wrap:nowrap"></div></div>`);
      ln._ps = ln.passos.map((p, k) => {
        if (k) r.querySelector(".passos").insertAdjacentHTML("beforeend", `<span class="disp seta" style="font-size:80px;color:var(--line)">→</span>`);
        const chip = el(`<div class="disp" style="font-size:${d.tam || 76}px;padding:20px 34px 26px;border-radius:20px;white-space:nowrap;background:${p.ac ? "var(--accent)" : "var(--surface2)"};color:${p.ac ? "var(--bg)" : "var(--text)"};transform-origin:0 50%">${p.txt}</div>`);
        r.querySelector(".passos").appendChild(chip); return chip;
      });
      ln._setas = [...r.querySelectorAll(".seta")];
      c.appendChild(r); return r;
    });
  },
  update(c, lt, dur, d, t0) {
    const sai = dur - 0.3, sa = 1 - inCubic(prog(lt, sai, sai + 0.3));
    if (d._cab) linha(d._cab.firstChild, lt, 0, sai);
    d.linhas.forEach((ln, i) => {
      const ini = ln.em - t0, fim = (ln.ate != null ? ln.ate - t0 : ini + 0.4 * ln.passos.length);
      d._ls[i].style.transform = `translateX(${(1 - sa) * -1900}px)`;
      d._ls[i].firstElementChild.style.opacity = lt >= ini ? 1 : 0;
      ln._ps.forEach((chip, k) => {
        const tk = ln.passos[k].em != null ? ln.passos[k].em - t0 : ini + (k / Math.max(1, ln.passos.length - 1)) * (fim - ini);
        chip.style.transform = `scale(${pop(lt, tk, 0.35, 1.8)})`;
        if (k) ln._setas[k - 1].style.color = lt >= tk ? "var(--muted)" : "transparent";
      });
    });
  },
  eventos(d, t0) {
    const ev = [{ t: 0, tipo: "whoosh" }];
    d.linhas.forEach((ln) => {
      const ini = ln.em - t0, fim = (ln.ate != null ? ln.ate - t0 : ini + 0.4 * ln.passos.length);
      ln.passos.forEach((p, k) => ev.push({ t: p.em != null ? p.em - t0 : ini + (k / Math.max(1, ln.passos.length - 1)) * (fim - ini), tipo: p.ac ? "moeda" : "pop" }));
    });
    return ev;
  },
};
