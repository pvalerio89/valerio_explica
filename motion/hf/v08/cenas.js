/* =================== CENAS · vídeo 8 (os 5 números do Studio) =================== */
/* ícones novos (genéricos, sem marcas) */
Object.assign(I,{
 casa:`<svg class="ico" viewBox="0 0 24 24"><path d="M3 11.5L12 3.5l9 8" fill="none" stroke="${K}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10v10.5h13V10" fill="#fffdf8" stroke="${K}" stroke-width="1.5"/><rect x="10" y="14" width="4" height="6.5" fill="${G}" stroke="${K}" stroke-width="1.2"/></svg>`,
 coracao:`<svg class="ico" viewBox="0 0 24 24"><path d="M12 20.5s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 5.7-8 10.6-8 10.6z" fill="${R}" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
 atualizar:`<svg class="ico" viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round"/><path d="M18.5 2.8v4.6h-4.6" fill="none" stroke="${K}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
 olho:`<svg class="ico" viewBox="0 0 24 24"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" fill="#fffdf8" stroke="${K}" stroke-width="1.5"/><circle cx="12" cy="12" r="3.6" fill="${G}" stroke="${K}" stroke-width="1.2"/></svg>`,
 caderno:`<svg class="ico" viewBox="0 0 24 24"><rect x="4.5" y="2.5" width="15" height="19" rx="2" fill="#fffdf8" stroke="${K}" stroke-width="1.4"/><path d="M8 7.5h8M8 11h8M8 14.5h5" stroke="${GR}" stroke-width="1.4" stroke-linecap="round"/><path d="M4.5 5.5h-1.5M4.5 9.5h-1.5M4.5 13.5h-1.5M4.5 17.5h-1.5" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/></svg>`,
});

/* ---------- peças do vídeo 8 ---------- */
const N5=[['cliques','cursor'],['30 segundos','relogio'],['origens','porta'],['recorrentes','pessoa'],['posição','trofeu']];
// os 5 cartões numerados; on = índice destacado (ou -1); ts = tempos de entrada
function cinco(P,x,y,w,ts,on=-1,ok=false){const gap=18,cw=Math.round((w-gap*4)/5),ids=[];
  N5.forEach(([lab,ic],i)=>{const k=uid++;ids.push('c5_'+k);const hl=i===on;
    card(P,`<div class="cc" id="c5_${k}"><div class="mk ${ok?'ok':'q'}" style="width:62px;height:62px;font-size:38px;margin-bottom:14px">${ok?'✓':i+1}</div>${ic==='cursor'?`<div style="width:${Math.round(cw*0.36)}px;height:${Math.round(cw*0.46)}px">${CURSOR}</div>`:ICON(ic,Math.round(cw*0.42))}<div class="h" style="font-size:${Math.round(cw*0.15)}px;margin-top:14px">${lab}</div></div>`,
      x+i*(cw+gap),y,cw,Math.round(cw*1.45),Array.isArray(ts)?ts[i]:ts+i*0.12,'pop',hl?'border:4px solid var(--acc);background:#f3fbf6':'');});return ids;}
// gráfico de linha desenhado; pts em 0..1 (x,y), y=1 no topo
function linha(P,x,y,w,h,t,pts,cor=G,d=1.2,lab=''){const k=uid++;
  const p=pts.map(([a,b])=>`${(a*w).toFixed(1)},${((1-b)*h).toFixed(1)}`).join(' ');
  const s=add(P,`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible"><polyline id="ln${k}" points="${p}" fill="none" stroke="${cor}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" ${DASH}/></svg>${lab?`<div class="tag" style="position:absolute;right:0;top:${Math.round((1-pts[pts.length-1][1])*h)-56}px;color:${cor}">${lab}</div>`:''}`,`left:${x}px;top:${y}px;width:${w}px;height:${h}px`);
  traço('#ln'+k,t,d);EV(t,'up',0.6);return s;}
// eixo simples (moldura de gráfico)
function eixo(P,x,y,w,h,t,lab=''){return card(P,`<div style="position:absolute;left:60px;bottom:50px;width:${w-100}px;height:4px;background:#d8cfbe"></div><div style="position:absolute;left:60px;bottom:50px;width:4px;height:${h-110}px;background:#d8cfbe"></div>${lab?`<div class="tag" style="position:absolute;left:70px;top:24px">${lab}</div>`:''}`,x,y,w,h,t,'pop');}
// "onde achar" no Studio: menu Análises + aba
function onde(P,t,tabs,iTab,tMenu,tTab,extra=''){const st=studio(P,820,150,1060,600,t,tabs,`<div style="display:flex;align-items:center;justify-content:center;height:100%">${extra}</div>`);st.menu(2,tMenu);st.tab(iTab,tTab);
  chip(P,'onde achar',1600,90,t,'k');return st;}
// barra horizontal
function barra(P,lab,x,y,w,val,t,cor=G,id){const k=id||('br'+uid++);card(P,`<div style="display:flex;align-items:center;gap:22px;padding:0 26px;height:100%"><div class="h" style="font-size:36px;width:300px">${lab}</div><div style="flex:1;height:34px;border-radius:17px;background:#ece5d6;overflow:hidden"><div id="${k}" style="height:100%;width:${val}%;background:${cor};transform-origin:left center"></div></div></div>`,x,y,w,96,t,'left');
  tl.from('#'+k,{scaleX:0,duration:0.6,ease:'power2.out'},t+0.2);return k;}

let P,t;
/* ---- BLOCO 1: gancho ---- */
t=T(1,0);P=nova(t);
{title(P,'Todo mundo faz a mesma coisa',t,150,76);
 const tp=W(1,1,'publica');fone(P,1180,280,560,tp,`<div class="cc" style="color:#fff"><div class="tag" style="color:#d8cfbe">inscritos</div><div id="ins1" style="font-family:Consolas;font-weight:700;font-size:88px">0</div></div>`);
 conta('ins1',W(1,1,'atualizando'),TF(1,1),37,41);
 const ra=add(P,I.atualizar,`left:1520px;top:330px;width:110px;height:110px`);A.pop(ra,W(1,1,'atualizando'));tl.to(ra,{rotation:720,duration:2,ease:'none'},W(1,1,'atualizando')+0.3);
 arm('point',tp);arm('down',TF(1,1)-0.2);}
t=T(1,2);P=nova(t);
{card(P,`<div class="cc"><div class="tag">inscritos</div><div class="h" style="font-size:150px;font-family:Consolas">41</div></div>`,860,190,520,420,t,'pop');
 stamp(P,'conta pouco',1060,620,W(1,2,'menos'),-6,'',58);
 const td=W(1,3,'devagar');linha(P,1450,300,380,240,td,[[0,0.1],[0.3,0.14],[0.6,0.16],[1,0.2]],GR,1.4,'devagar');
 chip(P,'✕ não diz o que mudar',1440,620,W(1,3,'mudar'),'r');inclina(W(1,3,'nem'));}
t=T(1,4);P=nova(t);
{const st=studio(P,820,130,1060,640,t,null,`<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:14px">${Array.from({length:24},(_,i)=>`<div id="dz${i}" style="height:96px;border-radius:12px;background:#f3eee4;border:2px solid #e3dccb;display:flex;align-items:center;justify-content:center;font-family:Consolas;font-size:30px;color:#6b6f75">${[12,'3,4%','1:42',87,'5,1%',230,'48%',9,'2:10',61,'7%',14][i%12]}</div>`).join('')}</div>`);
 const tm=W(1,5,'ignorar');for(let i=0;i<24;i++)tl.to('#dz'+i,{opacity:0.15,scale:0.85,duration:0.3},tm+i*0.02);EV(tm,'risca');
 surpresa(W(1,4,'dezenas'));}
t=T(1,6);P=nova(t);
{const tc=W(1,6,'cinco');title(P,'5 números',t,110,90);
 cinco(P,830,300,1040,tc);arm('point',tc);arm('down',TF(1,6)-0.2);}
t=T(1,7);P=nova(t);
{title(P,'Neste vídeo',t,110,72);
 [['quais são','lista',W(1,7,'quais')],['onde achar','lupa',W(1,7,'onde')],['o que fazer','check',W(1,7,'fazer')]].forEach(([lab,ic,tt],i)=>
   card(P,`<div class="cc">${ICON(ic,130)}<div class="h" style="font-size:48px;margin-top:20px">${lab}</div></div>`,840+i*350,270,320,400,tt,'pop'));}
t=T(1,8);P=nova(t);
{card(P,`<div style="display:flex;align-items:center;gap:40px;padding:50px">${ICON('mao',140)}<div><div class="tag">um aviso</div><div class="h" style="font-size:64px;margin-top:10px;color:var(--red)">sem valor mágico</div></div></div>`,840,170,1020,300,t,'pop');arm('up',t);arm('down',TF(1,8));
 const tc=W(1,9,'comparar');stamp(P,'compare com você mesmo',930,560,tc,-5,'g',62);joinha(tc+0.3,1.6);}

/* ---- BLOCO 2: taxa de cliques ---- */
t=T(2,0);P=nova(t);
{const c=cinco(P,830,170,1040,t,0);title(P,'Taxa de cliques',W(2,0,'taxa'),620,96);arm('point',W(2,0,'taxa'));arm('down',TF(2,0));}
t=T(2,1);P=nova(t);
{const ti=W(2,1,'impressao');chip(P,'impressão = sua thumb apareceu',960,90,ti,'k');
 for(let i=0;i<6;i++){fone(P,860+(i%3)*330,200+Math.floor(i/3)*330,300,W(2,1,'aparece')+i*0.12,`<div style="position:absolute;left:12px;right:12px;top:60px;height:70px;border-radius:8px;background:${i%2?'#3b7a8f':'#7a5a8f'}"></div>`);}
 const tk=W(2,2,'clicaram');const ck=add(P,`<div class="chip g" style="font-size:40px">2 de 6 clicaram</div>`,`left:1260px;top:840px`);A.pop(ck,tk);
 const cur=add(P,CURSOR,`left:1700px;top:700px;width:44px;height:56px`);A.fade(cur,W(2,2,'taxa'));tl.to(cur,{left:'960px',top:'300px',duration:0.6,ease:E},tk-0.9);EV(tk-0.3,'clique');tl.to(cur,{left:'1600px',top:'620px',duration:0.6,ease:E},tk);EV(tk+0.6,'clique');}
t=T(2,3);P=nova(t);
{const tm=W(2,3,'mil');card(P,`<div style="display:flex;align-items:center;justify-content:space-around;height:100%;font-family:Consolas;font-weight:700"><div class="cc"><div class="tag">impressões</div><div style="font-size:110px" id="im3">0</div></div><div style="font-size:90px;color:var(--muted)">→</div><div class="cc"><div class="tag">cliques</div><div style="font-size:110px" id="ck3">0</div></div></div>`,830,170,1040,320,t,'pop');
 conta('im3',tm,tm+0.8,0,1000);conta('ck3',W(2,3,'cinquenta'),W(2,3,'cinquenta')+0.6,0,50);
 const tc=W(2,3,'cinco');card(P,`<div class="cc"><div class="tag">taxa de cliques</div><div class="h" style="font-size:130px;color:var(--acc)">5%</div></div>`,1150,540,420,300,tc,'pop','border:4px solid var(--acc)');EV(tc,'ding');}
t=T(2,4);P=nova(t);
{row(P,'✓','taxa boa = título e thumb chamando atenção',840,180,t,'ok',44);
 const ts=W(2,5,'sozinho');card(P,`<div style="padding:30px;display:flex;gap:30px">${[['taxa alta','12%','quase nenhuma impressão','r'],['taxa média','4%','milhares de impressões','g']].map(([a,b,c,cl])=>`<div style="flex:1;text-align:center"><div class="tag">${a}</div><div class="h" style="font-size:100px">${b}</div><div class="chip ${cl}" style="position:static;display:inline-block;margin-top:10px">${c}</div></div>`).join('')}</div>`,840,330,1020,380,ts,'pop');
 inclina(W(2,5,'alta'));}
t=T(2,6);P=nova(t);
{title(P,'Qual é um número bom?',t,110,80);const tc=W(2,7,'central');
 card(P,`<div style="padding:40px 50px"><div class="tag">Central de Ajuda do YouTube</div><div style="position:relative;height:60px;margin-top:70px;border-radius:30px;background:#ece5d6"><div id="fx2" style="position:absolute;left:20%;width:60%;top:0;bottom:0;border-radius:30px;background:${G}"></div></div><div style="display:flex;justify-content:space-between;font-family:Consolas;font-size:36px;margin-top:16px;color:var(--muted)"><span>0%</span><span style="margin-left:12%;color:#0f7a43;font-weight:700">2%</span><span style="margin-right:12%;color:#0f7a43;font-weight:700">10%</span><span>12%</span></div></div>`,840,260,1020,330,tc,'pop');
 const tm=W(2,7,'metade');tl.from('#fx2',{scaleX:0,duration:0.6,ease:'power2.out'},tm);chip(P,'metade dos canais e vídeos',1110,640,tm+0.3,'g');
 fonte(P,'Central de Ajuda do YouTube, "Impressões e taxa de cliques"',TF(2,7)-1);}
t=T(2,8);P=nova(t);
{const tp=W(2,8,'pegadinha');stamp(P,'a pegadinha',1060,150,tp,-6,'',70);
 eixo(P,840,290,1020,520,W(2,9,'mostrado'));
 linha(P,920,380,860,340,W(2,9,'conhece'),[[0,0.1],[0.35,0.35],[0.7,0.7],[1,0.95]],G,1.6,'impressões');
 linha(P,920,380,860,340,W(2,9,'cair'),[[0,0.8],[0.4,0.6],[0.7,0.45],[1,0.35]],R,1.6,'taxa');alerta(W(2,9,'cair'),1.4);}
t=T(2,10);P=nova(t);
{const tn=W(2,10,'normal');stamp(P,'normal',1080,170,tn,-6,'g',100);joinha(tn,1.6);
 const tl2=W(2,11,'longe');fone(P,880,420,380,W(2,11,'levando'),SH('','#3b7a8f'));
 seta(P,1150,560,300,tl2);const pp=[0,1,2,3].map(i=>{const s=add(P,I.pessoa,`left:${1470+(i%2)*120}px;top:${430+Math.floor(i/2)*150}px;width:110px;height:110px`);tl.from(s,{y:30,opacity:0,duration:0.3},tl2+0.3+i*0.08);return s;});}
t=T(2,12);P=nova(t);
{row(P,'✓','taxa caindo + impressões subindo = ok',840,170,t,'ok',46);
 const tp=W(2,13,'problema');row(P,'✕','taxa baixa + poucas impressões',840,320,tp,'no',46);
 card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px">${thumb(320,180,'')}<div class="h" style="font-size:46px">título e thumbnail não convencem</div></div>`,880,480,960,250,W(2,13,'titulo'),'pop','border:3px solid var(--red)');dedo(tp+0.2,1.4);}
t=T(2,14);P=nova(t);
{onde(P,t,['Visão geral','Conteúdo','Público','Alcance'],3,W(2,14,'analises'),W(2,14,'alcance'),`<div class="cc">${ICON('olho',120)}<div class="h" style="font-size:44px;margin-top:10px">impressões e taxa de cliques</div></div>`);}

/* ---- BLOCO 3: 30 segundos ---- */
t=T(3,0);P=nova(t);
{cinco(P,830,170,1040,t,1);title(P,'Retenção nos 30 primeiros segundos',W(3,0,'retencao'),620,72);arm('point',W(3,0,'retencao'));arm('down',TF(3,0));}
t=T(3,1);P=nova(t);
{eixo(P,830,160,1040,560,t,'quem ainda está assistindo');
 const tc=W(3,1,'curva');linha(P,900,250,900,380,tc,[[0,1],[0.08,0.78],[0.2,0.66],[0.5,0.55],[0.8,0.45],[1,0.38]],G,1.8);
 const tz=W(3,2,'comeco');const z=add(P,`<div style="width:220px;height:440px;border:6px dashed ${R};border-radius:20px"></div>`,`left:880px;top:220px`);A.pop(z,tz);chip(P,'o começo',900,740,tz+0.2,'r');}
t=T(3,3);P=nova(t);
{const ts=W(3,3,'sai');eixo(P,830,160,520,420,t,'');linha(P,880,220,430,270,t+0.2,[[0,1],[0.15,0.35],[0.5,0.25],[1,0.2]],R,1.2);
 chip(P,'muita gente sai no começo',840,620,ts,'r');
 const tp=W(3,3,'prometeram');card(P,`<div class="cc">${thumb(380,214,'<div class="h" style="color:#fff;font-size:44px">A</div>')}<div class="tag" style="margin-top:16px">o que prometeu</div></div>`,1400,150,460,340,W(3,3,'titulo'),'pop');
 card(P,`<div class="cc"><div class="h" style="font-size:90px">B</div><div class="tag" style="margin-top:10px">o que entregou</div></div>`,1400,520,460,280,W(3,4,'encontrou'),'pop');
 const x=add(P,'✕',`left:1820px;top:420px;font-family:Bahnschrift;font-weight:700;font-size:150px;color:${R}`);A.stamp(x,W(3,4,'outra'));}
t=T(3,5);P=nova(t);
{title(P,'Uma abertura boa',t,110,80);
 [['confirma o que a pessoa veio ver','confirma'],['mostra por que vale ficar','mostra'],['entra no assunto rápido','entra']].forEach(([s,w],i)=>row(P,i+1,s,900,280+i*140,W(3,5,w),'ok',50));
chip(P,'✕ apresentação longa',1150,740,W(3,5,'apresentacao'),'r');}
t=T(3,6);P=nova(t);
{const tm=W(3,6,'momentos');studio(P,820,150,1060,600,t,['Visão geral','Conteúdo','Público'],`<div style="border:3px solid var(--acc);border-radius:18px;padding:28px 34px;background:#f3fbf6"><div class="tag">momentos-chave · introdução</div><div class="h" style="font-size:52px;margin-top:14px">ainda assistindo aos 0:30</div><div style="font-family:Consolas;font-weight:700;font-size:110px;color:var(--acc)" id="rt6">0%</div><div class="tag">exemplo</div></div>`);
 conta('rt6',W(3,6,'depois'),W(3,6,'trinta')+0.4,0,62,'%');}
t=T(3,7);P=nova(t);
{stamp(P,'sem número mágico',1000,130,W(3,7,'magico'),-5,'',66);
 const tc=W(3,8,'compare');
 [[0.62,'vídeo A'],[0.38,'vídeo B'],[0.45,'vídeo C']].forEach(([v,l],i)=>{const k='rb3'+i;card(P,`<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;padding-bottom:20px"><div id="${k}" style="width:120px;height:${Math.round(v*380)}px;border-radius:14px 14px 0 0;background:${i===0?G:GR};transform-origin:50% 100%"></div><div class="h" style="font-size:36px;margin-top:14px">${l}</div></div>`,880+i*330,330,280,480,tc+i*0.15,'pop');tl.from('#'+k,{scaleY:0,duration:0.5,ease:'back.out(1.5)'},tc+0.3+i*0.15);});
 const tv=W(3,9,'diferente');const lp=add(P,I.lupa,`left:960px;top:250px;width:130px;height:130px`);A.pop(lp,W(3,9,'abre'));chip(P,'o que foi diferente na abertura?',1110,250,tv,'g');}
t=T(3,10);P=nova(t);
{onde(P,t,['Visão geral','Alcance','Engajamento','Público'],2,W(3,10,'analises'),W(3,10,'engajamento'),`<div class="cc">${ICON('grafico',120)}<div class="h" style="font-size:44px;margin-top:10px">retenção do público</div></div>`);}

/* ---- BLOCO 4: origens de tráfego ---- */
t=T(4,0);P=nova(t);
{cinco(P,830,170,1040,t,2);title(P,'De onde vem o tráfego',W(4,1,'origens'),620,80);arm('point',W(4,1,'origens'));arm('down',TF(4,1));}
t=T(4,2);P=nova(t);
{title(P,'4 portas de entrada',t,100,72);
 const L=[['pesquisa','lupa',W(4,3,'pesquisa')],['página inicial','casa',W(4,4,'recursos')],['sugeridos','lista',W(4,5,'sugeridos')],['feed do Shorts','celular',W(4,6,'feed')]];
 L.forEach(([lab,ic,tt],i)=>card(P,`<div class="cc">${ICON(ic,120)}<div class="h" style="font-size:40px;margin-top:20px;padding:0 10px">${lab}</div></div>`,830+i*265,250,245,420,tt,'pop'));
 const cur=add(P,CURSOR,`left:1700px;top:780px;width:44px;height:56px`);A.fade(cur,W(4,3,'digita'));tl.to(cur,{left:'960px',top:'560px',duration:0.6,ease:E},W(4,3,'digita'));
 tl.to(cur,{left:'1220px',duration:0.5,ease:E},W(4,4,'recursos'));tl.to(cur,{left:'1490px',duration:0.5,ease:E},W(4,5,'sugeridos'));tl.to(cur,{left:'1750px',duration:0.5,ease:E},W(4,6,'feed'));}
t=T(4,7);P=nova(t);
{title(P,'Por que isso importa?',t,110,76);const tr=W(4,8,'recomendando');
 card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON('casa',110)}<div class="h" style="font-size:60px">+</div>${ICON('lista',110)}<div class="h" style="font-size:52px;margin-left:16px">= o YouTube te recomendando</div></div>`,840,260,1020,190,W(4,8,'pagina'),'pop');
 chip(P,'por conta própria',1250,480,tr,'g');
 const tc=W(4,9,'crescer');eixo(P,1060,560,560,280,tc-0.4);linha(P,1120,600,460,170,tc,[[0,0.1],[0.4,0.3],[0.7,0.6],[1,1]],G,1.2,'');chip(P,'testando com mais gente',1300,820,W(4,9,'testando'),'k');}
t=T(4,10);P=nova(t);
{const tp=W(4,10,'pesquisa');eixo(P,830,150,1040,440,t,'pesquisa');
 linha(P,900,230,920,280,W(4,10,'devagar'),[[0,0.05],[0.25,0.3],[0.5,0.45],[0.75,0.52],[1,0.58]],G,2,'dura anos');
 card(P,`<div style="display:flex;align-items:center;gap:26px;padding:24px 34px">${ICON('lupa',80)}<div class="h" style="font-size:44px">"como ...?"</div></div>`,980,640,560,140,W(4,11,'pergunta'),'pop');
 chip(P,'dá pra ver os termos pesquisados',1080,800,W(4,12,'termos'),'g');}
t=T(4,13);P=nova(t);
{const tf=W(4,13,'fora');title(P,'Quase tudo de fora do YouTube?',t,110,70);
 card(P,`<div style="padding:30px 40px">${[['grupos e redes sociais',82,R],['dentro do YouTube',18,GR]].map(([l,v,c],i)=>`<div style="margin-top:${i?30:0}px"><div class="h" style="font-size:38px">${l}</div><div style="height:40px;border-radius:20px;background:#ece5d6;margin-top:12px;overflow:hidden"><div id="of${i}" style="height:100%;width:${v}%;background:${c};transform-origin:left center"></div></div></div>`).join('')}</div>`,860,250,980,320,tf,'pop');
 [0,1].forEach(i=>tl.from('#of'+i,{scaleX:0,duration:0.6},tf+0.3+i*0.2));chip(P,'ainda não engrenou',1150,610,W(4,13,'engrenou'),'r');alerta(W(4,13,'engrenou'),1.3);
 const ts=W(4,14,'shorts');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:20px 28px">${ICON('celular',70)}<div class="h" style="font-size:40px">Shorts: feed do Shorts = quase tudo</div><div class="mk ok" style="width:54px;height:54px;font-size:32px">✓</div></div>`,880,700,940,120,ts,'pop');}
t=T(4,15);P=nova(t);
{onde(P,t,['Visão geral','Alcance','Conteúdo','Público'],2,W(4,15,'analises'),W(4,15,'conteudo'),`<div class="cc">${ICON('porta',120)}<div class="h" style="font-size:42px;margin-top:10px">como os espectadores encontram seus vídeos</div></div>`);}

/* ---- BLOCO 5: recorrentes ---- */
t=T(5,0);P=nova(t);
{cinco(P,830,170,1040,t,3);title(P,'Espectadores recorrentes',W(5,0,'recorrentes'),620,84);}
t=T(5,1);P=nova(t);
{const tv=W(5,1,'voltaram');card(P,`<div class="cc">${ICON('porta',160)}</div>`,1220,250,300,400,t,'pop');
 for(let i=0;i<5;i++){const s=add(P,i<3?I.pessoaC:I.pessoa,`left:${880+i*60}px;top:420px;width:110px;height:110px`);tl.from(s,{x:-80,opacity:0,duration:0.35},t+0.3+i*0.12);tl.to(s,{x:1550-880-i*60+(i%3)*90,y:i<3?-120:40,duration:0.8,ease:E},W(5,1,'antes')+i*0.08);if(i<3)tl.to(s,{x:'-=820',duration:0.8,ease:E},tv+i*0.1);}
 chip(P,'↩ voltaram',900,700,tv+0.4,'g');EV(tv,'ding');}
t=T(5,2);P=nova(t);
{const ti=W(5,2,'inscrito');card(P,`<div class="cc"><div class="tag">inscritos</div><div class="h" style="font-size:120px" id="i52">0</div></div>`,860,180,480,360,t,'pop');conta('i52',ti,ti+1,800,1000);
 const tf=W(5,3,'nunca');card(P,`<div class="cc" id="fa5" style="opacity:0.35">${ICON('pessoaC',170)}<div class="h" style="font-size:44px;margin-top:10px">inscrito que não volta</div></div>`,1400,180,460,420,tf,'pop','border-style:dashed');
 chip(P,'não muda nada no canal',1420,640,W(5,3,'muda'),'r');}
t=T(5,4);P=nova(t);
{const tv=W(5,4,'voltam');title(P,'Audiência de verdade',W(5,4,'audiencia'),110,80);
 for(let r=0;r<3;r++){card(P,`<div style="display:flex;align-items:center;gap:20px;padding:0 24px;height:100%">${thumb(170,96,'')}<div style="display:flex;gap:6px">${[0,1,2,3].map(j=>`<div id="vv${r}${j}" style="width:56px;height:56px">${I.pessoaC}</div>`).join('')}</div></div>`,880,270+r*170,620,140,tv-0.4+r*0.25,'left');}
 chip(P,'vídeo depois de vídeo',1540,420,tv+0.6,'g');
 const tp=W(5,5,'pouca');card(P,`<div style="display:flex;gap:30px;padding:24px 30px;align-items:center"><div class="h" style="font-size:40px">pouca gente que volta</div><div class="h" style="font-size:56px">&gt;</div><div class="h" style="font-size:40px;color:var(--muted)">muita gente de passagem</div></div>`,860,780,1000,110,tp,'up');}
t=T(5,6);P=nova(t);
{eixo(P,830,150,1040,520,t,'espectadores');
 const ts=W(5,6,'subindo');linha(P,900,230,900,340,ts,[[0,0.1],[0.4,0.35],[0.7,0.6],[1,0.9]],G,1.4,'recorrentes');chip(P,'✓ criando hábito',1000,700,W(5,6,'habito'),'g');
 const tn=W(5,7,'novos');linha(P,900,230,900,340,tn,[[0,0.2],[0.4,0.5],[0.7,0.75],[1,1]],GR,1.2,'novos');
 chip(P,'recorrentes parados = sem motivo pra voltar',1000,800,W(5,7,'motivo'),'r');inclina(W(5,7,'parados'));}
t=T(5,8);P=nova(t);
{title(P,'Um assunto claro',W(5,8,'assunto'),110,84);
 for(let i=0;i<5;i++){card(P,`<div class="cc">${thumb(250,140,`<div class="h" style="color:#fff;font-size:34px">YouTube #${i+1}</div>`)}</div>`,850+(i%3)*340,270+Math.floor(i/3)*230,300,200,W(5,9,'outro')+i*0.12,'pop');}
 seta(P,1190,700,330,W(5,9,'logo'));}
t=T(5,10);P=nova(t);
{onde(P,t,['Visão geral','Alcance','Engajamento','Público'],3,W(5,10,'analises'),W(5,10,'publico'),`<div class="cc">${ICON('pessoaC',120)}<div class="h" style="font-size:44px;margin-top:10px">espectadores novos e recorrentes</div></div>`);}

/* ---- BLOCO 6: comparado ao normal ---- */
t=T(6,0);P=nova(t);
{cinco(P,830,170,1040,t,4);const tp=W(6,0,'preferido');title(P,'Comparado ao normal do canal',W(6,0,'comparacao'),620,72);joinha(tp,1.6);}
t=T(6,1);P=nova(t);
{const tp=W(6,2,'posicao');studio(P,820,140,1060,620,t,['Visão geral','Alcance','Engajamento'],`<div style="display:flex;align-items:center;gap:40px;padding:20px 10px"><div class="cc" style="width:300px;height:300px;border-radius:50%;border:10px solid var(--acc)"><div class="tag">posição</div><div style="font-family:Bahnschrift;font-weight:700;font-size:110px" id="po6">10</div><div class="tag">de 10</div></div><div class="h" style="font-size:44px;line-height:1.25">comparado aos seus<br>últimos 10 vídeos,<br>no mesmo período</div></div>`);
 conta('po6',tp,W(6,2,'dez',1)+0.3,10,1);}
t=T(6,3);P=nova(t);
{stamp(P,'resolve um problemão',1000,120,t,-5,'g',60);
 const tc=W(6,4,'cem');card(P,`<div class="cc"><div class="tag">1º dia</div><div class="h" style="font-size:110px">100 views</div><div class="h" style="font-size:56px;color:var(--muted)">pouco ou muito?</div></div>`,1060,260,600,330,tc,'pop');inclina(W(6,4,'pouco'));
 const td=W(6,5,'depende');chip(P,'depende do canal',1180,620,td,'k');
 card(P,`<div style="display:flex;align-items:center;gap:20px;padding:20px 28px"><div class="h" style="font-size:40px">canal pequeno</div><div class="mk ok" style="width:56px;height:56px;font-size:34px">✓</div></div>`,860,720,460,110,W(6,6,'pequeno'),'pop');
 card(P,`<div style="display:flex;align-items:center;gap:20px;padding:20px 28px"><div class="h" style="font-size:40px">canal grande</div><div class="mk" style="width:56px;height:56px;font-size:34px;background:${R}">✕</div></div>`,1400,720,460,110,W(6,7,'grande'),'pop');}
t=T(6,8);P=nova(t);
{chip(P,'a posição já faz essa conta',1050,90,t,'k');
 const tp=W(6,9,'primeiro');const L=[...Array(10)].map((_,i)=>i);
 L.forEach(i=>card(P,`<div style="display:flex;align-items:center;gap:20px;padding:0 20px;height:100%"><div class="h" style="font-size:30px;width:50px">${i+1}º</div><div style="height:22px;border-radius:11px;background:${i===0?G:'#d8cfbe'};width:${360-i*26}px"></div>${i===0?'<div class="chip g" style="position:static;font-size:26px;padding:4px 14px">vídeo novo</div>':''}</div>`,870,170+i*64,700,56,t+0.2+i*0.05,'left',i===0?'border:3px solid var(--acc)':''));
 const tq=W(6,9,'descobrir');const lp=add(P,I.lupa,`left:1630px;top:180px;width:170px;height:170px`);A.pop(lp,tq);chip(P,'o que deu certo?',1600,380,tq+0.2,'g');}
t=T(6,10);P=nova(t);
{const tu=W(6,10,'ultimo');card(P,`<div class="cc"><div class="tag">posição</div><div class="h" style="font-size:120px;color:var(--red)">10 de 10</div></div>`,860,160,520,320,t,'pop');
 const la=add(P,I.lixeira,`left:1510px;top:180px;width:200px;height:200px`);A.pop(la,W(6,10,'apaga'));const x=add(P,'✕',`left:1540px;top:140px;font-family:Bahnschrift;font-weight:700;font-size:240px;color:${R}`);A.stamp(x,W(6,10,'apaga')+0.3);
 const to=W(6,11,'outros');cinco(P,860,520,780,to);seta(P,1660,620,180,W(6,11,'caiu'),R);}
t=T(6,12);P=nova(t);
{const td=W(6,12,'detalhe');chip(P,'só um detalhe',1180,100,td,'k');
 card(P,`<div class="cc"><div class="h" style="font-size:52px">a comparação aparece quando o canal já tem vídeos suficientes</div></div>`,880,200,980,240,W(6,12,'comparacao'),'pop');
 const tn=W(6,13,'novo');card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON('caderno',130)}<div><div class="tag">canal novo</div><div class="h" style="font-size:50px;margin-top:8px">compare na mão os primeiros dias</div></div></div>`,880,500,980,250,tn,'pop');}

/* ---- BLOCO 7: o que ignorar ---- */
t=T(7,0);P=nova(t);
{title(P,'Os números pra olhar menos',t,110,80);
 [['inscritos','pessoaC',W(7,1,'inscritos')],['curtidas','coracao',W(7,3,'curtidas')],['tempo real','relogio',W(7,7,'tempo')]].forEach(([lab,ic,tt],i)=>
   card(P,`<div class="cc" style="filter:grayscale(1);opacity:0.75">${ICON(ic,130)}<div class="h" style="font-size:46px;margin-top:16px">${lab}</div></div>`,860+i*340,270,320,400,t+0.3+i*0.15,'pop'));}
t=T(7,1);P=nova(t);
{const ti=W(7,1,'inscritos');card(P,`<div class="cc"><div class="tag">total de inscritos</div><div class="h" style="font-size:110px">1.000</div></div>`,860,160,460,300,ti,'pop');stamp(P,'diz pouco',940,480,W(7,1,'pouco'),-6,'k',56);
 const tn=W(7,1,'nunca');for(let i=0;i<6;i++){const s=add(P,I.pessoa,`left:${1420+(i%3)*140}px;top:${180+Math.floor(i/3)*160}px;width:120px;height:120px`);tl.from(s,{scale:0,duration:0.3,ease:'back.out(2)'},tn+i*0.07);}
 chip(P,'recomendado pra quem não é inscrito',1360,520,tn+0.5,'g');chip(P,'vai bem com quase nenhum inscrito vendo',900,700,W(7,2,'quase'),'k');}
t=T(7,3);P=nova(t);
{const tc=W(7,3,'curtidas');card(P,`<div class="cc">${ICON('coracao',160)}<div class="h" style="font-size:52px;margin-top:10px">curtidas</div></div>`,860,180,420,420,tc,'pop');stamp(P,'sinal fraco',900,640,W(7,3,'fracas'),-6,'k',56);
 const tg=W(7,4,'gosta');card(P,`<div style="padding:30px 36px"><div class="tag">gostaram do vídeo</div><div style="display:flex;gap:10px;margin-top:18px">${[...Array(10)].map((_,i)=>`<div style="width:44px;height:44px">${i<2?I.coracao:I.pessoa}</div>`).join('')}</div><div class="h" style="font-size:40px;margin-top:16px">só 2 curtiram</div></div>`,1340,200,540,260,tg,'pop');
 const tco=W(7,6,'comentarios');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:24px 30px">${ICON('balaoC',80)}<div class="h" style="font-size:38px">comentários: um pouco melhores</div></div>`,1300,520,580,140,tco,'pop');chip(P,'mas não contam tudo',1420,700,W(7,6,'historia'),'r');}
t=T(7,7);P=nova(t);
{const te=W(7,7,'enganam');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:20px 30px"><div style="width:22px;height:22px;border-radius:50%;background:${R}"></div><div class="h" style="font-size:44px">tempo real · primeiras horas</div></div>`,880,110,820,110,t,'pop');stamp(P,'engana',1700,110,te,-8,'',60);
 eixo(P,840,260,1020,520,W(7,8,'devagar')-0.5,'visualizações');
 linha(P,920,340,860,330,W(7,8,'devagar'),[[0,0.02],[0.3,0.06],[0.5,0.12],[0.7,0.45],[1,0.95]],G,2.2,'semanas depois');
 chip(P,'o YouTube achou o público certo',1000,700,W(7,8,'publico'),'g');}
t=T(7,9);P=nova(t);
{const ta=W(7,9,'atualizando');const b=card(P,`<div class="cc">${ICON('atualizar',200)}</div>`,1100,180,420,420,ta,'pop');tl.to(b,{rotation:4,duration:0.08,yoyo:true,repeat:9},ta+0.3);for(let k=0;k<5;k++)EV(ta+0.3+k*0.3,'clique',0.6);
 chip(P,'só gera ansiedade',1150,640,W(7,9,'ansiedade'),'r');suor(W(7,9,'ansiedade'));
 const tm=W(7,10,'mudar');risco(P,1080,380,460,tm,16);chip(P,'não diz o que mudar',1170,760,tm+0.2,'k');}

/* ---- BLOCO 8: os cinco juntos ---- */
t=T(8,0);P=nova(t);
{title(P,'Os 5 juntos',t,110,96);const ts=W(8,1,'sequencia');
 N5.forEach(([lab],i)=>{const s=card(P,`<div style="display:flex;align-items:center;gap:20px;padding:0 24px;height:100%"><div class="mk q" style="width:56px;height:56px;font-size:34px">${i+1}</div><div class="h" style="font-size:40px">${lab}</div></div>`,880+i*80,250+i*115,560,96,ts+i*0.15,'left');});
 arm('point',ts);arm('down',TF(8,1)+0.4);}
t=T(8,2);P=nova(t);
{const L=[['cliques?','título e thumbnail'],['ficaram 30 s?','a abertura'],['origens?','o YouTube levou?'],['voltaram?','o assunto do canal'],['posição?','melhor ou pior']];
 const tq=[W(8,2,'clicando'),W(8,5,'ficaram'),W(8,8,'origens'),W(8,9,'voltando'),W(8,10,'posicao')];
 const ta=[W(8,3,'titulo'),W(8,6,'abertura'),W(8,8,'pagina'),W(8,9,'recorrentes'),W(8,10,'melhor')];
 L.forEach(([q,a],i)=>{card(P,`<div style="display:flex;align-items:center;gap:18px;padding:0 22px;height:100%"><div class="mk q" style="width:52px;height:52px;font-size:30px">${i+1}</div><div class="h" style="font-size:38px">${q}</div></div>`,840,130+i*140,500,110,tq[i],'left');
   seta(P,1360,155+i*140,120,ta[i]);chip(P,a,1500,150+i*140,ta[i]+0.2,i<2?'r':'g');});
 const tk=W(8,4,'clicaram');balao(tk,'clicaram?',1.2);balao(W(8,7,'ficaram'),'ficaram?',1.2);}
t=T(8,11);P=nova(t);
{title(P,'Cada número aponta uma parte',t,110,72);
 const tc=W(8,12,'chutar');card(P,`<div class="cc">${ICON('dado',130)}<div class="h" style="font-size:44px;margin-top:10px">chutar</div></div>`,880,280,360,380,tc,'pop','filter:grayscale(1)');risco(P,880,460,360,tc+0.4,16);
 const tu=W(8,12,'uma');card(P,`<div class="cc">${ICON('alavanca',130)}<div class="h" style="font-size:44px;margin-top:10px">uma coisa de cada vez</div></div>`,1360,280,480,380,tu,'pop','border:4px solid var(--acc)');}
t=T(8,13);P=nova(t);
{chip(P,'exemplo',1200,90,t,'k');const tb=W(8,13,'boa');
 card(P,`<div class="cc"><div class="tag">taxa de cliques</div><div class="h" style="font-size:96px;color:var(--acc)">7%</div><div class="chip g" style="position:static;margin-top:10px">boa</div></div>`,860,180,460,340,tb,'pop');
 const tm=W(8,13,'metade');card(P,`<div class="cc"><div class="tag">ainda assistindo aos 0:30</div><div class="h" style="font-size:96px;color:var(--red)">50%</div><div class="chip r" style="position:static;margin-top:10px">metade saiu</div></div>`,1400,180,460,340,tm,'pop');
 const tt=W(8,13,'trocar');card(P,`<div class="cc">${thumb(260,146,'')}</div>`,880,580,320,220,tt,'pop');const x=add(P,'✕',`left:1150px;top:560px;font-family:Bahnschrift;font-weight:700;font-size:120px;color:${R}`);A.stamp(x,tt+0.4);
 const ta=W(8,14,'abertura');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:26px 30px">${ICON('pincel',90)}<div class="h" style="font-size:52px">mude a abertura</div></div>`,1300,620,560,150,ta,'pop','border:4px solid var(--acc)');joinha(ta,1.4);}
t=T(8,15);P=nova(t);
{chip(P,'dica prática',1200,90,t,'k');const tc=W(8,15,'dia');
 card(P,`<div style="padding:26px 24px"><div class="tag">1 dia por semana</div><div style="display:flex;gap:8px;margin-top:20px">${['seg','ter','qua','qui','sex','sáb','dom'].map((d,i)=>`<div id="dw${i}" style="flex:1;text-align:center;padding:16px 0;border-radius:12px;background:#f3eee4;font-weight:600;font-size:26px">${d}</div>`).join('')}</div><div style="display:flex;align-items:center;gap:16px;margin-top:24px">${ICON('caderno',70)}<div class="h" style="font-size:38px">Studio com calma</div></div></div>`,850,190,440,330,tc,'pop');
 tl.to('#dw0',{backgroundColor:G,color:'#fff',duration:0.25},W(8,15,'semana'));EV(W(8,15,'semana'),'ding');
 card(P,`<div style="padding:26px 30px"><div class="tag">os 5 números · vídeos recentes</div><table style="margin-top:12px;border-collapse:collapse;font-family:Consolas;font-size:32px;width:100%">${[['','esta','anterior'],['cliques','5,2%','4,8%'],['30 s','61%','57%'],['origens','início ↑','—'],['recorrentes','140','120'],['posição','3 de 10','6 de 10']].map((r,i)=>`<tr id="tr8${i}" style="border-bottom:2px solid #ece5d6;${i===0?'color:var(--muted)':''}">${r.map(c=>`<td style="padding:8px 10px">${c}</td>`).join('')}</tr>`).join('')}</table><div class="tag" style="margin-top:10px">exemplo</div></div>`,1320,170,560,560,W(8,15,'anota'),'pop');
 const tn=W(8,15,'anota');for(let i=1;i<6;i++)tl.from('#tr8'+i,{opacity:0,x:-20,duration:0.3},tn+0.3+i*0.12);
 const tdz=W(8,16,'dez');card(P,`<div class="cc"><div class="h" style="font-size:56px">10 min por semana</div><div class="h" style="font-size:40px;color:var(--muted)">&gt; contador todo dia</div></div>`,860,660,420,180,tdz,'pop','border:4px solid var(--acc)');}

/* ---- BLOCO 9: resumo ---- */
t=T(9,0);P=nova(t);
{title(P,'Resumindo',t,110,96);const tc=[W(9,1,'cliques'),W(9,1,'retencao'),W(9,1,'origens'),W(9,1,'recorrentes'),W(9,1,'posicao')];
 cinco(P,830,280,1040,tc,-1,true);tc.forEach(x=>EV(x+0.1,'ding',0.6));}
t=T(9,2);P=nova(t);
{const tr=W(9,2,'compare');stamp(P,'compare com você mesmo',900,200,tr,-5,'g',70);
 card(P,`<div style="display:flex;align-items:center;gap:30px;padding:26px 34px">${ICON('pessoaC',90)}<div class="h" style="font-size:44px">não com o canal dos outros</div></div>`,940,480,860,150,W(9,2,'outros'),'pop');joinha(tr+0.2,1.6);}
t=T(9,3);P=nova(t);
{const tr=W(9,3,'resultado');card(P,`<div class="cc">${ICON('trofeu',140)}<div class="tag" style="margin-top:12px">inscritos e curtidas</div><div class="h" style="font-size:62px;margin-top:6px">resultado</div></div>`,860,200,460,460,tr,'pop');
 const tc=W(9,4,'caminho');card(P,`<div class="cc">${ICON('pino',140)}<div class="tag" style="margin-top:12px">os 5 números</div><div class="h" style="font-size:62px;margin-top:6px;color:var(--acc)">caminho</div></div>`,1400,200,460,460,tc,'pop','border:4px solid var(--acc)');}
t=T(9,5);P=nova(t);
{const th=W(9,5,'hoje');title(P,'Hoje: seu último vídeo, os 5 na ordem',t,110,64);
 cinco(P,830,300,1040,[W(9,5,'ultimo'),W(9,5,'passa'),W(9,5,'cinco')-0.2,W(9,5,'cinco'),W(9,5,'ordem')]);
 chip(P,'10 minutos',1230,760,W(9,6,'dez'),'g');}
t=T(9,7);P=nova(t);
{const tc=W(9,7,'conta');
 card(P,`<div style="padding:34px 40px;display:flex;gap:28px"><div style="width:90px;height:90px;border-radius:50%;background:${G};flex:none"></div><div><div class="tag">comentário</div><div class="h" id="cm9" style="font-size:52px;margin-top:10px">qual número você nunca olhou?</div></div></div>`,830,170,1040,230,tc,'pop');
 tl.from('#cm9',{clipPath:'inset(0 100% 0 0)',duration:1.2,ease:'steps(20)'},tc+0.4);for(let k=0;k<8;k++)EV(tc+0.4+k*0.15,'tick',0.6);
 const tI=W(9,8,'inscreve');
 const b=card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 54px;background:${R};border-radius:20px">${ICON('sino',80)}<div class="h" style="font-size:72px;color:#fff">Inscreva-se</div></div>`,1050,480,600,150,tI,'pop','border:none;background:transparent;box-shadow:none');
 tl.to(b,{scale:1.06,duration:0.35,yoyo:true,repeat:7,ease:'sine.inOut'},tI+0.5);joinha(tI+0.2,3.4);
 const tx=add(P,'o YouTube por dentro, sem promessa milagrosa',`left:930px;top:680px;width:840px;text-align:center`,'tag');A.fade(tx,W(9,8,'dentro'));}
