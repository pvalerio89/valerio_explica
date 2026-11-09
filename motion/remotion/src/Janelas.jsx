// Teste "janelas e ícones" (vídeo 2, 0 a 16,4 s): ritmo pausado, câmera deslizando numa mesa de janelas.
// Função pura do frame. Sem Math.random. Tempos das falas vêm de palavras.json.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { loadFont } from "@remotion/google-fonts/DMSerifDisplay";
import PAL from "./palavras.json";
import ICONES from "./icones.json";

const { fontFamily: SERIF } = loadFont();
const SANS = "Bahnschrift, 'Segoe UI', sans-serif";
const UI = "'Segoe UI', sans-serif";
const C = { bg: "#0e1114", jan: "#171b21", barra: "#1f252c", linha: "#2a3038", sup: "#20262e", texto: "#f2f4f6", cinza: "#8a939e", verde: "#22e07a" };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const io = Easing.inOut(Easing.cubic);

// tempo de uma palavra (primeira ocorrência a partir de um índice)
const quando = (w, desde = 0) => {
  const i = PAL.palavras.findIndex((p, k) => k >= desde && p.w.toLowerCase().replace(/[^a-zà-ú]/g, "") === w);
  return i >= 0 ? PAL.palavras[i].ini : 0;
};
const T = {
  para: quando("para"), porque: quando("por"), descricao: quando("descrição"), tags: quando("tags"),
  inscritos: quando("inscritos"), imagem: quando("imagem"), pequena: quando("pequena"), curta: quando("curta"), segundo: quando("segundo"),
};

// ---------- ícone que se desenha (traço branco, detalhes verdes) ----------
const Icone = ({ nome, tam, p = 1, cor = C.texto, semA2 }) => {
  const base = semA2 ? ICONES[nome].replace(/<[^>]*class="a2"[^>]*\/>/g, "") : ICONES[nome];
  const svg = base
    .replace(/<(path|circle|rect)([^>]*?)class="a"([^>]*?)\/>/g, `<$1$2$3 fill="${C.verde}" stroke="none" style="transform-box:fill-box;transform-origin:center;transform:scale(${clamp(p * 1.3 - 0.3)})"/>`)
    .replace(/<(path|circle|rect)((?![^>]*fill=)[^>]*?)\/>/g, (m, tag, rest) => {
      const verde = rest.includes('class="a2"');
      return `<${tag}${rest.replace('class="a2"', "")} pathLength="1" stroke-dasharray="1" stroke-dashoffset="${1 - clamp(p)}" ${verde ? `stroke="${C.verde}"` : ""}/>`;
    });
  return (
    <svg width={tam} height={tam} viewBox="0 0 400 400" style={{ overflow: "visible" }}>
      <g fill="none" stroke={cor} strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: svg }} />
    </svg>
  );
};

// ---------- janela de app ----------
const Janela = ({ x, y, w, h, titulo, t, em, riscada, fps, ativa, de = 0.86, children }) => {
  const s = spring({ frame: (t - em) * fps, fps, config: { damping: 18, stiffness: 120 } });
  if (t < em - 0.05) return null;
  const r = riscada != null ? clamp((t - riscada) / 0.45) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, transformOrigin: "50% 60%",
      transform: `translateY(${(1 - s) * 70 * (de > 0.5 ? 1 : 0)}px) scale(${de + (1 - de) * s})`, opacity: clamp(s * 2) }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 26, background: C.jan, overflow: "hidden",
        boxShadow: "0 40px 90px rgba(0,0,0,.55), 0 0 0 2px rgba(255,255,255,.05)", filter: `saturate(${1 - r * 0.8}) brightness(${1 - r * 0.35})` }}>
        <div style={{ height: 64, background: ativa ? C.verde : C.barra, display: "flex", alignItems: "center", gap: 12, padding: "0 24px" }}>
          {[0, 1, 2].map((k) => <div key={k} style={{ width: 18, height: 18, borderRadius: 9, background: ativa ? "rgba(14,17,20,.35)" : k === 2 ? C.verde : "#3a414b" }} />)}
          <div style={{ marginLeft: 18, fontFamily: UI, fontWeight: 700, fontSize: 32, color: ativa ? C.bg : C.cinza }}>{titulo}</div>
        </div>
        <div style={{ position: "relative", height: h - 64, overflow: "hidden" }}>{children}</div>
      </div>
      {riscada != null && (
        <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          <path d={`M${w * 0.08} ${h * 0.85} L${w * 0.92} ${h * 0.18}`} stroke={C.verde} strokeWidth="22" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - r} />
        </svg>
      )}
    </div>
  );
};

const Thumb = ({ w, h, k = 0, destaque }) => (
  <div style={{ width: w, height: h, borderRadius: 14, background: destaque ? "#0e1114" : C.sup, position: "relative", overflow: "hidden",
    outline: destaque ? `6px solid ${C.verde}` : "none", flex: "none" }}>
    <div style={{ position: "absolute", left: "8%", bottom: "13%", width: `${42 + ((k * 31) % 36)}%`, height: "10%", borderRadius: 99, background: destaque || k % 4 === 1 ? C.verde : "#3a424c" }} />
    <div style={{ position: "absolute", right: "8%", top: "16%", width: "26%", height: "42%", borderRadius: "50%", background: k % 2 ? "#2c343d" : "#262d35" }} />
  </div>
);

// ---------- câmera: desliza entre pontos da mesa (x, y = centro; z = zoom) ----------
const CAM = [
  { t: 0, x: 950, y: 600, z: 1.15 }, { t: 0.9, x: 950, y: 600, z: 1.12 }, { t: 4.3, x: 950, y: 620, z: 1.0 },
  { t: 5.3, x: 1330, y: 620, z: 0.95 }, { t: 6.0, x: 1330, y: 620, z: 0.95 },
  { t: 6.9, x: 3010, y: 600, z: 1.0 }, { t: 11.5, x: 3060, y: 600, z: 1.04 },
  { t: 12.4, x: 4730, y: 600, z: 0.98 }, { t: 16.5, x: 4760, y: 600, z: 1.06 },
];
const camera = (t) => {
  let i = 0;
  while (i < CAM.length - 2 && t >= CAM[i + 1].t) i++;
  const a = CAM[i], b = CAM[i + 1], p = io(clamp((t - a.t) / (b.t - a.t)));
  return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, z: a.z + (b.z - a.z) * p };
};

// ---------- legenda em frases curtas ----------
const FRASES = (() => {
  const out = []; let atual = [];
  PAL.palavras.forEach((p, k) => {
    atual.push(p);
    const fimFrase = /[.?!:,]$/.test(p.w) || atual.length >= 4;
    if (fimFrase || k === PAL.palavras.length - 1) { out.push(atual); atual = []; }
  });
  return out.map((ws) => ({ txt: ws.map((w) => w.w).join(" ").replace(/[,:]$/, ""), ini: ws[0].ini, fim: ws[ws.length - 1].fim }));
})();
const Legenda = ({ t, fps }) => {
  const i = FRASES.findLastIndex((f) => t >= f.ini - 0.05);
  if (i < 0) return null;
  const f = FRASES[i];
  if (t > f.fim + 0.6 && (!FRASES[i + 1] || t < FRASES[i + 1].ini - 0.05)) return null;
  const s = spring({ frame: (t - f.ini + 0.05) * fps, fps, config: { damping: 20, stiffness: 140 } });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 64, textAlign: "center" }}>
      <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 84, color: C.texto, display: "inline-block",
        transform: `translateY(${(1 - s) * 24}px)`, opacity: clamp(s * 1.5), textShadow: "0 4px 24px rgba(0,0,0,.7)" }}>{f.txt}</span>
    </div>
  );
};

export const Janelas = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cam = camera(t);
  const lt = (x) => t - x;
  // feed rolando devagar; para quando a pessoa "para em um"
  const rola = interpolate(t, [0, T.para], [0, 420], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const clique = spring({ frame: lt(T.para + 0.1) * fps, fps, config: { damping: 10, stiffness: 220 } });
  const cursorX = interpolate(t, [T.para - 0.6, T.para], [980, 240], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: io });
  const cursorY = interpolate(t, [T.para - 0.6, T.para], [620, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: io });
  const ang = interpolate(t, [T.segundo - 1.2, T.segundo + 0.6], [0, 1080], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const n = Math.round(interpolate(t, [T.inscritos - 1.0, T.inscritos], [0, 12483], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const aberturas = [0.55, T.porque - 0.15, T.descricao - 1.4, T.tags - 0.9, T.inscritos - 1.2, T.imagem - 1.0, T.segundo - 1.5];
  const ativa = (k) => t >= aberturas[k] && (k === aberturas.length - 1 || t < aberturas[k + 1]);
  const pill = (tt) => spring({ frame: lt(tt) * fps, fps, config: { damping: 12, stiffness: 170 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <CameraMotionBlur shutterAngle={160} samples={5}>
        <AbsoluteFill style={{ backgroundColor: C.bg }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 6400, height: 1800, transformOrigin: "0 0",
            transform: `translate(${960 - cam.x * cam.z}px, ${470 - cam.y * cam.z}px) scale(${cam.z})`,
            backgroundImage: "radial-gradient(circle, #232a32 2.4px, transparent 2.6px)", backgroundSize: "56px 56px" }}>

            {/* abertura: ícone de app no centro que "se abre" na página inicial */}
            {t < 0.9 && (() => {
              const a = spring({ frame: t * fps, fps, config: { damping: 12, stiffness: 160 } });
              const sai = clamp((t - 0.55) / 0.3);
              return (
                <div style={{ position: "absolute", left: 950 - 150, top: 620 - 150, width: 300, height: 300, borderRadius: 70, background: C.verde,
                  display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${a * (1 + sai * 1.5)})`, opacity: 1 - sai,
                  boxShadow: "0 30px 70px rgba(0,0,0,.5)" }}>
                  <div style={{ width: 0, height: 0, marginLeft: 22, borderLeft: `110px solid ${C.bg}`, borderTop: "66px solid transparent", borderBottom: "66px solid transparent" }} />
                </div>
              );
            })()}
            {/* A: página inicial */}
            <Janela x={300} y={200} w={1300} h={840} titulo="Página inicial" ativa={ativa(0)} t={t} em={0.55} de={0.22} fps={fps}>
              <div style={{ position: "absolute", left: 34, top: 30 - rola, display: "grid", gridTemplateColumns: "repeat(3, 392px)", gap: 30 }}>
                {Array.from({ length: 18 }, (_, k) => <Thumb key={k} w={392} h={220} k={k} destaque={k === 6 && t >= T.para} />)}
              </div>
              <div style={{ position: "absolute", left: cursorX, top: cursorY, transform: `scale(${1 - 0.18 * Math.sin(Math.PI * clamp(lt(T.para) / 0.25))})` }}>
                <Icone nome="clique" tam={120} p={1} />
              </div>
            </Janela>

            {/* B: por quê? */}
            <Janela x={1700} y={330} w={560} h={520} titulo="Por quê?" ativa={ativa(1)} t={t} em={T.porque - 0.15} fps={fps}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <Icone nome="interrogacao" tam={230} p={clamp(lt(T.porque) / 0.8)} />
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 70, color: C.texto }}>por quê?</div>
              </div>
            </Janela>

            {/* C: o que a pessoa nem olhou */}
            <Janela x={2380} y={180} w={600} h={430} titulo="Descrição" ativa={ativa(2)} t={t} em={T.descricao - 1.4} riscada={T.descricao + 0.2} fps={fps}>
              <div style={{ padding: "34px 40px", display: "flex", gap: 34 }}>
                <Icone nome="texto" tam={130} p={clamp(lt(T.descricao - 1.2) / 0.8)} />
                <div style={{ flex: 1 }}>{[0.95, 0.7, 0.85, 0.6].map((w, k) => <div key={k} style={{ height: 22, width: `${w * 100}%`, borderRadius: 11, background: C.linha, marginBottom: 28 }} />)}</div>
              </div>
            </Janela>
            <Janela x={3040} y={180} w={600} h={430} titulo="Tags" ativa={ativa(3)} t={t} em={T.tags - 0.9} riscada={T.tags + 0.2} fps={fps}>
              <div style={{ padding: 36, display: "flex", flexWrap: "wrap", gap: 18 }}>
                {["#youtube", "#dicas", "#viral", "#2026", "#algoritmo"].map((g, k) => (
                  <div key={k} style={{ fontFamily: SANS, fontWeight: 700, fontSize: 46, color: C.texto, background: C.sup, padding: "10px 26px", borderRadius: 18,
                    transform: `scale(${pill(T.tags - 0.7 + k * 0.08)})` }}>{g}</div>
                ))}
              </div>
            </Janela>
            <Janela x={2710} y={630} w={600} h={410} titulo="Inscritos" ativa={ativa(4)} t={t} em={T.inscritos - 1.2} riscada={T.inscritos + 0.5} fps={fps}>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 30, padding: "0 46px" }}>
                <Icone nome="pessoa" tam={150} p={clamp(lt(T.inscritos - 1.1) / 0.8)} />
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 116, color: C.texto, fontVariantNumeric: "tabular-nums" }}>{n.toLocaleString("pt-BR")}</div>
              </div>
            </Janela>

            {/* D: o que ela vê */}
            <Janela x={4120} y={200} w={980} h={720} titulo="O que a pessoa vê" ativa={ativa(5)} t={t} em={T.imagem - 1.0} fps={fps}>
              <div style={{ position: "absolute", left: 60, top: 50 }}>
                <Thumb w={860} h={440} k={2} destaque />
                <div style={{ display: "flex", gap: 22, marginTop: 30, alignItems: "center" }}>
                  <div style={{ width: 66, height: 66, borderRadius: 33, background: C.linha }} />
                  <div style={{ height: 30, width: 520, borderRadius: 15, background: "#3a424c" }} />
                </div>
              </div>
              <div style={{ position: "absolute", left: 600, top: 60, fontFamily: UI, fontWeight: 700, fontSize: 40, color: C.bg, background: C.verde, padding: "10px 26px", borderRadius: 14,
                transform: `scale(${pill(T.pequena)})` }}>imagem pequena</div>
              <div style={{ position: "absolute", left: 640, top: 548, fontFamily: UI, fontWeight: 700, fontSize: 40, color: C.bg, background: C.verde, padding: "10px 26px", borderRadius: 14,
                transform: `scale(${pill(T.curta)})` }}>frase curta</div>
            </Janela>

            {/* E: menos de 1 segundo */}
            <Janela x={5200} y={330} w={560} h={560} titulo="Decisão" ativa={ativa(6)} t={t} em={T.segundo - 1.5} fps={fps}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <Icone nome="cronometro" tam={260} p={clamp(lt(T.segundo - 1.4) / 0.8)} semA2 />
                  <svg width="260" height="260" viewBox="0 0 400 400" style={{ position: "absolute", left: 0, top: 0 }}>
                    <g transform={`rotate(${ang} 200 220)`}><path d="M200 220 V110" stroke={C.verde} strokeWidth="26" strokeLinecap="round" /></g>
                  </svg>
                </div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 120, color: C.verde, marginTop: 10 }}>&lt;1s</div>
              </div>
            </Janela>
          </div>
        </AbsoluteFill>
      </CameraMotionBlur>
      <Legenda t={t} fps={fps} />
    </AbsoluteFill>
  );
};
