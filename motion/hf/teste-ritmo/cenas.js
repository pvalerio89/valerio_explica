/* =================== CENAS · teste de ritmo (prévia de ~25 s) ===================
   Ritmo novo: algo novo na tela a cada 1,5–2,5 s, câmera sempre andando (push-in lento),
   "soco" de zoom nas revelações, mockups inclinados (2.5D) com sombra longa, destaque desenhado,
   lupa, chaves liga/desliga, pausa de alerta (escurece + música para) e um som para cada ação. */

/* palavra pela ordem da fala: w('dez') acha a 1ª depois do cursor; o cursor anda sozinho */
let CUR=0;
function w(word,{depois}={}){const n=norm(word);const from=depois!==undefined?depois:CUR;
  for(const p of PAL){if(p.ini>=from-0.001&&norm(p.w).startsWith(n)){CUR=p.ini;return p.ini;}}
  console.log('palavra nao achada',word);return from+0.3;}
const fim=(word)=>{const n=norm(word);for(const p of PAL){if(p.ini>=CUR-0.001&&norm(p.w).startsWith(n))return p.fim;}return CUR+0.4;};

/* ---------- câmera nova ---------- */
// cada painel tem um "palco" que vai se aproximando devagar (push-in) enquanto está na tela
let palcoAtual=null,palcoIni=0;
function palcoDe(P){const s=document.createElement('div');s.className='palco';s.style.cssText='position:absolute;inset:0;transform-origin:1330px 470px;';P.appendChild(s);return s;}
function fechaPalco(t){if(palcoAtual)tl.fromTo(palcoAtual,{scale:1},{scale:1.045,duration:Math.max(0.5,t-palcoIni+0.8),ease:'none',immediateRender:false},palcoIni);}
// troca de painel: deslize mais rápido com desfoque de movimento; 'whip' = troca de assunto (mais brusca)
function cena(t,tipo='slide'){fechaPalco(t);const P=panel();const i=panels.length-1;
  if(i>0){const d=tipo==='whip'?0.42:0.6,a=Math.max(0,t-d*0.6);EV(a,tipo==='whip'?'whip':'whoosh');
    tl.to('#world',{x:-i*1920,duration:d,ease:tipo==='whip'?'expo.inOut':'power3.inOut'},a);
    tl.to('#dots',{backgroundPositionX:-(i*1920*0.35)+'px',duration:d,ease:E},a);
    tl.fromTo('#world',{filter:'blur(0px)'},{filter:tipo==='whip'?'blur(14px)':'blur(6px)',duration:d/2,yoyo:true,repeat:1,ease:'sine.inOut',immediateRender:false},a);}
  palcoAtual=palcoDe(P);palcoIni=t;return palcoAtual;}
// "soco": zoom rápido no palco + grave
function soco(t,k=1.07){EV(t,'boom');tl.to(palcoAtual,{scale:'+='+(k-1),duration:0.16,ease:'power2.out'},t).to(palcoAtual,{scale:'-='+(k-1)*0.7,duration:0.45,ease:'power2.inOut'},t+0.16);}

/* ---------- peças novas ---------- */
const SOMBRA='box-shadow:26px 46px 70px rgba(80,60,30,.20),0 6px 14px rgba(80,60,30,.10);';
// celular inclinado (2.5D) com um vídeo genérico dentro
function mock(P,x,y,h,t,lado,inner){const wd=Math.round(h*0.52);
  const s=add(P,`<div style="position:absolute;inset:14px;border-radius:24px;overflow:hidden;background:#2c3238">${inner}</div><div style="position:absolute;left:50%;top:6px;width:64px;height:7px;margin-left:-32px;border-radius:4px;background:#5d6670"></div>`,
    `left:${x}px;top:${y}px;width:${wd}px;height:${h}px;border:5px solid #16191c;border-radius:38px;background:#16191c;${SOMBRA}`);
  const ry=lado<0?16:-16;EV(t,'whoosh',0.7);
  tl.fromTo(s,{x:lado*520,opacity:0,rotationY:lado*-50,transformPerspective:1600},{x:0,opacity:1,rotationY:ry,transformPerspective:1600,duration:0.6,ease:'power3.out',immediateRender:false},t);
  tl.set(s,{opacity:0},0);return s;}
const VID=(cor,thumbTxt)=>`<div style="position:absolute;inset:0;background:linear-gradient(170deg,${cor},#2c3238)"></div>
  <div style="position:absolute;left:18px;right:18px;top:40px;height:150px;border-radius:14px;background:#fffdf8;display:flex;align-items:center;justify-content:center;font-family:Bahnschrift;font-weight:700;font-size:40px;color:#16191c">${thumbTxt}</div>
  <div style="position:absolute;left:18px;right:60px;top:210px;height:16px;border-radius:8px;background:#fffdf8;opacity:.8"></div>
  <div style="position:absolute;left:18px;right:120px;top:238px;height:16px;border-radius:8px;background:#fffdf8;opacity:.5"></div>`;
// etiqueta em caixa alta (cor do canal), entra com pop elástico
function kw(P,txt,x,y,t,cor=G,fs=40){const s=add(P,txt,`left:${x}px;top:${y}px;padding:10px 24px;border-radius:14px;background:${cor};color:#fff;font-family:Bahnschrift;font-weight:700;font-size:${fs}px;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;${SOMBRA}`);
  EV(t,'pop');tl.from(s,{scale:0,opacity:0,duration:0.42,ease:'back.out(2.6)'},t);return s;}
// contorno desenhado em volta de algo (marca-texto)
function contorno(P,x,y,wd,h,t,cor=G,r=24){const s=add(P,`<svg width="${wd+20}" height="${h+20}" style="overflow:visible"><rect x="10" y="10" width="${wd}" height="${h}" rx="${r}" pathLength="1" fill="none" stroke="${cor}" stroke-width="9" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`,`left:${x-10}px;top:${y-10}px`);
  EV(t,'risca',0.7);tl.to(s+' rect',{strokeDashoffset:0,duration:0.38,ease:'power2.inOut'},t);return s;}
function risco(P,x,y,wd,t){const s=add(P,`<svg width="${wd}" height="40" style="overflow:visible"><path d="M0 22 L${wd} 16" pathLength="1" stroke="${R}" stroke-width="12" stroke-linecap="round" fill="none" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`,`left:${x}px;top:${y}px`);
  EV(t,'risca');tl.to(s+' path',{strokeDashoffset:0,duration:0.25,ease:'power2.in'},t);return s;}
// chave liga/desliga
function chave(P,lab,x,y,t,on){const k=uid++;const s=card(P,`<div style="display:flex;align-items:center;gap:34px;padding:26px 36px">
   <div id="tr${k}" style="position:relative;width:150px;height:80px;border-radius:40px;background:#cfc6b4;border:3px solid #16191c;flex:none"><div id="kn${k}" style="position:absolute;left:6px;top:6px;width:62px;height:62px;border-radius:50%;background:#fffdf8;border:3px solid #16191c;box-sizing:border-box"></div></div>
   <div class="h" style="font-size:58px;letter-spacing:1px;text-transform:uppercase">${lab}</div></div>`,x,y,560,132,t,'pop',SOMBRA);
  EV(on,'toggle');tl.to('#kn'+k,{x:70,duration:0.28,ease:'back.out(2.4)'},on);tl.to('#tr'+k,{backgroundColor:G,duration:0.2},on);
  tl.to(s,{borderColor:G,duration:0.2},on);return s;}
// curva de retenção (SVG) — usada no cartão e dentro da lupa
const CURVA=(id='')=>`<svg width="1000" height="420" viewBox="0 0 1000 420">
  <path d="M60 30 V380 H980" stroke="#8a8f96" stroke-width="4" fill="none"/>
  <text x="70" y="410" font-family="Consolas" font-size="26" fill="#5c574e">0:00</text><text x="250" y="410" font-family="Consolas" font-size="26" fill="#d14343">0:30</text><text x="900" y="410" font-family="Consolas" font-size="26" fill="#5c574e">8:00</text>
  <path ${id?`id="${id}"`:''} d="M60 50 C150 55 220 70 270 250 C330 300 600 310 980 330" pathLength="1" stroke="#d14343" stroke-width="9" fill="none" stroke-linecap="round" ${id?'stroke-dasharray="1" stroke-dashoffset="1"':''}/>
  <circle cx="270" cy="250" r="12" fill="#d14343"/></svg>`;

/* ======================= roteiro ======================= */
let P,t;
/* f0–f1: dois vídeos iguais */
t=T(1,0);P=cena(t);
{mock(P,900,90,620,w('dois'),-1,VID('#3b7a8f','TEMA X'));
 mock(P,1470,90,620,w('videos')+0.15,1,VID('#3b7a8f','TEMA X'));
 arm('point',w('dois',{depois:0}));
 const t1=w('tema'),t2=w('thumb'),t3=w('dia');
 kw(P,'= tema',940,760,t1);kw(P,'= thumb',1170,760,t2);kw(P,'= dia',1440,760,t3);
 tl.to(palcoAtual,{rotation:-0.6,duration:2,ease:'sine.inOut',yoyo:true,repeat:1},t1);
 arm('down',fim('dia'));}

/* f2–f3: um explode, o outro trava */
t=T(1,2);P=cena(t);
{const tA=w('dez'),tB=w('duzentas');
 const a=card(P,`<div class="tag" style="position:absolute;left:34px;top:26px">vídeo A</div><div class="cc"><div style="font-family:Consolas;font-weight:700;white-space:nowrap"><span id="na" style="font-size:150px;letter-spacing:-4px">0</span></div><div class="h" style="font-size:40px;color:var(--muted)">visualizações</div></div>`,820,170,500,420,t,'left',SOMBRA);
 const b=card(P,`<div class="tag" style="position:absolute;left:34px;top:26px">vídeo B</div><div class="cc"><div style="font-family:Consolas;font-weight:700;white-space:nowrap"><span id="nb" style="font-size:150px;letter-spacing:-4px">0</span></div><div class="h" style="font-size:40px;color:var(--muted)">visualizações</div></div>`,1380,170,500,420,T(1,3)-0.2,'pop',SOMBRA);
 conta('na',tA-0.3,tA+0.9,0,10000);tl.to('#na',{color:G,duration:0.15},tA+0.9);EV(tA+0.9,'caixa');
 tl.to(a,{scale:1.06,duration:0.18,yoyo:true,repeat:1},tA+0.9);surpresa(tA+0.8);
 conta('nb',tB-0.4,tB+0.3,0,200);tl.to('#nb',{color:R,duration:0.12},tB+0.3);EV(tB+0.3,'impacto');
 tl.to(b,{y:24,duration:0.12,yoyo:true,repeat:1,ease:'power2.out'},tB+0.3);
 const ne=add(P,'≠',`left:1312px;top:300px;font-family:Bahnschrift;font-weight:700;font-size:150px;color:${K}`);EV(tB+0.6,'pop');
 tl.from(ne,{scale:0,rotation:-90,duration:0.4,ease:'back.out(2.5)'},tB+0.6);
 tl.from(a+','+b,{rotationY:0},0);tl.set(a,{rotationY:8,transformPerspective:1600},t);tl.set(b,{rotationY:-8,transformPerspective:1600},t);
 kw(P,'travou',1520,640,tB+0.35,R);}

/* f4: não é o título */
t=T(1,4);P=cena(t);
{const c=card(P,`<div style="display:flex;align-items:center;gap:30px;padding:36px 44px"><div class="tag">título</div><div class="h" style="font-size:64px;white-space:nowrap">Como crescer no YouTube</div></div>`,860,250,1000,170,t,'up',SOMBRA);
 risco(P,1060,315,770,w('titulo')+0.1);stamp(P,'NÃO É ISSO',1250,470,w('titulo')+0.35,-7,'',64);
 arm('mid',t);arm('down',fim('titulo')+0.2);
/* f5: os primeiros 30 s (troca de assunto = whip) */
 t=T(1,5);P=cena(t,'whip');
 const k=uid++;card(P,`<div class="cc"><svg width="380" height="380" viewBox="0 0 380 380" style="position:absolute;left:60px;top:40px"><circle cx="190" cy="190" r="160" stroke="#e4dccb" stroke-width="34" fill="none"/>
   <circle id="ar${k}" cx="190" cy="190" r="160" stroke="${G}" stroke-width="34" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90 190 190)"/></svg>
   <div style="position:absolute;left:60px;top:40px;width:380px;height:380px;display:flex;align-items:center;justify-content:center;font-family:Consolas;font-weight:700;font-size:110px">0:<span id="sg">00</span></div>
   <div style="position:absolute;left:490px;top:110px" class="h"><div style="font-size:84px">primeiros</div><div style="font-size:120px;color:${G}">30 s</div></div></div>`,860,150,1000,470,t-0.1,'pop',SOMBRA);
 const tt=w('trinta');tl.to('#ar'+k,{strokeDashoffset:0,duration:1.1,ease:'none'},tt-0.4);conta('sg',tt-0.4,tt+0.7,0,30);
 soco(tt+0.7);contorno(P,1340,240,500,300,tt+0.75);arm('point',tt);}

/* f6–f7: pausa de alerta + lupa na curva */
{const root=document.getElementById('root'),masc=document.getElementById('masc');
 const dim=document.createElement('div');dim.id='dim';dim.style.cssText='position:absolute;inset:0;background:#16191c;opacity:0';root.insertBefore(dim,masc);
 const ta=w('so');EV(ta-0.9,'riser');EV(ta-0.05,'mudo',0.9);EV(ta+0.85,'boom');
 tl.to('#dim',{opacity:0.88,duration:0.18},ta-0.05);
 const al=document.createElement('div');al.id='alerta';al.style.cssText='position:absolute;left:880px;top:300px;width:960px;text-align:center;opacity:0';
 al.innerHTML=`<div style="width:170px;height:170px;margin:0 auto">${I.alerta}</div><div class="h" style="font-size:120px;color:#fffdf8;margin-top:10px;letter-spacing:2px">SÓ QUE…</div>`;root.insertBefore(al,masc);
 tl.to('#alerta',{opacity:1,duration:0.01},ta);tl.from('#alerta',{scale:0.4,duration:0.5,ease:'back.out(2)'},ta);alerta(ta,1.6);
 tl.to('#dim,#alerta',{opacity:0,duration:0.3},w('detalhe')+0.35);
 t=w('detalhe')+0.3;P=cena(t,'whip');
 const cx=860,cy=170;card(P,`<div class="tag" style="position:absolute;left:34px;top:24px">quem continua assistindo</div><div style="position:absolute;left:0;top:50px">${CURVA('cv')}</div>`,cx,cy,1020,500,t-0.1,'up',SOMBRA);
 tl.to('#cv',{strokeDashoffset:0,duration:0.9,ease:'power1.inOut'},t+0.1);EV(t+0.1,'risca',0.5);
 // lupa: anda pela curva e para no tombo dos 30 s
 const R0=120,Z=2,px0=60,py0=50,px1=270,py1=250,ox=cx+2,oy=cy+52;
 const L=add(P,`<div class="lz" style="position:absolute;inset:0;border-radius:50%;overflow:hidden;background:#fffdf8;border:9px solid #16191c;box-shadow:0 24px 50px rgba(0,0,0,.25)"><div id="lin" style="position:absolute;left:-9px;top:-9px;transform-origin:0 0">${CURVA()}</div></div>
   <div style="position:absolute;left:${R0*1.62}px;top:${R0*1.62}px;width:30px;height:130px;border-radius:15px;background:#16191c;transform:rotate(-45deg);transform-origin:15px 0"></div>`,
   `left:${ox+px0-R0}px;top:${oy+py0-R0}px;width:${R0*2}px;height:${R0*2}px;opacity:0`);
 const tl0=w('ninguem');
 tl.set(L,{opacity:1},tl0-0.5);EV(tl0-0.5,'pop');tl.from(L+' .lz',{scale:0.3,duration:0.35,ease:'back.out(2)'},tl0-0.5);
 tl.fromTo('#lin',{x:-(px0*Z-R0),y:-(py0*Z-R0),scale:Z},{x:-(px1*Z-R0),y:-(py1*Z-R0),scale:Z,duration:1.1,ease:'power2.inOut',immediateRender:true},tl0-0.3);
 tl.fromTo(L,{x:0,y:0},{x:px1-px0,y:py1-py0,duration:1.1,ease:'power2.inOut',immediateRender:false},tl0-0.3);
 EV(tl0+0.85,'shutter');const fl=add(P,'',`left:${ox+px1-R0}px;top:${oy+py1-R0}px;width:${R0*2}px;height:${R0*2}px;border-radius:50%;background:#fff;opacity:0`);tl.fromTo(fl,{opacity:0.9},{opacity:0,duration:0.35,immediateRender:false},tl0+0.85);contorno(P,ox+px1-R0-10,oy+py1-R0-10,R0*2+20,R0*2+20,tl0+0.95,R,R0+10);
 kw(P,'aqui o YouTube decide',1080,700,w('decide')-0.1,K,44);
 tl.to(palcoAtual,{scale:'+=0.05',duration:0.6,ease:'power2.out'},w('decide'));inclina(w('mostrando'));}

/* f8–f10: liga os botões, o gráfico sobe */
t=T(1,8);P=cena(t);
{chave(P,'retenção',880,190,t,w('retencao'));chave(P,'clique',880,360,T(1,9),w('clique'));arm('point',w('retencao',{depois:0}));
 const tg=w('grafico');const gk=uid++;
 card(P,`<svg width="380" height="300" viewBox="0 0 560 360" style="position:absolute;left:20px;top:40px"><path d="M30 20 V330 H540" stroke="#8a8f96" stroke-width="4" fill="none"/>
   <path id="gl${gk}" d="M40 310 C140 300 200 290 260 240 C330 180 400 120 530 40" pathLength="1" stroke="${G}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`,1470,170,420,380,T(1,10)-0.1,'pop',SOMBRA);
 EV(tg-0.6,'riser');tl.to('#gl'+gk,{strokeDashoffset:0,duration:1.2,ease:'power2.in'},tg-0.3);EV(tg+0.9,'ding');
 const sobe=kw(P,'▲ sobe',1560,580,tg+0.9,G,52);soco(tg+0.9,1.05);joinha(tg+1.0,1.8);}
