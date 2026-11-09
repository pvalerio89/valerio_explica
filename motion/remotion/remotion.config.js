// Usa o Chrome já instalado (não baixa outro) e codifica como o estúdio pede: H.264, yuv420p, CRF 16.
import { Config } from "@remotion/cli/config";
Config.setBrowserExecutable("C:/Program Files/Google/Chrome/Application/chrome.exe");
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(16);
Config.setConcurrency(4);
Config.setVideoImageFormat("png"); // quadros PNG -> saída yuv420p (faixa limitada), como o estúdio pede
