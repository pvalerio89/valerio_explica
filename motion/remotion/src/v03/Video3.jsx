// Vídeo 3 (os primeiros 30 segundos) no estilo "janelas e ícones": ritmo pausado, câmera deslizando entre grupos de janelas.
// Função pura do frame (useCurrentFrame). Sem Math.random. Roteiro de tomadas em roteiro.js.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { loadFont } from "@remotion/google-fonts/DMSerifDisplay";
import ICONES from "../icones.json";
import PAL from "./palavras.json";
import { TOMADAS } from "./roteiro";

const { fontFamily: SERIF } = loadFont();
export const SANS = "Bahnschrift, 'Segoe UI', sans-serif";
export const UI = "'Segoe UI', sans-serif";
export const C = { bg: "#0e1114", jan: "#171b21", barra: "#1f252c", linha: "#2a3038", sup: "#20262e", texto: "#f2f4f6", cinza: "#8a939e", verde: "#22e07a", papel: "#ece4d4" };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = Easing.inOut(Easing.cubic);
const fmt = (n) => Math.round(n).toLocaleString("pt-BR");
const ESPACO = 2500; // distância entre grupos na mesa
const GLIDE = 1.0; // duração do deslize da câmera

// ================= peças =================
export const Icone = ({ nome, tam, p = 1, semA2 }) => {
  const base = semA2 ? ICONES[nome].replace(/<[^>]*class="a2"[^>]*\/>/g, "") : ICONES[nome];
  const svg = base
    .replace(/<(path|circle|rect)([^>]*?)class="a"([^>]*?)\/>/g, `<$1$2$3 fill="${C.verde}" stroke="none" style="transform-box:fill-box;transform-origin:center;transform:scale(${clamp(p * 1.3 - 0.3)})"/>`)
    .replace(/<(path|circle|rect)((?![^>]*fill=)[^>]*?)\/>/g, (m, tag, rest) => {
      const verde = rest.includes('class="a2"');
      return `<${tag}${rest.replace('class="a2"', "")} pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(p)}" ${verde ? `stroke="${C.verde}"` : ""}/>`;
    });
  return (
    <svg width={tam} height={tam} viewBox="0 0 400 400" style={{ overflow: "visible", flex: "none" }}>
      <g fill="none" stroke={C.texto} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: svg }} />
    </svg>
  );
};

const Thumb = ({ w, h, k = 0, destaque, children }) => (
  <div style={{ width: w, height: h, borderRadius: Math.max(8, w * 0.035), background: destaque ? C.bg : C.sup, position: "relative", overflow: "hidden",
    outline: destaque ? `${Math.max(3, w * 0.012)}px solid ${C.verde}` : "none", flex: "none" }}>
    {children || (<>
      <div style={{ position: "absolute", left: "8%", bottom: "13%", width: `${42 + ((k * 31) % 36)}%`, height: "10%", borderRadius: 99, background: destaque || k % 4 === 1 ? C.verde : "#3a424c" }} />
      <div style={{ position: "absolute", right: "8%", top: "16%", width: "26%", height: "42%", borderRadius: "50%", background: k % 2 ? "#2c343d" : "#262d35" }} />
    </>)}
  </div>
);

const Pilula = ({ txt, s, ac = true, tam = 40, style }) => (
  <div style={{ position: "absolute", fontFamily: UI, fontWeight: 700, fontSize: tam, color: ac ? C.bg : C.texto, background: ac ? C.verde : C.sup,
    padding: `${tam * 0.25}px ${tam * 0.65}px`, borderRadius: tam * 0.4, whiteSpace: "nowrap", transform: `scale(${s})`, transformOrigin: "0 50%", ...style }}>{txt}</div>
);

// ================= corpos de janela (cada um recebe t, fps, w, h do corpo e as props) =================
const sp = (t, em, fps, cfg = { damping: 13, stiffness: 160 }) => (t < em ? 0 : spring({ frame: (t - em) * fps, fps, config: cfg }));

const CORPOS = {
  feed: ({ t, w, h, d }) => {
    const rola = interpolate(t, [d.de ?? 0, d.para], [0, 420], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
    const cx = interpolate(t, [d.para - 0.6, d.para], [w * 0.75, w * 0.18], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: io });
    const cy = interpolate(t, [d.para - 0.6, d.para], [h * 0.8, h * 0.28], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: io });
    const tw = (w - 34 * 2 - 60) / 3;
    return (<>
      <div style={{ position: "absolute", left: 34, top: 30 - rola, display: "grid", gridTemplateColumns: `repeat(3, ${tw}px)`, gap: 30 }}>
        {Array.from({ length: 18 }, (_, k) => <Thumb key={k} w={tw} h={tw * 0.5625} k={k} destaque={k === 6 && t >= d.para} />)}
      </div>
      {d.cursor !== false && <div style={{ position: "absolute", left: cx, top: cy, transform: `scale(${1 - 0.18 * Math.sin(Math.PI * clamp((t - d.para) / 0.25))})` }}><Icone nome="clique" tam={110} /></div>}
    </>);
  },
  icone: ({ t, w, h, d, em }) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: d.lado ? "row" : "column", alignItems: "center", justifyContent: "center", gap: d.lado ? 40 : 14, padding: 30 }}>
      <Icone nome={d.icone} tam={Math.min(w, h) * (d.texto ? 0.5 : 0.62)} p={clamp((t - em - 0.15) / 0.8)} />
      {d.texto && <div style={{ fontFamily: d.sans ? SANS : SERIF, fontStyle: d.sans ? "normal" : "italic", fontWeight: d.sans ? 700 : 400, fontSize: d.tam || 64,
        color: d.ac ? C.verde : C.texto, textAlign: "center", lineHeight: 1.05 }}>{d.texto}</div>}
    </div>
  ),
  texto: ({ t, w, h, d, em, fps }) => {
    const s = sp(t, em + 0.15, fps, { damping: 16, stiffness: 120 });
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px", gap: 16 }}>
        {d.sobre && <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 34, color: C.cinza }}>{d.sobre}</div>}
        <div style={{ fontFamily: d.sans ? SANS : SERIF, fontStyle: d.sans ? "normal" : "italic", fontWeight: d.sans ? 700 : 400, fontSize: d.tam || 92, lineHeight: 1.05,
          color: d.ac ? C.verde : C.texto, transform: `translateY(${(1 - s) * 30}px)`, opacity: clamp(s * 1.6) }}>{d.txt}</div>
        {d.depois && <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 40, color: d.depoisAc === false ? C.cinza : C.verde, opacity: t >= d.depoisEm ? 1 : 0,
          transform: `translateY(${(1 - sp(t, d.depoisEm, fps)) * 20}px)` }}>{d.depois}</div>}
      </div>
    );
  },
  lista: ({ t, w, d, fps }) => (
    <div style={{ position: "absolute", left: 50, right: 40, top: 40 }}>
      {d.itens.map((it, k) => {
        const previa = d.previaEm != null && t >= d.previaEm && t < it.em;
        const s = previa ? 1 : sp(t, it.em, fps, { damping: 16, stiffness: 140 });
        const ck = it.check != null ? clamp((t - it.check) / 0.25) : 0;
        const r = it.risca != null ? clamp((t - it.risca) / 0.35) : 0;
        const tam = d.tam || 56;
        return (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: tam * 0.55, opacity: clamp(s * 1.6), transform: `translateX(${(1 - s) * -40}px)` }}>
            {d.marca === "check" && <div style={{ width: tam * 0.9, height: tam * 0.9, borderRadius: tam * 0.2, border: `${tam * 0.09}px solid ${ck > 0 ? C.verde : C.texto}`, background: ck > 0 ? C.verde : "transparent", flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={tam * 0.6} height={tam * 0.6} viewBox="0 0 96 96"><path d="M14 50 L38 72 L82 24" fill="none" stroke={C.bg} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - ck} /></svg>
            </div>}
            {d.marca === "num" && <div style={{ width: tam * 0.95, height: tam * 0.95, borderRadius: "50%", background: it.ac ? C.verde : C.sup, color: it.ac ? C.bg : C.texto, fontFamily: SANS, fontWeight: 700, fontSize: tam * 0.6, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>{k + 1}</div>}
            {d.marca === "seta" && <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: tam, color: C.verde }}>→</div>}
            {previa ? <div style={{ height: tam * 0.5, width: 420 - k * 60, borderRadius: 99, background: C.sup }} /> :
            <div style={{ position: "relative", fontFamily: SANS, fontWeight: 700, fontSize: tam, color: r > 0.5 ? C.cinza : it.ac ? C.verde : C.texto, whiteSpace: "nowrap" }}>
              {it.txt}
              {it.risca != null && <div style={{ position: "absolute", left: -8, right: -8, top: "52%", height: tam * 0.11, background: C.verde, transformOrigin: "0 50%", transform: `scaleX(${r})` }} />}
              {it.tag && <span style={{ marginLeft: 20, fontFamily: UI, fontSize: tam * 0.42, color: C.bg, background: C.verde, padding: "4px 14px", borderRadius: 999, verticalAlign: "middle" }}>{it.tag}</span>}
            </div>}
          </div>
        );
      })}
    </div>
  ),
  contador: ({ t, w, h, d, em }) => {
    const v = interpolate(t, [d.contaEm ?? em + 0.3, (d.contaEm ?? em + 0.3) + (d.dur || 1.2)], [d.de || 0, d.ate], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 34, padding: "0 40px" }}>
        {d.icone && <Icone nome={d.icone} tam={Math.min(h * 0.55, 200)} p={clamp((t - em - 0.1) / 0.8)} />}
        <div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: d.tam || 130, color: d.ac ? C.verde : C.texto, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{(d.pre || "") + (d.casas ? v.toFixed(d.casas).replace(".", ",") : fmt(v)) + (d.suf || "")}</div>
          {d.rotulo && <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 38, color: C.cinza, marginTop: 8 }}>{d.rotulo}</div>}
        </div>
      </div>
    );
  },
  mock: ({ t, w, h, d, fps }) => {
    const th = d.thumb || {};
    const tw = w - 80, thh = tw * 0.5625;
    const canto = d.cantoEm != null ? clamp((t - d.cantoEm) / 0.4) : 0;
    return (<>
      <div style={{ position: "absolute", left: 40, top: 34 }}>
        <Thumb w={tw} h={thh} destaque={th.destaque}>
          {th.texto && <div style={{ position: "absolute", left: "6%", top: "10%", width: "88%", fontFamily: SANS, fontWeight: 700, fontSize: th.tam || tw * 0.09, lineHeight: 1, color: C.texto }}>{th.texto}</div>}
          {th.paes && (<>
            <div style={{ position: "absolute", left: "14%", top: "20%", width: "28%", aspectRatio: "1", borderRadius: "50%", background: "#e9e4d8" }} />
            <div style={{ position: "absolute", left: "58%", top: "20%", width: "28%", aspectRatio: "1", borderRadius: "50%", background: "#2a2d31", border: "6px solid #44494f" }} />
          </>)}
          {th.rosto && <Img src={staticFile("mascote.png")} style={{ position: "absolute", left: "4%", top: "8%", height: "84%", borderRadius: "50%" }} />}
          {th.rotulo && <div style={{ position: "absolute", right: "6%", top: "12%", width: "44%", fontFamily: SANS, fontWeight: 700, fontSize: tw * 0.085, lineHeight: 0.95, color: C.texto }}>{th.rotulo}</div>}
          <div style={{ position: "absolute", right: 12, bottom: 10, fontFamily: UI, fontWeight: 700, fontSize: Math.max(18, tw * 0.03), color: C.texto, background: "rgba(0,0,0,.8)", padding: "2px 10px", borderRadius: 6 }}>8:12</div>
          {d.cantoEm != null && <div style={{ position: "absolute", right: 0, bottom: 0, width: "34%", height: "30%", border: `6px solid ${C.verde}`, borderRadius: 10, opacity: canto, background: "rgba(34,224,122,.12)" }} />}
        </Thumb>
        {d.tituloVideo && <div style={{ display: "flex", gap: 18, marginTop: 22, alignItems: "flex-start" }}>
          <div style={{ width: 58, height: 58, borderRadius: 29, background: C.linha, flex: "none" }} />
          <div style={{ fontFamily: UI, fontWeight: 700, fontSize: d.tamTit || 40, color: C.texto, lineHeight: 1.15 }}>{d.tituloVideo}</div>
        </div>}
      </div>
      {(d.rotulos || []).map((r, k) => <Pilula key={k} txt={r.txt} s={sp(t, r.em, fps, { damping: 12, stiffness: 170 })} ac={r.ac !== false} tam={r.tam || 38} style={{ left: r.x, top: r.y }} />)}
      {d.selo && <div style={{ position: "absolute", left: d.selo.x ?? w - 360, top: d.selo.y ?? 60, fontFamily: SANS, fontWeight: 700, fontSize: d.selo.tam || 70, color: C.bg, background: C.texto,
        padding: "4px 28px 12px", borderRadius: 14, transform: `scale(${sp(t, d.selo.em, fps, { damping: 9, stiffness: 220 })}) rotate(-8deg)` }}>{d.selo.txt}</div>}
      {(d.tapa || []).map((tp, k) => {
        const prox = d.tapa[k + 1]?.em ?? 1e9;
        const e = clamp((t - tp.em) / 0.4), s2 = clamp((t - prox + 0.25) / 0.25);
        const alvoTop = tp.alvo === "titulo" ? 34 + thh + 8 : 26, alvoH = tp.alvo === "titulo" ? h - (34 + thh + 8) - 10 : thh + 16;
        return (
          <div key={k} style={{ position: "absolute", left: 30, top: alvoTop, width: w - 60, height: alvoH, borderRadius: 18, background: C.barra, border: `4px solid ${C.linha}`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 20, transform: `translateX(${(1 - io(e)) * -w * 1.1 + io(s2) * w * 1.1}px)` }}>
            <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 40, color: C.texto }}>{tp.alvo === "titulo" ? "título tapado" : "thumb tapada"}</span>
            <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 70, color: C.verde, transform: `scale(${sp(t, tp.em + 0.6, fps)})` }}>✓</span>
          </div>
        );
      })}
    </>);
  },
  fluxo: ({ t, d, fps }) => (
    <div style={{ position: "absolute", left: 40, right: 40, top: 0, bottom: 0, display: "flex", alignItems: "center", gap: 16, flexWrap: "nowrap" }}>
      {d.passos.map((p, k) => {
        const s = sp(t, p.em, fps, { damping: 12, stiffness: 170 });
        return (
          <React.Fragment key={k}>
            {k > 0 && <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 56, color: s > 0 ? C.cinza : "transparent" }}>→</div>}
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: d.tam || 54, padding: "14px 26px 18px", borderRadius: 16, whiteSpace: "nowrap",
              background: p.ac ? C.verde : C.sup, color: p.ac ? C.bg : C.texto, transform: `scale(${s})` }}>{p.txt}</div>
          </React.Fragment>
        );
      })}
    </div>
  ),
  missao: ({ t, w, h, d, em, fps }) => {
    const s = sp(t, em + 0.1, fps, { damping: 14, stiffness: 120 });
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 70px", gap: 60 }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: h * 0.82, color: C.verde, lineHeight: 0.9, transform: `translateY(${(1 - s) * 60}px)`, opacity: clamp(s * 2) }}>{d.n}</div>
        <div>
          <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 40, color: C.verde }}>MISSÃO {d.n} DE 4</div>
          <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: d.tam || 110, color: C.texto, lineHeight: 0.95, marginTop: 10 }}>{d.titulo}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
            {[1, 2, 3, 4].map((k) => <div key={k} style={{ width: 40, height: 40, borderRadius: 10, border: `6px solid ${k <= d.n ? C.verde : C.linha}`, background: k < d.n ? C.verde : "transparent",
              transform: `scale(${sp(t, em + 0.4 + k * 0.08, fps)}) rotate(${k === d.n ? 45 : 0}deg)` }} />)}
          </div>
        </div>
      </div>
    );
  },
  celular: ({ t, w, h, d, em }) => {
    const enc = d.encolheEm != null ? io(clamp((t - d.encolheEm) / 1.6)) : 0;
    const tw = interpolate(enc, [0, 1], [w * 0.62, 120]);
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 60 }}>
        <div style={{ width: h * 0.48, height: h * 0.86, borderRadius: 40, background: "#050608", border: "6px solid #3a414b", position: "relative", overflow: "hidden", flex: "none" }}>
          {Array.from({ length: 5 }, (_, k) => <div key={k} style={{ position: "absolute", left: 16, right: 16, top: 20 + k * (h * 0.17), height: h * 0.13, borderRadius: 10, background: k === 1 ? C.bg : C.sup, outline: k === 1 ? `3px solid ${C.verde}` : "none" }} />)}
        </div>
        {d.encolheEm != null && <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
          <Thumb w={tw} h={tw * 0.5625} destaque k={1} />
          <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 36, color: C.cinza, opacity: enc }}>tamanho real no celular</div>
        </div>}
      </div>
    );
  },
  medidor: ({ t, w, h, d, em }) => {
    const p = clamp(d.valor / (d.max || 100)) * clamp(interpolate(t, [em + 0.3, em + 1.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) }), 0, 1.1);
    const R = Math.min(w * 0.38, h * 0.62), cx = w / 2, cy = h * 0.72;
    const arco = (a0, a1, r) => { const P = (a) => [cx + Math.cos(Math.PI + a * Math.PI) * r, cy + Math.sin(Math.PI + a * Math.PI) * r]; const [x0, y0] = P(a0), [x1, y1] = P(a1); return `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`; };
    return (
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        <path d={arco(0, 1, R)} fill="none" stroke={C.linha} strokeWidth="40" strokeLinecap="round" />
        <path d={arco(0, 1, R)} fill="none" stroke={C.verde} strokeWidth="40" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - clamp(p)} />
        <g transform={`translate(${cx} ${cy}) rotate(${p * 180})`}><path d={`M0 -16 L${-R + 50} 0 L0 16Z`} fill={C.texto} /><circle r="28" fill={C.texto} /></g>
        <text x={cx} y={cy + 90} textAnchor="middle" fontFamily="Bahnschrift" fontWeight="700" fontSize="80" fill={C.texto}>{d.rotulo}</text>
      </svg>
    );
  },
  barras: ({ t, w, d, fps }) => {
    const max = Math.max(...d.itens.map((x) => x.valor));
    const venc = d.itens.reduce((m, x, i) => (x.valor > d.itens[m].valor ? i : m), 0);
    return (
      <div style={{ position: "absolute", left: 40, right: 40, top: 46 }}>
        {d.itens.map((it, i) => {
          const g = Easing.out(Easing.cubic)(clamp((t - ((d.cresceEm ?? d.em) + i * 0.25)) / 1.2));
          const ganhou = i === venc && t >= d.vencedorEm;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 34 }}>
              <div style={{ width: 230, fontFamily: SANS, fontWeight: 700, fontSize: 48, color: C.texto, whiteSpace: "nowrap" }}>{it.txt}</div>
              <div style={{ flex: 1, height: 70, borderRadius: 14, background: C.sup }}><div style={{ height: "100%", width: `${(it.valor / max) * g * 100}%`, borderRadius: 14, background: ganhou ? C.verde : "#3a424c" }} /></div>
              <div style={{ width: 150, fontFamily: SANS, fontWeight: 700, fontSize: 52, color: ganhou ? C.verde : C.texto }}>{(it.valor * g).toFixed(1).replace(".", ",")}%</div>
              <div style={{ width: 70 }}>{i === venc && t >= d.vencedorEm && <Icone nome="trofeu" tam={70} p={clamp((t - d.vencedorEm) / 0.6)} />}</div>
            </div>
          );
        })}
      </div>
    );
  },
  grafico: ({ t, w, h, d }) => {
    const X0 = 50, X1 = w - 50, Y0 = h - 60, Y1 = 50;
    const max = Math.max(...d.pontos, ...(d.pontos2 || [0])) * 1.1;
    const P = (arr) => arr.map((v, i) => [X0 + (i / (arr.length - 1)) * (X1 - X0), Y0 - (v / max) * (Y0 - Y1)]);
    const path = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    const p1 = P(d.pontos), p2 = d.pontos2 ? P(d.pontos2) : null;
    const prog1 = Easing.out(Easing.cubic)(clamp((t - d.em) / (d.dur || 1.8)));
    const prog2 = d.em2 != null ? Easing.out(Easing.cubic)(clamp((t - d.em2) / (d.dur || 1.8))) : 0;
    return (<>
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        {[0, 1, 2, 3].map((k) => <line key={k} x1={X0} x2={X1} y1={Y0 - (k / 3) * (Y0 - Y1)} y2={Y0 - (k / 3) * (Y0 - Y1)} stroke={C.sup} strokeWidth="3" />)}
        <path d={path(p1)} fill="none" stroke={d.cor1 || C.cinza} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - prog1} />
        {p2 && <path d={path(p2)} fill="none" stroke={d.cor2 || C.verde} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - prog2} />}
      </svg>
      {(d.anot || []).map((a, k) => { const [x, y] = (a.serie === 2 ? p2 : p1)[a.i]; return <Pilula key={k} txt={a.txt} ac={a.ac !== false} tam={34} s={t >= a.em ? 1 : 0} style={{ left: Math.min(x, w - 300), top: y - 70 }} />; })}
    </>);
  },
  escada: ({ t, w, h, d, fps }) => {
    const n = 4, sw = (w - 80) / n, sh = (h - 80) / n;
    // rótulos por degrau: d.rotulos = [{k, txt, em}] (rotulo1 = degrau 0)
    const rs = [...(d.rotulo1 ? [{ k: 0, txt: d.rotulo1, em: d.rotulo1Em ?? 0 }] : []), ...(d.rotulos || [])];
    const lbl = (k) => { const r = rs.filter((x) => x.k === k && t >= x.em).pop(); return r ? r.txt : null; };
    let alvo = 0, tAlvo = 0;
    (d.sobe || []).forEach((s, i) => { if (t >= s) { alvo = i + 1; tAlvo = s; } });
    const caiu = d.falhaEm != null && t >= d.falhaEm;
    const m = io(clamp((t - tAlvo) / 0.5));
    const pos = (k) => [40 + k * sw + sw / 2 - 50, h - 40 - (k + 1) * sh - 70];
    let [x, y] = pos(alvo);
    if (alvo > 0 && m < 1) { const [x0, y0] = pos(alvo - 1); x = x0 + (x - x0) * m; y = y0 + (y - y0) * m - Math.sin(Math.PI * m) * 60; }
    if (caiu) { const c = io(clamp((t - d.falhaEm) / 0.5)); const [x0, y0] = pos(0); x = x + (x0 - x) * c; y = y + (y0 - y) * c; }
    return (<>
      {Array.from({ length: n }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: 40 + k * sw, top: h - 40 - (k + 1) * sh, width: sw, height: (k + 1) * sh, background: C.sup, borderTop: `8px solid ${lbl(k) != null ? C.verde : "#4a535e"}` }}>
          <div style={{ fontFamily: UI, fontWeight: 700, fontSize: 30, color: lbl(k) != null ? C.verde : C.cinza, padding: 14 }}>{lbl(k) ?? ["10", "100", "1.000", "100.000"][k]}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: x, top: y, width: 100, height: 64, borderRadius: 14, background: caiu ? C.cinza : C.verde, transform: `rotate(${caiu ? -10 : 0}deg)` }}>
        <div style={{ position: "absolute", left: 40, top: 16, borderLeft: `28px solid ${C.bg}`, borderTop: "16px solid transparent", borderBottom: "16px solid transparent" }} />
      </div>
    </>);
  },
  mascote: ({ t, w, h, d, em, fps }) => {
    const s = sp(t, em + 0.1, fps, { damping: 14, stiffness: 120 });
    const tam = Math.min(w, h) * 0.78;
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("mascote.png")} style={{ width: tam, height: tam, borderRadius: "50%", transform: `scale(${s})` }} />
        {d.balao && <Pilula txt={d.balao} s={sp(t, d.balaoEm, fps)} tam={42} style={{ left: w * 0.55, top: h * 0.08 }} />}
      </div>
    );
  },
  rostos: ({ t, w, h, d, fps }) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
      {d.itens.map((it, k) => {
        const s = sp(t, it.em, fps, { damping: 12, stiffness: 160 });
        return (
          <div key={k} style={{ textAlign: "center", transform: `scale(${s})` }}>
            <Img src={staticFile("mascote.png")} style={{ width: h * 0.48, height: h * 0.48, borderRadius: "50%", transform: `rotate(${[-8, 0, 8][k]}deg)`, filter: `hue-rotate(${k * 0}deg)` }} />
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 60, color: C.texto, marginTop: 10 }}>{it.txt}</div>
          </div>
        );
      })}
    </div>
  ),
  balanca: ({ t, w, h, d }) => {
    let ang = 0;
    (d.estados || []).forEach((e) => { if (t >= e.em) ang = e.ang; });
    const prev = (d.estados || []).filter((e) => t >= e.em);
    const de = prev.length > 1 ? prev[prev.length - 2].ang : 0, tEm = prev.length ? prev[prev.length - 1].em : 0;
    const a = de + (ang - de) * Easing.out(Easing.back(1.6))(clamp((t - tEm) / 0.6));
    const cx = w / 2, cy = h * 0.42, L = w * 0.36;
    return (
      <svg width={w} height={h} style={{ position: "absolute", inset: 0 }}>
        <path d={`M${cx} ${cy} L${cx} ${h - 60} M${cx - 120} ${h - 60} H${cx + 120}`} stroke={C.cinza} strokeWidth="14" strokeLinecap="round" />
        <g transform={`rotate(${a} ${cx} ${cy})`}>
          <path d={`M${cx - L} ${cy} H${cx + L}`} stroke={C.texto} strokeWidth="14" strokeLinecap="round" />
          {[-1, 1].map((sg) => (
            <g key={sg} transform={`translate(${cx + sg * L} ${cy}) rotate(${-a})`}>
              <path d="M-90 70 Q0 130 90 70Z" fill={C.sup} stroke={C.texto} strokeWidth="8" />
              <text y="40" textAnchor="middle" fontFamily="Bahnschrift" fontWeight="700" fontSize="46" fill={sg < 0 ? C.texto : C.verde}>{sg < 0 ? d.esq : d.dir}</text>
            </g>
          ))}
        </g>
        <circle cx={cx} cy={cy} r="18" fill={C.verde} />
      </svg>
    );
  },
  inscreva: ({ t, w, h, d, em, fps }) => {
    const s = sp(t, em + 0.3, fps, { damping: 9, stiffness: 200 });
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 40 }}>
        <Icone nome="inscrever" tam={Math.min(h * 0.5, 220)} p={clamp((t - em) / 0.8)} />
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 80, color: C.bg, background: C.verde, padding: "14px 44px 20px", borderRadius: 20, transform: `scale(${s * (1 + 0.03 * Math.sin((t - em) * 5))})` }}>INSCREVA-SE</div>
      </div>
    );
  },
  fim: ({ t, w, h, d, em, fps }) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 60, padding: "0 70px" }}>
      <Img src={staticFile("mascote.png")} style={{ width: h * 0.72, height: h * 0.72, borderRadius: "50%", transform: `scale(${sp(t, em + 0.1, fps)}) translateY(${Math.sin(t * 1.6) * 8}px)` }} />
      <div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 140, color: C.texto, lineHeight: 0.9 }}>VALERIO</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 140, color: C.verde, lineHeight: 0.9 }}>EXPLICA</div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 54, color: C.cinza, marginTop: 20 }}>o que o YouTube não te conta</div>
      </div>
    </div>
  ),
};

// ================= janela =================
const Janela = ({ j, t, fps, ativa }) => {
  const { x, y, w, h, titulo, em, riscada } = j;
  if (t < em - 0.05) return null;
  const s = spring({ frame: (t - em) * fps, fps, config: { damping: 18, stiffness: 120 } });
  const r = riscada != null ? clamp((t - riscada) / 0.45) : 0;
  const Corpo = CORPOS[j.tipo];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transformOrigin: "50% 60%",
      transform: `translateY(${(1 - s) * 70}px) scale(${0.86 + 0.14 * s})`, opacity: clamp(s * 2) }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 26, background: C.jan, overflow: "hidden",
        boxShadow: "0 40px 90px rgba(0,0,0,.55), 0 0 0 2px rgba(255,255,255,.05)", filter: r ? `saturate(${1 - r * 0.8}) brightness(${1 - r * 0.35})` : "none" }}>
        <div style={{ height: 64, background: ativa ? C.verde : C.barra, display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
          {[0, 1, 2].map((k) => <div key={k} style={{ width: 18, height: 18, borderRadius: 9, background: ativa ? "rgba(14,17,20,.35)" : k === 2 ? C.verde : "#3a414b" }} />)}
          <div style={{ marginLeft: 18, fontFamily: UI, fontWeight: 700, fontSize: 32, color: ativa ? C.bg : C.cinza }}>{titulo}</div>
        </div>
        <div style={{ position: "relative", height: h - 64, overflow: "hidden" }}>
          <Corpo t={t} fps={fps} w={w} h={h - 64} d={j} em={em} />
        </div>
      </div>
      {riscada != null && (
        <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path d={`M${w * 0.08} ${h * 0.85} L${w * 0.92} ${h * 0.18}`} stroke={C.verde} strokeWidth="22" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - r} />
        </svg>
      )}
    </div>
  );
};

// ================= câmera =================
const enquadrar = (k) => {
  const js = TOMADAS[k].janelas;
  const x0 = Math.min(...js.map((j) => j.x)), x1 = Math.max(...js.map((j) => j.x + j.w));
  const y0 = Math.min(...js.map((j) => j.y)), y1 = Math.max(...js.map((j) => j.y + j.h));
  const z = Math.min(1.45, 1680 / (x1 - x0), 800 / (y1 - y0));
  return { x: (x0 + x1) / 2 + k * ESPACO, y: (y0 + y1) / 2 + (k % 2 ? 90 : -60), z };
};
const CAMS = TOMADAS.map((_, k) => enquadrar(k));
const camera = (t, k) => {
  const ini = TOMADAS[k].ini, fim = TOMADAS[k + 1]?.ini ?? PAL.duracao;
  const b = CAMS[k], a = k ? CAMS[k - 1] : { ...b, z: b.z * 1.12 };
  const p = io(clamp((t - ini) / GLIDE));
  const drift = 1 + 0.035 * clamp((t - ini - GLIDE) / Math.max(1, fim - ini - GLIDE));
  return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, z: (a.z + (b.z - a.z) * p) * drift, movendo: t - ini < GLIDE + 0.05 && k > 0 };
};

// ================= legenda em frases curtas =================
const FRASES = (() => {
  const out = []; let atual = [];
  PAL.palavras.forEach((p, k) => {
    atual.push(p);
    const prox = PAL.palavras[k + 1];
    if (/[.?!:,;]$/.test(p.w) || atual.length >= 5 || !prox || prox.f !== p.f || prox.b !== p.b) { out.push(atual); atual = []; }
  });
  return out.map((ws) => ({ txt: ws.map((w) => w.w).join(" ").replace(/[,:;]$/, ""), ini: ws[0].ini, fim: ws[ws.length - 1].fim }));
})();
const Legenda = ({ t, fps }) => {
  let i = -1;
  for (let k = 0; k < FRASES.length; k++) if (t >= FRASES[k].ini - 0.05) i = k; else break;
  if (i < 0) return null;
  const f = FRASES[i];
  if (t > f.fim + 0.7) return null;
  const s = spring({ frame: Math.max(0, t - f.ini + 0.05) * fps, fps, config: { damping: 20, stiffness: 140 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 58, textAlign: "center" }}>
      <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 76, color: C.texto, display: "inline-block",
        transform: `translateY(${(1 - s) * 22}px)`, opacity: clamp(s * 1.5), textShadow: "0 4px 24px rgba(0,0,0,.8)" }}>{f.txt}</span>
    </div>
  );
};

// ================= mesa =================
const Mesa = ({ t, fps, k, cam }) => {
  const visiveis = [k - 1, k, k + 1].filter((i) => i >= 0 && i < TOMADAS.length);
  // janela ativa: a que abriu por último (em toda a tomada atual)
  const abertas = TOMADAS[k].janelas.filter((j) => t >= j.em);
  const ativaId = abertas.length ? abertas.reduce((a, b) => (b.em > a.em ? b : a)) : null;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: TOMADAS.length * ESPACO + 3000, height: 2400, transformOrigin: "0 0",
        transform: `translate(${960 - cam.x * cam.z}px, ${470 - (cam.y + 600) * cam.z}px) scale(${cam.z})`,
        backgroundImage: "radial-gradient(circle, #232a32 2.4px, transparent 2.6px)", backgroundSize: "56px 56px" }}>
        {k === 0 && t < 0.9 && (() => {
          const a = spring({ frame: t * fps, fps, config: { damping: 12, stiffness: 160 } }), sai = clamp((t - 0.55) / 0.3);
          return (<div style={{ position: "absolute", left: 1000 - 150, top: 600 - 60 + 500 - 150, width: 300, height: 300, borderRadius: 70, background: C.verde, display: "flex", alignItems: "center", justifyContent: "center",
            transform: `scale(${a * (1 + sai * 1.5)})`, opacity: 1 - sai, boxShadow: "0 30px 70px rgba(0,0,0,.5)", zIndex: 5 }}>
            <div style={{ width: 0, height: 0, marginLeft: 22, borderLeft: `110px solid ${C.bg}`, borderTop: "66px solid transparent", borderBottom: "66px solid transparent" }} /></div>);
        })()}
        {visiveis.map((i) => (
          <div key={i} style={{ position: "absolute", left: i * ESPACO, top: 600 + (i % 2 ? 90 : -60) - (CAMS[i].y - CAMS[i].y) }}>
            {TOMADAS[i].janelas.map((j, q) => <Janela key={q} j={j} t={t} fps={fps} ativa={i === k && j === ativaId} />)}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Video3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let k = 0;
  for (let i = 0; i < TOMADAS.length; i++) if (t >= TOMADAS[i].ini) k = i;
  const cam = camera(t, k);
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {cam.movendo ? (
        <CameraMotionBlur shutterAngle={160} samples={5}><MesaQuadro /></CameraMotionBlur>
      ) : (
        <Mesa t={t} fps={fps} k={k} cam={cam} />
      )}
      <Legenda t={t} fps={fps} />
    </AbsoluteFill>
  );
};

// usado dentro do CameraMotionBlur (ele muda o frame de cada amostra)
const MesaQuadro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let k = 0;
  for (let i = 0; i < TOMADAS.length; i++) if (t >= TOMADAS[i].ini) k = i;
  return <Mesa t={t} fps={fps} k={k} cam={camera(t, k)} />;
};
