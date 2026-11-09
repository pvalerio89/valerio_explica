// Render de filmes motion: a página é função pura do tempo, window.seek(t) pinta o quadro.
// Chrome headless (puppeteer-core) captura cada quadro e o ffmpeg codifica H.264 yuv420p CRF 16.
//
// Uso:
//   node render.mjs <pagina.html> <saida.mp4> --dur 10 --fps 30 --audio mix.wav
//   node render.mjs <pagina.html> --prancha <beats.json> [--saida prancha.jpg]   (1 quadro por batida)
//   node render.mjs <pagina.html> --quadros 0.5,3,8                             (PNGs soltos)
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const W = 1920, H = 1080;
const argv = process.argv.slice(2);
const pagina = argv[0];
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
if (!pagina) { console.error("uso: node render.mjs pagina.html saida.mp4 [--dur 10 --fps 30 --audio a.wav]"); process.exit(1); }

const browser = await puppeteer.launch({
  executablePath: CHROME, headless: true,
  args: ["--allow-file-access-from-files", "--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none"],
  defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
page.on("console", (m) => console.log("[página]", m.text()));
page.on("pageerror", (e) => { console.log("[erro na página]", e.message); process.exitCode = 2; });
await page.goto(pathToFileURL(path.resolve(pagina)).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);

async function foto(t, tipo = "png") {
  await page.evaluate((tt) => window.seek(tt), t);
  // com vários Chromes em paralelo a captura às vezes falha: tenta de novo
  for (let k = 0; ; k++) {
    try { return await page.screenshot({ type: tipo, clip: { x: 0, y: 0, width: W, height: H } }); }
    catch (e) { if (k >= 4) throw e; await new Promise((r) => setTimeout(r, 500 * (k + 1))); }
  }
}

const pastaQ = path.join(path.dirname(path.resolve(pagina)), "quadros");

if (argv.includes("--quadros")) {
  mkdirSync(pastaQ, { recursive: true });
  for (const s of opt("--quadros").split(",")) {
    writeFileSync(path.join(pastaQ, `q-${s}.png`), await foto(parseFloat(s)));
  }
  await browser.close(); process.exit(0);
}

if (argv.includes("--eventos")) {
  const ev = await page.evaluate(() => window.EVENTOS || []);
  writeFileSync(opt("--eventos"), JSON.stringify(ev, null, 0));
  console.log(ev.length, "eventos ->", opt("--eventos"));
  await browser.close(); process.exit(0);
}

if (argv.includes("--prancha")) {
  // --prancha grade: 'bpm:96' gera batidas teóricas; ou um beats.json. --de/--ate limitam o trecho.
  const de = parseFloat(opt("--de", "0")), ate = parseFloat(opt("--ate", "1e9"));
  let beats;
  const src = opt("--prancha");
  if (src.startsWith("bpm:")) { const b = 60 / parseFloat(src.slice(4)); beats = []; for (let t = Math.ceil(de / b) * b; t < ate; t += b) beats.push(+t.toFixed(4)); }
  else beats = JSON.parse(readFileSync(src, "utf8")).beats.filter((t) => t >= de && t < ate);
  const tmp = path.join(pastaQ, "prancha-tmp-" + process.pid);
  rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
  for (let i = 0; i < beats.length; i++) {
    // um pouco depois da batida: mostra o que a batida disparou
    writeFileSync(path.join(tmp, `b${String(i).padStart(2, "0")}.png`), await foto(beats[i] + 0.3));
  }
  await browser.close();
  const cols = beats.length > 24 ? 8 : 4, rows = Math.ceil(beats.length / cols);
  const saida = opt("--saida", path.join(pastaQ, "prancha.jpg"));
  spawnSync("ffmpeg", ["-loglevel", "error", "-y", "-framerate", "1", "-i", path.join(tmp, "b%02d.png"),
    "-vf", `scale=480:270,drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='%{frame_num}':start_number=0:x=12:y=10:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6,tile=${cols}x${rows}:padding=6:color=black`,
    "-update", "1",
    "-frames:v", "1", saida], { stdio: "inherit" });
  console.log("prancha:", saida);
  process.exit(0);
}

const saida = argv[1];
const dur = parseFloat(opt("--dur", "10")), fps = parseInt(opt("--fps", "30"), 10), audio = opt("--audio");
const args = ["-loglevel", "error", "-y", "-f", "image2pipe", "-framerate", String(fps), "-i", "-"];
if (audio) args.push("-i", audio);
args.push("-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-r", String(fps));
if (audio) args.push("-c:a", "aac", "-b:a", "256k", "-shortest");
args.push("-t", String(dur), "-movflags", "+faststart", saida);
const ff = spawn("ffmpeg", args, { stdio: ["pipe", "inherit", "inherit"] });
// --inicio: renderiza um trecho (para dividir em pedaços paralelos); dur é a duração do trecho
const inicio = parseFloat(opt("--inicio", "0"));
const total = Math.round(dur * fps), t0 = Date.now();
for (let i = 0; i < total; i++) {
  const png = await foto(inicio + i / fps);
  if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once("drain", r));
  if (i % 60 === 0) console.log(`${i}/${total} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
console.log("ok", saida);
