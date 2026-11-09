// Gera a lista de efeitos sonoros do vídeo 2 a partir do roteiro de tomadas (mesma fonte da imagem).
// Uso: node eventos-v02.mjs   -> out/eventos-v02.json
import { buildSync } from "esbuild";
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

buildSync({ entryPoints: ["src/v02/roteiro.jsx"], bundle: true, platform: "node", format: "cjs", outfile: "out/roteiro.cjs", loader: { ".json": "json" } });
const require = createRequire(import.meta.url);
const { TOMADAS } = require("./out/roteiro.cjs");

const ev = [];
const add = (t, tipo) => { if (t != null && Number.isFinite(t)) ev.push({ t: +t.toFixed(3), tipo }); };
TOMADAS.forEach((tm, k) => {
  if (k > 0) add(tm.ini, "whoosh");
  tm.janelas.forEach((j) => {
    add(j.em, k === 0 ? "whoosh" : "pop");
    add(j.riscada, "risca");
    (j.itens || []).forEach((it) => { add(it.em, "tick"); add(it.check, "check"); add(it.risca, "risca"); });
    (j.rotulos || []).forEach((r) => add(r.em, "pop"));
    (j.passos || []).forEach((p) => add(p.em, p.ac ? "moeda" : "tick"));
    (j.anot || []).forEach((a) => add(a.em, "pop"));
    (j.tapa || []).forEach((tp) => { add(tp.em, "whoosh"); add(tp.em + 0.6, "check"); });
    (j.sobe || []).forEach((s) => add(s, "subir"));
    add(j.falhaEm, "impacto");
    if (j.selo) add(j.selo.em, "impacto");
    if (j.vencedorEm != null) add(j.vencedorEm, "moeda");
    if (j.depoisEm != null) add(j.depoisEm, "pop");
    if (j.encolheEm != null) add(j.encolheEm, "whoosh");
    if (j.tipo === "contador") { const c0 = j.contaEm ?? j.em + 0.3; for (let q = 0; q < 8; q++) add(c0 + q * 0.12, "tick"); }
    if (j.tipo === "missao") add(j.em + 0.1, "impacto");
    if (j.tipo === "inscreva") add(j.em + 0.3, "moeda");
  });
});
add(0.05, "pop");
ev.sort((a, b) => a.t - b.t);
writeFileSync("out/eventos-v02.json", JSON.stringify(ev));
console.log(ev.length, "eventos");
