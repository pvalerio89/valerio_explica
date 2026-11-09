import React from "react";
import { Composition } from "remotion";
import { Teste } from "./Teste";
import { Janelas } from "./Janelas";
import PAL from "./palavras.json";
import { Video2 } from "./v02/Video2";
import PAL2 from "./v02/palavras.json";
import { Video3 } from "./v03/Video3";
import PAL3 from "./v03/palavras.json";

export const Root = () => (
  <>
  <Composition id="Video3" component={Video3} durationInFrames={Math.ceil(PAL3.duracao * 30)} fps={30} width={1920} height={1080} />
  <Composition id="Video2" component={Video2} durationInFrames={Math.ceil(PAL2.duracao * 30)} fps={30} width={1920} height={1080} />
  <Composition id="Janelas" component={Janelas} durationInFrames={Math.ceil(PAL.duracao * 30)} fps={30} width={1920} height={1080} />
  <Composition id="Teste" component={Teste} durationInFrames={Math.ceil(PAL.duracao * 30)} fps={30} width={1920} height={1080} />
  </>
);
