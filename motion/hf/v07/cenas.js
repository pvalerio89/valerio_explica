/* =================== CENAS · vídeo 7 (Shorts sem aparecer) =================== */
/* ícones novos (genéricos, sem marcas) */
Object.assign(I,{
 robo:`<svg class="ico" viewBox="0 0 24 24"><path d="M12 2.5v3" stroke="${K}" stroke-width="1.4"/><circle cx="12" cy="2.4" r="1.4" fill="${G}" stroke="${K}" stroke-width="1"/><rect x="4" y="5.5" width="16" height="12" rx="3.5" fill="#fffdf8" stroke="${K}" stroke-width="1.5"/><circle cx="9" cy="11" r="1.8" fill="${G}"/><circle cx="15" cy="11" r="1.8" fill="${G}"/><path d="M9 14.5h6" stroke="${K}" stroke-width="1.3" stroke-linecap="round"/><path d="M7 17.5v3.5M17 17.5v3.5M5 21h14" stroke="${K}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
 filme:`<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#2c3238" stroke="${K}" stroke-width="1.2"/><g fill="#fffdf8"><rect x="4.5" y="5.5" width="2" height="2"/><rect x="4.5" y="11" width="2" height="2"/><rect x="4.5" y="16.5" width="2" height="2"/><rect x="17.5" y="5.5" width="2" height="2"/><rect x="17.5" y="11" width="2" height="2"/><rect x="17.5" y="16.5" width="2" height="2"/></g><path d="M10 9l5 3-5 3z" fill="${Y}"/></svg>`,
 micro:`<svg class="ico" viewBox="0 0 24 24"><rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="${G}" stroke="${K}" stroke-width="1.3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0" fill="none" stroke="${K}" stroke-width="1.5" stroke-linecap="round"/><path d="M12 17.5v3.5M8.5 21h7" stroke="${K}" stroke-width="1.6" stroke-linecap="round"/></svg>`,
 copy:`<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#fffdf8" stroke="${R}" stroke-width="2.2"/><path d="M15.2 9.3a4 4 0 1 0 0 5.4" fill="none" stroke="${R}" stroke-width="2.2" stroke-linecap="round"/></svg>`,
 trofeu:`<svg class="ico" viewBox="0 0 24 24"><path d="M7 3h10v5a5 5 0 0 1-10 0z" fill="${Y}" stroke="${K}" stroke-width="1.3"/><path d="M7 5H4v1.5A3.5 3.5 0 0 0 7.5 10M17 5h3v1.5A3.5 3.5 0 0 1 16.5 10" fill="none" stroke="${K}" stroke-width="1.3"/><path d="M12 13v4" stroke="${K}" stroke-width="1.8"/><rect x="7.5" y="17" width="9" height="4" rx="1" fill="#a87545" stroke="${K}" stroke-width="1.2"/></svg>`,
 musica:`<svg class="ico" viewBox="0 0 24 24"><path d="M9 18V5l11-2v13" fill="none" stroke="${K}" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="3" fill="${G}" stroke="${K}" stroke-width="1.2"/><circle cx="17.5" cy="16" r="3" fill="${G}" stroke="${K}" stroke-width="1.2"/></svg>`,
 mundo:`<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#e6f5ec" stroke="${K}" stroke-width="1.4"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" fill="none" stroke="${G}" stroke-width="1.3"/></svg>`,
 lampada:`<svg class="ico" viewBox="0 0 24 24"><path d="M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.6.5.8 1.2.8 2V17h6v-.7c0-.8.2-1.5.8-2A6.5 6.5 0 0 0 12 2.5z" fill="${Y}" stroke="${K}" stroke-width="1.3"/><path d="M9 19.5h6M10 22h4" stroke="${K}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
 pincel:`<svg class="ico" viewBox="0 0 24 24"><path d="M14.5 3.5l6 6-8 8-6-6z" fill="${G}" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/><path d="M6.5 11.5l6 6-2.5 2.5c-1.5 1.5-5 1.8-6.5.3s-1.2-5 .5-6.3z" fill="${Y}" stroke="${K}" stroke-width="1.3"/></svg>`,
 grafico2:`<svg class="ico" viewBox="0 0 24 24"><rect x="2.5" y="3" width="19" height="18" rx="2.5" fill="#fffdf8" stroke="${K}" stroke-width="1.3"/><rect x="6" y="13" width="3" height="5" fill="${GR}"/><rect x="10.5" y="9" width="3" height="9" fill="${G}"/><rect x="15" y="6" width="3" height="12" fill="${Y}"/></svg>`,
});

/* ---------- peças do vídeo 7 ---------- */
// celular vertical com um "Short" genérico dentro
function fone(P,x,y,h,t,inner='',an='pop'){const w=Math.round(h*0.52);
  return card(P,`<div style="position:absolute;inset:14px;border-radius:22px;background:#2c3238;overflow:hidden">${inner}</div><div style="position:absolute;left:50%;top:5px;width:60px;height:6px;margin-left:-30px;border-radius:3px;background:#d8cfbe"></div>`,x,y,w,h,t,an,'border:4px solid #16191c;border-radius:34px;background:#16191c');}
// conteúdo de um Short de ranking
const SH=(n,cor='#5d6670',txt='')=>`<div style="position:absolute;inset:0;background:linear-gradient(160deg,${cor},#2c3238)"></div>${txt}<div style="position:absolute;left:18px;top:18px;width:74px;height:74px;border-radius:50%;background:${Y};border:4px solid #16191c;display:flex;align-items:center;justify-content:center;font-family:Bahnschrift;font-weight:700;font-size:44px;color:#16191c">${n}</div>`;
// cartão de passo numerado
function passo(P,n,lab,x,y,w,t,on){const k=uid++;const s=card(P,`<div style="display:flex;align-items:center;gap:20px;padding:22px 26px"><div class="mk q" id="pm${k}" style="width:70px;height:70px">${n}</div><div class="h" style="font-size:40px">${lab}</div></div>`,x,y,w,114,t,'pop');
  if(on!==undefined){tl.to(s,{borderColor:G,backgroundColor:'#f3fbf6',duration:0.2},on);tl.to('#pm'+k,{backgroundColor:G,duration:0.2},on);tl.to(s,{scale:1.06,duration:0.18,yoyo:true,repeat:1},on);EV(on,'ding',0.6);}return s;}
// cifrão contador
function dolar(P,x,y,w,h,t,id,lab,fs=150){return card(P,`<div class="tag" style="position:absolute;left:34px;top:24px">${lab}</div><div class="cc" style="padding-top:30px;box-sizing:border-box"><div style="white-space:nowrap;font-family:Consolas;font-weight:700"><span style="font-size:${Math.round(fs*0.5)}px;color:var(--muted)">US$ </span><span id="${id}" style="font-size:${fs}px;letter-spacing:-3px">0</span></div></div>`,x,y,w,h,t,'pop');}
// grade de mini Shorts
function grade(P,x,y,cols,rows,w,t,cor='#5d6670',gap=16,step=0.03){const h=Math.round(w*1.6),ids=[];
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const s=add(P,`<div style="width:${w}px;height:${h}px;border-radius:14px;border:3px solid #16191c;background:${cor};position:relative;overflow:hidden"><div style="position:absolute;left:8px;top:8px;width:${Math.round(w*0.32)}px;height:${Math.round(w*0.32)}px;border-radius:50%;background:${Y}"></div><div style="position:absolute;left:10px;right:10px;bottom:12px;height:8px;border-radius:4px;background:#fffdf8;opacity:.7"></div></div>`,`left:${x+c*(w+gap)}px;top:${y+r*(h+gap)}px`);
    tl.from(s,{scale:0.5,opacity:0,duration:0.25,ease:'back.out(2)'},t+(r*cols+c)*step);ids.push(s);}EV(t,'pop');return ids;}

let P,t;
/* ---- BLOCO 1: gancho ---- */
t=T(1,0);P=nova(t);
{fone(P,830,110,700,t,SH(5,'#3b7a8f'));
 [['sem rosto',W(1,0,'rosto')],['sem gravar',W(1,0,'gravar')],['feito com IA',W(1,0,'inteligencia')]].forEach(([s,tt],i)=>chip(P,(i<2?'✕ ':`${ICON('robo',44)} `)+s,1260,190+i*150,tt,i<2?'':'g'));
 arm('point',W(1,0,'shorts'));arm('down',TF(1,0)-0.2);}
t=T(1,1);P=nova(t);
{dolar(P,820,190,1060,420,t,'d1','a promessa · por mês',170);const tp=W(1,1,'trinta');conta('d1',t+0.2,tp+0.6,0,30000);
 tl.to('#d1',{color:G,duration:0.15},tp+0.6);EV(tp+0.6,'ding');
 const q=add(P,'?',`left:1740px;top:120px;font-family:Bahnschrift;font-weight:700;font-size:220px;color:${R}`);A.pop(q,TF(1,1)-0.2);
 tl.to(q,{rotation:14,duration:0.14,yoyo:true,repeat:5},TF(1,1));surpresa(TF(1,1)-0.1);}
t=T(1,2);P=nova(t);
{card(P,`<div style="display:flex;gap:30px;align-items:center;padding:34px">${thumb(360,203,'')}<div><div class="tag">um vídeo sobre o método</div><div class="h" id="v1" style="font-size:96px;margin-top:10px">500 mil</div><div class="h" style="font-size:44px;color:var(--muted)">visualizações</div></div></div>`,820,150,1050,290,t,'pop');
 const tc=W(1,2,'copiando');for(let i=0;i<8;i++){const p=add(P,I.pessoa,`left:${860+i*125}px;top:520px;width:110px;height:110px`);tl.from(p,{y:40,opacity:0,duration:0.3,ease:'back.out(2)'},tc+i*0.06);}EV(tc,'pop');
 chip(P,'muita gente copiando agora',1060,680,tc+0.4,'k');}
t=T(1,3);P=nova(t);
{const tq=W(1,3,'quem');balao(tq,'sem aparecer?',TF(1,3)-tq+0.2);
 card(P,`<div class="cc">${ICON('cifrao',150)}<div class="h" style="font-size:60px;margin-top:18px">dinheiro</div></div>`,860,200,420,420,t,'pop');
 const pl=add(P,'+',`left:1310px;top:300px;font-family:Bahnschrift;font-weight:700;font-size:150px`);A.pop(pl,t+0.3);
 card(P,`<div class="cc">${ICON('pessoaC',150)}<div class="h" style="font-size:52px;margin-top:18px">sem aparecer</div></div>`,1430,200,420,420,W(1,3,'aparecer'),'pop');
 arm('mid',tq);arm('down',TF(1,3)-0.1);}
t=T(1,4);P=nova(t);
{title(P,'Isso funciona?',t,170,120);
 const tt=W(1,5,'quanto');const c=card(P,`<div class="cc">${ICON('ampulheta',120)}<div class="h" style="font-size:56px;margin-top:12px">por quanto tempo?</div></div>`,1060,420,560,330,tt-0.2,'pop');
 inclina(W(1,4,'funciona'));}
t=T(1,6);P=nova(t);
{const ta=W(1,6,'aviso');arm('up',ta);
 card(P,`<div style="display:flex;align-items:center;gap:44px;padding:54px 56px">${ICON('mao',150)}<div><div class="tag">um aviso antes</div><div class="h" style="font-size:66px;margin-top:12px;color:var(--red)">sem promessa de valor</div></div></div>`,820,280,1060,330,ta,'pop');arm('down',TF(1,6)-0.2);}
t=T(1,7);P=nova(t);
{title(P,'O vídeo em 4 partes',t,80,72);
 [['o método','lista',W(1,7,'metodo')],['a conta','calc',W(1,7,'conta')],['onde quebra','alerta',W(1,7,'quebra')],['a versão certa','check',W(1,8,'versao')]].forEach(([lab,ic,tt],i)=>
   card(P,`<div class="cc"><div class="mk q" style="width:74px;height:74px;font-size:44px;margin-bottom:20px">${i+1}</div>${ICON(ic,110)}<div class="h" style="font-size:40px;margin-top:20px;padding:0 10px">${lab}</div></div>`,815+i*268,230,246,450,tt,'pop',i===3?'border:3px solid var(--acc)':''));
 arm('point',W(1,7,'metodo'));arm('down',TF(1,8)-0.1);}

/* ---- BLOCO 2: o método em 4 passos ---- */
t=T(2,0);P=nova(t);
{title(P,'O método',t,90,84);
 const L=['nicho de ranking','IA estuda concorrentes','monta com clipes','volume'];
 L.forEach((s,i)=>passo(P,i+1,s,960,230+i*140,780,t+0.3+i*0.15));arm('point',t+0.3);arm('down',TF(2,0)+0.3);}
t=T(2,1);P=nova(t);
{passo(P,1,'nicho de ranking',820,80,560,t,t+0.2);
 const ps=[[5,170],[4,240],[3,310],[2,380],[1,470]];
 ps.forEach(([n,h],i)=>{const tt=W(2,2,'cinco',Math.min(i,2))+i*0.1;const s=add(P,`<div class="card" style="width:170px;height:${h}px;display:flex;align-items:flex-start;justify-content:center;padding-top:20px;${n===1?'background:#fff6d8;border-color:'+Y:''}"><span class="h" style="font-size:80px">${n}º</span></div>`,`left:${880+i*195}px;top:${800-h}px`);
   tl.from(s,{scaleY:0,transformOrigin:'50% 100%',duration:0.4,ease:'back.out(1.6)'},tt);EV(tt,'pop',0.6);});
 const tr=add(P,I.trofeu,`left:1680px;top:240px;width:110px;height:110px`);A.drop(tr,W(2,3,'primeiro'));
 chip(P,'5 → 1: contagem regressiva',1420,90,W(2,3,'contagem'),'g');}
t=T(2,4);P=nova(t);
{passo(P,2,'IA estuda concorrentes',820,80,640,t,t+0.2);
 const rows=[['canal A','2,1 mi'],['canal B','870 mil'],['canal C','1,4 mi'],['canal D','310 mil']];
 card(P,`<div style="padding:26px 34px"><div class="tag">concorrentes · exemplo</div>${rows.map((r,i)=>`<div id="cr${i}" style="display:flex;justify-content:space-between;font-size:36px;font-weight:600;padding:14px 4px;border-bottom:2px solid #ece5d6"><span>${r[0]}</span><span style="font-family:Consolas">${r[1]}</span></div>`).join('')}</div>`,820,240,560,470,W(2,5,'canais'),'pop');
 const rb=add(P,I.robo,`left:1470px;top:240px;width:220px;height:220px`);A.pop(rb,W(2,5,'ia'));tl.to(rb,{y:-14,duration:0.4,yoyo:true,repeat:5,ease:'sine.inOut'},W(2,5,'ia')+0.4);
 const tm=W(2,5,'temas');[0,2].forEach(i=>tl.to('#cr'+i,{backgroundColor:'#dff3e6',color:'#0f7a43',duration:0.25},tm+i*0.1));EV(tm,'ding',0.6);
 chip(P,'✓ temas que deram certo',1430,520,tm,'g');chip(P,'+ ideias novas',1500,640,W(2,5,'sugerir'),'');}
t=T(2,6);P=nova(t);
{passo(P,3,'monta com clipes',820,80,560,t,t+0.2);
 const tc=W(2,7,'clipes');
 const maq=card(P,`<div class="cc">${ICON('engrenagem',120)}<div class="h" style="font-size:40px;margin-top:10px">ferramenta</div></div>`,1180,330,330,330,W(2,7,'ferramenta'),'pop');
 for(let i=0;i<5;i++){const c=add(P,I.filme,`left:${860+(i%2)*120}px;top:${250+i*95}px;width:96px;height:96px`);tl.from(c,{x:-80,opacity:0,duration:0.3},tc+i*0.08);tl.to(c,{x:1280-(860+(i%2)*120),y:480-(250+i*95),scale:0.3,opacity:0,duration:0.5,ease:'power2.in'},W(2,7,'ordena')+i*0.08);}EV(tc,'pop');
 const tr=W(2,7,'redes');chip(P,'baixados de outras redes',840,760,tr,'r');
 tl.to(maq,{rotation:6,duration:0.1,yoyo:true,repeat:5},W(2,7,'ordena'));
 fone(P,1620,250,480,W(2,7,'pronto'),SH(1,'#7a5a8f'));
 const cur=add(P,CURSOR,`left:1440px;top:700px;width:44px;height:56px`);A.fade(cur,W(2,7,'clique')-0.6);tl.to(cur,{left:'1330px',top:'600px',duration:0.5,ease:E},W(2,7,'clique')-0.5);EV(W(2,7,'clique'),'clique');}
t=T(2,8);P=nova(t);
{passo(P,4,'volume',820,80,420,t,t+0.2);
 const tu=W(2,9,'dois');const D=['seg','ter','qua','qui','sex','sáb','dom'];
 D.forEach((d,i)=>{card(P,`<div class="tag" style="text-align:center;padding-top:14px">${d}</div><div style="display:flex;gap:10px;justify-content:center;margin-top:26px"><div id="sm${i}a" style="width:52px;height:84px;border-radius:10px;background:${G}"></div><div id="sm${i}b" style="width:52px;height:84px;border-radius:10px;background:${G}"></div></div>`,830+i*150,300,136,230,t+0.3+i*0.05,'pop');
   tl.from(`#sm${i}a`,{scaleY:0,transformOrigin:'50% 100%',duration:0.25},tu+i*0.07);tl.from(`#sm${i}b`,{scaleY:0,transformOrigin:'50% 100%',duration:0.25},tu+0.5+i*0.07);});EV(tu,'pop');EV(tu+0.5,'pop');
 chip(P,'1 a 2 Shorts por dia, todo dia',1000,620,W(2,9,'todo'),'k');}
t=T(2,10);P=nova(t);
{const tf=W(2,10,'fabrica');
 add(P,`<div style="width:1000px;height:40px;border-radius:20px;background:#2c3238;border:4px solid #16191c"></div>`,`left:840px;top:560px`);
 for(let i=0;i<6;i++){const s=add(P,`<div style="width:90px;height:150px;border-radius:12px;border:3px solid #16191c;background:#5d6670"><div style="margin:8px;width:30px;height:30px;border-radius:50%;background:${Y}"></div></div>`,`left:820px;top:405px`);
   tl.fromTo(s,{x:0,opacity:0},{x:960,opacity:1,duration:3,ease:'none',immediateRender:false},tf+i*0.55);tl.to(s,{opacity:0,duration:0.2},tf+i*0.55+3);}
 card(P,`<div class="cc">${ICON('engrenagem',100)}</div>`,780,330,190,200,tf-0.3,'pop');
 const tx=TF(2,10)-1.6;['quase sem custo','sem aparecer','rápido'].forEach((s,i)=>chip(P,'✓ '+s,[860,1290,1660][i],680,W(2,10,['custo','aparecer','rapido'][i]),'g'));
 title(P,'No papel: uma fábrica',tf,150,74);}

/* ---- BLOCO 3: por que parece funcionar ---- */
t=T(3,0);P=nova(t);
{title(P,'Por que parece funcionar?',t,170,86);const tv=W(3,1,'verdade');
 stamp(P,'uma parte é verdade',960,440,tv,-6,'g',64);inclina(t+0.3,6);}
t=T(3,2);P=nova(t);
{chip(P,'✓ ranking prende',840,90,t,'g');
 fone(P,850,190,620,t+0.2,SH(5,'#3b7a8f'));
 const tq=W(3,3,'primeiro');
 card(P,`<div style="padding:30px 36px"><div class="tag">quem fica até o fim</div><div style="position:relative;height:40px;border-radius:20px;background:#ece5d6;margin-top:30px;overflow:hidden"><div id="rt3" style="position:absolute;inset:0;background:${G};transform-origin:left center"></div></div><div style="display:flex;justify-content:space-between;margin-top:16px;font-family:Consolas;font-size:30px;color:var(--muted)"><span>5º</span><span>4º</span><span>3º</span><span>2º</span><span style="color:#0f7a43;font-weight:700">1º</span></div></div>`,1260,240,600,240,tq-0.4,'pop');
 tl.from('#rt3',{scaleX:0,duration:1.6,ease:'none'},tq);EV(tq+1.6,'ding');
 const tl4=W(3,4,'novo');const lp=add(P,`<svg width="180" height="180" viewBox="0 0 24 24"><path d="M19 12a7 7 0 1 1-2.05-4.95" fill="none" stroke="${G}" stroke-width="2.6" stroke-linecap="round"/><path d="M19.5 3.5v4.5H15" fill="none" stroke="${G}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,`left:1320px;top:540px;width:180px;height:180px`);
 A.pop(lp,tl4);tl.to(lp,{rotation:360,duration:1.2,ease:'power1.inOut',repeat:1},tl4+0.3);
 chip(P,'mostrado pra mais gente',1260,770,W(3,4,'mostrado'),'g');}
t=T(3,5);P=nova(t);
{chip(P,'✓ Short dá muita view',840,90,t,'g');
 card(P,`<div style="position:relative;height:100%"><div class="tag" style="position:absolute;left:34px;top:24px">canal novo · exemplo</div>
   <div style="position:absolute;left:120px;bottom:90px;width:220px;height:440px;display:flex;align-items:flex-end"><div id="b3a" style="width:100%;height:100%;border-radius:16px 16px 0 0;background:${G}"></div></div>
   <div style="position:absolute;left:520px;bottom:90px;width:220px;height:440px;display:flex;align-items:flex-end"><div id="b3b" style="width:100%;height:16%;border-radius:16px 16px 0 0;background:${GR}"></div></div>
   <div class="h" style="position:absolute;left:120px;width:220px;bottom:28px;text-align:center;font-size:40px">Short</div><div class="h" style="position:absolute;left:470px;width:320px;bottom:28px;text-align:center;font-size:40px;color:var(--muted)">vídeo longo</div></div>`,880,190,880,640,W(3,6,'canal'),'pop');
 tl.from('#b3a',{scaleY:0,transformOrigin:'50% 100%',duration:0.8,ease:'power2.out'},W(3,6,'milhares'));EV(W(3,6,'milhares'),'up');
 tl.from('#b3b',{scaleY:0,transformOrigin:'50% 100%',duration:0.8,ease:'power2.out'},W(3,6,'longo'));}
t=T(3,7);P=nova(t);
{chip(P,'✓ IA estuda concorrente',840,90,t,'g');
 const rb=add(P,I.robo,`left:880px;top:240px;width:300px;height:300px`);A.pop(rb,t+0.2);
 const lp=add(P,I.lupa,`left:1110px;top:420px;width:150px;height:150px`);A.pop(lp,t+0.5);tl.to(lp,{x:60,y:-30,duration:0.6,yoyo:true,repeat:3,ease:'sine.inOut'},t+0.9);
 card(P,`<div class="cc"><div class="tag">economiza</div><div class="h" style="font-size:90px;margin-top:10px">meses</div><div class="h" style="font-size:48px;color:var(--muted)">de tentativa</div></div>`,1360,230,480,360,W(3,8,'economiza'),'pop');
 chip(P,'serve pra qualquer canal',1030,660,W(3,9,'qualquer'),'k');}
t=T(3,10);P=nova(t);
{const tf=W(3,10,'formato'),ti=W(3,10,'ia');
 card(P,`<div class="cc"><div class="h" style="font-size:60px">formato</div><div class="mk ok" style="margin-top:20px">✓</div></div>`,880,170,420,260,tf,'pop');
 card(P,`<div class="cc"><div class="h" style="font-size:60px">IA</div><div class="mk ok" style="margin-top:20px">✓</div></div>`,1380,170,420,260,ti,'pop');
 const t2=W(3,11,'duas');
 card(P,`<div class="cc">${ICON('cifrao',110)}<div class="h" style="font-size:48px;margin-top:12px">quanto paga</div><div class="h" style="font-size:90px;color:${R}">?</div></div>`,880,480,420,330,W(3,11,'quanto'),'pop','border:3px solid var(--red)');
 card(P,`<div class="cc">${ICON('filme',110)}<div class="h" style="font-size:48px;margin-top:12px">de onde vêm os clipes</div><div class="h" style="font-size:90px;color:${R}">?</div></div>`,1380,480,420,330,W(3,11,'onde'),'pop','border:3px solid var(--red)');
 balao(t2,'olha só',2.6,R);}

/* ---- BLOCO 4: como o YouTube paga os Shorts ---- */
t=T(4,0);P=nova(t);
{title(P,'Primeiro: o dinheiro',t,140,92);
 const ic=add(P,I.cifrao,`left:1230px;top:330px;width:240px;height:240px`);A.drop(ic,t+0.3);
 chip(P,'Short não paga igual ao vídeo longo',930,660,W(4,1,'igual'),'r');}
t=T(4,2);P=nova(t);
{const ta=W(4,2,'anuncio');
 card(P,`<div style="padding:24px"><div class="tag">vídeo longo</div><div style="margin-top:14px;position:relative">${thumb(480,270,'')}<div id="ad4" style="position:absolute;left:16px;bottom:16px;padding:8px 18px;border-radius:8px;background:${Y};font-family:Bahnschrift;font-weight:700;font-size:30px">anúncio</div></div><div class="h" style="font-size:38px;margin-top:20px">anúncio dentro do vídeo</div></div>`,820,180,530,470,t,'pop');
 tl.from('#ad4',{scale:0,duration:0.3,ease:'back.out(2)'},ta);EV(ta,'pop');
 const ts=W(4,3,'entre');
 const lane=card(P,`<div style="padding:24px"><div class="tag">feed de Shorts</div><div style="display:flex;gap:14px;margin-top:14px;align-items:center">
   <div style="width:120px;height:210px;border-radius:14px;background:#5d6670;border:3px solid #16191c"></div>
   <div id="ad4b" style="width:120px;height:210px;border-radius:14px;background:${Y};border:3px solid #16191c;display:flex;align-items:center;justify-content:center;font-family:Bahnschrift;font-weight:700;font-size:28px;writing-mode:vertical-rl">anúncio</div>
   <div style="width:120px;height:210px;border-radius:14px;background:#5d6670;border:3px solid #16191c"></div></div><div class="h" style="font-size:38px;margin-top:20px">anúncio entre um Short e outro</div></div>`,1380,180,500,470,W(4,3,'short'),'pop');
 tl.from('#ad4b',{y:-200,opacity:0,duration:0.45,ease:'bounce.out'},ts);EV(ts+0.3,'impacto',0.6);}
t=T(4,4);P=nova(t);
{const tj=W(4,4,'junta');
 add(P,`<svg width="420" height="420" viewBox="0 0 24 24">${I.pote.replace(/<svg[^>]*>|<\/svg>/g,'')}</svg>`,`left:1000px;top:260px;width:420px;height:420px`);A.pop('#e'+(uid-1),tj);
 chuva(P,1185,120,tj+0.2,TF(4,4),150,0.6,3);
 const cp=add(P,'Creator Pool',`left:960px;top:700px;width:500px;text-align:center`,'chip k');A.pop(cp,W(4,4,'creator'));
 const tm=W(4,5,'musica');const mu=card(P,`<div class="cc">${ICON('musica',110)}<div class="h" style="font-size:40px;margin-top:10px">direitos da música</div></div>`,1520,320,340,300,tm,'pop');
 seta(P,1400,470,120,W(4,5,'parte'),Y);
 arm('point',tj);arm('down',TF(4,5));}
t=T(4,6);P=nova(t);
{const td=W(4,6,'dividido');
 const C=[[0,90,'#c9bfa9'],[90,170,'#b5a990'],[170,250,'#d8cfbe'],[250,300,G],[300,360,'#c2b69c']];
 const arc=(a0,a1,r)=>{const p=a=>[300+r*Math.cos((a-90)*Math.PI/180),300+r*Math.sin((a-90)*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M300 300 L${x0} ${y0} A${r} ${r} 0 ${a1-a0>180?1:0} 1 ${x1} ${y1} Z`;};
 add(P,`<svg width="560" height="560" viewBox="0 0 600 600">${C.map(([a,b,c],i)=>`<path id="fa${i}" d="${arc(a,b,270)}" fill="${c}" stroke="#16191c" stroke-width="5"/>`).join('')}</svg>`,`left:840px;top:170px;width:560px;height:560px`);
 C.forEach((_,i)=>tl.from('#fa'+i,{scale:0,svgOrigin:'300 300',duration:0.35,ease:'back.out(1.6)'},td+i*0.1));EV(td,'pop');
 tl.to('#fa3',{x:40,y:-10,duration:0.3,ease:'back.out(2)'},W(4,6,'engajadas'));
 chip(P,'fatia = suas views engajadas',880,760,W(4,6,'parte'),'');
 const t45=W(4,7,'quarenta');
 card(P,`<div class="cc"><div class="tag">você fica com</div><div class="h" style="font-size:150px;color:var(--acc);margin-top:6px">45%</div><div class="tag">da sua fatia</div></div>`,1440,390,420,380,t45,'pop','border:3px solid var(--acc)');EV(t45+0.3,'ding');}
t=T(4,8);P=nova(t);
{const te=W(4,8,'engajadas');
 card(P,`<div class="cc"><div class="h" style="font-size:70px">views <span style="color:var(--acc)">engajadas</span></div></div>`,860,110,1000,160,te,'pop');
 add(P,`<svg width="600" height="160" viewBox="0 0 600 160"><path d="M20 20 H580 L360 140 H240 Z" fill="#fffdf8" stroke="#16191c" stroke-width="6" stroke-linejoin="round"/><g stroke="#d8cfbe" stroke-width="4"><path d="M120 50h360M200 90h200"/></g></svg>`,`left:1060px;top:300px;width:600px;height:160px`);A.pop('#e'+(uid-1),W(4,9,'nem'));
 const ok=chip(P,'✓ entra na divisão',1190,500,W(4,9,'entra'),'g');
 ['✕ não original','✕ reenvio de outro criador','✕ compilação sem nada novo'].forEach((s,i)=>{const tt=W(4,10,['original','reenvio','compilacao'][i]);const c=chip(P,s,850+(i%2)*500,620+Math.floor(i/2)*110,tt,'r');tl.from(c,{y:-120,duration:0.4,ease:'bounce.out'},tt);});
 fonte(P,'fonte: Central de Ajuda do YouTube · monetização dos Shorts',W(4,10,'regra'),870);alerta(W(4,10,'reenvio'),1.6);}
t=T(4,11);P=nova(t);
{title(P,'Pra entrar pelos Shorts',t,90,74);
 card(P,`<div class="cc"><div class="tag">hoje</div><div class="h" style="font-size:110px;margin-top:6px">10 mi</div><div class="h" style="font-size:42px;color:var(--muted)">views em 90 dias</div></div>`,840,240,520,440,W(4,11,'dez'),'pop');
 const tv=W(4,12,'vinte');calendario(P,1500,215,200,W(4,12,'fevereiro'),'pop');
 card(P,`<div class="cc"><div class="h" style="font-size:96px;color:${R}">20 mi</div><div class="tag">pra quem pedir depois</div></div>`,1400,470,460,260,tv,'pop','border:3px solid var(--red)');stamp(P,'2×',1730,440,tv+0.4,10,'',80);
 fonte(P,'fonte: Central de Ajuda e blog oficial do YouTube (10/ago/2026)',tv,860);}

/* ---- BLOCO 5: a conta da promessa ---- */
t=T(5,0);P=nova(t);
{title(P,'A conta da promessa',t,110,90);
 const tv=W(5,1,'valor');
 [['mundo','país',W(5,1,'pais')],['lista','assunto',W(5,1,'assunto')],['cal','época do ano',W(5,1,'epoca')]].forEach(([ic,s,tt],i)=>card(P,`<div class="cc">${ICON(ic,110)}<div class="h" style="font-size:44px;margin-top:14px">${s}</div></div>`,860+i*340,280,300,300,tt,'pop'));
 chip(P,'valor por mil views muda muito',900,640,tv,'k');chip(P,'Short < vídeo longo',1300,750,W(5,1,'menor'),'r');}
t=T(5,2);P=nova(t);
{const tx=W(5,2,'exemplo');
 card(P,`<div style="padding:40px 50px"><div class="tag">exemplo · não é resultado de canal real</div>
   <div class="h" style="font-size:64px;margin-top:22px">US$ 30.000 <span style="color:var(--muted)">÷</span> <span style="color:var(--acc)">US$ 0,10</span> <span style="font-size:40px;color:var(--muted)">por mil</span></div>
   <div id="ln5" style="height:6px;background:var(--ink);border-radius:3px;margin:26px 0"></div>
   <div style="display:flex;align-items:baseline;gap:18px"><span id="v5" class="h" style="font-size:120px">0</span><span class="h" style="font-size:52px;color:var(--muted)">views</span></div></div>`,820,170,1060,560,tx,'pop');
 const tt=W(5,3,'trezentos');conta('v5',tt-0.6,tt+0.6,0,300000000);tl.from('#ln5',{scaleX:0,transformOrigin:'0 50%',duration:0.3},tt-0.8);
 const tm=W(5,4,'mes');stamp(P,'POR MÊS',1560,620,tm,-8,'',64);alerta(tm,1.4);}
t=T(5,5);P=nova(t);
{card(P,`<div style="padding:34px 44px"><div class="tag">e se pagasse 5× mais?</div><div style="display:flex;align-items:baseline;gap:16px;margin-top:16px"><span id="v55" class="h" style="font-size:110px">0</span><span class="h" style="font-size:46px;color:var(--muted)">views/mês</span></div></div>`,820,110,1060,260,t,'pop');
 conta('v55',t+0.3,W(5,5,'sessenta')+0.5,300000000,60000000);
 const ts=W(5,6,'sessenta');
 const g=grade(P,840,410,12,5,44,ts,'#5d6670',12,0.012);
 chip(P,'60 Shorts',1560,450,ts+0.4,'k');
 const tu=W(5,7,'milhao');tl.to(g,{backgroundColor:'transparent',duration:0.01},tu);
 chip(P,'1 mi cada',1560,600,tu,'r');tl.to(g.map(s=>s+' > div'),{borderColor:R,duration:0.2,stagger:0.01},tu);EV(tu,'impacto',0.6);}
t=T(5,8);P=nova(t);
{card(P,`<div class="cc"><div class="h" style="font-size:66px">não é impossível</div><div class="tag" style="margin-top:12px">existem canais assim</div></div>`,840,160,1000,240,t,'pop');
 const te=W(5,9,'excecao');
 for(let i=0;i<9;i++){const p=add(P,i===4?I.pessoaC:I.pessoa,`left:${880+i*105}px;top:480px;width:96px;height:96px;${i===4?'':'opacity:.35'}`);tl.from(p,{y:30,opacity:0,duration:0.3},te+i*0.04);}
 chip(P,'é a exceção',1180,640,te,'g');chip(P,'não o resultado de quem começa amanhã',930,760,W(5,9,'amanha'),'');}
t=T(5,10);P=nova(t);
{const tp=W(5,10,'pagas');
 card(P,`<div class="cc"><div class="tag">a conta só vale se as views forem</div><div class="h" style="font-size:110px;margin-top:10px;color:var(--acc)">pagas</div></div>`,840,140,1000,320,tp-0.5,'pop');
 dolar(P,1000,520,680,300,W(5,11,'canal'),'d5','se for desmonetizado',130);
 const tz=W(5,11,'zero');conta('d5',W(5,11,'canal'),W(5,11,'canal')+0.8,0,30000);conta('d5',tz-0.3,tz+0.2,30000,0);tl.to('#d5',{color:R,duration:0.2},tz-0.3);EV(tz,'impacto');
 stamp(P,'= 0',1640,560,tz,10,'',90);}

/* ---- BLOCO 6: conteúdo reutilizado ---- */
t=T(6,0);P=nova(t);
{const tc=W(6,0,'clipes');
 for(let i=0;i<5;i++){const c=add(P,I.filme,`left:${880+i*200}px;top:310px;width:170px;height:170px`);tl.from(c,{y:-60,opacity:0,duration:0.35,ease:'back.out(2)'},t+0.2+i*0.08);
   tl.to(c,{filter:'sepia(1) saturate(6) hue-rotate(-50deg)',duration:0.3},tc+i*0.06);}
 title(P,'Onde o método quebra',t,140,84);chip(P,'os clipes',1200,560,tc,'r');alerta(tc,1.6);}
t=T(6,1);P=nova(t);
{const tr=W(6,1,'reutilizado');
 card(P,`<div style="padding:40px 48px"><div class="tag">regra de monetização</div><div class="h" style="font-size:72px;margin-top:12px">conteúdo reutilizado</div>
   <div class="tag" style="margin-top:34px">não monetiza conteúdo que já existe:</div>
   ${['sem comentário original','sem mudança importante','sem valor próprio'].map((s,i)=>`<div class="row" id="rr${i}" style="font-size:44px;font-weight:600;margin-top:22px"><div class="mk no">✕</div><div>${s}</div></div>`).join('')}</div>`,820,130,1060,640,tr,'pop');
 [['comentario',0],['mudanca',1],['valor',2]].forEach(([w,i])=>{const tt=W(6,2,w);tl.from('#rr'+i,{x:-60,opacity:0,duration:0.4},tt);EV(tt,'up',0.6);});}
t=T(6,3);P=nova(t);
{const tl_=W(6,3,'lista');
 card(P,`<div style="padding:34px 44px"><div class="tag">central de ajuda · exemplos do que não é permitido</div>
   <div class="bar" style="width:640px;margin-top:30px"></div><div class="bar" style="width:520px;margin-top:22px"></div>
   <div style="position:relative;margin-top:26px;font-size:44px;font-weight:700"><div id="mt6" style="position:absolute;left:-10px;right:-10px;top:-4px;bottom:-4px;background:#fbe9a7;border-radius:8px;transform-origin:left center"></div><span style="position:relative">"vídeos curtos compilados de outras redes sociais"</span></div>
   <div class="bar" style="width:600px;margin-top:30px"></div><div class="bar" style="width:440px;margin-top:22px"></div></div>`,820,150,1060,470,tl_,'pop');
 const tv=W(6,3,'videos');tl.from('#mt6',{scaleX:0,duration:0.9,ease:'power1.inOut'},tv);EV(tv,'risca',0.5);
 const tp=W(6,4,'passo');passo(P,3,'monta com clipes',1000,680,560,tp,tp+0.4);stamp(P,'= isso',1590,680,tp+0.5,-8,'',64);}
t=T(6,5);P=nova(t);
{title(P,'Mais 2 detalhes',t,90,80);
 const ti=W(6,6,'inteiro');const g=grade(P,860,240,8,2,80,ti-0.4,'#5d6670',14,0.015);
 const lp=add(P,I.lupa,`left:860px;top:240px;width:180px;height:180px`);A.pop(lp,W(6,7,'revisor'));tl.to(lp,{x:780,duration:2.2,ease:'sine.inOut'},W(6,7,'revisor')+0.2);
 chip(P,'1. vale pro canal inteiro',1000,610,ti,'k');
 const tm=W(6,8,'maior');tl.to(g.slice(0,12).map(s=>s+' > div'),{backgroundColor:R,duration:0.2,stagger:0.03},tm);
 chip(P,'✕ o canal todo é recusado',1050,730,W(6,8,'recusado'),'r');}
t=T(6,9);P=nova(t);
{const tp=W(6,9,'permissao');
 card(P,`<div style="display:flex;align-items:center;gap:40px;padding:50px 56px">${ICON('contrato',150)}<div><div class="tag">2. vale até com</div><div class="h" style="font-size:96px;margin-top:8px">permissão</div></div></div>`,860,240,960,330,W(6,9,'segundo'),'pop');
 stamp(P,'mesmo assim ✕',1300,600,tp+0.3,-6,'',64);}
t=T(6,10);P=nova(t);
{const ta=W(6,10,'autoral');
 const cp=add(P,I.copy,`left:880px;top:200px;width:260px;height:260px`);A.pop(cp,ta);
 card(P,`<div class="cc"><div class="tag">separado da monetização</div><div class="h" style="font-size:64px;margin-top:12px">direito autoral</div></div>`,1200,200,660,260,ta,'pop');
 const tr=W(6,11,'reivindicacao');chip(P,'reivindicação',900,520,tr,'r');
 const td=W(6,11,'dinheiro');const m=add(P,I.moeda,`left:1000px;top:660px;width:90px;height:90px`);A.pop(m,td-0.3);tl.to(m,{x:520,duration:0.8,ease:E},td);EV(td,'whoosh',0.5);
 chip(P,'dinheiro vai pro dono do clipe',1180,780,td+0.3,'');
 const tb=W(6,11,'derrubar');stamp(P,'vídeo removido',1350,520,tb,-6,'',54);}
t=T(6,12);P=nova(t);
{card(P,`<svg width="1000" height="520" viewBox="0 0 1000 520"><path d="M60 460 H960" stroke="#16191c" stroke-width="5"/>
   <path id="cv6" d="M60 440 C300 420 520 300 940 70" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round" ${DASH}/>
   <path id="cz6" d="M60 450 H940" fill="none" stroke="${R}" stroke-width="12" stroke-linecap="round" ${DASH}/>
   <text x="760" y="140" font-family="Bahnschrift" font-weight="700" font-size="46" fill="${G}">views</text><text id="tz6" x="560" y="420" font-family="Bahnschrift" font-weight="700" font-size="46" fill="${R}">monetização = 0</text></svg>`,840,150,1040,580,t,'pop','padding:30px');
 traço('#cv6',W(6,12,'crescer'),1.4);traço('#cz6',W(6,13,'dificilmente'),1.4);tl.from('#tz6',{opacity:0,duration:0.3},W(6,13,'aceito'));EV(W(6,13,'aceito'),'impacto',0.6);
 inclina(W(6,13,'programa'),-5);}

/* ---- BLOCO 7: conteúdo inautêntico ---- */
t=T(7,0);P=nova(t);
{title(P,'O segundo problema: a fábrica',t,140,80);const ic=add(P,I.engrenagem,`left:1200px;top:330px;width:280px;height:280px`);A.pop(ic,t+0.3);tl.to(ic,{rotation:180,duration:3,ease:'none'},t+0.6);}
t=T(7,1);P=nova(t);
{const tj=W(7,1,'julho');
 card(P,`<div class="cc"><div class="tag">julho de 2025</div><div class="h" id="rp7" style="font-size:72px;margin-top:20px;color:var(--muted)">"repetitivo"</div><div class="h" style="font-size:60px;margin:10px 0">↓</div><div class="h" id="in7" style="font-size:84px;color:var(--red)">"inautêntico"</div></div>`,880,150,900,520,tj,'pop');
 const ti=W(7,1,'inautentico');tl.from('#in7',{scale:0.4,opacity:0,duration:0.4,ease:'back.out(2)'},ti);EV(ti,'impacto',0.6);
 chip(P,'repetitivo ou produzido em massa',960,720,W(7,2,'repetitivo'),'r');}
t=T(7,3);P=nova(t);
{const tc=W(7,3,'diferente');
 card(P,`<div style="padding:34px 40px"><div class="row" style="font-size:46px;font-weight:700"><div class="mk ok">✓</div><div>cada vídeo diferente e com valor</div></div><div style="display:flex;gap:20px;margin-top:30px">${['informação','opinião','entretenimento'].map((s,i)=>`<div id="vl7${i}" class="chip g" style="font-size:34px">${s}</div>`).join('')}</div></div>`,840,130,1040,280,tc,'pop','border:3px solid var(--acc)');
 ['informacao','opiniao','entretenimento'].forEach((w,i)=>tl.from('#vl7'+i,{y:20,opacity:0,duration:0.3},W(7,3,w)));
 const tm=W(7,4,'molde');
 card(P,`<div style="padding:34px 40px"><div class="row" style="font-size:46px;font-weight:700"><div class="mk no">✕</div><div>mesmo molde, só troca o assunto</div></div></div>`,840,460,1040,160,tm,'pop','border:3px solid var(--red)');
 const tg=W(7,5,'genericos');card(P,`<div style="padding:26px 36px;font-size:38px;font-style:italic">"conteúdo gerado por IA com modelos genéricos"</div>`,900,660,920,120,tg-0.4,'pop');}
t=T(7,6);P=nova(t);
{const tp=W(7,6,'pensa');const g=grade(P,840,140,10,2,78,tp,'#5d6670',16,0.02);
 [['mesma estrutura','estrutura'],['mesma voz','voz'],['mesmo texto','texto'],['clipes dos outros','clipes'],['2 por dia','dois']].forEach(([s,w],i)=>chip(P,s,850+(i%3)*350,560+Math.floor(i/3)*110,W(7,6,w),i===3?'r':''));
 const tr=W(7,7,'regra');stamp(P,'produção em massa',1180,330,tr,-8,'',70);}
t=T(7,8);P=nova(t);
{const tv=W(7,8,'revisao');
 card(P,`<div class="cc">${ICON('lupa',130)}<div class="h" style="font-size:56px;margin-top:16px">a revisão não é uma vez só</div><div class="tag" style="margin-top:12px">canal monetizado pode ser revisado de novo</div></div>`,840,200,1020,460,tv,'pop');
 chip(P,'✕ pode perder a monetização',1080,720,W(7,8,'perder'),'r');}
t=T(7,9);P=nova(t);
{const ti=W(7,9,'ia');
 card(P,`<div class="cc">${ICON('robo',150)}<div class="h" style="font-size:60px;margin-top:16px">usar IA</div><div class="mk ok" style="margin-top:16px">✓</div></div>`,860,180,460,500,ti,'pop','border:3px solid var(--acc)');
 const tc=W(7,10,'cem');
 card(P,`<div class="cc"><div class="h" style="font-size:96px">100</div><div class="h" style="font-size:52px">vídeos iguais</div><div class="tag" style="margin-top:10px">sem nada seu</div><div class="mk no" style="margin-top:16px;background:${R}">✕</div></div>`,1400,180,460,500,tc,'pop','border:3px solid var(--red)');
 joinha(ti,1.4);dedo(tc+0.3,1.4);}

/* ---- BLOCO 8: a versão que dá pra monetizar ---- */
t=T(8,0);P=nova(t);
{title(P,'A versão que dá pra monetizar',t,90,74);
 const L=['material que você pode usar','a sua voz','IA no trabalho pesado','menos volume, mais variedade','Short como porta'];
 L.forEach((s,i)=>passo(P,i+1,s,940,220+i*122,860,t+0.4+i*0.12));chip(P,'mantém quase tudo',1140,840,W(8,1,'manter'),'g');}
t=T(8,2);P=nova(t);
{passo(P,1,'material que você pode usar',820,80,800,t,t+0.2);
 [['pincel','você faz (até com IA)','imagens'],['grafico2','gráficos e mapas','graficos'],['notebook','telas que você grava','telas'],['contrato','com licença de uso','licenca']].forEach(([ic,s,w],i)=>
   card(P,`<div class="cc">${ICON(ic,110)}<div class="h" style="font-size:36px;margin-top:16px;padding:0 12px">${s}</div></div>`,830+i*262,260,240,330,W(8,3,w),'pop'));
 stamp(P,'material seu ou licenciado',1040,650,W(8,3,'licenca')+0.3,-4,'g',58);}
t=T(8,4);P=nova(t);
{passo(P,2,'a sua voz',820,80,420,t,t+0.2);
 const mc=add(P,I.micro,`left:880px;top:260px;width:240px;height:240px`);A.pop(mc,W(8,4,'voz'));
 chip(P,'sem mostrar o rosto',830,560,W(8,5,'rosto'),'g');
 fone(P,1260,200,560,W(8,6,'posicao'),SH(1,'#3b7a8f',`<div style="position:absolute;left:14px;right:14px;bottom:30px;padding:10px;border-radius:12px;background:#fffdf8;font-family:Bahnschrift;font-weight:700;font-size:24px;color:#16191c">por que é o nº 1</div>`));
 ['por que','um dado','opinião'].forEach((s,i)=>chip(P,s,1600,250+i*120,W(8,6,['por','dado','opiniao'][i]),''));
 chip(P,'= comentário original',1300,790,W(8,7,'comentario'),'g');}
t=T(8,8);P=nova(t);
{card(P,`<div style="padding:40px 50px"><div class="tag">exemplo</div><div class="h" style="font-size:60px;margin-top:14px">5 carros mais rápidos</div><div class="row" style="font-size:40px;font-weight:600;margin-top:26px">${ICON('micro',60)}<div>+ sua voz explicando o motor</div></div></div>`,860,190,1000,360,t,'pop');
 stamp(P,'outro vídeo',1250,600,W(8,8,'outro'),-6,'g',72);}
t=T(8,9);P=nova(t);
{passo(P,3,'IA no trabalho pesado',820,80,620,t,t+0.2);
 const rb=add(P,I.robo,`left:870px;top:250px;width:260px;height:260px`);A.pop(rb,t+0.3);
 [['estudar concorrente','estudar'],['achar tema','tema'],['organizar pesquisa','pesquisa'],['ajudar no roteiro','roteiro']].forEach(([s,w],i)=>chip(P,'✓ '+s,1170,230+i*100,W(8,10,w),'g'));
 const tp=W(8,11,'vista');const lb=add(P,I.lampada,`left:1600px;top:560px;width:150px;height:150px`);A.pop(lb,tp);
 chip(P,'o ponto de vista é seu',1060,700,tp,'k');arm('up',tp);arm('down',TF(8,11)+0.2);}
t=T(8,12);P=nova(t);
{passo(P,4,'menos volume, mais variedade',820,80,800,t,t+0.2);
 const te=W(8,13,'vez');
 const a=card(P,`<div class="cc"><div class="tag">antes</div><div style="display:flex;gap:10px;margin-top:20px">${[0,1,2,3,4,5].map(()=>`<div style="width:56px;height:96px;border-radius:10px;background:${GR}"></div>`).join('')}</div><div class="h" style="font-size:40px;margin-top:18px">2 por dia, iguais</div></div>`,840,260,500,380,te,'pop');
 risco(P,860,440,460,W(8,13,'iguais')+0.3);
 const cs=['#3b7a8f',G,Y];
 card(P,`<div class="cc"><div class="tag">depois</div><div style="display:flex;gap:16px;margin-top:20px">${cs.map(c=>`<div style="width:76px;height:126px;border-radius:12px;background:${c};border:3px solid #16191c"></div>`).join('')}</div><div class="h" style="font-size:40px;margin-top:18px">poucos por semana, diferentes</div></div>`,1380,260,500,380,W(8,13,'poucos'),'pop','border:3px solid var(--acc)');}
t=T(8,14);P=nova(t);
{passo(P,5,'Short como porta',820,80,560,t,t+0.2);
 fone(P,840,230,520,W(8,15,'liga'),SH(2,'#3b7a8f',`<div style="position:absolute;left:14px;right:14px;bottom:24px;padding:8px;border-radius:10px;background:#fffdf8;font-family:Bahnschrift;font-weight:700;font-size:20px;color:#16191c;text-align:center">▶ vídeo relacionado</div>`));
 seta(P,1150,450,200,W(8,15,'relacionado'));
 card(P,`<div style="padding:24px">${thumb(440,248,'')}<div class="h" style="font-size:40px;margin-top:16px">vídeo longo</div></div>`,1380,280,490,380,W(8,15,'longo'),'pop');
 chip(P,'Short traz gente nova',840,790,W(8,16,'gente'),'g');chip(P,'⏱ horas + anúncio no longo',1350,700,W(8,16,'horas'),'k');}

/* ---- BLOCO 9: resumo ---- */
t=T(9,0);P=nova(t);
{const r=add(P,'resumindo',`left:830px;top:100px`,'chip k');A.pop(r,t);
 card(P,`<div style="padding:34px 40px"><div class="tag" style="color:#0f7a43">a parte boa</div>${['ranking prende','Short dá alcance','IA economiza pesquisa'].map((s,i)=>`<div class="row" id="pb9${i}" style="font-size:42px;font-weight:600;margin-top:24px"><div class="mk ok">✓</div><div>${s}</div></div>`).join('')}</div>`,830,200,510,430,W(9,1,'parte'),'pop','border:3px solid var(--acc)');
 ['prende','alcance','economiza'].forEach((w,i)=>tl.from('#pb9'+i,{x:-40,opacity:0,duration:0.35},W(9,1,w)));
 card(P,`<div style="padding:34px 40px"><div class="tag" style="color:#a52f2f">o que a regra não aceita</div>${['clipes de outras redes','vídeo em série'].map((s,i)=>`<div class="row" id="pr9${i}" style="font-size:42px;font-weight:600;margin-top:24px"><div class="mk no" style="background:${R}">✕</div><div>${s}</div></div>`).join('')}</div>`,1370,200,510,430,W(9,2,'parte'),'pop','border:3px solid var(--red)');
 ['clipes','fabricar'].forEach((w,i)=>tl.from('#pr9'+i,{x:-40,opacity:0,duration:0.35},W(9,2,w)));}
t=T(9,3);P=nova(t);
{card(P,`<div class="cc"><div class="h" style="font-size:72px">US$ 30 mil/mês</div><div class="h" style="font-size:50px;margin:16px 0">=</div><div class="h" style="font-size:64px;color:var(--red)">centenas de milhões de views</div><div class="tag" style="margin-top:22px">e só se o canal for monetizado</div></div>`,840,180,1040,520,t,'pop');}
t=T(9,4);P=nova(t);
{title(P,'Canal sem aparecer? Faz.',t,100,80);
 ['material seu','voz sua','ideia diferente em cada vídeo'].forEach((s,i)=>row(P,'✓',s,930,280+i*120,W(9,5,['material','voz','ideia'][i]),'ok',52));
 chip(P,'dá mais trabalho no começo',900,680,W(9,6,'trabalho'),'');chip(P,'✓ continua de pé daqui a 1 ano',1240,780,W(9,6,'continua'),'g');joinha(W(9,4,'faz'),1.6);}
t=T(9,7);P=nova(t);
{const tc=W(9,7,'conta');
 card(P,`<div style="padding:34px 40px;display:flex;gap:28px"><div style="width:90px;height:90px;border-radius:50%;background:${G};flex:none"></div><div><div class="tag">comentário</div><div class="h" id="cm9" style="font-size:56px;margin-top:10px">já vi canal de ranking sumir...</div></div></div>`,830,170,1040,230,tc,'pop');
 tl.from('#cm9',{clipPath:'inset(0 100% 0 0)',duration:1.2,ease:'steps(20)'},tc+0.4);for(let k=0;k<8;k++)EV(tc+0.4+k*0.15,'tick',0.6);
 const tI=W(9,8,'inscreve');
 const b=card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 54px;background:${R};border-radius:20px">${ICON('sino',80)}<div class="h" style="font-size:72px;color:#fff">Inscreva-se</div></div>`,1050,480,600,150,tI,'pop','border:none;background:transparent;box-shadow:none');
 tl.to(b,{scale:1.06,duration:0.35,yoyo:true,repeat:7,ease:'sine.inOut'},tI+0.5);joinha(tI+0.2,3.4);
 const tx=add(P,'o YouTube por dentro, sem promessa milagrosa',`left:930px;top:680px;width:840px;text-align:center`,'tag');A.fade(tx,W(9,8,'dentro'));}
