/* Vídeo 13: Por que seu vídeo morre em 2 dias (e como fazer ele render por anos).
   Estilo dinâmico (motor do vídeo 10). Imagens em img/: ilustrações do Google Flow dos vídeos 10 (vNN) e 11 (nomes). */
const F = (t, n, o = {}) => FOTO(t, 'img/' + n + '.jpg', o);
const JEITO = (b, n, nome, img, palavra) => {
  CANTO(T(b, 0), `jeito ${n}/6`);
  NUM(T(b, 0), n, { pre: 'JEITO ', lab: nome, dc: 0.5, tr: 'flash', cor: 'v' });
  F(W(b, 0, palavra), img, { txt: nome.toUpperCase(), tt: W(b, 0, palavra) + 0.05, fs: 100, cor: 'a', tr: 'punch' });
};

/* ===== BLOCO 1: gancho ===== */
F(T(1, 0), 'v10', { txt: 'VÍDEO NOVO', tt: W(1, 0, 'novo'), tr: 'flash', kb: 'in' });
F(T(1, 1), 'v39', { txt: 'DIA 1: SOBE', tt: W(1, 1, 'sobem'), cor: 'v' });
F(T(1, 2), 'v00', { txt: 'DIA 2: AINDA CHEGA', tt: W(1, 2, 'chega'), fs: 115 });
TEXTO(T(1, 3), [['DIA', W(1, 3, 'terceiro')], ['3:', W(1, 3, 'terceiro') + 0.1], ['LINHA', W(1, 3, 'linha')], ['RETA', W(1, 3, 'reta'), 'r']], { bg: COR.esc });
F(T(1, 4), 'v09', { txt: 'NUNCA MAIS SE MEXE', tt: W(1, 4, 'mexe'), cor: 'r', kb: 'out' });
F(T(1, 5), 'v36', { txt: 'O YOUTUBE ESQUECEU?', tt: W(1, 5, 'esqueceu'), fs: 115 });
TEXTO(T(1, 6), [['NÃO', W(1, 6, 'nao'), 'r'], ['FOI', W(1, 6, 'foi')], ['ISSO', W(1, 6, 'isso'), 'a']], { bg: COR.verm });
F(T(1, 7), 'v08', { txt: 'O CAMINHO CONTRÁRIO', tt: W(1, 7, 'contrario'), fs: 115, kb: 'dir', css: 'transform-origin:80% 50%' });
F(T(1, 8), 'v08', { txt: 'MESES DEPOIS, TODO DIA', tt: W(1, 8, 'todo'), fs: 105, cor: 'v', kb: 'in', css: 'transform-origin:75% 50%', tr: 'corte' });
F(T(1, 9), 'v35', { txt: 'MAIS QUE NO LANÇAMENTO', tt: W(1, 9, 'lancamento'), fs: 105, cor: 'a' });
VS(T(1, 10), ['🍀', 'SORTE'], ['🎥', 'IMAGEM BONITA'], W(1, 10, 'qualidade'));
F(T(1, 11), 'v28', { txt: 'O CAMINHO ATÉ O VÍDEO', tt: W(1, 11, 'caminho'), fs: 110, cor: 'a' });
F(T(1, 12), 'v38', { txt: 'POR QUE MORRE EM 2 DIAS', tt: W(1, 12, 'morre'), fs: 105, cor: 'r' });
NUM(T(1, 13), 6, { suf: ' JEITOS', lab: 'de fazer o vídeo render por anos', tr: 'punch', cor: 'v' });
F(T(1, 14), 'v29', { txt: 'NÃO SÓ O VÍDEO DA SEMANA', tt: W(1, 14, 'semana'), fs: 100 });
F(T(1, 15), 'v09', { txt: 'VÍDEOS ANTIGOS TRABALHANDO', tt: W(1, 15, 'antigos'), fs: 100, cor: 'v' });
F(W(1, 15, 'precisar'), 'v25', { txt: 'SEM FAZER MAIS NADA', tt: W(1, 15, 'nada'), fs: 110, cor: 'a' });

/* ===== BLOCO 2: por que o vídeo morre ===== */
CANTO(T(2, 0), 'por que morre');
F(T(2, 0), 'v15', { txt: 'DE ONDE VÊM AS VIEWS?', tt: W(2, 0, 'visualizacoes'), fs: 110, tr: 'flash' });
F(T(2, 1), 'v28', { txt: '3 PORTAS', tt: W(2, 1, 'portas'), cor: 'a' });
F(T(2, 2), 'v28', { txt: '1. PÁGINA INICIAL', tt: W(2, 2, 'pagina'), kb: 'esq', css: 'transform-origin:15% 50%', tr: 'corte' });
F(T(2, 3), 'v01', { txt: 'SEM PROCURAR NADA', tt: W(2, 3, 'procurar'), fs: 115 });
F(T(2, 4), 'v28', { txt: '2. SUGERIDOS', tt: W(2, 4, 'sugeridos'), kb: 'in', css: 'transform-origin:50% 50%', tr: 'corte' });
F(W(2, 4, 'aparecem'), 'v24', { txt: 'DO LADO OU DEPOIS', tt: W(2, 4, 'depois'), fs: 115 });
F(T(2, 5), 'v28', { txt: '3. BUSCA', tt: W(2, 5, 'busca'), kb: 'dir', css: 'transform-origin:85% 50%', tr: 'corte', cor: 'a' });
F(W(2, 5, 'digita'), 'v30', { txt: 'DIGITA UMA DÚVIDA', tt: W(2, 5, 'duvida'), fs: 115 });
F(T(2, 6), 'v32', { txt: 'PRIMEIRO UM TESTE', tt: W(2, 6, 'testar'), fs: 115 });
CARTAS(T(2, 7), [['🔔', 'inscritos', W(2, 7, 'inscritos')], ['👀', 'quem já assistiu', W(2, 7, 'assistiu')]], { titulo: 'QUEM JÁ CONHECE', bg: COR.cre });
F(T(2, 8), 'v07', { txt: 'REAGIU BEM? MAIS GENTE', tt: W(2, 8, 'gente'), fs: 105, cor: 'v' });
TEXTO(T(2, 9), [['INICIAL', W(2, 9, 'inicial')], ['=', W(2, 9, 'vive')], ['NOVIDADE', W(2, 9, 'novidade'), 'a']], { bg: COR.roxo, fs: 160 });
F(T(2, 10), 'oceano', { txt: 'MILHÕES DE VÍDEOS NOVOS', tt: W(2, 10, 'milhoes'), fs: 105 });
F(T(2, 11), 'oceano', { txt: 'PERDENDO LUGAR', tt: W(2, 11, 'perdendo'), cor: 'r', kb: 'out' });
F(T(2, 12), 'v38', { txt: 'O GRÁFICO CAI', tt: W(2, 12, 'cai'), cor: 'r' });
TEXTO(T(2, 13), [['BUSCA', W(2, 13, 'busca'), 'a'], ['E', W(2, 13, 'e')], ['SUGERIDOS', W(2, 13, 'sugeridos'), 'v']], { bg: COR.ver, fs: 160 });
F(T(2, 14), 'v12', { txt: 'NÃO LIGAM PRA DATA', tt: W(2, 14, 'data'), fs: 115 });
F(T(2, 15), 'v30', { txt: 'DAQUI A 1 ANO...', tt: W(2, 15, 'ano'), kb: 'in' });
F(W(2, 15, 'continua'), 'v39', { txt: 'CONTINUA APARECENDO', tt: W(2, 15, 'aparecendo'), fs: 110, cor: 'v' });
VS(T(2, 16), ['💥', 'EXPLODIR NO DIA 1'], ['🔍', 'SER ENCONTRADO DEPOIS'], T(2, 17));

/* ===== BLOCO 3: jeito 1, pergunta que se repete ===== */
JEITO(3, 1, 'Pergunta que se repete', 'v36', 'pergunta');
VS(T(3, 1), ['🎆', 'NOVIDADE'], ['🌳', 'PERENE'], W(3, 1, 'perene'));
F(T(3, 2), 'v08', { txt: 'NOVIDADE: AGORA', tt: W(3, 2, 'agora'), kb: 'esq', css: 'transform-origin:20% 50%' });
CARTAS(T(3, 3), [['📰', 'notícia', W(3, 3, 'noticia')], ['🔥', 'polêmica', W(3, 3, 'polemica')], ['🚀', 'lançamento', W(3, 3, 'lancamento')]], { bg: COR.verm });
F(T(3, 4), 'v38', { txt: 'EM 1 MÊS, NINGUÉM PROCURA', tt: W(3, 4, 'ninguem'), fs: 100, cor: 'r' });
F(T(3, 5), 'v08', { txt: 'PERENE: NUNCA SAI DE MODA', tt: W(3, 5, 'moda'), fs: 100, cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
CARTAS(T(3, 6), [['🪜', 'como fazer', W(3, 6, 'como')], ['💲', 'quanto custa', W(3, 6, 'quanto')], ['⚖️', 'qual é melhor', W(3, 6, 'qual')], ['❓', 'por que acontece', W(3, 6, 'acontece')]], { titulo: 'DÚVIDAS QUE NÃO MORREM', bg: COR.cre, h: 400 });
F(T(3, 7), 'v12', { txt: 'ONTEM, AMANHÃ, ANO QUE VEM', tt: W(3, 7, 'vem'), fs: 95 });
F(T(3, 8), 'v26', { txt: 'CANAL DE CULINÁRIA', tt: W(3, 8, 'culinaria'), fs: 115 });
F(T(3, 9), 'v16', { txt: 'O PRATO QUE VIRALIZOU', tt: W(3, 9, 'viralizou'), fs: 110 });
TEXTO(W(3, 9, 'prazo'), [['PRAZO', W(3, 9, 'prazo')], ['DE', W(3, 9, 'de')], ['VALIDADE', W(3, 9, 'validade'), 'r'], ['⏳', W(3, 9, 'validade') + 0.2]], { bg: COR.esc });
TEXTO(T(3, 10), [['ARROZ', W(3, 10, 'arroz')], ['SOLTINHO', W(3, 10, 'soltinho'), 'a'], ['🍚', W(3, 10, 'soltinho') + 0.2]], { bg: COR.lar });
F(T(3, 11), 'v07', { txt: 'TODO DIA ALGUÉM NOVO', tt: W(3, 11, 'novo'), fs: 115, cor: 'v' });
F(T(3, 12), 'v36', { txt: 'NUNCA FALAR DE NOVIDADE?', tt: W(3, 12, 'novidade'), fs: 105 });
F(T(3, 13), 'v08', { txt: 'NOVIDADE DÁ UM PICO', tt: W(3, 13, 'pico'), fs: 115, kb: 'esq', css: 'transform-origin:20% 50%' });
F(T(3, 14), 'v31', { txt: 'UMA BASE DE PERENES', tt: W(3, 14, 'perenes'), fs: 110, cor: 'v' });
F(T(3, 15), 'v14', { txt: 'ALGUÉM VAI PROCURAR DAQUI A 1 ANO?', tt: W(3, 15, 'ano'), fs: 85, cor: 'a' });
F(T(3, 16), 'v27', { txt: 'TRABALHA POR MUITO TEMPO', tt: W(3, 16, 'tempo'), fs: 100, cor: 'v' });

/* ===== BLOCO 4: jeito 2, título com palavras da busca ===== */
JEITO(4, 2, 'Título com palavras da busca', 'v30', 'titulo');
F(T(4, 1), 'v34', { txt: 'SÓ PRA CHAMAR ATENÇÃO', tt: W(4, 1, 'atencao'), fs: 110 });
TEXTO(T(4, 2), [['"NÃO', W(4, 2, 'nao')], ['ACREDITO', W(4, 2, 'acredito')], ['NO', W(4, 2, 'no')], ['QUE', W(4, 2, 'que')], ['ACONTECEU"', W(4, 2, 'aconteceu'), 'a']], { bg: COR.roxo, fs: 140 });
F(T(4, 3), 'v30', { txt: 'NINGUÉM DIGITA ISSO', tt: W(4, 3, 'ninguem'), cor: 'r' });
F(T(4, 4), 'v04', { txt: 'QUEM TEM DÚVIDA DIGITA A DÚVIDA', tt: W(4, 4, 'duvida', 1), fs: 90 });
CARTAS(T(4, 5), [['👟', 'como limpar tênis branco', W(4, 5, 'tenis')], ['📱', 'qual celular comprar', W(4, 6, 'celular')], ['🪴', 'planta amarelando', W(4, 7, 'amarelando')]], { titulo: 'O QUE AS PESSOAS DIGITAM', bg: COR.cre });
F(T(4, 8), 'v32', { txt: 'O YOUTUBE NÃO ENTENDE', tt: W(4, 8, 'entender'), fs: 110, cor: 'r' });
F(T(4, 9), 'v37', { txt: 'JUNTA AS DUAS COISAS', tt: W(4, 9, 'coisas'), cor: 'a' });
CARTAS(T(4, 10), [['🔍', 'palavra da busca', W(4, 10, 'encontrado')], ['➕', '', W(4, 10, 'toque')], ['🤔', 'curiosidade', W(4, 10, 'clicado')]], { titulo: 'A FÓRMULA', bg: COR.ver });
TEXTO(T(4, 11), [['COMO', W(4, 11, 'como')], ['LIMPAR', W(4, 11, 'limpar')], ['TÊNIS', W(4, 11, 'tenis')], ['BRANCO', W(4, 11, 'branco')], ['SEM', W(4, 11, 'sem')], ['ESTRAGAR', W(4, 11, 'estragar'), 'a']], { bg: COR.azu, fs: 130 });
F(T(4, 12), 'v14', { txt: 'NÃO PARA NO TÍTULO', tt: W(4, 12, 'titulo'), fs: 115 });
F(T(4, 13), 'v11', { txt: 'A DESCRIÇÃO AJUDA', tt: W(4, 13, 'ajuda'), cor: 'v' });
F(T(4, 14), 'v11', { txt: '2 OU 3 FRASES', tt: W(4, 14, 'frases'), kb: 'in', tr: 'corte' });
F(T(4, 15), 'v00', { txt: 'CAPÍTULOS', tt: W(4, 15, 'capitulos'), cor: 'a' });
F(T(4, 16), 'v30', { txt: 'APARECEM NA BUSCA', tt: W(4, 16, 'busca'), cor: 'v', kb: 'in' });
F(T(4, 17), 'v28', { txt: 'A PORTA QUE FICA ABERTA', tt: W(4, 17, 'aberta'), fs: 105, kb: 'dir', css: 'transform-origin:85% 50%' });
F(T(4, 18), 'vitrine', { txt: 'O TÍTULO É A PLACA', tt: W(4, 18, 'placa'), cor: 'a' });

/* ===== BLOCO 5: jeito 3, série e playlist ===== */
JEITO(5, 3, 'Vídeos em série', 'v29', 'serie');
F(T(5, 1), 'v32', { txt: 'O QUE VER EM SEGUIDA?', tt: W(5, 1, 'seguida'), fs: 110 });
F(T(5, 2), 'v37', { txt: 'A CONTINUAÇÃO NATURAL', tt: W(5, 2, 'continuacao'), fs: 110, cor: 'v' });
F(T(5, 3), 'v24', { txt: 'PULAR DE ASSUNTO', tt: W(5, 3, 'pular'), cor: 'r' });
F(W(5, 3, 'pensa'), 'escadas', { txt: 'PENSA EM SEQUÊNCIA', tt: W(5, 3, 'sequencia'), fs: 110, cor: 'a', kb: 'dir', css: 'transform-origin:80% 50%' });
CARTAS(T(5, 4), [['1️⃣', 'parte um', W(5, 4, 'um')], ['2️⃣', 'parte dois', W(5, 4, 'dois')], ['3️⃣', 'parte três', W(5, 4, 'tres')]], { bg: COR.roxo });
F(T(5, 5), 'escadas', { txt: 'PASSOS DO MESMO PROBLEMA', tt: W(5, 5, 'problema'), fs: 100, kb: 'in', css: 'transform-origin:80% 50%' });
CARTAS(T(5, 6), [['💳', 'sair das dívidas', W(5, 6, 'dividas')], ['🛟', 'reserva de emergência', W(5, 6, 'emergencia')], ['🏦', 'onde guardar', W(5, 6, 'guardar')]], { titulo: 'CANAL DE FINANÇAS', bg: COR.cre });
F(T(5, 7), 'v29', { txt: 'MOTIVO PRA VER O 2º', tt: W(5, 7, 'segundo'), cor: 'v' });
TEXTO(T(5, 8), [['A', W(5, 8, 'a')], ['PLAYLIST', W(5, 8, 'playlist'), 'a'], ['▶️', W(5, 8, 'playlist') + 0.2]], { bg: COR.verm });
F(T(5, 9), 'v14', { txt: 'NOME QUE PARECE BUSCA', tt: W(5, 9, 'busca'), fs: 110 });
F(T(5, 10), 'funil', { txt: 'UM VÍDEO PUXA O OUTRO', tt: W(5, 10, 'puxa'), fs: 110, cor: 'v' });
F(T(5, 11), 'v35', { txt: 'PODEROSO', tt: W(5, 11, 'poderoso'), cor: 'a' });
F(T(5, 12), 'v08', { txt: 'O NOVO ACORDA OS ANTIGOS', tt: W(5, 12, 'antigos'), fs: 100, cor: 'v' });
F(W(5, 12, 'voltar'), 'v27', { txt: 'VOLTA PRO COMEÇO', tt: W(5, 12, 'comeco'), fs: 115 });
F(T(5, 13), 'v28', { txt: 'CADA ANTIGO VIRA UMA PORTA', tt: W(5, 13, 'porta'), fs: 100, cor: 'a' });

/* ===== BLOCO 6: jeito 4, ligar um vídeo no outro ===== */
JEITO(6, 4, 'Ligar um vídeo no outro', 'funil', 'ligue');
F(T(6, 1), 'vitrine', { txt: 'O CANAL É UMA LOJA', tt: W(6, 1, 'loja'), cor: 'a', kb: 'in' });
F(T(6, 2), 'v26', { txt: 'ENTRA, COMPRA, VAI EMBORA', tt: W(6, 2, 'embora'), fs: 100, cor: 'r' });
F(T(6, 3), 'marcas', { txt: 'PASSEAR PELAS PRATELEIRAS', tt: W(6, 3, 'prateleiras'), fs: 100, cor: 'v' });
F(T(6, 4), 'v15', { txt: 'FERRAMENTAS GRÁTIS', tt: W(6, 4, 'gratis'), cor: 'a' });
CARTAS(T(6, 5), [['🎬', 'tela final', W(6, 5, 'tela')], ['🃏', 'cards', W(6, 6, 'cards')], ['📌', 'comentário fixado', W(6, 7, 'comentario')], ['🔗', 'links na descrição', W(6, 8, 'links')]], { titulo: '4 LIGAÇÕES', bg: COR.cre, h: 400 });
F(T(6, 9), 'v38', { txt: 'QUALQUER VÍDEO? NÃO', tt: W(6, 9, 'qualquer'), fs: 110, cor: 'r' });
F(T(6, 10), 'escadas', { txt: 'O PASSO SEGUINTE', tt: W(6, 10, 'passo'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
VS(T(6, 11), ['🛟', 'MONTAR A RESERVA'], ['🏦', 'ONDE GUARDAR'], W(6, 11, 'guardar'));
F(T(6, 12), 'v27', { txt: 'DÁ PRA FAZER FALANDO', tt: W(6, 12, 'falando'), fs: 110 });
F(T(6, 13), 'v37', { txt: '"TEM UM VÍDEO SÓ SOBRE ISSO"', tt: W(6, 13, 'inteiro'), fs: 95, cor: 'a' });
F(T(6, 14), 'v39', { txt: 'JÁ SABE PRA ONDE IR', tt: W(6, 14, 'onde'), cor: 'v' });
F(T(6, 15), 'relogio', { txt: 'MAIS TEMPO NO CANAL', tt: W(6, 15, 'aumenta'), fs: 115, cor: 'v' });
F(T(6, 16), 'v08', { txt: 'O ANTIGO VOLTA A VIVER', tt: W(6, 16, 'vida'), fs: 110, cor: 'a' });

/* ===== BLOCO 7: jeito 5, Shorts como trailer ===== */
JEITO(7, 5, 'Shorts como trailer', 'v16', 'shorts');
F(T(7, 1), 'v07', { txt: 'GENTE QUE NUNCA TE VIU', tt: W(7, 1, 'nunca'), fs: 110 });
F(T(7, 2), 'v04', { txt: 'ROLA E ESQUECE', tt: W(7, 2, 'esquece'), cor: 'r' });
F(T(7, 3), 'v36', { txt: 'ABRE UMA CURIOSIDADE', tt: W(7, 3, 'curiosidade'), cor: 'a' });
TEXTO(W(7, 3, 'so'), [['SÓ', W(7, 3, 'so')], ['O', W(7, 3, 'o', 1)], ['LONGO', W(7, 3, 'longo'), 'v'], ['FECHA', W(7, 3, 'fecha')]], { bg: COR.ver });
F(T(7, 4), 'v10', { txt: 'A PARTE MAIS FORTE', tt: W(7, 4, 'forte'), fs: 115 });
F(W(7, 4, 'resposta'), 'v37', { txt: 'VÍDEO COMPLETO NO CANAL', tt: W(7, 4, 'canal'), fs: 100, cor: 'a' });
F(T(7, 5), 'v14', { txt: 'UM DETALHE ESCONDIDO', tt: W(7, 5, 'detalhe'), fs: 110 });
TEXTO(T(7, 6), [['VÍDEO', W(7, 6, 'video')], ['RELACIONADO', W(7, 6, 'relacionado'), 'a'], ['🔗', W(7, 6, 'relacionado') + 0.2]], { bg: COR.verm, fs: 150 });
F(T(7, 7), 'celloja', { txt: 'LINK EM CIMA DO SHORT', tt: W(7, 7, 'link'), fs: 110 });
F(T(7, 8), 'vitrine', { txt: 'UMA PLACA PRO LONGO', tt: W(7, 8, 'placa'), cor: 'v' });
F(T(7, 9), 'v35', { txt: 'FUNCIONA COM VÍDEO VELHO', tt: W(7, 9, 'velho'), fs: 105, cor: 'a' });
F(T(7, 10), 'v09', { txt: 'SEM GRAVAR NADA NOVO', tt: W(7, 10, 'novo'), fs: 110 });
NUM(T(7, 11), 4, { suf: ' SHORTS', lab: 'de um vídeo de 6 meses atrás', dc: 0.6 });
VS(T(7, 12), ['📢', 'SÓ PROPAGANDA'], ['⭐', 'BOM SOZINHO'], T(7, 13));
F(T(7, 14), 'v39', { txt: 'GANHOU E QUER MAIS', tt: W(7, 14, 'mais'), cor: 'v' });

/* ===== BLOCO 8: jeito 6, atualizar o vídeo antigo ===== */
JEITO(8, 6, 'Atualizar o antigo', 'escritorio', 'antigos');
TEXTO(T(8, 1), [['ATUALIZE', T(8, 1) + 0.05, 'a'], ['🔄', T(8, 1) + 0.3]], { bg: COR.ver, fs: 200 });
F(T(8, 2), 'v15', { txt: '1 VEZ POR MÊS', tt: W(8, 2, 'mes'), cor: 'a' });
F(W(8, 2, 'olha'), 'v00', { txt: 'VÍDEOS COM +3 MESES', tt: W(8, 2, 'meses'), fs: 110 });
F(T(8, 3), 'v36', { txt: 'DOIS TIPOS', tt: W(8, 3, 'tipos') });
F(T(8, 4), 'v12', { txt: 'AINDA TEM VIEW TODO DIA', tt: W(8, 4, 'dia'), fs: 105 });
F(T(8, 5), 'v25', { txt: 'ISSO É OURO', tt: W(8, 5, 'ouro'), cor: 'a', tr: 'flash' });
F(T(8, 6), 'v10', { txt: 'CAPRICHA NELE', tt: W(8, 6, 'caprichar'), cor: 'v' });
CARTAS(T(8, 7), [['🖼️', 'miniatura', W(8, 7, 'miniatura')], ['🔍', 'título', W(8, 7, 'titulo')], ['📝', 'descrição', W(8, 7, 'descricao')], ['⏱️', 'capítulos', W(8, 7, 'capitulos')]], { titulo: 'MELHORIAS', bg: COR.cre, h: 400 });
F(T(8, 8), 'escritorio', { txt: 'MAIS CLIQUES', tt: W(8, 8, 'clicado'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
F(T(8, 9), 'v18', { txt: 'BOM ASSUNTO, EMBALAGEM RUIM', tt: W(8, 9, 'embalagem'), fs: 95 });
F(T(8, 10), 'v04', { txt: 'QUASE NINGUÉM CLICOU', tt: W(8, 10, 'clicou'), cor: 'r' });
CARTAS(T(8, 11), [['🔤', 'título novo', W(8, 11, 'titulo')], ['🖼️', 'miniatura nova', W(8, 11, 'miniatura')]], { bg: COR.azu });
F(T(8, 12), 'v38', { txt: 'NÃO TROCA TODA HORA', tt: W(8, 12, 'hora'), fs: 110, cor: 'r' });
CARTAS(T(8, 13), [['✏️', 'muda', W(8, 13, 'muda')], ['⏳', 'espera', W(8, 13, 'espera')], ['⚖️', 'compara', W(8, 13, 'compara')]], { bg: COR.roxo });
TEXTO(T(8, 14), [['MELHOROU?', W(8, 14, 'melhorou'), 'v'], ['MANTÉM', W(8, 14, 'mantem')]], { bg: COR.ver, fs: 150 });
TEXTO(T(8, 15), [['PIOROU?', W(8, 15, 'piorou'), 'r'], ['VOLTA', W(8, 15, 'volta')]], { bg: COR.verm, fs: 150 });
F(T(8, 16), 'v21', { txt: 'INFORMAÇÃO VELHA?', tt: W(8, 16, 'desatualizada'), fs: 110 });
F(W(8, 16, 'gravar'), 'v10', { txt: 'GRAVA UMA VERSÃO NOVA', tt: W(8, 16, 'versao'), fs: 105, cor: 'v' });
F(T(8, 17), 'v37', { txt: 'UM AJUDA O OUTRO', tt: W(8, 17, 'ajuda'), cor: 'a' });

/* ===== BLOCO 9: fechamento ===== */
CANTO(T(9, 0), 'resumo');
TEXTO(T(9, 0), [['RECAPITULANDO', T(9, 0) + 0.05, 'a']], { bg: COR.esc, fs: 170 });
F(T(9, 1), 'v36', { txt: 'O YOUTUBE NÃO ESQUECEU', tt: W(9, 1, 'esqueceu'), fs: 105 });
F(T(9, 2), 'oceano', { txt: 'INICIAL VIVE DE NOVIDADE', tt: W(9, 2, 'novidade'), fs: 100 });
F(T(9, 3), 'v30', { txt: 'BUSCA E SUGERIDOS: ANOS', tt: W(9, 3, 'sugeridos'), fs: 100, cor: 'v' });
{ const L = [[4, 'v36', '1. PERGUNTA QUE SE REPETE'], [5, 'v30', '2. PALAVRAS DA BUSCA'], [6, 'v29', '3. VÍDEOS EM SÉRIE'], [7, 'funil', '4. LIGAR UM NO OUTRO'], [8, 'v16', '5. SHORTS COMO TRAILER'], [9, 'escritorio', '6. ATUALIZAR O ANTIGO']];
  L.forEach(([f, im, txt], i) => F(f === 4 ? W(9, 4, 'um') : T(9, f), im, { txt, tt: (f === 4 ? W(9, 4, 'um') : T(9, f)) + 0.05, fs: 100, tr: i % 2 ? 'whipL' : 'whipR', treme: false, cor: i === 5 ? 'a' : 'b' }));
}
F(T(9, 10), 'v17', { txt: 'NÃO PRECISA DOS 6 AMANHÃ', tt: W(9, 10, 'amanha'), fs: 100 });
CARTAS(T(9, 11), [['📂', 'vídeo antigo com view', W(9, 11, 'antigo')], ['✏️', 'título e descrição', W(9, 11, 'titulo')], ['📅', 'hoje', W(9, 11, 'hoje')]], { titulo: 'COMEÇA POR AQUI', bg: COR.cre });
VS(T(9, 12), ['📅', 'SÓ O VÍDEO DA SEMANA'], ['👷', 'FUNCIONÁRIO POR ANOS'], W(9, 12, 'funcionario'));
F(T(9, 13), 'v27', { txt: 'COMO VOCÊ FAZ E CUIDA', tt: W(9, 13, 'cuida'), fs: 110, cor: 'v' });
F(T(9, 14), 'v34', { txt: 'INSCREVA-SE', tt: W(9, 14, 'inscreve'), cor: 'a', tr: 'flash' });
F(T(9, 15), 'v36', { txt: 'QUAL VOCÊ VAI ATUALIZAR?', tt: W(9, 15, 'atualizar'), fs: 105 });
F(T(9, 16), 'v39', { txt: 'EU LEIO TODOS', tt: W(9, 16, 'leio'), cor: 'v' });

fechar();
