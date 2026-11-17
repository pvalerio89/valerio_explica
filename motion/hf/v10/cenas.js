/* Vídeo 10: 15 nichos CHATOS no YouTube que pagam mais que entretenimento.
   Estilo dinâmico: cena nova a cada ideia. Imagens do Google Flow em img/ (img00..img36). */
const F = (t, n, o = {}) => FOTO(t, 'img/img' + String(n).padStart(2, '0') + '.jpg', o);
const POS = '../../../canal/thumb-chamativa/capuz-poses/';
const E = s => `<span style="font-size:170px">${s}</span>`;
let t;

/* ===== BLOCO 1: gancho ===== */
F(T(1, 0), 0, { txt: 'CANAL "CHATO"', tt: W(1, 0, 'aula'), tr: 'flash', kb: 'in' });
TEXTO(W(1, 0, 'ninguem'), [['SEM', W(1, 0, 'sem')], ['ROSTO', W(1, 0, 'aparecendo'), 'a']], { bg: COR.esc });
F(W(1, 0, 'ganha'), 35, { txt: 'GANHA MAIS', tt: W(1, 0, 'mais'), cor: 'a' });
F(W(1, 0, 'entretenimento'), 1, { txt: 'QUE ISSO AQUI', cor: 'b', y: 700 });
TEXTO(T(1, 1), [['NÃO', T(1, 1) + 0.05, 'r'], ['É', W(1, 1, 'e') + 0.05], ['DANÇA', W(1, 1, 'danca'), 'a']], { bg: COR.roxo });
TEXTO(T(1, 2), [['NEM', T(1, 2) + 0.05, 'r'], ['DESAFIO', W(1, 2, 'desafio'), 'a']], { bg: COR.azu });
TEXTO(T(1, 3), [['NEM', T(1, 3) + 0.05, 'r'], ['FOFOCA', W(1, 3, 'fofoca'), 'a']], { bg: COR.verm });
F(W(1, 4, 'declarar'), 11, { txt: 'IMPOSTO', tt: W(1, 4, 'imposto') });
F(W(1, 4, 'planilha'), 15, { txt: 'PLANILHA', tt: W(1, 4, 'planilha'), cor: 'v' });
F(W(1, 4, 'mofo'), 18, { txt: 'MOFO', tt: W(1, 4, 'mofo') });
F(T(1, 5), 36, { txt: 'POR QUÊ?', tt: W(1, 5, 'acontece') });
VS(T(1, 6), ['👀', 'ESPECTADOR'], ['💼', 'ANUNCIANTE'], T(1, 7));
F(T(1, 8), 3, { txt: 'QUEM PAGA', tt: W(1, 8, 'paga'), cor: 'a' });
F(W(1, 8, 'problema'), 4, { txt: 'PROBLEMA + CARTÃO', tt: W(1, 8, 'cartao'), fs: 120 });
CARTAS(T(1, 9), [['🤡', 'pegadinha', W(1, 9, 'pegadinha')], ['👁️', '1 milhão de views', W(1, 9, 'milhao')], ['🪙', 'paga pouco', W(1, 9, 'pouco')]], { titulo: 'VÍDEO VIRAL', bg: COR.roxo });
CARTAS(T(1, 10), [['🧾', 'imposto', W(1, 10, 'imposto')], ['📉', 'menos views', W(1, 10, 'menos')], ['💰', 'paga mais', W(1, 10, 'pagar')]], { titulo: 'VÍDEO CHATO', bg: COR.ver });
F(W(1, 10, 'cada'), 2, { txt: 'CADA VIEW VALE MAIS', tt: W(1, 10, 'vale'), fs: 120, cor: 'a' });
NUM(T(1, 11), 15, { suf: ' NICHOS', lab: 'chatos que pagam bem', tr: 'punch' });
CARTAS(W(1, 11, 'divididos'), [['📄', 'dinheiro e papelada'], ['🔧', 'manual de instrução'], ['🚨', 'problema urgente'], ['🔁', 'o que se repete']], { titulo: '4 GRUPOS', bg: COR.cre, h: 420 });
F(T(1, 12), 5, { txt: 'GUARDA O ÚLTIMO', tt: W(1, 12, 'guarda'), cor: 'a' });
TEXTO(W(1, 12, 'escondido'), [['O', W(1, 12, 'mais')], ['MAIS', W(1, 12, 'mais') + 0.1], ['ESCONDIDO', W(1, 12, 'escondido'), 'a']], { bg: COR.esc });
t = T(1, 13); { const d = TEXTO(t, [['AVISO', W(1, 13, 'aviso'), 'a'], ['HONESTO', W(1, 13, 'honesto')]], { bg: COR.verm }); }
{ const d = F(W(1, 13, 'nenhum'), 8, { txt: 'NADA GARANTIDO', tt: W(1, 13, 'garante'), fs: 120 }); }
CARTAS(T(1, 14), [['🌎', 'país do público', W(1, 14, 'pais')], ['📅', 'época do ano', W(1, 14, 'epoca')], ['🎬', 'tipo de vídeo', W(1, 14, 'tipo')]], { titulo: 'O VALOR MUDA', bg: COR.cre });
F(T(1, 15), 2, { txt: 'ONDE A CONTA FECHA', tt: W(1, 15, 'conta'), fs: 120 });
F(T(1, 16), 33, { txt: 'NINGUÉM QUER FAZER', tt: W(1, 16, 'ninguem'), fs: 120 });
F(T(1, 17), 37, { txt: 'ESSA É A VANTAGEM', tt: W(1, 17, 'vantagem'), fs: 120 });

/* ===== BLOCO 2: o filtro ===== */
CANTO(T(2, 0), 'o filtro');
F(T(2, 0), 6, { txt: 'O FILTRO', tt: W(2, 0, 'filtro'), cor: 'a', tr: 'flash' });
NUM(T(2, 1), 3, { suf: ' PERGUNTAS', lab: 'pra um nicho chato valer a pena' });
F(T(2, 2), 4, { txt: 'GASTA DINHEIRO?', tt: W(2, 2, 'gasta'), sub: 'pergunta 1', ts: T(2, 2) + 0.1, ysub: 60, y: 160, cor: 'a' });
CARTAS(T(2, 3), [['🛒', 'compra', W(2, 3, 'compra')], ['🛡️', 'seguro', W(2, 3, 'seguro')], ['🎓', 'curso', W(2, 3, 'curso')], ['🛠️', 'serviço', W(2, 3, 'servico')]], { titulo: 'O PÚBLICO ESTÁ DECIDINDO', bg: COR.cre, h: 400 });
F(W(2, 3, 'empresa'), 3, { txt: 'EMPRESA QUER ANUNCIAR', tt: W(2, 3, 'anunciar'), fs: 115 });
F(T(2, 4), 7, { txt: 'LEILÃO', tt: W(2, 4, 'disputando'), cor: 'a' });
TEXTO(W(2, 4, 'caro'), [['MAIS', W(2, 4, 'mais', 1)], ['CARO', W(2, 4, 'caro'), 'a'], ['💸', W(2, 4, 'anuncio')]], { bg: COR.ver });
F(T(2, 5), 30, { txt: 'PESQUISAM O ANO TODO?', tt: W(2, 5, 'pesquisam'), sub: 'pergunta 2', ts: T(2, 5) + 0.1, ysub: 60, y: 160, fs: 115, cor: 'a' });
F(T(2, 6), 8, { txt: 'TENDÊNCIA MORRE', tt: W(2, 6, 'morre'), kb: 'esq' });
F(T(2, 7), 8, { txt: 'DÚVIDA ETERNA', tt: W(2, 7, 'duvida'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
F(W(2, 7, 'anos'), 9, { txt: 'ENQUANTO VOCÊ DORME', tt: W(2, 7, 'dorme'), fs: 115 });
F(T(2, 8), 10, { txt: 'SEM APARECER?', tt: W(2, 8, 'aparecer'), sub: 'pergunta 3', ts: T(2, 8) + 0.1, ysub: 60, y: 160, cor: 'a' });
CARTAS(T(2, 9), [['🖥️', 'tela gravada', W(2, 9, 'tela')], ['🎙️', 'narração', W(2, 9, 'narracao')], ['🖼️', 'imagem', W(2, 9, 'imagem')]], { titulo: 'SÓ ISSO', bg: COR.azu });
VS(T(2, 10), ['🤡', 'ENGRAÇADO'], ['💡', 'CLARO'], T(2, 11));
F(T(2, 12), 27, { txt: 'CLAREZA SE APRENDE', tt: W(2, 12, 'clareza'), fs: 120, cor: 'v' });
F(T(2, 13), 38, { txt: 'ENGRAÇADO? NEM TODO MUNDO', tt: W(2, 13, 'engracado'), fs: 105 });
CARTAS(T(2, 14), [['✅', 'passou nas 3', T(2, 14) + 0.1], ['⚠️', 'falhou em 1: cuidado', T(2, 15)], ['❌', 'falhou em 2: pula', T(2, 16)]], { titulo: 'RESULTADO', bg: COR.cre });
F(T(2, 17), 34, { txt: 'NICHO COM POTENCIAL', tt: W(2, 17, 'potencial'), fs: 120, cor: 'a' });
TEXTO(T(2, 18), [['VAMOS', W(2, 18, 'vamos')], ['AOS', W(2, 18, 'aos')], ['15', W(2, 18, 'quinze'), 'a']], { bg: COR.lar });
F(T(2, 19), 37, { txt: 'QUAL COMBINA COM VOCÊ?', tt: W(2, 19, 'combina'), fs: 110 });

/* ===== BLOCO 3: dinheiro e papelada ===== */
CANTO(T(3, 0), 'grupo 1');
TEXTO(T(3, 0), [['GRUPO 1', W(3, 0, 'grupo'), 'a'], ['|'], ['DINHEIRO', W(3, 0, 'dinheiro')], ['E', W(3, 0, 'e')], ['PAPELADA', W(3, 0, 'papelada')]], { bg: COR.ver, tr: 'flash', fs: 160 });
CARTAS(T(3, 1), [['🏦', 'banco', W(3, 1, 'banco')], ['📈', 'corretora', W(3, 1, 'corretora')], ['🧮', 'contador', W(3, 1, 'contador')], ['🛡️', 'seguradora', W(3, 1, 'seguradora')]], { titulo: 'QUEM ANUNCIA AQUI', bg: COR.cre, h: 400 });
F(T(3, 2), 3, { txt: 'PAGA CARO POR CLIENTE', tt: W(3, 2, 'caro'), fs: 115 });
CANTO(T(3, 3), 'nicho 1/15');
F(T(3, 3), 11, { txt: 'IMPOSTO DE RENDA E MEI', tt: W(3, 3, 'imposto'), sub: 'nicho 1', ts: T(3, 3) + 0.05, ysub: 60, y: 160, fs: 110, tr: 'punch' });
F(W(3, 4, 'medo'), 4, { txt: 'MEDO DE ERRAR', tt: W(3, 4, 'errar') });
F(W(3, 4, 'mes'), 26, { txt: 'ABRINDO MEI', tt: W(3, 4, 'abrindo'), cor: 'a' });
TEXTO(T(3, 5), [['A', T(3, 5)], ['DÚVIDA', W(3, 5, 'duvida')], ['VOLTA', W(3, 5, 'volta'), 'a'], ['🔁', W(3, 5, 'sempre')]], { bg: COR.azu });
TELA(T(3, 6), 'img/img11.jpg', { txt: '5 ERROS DA MALHA FINA', tt: W(3, 6, 'erros'), bg: COR.verm });
F(T(3, 7), 8, { txt: 'HOJE E ANO QUE VEM', tt: W(3, 7, 'ano'), cor: 'v', kb: 'dir' });
CANTO(T(3, 8), 'nicho 2/15');
F(T(3, 8), 12, { txt: 'INSS E APOSENTADORIA', tt: W(3, 8, 'inss'), sub: 'nicho 2', ts: T(3, 8) + 0.05, ysub: 60, y: 160, fs: 110, tr: 'punch' });
CARTAS(T(3, 9), [['👴', 'público mais velho', W(3, 9, 'velho')], ['⏳', 'tempo pra vídeo longo', W(3, 9, 'longo')], ['⚖️', 'decisão importante', W(3, 9, 'decisao')]], { bg: COR.lar });
CARTAS(T(3, 10), [['📏', 'regra', W(3, 10, 'regra')], ['📅', 'prazo', W(3, 10, 'prazo')], ['📄', 'documento', W(3, 10, 'documento')]], { titulo: 'PROCURA O TEMPO TODO', bg: COR.cre });
TEXTO(T(3, 11), [['NÃO', W(3, 11, 'nao'), 'r'], ['PULA', W(3, 11, 'pula')], ['VÍDEO', W(3, 11, 'video')]], { bg: COR.esc });
F(T(3, 12), 12, { txt: 'ASSISTE ATÉ O FIM', tt: W(3, 12, 'fim'), cor: 'a', kb: 'out' });
CANTO(T(3, 13), 'nicho 3/15');
F(T(3, 13), 13, { txt: 'CARTÃO E MILHAS', tt: W(3, 13, 'cartao'), sub: 'nicho 3', ts: T(3, 13) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(3, 14), [['💳', 'comparar cartão', W(3, 14, 'comparar')], ['✈️', 'juntar ponto', W(3, 14, 'juntar')], ['🚫', 'sem anuidade', W(3, 14, 'anuidade')]], { bg: COR.azu });
F(T(3, 15), 4, { txt: 'MEXE NO BOLSO', tt: W(3, 15, 'bolso') });
F(W(3, 15, 'banco'), 3, { txt: 'BANCO ADORA', tt: W(3, 15, 'adora'), cor: 'a', kb: 'out' });
TELA(T(3, 16), 'img/img13.jpg', { txt: 'QUAL CARTÃO VALE A PENA?', tt: W(3, 16, 'cartao'), bg: COR.roxo, fs: 100 });
TEXTO(T(3, 17), [['ATUALIZA', W(3, 17, 'atualizar'), 'a'], ['TODO', W(3, 17, 'todo')], ['ANO', W(3, 17, 'ano')]], { bg: COR.ver });
CANTO(T(3, 18), 'nicho 4/15');
F(T(3, 18), 14, { txt: 'SEGUROS EXPLICADOS', tt: W(3, 18, 'seguros'), sub: 'nicho 4', ts: T(3, 18) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(3, 19), [['🚗', 'carro', W(3, 19, 'carro')], ['📱', 'celular', W(3, 19, 'celular')], ['🏠', 'casa', W(3, 19, 'casa')]], { titulo: 'SEGURO DE...', bg: COR.cre });
F(T(3, 20), 14, { txt: 'LETRAS MIÚDAS', tt: W(3, 20, 'letras'), kb: 'in', css: 'transform-origin:40% 50%' });
F(W(3, 20, 'explica'), 39, { txt: 'VIRA REFERÊNCIA', tt: W(3, 20, 'referencia'), fs: 120 });
F(T(3, 21), 30, { txt: 'COMENTÁRIO VIRA IDEIA', tt: W(3, 21, 'ideia'), fs: 115 });
TEXTO(T(3, 22), [['O', T(3, 22)], ['CANAL', W(3, 22, 'canal')], ['SE', W(3, 22, 'se')], ['ALIMENTA', W(3, 22, 'alimenta'), 'a']], { bg: COR.lar });

/* ===== BLOCO 4: manual de instrução ===== */
CANTO(T(4, 0), 'grupo 2');
TEXTO(T(4, 0), [['GRUPO 2', W(4, 0, 'grupo'), 'a'], ['|'], ['MANUAL', W(4, 0, 'manual')], ['DE', W(4, 0, 'de')], ['INSTRUÇÃO', W(4, 0, 'instrucao')]], { bg: COR.azu, tr: 'flash', fs: 160 });
VS(T(4, 1), ['🎉', 'POR DIVERSÃO'], ['🆘', 'QUANDO PRECISA'], W(4, 1, 'mas'));
CANTO(T(4, 2), 'nicho 5/15');
F(T(4, 2), 15, { txt: 'EXCEL E PLANILHAS', tt: W(4, 2, 'excel'), sub: 'nicho 5', ts: T(4, 2) + 0.05, ysub: 60, y: 160, cor: 'v', tr: 'punch' });
CARTAS(T(4, 3), [['➗', 'fórmula', W(4, 3, 'formula')], ['📊', 'tabela dinâmica', W(4, 3, 'tabela')], ['💵', 'controle de gastos', W(4, 3, 'controle')]], { bg: COR.ver });
F(T(4, 4), 0, { txt: 'PROBLEMA URGENTE', tt: W(4, 4, 'urgente'), kb: 'out' });
TEXTO(W(4, 4, 'emprego'), [['EMPREGO', W(4, 4, 'emprego')], ['+', W(4, 4, 'e', 2)], ['RENDA', W(4, 4, 'renda'), 'a']], { bg: COR.esc });
NUM(T(4, 5), 5, { suf: ' ANOS', lab: 'um vídeo de PROCV recebendo visita', dc: 0.6, tr: 'punch' });
CANTO(T(4, 6), 'nicho 6/15');
F(T(4, 6), 16, { txt: 'CELULAR E APLICATIVO', tt: W(4, 6, 'celular'), sub: 'nicho 6', ts: T(4, 6) + 0.05, ysub: 60, y: 160, fs: 115, tr: 'punch' });
CARTAS(T(4, 7), [['📦', 'liberar espaço', W(4, 7, 'liberar')], ['💬', 'recuperar conversa', W(4, 7, 'recuperar')], ['⚙️', 'config escondida', W(4, 7, 'configuracao')]], { bg: COR.cre });
NUM(T(4, 8), 1000000, { pre: '+', lab: 'buscas todo mês', dc: 0.8 });
F(W(4, 8, 'atualizacao'), 16, { txt: 'ATUALIZAÇÃO NOVA', tt: W(4, 8, 'nova'), kb: 'out' });
F(T(4, 9), 35, { txt: 'MUDOU O APP?', tt: W(4, 9, 'aplicativo') });
TEXTO(T(4, 10), [['VÍDEO', W(4, 10, 'video')], ['NOVO', W(4, 10, 'novo'), 'a'], ['DE', W(4, 10, 'novo') + 0.15], ['GRAÇA', W(4, 10, 'inventar')]], { bg: COR.ver });
CANTO(T(4, 11), 'nicho 7/15');
F(T(4, 11), 17, { txt: 'CONSERTOS EM CASA', tt: W(4, 11, 'consertos'), sub: 'nicho 7', ts: T(4, 11) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(4, 12), [['🚿', 'chuveiro', W(4, 12, 'chuveiro')], ['🚽', 'descarga', W(4, 12, 'descarga')], ['🪠', 'pia', W(4, 12, 'pia')]], { bg: COR.azu });
F(T(4, 13), 17, { txt: 'RESOLVE NA HORA', tt: W(4, 13, 'hora'), cor: 'a', kb: 'out' });
CARTAS(W(4, 13, 'loja'), [['🔨', 'loja de ferramenta', W(4, 13, 'ferramenta')], ['🧱', 'material de construção', W(4, 13, 'construcao')]], { titulo: 'QUEM ANUNCIA', bg: COR.cre });
TEXTO(T(4, 14), [['SÓ', W(4, 14, 'basta')], ['AS', W(4, 14, 'as')], ['MÃOS', W(4, 14, 'maos'), 'a'], ['🤲', W(4, 14, 'conserto')]], { bg: COR.roxo });
CANTO(T(4, 15), 'nicho 8/15');
F(T(4, 15), 18, { txt: 'LIMPEZA PESADA', tt: W(4, 15, 'limpeza'), sub: 'nicho 8', ts: T(4, 15) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(4, 16), [['🦠', 'mofo', W(4, 16, 'mofo')], ['🟤', 'ferrugem', W(4, 16, 'ferrugem')], ['🍳', 'gordura', W(4, 16, 'gordura')], ['👟', 'chulé', W(4, 16, 'tenis')]], { bg: COR.ver, h: 400 });
F(T(4, 17), 38, { txt: 'NOJENTO?', tt: W(4, 17, 'nojento') });
VS(T(4, 18), ['👥', 'MENOS CONCORRÊNCIA'], ['🔎', 'MESMA PROCURA'], W(4, 18, 'mesma'));
F(T(4, 19), 18, { txt: 'ANTES E DEPOIS', tt: W(4, 19, 'antes'), cor: 'a', kb: 'esq' });

/* ===== BLOCO 5: problema urgente ===== */
CANTO(T(5, 0), 'grupo 3');
TEXTO(T(5, 0), [['GRUPO 3', W(5, 0, 'grupo'), 'a'], ['|'], ['PROBLEMA', W(5, 0, 'problema')], ['URGENTE', W(5, 0, 'urgente'), 'r']], { bg: COR.verm, tr: 'flash', fs: 170 });
CARTAS(T(5, 1), [['😰', 'desesperada', W(5, 1, 'desesperada')], ['👀', 'assiste inteiro', W(5, 1, 'inteiro')], ['🤝', 'confia', W(5, 1, 'confia')]], { bg: COR.cre });
CANTO(T(5, 2), 'nicho 9/15');
F(T(5, 2), 19, { txt: 'GOLPES E FRAUDES', tt: W(5, 2, 'golpes'), sub: 'nicho 9', ts: T(5, 2) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(5, 3), [['👤', 'falso parente', W(5, 3, 'parente')], ['🧾', 'boleto falso', W(5, 3, 'boleto')], ['🔗', 'link de promoção', W(5, 3, 'link')]], { bg: COR.esc });
F(T(5, 4), 19, { txt: 'GOLPE NOVO TODO DIA', tt: W(5, 4, 'novo'), kb: 'out', fs: 120 });
TEXTO(W(5, 4, 'avisa'), [['QUEM', W(5, 4, 'quem')], ['AVISA', W(5, 4, 'avisa')], ['PRIMEIRO', W(5, 4, 'primeiro'), 'a']], { bg: COR.lar });
CARTAS(T(5, 5), [['👨‍👩‍👧', 'grupo da família', W(5, 5, 'familia')], ['📣', 'divulgação grátis', W(5, 5, 'divulgacao')]], { titulo: 'COMPARTILHADO', bg: COR.ver });
CANTO(T(5, 6), 'nicho 10/15');
F(T(5, 6), 20, { txt: 'DIREITOS DO CONSUMIDOR', tt: W(5, 6, 'direitos'), sub: 'nicho 10', ts: T(5, 6) + 0.05, ysub: 60, y: 160, fs: 110, tr: 'punch' });
CARTAS(T(5, 7), [['🚪', 'cancelar plano', W(5, 7, 'cancelar')], ['💸', 'reembolso', W(5, 7, 'reembolso')], ['⚠️', 'cobrança indevida', W(5, 7, 'cobranca')]], { bg: COR.cre });
TEXTO(T(5, 8), [['RAIVA', W(5, 8, 'raiva'), 'r'], ['VIRA', W(5, 8, 'transformada')], ['BUSCA', W(5, 8, 'busca'), 'a']], { bg: COR.esc });
F(T(5, 9), 20, { txt: 'MAIS UM VÍDEO', tt: W(5, 9, 'video'), cor: 'a', kb: 'out' });
CANTO(T(5, 10), 'nicho 11/15');
F(T(5, 10), 21, { txt: 'LUZES DO PAINEL', tt: W(5, 10, 'luzes'), sub: 'nicho 11', ts: T(5, 10) + 0.05, ysub: 60, y: 160, tr: 'punch', cor: 'a' });
F(T(5, 11), 21, { txt: 'POSSO CONTINUAR?', tt: W(5, 11, 'continuar'), kb: 'in', css: 'transform-origin:45% 70%' });
TEXTO(T(5, 12), [['CURTO', W(5, 12, 'curto')], ['DIRETO', W(5, 12, 'direto'), 'a'], ['RESOLVE', W(5, 12, 'resolve')]], { bg: COR.lar });
NUM(T(5, 13), 50, { pre: '+', suf: ' LUZES', lab: 'em dezenas de modelos de carro', dc: 0.7 });
F(T(5, 14), 31, { txt: 'BIBLIOTECA INFINITA', tt: W(5, 14, 'biblioteca'), fs: 120 });
CANTO(T(5, 15), 'nicho 12/15');
F(T(5, 15), 22, { txt: 'PRAGAS EM CASA', tt: W(5, 15, 'pragas'), sub: 'nicho 12', ts: T(5, 15) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(5, 16), [['🪵', 'cupim', W(5, 16, 'cupim')], ['🪳', 'barata', W(5, 16, 'barata')], ['🐜', 'formiga', W(5, 16, 'formiga')], ['🦟', 'pernilongo', W(5, 16, 'pernilongo')]], { bg: COR.ama, h: 400 });
VS(T(5, 17), ['🙅', 'NINGUÉM GRAVA'], ['🔎', 'TODO MUNDO PESQUISA'], W(5, 17, 'mas'));
F(T(5, 18), 22, { txt: 'TEM ANUNCIANTE', tt: W(5, 18, 'anunciante'), cor: 'a', kb: 'dir' });
F(T(5, 19), 30, { txt: 'MUITO COMENTÁRIO', tt: W(5, 19, 'comentario'), fs: 120 });

/* ===== BLOCO 6: o que se repete ===== */
CANTO(T(6, 0), 'grupo 4');
TEXTO(T(6, 0), [['GRUPO 4', W(6, 0, 'grupo'), 'a'], ['|'], ['O QUE', W(6, 0, 'o')], ['SE', W(6, 0, 'se')], ['REPETE', W(6, 0, 'repete')]], { bg: COR.roxo, tr: 'flash', fs: 170 });
TEXTO(T(6, 1), [['O', T(6, 1)], ['SEGREDO:', W(6, 1, 'segredo')], ['SÉRIE', W(6, 1, 'serie'), 'a']], { bg: COR.esc });
CARTAS(T(6, 2), [['📆', 'toda semana', W(6, 2, 'semana')], ['🗓️', 'todo mês', W(6, 2, 'mes')], ['🎯', 'todo ano', W(6, 2, 'ano')]], { bg: COR.cre });
F(W(6, 2, 'canal'), 32, { txt: 'O LUGAR DA RESPOSTA', tt: W(6, 2, 'resposta'), fs: 115 });
F(T(6, 3), 8, { txt: 'O CONTRÁRIO DO VIRAL', tt: W(6, 3, 'contrario'), kb: 'esq', fs: 115 });
CANTO(T(6, 4), 'nicho 13/15');
F(T(6, 4), 23, { txt: 'CONCURSOS E EDITAIS', tt: W(6, 4, 'concursos'), sub: 'nicho 13', ts: T(6, 4) + 0.05, ysub: 60, y: 160, tr: 'punch' });
CARTAS(T(6, 5), [['📢', 'edital novo', W(6, 5, 'edital')], ['📝', 'inscrição aberta', W(6, 5, 'inscricao')], ['📅', 'calendário mudou', W(6, 5, 'calendario')]], { bg: COR.azu });
F(T(6, 6), 23, { txt: 'ASSISTE MUITO', tt: W(6, 6, 'assiste'), kb: 'out' });
TEXTO(W(6, 6, 'cursinho'), [['CURSINHO', W(6, 6, 'cursinho')], ['ANUNCIA', W(6, 6, 'anuncia'), 'a']], { bg: COR.ver });
TELA(T(6, 7), 'img/img23.jpg', { txt: 'EDITAIS DA SEMANA', tt: W(6, 7, 'semanal'), bg: COR.lar });
CANTO(T(6, 8), 'nicho 14/15');
F(T(6, 8), 24, { txt: 'VALE A PENA OU NÃO?', tt: W(6, 8, 'vale'), sub: 'nicho 14', ts: T(6, 8) + 0.05, ysub: 60, y: 160, tr: 'punch', fs: 120 });
VS(T(6, 9), ['👍', 'PRA QUEM SERVE'], ['👎', 'PRA QUEM NÃO SERVE'], W(6, 9, 'nao'));
CARTAS(T(6, 10), [['🆕', 'lançamento novo', W(6, 10, 'lancamento')], ['📺', 'anúncio', W(6, 10, 'anuncio')], ['🔗', 'link de afiliado', W(6, 10, 'afiliado')]], { titulo: 'GANHA DUAS VEZES', bg: COR.cre });
CARTAS(T(6, 11), [['📋', 'ficha técnica', W(6, 11, 'ficha')], ['🏷️', 'preço', W(6, 11, 'preco')], ['⭐', 'avaliação', W(6, 11, 'avaliacao')]], { titulo: 'SEM COMPRAR TUDO', bg: COR.azu });
F(W(6, 11, 'claro'), 24, { txt: 'OPINIÃO? AVISA', tt: W(6, 11, 'opiniao'), kb: 'out' });
NUM(T(6, 12), 14, { suf: ' JÁ SÃO BONS', lab: 'mas falta um', dc: 0.6 });
F(T(6, 13), 5, { txt: 'MELHOR QUE TODOS', tt: W(6, 13, 'melhor'), cor: 'a', tr: 'flash' });

/* ===== BLOCO 7: o último nicho ===== */
CANTO(T(7, 0), 'nicho 15/15');
F(T(7, 0), 25, { txt: 'O QUE EU GUARDEI', tt: W(7, 0, 'guardei'), cor: 'a', tr: 'flash' });
TEXTO(W(7, 0, 'tutorial'), [['TUTORIAL', W(7, 0, 'tutorial')], ['DE', W(7, 0, 'de')], ['PROGRAMA', W(7, 0, 'programa'), 'a'], ['DE EMPRESA', W(7, 0, 'empresa')]], { bg: COR.lar, fs: 170 });
CARTAS(T(7, 1), [['🧾', 'nota fiscal', W(7, 1, 'nota')], ['📊', 'gestão', W(7, 1, 'gestao')], ['💳', 'maquininha', W(7, 1, 'maquininha')], ['📅', 'agendamento', W(7, 1, 'agendamento')]], { bg: COR.cre, h: 400 });
F(T(7, 2), 26, { txt: 'NÃO SABE CONFIGURAR', tt: W(7, 2, 'configurar'), fs: 120 });
F(T(7, 3), 36, { txt: 'POR QUE O MELHOR?', tt: W(7, 3, 'melhor'), fs: 120 });
TEXTO(T(7, 4), [['1', W(7, 4, 'primeiro'), 'a'], ['|'], ['POUCA', W(7, 4, 'pequeno')], ['GENTE', W(7, 4, 'pequeno') + 0.15], ['|'], ['VALE', W(7, 4, 'vale')], ['MUITO', W(7, 4, 'muito'), 'a']], { bg: COR.ver, fs: 160 });
F(T(7, 5), 3, { txt: 'MENSALIDADE POR ANOS', tt: W(7, 5, 'mensalidade'), fs: 115 });
TEXTO(T(7, 6), [['2', W(7, 6, 'segundo'), 'a'], ['|'], ['QUASE', W(7, 6, 'quase')], ['NINGUÉM', W(7, 6, 'ninguem')], ['FAZ', W(7, 6, 'faz'), 'r']], { bg: COR.roxo, fs: 170 });
CARTAS(T(7, 7), [['🥶', 'frios', W(7, 7, 'frios')], ['🕸️', 'desatualizados', W(7, 7, 'desatualizados')]], { titulo: 'VÍDEOS OFICIAIS', bg: COR.cre });
F(T(7, 8), 27, { txt: 'O PROFESSOR QUE FALTAVA', tt: W(7, 8, 'professor'), fs: 110, cor: 'a' });
TEXTO(T(7, 9), [['3', W(7, 9, 'terceiro'), 'a'], ['|'], ['ALÉM', W(7, 9, 'fora')], ['DO', W(7, 9, 'do')], ['ADSENSE', W(7, 9, 'adsense'), 'a']], { bg: COR.azu, fs: 170 });
F(T(7, 10), 28, { txt: 'AFILIADO · PARCERIA · CONSULTORIA', tt: W(7, 10, 'afiliado'), fs: 80 });
F(T(7, 11), 35, { txt: 'VIRA UM NEGÓCIO', tt: W(7, 11, 'negocio'), cor: 'a' });
F(T(7, 12), 37, { txt: 'SEU CANAL ESTÁ AÍ', tt: W(7, 12, 'canal'), fs: 120 });

/* ===== BLOCO 8: como escolher ===== */
CANTO(T(8, 0), 'como escolher');
F(T(8, 0), 36, { txt: 'COMO ESCOLHER O SEU', tt: W(8, 0, 'escolher'), tr: 'flash', fs: 120 });
F(T(8, 1), 29, { txt: '1 · AGUENTA 1 ANO?', tt: W(8, 1, 'aguenta'), fs: 120 });
TEXTO(T(8, 2), [['ODEIA', W(8, 2, 'odeia'), 'r'], ['=', W(8, 2, 'vira')], ['ABANDONA', W(8, 2, 'abandonado')]], { bg: COR.esc });
TEXTO(T(8, 3), [['2', W(8, 3, 'segundo'), 'a'], ['PESQUISA', W(8, 3, 'pesquisa')], ['ANTES', W(8, 3, 'antes'), 'a']], { bg: COR.azu });
F(T(8, 4), 30, { txt: 'VEJA AS SUGESTÕES', tt: W(8, 4, 'sugestoes'), fs: 120 });
VS(T(8, 5), ['❓', 'MUITA DÚVIDA'], ['📼', 'POUCO VÍDEO BOM'], W(8, 5, 'pouco'));
TEXTO(W(8, 5, 'ali'), [['É', W(8, 5, 'e', 1)], ['ALI', W(8, 5, 'ali'), 'a'], ['QUE', W(8, 5, 'que')], ['VOCÊ', W(8, 5, 'voce')], ['ENTRA', W(8, 5, 'entra'), 'v']], { bg: COR.ver });
F(T(8, 6), 31, { txt: '3 · RESPONSABILIDADE', tt: W(8, 6, 'responsabilidade'), fs: 115 });
CARTAS(T(8, 7), [['🧾', 'imposto', W(8, 7, 'imposto')], ['🩺', 'saúde', W(8, 7, 'saude')], ['⚖️', 'direito', W(8, 7, 'direito')], ['💰', 'dinheiro', W(8, 7, 'dinheiro')]], { titulo: 'INFORMAÇÃO CERTA', bg: COR.cre, h: 400 });
CARTAS(T(8, 8), [['📚', 'cita a fonte', W(8, 8, 'fonte')], ['📅', 'data o vídeo', W(8, 8, 'data')], ['🚫', 'não promete', W(8, 8, 'promete')]], { bg: COR.ver });
F(T(8, 9), 39, { txt: 'CONFIANÇA', tt: W(8, 9, 'confiar') });
NUM(T(8, 10), 10, { suf: ' VÍDEOS', lab: 'antes de julgar', dc: 0.6, tr: 'punch' });
F(T(8, 11), 8, { txt: 'CRESCE DEVAGAR', tt: W(8, 11, 'devagar'), kb: 'dir' });
F(T(8, 12), 9, { txt: 'TRABALHA SOZINHO', tt: W(8, 12, 'sozinho'), cor: 'a' });
F(T(8, 13), 1, { txt: 'PICO E SOME', tt: W(8, 13, 'pico'), kb: 'out' });
F(T(8, 14), 8, { txt: 'FICA DE PÉ', tt: W(8, 14, 'pe'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
F(T(8, 15), 32, { txt: '10 VENDEDORES', tt: W(8, 15, 'vendedores'), cor: 'a' });

/* ===== BLOCO 9: fechamento ===== */
CANTO(T(9, 0), '');
F(T(9, 0), 3, { txt: 'O DINHEIRO VEM DO ANUNCIANTE', tt: W(9, 0, 'anunciante'), fs: 100, tr: 'flash' });
F(W(9, 0, 'paga'), 4, { txt: 'QUEM TEM UM PROBLEMA', tt: W(9, 0, 'problema'), fs: 110, cor: 'a' });
{ // lista rápida dos 15
  const L = [['imposto', 11], ['inss', 12], ['cartao', 13], ['seguros', 14], ['excel', 15], ['celular', 16], ['consertos', 17], ['limpeza', 18], ['golpes', 19], ['direitos', 20], ['luzes', 21], ['pragas', 22], ['concursos', 23], ['vale', 24], ['tutorial', 26]];
  const R = ['IMPOSTO E MEI', 'INSS', 'CARTÃO E MILHAS', 'SEGUROS', 'EXCEL', 'CELULAR E APPS', 'CONSERTOS', 'LIMPEZA PESADA', 'GOLPES', 'CONSUMIDOR', 'LUZES DO PAINEL', 'PRAGAS', 'CONCURSOS', 'VALE A PENA?', 'PROGRAMA DE EMPRESA'];
  TEXTO(T(9, 1), [['OS', T(9, 1) + 0.05], ['15', W(9, 1, 'quinze'), 'a']], { bg: COR.esc });
  L.forEach(([w, im], i) => F(W(9, 1, w), im, { txt: `${i + 1}. ${R[i]}`, tt: W(9, 1, w) + 0.02, fs: 110, tr: i % 2 ? 'whipL' : 'whipR', treme: false, cor: i === 14 ? 'a' : 'b' }));
}
F(T(9, 2), 33, { txt: 'SEJA ÚTIL', tt: W(9, 2, 'util'), cor: 'v', tr: 'flash' });
CARTAS(T(9, 3), [['🎬', 'cenário bonito', W(9, 3, 'cenario')], ['📷', 'câmera cara', W(9, 3, 'camera')], ['💃', 'dancinha', W(9, 3, 'dancinha')]], { titulo: 'NÃO PRECISA DE', bg: COR.verm });
F(T(9, 4), 27, { txt: 'PACIÊNCIA E CLAREZA', tt: W(9, 4, 'paciencia'), fs: 115 });
F(T(9, 5), 36, { txt: 'QUAL DOS 15 VOCÊ FARIA?', tt: W(9, 5, 'qual'), fs: 110, cor: 'a' });
F(T(9, 6), 34, { txt: 'INSCREVA-SE', tt: W(9, 6, 'inscreve'), cor: 'a', tr: 'flash' });
TEXTO(W(9, 6, 'youtube'), [['YOUTUBE', W(9, 6, 'youtube')], ['COM', W(9, 6, 'com')], ['OS PÉS', W(9, 6, 'pes'), 'a'], ['NO CHÃO', W(9, 6, 'chao')]], { bg: COR.ver });

fechar();
