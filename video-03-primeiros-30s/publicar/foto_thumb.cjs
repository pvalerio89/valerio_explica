// Tira a foto do thumb.html em 1280x720. Uso (de dentro de motion/): node ../video-03-primeiros-30s/publicar/foto_thumb.cjs entrada.html saida.jpg
const p = require(process.cwd() + "/node_modules/puppeteer-core");
const { pathToFileURL } = require("url");
const path = require("path");
(async () => {
  const b = await p.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", args: ["--allow-file-access-from-files"] });
  const pg = await b.newPage();
  await pg.setViewport({ width: 1280, height: 720 });
  await pg.goto(pathToFileURL(path.resolve(process.argv[2])).href);
  await new Promise((r) => setTimeout(r, 500));
  await pg.screenshot({ path: process.argv[3], type: "jpeg", quality: 92 });
  await b.close();
})();
