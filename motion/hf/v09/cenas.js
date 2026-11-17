/* =================== CENAS · vídeo 9 (plano de 90 dias) =================== */
/* ---------- peças do vídeo 9 ---------- */
const AZ='#3b7a8f';
const FC=[G,Y,AZ],FN=['base','sprint','caprichado'],FRT=['1x','2x','0,5x'];
// faixa das 12 semanas em 3 fases; on = fase destacada (ou -1)
function fases(P,x,y,w,t,on=-1,step=0.04){const gap=8,cw=(w-gap*11)/12,k=uid++;let h='';
  for(let i=0;i<12;i++){const f=i<4?0:i<9?1:2,dim=on>=0&&f!==on;
    h+=`<div id="fw${k}_${i}" style="position:absolute;left:${(i*(cw+gap)).toFixed(1)}px;top:0;width:${cw.toFixed(1)}px;height:90px;border-radius:12px;background:${FC[f]};opacity:${dim?0.25:1};border:3px solid ${K};display:flex;align-items:center;justify-content:center;font-family:Consolas;font-weight:700;font-size:30px;color:#fff">${i+1}</div>`;}
  [[0,4],[4,9],[9,12]].forEach(([a,b],f)=>{const l=a*(cw+gap),r=b*(cw+gap)-gap,dim=on>=0&&f!==on;
    h+=`<div id="fl${k}_${f}" style="position:absolute;left:${l.toFixed(1)}px;width:${(r-l).toFixed(1)}px;top:104px;text-align:center;opacity:${dim?0.35:1}"><div class="h" style="font-size:34px">${FN[f]}</div><div style="font-family:Consolas;font-weight:700;font-size:30px;color:${f===1?'#b8860b':FC[f]}">${FRT[f]}</div></div>`;});
  const s=add(P,h,`left:${x}px;top:${y}px;width:${w}px;height:200px`);
  for(let i=0;i<12;i++)tl.from(`#fw${k}_${i}`,{y:30,opacity:0,duration:0.3,ease:'back.out(2)'},t+i*step);[0,1,2].forEach(f=>tl.from(`#fl${k}_${f}`,{opacity:0,y:20,duration:0.3},t+[2,6,10][f]*step+0.1));EV(t,'pop');return s;}
// ritmo de postagem trocando de a para b
function ritmo(P,x,y,t,a,b,tb,cor=G){const k=uid++;
  card(P,`<div class="cc"><div class="tag">ritmo de postagem</div><div style="position:relative;height:150px;width:100%;margin-top:10px"><div id="ra${k}" class="h" style="position:absolute;inset:0;text-align:center;font-size:130px;color:var(--muted)">${a}</div><div id="rb${k}" class="h" style="position:absolute;inset:0;text-align:center;font-size:130px;color:${cor}">${b}</div></div></div>`,x,y,420,300,t,'pop');
  tl.to('#ra'+k,{opacity:0,y:-40,duration:0.3},tb);tl.fromTo('#rb'+k,{opacity:0,scale:0.5},{opacity:1,scale:1,duration:0.4,ease:'back.out(2)'},tb);EV(tb,'ding');}
// cartão de ideia
const IDEIA=(txt,w=300,cor='#fffdf8')=>`<div style="width:${w}px;display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:14px;border:3px solid ${K};background:${cor};box-sizing:border-box">${ICON('lampada',50)}<div class="h" style="font-size:30px">${txt}</div></div>`;
// lista de passos com um ativo (coluna esquerda da área)
function passos(P,L,t,on,ton){L.forEach((lab,i)=>passo(P,i+1,lab,820,170+i*140,440,t+i*0.08,i===on?ton:undefined));}
// ingredientes da receita
const ING=[['público','pessoaC'],['valor','presente'],['formato','filme'],['clima','musica'],['diferencial','trofeu']];
function potes(P,t,on=-1,y=120){ING.forEach(([lab,ic],i)=>{const hl=i===on;
  card(P,`<div class="cc">${ICON(ic,70)}<div class="h" style="font-size:28px;margin-top:8px">${lab}</div></div>`,830+i*212,y,196,170,t+i*0.06,'pop',hl?'border:4px solid var(--acc);background:#f3fbf6':(on>=0?'opacity:0.55':''));});}
function ingrediente(P,i,t,tt,chips){potes(P,t,i);
  card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON(ING[i][1],120)}<div><div class="tag">ingrediente ${i+1}</div><div class="h" style="font-size:80px;margin-top:6px">${ING[i][0]}</div></div></div>`,830,340,1040,210,tt,'pop');
  chips.forEach(([c,tc],j)=>chip(P,c,850+(j%3)*345,590+Math.floor(j/3)*90,tc,'g'));}
Object.assign(I,{
 presente:`<svg class="ico" viewBox="0 0 24 24"><rect x="3.5" y="9" width="17" height="12" rx="1.5" fill="${G}" stroke="${K}" stroke-width="1.4"/><rect x="2.5" y="6.5" width="19" height="4" rx="1" fill="#fffdf8" stroke="${K}" stroke-width="1.4"/><path d="M12 6.5V21" stroke="${Y}" stroke-width="2.4"/><path d="M12 6.5c-2-4-6-3-4.5-.5M12 6.5c2-4 6-3 4.5-.5" fill="none" stroke="${K}" stroke-width="1.4" stroke-linecap="round"/></svg>`,
 pasta:`<svg class="ico" viewBox="0 0 24 24"><path d="M2.5 6.5a1.5 1.5 0 0 1 1.5-1.5h5l2 2.2h9a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 19z" fill="${Y}" stroke="${K}" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
 funil:`<svg class="ico" viewBox="0 0 24 24"><path d="M3 4h18l-7 8.5V19l-4 2v-8.5z" fill="#e6f5ec" stroke="${K}" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
 bateria:`<svg class="ico" viewBox="0 0 24 24"><rect x="2.5" y="7" width="17" height="10" rx="2" fill="#fffdf8" stroke="${K}" stroke-width="1.6"/><rect x="20" y="10" width="2" height="4" rx="0.6" fill="${K}"/><rect x="4.5" y="9" width="3.5" height="6" rx="0.8" fill="${R}"/></svg>`,
});

let P,t;
/* ---- BLOCO 1: gancho ---- */
t=T(1,0);P=nova(t);
{eixo(P,830,150,1040,480,t,'inscritos');linha(P,900,250,900,280,W(1,0,'parado'),[[0,0.12],[0.3,0.13],[0.6,0.12],[1,0.14]],GR,1.4,'parado');
 const tt=W(1,0,'talento');chip(P,'✕ não é falta de talento',1050,680,tt,'r');inclina(W(1,0,'meses'));}
t=T(1,1);P=nova(t);
{const ta=W(1,1,'acertar');title(P,'Tudo de uma vez, em todo vídeo',t,110,70);
 [['título','lista'],['thumbnail','pincel'],['roteiro','caderno'],['edição','filme'],['som','musica']].forEach(([l,ic],i)=>
   card(P,`<div class="cc">${ICON(ic,90)}<div class="h" style="font-size:32px;margin-top:10px">${l}</div></div>`,840+i*210,280,190,230,ta+i*0.15,'pop'));
 const tt=W(1,1,'todo');stamp(P,'pesado demais',1080,590,tt,-6,'',64);suor(tt);}
t=T(1,2);P=nova(t);
{const tn=W(1,2,'noventa');card(P,`<div class="cc"><div class="tag">plano de</div><div class="h" style="font-size:160px"><span id="d90">0</span></div><div class="tag">dias</div></div>`,860,140,440,380,tn-0.4,'pop');conta('d90',tn,tn+0.8,0,90);
 card(P,`<div class="cc"><div class="h" style="font-size:110px">12</div><div class="tag">semanas</div></div>`,1380,140,440,380,W(1,2,'doze'),'pop');
 fases(P,830,600,1040,W(1,2,'tres'));arm('point',W(1,2,'tres'));arm('down',TF(1,3));}
t=T(1,3);P=nova(t);
{title(P,'3 fases, 3 ritmos',t,110,80);fases(P,830,260,1040,t+0.2);
 const to=W(1,3,'objetivo');chip(P,'objetivo diferente',900,560,to,'k');const tr=W(1,3,'ritmo');chip(P,'ritmo diferente',1350,560,tr,'g');}
t=T(1,4);P=nova(t);
{const L=[['fase 1','arruma a base','martelo',T(1,4)],['fase 2','posta o dobro','relogio',W(1,5,'dobro')],['fase 3','o melhor vídeo','trofeu',W(1,6,'melhor')]];
 L.forEach(([f,txt,ic,tt],i)=>card(P,`<div class="cc"><div class="tag" style="color:${i===1?'#b8860b':FC[i]}">${f} · ${FRT[i]}</div>${ICON(ic,130)}<div class="h" style="font-size:44px;margin-top:16px;padding:0 14px">${txt}</div></div>`,840+i*350,190,320,460,tt,'pop',`border-top:14px solid ${FC[i]}`));
 chip(P,'desacelera',1530,700,W(1,6,'desacelera'),'k');arm('point',W(1,5,'dobro'));arm('down',TF(1,6));}
t=T(1,7);P=nova(t);
{title(P,'A lógica',t,110,80);const L=[['prepara o terreno','casa',W(1,7,'terreno')],['prática com quantidade','engrenagem',W(1,7,'quantidade')],['vídeo de qualidade','trofeu',W(1,7,'qualidade')]];
 L.forEach(([l,ic,tt],i)=>{card(P,`<div class="cc">${ICON(ic,110)}<div class="h" style="font-size:38px;margin-top:14px;padding:0 10px">${l}</div></div>`,840+i*360,260,300,340,tt,'pop');if(i<2)seta(P,1145+i*360,420,50,tt+0.4);});
 chip(P,'cada fase prepara a próxima',1060,660,T(1,8),'g');}
t=T(1,9);P=nova(t);
{card(P,`<div style="display:flex;align-items:center;gap:40px;padding:40px 50px">${ICON('caderno',150)}${ICON('pincel',110)}<div><div class="tag">pega papel e caneta</div><div class="h" style="font-size:60px;margin-top:10px">plano pra fazer, não só pra assistir</div></div></div>`,840,250,1020,330,W(1,9,'papel'),'pop');arm('point',W(1,9,'fazer'));arm('down',TF(1,9));}
t=T(1,10);P=nova(t);
{const ta=W(1,10,'aviso');card(P,`<div style="display:flex;align-items:center;gap:40px;padding:40px 50px">${ICON('mao',130)}<div><div class="tag">um aviso</div><div class="h" style="font-size:60px;margin-top:10px">ninguém garante crescer em 90 dias</div></div></div>`,840,150,1020,300,ta,'pop');
 stamp(P,'sem promessa',1050,480,W(1,10,'garantir'),-6,'',60);
 const tl2=W(1,11,'lugar');card(P,`<div style="display:flex;align-items:center;gap:26px;padding:26px 34px">${ICON('lampada',90)}<div class="h" style="font-size:46px">muito mais aprendizado no mesmo tempo</div></div>`,880,640,940,160,W(1,11,'aprendizado'),'pop','border:4px solid var(--acc)');joinha(W(1,11,'aprendizado')+0.2,1.6);}

/* ---- BLOCO 2: base, semanas 1 e 2 ---- */
t=T(2,0);P=nova(t);
{title(P,'Fase 1: a base',t,110,90);fases(P,830,280,1040,t+0.2,0);
 chip(P,'semanas 1 a 4',900,560,W(2,1,'semanas'),'k');chip(P,'ritmo normal · 1x',1300,560,W(2,1,'normal'),'g');arm('point',t+0.3);arm('down',TF(2,1));}
t=T(2,2);P=nova(t);
{title(P,'Semana 1: o compromisso',t,110,76);
 const te=W(2,3,'editar');card(P,`<div class="cc">${ICON('pincel',120)}<div class="h" style="font-size:42px;margin-top:14px">não sabe editar</div></div>`,860,270,440,380,te,'pop','filter:grayscale(1)');risco(P,880,450,400,te+0.6,14);
 const td=W(2,4,'desiste');card(P,`<div style="position:relative;height:100%"><div class="h" style="position:absolute;left:30px;top:24px;font-size:42px">desiste no meio</div><svg width="400" height="220" style="position:absolute;left:20px;top:110px;overflow:visible"><polyline id="ds2" points="0,40 120,50 200,60 220,200" fill="none" stroke="${R}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" ${DASH}/></svg></div>`,1380,270,460,380,td,'pop','border:4px solid var(--red)');traço('#ds2',td+0.3,1);
 alerta(td+0.4,1.4);}
t=T(2,5);P=nova(t);
{const te=W(2,5,'escrever');card(P,`<div style="display:flex;align-items:center;gap:34px;padding:30px 40px">${ICON('contrato',120)}<div><div class="tag">tarefa 1</div><div class="h" style="font-size:52px;margin-top:8px">escrever o plano e contar pra alguém</div></div></div>`,840,130,1020,240,te,'pop');
 [['aba Comunidade','balaoC',W(2,6,'post')],['um amigo','pessoa',W(2,6,'amigo')],['grupo de criadores','pessoaC',W(2,6,'grupo')]].forEach(([l,ic,tt],i)=>
   card(P,`<div class="cc">${ICON(ic,90)}<div class="h" style="font-size:34px;margin-top:10px">${l}</div></div>`,860+i*340,410,310,230,tt,'pop'));
 const td=W(2,7,'dificil');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:18px 28px">${ICON('cadeado',60)}<div class="h" style="font-size:38px">mais difícil abandonar em silêncio</div></div>`,940,690,840,110,td,'up');}
t=T(2,8);P=nova(t);
{chip(P,'algo simples, tipo:',1150,100,t,'k');const tc=W(2,8,'proximos');
 card(P,`<div style="padding:34px 40px;display:flex;gap:28px"><div style="width:90px;height:90px;border-radius:50%;background:${G};flex:none"></div><div><div class="tag">post na comunidade</div><div class="h" id="cp2" style="font-size:46px;margin-top:10px;line-height:1.2">Nos próximos 90 dias vou seguir um plano pra melhorar meu canal. Vou contar aqui como está indo!</div></div></div>`,830,190,1040,330,tc,'pop');
 tl.from('#cp2',{clipPath:'inset(0 0 100% 0)',duration:2.2,ease:'steps(6)'},tc+0.3);for(let k=0;k<6;k++)EV(tc+0.3+k*0.36,'tick',0.6);
 joinha(T(2,9),1.4);const tn=W(2,10,'prometer');
 chip(P,'✕ número de inscritos',900,600,tn,'r');chip(P,'✕ visualizações',1400,600,W(2,10,'visualizacoes'),'r');}
t=T(2,11);P=nova(t);
{title(P,'Semana 2: treinar o olho',t,110,76);
 const te=W(2,12,'espectador');card(P,`<div class="cc">${ICON('tv',130)}<div class="h" style="font-size:46px;margin-top:14px">espectador</div><div class="tag">só assiste</div></div>`,860,270,440,400,te,'pop','filter:grayscale(1);opacity:0.7');
 const tc=W(2,12,'criador');card(P,`<div class="cc">${ICON('olho',130)}<div class="h" style="font-size:46px;margin-top:14px;color:var(--acc)">criador</div><div class="tag">estuda o porquê</div></div>`,1400,270,440,400,tc,'pop','border:4px solid var(--acc)');arm('point',tc);arm('down',TF(2,12));}
t=T(2,13);P=nova(t);
{const tt=W(2,13,'trinta');card(P,`<div class="cc"><div class="tag">vídeos estudados</div><div class="h" style="font-size:120px" id="v30">0</div></div>`,830,160,330,330,tt-0.3,'pop');conta('v30',tt,tt+1.4,0,30);
 const cores=['#3b7a8f','#7a5a8f','#8f5a3b','#5a8f5d','#2c3238'];
 for(let i=0;i<30;i++){const s=add(P,thumb(110,62,''),`left:${1200+(i%6)*116}px;top:${170+Math.floor(i/6)*74}px`);tl.from(s,{scale:0,opacity:0,duration:0.2},tt+i*0.045);}
 chip(P,'inclusive de outros nichos',1240,580,W(2,13,'nichos'),'g');}
t=T(2,14);P=nova(t);
{title(P,'4 perguntas pra cada vídeo',t,110,72);
 [['Por que eu cliquei?',T(2,15)],['Por que continuei depois dos 30 s?',T(2,16)],['O que a música e o ritmo me fizeram sentir?',T(2,17)],['Em que momento eu quis sair?',T(2,18)]].forEach(([q,tt],i)=>row(P,i+1,q,860,250+i*140,tt,'ok',44));
 balao(T(2,18)+0.2,'hmm...',1.4);}
t=T(2,19);P=nova(t);
{const tr=W(2,19,'arquivo');card(P,`<div class="cc">${ICON('pasta',190)}<div class="h" style="font-size:48px;margin-top:10px">referências</div></div>`,840,180,420,440,tr,'pop');
 [['títulos',W(2,19,'titulos')],['thumbnails',W(2,19,'thumbnails')],['ganchos',W(2,19,'ganchos')],['jeitos de editar',W(2,19,'jeitos')]].forEach(([l,tt],i)=>{const c=chip(P,l,1360,200+i*110,tt,'g');tl.to(c,{x:-330,y:120-i*60,scale:0.3,opacity:0,duration:0.5,ease:E},tt+0.8);});
 card(P,`<div style="display:flex;align-items:center;gap:24px;padding:20px 30px">${ICON('caderno',70)}${ICON('celular',70)}<div class="h" style="font-size:38px">documento ou bloco de notas</div></div>`,880,680,940,130,W(2,20,'documento'),'up');}

/* ---- BLOCO 3: receita ---- */
t=T(3,0);P=nova(t);
{title(P,'Semana 3: a receita do canal',t,110,76);
 card(P,`<div class="cc">${ICON('pote',150)}<div class="h" style="font-size:44px;margin-top:10px">receita</div></div>`,860,270,380,400,W(3,0,'receita'),'pop');
 const tr=W(3,1,'reconhecer');card(P,`<div class="cc">${thumb(440,248,'<div class="h" style="color:#fff;font-size:44px">é dele!</div>')}<div style="display:flex;align-items:center;gap:14px;margin-top:20px"><div style="width:200px;height:26px;border-radius:13px;background:#d8cfbe;filter:blur(3px)"></div><div class="tag">sem ver o nome</div></div></div>`,1300,250,560,440,tr,'pop');
 surpresa(W(3,1,'nome'));}
t=T(3,2);P=nova(t);
{title(P,'5 ingredientes',t,110,90);potes(P,W(3,2,'cinco'),-1,300);arm('point',W(3,2,'cinco'));arm('down',TF(3,2));}
t=T(3,3);P=nova(t);
ingrediente(P,0,t,W(3,3,'publico'),[['pra quem é',W(3,3,'quem')],['o que quer',W(3,3,'quer')],['o que incomoda',W(3,3,'incomoda')]]);
t=T(3,4);P=nova(t);
ingrediente(P,1,t,W(3,4,'valor'),[['aprender',W(3,5,'aprender')],['se divertir',W(3,5,'divertir')],['menos sozinho',W(3,5,'sozinha')],['se inspirar',W(3,5,'inspirar')]]);
t=T(3,6);P=nova(t);
ingrediente(P,2,t,W(3,6,'formato'),[['tutorial',W(3,6,'tutorial')],['desafio',W(3,6,'desafio')],['vlog',W(3,6,'vlog')],['análise',W(3,6,'analise')],['lista',W(3,6,'lista')],['entrevista',W(3,6,'entrevista')]]);
t=T(3,7);P=nova(t);
ingrediente(P,3,t,W(3,7,'clima'),[['calmo',W(3,7,'calmo')],['caótico',W(3,7,'caotico')],['engraçado',W(3,7,'engracado')],['direto ao ponto',W(3,7,'direto')],['cinematográfico',W(3,7,'cinematografico')]]);
t=T(3,8);P=nova(t);
ingrediente(P,4,t,W(3,8,'diferencial'),[['habilidade',W(3,9,'habilidade')],['acesso',W(3,9,'acesso')],['jeito de explicar',W(3,9,'explicar')],['estilo de edição',W(3,9,'estilo')]]);
t=T(3,10);P=nova(t);
{chip(P,'exemplo',1240,90,t,'k');const L=[['público','pais sem tempo',T(3,11)],['valor','aprender',T(3,12)],['formato','tutorial',T(3,13)],['clima','direto ao ponto',T(3,14)],['diferencial','pronto em 15 min',T(3,15)]];
 card(P,`<div style="padding:30px 40px"><div class="tag">receita do canal</div>${L.map(([a,b],i)=>`<div id="rc3${i}" style="display:flex;align-items:center;gap:20px;margin-top:20px"><div style="width:16px;height:16px;border-radius:50%;background:${G}"></div><div class="h" style="font-size:40px;width:280px;color:var(--muted)">${a}</div><div class="h" style="font-size:44px">${b}</div></div>`).join('')}</div>`,860,160,1000,560,t,'pop');
 L.forEach(([,, tt],i)=>{tl.from('#rc3'+i,{opacity:0,x:-30,duration:0.35},tt);EV(tt,'tick',0.7);});
 stamp(P,'receita pronta',1430,680,T(3,16),-6,'g',56);}
t=T(3,17);P=nova(t);
{title(P,'Ela já diz o que fazer',t,110,76);
 card(P,`<div class="cc"><div class="mk ok" style="width:90px;height:90px;font-size:56px">✓</div><div class="h" style="font-size:44px;margin-top:20px">tutorial rápido de receita</div></div>`,860,270,460,380,W(3,17,'fazer'),'pop','border:4px solid var(--acc)');
 card(P,`<div class="cc"><div class="mk" style="width:90px;height:90px;font-size:56px;background:${R}">✕</div><div class="h" style="font-size:44px;margin-top:20px">vlog de 40 minutos</div></div>`,1380,270,460,380,W(3,17,'nao'),'pop','border:4px solid var(--red)');}
t=T(3,18);P=nova(t);
{title(P,'Tarefa: 1 a 3 receitas',t,110,76);const tr=W(3,18,'receitas');
 ['A','B','C'].forEach((l,i)=>card(P,`<div class="cc">${ICON('pote',110)}<div class="h" style="font-size:52px;margin-top:14px">receita ${l}</div></div>`,860+i*340,270,310,360,tr+i*0.2,'pop'));
 const tq=W(3,19,'qual');const q=add(P,'?',`left:1290px;top:640px;font-family:Bahnschrift;font-weight:700;font-size:150px;color:${R}`);A.pop(q,tq);inclina(tq);
 chip(P,'a fase 2 descobre',1450,700,W(3,20,'serve'),'g');}

/* ---- BLOCO 4: oito ideias ---- */
t=T(4,0);P=nova(t);
{title(P,'Semana 4: as ideias',t,110,80);const to=W(4,1,'oito');
 card(P,`<div class="cc"><div class="tag">meta</div><div class="h" style="font-size:150px" id="i8">0</div><div class="tag">ideias</div></div>`,860,250,420,420,t+0.3,'pop');conta('i8',to,to+0.6,0,8);
 const tf=W(4,2,'tres');card(P,`<div class="cc">${ICON('funil',170)}<div class="h" style="font-size:46px;margin-top:14px">3 filtros</div></div>`,1400,250,440,420,tf,'pop');arm('point',tf);arm('down',TF(4,2));}
t=T(4,3);P=nova(t);
{chip(P,'filtro 1',1250,90,t,'k');card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON('pote',110)}<div class="h" style="font-size:58px">testa uma das suas receitas?</div></div>`,840,180,1020,220,t,'pop');
 const td=W(4,4,'depois');const s=add(P,IDEIA('ideia solta',360),`left:900px;top:520px`);A.pop(s,W(4,4,'ideia'));tl.to(s,{x:600,y:60,scale:0.7,rotation:8,duration:0.6,ease:E},td);
 card(P,`<div class="cc"><div class="tag">fica pra depois</div></div>`,1420,520,400,200,td-0.2,'pop','border-style:dashed');}
t=T(4,5);P=nova(t);
{chip(P,'filtro 2',1250,90,t,'k');card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON('lupa',110)}<div class="h" style="font-size:58px">tem gente procurando isso?</div></div>`,840,180,1020,220,t,'pop');
 const tp=W(4,6,'parecidos');eixo(P,860,440,980,400,tp,'vídeos parecidos');
 const tv=W(4,7,'muito');[0.3,0.25,0.35,0.95,0.28].forEach((v,i)=>{const k='bp4'+i;add(P,`<div id="${k}" style="width:110px;height:${Math.round(v*250)}px;border-radius:12px 12px 0 0;background:${i===3?G:GR};transform-origin:50% 100%"></div>`,`left:${960+i*160}px;top:${790-Math.round(v*250)}px`);tl.from('#'+k,{scaleY:0,duration:0.45,ease:'back.out(1.5)'},tp+0.3+i*0.1);});
 chip(P,'bem acima do normal do canal',1300,470,tv,'g');EV(tv,'ding');}
t=T(4,8);P=nova(t);
{chip(P,'filtro 3',1250,90,t,'k');card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 40px">${ICON('ampulheta',110)}<div class="h" style="font-size:58px">dá pra fazer na metade do tempo?</div></div>`,840,180,1020,220,t,'pop');
 const td=W(4,9,'dobro');chip(P,'fase 2 = postar o dobro',860,450,td,'g');
 const tg=W(4,10,'grande');const s=add(P,IDEIA('ideia enorme',360,'#fdf3d8'),`left:900px;top:560px`);A.pop(s,tg);
 const tl2=W(4,10,'lista');card(P,`<div class="cc">${ICON('pasta',90)}<div class="h" style="font-size:36px;margin-top:8px">ideias grandes demais</div></div>`,1420,480,420,300,tl2-0.3,'pop');tl.to(s,{x:560,y:-30,scale:0.6,duration:0.6,ease:E},tl2);
 chip(P,'útil no final',1480,800,W(4,10,'util'),'k');}
t=T(4,11);P=nova(t);
{const tv=W(4,11,'vinte');chip(P,'20 ideias, sem julgar',1160,90,tv,'k');const ok=[1,4,6,9,12,14,17,19];
 for(let i=0;i<20;i++){const s=add(P,IDEIA('ideia '+(i+1),240),`left:${830+(i%4)*262}px;top:${170+Math.floor(i/4)*110}px`);tl.from(s,{scale:0,opacity:0,duration:0.2},tv+i*0.06);
   if(!ok.includes(i))tl.to(s,{opacity:0.15,scale:0.9,duration:0.3},T(4,13)+i*0.03);else tl.to(s,{scale:1.05,duration:0.3},T(4,13)+0.6);}
 const tf=W(4,12,'filtros');const f=add(P,I.funil,`left:1700px;top:740px;width:110px;height:110px`);A.pop(f,tf);
 chip(P,'sobram 8',1100,760,W(4,13,'sobram')+0.8,'g');}
t=T(4,14);P=nova(t);
{title(P,'Fase 1 completa',t,110,84);
 [['compromisso',W(4,14,'compromisso')],['repertório',W(4,14,'repertorio')],['receitas',W(4,14,'receitas')],['8 ideias',W(4,14,'ideias')]].forEach(([l,tt],i)=>row(P,'✓',l,920,250+i*130,tt,'ok',52));
 stamp(P,'base pronta',1420,620,T(4,15),-6,'g',66);joinha(T(4,15)+0.2,1.6);}

/* ---- BLOCO 5: sprint ---- */
t=T(5,0);P=nova(t);
{title(P,'Fase 2: o sprint',t,110,90);fases(P,830,280,1040,t+0.2,1);
 chip(P,'semanas 5 a 9',900,560,W(5,1,'semanas'),'k');const td=W(5,1,'dobra');ritmo(P,1390,520,td-0.6,'1x','2x',td,'#b8860b');}
t=T(5,2);P=nova(t);
{title(P,'O ritmo dobra',t,110,84);
 [[`1 por semana`,`2 por semana`,T(5,2),W(5,2,'duas')],[`1 a cada 15 dias`,`1 por semana`,T(5,3),W(5,3,'toda')]].forEach(([a,b,ta,tb],i)=>{
   card(P,`<div class="cc"><div class="h" style="font-size:44px;color:var(--muted)">${a}</div></div>`,860,280+i*220,420,170,ta,'pop');seta(P,1300,345+i*220,120,tb-0.2);
   card(P,`<div class="cc"><div class="h" style="font-size:48px;color:#0f7a43">${b}</div></div>`,1440,280+i*220,420,170,tb,'pop','border:4px solid var(--acc)');});}
t=T(5,4);P=nova(t);
{const to=W(5,4,'oito');chip(P,'os 8 vídeos da lista',1150,120,to,'k');
 card(P,`<div style="height:100%;background:repeating-linear-gradient(90deg,#ece5d6 0 40px,#e3dccb 40px 80px);border-radius:16px"></div>`,830,560,1040,60,t,'fade');
 for(let i=0;i<8;i++){const s=add(P,thumb(200,112,`<div class="h" style="color:#fff;font-size:40px">${i+1}</div>`),`left:${840+i*130}px;top:${430}px`);tl.from(s,{x:-300,opacity:0,duration:0.5,ease:E},to+i*0.1);}
 arm('point',to);arm('down',TF(5,4));}
t=T(5,5);P=nova(t);
{title(P,'Por que dobrar?',t,110,84);const ta=W(5,6,'aula');
 card(P,`<div class="cc">${ICON('play',120)}<div class="h" style="font-size:42px;margin-top:10px">1 vídeo</div></div>`,860,250,360,340,W(5,6,'video'),'pop');seta(P,1240,410,120,ta-0.2);
 card(P,`<div class="cc">${ICON('caderno',120)}<div class="h" style="font-size:42px;margin-top:10px;color:var(--acc)">1 aula</div></div>`,1390,250,360,340,ta,'pop','border:4px solid var(--acc)');
 [['gravar',W(5,7,'gravar')],['editar',W(5,7,'editar')],['título',W(5,7,'titulo')],['ler os números',W(5,7,'numeros')]].forEach(([l,tt],i)=>chip(P,l,860+i*250,660,tt,'g'));}
t=T(5,8);P=nova(t);
{const tc=W(5,8,'cinco');chip(P,'5 semanas pra 8 vídeos',1140,100,tc,'k');
 const dist=[2,2,2,2,0];[5,6,7,8,9].forEach((s,i)=>{const fol=i===4;
   card(P,`<div style="padding:20px 10px;text-align:center"><div class="tag">semana ${s}</div><div style="display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:18px">${fol?`<div class="h" style="font-size:40px;color:var(--acc);margin-top:40px">folga</div>`:[0,1].map(()=>thumb(150,84,'')).join('')}</div></div>`,840+i*210,200,190,320,tc+i*0.12,'pop',fol?'border:4px dashed var(--acc);background:#f3fbf6':'');});
 stamp(P,'de propósito',1600,560,W(5,9,'folga'),-6,'g',50);
 const te=W(5,10,'errado');chip(P,'algo vai dar errado, tudo bem',900,640,te,'r');joinha(W(5,10,'bem'),1.4);}
t=T(5,11);P=nova(t);
{title(P,'Não vão ser os mais bonitos',t,110,72);
 card(P,`<div class="cc">${thumb(380,214,'<div class="h" style="color:#fff;font-size:40px">simples</div>')}<div class="tag" style="margin-top:14px">vídeo do sprint</div></div>`,860,260,460,340,W(5,11,'bonitos'),'pop');
 chip(P,'mais simples de propósito',880,640,T(5,12),'k');
 const tp=W(5,13,'perfeicao');card(P,`<div class="cc"><div class="h" style="font-size:54px;color:var(--muted)">perfeição</div></div>`,1400,260,440,150,tp,'pop');risco(P,1430,325,380,tp+0.3,12);
 card(P,`<div class="cc"><div class="h" style="font-size:60px;color:var(--acc)">repetição</div></div>`,1400,450,440,170,W(5,13,'repeticao'),'pop','border:4px solid var(--acc)');}
t=T(5,14);P=nova(t);
{const ta=W(5,14,'avisa');card(P,`<div style="display:flex;align-items:center;gap:34px;padding:34px 44px">${ICON('megafone',130)}<div><div class="tag">post pra quem acompanha</div><div class="h" style="font-size:62px;margin-top:8px">o sprint começou!</div></div></div>`,840,200,1020,280,ta,'pop');
 const tp=W(5,15,'parar');chip(P,'ajuda a não parar no 3º vídeo',1040,560,tp,'g');arm('up',ta);arm('down',TF(5,14));}

/* ---- BLOCO 6: o ciclo ---- */
const PS=['testar 1 coisa','publicar','anotar','contar'];
t=T(6,0);P=nova(t);
{title(P,'Aprender com cada vídeo',t,110,80);const tq=W(6,1,'quatro');
 PS.forEach((l,i)=>{card(P,`<div class="cc"><div class="mk q" style="width:70px;height:70px">${i+1}</div><div class="h" style="font-size:40px;margin-top:16px;padding:0 10px">${l}</div></div>`,840+i*262,300,240,300,tq+i*0.15,'pop');if(i<3)seta(P,1072+i*262,440,36,tq+i*0.15+0.1);});
 const r=add(P,I.atualizar,`left:1290px;top:650px;width:120px;height:120px`);A.pop(r,TF(6,1)-0.5);tl.to(r,{rotation:360,duration:1.2,ease:'none'},TF(6,1)-0.3);}
t=T(6,2);P=nova(t);
{passos(P,PS,t,0,W(6,2,'testar'));const tu=T(6,3);
 card(P,`<div class="cc"><div class="h" style="font-size:150px;color:var(--acc)">1</div><div class="h" style="font-size:46px">coisa por vídeo</div></div>`,1320,150,540,320,W(6,2,'uma'),'pop','border:4px solid var(--acc)');stamp(P,'uma só',1560,420,tu,-6,'',52);
 [['gancho diferente',W(6,4,'gancho')],['título mais curto',W(6,4,'titulo')],['jeito novo de editar',W(6,4,'jeito')]].forEach(([l,tt],i)=>chip(P,l,1340,560+i*90,tt,'g'));}
t=T(6,5);P=nova(t);
{passos(P,PS,t,1,W(6,5,'publica'));
 const tn=W(6,6,'parado');card(P,`<div class="cc">${ICON('notebook',150)}<div class="h" style="font-size:40px;margin-top:10px">pronto, mas parado</div></div>`,1320,150,540,340,W(6,6,'pronto'),'pop','filter:grayscale(1)');const x=add(P,'✕',`left:1730px;top:120px;font-family:Bahnschrift;font-weight:700;font-size:150px;color:${R}`);A.stamp(x,W(6,6,'perfeito'));
 const tp=W(6,7,'publica');stamp(P,'tem prazo: publica',1360,560,tp,-5,'g',56);}
t=T(6,8);P=nova(t);
{passos(P,PS,t,2,W(6,8,'anota'));const tv=W(6,8,'vinte');
 card(P,`<div style="display:flex;align-items:center;gap:20px;padding:18px 26px">${ICON('relogio',70)}<div class="h" style="font-size:40px">~20 min depois</div></div>`,1320,130,540,110,tv,'pop');
 const L=[['receita usada',W(6,9,'receita')],['o que deu certo',W(6,9,'certo')],['o que melhorar',W(6,9,'melhorar')],['o que o público fez',W(6,9,'publico')],['se eu tivesse mais tempo...?',W(6,10,'tivesse')]];
 card(P,`<div style="padding:26px 30px"><div style="display:flex;align-items:center;gap:14px">${ICON('caderno',56)}<div class="tag">anotações</div></div>${L.map(([l],i)=>`<div id="an6${i}" class="h" style="font-size:34px;margin-top:16px;padding:6px 10px;border-radius:8px;${i===4?'background:#fdf3d8;border:3px solid '+Y:''}">• ${l}</div>`).join('')}</div>`,1320,270,540,560,W(6,8,'aprendeu'),'pop');
 L.forEach(([,tt],i)=>tl.from('#an6'+i,{opacity:0,x:-20,duration:0.3},tt));}
t=T(6,11);P=nova(t);
{card(P,`<div class="cc" style="padding:0 40px"><div class="tag">a pergunta mais importante</div><div class="h" style="font-size:64px;margin-top:16px">O que eu faria diferente se tivesse mais tempo?</div></div>`,840,160,1020,340,t,'pop',`border:5px solid ${Y};background:#fdf8ea`);
 stamp(P,'guarda bem',940,540,W(6,11,'guarda'),-6,'',58);
 const to=W(6,12,'ouro');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:20px 30px">${ICON('trofeu',80)}<div class="h" style="font-size:44px">vira ouro na fase 3</div></div>`,1300,560,540,140,to,'pop');EV(to,'ding');}
t=T(6,13);P=nova(t);
{passos(P,PS,t,3,W(6,13,'conta'));card(P,`<div class="cc">${ICON('megafone',130)}<div class="h" style="font-size:42px;margin-top:10px">como está indo</div></div>`,1320,150,540,340,W(6,13,'acompanha'),'pop');
 const tt=W(6,14,'tres');card(P,`<div style="padding:28px 30px"><div class="h" style="font-size:52px">vídeo 3 de 8</div><div style="height:30px;border-radius:15px;background:#ece5d6;margin-top:18px;overflow:hidden"><div id="pg6" style="width:37.5%;height:100%;background:${G};transform-origin:left center"></div></div></div>`,1320,540,540,190,tt,'pop');tl.from('#pg6',{scaleX:0,duration:0.6},tt+0.3);}
t=T(6,15);P=nova(t);
{title(P,'Uma coisa por vez',t,110,84);const tm=W(6,16,'muda');
 card(P,`<div style="padding:26px 30px"><div class="tag">muda tudo junto</div>${['título','thumbnail','gancho','edição'].map((l,i)=>`<div id="mt6${i}" class="h" style="font-size:38px;margin-top:14px">↻ ${l}</div>`).join('')}</div>`,860,250,460,430,tm,'pop');
 ['titulo','thumbnail','gancho','edicao'].forEach((w,i)=>tl.from('#mt6'+i,{opacity:0,x:-20,duration:0.25},W(6,16,w)));
 const tq=W(6,16,'sabe');const q=add(P,'?',`left:1050px;top:700px;font-family:Bahnschrift;font-weight:700;font-size:120px;color:${R}`);A.pop(q,tq);inclina(tq);
 const tc=W(6,17,'mudando');card(P,`<div class="cc">${ICON('lampada',130)}<div class="h" style="font-size:44px;margin-top:14px">1 mudança = 1 lição clara</div></div>`,1400,250,460,430,tc,'pop','border:4px solid var(--acc)');joinha(W(6,17,'claro'),1.4);}

/* ---- BLOCO 7: vontade de parar ---- */
t=T(7,0);P=nova(t);
{stamp(P,'aviso honesto',1080,120,W(7,0,'aviso'),-5,'',64);
 const te=W(7,1,'empolgacao');eixo(P,840,260,1020,480,T(7,1),'empolgação');linha(P,920,340,860,320,te,[[0,0.95],[0.25,0.9],[0.4,0.6],[0.55,0.2],[1,0.15]],R,1.4);
 chip(P,'vídeo 3 ou 4',1180,780,W(7,1,'terceiro'),'r');suor(te+0.4);}
t=T(7,2);P=nova(t);
{const tc=W(7,2,'cansado');card(P,`<div class="cc">${ICON('bateria',150)}<div class="h" style="font-size:44px;margin-top:10px">cansado</div></div>`,860,180,400,400,tc,'pop');
 const tm=W(7,2,'menos');eixo(P,1320,180,540,400,tm-0.4,'visualizações');[0.6,0.7,0.2,0.65].forEach((v,i)=>{const k='bv7'+i;add(P,`<div id="${k}" style="width:80px;height:${Math.round(v*240)}px;border-radius:10px 10px 0 0;background:${i===2?R:GR};transform-origin:50% 100%"></div>`,`left:${1410+i*110}px;top:${530-Math.round(v*240)}px`);tl.from('#'+k,{scaleY:0,duration:0.4},tm+i*0.1);});
 const tn=W(7,3,'normal');stamp(P,'normal',940,640,tn,-6,'g',70);chip(P,'é aqui que a maioria desiste',1300,660,W(7,3,'desiste'),'r');}
t=T(7,4);P=nova(t);
{title(P,'Não deu 8? Faz menos',t,110,80);const ts=W(7,5,'seis');
 for(let i=0;i<8;i++){const ok=i<6;const s=card(P,`<div class="cc"><div class="mk ${ok?'ok':'no'}" style="width:60px;height:60px;font-size:36px">${ok?'✓':'–'}</div></div>`,850+i*128,260,112,130,T(7,4)+0.3+i*0.06,'pop',ok?'':'opacity:0.5');}
 card(P,`<div style="display:flex;align-items:center;gap:26px;padding:26px 34px"><div class="h" style="font-size:44px">6 com aprendizado</div><div class="h" style="font-size:60px">&gt;</div><div class="h" style="font-size:44px;color:var(--muted)">8 no automático</div></div>`,860,450,1000,150,ts,'pop','border:4px solid var(--acc)');
 chip(P,'manter o ritmo',920,680,W(7,6,'ritmo'),'g');chip(P,'anotar o que aprendeu',1300,680,W(7,6,'anotar'),'g');}
t=T(7,7);P=nova(t);
{title(P,'Simplifica o formato',t,110,80);
 card(P,`<div class="cc">${ICON('notebook',110)}<div class="tag" style="margin-top:10px">trabalha ou estuda?</div></div>`,860,250,380,330,W(7,7,'trabalha'),'pop');
 [['mais curto',W(7,8,'curto')],['menos cortes',W(7,8,'cortes')],['cenário fixo',W(7,8,'cenario')]].forEach(([l,tt],i)=>row(P,'✓',l,1320,260+i*120,tt,'ok',44));
 card(P,`<div class="cc"><div class="h" style="font-size:44px">não é pra se esgotar · é pra ganhar prática</div></div>`,880,660,960,130,W(7,9,'pratica'),'up','border:4px solid var(--acc)');}
t=T(7,10);P=nova(t);
{const tf=W(7,10,'fracasso');card(P,`<div class="cc"><div class="tag">vídeo fraco</div><div class="h" style="font-size:80px;color:var(--muted)">fracasso</div></div>`,860,220,460,320,W(7,10,'fraco'),'pop');risco(P,890,400,400,tf+0.3,14);
 card(P,`<div class="cc"><div class="tag">vídeo fraco</div><div class="h" style="font-size:80px;color:var(--acc)">informação</div></div>`,1400,220,460,320,T(7,11),'pop','border:4px solid var(--acc)');EV(T(7,11),'ding');
 card(P,`<div style="display:flex;align-items:center;gap:24px;padding:20px 30px">${ICON('caderno',80)}<div class="h" style="font-size:42px">o que não repetir</div></div>`,880,620,560,140,W(7,12,'repetir'),'pop');
 const ta=W(7,13,'segue');seta(P,1470,670,160,ta);chip(P,'próximo',1650,650,ta+0.3,'g');}

/* ---- BLOCO 8: vídeo caprichado ---- */
t=T(8,0);P=nova(t);
{title(P,'Fase 3: o vídeo caprichado',t,110,84);fases(P,830,280,1040,t+0.2,2);
 chip(P,'semanas 10 a 12',900,560,T(8,1),'k');const tm=W(8,2,'metade');ritmo(P,1390,520,tm-0.6,'2x','0,5x',tm,AZ);}
t=T(8,3);P=nova(t);
{const td=W(8,3,'duas');chip(P,'antes: 1 vídeo por semana',1080,100,W(8,3,'antes'),'k');
 card(P,`<div style="display:flex;gap:16px;padding:26px;height:100%;box-sizing:border-box">${['semana 1','semana 2'].map(s=>`<div style="flex:1;border-radius:14px;background:#eef4f6;border:3px solid ${AZ};display:flex;align-items:center;justify-content:center"><div class="tag">${s}</div></div>`).join('')}</div>`,860,200,700,260,td,'pop');
 card(P,`<div class="cc">${thumb(200,112,'')}<div class="h" style="font-size:36px;margin-top:8px">1 vídeo só</div></div>`,1590,200,270,260,W(8,3,'so'),'pop');
 const tm=W(8,4,'tempo');card(P,`<div style="display:flex;align-items:center;gap:26px;padding:24px 34px">${ICON('ampulheta',100)}<div class="h" style="font-size:48px">depois do sprint: muito tempo</div></div>`,880,540,960,170,tm,'pop');}
t=T(8,5);P=nova(t);
{const L=['ideia grande','receita vencedora','"mais tempo"'];passos(P,L,t,0,T(8,6));
 const ti=W(8,6,'lista');card(P,`<div class="cc">${ICON('pasta',130)}<div class="h" style="font-size:38px;margin-top:8px">ideias grandes demais</div></div>`,1320,420,540,330,ti,'pop');
 const s=add(P,IDEIA('a que mais empolga',380,'#fdf3d8'),`left:1400px;top:560px`);A.fade(s,W(8,6,'empolga')-0.2);tl.to(s,{y:-420,duration:0.7,ease:E},W(8,6,'empolga'));EV(W(8,6,'empolga'),'whoosh');
 chip(P,'vídeos parecidos já foram bem',1330,780,W(8,7,'parecidos'),'g');}
t=T(8,8);P=nova(t);
{const L=['ideia grande','receita vencedora','"mais tempo"'];passos(P,L,t,1,W(8,8,'receita'));
 card(P,`<div class="cc">${ICON('pote',110)}${ICON('trofeu',70)}<div class="h" style="font-size:40px;margin-top:8px">a que mais funcionou</div></div>`,1320,150,540,340,W(8,8,'funcionou'),'pop','border:4px solid var(--acc)');
 const tc=W(8,9,'chutando');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:18px 26px">${ICON('dado',70)}<div class="h" style="font-size:40px">chute</div></div>`,1320,540,260,120,tc,'pop','filter:grayscale(1)');risco(P,1330,600,240,tc+0.3,10);
 const td=W(8,10,'dados');card(P,`<div style="display:flex;align-items:center;gap:20px;padding:18px 26px">${ICON('grafico',70)}<div class="h" style="font-size:40px">8 vídeos de dados</div></div>`,1320,690,540,120,td,'pop');}
t=T(8,11);P=nova(t);
{const L=['ideia grande','receita vencedora','"mais tempo"'];passos(P,L,t,2,W(8,11,'anotacoes'));
 card(P,`<div style="padding:26px 30px;height:100%;box-sizing:border-box;background:#fdf8ea;border-radius:16px"><div style="display:flex;align-items:center;gap:14px">${ICON('caderno',56)}<div class="tag">se eu tivesse mais tempo</div></div>${[['pesquisa mais funda','pesquisa'],['roteiro mais trabalhado','roteiro'],['som melhor','som'],['thumbnail testada com calma','thumbnail']].map(([l],i)=>`<div id="mx8${i}" style="display:flex;align-items:center;gap:14px;margin-top:22px"><div class="mk ok" style="width:44px;height:44px;font-size:28px">✓</div><div class="h" style="font-size:36px">${l}</div></div>`).join('')}</div>`,1320,150,540,560,W(8,11,'coloca'),'pop',`border:4px solid ${Y}`);
 ['pesquisa','roteiro','som','thumbnail'].forEach((w,i)=>{const tt=W(8,12,w);tl.from('#mx8'+i,{opacity:0,x:-20,duration:0.3},tt);EV(tt,'ding',0.5);});}
t=T(8,13);P=nova(t);
{title(P,'Por que ele sai melhor',t,110,80);
 const L=[['melhor ideia','lampada',W(8,14,'ideia')],['receita testada','pote',W(8,14,'receita')],['as melhorias','pincel',W(8,14,'melhorias')]];
 L.forEach(([l,ic,tt],i)=>{card(P,`<div class="cc">${ICON(ic,90)}<div class="h" style="font-size:34px;margin-top:10px">${l}</div></div>`,840+i*260,280,220,260,tt,'pop');if(i<2)add(P,'+',`left:${1068+i*260}px;top:360px;font-family:Bahnschrift;font-weight:700;font-size:70px`);});
 const tf=TF(8,14)-0.4;card(P,`<div class="cc">${ICON('trofeu',110)}<div class="h" style="font-size:36px;margin-top:8px;color:var(--acc)">caprichado</div></div>`,1640,260,230,300,tf,'pop','border:4px solid var(--acc)');EV(tf,'ding');joinha(tf,1.2);}
t=T(8,15);P=nova(t);
{const tr=W(8,15,'regra');stamp(P,'não grava no 1º dia',1040,110,W(8,15,'gravar'),-5,'',60);
 [['semana 1','pesquisar e escrever','lupa',W(8,16,'primeira')],['semana 2','gravar e editar','micro',W(8,16,'segunda')]].forEach(([s,l,ic,tt],i)=>
   card(P,`<div class="cc"><div class="tag">${s}</div>${ICON(ic,110)}<div class="h" style="font-size:44px;margin-top:12px">${l}</div></div>`,860+i*520,260,480,380,tt,'pop'));
 chip(P,'planejar = tempo vira qualidade',1060,700,W(8,17,'planejar'),'g');}

/* ---- BLOCO 9: comparar e fechar ---- */
t=T(9,0);P=nova(t);
{title(P,'Semana 12: compare',t,110,84);const ts=W(9,1,'sprint');
 card(P,`<div style="padding:24px"><div class="tag">sprint</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px">${[...Array(8)].map(()=>thumb(100,56,'')).join('')}</div><div class="h" style="font-size:36px;margin-top:16px">muitos, mais simples</div></div>`,850,250,480,380,ts,'pop',`border-top:12px solid ${Y}`);
 const tb=W(9,2,'outro');card(P,`<div class="cc"><div class="tag">caprichado</div>${thumb(260,146,'')}<div class="h" style="font-size:36px;margin-top:16px">um só, bem feito</div></div>`,1390,250,480,380,tb,'pop',`border-top:12px solid ${AZ}`);
 add(P,'vs',`left:1335px;top:400px;font-family:Bahnschrift;font-weight:700;font-size:56px`);
 const tr=W(9,3,'resultado');chip(P,'o que deu mais resultado?',880,680,tr,'k');chip(P,'qual ritmo dá pra manter?',1340,680,W(9,4,'ritmo'),'g');inclina(tr);}
t=T(9,5);P=nova(t);
{stamp(P,'não existe resposta certa',960,120,W(9,5,'resposta'),-4,'',58);
 card(P,`<div class="cc">${ICON('grafico',110)}<div class="h" style="font-size:42px;margin-top:10px">cresce com quantidade</div></div>`,860,280,460,320,W(9,6,'quantidade'),'pop');
 card(P,`<div class="cc">${ICON('trofeu',110)}<div class="h" style="font-size:42px;margin-top:10px">cresce com poucos bem feitos</div></div>`,1400,280,460,320,W(9,6,'poucos'),'pop');
 const td=W(9,7,'dados');chip(P,'✓ com dados',1000,660,td,'g');chip(P,'✕ achismo',1400,660,W(9,7,'achismo'),'r');}
t=T(9,8);P=nova(t);
{title(P,'Seu ritmo daqui pra frente',t,110,76);
 card(P,`<div class="cc">${ICON('cal',110)}<div class="h" style="font-size:46px;margin-top:12px">1 vídeo por semana</div></div>`,860,270,460,360,W(9,9,'semana'),'pop');
 card(P,`<div class="cc">${ICON('pincel',110)}<div class="h" style="font-size:46px;margin-top:12px">1 a cada 15 dias, mais capricho</div></div>`,1400,270,460,360,W(9,9,'quinze'),'pop');arm('point',W(9,9,'quinze'));arm('down',TF(9,9));}
t=T(9,10);P=nova(t);
{title(P,'Resumindo',t,110,96);
 const L=[['fase 1 · base','compromisso, repertório, receita, 8 ideias',T(9,10)],['fase 2 · sprint','o dobro, 1 teste por vídeo',T(9,11)],['fase 3 · caprichado','tudo o que aprendeu',T(9,12)]];
 L.forEach(([a,b,tt],i)=>card(P,`<div style="display:flex;align-items:center;gap:26px;padding:0 30px;height:100%"><div class="mk ok" style="width:70px;height:70px">✓</div><div><div class="h" style="font-size:46px;color:${i===1?'#b8860b':FC[i]}">${a}</div><div class="h" style="font-size:34px;color:var(--muted);margin-top:4px">${b}</div></div></div>`,860,250+i*170,1000,140,tt,'left',`border-left:14px solid ${FC[i]}`));
 L.forEach(([,,tt])=>EV(tt+0.2,'ding',0.6));}
t=T(9,13);P=nova(t);
{const tm=W(9,13,'maioria');for(let i=0;i<10;i++){const s=add(P,I.pessoa,`left:${880+(i%5)*190}px;top:${170+Math.floor(i/5)*170}px;width:130px;height:130px;filter:grayscale(1);opacity:0.6`);tl.from(s,{scale:0,duration:0.25},tm+i*0.05);}
 chip(P,'assiste e não faz nada',1160,520,W(9,13,'nada'),'r');
 const tc=W(9,14,'comentarios');card(P,`<div style="padding:26px 34px;display:flex;gap:26px;align-items:center"><div style="width:80px;height:80px;border-radius:50%;background:${G};flex:none"></div><div><div class="tag">comentário</div><div class="h" id="cm9" style="font-size:56px;margin-top:6px">eu começo hoje</div></div></div>`,960,620,800,190,tc,'pop','border:4px solid var(--acc)');
 tl.from('#cm9',{clipPath:'inset(0 100% 0 0)',duration:1,ease:'steps(14)'},W(9,14,'eu'));for(let k=0;k<7;k++)EV(W(9,14,'eu')+k*0.14,'tick',0.6);}
t=T(9,15);P=nova(t);
{const tI=W(9,15,'inscreve');
 const b=card(P,`<div style="display:flex;align-items:center;gap:30px;padding:30px 54px;background:${R};border-radius:20px">${ICON('sino',80)}<div class="h" style="font-size:72px;color:#fff">Inscreva-se</div></div>`,1050,300,600,150,tI,'pop','border:none;background:transparent;box-shadow:none');
 tl.to(b,{scale:1.06,duration:0.35,yoyo:true,repeat:7,ease:'sine.inOut'},tI+0.5);joinha(tI+0.2,3.4);
 const tx=add(P,'o YouTube por dentro, sem promessa milagrosa',`left:930px;top:520px;width:840px;text-align:center`,'tag');A.fade(tx,W(9,15,'dentro'));}
