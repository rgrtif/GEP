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
const CAPS = ['Capa', 'Quem somos', 'Presença', 'O que fazemos', 'Cursos Técnicos',
              'Detalhamento', 'Fechamento'];

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
      id: 'p1',
      nome: 'Automação, TI e produção',
      cena: 'ilhas-p1.jpg',
      ilhas: ['auto', 'eletro1', 'metalmec', 'comunic', 'tiSoft', 'logist', 'gestao']
    },
    {
      id: 'p2',
      nome: 'Processos, obra e alimentos',
      cena: 'ilhas-p2.jpg',
      ilhas: ['solda', 'tiHard', 'refri', 'grafica', 'segur', 'alim', 'civil']
    },
    {
      id: 'p3',
      nome: 'Energia, química e moda',
      cena: 'ilhas-p3.jpg',
      ilhas: ['energ', 'quim', 'metalurg', 'vest', 'automot']
    }
  ];

/* ── 27 títulos técnicos — transcritos da tabela do cliente ──
   [nome, área tecnológica, carga horária, foto] */
const CURSOS = [
    ['Automação Industrial', 'Automação e Mecatrônica', 1200, 'automacao-industrial'],
    ['Eletrotécnica', 'Eletroeletrônica', 1200, 'eletrotecnica'],
    ['Mecânica', 'Metalmecânica - Mecânica', 1200, 'mecanica'],
    ['Computação Gráfica', 'Comunicação Midiática', 1200, 'computacao-grafica'],
    ['Produção de Áudio e Vídeo', 'Comunicação Midiática', 1200, 'audio-video'],
    ['Mecatrônica', 'Automação e Mecatrônica', 1200, 'mecatronica'],
    ['Desenvolvimento de Sistemas', 'TI - Software', 1200, 'desenvolvimento-sistemas'],
    ['Logística', 'Logística', 1200, 'logistica'],
    ['Planejamento e Controle da Produção', 'Gestão Industrial', 1000, 'pcp'],
    ['Soldagem', 'Metalmecânica - Soldagem', 1200, 'soldagem'],
    ['Redes de Computadores', 'TI - Hardware', 1000, 'redes'],
    ['Refrigeração e Climatização', 'Refrigeração e Climatização', 1200, 'refrigeracao'],
    ['Processos Gráficos', 'Gráfica, Mídias Impressas e Digitais', 1000, 'processos-graficos'],
    ['Eletromecânica', 'Metalmecânica - Mecânica', 1200, 'eletromecanica'],
    ['Segurança do Trabalho', 'Segurança do Trabalho', 1200, 'seguranca'],
    ['Alimentos', 'Alimentos', 1200, 'alimentos'],
    ['Edificações', 'Construção Civil', 1200, 'edificacoes'],
    ['Sistemas de Energia Renovável', 'Energias Renováveis', 1200, 'energia-renovavel'],
    ['Química', 'Química', 1200, 'quimica'],
    ['Eletroeletrônica', 'Eletroeletrônica', 1200, 'eletroeletronica'],
    ['Vestuário', 'Vestuário', 1200, 'vestuario'],
    ['Manutenção Automotiva', 'Automotiva', 1200, 'automotiva'],
    ['Manutenção de Máquinas Industriais', 'Metalmecânica - Mecânica', 1200, 'maquinas-industriais'],
    ['Panificação', 'Alimentos', 1200, 'panificacao'],
    ['Metalurgia', 'Metalmecânica - Metalurgia', 1200, 'metalurgia'],
    ['Qualidade', 'Gestão Industrial', 1000, 'qualidade'],
    ['Produção de Moda', 'Vestuário', 1000, 'moda']
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
      id: 'auto',
      pag: 0,
      nome: 'Automação e Mecatrônica',
      icone: 'automacao',
      sub: 'Robótica, CLP e acionamentos',
      areas: ['Automação e Mecatrônica'],
      ax: 25.5,
      ay: 70,
      cx: 14,
      cy: 82,
      ativo: 1
    },
    {
      id: 'eletro1',
      pag: 0,
      nome: 'Eletroeletrônica',
      icone: 'eletroeletronica',
      sub: 'Eletrotécnica e eletrônica',
      areas: ['Eletroeletrônica'],
      ax: 50,
      ay: 55,
      cx: 54,
      cy: 65,
      ativo: 1
    },
    {
      id: 'metalmec',
      pag: 0,
      nome: 'Metalmecânica - Mecânica',
      icone: 'metalmecanica',
      sub: 'Usinagem e manutenção industrial',
      areas: ['Metalmecânica - Mecânica'],
      ax: 77.5,
      ay: 73,
      cx: 86,
      cy: 47,
      ativo: 1
    },
    {
      id: 'comunic',
      pag: 0,
      nome: 'Comunicação Midiática',
      icone: 'midias',
      sub: 'Áudio, vídeo e computação gráfica',
      areas: ['Comunicação Midiática'],
      ax: 51.5,
      ay: 89,
      cx: 74,
      cy: 84,
      ativo: 1
    },
    {
      id: 'tiSoft',
      pag: 0,
      nome: 'TI - Software',
      icone: 'ti',
      sub: 'Desenvolvimento de sistemas',
      areas: ['TI - Software'],
      ax: 30,
      ay: 42.5,
      cx: 34,
      cy: 22,
      ativo: 1
    },
    {
      id: 'logist',
      pag: 0,
      nome: 'Logística',
      icone: 'logistica',
      sub: 'Cadeia de suprimentos',
      areas: ['Logística'],
      ax: 71,
      ay: 37,
      cx: 85,
      cy: 22,
      ativo: 1
    },
    {
      id: 'gestao',
      pag: 0,
      nome: 'Gestão Industrial',
      icone: 'gestao',
      sub: 'PCP e qualidade',
      areas: ['Gestão Industrial'],
      ax: 49,
      ay: 31.5,
      cx: 57,
      cy: 13,
      ativo: 1
    },
    {
      id: 'solda',
      pag: 1,
      nome: 'Metalmecânica - Soldagem',
      icone: 'soldagem',
      sub: 'Processos de soldagem',
      areas: ['Metalmecânica - Soldagem'],
      ax: 31,
      ay: 45,
      cx: 42,
      cy: 20,
      ativo: 1
    },
    {
      id: 'tiHard',
      pag: 1,
      nome: 'TI - Hardware',
      icone: 'ti',
      sub: 'Redes e infraestrutura',
      areas: ['TI - Hardware'],
      ax: 50,
      ay: 33,
      cx: 55,
      cy: 10,
      ativo: 1
    },
    {
      id: 'refri',
      pag: 1,
      nome: 'Refrigeração e Climatização',
      icone: 'refrigeracao',
      sub: 'Sistemas prediais e industriais',
      areas: ['Refrigeração e Climatização'],
      ax: 72,
      ay: 44.5,
      cx: 84,
      cy: 20,
      ativo: 1
    },
    {
      id: 'grafica',
      pag: 1,
      nome: 'Gráfica, Mídias Impressas e Digitais',
      icone: 'midias',
      sub: 'Processos gráficos',
      areas: ['Gráfica, Mídias Impressas e Digitais'],
      ax: 25.5,
      ay: 76.5,
      cx: 16,
      cy: 83,
      ativo: 1
    },
    {
      id: 'segur',
      pag: 1,
      nome: 'Segurança do Trabalho',
      icone: 'seguranca',
      sub: 'Prevenção e normas',
      areas: ['Segurança do Trabalho'],
      ax: 51,
      ay: 59.5,
      cx: 65,
      cy: 56,
      ativo: 1
    },
    {
      id: 'alim',
      pag: 1,
      nome: 'Alimentos',
      icone: 'alimentos',
      sub: 'Processamento e panificação',
      areas: ['Alimentos'],
      ax: 77,
      ay: 69.5,
      cx: 86,
      cy: 48,
      ativo: 1
    },
    {
      id: 'civil',
      pag: 1,
      nome: 'Construção Civil',
      icone: 'construcao',
      sub: 'Edificações e projetos',
      areas: ['Construção Civil'],
      ax: 51,
      ay: 90,
      cx: 57,
      cy: 71,
      ativo: 1
    },
    {
      id: 'energ',
      pag: 2,
      nome: 'Energias Renováveis',
      icone: 'energias',
      sub: 'Solar e eólica',
      areas: ['Energias Renováveis'],
      ax: 32,
      ay: 43,
      cx: 32,
      cy: 22,
      ativo: 1
    },
    {
      id: 'quim',
      pag: 2,
      nome: 'Química',
      icone: 'quimica',
      sub: 'Processos e laboratório',
      areas: ['Química'],
      ax: 70.5,
      ay: 40,
      cx: 84,
      cy: 20,
      ativo: 1
    },
    {
      id: 'metalurg',
      pag: 2,
      nome: 'Metalmecânica - Metalurgia',
      icone: 'metalmecanica',
      sub: 'Fundição, tratamentos e ensaios',
      areas: ['Metalmecânica - Metalurgia'],
      ax: 50.5,
      ay: 57,
      cx: 50.5,
      cy: 78,
      ativo: 1
    },
    {
      id: 'vest',
      pag: 2,
      nome: 'Vestuário',
      icone: 'vestuario',
      sub: 'Confecção e moda',
      areas: ['Vestuário'],
      ax: 25.5,
      ay: 75.5,
      cx: 14,
      cy: 62,
      ativo: 1
    },
    {
      id: 'automot',
      pag: 2,
      nome: 'Automotiva',
      icone: 'automotiva',
      sub: 'Manutenção veicular',
      areas: ['Automotiva'],
      ax: 77.5,
      ay: 74,
      cx: 86,
      cy: 55,
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
    'Eletroeletrônica': {
      video: 'p32386518',
      obj: 'No curso Técnico em Eletroeletrônica da Firjan SENAI você aprende a desenvolver projetos, implementar e realizar a manutenção de sistemas eletroeletrônicos de baixa tensão, utilizando tecnologias voltadas à conectividade, eficiência energética e inovação. O curso forma profissionais preparados para atuar conforme a legislação, normas técnicas, requisitos de qualidade, meio ambiente e saúde e segurança do trabalho.',
      campo: 'O Técnico em Eletroeletrônica pode atuar em indústrias de manufatura, empresas de automação industrial, concessionárias de energia, fabricantes de equipamentos eletroeletrônicos, empresas de manutenção, telecomunicações, construção civil, integradoras de sistemas, hospitais, shopping centers e empresas de tecnologia.',
      rec: 'A transformação digital e a expansão da automação industrial aumentam continuamente a demanda por profissionais especializados em eletroeletrônica. O diploma do SENAI é reconhecido pela indústria nacional e proporciona excelentes oportunidades de empregabilidade, além de servir como base para cursos superiores nas áreas de engenharia, automação e tecnologia.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          120,
          ['Fundamentos da Eletroeletrônica · 120h']
        ],
        [
          'Específico Profissional I',
          340,
          ['Implementação de Sistemas Eletroeletrônicos Prediais · 120h', 'Implementação de Sistemas Eletroeletrônicos Industriais · 120h', 'Implementação de Sistemas Eletrônicos Industriais · 60h', 'Processos de Implementação de Sistemas Eletroeletrônicos · 40h']
        ],
        [
          'Específico Profissional II',
          252,
          ['Manutenção de Sistemas Eletroeletrônicos Prediais · 60h', 'Manutenção de Sistemas Eletroeletrônicos Industriais · 92h', 'Manutenção de Sistemas Eletrônicos Industriais · 60h', 'Supervisão da Manutenção de Sistemas Eletroeletrônicos · 40h']
        ],
        [
          'Específico Profissional III',
          408,
          ['Projeto de Sistemas Eletroeletrônicos Prediais · 88h', 'Projeto de Sistemas Eletroeletrônicos Industriais · 120h', 'Projeto de Circuitos Eletrônicos Industriais · 80h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
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
    Metalurgia: {
      video: 'p32386590',
      obj: 'No curso Técnico em Metalurgia da Firjan SENAI você aprende a implementar, coordenar e desenvolver soluções tecnológicas para os processos metalúrgicos, atuando desde a transformação de materiais metálicos até o controle dos processos produtivos. O curso prepara o profissional para aplicar tecnologias industriais, considerando os conceitos de ESG, normas técnicas, qualidade, sustentabilidade, meio ambiente e saúde e segurança do trabalho.',
      campo: 'O Técnico em Metalurgia encontra oportunidades em siderúrgicas, fundições, indústrias metalúrgicas, empresas de transformação de metais, fabricantes de autopeças, setor automotivo, naval, petróleo e gás, mineração, laboratórios de ensaios, centros de pesquisa e empresas de consultoria técnica.',
      rec: 'A indústria metalúrgica é um dos pilares do desenvolvimento industrial brasileiro, demandando profissionais qualificados para otimizar processos, aumentar a produtividade e garantir a qualidade dos produtos. O diploma do SENAI é amplamente reconhecido pelo setor produtivo e amplia as oportunidades de inserção no mercado de trabalho e continuidade dos estudos em cursos superiores de tecnologia e engenharia.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          208,
          ['Desenho Técnico · 60h', 'Ciências Aplicadas a Metalurgia · 60h', 'Fundamentos da Metalurgia · 48h', 'Usinagem Aplicada a Metalurgia · 40h']
        ],
        [
          'Específico Profissional I',
          228,
          ['Ensaios Metalúrgicos · 116h', 'Técnicas de Análises Metálicas · 60h', 'Corrosão · 52h']
        ],
        [
          'Específico Profissional II',
          408,
          ['Fundição · 40h', 'Manufatura Aditiva · 60h', 'Conformação Mecânica · 80h', 'Tratamentos Térmicos e Termoquímicos · 60h', 'Tratamento de Superfície e de Efluentes · 40h', 'Metalurgia Física · 68h', 'Soldagem · 60h']
        ],
        [
          'Específico Profissional III',
          276,
          ['Gestão de Pessoas · 44h', 'Projetos Metalúrgicos · 60h', 'Controle de Processos Industriais · 52h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
        ]
      ]
    },
    Qualidade: {
      video: 'p11887093',
      obj: 'No curso Técnico em Qualidade da Firjan SENAI você aprende a implantar sistemas de gestão e controle da qualidade, promover melhorias contínuas nos processos organizacionais e contribuir para a excelência operacional e a satisfação dos clientes, utilizando tecnologias emergentes e respeitando a legislação, normas de qualidade, sustentabilidade e saúde e segurança do trabalho.',
      campo: 'O Técnico em Qualidade pode atuar em indústrias de diversos segmentos, empresas de serviços, logística, saúde, tecnologia, construção civil, comércio, laboratórios, consultorias, certificadoras e organizações públicas e privadas que possuam sistemas de gestão da qualidade.',
      rec: 'A gestão da qualidade tornou-se um diferencial competitivo para organizações de todos os setores, aumentando a demanda por profissionais especializados em melhoria contínua e gestão de processos. O diploma do SENAI é reconhecido pelo mercado e amplia as oportunidades de empregabilidade, além de servir como base para a continuidade dos estudos em cursos superiores nas áreas de gestão, engenharia e tecnologia.',
      mods: [
        [
          'Módulo Básico',
          80,
          ['Ferramentas Digitais para o Mercado de Trabalho · 40h', 'Linguagens e Multimeios · 40h']
        ],
        [
          'Módulo Introdutório',
          180,
          ['Fundamentos da Qualidade · 60h', 'Sistemas de Medição · 120h']
        ],
        [
          'Específico Profissional I',
          480,
          ['Análise e Diagnóstico de Processos · 120h', 'Melhoria Contínua e Conformidade do SGQ · 160h', 'Planejamento e Implementação do SGQ · 100h', 'Auditoria da Qualidade · 100h']
        ],
        [
          'Específico Profissional II',
          260,
          ['Aprimoramento de Processos · 140h', 'Neoindustrialização: (R)evolução, Produtividade e Sustentabilidade · 20h', 'Desenvolvimento de Projetos · 100h']
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
    }
  };
