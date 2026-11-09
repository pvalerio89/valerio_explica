import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true,args:["--allow-file-access-from-files"],defaultViewport:{width:1280,height:720}});
const p=await b.newPage();await p.goto(pathToFileURL(process.argv[2]).href,{waitUntil:"load"});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:process.argv[3],type:"jpeg",quality:92});await b.close();
