/* Vídeo 11: 5 negócios pra montar com um canal no YouTube em 2027.
   Estilo dinâmico (motor do vídeo 10). Imagens em img/: novas do Google Flow (nomes) + reaproveitadas do vídeo 10 (vNN). */
const F = (t, n, o = {}) => FOTO(t, 'img/' + n + '.jpg', o);
const SUB = (b, f, n, txt, o = {}) => F(T(b, f), n, Object.assign({ txt, sub: o.sub, ts: T(b, f) + 0.05, ysub: 60, y: 160, tr: 'punch' }, o));
let t;

/* ===== BLOCO 1: gancho ===== */
F(T(1, 0), 'v00', { txt: 'EM 2027', tt: T(1, 0) + 0.15, cor: 'a', tr: 'flash', kb: 'in' });
TEXTO(W(1, 0, 'facil'), [['A', W(1, 0, 'parte')], ['PARTE', W(1, 0, 'parte') + 0.1], ['FÁCIL', W(1, 0, 'facil'), 'v']], { bg: COR.ver });
CARTAS(T(1, 1), [['📝', 'roteiro', W(1, 1, 'roteiro')], ['🎙️', 'voz', W(1, 1, 'voz')], ['🖼️', 'imagem', W(1, 1, 'imagem')], ['✂️', 'edição', W(1, 1, 'edicao')]], { bg: COR.cre, h: 400 });
F(T(1, 2), 'v32', { txt: 'A IA FAZ QUASE TUDO', tt: W(1, 2, 'faz'), fs: 115 });
F(T(1, 3), 'v38', { txt: 'O PROBLEMA', tt: W(1, 3, 'problema'), cor: 'r', tr: 'punch' });
F(T(1, 4), 'oceano', { txt: 'IGUAL PRA TODO MUNDO', tt: W(1, 4, 'igual'), fs: 115 });
TEXTO(T(1, 5), [['VIRA', T(1, 5) + 0.05], ['O', W(1, 5, 'o')], ['MÍNIMO', W(1, 5, 'minimo'), 'a']], { bg: COR.esc });
F(T(1, 6), 'v36', { txt: 'PENSA COMIGO', tt: T(1, 6) + 0.1 });
F(T(1, 7), 'oceano', { txt: 'MAIS VÍDEO TODO DIA', tt: W(1, 7, 'cresce'), cor: 'a', kb: 'out' });
F(T(1, 8), 'relogio', { txt: 'O TEMPO É O MESMO', tt: W(1, 8, 'mesmo'), fs: 120 });
NUM(W(1, 8, 'vinte'), 24, { suf: 'H', lab: 'por dia, pra todo mundo', dc: 0.6 });
VS(T(1, 9), ['📈', 'MAIS OFERTA'], ['👀', 'MESMA ATENÇÃO'], W(1, 9, 'mesma'));
F(T(1, 10), 'v36', { txt: 'QUEM SOFRE PRIMEIRO?', tt: W(1, 10, 'sofrer'), fs: 115 });
F(T(1, 11), 'v03', { txt: 'QUEM VIVE DE ANÚNCIO', tt: W(1, 11, 'anuncios'), cor: 'a', fs: 115 });
F(T(1, 12), 'v07', { txt: 'O MAIS DISPUTADO', tt: W(1, 12, 'disputada'), fs: 120 });
F(T(1, 13), 'v03', { txt: 'VOCÊ ALUGA A ATENÇÃO', tt: W(1, 13, 'aluga'), fs: 115, kb: 'out' });
TEXTO(W(1, 13, 'recebe'), [['UMA', W(1, 13, 'uma')], ['FATIA', W(1, 13, 'fatia')], ['PEQUENA', W(1, 13, 'pequena'), 'r'], ['🍕', W(1, 13, 'pequena') + 0.2]], { bg: COR.verm });
F(T(1, 14), 'oceano', { txt: 'MAIS DIFÍCIL', tt: W(1, 14, 'dificil'), cor: 'r', kb: 'in' });
F(T(1, 15), 'v25', { txt: 'OS QUE MAIS FATURAM', tt: W(1, 15, 'faturam'), fs: 115, tr: 'flash' });
TEXTO(W(1, 15, 'nao'), [['NÃO', W(1, 15, 'nao'), 'r'], ['VIVEM', W(1, 15, 'vivem')], ['DE', W(1, 15, 'de')], ['ANÚNCIO', W(1, 15, 'anuncio'), 'a']], { bg: COR.esc });
F(T(1, 16), 'vitrine', { txt: 'O CANAL É A VITRINE', tt: W(1, 16, 'vitrine'), fs: 120, cor: 'a' });
F(T(1, 17), 'v25', { txt: 'O NEGÓCIO ATRÁS DO VÍDEO', tt: W(1, 17, 'negocio'), fs: 105 });
NUM(T(1, 18), 5, { suf: ' NEGÓCIOS', lab: 'pra montar com um canal', tr: 'punch' });
F(W(1, 18, 'simples'), 'v05', { txt: 'ATÉ O MAIS ESCONDIDO', tt: W(1, 18, 'escondido'), fs: 115 });
TEXTO(T(1, 19), [['AVISO', W(1, 19, 'aviso'), 'a'], ['HONESTO', W(1, 19, 'honesto')]], { bg: COR.verm });
F(W(1, 19, 'nenhum'), 'v38', { txt: 'NADA DE DINHEIRO FÁCIL', tt: W(1, 19, 'facil'), fs: 110 });
F(T(1, 20), 'v15', { txt: 'DÁ TRABALHO', tt: W(1, 20, 'trabalho') });
F(T(1, 21), 'v39', { txt: 'MAS PAGA MAIS POR PESSOA', tt: W(1, 21, 'pessoa'), fs: 105, cor: 'v' });

/* ===== BLOCO 2: a regra ===== */
CANTO(T(2, 0), 'a regra');
F(T(2, 0), 'v37', { txt: 'UMA REGRA', tt: W(2, 0, 'regra'), cor: 'a', tr: 'flash' });
F(T(2, 1), 'v33', { txt: 'CRESCER OU SUMIR', tt: W(2, 1, 'sumir'), fs: 120 });
F(T(2, 2), 'v04', { txt: 'O CLIENTE ESCOLHE', tt: W(2, 2, 'escolhe'), fs: 120 });
VS(W(2, 2, 'preco'), ['🏷️', 'PREÇO'], ['🤝', 'CONFIANÇA'], W(2, 2, 'confianca'));
F(T(2, 3), 'escadas', { txt: 'PREÇO: BRIGA PRA BAIXO', tt: W(2, 3, 'baixo'), fs: 110, kb: 'esq', css: 'transform-origin:20% 50%' });
F(T(2, 4), 'v32', { txt: 'MAIS BARATO', tt: W(2, 4, 'barato'), kb: 'out' });
TEXTO(W(2, 4, 'agora'), [['COM', W(2, 4, 'com')], ['IA:', W(2, 4, 'ia')], ['DE', W(2, 4, 'de')], ['GRAÇA', W(2, 4, 'graca'), 'r']], { bg: COR.esc });
F(T(2, 5), 'escadas', { txt: 'CONFIANÇA NÃO SE COPIA', tt: W(2, 5, 'copiar'), fs: 110, cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
F(T(2, 6), 'v04', { txt: 'JÁ ME AJUDOU 3 VEZES', tt: W(2, 6, 'tres'), fs: 115 });
TEXTO(W(2, 6, 'indicar'), [['SE', W(2, 6, 'se')], ['INDICAR,', W(2, 6, 'indicar')], ['EU', W(2, 6, 'eu', 1)], ['COMPRO', W(2, 6, 'compro'), 'v']], { bg: COR.ver });
F(T(2, 7), 'v10', { txt: 'POR ISSO O YOUTUBE', tt: W(2, 7, 'poderoso'), fs: 115 });
F(T(2, 8), 'v09', { txt: 'TRABALHA 24H POR VOCÊ', tt: W(2, 8, 'trabalha'), cor: 'a', fs: 115 });
F(W(2, 8, 'construindo'), 'v33', { txt: 'GENTE QUE VOCÊ NÃO CONHECE', tt: W(2, 8, 'conhecer'), fs: 100 });
F(T(2, 9), 'vitrine', { txt: 'VÍDEO = VITRINE', tt: W(2, 9, 'vitrine'), cor: 'a', tr: 'flash' });
F(T(2, 10), 'jarra', { txt: 'CONFIANÇA = PRODUTO', tt: W(2, 10, 'produto'), cor: 'v' });
F(T(2, 11), 'v25', { txt: 'NEGÓCIO = O QUE VOCÊ VENDE', tt: W(2, 11, 'vende'), fs: 100 });
CARTAS(T(2, 12), [['💰', 'quem paga', W(2, 13, 'paga')], ['📺', 'como o canal ajuda', W(2, 13, 'ajuda')], ['⚠️', 'o cuidado', W(2, 13, 'cuidado')]], { titulo: 'EM CADA NEGÓCIO', bg: COR.cre });

/* ===== BLOCO 3: negócio 1, IA pra um nicho ===== */
CANTO(T(3, 0), 'negócio 1/5');
SUB(3, 0, 'profissionais', 'IA PRA UM NICHO', { sub: 'negócio 1', tt: W(3, 0, 'inteligencia'), cor: 'a' });
TEXTO(T(3, 1), [['NICHO', W(3, 1, 'nicho'), 'a'], ['🎯', W(3, 1, 'nicho') + 0.2]], { bg: COR.roxo });
F(T(3, 2), 'oceano', { txt: 'IA GENÉRICA = MAR DE GENTE', tt: W(3, 2, 'mar'), fs: 100 });
F(T(3, 3), 'v08', { txt: 'MORRE EM DIAS', tt: W(3, 3, 'morre'), cor: 'r', kb: 'esq' });
F(T(3, 4), 'profissionais', { txt: 'IA PRA CORRETOR', tt: W(3, 4, 'corretor'), kb: 'esq', css: 'transform-origin:10% 50%' });
F(T(3, 5), 'profissionais', { txt: 'IA PRA DENTISTA', tt: W(3, 5, 'dentista'), kb: 'in', css: 'transform-origin:38% 50%', tr: 'corte' });
F(T(3, 6), 'profissionais', { txt: 'IA PRA ADVOGADO', tt: W(3, 6, 'advogado'), kb: 'in', css: 'transform-origin:62% 50%', tr: 'corte' });
F(T(3, 7), 'profissionais', { txt: 'IA PRA LOJA PEQUENA', tt: W(3, 7, 'loja'), kb: 'dir', css: 'transform-origin:90% 50%', tr: 'corte' });
CARTAS(T(3, 8), [['💼', 'tem um negócio', W(3, 8, 'negocio')], ['💰', 'tem dinheiro', W(3, 8, 'dinheiro')], ['⏱️', 'tem pressa', W(3, 8, 'pressa')]], { titulo: 'PÚBLICO MENOR, MAS...', bg: COR.azu });
TELA(T(3, 9), 'img/whatsapp.jpg', { txt: '50 CLIENTES NO WHATSAPP', tt: W(3, 9, 'clientes'), bg: COR.ver, fs: 100 });
F(W(3, 9, 'dor'), 'v04', { txt: 'DIRETO NA DOR', tt: W(3, 9, 'dor'), cor: 'a' });
F(T(3, 10), 'v36', { txt: 'E O DINHEIRO?', tt: W(3, 10, 'dinheiro') });
CARTAS(T(3, 11), [['📺', 'anúncio', W(3, 11, 'anuncio')], ['🔗', 'afiliado', W(3, 12, 'afiliado')], ['📦', 'pacote pronto', W(3, 13, 'pacote')]], { titulo: '3 FONTES', bg: COR.cre });
F(W(3, 11, 'profissional'), 'v03', { txt: 'PÚBLICO PROFISSIONAL PAGA MELHOR', tt: W(3, 11, 'profissional'), fs: 95 });
F(T(3, 12), 'v15', { txt: 'AFILIADO DAS FERRAMENTAS', tt: W(3, 12, 'ferramentas'), fs: 105 });
F(T(3, 13), 'v00', { txt: 'PACOTE PRONTO', tt: W(3, 13, 'pacote'), cor: 'a' });
CARTAS(W(3, 13, 'modelos'), [['💬', 'modelos de mensagem', W(3, 13, 'modelos')], ['⌨️', 'comandos prontos', W(3, 13, 'comandos')], ['🪜', 'passo a passo', W(3, 13, 'passo')]], { bg: COR.roxo });
TEXTO(T(3, 14), [['⚠️', T(3, 14)], ['O', W(3, 14, 'o')], ['CUIDADO', W(3, 14, 'cuidado'), 'a']], { bg: COR.verm });
F(W(3, 14, 'ferramentas'), 'v16', { txt: 'FERRAMENTA MUDA RÁPIDO', tt: W(3, 14, 'rapido'), fs: 110 });
VS(T(3, 15), ['🔘', 'O BOTÃO'], ['✅', 'O PROBLEMA RESOLVIDO'], W(3, 15, 'nao'));
F(T(3, 16), 'profissionais', { txt: 'O PROBLEMA CONTINUA', tt: W(3, 16, 'continua'), cor: 'v', kb: 'out' });

/* ===== BLOCO 4: negócio 2, vitrine de serviço ===== */
CANTO(T(4, 0), 'negócio 2/5');
SUB(4, 0, 'vitrine', 'VITRINE DE SERVIÇO', { sub: 'negócio 2', tt: W(4, 0, 'vitrine'), cor: 'a' });
F(T(4, 1), 'v39', { txt: 'O MAIS RÁPIDO', tt: W(4, 1, 'rapido'), cor: 'v' });
TEXTO(W(4, 1, 'ignorado'), [['E', W(4, 1, 'e', 1)], ['O', W(4, 1, 'o', 1)], ['MAIS', W(4, 1, 'mais', 1)], ['IGNORADO', W(4, 1, 'ignorado'), 'r']], { bg: COR.esc });
F(T(4, 2), 'v35', { txt: 'SONHANDO COM MILHÕES', tt: W(4, 2, 'milhoes'), fs: 115 });
F(W(4, 2, 'bastava'), 'v31', { txt: 'O CLIENTE CERTO', tt: W(4, 2, 'cliente'), cor: 'a' });
F(T(4, 3), 'v37', { txt: 'FUNCIONA ASSIM', tt: W(4, 3, 'assim') });
CARTAS(T(4, 4), [['🤖', 'implementar IA', W(4, 4, 'implementar')], ['💬', 'automatizar atendimento', W(4, 4, 'automatizar')], ['🎬', 'editar vídeo', W(4, 4, 'editar')], ['📱', 'redes sociais', W(4, 4, 'redes')]], { titulo: 'VOCÊ PRESTA UM SERVIÇO', bg: COR.cre, h: 400 });
F(T(4, 5), 'escritorio', { txt: 'ANTES E DEPOIS', tt: W(4, 5, 'antes'), cor: 'a', kb: 'in' });
F(W(4, 5, 'explicando'), 'v10', { txt: 'EXPLICANDO CADA DECISÃO', tt: W(4, 5, 'decisao'), fs: 105 });
F(T(4, 6), 'v15', { txt: 'FAZ A CONTA', tt: W(4, 6, 'conta'), cor: 'a' });
NUM(T(4, 7), 10000, { suf: ' VIEWS', lab: 'de anúncio: às vezes menos que um almoço', dc: 0.7 });
F(T(4, 8), 'vitrine', { txt: '1 DONO DE EMPRESA', tt: W(4, 8, 'dono'), cor: 'a' });
VS(W(4, 8, 'cliente'), ['📺', 'O VÍDEO EM ANÚNCIO'], ['🤝', '1 CLIENTE'], W(4, 8, 'mais'));
F(T(4, 9), 'oceano', { txt: 'VIEWS QUASE NÃO IMPORTAM', tt: W(4, 9, 'importa'), fs: 105, kb: 'out' });
F(T(4, 10), 'v31', { txt: 'QUEM ASSISTIU', tt: W(4, 10, 'quem'), cor: 'v' });
VS(T(4, 11), ['😴', '"MINHA ROTINA DE EDITOR"'], ['🏥', '"COMO UMA CLÍNICA PAROU DE PERDER AGENDAMENTO"'], W(4, 11, 'clinica'));
TEXTO(T(4, 12), [['⚠️', T(4, 12)], ['NÃO', W(4, 12, 'nao'), 'r'], ['PROMETA', W(4, 12, 'prometa')], ['DEMAIS', W(4, 12, 'entrega'), 'a']], { bg: COR.verm });
F(T(4, 13), 'vitrine', { txt: 'O VÍDEO ATRAI', tt: W(4, 13, 'atrai'), kb: 'in' });
F(T(4, 14), 'escritorio', { txt: 'O TRABALHO SEGURA', tt: W(4, 14, 'ficar'), cor: 'v', kb: 'dir', css: 'transform-origin:85% 50%' });

/* ===== BLOCO 5: negócio 3, canal-escola ===== */
CANTO(T(5, 0), 'negócio 3/5');
SUB(5, 0, 'v27', 'O CANAL-ESCOLA', { sub: 'negócio 3', tt: W(5, 0, 'canalescola'), cor: 'a' });
F(T(5, 1), 'equipe', { txt: 'TODA EMPRESA VAI PRECISAR', tt: W(5, 1, 'empresa'), fs: 105 });
F(W(5, 1, 'maioria'), 'v36', { txt: 'NÃO SABE POR ONDE COMEÇAR', tt: W(5, 1, 'comecar'), fs: 100 });
F(T(5, 2), 'v00', { txt: 'PRA NÃO FICAR PRA TRÁS', tt: W(5, 2, 'tras'), fs: 110 });
F(T(5, 3), 'v27', { txt: '1ª AULA DE GRAÇA', tt: W(5, 3, 'graca'), cor: 'v' });
VS(T(5, 4), ['📺', 'GRÁTIS: O QUE FAZER'], ['🎓', 'PAGO: O PASSO A PASSO'], T(5, 5));
CARTAS(W(5, 5, 'exercicio'), [['✍️', 'exercício', W(5, 5, 'exercicio')], ['📚', 'material', W(5, 5, 'material')], ['🙋', 'tirar dúvida', W(5, 5, 'duvida')]], { bg: COR.azu });
CARTAS(T(5, 6), [['🎥', 'curso gravado', W(5, 6, 'curso')], ['🔴', 'turma ao vivo', W(5, 6, 'turma')], ['🧭', 'mentoria', W(5, 6, 'mentoria')], ['👥', 'comunidade', W(5, 6, 'comunidade')]], { titulo: 'FORMATOS', bg: COR.cre, h: 400 });
F(W(5, 6, 'membros'), 'v34', { txt: 'MEMBROS DO CANAL', tt: W(5, 6, 'membros'), cor: 'a', sub: 'depois do Programa de Parcerias', ts: W(5, 6, 'parcerias'), ysub: 320 });
F(T(5, 7), 'v27', { txt: 'ENSINAR DE VERDADE', tt: W(5, 7, 'verdade'), fs: 115 });
TEXTO(T(5, 8), [['É', T(5, 8) + 0.05], ['O', W(5, 8, 'o')], ['CONTRÁRIO', W(5, 8, 'contrario'), 'a']], { bg: COR.roxo });
F(T(5, 9), 'v39', { txt: 'SE O GRÁTIS É ASSIM...', tt: W(5, 9, 'gratis', 1), fs: 115 });
TEXTO(W(5, 9, 'imagina'), [['IMAGINA', W(5, 9, 'imagina')], ['O', W(5, 9, 'o', 1)], ['PAGO', W(5, 9, 'pago'), 'v']], { bg: COR.ver });
F(T(5, 10), 'v05', { txt: 'NÃO ESCONDA O CONTEÚDO', tt: W(5, 10, 'esconda'), fs: 110, cor: 'r' });
F(T(5, 11), 'v38', { txt: 'O PÚBLICO PERCEBE', tt: W(5, 11, 'percebe') });
CARTAS(T(5, 12), [['⚡', 'conveniência', W(5, 12, 'conveniencia')], ['🔢', 'ordem certa', W(5, 12, 'ordem')], ['🤝', 'acompanhamento', W(5, 12, 'acompanhamento')]], { titulo: 'VENDA ISSO', bg: COR.cre });

/* ===== BLOCO 6: como não virar mais um ===== */
CANTO(T(6, 0), '');
F(T(6, 0), 'v36', { txt: 'UMA PERGUNTA', tt: W(6, 0, 'pergunta'), tr: 'flash' });
F(T(6, 1), 'oceano', { txt: 'COMO SER DIFERENTE?', tt: W(6, 1, 'diferente'), cor: 'a' });
TEXTO(T(6, 2), [['O', W(6, 2, 'o')], ['QUE', W(6, 2, 'que')], ['A', W(6, 2, 'a', 1)], ['IA', W(6, 2, 'ia')], ['NÃO', W(6, 2, 'nao'), 'r'], ['TEM', W(6, 2, 'tem'), 'a']], { bg: COR.esc });
CARTAS(T(6, 3), [['🧪', 'seus testes', W(6, 3, 'testes')], ['💭', 'sua opinião', W(6, 4, 'opiniao')], ['📖', 'suas histórias', W(6, 5, 'historias')], ['📅', 'constância', W(6, 6, 'constancia')]], { titulo: 'A IA NÃO TEM', bg: COR.cre, h: 400 });
F(W(6, 6, 'semana'), 'v10', { txt: 'O MESMO JEITO DE EXPLICAR', tt: W(6, 6, 'explicar'), fs: 105 });
F(T(6, 7), 'v34', { txt: 'MESMO SEM ROSTO', tt: W(6, 7, 'rosto'), cor: 'a' });
CARTAS(T(6, 8), [['🎙️', 'voz reconhecível', W(6, 8, 'voz')], ['🧥', 'um personagem', W(6, 8, 'personagem')], ['🏷️', 'método com nome', W(6, 8, 'metodo')]], { bg: COR.roxo });
F(T(6, 9), 'v39', { txt: 'ELA VOLTA', tt: W(6, 9, 'volta'), cor: 'v' });
VS(T(6, 10), ['🧠', 'PENSAR NO SEU LUGAR'], ['⚡', 'FAZER MAIS RÁPIDO'], W(6, 10, 'nao'));
CARTAS(T(6, 11), [['🗂️', 'organiza', W(6, 11, 'organiza')], ['🎨', 'desenha', W(6, 11, 'desenha')], ['✂️', 'corta', W(6, 11, 'corta')], ['🚀', 'acelera', W(6, 11, 'acelera')]], { titulo: 'A IA', bg: COR.cre, h: 400 });
TEXTO(T(6, 12), [['O', T(6, 12)], ['PONTO', W(6, 12, 'ponto')], ['DE', W(6, 12, 'de')], ['VISTA', W(6, 12, 'vista')], ['É', W(6, 12, 'tem')], ['SEU', W(6, 12, 'seu'), 'a']], { bg: COR.ver });
F(T(6, 13), 'v33', { txt: 'TROCA O NOME...', tt: W(6, 13, 'trocar'), fs: 120 });
F(W(6, 13, 'ninguem'), 'oceano', { txt: 'VIROU MAIS UM', tt: W(6, 13, 'virou'), cor: 'r' });
F(T(6, 14), 'v39', { txt: 'VIROU MARCA', tt: W(6, 14, 'marca'), cor: 'v', tr: 'flash' });

/* ===== BLOCO 7: negócio 4, marca de confiança ===== */
CANTO(T(7, 0), 'negócio 4/5');
SUB(7, 0, 'jarra', 'MARCA DE CONFIANÇA', { sub: 'negócio 4', tt: W(7, 0, 'marca'), cor: 'a' });
CARTAS(T(7, 1), [['👥', 'audiência', W(7, 1, 'audiencia')], ['🤝', 'parcerias', W(7, 1, 'parcerias')], ['📦', 'produto seu', W(7, 1, 'produto')]], { bg: COR.azu });
CARTAS(T(7, 2), [['📈', 'investimento', W(7, 2, 'investimento')], ['🩺', 'saúde', W(7, 2, 'saude')], ['💻', 'tecnologia', W(7, 2, 'tecnologia')], ['🎓', 'educação', W(7, 2, 'educacao')]], { titulo: 'MERCADOS CHEIOS', bg: COR.cre, h: 400 });
F(W(7, 2, 'cresce'), 'v33', { txt: 'ALGUÉM QUE O PÚBLICO CONHECE', tt: W(7, 2, 'conhece'), fs: 100 });
F(T(7, 3), 'marcas', { txt: 'AS MARCAS PAGAM', tt: W(7, 3, 'pagam'), cor: 'a' });
F(T(7, 4), 'v36', { txt: 'UM SEGREDO', tt: W(7, 4, 'segredo'), tr: 'flash' });
TEXTO(W(7, 4, 'querem'), [['NÃO', W(7, 4, 'nao'), 'r'], ['SÓ', W(7, 4, 'so')], ['CANAL', W(7, 4, 'canal')], ['GIGANTE', W(7, 4, 'gigante'), 'a']], { bg: COR.esc });
CARTAS(T(7, 5), [['💬', 'comenta', W(7, 5, 'comenta')], ['❓', 'pergunta', W(7, 5, 'pergunta')], ['🛒', 'compra', W(7, 5, 'compra')]], { titulo: 'CANAL PEQUENO, PÚBLICO CERTO', bg: COR.ver, fst: 90 });
VS(T(7, 6), ['👥', '100 MIL ERRADAS'], ['🎯', 'MIL CERTAS'], W(7, 6, 'mil'));
F(T(7, 7), 'marcas', { txt: '1. O PUBLI', tt: W(7, 7, 'publi'), cor: 'a', kb: 'in' });
F(T(7, 8), 'v28', { txt: '2. PARCERIA LONGA', tt: W(7, 8, 'parceria'), fs: 120 });
F(T(7, 9), 'cofre', { txt: '3. PRODUTO SEU', tt: W(7, 9, 'produto'), cor: 'v' });
F(W(7, 9, 'socio'), 'cofre', { txt: 'OU VIRAR SÓCIO', tt: W(7, 9, 'socio'), cor: 'a', kb: 'out', tr: 'corte' });
TEXTO(T(7, 10), [['DE', T(7, 10)], ['MÍDIA', W(7, 10, 'midia')], ['A', W(7, 10, 'vira')], ['DONO', W(7, 10, 'dono'), 'a']], { bg: COR.ver });
F(T(7, 11), 'jarra', { txt: 'CADA INDICAÇÃO GASTA', tt: W(7, 11, 'gasta'), fs: 115, cor: 'r', kb: 'in' });
F(T(7, 12), 'v37', { txt: 'SÓ O QUE VOCÊ USARIA', tt: W(7, 12, 'usaria'), fs: 115 });
F(T(7, 13), 'v38', { txt: 'PUBLI RUIM CUSTA CARO', tt: W(7, 13, 'caro'), cor: 'r', fs: 115 });

/* ===== BLOCO 8: negócio 5, vitrine de produtos ===== */
CANTO(T(8, 0), 'negócio 5/5');
SUB(8, 0, 'celloja', 'VITRINE DE PRODUTOS', { sub: 'negócio 5', tt: W(8, 0, 'vitrine'), cor: 'a' });
F(T(8, 1), 'v04', { txt: 'A COMPRA MUDOU DE LUGAR', tt: W(8, 1, 'lugar'), fs: 105 });
CARTAS(T(8, 2), [['👀', 'descobre no vídeo', W(8, 2, 'descobre')], ['🙌', 'vê alguém usando', W(8, 2, 'usando')], ['🛒', 'compra ali mesmo', W(8, 2, 'compra')]], { bg: COR.roxo });
F(T(8, 3), 'celloja', { txt: 'AS REDES VIRARAM LOJA', tt: W(8, 3, 'loja'), fs: 115, kb: 'out' });
F(T(8, 4), 'fone', { txt: 'NO YOUTUBE JÁ EXISTE', tt: W(8, 4, 'existe'), fs: 115 });
F(W(8, 5, 'shopping'), 'fone', { txt: 'YOUTUBE SHOPPING', tt: W(8, 5, 'shopping'), cor: 'a', kb: 'in', tr: 'corte' });
F(W(8, 5, 'brasil'), 'celloja', { txt: 'AFILIADOS NO BRASIL', tt: W(8, 5, 'afiliados'), fs: 115 });
TEXTO(T(8, 6), [['MOSTRA', W(8, 6, 'mostra')], ['→', W(8, 6, 'alguem')], ['VENDE', W(8, 6, 'compra')], ['→', W(8, 6, 'voce', 1)], ['COMISSÃO', W(8, 6, 'comissao'), 'a']], { bg: COR.ver, fs: 150 });
CARTAS(T(8, 7), [['⚖️', 'comparativo', W(8, 7, 'comparativo')], ['🤔', 'vale a pena?', W(8, 7, 'vale')], ['🗓️', 'testei 30 dias', W(8, 7, 'testei')], ['🏆', 'o melhor até R$', W(8, 7, 'melhor')]], { titulo: 'CHATOS DE PROPÓSITO', bg: COR.cre, h: 400 });
F(T(8, 8), 'v04', { txt: 'CARTEIRA NA MÃO', tt: W(8, 8, 'carteira'), cor: 'a' });
F(T(8, 9), 'v16', { txt: 'E OS SHORTS?', tt: W(8, 9, 'shorts') });
NUM(W(8, 10, 'quinze'), 15, { suf: 's', lab: 'de produto funcionando', dc: 0.5 });
F(W(8, 10, 'levar'), 'fone', { txt: 'LEVA PRO VÍDEO COMPLETO', tt: W(8, 10, 'completo'), fs: 105 });
F(T(8, 11), 'live', { txt: 'LIVE DE VENDA', tt: W(8, 11, 'live'), cor: 'a', tr: 'flash' });
F(W(8, 11, 'duvida'), 'live', { txt: 'DÚVIDA NA HORA', tt: W(8, 11, 'hora'), kb: 'in', tr: 'corte' });
F(T(8, 12), 'v33', { txt: 'A FEIRA PRA MILHARES', tt: W(8, 12, 'milhares'), fs: 115 });
TEXTO(T(8, 13), [['⚠️', T(8, 13)], ['MOSTRA', W(8, 13, 'seja')], ['OS', W(8, 13, 'honesto')], ['DEFEITOS', W(8, 13, 'defeitos'), 'a']], { bg: COR.verm });
F(T(8, 14), 'jarra', { txt: 'SÓ ELOGIA = PROPAGANDA', tt: W(8, 14, 'propaganda'), fs: 105, cor: 'r' });

/* ===== BLOCO 9: por onde começar ===== */
CANTO(T(9, 0), '');
{ const L = [['nicho', 'profissionais', '1. IA PRA UM NICHO'], ['servico', 'vitrine', '2. VITRINE DE SERVIÇO'], ['canalescola', 'v27', '3. CANAL-ESCOLA'], ['marca', 'jarra', '4. MARCA DE CONFIANÇA'], ['produtos', 'celloja', '5. VITRINE DE PRODUTOS']];
  TEXTO(T(9, 0), [['OS', T(9, 0) + 0.05], ['5', W(9, 0, 'cinco'), 'a']], { bg: COR.esc });
  L.forEach(([w, im, txt], i) => F(W(9, 0, w), im, { txt, tt: W(9, 0, w) + 0.02, fs: 105, tr: i % 2 ? 'whipL' : 'whipR', treme: false, cor: i === 4 ? 'a' : 'b' }));
}
F(T(9, 1), 'v37', { txt: 'POR ONDE COMEÇAR?', tt: W(9, 1, 'comecar'), cor: 'a', tr: 'flash' });
TEXTO(T(9, 2), [['NÃO', W(9, 2, 'nao'), 'r'], ['TENTA', W(9, 2, 'tenta')], ['OS', W(9, 2, 'os')], ['5', W(9, 2, 'cinco'), 'a']], { bg: COR.esc });
F(T(9, 3), 'funil', { txt: 'ESCOLHE UM', tt: W(9, 3, 'escolhe'), cor: 'v' });
F(T(9, 4), 'v36', { txt: 'O QUE VOCÊ SABE?', tt: W(9, 4, 'sabe'), sub: 'pergunta 1', ts: T(9, 4) + 0.05, ysub: 60, y: 160 });
F(T(9, 5), 'v03', { txt: 'QUEM TEM DINHEIRO?', tt: W(9, 5, 'dinheiro'), sub: 'pergunta 2', ts: T(9, 5) + 0.05, ysub: 60, y: 160, cor: 'a' });
F(T(9, 6), 'v25', { txt: 'O QUE VENDE NO 1º MÊS?', tt: W(9, 6, 'vender'), sub: 'pergunta 3', ts: T(9, 6) + 0.05, ysub: 60, y: 160, fs: 115 });
NUM(T(9, 7), 10, { suf: ' VÍDEOS', lab: 'com as dúvidas de quem compraria', dc: 0.6, tr: 'punch' });
F(T(9, 8), 'v09', { txt: 'NÃO PRA PASSAR O TEMPO', tt: W(9, 8, 'tempo'), fs: 110, cor: 'r' });
CARTAS(T(9, 9), [['🔗', 'link na descrição', W(9, 9, 'descricao')], ['📌', 'comentário fixado', W(9, 9, 'fixado')]], { titulo: 'LINK CLARO', bg: COR.cre });
CARTAS(T(9, 10), [['👆', 'clicaram', W(9, 10, 'clicaram')], ['💬', 'perguntaram', W(9, 10, 'perguntaram')], ['🛒', 'compraram', W(9, 10, 'compraram')]], { titulo: 'MEDE O QUE IMPORTA', bg: COR.azu });
F(T(9, 11), 'oceano', { txt: 'MAIS VÍDEO QUE NUNCA', tt: W(9, 11, 'nunca'), fs: 115 });
TEXTO(T(9, 12), [['NÃO', W(9, 12, 'nao'), 'r'], ['QUEM', W(9, 12, 'quem', 1)], ['FAZ', W(9, 12, 'faz')], ['MAIS', W(9, 12, 'mais')]], { bg: COR.esc });
F(T(9, 13), 'jarra', { txt: 'QUEM CONSTRÓI CONFIANÇA', tt: W(9, 13, 'confianca'), fs: 110, cor: 'v' });
F(W(9, 13, 'entregar'), 'v25', { txt: 'E TEM O QUE ENTREGAR', tt: W(9, 13, 'entregar'), fs: 110, cor: 'a' });
F(T(9, 14), 'v34', { txt: 'INSCREVA-SE', tt: W(9, 14, 'inscreve'), cor: 'a', tr: 'flash' });
F(W(9, 14, 'comenta'), 'v36', { txt: 'QUAL DOS 5 É O SEU?', tt: W(9, 14, 'qual'), fs: 115 });
F(T(9, 15), 'v39', { txt: 'EU LEIO TODOS', tt: W(9, 15, 'leio'), cor: 'v' });

fechar();
