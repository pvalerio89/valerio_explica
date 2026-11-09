/* =================== CENAS · vídeo 6 (4.000 horas) =================== */
/* ícones novos (genéricos, sem marcas) */
Object.assign(I,{
 alavanca:`<svg class="ico" viewBox="0 0 24 24"><path d="M3 21.5h18" stroke="${K}" stroke-width="2" stroke-linecap="round"/><path d="M12 15l-3.6 6.4h7.2z" fill="${Y}" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/><path d="M2.5 18.5L20 10.5" stroke="${K}" stroke-width="3.8" stroke-linecap="round"/><path d="M2.5 18.5L20 10.5" stroke="${G}" stroke-width="1.8" stroke-linecap="round"/><circle cx="20.3" cy="8.3" r="2.6" fill="${R}" stroke="${K}" stroke-width="1.2"/></svg>`,
 mao:`<svg class="ico" viewBox="0 0 24 24"><g fill="#f2c9a0" stroke="${K}" stroke-width="1.1"><rect x="5.4" y="7" width="2.9" height="9" rx="1.45"/><rect x="8.5" y="3.4" width="2.9" height="11" rx="1.45"/><rect x="11.6" y="2.6" width="2.9" height="11.5" rx="1.45"/><rect x="14.7" y="4.2" width="2.9" height="10.5" rx="1.45"/><rect x="17.3" y="9.6" width="2.9" height="7" rx="1.45" transform="rotate(32 18.7 13.1)"/><path d="M5.4 12h12.2v4.6c0 3.4-2.5 5.6-6.1 5.6s-6.1-2.2-6.1-5.6z"/></g></svg>`,
 lixeira:`<svg class="ico" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="2.6" rx="1" fill="${GR}" stroke="${K}" stroke-width="1.1"/><path d="M9.5 5V3.4h5V5" stroke="${K}" stroke-width="1.3" fill="none"/><path d="M5.5 8h13l-1.2 13.5H6.7z" fill="#fffdf8" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.5 11v7.5M14.5 11v7.5" stroke="${GR}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
 live:`<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${R}"/><circle cx="12" cy="12" r="3.2" fill="#fff"/><path d="M7.4 7.4a6.5 6.5 0 0 0 0 9.2M16.6 7.4a6.5 6.5 0 0 1 0 9.2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,
 luz:`<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="9" r="7" fill="none" stroke="${Y}" stroke-width="3.4"/><circle cx="12" cy="9" r="7" fill="none" stroke="${K}" stroke-width="1" /><circle cx="12" cy="9" r="2.4" fill="#5d6670"/><path d="M12 16v6M8.5 22h7" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
 lista:`<svg class="ico" viewBox="0 0 24 24"><rect x="4.5" y="3.5" width="15" height="19" rx="2" fill="#fffdf8" stroke="${K}" stroke-width="1.4"/><rect x="8.5" y="2" width="7" height="3.4" rx="1" fill="${GR}" stroke="${K}" stroke-width="1"/><g stroke="${G}" stroke-width="1.6" stroke-linecap="round"><path d="M8 9.5h8M8 13.5h8M8 17.5h5"/></g><text x="17.6" y="20.6" font-family="Bahnschrift" font-weight="700" font-size="6" fill="${R}">?</text></svg>`,
 bolo:`<svg class="ico" viewBox="0 0 24 24"><rect x="3.5" y="12" width="17" height="9" rx="2" fill="#8a5a32" stroke="${K}" stroke-width="1.2"/><path d="M3.5 13.5c2 2 3.5 0 5.6 1.6s3.4-1.6 5.6 0 3.6-1 5.8-1.6V12h-17z" fill="#fffdf8" stroke="${K}" stroke-width="1"/><rect x="11" y="6" width="2" height="6" rx=".8" fill="${Y}" stroke="${K}" stroke-width=".8"/><path d="M12 2.4c1.2 1.3 1.2 2.4 0 3.2-1.2-.8-1.2-1.9 0-3.2z" fill="${R}"/></svg>`,
 link:`<svg class="ico" viewBox="0 0 24 24"><g fill="none" stroke="${G}" stroke-width="2.4" stroke-linecap="round"><path d="M10 14a4 4 0 0 0 5.6 0l3.2-3.2a4 4 0 0 0-5.6-5.6l-1.2 1.2"/><path d="M14 10a4 4 0 0 0-5.6 0l-3.2 3.2a4 4 0 0 0 5.6 5.6l1.2-1.2"/></g></svg>`,
 balaoC:`<svg class="ico" viewBox="0 0 24 24"><path d="M3 4.5h18v12H9l-5 4v-4H3z" fill="#fffdf8" stroke="${K}" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 9h10M7 12.5h6" stroke="${GR}" stroke-width="1.6" stroke-linecap="round"/></svg>`,
 pino:`<svg class="ico" viewBox="0 0 24 24"><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3z" fill="${R}" stroke="${K}" stroke-width="1.2" stroke-linejoin="round"/><path d="M12 14v7" stroke="${K}" stroke-width="1.8" stroke-linecap="round"/></svg>`,
});
const CURSOR=`<svg width="44" height="56" viewBox="0 0 22 28"><path d="M2 2v21l5.5-5 4 8.5 3.6-1.6-4-8.4h7.4z" fill="#fff" stroke="${K}" stroke-width="2" stroke-linejoin="round"/></svg>`;

/* ---------- peças reutilizáveis ---------- */
function relogio(P,x,y,w,h,t,id,lab='horas assistidas',an='pop',fs){fs=fs||Math.round(h*0.4);
  return card(P,`<div class="tag" style="position:absolute;left:34px;top:24px">${lab}</div><div style="position:absolute;right:28px;top:18px;width:58px;height:58px">${I.relogio}</div>
   <div class="cc" style="padding-top:34px;box-sizing:border-box"><div style="white-space:nowrap"><span id="${id}" style="font-family:Consolas;font-weight:700;font-size:${fs}px;letter-spacing:-3px">0</span><span style="font-family:Consolas;font-weight:700;font-size:${Math.round(fs*0.5)}px;color:var(--muted)"> h</span></div></div>`,x,y,w,h,t,an);}
const TL=['T','E','M','P','O'],TN=['tema buscado','encadear','minutos','prender','outras portas'];
function sigla(P,x,y,sz,t,on,o={}){const ids=[],gap=Math.round(sz*0.22),k=uid++;
  TL.forEach((L,i)=>{const lit=i===on,done=o.todas||(on>=0&&i<on);
    const st=lit?`background:${G};border-color:${G};color:#fff`:done?'background:var(--soft);border-color:#9fd6b5;color:#0f7a43':'';
    const nm=o.nomes?`<div id="sn${k}_${i}" style="font-size:${Math.round(sz*0.15)}px;font-weight:700;margin-top:6px;line-height:1.1;padding:0 6px">${TN[i]}</div>`:'';
    ids.push(card(P,`<div class="cc"><div class="h" style="font-size:${Math.round(sz*0.62)}px">${L}</div>${nm}</div>`,x+i*(sz+gap),y,sz,Math.round(sz*(o.nomes?1.3:1)),o.tt?o.tt[i]:t+i*0.08,o.an||'pop',st));});
  if(on>=0&&!o.todas){tl.to(ids[on],{scale:1.14,duration:0.22,yoyo:true,repeat:1,ease:'sine.inOut'},t+0.75);EV(t+0.75,'ding',0.6);}
  return ids;}
function formula3(P,x,y,t,rev,lab='a conta inteira'){const k=uid++;
  const pcs=[['views','',230,66],['tempo médio','color:#149a55',340,56],['horas','',230,66]];
  let L=30,h=`<div class="tag" style="position:absolute;left:30px;top:24px">${lab}</div>`;
  pcs.forEach(([v,c,w,fs],i)=>{h+=`<div class="pc" id="pc${k}_${i}" style="left:${L}px;width:${w}px"><div class="q">?</div><div class="v" style="${c};font-size:${fs}px">${v}</div></div>`;L+=w;
    if(i<2){h+=`<div class="op" style="left:${L+10}px">${['×','='][i]}</div>`;L+=80;}});
  const s=card(P,h,x,y,L+30,320,t);
  rev.forEach((tt,i)=>{const p='#pc'+k+'_'+i;EV(tt,'clique');
    tl.to(p,{scaleX:0,duration:0.1,ease:'power2.in'},tt);tl.set(p+' .q',{opacity:0},tt+0.1);tl.set(p+' .v',{opacity:1},tt+0.1);
    tl.set(p,{background:'#fffdf8',borderStyle:'solid',borderColor:i===1?'#149a55':'#d8cfbe'},tt+0.1);tl.to(p,{scaleX:1,duration:0.14,ease:'back.out(2)'},tt+0.1);});
  return s;}
function studio(P,x,y,w,h,t,tabs,body,menuW=240){const k=uid++;const menu=['Painel','Conteúdo','Análises','Comentários','Ganhar'];
  card(P,`<div class="win" style="position:relative;height:100%"><div class="top"><i></i><i></i><i></i>&nbsp; painel do canal</div>
   <div style="position:absolute;left:0;top:58px;bottom:0;width:${menuW}px;border-right:2px solid var(--line);padding-top:20px">${menu.map((m,i)=>`<div id="mn${k}_${i}" style="margin:6px 14px;padding:12px 18px;border-radius:12px;font-size:30px;font-weight:600;height:40px;line-height:40px">${m}</div>`).join('')}</div>
   ${tabs?`<div style="position:absolute;left:${menuW+28}px;top:78px;display:flex;gap:14px">${tabs.map((m,i)=>`<div id="tb${k}_${i}" style="padding:10px 18px;border-radius:10px;font-size:28px;font-weight:600;color:var(--muted);border-bottom:4px solid transparent;white-space:nowrap">${m}</div>`).join('')}</div>`:''}
   <div style="position:absolute;left:${menuW+30}px;top:${tabs?160:84}px;right:34px;bottom:30px">${body}</div></div>`,x,y,w,h,t,'pop');
  const cur=add(P,CURSOR,`left:${x+w-110}px;top:${y+h-70}px;width:44px;height:56px`);A.fade(cur,t+0.35);
  const go_=(px,py,tt)=>tl.to(cur,{left:px+'px',top:py+'px',duration:0.6,ease:E},tt-0.6);
  return {k,cur,to:go_,
    menu:(i,tt)=>{go_(x+150,y+58+20+6+20+i*76,tt);tl.to(`#mn${k}_${i}`,{backgroundColor:'#dff3e6',color:'#0f7a43',duration:0.2},tt);EV(tt,'clique');},
    tab:(i,tt)=>{let px=x+menuW+28;for(let j=0;j<i;j++)px+=36+tabs[j].length*15.5+14;px+=(36+tabs[i].length*15.5)/2;
      go_(px,y+100,tt);tl.to(`#tb${k}_${i}`,{color:'#0f7a43',borderBottomColor:G,duration:0.2},tt);EV(tt,'clique');}};}
function seta(P,x,y,w,t,cor=G){const s=add(P,`<svg width="${w}" height="60" viewBox="0 0 ${w} 60"><path d="M6 30 H${w-26}" stroke="${cor}" stroke-width="10" stroke-linecap="round"/><path d="M${w-40} 10 L${w-8} 30 L${w-40} 50" fill="none" stroke="${cor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,`left:${x}px;top:${y}px;width:${w}px;height:60px`);
  tl.from(s,{scaleX:0,transformOrigin:'0 50%',duration:0.4,ease:'power3.out'},t);EV(t,'up',0.6);return s;}
function risco(P,x,y,w,t,h=12){const ln=add(P,'',`left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${h/2}px;background:${R};transform-origin:left center`);tl.from(ln,{scaleX:0,duration:0.35,ease:'power2.out'},t);EV(t,'risca');return ln;}
// linha desenhada (pathLength=1)
function traço(sel,t,d=0.9,e='power2.inOut'){tl.fromTo(sel,{strokeDashoffset:1},{strokeDashoffset:0,duration:d,ease:e},t);}
const DASH='style="stroke-dasharray:1;stroke-dashoffset:1" pathLength="1"';
const thumb=(w,h,txt='')=>`<div style="width:${w}px;height:${h}px;border-radius:14px;background:#2c3238;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">${txt}<div style="position:absolute;right:14px;bottom:12px;width:${Math.round(h*0.32)}px;height:${Math.round(h*0.22)}px">${I.play}</div></div>`;
function pop2(s,t){tl.from(s,{scale:0.6,opacity:0,duration:0.4,ease:'back.out(2)'},t);EV(t,'pop',0.7);}

let P,t;
/* ---- BLOCO 1: gancho ---- */
t=T(1,0);P=nova(t);
{relogio(P,830,170,1000,420,t,'h1');const ta=W(1,0,'assistidas')+0.35;conta('h1',t+0.2,ta,0,4000);
 tl.to('#h1',{color:G,duration:0.15},ta);tl.to('#h1',{scale:1.06,duration:0.15,yoyo:true,repeat:1},ta);EV(ta,'ding');
 chip(P,`${ICON('porta',44)} Programa de Parcerias`,880,650,W(1,1,'programa'),'k');
 chip(P,`${ICON('cifrao',44)} ganhar com anúncio`,1360,760,W(1,1,'ganhar'),'g');
 arm('point',t+0.3);arm('down',W(1,1,'ganhar')+0.5);}
t=T(1,2);P=nova(t);
{card(P,`<div class="cc">${ICON('porta',130)}<div class="h" style="font-size:54px;margin-top:14px">a porta</div></div>`,820,170,340,340,t,'pop');
 const tp=W(1,2,'prazo');const amp=add(P,I.ampulheta,`left:1080px;top:120px;width:120px;height:120px`);A.drop(amp,tp);
 tl.to(amp,{rotation:180,duration:0.6,ease:E},tp+0.8);
 const tf=W(1,3,'fevereiro');calendario(P,890,560,200,tf,'pop');
 const c=card(P,`<div style="padding:44px 56px"><div class="tag">pra pedir a entrada</div>
   <div class="h" id="q1" style="font-size:120px;margin-top:18px">4.000 h</div><div class="h" id="q2" style="font-size:80px;color:var(--muted);margin-top:4px">+ 4.000 h</div>
   <div id="q3" style="height:6px;background:var(--ink);border-radius:3px;margin:22px 0 18px"></div><div class="h" id="q4" style="font-size:132px;color:var(--red)">8.000 h</div></div>`,1240,150,620,640,t+0.2,'pop');
 const to=W(1,3,'oito');
 tl.from('#q2',{x:160,opacity:0,duration:0.4,ease:'back.out(1.6)'},to-0.6);EV(to-0.6,'up');
 tl.from('#q3',{scaleX:0,transformOrigin:'0 50%',duration:0.3},to-0.1);tl.from('#q4',{scale:0.5,opacity:0,duration:0.4,ease:'back.out(2)'},to);EV(to,'impacto',0.7);
 stamp(P,'2×',1690,90,W(1,4,'dobro'),10,'',110);
 fonte(P,'fonte: blog oficial do YouTube · regra a partir de 1º/fev/2027',tf+0.3,850);
 arm('point',tf);arm('down',W(1,4,'dobro')+0.4);}
t=T(1,5);P=nova(t);
{const tq=W(1,5,'tempo');objeto('#pAmp',t,TF(1,6)-t+0.3,'mid');balao(tq,'dá tempo?',TF(1,6)-tq+0.2);troca(W(1,6,'como'),'como?',G);
 relogio(P,830,210,560,320,t+0.1,'h3','a meta','pop',120);conta('h3',t+0.2,t+1.2,0,4000);
 seta(P,1410,340,140,W(1,5,'antes'));
 calendario(P,1580,190,280,W(1,5,'fevereiro'),'pop');
 const pq=add(P,'?',`left:1080px;top:590px;width:300px;text-align:center;font-family:Bahnschrift;font-weight:700;font-size:200px;color:var(--acc)`);A.pop(pq,tq);
 tl.to(pq,{rotation:12,duration:0.14,yoyo:true,repeat:5},tq+0.5);}
t=T(1,7);P=nova(t);
{const ta=W(1,7,'aviso');arm('up',ta);surpresa(ta+0.1);
 card(P,`<div style="display:flex;align-items:center;gap:44px;padding:54px 56px">${ICON('mao',150)}<div><div class="tag">um aviso antes</div><div class="h" id="av1" style="font-size:62px;margin-top:12px">sem atalho mágico</div><div class="h" id="av2" style="font-size:58px;margin-top:10px;color:var(--red)">sem promessa de resultado</div></div></div>`,800,240,1080,400,ta,'pop');
 tl.from('#av1',{opacity:0,y:30,duration:0.4},W(1,7,'atalho'));EV(W(1,7,'atalho'),'pop');
 tl.from('#av2',{opacity:0,y:30,duration:0.4},W(1,7,'prometer'));EV(W(1,7,'prometer'),'pop');
 arm('down',TF(1,7)-0.2);}
t=T(1,8);P=nova(t);
{card(P,`<div class="cc">${ICON('calc',140)}<div class="h" style="font-size:66px;margin-top:16px">1 conta</div><div class="tag" style="margin-top:10px">diz se o canal chega</div></div>`,830,190,480,460,W(1,8,'conta'),'pop');
 chip(P,`${ICON('relogio',44)} em 2 minutos`,900,700,W(1,8,'minutos'),'g');
 const tc=W(1,9,'cinco');
 card(P,`<div class="cc"><div style="display:flex;gap:12px">${[0,1,2,3,4].map(i=>`<div id="lv${i}" style="width:78px;height:78px">${I.alavanca}</div>`).join('')}</div><div class="h" style="font-size:64px;margin-top:26px">5 alavancas</div><div class="tag" style="margin-top:10px">mexem nessa conta</div></div>`,1370,190,500,460,tc-0.15,'pop');
 [0,1,2,3,4].forEach(i=>tl.from('#lv'+i,{y:-40,opacity:0,duration:0.3,ease:'back.out(2)'},tc+0.1+i*0.08));
 arm('point',W(1,8,'conta'));arm('down',W(1,9,'alavancas'));}
t=T(1,10);P=nova(t);
{title(P,'O vídeo em 3 partes',t,90,78);
 [['a conta','calc',W(1,10,'conta')],['as 5 alavancas','alavanca',W(1,10,'cinco')],['se não der tempo','ampulheta',W(1,10,'fazer')]].forEach(([lab,ic,tt],i)=>
   card(P,`<div class="cc"><div class="mk q" style="width:84px;height:84px;font-size:50px;margin-bottom:22px">${i+1}</div>${ICON(ic,130)}<div class="h" style="font-size:48px;margin-top:22px;padding:0 16px">${lab}</div></div>`,830+i*350,250,320,480,tt,'pop'));
 arm('point',W(1,10,'conta'));arm('down',TF(1,10)-0.2);}

/* ---- BLOCO 2: o que conta como hora ---- */
t=T(2,0);P=nova(t);
{title(P,'O que entra nas 4.000 horas?',t,110,74);
 relogio(P,1030,270,620,300,t+0.3,'h20','a meta','pop',120);conta('h20',t+0.4,t+1.4,0,4000);
 chip(P,'✕ aqui muita gente perde tempo',990,650,W(2,1,'muita'),'r');inclina(W(2,1,'perde'),5);}
t=T(2,2);P=nova(t);
{card(P,`<div style="display:flex;align-items:center;gap:18px;padding:26px 34px;border-bottom:2px solid #ece5d6"><div class="mk ok">✓</div><div class="h" style="font-size:58px;color:#0f7a43">conta</div></div>`,800,110,520,700,t,'pop','border:3px solid var(--acc)');
 card(P,`<div style="display:flex;align-items:center;gap:18px;padding:26px 34px;border-bottom:2px solid #ece5d6"><div class="mk no">✕</div><div class="h" style="font-size:58px;color:#6b6f75">não conta</div></div>`,1350,110,520,700,W(2,4,'nao'),'pop');
 [['vídeos longos públicos','tv',W(2,2,'longos')],['últimos 12 meses','cal',W(2,2,'doze')],['lives salvas e públicas','live',W(2,3,'lives')]].forEach(([s,ic,tt],i)=>{
   const r=add(P,`<div class="row" style="font-size:40px;font-weight:600">${ICON(ic,60)}<div>${s}</div></div>`,`left:836px;top:${262+i*140}px`);A.left(r,tt);});
 [['Shorts','celular',W(2,5,'shorts')],['vídeo privado','cadeado',W(2,7,'privado')],['não listado','link',W(2,8,'listado')]].forEach(([s,ic,tt],i)=>{
   const r=add(P,`<div class="row" style="font-size:42px;font-weight:600;color:#6b6f75">${ICON(ic,60)}<div>${s}</div></div>`,`left:1386px;top:${262+i*170}px`);A.drop(r,tt);});
 const m10=add(P,'→ outra meta: 10 mi de views',`left:1470px;top:338px;font-family:Consolas;font-size:25px;color:#a52f2f`);A.fade(m10,W(2,6,'outra'));
 arm('point',W(2,2,'longos'));arm('down',W(2,3,'contam')+0.3);inclina(W(2,7,'privado'),-5);}
t=T(2,9);P=nova(t);
{const v=card(P,`<div class="cc">${ICON('play',140)}<div class="h" style="font-size:46px;margin-top:12px">vídeo antigo</div></div>`,860,170,380,300,t,'pop');
 const lx=add(P,I.lixeira,`left:960px;top:560px;width:180px;height:180px`);A.pop(lx,t+0.2);
 const ta=W(2,9,'apagar');tl.to(v,{y:430,scale:0.25,rotation:25,opacity:0,duration:0.6,ease:'power2.in'},ta);tl.to(lx,{rotation:-8,duration:0.1,yoyo:true,repeat:3},ta+0.55);EV(ta+0.5,'impacto',0.6);
 relogio(P,1330,200,540,320,t+0.15,'h29','horas · exemplo','pop',120);
 const te=W(2,9,'embora');conta('h29',t+0.2,t+1,0,1500);conta('h29',te-0.2,te+0.6,1500,1120);tl.to('#h29',{color:R,duration:0.2},te-0.2);
 chip(P,'↓ as horas vão junto',1400,580,te,'r');chip(P,'✕ não conta: vídeo apagado',1330,700,W(2,9,'horas'),'');}
t=T(2,10);P=nova(t);
{title(P,'12 meses que andam',t,100,76);
 const M=['nov','dez','jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov'];const ta=W(2,10,'andam'),ts=W(2,11,'sai');
 M.forEach((m,i)=>{const hb=[50,40,62,55,70,48,66,58,74,60,68,72,64][i];
   const s=add(P,`<div class="card" style="position:relative;width:70px;height:170px;box-sizing:border-box"><div style="position:absolute;left:14px;right:14px;bottom:44px;height:${hb}px;border-radius:6px;background:${G}"></div><div style="position:absolute;left:0;right:0;bottom:10px;text-align:center;font-family:Consolas;font-size:22px;color:var(--muted)">${m}</div></div>`,`left:${812+i*82}px;top:330px`);
   if(i<12)tl.from(s,{y:30,opacity:0,duration:0.3,ease:'back.out(2)'},t+0.3+i*0.04);else{tl.from(s,{y:30,opacity:0,duration:0.3,ease:'back.out(2)'},ta);EV(ta,'pop');}
   if(i===0){tl.to(s,{y:220,rotation:-25,opacity:0.35,duration:0.6,ease:'power2.in'},ts);EV(ts+0.5,'impacto',0.5);}});
 EV(t+0.3,'pop',0.6);
 const jan=add(P,'',`left:800px;top:316px;width:${12*82+6}px;height:198px;border:6px solid ${G};border-radius:22px;box-sizing:border-box`);A.fade(jan,t+0.9);
 const jl=add(P,'janela de 12 meses',`left:810px;top:270px`,'tag');A.fade(jl,t+0.9);
 tl.to([jan,jl],{x:82,duration:0.6,ease:E},ta+0.2);EV(ta+0.2,'whoosh',0.5);
 chip(P,'1 ano e 1 mês atrás → sai da conta',800,610,ts,'r');
 chip(P,'✓ chegar com as horas dentro da janela',940,740,W(2,12,'dentro'),'g');}
t=T(2,13);P=nova(t);
{title(P,'E não é só hora',t,100,76);
 card(P,`<div class="cc">${ICON('relogio',120)}<div class="h" style="font-size:84px;margin-top:12px">4.000 h</div><div class="tag" style="margin-top:6px">públicas · 12 meses</div></div>`,850,260,480,420,t+0.2,'pop');
 const tm=W(2,13,'mil');
 const b=add(P,`<div class="card" style="width:480px;height:420px;border:3px solid var(--acc)"><div class="cc">${ICON('pessoa',120)}<div class="h" style="font-size:84px;margin-top:12px;color:var(--acc)">1.000</div><div class="tag" style="margin-top:6px">inscritos</div></div></div>`,`left:1390px;top:260px`);
 tl.from(b,{x:420,opacity:0,duration:0.5,ease:'back.out(1.4)'},tm-0.2);EV(tm+0.2,'impacto',0.6);
 const pl=add(P,'+',`left:1328px;top:430px;width:64px;height:64px;border-radius:50%;background:${G};color:#fff;display:flex;align-items:center;justify-content:center;font-family:Bahnschrift;font-weight:700;font-size:54px`);A.pop(pl,tm+0.2);
 chip(P,'as duas juntas',1180,730,TF(2,13)-0.5,'k');}
t=T(2,14);P=nova(t);
{const bar=(id,lab,meta,top)=>`<div style="position:absolute;left:0;right:0;top:${top}px"><div class="tag" style="font-size:24px">${lab}</div><div style="position:relative;height:40px;margin-top:14px;border-radius:20px;background:#ece5d6;overflow:hidden"><div id="${id}" style="position:absolute;left:0;top:0;bottom:0;width:100%;border-radius:20px;background:${G};transform-origin:left center"></div></div><div style="display:flex;justify-content:space-between;font-size:30px;margin-top:10px"><span class="h">o seu número</span><span style="color:var(--muted)">meta ${meta}</span></div></div>`;
 const S=studio(P,800,150,1070,600,t+0.1,null,`<div class="h" style="font-size:44px">Ganhar</div>${bar('bh','horas públicas · últimos 12 meses','4.000 h',90)}${bar('bi','inscritos','1.000',280)}`);
 S.menu(4,W(2,14,'ganhar'));
 const th=W(2,15,'horas'),ti=W(2,15,'inscritos');
 tl.fromTo('#bh',{scaleX:0},{scaleX:0.42,duration:0.8,ease:'power2.out'},th);EV(th,'up');tl.fromTo('#bi',{scaleX:0},{scaleX:0.6,duration:0.8,ease:'power2.out'},ti);EV(ti,'up');
 S.to(1500,560,th);
 chip(P,'é daqui que a gente parte',1080,790,W(2,16,'numero'),'g');arm('point',W(2,15,'barrinha'));arm('down',TF(2,16)-0.2);}

/* ---- BLOCO 3: a conta ---- */
t=T(3,0);P=nova(t);
{title(P,'A conta',t,110,90);
 formula3(P,830,300,t+0.2,[W(3,1,'views'),W(3,1,'tempo'),W(3,1,'assistiu')+0.1],'hora assistida');
 arm('point',W(3,1,'views'));arm('down',TF(3,1)+0.4);}
t=T(3,2);P=nova(t);
{card(P,`<div class="cc"><div class="tag">a meta</div><div class="h" style="font-size:120px;margin-top:10px">4.000 h</div></div>`,820,260,480,340,t,'pop');
 const ar=add(P,`<div class="h" style="font-size:90px;color:var(--muted);text-align:center">→</div><div class="tag" style="text-align:center">× 60</div>`,`left:1315px;top:350px;width:110px`);A.left(ar,W(3,2,'sao'));
 const td=W(3,2,'duzentos');card(P,`<div class="cc"><div class="tag">em minutos</div><div id="m32" class="h" style="font-size:100px;margin-top:10px;color:var(--acc)">0</div></div>`,1440,260,440,340,td-0.3,'pop');
 conta('m32',td,W(3,2,'minutos')+0.2,0,240000);}
t=T(3,3);P=nova(t);
{title(P,'Mesma meta, views diferentes',t,90,68);
 const linha=(y,lab,id,frac,tt,val,cls)=>{const s=add(P,`<div class="chip ${cls}" style="font-size:38px">${ICON('relogio',40)} média ${lab}</div>`,`left:810px;top:${y}px`);A.pop(s,tt-0.3);
   const tr=add(P,`<div style="position:absolute;inset:0;border-radius:24px;background:#e4dccb"></div><div id="${id}b" style="position:absolute;left:0;top:0;bottom:0;width:${frac*100}%;border-radius:24px;background:${cls==='g'?G:'#5d6670'};transform-origin:left center"></div>`,`left:1170px;top:${y+8}px;width:690px;height:56px`);
   tl.fromTo(`#${id}b`,{scaleX:0},{scaleX:1,duration:0.7,ease:'power2.out'},tt);
   const n=add(P,`<span id="${id}" >0</span> views`,`left:1170px;top:${y+80}px;font-family:Bahnschrift;font-weight:700;font-size:60px`);A.fade(n,tt);conta(id,tt,tt+0.7,0,val);};
 linha(270,'3 min','v33',1,W(3,3,'oitenta'),80000,'');linha(500,'6 min','v34',0.5,W(3,4,'quarenta'),40000,'g');
 stamp(P,'metade das views',1180,700,W(3,5,'metade'),-5,'g',64);
 fonte(P,'240.000 min ÷ minutos de média = views',t+0.6,850);arm('point',W(3,4,'seis'));arm('down',W(3,5,'meta'));}
t=T(3,6);P=nova(t);
{title(P,'Agora, o prazo',t,90,76);
 const tn=W(3,7,'novembro'),tj=W(3,7,'janeiro');
 ['NOV','DEZ','JAN'].forEach((m,i)=>card(P,`<div style="position:absolute;left:0;right:0;top:0;height:76px;background:${R};display:flex;align-items:center;justify-content:center;color:#fff;font-size:44px;letter-spacing:4px" class="h">${m}</div>
   <div style="position:absolute;left:28px;right:28px;top:100px;display:grid;grid-template-columns:repeat(7,1fr);gap:8px">${Array.from({length:28}).map(()=>`<div style="height:22px;border-radius:5px;background:#e4dccb"></div>`).join('')}</div>`,830+i*350,210,300,300,i===0?tn:i===2?tj:(tn+tj)/2,'pop','overflow:hidden'));
 const tr=add(P,`<div style="position:absolute;inset:0;border-radius:14px;background:#e4dccb"></div><div id="pz" style="position:absolute;inset:0;border-radius:14px;background:${G};transform-origin:left center"></div>`,`left:830px;top:560px;width:1000px;height:28px`);
 tl.fromTo('#pz',{scaleX:0},{scaleX:1,duration:Math.max(0.6,tj-tn+0.4),ease:'none'},tn);
 chip(P,'~11 semanas',850,650,W(3,7,'onze'),'k');
 const to=W(3,7,'oitenta');const d=add(P,`~<span id="d36">0</span> dias`,`left:1300px;top:620px;font-family:Bahnschrift;font-weight:700;font-size:110px;color:var(--acc)`);A.pop(d,to-0.2);conta('d36',to-0.2,to+0.5,0,80);
 arm('point',tn);arm('down',to+0.6);}
t=T(3,8);P=nova(t);
{title(P,'O seu número por dia',t,90,74);
 [['horas que você já tem','grafico',W(3,8,'studio')],['4.000 − isso','calc',W(3,8,'tira')],['÷ dias que faltam','cal',W(3,8,'divide')]].forEach(([lab,ic,tt],i)=>
   card(P,`<div class="cc"><div class="mk q" style="width:76px;height:76px;font-size:46px;margin-bottom:20px">${i+1}</div>${ICON(ic,110)}<div class="h" style="font-size:46px;margin-top:20px;padding:0 18px">${lab}</div></div>`,830+i*350,210,320,420,tt,'pop'));
 const r=add(P,'= horas por dia',`left:1080px;top:680px;padding:14px 44px;border-radius:999px;background:${G};color:#fff;font-family:Bahnschrift;font-weight:700;font-size:68px;box-shadow:0 14px 30px rgba(20,154,85,.25)`);A.pop(r,W(3,9,'numero'));EV(W(3,9,'numero'),'ding');
 arm('point',W(3,8,'horas'));arm('down',W(3,9,'dia'));}
t=T(3,10);P=nova(t);
{const tg=add(P,'exemplo',`left:880px;top:100px`,'chip k');A.pop(tg,t);
 const c=card(P,'',880,190,980,620,t+0.1);const C=document.querySelector(c);
 const L=[['já tem <b>1.000 h</b>',W(3,10,'mil'),58,''],['faltam <b style="color:var(--red)">3.000 h</b>',W(3,11,'faltam'),58,''],
   ['3.000 h ÷ 80 dias ≈ <b>38 h por dia</b>',W(3,12,'trinta'),52,'border-top:2px solid #ece5d6;padding-top:26px;width:860px'],['38 h × 60 ÷ 3 min ≈ <b style="color:var(--acc)">750 views/dia</b>',W(3,13,'setecentas'),52,'']];
 L.forEach(([h,tt,fs,ex],i)=>{const d=document.createElement('div');d.id='ex3_'+i;d.className='h';d.style.cssText=`position:absolute;left:56px;top:${46+i*135+(i>1?20:0)}px;font-size:${fs}px;font-weight:600;${ex}`;d.innerHTML=h;C.appendChild(d);
   tl.from('#ex3_'+i,{x:-40,opacity:0,duration:0.4,ease:'power3.out'},tt);EV(tt,'up',0.6);});
 fonte(P,'exemplo · não é resultado de canal real',t+0.4,850);arm('point',W(3,12,'dividido'));arm('down',TF(3,13)-0.3);}
t=T(3,14);P=nova(t);
{card(P,`<div class="cc"><div class="tag">média 3 min</div><div class="h" style="font-size:150px;margin-top:6px">750</div><div class="h" style="font-size:46px;color:var(--muted)">views por dia</div></div>`,820,200,500,460,t,'left');
 const ts=W(3,14,'seis');
 card(P,`<div class="cc"><div class="tag" style="color:#0f7a43">média 6 min</div><div class="h" style="font-size:150px;margin-top:6px;color:var(--acc)"><span id="v314">750</span></div><div class="h" style="font-size:46px;color:var(--muted)">views por dia</div></div>`,1370,200,500,460,ts,'pop','border:3px solid var(--acc)');
 conta('v314',W(3,14,'trezentas')-0.2,W(3,14,'trezentas')+0.6,750,380);
 stamp(P,'metade do esforço',1110,700,W(3,15,'metade'),-5,'g',60);
 fonte(P,'exemplo · não é resultado de canal real',t+0.3,860);surpresa(W(3,15,'metade'));}
t=T(3,16);P=nova(t);
{card(P,`<div style="display:flex;align-items:center;gap:44px;padding:60px">${ICON('lupa',170)}<div><div class="tag">o seu número por dia</div><div class="h" style="font-size:84px;margin-top:10px">diz a <span style="color:var(--acc)">verdade</span></div><div class="h" style="font-size:60px;color:var(--muted)">sobre o seu canal</div></div></div>`,830,250,1020,420,t,'pop');
 inclina(W(3,16,'verdade'),5);}
t=T(3,17);P=nova(t);
{card(P,`<div class="cc"><div class="h" style="font-size:62px;color:var(--muted)">"como eu viralizo?"</div></div>`,880,110,920,150,t+0.2,'pop');
 risco(P,930,180,820,W(3,17,'subo')-0.6);
 const bt=(x,ic,lab,tt,g)=>{const s=add(P,`<div style="width:340px;height:340px;border-radius:50%;background:var(--card);border:6px solid ${g?G:K};box-shadow:0 16px 0 ${g?'#0f7a43':'#5d6670'},0 30px 40px rgba(80,60,30,.15);display:flex;flex-direction:column;align-items:center;justify-content:center">${ICON(ic,110)}<div class="h" style="font-size:48px;margin-top:14px;${g?'color:var(--acc)':''}">${lab}</div></div>`,`left:${x}px;top:330px`);A.pop(s,tm);
   tl.to(s,{y:12,duration:0.12,yoyo:true,repeat:1},tt);EV(tt,'clique');return s;};
 let tm=W(3,17,'muda');bt(930,'play','views',W(3,17,'views'),false);tm+=0.3;bt(1430,'relogio','tempo médio',W(3,17,'medio'),true);
 arm('point',W(3,17,'views'));arm('down',TF(3,17)+0.2);}

/* ---- BLOCO 4: T ---- */
t=T(4,0);P=nova(t);
{chip(P,'2 botões',880,140,t+0.2,'k');chip(P,`${ICON('alavanca',46)} 5 alavancas`,1150,140,W(4,0,'cinco'),'g');
 const tt=W(4,0,'tempo');sigla(P,856,330,170,tt-0.15,-1);EV(tt,'ding');
 const u=add(P,'numa palavra só',`left:1180px;top:580px`,'tag');A.fade(u,W(4,0,'palavra'));
 arm('point',tt);arm('down',TF(4,0)+0.6);}
t=T(4,1);P=nova(t);
{sigla(P,1110,60,90,t,0);title(P,'<span style="color:var(--acc)">T</span> de tema buscado',t+0.2,190,76);
 add(P,`<svg width="1000" height="380" viewBox="0 0 1000 380"><path d="M30 340 H970" stroke="#cfc5b2" stroke-width="4"/><path d="M30 30 V340" stroke="#cfc5b2" stroke-width="4"/>
   <path id="pk" d="M40 335 L150 332 L200 60 L250 320 L400 334 L970 336" fill="none" stroke="#8a8f96" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" ${DASH}/>
   <path id="ln41" d="M40 336 C 300 320, 560 230, 960 70" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round" ${DASH}/></svg>`,`left:860px;top:330px;width:1000px;height:380px`);
 const pa=add(P,'',`left:820px;top:310px;width:1080px;height:430px`,'card');tl.from(pa,{opacity:0,duration:0.3},t+0.3);
 document.querySelector(pa).style.zIndex=-1;
 const td=W(4,2,'dia');traço('#pk',td-0.4,0.8);
 const c1=add(P,'só no dia em que sai',`left:1080px;top:340px;font-family:Consolas;font-size:28px;color:#6b6f75`);A.fade(c1,td);
 const ts=W(4,3,'semanas');traço('#ln41',ts-0.5,1.6,'power1.inOut');chip(P,'trabalha por semanas',1350,760,ts,'g');}
t=T(4,4);P=nova(t);
{const sb=card(P,`<div style="display:flex;align-items:center;gap:24px;height:100%;padding:0 36px">${ICON('lupa',60)}<div id="ty44" class="h" style="font-size:50px;font-weight:600;white-space:nowrap">o assunto do seu canal</div></div>`,830,170,1040,120,t,'pop','border-radius:60px');
 const tg=W(4,4,'digita');tl.fromTo('#ty44',{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',duration:1.1,ease:'steps(22)'},tg);for(let k=0;k<10;k++)EV(tg+k*0.11,'tick',0.6);
 const tc=W(4,4,'completa');
 const sug=['para iniciantes','passo a passo','erros comuns','vale a pena?'];
 const dd=card(P,sug.map((s,i)=>`<div id="sg${i}" style="display:flex;align-items:center;gap:22px;padding:18px 36px;font-size:40px;border-bottom:${i<3?'2px solid #ece5d6':'none'}"><div style="width:40px;height:40px">${I.lupa}</div><span style="color:var(--muted)">assunto do canal</span><b>${s}</b></div>`).join(''),830,310,1040,380,tc-0.25,'fade');
 sug.forEach((s,i)=>{tl.from('#sg'+i,{y:-20,opacity:0,duration:0.25},tc+i*0.15);});EV(tc,'pop',0.7);
 chip(P,'= o que as pessoas estão procurando',960,740,W(4,5,'procurando'),'g');arm('point',tc);arm('down',TF(4,5));}
t=T(4,6);P=nova(t);
{const body=`<div class="card" id="pq46" style="position:absolute;left:0;right:0;top:0;bottom:0;padding:30px 34px;box-shadow:none"><div class="h" style="font-size:42px">o que o seu público busca</div>
   ${[78,64,52,40].map((w,i)=>`<div style="display:flex;align-items:center;gap:20px;margin-top:${i?22:30}px"><div style="width:38px;height:38px">${I.lupa}</div><div class="bar" style="width:${w}%;height:22px;border-radius:11px"></div></div>`).join('')}</div>`;
 const S=studio(P,800,150,1070,620,t,['Visão geral','Conteúdo','Público','Pesquisa'],body);
 S.menu(2,W(4,6,'studio'));S.tab(3,W(4,6,'pesquisa'));
 tl.to('#pq46',{borderColor:G,backgroundColor:'#f3fbf6',duration:0.3},W(4,6,'buscado'));EV(W(4,6,'buscado'),'ding');}
t=T(4,7);P=nova(t);
{chip(P,`${ICON('bolo',50)} exemplo: canal de culinária`,1010,90,t,'k');
 const tr=W(4,8,'receita'),tp=W(4,9,'por');
 card(P,`<div style="padding:34px 38px"><div class="tag">assunto de um dia</div><div class="h" style="font-size:46px;margin-top:14px;line-height:1.15">"receita de bolo de chocolate"</div>
   <svg width="420" height="170" viewBox="0 0 420 170" style="margin-top:20px"><path d="M10 160 H410" stroke="#cfc5b2" stroke-width="4"/><path id="pk47" d="M14 156 L80 154 L120 20 L160 148 L410 156" fill="none" stroke="#8a8f96" stroke-width="9" stroke-linejoin="round" ${DASH}/></svg></div>`,820,210,500,500,tr,'pop');
 traço('#pk47',tr+0.4,0.7);
 card(P,`<div style="padding:34px 38px"><div class="tag" style="color:#0f7a43">pergunta de sempre</div><div class="h" style="font-size:46px;margin-top:14px;line-height:1.15">"por que meu bolo sola?"</div>
   <svg width="420" height="170" viewBox="0 0 420 170" style="margin-top:20px"><path d="M10 160 H410" stroke="#cfc5b2" stroke-width="4"/><path id="ln47" d="M14 150 C 150 140, 260 90, 404 30" fill="none" stroke="${G}" stroke-width="10" stroke-linecap="round" ${DASH}/></svg></div>`,1370,210,500,500,tp,'pop','border:3px solid var(--acc)');
 traço('#ln47',tp+0.4,2.6,'power1.inOut');
 [['hoje','hoje'],['amanhã','amanha'],['daqui a 1 ano','ano']].forEach(([l,w],i)=>chip(P,l,[1370,1540,1370][i],[740,740,830][i]-20,W(4,9,w),'g'));
 inclina(W(4,8,'dia'),-5);}
t=T(4,10);P=nova(t);
{objeto('#pCam',t,TF(4,10)-t+0.2,'mid');tl.to('#rec',{opacity:0.15,duration:0.35,yoyo:true,repeat:Math.floor((TF(4,10)-t)/0.35)|1,ease:'steps(1)'},t+0.3);
 card(P,`<div style="padding:28px"><div class="tag">vídeo antigo</div><div style="margin-top:16px">${thumb(440,248,'<div class="h" style="color:#fff;font-size:40px;text-align:center;padding:0 30px">por que meu bolo sola?</div>')}</div></div>`,880,200,500,400,t+0.1,'pop');
 const hs=card(P,`<div class="tag" style="position:absolute;left:30px;top:24px">horas</div><div style="position:absolute;right:26px;top:16px;width:56px;height:56px">${I.relogio}</div>
   <div style="position:absolute;left:40px;right:40px;bottom:40px;height:240px;display:flex;align-items:flex-end;gap:22px">${[30,45,58,72,88].map((h,i)=>`<div id="hb${i}" style="flex:1;height:${h}%;border-radius:10px;background:${G};transform-origin:50% 100%"></div>`).join('')}</div>`,1440,200,420,400,t+0.3,'pop');
 const tj=W(4,10,'juntando');[0,1,2,3,4].forEach(i=>{tl.from('#hb'+i,{scaleY:0,duration:0.4,ease:'back.out(1.6)'},tj-0.8+i*0.35);EV(tj-0.8+i*0.35,'pop',0.5);});
 chip(P,'continua juntando horas',1060,660,tj,'g');chip(P,`${ICON('play',44)} enquanto você grava o próximo`,960,770,W(4,10,'grava'),'k');}

/* ---- BLOCO 5: E ---- */
t=T(5,0);P=nova(t);
{sigla(P,1110,60,90,t,1);title(P,'<span style="color:var(--acc)">E</span> de encadear',t+0.2,190,76);
 const tp=W(5,1,'pessoa');
 card(P,`<div class="tag" style="position:absolute;left:34px;top:24px">o seu canal</div><div style="position:absolute;left:40px;top:90px;display:flex;gap:26px">${[0,1,2].map(()=>thumb(280,158)).join('')}</div>`,860,320,1000,330,t+0.5,'pop');
 const p=add(P,I.pessoa,`left:1290px;top:540px;width:130px;height:130px`);A.drop(p,tp);
 chip(P,'a hora mais fácil de ganhar',1030,720,W(5,1,'facil'),'g');}
t=T(5,2);P=nova(t);
{card(P,`<div style="padding:24px"><div style="margin-top:4px">${thumb(330,186)}</div><div style="position:relative;height:16px;margin-top:20px;border-radius:8px;background:#e4dccb;overflow:hidden"><div id="pr52" style="position:absolute;inset:0;background:${R};transform-origin:left center"></div></div></div>`,820,300,380,280,t,'pop');
 const tt=W(5,2,'termina');tl.fromTo('#pr52',{scaleX:0.4},{scaleX:1,duration:Math.max(0.5,tt-t+0.3),ease:'none'},t+0.2);
 const p=add(P,I.pessoa,`left:1250px;top:360px;width:130px;height:130px`);A.pop(p,t+0.3);
 const dr=card(P,`<div class="cc">${ICON('porta',110)}<div style="font-family:Consolas;font-size:26px;color:var(--muted);margin-top:8px">sai do canal</div></div>`,1620,110,240,240,t+0.5,'pop');
 const nx=card(P,`<div class="cc">${ICON('play',100)}<div class="h" style="font-size:38px;margin-top:10px">próximo vídeo</div></div>`,1580,560,300,240,t+0.7,'pop','border:3px dashed #9fd6b5');
 const te=W(5,2,'embora');tl.to(p,{x:340,y:-200,opacity:0.3,scale:0.7,duration:0.7,ease:E},te-0.2);tl.set(p,{filter:'grayscale(1)'},te-0.2);EV(te-0.2,'whoosh',0.6);
 tl.to(dr,{borderColor:'#9a948a',duration:0.2},te+0.3);
 chip(P,'+10 a 15 min perdidos',1310,830-20,W(5,2,'dez'),'r');tl.to(nx,{opacity:0.45,duration:0.3},W(5,2,'perdeu'));}
t=T(5,3);P=nova(t);
{title(P,'Essa pessoa já...',t,90,76);
 [['te conhece','conhece'],['gostou de um vídeo','gostou'],['confia no assunto','confia']].forEach(([l,w],i)=>row(P,'✓',l,900,230+i*110,W(5,3,w),'ok',54));
 stamp(P,'a view mais barata',1010,590,W(5,4,'barata'),-5,'g',66);
 chip(P,'só mostrar o caminho',1120,760,W(5,5,'caminho'),'g');joinha(W(5,4,'barata'),1.5);}
t=T(5,6);P=nova(t);
{title(P,'Vídeos em sequência',t,90,76);
 const tv=W(5,6,'videos'),tm=[tv,tv+0.4,tv+0.8],tk=[W(5,7,'um'),W(5,7,'dois')];
 [0,1,2].forEach(i=>{card(P,`<div style="padding:22px">${thumb(256,144)}<div class="h" style="font-size:46px;margin-top:20px;text-align:center">parte ${i+1}</div></div>`,830+i*370,260,300,280,tm[i],'pop');
   if(i<2){const lk=add(P,`<div style="width:70px;height:16px;border-radius:8px;background:${G}"></div>`,`left:${1130+i*370}px;top:392px;width:70px`);tl.from(lk,{scaleX:0,transformOrigin:'0 50%',duration:0.3},tk[i]);EV(tk[i],'clique');}});
 chip(P,'séries',1240,640,W(5,7,'series'),'k');}
t=T(5,8);P=nova(t);
{const tp=W(5,8,'playlists');
 card(P,`<div style="padding:30px"><div class="tag">playlist · por assunto</div>${[1,2,3,4].map(i=>`<div id="pl${i}" style="display:flex;align-items:center;gap:20px;margin-top:22px"><div class="h" style="font-size:36px;width:30px;color:var(--acc)">${i}</div>${thumb(160,90)}<div style="flex:1"><div class="bar" style="width:90%"></div><div class="bar" style="width:60%;margin-top:12px"></div></div></div>`).join('')}</div>`,820,150,500,600,tp-0.2,'pop');
 [1,2,3,4].forEach(i=>tl.from('#pl'+i,{x:-30,opacity:0,duration:0.3},tp+i*0.12));EV(tp,'pop',0.6);
 chip(P,'numa ordem que faz sentido',840,780,W(5,8,'ordem'),'g');
 const tt=W(5,9,'tela');
 card(P,`<div style="padding:26px"><div class="tag">tela final</div><div style="margin-top:16px;position:relative;width:448px;height:252px;border-radius:14px;background:#2c3238">
   <div id="tf1" style="position:absolute;left:40px;top:60px;width:170px;height:110px;border-radius:10px;background:#5d6670;border:4px solid #fff"></div><div id="tf2" style="position:absolute;right:40px;top:60px;width:170px;height:110px;border-radius:10px;background:#5d6670;border:4px solid #fff"></div></div></div>`,1370,150,500,380,tt,'pop');
 tl.to('#tf1,#tf2',{borderColor:G,scale:1.06,duration:0.3,yoyo:true,repeat:5,stagger:0.15},tt+0.4);EV(tt+0.4,'ding',0.6);
 chip(P,'→ o próximo passo',1450,580,W(5,9,'proximo'),'k');chip(P,'em todo vídeo',1470,680,W(5,9,'todo'),'');}
t=T(5,10);P=nova(t);
{const td=W(5,10,'diga');balao(td,'no próximo',TF(5,10)-td+0.3,G);
 card(P,`<div class="cc">${ICON('play',110)}<div class="h" style="font-size:44px;margin-top:14px">este vídeo</div></div>`,830,420,340,280,t,'pop');
 card(P,`<div class="cc">${ICON('play',110)}<div class="h" style="font-size:44px;margin-top:14px;color:var(--acc)">o próximo</div></div>`,1520,420,340,280,t+0.3,'pop','border:3px solid var(--acc)');
 add(P,`<svg width="420" height="200" viewBox="0 0 420 200"><path id="pt510" d="M10 190 Q210 -40 410 190" fill="none" stroke="${G}" stroke-width="14" stroke-linecap="round" ${DASH}/></svg>`,`left:1135px;top:300px;width:420px;height:200px`);
 const tp=W(5,10,'ponte');traço('#pt510',tp-0.6,0.8);EV(tp-0.6,'whoosh',0.5);
 const lb=add(P,'por que vale assistir',`left:1150px;top:250px;width:390px;text-align:center`,'tag');A.fade(lb,W(5,10,'vale'));}
t=T(5,11);P=nova(t);
{card(P,`<div style="padding:30px 36px"><div class="tag">descrição</div><div class="bar" style="width:80%;margin-top:22px"></div><div class="bar" style="width:62%;margin-top:14px"></div>
   <div id="lk1" style="display:flex;align-items:center;gap:16px;margin-top:26px;font-size:40px;font-weight:600;color:#0f7a43"><div style="width:48px;height:48px">${I.link}</div><u>vídeo que completa o assunto</u></div></div>`,820,140,1040,300,W(5,11,'descricao'),'pop');
 tl.from('#lk1',{x:-30,opacity:0,duration:0.35},W(5,11,'link'));EV(W(5,11,'link'),'pop');
 card(P,`<div style="padding:30px 36px;display:flex;gap:26px"><div style="width:76px;height:76px;border-radius:50%;background:#2c3238;flex:none"></div><div style="flex:1"><div style="display:flex;align-items:center;gap:10px" class="tag"><div style="width:34px;height:34px">${I.pino}</div>comentário fixado</div>
   <div id="lk2" style="display:flex;align-items:center;gap:16px;margin-top:16px;font-size:40px;font-weight:600;color:#0f7a43"><div style="width:48px;height:48px">${I.link}</div><u>assista também</u></div></div></div>`,820,480,1040,240,W(5,11,'fixado'),'pop');
 const cur=add(P,CURSOR,`left:1700px;top:780px;width:44px;height:56px`);const tc=W(5,12,'clica');A.fade(cur,tc-1);
 tl.to(cur,{left:'1060px',top:'640px',duration:0.6,ease:E},tc-0.6);tl.to('#lk2',{scale:1.08,duration:0.12,yoyo:true,repeat:1,transformOrigin:'0 50%'},tc);EV(tc,'clique');
 chip(P,'+1 view',1300,620,tc+0.15,'g');}
t=T(5,13);P=nova(t);
{card(P,`<div style="padding:30px 34px"><div class="tag">vídeo anterior</div><div class="h" style="font-size:50px;margin-top:14px">quanto o YouTube paga</div><div id="pm" class="chip g" style="margin-top:26px;font-size:34px">prometeu: 4.000 horas</div></div>`,820,200,500,360,t,'pop');
 tl.from('#pm',{scale:0.6,opacity:0,duration:0.4,ease:'back.out(2)'},W(5,13,'prometendo'));EV(W(5,13,'prometendo'),'pop');
 seta(P,1335,350,120,W(5,13,'prometendo')+0.3);
 card(P,`<div style="padding:30px 34px"><div class="tag" style="color:#0f7a43">este vídeo</div><div class="h" style="font-size:50px;margin-top:14px">4.000 horas antes de fevereiro</div></div>`,1470,200,400,360,W(5,13,'este'),'pop','border:3px solid var(--acc)');
 [['1 view',W(5,14,'uma')],['→ 2',W(5,14,'duas')],['→ 3',W(5,14,'tres')]].forEach(([l,tt],i)=>chip(P,l,[930,1180,1370][i],660,tt,i?'g':'k'));}

/* ---- BLOCO 6: M e P ---- */
t=T(6,0);P=nova(t);
{sigla(P,1110,60,90,t,2);title(P,'<span style="color:var(--acc)">M</span> de minutos',t+0.2,190,76);
 const reg=(y,lab,frac,tt,cls,txt,tx)=>{const r=add(P,`<div class="h" style="font-size:44px">${lab}</div>`,`left:850px;top:${y}px`);A.left(r,tt);
   const bar=add(P,`<div style="width:100%;height:100%;border-radius:20px;background:${cls}"></div>`,`left:1110px;top:${y-4}px;width:${Math.round(720*frac)}px;height:60px`);tl.from(bar,{scaleX:0,transformOrigin:'0 50%',duration:0.6,ease:'power2.out'},tt);
   const tc=add(P,'',`left:${1110+Math.round(720*frac)}px;top:${y-24}px;width:8px;height:100px;border-radius:4px;background:${K}`);A.fade(tc,tt+0.4);
   const lb=add(P,txt,`left:1110px;top:${y+70}px;font-family:Consolas;font-size:28px;color:var(--muted)`);A.fade(lb,tx);};
 card(P,'',820,330,1060,450,t+0.4,'fade');
 reg(400,'3 min',0.3,W(6,1,'tres'),'#5d6670','teto: no máximo 3 min por pessoa',W(6,1,'maximo'));
 reg(600,'10 min',1,W(6,2,'dez'),G,'espaço pra muito mais',W(6,2,'espaco'));}
t=T(6,3);P=nova(t);
{alerta(W(6,3,'atencao'),1.6);chip(P,'longo só ajuda com conteúdo',1000,80,W(6,3,'conteudo'),'k');
 const te=W(6,4,'esticar');
 card(P,`<div style="padding:26px 34px"><div class="tag">vídeo esticado</div><div style="display:flex;gap:8px;margin-top:20px;height:56px">${['g','e','g','e','e','g'].map((k,i)=>`<div id="sg6_${i}" style="flex:${k==='g'?2:1.4};border-radius:10px;background:${k==='g'?G:'#cfc8bb'};display:flex;align-items:center;justify-content:center;font-family:Consolas;font-size:20px;color:#6b6f75">${k==='e'?'enrolação':''}</div>`).join('')}</div></div>`,820,170,1040,190,te-0.3,'pop');
 [1,3,4].forEach((i,j)=>{tl.from('#sg6_'+i,{scaleX:0,opacity:0,duration:0.3,ease:'back.out(1.6)'},te+0.1+j*0.18);EV(te+0.1+j*0.18,'pop',0.6);});
 add(P,`<svg width="1000" height="320" viewBox="0 0 1000 320"><path d="M20 300 H980 M20 20 V300" stroke="#cfc5b2" stroke-width="4"/><path id="rt63" d="M24 40 C 120 60, 200 160, 320 200 S 600 270, 980 290" fill="none" stroke="${R}" stroke-width="10" stroke-linecap="round" ${DASH}/></svg>`,`left:840px;top:410px;width:1000px;height:320px`);
 const pa=add(P,'',`left:820px;top:390px;width:1040px;height:360px`,'card');document.querySelector(pa).style.zIndex=-1;A.fade(pa,te);
 const ls=add(P,'retenção',`left:850px;top:400px`,'tag');A.fade(ls,te);
 traço('#rt63',W(6,4,'sair')-0.3,1);chip(P,'tempo médio ↓',1560,430,W(6,4,'cai'),'r');
 stamp(P,'enrolação = sai antes',1050,560,W(6,4,'cedo')+0.2,-6,'',56);}
t=T(6,5);P=nova(t);
{card(P,`<div style="padding:60px 70px"><div class="tag">a regra</div><div class="h" style="font-size:86px;margin-top:16px">o tamanho que o <span style="color:var(--acc)">assunto pede</span></div><div class="h" id="r65" style="font-size:58px;color:var(--muted);margin-top:20px">sem enchimento</div></div>`,820,160,1040,460,W(6,5,'regra'),'pop');
 tl.from('#r65',{opacity:0,y:20,duration:0.35},W(6,5,'enchimento'));EV(W(6,5,'enchimento'),'pop');
 chip(P,'8 min ✓',1000,680,W(6,6,'oito'),'g');chip(P,'10 min ✓',1300,680,W(6,6,'dez'),'g');joinha(W(6,6,'otimo'),1.4);}
t=T(6,7);P=nova(t);
{sigla(P,1110,60,90,t,3);title(P,'<span style="color:var(--acc)">P</span> de prender',t+0.2,190,76);
 const pa=card(P,'',820,320,1060,470,t+0.4,'fade');
 const z=add(P,`<div style="width:100%;height:100%;background:rgba(209,67,67,.14);border-left:4px dashed ${R};border-right:4px dashed ${R};box-sizing:border-box"></div>`,`left:868px;top:350px;width:150px;height:360px`);
 add(P,`<svg width="980" height="380" viewBox="0 0 980 380"><path d="M30 360 H960 M30 20 V360" stroke="#cfc5b2" stroke-width="4"/><path id="rt67" d="M34 30 C 70 40, 110 190, 180 210 S 600 240, 960 270" fill="none" stroke="${R}" stroke-width="11" stroke-linecap="round" ${DASH}/></svg>`,`left:840px;top:340px;width:980px;height:380px`);
 const tc=W(6,8,'comeco');traço('#rt67',tc-0.5,1);
 chip(P,'onde mais gente vai embora',1200,380,tc+0.2,'r');
 const t30=W(6,9,'trinta');A.fade(z,t30);EV(t30,'impacto',0.5);const l30=add(P,'30 s',`left:900px;top:722px;font-family:Consolas;font-size:30px;font-weight:700;color:${R}`);A.fade(l30,t30);
 chip(P,'nada do resto importa',1290,560,W(6,9,'nada'),'k');}
t=T(6,10);P=nova(t);
{card(P,`<div style="display:flex;align-items:center;gap:30px;padding:36px 46px">${ICON('check',90)}<div class="h" style="font-size:58px">abra com o que o título prometeu</div></div>`,820,150,1050,170,W(6,10,'abra'),'pop','border:3px solid var(--acc)');
 chip(P,'✕ sem introdução longa',880,370,W(6,10,'introducao'),'r');
 const tf=W(6,10,'fala');
 card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 44px">${ICON('balaoC',90)}<div class="h" style="font-size:56px;color:var(--muted)">"fala, galera, antes de começar..."</div></div>`,820,490,1050,160,tf-0.2,'pop','background:#f4efe6');
 risco(P,960,566,860,W(6,10,'comecar')+0.3,14);}
t=T(6,11);P=nova(t);
{card(P,`<div style="padding:28px">${thumb(660,372,'<div class="h" style="color:#fff;font-size:76px;text-align:center;line-height:1">OS PRIMEIROS <span style="color:#22e07a">30</span> SEGUNDOS</div>')}<div class="h" style="font-size:42px;margin-top:20px">Os primeiros 30 segundos</div></div>`,960,140,716,520,t,'pop');
 stamp(P,'vídeo no canal',1360,600,W(6,11,'canal'),-7,'g',58);arm('point',t+0.3);arm('down',TF(6,11)-0.2);}
t=T(6,12);P=nova(t);
{const body=`<div style="position:absolute;inset:0"><div class="tag" style="font-size:24px">retenção do vídeo</div><svg width="740" height="330" viewBox="0 0 740 330" style="position:absolute;left:0;top:40px"><path d="M10 320 H730 M10 10 V320" stroke="#cfc5b2" stroke-width="4"/>
   <path id="rr1" d="M14 30 C 120 50, 220 70, 300 90 L 340 200 C 420 220, 600 240, 730 250" fill="none" stroke="${R}" stroke-width="9" stroke-linecap="round" ${DASH}/>
   <path id="rr2" d="M14 30 C 120 50, 220 70, 300 90 C 420 115, 600 140, 730 160" fill="none" stroke="${G}" stroke-width="10" stroke-linecap="round" ${DASH}/>
   <circle id="rc1" cx="322" cy="148" r="70" fill="none" stroke="${R}" stroke-width="6" stroke-dasharray="14 10"/></svg></div>`;
 const S=studio(P,800,110,1070,640,t,['Visão geral','Conteúdo','Público'],body);
 S.menu(2,W(6,12,'studio'));traço('#rr1',W(6,12,'retencao'),1.2);
 const td=W(6,13,'despenca');tl.from('#rc1',{opacity:0,scale:0.5,svgOrigin:'322 148',duration:0.35,ease:'back.out(2)'},td);EV(td,'impacto',0.6);S.to(1290,450,td);
 const fs='style="font-size:34px"';
 chip(P,`<span ${fs}>explicação longa</span>`,820,790,W(6,14,'explicacao'),'r');chip(P,`<span ${fs}>parte parada</span>`,1200,790,W(6,14,'parada'),'r');chip(P,`<span ${fs}>fugiu do título</span>`,1500,790,W(6,14,'titulo'),'r');
 const tc=W(6,15,'conserta');traço('#rr2',tc,1.2);tl.to('#rc1',{opacity:0,duration:0.3},tc);
 chip(P,'tempo médio ↑',1520,330,W(6,15,'sobe'),'g');surpresa(W(6,15,'sobe'));}

/* ---- BLOCO 7: O ---- */
t=T(7,0);P=nova(t);
{sigla(P,1110,60,90,t,4);title(P,'<span style="color:var(--acc)">O</span> de outras portas',t+0.2,190,76);
 card(P,`<div class="cc">${ICON('celular',170)}<div class="h" style="font-size:60px;margin-top:14px">Short</div></div>`,900,330,380,420,W(7,1,'short'),'pop');
 relogio(P,1360,380,500,300,W(7,1,'quatro'),'h70','horas assistidas','pop',110);
 const tn=W(7,2,'conta');stamp(P,'NÃO CONTA',1400,700,tn,-6,'',70);inclina(tn,5);}
t=T(7,3);P=nova(t);
{card(P,`<div style="position:absolute;left:24px;right:24px;top:24px;bottom:110px;border-radius:26px;background:#2c3238;display:flex;align-items:center;justify-content:center"><div style="width:110px;height:110px">${I.play}</div></div>
   <div id="vr73" style="position:absolute;left:24px;right:24px;bottom:24px;height:70px;border-radius:18px;background:#ece5d6;display:flex;align-items:center;justify-content:center;gap:12px;font-size:30px;font-weight:700"><div style="width:34px;height:34px">${I.play}</div>vídeo relacionado</div>`,840,130,360,660,t,'pop','border-radius:44px');
 const tl_=W(7,3,'longo');
 card(P,`<div class="cc">${ICON('tv',130)}<div class="h" style="font-size:52px;margin-top:14px">vídeo longo</div></div>`,1430,190,430,320,W(7,3,'assiste'),'pop');
 add(P,`<svg width="260" height="120" viewBox="0 0 260 120"><path id="ar73" d="M10 100 Q130 -10 240 50" fill="none" stroke="${G}" stroke-width="12" stroke-linecap="round" ${DASH}/></svg>`,`left:1180px;top:290px;width:260px;height:120px`);
 traço('#ar73',W(7,3,'assiste'),0.6);
 const p=add(P,I.pessoa,`left:1200px;top:350px;width:80px;height:80px`);A.pop(p,W(7,3,'gente'));tl.to(p,{x:330,y:-120,duration:0.7,ease:E},tl_-0.3);
 const rb=card(P,`<div class="tag" style="position:absolute;left:30px;top:22px">horas assistidas</div><div style="position:absolute;left:30px;right:30px;top:86px;height:34px;border-radius:17px;background:#e4dccb;overflow:hidden"><div id="hr73" style="position:absolute;inset:0;background:${G};transform-origin:left center"></div></div><div class="h" id="up73" style="position:absolute;left:30px;top:136px;font-size:44px;color:var(--acc)">↑ sobe aqui</div>`,1430,560,430,220,W(7,3,'assiste')+0.2,'pop');
 tl.fromTo('#hr73',{scaleX:0.1},{scaleX:0.55,duration:0.8,ease:'power2.out'},tl_+0.4);tl.from('#up73',{opacity:0,duration:0.3},tl_+0.4);EV(tl_+0.4,'ding',0.6);
 stamp(P,'trailer do vídeo longo',1240,70,W(7,4,'trailer'),-4,'g',50);
 const tr=W(7,5,'relacionado');tl.to('#vr73',{backgroundColor:'#dff3e6',color:'#0f7a43',scale:1.06,duration:0.25,yoyo:true,repeat:3},tr);EV(tr,'clique');}
t=T(7,6);P=nova(t);
{title(P,'A outra porta: a live',t,90,76);
 card(P,`<div class="cc">${ICON('live',170)}<div style="position:relative;height:80px;width:380px;margin-top:30px"><div id="lv1" class="chip r" style="position:absolute;left:50%;top:0;transform:translateX(-50%)">● ao vivo</div><div id="lv2" class="chip g" style="position:absolute;left:50%;top:0;transform:translateX(-50%);opacity:0">salva · pública</div></div></div>`,830,230,520,480,W(7,6,'live'),'pop');
 const ts=W(7,7,'salva');tl.to('#lv1',{opacity:0,duration:0.2},ts);tl.to('#lv2',{opacity:1,duration:0.2},ts);EV(ts,'pop');
 const tc=W(7,7,'hora');card(P,`<div class="tag" style="position:absolute;left:30px;top:24px">horas assistidas</div><div style="position:absolute;right:26px;top:16px;width:56px;height:56px">${I.relogio}</div><div style="position:absolute;left:30px;right:30px;top:120px;height:44px;border-radius:22px;background:#e4dccb;overflow:hidden"><div id="hr76" style="position:absolute;inset:0;background:${G};transform-origin:left center"></div></div>`,1410,230,450,240,ts-0.2,'pop');
 tl.fromTo('#hr76',{scaleX:0.15},{scaleX:0.7,duration:0.9,ease:'power2.out'},tc);
 const pl=add(P,'+ horas',`left:1510px;top:500px;font-family:Bahnschrift;font-weight:700;font-size:80px;color:var(--acc)`);A.drop(pl,tc);
 chip(P,'live longa = mais tempo por pessoa',960,760,W(7,8,'longa'),'g');}
t=T(7,9);P=nova(t);
{title(P,'1 live por semana',t,90,76);
 const d=['seg','ter','qua','qui','sex','sáb','dom'];
 card(P,`<div style="padding:26px 30px"><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:10px;font-family:Consolas;font-size:24px;color:var(--muted);text-align:center">${d.map(x=>`<div>${x}</div>`).join('')}</div>
   ${[0,1,2,3].map(r=>`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-top:12px">${d.map((x,c)=>`<div style="height:64px;border-radius:10px;background:#f1ebdf;position:relative">${c===3?`<div id="lw${r}" style="position:absolute;inset:6px;border-radius:8px;background:${R};display:flex;align-items:center;justify-content:center;color:#fff;font-family:Bahnschrift;font-weight:700;font-size:24px">live</div>`:''}</div>`).join('')}</div>`).join('')}</div>`,830,200,1040,430,t+0.3,'pop');
 const tw=W(7,9,'semana');[0,1,2,3].forEach(r=>{tl.from('#lw'+r,{scale:0,duration:0.3,ease:'back.out(2)'},tw+r*0.22);EV(tw+r*0.22,'pop',0.6);});
 chip(P,'respondendo perguntas do seu assunto',880,680,W(7,9,'perguntas'),'k');chip(P,'pode somar bastante',1290,790,W(7,9,'somar'),'g');}
t=T(7,10);P=nova(t);
{title(P,'Não precisa de estúdio',t,90,76);
 [['celular','um celular','celular'],['luz','boa luz','luz'],['lista','perguntas dos comentários','lista']].forEach(([ic,l,w],i)=>
   card(P,`<div class="cc">${ICON(ic,120)}<div class="h" style="font-size:44px;margin-top:18px;padding:0 20px">${l}</div></div>`,830+i*350,210,320,340,W(7,11,w),'pop'));
 const ts=W(7,12,'salva'),tc=W(7,12,'cortar'),tsh=W(7,12,'short');
 chip(P,`${ICON('live',40)} live salva`,840,640,ts,'');seta(P,1150,650,100,tc-0.2,'#8a8f96');chip(P,'cortes',1270,640,tc,'k');seta(P,1480,650,100,tsh-0.2,'#8a8f96');chip(P,`${ICON('celular',40)} Short`,1600,640,tsh,'g');}
t=T(7,13);P=nova(t);
{alerta(t,3);
 card(P,`<div style="padding:34px 44px"><div style="display:flex;align-items:center;gap:22px">${ICON('alerta',80)}<div class="tag" style="color:#a52f2f">aviso importante</div></div>
   ${[['comprar views','views'],['comprar horas','horas'],['vídeo rodando em loop','loop']].map(([l],i)=>`<div id="al${i}" class="row" style="margin-top:22px;font-size:50px;font-weight:700"><div class="mk" style="background:${R}">✕</div><div>${l}</div></div>`).join('')}</div>`,820,130,1040,440,t,'pop','border:3px solid #eeb4ad;background:#fff7f5');
 [['views'],['horas'],['loop']].forEach(([w],i)=>{const tt=W(7,13,w);tl.from('#al'+i,{x:-40,opacity:0,duration:0.35,ease:'power3.out'},tt);EV(tt,'risca');});
 chip(P,'horas removidas',840,610,W(7,14,'remover'),'r');chip(P,'entrada negada',1210,610,W(7,14,'negar'),'r');chip(P,'canal punido',1560,610,W(7,14,'punir'),'r');
 stamp(P,'NÃO VALE O RISCO',1060,730,W(7,15,'risco'),-4,'',70);}

/* ---- BLOCO 8: se não der tempo ---- */
t=T(8,0);P=nova(t);
{const tc=W(8,0,'chega');inclina(W(8,0,'conta'),-6);balao(tc,'não chega?',2.4,R);
 card(P,`<div style="padding:40px 50px"><div class="tag">fazendo a conta</div>
   <div style="position:relative;margin-top:90px;height:56px;border-radius:28px;background:#e4dccb">
    <div style="position:absolute;left:0;top:0;bottom:0;width:42%;border-radius:28px;background:${G}"></div>
    <div id="pj8" style="position:absolute;left:42%;top:12px;height:32px;width:30%;border-top:8px dashed #8a8f96;box-sizing:border-box;transform-origin:left center"></div>
    <div style="position:absolute;left:72%;top:-50px;height:156px;width:6px;background:${K};border-radius:3px"></div>
    <div style="position:absolute;left:72%;top:-96px;transform:translateX(-50%);font-family:Consolas;font-size:30px;font-weight:700;white-space:nowrap">1º fev</div>
    <div style="position:absolute;right:-6px;top:-28px;width:6px;height:112px;background:${G};border-radius:3px"></div>
    <div style="position:absolute;right:-10px;top:-74px;font-family:Consolas;font-size:30px;font-weight:700;color:#0f7a43">4.000 h</div></div>
   <div style="display:flex;justify-content:space-between;margin-top:40px;font-family:Consolas;font-size:28px;color:var(--muted)"><span>hoje</span><span>no ritmo atual</span></div>
   <div class="h" id="nc8" style="font-size:96px;color:${R};margin-top:30px;text-align:center">não chega</div></div>`,820,180,1040,600,t,'pop');
 tl.from('#pj8',{scaleX:0,duration:0.8,ease:'power1.inOut'},W(8,0,'fazendo'));
 tl.to('#pj8',{borderColor:R,duration:0.2},tc);tl.from('#nc8',{opacity:0,scale:0.6,duration:0.35,ease:'back.out(2)'},tc);EV(tc,'impacto',0.6);}
t=T(8,1);P=nova(t);
{title(P,'<span style="color:var(--muted)">1.</span> peça antes de 1º de fevereiro',t,70,62);
 const bar=(lab,top)=>`<div style="position:absolute;left:0;right:0;top:${top}px"><div class="tag" style="font-size:22px">${lab}</div><div style="position:relative;height:30px;margin-top:10px;border-radius:15px;background:#ece5d6;overflow:hidden"><div class="b8" style="position:absolute;inset:0;background:${G};transform-origin:left center"></div></div></div>`;
 const S=studio(P,800,190,720,580,t+0.2,null,`<div class="h" style="font-size:40px">Ganhar</div>${bar('4.000 h ✓',70)}${bar('1.000 inscritos ✓',170)}
   <div id="pe8" style="position:absolute;left:0;top:300px;padding:18px 34px;border-radius:999px;background:#e4dccb;color:#8a8f96;font-family:Bahnschrift;font-weight:700;font-size:40px">pedir entrada</div>`,230);
 S.menu(4,W(8,2,'studio'));const tb=W(8,2,'bater');tl.fromTo('.b8',{scaleX:0},{scaleX:1,duration:0.7,stagger:0.25,ease:'power2.out'},tb);EV(tb,'up');
 const tbt=W(8,2,'botao');tl.to('#pe8',{backgroundColor:G,color:'#fff',scale:1.08,duration:0.3,ease:'back.out(2)'},tbt);EV(tbt,'ding');S.to(1180,560,tbt);
 calendario(P,1580,190,260,W(8,1,'fevereiro'),'pop');
 card(P,`<div class="cc">${ICON('ampulheta',100)}<div class="h" style="font-size:40px;margin-top:10px">análise:</div><div class="h" style="font-size:40px;color:var(--muted)">semanas</div></div>`,1580,520,280,250,W(8,3,'analise'),'pop');
 chip(P,'quanto antes, melhor',1000,800,W(8,3,'antes'),'g');}
t=T(8,4);P=nova(t);
{title(P,'<span style="color:var(--muted)">2.</span> o canal não acaba',t,70,66);
 card(P,`<div class="cc"><div class="h" style="font-size:80px">4.000 h</div></div>`,860,560,480,230,t+0.3,'up');
 card(P,`<div style="padding:34px 40px"><div class="h" style="font-size:96px;color:var(--acc)">8.000 h</div><div class="tag">a meta nova</div></div>`,1340,330,500,460,W(8,5,'oito'),'up','border:3px solid var(--acc);background:#f3fbf6');
 chip(P,'✓ tudo continua valendo',860,190,W(8,6,'continua'),'g');
 const sub=add(P,'buscas · playlists · lives',`left:880px;top:300px`,'tag');A.fade(sub,W(8,6,'buscas'));
 const LS=TL.map((L,i)=>{const s=add(P,`<div class="card" style="width:74px;height:74px;display:flex;align-items:center;justify-content:center;background:var(--soft);border-color:#9fd6b5"><span class="h" style="font-size:46px;color:#0f7a43">${L}</span></div>`,`left:${880+i*86}px;top:470px`);
   tl.from(s,{y:-40,opacity:0,duration:0.3,ease:'back.out(2)'},W(8,7,'alavancas')+i*0.08);return s;});EV(W(8,7,'alavancas'),'pop');
 const tx=W(8,8,'exatamente');tl.to(LS,{x:495,y:-226,duration:0.6,ease:'back.out(1.4)',stagger:0.12},tx);EV(tx,'whoosh',0.6);EV(tx+0.6,'ding',0.5);}
t=T(8,9);P=nova(t);
{card(P,`<div style="padding:70px 80px"><div class="h" style="font-size:84px">Muda o tamanho da escada,</div><div class="h" id="es2" style="font-size:84px;color:var(--acc);margin-top:20px">não o jeito de subir.</div></div>`,820,250,1050,420,t,'pop');
 tl.from('#es2',{opacity:0,y:30,duration:0.4},W(8,9,'jeito'));EV(W(8,9,'jeito'),'ding');}
t=T(8,10);P=nova(t);
{title(P,'<span style="color:var(--muted)">3.</span> qualidade antes da pressa',t,70,64);
 add(P,`<svg width="1000" height="614" viewBox="0 0 1140 700">
      <path d="M470 640 L630 640 L590 600 L510 600 Z" fill="#fffdf8" class="ln"/><rect x="538" y="150" width="24" height="455" fill="#fffdf8" class="ln" style="stroke-width:6"/>
      <g id="beam8"><rect x="130" y="128" width="840" height="26" rx="13" fill="#2c3238" class="ln" style="stroke-width:6"/><circle cx="550" cy="141" r="26" fill="#149a55" class="ln" style="stroke-width:6"/></g>
      <g id="panL8"><path d="M150 141 L70 420 M150 141 L230 420" stroke="#16191c" stroke-width="5"/><path d="M40 420 L260 420 Q250 490 150 490 Q50 490 40 420 Z" fill="#fffdf8" class="ln"/>
        <rect id="qb" x="80" y="300" width="140" height="120" rx="14" fill="#149a55" class="ln" style="stroke-width:6"/><text x="150" y="380" text-anchor="middle" font-family="Bahnschrift" font-weight="700" font-size="60" fill="#fff">✓</text>
        <text x="150" y="570" text-anchor="middle" font-family="Bahnschrift" font-weight="700" font-size="64" fill="#149a55">qualidade</text></g>
      <g id="panR8"><path d="M950 141 L870 420 M950 141 L1030 420" stroke="#16191c" stroke-width="5"/><path d="M840 420 L1060 420 Q1050 490 950 490 Q850 490 840 420 Z" fill="#fffdf8" class="ln"/>
        <path d="M915 340 h70 M915 418 h70 M922 340 q0 30 28 39 q-28 9 -28 39 M978 340 q0 30 -28 39 q28 9 28 39" fill="#fffdf8" stroke="#16191c" stroke-width="6" stroke-linecap="round"/>
        <text x="950" y="570" text-anchor="middle" font-family="Bahnschrift" font-weight="700" font-size="64" fill="#8a8f96">pressa</text></g></svg>`,`left:840px;top:170px;width:1000px;height:614px`);A.up('#e'+(uid-1),t+0.2);
 const tilt=(a,tt,d,e)=>{const dy=410*Math.sin(a*Math.PI/180);tl.to('#beam8',{rotation:a,svgOrigin:'550 141',duration:d,ease:e},tt);tl.to('#panL8',{y:-dy,duration:d,ease:e},tt);tl.to('#panR8',{y:dy,duration:d,ease:e},tt);};
 const tq=W(8,10,'qualidade');tl.from('#qb',{y:-140,opacity:0,duration:0.45,ease:'bounce.out'},tq-0.3);tilt(-9,tq,0.7,'back.out(1.6)');EV(tq,'impacto',0.6);
 chip(P,'vídeo ruim correndo = perde o público',930,800,W(8,11,'ruim'),'r');dedo(W(8,10,'troque'),1.2);}

/* ---- BLOCO 9: resumo ---- */
t=T(9,0);P=nova(t);
{const r=add(P,'resumindo',`left:830px;top:110px`,'chip k');A.pop(r,t);
 formula3(P,830,210,t+0.2,[W(9,1,'views'),W(9,1,'tempo'),W(9,1,'medio')+0.3]);
 const dv=card(P,`<div class="cc"><div class="h" style="font-size:62px">÷ dias que faltam</div></div>`,1060,570,560,140,W(9,2,'divide'),'drop','border:3px solid var(--acc)');
 chip(P,'= você sabe hoje se chega',1090,760,W(9,2,'sabe'),'g');arm('point',W(9,1,'views'));arm('down',TF(9,2)-0.2);}
t=T(9,3);P=nova(t);
{title(P,'Lembra do TEMPO',t,90,76);
 sigla(P,824,230,180,t,-1,{todas:true,nomes:true,tt:['tema','encadear','minutos','prender','outras'].map(w=>W(9,3,w))});
 chip(P,`${ICON('celular',40)} Shorts como trailer`,900,560,W(9,3,'trailer'),'g');chip(P,`${ICON('live',40)} lives salvas`,1360,560,W(9,3,'lives'),'g');
 arm('point',W(9,3,'tema'));arm('down',TF(9,3)-0.2);}
t=T(9,4);P=nova(t);
{const te=W(9,4,'escreve');
 card(P,`<div style="padding:34px 40px;display:flex;gap:28px"><div style="width:90px;height:90px;border-radius:50%;background:${G};flex:none"></div><div><div class="tag">você · agora</div><div class="h" id="cm9" style="font-size:72px;margin-top:10px">faltam <span id="bl9" style="color:var(--acc)">___</span> horas</div></div></div>`,830,200,1040,240,te-0.3,'pop');
 tl.from('#cm9',{clipPath:'inset(0 100% 0 0)',duration:1,ease:'steps(18)'},te);for(let k=0;k<8;k++)EV(te+k*0.12,'tick',0.6);
 tl.to('#bl9',{opacity:0.2,duration:0.3,yoyo:true,repeat:7,ease:'steps(1)'},te+1.1);
 const tt=W(9,5,'todo');for(let i=0;i<7;i++){const p=add(P,I.pessoa,`left:${880+i*140}px;top:510px;width:110px;height:110px`);tl.from(p,{y:30,opacity:0,duration:0.3,ease:'back.out(2)'},tt+i*0.07);}EV(tt,'pop');
 chip(P,'ninguém está sozinho nessa corrida',940,700,W(9,5,'sozinho'),'g');}
t=T(9,6);P=nova(t);
{const bt=(x,ic,lab,tt,g)=>{const s=add(P,`<div style="width:320px;height:320px;border-radius:50%;background:var(--card);border:6px solid ${g?G:K};box-shadow:0 14px 0 ${g?'#0f7a43':'#5d6670'},0 26px 36px rgba(80,60,30,.15);display:flex;flex-direction:column;align-items:center;justify-content:center">${ICON(ic,100)}<div class="h" style="font-size:44px;margin-top:12px;${g?'color:var(--acc)':''}">${lab}</div></div>`,`left:${x}px;top:130px`);A.pop(s,tt);return s;};
 const td=t+0.3;bt(910,'play','views',td,false);bt(1450,'relogio','tempo médio',td+0.2,true);
 const tv=W(9,7,'views'),tm=W(9,7,'durar');
 const LT={};[['T',910],['E',1020],['O',1130],['M',1495],['P',1605]].forEach(([L,x])=>{const s=add(P,`<div class="card" style="width:96px;height:96px;display:flex;align-items:center;justify-content:center;background:var(--soft);border-color:#9fd6b5"><span class="h" style="font-size:58px;color:#0f7a43">${L}</span></div>`,`left:${x}px;top:500px`);
   tl.from(s,{y:-60,opacity:0,duration:0.35,ease:'back.out(2)'},'TEO'.includes(L)?tv+'TEO'.indexOf(L)*0.1:tm+'MP'.indexOf(L)*0.1);LT[L]=s;});EV(tv,'pop');EV(tm,'pop');
 chip(P,'não precisa fazer as 5 amanhã',980,660,W(9,8,'precisa'),'k');
 const tf=W(9,9,'fraca');tl.to(['T','O','M','P'].map(k=>LT[k]),{opacity:0.3,duration:0.3},tf);tl.to(LT.E,{scale:1.25,duration:0.35,ease:'back.out(2)'},tf);EV(tf,'ding');
 chip(P,'comece pela mais fraca',1060,770,W(9,9,'comeca'),'g');}
t=T(9,10);P=nova(t);
{relogio(P,830,160,560,320,t+0.2,'h910','a meta','pop',120);conta('h910',t+0.3,t+1.3,0,4000);
 calendario(P,1460,160,290,t+0.5,'pop');
 const tI=W(9,10,'inscreve');
 const b=card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 54px;background:${R};border-radius:20px">${ICON('sino',80)}<div class="h" style="font-size:72px;color:#fff">Inscreva-se</div></div>`,1050,560,600,150,tI,'pop','border:none;background:transparent;box-shadow:none');
 tl.to(b,{scale:1.06,duration:0.35,yoyo:true,repeat:7,ease:'sine.inOut'},tI+0.5);joinha(tI+0.2,3.4);
 const tc=add(P,'as contas que ninguém mostra inteiras',`left:1010px;top:760px;width:680px;text-align:center`,'tag');A.fade(tc,W(9,10,'contas'));}
