import puppeteer from "puppeteer-core";import path from "node:path";import {pathToFileURL} from "node:url";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true,args:["--allow-file-access-from-files"],defaultViewport:{width:1920,height:1080}});
const p=await b.newPage();await p.goto(pathToFileURL(path.resolve(process.argv[2])).href,{waitUntil:"load"});await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{window.seek(window.DURACAO-0.05);const out=[];document.querySelectorAll('.panel').forEach((P,i)=>{const pr=P.getBoundingClientRect();
 for(const e of P.children){const q=e.getBoundingClientRect();if(q.width===0)continue;const L=q.left-pr.left,Rr=q.right-pr.left,B=q.bottom;
  if(Rr>1905||L<770||B>900)out.push(`painel ${i}: ${e.id} x ${L|0}-${Rr|0} bottom ${B|0} :: ${e.textContent.trim().slice(0,40)}`);}});return out;});
console.log(r.join("\n"));await b.close();
