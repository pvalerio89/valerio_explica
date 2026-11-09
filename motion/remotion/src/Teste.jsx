// Teste de estilo (vídeo 2, 0 a 16,4 s) em Remotion.
// Cada quadro depende só do frame (useCurrentFrame). Sem Math.random: tudo determinístico.
// Ritmo: um corte a cada ~1,5 s, legenda palavra por palavra, câmera sempre em movimento, motion blur.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { loadFont } from "@remotion/google-fonts/DMSerifDisplay";
import PAL from "./palavras.json";
import CORTES from "./cortes.json";

const { fontFamily: SERIF } = loadFont();
const SANS = "Bahnschrift, 'Segoe UI', sans-serif";
const COR = { preto: "#0e1114", verde: "#22e07a", papel: "#ece4d4", texto: "#f2f4f6", tinta: "#15181c", cinza: "#8a939e", sup: "#1d232a" };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));

// ---------- fundos ----------
const Papel = () => (
  <AbsoluteFill style={{ backgroundColor: COR.papel }}>
    <svg width="1920" height="1080" style={{ position: "absolute", inset: 0, opacity: 0.55 }}>
      <filter id="grao"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.30  0 0 0 0 0.25  0 0 0 0.35 0" /></filter>
      <rect width="1920" height="1080" filter="url(#grao)" />
    </svg>
  </AbsoluteFill>
);
const Fundo = ({ tipo }) => (tipo === "papel" ? <Papel /> : <AbsoluteFill style={{ backgroundColor: tipo === "verde" ? COR.verde : COR.preto }} />);

// ---------- peças ----------
const Thumb = ({ w, h, destaque, k = 0, escuro = true }) => (
  <div style={{ width: w, height: h, borderRadius: w * 0.05, background: destaque ? COR.preto : escuro ? COR.sup : "#d6ccb8",
    border: destaque ? `${w * 0.03}px solid ${COR.verde}` : "none", position: "relative", overflow: "hidden", flex: "none" }}>
    <div style={{ position: "absolute", left: "8%", bottom: "12%", width: `${40 + ((k * 37) % 40)}%`, height: "9%", borderRadius: 99,
      background: destaque || k % 3 === 0 ? COR.verde : "#3a424c" }} />
    <div style={{ position: "absolute", left: "8%", bottom: "26%", width: "30%", height: "7%", borderRadius: 99, background: "#3a424c" }} />
    <div style={{ position: "absolute", right: "8%", top: "14%", width: "26%", height: "40%", borderRadius: "50%", background: k % 2 ? "#2c343d" : "#262d35" }} />
  </div>
);

const Feed = ({ lt }) => {
  const rolagem = (lt * 1500) % 2800;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingRight: 520 }}>
      <div style={{ width: 520, height: 980, borderRadius: 66, background: "#050608", border: "8px solid #3a414b", overflow: "hidden", transform: "rotate(-7deg) translateY(40px)", position: "relative" }}>
        <div style={{ position: "absolute", left: 26, right: 26, top: 20 - rolagem }}>
          {Array.from({ length: 16 }, (_, k) => (
            <div key={k} style={{ marginBottom: 24 }}><Thumb w={452} h={254} k={k} /></div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Grade = ({ lt, rapida }) => {
  const v = rapida ? 2600 : 900;
  return (
    <AbsoluteFill style={{ clipPath: "inset(0 0 330px 0)" }}><AbsoluteFill style={{ transform: "rotate(-12deg) scale(1.35)" }}>
      {Array.from({ length: 6 }, (_, r) => (
        <div key={r} style={{ position: "absolute", top: -200 + r * 260, left: -1400 + (((lt * v * (r % 2 ? 1 : 0.7)) + r * 333) % 680), display: "flex", gap: 40 }}>
          {Array.from({ length: 9 }, (_, k) => <Thumb key={k} w={400} h={225} k={k + r} />)}
        </div>
      ))}
    </AbsoluteFill></AbsoluteFill>
  );
};

const Para = ({ lt, fps }) => {
  const s = spring({ frame: lt * fps, fps, config: { damping: 11, stiffness: 160 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.25 + 0.75 * s}) rotate(${(1 - s) * -14}deg)`, boxShadow: "0 40px 80px rgba(0,0,0,.35)", borderRadius: 50 }}>
        <Thumb w={1100} h={618} destaque k={1} />
      </div>
    </AbsoluteFill>
  );
};

const Porque = ({ lt, fps }) => {
  const s = spring({ frame: lt * fps, fps, config: { damping: 9, stiffness: 180 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 470, color: COR.tinta, lineHeight: 1, transform: `scale(${2.2 - 1.2 * s}) rotate(-5deg)`, filter: `blur(${(1 - s) * 18}px)` }}>Por quê?</div>
    </AbsoluteFill>
  );
};

const Risco = ({ p, w, cor = COR.verde, top = 0 }) => (
  <div style={{ position: "absolute", left: -30, top, width: w + 60, height: 34, borderRadius: 20, background: cor, transformOrigin: "0 50%", transform: `scaleX(${p}) rotate(-3deg)` }} />
);

const Descricao = ({ lt }) => {
  const p = clamp((lt - 0.9) / 0.35);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 1100, padding: "60px 70px", borderRadius: 30, background: "#fbf8f1", boxShadow: "0 30px 70px rgba(0,0,0,.18)", transform: "rotate(2deg)", position: "relative" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 64, color: COR.tinta }}>Descrição</div>
        {[0.95, 0.8, 0.9, 0.6, 0.85].map((w, k) => <div key={k} style={{ height: 26, width: `${w * 100}%`, borderRadius: 13, background: "#ddd5c6", marginTop: 30 }} />)}
        <div style={{ position: "absolute", left: 70, top: 92 }}><Risco p={p} w={300} /></div>
      </div>
    </AbsoluteFill>
  );
};

const TAGS = ["#youtube", "#dicas", "#viral", "#algoritmo", "#2026", "#crescer"];
const Tags = ({ lt, fps }) => {
  const p = clamp((lt - 0.8) / 0.4);
  return (
    <AbsoluteFill>
      {TAGS.map((t, k) => {
        const s = spring({ frame: (lt - k * 0.06) * fps, fps, config: { damping: 12, stiffness: 140 } });
        const x = 220 + (k % 3) * 520, y = 260 + Math.floor(k / 3) * 300;
        return (
          <div key={k} style={{ position: "absolute", left: x, top: y + (1 - s) * -700, transform: `rotate(${(k % 2 ? 6 : -5)}deg)` }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 92, color: COR.texto, background: COR.sup, padding: "18px 44px", borderRadius: 26, position: "relative", opacity: p > 0.5 ? 0.45 : 1 }}>
              {t}<Risco p={p} w={t.length * 46} top={52} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Inscritos = ({ lt }) => {
  const n = Math.round(interpolate(lt, [0, 1.4], [0, 12483], { extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 3) }));
  const p = clamp((lt - 1.6) / 0.3);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 330, color: COR.tinta, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{n.toLocaleString("pt-BR")}</div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 120, color: COR.tinta }}>inscritos</div>
        <svg width="1100" height="520" style={{ position: "absolute", left: -60, top: -40, overflow: "visible" }}>
          <path d="M40 40 L1060 480" stroke={COR.tinta} strokeWidth="44" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

const Mascote = ({ lt, fps }) => {
  const s = spring({ frame: lt * fps, fps, config: { damping: 13, stiffness: 120 } });
  const t1 = spring({ frame: (lt - 1.0) * fps, fps, config: { damping: 9, stiffness: 200 } });
  const t2 = spring({ frame: (lt - 2.2) * fps, fps, config: { damping: 9, stiffness: 200 } });
  return (
    <AbsoluteFill>
      <Img src={staticFile("mascote.png")} style={{ position: "absolute", left: 300, top: 160, width: 680, height: 680, borderRadius: "50%",
        border: `16px solid ${COR.tinta}`, transform: `scale(${s}) rotate(${(1 - s) * -20}deg)` }} />
      <div style={{ position: "absolute", left: 1100, top: 200, transform: `scale(${t1}) rotate(4deg)`, transformOrigin: "0 100%" }}>
        <Thumb w={420} h={236} destaque k={2} />
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 84, color: COR.tinta, marginTop: 16 }}>imagem pequena</div>
      </div>
      <div style={{ position: "absolute", left: 1100, top: 620, transform: `scale(${t2}) rotate(-3deg)`, transformOrigin: "0 50%",
        fontFamily: SANS, fontWeight: 700, fontSize: 76, color: COR.texto, background: COR.tinta, padding: "18px 40px", borderRadius: 22 }}>+ frase curta</div>
    </AbsoluteFill>
  );
};

const Segundo = ({ lt }) => {
  const ang = interpolate(lt, [0, 1.2], [0, 1440], { extrapolateRight: "clamp", easing: (x) => 1 - Math.pow(1 - x, 4) });
  return (
    <AbsoluteFill>
      <svg width="900" height="900" viewBox="-450 -450 900 900" style={{ position: "absolute", left: 200, top: 150 }}>
        <circle r="330" fill="none" stroke={COR.texto} strokeWidth="40" />
        <path d="M-60 -400 H60 M0 -400 V-330" stroke={COR.texto} strokeWidth="40" strokeLinecap="round" />
        <g transform={`rotate(${ang})`}><path d="M0 0 V-250" stroke={COR.verde} strokeWidth="36" strokeLinecap="round" /></g>
        <circle r="34" fill={COR.verde} />
      </svg>
      <div style={{ position: "absolute", left: 1100, top: 380, fontFamily: SANS, fontWeight: 700, fontSize: 300, color: COR.verde, lineHeight: 1 }}>&lt;1s</div>
    </AbsoluteFill>
  );
};

const CENAS = { feed: Feed, grade: Grade, gradeRapida: (p) => <Grade {...p} rapida />, para: Para, porque: Porque,
  descricao: Descricao, tags: Tags, inscritos: Inscritos, mascote: Mascote, segundo: Segundo };

// ---------- legenda palavra por palavra ----------
const Legenda = ({ t, fundo, fps }) => {
  const ps = PAL.palavras;
  let i = -1;
  ps.forEach((p, k) => { if (t >= p.ini - 0.04) i = k; });
  if (i < 0 || t > ps[i].fim + 0.5) return null;
  const p = ps[i];
  const s = spring({ frame: (t - p.ini + 0.04) * fps, fps, config: { damping: 14, stiffness: 260 } });
  const ant = ps.slice(Math.max(0, i - 3), i).filter((q) => p.ini - q.ini < 1.0).slice(-2).map((q) => q.w).join(" ");
  const corP = fundo === "preto" ? COR.texto : COR.tinta;
  const corA = fundo === "preto" ? COR.verde : fundo === "verde" ? COR.tinta : COR.tinta;
  const palavra = p.w.replace(/[.,:?!"]+$/g, "");
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 70, textAlign: "center" }}>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 66, color: corP, opacity: 0.9, height: 80 }}>{ant}</div>
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 168, lineHeight: 1, color: corA,
        transform: `scale(${1.2 - 0.2 * s}) translateY(${(1 - s) * 20}px)`, filter: `blur(${Math.max(0, 1 - (t - p.ini + 0.04) / 0.12) * 12}px)`,
        textShadow: fundo === "preto" ? "0 6px 30px rgba(0,0,0,.6)" : "none" }}>{palavra}</div>
    </div>
  );
};

export const Teste = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cs = CORTES.cortes;
  let k = 0;
  cs.forEach((c, i) => { if (t >= c.ini) k = i; });
  const c = cs[k], dur = (cs[k + 1]?.ini ?? PAL.duracao) - c.ini, lt = t - c.ini;
  // câmera: entra com um "soco" de zoom e segue avançando até o próximo corte
  const soco = spring({ frame: lt * fps, fps, config: { damping: 16, stiffness: 220 } });
  const zoom = (1 + 0.22 * (1 - soco)) * (1 + 0.07 * (lt / dur));
  const giro = (k % 2 ? 1 : -1) * (1 - soco) * 4;
  const Cena = CENAS[c.cena];
  const comLegenda = c.cena !== "porque";
  return (
    <AbsoluteFill style={{ backgroundColor: COR.preto }}>
      <CameraMotionBlur shutterAngle={200} samples={6}>
        <AbsoluteFill>
          <Fundo tipo={c.fundo} />
          <AbsoluteFill style={{ transform: `translateY(${comLegenda ? -110 : 0}px) scale(${zoom}) rotate(${giro}deg)` }}>
            <Cena lt={lt} fps={fps} dur={dur} />
          </AbsoluteFill>
        </AbsoluteFill>
      </CameraMotionBlur>
      {/* legenda fora do motion blur da câmera: precisa ficar nítida */}
      {comLegenda && <Legenda t={t} fundo={c.fundo} fps={fps} />}
    </AbsoluteFill>
  );
};
