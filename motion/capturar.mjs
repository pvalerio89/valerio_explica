// Captura quadro a quadro uma página HTML (canvas p5.brush + SVG) no Chrome headless
// e monta o vídeo com ffmpeg.
//
// A página precisa expor: window.cenaPronta (Promise) e window.renderFrame(t) (async).
//
// Uso:
//   node capturar.mjs <pagina.html> <saida.mp4> [duracao=10] [fps=30] [audio.wav]
//   node capturar.mjs <pagina.html> --quadros 0.5,3,8   (só salva PNGs de conferência)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const W = 1920, H = 1080;

const [pagina, saida, ...resto] = process.argv.slice(2);
if (!pagina || !saida) {
  console.error("uso: node capturar.mjs pagina.html saida.mp4 [dur] [fps] [audio]");
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--use-angle=default", "--enable-webgl", "--ignore-gpu-blocklist",
         "--allow-file-access-from-files", "--hide-scrollbars"],
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
page.on("console", (m) => console.log("[página]", m.text()));
page.on("pageerror", (e) => console.log("[erro na página]", e.message));
await page.goto(pathToFileURL(path.resolve(pagina)).href, { waitUntil: "load" });
await page.evaluate(() => window.cenaPronta);

async function foto(t) {
  await page.evaluate((tt) => window.renderFrame(tt), t);
  return page.screenshot({ type: "png", clip: { x: 0, y: 0, width: W, height: H } });
}

if (saida === "--quadros") {
  const pasta = path.join(path.dirname(path.resolve(pagina)), "quadros");
  mkdirSync(pasta, { recursive: true });
  for (const s of resto[0].split(",")) {
    writeFileSync(path.join(pasta, `q-${s}.png`), await foto(parseFloat(s)));
    console.log("quadro", s);
  }
  await browser.close();
  process.exit(0);
}

const dur = parseFloat(resto[0] ?? "10");
const fps = parseInt(resto[1] ?? "30", 10);
const audio = resto[2];
const args = ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-"];
if (audio) args.push("-t", String(dur), "-i", audio);
args.push("-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p");
if (audio) args.push("-c:a", "aac", "-b:a", "192k", "-af", `afade=t=out:st=${dur - 0.3}:d=0.3`, "-shortest");
args.push("-t", String(dur), saida);
const ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });

const total = Math.round(dur * fps);
const t0 = Date.now();
for (let i = 0; i < total; i++) {
  const png = await foto(i / fps);
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  if (i % 30 === 0) console.log(`${i}/${total}  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
console.log("ok", saida);
