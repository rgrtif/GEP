/* ══════════════════════════════════════════════════════════════════════
   app.js — palco 16:9, montagem/desmontagem, parallax e mapa de aprendizagem
   ══════════════════════════════════════════════════════════════════════ */
const palco = document.getElementById('palco');
const slides = [...document.querySelectorAll('.slide')];
/* ícone da área = o da ilha que reúne aquela área */
const iconeDaArea = a => (ILHAS.find(i => i.areas.includes(a)) || {}).icone || 'gestao';
const foto = slug => `assets/cursos/${slug}.jpg`;

/* ── palco em resolução de PowerPoint: 1920×1080 escalado ──
   O conteúdo fica no 16:9 (para bater com o PPT), mas o FUNDO precisa
   alcançar as bordas da janela. Como a camada de fundo vive dentro do
   palco já escalado, o tamanho da janela é dividido pela escala antes de
   virar CSS — assim ela cobre a tela real, e não o retângulo do palco. */
function escalar() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  palco.style.transform = `translate(-50%,-50%) scale(${s})`;
  palco.style.setProperty('--bgw', Math.ceil(innerWidth / s) + 'px');
  palco.style.setProperty('--bgh', Math.ceil(innerHeight / s) + 'px');
}
addEventListener('resize', escalar); escalar();

/* ══════════ navegação com montagem e desmontagem ══════════ */
const sumario = document.getElementById('sumario'),
      progresso = document.getElementById('progresso'),
      marca = document.getElementById('marca');
let atual = 0, trocando = false;

sumario.innerHTML = CAPS.map((c, i) =>
  `<button class="s${i === 0 ? ' on' : ''}" data-i="${i}"><em>0${i + 1}</em>${c}</button>`).join('');
sumario.addEventListener('click', e => { const b = e.target.closest('.s'); if (b) ir(+b.dataset.i) });

function ir(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  if (i === atual || trocando) return;
  trocando = true;
  const saindo = slides[atual];
  saindo.classList.add('saindo');                 // desmonta a tela atual

  setTimeout(() => {                              // e só então monta a próxima
    saindo.classList.remove('on', 'saindo');
    slides[i].classList.add('on');
    atual = i;
    sumario.querySelectorAll('.s').forEach((b, k) => b.classList.toggle('on', k === i));
    /* A régua é o SUMÁRIO, não a contagem de telas. O cartão de fechamento
       é uma sétima tela que não entra no sumário: medir por slides.length
       mudaria a largura da barra em todas as outras telas — e, no PPT, isso
       significa refazer as 110 chapas por causa de um cartão final. Passado
       o último capítulo, a barra fica cheia, que é o que ela quer dizer. */
    progresso.style.width = (Math.min(i + 1, CAPS.length) / CAPS.length * 100) + '%';
    tema(slides[i].classList.contains('dark'));
    midia(); contadores(slides[i]); fundoJanela();
    setTimeout(fundoJanela, 900);   // o vídeo pode ainda não ter quadro no instante da troca
    setTimeout(() => { trocando = false }, 260);
  }, 440);
}

addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('prateleira').classList.contains('aberta')) {
    fecharPrateleira(); return;                 // Esc sobe um nível, não sai da tela
  }
  /* nas telas travadas a seta e o espaço também não trocam de tela: a saída
     é clicar. Home continua funcionando como escape para a capa. */
  if (TELAS_TRAVADAS.has(atual) && e.key !== 'Home' && e.key !== 'End') return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); ir(atual + 1) }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(atual - 1) }
  if (e.key === 'Home') ir(0); if (e.key === 'End') ir(slides.length - 1);
});
/* A tela 06 tem painéis que rolam por dentro. Sem esta checagem a roda do
   mouse fazia as duas coisas ao mesmo tempo: rolava o painel E pulava de
   slide. Aqui a navegação só age quando o cursor NÃO está sobre um painel
   que ainda tem conteúdo para rolar naquela direção — chegando ao fim do
   painel, a roda volta a virar a tela, que é o comportamento esperado. */
function rolavel(alvo, dir) {
  for (let el = alvo; el && el !== document.body; el = el.parentElement) {
    const est = getComputedStyle(el).overflowY;
    if (est !== 'auto' && est !== 'scroll') continue;
    const sobra = el.scrollHeight - el.clientHeight;
    if (sobra < 2) continue;
    if (dir > 0 && el.scrollTop < sobra - 1) return true;
    if (dir < 0 && el.scrollTop > 1) return true;
  }
  return false;
}
/* Duas telas ficam TRAVADAS para roda, arrasto e setas: o learning map (05)
   e a ficha do curso (06).

   No mapa porque a navegação é a própria escolha da categoria — rolar sem
   querer pulava a tela e a demo perdia o gesto que ela existe para mostrar.
   Na ficha porque rolar é a interação principal (os painéis têm mais
   conteúdo do que cabe), e chegar ao fim do painel virava troca de slide.

   Sai-se daqui clicando: numa categoria que abre, no Voltar, ou no sumário
   do rodapé — nunca por acidente. */
const TELAS_TRAVADAS = new Set([4, 5]);
let trava = 0;
addEventListener('wheel', e => {
  const t = Date.now(); if (t - trava < 900 || Math.abs(e.deltaY) < 18) return;
  if (TELAS_TRAVADAS.has(atual)) return;
  const dir = e.deltaY > 0 ? 1 : -1;
  if (rolavel(e.target, dir)) return;
  trava = t; ir(atual + dir);
}, { passive: true });
let ty0 = null, tAlvo = null;
addEventListener('touchstart', e => { ty0 = e.touches[0].clientY; tAlvo = e.target }, { passive: true });
addEventListener('touchend', e => {
  if (ty0 === null) return;
  const d = ty0 - e.changedTouches[0].clientY;
  if (!TELAS_TRAVADAS.has(atual) && Math.abs(d) > 60 && !rolavel(tAlvo, d > 0 ? 1 : -1))
    ir(atual + (d > 0 ? 1 : -1));
  ty0 = null; tAlvo = null;
}, { passive: true });

/* ══════════ fundo da janela ══════════
   As tarjas laterais do letterbox recebem o fundo da tela ativa, desfocado.
   Duas camadas alternando para a troca ser um cross-fade, não um corte. */
const fj = [document.getElementById('fjA'), document.getElementById('fjB')];
let fjVez = 0;
function fundoJanela() {
  const sl = slides[atual];
  const alvo = fj[fjVez ^ 1];
  /* a prateleira aberta já resolve sozinha: .pratBg é um fundo de verdade,
     responsivo via --bgw/--bgh (a mesma receita da tela 02), e cobre a
     janela inteira por cima desta camada — não precisa de tratamento
     especial aqui. Chegou a existir um (recriar o gradiente na lateral),
     mas o crossfade entre as duas .fjCamada deixava uma linha visível na
     costura; a .pratBg é uma peça só, sem costura. */
  const img = sl.querySelector('.cena.on, .ilhasImg');
  const v = sl.querySelector('.bg video');
  const fonte = img ? img.currentSrc || img.src
              : (v && (v.currentSrc || v.src)) ? null : null;
  /* A arte do mapa já cobre a janela até ~2,3:1. Em ultrawide sobra uma
     faixa fina, e é esta camada que aparece nela — escurecida a 70%, o que
     virava uma tarja escura ao lado de uma cena clara. Só para o mapa, o
     fallback fica no tom claro da própria arte: a faixa vira continuação
     desfocada em vez de moldura. A sala segue escurecida (ela é escura). */
  alvo.classList.toggle('claro', !!img);
  if (fonte) { alvo.style.backgroundImage = `url("${fonte}")`; alvo.style.background_ = ''; }
  else if (v) {
    // vídeo não vira background-image: pinta um quadro dele num canvas
    try {
      const c = document.createElement('canvas');
      c.width = 320; c.height = 180;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      alvo.style.backgroundImage = `url("${c.toDataURL('image/jpeg', .7)}")`;
    } catch (e) { return; }
  } else return;
  alvo.classList.add('on'); fj[fjVez].classList.remove('on');
  fjVez ^= 1;
}

/* ══════════ mídia: só a tela ativa toca ══════════ */
function midia() {
  document.querySelectorAll('video').forEach(v => {
    if (v.closest('.slide') === slides[atual]) {
      if (!v.src && v.dataset.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  });
}

/* ══════════ 02 · o painel que reveza as áreas ══════════
   Quatro trechos, cada um com a sua legenda e o seu selo, definidos em
   PAINEL02 no dados.js. A tela apresenta a instituição inteira; mostrar
   uma área só — como fazia antes — dizia o contrário do texto ao lado.

   Os quatro <video> ficam empilhados e a troca é por opacidade. Trocar o
   src de um único elemento pareceria mais simples, mas pisca preto a cada
   volta enquanto o arquivo novo carrega — que foi o defeito que apareceu
   quando isto era um vídeo emendado só. */
const painelVids = document.getElementById('painelVids');
if (painelVids && typeof PAINEL02 !== 'undefined') {
  /* Cada trecho é vídeo OU foto. As fotos vêm do material do cliente e
     mostram estudantes; o acervo de vídeo quase só tem equipamento vazio,
     e a tela fala de formar gente. A foto ganha um zoom lento para não
     parecer que o painel travou ao lado dos trechos em movimento. */
  painelVids.innerHTML = PAINEL02.map((p, i) => {
    const aceso = i === 0 ? ' on' : '';
    return p.foto
      ? `<img class="painelFoto${aceso}" src="assets/painel/${p.foto}.jpg" alt="">`
      : `<video data-src="assets/video/${p.video}.mp4" class="${aceso.trim()}"
                muted loop playsinline preload="none"></video>`;
  }).join('');

  const selo = document.getElementById('painelSelo');
  const legenda = document.getElementById('painelLegenda');
  const painel = painelVids.closest('.painel');
  let vez = 0;

  const pintarPainel = () => {
    const p = PAINEL02[vez];
    legenda.textContent = p.legenda;
    /* selo vazio some: "Indústria 4.0" numa oficina de soldagem seria
       afirmação errada, e rótulo errado é pior que rótulo ausente */
    selo.classList.toggle('vazio', !p.selo);
    selo.querySelector('span').textContent = p.selo || '';
  };
  pintarPainel();

  const trocarPainel = () => {
    const vids = [...painelVids.children];
    if (slides[atual] !== document.getElementById('s2')) return;
    painel.classList.add('trocando');
    setTimeout(() => {
      const sai = vids[vez];
      sai.classList.remove('on');
      if (sai.pause) sai.pause();                    // foto não tem pause
      vez = (vez + 1) % PAINEL02.length;
      const v = vids[vez];
      if (v.tagName === 'VIDEO') {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        /* reinicia o zoom: sem isto a foto entra já no fim da animação
           quando volta a vez dela */
        v.style.animation = 'none'; void v.offsetWidth; v.style.animation = '';
      }
      v.classList.add('on');
      pintarPainel();
      painel.classList.remove('trocando');
    }, 320);
  };
  /* 5,5s por trecho: os vídeos do pacote têm 6s, então cada um é visto
     quase inteiro antes de passar a vez */
  const relogio = setInterval(trocarPainel, 5500);

  /* Fixa um trecho e para o rodízio. Só o exportador do PPT chama isto:
     lá cada área vira um slide próprio, e para fotografar um slide de cada
     vez o painel não pode estar girando. No navegador ninguém chama — o
     rodízio segue como sempre. */
  window.painel02 = n => {
    clearInterval(relogio);
    const vids = [...painelVids.children];
    vids.forEach(el => { el.classList.remove('on'); if (el.pause) el.pause(); });
    vez = ((n % PAINEL02.length) + PAINEL02.length) % PAINEL02.length;
    const v = vids[vez];
    if (v.tagName === 'VIDEO') {
      if (!v.src && v.dataset.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    }
    v.classList.add('on');
    pintarPainel();
    return PAINEL02[vez];
  };
}

/* ══════════ contadores ══════════ */
function contadores(sl) {
  sl.querySelectorAll('[data-num]').forEach(el => {
    const bruto = el.dataset.num, suf = el.dataset.suf || '', dec = bruto.includes(',') ? 1 : 0,
          zero = bruto.startsWith('0') && bruto.length > 1, alvo = parseFloat(bruto.replace(',', '.'));
    const t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / 1300, 1), e = 1 - Math.pow(1 - p, 3);
      let s = (alvo * e).toFixed(dec).replace('.', ',');
      if (zero && p === 1) s = '0' + s;
      el.textContent = s + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}

/* ══════════ 03 · ecos sobre as unidades do mapa ══════════
   delays espalhados para que só três ou quatro pulsem por vez — a rede
   parece viva sem a tela virar pisca-pisca */
document.querySelector('#s3 .mapa').insertAdjacentHTML('beforeend',
  UNIDADES.map(([x, y, nome], i) =>
    `<i class="pin" style="left:${x}%;top:${y}%;animation-delay:${(i * .21).toFixed(2)}s" title="${nome}"></i>`
  ).join(''));

/* nós e nomes do mapa holográfico — os do mapa colorido estão gravados na
   imagem, em azul-escuro, e sumiriam sobre o fundo escuro desta versão */
document.getElementById('mhPontos').innerHTML =
  UNIDADES.map(([x, y, nome, lado = 'r']) =>
    `<b style="left:${x}%;top:${y}%"></b>` +
    `<i data-l="${lado}" style="left:${x}%;top:${y}%">${nome}</i>`).join('');

/* ══════════ 04 · as 32 áreas tecnológicas ══════════
   Sai de AREAS, não de ILHAS. A grade vinha das 19 categorias do PROPAG
   enquanto o título ao lado prometia "32 áreas tecnológicas" — o número
   dito e o número mostrado não batiam. São recortes diferentes de propósito:
   esta tela é o alcance INSTITUCIONAL da Firjan SENAI, a 05 é a oferta
   2026.2. Os ícones são os do quadro oficial do cliente, recortados e
   recoloridos em scripts/icones-oficiais.mjs. */
document.getElementById('fazGrade').innerHTML =
  AREAS.map(([nome, slug], i) => `
      <div class="fz" style="--d:${(i * .022).toFixed(3)}s">
        <img src="assets/areas/${slug}.png" alt="">
        <b>${nome}</b>
      </div>`).join('');


/* ══════════════════════════════════════════════════════════════════════
   05 · LEARNING MAP — 3 páginas
   Cada página é uma cena com as suas ilhas. Ilhas, fios e paginação são
   redesenhados a cada virada, a partir de ILHAS filtrado por página.
   Dois níveis — ilhas → prateleira → detalhe (tela 06) — e o Fechar
   sempre volta um nível, nunca joga o usuário para fora.
   ══════════════════════════════════════════════════════════════════════ */
const s5 = document.getElementById('s5'),
      prateleira = document.getElementById('prateleira'),
      pratFileira = document.getElementById('pratFileira'),
      cenaCaixa = document.getElementById('cenaCaixa'),
      camadaIlhas = document.getElementById('camadaIlhas');
let pagAtual = 0;

/* Três cenas fechadas, uma por página, empilhadas no mesmo lugar e
   trocadas por cross-fade.

   Por um tempo o mapa foi um galpão vazio com as ilhas recortadas pousadas
   por cima. Voltou a ser assim: as ilhas fazem parte do DESENHO da cena, e
   a interface só pousa chip e fio em cima. Some com o recorte, com o
   posicionamento por algoritmo e com a camada de arte — o que a imagem
   mostra é o que existe.

   Todas as três entram no DOM de uma vez, e a troca é só a classe `.on`.
   Criar a imagem na hora da virada faria a página nova aparecer em branco
   enquanto o arquivo carrega. */
cenaCaixa.innerHTML = PAGINAS.map((p, i) =>
  `<img class="cena${i === 0 ? ' on' : ''}" data-pag="${i}"
        src="assets/cena/${p.cena}" alt="${p.nome}">`).join('');

/* Tudo em % do PALCO de 1920×1080, que é a mesma medida do título, do
   rodapé e do PowerPoint. A caixa separada de 1990×1110 existia para a
   arte antiga, em que cada página era uma cena única desenhada fechada. */
const CENA_W = 1920, CENA_H = 1080;
/* nome curto colidia com o `px` do parallax, que já existia neste arquivo */
const emPx = (v, eixo) => (v / 100 * (eixo === 'x' ? CENA_W : CENA_H)).toFixed(1);

function pintarPagina(anima, dir = 0) {
  const daPag = ILHAS.filter(il => il.pag === pagAtual);

  /* motion da virada: a cena que sai desliza para o lado de onde viemos e
     a que entra ocupa o lugar — a direção conta ao usuário se ele avançou
     ou voltou, coisa que um cross-fade puro não diz */
  s5.dataset.pag = pagAtual;

  /* a cena da página: as ilhas já estão desenhadas dentro dela */
  cenaCaixa.querySelectorAll('.cena').forEach(img =>
    img.classList.toggle('on', +img.dataset.pag === pagAtual));

  document.getElementById('fios').innerHTML = daPag.map((il, i) => `
    <g class="chamada" data-ativo="${il.ativo}" style="--atraso:${(i * .08).toFixed(2)}s">
      <line x1="${emPx(il.cx, 'x')}" y1="${emPx(il.cy, 'y')}" x2="${emPx(il.ax, 'x')}" y2="${emPx(il.ay, 'y')}"/>
      <circle class="alvoFora" cx="${emPx(il.ax, 'x')}" cy="${emPx(il.ay, 'y')}" r="13"/>
      <circle class="alvoMiolo" cx="${emPx(il.ax, 'x')}" cy="${emPx(il.ay, 'y')}" r="4.5"/>
    </g>`).join('');

  document.getElementById('ilhas').innerHTML = daPag.map((il, i) => {
    const n = cursosDaIlha(il).length;
    return `<div class="ilha" data-id="${il.id}" data-ativo="${il.ativo}"
              style="left:${il.cx}%;top:${il.cy}%;--atraso:${(i * .07).toFixed(2)}s;--giro:${(i * 1.7).toFixed(1)}s"
              ${il.ativo ? 'role="button" tabindex="0"' : ''}>
      <span class="ilhaIcone"><img src="assets/icones-limpos/${il.icone}.svg" alt=""></span>
      <span class="ilhaTxt"><i>Categoria</i><b>${il.nome}</b><span>${il.sub}</span></span>
      <span class="ilhaNum">${n}</span>
    </div>`;
  }).join('');

  document.getElementById('pgPontos').innerHTML = PAGINAS.map((p, i) =>
    `<button data-p="${i}" class="${i === pagAtual ? 'on' : ''}"
       aria-label="Página ${i + 1} de ${PAGINAS.length}: ${p.nome}"></button>`).join('');
  document.querySelectorAll('.pgSeta').forEach(b => {
    b.disabled = +b.dataset.d < 0 ? pagAtual === 0 : pagAtual === PAGINAS.length - 1;
  });
  if (anima) fundoJanela();
}

/* A troca de página é um deslocamento pela fábrica, não um corte: as
   ilhas saem para um lado e as novas entram do outro, cada uma andando na
   medida do seu tamanho. O fundo é o mesmo galpão e não pisca. */
let virando = false;
function irPagina(i) {
  const n = Math.max(0, Math.min(PAGINAS.length - 1, i));
  if (n === pagAtual || virando) return;
  const dir = n > pagAtual ? 1 : -1;
  virando = true;
  s5.style.setProperty('--dir', dir);
  s5.classList.add('saindo');
  fecharPrateleira();
  setTimeout(() => {
    pagAtual = n; pintarPagina(true, dir);
    s5.classList.remove('saindo');
    s5.classList.add('entrando');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      s5.classList.remove('entrando');
      setTimeout(() => { virando = false; }, 540);
    }));
  }, 330);
}

/* Aqui havia uma chamada a `posicionarIlhas()`, de uma versão em que os
   chips eram posicionados em tempo de execução. Essa função não existe
   mais: hoje as coordenadas são calculadas por `compor-mapa.mjs` e ficam
   gravadas em `dados.js`, e o palco inteiro escala junto — não há o que
   recalcular ao redimensionar.

   A linha ficou para trás e quebrava de verdade: bastava redimensionar a
   janela com o mapa aberto para estourar um ReferenceError. Passou
   despercebida porque ninguém redimensiona a janela apresentando — só
   apareceu no celular, onde a barra do navegador some ao rolar e dispara
   resize sozinha.

   O que precisa acontecer no resize já acontece: `escalar()` (linha 21)
   recalcula a escala do palco e o sangramento do fundo. */

document.getElementById('paginacao').addEventListener('click', e => {
  const seta = e.target.closest('.pgSeta');
  if (seta && !seta.disabled) return irPagina(pagAtual + (+seta.dataset.d));
  const ponto = e.target.closest('[data-p]');
  if (ponto) irPagina(+ponto.dataset.p);
});

document.getElementById('ilhas').addEventListener('click', e => {
  const il = e.target.closest('.ilha');
  if (il && il.dataset.ativo === '1') abrirPrateleira(il.dataset.id);
});

pintarPagina(false);

function abrirPrateleira(id) {
  const s = ILHAS.find(x => x.id === id), lista = cursosDaIlha(s);
  document.getElementById('pratIcone').src = `assets/icones-limpos/${s.icone}.svg`;
  document.getElementById('pratNome').textContent = s.nome;
  document.getElementById('pratSub').textContent =
    `${lista.length} ${lista.length === 1 ? 'título técnico' : 'títulos técnicos'} · ${s.sub}`;
  document.getElementById('pratMarca').src = `assets/icones-limpos/${s.icone}.svg`;
  pratFileira.innerHTML = lista.map(c => `
    <button class="thumb" data-nome="${c[0]}">
      <span class="thumbChao"></span>
      <span class="thumbArte"><img src="${foto(c[3])}" alt=""></span>
      <span class="thumbLuz"></span>
      <span class="thumbPlay"></span>
      <span class="thumbInfo">
        <b>Técnico em ${c[0]}</b>
        <span class="thumbArea">${c[1]}</span>
        <span class="thumbCH"><b>${c[2].toLocaleString('pt-BR')}</b><i>h</i>
          <em>${unidadesDe(c[0])}</em></span>
      </span>
    </button>`).join('');
  prateleira.classList.add('aberta');
  document.getElementById('pratBg').classList.add('aberta');
  document.getElementById('mapaUI').classList.add('comPrat');   // esconde título/ilhas/fios atrás do painel
  tema(false);       // a vitrine é clara: o chrome acompanha
}
function fecharPrateleira() {
  prateleira.classList.remove('aberta');
  document.getElementById('pratBg').classList.remove('aberta');
  document.getElementById('mapaUI').classList.remove('comPrat');
  tema(slides[atual].classList.contains('dark'));
}
/* Topo e rodapé pedem tratamentos diferentes: no modo mapa a faixa azul cobre
   só o alto da tela, então a marca vai de negativa enquanto o sumário, lá
   embaixo, continua no tema claro. */
function tema(escuro) {
  const sl = slides[atual];
  const topoAzul = sl.id === 's5' && sl.dataset.modo === 'mapa'
                   && !sl.querySelector('.prateleira.aberta');
  palco.dataset.tema = escuro ? 'escuro' : 'claro';
  palco.dataset.topo = (escuro || topoAzul) ? 'escuro' : 'claro';
  marca.src = (escuro || topoAzul) ? 'assets/brand/logo-negativo.svg' : 'assets/brand/logo-cor.svg';
}
pratFileira.addEventListener('click', e => {
  const t = e.target.closest('.thumb'); if (t) abrirCurso(t.dataset.nome, 'mapa');
});

/* volta um nível: para a prateleira de onde veio — e para a PÁGINA dela,
   já que a mesma categoria só existe numa das três cenas */
function voltarDoCurso() {
  const { cat } = origemCurso;
  const il = ILHAS.find(x => x.id === cat);
  if (il && il.pag !== pagAtual) { pagAtual = il.pag; pintarPagina(false); }
  ir(4);
  setTimeout(() => abrirPrateleira(cat), 480);
}

/* a etiqueta PROPAG alterna a capa entre escuro e claro — também sem legenda,
   e trocando o vídeo de fundo junto, porque o loop escuro não lava bem */
/* a etiqueta PROPAG segue como atalho na tela 03: alterna o mapa do RJ
   entre a versão colorida e a holográfica */
document.querySelector('.tag').addEventListener('click', () => {
  if (atual !== 2) return;
  const m = document.querySelector('#s3 .mapa');
  m.dataset.modo = m.dataset.modo === 'holo' ? 'padrao' : 'holo';
});

/* na capa quem alterna claro/escuro é o LOGO — a etiqueta saiu dali, porque
   PROPAG virou o título e repetir o ano no topo era redundante */
marca.addEventListener('click', () => {
  if (atual !== 0) return;
  const s1 = slides[0], v = s1.querySelector('video');
  const escuro = s1.classList.toggle('dark');
  v.src = escuro ? v.dataset.src : v.dataset.claro;
  v.play().catch(() => {});
  tema(escuro);
});

/* Na v6 esta etiqueta dizia "ficha completa" ou "ficha resumida", porque
   só seis dos 27 títulos tinham conteúdo. Agora todos têm, vindos do
   .pptx — dizer "ficha completa" 27 vezes é dizer nada. O número de
   unidades curriculares ocupa o mesmo espaço e informa: é o tamanho do
   itinerário que o participante vai cursar. */
const unidadesDe = nome => {
  const d = DETALHE[nome];
  if (!d) return 'ficha resumida';
  const n = d.mods.reduce((s, m) => s + m[2].length, 0);
  return `${n} unidade${n === 1 ? '' : 's'}`;
};

/* ══════════ 06 · detalhamento ══════════ */
/* de onde o curso foi aberto — o Voltar precisa devolver ao mesmo lugar */
let origemCurso = { cat: ILHAS[0].id };

function abrirCurso(nome, origem) {
  const c = CURSOS.find(x => x[0] === nome), d = DETALHE[nome];
  origemCurso = { cat: (ILHAS.find(i => i.areas.includes(c[1])) || ILHAS[0]).id };
  document.getElementById('dNome').textContent = 'Técnico em ' + nome;
  document.getElementById('dArea').textContent = c[1];
  document.getElementById('dIcone').src = `assets/icones-limpos/${iconeDaArea(c[1])}.svg`;
  document.getElementById('dFoto').src = foto(c[3]);
  document.getElementById('vidDetalhe').src = `assets/video/${d ? d.video : 'p32386518'}.mp4`;
  document.getElementById('dCH').innerHTML =
    `<em>Carga horária</em><span>${c[2].toLocaleString('pt-BR')}<i>h</i></span>`;
  pintarDetalhe(c, d);
  ir(5);
}
function pintarDetalhe(c, d) {
  const $ = id => document.getElementById(id);
  if (d) {
    $('dObj').textContent = d.obj; $('dCampo').textContent = d.campo; $('dRec').textContent = d.rec;
    // a barra mede a fatia do CURSO, não do maior módulo: é o que responde
    // "quanto do meu tempo total isso ocupa"
    const total = d.mods.reduce((s, m) => s + m[1], 0);
    /* os números escritos vêm de fatiasPorcento (dados.js) para somarem
       100 na coluna; a BARRA continua na proporção exata, que é o que ela
       existe para mostrar */
    const pct = fatiasPorcento(d.mods.map(m => m[1]));
    $('dModulos').innerHTML = d.mods.map((m, i) => {
      const fatia = m[1] / total * 100;
      return `<div class="mod">
        <div class="lin"><span class="nome">${m[0]}</span>
          <span class="h"><b>${m[1]}</b><i>h</i></span></div>
        <div class="prog">
          <div class="barra"><i style="--w:${fatia.toFixed(1)}%"></i></div>
          <span class="parte">${pct[i]}% do curso</span>
        </div>
        <div class="destaques">${m[2].map(x => `<span>${x}</span>`).join('')}</div>
      </div>`;
    }).join('');
  } else {
    /* Caminho de exceção, e não mais o caso comum: os 27 títulos da tabela
       têm ficha vinda do .pptx. Isto aparece se alguém acrescentar uma
       linha à tabela-mestra sem a ficha correspondente — e então precisa
       dizer exatamente isso, em vez de inventar um itinerário genérico
       como fazia antes. Texto que descreve conteúdo que não existe é pior
       do que espaço vazio: parece informação. */
    $('dObj').textContent = `O título "${c[0]}" está na tabela de oferta, mas ainda não tem `
      + 'ficha detalhada no material de origem.';
    $('dCampo').textContent = 'Assim que a ficha entrar no .pptx do cliente, ela aparece aqui '
      + 'automaticamente — o conteúdo desta tela é lido de lá.';
    $('dRec').textContent = '';
    $('dModulos').innerHTML = `<div class="mod">
      <div class="lin"><span class="nome">Carga horária total</span><span class="h">${c[2].toLocaleString('pt-BR')}h</span></div>
      <div class="aviso">Itinerário não informado no material de origem.</div></div>`;
  }
}

/* ══════════ parallax de ponteiro ══════════ */
const px = [...document.querySelectorAll('.px')];
let tx = 0, ty = 0, cx = 0, cy = 0;
addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5 });
(function laco() {
  cx += (tx - cx) * .055; cy += (ty - cy) * .055;
  for (const el of px) {
    if (el.closest('.slide') !== slides[atual]) continue;
    const v = +el.dataset.vel || 10, s = el.dataset.esc ? ` scale(${el.dataset.esc})` : '';
    el.style.transform = `translate3d(${cx * v * 2}px,${cy * v * 1.4}px,0)${s}`;
  }
  requestAnimationFrame(laco);
})();

/* ══════════ arranque ══════════ */
(function inicio() {
  /* semeia a tela 06 com o primeiro curso QUE TEM ficha — CURSOS[0] deixou de
     ser um deles quando o detalhamento passou a cobrir só Metalmecânica */
  const c = CURSOS.find(x => DETALHE[x[0]]) || CURSOS[0];
  document.getElementById('dNome').textContent = 'Técnico em ' + c[0];
  document.getElementById('dArea').textContent = c[1];
  document.getElementById('dFoto').src = foto(c[3]);
  document.getElementById('dCH').innerHTML =
    `<em>Carga horária</em><span>${c[2].toLocaleString('pt-BR')}<i>h</i></span>`;
  document.getElementById('dIcone').src = `assets/icones-limpos/${iconeDaArea(c[1])}.svg`;
  document.getElementById('vidDetalhe').dataset.src = `assets/video/${(DETALHE[c[0]] || {}).video || 'p32386518'}.mp4`;
  pintarDetalhe(c, DETALHE[c[0]]);
  midia(); contadores(slides[0]); setTimeout(fundoJanela, 1200);
})();
