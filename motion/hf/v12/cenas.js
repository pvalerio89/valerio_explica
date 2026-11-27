/* Vídeo 12: 7 erros que travam canal pequeno no YouTube.
   Estilo dinâmico (motor do vídeo 10). Imagens em img/: ilustrações do Google Flow dos vídeos 10 (vNN) e 11 (nomes). */
const F = (t, n, o = {}) => FOTO(t, 'img/' + n + '.jpg', o);
const ERRO = (b, n, nome, img, palavra) => {
  CANTO(T(b, 0), `erro ${n}/7`);
  NUM(T(b, 0), n, { pre: 'ERRO ', lab: nome, dc: 0.5, tr: 'flash' });
  F(W(b, 0, palavra), img, { txt: nome.toUpperCase(), tt: W(b, 0, palavra) + 0.05, fs: 105, cor: 'a', tr: 'punch' });
};

/* ===== BLOCO 1: gancho ===== */
F(T(1, 0), 'v23', { txt: '1 ANO POSTANDO', tt: W(1, 0, 'ano'), tr: 'flash', kb: 'in' });
NUM(W(1, 0, 'vinte'), 20, { suf: ' VIEWS', lab: 'por vídeo', dc: 0.6, cor: 'r' });
F(T(1, 1), 'v38', { txt: '"É O ALGORITMO"', tt: W(1, 1, 'algoritmo'), fs: 120 });
F(T(1, 2), 'v32', { txt: 'ELE NÃO TEM RAIVA', tt: W(1, 2, 'raiva'), fs: 115, kb: 'out' });
F(T(1, 3), 'v30', { txt: 'ELE TENTA ADIVINHAR', tt: W(1, 3, 'adivinhar'), fs: 110, cor: 'a' });
F(T(1, 4), 'v36', { txt: 'SINAL CONFUSO', tt: W(1, 4, 'confuso'), cor: 'r' });
TEXTO(T(1, 5), [['VEM', W(1, 5, 'vem')], ['DE', W(1, 5, 'de')], ['ERROS', W(1, 5, 'erros'), 'r']], { bg: COR.esc });
F(T(1, 6), 'v22', { txt: 'PEQUENOS E REPETIDOS', tt: W(1, 6, 'repetem'), fs: 110 });
F(T(1, 7), 'v21', { txt: 'UM JÁ ATRAPALHA', tt: W(1, 7, 'atrapalha'), fs: 115 });
F(T(1, 8), 'v05', { txt: 'O CANAL TRAVA', tt: W(1, 8, 'trava'), cor: 'r', kb: 'in' });
F(T(1, 9), 'v17', { txt: 'TEM CONSERTO', tt: W(1, 9, 'conserto'), cor: 'v' });
TEXTO(T(1, 10), [['E', T(1, 10) + 0.05], ['É', W(1, 10, 'e', 1)], ['DE', W(1, 10, 'de')], ['GRAÇA', W(1, 10, 'graca'), 'v']], { bg: COR.ver });
NUM(T(1, 11), 7, { suf: ' ERROS', lab: 'que travam canal pequeno', tr: 'punch' });
CARTAS(T(1, 12), [['🔍', 'por que trava', W(1, 12, 'trava')], ['🔧', 'o que fazer no lugar', W(1, 12, 'fazer')]], { titulo: 'EM CADA ERRO', bg: COR.cre });
TEXTO(T(1, 13), [['ATENÇÃO', W(1, 13, 'atencao'), 'a'], ['NO', W(1, 13, 'no')], ['5º', W(1, 13, 'quinto'), 'r']], { bg: COR.verm });
F(T(1, 14), 'v04', { txt: 'QUASE TODO MUNDO FAZ', tt: W(1, 14, 'mundo'), fs: 110 });
F(T(1, 15), 'v36', { txt: 'PARECE CERTO...', tt: W(1, 15, 'certa'), cor: 'a', kb: 'out' });

/* ===== BLOCO 2: erro 1, falar pra todo mundo ===== */
ERRO(2, 1, 'Pra todo mundo', 'oceano', 'todo');
F(T(2, 1), 'v36', { txt: 'PARECE LÓGICO', tt: W(2, 1, 'logico') });
F(T(2, 2), 'v07', { txt: 'MAIS GENTE = MELHOR?', tt: W(2, 2, 'melhor'), fs: 115 });
TEXTO(T(2, 3), [['ERRADO', T(2, 3) + 0.05, 'r']], { bg: COR.verm, fs: 230 });
TEXTO(T(2, 4), [['PRA', W(2, 4, 'pra')], ['TODO', W(2, 4, 'todo')], ['MUNDO', W(2, 4, 'mundo')], ['=', W(2, 4, 'nao')], ['NINGUÉM', W(2, 4, 'ninguem'), 'r']], { bg: COR.esc, fs: 160 });
F(T(2, 5), 'v14', { txt: 'OLHA A DIFERENÇA', tt: W(2, 5, 'diferenca'), cor: 'a' });
VS(T(2, 6), ['🍳', 'DICAS DE COZINHA'], ['🍱', '5 MARMITAS GASTANDO POUCO'], T(2, 7));
F(W(2, 7, 'fala'), 'v37', { txt: 'ALGUÉM ESPECÍFICO', tt: W(2, 7, 'especifico'), fs: 115, cor: 'v' });
CARTAS(T(2, 8), [['💼', 'trabalha fora', W(2, 8, 'trabalha')], ['⏱️', 'sem tempo', W(2, 8, 'tempo')], ['💰', 'quer economizar', W(2, 8, 'economizar')]], { titulo: 'QUEM É ESSA PESSOA', bg: COR.azu });
F(T(2, 9), 'v29', { txt: '"ISSO É PRA MIM"', tt: W(2, 9, 'mim'), cor: 'a' });
F(T(2, 10), 'v32', { txt: 'O YOUTUBE PRECISA ENTENDER', tt: W(2, 10, 'entender'), fs: 100 });
F(T(2, 11), 'v30', { txt: 'PRA QUEM MOSTRAR?', tt: W(2, 11, 'mostrar'), cor: 'a', kb: 'in' });
F(T(2, 12), 'v06', { txt: 'PÚBLICO CLARO', tt: W(2, 12, 'claro'), fs: 120, cor: 'v' });
F(W(2, 12, 'achar'), 'funil', { txt: 'AS PESSOAS CERTAS', tt: W(2, 12, 'certas'), fs: 115 });
F(T(2, 13), 'v08', { txt: 'ASSISTEM ATÉ O FIM', tt: W(2, 13, 'fim'), fs: 115 });
F(W(2, 13, 'mostra'), 'relogio', { txt: 'MAIS GENTE PARECIDA', tt: W(2, 13, 'parecida'), fs: 110, cor: 'v' });
TEXTO(T(2, 14), [['O', T(2, 14) + 0.05], ['CONSERTO', W(2, 14, 'conserto'), 'v'], ['🔧', W(2, 14, 'simples')]], { bg: COR.ver });
CARTAS(W(2, 15, 'escreve'), [['🎯', 'pra quem?', W(2, 15, 'quem')], ['❓', 'qual problema?', W(2, 15, 'problema')]], { titulo: 'ESCREVE NUMA FRASE', bg: COR.cre });
F(T(2, 16), 'v38', { txt: 'O ESPECTADOR TAMBÉM NÃO', tt: W(2, 16, 'conseguir'), fs: 100, cor: 'r' });
F(T(2, 17), 'v33', { txt: 'NÃO AGRADA TODO MUNDO', tt: W(2, 17, 'agradando'), fs: 110 });
F(T(2, 18), 'v27', { txt: 'A MELHOR RESPOSTA', tt: W(2, 18, 'resposta'), cor: 'a' });
F(T(2, 19), 'v08', { txt: 'DEPOIS O GRUPO CRESCE', tt: W(2, 19, 'cresce'), fs: 110, cor: 'v', kb: 'in' });

/* ===== BLOCO 3: erro 2, mudar de assunto ===== */
ERRO(3, 2, 'Mudar de assunto toda semana', 'v28', 'assunto');
CARTAS(T(3, 1), [['🎮', 'segunda: jogo', W(3, 1, 'jogo')], ['🍝', 'quarta: receita', W(3, 2, 'receita')], ['✈️', 'sexta: viagem', W(3, 3, 'viagem')]], { titulo: 'MESMO CANAL', bg: COR.roxo });
F(T(3, 4), 'v24', { txt: 'TUDO NO MESMO CANAL', tt: W(3, 4, 'canal'), fs: 110, cor: 'r' });
F(T(3, 5), 'v28', { txt: 'CADA ASSUNTO, UM PÚBLICO', tt: W(3, 5, 'publico'), fs: 100 });
F(T(3, 6), 'v24', { txt: 'VEIO PELO JOGO', tt: W(3, 6, 'jogo'), cor: 'a', kb: 'esq', css: 'transform-origin:20% 50%' });
F(T(3, 7), 'v04', { txt: 'RECEBE UMA RECEITA', tt: W(3, 7, 'receita'), fs: 115 });
TEXTO(W(3, 7, 'anota'), [['📝', W(3, 7, 'anota')], ['NÃO', W(3, 7, 'nao', 1), 'r'], ['QUIS', W(3, 7, 'quis')]], { bg: COR.esc });
F(T(3, 8), 'v09', { txt: 'INSCRITO QUE NÃO ASSISTE', tt: W(3, 8, 'assistem'), fs: 100 });
F(T(3, 9), 'v32', { txt: 'O YOUTUBE PARA DE CONFIAR', tt: W(3, 9, 'confiar'), fs: 100, cor: 'r' });
F(T(3, 10), 'v36', { txt: 'UM ASSUNTO PRA SEMPRE?', tt: W(3, 10, 'sempre'), fs: 110 });
TEXTO(T(3, 11), [['PRECISA', W(3, 11, 'precisam')], ['TER', W(3, 11, 'ter')], ['LIGAÇÃO', W(3, 11, 'ligacao'), 'a'], ['🔗', W(3, 11, 'ligacao') + 0.2]], { bg: COR.azu });
F(T(3, 12), 'v29', { txt: 'MOTIVO PRA VER O PRÓXIMO', tt: W(3, 12, 'proximo'), fs: 100, cor: 'v' });
F(T(3, 13), 'v14', { txt: 'O TESTE', tt: W(3, 13, 'testar'), cor: 'a', tr: 'flash' });
F(W(3, 13, 'assistiu'), 'v39', { txt: 'SEU MELHOR VÍDEO', tt: W(3, 13, 'melhor'), fs: 115 });
F(T(3, 14), 'v36', { txt: 'CLICARIA NOS OUTROS 3?', tt: W(3, 14, 'tres'), fs: 110, cor: 'a' });
F(T(3, 15), 'v24', { txt: 'VÍDEOS BRIGANDO', tt: W(3, 15, 'brigando'), cor: 'r', kb: 'in' });
TEXTO(T(3, 16), [['UM', W(3, 16, 'um')], ['TEMA', W(3, 16, 'tema'), 'a'], ['PRINCIPAL', W(3, 16, 'principal')]], { bg: COR.ver });
CARTAS(T(3, 17), [['🍱', 'marmita', W(3, 17, 'marmita')], ['🥪', 'lanche', W(3, 17, 'lanche')], ['🎂', 'festa', W(3, 17, 'festa')], ['🛒', 'compra do mês', W(3, 17, 'compra')]], { titulo: 'COZINHA BARATA', bg: COR.cre, h: 400 });
F(T(3, 18), 'v27', { txt: 'A PESSOA É A MESMA', tt: W(3, 18, 'mesma'), cor: 'v' });

/* ===== BLOCO 4: erro 3, copiar canal gigante ===== */
ERRO(4, 3, 'Copiar canal gigante', 'v01', 'copiar');
F(T(4, 1), 'v01', { txt: 'MILHÕES DE INSCRITOS', tt: W(4, 1, 'milhoes'), fs: 115, kb: 'in' });
CARTAS(W(4, 1, 'reagindo'), [['😱', 'reagindo a...', W(4, 1, 'reagindo')], ['☕', 'um dia na minha vida', W(4, 1, 'dia')]], { bg: COR.roxo });
F(T(4, 2), 'v39', { txt: 'FUNCIONA PRA ELE', tt: W(4, 2, 'funciona'), cor: 'v' });
F(T(4, 3), 'v10', { txt: 'VOCÊ FAZ IGUAL', tt: W(4, 3, 'igual') });
F(T(4, 4), 'v38', { txt: 'NÃO FUNCIONA', tt: W(4, 4, 'funciona'), cor: 'r', kb: 'out' });
F(T(4, 5), 'v36', { txt: 'SABE POR QUÊ?', tt: W(4, 5, 'que'), cor: 'a' });
VS(T(4, 6), ['📚', 'O ASSUNTO'], ['⭐', 'A PESSOA'], T(4, 7));
F(T(4, 8), 'v01', { txt: 'JÁ CONHECE E GOSTA', tt: W(4, 8, 'gosta'), fs: 115 });
F(T(4, 9), 'v07', { txt: 'QUALQUER ASSUNTO', tt: W(4, 9, 'qualquer'), fs: 120 });
F(T(4, 10), 'v33', { txt: 'CANAL PEQUENO NÃO TEM', tt: W(4, 10, 'tem'), fs: 105, cor: 'r' });
TEXTO(T(4, 11), [['NINGUÉM', W(4, 11, 'ninguem'), 'r'], ['CLICA', W(4, 11, 'clica')], ['PORQUE', W(4, 11, 'porque')], ['É', W(4, 11, 'e')], ['SEU', W(4, 11, 'seu', 1)]], { bg: COR.esc, fs: 160 });
CARTAS(T(4, 12), [['🛠️', 'resolver um problema', W(4, 12, 'problema')], ['🤔', 'matar uma curiosidade', W(4, 12, 'curiosidade')]], { titulo: 'O TÍTULO PROMETE', bg: COR.azu });
TEXTO(T(4, 13), [['INVERTE', W(4, 13, 'inverter'), 'a'], ['A', W(4, 13, 'a')], ['ORDEM', W(4, 13, 'ordem')], ['🔄', W(4, 13, 'ordem') + 0.2]], { bg: COR.ver });
F(T(4, 14), 'escadas', { txt: '1º CONFIANÇA', tt: W(4, 14, 'confianca'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
CARTAS(T(4, 15), [['🪜', 'como fazer', W(4, 15, 'como')], ['💲', 'quanto custa', W(4, 15, 'quanto')], ['⚖️', 'qual escolher', W(4, 15, 'qual')], ['💥', 'o que deu errado', W(4, 15, 'errado')]], { titulo: 'ENTREGA CLARA', bg: COR.cre, h: 400 });
F(T(4, 16), 'live', { txt: 'DEPOIS: VÍDEO PESSOAL', tt: W(4, 16, 'pessoais'), fs: 105 });
F(T(4, 17), 'v15', { txt: 'PODE SE INSPIRAR', tt: W(4, 17, 'inspirar'), cor: 'v' });
CARTAS(T(4, 18), [['✂️', 'edição', W(4, 18, 'edicao')], ['🥁', 'ritmo', W(4, 18, 'ritmo')]], { titulo: 'COPIA ISSO', bg: COR.ver });
TEXTO(T(4, 19), [['A', W(4, 19, 'copia')], ['FAMA', W(4, 19, 'fama'), 'r'], ['NÃO', W(4, 19, 'nao', 1)], ['VEM', W(4, 19, 'vem')], ['JUNTO', W(4, 19, 'junto'), 'a']], { bg: COR.verm });

/* ===== BLOCO 5: erro 4, gravar sem pesquisar ===== */
ERRO(5, 4, 'Gravar sem pesquisar', 'v11', 'gravar');
F(T(5, 1), 'v10', { txt: 'O QUE DEU VONTADE', tt: W(5, 1, 'vontade'), fs: 115 });
CARTAS(T(5, 2), [['🎥', 'grava', W(5, 2, 'grava')], ['✂️', 'edita', W(5, 2, 'edita')], ['⏳', 'horas', W(5, 2, 'horas')]], { bg: COR.roxo });
F(T(5, 3), 'v38', { txt: 'NINGUÉM PROCURAVA', tt: W(5, 3, 'procurando'), cor: 'r' });
F(T(5, 4), 'v17', { txt: 'NÃO É COMPLICADO', tt: W(5, 4, 'complicado'), cor: 'v' });
TELA(T(5, 5), 'img/v30.jpg', { txt: 'A BUSCA DO YOUTUBE', tt: W(5, 5, 'busca'), bg: COR.verm });
F(T(5, 6), 'v30', { txt: 'OLHA AS SUGESTÕES', tt: W(5, 6, 'sugestoes'), cor: 'a', kb: 'in' });
F(T(5, 7), 'v07', { txt: 'GENTE DE VERDADE DIGITANDO', tt: W(5, 7, 'digitando'), fs: 95 });
F(T(5, 8), 'v14', { txt: 'OLHA OS VÍDEOS DA BUSCA', tt: W(5, 8, 'busca'), fs: 105 });
F(T(5, 9), 'v35', { txt: 'CANAL PEQUENO COM MUITA VIEW', tt: W(5, 9, 'visualizacoes'), fs: 95, cor: 'a' });
TEXTO(W(5, 9, 'otimo'), [['ÓTIMO', W(5, 9, 'otimo'), 'v'], ['SINAL', W(5, 9, 'sinal')], ['✅', W(5, 9, 'sinal') + 0.2]], { bg: COR.ver });
F(T(5, 10), 'v08', { txt: 'TEM PROCURA', tt: W(5, 10, 'procura'), cor: 'v' });
F(W(5, 10, 'famoso'), 'v33', { txt: 'NÃO PRECISA SER FAMOSO', tt: W(5, 10, 'famoso'), fs: 105 });
F(T(5, 11), 'v15', { txt: 'YOUTUBE STUDIO', tt: W(5, 11, 'studio'), cor: 'a' });
F(W(5, 11, 'aba'), 'v00', { txt: 'ABA DE PESQUISA', tt: W(5, 11, 'pesquisa'), kb: 'in' });
TEXTO(T(5, 12), [['IDEIAS', W(5, 12, 'ideias'), 'a'], ['DE', W(5, 12, 'de')], ['GRAÇA', W(5, 12, 'graca'), 'v']], { bg: COR.azu });
F(T(5, 13), 'whatsapp', { txt: 'OS COMENTÁRIOS', tt: W(5, 13, 'comentarios'), cor: 'a' });
CARTAS(T(5, 14), [['💬', 'dos seus vídeos', W(5, 14, 'seus')], ['👀', 'de outros canais', W(5, 14, 'outros')]], { bg: COR.cre });
F(T(5, 15), 'v29', { txt: 'CADA PERGUNTA = 1 VÍDEO', tt: W(5, 15, 'video'), fs: 105, cor: 'v' });
VS(T(5, 16), ['🔍', '10 MIN DE PESQUISA'], ['😩', '10 HORAS PERDIDAS'], W(5, 16, 'economizar'), { inv: true });

/* ===== BLOCO 6: erro 5, apagar o vídeo que flopou ===== */
ERRO(6, 5, 'Apagar o vídeo que flopou', 'v34', 'cinco');
F(T(6, 1), 'v34', { txt: 'APAGAR O QUE FLOPOU', tt: W(6, 1, 'apagar'), cor: 'r', kb: 'in' });
F(T(6, 2), 'v36', { txt: 'FAZ SENTIDO...', tt: W(6, 2, 'sentido') });
F(T(6, 3), 'v18', { txt: '"LIMPAR O CANAL"', tt: W(6, 3, 'limpar') });
F(T(6, 4), 'v34', { txt: 'APAGA VÁRIOS', tt: W(6, 4, 'varios'), cor: 'r', kb: 'out' });
F(T(6, 5), 'v32', { txt: 'NÃO PUXA O CANAL PRA BAIXO', tt: W(6, 5, 'baixo'), fs: 95, cor: 'v' });
F(T(6, 6), 'v14', { txt: 'UM VÍDEO DE CADA VEZ', tt: W(6, 6, 'cada'), fs: 110 });
TEXTO(T(6, 7), [['APAGAR', W(6, 7, 'apagar'), 'r'], ['NÃO', W(6, 7, 'nao')], ['AJUDA', W(6, 7, 'empurrao')]], { bg: COR.esc });
TEXTO(T(6, 8), [['E', T(6, 8) + 0.05], ['TEM', W(6, 8, 'tem')], ['CUSTO', W(6, 8, 'custo'), 'r'], ['💸', W(6, 8, 'custo') + 0.2]], { bg: COR.verm });
CARTAS(T(6, 9), [['⏱️', 'horas assistidas', W(6, 9, 'horas')], ['💬', 'comentários', W(6, 9, 'comentarios')], ['📈', 'chance de crescer', W(6, 9, 'chance')]], { titulo: 'VOCÊ PERDE', bg: COR.cre });
F(T(6, 10), 'v08', { txt: 'ISSO ACONTECE', tt: W(6, 10, 'acontece'), cor: 'a' });
F(T(6, 11), 'v09', { txt: 'PARADO POR MESES...', tt: W(6, 11, 'meses'), fs: 115 });
F(W(6, 11, 'aparecer'), 'v39', { txt: '...E UM DIA APARECE', tt: W(6, 11, 'aparecer'), fs: 115, cor: 'v' });
F(T(6, 12), 'v36', { txt: 'E O VÍDEO QUE FLOPOU?', tt: W(6, 12, 'flopou'), fs: 110 });
F(T(6, 13), 'v27', { txt: 'APRENDE COM ELE', tt: W(6, 13, 'aprender'), cor: 'v' });
F(T(6, 14), 'v15', { txt: 'ONDE AS PESSOAS SAÍRAM?', tt: W(6, 14, 'sairam'), fs: 105 });
VS(T(6, 15), ['🚪', 'SAÍRAM NO COMEÇO'], ['🎬', 'PROBLEMA: ABERTURA'], T(6, 16));
VS(T(6, 17), ['🙈', 'NINGUÉM CLICOU'], ['🖼️', 'TÍTULO E MINIATURA'], T(6, 18));
F(T(6, 19), 'v00', { txt: 'DÁ PRA TROCAR', tt: W(6, 19, 'trocar'), cor: 'a' });
F(T(6, 20), 'v08', { txt: 'SEGUNDA VIDA', tt: W(6, 20, 'segunda'), cor: 'v', kb: 'in' });
F(T(6, 21), 'v05', { txt: 'NÃO QUER MAIS MOSTRAR?', tt: W(6, 21, 'mostrar'), fs: 110 });
TEXTO(T(6, 22), [['NÃO', W(6, 22, 'nao'), 'a'], ['LISTADO', W(6, 22, 'listado'), 'a'], ['✅', W(6, 22, 'apagar')]], { bg: COR.ver });

/* ===== BLOCO 7: erro 6, trocar inscrição ===== */
ERRO(7, 6, 'Trocar inscrição', 'v19', 'troca');
TEXTO(T(7, 1), [['EU', W(7, 1, 'eu')], ['NO', W(7, 1, 'no')], ['SEU,', W(7, 1, 'seu')], ['VOCÊ', W(7, 1, 'voce')], ['NO', W(7, 1, 'no', 1)], ['MEU', W(7, 1, 'meu'), 'a']], { bg: COR.roxo, fs: 160 });
F(T(7, 2), 'v13', { txt: 'ATALHO PROS MIL?', tt: W(7, 2, 'mil'), fs: 115 });
TEXTO(T(7, 3), [['ARMADILHA', W(7, 3, 'armadilha'), 'r'], ['🪤', W(7, 3, 'armadilha') + 0.2]], { bg: COR.verm, fs: 200 });
F(T(7, 4), 'v07', { txt: 'QUEM ESTÁ NESSES GRUPOS?', tt: W(7, 4, 'grupos'), fs: 105 });
F(T(7, 5), 'v16', { txt: 'SÓ QUER O CLIQUE DE VOLTA', tt: W(7, 5, 'volta'), fs: 100 });
F(T(7, 6), 'v09', { txt: 'NUNCA VÃO ASSISTIR', tt: W(7, 6, 'assistir'), cor: 'r' });
F(T(7, 7), 'v38', { txt: 'NEM GOSTAM DO TEMA', tt: W(7, 7, 'tema'), fs: 115 });
TEXTO(T(7, 8), [['O', T(7, 8) + 0.05], ['PIOR', W(7, 8, 'pior'), 'r']], { bg: COR.esc, fs: 220 });
F(T(7, 9), 'v32', { txt: 'PRIMEIRO PROS INSCRITOS', tt: W(7, 9, 'inscritos'), fs: 105 });
F(T(7, 10), 'v04', { txt: 'NÃO CLICAM', tt: W(7, 10, 'clicam'), cor: 'r' });
F(W(7, 10, 'agradou'), 'v32', { txt: 'NÃO AGRADOU NEM OS INSCRITOS', tt: W(7, 10, 'agradou'), fs: 90, kb: 'out' });
F(T(7, 11), 'v20', { txt: 'ENTREGA DIMINUI', tt: W(7, 11, 'diminui'), cor: 'r' });
F(T(7, 12), 'v31', { txt: 'CONTRA AS REGRAS', tt: W(7, 12, 'regras'), cor: 'r', tr: 'flash' });
TEXTO(W(7, 12, 'engajamento'), [['ENGAJAMENTO', W(7, 12, 'engajamento')], ['FALSO', W(7, 12, 'falso'), 'r'], ['🚫', W(7, 12, 'falso') + 0.2]], { bg: COR.esc, fs: 170 });
F(T(7, 13), 'v21', { txt: 'INSCRITOS SOMEM', tt: W(7, 13, 'sumir'), fs: 120 });
F(W(7, 13, 'risco'), 'v05', { txt: 'CANAL EM RISCO', tt: W(7, 13, 'risco'), cor: 'r' });
F(T(7, 14), 'v07', { txt: 'COMPRAR VIEW?', tt: W(7, 14, 'visualizacao'), cor: 'a' });
F(W(7, 14, 'jogar'), 'v35', { txt: 'DINHEIRO FORA', tt: W(7, 14, 'fora'), cor: 'r' });
CARTAS(T(7, 15), [['🙈', 'não assiste', W(7, 15, 'assiste')], ['🤐', 'não comenta', W(7, 15, 'comenta')], ['🚶', 'não volta', W(7, 15, 'volta')]], { titulo: 'VIEW COMPRADA', bg: COR.verm });
F(T(7, 16), 'v08', { txt: 'MAIS LENTO, MAS FUNCIONA', tt: W(7, 16, 'funciona'), fs: 105, cor: 'v' });
F(T(7, 17), 'jarra', { txt: 'CHEGOU PORQUE GOSTOU', tt: W(7, 17, 'gostou'), fs: 110 });
VS(T(7, 18), ['😴', '1.000 QUE NÃO ASSISTEM'], ['🔥', '100 QUE ASSISTEM'], W(7, 18, 'mil'));

/* ===== BLOCO 8: erro 7, sumir ===== */
ERRO(8, 7, 'Sumir', 'v09', 'sumir');
F(T(8, 1), 'v36', { txt: 'FUNCIONA ASSIM', tt: W(8, 1, 'assim') });
F(T(8, 2), 'v39', { txt: '3 VÍDEOS NUMA SEMANA', tt: W(8, 2, 'semana'), fs: 115, cor: 'a' });
F(T(8, 3), 'v38', { txt: 'SEM RESULTADO', tt: W(8, 3, 'resultado'), cor: 'r' });
F(T(8, 4), 'v09', { txt: 'SOME 1 MÊS', tt: W(8, 4, 'mes'), kb: 'out' });
F(T(8, 5), 'v10', { txt: 'VOLTA, POSTA 2', tt: W(8, 5, 'dois') });
F(T(8, 6), 'v09', { txt: 'SOME DE NOVO', tt: W(8, 6, 'novo'), cor: 'r', kb: 'in' });
F(T(8, 7), 'v12', { txt: 'O PÚBLICO ESQUECE', tt: W(8, 7, 'esquece'), fs: 115 });
TEXTO(T(8, 8), [['QUEM', W(8, 8, 'quem')], ['SOME', W(8, 8, 'some')], ['NÃO', W(8, 8, 'nao'), 'r'], ['APRENDE', W(8, 8, 'aprende')]], { bg: COR.esc, fs: 170 });
CARTAS(T(8, 9), [['🎬', 'fazer', W(8, 9, 'fazer')], ['📊', 'ver os números', W(8, 9, 'numeros')], ['🔧', 'ajustar', W(8, 9, 'ajustar')], ['🔁', 'de novo', W(8, 9, 'novo')]], { titulo: 'O CICLO', bg: COR.ver, h: 400 });
NUM(T(8, 10), 1, { pre: 'VÍDEO ', lab: 'quase sempre ruim', dc: 0.3, cor: 'r' });
NUM(T(8, 11), 10, { pre: 'VÍDEO ', lab: 'já é melhor', dc: 0.5 });
NUM(T(8, 12), 30, { pre: 'VÍDEO ', lab: 'outra coisa', dc: 0.5, cor: 'v' });
F(T(8, 13), 'v38', { txt: 'A MAIORIA DESISTE ANTES', tt: W(8, 13, 'desiste'), fs: 105, cor: 'r' });
F(W(8, 13, 'aprendendo'), 'v27', { txt: 'BEM QUANDO ESTÁ APRENDENDO', tt: W(8, 13, 'aprendendo'), fs: 95 });
TEXTO(T(8, 14), [['NÃO', W(8, 14, 'nao'), 'r'], ['É', W(8, 14, 'e')], ['TODO', W(8, 14, 'todo')], ['DIA', W(8, 14, 'dia'), 'a']], { bg: COR.esc });
F(T(8, 15), 'v29', { txt: 'UM RITMO QUE VOCÊ AGUENTA', tt: W(8, 15, 'aguenta'), fs: 100, cor: 'v' });
VS(T(8, 16), ['💥', '7 NUMA SEMANA E NADA'], ['📅', '1 POR SEMANA SEMPRE'], W(8, 16, 'mais'));
F(T(8, 17), 'cofre', { txt: '2 OU 3 VÍDEOS GUARDADOS', tt: W(8, 17, 'guardados'), fs: 105, cor: 'a' });
F(T(8, 18), 'v25', { txt: 'O CANAL NÃO PARA', tt: W(8, 18, 'para'), cor: 'v' });
TEXTO(T(8, 19), [['TROCA', W(8, 19, 'troca'), 'a'], ['A', W(8, 19, 'a')], ['PERGUNTA', W(8, 19, 'pergunta')]], { bg: COR.roxo });
VS(T(8, 20), ['😞', 'POR QUE NÃO CRESCI?'], ['💡', 'O QUE FIZ MELHOR?'], W(8, 20, 'pergunta'));
F(T(8, 21), 'v37', { txt: 'SEMPRE TEM RESPOSTA', tt: W(8, 21, 'resposta'), cor: 'v' });

/* ===== BLOCO 9: fechamento ===== */
CANTO(T(9, 0), 'resumo');
TEXTO(T(9, 0), [['OS', W(9, 0, 'os')], ['7', W(9, 0, 'sete'), 'a'], ['ERROS', W(9, 0, 'erros')]], { bg: COR.esc });
{ const L = [[1, 'oceano', '1. PRA TODO MUNDO'], [2, 'v28', '2. MUDAR DE ASSUNTO'], [3, 'v01', '3. COPIAR GIGANTE'], [4, 'v11', '4. SEM PESQUISA'], [5, 'v34', '5. APAGAR O QUE FLOPOU'], [6, 'v19', '6. TROCAR INSCRIÇÃO'], [7, 'v09', '7. SUMIR']];
  L.forEach(([f, im, txt], i) => F(T(9, f), im, { txt, tt: T(9, f) + 0.05, fs: 105, tr: i % 2 ? 'whipL' : 'whipR', treme: false, cor: i === 4 ? 'a' : 'b' }));
}
F(T(9, 8), 'v17', { txt: 'CALMA', tt: W(9, 8, 'calma'), cor: 'v', tr: 'flash' });
F(T(9, 9), 'v01', { txt: 'TODO CANAL GRANDE JÁ ERROU', tt: W(9, 9, 'cometeu'), fs: 100 });
F(T(9, 10), 'v15', { txt: 'PERCEBERAM E CONSERTARAM', tt: W(9, 10, 'consertaram'), fs: 100, cor: 'v' });
F(T(9, 11), 'v37', { txt: 'FAZ ASSIM', tt: W(9, 11, 'assim'), cor: 'a' });
CARTAS(T(9, 12), [['☝️', 'escolhe 1 erro', W(9, 12, 'erro')], ['🎬', 'conserta em 3 vídeos', W(9, 12, 'conserta')]], { titulo: 'O PLANO', bg: COR.cre });
TEXTO(T(9, 13), [['SÓ', T(9, 13) + 0.05], ['UM', W(9, 13, 'um'), 'a']], { bg: COR.ver, fs: 230 });
F(T(9, 14), 'escadas', { txt: 'DEPOIS O PRÓXIMO', tt: W(9, 14, 'proximo'), cor: 'v', kb: 'dir', css: 'transform-origin:80% 50%' });
F(T(9, 15), 'v35', { txt: 'NÃO PRECISA DE MILAGRE', tt: W(9, 15, 'milagre'), fs: 105 });
F(T(9, 16), 'v36', { txt: 'PARA DE MANDAR O SINAL ERRADO', tt: W(9, 16, 'errado'), fs: 90, cor: 'r' });
F(T(9, 17), 'v30', { txt: 'SINAL CLARO', tt: W(9, 17, 'claro'), cor: 'v', kb: 'in' });
F(W(9, 17, 'sabe'), 'v32', { txt: 'O YOUTUBE SABE PRA QUEM MOSTRAR', tt: W(9, 17, 'mostrar'), fs: 85 });
F(T(9, 18), 'v34', { txt: 'INSCREVA-SE', tt: W(9, 18, 'inscreve'), cor: 'a', tr: 'flash' });
F(T(9, 19), 'v36', { txt: 'QUAL VOCÊ JÁ COMETEU?', tt: W(9, 19, 'cometeu'), fs: 110 });
F(T(9, 20), 'v39', { txt: 'EU LEIO TODOS', tt: W(9, 20, 'leio'), cor: 'v' });

fechar();
