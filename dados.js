/* ══════════════════════════════════════════════════════════════════════
   Dados do deck — v4 (learning map em 4 páginas)

   Tudo aqui sai da tabela-mestra do slide 8 do .pptx do cliente: 27
   títulos, agrupados pela coluna "Área Tecnológica". São 19 áreas únicas,
   e cada uma vira UMA ilha — o agrupamento não é editorial, é o do
   cliente. Confira com `node scripts/auditar-tabela.mjs "<pptx>"`, que
   cruza os dois lados e reprova qualquer curso, carga ou área que fuja.

   19 ilhas com o teto de 5 por página dão 4 páginas. A divisão é temática,
   para a cena fazer sentido de relance: metalmecânica junta mecânica,
   soldagem e metalurgia; TI e mídia ficam juntas; gestão, obra e
   manutenção idem; química, energia e consumo fecham.

   Os nomes das ilhas são LITERALMENTE os da coluna "Área Tecnológica" —
   foi o pedido do cliente no slide de ajuste. Uma ressalva: a tabela dele
   escreve "Metalmecânica - Mecânica" e "Metalmecânica - mecânica", com e
   sem maiúscula, para a MESMA área. Aqui vale a forma capitalizada, senão
   os três cursos dela se partiriam em duas ilhas.
   ══════════════════════════════════════════════════════════════════════ */

/* ── a única função deste arquivo, e ela está aqui por um motivo ──

   `dados.js` é o único arquivo que a apresentação E a página de ficha do
   PPT carregam juntas. As duas mostram o percentual de cada módulo, e
   antes cada uma arredondava por conta própria — com o mesmo defeito nas
   duas, escrito duas vezes.

   O defeito: arredondar cada módulo isoladamente não fecha 100. Em
   Eletrotécnica dava 99 (9+17+34+22+17); em Panificação dava 101. Eram 10
   dos 27 títulos errando, para os dois lados — e é o tipo de coisa que
   alguém confere na frente do cliente.

   Arredondar "sempre para cima" conserta o 99 e piora o 101. O que fecha
   é o método do MAIOR RESTO: trunca todo mundo para baixo e entrega as
   unidades que sobraram a quem mais perdeu na truncagem. A soma dá 100
   por construção, e nenhum número se afasta mais de 1 ponto do real.

   O desempate é pelo índice, não pela ordem de chegada: assim o mesmo
   curso mostra sempre os mesmos números, em qualquer máquina. */
function fatiasPorcento(valores) {
  const total = valores.reduce((s, v) => s + v, 0);
  if (!total) return valores.map(() => 0);
  const exatas = valores.map(v => v / total * 100);
  const inteiros = exatas.map(Math.floor);
  const sobra = 100 - inteiros.reduce((a, b) => a + b, 0);
  const porResto = exatas
    .map((e, i) => ({ i, resto: e - Math.floor(e) }))
    .sort((a, b) => b.resto - a.resto || a.i - b.i);
  for (let k = 0; k < sobra; k++) inteiros[porResto[k].i]++;
  return inteiros;
}

/* ── capítulos do rodapé ── */
/* "Soluções" entrou em setembro: é o segundo hub, logo depois de O que
   fazemos, na ordem dos slides 13 a 17 do PPT do cliente. */
const CAPS = ['Capa', 'Quem somos', 'Presença', 'O que fazemos', 'Soluções',
              'Cursos Técnicos', 'Detalhamento', 'Fechamento'];

/* ── 03 · unidades no mapa do RJ ──
   4º campo = de que lado o rótulo se ancora no mapa holográfico (t/b/l/r).
   Deixar automático empilharia os nomes na região metropolitana, que
   concentra cinco unidades em pouco espaço. */
const UNIDADES = [
  [16.2, 60.0, 'Resende', 't'],        [20.2, 65.7, 'Barra Mansa', 'b'],
  [24.0, 63.4, 'Volta Redonda', 'r'],  [28.3, 60.0, 'Barra do Piraí', 't'],
  [31.5, 52.5, 'Valença', 't'],        [46.3, 51.6, 'Três Rios', 't'],
  [47.4, 59.7, 'Petrópolis', 'l'],     [53.2, 56.0, 'Teresópolis', 'r'],
  [62.1, 57.2, 'Nova Friburgo', 'r'],  [75.0, 57.2, 'Macaé', 'r'],
  [93.8, 46.5, 'Campos dos Goytacazes', 'l'], [75.1, 20.2, 'Itaperuna', 'r'],
  [74.0, 28.0, 'Santo Antônio de Pádua', 'r'], [38.3, 69.3, 'Nova Iguaçu', 'l'],
  [43.0, 67.7, 'Duque de Caxias', 'r'], [50.4, 73.1, 'São Gonçalo', 'r'],
  [39.8, 78.7, 'Rio de Janeiro', 'b'], [49.1, 79.8, 'Niterói', 'b'],
  [69.0, 74.2, 'São Pedro da Aldeia', 'r'], [16.2, 79.9, 'Angra dos Reis', 'b'],
  [23.5, 79.5, 'Itaguaí', 'b'],
];

/* ── as 3 cenas do learning map ── */
const PAGINAS = [
    {
      cena: 'ilhas-p1.jpg',
      ilhas: ['gestao', 'ti', 'logist', 'eletro', 'auto', 'mecanica', 'audiovis']
    },
    {
      cena: 'ilhas-p2.jpg',
      ilhas: ['solda', 'refri', 'segur', 'grafica', 'alim', 'civil']
    },
    {
      cena: 'ilhas-p3.jpg',
      ilhas: ['energ', 'quim', 'moda', 'automot']
    },
    {
      cena: 'ilhas-p4.jpg',
      ilhas: ['naval', 'petroq', 'bebidas']
    }
  ];

/* ── 27 títulos técnicos — transcritos da tabela do cliente ──
   [nome, área tecnológica, carga horária, foto] */
const CURSOS = [
    ['Automação Industrial', 'Automação Industrial', 1200, 'automacao-industrial'],
    ['Eletrotécnica', 'Eletroeletrônica', 1200, 'eletrotecnica'],
    ['Mecânica', 'Mecânica Industrial', 1200, 'mecanica'],
    ['Computação Gráfica', 'Gráfica e Mídias Impressas e Digitais', 1200, 'computacao-grafica'],
    ['Produção de Áudio e Vídeo', 'Audiovisual e Animação Digital', 1200, 'audio-video'],
    ['Mecatrônica', 'Automação Industrial', 1200, 'mecatronica'],
    ['Desenvolvimento de Sistemas', 'Tecnologia da Informação - TI', 1200, 'desenvolvimento-sistemas'],
    ['Logística', 'Logística', 1200, 'logistica'],
    ['Planejamento e Controle da Produção', 'Gestão Industrial', 1000, 'pcp'],
    ['Soldagem', 'Metalurgia e Soldagem', 1200, 'soldagem'],
    ['Redes de Computadores', 'Tecnologia da Informação - TI', 1000, 'redes'],
    ['Refrigeração e Climatização', 'Refrigeração e Climatização', 1200, 'refrigeracao'],
    ['Processos Gráficos', 'Gráfica e Mídias Impressas e Digitais', 1200, 'processos-graficos'],
    ['Eletromecânica', 'Mecânica Industrial', 1200, 'eletromecanica'],
    ['Segurança do Trabalho', 'Segurança do Trabalho', 1200, 'seguranca'],
    ['Alimentos', 'Alimentos', 1200, 'alimentos'],
    ['Edificações', 'Construção Civil', 1200, 'edificacoes'],
    ['Sistemas de Energia Renovável', 'Energias Renováveis', 1200, 'energia-renovavel'],
    ['Química', 'Química', 1200, 'quimica'],
    ['Vestuário', 'Moda – Têxtil e Vestuário', 1200, 'vestuario'],
    ['Manutenção Automotiva', 'Automotiva', 1200, 'automotiva'],
    ['Manutenção de Máquinas Industriais', 'Mecânica Industrial', 1200, 'maquinas-industriais'],
    ['Panificação', 'Alimentos', 1200, 'panificacao'],
    ['Produção de Moda', 'Moda – Têxtil e Vestuário', 1000, 'moda'],
    ['Construção Naval', 'Construção Naval', 1200, 'construcaonaval'],
    ['Multimídia', 'Gráfica e Mídias Impressas e Digitais', 1000, 'multimidia'],
    ['Petroquímica', 'Petroquímica e Plástico', 1200, 'petroquimica'],
    ['Cervejaria', 'Bebidas', 1200, 'cervejaria'],
    ['Instrumentação Industrial', 'Automação Industrial', 1200, 'instrumentacaoindustri'],
    ['Modelagem do Vestuário', 'Moda – Têxtil e Vestuário', 1000, 'modelagemdovestuario'],
    ['Design Gráfico', 'Gráfica e Mídias Impressas e Digitais', 1000, 'designgrafico']
  ];

/* ── as 19 ilhas ──
   pag  = índice da página (0,1,2)
   ax/ay = centro do disco na cena, em % da imagem (medido na grade)
   cx/cy = onde o chip de vidro pousa, no piso vazio mais próximo
   areas = quais áreas da tabela essa ilha reúne
   ativo = a ilha responde ao clique. Todas as 19 respondem: com as 27
           fichas vindas do .pptx, não há mais categoria sem conteúdo
           por trás — o que era limite da demo virou a apresentação. */
/* ── as 32 áreas tecnológicas institucionais da Firjan ──
   Transcritas do quadro oficial que veio no .pptx do cliente, NA ORDEM DELE.
   Não confundir com ILHAS: aquilo são as 19 categorias da oferta PROPAG
   2026.2 (tela 05); isto é o alcance institucional que a tela 04 anuncia no
   próprio título — "32 áreas tecnológicas". Eram duas listas diferentes
   mostrando a mesma coisa, e a tela 04 mostrava a errada. */
/* ── o painel da tela 02 ──
   Seis imagens que se revezam, cada uma com a legenda do que está em
   cena. Antes era um vídeo só, de bancada de automação, com uma legenda
   fixa falando de automação — e o cliente reclamou com razão: a tela
   apresenta a instituição inteira e mostrava uma área.

   `selo` é opcional de propósito. "Indústria 4.0" vale para a célula
   robotizada; numa oficina de soldagem seria enfeite, e enfeite que
   afirma coisa errada. Trecho sem selo simplesmente não mostra selo.

   São SEIS FOTOS, sem vídeo. Passaram por aqui, nesta ordem: um vídeo só;
   depois vídeo + fotos de curso; depois vídeo + quadros do filme
   institucional dos 200 anos. Agora são as seis imagens que o cliente
   mandou, e elas cobrem seis áreas diferentes — que era o pedido desde a
   primeira reclamação. O movimento fica por conta do zoom lento de cada
   foto (ver .painelFoto no HTML).

   Elas ficam em assets/painel/ e não em assets/cursos/ porque o
   empacotador reduz as fotos de curso a 560px — largura de miniatura de
   vitrine. O painel tem 919px de palco e projeta; estas vão a 1120px.

   Quatro das seis já vieram em 1600x1244, que é a proporção exata do
   painel. A de solda robotizada é quadrada e a da linha automotiva é
   1,40 — nessas duas o recorte pega o centro.

   Marca da Firjan no quadro NÃO é problema — é material da casa, e vê-la
   só reforça a procedência. O que não pode é marca CORTADA ao meio: aí lê
   como defeito, não como assinatura. Ou entra inteira, ou não entra.

   TODA imagem nova precisa ser conferida ampliada antes de entrar. Marca
   de TERCEIRO é que não pode: num material institucional da Firjan ela
   sugere uma parceria que não existe. Dois clipes já foram descartados
   assim — um tinha logotipo da Tony's Chocolonely no jaleco, o outro uma
   marca estampada na camiseta do soldador. Licença de banco de imagem
   cobre a filmagem, não as marcas dentro dela. */
/* As seis imagens vieram do cliente. Cada uma foi casada com um curso que
   EXISTE na oferta — nenhuma legenda afirma área que o deck não vende:

     subestação        → Eletrotécnica          (Eletroeletrônica)
     eólicas           → Sistemas de Energia Renovável
     pães              → Panificação            (Alimentos)
     solda robotizada  → Automação Industrial   (Automação e Mecatrônica)
     linha automotiva  → Manutenção Automotiva  (Automotiva)
     solda subaquática → Soldagem               (Metalmecânica - Soldagem)

   A subaquática é a única que precisou de checagem: mergulho não é módulo
   de curso nenhum. Mas a ficha de Soldagem, escrita pelo próprio cliente,
   já diz que a área tem oportunidades em "naval" e "petróleo e gás" — a
   legenda repete o que o material dele afirma, e nada além.

   O selo fica só na solda robotizada. Célula robotizada é Indústria 4.0 de
   verdade; pôr o mesmo selo numa bancada de panificação seria enfeite que
   afirma coisa errada. */
/* ══════════════ os hubs: "O que fazemos" e "Soluções" ══════════════

   Duas telas que não mostram conteúdo próprio — elas ABREM conteúdo. Cada
   uma tem sub-telas que se percorrem para o lado, e o trilho vertical da
   apresentação só volta a andar quando a pessoa sai do hub. Foi a decisão
   da reunião de 03/09: manter o usuário na mesma sessão em vez de somar
   treze slides ao percurso principal.

   Por que uma lista de dados e não treze telas escritas à mão: as sub-telas
   têm a mesma estrutura e mudam só o conteúdo. Escritas à mão, cada ajuste
   de layout viraria treze edições — e é justamente o "template escalável"
   que o Ricardo pediu para reaproveitar nos próximos projetos.

   `tipo` diz ao app (hubs.js) como montar:
     texto        prosa, número em destaque opcional, e um painel de mídia
                  (`video` e/ou `fotos`, que se revezam)
     infografico  arte gerada + rótulos por cima, como a SAGA
     slider       itens que se percorrem, um por vez, cada um com vídeo
     galeria      capas de material (`pasta` + `imagens`); clicar amplia
     link         blocos de texto e um endereço externo
     grupo        não é tela: junta sub-telas sob um nome (Espaços de
                  inovação) e vira um cartão no hub

   TODO texto aqui é o do .pptx do cliente, como está escrito nos slides 5
   a 17 — resumo nosso não entra. As únicas mexidas: travessão vira outra
   pontuação, e erro de digitação óbvio é corrigido ("Gameficação",
   "seguimentos"), sempre avisando.

   Mídia: `video` é assets/video/<nome>.mp4; `fotos`, `poster` e `capa`
   são caminhos dentro de assets/. Tudo que vem do .pptx é extraído por
   scripts/extrair-midia-hubs.mjs — não se copia à mão.

   `peca` é o arquivo em assets/pecas/. Quando não existe ainda, a tela
   monta com um lugar reservado no lugar — nada quebra, e o
   `conferir-lacunas` cobra a arte que falta.

   `capa` e `sub` de cada parte de primeiro nível são o cartão dela no hub. */
const SECOES = [
  { id: 'fazemos', tela: 3, nome: 'O que fazemos',
    partes: [

    { id: 'modalidades', nome: 'Modalidades', tipo: 'infografico',
      /* rótulos no dobro do tamanho (pedido do André, 21/09): a cena é
         larga e o texto das caixas ficava miúdo na projeção */
      rotEscala: 1.45,
      capa: 'hub/modalidades-cena.jpg', sub: 'Da iniciação ao aperfeiçoamento',
      /* fundo, e não peça: a escada foi gerada JUNTO com o galpão
         (insumos/prompts/cena-modalidades.md). A peça recortada posta sobre
         o galpão comum não casava com ele quando mudou de tamanho: outra
         escala, outra luz. O painel troca o fundo ao entrar aqui. */
      fundo: 'hub/modalidades-cena.jpg', rotW: 420,
      /* slide 5. A reunião decidiu: o texto que está ali JÁ é o resumo
         final da timeline, então vai inteiro, sem popup por etapa. */
      lead: 'Nossas opções de formação, desenhadas para atender a diferentes ' +
            'momentos de carreira, desde o primeiro contato com o mercado de ' +
            'trabalho até a especialização técnica aprofundada.',
      /* x/y é um ponto do aro aceso de cada plataforma: ali não há gente,
         então o fio pode morrer nele. dx/dy põe cada caixa junto da SUA
         ilha. As três primeiras flutuam acima das plataformas, sobre a
         parede do fundo, numa segunda escada paralela à das ilhas; a altura
         diferente é o que as separa. Cursos Técnicos (o destaque, porque é
         o assunto do deck inteiro) fica no piso dentro do arco da esteira,
         e Aperfeiçoamento à direita da ilha mais alta, sobre a janela: em
         cima dela estão o homem do VR e a navegação. Nenhum fio passa por
         pessoa. */
      etapas: [
        { n: 'Cursos de Iniciação', x: 24.5, y: 81, dx: -6, dy: -16,
          d: 'Destinados a quem deseja ter o primeiro contato com uma área profissional.' },
        { n: 'Aprendizagem Industrial', x: 44.5, y: 72.5, dx: -10, dy: -25,
          d: 'Modalidade que une teoria na sala de aula e prática no chão de fábrica, em conformidade com a Lei da Aprendizagem. É voltada para jovens (geralmente entre 14 e 24 anos).' },
        { n: 'Cursos de Qualificação', x: 57, y: 59, dx: -1, dy: -37,
          d: 'Preparam o aluno para ingressar e atuar diretamente em uma profissão específica. Desenvolvem habilidades técnicas e práticas essenciais para o exercício de um ofício.' },
        /* w próprio: em 300px o texto dá 7 linhas, passa do limite do
           text-wrap:balance do navegador e o "atuação." ficava sozinho */
        { n: 'Cursos Técnicos', x: 67, y: 48.5, dx: -1, dy: 27, forte: 1, w: 380,
          d: 'Oferecem formação profissionalizante de nível médio, com uma grade curricular mais ampla, teórica e aprofundada. Conferem diploma de Técnico e habilitam o profissional a assumir responsabilidades maiores, gerenciar processos e executar projetos complexos em sua área de atuação.' },
        { n: 'Cursos de Aperfeiçoamento', x: 79.5, y: 34, dx: 6, dy: -3,
          d: 'Focados em profissionais que já atuam na área ou possuem conhecimento prévio e buscam atualização tecnológica, aprendizado de novas técnicas ou especialização em processos específicos.' },
      ] },

    { id: 'espacos', nome: 'Espaços de inovação', tipo: 'grupo',
      capa: 'hub/fablab-1.jpg', sub: 'FabLab, Indústria 4.0, SAGA e Unidades Móveis', partes: [
      /* slide 6. "projetos os desafios da indústria" no original: sobrou
         uma palavra na revisão dele, e a frase fica sem sentido com ela. */
      { id: 'fablab', nome: 'FabLab e SENAI Lab', tipo: 'texto', numero: '30',
        rotulo: 'FabLab em toda a rede da Firjan SENAI',
        fotos: ['hub/fablab-1.jpg', 'hub/fablab-2.jpg'],
        /* legendas: uma por mídia, na ordem em que aparecem (o vídeo, se
           houver, e depois as fotos). Não vêm do PPT, que não legenda as
           fotos: descrevem o que a imagem mostra, e o cliente valida. */
        legendas: ['Estudantes desenvolvendo projetos no FabLab',
                   'Bancadas de prototipagem do SENAI Lab'],
        lead: 'O FabLab e SENAI Lab é um espaço colaborativo e criativo, ' +
              'equipado com tecnologias de ponta como impressoras 3D, cortadoras ' +
              'a laser e fresadoras CNC, projetado para tirar ideias do papel e ' +
              'transformá-las em soluções reais.',
        corpo: 'Inspirado na cultura maker e no conceito de "aprender fazendo", ' +
               'o ambiente conecta estudantes, empreendedores e indústrias, ' +
               'servindo como um polo de inovação e prototipagem rápida. É no ' +
               'FabLab que os desafios da indústria ganham forma, permitindo que ' +
               'os alunos testem, validem e aperfeiçoem produtos e processos em ' +
               'um ecossistema que estimula a autonomia, o pensamento crítico e a ' +
               'aplicação prática das tecnologias da Indústria 4.0.' },

      /* slide 7: o vídeo é o do próprio slide, com as legendas dele */
      { id: 'i40', nome: 'Indústria 4.0', tipo: 'texto',
        video: 'i40', poster: 'hub/i40-poster.jpg',
        /* regra das telas de texto com mídia: TODA mídia do slide entra, em
           sequência (o vídeo e depois as fotos, em roda) */
        fotos: ['hub/i40-1.jpg', 'hub/i40-3.jpg', 'hub/i40-2.jpg'],
        legendas: ['Célula Smart 4.0 em operação: armazenamento automatizado dos blocos',
                   'Módulos de estoque e processo da linha Smart 4.0',
                   'Estação da linha Smart 4.0',
                   'Esteira e painéis de controle da linha integrada'],
        lead: 'A Quarta Revolução Industrial não é apenas um tema de estudo no ' +
              'SENAI; é o próprio ambiente onde o aprendizado acontece.',
        corpo: 'Integrar tecnologias como Internet das Coisas (IoT), Inteligência ' +
               'Artificial, Manufatura Avançada, Big Data e Digital Twins à ' +
               'educação profissional é o nosso compromisso para garantir que os ' +
               'estudantes estejam sempre um passo à frente das exigências do ' +
               'mercado global. No SENAI, a Indústria 4.0 é vivenciada na ' +
               'prática, transformando a sala de aula em um ecossistema de ' +
               'inovação contínua.' },

      { id: 'saga', nome: 'SAGA SENAI de Inovação', tipo: 'infografico',
        /* fundo, e não peça: a trilha foi gerada junto com o galpão
           (insumos/prompts/cena-saga.md), como a de Modalidades. A peça
           recortada sobre o galpão comum não casava com ele e tomava o
           espaço do texto de abertura. */
        fundo: 'hub/saga-cena.jpg',
        /* rótulos compactos (ícone ao lado): as cenas da faixa do meio sobem
           até o vão entre as faixas, e a caixa alta não cabia ali */
        rotCompacto: 1,
        /* a cena sobe 4%: a cabeça dos mentores quase encosta no cartão do
           título e as caixas de baixo ganham margem da borda */
        fundoY: -1,
        /* slide 8, inteiro */
        lead: 'A SAGA SENAI de Inovação é uma iniciativa nacional que integra o ' +
              'ambiente educacional às demandas reais do setor produtivo, ' +
              'transformando desafios técnicos, operacionais e de sustentabilidade ' +
              'das indústrias em oportunidades de aprendizagem aplicada. Por meio ' +
              'do programa Conecta Indústria, as empresas cadastram ' +
              'situações-problema reais e equipes multidisciplinares de ' +
              'estudantes, orientadas por docentes, utilizam seus conhecimentos ' +
              'para desenvolver soluções inovadoras e viáveis.',
        etapas: [
          /* A cena é uma serpentina de três faixas (insumos/prompts/cena-saga.md,
             versão 3), com um anel ciano sob cada cena. x/y é o anel: o fio
             pousa nele. Os rótulos ficam em linhas:
             · faixa de cima: Demandas à esquerda da fábrica e Start à direita
               da lâmpada, na mesma altura (y 24);
             · faixa do meio: Grand Prix e Protótipo logo abaixo da estrada
               (y 70,5); Integra à direita da mesa, acima da curva, porque
               embaixo dela está a apresentação;
             · faixa de baixo: Aceleração e Inova abaixo da estrada (y 96).
             As notas ficam junto de quem elas descrevem: mentores na margem
             esquerda, novas equipes abaixo do grupo das lâmpadas. */
          { n: 'Start', marco: 1, x: 78.5, y: 31, dx: 7.5, dy: -11 },
          { n: 'Demandas da Indústria', icone: 'predio', x: 55, y: 30, dx: -13, dy: -10,
            d: 'Os problemas propostos pelas indústrias para as equipes' },
          { n: 'Grand Prix', icone: 'trofeu', x: 35, y: 56, dx: 0, dy: 10.5,
            d: 'Uma maratona de inovação onde as soluções são encontradas' },
          { n: 'Protótipo Sujo', icone: 'impressora', x: 54, y: 56, dx: 3, dy: 10.5,
            d: 'No GP os primeiros protótipos são construídos' },
          { n: 'Integra SENAI', icone: 'equipe', x: 79.5, y: 57, dx: 8, dy: -6, forte: 1,
            d: 'As equipes criam projetos integradores e protótipos funcionais' },
          { n: 'Inova SENAI', icone: 'crescimento', x: 70, y: 82, dx: 0, dy: 5,
            d: 'O modelo de negócio é construído e apresentado a investidores' },
          { n: 'Aceleração', icone: 'foguete', x: 18, y: 82, dx: -3, dy: 5,
            d: 'Suporte para acelerar o crescimento e entrar no mercado' },
        ],
        notas: [
          { t: 'Docentes e profissionais da indústria atuam como mentores', icone: 'pessoas', x: 12, y: 64, w: 250 },
          { t: 'Novas equipes e novas ideias podem entrar na trilha', icone: 'ciclo', x: 32, y: 88 },
        ] },

      /* slide 9. O número é o do slide 9 (31); a tela 03 diz 30 unidades
         móveis — divergência avisada, não corrigida por conta própria. */
      { id: 'moveis', nome: 'Unidades Móveis', tipo: 'texto', numero: '31',
        rotulo: 'Unidades Móveis do SENAI',
        video: 'moveis', poster: 'hub/moveis-1.jpg',
        fotos: ['hub/moveis-1.jpg', 'hub/moveis-3.jpg', 'hub/moveis-2.jpg'],
        legendas: ['Cozinha-escola dentro de uma unidade móvel',
                   'Escola Móvel de Panificação',
                   'Ambiente de panificação montado dentro da carreta',
                   'Unidade móvel de soldagem'],
        lead: 'As Unidades Móveis do SENAI são importantes instrumentos de ' +
              'interiorização, levando infraestrutura especializada diretamente ' +
              'às empresas e municípios do Estado do Rio de Janeiro.',
        corpo: 'Por meio de oficinas, laboratórios itinerantes, ampliam o acesso ' +
               'à qualificação profissional, atendendo indústrias, trabalhadores ' +
               'e comunidades. Atualmente, o SENAI conta com 31 Unidades Móveis, ' +
               'que ampliam o alcance da educação profissional e levam ' +
               'infraestrutura especializada a diferentes regiões. As unidades ' +
               'atuam em diversos segmentos, como metalmecânica, alimentos, ' +
               'automotivo, elétrica, gráfica, tecnologia da informação (TI) e têxtil.',
        url: 'https://firjan.com.br/noticias/escola-movel-de-panificacao-da-firjan-senai-retoma-atividades-em-macae-8AE482919E99FEC6019F60D43E064E9B-00.htm',
        rotuloUrl: 'Ler a notícia da escola móvel de panificação' },
    ] },

    { id: 'recursos', nome: 'Recursos educacionais', tipo: 'grupo',
      /* capa: o quadro de Realidade Virtual, e não o de Realidade Mista —
         esse mostra a marca do fabricante da caldeira */
      capa: 'hub/rv.jpg', sub: 'Digitais, portfólio e customizados', partes: [
      /* slide 10. Cada recurso tem o vídeo que o cliente pôs ao lado dele
         no slide; o casamento vídeo ↔ recurso está em extrair-midia-hubs. */
      { id: 'digitais', nome: 'Recursos Didáticos Digitais', tipo: 'slider',
        /* tema escuro como a tela 03. O vídeo de fundo saiu a pedido do
           cliente (18/09: 'acho que não ficou bom'); no lugar, uma rede
           abstrata em movimento lento, que não disputa com o conteúdo */
        escuro: 1, fundoRede: 1,
        lead: 'No SENAI, a sala de aula vai muito além das quatro paredes e dos ' +
              'livros tradicionais. Nossos Recursos Didáticos Digitais são ' +
              'ferramentas tecnológicas de ponta, desenvolvidas para transformar ' +
              'a teoria em prática imediata e conectar você diretamente com a ' +
              'realidade da Indústria 4.0.',
        corpo: 'Aqui, a tecnologia é a maior aliada do seu aprendizado, permitindo ' +
               'que você visualize o invisível, simule o complexo e pratique o ' +
               'essencial de qualquer lugar e a qualquer momento.',
        itens: [
          /* legendas: uma por vídeo, na ordem de `videos` */
          { n: 'Realidade Virtual', sigla: 'RV', video: 'rv', poster: 'hub/rv.jpg',
            legendas: ['Treinamento em pátio portuário virtual com o Meta Quest'],
            d: 'Uso de Headset Meta QUEST 2 e 3 para proporcionar imersão total em ambientes virtuais tridimensionais.' },
          { n: 'Realidade Mista', sigla: 'RM', video: 'rm', poster: 'hub/rm.jpg',
            legendas: ['Caldeira virtual sobreposta ao ambiente real com o Meta Quest 3'],
            d: 'Uso de Headset Meta QUEST 3, combina elementos reais e virtuais, possibilitando a interação simultânea com equipamentos, ferramentas e ambientes físicos.' },
          /* três vídeos no slide 10 para este recurso: se revezam */
          { n: 'Objetos e Ambientes imersivos', videos: ['objetos', 'navio-sonda', 'triturador'], poster: 'hub/objetos.jpg',
            legendas: ['Turbina a vapor em vista em corte', 'Tour virtual por um navio-sonda',
                       'Triturador de madeira em vista explodida'],
            d: 'Uso de computador para interagir com objetos e ambientes virtuais, proporcionando vistas explodidas de equipamentos e tour virtual.' },
          { n: 'Simulação 3D', video: 'simulacao', poster: 'hub/simulacao.jpg',
            legendas: ['Operação submarina simulada com joystick'],
            d: 'Consiste em atividades práticas realizadas em ambientes virtuais tridimensionais, que reproduzem com fidelidade manobras, operações ou tarefas do mundo real, proporcionando treinamento seguro e imersivo para o desenvolvimento de habilidades profissionais.' },
          { n: 'Gamificação 2D ou 3D', video: 'gamificacao', poster: 'hub/gamificacao.jpg',
            legendas: ['Jogo de operação de uma planta industrial'],
            d: 'Consiste em atividades interativas e lúdicas, desenvolvidas em ambientes bidimensionais ou tridimensionais, com o objetivo de estimular o aprendizado e aprimorar competências em diferentes áreas de atuação.' },
        ] },

      /* slides 11 e 12: só o título e as capas, que é o que o cliente pôs.
         `n` é o título impresso na capa — vira texto alternativo e legenda
         da capa ampliada. */
      { id: 'livros', nome: 'Portfólio', tipo: 'galeria', pasta: 'hub/livros',
        imagens: [
          { f: 'caldeireiro', n: 'Caldeireiro · Módulo Básico' },
          { f: 'instrumentista-industrial', n: 'Instrumentista Industrial' },
          { f: 'eletricista-industrial', n: 'Eletricista Industrial' },
          { f: 'inspetor-de-soldagem-n1', n: 'Inspetor de Soldagem N1' },
          { f: 'mecanico-de-manutencao', n: 'Mecânico de Manutenção' },
          { f: 'pedreiro-refratarista', n: 'Pedreiro Refratarista' },
        ] },

      { id: 'customizados', nome: 'Customizados', tipo: 'galeria', pasta: 'hub/customizados',
        imagens: [
          { f: 'sinaleiro-modulo-especifico', n: 'Sinaleiro · Movimentação de Cargas · Módulo Específico' },
          { f: 'fundamentos-comunicacao-matematica', n: 'Fundamentos de Comunicação e Matemática Aplicada' },
          { f: 'introducao-industria-offshore', n: 'Introdução à Indústria Offshore e Segurança' },
          { f: 'inspecao-equipamentos-cargas', n: 'Inspeção de Equipamentos de Movimento de Cargas' },
          { f: 'sinaleiro-modulo-basico', n: 'Sinaleiro de Movimentação de Cargas · Módulo Básico' },
          { f: 'marketing-digital', n: 'Marketing Digital' },
          { f: 'conteudo-youtube', n: 'Desenvolvimento de Conteúdo para YouTube' },
          { f: 'fotografia-smartphone', n: 'Fotografia Digital com Smartphone' },
          { f: 'projeto-maker', n: 'Empreendedorismo e Projeto Maker' },
        ] },
    ] },
  ] },

  /* slide 13: o texto de abertura é da tela do hub, e o infográfico que o
     cliente pôs no mesmo slide vira a primeira sub-tela */
  { id: 'solucoes', tela: 4, nome: 'Soluções',
    /* a ilustração que abre a tela 05, sob as abas */
    ilustracao: 'hub/solucoes-cena.jpg',
    /* a tela 05 no formato do learning map (insumos/prompts/mapa-solucoes.md):
       uma ilha por solução. a = ponto no meio da ilha, c = centro do chip,
       ambos em % do palco. Enquanto a imagem não existe, a tela segue com a
       ilustração e as abas. */
    /* cena: 'hub/solucoes-mapa.jpg' quando a imagem chegar; null deixa o
       mapa desligado sem pedir um arquivo que não existe */
    mapa: { cena: 'hub/solucoes-mapa.jpg', ilhas: {
      /* nenhum chip pode ficar sobre a cabeça de alguém da cena: a faixa do
         alto (janelas) e o piso entre as fileiras são os lugares livres */
      customizadas: { icone: 'ajuste',      ax: 44.5, ay: 42, cx: 49,   cy: 9.5 },
      ead:          { icone: 'capelo',      ax: 71,   ay: 43, cx: 71,   cy: 12 },
      certificacao: { icone: 'escudo',      ax: 50.5, ay: 76, cx: 61,   cy: 52 },
      competencias: { icone: 'crescimento', ax: 20,   ay: 76, cx: 34,   cy: 55.5 },
      incompany:    { icone: 'predio',      ax: 82.5, ay: 75, cx: 85,   cy: 47 },
    } },
    titulo: 'Soluções customizadas',
    lead: 'As soluções podem contemplar formação, aperfeiçoamento, ' +
          'atualização e desenvolvimento de competências técnicas, com ' +
          'conteúdos, carga horária, metodologia e formato adaptados à ' +
          'realidade da empresa.',
    corpo: 'O resultado é uma capacitação mais assertiva, prática e conectada ' +
           'ao ambiente industrial, contribuindo para o desenvolvimento dos ' +
           'profissionais, o aumento da produtividade e a melhoria dos processos.',
    partes: [

    { id: 'customizadas', nome: 'Soluções customizadas de capacitação', aba: 'Customizadas', tipo: 'infografico',
      capa: 'hub/capa-customizadas.jpg', sub: 'Formação sob medida para gerar resultados',
      /* 40% e centrada no piso (17/09): a 54% a peça subia sobre as estantes
         e a linha da frente passava do rodapé, parecendo voar */
      /* 18/09: cena única com o galpão (insumos/prompts/cena-customizadas.md),
         expandida para deixar chão livre em volta das plataformas */
      fundo: 'hub/customizadas-cena.jpg',
      /* cartão estreito: a técnica da plataforma de Conteúdo fica logo abaixo
         do canto direito do cartão largo */
      cabW: 440,
      /* texto do slide 13. O fluxo vem da imagem que o cliente pôs no
         slide (ppt/media/image52.png): "Necessidade da empresa" entra, a
         Solução customizada fica no centro e cinco dimensões a cercam, cada
         uma com pergunta e itens. Transcrito aqui para virar texto editável
         sobre a peça. Rótulos das dimensões por fora de cada plataforma,
         Benefícios e Valor nos cantos de baixo, Base técnica no alto à
         direita, onde o cliente a pôs. */
      /* título, subtítulo e abertura são os que o cliente escreveu dentro
         do próprio infográfico do slide 13 */
      lead: 'Transformamos o desafio da sua empresa em uma solução de ' +
            'aprendizagem sob medida, com foco em desenvolver competências e ' +
            'gerar impacto real no negócio.',
      /* x/y é a borda da plataforma (onde o fio morre); dx/dy leva o
         rótulo para fora dela, longe das figuras. */
      /* `icone`/`icones`: os mesmos ícones que o cliente pôs em cada caixa
         do infográfico do slide 13 */
      entrada: { n: 'Necessidade da empresa', icone: 'predio', x: 47, y: 36, dx: 0, dy: -22,
                 d: 'Desafios, processos, tecnologias e objetivos estratégicos.' },
      centro: { n: 'Solução customizada', icone: 'equipe', x: 57, y: 66, dx: 9, dy: 19, forte: 1,
                d: 'Capacitação alinhada à realidade da empresa e ao seu negócio.' },
      etapas: [
        /* acima das duas figuras do fundo do galpão (a do carrinho e o
           colega): à esquerda da plataforma, rótulo e fio as cobriam */
        { n: '1. Conteúdo', icone: 'documento', p: 'O que ensinar?', x: 29, y: 49, dx: -17, dy: -4,
          itens: ['Processos', 'Equipamentos', 'Procedimentos', 'Requisitos internos'] },
        { n: '2. Público', icone: 'pessoas', p: 'Para quem?', x: 28, y: 72, dx: -16, dy: -9,
          itens: ['Perfil', 'Experiência', 'Pré-requisitos'] },
        { n: '3. Prática', icone: 'ajuste', p: 'Como aplicar?', x: 72, y: 48, dx: 16, dy: -4,
          itens: ['Casos reais da empresa', 'Simulações', 'Cenários do ativo'] },
        { n: '4. Entrega', icone: 'local', p: 'Onde e como entregar?', x: 74, y: 73, dx: 14, dy: -11,
          itens: ['Local', 'Turno', 'Duração', 'Turma fechada'] },
        /* seq: os itens da Medição são uma sequência no desenho do cliente
           (Aprendizagem › Aplicação › Resultados › Melhoria), os outros não */
        { n: '5. Medição', icone: 'grafico', p: 'Qual resultado foi gerado?', x: 46, y: 82, dx: -12, dy: -2, seq: 1,
          itens: ['Aprendizagem', 'Aplicação no dia a dia', 'Resultados para o negócio', 'Melhoria contínua'],
          icones: ['capelo', 'capacete', 'crescimento', 'ciclo'] },
      ],
      base: { n: 'Base técnica do SENAI', icone: 'lampada', x: 88, y: 24,
              d: 'Portfólio, metodologias e especialistas que garantem qualidade e segurança na entrega.' },
      grupos: [
        { n: 'Benefícios para sua empresa', x: 16, y: 83, w: 400,
          icones: ['alvo', 'pessoas', 'crescimento', 'escudo', 'cifrao'], itens: [
          'Capacitação alinhada à estratégia do negócio',
          'Desenvolvimento de competências essenciais',
          'Aumento da produtividade e da qualidade',
          'Mais segurança e conformidade',
          'Melhor retorno sobre o investimento em capacitação',
        ] },
        { n: 'Valor para a empresa', icone: 'trofeu', x: 86, y: 84, w: 330, itens: [
          'Profissionais mais preparados', 'Processos mais eficientes',
          'Mais segurança', 'Melhores resultados',
        ] },
      ],
      /* VERSÃO ALTERNATIVA, só para o cliente escolher: clicar no logotipo
         da Firjan nesta sub-tela troca para ela, e clicar de novo volta.
         O texto é o mesmo de cima (`de` aponta o campo); muda o fundo, que
         é uma cena com as salas desenhadas, e o texto vai escrito nas
         placas da própria cena.
           q: os 4 cantos da placa em % do palco (sup. esq., sup. dir.,
              inf. dir., inf. esq.): o texto é projetado nela, em perspectiva;
           plana: texto reto centrado em x/y; linha: reto, alinhado à
              esquerda a partir de x;
           rotulos: posição dos nomes sob os ícones já desenhados na cena. */
      alternativa: {
        /* versão B: o infográfico do cliente redesenhado em SVG, com
           movimento, na identidade do projeto. O texto é o mesmo de cima
           (hubs.js lê entrada, centro, etapas, base e grupos). */
        svg: 1,
        /* aprovada como padrão: abre nela, e o logotipo leva à cena */
        padrao: 1,
      } },

    /* slide 14. O texto estava DENTRO de uma imagem (ppt/media/image54.png)
       e foi transcrito para virar texto editável. "seguimentos" no original
       corrigido para "segmentos". */
    { id: 'ead', nome: 'Educação a distância', aba: 'EaD', tipo: 'link',
      /* capa em 3D no estilo do projeto (insumos/prompts/capa-ead.md,
         imagem em insumos/mapa-solto/thumb2.jpeg) */
      capa: 'hub/capa-ead.jpg', sub: 'Desenvolvimento e operação',
      titulo: 'Área de Educação a Distância',
      /* a mesma cena da capa do cartão, ocupando a direita da tela */
      arte: 'hub/ead-cena.jpg',
      blocos: [
        { n: 'Desenvolvimento', icone: 'ideia',
          d: 'Projetos de capacitação, entendendo o negócio das empresas para ' +
             'produzir soluções educacionais customizadas e entregar as melhores ' +
             'estratégias de aprendizagem que possibilitem o desenvolvimento de ' +
             'competências e habilidades requeridas aos profissionais nos ' +
             'variados segmentos.' },
        { n: 'Operação', icone: 'engrenagem',
          d: 'Gestão dos ambientes virtuais de aprendizagem e sustentação das ' +
             'soluções de capacitação para empresas, prestando atendimento a este ' +
             'público, fazendo acompanhamento pedagógico das turmas e dando ' +
             'suporte técnico.' },
      ],
      url: 'https://nucleoeadsenai.github.io/Portfolio/', rotuloUrl: 'Ver o portfólio de EaD' },

    { id: 'certificacao', nome: 'Certificação profissional', aba: 'Certificação', tipo: 'infografico',
      capa: 'hub/capa-certificacao.jpg', sub: 'Acreditada pelo INMETRO',
      /* peça alta (palco redondo visto de cima): a 88% passava da altura
         do palco. À direita e menor, deixa a coluna da esquerda para os
         nomes das certificações, que são longos demais para rótulo. */
      /* 40,5% e não 52: as figuras da peça ficavam maiores que as pessoas
         pintadas no galpão, e o palco parecia colado por cima da cena */
      /* 18/09: a peça recortada sobre o galpão saiu, como em Competências.
         Agora é uma cena só (insumos/prompts/cena-certificacao-unica.md),
         com o palco desenhado dentro do galpão. */
      fundo: 'hub/certificacao-cena.jpg',
      /* o logo do INMETRO no centro do medalhão da peça. O arquivo tem de
         ser o OFICIAL, enviado pelo cliente: enquanto não existir, a imagem
         some sozinha (onerror) e o medalhão fica liso, como está. */
      selo: { img: 'hub/inmetro-holo.png', x: 50, y: 31, w: 86 },
      lead: 'A Firjan SENAI é acreditada pelo INMETRO como Organismo de ' +
            'Certificação de Pessoas.',
      grupos: [
        /* abaixo das duas figuras do fundo do galpão (a do carrinho e o
           colega): mais acima, o cartão as cobria pela metade. */
        { n: 'Em operação e com acreditação do INMETRO', x: 20, y: 68, w: 520, itens: [
          'Inspetor de Soldagem Nível 1',
          'Soldador de Tubos e Conexões Poliméricos',
          'Pintura Industrial Nível 1',
          'Inspetor de Recebimento, Armazenamento e Instalação em Automação de Processos',
          'Inspetor de Recebimento, Armazenamento e Instalação em Automação Elétrica',
        ] },
        { n: 'Em operação e sem acreditação do INMETRO', x: 20, y: 87, w: 520, itens: ['Atmosferas Explosivas'] },
      ],
      url: 'https://www.firjan.com.br/senai/educacao/certificacao-profissional/' },

    { id: 'competencias', nome: 'Gestão de competências', aba: 'Competências', tipo: 'infografico',
      capa: 'hub/capa-competencias.jpg', sub: 'Estruturação e execução, em duas fases',
      /* peça diagonal: a 88% padrão descia para fora do palco. Menor e
         deslocada para a direita, deixa a coluna da esquerda para a Fase 1
         e o canto de baixo à direita para a Fase 2. */
      /* 48% e não 62, pelo mesmo motivo da Certificação: gente da peça na
         escala da gente do galpão */
      /* 38%: a 48% as pessoas ainda ficavam maiores que as do galpão e a
         plataforma de trás cobria a parede do fundo */
      /* 18/09: a peça recortada sobre o galpão saiu. Agora é uma cena só,
         com as duas plataformas desenhadas dentro do galpão
         (insumos/prompts/cena-competencias.md) — mesma luz, mesma
         perspectiva, gente do mesmo tamanho da do fundo. */
      fundo: 'hub/competencias-cena.jpg',
      /* texto do slide 16, como está no PPT. O complemento que ele põe
         entre parênteses vira segundo item do par: [passo, complemento],
         e entra como linha menor embaixo do passo. */
      lead: 'O programa de Gestão de Competências da Firjan SENAI é um modelo ' +
            'gerencial para ajudar a sua empresa no planejamento, na captação, ' +
            'no desenvolvimento e na avaliação de pessoas. O objetivo é ' +
            'identificar competências essenciais e determinantes para que a sua ' +
            'organização tenha profissionais eficazes e se torne cada vez mais ' +
            'produtiva e competitiva.',
      fases: [
        { n: 'Fase 1 · Estruturação do processo', x: 17, y: 72, w: 400, itens: [
          'Identificação da demanda da empresa',
          'Elaboração do macroprocesso',
          'Construção de perfis profissionais',
          'Estruturação do processo de avaliação diagnóstica',
          ['Estruturação do caminho de aperfeiçoamento profissional',
           'Aplicação do mundo do trabalho na educação: trilha de desenvolvimento'],
        ] },
        { n: 'Fase 2 · Execução do processo', x: 78, y: 72, w: 500, itens: [
          ['Aplicação de exames escritos e práticos para avaliação das competências',
           'Identificação dos gargalos e dos pontos fortes'],
          'Análise de resultados',
          'Análise crítica do processo com mapeamento das lições aprendidas',
          ['Operacionalização do caminho de aperfeiçoamento profissional',
           'Trilha de desenvolvimento'],
        ] },
      ],
      url: 'https://www.firjan.com.br/senai/empresas/educacao/gestao-de-competencias/' },

    /* slide 17 */
    { id: 'incompany', nome: 'Treinamento in company', aba: 'In company', tipo: 'texto',
      capa: 'hub/incompany.jpg', sub: 'Turmas fechadas, sob medida',
      fotos: ['hub/incompany.jpg'],
      lead: 'Oferecemos o modelo de treinamento in company e turmas fechadas ' +
            'com projetos desenhados sob medida para as necessidades exclusivas ' +
            'da sua empresa.',
      corpo: 'A Firjan SENAI leva a excelência da educação profissional para ' +
             'dentro da sua indústria, estruturando a formação no seu próprio ' +
             'ambiente fabril. Ao integrar o ensino ao chão de fábrica, garantimos ' +
             'que sua equipe desenvolva competências essenciais operando os seus ' +
             'equipamentos e vivenciando as rotinas do seu processo produtivo, o ' +
             'que acelera a curva de aprendizagem e o retorno para a operação.' },
  ] },
];

const PAINEL02 = [
  { foto: 'eletrotecnica', selo: '',
    legenda: 'Eletrotécnica — geração, transmissão e distribuição de energia.' },
  { foto: 'automacao', selo: 'Indústria 4.0',
    legenda: 'Automação industrial — células robotizadas de soldagem.' },
  { foto: 'energia-renovavel', selo: '',
    legenda: 'Sistemas de energia renovável — geração eólica e solar.' },
  { foto: 'automotiva', selo: '',
    legenda: 'Manutenção automotiva — linhas de montagem e sistemas veiculares.' },
  { foto: 'soldagem', selo: '',
    legenda: 'Soldagem — da metalmecânica aos setores naval e de petróleo e gás.' },
  { foto: 'panificacao', selo: '',
    legenda: 'Panificação — processos de produção e controle de qualidade.' },
];

const AREAS = [
  ['Alimentos', 'alimentos'],
  ['Audiovisual e Animação Digital', 'audiovisual'],
  ['Automação Industrial', 'automacao-industrial'],
  ['Automotiva', 'automotiva'],
  ['Bebidas', 'bebidas'],
  ['Biotecnologia', 'biotecnologia'],
  ['Construção Civil', 'construcao-civil'],
  ['Construção Naval', 'construcao-naval'],
  ['Couro e Calçados', 'couro-calcados'],
  ['Eletroeletrônica', 'eletroeletronica'],
  ['Energias Renováveis', 'energias-renovaveis'],
  ['Gestão Industrial', 'gestao-industrial'],
  ['Gráfica · Mídia Impressa e Digital', 'grafica-midia'],
  ['Instrumentação Industrial', 'instrumentacao'],
  ['Joalheria', 'joalheria'],
  ['Logística', 'logistica'],
  ['Mecânica Industrial', 'mecanica-industrial'],
  ['Meio Ambiente', 'meio-ambiente'],
  ['Metalurgia e Soldagem', 'metalurgia-soldagem'],
  ['Madeira e Mobiliário', 'madeira-mobiliario'],
  ['Moda · Têxtil e Vestuário', 'moda-vestuario'],
  ['Papel e Celulose', 'papel-celulose'],
  ['Petróleo e Gás', 'petroleo-gas'],
  ['Química', 'quimica'],
  ['Petroquímica e Plástico', 'petroquimica-plastico'],
  ['Refrigeração e Climatização', 'refrigeracao-climatizacao'],
  ['Segurança do Trabalho', 'seguranca-trabalho'],
  ['Subaquática', 'subaquatica'],
  ['TI · Tecnologia da Informação', 'ti'],
  ['Telecomunicação', 'telecomunicacao'],
  ['Transporte Aeronáutico', 'transporte-aeronautico'],
  ['Transporte Ferroviário', 'transporte-ferroviario'],
];


const ILHAS = [
    {
      id: 'gestao',
      pag: 0,
      nome: 'Gestão Industrial',
      icone: 'gestao',
      sub: 'PCP e qualidade',
      ax: 50,
      ay: 28,
      cx: 50,
      cy: 5.5,
      areas: ['Gestão Industrial'],
      ativo: 1
    },
    {
      id: 'ti',
      pag: 0,
      nome: 'Tecnologia da Informação',
      icone: 'ti',
      sub: 'Sistemas e redes',
      ax: 27,
      ay: 45,
      cx: 11,
      cy: 43,
      areas: ['Tecnologia da Informação - TI'],
      ativo: 1
    },
    {
      id: 'logist',
      pag: 0,
      nome: 'Logística',
      icone: 'logistica',
      sub: 'Cadeia de suprimentos',
      ax: 71,
      ay: 39,
      cx: 84,
      cy: 17.5,
      areas: ['Logística'],
      ativo: 1
    },
    {
      id: 'eletro',
      pag: 0,
      nome: 'Eletroeletrônica',
      icone: 'eletroeletronica',
      sub: 'Eletrotécnica e eletrônica',
      ax: 48.5,
      ay: 54,
      cx: 50,
      cy: 38,
      areas: ['Eletroeletrônica'],
      ativo: 1
    },
    {
      id: 'auto',
      pag: 0,
      nome: 'Automação Industrial',
      icone: 'automacao',
      sub: 'Robótica, CLP e instrumentação',
      ax: 24,
      ay: 66,
      cx: 11,
      cy: 79.5,
      areas: ['Automação Industrial'],
      ativo: 1
    },
    {
      id: 'mecanica',
      pag: 0,
      nome: 'Mecânica Industrial',
      icone: 'metalmecanica',
      sub: 'Usinagem e manutenção',
      ax: 74,
      ay: 66,
      cx: 79.5,
      cy: 87.5,
      areas: ['Mecânica Industrial'],
      ativo: 1
    },
    {
      id: 'audiovis',
      pag: 0,
      nome: 'Audiovisual e Animação',
      icone: 'midias',
      sub: 'Áudio, vídeo e computação gráfica',
      /* chip acima da ilha, no meio, entrando um pouco na plataforma de
         Eletroeletrônica (pedido do André, 18/09) */
      ax: 50,
      ay: 84,
      cx: 50,
      cy: 67,
      areas: ['Audiovisual e Animação Digital'],
      ativo: 1
    },
    {
      id: 'solda',
      pag: 1,
      nome: 'Metalurgia e Soldagem',
      icone: 'soldagem',
      sub: 'Processos de união e metalurgia',
      ax: 31,
      ay: 45,
      cx: 11,
      cy: 44,
      areas: ['Metalurgia e Soldagem'],
      ativo: 1
    },
    {
      id: 'refri',
      pag: 1,
      nome: 'Refrigeração e Climatização',
      icone: 'refrigeracao',
      sub: 'Sistemas de frio e ar-condicionado',
      ax: 69,
      ay: 43,
      cx: 84,
      cy: 17,
      areas: ['Refrigeração e Climatização'],
      ativo: 1
    },
    {
      id: 'segur',
      pag: 1,
      nome: 'Segurança do Trabalho',
      icone: 'seguranca',
      sub: 'Prevenção e normas',
      ax: 50,
      ay: 56,
      cx: 50.5,
      cy: 30,
      areas: ['Segurança do Trabalho'],
      ativo: 1
    },
    {
      id: 'grafica',
      pag: 1,
      nome: 'Gráfica e Mídias',
      icone: 'midias',
      sub: 'Impressos e mídias digitais',
      ax: 22,
      ay: 68,
      cx: 13,
      cy: 87,
      areas: ['Gráfica e Mídias Impressas e Digitais'],
      ativo: 1
    },
    {
      id: 'alim',
      pag: 1,
      nome: 'Alimentos',
      icone: 'alimentos',
      sub: 'Processos e panificação',
      ax: 77,
      ay: 68,
      cx: 80,
      cy: 85,
      areas: ['Alimentos'],
      ativo: 1
    },
    {
      id: 'civil',
      pag: 1,
      nome: 'Construção Civil',
      icone: 'construcao',
      sub: 'Obra e edificações',
      ax: 51.5,
      ay: 87,
      cx: 37,
      cy: 79,
      areas: ['Construção Civil'],
      ativo: 1
    },
    {
      id: 'energ',
      pag: 2,
      nome: 'Energias Renováveis',
      icone: 'energias',
      sub: 'Solar e eólica',
      ax: 31,
      ay: 46,
      cx: 38,
      cy: 12,
      mx: 30,
      my: 40,
      areas: ['Energias Renováveis'],
      ativo: 1
    },
    {
      id: 'quim',
      pag: 2,
      nome: 'Química',
      icone: 'quimica',
      sub: 'Análises e processos químicos',
      ax: 71,
      ay: 45,
      cx: 70,
      cy: 14,
      mx: 70,
      my: 40,
      areas: ['Química'],
      ativo: 1
    },
    {
      id: 'moda',
      pag: 2,
      nome: 'Moda, Têxtil e Vestuário',
      icone: 'vestuario',
      sub: 'Modelagem e confecção',
      ax: 37,
      ay: 80,
      cx: 49,
      cy: 78,
      mx: 25,
      my: 74,
      areas: ['Moda – Têxtil e Vestuário'],
      ativo: 1
    },
    {
      id: 'automot',
      pag: 2,
      nome: 'Automotiva',
      icone: 'automotiva',
      sub: 'Manutenção veicular',
      ax: 78,
      ay: 62,
      cx: 90,
      cy: 44,
      mx: 76,
      my: 74,
      areas: ['Automotiva'],
      ativo: 1
    },
    {
      id: 'naval',
      pag: 3,
      nome: 'Construção Naval',
      icone: 'construcao',
      sub: 'Casco, solda e estruturas',
      ax: 30,
      ay: 53,
      cx: 33,
      cy: 21,
      areas: ['Construção Naval'],
      ativo: 1
    },
    {
      id: 'petroq',
      pag: 3,
      nome: 'Petroquímica e Plástico',
      icone: 'quimica',
      sub: 'Processos e transformação',
      /* chip abaixo e à direita da ilha, no piso livre, apontando o meio dela
         (pedido do André, 18/09): em cima ele disputava com o mezanino e a
         chamada saía da borda da plataforma, não do centro */
      ax: 70,
      ay: 52,
      cx: 76,
      cy: 71,
      mx: 71,
      my: 42,
      areas: ['Petroquímica e Plástico'],
      ativo: 1
    },
    {
      id: 'bebidas',
      pag: 3,
      nome: 'Bebidas',
      icone: 'bebidas',
      sub: 'Envase e controle de qualidade',
      ax: 50,
      ay: 88,
      cx: 25,
      cy: 86,
      areas: ['Bebidas'],
      ativo: 1
    }
  ];

/* cursos de uma ilha = todos os títulos cujas áreas ela reúne */
const cursosDaIlha = il => CURSOS.filter(c => il.areas.includes(c[1]));

/* ── detalhamento dos 4 títulos de Metalmecânica - Mecânica ──
   Texto literal dos slides 12 (Mecânica), 23 (Eletromecânica), 32
   (Manutenção de Máquinas Industriais) e 34 (Metalurgia) do .pptx do
   cliente. Cada módulo é [nome, carga, unidades curriculares]. */
const DETALHE = {
    'Automação Industrial': {
      video: 'p32386518',
      obj: 'No curso Técnico em Automação da Firjan SENAI você aprende sobre o desenvolvimento e implantação de sistemas de controle e automação em processos industriais. A automação está crescendo em todos os setores com o surgimento cada vez maior de fábricas e prédios inteligentes. É um dos pilares da chamada 4ª Revolução Industrial ou Indústria 4.0.',
      campo: 'Por sua transversalidade pode atuar em quase todos os setores industriais e serviços, como: indústrias de bebida, de papel e celulose, petroquímica, química, automobilística, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          208,
          ['Comunicação e Informática Aplicada · 28h', 'Desenho Técnico Aplicado a Sistemas Automatizados · 40h', 'Fundamentos de Eletroeletrônica · 88h', 'Lógica de Programação · 52h']
        ],
        [
          'Específico Profissional I',
          364,
          ['Acionamentos Eletroeletrônicos · 60h', 'Sistemas Eletrônicos e Microcontrolados · 64h', 'Sistemas Lógicos Programáveis · 100h', 'Sistemas Eletrohidráulicos e Eletropneumáticos · 60h', 'Instrumentação e Controle de Processos Industriais · 80h']
        ],
        [
          'Específico Profissional II',
          256,
          ['Gestão dos Processos de Implementação de Sistemas Automatizados · 32h', 'Manutenção de Sistemas Automatizados · 52h', 'Comissionamento de Sistemas Automatizados · 32h', 'Integração de Dispositivos Automatizados · 80h', 'Sistemas de Supervisão e Controle · 60h']
        ],
        [
          'Específico Profissional III',
          260,
          ['Projetos de Intertravamento de Segurança de Processos Industriais · 40h', 'Projetos de Acionamentos Eletroeletrônicos · 60h', 'Projetos de Controle e Sistemas Automatizados · 60h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Eletrotécnica': {
      video: 'p32386518',
      obj: 'No curso Técnico em Eletrotécnica da Firjan SENAI você aprende sobre elaboração de projetos, instalação e manutenção de sistemas elétricos prediais, industriais, redes de distribuição de energia e novas formas de energia renováveis, automação predial, eficiência energética e sustentabilidade.',
      campo: 'É uma área com oportunidades em quase todos os setores da indústria e serviços, como: empresas de distribuição de energia, metalúrgicas, empresas de energia solar, construtoras civis, indústrias, mineradoras, empresas prestadoras de serviços terceirizados, entre outro.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          208,
          ['Segurança em Eletricidade · 24h', 'Fundamentos de Eletricidade · 72h', 'Fundamentos de Eletrônica Analógica · 40h', 'Fundamentos de Eletrônica Digital · 40h', 'Fundamentos de Máquinas Elétricas · 32h']
        ],
        [
          'Específico Profissional I',
          408,
          ['Instalação e Manutenção de Sistemas Elétricos Prediais · 48h', 'Projetos Elétricos Prediais · 48h', 'Desenho Técnico de Projetos Elétricos em Software Assistidos por Computador · 68h', 'Sistemas Autônomos de Segurança Patrimonial · 16h', 'Sistemas de Automação Residencial (Domótica) · 16h', 'Sistemas de Aterramento e de Proteção Contra Descargas Atmosféricas (SPDA) · 32h', 'Acionamentos Elétricos Industriais (Comandos Elétricos · 80h', 'Soft-Starters e Inversores de Frequência · 60h', 'Acionamentos Eletropneumáticos e Eletrohidráulicos · 40h']
        ],
        [
          'Específico Profissional II',
          264,
          ['Controladores Lógicos Programáveis, Sistemas Supervisórios (SCADA) e Interface Homem- Máquina (IHM) · 92h', 'Projetos Elétricos Industriais · 52h', 'Energias Renováveis · 12h', 'Projetos de Microgeração Fotovoltaica · 76h', 'Instalação de Sistemas de Microgeração Fotovoltaica · 32h']
        ],
        [
          'Específico Profissional III',
          208,
          ['Projetos de Sistemas Elétricos de Potência – SEP · 40h', 'Instalação de Sistemas Elétricos de Potência – SEP · 32h', 'Manutenção e Operação de Sistemas Elétricos de Potência – SEP · 20h', 'Eficiência Energética · 16h', 'Gestão Operacional Integrada · 20h', 'Desenvolvimento de Projetos · 80h']
        ]
      ]
    },
    'Mecânica': {
      video: 'p32386590',
      obj: 'No Curso Técnico em Mecânica da Firjan SENAI você aprende sobre processos de fabricação, manutenção e automação de máquinas e equipamentos, projetos mecânicos, modelagem 3D, hidráulica e pneumática, soldagem, metrologia, gestão industrial, tecnologias da manufatura e desenvolvimento de projetos.',
      campo: 'É uma área com oportunidades em indústrias metalmecânicas, automotivas, siderúrgicas, de petróleo e gás, mineração, papel e celulose, fabricantes de máquinas e equipamentos, empresas de manutenção industrial, prestadoras de serviços especializados, consultorias, centros de engenharia e desenvolvimento tecnológico, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          294,
          ['Fundamentos da Mecânica · 100h', 'Controle Dimensional · 40h', 'Leitura e Interpretação de Desenho Técnico Mecânico · 46h', 'Fundamentos da Hidráulica e Pneumática · 56h', 'Cálculo Técnico · 52h']
        ],
        [
          'Específico Profissional I',
          372,
          ['Processos de Manufatura Subtrativa em Máquinas Convencionais e Cnc · 160h', 'Processos de Soldagem em Eletrodo Revestido e Mag · 32h', 'Ensaios e Análise de Materiais · 40h', 'Manutenção Autônoma · 68h', 'Automação Aplicada à Mecânica · 72h']
        ],
        [
          'Específico Profissional II',
          266,
          ['Modelagem 3d · 72h', 'Manufatura Aditiva · 34h', 'Projetos de Sistemas Mecânicos · 160h']
        ],
        [
          'Específico Profissional III',
          188,
          ['Gestão Industrial · 48h', 'Gestão de Pessoas · 20h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Computação Gráfica': {
      video: 'p38533949',
      obj: 'No curso técnico de Computação Gráfica você desenvolve as competências para elaborar composição digital, desenvolver projetos de motion graphics e realizar a pós-produção digital dentro de padrões técnicos, de qualidade e segurança estabelecidos, além do desenvolvimento de competências que possibilitem a continuidade de estudos para etapas subsequentes.',
      campo: 'Área de com criação no setor publicitário, educacional e de entretenimento, público e⁄ou privado, possibilidade de autônomo.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Qualidade e Produtividade · 16h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Introdução à Indústria 4.0 · 24h', 'Sustentabilidade nos Processos Industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          92,
          ['Fundamentos do Cinema · 40h', 'Introdução à Animação · 52h']
        ],
        [
          'Específico Profissional I',
          32,
          ['Planejamento e Gerenciamento de Arquivos · 32h']
        ],
        [
          'Específico Profissional II',
          160,
          ['Desenvolvimento de Animação 2D · 160h']
        ],
        [
          'Específico Profissional III',
          300,
          ['Elementos para Animação 3D · 160h', 'Desenvolvimento de Animação 3D · 140h']
        ],
        [
          'Específico Profissional IV',
          120,
          ['Composição Digital · 120h']
        ],
        [
          'Específico Profissional V',
          384,
          ['Edição de Áudio e Vídeo · 88h', 'Efeitos Visuais e Sonoros · 100h', 'Correção de Cor e Mixagem de Áudio · 72h', 'Gestão de Carreira e Negócio · 24h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Produção de Áudio e Vídeo': {
      video: 'p38533949',
      obj: 'No curso Técnico em Produção de Áudio e Vídeo você aprende a realizar a produção, captação sonora e edição de imagens e sons; e elaborar o planejamento para a produção audiovisual, seguindo padrões e normas técnicas, referentes à propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
      campo: 'Trabalham principalmente em atividades culturais e comerciais, em empresas públicas ou privadas, como empregados ou prestadores de serviços.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Sustentabilidade nos Processos Industriais · 8h', 'Introdução à Indústria 4.0 · 24h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Qualidade e Produtividade · 16h', 'Introdução à Tecnologia da Informação e Comunicação · 40h']
        ],
        [
          'Módulo Introdutório',
          136,
          ['Fundamentos do Cinema · 40h', 'Fundamentos do Audiovisual · 40h', 'Introdução à Produção Audiovisual · 28h', 'Roteiro para Produção Audiovisual · 28h']
        ],
        [
          'Específico Profissional I',
          180,
          ['Operação de Câmeras e Iluminação para o Audiovisual · 180h']
        ],
        [
          'Específico Profissional II',
          140,
          ['Operação de Equipamentos para Captação de Áudio · 140h']
        ],
        [
          'Específico Profissional III',
          392,
          ['Planejamento e Gestão de Arquivos de Imagem e Áudio · 20h', 'Edição de Vídeo · 200h', 'Edição e Mixagem de Áudio · 140h', 'Gestão de Carreira e Negócio · 32h']
        ],
        [
          'Específico Profissional IV',
          240,
          ['Produção Audiovisual · 140h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Mecatrônica': {
      video: 'p32386518',
      obj: 'No curso Técnico em Mecatrônica da Firjan SENAI você aprende sobre o desenvolvimento, implantação e programação de sistemas automatizados de manufatura, incluindo modelagem virtual e robótica industrial. É um dos pilares da chamada 4ª Revolução Industrial ou Indústria 4.0, com grande potencial de futuro.',
      campo: 'É uma área com oportunidades no setor automotivo e mecânico, como as indústrias automobilísticas, alimentícias, de bens de consumo, petroquímicas e de energia, fabricantes de máquinas e laboratórios de controle de qualidade, entre outros.',
      rec: 'O diploma do SENAI permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          228,
          ['Comunicação e Informática Aplicada · 24h', 'Mecânica Aplicada a Sistemas Mecatrônicos · 32h', 'Desenho Técnico Aplicado à Sistemas Automatizados · 52h', 'Fundamentos de Eletroeletrônica · 80h', 'Lógica de Programação · 40h']
        ],
        [
          'Específico Profissional I',
          320,
          ['Sistemas Microcontrolados · 60h', 'Sistemas Eletrônicos · 60h', 'Processos de Fabricação Mecânica · 80h', 'Sistemas Eletrohidráulicos e Eletropneumáticos · 60h', 'Acionamentos Eletroeletrônicos · 60h']
        ],
        [
          'Específico Profissional II',
          280,
          ['Gestão dos Processos de Implementação de Sistemas Mecatrônicos · 32h', 'Manutenção de Sistemas Mecatrônicos · 32h', 'Sistemas Lógicos Programáveis · 80h', 'Sistemas de Supervisão e Controle · 56h', 'Integração de Sistemas Robóticos e Mecatrônicos · 80h']
        ],
        [
          'Específico Profissional III',
          260,
          ['Projetos de Sistemas Mecatrônicos · 40h', 'Projetos de Sistemas Embarcados · 40h', 'Projetos de Componentes Mecânicos · 40h', 'Projetos de Acionamentos Eletroletrônicos · 40h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Desenvolvimento de Sistemas': {
      video: 'p6450803',
      obj: 'No curso Técnico em Desenvolvimento de Sistemas da Firjan SENAI você aprende a desenvolver e programar sistemas computacionais, atendendo normas e padrão de qualidade, usabilidade, integridade e segurança da informação.',
      campo: 'É uma área com oportunidades de trabalho em empresas de diferentes portes e segmentos, na criação, implantação e manutenção de sistemas computacionais, desde software para desktop e mobile até sistemas web complexos.',
      rec: 'O diploma do SENAI permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          256,
          ['Fundamentos de Eletroeletrônica Aplicada · 76h', 'Lógica de Programação · 180h']
        ],
        [
          'Específico Profissional I',
          204,
          ['Modelagem de Sistemas · 64h', 'Banco de Dados · 140h']
        ],
        [
          'Específico Profissional II',
          628,
          ['Desenvolvimento de Sistemas · 202h', 'Teste de Sistemas · 60h', 'Desenvolvimento de Aplicativo Mobile · 104h', 'Internet das Coisas · 104h', 'Implantação e Manutenção de Sistemas · 48h', 'Desenvolvimento de Projetos · 110h']
        ]
      ]
    },
    'Logística': {
      video: 'p16938947',
      obj: 'No Curso Técnico em Logística da Firjan SENAI você aprende sobre planejamento, implementação e supervisão dos processos logísticos, gestão de suprimentos, armazenagem, produção, distribuição e transporte, utilização de tecnologias aplicadas à logística, sustentabilidade, melhoria de processos e desenvolvimento de projetos para a cadeia de suprimentos.',
      campo: 'É uma área com oportunidades em indústrias, centros de distribuição, operadores logísticos, empresas de transporte, portos, aeroportos, terminais de cargas, empresas de comércio e e-commerce, prestadoras de serviços logísticos, organizações públicas e privadas, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          90,
          ['Fundamentos dos Processos Logísticos · 80h']
        ],
        [
          'Específico Profissional I',
          198,
          ['Controle dos Processos de Suprimentos · 60h', 'Operações Integradas de Suprimentos · 78h', 'Planejamento dos Processos de Suprimentos · 60h']
        ],
        [
          'Específico Profissional II',
          224,
          ['Planejamento dos Processos de Armazenagem · 60h', 'Controle dos Processos de Armazenagem · 60h', 'Operações Integradas de Armazenagem · 104h']
        ],
        [
          'Específico Profissional III',
          220,
          ['Planejamento dos Processos de Produção · 60h', 'Operações Integradas de Produção · 100h', 'Controle dos Processos de Produção · 60h']
        ],
        [
          'Específico Profissional IV',
          388,
          ['Planejamento dos Processos de Distribuição e Transporte · 60h', 'Controle dos Processos de Distribuição e Transporte · 60h', 'Operações Integradas de Distribuição e Transporte · 100h', 'Logística sustentável · 48h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Planejamento e Controle da Produção': {
      video: 'p11887093',
      obj: 'No Curso Técnico em Planejamento e Controle da Produção da Firjan SENAI você aprende sobre planejamento, programação e controle da produção, monitoramento dos processos produtivos, gestão do abastecimento, filosofia Lean, sustentabilidade, utilização de tecnologias aplicadas à manufatura e desenvolvimento de projetos voltados à melhoria da produtividade industrial.',
      campo: 'É uma área com oportunidades em indústrias dos setores metalmecânico, automotivo, alimentos e bebidas, químico, farmacêutico, papel e celulose, petróleo e gás, empresas de manufatura, centros de distribuição, consultorias, prestadoras de serviços e demais organizações que atuam com planejamento e gestão da produção.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          60,
          ['Fundamentos dos Processos de Produção · 60h']
        ],
        [
          'Específico Profissional I',
          378,
          ['Planejamento dos Processos Produtivos · 180h', 'Programação da Produção · 198h']
        ],
        [
          'Específico Profissional II',
          362,
          ['Monitoramento da Produção · 102h', 'Controle do Abastecimentos da Produção · 100h', 'Produção Enxuta · 100h', 'Produção Sustentável · 60h']
        ],
        [
          'Específico Profissional III',
          120,
          ['Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    Soldagem: {
      video: 'p32386590',
      obj: 'No Curso Técnico em Soldagem da Firjan SENAI você aprende sobre processos de soldagem, metalurgia, elaboração de projetos de juntas soldadas, inspeção e controle de processos, ensaios e tratamentos térmicos, tecnologias aplicadas à fabricação, qualidade, sustentabilidade e desenvolvimento de projetos para a indústria.',
      campo: 'É uma área com oportunidades em indústrias metalmecânicas, naval, automotiva, siderúrgica, petróleo e gás, mineração, energia, fabricação de máquinas e equipamentos, empresas de manutenção industrial, inspeção e controle da qualidade, consultorias e prestadoras de serviços especializados, entre outros..',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          388,
          ['Fundamentos da Soldagem · 102h', 'Fundamentos da Metalurgia · 60h', 'Leitura e Interpretação de Desenho Técnico Mecânico · 68h', 'Cálculos Aplicados a Soldagem · 58h', 'Processos de Soldagem · 100h']
        ],
        [
          'Específico Profissional I',
          360,
          ['Metalurgia Aplicada a Soldagem · 100h', 'Processos Avançados de Soldagem · 100h', 'Ensaios Aplicados a Soldagem · 100h', 'Tratamentos Térmicos Aplicados a Soldagem · 60h']
        ],
        [
          'Específico Profissional II',
          100,
          ['Controle de Processos de Soldagem · 100h']
        ],
        [
          'Específico Profissional III',
          272,
          ['Projetos de Produtos Soldados · 96h', 'Gestão de Pessoas · 56h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Redes de Computadores': {
      video: 'p6450803',
      obj: 'No curso Técnico em Redes de Computadores da Firjan SENAI você aprende sobre a montagem de redes internas e serviços de rede, incluindo mecanismo de segurança e monitoramento.',
      campo: 'Em função da necessidade crescentes de trocar e gerir informação, acompanhar a velocidade de um mundo cada vez mais digital e manter a conectividade crescem as oportunidades no setor de indústria e serviços como: empresas de tecnologia, telecomunicações, bancos, entre outros.',
      rec: 'O diploma do SENAI permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          248,
          ['Boas Práticas de Gestão em TI · 52h', 'Infraestrutura de Redes de Computadores · 100h', 'Estruturas de Computadores · 56h', 'Lógica de Programação · 40h']
        ],
        [
          'Específico Profissional I',
          640,
          ['Instalação e Manutenção de Redes SOHO · 110h', 'Instalação e Manutenção de Redes Corporativas · 100h', 'Configuração de Servidores de Rede · 150h', 'Implementação e Integração de Redes de Computadores · 124h', 'Segurança de Redes · 56h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Refrigeração e Climatização': {
      video: 'p35933207',
      obj: 'No curso Técnico em Refrigeração e Climatização da Firjan SENAI você aprende a projetar instalação de sistemas de refrigeração e climatização.',
      campo: 'Empresas de prestação de serviços, residências e indústrias de climatização, lojas, construção civil, manutenção de sistemas de refrigeração e frigoríficos, além da possibilidade de trabalhar de forma autônoma.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          300,
          ['Fundamentos da Mecânica · 120h', 'Fundamentos da Eletricidade · 100h', 'Fundamentos da Refrigeração e Climatização · 80h']
        ],
        [
          'Específico Profissional I',
          288,
          ['Instalação de Sistemas de Climatização · 140h', 'Instalação de Sistemas de Refrigeração · 100h', 'Gestão de Processos da Instalação · 48h']
        ],
        [
          'Específico Profissional II',
          260,
          ['Manutenção de Sistemas de Climatização · 100h', 'Manutenção de Sistemas de Refrigeração · 100h', 'Planejamento e Controle da Manutenção · 60h']
        ],
        [
          'Específico Profissional III',
          240,
          ['Projetos de Sistemas de Refrigeração e Climatização · 140h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Processos Gráficos': {
      video: 'p38533949',
      obj: 'No Curso Técnico em Processos Gráficos da Firjan SENAI você aprende sobre desenvolvimento e produção de produtos gráficos, pré-impressão, impressão e acabamento, controle dos processos produtivos, tecnologias aplicadas à indústria gráfica, qualidade, sustentabilidade e desenvolvimento de projetos para o setor gráfico.',
      campo: 'É uma área com oportunidades em indústrias gráficas, editoras, empresas de embalagens, centros de serviços gráficos, empresas de comunicação visual, fabricantes de rótulos e etiquetas, gráficas promocionais e editoriais, prestadoras de serviços gráficos, consultorias e empresas especializadas, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Sustentabilidade nos Processos Industriais · 8h', 'Introdução à Indústria 4.0 · 24h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Qualidade e Produtividade · 16h', 'Introdução à Tecnologia da Informação e Comunicação · 40h']
        ],
        [
          'Módulo Introdutório',
          260,
          ['Fundamentos de Processos Gráficos · 80h', 'Fundamentos de Ensaios Tecnológicos e Materiais · 80h', 'Processos de Pré-Impressão · 100h']
        ],
        [
          'Específico Profissional I',
          228,
          ['Processos de Impressão · 140h', 'Processos de Pós-Impressão · 88h']
        ],
        [
          'Específico Profissional II',
          300,
          ['Gestão de Custos e Orçamentos Gráficos · 80h', 'Planejamento e Controle da Produção e Materiais PCPM · 100h', 'Desenvolvimento de Produtos Gráficos · 120h']
        ],
        [
          'Específico Profissional III',
          300,
          ['Processos e Instalações Industriais · 100h', 'Gestão da Qualidade dos Processos e Produtos Gráficos · 100h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Eletromecânica': {
      video: 'p32386590',
      obj: 'No Curso Técnico em Eletromecânica da Firjan SENAI você aprende sobre montagem, instalação, operação e manutenção de sistemas mecânicos, elétricos e eletroeletrônicos, automação industrial, hidráulica e pneumática, manufatura digital, integração de equipamentos e desenvolvimento de projetos aplicados aos processos industriais.',
      campo: 'É uma área com oportunidades em indústrias dos setores metalmecânico, automotivo, siderúrgico, naval, petróleo e gás, mineração, papel e celulose, alimentos e bebidas, empresas de manutenção industrial, fabricantes de máquinas e equipamentos, integradoras de sistemas, prestadoras de serviços especializados, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          264,
          ['Leitura e Interpretação de Desenho Técnico · 46h', 'Cálculo Técnico · 48h', 'Controle Dimensional · 46h', 'Fundamentos da Hidráulica e Pneumática · 48h', 'Fundamentos da Eletromecânica · 76h']
        ],
        [
          'Específico Profissional I',
          588,
          ['Técnicas de Usinagem em Máquinas Convencionais · 100h', 'Sistemas Eletroeletrônicos Aplicados a Eletromecânica · 90h', 'Sistemas Mecânicos Aplicados a Eletromecânica · 100h', 'Integração de Conjuntos Eletromecânicos · 96h', 'Manutenção de Sistemas Eletromecânicos · 102h', 'Automação Industrial Aplicada a Eletromecânica · 60h', 'Gestão de Processos da Eletromecânica · 40h']
        ],
        [
          'Específico Profissional II',
          268,
          ['Projetos Eletromecânicos · 68h', 'Manufatura Digital · 80h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Segurança do Trabalho': {
      video: 'p11887093',
      obj: 'No curso Técnico em Segurança do Trabalho da Firjan SENAI você aprende a executar ações prevencionistas, monitorar os processos de saúde, segurança e meio ambiente do trabalho e prestar assessoria em segurança do trabalho de acordo com normas regulamentadoras e princípios de higiene ocupacional, responsabilidade social e sustentabilidade, meio ambiente e promoção à saúde do trabalhador com ética profissional.',
      campo: 'O Técnico em Segurança do Trabalho tem oportunidades para atuar tanto em empresas privadas, públicas e em diversos segmentos como: construção civil, indústrias, aeroportos, hospitais, instituições de ensino, comércio (atacadista ou varejista), comércios de pequeno porte, empresas de mineração ou extração de gás e petróleo e concessionárias.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional de Engenharia e Agronomia – CREA e a Secretaria Especial de Previdência e Trabalho para habilitação ao exercício da profissão. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          260,
          ['Fundamentos de Segurança e Saúde do Trabalho · 120h', 'Ciências Aplicadas à Segurança e Saúde do Trabalho · 60h', 'Gestão de Pessoas aplicada à Segurança e Saúde do Trabalho · 40h', 'Comunicação e Informação aplicadas à Segurança e Saúde do Trabalho · 40h']
        ],
        [
          'Específico Profissional I',
          320,
          ['Rotinas de Segurança e Saúde do Trabalho · 200h', 'Higiene Ocupacional · 120h']
        ],
        [
          'Específico Profissional II',
          228,
          ['Coordenação de Programas e Procedimentos de Saúde e Segurança do Trabalho · 188h', 'Planejamento e Execução de Ações Educativas · 40h']
        ],
        [
          'Específico Profissional III',
          60,
          ['Assessoria e Consultoria em Saúde, Segurança e Meio Ambiente do Trabalho · 60h']
        ],
        [
          'Específico Profissional IV',
          220,
          ['Gestão de Auditorias em de Segurança e Saúde do Trabalho · 60h', 'Monitoramento dos Programas e Documentos de Segurança e Saúde do Trabalho · 60h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    Alimentos: {
      video: 'p16938947',
      obj: 'No Curso Técnico em Alimentos da Firjan SENAI você aprende sobre processos de produção, conservação e industrialização de alimentos, análises laboratoriais, controle de qualidade, desenvolvimento de produtos, segurança dos alimentos, melhoria de processos produtivos e sustentabilidade aplicada à indústria de alimentos e bebidas.',
      campo: 'É uma área com oportunidades em indústrias de alimentos e bebidas, laticínios, frigoríficos, panificadoras, indústrias de massas alimentícias, bebidas, chocolates e confeitos, empresas de processamento de frutas e hortaliças, laboratórios de análises, centros de pesquisa, órgãos de fiscalização sanitária, empresas prestadoras de serviços e consultorias do setor alimentício, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter maior empregabilidade, também amplia suas oportunidades de crescimento profissional e fica mais preparado para ingressar no Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          88,
          ['Princípios de Higiene e Segurança dos Alimentos e Bebidas · 32h', 'Princípio de conservação de alimentos · 20h', 'Fundamentos de ciências de alimentos · 36h']
        ],
        [
          'Específico Profissional I',
          228,
          ['Análises Físico Químicas de Alimentos · 84h', 'Análises Microbiológica em Alimentos · 84h', 'Análises Sensoriais de Alimentos · 60h']
        ],
        [
          'Específico Profissional II',
          404,
          ['Processos de Industrialização de Carnes e Derivado · 64h', 'Processos de Industrialização de Pães, Massas Alimentícias e Biscoitos · 80h', 'Processos de Industrialização de Leites e Derivados · 80h', 'Processos de Industrialização de Frutas, Hortaliças e Derivados · 68h', 'Processos de Industrialização de Bebidas · 68h', 'Processos de Industrialização de Balas, Chocolates e Confeitos · 44h']
        ],
        [
          'Específico Profissional III',
          400,
          ['Segurança dos Alimentos · 92h', 'Gestão Integrada da Produção · 92h', 'Melhorias em Processos e Produtos Alimentícios · 96h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Edificações': {
      video: 'p30198962',
      obj: 'No Curso Técnico em Edificações da Firjan SENAI você aprende sobre elaboração de projetos arquitetônicos, estruturais e de instalações prediais, planejamento e execução de obras, controle tecnológico dos materiais, manutenção de edificações, gestão de obras, sustentabilidade e inovação aplicada à construção civil.',
      campo: 'É uma área com oportunidades em construtoras, incorporadoras, empresas de projetos, escritórios de arquitetura e engenharia, empresas de infraestrutura, órgãos públicos, laboratórios de controle tecnológico, empresas de manutenção predial, consultorias, empresas prestadoras de serviços especializados e demais segmentos da construção civil.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter maior empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          138,
          ['Levantamento Cadastral e Legalização de Imóveis · 80h', 'Desenho Técnico de Construção Civil · 58h']
        ],
        [
          'Específico Profissional I',
          348,
          ['Projetos Arquitetônicos · 70h', 'Projetos Estruturais · 110h', 'Projetos de Instalações Elétricas · 68h', 'Projetos de Instalações Hidrossanitárias · 68h', 'Projetos Executivos · 32h']
        ],
        [
          'Específico Profissional II',
          406,
          ['Controle Tecnológico · 118h', 'Processos Construtivos para Edificações · 178h', 'Planejamento de Obras · 82h', 'Coordenação de Equipes de Obras · 28h']
        ],
        [
          'Específico Profissional III',
          228,
          ['Manutenção de Edificações · 60h', 'Inspeções e Perícias de Edificações · 48h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Sistemas de Energia Renovável': {
      video: 'p35933207',
      obj: 'No curso Técnico em Energia Renovável você aprende sobre as especificidades das formas limpas de energia no contexto energético atual e dos potenciais cenários futuros, incluindo , projetos, montagem e operação, como também ferramentas de gestão de energia e eficiência energética, imprescindíveis para saber como realizar estudos de impacto e incorporar as tecnologias renováveis e de eficiência energética dentro do sistema de gestão global da empresa.',
      campo: 'Empresas de projeto, instalação, operação, montagem e manutenção de sistemas de geração, transmissão e distribuição de energia elétrica de fontes renováveis de energia, entre outros.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução a Qualidade e Produtividade · 16h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução à Tecnologia da Informação e Comunicação · 40h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          256,
          ['Segurança em Eletricidade · 24h', 'Fundamentos de Eletricidade · 72h', 'Princípios de Eletrônica Analógica · 60h', 'Princípios de Eletrônica Digital · 60h', 'Sistemas de Energias Renováveis · 24h', 'Eficiência Energética · 16h']
        ],
        [
          'Específico Profissional I',
          340,
          ['Fundamentos de Sistemas Fotovoltaicos · 60h', 'Projetos de Sistemas Fotovoltaicos em Software Assistido por Computador · 100h', 'Desenho Técnico de Projetos de Sistemas Fotovoltaicos em CAD · 100h', 'Implementação de Sistemas Fotovoltaicos · 80h']
        ],
        [
          'Específico Profissional II',
          120,
          ['Fundamentos de Sistemas de Aquecimento Solar · 60h', 'Projetos de Sistemas de Aquecimento Solar · 40h', 'Implementação de Sistemas de Aquecimento Solar · 20h']
        ],
        [
          'Específico Profissional III',
          104,
          ['Fundamentos de Centrais Hidrelétricas · 40h', 'Dimensionamento de Centrais Hidrelétrica · 32h', 'Implementação de Centrais Hidrelétricas · 32h']
        ],
        [
          'Específico Profissional IV',
          104,
          ['Fundamentos de Sistemas Eólicos · 40h', 'Dimensionamento de Sistemas Eólicos · 40h', 'Implementação de Sistemas Eólicos · 24h']
        ],
        [
          'Específico Profissional V',
          164,
          ['Fundamentos de Sistemas de Geração de Energia por Biomassa · 40h', 'Implementação de Sistemas de Geração por Biomassa · 24h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Química': {
      video: 'p38533949',
      obj: 'No curso Técnico em Química você aprende a realizar análises químicas, físicas, microbiológicas e instrumentais, operar processos industriais e laboratoriais e atuar no desenvolvimento de métodos analíticos, produtos e processos, seguindo procedimentos técnicos, de qualidade, segurança, saúde e responsabilidade socioambiental',
      campo: 'Empresas de petróleo, indústria farmacêutica, cosmético, alimentícia e também podem trabalhar em laboratórios e organizações públicas e privada.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          296,
          ['Fundamentos de Matemática e Física · 40h', 'Fundamentos de Química Geral e Inorgânica · 100h', 'Fundamentos de Química Orgânica · 56h', 'Fundamentos de Bioquímica e Microbiologia · 20h', 'Fundamentos das Técnicas Laboratoriais · 40h', 'Fundamentos de Processos Químicos Industriais · 40h']
        ],
        [
          'Específico Profissional I',
          308,
          ['Físico-química Aplicada · 68h', 'Química Analítica · 100h', 'Análises Instrumentais · 68h', 'Análises Microbiológicas · 40h', 'Química Orgânica Experimental · 32h']
        ],
        [
          'Específico Profissional II',
          224,
          ['Operações Unitárias Laboratoriais · 32h', 'Operação de Processos Industriais · 72h', 'Controle dos Processos Industriais e Laboratoriais · 60h', 'Tratamento de Águas e Efluentes e Controle de Resíduos · 60h']
        ],
        [
          'Específico Profissional III',
          260,
          ['Gestão de Equipes de Trabalho · 32h', 'Pesquisas e Aplicação de Produtos e Serviços · 68h', 'Desenvolvimento de Métodos Analíticos, Produtos e Processos · 60h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Vestuário': {
      video: 'p16938947',
      obj: 'No Curso Técnico em Vestuário você terá o pleno desenvolvimento de conhecimentos gerais e tecnológicos, bem como competências para implementar o processo produtivo do vestuário, supervisionar o processo produtivo do vestuário, participar do processo de desenvolvimento do produto, de acordo com os padrões estabelecidos pela empresa, seguindo normas técnicas, de saúde e segurança do trabalho, princípios de gestão da qualidade e de preservação ambiental.',
      campo: 'Atuação em diversos campos do segmento Indústrias de Confecção, Ateliês e Casas de Costura, Lojas de Roupas, Empresas de Consultoria e Assessoria e E-commerce de Moda.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          370,
          ['Fundamentos da Moda · 40h', 'Fundamentos da Confecção do Vestuário · 80h', 'Processo de Modelagem Industrial · 100h', 'Processo de Corte Industrial · 60h', 'Processo de Costura Industrial · 90h']
        ],
        [
          'Específico Profissional I',
          360,
          ['Análise Técnica do Desenvolvimento de Produtos do Vestuário · 160h', 'Planejamento da Produção do Vestuário · 80h', 'Especificações Técnicas de Produtos e Processos do Vestuário · 120h']
        ],
        [
          'Específico Profissional II',
          358,
          ['Gestão de Equipes da Confecção do Vestuário · 78h', 'Controle dos Processos do Vestuário · 100h', 'Inspeção e Controle da Qualidade de Produtos do Vestuário · 80h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Manutenção Automotiva': {
      video: 'p30198962',
      obj: 'No curso Técnico em Manutenção Automotiva da Firjan SENAI você aprende a realizar diagnósticos, inspeções técnicas e manutenção dos sistemas automotivos, supervisionando todas as etapas dos processos conforme especificações dos fabricantes e normas técnicas, ambientais, de qualidade e de saúde e segurança do trabalho.',
      campo: 'O Técnico em Manutenção Automotiva encontra oportunidades em concessionárias, montadoras, oficinas especializadas, centros automotivos, empresas de inspeção veicular, locadoras de veículos, transportadoras, frotistas, fabricantes de autopeças e empresas do setor de mobilidade.',
      rec: 'O constante avanço das tecnologias automotivas, incluindo veículos híbridos, elétricos e conectados, amplia a necessidade de profissionais altamente qualificados. O diploma do SENAI possui reconhecimento no setor automotivo e aumenta significativamente as oportunidades de inserção profissional e continuidade da formação em cursos superiores.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          268,
          ['Tecnologia Mecânica Automotiva · 120h', 'Medidas e Representações Gráficas Aplicadas À Automotiva · 68h', 'Eletroeletrônica Veicular · 80h']
        ],
        [
          'Específico Profissional I',
          260,
          ['Manutenção em Sistemas de Suspensão, Direção e Freios · 120h', 'Manutenção em Sistemas de Carga e Partida, Sinalização e Iluminação · 60h', 'Manutenção em Sistemas de Segurança e Assistência Ao Motorista · 20h', 'Manutenção em Sistemas de Conforto, Conveniência e Entretenimento · 60h']
        ],
        [
          'Específico Profissional II',
          400,
          ['Manutenção em Sistemas de Transmissão · 120h', 'Manutenção em Motores Automotivos · 120h', 'Manutenção em Sistemas de Gerenciamento Eletrônico · 80h', 'Manutenção em Carrocerias Automotivas · 80h']
        ],
        [
          'Específico Profissional III',
          192,
          ['Inspeção Veicular · 40h', 'Gestão da Manutenção e da Inspeção Veicular · 32h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Manutenção de Máquinas Industriais': {
      video: 'p32386590',
      obj: 'No curso Técnico em Manutenção de Máquinas Industriais da Firjan SENAI você aprende a assegurar o funcionamento mecânico de máquinas, equipamentos e instalações industriais, coordenando atividades de manutenção e desenvolvendo soluções tecnológicas que aumentem a confiabilidade dos processos produtivos, sempre em conformidade com os conceitos de ESG, normas técnicas, qualidade, meio ambiente e saúde e segurança do trabalho.',
      campo: 'O Técnico em Manutenção de Máquinas Industriais pode atuar em indústrias de diversos segmentos, como metalmecânica, siderurgia, alimentos e bebidas, papel e celulose, mineração, petróleo e gás, química, farmacêutica, automotiva, energia, logística e empresas prestadoras de serviços de manutenção industrial.',
      rec: 'Com o crescimento da automação e da indústria 4.0, a manutenção industrial tornou-se estratégica para garantir produtividade e competitividade. O diploma do SENAI possui forte reconhecimento junto à indústria, proporcionando elevada empregabilidade e preparação para cursos superiores nas áreas de engenharia e tecnologia.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          294,
          ['Controle Dimensional · 40h', 'Leitura e Interpretação de Desenho Técnico Mecânico · 46h', 'Cálculo Técnico · 52h', 'Fundamentos da Mecânica · 100h', 'Fundamentos da Hidráulica e Pneumática · 56h']
        ],
        [
          'Específico Profissional I',
          456,
          ['Técnicas de Intervenção Corretiva · 120h', 'Técnicas de Intervenção Preventiva · 92h', 'Técnicas de Intervenção Preditiva · 60h', 'Automação Aplicada à Mecânica · 80h', 'Técnicas e Ensaios na Lubrificação Industrial · 44h', 'Técnicas de Comissionamento · 60h']
        ],
        [
          'Específico Profissional II',
          68,
          ['Gestão da Manutenção Industrial · 48h', 'Gestão de Pessoas · 20h']
        ],
        [
          'Específico Profissional III',
          302,
          ['Modelagem 3D · 72h', 'Projetos Mecânicos · 40h', 'Manufatura Aditiva · 70h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Panificação': {
      video: 'p16938947',
      obj: 'No curso Técnico em Panificação da Firjan SENAI você aprende a coordenar a fabricação de produtos de panificação, desde o planejamento da produção até o controle dos processos e a realização de análises laboratoriais. O curso prepara o profissional para atuar conforme as normas técnicas, a legislação vigente e os requisitos de qualidade, higiene, saúde, segurança dos alimentos e preservação do meio ambiente, desenvolvendo soluções que promovam eficiência, inovação e excelência na produção alimentícia.',
      campo: 'O Técnico em Panificação encontra oportunidades para atuar em indústrias de alimentos, panificadoras, confeitarias, supermercados, centrais de produção, empresas fornecedoras de insumos e ingredientes, laboratórios de controle de qualidade, empresas de consultoria, serviços de alimentação e empreendimentos do setor de panificação e alimentos.',
      rec: 'O setor de panificação está entre os maiores segmentos da indústria de alimentos no Brasil, demandando profissionais qualificados para garantir a qualidade dos produtos, a inovação dos processos e a segurança dos alimentos. O diploma do SENAI é amplamente reconhecido pelo mercado, ampliando as oportunidades de empregabilidade e preparando o profissional para a continuidade dos estudos em cursos superiores nas áreas de Alimentos, Engenharia de Alimentos, Gastronomia e Gestão da Produção.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          180,
          ['Fundamentos da Industrialização de Alimentos · 88h', 'Fundamentos da Tecnologia de Alimentos · 40h', 'Princípios de Higiene e Segurança dos Alimentos · 52h']
        ],
        [
          'Específico Profissional I',
          366,
          ['Processos Industriais em Panificação · 260h', 'Desenvolvimento de Produtos de Panificação · 106h']
        ],
        [
          'Específico Profissional II',
          198,
          ['Qualidade e Segurança dos Alimentos · 98h', 'Planejamento e Controle da Produção · 100h']
        ],
        [
          'Específico Profissional III',
          376,
          ['Análises Físico Químicas de Alimentos · 85h', 'Análises Microbiológicas e Microscópicas · 85h', 'Análises Sensoriais de Alimentos · 86h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Produção de Moda': {
      video: 'p16938947',
      obj: 'No curso Técnico em Produção de Moda você aprende a desenvolver projetos de comunicação de moda, composição visual e estilo, seguindo normas técnicas, de saúde e segurança do trabalho, princípios de gestão da qualidade e de sustentabilidade.',
      campo: 'Área de Vestuário e afins, em micro, pequenas, médias e grandes empresas da indústria e comércio, publicidade, propaganda e entretenimento.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          100,
          ['Fundamentos da Produção de Moda · 60h', 'Fundamentos da Moda · 40h']
        ],
        [
          'Específico Profissional I',
          224,
          ['Composição Visual e Estilo · 160h', 'Pesquisa Aplicada á Produção de Moda · 64h']
        ],
        [
          'Específico Profissional II',
          564,
          ['Projeto Desfile de Moda · 80h', 'Projetos de Exposição de Produtos · 160h', 'Projetos de Imagem de Moda · 164h', 'Projeto Executivo de Comunicação de Moda · 80h', 'Desenvolvimento de Projetos · 80h']
        ]
      ]
    },
    'Construção Naval': {
      video: 'p32386590',
      obj: 'No curso Técnico em Construção Naval você aprende a fabricação, a montagem e a manutenção de estruturas e componentes navais e offshore, controlar a qualidade e a conformidade de processos e produtos e, liderar tecnicamente as equipes envolvidas nos processos, de acordo com normas técnicas, de saúde e segurança no trabalho, de qualidade e ambientais.',
      campo: 'Indústrias de construção e reparo naval (estaleiros), empresas do setor offshore (plataformas), indústrias metalmecânicas e empresas prestadoras de serviços de manutenção de estruturas e componentes de embarcações.',
      rec: 'O diploma do SENAI na área tem reconhecimento destacado na indústria e permite habilitação técnica junto ao Conselho Regional dos Técnicos Industriais. Quem faz um curso técnico, além de ter chance de empregabilidade, fica também mais preparado para o Ensino Superior.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          240,
          ['Fundamentos de Máquinas, Equipamentos e Ferramentas · 40h', 'Medidas e Representações Gráficas Navais · 80h', 'Tecnologia Naval · 60h', 'Cálculos Aplicados à Construção Naval · 60h']
        ],
        [
          'Específico Profissional I',
          380,
          ['Montagem de Estruturas Navais e Offshore · 120h', 'Fabricação de Componentes e Estruturas Navais e Offshore · 120h', 'Manutenção e Conversão de Estruturas Navais e Offshore · 140h']
        ],
        [
          'Específico Profissional II',
          180,
          ['Provas de Mar para Embarcações · 80h', 'Ensaios e Testes para Processos de Fabricação e Montagem Naval e Offshore · 100h']
        ],
        [
          'Específico Profissional III',
          288,
          ['Planejamento e Gestão da Produção, Manutenção e Reparo Naval e Offshore · 98h', 'Comissionamento de Embarcações e Unidades Offshore · 90h', 'Desenvolvimento de Projeto · 100h']
        ]
      ]
    },
    'Multimídia': {
      video: 'p38533949',
      obj: 'No curso Técnico em Multimídia você aprende a coordenar e executar projetos para mídias digitais, seguindo padrões e normas técnicas, referentes à propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
      campo: 'Estúdios de gravação e edição de áudio e vídeo, empresas de mídia, agências, laboratórios multimídia com estações de trabalho e softwares, e espaços criativos para projetos interativos e imersivos.',
      rec: '"O setor de mídias digitais e produção cultural está em constante expansão, demandando profissionais qualificados para coordenar e executar projetos inovadores, garantindo a acessibilidade, usabilidade e a qualidade técnica de produtos audiovisuais, gráficos e interativos. O diploma do SENAI é amplamente reconhecido pelo mercado, ampliando as oportunidades de empregabilidade em estúdios, agências e produtoras, e preparando o profissional para a continuidade dos estudos em cursos superiores nas áreas de Design Gráfico, Publicidade e Propaganda, Produção Multimídia, Cinema e Audiovisual, e Jogos Digitais."',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução a Indústria 4.0 · 24h', 'Sustentabilidade nos Processos Industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          108,
          ['História do Design Gráfico · 20h', 'Fundamentos de Teoria da Cor · 32h', 'Fundamentos da Semiótica · 28h', 'Fundamentos de Desenho e Percepção Visual · 28h']
        ],
        [
          'Específico Profissional I',
          188,
          ['Tipografia · 44h', 'Imagem Digital · 84h', 'Marketing Digital · 60h']
        ],
        [
          'Específico Profissional II',
          392,
          ['Projeto de Identidade Visual · 84h', 'Design de Interfaces · 100h', 'Design Web · 60h', 'Produção Audiovisual · 68h', 'Motion Design · 80h']
        ],
        [
          'Específico Profissional III',
          200,
          ['Design de Animação 3D · 100h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    'Petroquímica': {
      video: 'p38533949',
      obj: 'No curso Técnico em Petroquímica você aprende a operar e controlar os sistemas petroquímicos, seguindo padrões técnicos, de qualidade, segurança, saúde e responsabilidade socioambiental.',
      campo: 'Unidades de refino de petróleo e gás, unidades de processamentos químicos e petroquímicos, unidades de processamento de gás natural, além de unidades de separação, conversão e tratamento.',
      rec: 'O setor de petróleo, gás e refino está entre os maiores e mais estratégicos segmentos da indústria nacional, demandando profissionais qualificados para operar e controlar sistemas petroquímicos, garantindo a qualidade técnica e a responsabilidade socioambiental. O diploma do SENAI é amplamente reconhecido pelo mercado, ampliando as oportunidades de empregabilidade em polos petroquímicos e refinarias, e preparando o profissional para a continuidade dos estudos em cursos superiores nas áreas de Química, Engenharia, Petróleo e Gás, e Automação.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          212,
          ['Fundamentos de Mecânica · 40h', 'Introdução à Indústria Petroquímica · 52h', 'Fundamentos de Química · 80h', 'Fundamentos de Física · 40h']
        ],
        [
          'Específico Profissional I',
          256,
          ['Processos da Indústria Petroquímica · 96h', 'Instrumentação Aplicada aos Processos Petroquímicos · 72h', 'Hidráulica e Pneumática Aplicadas aos Processos Petroquímicos · 48h', 'Tubulações, Válvulas e Acessórios · 40h']
        ],
        [
          'Específico Profissional II',
          276,
          ['Operação de Sistemas Petroquímicos · 164h', 'Operação de Sistemas de Utilidades · 112h']
        ],
        [
          'Específico Profissional III',
          344,
          ['Gerenciamento e Tratamento de Resíduos de Processos · 56h', 'Ensaios Analíticos e Instrumentais para Controle de Processos Petroquímicos · 80h', 'Gestão de Pessoas · 32h', 'Gestão da Produção · 76h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    Cervejaria: {
      video: 'p16938947',
      obj: 'No curso Técnico em Cervejaria você aprende a coordenar os processos de fabricação do mosto, fermentação/maturação, filtração e envase e atuar em projeto de fabricação de cerveja, de acordo com as normas e legislações sanitárias, ambientais, de saúde, higiene e segurança do trabalho e da qualidade.',
      campo: 'Cervejarias de micro a grande porte, laboratórios de análises de bebidas, indústrias de enzimas, empresas que utilizam processos de fermentação alcoólica e serviços de suporte técnico ligados à comercialização e análise de bebidas.',
      rec: 'O Brasil é o 3º maior fabricante de cerveja do mundo, e a expansão de microcervejarias e indústrias artesanais tem criado um mercado promissor e de grandes oportunidades. O diploma do SENAI é amplamente reconhecido por formar profissionais qualificados para atuar na produção, laboratório e supervisão de qualidade, ampliando a empregabilidade e preparando o aluno para a continuidade dos estudos em cursos superiores como Ciência e Tecnologia de Alimentos, Engenharia de Bioprocessos e Engenharia Química.',
      mods: [
        [
          'Módulo Básico',
          240,
          ['Comunicação e informação · 20h', 'Princípios de segurança dos alimentos · 60h', 'Princípios de ciência dos alimentos · 80h', 'Princípios de tecnologia dos alimentos · 80h']
        ],
        [
          'Específico Profissional I',
          160,
          ['Segurança dos alimentos · 60h', 'Planejamento e controle da produção · 100h']
        ],
        [
          'Específico Profissional II',
          400,
          ['Industrialização de cervejas · 400h']
        ],
        [
          'Específico Profissional III',
          400,
          ['Análise de cervejas · 200h', 'Desenvolvimento de projetos · 200h']
        ]
      ]
    },
    'Instrumentação Industrial': {
      video: 'p32386518',
      obj: 'No curso Técnico em Instrumentação Industrial você aprende a desenvolver, implementar e manter sistemas de instrumentação e controle de processos industriais, seguindo procedimentos e Normas Técnicas, de Qualidade, Segurança, Saúde e Sustentabilidade.',
      campo: 'Indústrias em geral, laboratórios de calibração, assistência técnica especializada, empresas prestadoras de serviços, empresas de engenharia e plantas-piloto de pesquisa e desenvolvimento de sistemas de instrumentação.',
      rec: 'A automação e o controle de processos são pilares fundamentais da Indústria 4.0, tornando a instrumentação uma área estratégica e com alta demanda por profissionais qualificados em tecnologias avançadas. O diploma do SENAI é amplamente reconhecido pelo mercado, ampliando a empregabilidade em diversos setores produtivos e preparando o profissional para a continuidade dos estudos em cursos superiores como Engenharia de Controle e Automação, Engenharia Mecatrônica, Engenharia Elétrica e Tecnologia em Automação Industrial.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos Processos Industriais · 8h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Indústria 4.0 · 24h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Qualidade e Produtividade · 16h']
        ],
        [
          'Módulo Introdutório',
          300,
          ['Comunicação e Informática Aplicada · 40h', 'Fundamentos da Eletroeletrônica · 100h', 'Fundamentos de Instrumentação · 100h', 'Desenho Técnico Aplicado à Sistemas Automatizados · 60h']
        ],
        [
          'Específico Profissional I',
          388,
          ['Medição e Controle de Variáveis de Processos Industriais · 128h', 'Gestão dos Processos de Implementação dos Sistemas de Instrumentação e Controle · 60h', 'Sistemas de Instrumentação Analítica · 60h', 'Sistemas Instrumentados de Segurança (SIS) · 80h', 'Comissionamento de Sistemas de Instrumentação e Controle · 60h']
        ],
        [
          'Específico Profissional II',
          140,
          ['Manutenção de Sistemas de Instrumentação e Controle · 80h', 'Planejamento e Controle da Manutenção · 60h']
        ],
        [
          'Específico Profissional III',
          260,
          ['Projetos de Sistemas de Medição e Controle de Variáveis · 100h', 'Projetos de Sistemas Instrumentados de Segurança (SIS) · 60h', 'Desenvolvimento de Projeto Integrador · 100h']
        ]
      ]
    },
    'Modelagem do Vestuário': {
      video: 'p16938947',
      obj: 'No curso Técnico em Modelagem do Vestuário você aprende a desenvolver a modelagem manual e informatizada de produtos do vestuário e supervisionar o setor de modelagem e pilotagem, seguindo padrões de qualidade, produtividade e sustentabilidade da empresa, normas técnicas e regulamentadoras aplicáveis à ocupação.',
      campo: 'Indústrias do vestuário e confecções, além de atuar de forma autônoma como modelista de roupas, consultor em modelagem, modelista de roupas 3D e coordenador do setor de modelagem.',
      rec: 'A indústria da moda e do vestuário é um setor dinâmico que demanda cada vez mais profissionais atualizados com novas tecnologias (como softwares CAD e modelagem 3D) para garantir a precisão, a otimização de recursos e a qualidade dos produtos. O diploma do SENAI é amplamente reconhecido pelo mercado, ampliando as oportunidades de empregabilidade em indústrias e ateliês, e preparando o profissional para a continuidade dos estudos em cursos superiores como Design de Moda, Figurino e Indumentária e Produção do Vestuário.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Saúde e Segurança no Trabalho · 12h', 'Introdução a Indústria 4.0 · 24h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução ao Desenvolvimento de Projetos · 12h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          210,
          ['Fundamentos da Confecção do Vestuário · 80h', 'Fundamentos da Moda · 40h', 'Processo de Costura Industrial · 90h']
        ],
        [
          'Específico Profissional I',
          388,
          ['Modelagem Tridimensional Industrial do Vestuário · 60h', 'Desenvolvimento de Bases de Modelagem · 60h', 'Modelagem Plana Industrial do Vestuário em Tecido Plano · 108h', 'Modelagem Plana Industrial do Vestuário em Tecido de Malha · 80h', 'Prototipagem de Produtos do Vestuário · 80h']
        ],
        [
          'Específico Profissional II',
          290,
          ['Modelagem Informatizada de Produtos do Vestuário · 110h', 'Gestão de Equipes do Setor de Modelagem · 40h', 'Gestão dos Processos de Modelagem · 60h', 'Desenvolvimento de Projetos · 80h']
        ]
      ]
    },
    'Design Gráfico': {
      video: 'p38533949',
      obj: 'No curso Técnico em Design Gráfico você aprende a coordenar e Executar projetos de comunicação visual de mídias impressas e digitais seguindo padrões e normas técnicas, referentes à propriedade intelectual, acessibilidade, usabilidade e sustentabilidade.',
      campo: 'Escritórios de design, agências de publicidade, produtoras de vídeo e animação, desenvolvedoras de games e empresas de marketing digital, além da atuação em projetos envolvendo aplicativos, mídias sociais, cross media e modelagem 3D.',
      rec: 'A comunicação visual é um elemento estratégico na era da informação e da digitalização, exigindo profissionais criativos e altamente capacitados para atuar em diversas plataformas. O diploma do SENAI é amplamente reconhecido no mercado, abrindo portas em agências, estúdios de design e empresas de tecnologia, além de preparar o profissional para a continuidade dos estudos no ensino superior em áreas como Design, Animação, Direção de Arte e Produção Multimídia.',
      mods: [
        [
          'Módulo Básico',
          112,
          ['Introdução ao Desenvolvimento de Projetos · 12h', 'Introdução a Tecnologia da Informação e Comunicação · 40h', 'Saúde e Segurança no Trabalho · 12h', 'Introdução a Qualidade e Produtividade · 16h', 'Introdução a Indústria 4.0 · 24h', 'Sustentabilidade nos processos industriais · 8h']
        ],
        [
          'Módulo Introdutório',
          116,
          ['Fundamentos da Teoria da Cor · 32h', 'História do Design Gráfico · 28h', 'Fundamentos de Desenho e Percepção Visual · 32h', 'Fundamentos de Fotografia Digital e de Semiótica · 24h']
        ],
        [
          'Específico Profissional I',
          184,
          ['Tipografia · 44h', 'Produção Gráfica · 32h', 'Projetos de Mídias Digitais e Impressas · 32h', 'Imagem Digital · 76h']
        ],
        [
          'Específico Profissional II',
          408,
          ['Design de Embalagens · 84h', 'Design Editorial · 84h', 'Projeto de Identidade Visual · 84h', 'Design Promocional, Institucional e Sinalização · 76h', 'Motion Design · 80h']
        ],
        [
          'Específico Profissional III',
          180,
          ['Design de Interfaces · 80h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    }
  };
