/* ══════════════════════════════════════════════════════════════════════
   celular.js — a mesma apresentação, remontada para telefone.

   NADA de conteúdo mora aqui. Tudo é lido de `dados.js`, o mesmo arquivo
   que a versão de tela grande usa e que o `extrair-conteudo.mjs` reescreve
   a partir do .pptx do cliente. Uma revisão nova atualiza as duas versões
   na mesma rodada — foi por isso que a camada de conteúdo ficou separada
   da de layout desde o começo.

   O que muda é só COMO o conteúdo aparece:

   · o palco fixo de 1920×1080 não vem junto. Ele é a razão de a versão de
     tela grande sair idêntica ao PowerPoint, e é exatamente o que num
     telefone reduz todo texto a 3px;
   · as sete telas viram capítulos que se percorrem ROLANDO. Num telefone
     se rola; insistir em avançar slide só produz apresentação que ninguém
     termina;
   · o galpão isométrico vira lista. A leitura espacial do mapa depende de
     ver as ilhas lado a lado, e isso não existe em 390px de largura. As
     quatro páginas viram quatro seções com os mesmos nomes, e cada
     categoria vira um cartão com a arte dela;
   · fundo é imagem parada, não vídeo — decisão do André, por causa de
     dados móveis e bateria. Os quadros saem de `quadros-parados.mjs`.
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  /* Um endereço só serve as duas versões: quem abre no telefone recebe
     este layout, quem abre no monitor recebe o palco. O critério é a
     LARGURA e o tipo de ponteiro juntos — largura sozinha entrega o
     layout de telefone a quem só estreitou a janela no computador, onde
     o palco funciona bem. */
  const eCelular = matchMedia('(max-width: 820px)').matches &&
                   matchMedia('(pointer: coarse)').matches;
  if (!eCelular) return;

  const raiz = document.getElementById('celular');
  if (!raiz) return;

  const palco = document.getElementById('palco');
  palco.style.display = 'none';
  raiz.hidden = false;

  /* O app.js continua rodando e monta o palco escondido — inofensivo,
     menos por um detalhe: a capa entra com a classe .on e o vídeo dela
     começa a tocar. Som não há, mas dados móveis e bateria há. Os vídeos
     do palco saem do ar aqui. */
  palco.querySelectorAll('video').forEach(v => {
    v.pause(); v.removeAttribute('src'); v.removeAttribute('data-src'); v.load();
  });

  /* No arquivo único os caminhos viram data URI, e quem resolve é o A() que
     o empacotador injeta no topo do mesmo <script>. Duas armadilhas:

     `const A` no topo de um script NÃO vira `window.A` nem `globalThis.A`
     — fica no escopo do script. Testar por window devolvia sempre a
     identidade, e as imagens quebravam justamente no arquivo publicado.
     `typeof A` alcança esse escopo, e é seguro mesmo quando A não existe
     (na versão solta, com celular.js em <script src>).

     E o nome local tem de ser OUTRO: `const A = typeof A ...` referencia a
     própria variável antes de existir. */
  const rec = typeof A === 'function' ? A : (p => p);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cena = v => rec(`assets/cena-parada/${v}.jpg`);

  /* ── os capítulos, na ordem do sumário ── */
  const CAPITULOS = CAPS.map((nome, i) => ({ nome, n: String(i + 1).padStart(2, '0'), id: 'c' + i }));

  /* ══════ 01 · capa ══════ */
  const capa = () => `
    <section class="cap fundo" id="c0" style="background-image:url(${cena('solda-capa')})">
      <div class="cRot"><i></i>Cursos Técnicos</div>
      <h2>PROPAG 2026.2</h2>
      <p class="lead" style="font-size:19px;font-weight:600;color:#fff;margin-top:12px">
        A indústria pede. <span class="ac" style="color:var(--ciano)">A gente forma.</span></p>
      <p class="lead">Há mais de <b>84 anos</b> o Firjan SENAI forma os melhores
        profissionais para a indústria — na opinião da própria indústria.</p>
      <div class="cRot" style="margin:22px 0 10px"><i></i>Oferta</div>
      <div class="cNums">
        <div class="cNum"><b>27</b><small>Títulos técnicos</small></div>
        <div class="cNum"><b>19</b><small>Áreas tecnológicas</small></div>
        <div class="cNum"><b>97,7%</b><small>Satisfação das empresas</small></div>
      </div>
    </section>`;

  /* ══════ 02 · quem somos ══════ */
  const quem = () => `
    <section class="cap fundo" id="c1" style="background-image:url(${cena('p32386518')})">
      <div class="cRot"><i></i>Quem somos</div>
      <h2>84 anos formando<br>quem a indústria<br>quer contratar.</h2>
      <p class="lead">Segundo dados da CNI, 97,7% das empresas estão satisfeitas com
        os profissionais do Firjan SENAI. Quem faz um curso técnico ganha
        empregabilidade — e chega mais preparado ao Ensino Superior.</p>
      <div class="cNums">
        <div class="cNum"><b>77</b><small>Anos de indústria</small></div>
        <div class="cNum"><b>90,1%</b><small>Empregabilidade</small></div>
        <div class="cNum"><b>97,7%</b><small>Satisfação</small></div>
      </div>
    </section>`;

  /* ══════ 03 · presença ══════
     No mapa de tela grande cada unidade tem o nome ancorado ao lado do
     ponto. Em 390px de largura os 21 rótulos se empilhariam uns sobre os
     outros: o mapa fica só com os pontos, e os nomes descem para uma
     lista que o polegar percorre. */
  const presenca = () => `
    <section class="cap" id="c2">
      <div class="cRot"><i></i>Presença</div>
      <h2>Em todo o estado do <span class="ac">Rio de Janeiro</span>.</h2>
      <p class="lead">Uma rede fixa e uma rede que se move: unidades móveis levam
        a formação a quem não pode se deslocar.</p>
      <div class="cNums">
        <div class="cNum"><b>30</b><small>Unidades fixas</small></div>
        <div class="cNum"><b>30</b><small>Unidades móveis</small></div>
        <div class="cNum"><b>20</b><small>Municípios</small></div>
      </div>
      <div class="cMapa">
        <svg viewBox="0 0 100 62" width="100%" role="img" aria-label="Mapa do estado do Rio de Janeiro com as unidades">
          <image href="${rec('assets/brand/mapa-rj.png')}" x="0" y="0" width="100" height="62"/>
          ${UNIDADES.map(([x, y]) => `<circle cx="${(x * 100 / 100).toFixed(1)}" cy="${(y * 62 / 100).toFixed(1)}" r="1.1" fill="#00B3EC" stroke="#fff" stroke-width=".4"/>`).join('')}
        </svg>
      </div>
      <div class="cCidades">
        ${UNIDADES.map(u => `<span>${esc(u[2])}</span>`).join('')}
      </div>
    </section>`;

  /* ══════ 04 · o que fazemos ══════ */
  const fazemos = () => `
    <section class="cap" id="c3">
      <div class="cRot"><i></i>O que fazemos</div>
      <h2>32 áreas <span class="ac">tecnológicas.</span></h2>
      <p class="lead">São <b>564 cursos</b> no catálogo, da iniciação à especialização —
        a formação acompanha a carreira inteira de quem trabalha na indústria.</p>
      <div class="cNums">
        <div class="cNum"><b>331</b><small>Cursos de Aperfeiçoamento</small></div>
        <div class="cNum"><b>137</b><small>Cursos de Qualificação</small></div>
        <div class="cNum"><b>56</b><small>Cursos de Aprendizagem</small></div>
        <div class="cNum"><b>29</b><small>Cursos Técnicos</small></div>
        <div class="cNum"><b>09</b><small>Cursos de Iniciação</small></div>
        <div class="cNum"><b>02</b><small>Cursos de Especialização</small></div>
      </div>
      <div class="cGrade">
        ${AREAS.map(([nome, slug]) => `
          <div class="it"><img src="${rec(`assets/areas/${slug}.png`)}" alt=""><b>${esc(nome)}</b></div>`).join('')}
      </div>
    </section>`;

  /* ══════ 05 · categorias ══════ */
  const cursosDe = il => CURSOS.filter(c => il.areas.includes(c[1]));

  const categorias = () => `
    <section class="cap" id="c4">
      <div class="cRot"><i></i>Cursos Técnicos</div>
      <h2>A oferta, por <span class="ac">categoria.</span></h2>
      <p class="lead">São ${ILHAS.length} categorias e ${CURSOS.length} títulos técnicos.
        Toque numa categoria para ver os cursos dela.</p>
      ${PAGINAS.map(p => `
        <div class="cSecao">
          <h3>${esc(p.nome)}</h3>
          ${p.ilhas.map(id => {
            const il = ILHAS.find(i => i.id === id);
            if (!il) return '';
            const cs = cursosDe(il);
            return `
            <article class="cIlha" data-ilha="${il.id}">
              <button type="button" aria-expanded="false">
                <div class="arte"><img src="${rec(`assets/miniaturas/${il.id}.jpg`)}" alt=""></div>
                <div class="cab">
                  <img src="${rec(`assets/icones-limpos/${il.icone}.svg`)}" alt="">
                  <div><b>${esc(il.nome)}</b><small>${esc(il.sub || '')}</small></div>
                  <span class="cont">${cs.length}</span>
                </div>
              </button>
              <div class="cursos">
                ${cs.map(c => `
                  <button type="button" class="cCurso" data-curso="${esc(c[0])}">
                    <img class="foto" src="${rec(`assets/cursos/${c[3]}.jpg`)}" alt="">
                    <div><b>Técnico em ${esc(c[0])}</b><small>${c[2].toLocaleString('pt-BR')}h</small></div>
                    <span class="seta">›</span>
                  </button>`).join('')}
              </div>
            </article>`;
          }).join('')}
        </div>`).join('')}
    </section>`;

  /* ══════ 06 · todos os títulos ══════
     Na tela grande o "Detalhamento" é a ficha aberta. Aqui ele ganha
     conteúdo próprio: o índice dos 27, para quem sabe o nome do curso e
     não quer caçar a categoria dele. */
  const indice = () => `
    <section class="cap" id="c5">
      <div class="cRot"><i></i>Detalhamento</div>
      <h2>Os ${CURSOS.length} títulos, <span class="ac">em ordem.</span></h2>
      <p class="lead">Toque num curso para ver objetivo, campo de atuação e o
        itinerário completo.</p>
      <div style="margin-top:20px">
        ${[...CURSOS].sort((a, b) => a[0].localeCompare(b[0], 'pt-BR')).map(c => `
          <button type="button" class="cCurso" data-curso="${esc(c[0])}">
            <img class="foto" src="${rec(`assets/cursos/${c[3]}.jpg`)}" alt="">
            <div><b>Técnico em ${esc(c[0])}</b><small>${esc(c[1])} · ${c[2].toLocaleString('pt-BR')}h</small></div>
            <span class="seta">›</span>
          </button>`).join('')}
      </div>
    </section>`;

  /* ══════ 07 · fechamento ══════ */
  const fecho = () => `
    <section class="cap fundo fecho" id="c6" style="background-image:url(${cena('laboratorio')})">
      <img src="${rec('assets/brand/logo-negativo.svg')}" alt="Firjan SENAI">
    </section>`;

  /* ══════ montagem ══════ */
  raiz.innerHTML = `
    <div class="cTopo" id="cTopo">
      <img class="marca" id="cMarca" src="${rec('assets/brand/logo-cor.svg')}" alt="Firjan SENAI">
      <span class="onde" id="cOnde">01 · Capa</span>
      <button class="cMenuBt" id="cMenuBt" type="button" aria-label="Abrir o sumário"><span></span></button>
    </div>
    ${capa()}${quem()}${presenca()}${fazemos()}${categorias()}${indice()}${fecho()}
    <div class="cMenu" id="cMenu" role="dialog" aria-label="Sumário">
      <div class="veu" data-fechar></div>
      <nav>
        <div class="puxador"></div>
        ${CAPITULOS.map(c => `<a href="#${c.id}" data-ir="${c.id}"><em>${c.n}</em>${esc(c.nome)}</a>`).join('')}
      </nav>
    </div>
    <div class="cFicha" id="cFicha" role="dialog" aria-label="Ficha do curso"></div>`;

  /* ── menu ── */
  const menu = document.getElementById('cMenu');
  document.getElementById('cMenuBt').onclick = () => menu.classList.add('aberto');
  menu.addEventListener('click', e => {
    if (e.target.dataset.fechar !== undefined) menu.classList.remove('aberto');
    const a = e.target.closest('[data-ir]');
    if (a) menu.classList.remove('aberto');
  });

  /* ── onde estou: a barra diz o capítulo que ocupa a tela ── */
  const secoes = [...raiz.querySelectorAll('.cap')];
  const onde = document.getElementById('cOnde');
  const topo = document.getElementById('cTopo');
  const marca = document.getElementById('cMarca');
  /* Qual capítulo "está na tela" é decidido por QUANTOS PIXELS dele a tela
     mostra — não por intersectionRatio.

     A razão é fração do PRÓPRIO elemento, e o capítulo das categorias tem
     vários milhares de pixels de altura: com metade da tela ocupada por
     ele, a razão dá 0,1, enquanto um capítulo curto totalmente visível dá
     1. A barra ficava anunciando "04" com a tela inteira mostrando o 05. */
  const visiveis = new Map();
  const obs = new IntersectionObserver(entradas => {
    for (const e of entradas) visiveis.set(e.target, e.isIntersecting ? e.intersectionRect.height : 0);
    let alvo = null, maior = 0;
    for (const [el, alt] of visiveis) if (alt > maior) { maior = alt; alvo = el; }
    if (!alvo) return;
    const i = secoes.indexOf(alvo);
    if (i < 0) return;
    const vis = { target: alvo };
    onde.textContent = `${CAPITULOS[i].n} · ${CAPITULOS[i].nome}`;
    /* a barra acompanha o capítulo: sobre fundo escuro ela inverte, senão
       o logotipo colorido some contra a foto */
    const escuro = vis.target.classList.contains('fundo');
    topo.classList.toggle('escuro', escuro);
    marca.src = rec(escuro ? 'assets/brand/logo-negativo.svg' : 'assets/brand/logo-cor.svg');
    menu.querySelectorAll('a').forEach((a, k) => a.classList.toggle('on', k === i));
  }, { root: raiz, threshold: [0, .01, .1, .25, .5, .75, 1] });
  secoes.forEach(s => obs.observe(s));

  /* ── categoria abre e fecha ── */
  raiz.addEventListener('click', e => {
    const bt = e.target.closest('.cIlha > button');
    if (!bt) return;
    const art = bt.parentElement;
    const abrindo = !art.classList.contains('aberta');
    art.classList.toggle('aberta', abrindo);
    bt.setAttribute('aria-expanded', String(abrindo));
  });

  /* ══════ a ficha ══════ */
  const ficha = document.getElementById('cFicha');

  function abrirFicha(nome) {
    const c = CURSOS.find(x => x[0] === nome);
    const d = DETALHE[nome];
    if (!c) return;
    const total = d ? d.mods.reduce((s, m) => s + m[1], 0) : c[2];

    ficha.innerHTML = `
      <div class="cFichaTopo">
        <button class="cVoltar" type="button" id="cFechaFicha">‹ Voltar</button>
      </div>
      <div class="capa">
        <img src="${rec(`assets/cursos/${c[3]}.jpg`)}" alt="">
        <div class="veu"></div>
        <div class="txt"><em>${esc(c[1])}</em><b>Técnico em ${esc(nome)}</b></div>
      </div>
      <div class="corpo">
        <div class="cCH"><b>${total.toLocaleString('pt-BR')}</b><i>h</i>
          <em>Carga horária<br>total</em></div>
        ${d ? `
          <div class="cBloco"><h4>Objetivo</h4><p>${esc(d.obj)}</p></div>
          <div class="cBloco"><h4>Campo de atuação</h4><p>${esc(d.campo)}</p></div>
          ${d.rec ? `<div class="cBloco"><h4>Reconhecimento de mercado</h4><p>${esc(d.rec)}</p></div>` : ''}
          <h4 style="margin:26px 0 12px;font-size:14px;font-weight:700;letter-spacing:.09em;
                     text-transform:uppercase;color:var(--azul)">Itinerário do curso</h4>
          ${d.mods.map(m => `
            <div class="cMod">
              <button type="button" aria-expanded="false">
                <b>${esc(m[0])}</b><span class="h">${m[1]}h</span><span class="mais">+</span>
              </button>
              <ul>${m[2].map(u => {
                const p = String(u).split(' · ');
                const h = p.length > 1 ? p.pop() : '';
                return `<li>${esc(p.join(' · '))}${h ? `<span>${esc(h)}</span>` : ''}</li>`;
              }).join('')}</ul>
            </div>`).join('')}
        ` : `<div class="cBloco"><p>Este título ainda não tem ficha detalhada no
             material de origem.</p></div>`}
      </div>`;

    ficha.classList.add('aberta');
    ficha.scrollTop = 0;
    document.getElementById('cFechaFicha').onclick = fecharFicha;
  }

  function fecharFicha() { ficha.classList.remove('aberta'); }

  raiz.addEventListener('click', e => {
    const bt = e.target.closest('[data-curso]');
    if (bt) abrirFicha(bt.dataset.curso);
  });

  /* sanfona dos módulos */
  ficha.addEventListener('click', e => {
    const bt = e.target.closest('.cMod > button');
    if (!bt) return;
    const mod = bt.parentElement;
    const abrindo = !mod.classList.contains('aberto');
    mod.classList.toggle('aberto', abrindo);
    bt.setAttribute('aria-expanded', String(abrindo));
  });

  /* o botão físico de voltar do Android fecha a ficha antes de sair */
  addEventListener('keydown', e => { if (e.key === 'Escape') fecharFicha(); });
})();
