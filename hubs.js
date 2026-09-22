/* ══════════════════════════════════════════════════════════════════════
   hubs.js — as duas telas que ABREM conteúdo: "O que fazemos" (04) e
   "Soluções" (05).

   Cada hub tem sub-telas que se percorrem para o lado, num painel que
   cobre o palco. Enquanto ele está aberto o trilho vertical da
   apresentação para: seta, espaço e toque andam entre as sub-telas, e o
   Voltar (ou Esc) devolve ao hub. Foi a decisão da reunião de 03/09 —
   treze slides a mais no percurso principal cansariam —, e é o que o
   cliente escreveu no slide 4: "O que fazemos vai abrir um rollover, ou
   submenu a partir dele".

   A navegação ‹ pontos › repete a paginação do learning map também a
   pedido dele: os slides 6, 10 e 13 trazem a imagem daquela paginação com
   "fazer um parecido com esse".

   Nenhum conteúdo mora aqui. Tudo vem de SECOES, no dados.js; este arquivo
   só sabe montar cada `tipo`.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  if (typeof SECOES === 'undefined') return;
  const painel = document.getElementById('hubPainel');
  if (!painel) return;

  /* No arquivo único os caminhos viram data URI, e quem resolve é o A()
     que o empacotador injeta no topo do mesmo <script>. Na versão solta A
     não existe — mesma armadilha descrita no celular.js. */
  const R = typeof A === 'function' ? A : (p => p);
  const asset = p => R(`assets/${p}`);
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const tela = document.getElementById('hubTela');
  const nav = document.getElementById('hubNav');

  /* O galpão dos infográficos fica PRESO ao palco de 1920×1080, como as
     cenas do learning map: os rótulos foram medidos sobre ele, e se ele
     acompanhasse a janela (como os fundos das outras telas) as figuras do
     fundo andariam para baixo dos rótulos em tela ultrawide. O que cobre a
     janela é uma cópia desfocada dele. */
  painel.querySelector('.hbBorrao').style.backgroundImage = `url("${asset('hub/galpao.jpg')}")`;

  /* ══════ a caixa da arte ══════
     21/09, pedido do cliente: a cena preenche a JANELA inteira, sem as
     faixas desfocadas nas laterais. Para o rótulo não descolar do desenho,
     ele mora numa camada com a MESMA caixa da cena (.hArte), calculada
     aqui: o 16:9 do palco ampliado até cobrir a janela. Em 16:9 a caixa é
     o próprio palco, então a composição que vai para o PowerPoint é a
     mesma que se vê no link. */
  const palcoEl = document.getElementById('palco');
  /* Cobrir a janela CORTA a arte: numa janela de 2,1:1 saem uns 9% em cima
     e embaixo. Rótulo cortado é pior que faixa desfocada, então o zoom para
     onde o rótulo mais próximo da borda ainda cabe inteiro. Quando a arte
     tem margem sobrando (as cenas novas têm), a conta dá cobertura total. */
  const encaixar = () => {
    const cs = getComputedStyle(palcoEl);
    const W = parseFloat(cs.getPropertyValue('--bgw')) || 1920;
    const H = parseFloat(cs.getPropertyValue('--bgh')) || 1080;
    const s = Math.max(W / 1920, H / 1080);
    painel.style.setProperty('--artW', (1920 * s).toFixed(1) + 'px');
    painel.style.setProperty('--artH', (1080 * s).toFixed(1) + 'px');
    recolher();
  };

  /* O corte que a cobertura provoca pode deixar um rótulo para fora da
     janela. Em vez de encolher a cena (o que traria de volta a faixa
     desfocada), o rótulo se recolhe para dentro e o fio o acompanha, porque
     é o fio que diz a que ponto do desenho ele pertence. Em 16:9 nada se
     move: a conta dá zero. */
  const recolher = () => {
    const arte = painel.querySelector('.hArte');
    if (!arte) return;
    const esc = Math.min(innerWidth / 1920, innerHeight / 1080) || 1;
    const folga = 16 * esc;                       // respiro até a borda, em px de tela
    const fios = arte.querySelector('.hFios');
    for (const el of arte.querySelectorAll('.hRot, .hNota, .hFase')) el.style.margin = '';
    /* duas voltas: mover o rótulo pode reacomodar o texto dentro dele e
       mudar a largura, então a segunda volta acerta o resto */
    for (let volta = 0; volta < 2; volta++)
      for (const el of arte.querySelectorAll('.hRot, .hNota, .hFase')) {
        const r = el.getBoundingClientRect();
        if (!r.width) continue;
        let dx = 0, dy = 0;
        if (r.left < folga) dx = folga - r.left;
        else if (r.right > innerWidth - folga) dx = innerWidth - folga - r.right;
        if (r.top < folga) dy = folga - r.top;
        else if (r.bottom > innerHeight - folga) dy = innerHeight - folga - r.bottom;
        if (!dx && !dy) continue;
        el.style.marginLeft = ((parseFloat(el.style.marginLeft) || 0) + dx / esc).toFixed(1) + 'px';
        el.style.marginTop = ((parseFloat(el.style.marginTop) || 0) + dy / esc).toFixed(1) + 'px';
      }
    /* a interface fica presa ao palco: paginador, Voltar e cartão do título.
       Rótulo que caiu em cima deles desce até sair de baixo. */
    const fixos = [painel.querySelector('#hubNav'), painel.querySelector('#hubVoltar'),
                   painel.querySelector('.hCab')].filter(e => e && e.offsetWidth);
    for (const el of arte.querySelectorAll('.hRot, .hNota, .hFase')) {
      for (const fx of fixos) {
        const r = el.getBoundingClientRect(), b = fx.getBoundingClientRect();
        if (!(Math.min(r.right, b.right) - Math.max(r.left, b.left) > 1 &&
              Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > 1)) continue;
        /* sai pelo lado mais curto, desde que não caia fora da janela */
        const saidas = [
          { x: b.right + folga - r.left, y: 0 },
          { x: b.left - folga - r.right, y: 0 },
          { x: 0, y: b.bottom + folga - r.top },
          { x: 0, y: b.top - folga - r.bottom },
        ].filter(s => r.left + s.x >= folga && r.right + s.x <= innerWidth - folga &&
                      r.top + s.y >= folga && r.bottom + s.y <= innerHeight - folga)
         .sort((a, z) => Math.abs(a.x + a.y) - Math.abs(z.x + z.y));
        const s = saidas[0];
        if (!s) continue;
        el.style.marginLeft = ((parseFloat(el.style.marginLeft) || 0) + s.x / esc).toFixed(1) + 'px';
        el.style.marginTop = ((parseFloat(el.style.marginTop) || 0) + s.y / esc).toFixed(1) + 'px';
      }
    }
    /* o fio passa a terminar onde o rótulo parou */
    if (!fios) return;
    const cx = arte.getBoundingClientRect();
    for (const linha of fios.querySelectorAll('line[data-r]')) {
      const rot = arte.querySelector(`.hRot[data-r="${linha.dataset.r}"]`);
      if (!rot) continue;
      const r = rot.getBoundingClientRect();
      linha.setAttribute('x1', (((r.left + r.right) / 2 - cx.left) / cx.width * 100).toFixed(2));
      linha.setAttribute('y1', (((r.top + r.bottom) / 2 - cx.top) / cx.height * 100).toFixed(2));
    }
  };
  addEventListener('resize', encaixar);
  encaixar();

  /* as folhas: as sub-telas de verdade, com o grupo (Espaços de inovação)
     anotado em cada uma — é o que vira o sobretítulo */
  const HUBS = {};
  for (const h of SECOES)
    HUBS[h.id] = { ...h, folhas: h.partes.flatMap(p => p.tipo === 'grupo'
      ? p.partes.map(f => ({ ...f, grupo: p.nome }))
      : [{ ...p, grupo: null }]) };

  /* ══════ as abas de entrada (telas 04 e 05) ══════
     Pedido do cliente (16 e 17/09), com as abas do navegador de exemplo: a
     primeira aba, que já está no HTML, é o conteúdo da própria tela; as
     outras, uma por caixa do hub, abrem o painel naquela caixa. Padrão das
     abas (pedido do André): só o nome, sem miniatura nem seta. */
  const abasTela = (id, hubId) => {
    const el = document.getElementById(id);
    if (!el || !HUBS[hubId]) return;
    el.insertAdjacentHTML('beforeend', HUBS[hubId].partes.map(p => {
      const alvo = p.tipo === 'grupo' ? p.partes[0].id : p.id;
      const i = HUBS[hubId].folhas.findIndex(f => f.id === alvo);
      return `<button type="button" class="fazAba" role="tab" aria-selected="false" data-hub="${hubId}" data-i="${i}">
        <span>${esc(p.aba || p.nome)}</span></button>`;
    }).join(''));
  };
  abasTela('fazMenu', 'fazemos');
  abasTela('solMenu', 'solucoes');
  const ilustra = document.getElementById('solIlustra');
  if (ilustra && HUBS.solucoes && HUBS.solucoes.ilustracao) ilustra.src = asset(HUBS.solucoes.ilustracao);
  /* o texto de abertura da tela Soluções é o do slide 13 — conteúdo, e
     por isso mora no dados.js com o resto */
  if (HUBS.solucoes) {
    const l = document.getElementById('solLead'), c = document.getElementById('solCorpo');
    if (l) l.textContent = HUBS.solucoes.lead || '';
    if (c) c.textContent = HUBS.solucoes.corpo || '';
  }
  document.addEventListener('click', e => {
    const c = e.target.closest('.fazAba[data-hub], .ilha[data-hub]');
    if (c && c.closest('#palco')) abrir(c.dataset.hub, +c.dataset.i);
  });
  document.addEventListener('keydown', e => {
    const c = (e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('.ilha[data-hub]');
    if (c) { e.preventDefault(); e.stopPropagation(); abrir(c.dataset.hub, +c.dataset.i); }
  }, true);

  /* ══════ montagem de cada tipo ══════ */
  let hubAtual = null, idx = 0, relogio = null;
  const versaoAlt = {};
  const kicker = f => [HUBS[hubAtual].nome, f.grupo].filter(Boolean).map(esc).join(' · ');
  const cabecalho = (f, titulo) => `<div class="kicker"><i></i>${kicker(f)}</div>
    <h2>${esc(titulo || f.nome)}</h2>`;

  /* ── infográfico ──
     A mesma montagem das prévias em que as peças foram medidas: peça a
     `larg`% da largura com centro em `cx`/`cy`, rótulos em % do palco,
     fio do rótulo até o ponto da arte. */
  function infografico(f) {
    const rots = [...(f.etapas || []), f.entrada, f.centro, f.base]
      .filter(e => e && typeof e.x === 'number');
    /* fases (Competências) numeram de 1 a 9 seguido, porque são um
       processo só; grupos (Certificação, Benefícios) não numeram, porque
       não são sequência */
    let n = 0;
    const cartoes = [...(f.fases || []).map(c => ({ ...c, num: 1 })),
                     ...(f.grupos || []).map(c => ({ ...c, num: 0 }))]
      .map(c => {
        const [r, t] = c.n.includes('·') ? c.n.split('·').map(s => s.trim()) : ['', c.n];
        const de = n; if (c.num) n += c.itens.length;
        return { ...c, r, t, de };
      })
      .filter(c => typeof c.x === 'number');
    /* espaço inquebrável antes do separador: sem ele a quebra equilibrada
       começava linha com "·" */
    const sep = e => e.seq ? ' › ' : ' · ';
    /* onde o PPT tem ícone, a tela tem ícone: `icone` no rótulo e no
       cartão, `icones` paralelo aos itens (Benefícios, e a sequência da
       Medição) */
    const ico = n => n && ICONES[n] ? `<span class="hIco" aria-hidden="true">${ICONES[n]}</span>` : '';
    const lista = (t, k, c) => {
      const i = c && c.icones ? ico(c.icones[k]) : '';
      return Array.isArray(t)
        ? `<li${i ? ' class="comIco"' : ''}>${i}${esc(t[0])}<small>${esc(t[1])}</small></li>`
        : `<li${i ? ' class="comIco"' : ''}>${i}${esc(t)}</li>`;
    };
    const itensRot = e => e.icones
      ? `<span class="hSeq">${e.itens.map((t, k) => `<em>${ico(e.icones[k])}${esc(t)}</em>`).join('<i aria-hidden="true">›</i>')}</span>`
      : `<span>${e.itens.map(esc).join(sep(e))}</span>`;
    /* a .hArte carrega tudo que pousa SOBRE o desenho: peça, selo, fios,
       rótulos, notas e cartões. Ela tem a caixa da cena, então numa janela
       mais larga que 16:9 tudo cresce junto com a arte e o rótulo continua
       no mesmo ponto do desenho. O cartão do título fica fora dela. */
    return `
      <div class="hArte">
      ${f.peca ? `<img class="hPeca" src="${asset(`pecas/${f.peca}.png`)}" alt="" onerror="this.hidden=true"
           style="left:${f.cx ?? 50}%;top:${f.cy ?? 53}%;width:${f.larg ?? 88}%">` : ''}
      ${f.selo ? `<img class="hSeloPeca" src="${asset(f.selo.img)}" alt="" onerror="this.remove()"
           style="left:${f.selo.x}%;top:${f.selo.y}%;width:${f.selo.w}px">` : ''}
      <svg class="hFios" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${
        rots.map((e, k) => (e.dx || e.dy)
          ? `<line data-r="${k}" x1="${e.x + (e.dx || 0)}" y1="${e.y + (e.dy || 0)}" x2="${e.x}" y2="${e.y}"/>` : '').join('')}</svg>
      ${rots.map((e, k) => `<div class="hRot${e.forte ? ' forte' : ''}${e.marco ? ' marco' : ''}${
           f.rotCompacto && !e.marco ? ' compacto' : ''}" data-r="${k}"
           style="left:${e.x + (e.dx || 0)}%;top:${e.y + (e.dy || 0)}%${(e.w || f.rotW) ? `;max-width:${e.w || f.rotW}px` : ''}">
        ${ico(e.icone)}<b>${esc(e.n)}</b>${e.p ? `<i>${esc(e.p)}</i>` : ''}${e.d ? `<span>${esc(e.d)}</span>` : ''}${
          e.itens ? itensRot(e) : ''}</div>`).join('')}
      ${(f.notas || []).map(t => `<div class="hNota" style="left:${t.x}%;top:${t.y}%${t.w ? `;width:${t.w}px` : ''}">${
        ico(t.icone)}<span>${esc(t.t)}</span></div>`).join('')}
      ${cartoes.map(c => `<div class="hFase${c.num ? '' : ' lista'}"
           style="left:${c.x}%;top:${c.y}%${c.w ? `;width:${c.w}px` : ''}">
        ${c.r ? `<i>${esc(c.r)}</i>` : ''}<b>${ico(c.icone)}${esc(c.t)}</b>
        <ol style="--de:${c.de}">${c.itens.map((t, k) => lista(t, k, c)).join('')}</ol></div>`).join('')}
      </div>
      <header class="hCab${f.cabW ? ' estreito' : ''}"${f.cabW ? ` style="max-width:${f.cabW}px"` : ''}>${cabecalho(f)}${f.lead ? `<p>${esc(f.lead)}</p>` : ''}</header>`;
  }

  /* ── versão B: o infográfico do cliente redesenhado em SVG ──
     Mesmo texto da versão A (entrada, centro, etapas, base e grupos),
     desenhado como diagrama no palco de 1920×1080. Tudo é SVG: o texto
     continua texto (seleciona e escala sem borrar) e o movimento é CSS,
     sem biblioteca. O clique no logotipo troca entre as duas versões. */
  const quebrar = (t, max) => {
    const saida = []; let linha = '';
    for (const p of String(t).split(' ')) {
      if ((linha + ' ' + p).trim().length > max) { saida.push(linha.trim()); linha = p; }
      else linha += ' ' + p;
    }
    if (linha.trim()) saida.push(linha.trim());
    return saida;
  };
  const svTxt = (t, x, y, cls, max, dy = 18) => quebrar(t, max)
    .map((l, i) => `<text x="${x}" y="${y + i * dy}" class="${cls}">${esc(l)}</text>`).join('');
  /* os mesmos ícones dos rótulos, aninhados como <svg> dentro do desenho */
  const svIco = (n, x, y, s = 26) => ICONES[n]
    ? `<g transform="translate(${x},${y})">${ICONES[n].replace('<svg ', `<svg width="${s}" height="${s}" `)}</g>` : '';

  function cena(f) {
    const et = f.etapas || [], gr = f.grupos || [];
    let i = 0;
    /* cartão de dimensão: ícone no círculo, título, pergunta e itens */
    const cartao = (e, x, y, w, h) => e ? `
      <g class="svC" style="--i:${i++}">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" class="svCaixa"/>
        <circle cx="${x + 46}" cy="${y + 44}" r="23" class="svIcoBg"/>
        <g class="svIco">${svIco(e.icone, x + 32, y + 30, 28)}</g>
        <text x="${x + 84}" y="${y + 40}" class="svCT">${esc(e.n)}</text>
        ${e.p ? `<text x="${x + 84}" y="${y + 62}" class="svCP">${esc(e.p)}</text>` : ''}
        ${(e.itens || []).map((t, k) => `<circle cx="${x + 34}" cy="${y + 96 + k * 26}" r="3.5" class="svPonto"/>
          ${svTxt(t, x + 50, y + 101 + k * 26, 'svCI', 30)}`).join('')}
      </g>` : '';
    /* a régua de baixo: a Medição é uma sequência de quatro passos */
    const med = et[4];
    const passos = med ? (med.itens || []).map((t, k) => {
      const x = 640 + k * 162;
      return `<g class="svPasso" style="--k:${k}">
        <circle cx="${x + 56}" cy="888" r="26" class="svPassoBg"/>
        <g class="svIco">${svIco((med.icones || [])[k], x + 42, 874, 28)}</g>
        ${svTxt(t, x + 56, 950, 'svPassoT', 16, 15)}
      </g>${k < med.itens.length - 1
        ? `<path d="M${x + 122} 888 L${x + 146} 888" class="svSeta"/>` : ''}`;
    }).join('') : '';
    const ben = gr[0], valor = gr[1], base = f.base, entrada = f.entrada, centro = f.centro;
    return `<div class="svgCena">
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" role="img" aria-label="${esc(f.nome)}">
        <defs><radialGradient id="svMiolo" cx="50%" cy="36%">
          <stop offset="0" stop-color="#2FA8D4"/><stop offset="1" stop-color="#0A5C86"/>
        </radialGradient></defs>

        <text x="960" y="172" class="svT1">${esc(f.nome)}</text>
        ${f.sub ? `<text x="960" y="204" class="svT2">${esc(f.sub)}</text>` : ''}
        ${f.lead ? svTxt(f.lead, 960, 238, 'svLead', 96, 22) : ''}

        ${entrada ? `<g class="svC" style="--i:${i++}">
          <rect x="690" y="300" width="540" height="98" rx="20" class="svEntrada"/>
          <circle cx="740" cy="349" r="23" class="svEntradaIco"/>
          <g class="svIcoClaro">${svIco(entrada.icone, 726, 335, 28)}</g>
          <text x="782" y="342" class="svEntradaT">${esc(entrada.n)}</text>
          ${svTxt(entrada.d, 782, 368, 'svEntradaD', 50, 18)}
        </g>` : ''}
        <path d="M960 398 L960 452" class="svFio svFioForte"/>

        ${base ? `<g class="svC" style="--i:${i++}">
          <rect x="1400" y="232" width="400" height="122" rx="20" class="svBase"/>
          <g class="svIco">${svIco(base.icone, 1428, 256, 26)}</g>
          <text x="1466" y="276" class="svBaseT">${esc(base.n)}</text>
          ${svTxt(base.d, 1428, 306, 'svBaseD', 44, 18)}
        </g>` : ''}

        <g class="svAnel"><circle cx="960" cy="602" r="178" class="svAnelC"/></g>
        <circle cx="960" cy="602" r="150" fill="url(#svMiolo)"/>
        <circle cx="960" cy="602" r="150" class="svMioloBrilho"/>
        ${centro ? `<g class="svIcoClaro">${svIco(centro.icone, 938, 514, 44)}</g>
          ${quebrar(centro.n, 16).map((l, k) => `<text x="960" y="${594 + k * 28}" class="svCentroT">${esc(l)}</text>`).join('')}
          ${svTxt(centro.d, 960, 654, 'svCentroD', 30, 19)}` : ''}

        ${/* as duas colunas nas mesmas três linhas: 378, 590 e 800 */ ''}
        ${cartao(et[0], 120, 378, 400, 196)}
        ${cartao(et[1], 120, 590, 400, 170)}
        ${cartao(et[2], 1400, 378, 400, 170)}
        ${cartao(et[3], 1400, 590, 400, 196)}

        <path d="M520 456 C620 456 700 512 810 566" class="svFio"/>
        <path d="M520 660 C640 660 720 650 826 632" class="svFio"/>
        <path d="M1400 456 C1300 456 1220 512 1110 566" class="svFio"/>
        <path d="M1400 672 C1280 672 1200 656 1094 636" class="svFio"/>
        <path d="M960 806 L960 754" class="svFio svFioForte"/>

        ${med ? `<g class="svC" style="--i:${i++}">
          <rect x="600" y="800" width="720" height="190" rx="22" class="svCaixa"/>
          <text x="960" y="838" class="svCTc">${esc(med.n)}</text>
          ${med.p ? `<text x="960" y="862" class="svCPc">${esc(med.p)}</text>` : ''}
        </g>${passos}` : ''}

        ${ben ? `<g class="svC" style="--i:${i++}">
          <rect x="120" y="800" width="440" height="244" rx="22" class="svCaixa"/>
          <text x="156" y="840" class="svGT">${esc(ben.n)}</text>
          ${ben.itens.map((t, k) => `<g class="svIco">${svIco((ben.icones || [])[k], 156, 862 + k * 32, 20)}</g>
            ${svTxt(t, 190, 877 + k * 32, 'svGI', 48, 15)}`).join('')}
        </g>` : ''}

        ${valor ? `<g class="svC" style="--i:${i++}">
          <rect x="1360" y="800" width="440" height="244" rx="22" class="svValor"/>
          <g class="svIcoClaro">${svIco(valor.icone, 1396, 822, 26)}</g>
          <text x="1434" y="842" class="svValorT">${esc(valor.n)}</text>
          ${valor.itens.map((t, k) => `<circle cx="1406" cy="${890 + k * 36}" r="4" class="svPontoClaro"/>
            ${svTxt(t, 1424, 895 + k * 36, 'svValorI', 38, 16)}`).join('')}
        </g>` : ''}
      </svg>
    </div>`;
  }

  /* ── painel de mídia: vídeo com pôster, ou fotos que se revezam ── */
  /* toda mídia do slide entra: o vídeo primeiro, depois as fotos, e o
     ligar() os passa em roda com transição. Vídeo sozinho fica em laço;
     acompanhado, toca e passa a vez. */
  /* a onda da Firjan por cima de toda foto e vídeo dos hubs, no canto de
     cima à direita: personaliza a mídia do cliente sem disputar com a
     legenda, que fica embaixo à esquerda */
  const selo = `<img class="hSelo" src="${asset('brand/grafismo-onda.svg')}" alt="" aria-hidden="true">`;
  const midia = f => {
    const fotos = f.fotos || [];
    const leg = f.legendas || [];
    const dl = i => leg[i] ? ` data-legenda="${esc(leg[i])}"` : '';
    const video = f.video ? `<video class="on" muted${fotos.length ? '' : ' loop'} playsinline preload="none" data-src="assets/video/${f.video}.mp4"${
      f.poster ? ` poster="${asset(f.poster)}"` : ''}${dl(0)}></video>` : '';
    const d = video ? 1 : 0;
    return video + fotos.map((p, i) =>
      `<img class="${!video && !i ? 'on' : ''}" src="${asset(p)}" alt="${esc(leg[i + d] || '')}"${dl(i + d)}>`).join('')
      + (leg.length ? '<span class="hLegenda" aria-live="polite"></span>' : '') + selo;
  };

  const link = f => f.url ? `<a class="hLink" href="${esc(f.url)}" target="_blank" rel="noopener">${
    esc(f.rotuloUrl || 'Saiba mais')}<span aria-hidden="true">↗</span></a>` : '';

  /* ── texto: coluna de prosa e painel de mídia ── */
  const texto = f => `<div class="hTexto">
      <div class="hCol">
        ${cabecalho(f)}
        ${f.numero ? `<div class="hNum"><b>${esc(f.numero)}</b><span>${esc(f.rotulo || '')}</span></div>` : ''}
        ${f.lead ? `<p class="hLead">${esc(f.lead)}</p>` : ''}
        ${f.corpo ? `<p class="hCorpo">${esc(f.corpo)}</p>` : ''}
        ${link(f)}
      </div>
      <div class="hMidia">${midia(f)}</div>
    </div>`;

  /* ── slider: um recurso por vez, cada um com o vídeo dele ── */
  const slider = f => `<div class="hSlider">
      <div class="hCol">
        ${cabecalho(f)}
        ${f.lead ? `<p class="hLead">${esc(f.lead)}</p>` : ''}
        ${f.corpo ? `<p class="hCorpo">${esc(f.corpo)}</p>` : ''}
      </div>
      <div class="hPalco">
        <div class="hMidia">${f.itens.map((x, i) => {
          /* um recurso pode ter mais de um vídeo (Objetos e Ambientes
             imersivos: são três no slide 10); eles se revezam em sequência,
             então só o de vídeo único fica em laço */
          const lista = x.videos || [x.video];
          return `<video class="${i ? '' : 'on'}" muted${lista.length > 1 ? '' : ' loop'} playsinline preload="none"
            data-src="${lista.map(v => `assets/video/${v}.mp4`).join(' ')}"${
            x.poster ? ` poster="${asset(x.poster)}"` : ''}${
            x.legendas ? ` data-legendas="${esc(x.legendas.join('|'))}"` : ''}></video>`;
        }).join('')}<span class="hLegenda" aria-live="polite"></span>${selo}</div>
        <p class="hDica hDicaAbas">${ICONES.toque}Clique para conhecer os recursos</p>
        <div class="hAbas" role="tablist">${f.itens.map((x, i) =>
          `<button type="button" role="tab" class="hAba${i ? '' : ' on'}" data-k="${i}">${
            x.sigla ? `<em>${esc(x.sigla)}</em>` : ''}${esc(x.n)}</button>`).join('')}</div>
        <p class="hItemTxt">${esc(f.itens[0].d)}</p>
      </div>
    </div>`;

  /* ── galeria: as capas, e a ampliada por cima ──
     O tamanho da capa sai da conta, não do CSS: 6 capas cabem numa fileira
     só, 9 precisam de duas, e nos dois casos a capa tem de ser a MAIOR que
     cabe na altura que sobra sob o título — capa pequena não se lê. */
  const galeria = f => {
    const n = f.imagens.length, cols = n <= 6 ? n : Math.ceil(n / 2), rows = Math.ceil(n / cols);
    /* 34px por fileira para a legenda sob cada capa */
    const alt = Math.min(430, (690 - (rows - 1) * 26 - rows * 34) / rows);
    const larg = Math.min(alt * 1773 / 2474, (1752 - (cols - 1) * 28) / cols);
    /* o indicativo de ampliar: uma linha com a lupa sob o título, e a lupa
       de novo no canto de cada capa. Sem isso a capa parecia só imagem, e
       ninguém descobria que ela abre grande. Canto de CIMA à direita: em
       baixo ficam a caixa do ano e, nos customizados, a marca da Firjan. */
    return `<div class="hGaleria">
      <header>${cabecalho(f)}${f.lead ? `<p class="hLead">${esc(f.lead)}</p>` : ''}
        <p class="hDica">${ICONES.lupa}Clique numa capa para ampliar</p></header>
      <div class="hCapas" style="--cols:${cols};--w:${larg.toFixed(0)}px">${f.imagens.map((im, i) =>
        `<figure class="hCapaFig"><button type="button" class="hCapa" data-k="${i}" aria-label="Ampliar ${esc(im.n)}">
          <img src="${asset(`${f.pasta}/${im.f}.jpg`)}" alt="${esc(im.n)}">
          <span class="hLupa" aria-hidden="true">${ICONES.lupa}</span></button>
          <figcaption>${esc(im.n)}</figcaption></figure>`).join('')}</div>
      <div class="hZoom" hidden></div>
    </div>`;
  };

  /* ── link: blocos de texto e o endereço ── */
  /* traço de 1,8 sobre 24px, no desenho dos ícones do infográfico do
     cliente (slide 13) */
  const L = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONES = {
    predio: L('<path d="M4 21V5l7-2v18M11 8h7v13M3 21h18"/><path d="M7 8h1M7 12h1M7 16h1M14 12h1M14 16h1"/>'),
    documento: L('<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>'),
    pessoas: L('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c2.8 0 5 2.2 5 5"/>'),
    ajuste: L('<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>'),
    local: L('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    grafico: L('<path d="M4 20h16M7 17v-4M11 17V9M15 17v-6M19 17V6"/>'),
    lampada: L('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.9.7 1.5 1.7 1.5 2.8V17h4v-.3c0-1.1.6-2.1 1.5-2.8A6 6 0 0 0 12 3z"/>'),
    equipe: L('<path d="M12 2.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2L8.8 4.8 11 4.5z"/><circle cx="6.5" cy="12" r="2"/><circle cx="12" cy="11.5" r="2"/><circle cx="17.5" cy="12" r="2"/><path d="M3 20c0-2.2 1.6-4 3.5-4M8.5 20c0-2.2 1.6-4 3.5-4s3.5 1.8 3.5 4M21 20c0-2.2-1.6-4-3.5-4"/>'),
    alvo: L('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="M13 11l7-7M17 4h3v3"/>'),
    crescimento: L('<path d="M4 20h16M6 17v-3M10 17v-5M14 17v-4M18 17V9"/><path d="M5 11l5-4 3 2 6-5M16 4h3v3"/>'),
    escudo: L('<path d="M12 3l7 3v5c0 5-3.2 8.6-7 10-3.8-1.4-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'),
    cifrao: L('<circle cx="12" cy="12" r="9"/><path d="M15 9c0-1.3-1.3-2-3-2s-3 .8-3 2.2c0 3 6 1.6 6 4.6 0 1.4-1.3 2.2-3 2.2s-3-.7-3-2M12 5.5v1.5M12 17v1.5"/>'),
    trofeu: L('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 21h7M10 17h4v4h-4z"/>'),
    capelo: L('<path d="M2.5 9L12 5l9.5 4L12 13z"/><path d="M6.5 11v4.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V11M21 9v5"/>'),
    capacete: L('<path d="M4 16a8 8 0 0 1 16 0"/><path d="M3 16h18v2H3zM12 8V5M9.5 9V6.5M14.5 9V6.5"/>'),
    ciclo: L('<path d="M19.5 12a7.5 7.5 0 0 1-13.3 4.8M4.5 12a7.5 7.5 0 0 1 13.3-4.8"/><path d="M18 3.5v4h-4M6 20.5v-4h4"/>'),
    foguete: L('<path d="M12 2.5c3 2.4 4.5 5.6 4.5 9.2 0 2.4-.6 4.6-1.7 6.3H9.2C8.1 16.3 7.5 14.1 7.5 11.7c0-3.6 1.5-6.8 4.5-9.2z"/><circle cx="12" cy="10.5" r="2"/><path d="M9.2 15.5 6 18.5v3l3.3-1.8M14.8 15.5l3.2 3v3l-3.3-1.8M10.5 21.5h3"/>'),
    impressora: L('<path d="M6 9V4h12v5"/><rect x="3.5" y="9" width="17" height="6.5" rx="1.5"/><path d="M7.5 15.5h9V21h-9z"/><path d="M9.5 18h5"/>'),
    toque: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M12 10.5V9a1.5 1.5 0 0 1 3 0v2"/><path d="M15 11a1.5 1.5 0 0 1 3 0v3.5A6.5 6.5 0 0 1 11.5 21h-.6a5.5 5.5 0 0 1-4.2-2l-2.9-3.6a1.5 1.5 0 0 1 2.3-1.9L9 16V11"/><path d="M5 5.5 3.5 4M16 5.5 17.5 4M10.5 2V1"/></svg>',
    lupa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4 21 21M10.5 7.6v5.8M7.6 10.5h5.8"/></svg>',
    ideia: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 9a11 11 0 0 0-6.4 19.9c1.4 1 2.4 2.6 2.4 4.3V35h8v-1.8c0-1.7 1-3.3 2.4-4.3A11 11 0 0 0 24 9z"/><path d="M20 39h8M21.5 43h5M24 2.5v2.5M7 20H4.5M43.5 20H41M11.5 7.5l1.8 1.8M36.5 7.5l-1.8 1.8"/></svg>',
    engrenagem: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="6.5"/><circle cx="24" cy="24" r="13.5"/><path d="M24 4.5v6M24 37.5v6M4.5 24h6M37.5 24h6M10.2 10.2l4.3 4.3M33.5 33.5l4.3 4.3M10.2 37.8l4.3-4.3M33.5 14.5l4.3-4.3"/></svg>',
  };
  /* `arte`: ilustração à direita, esmaecida para o fundo pelo lado do texto;
     com ela o texto vira uma coluna à esquerda e os blocos se empilham */
  const linkTela = f => `<div class="hLinkTela${f.arte ? ' comArte' : ''}">
      ${f.arte ? `<img class="hLinkArte" src="${asset(f.arte)}" alt="">` : ''}
      <header>${cabecalho(f, f.titulo)}${f.lead ? `<p class="hLead">${esc(f.lead)}</p>` : ''}</header>
      <div class="hBlocos">${(f.blocos || []).map(b => `<div class="hBloco">${ICONES[b.icone] || ''}
        <h3>${esc(b.n)}</h3><p>${esc(b.d)}</p></div>`).join('')}</div>
      ${link(f)}
    </div>`;

  const MONTA = { infografico, texto, slider, galeria, link: linkTela };

  /* ══════ vida de cada sub-tela ══════ */
  /* a legenda da mídia da vez: foto e vídeo trazem data-legenda; vídeo com
     lista traz data-legendas, na ordem dos vídeos, e data-k diz qual toca */
  const legendar = m => {
    const alvo = m && m.closest('.hMidia')?.querySelector('.hLegenda');
    if (!alvo) return;
    const t = m.dataset.legendas ? m.dataset.legendas.split('|')[+(m.dataset.k || 0)] : m.dataset.legenda;
    alvo.textContent = t || '';
  };
  const tocar = v => {
    if (!v) return;
    legendar(v);
    if (!v.src && v.dataset.src) {
      /* data-src pode ser uma lista: cada vídeo toca uma vez e passa a vez
         ao próximo, em roda. R() resolve o caminho no arquivo único, onde o
         vídeo mora dentro do próprio HTML; sem ele sobrava só o pôster. */
      const lista = v.dataset.src.split(' ');
      let k = 0;
      v.src = R(lista[0]);
      if (lista.length > 1) v.addEventListener('ended', () => {
        k = (k + 1) % lista.length;
        v.dataset.k = k;
        legendar(v);
        v.src = R(lista[k]);
        v.play().catch(() => {});
      });
    }
    v.play().catch(() => {});
  };
  function ligar(el, f) {
    tocar(el.querySelector('.hMidia video.on'));
    /* a sequência do painel das telas de texto: foto fica 5,5 s; vídeo
       toca até acabar ou até 12 s (o trecho do pacote online tem até 30 s,
       e a roda precisa girar). Se o vídeo falhar, passa a vez na hora. */
    /* :not(.hSelo): o grafismo da marca por cima da mídia também é <img>, e
       entrando na roda ele apagava a foto (tela com uma foto só ficava preta) */
    const passos = [...el.querySelectorAll('.hTexto .hMidia > video, .hTexto .hMidia > img:not(.hSelo)')];
    if (passos.length > 1) {
      let k = 0;
      const avancar = () => {
        const atual = passos[k];
        if (atual.tagName === 'VIDEO') { atual.onended = atual.onerror = null; atual.pause(); }
        atual.classList.remove('on');
        k = (k + 1) % passos.length;
        entrar();
      };
      const entrar = () => {
        const p = passos[k];
        p.classList.add('on');
        legendar(p);
        clearTimeout(relogio);
        if (p.tagName === 'VIDEO') {
          p.onended = avancar; p.onerror = avancar;
          if (p.src) p.currentTime = 0;
          tocar(p);
          relogio = setTimeout(avancar, 12000);
        } else relogio = setTimeout(avancar, 5500);
      };
      entrar();
    }
    el.querySelectorAll('.hAba').forEach(b => b.addEventListener('click', () => recurso(el, f, +b.dataset.k)));
    const zoom = el.querySelector('.hZoom');
    if (zoom) {
      /* a capa ampliada nasce no clique, já com a imagem: um <img> vazio
         esperando no HTML seria uma caixa quebrada se alguém o mostrasse */
      el.querySelectorAll('.hCapa').forEach(b => b.addEventListener('click', () => {
        zoom.innerHTML = `<img src="${b.querySelector('img').src}" alt=""><b>${esc(f.imagens[+b.dataset.k].n)}</b>`;
        zoom.hidden = false;
      }));
      zoom.addEventListener('click', () => { zoom.hidden = true; });
    }
  }
  function recurso(el, f, k) {
    el.querySelectorAll('.hAba').forEach((b, i) => {
      b.classList.toggle('on', i === k); b.setAttribute('aria-selected', String(i === k));
    });
    el.querySelectorAll('.hMidia video').forEach((v, i) => {
      v.classList.toggle('on', i === k);
      if (i === k) tocar(v); else v.pause();
    });
    el.querySelector('.hItemTxt').textContent = f.itens[k].d;
  }

  function mostrar(dir) {
    const base = HUBS[hubAtual].folhas[idx];
    /* versão alternativa (só para aprovação): o logotipo alterna */
    /* `padrao` na alternativa: ela é o que abre primeiro, e o logotipo leva
       à outra */
    const usarAlt = !!(base.alternativa && (versaoAlt[base.id] ?? !!base.alternativa.padrao));
    const f = usarAlt ? { ...base, fundo: base.alternativa.fundo } : base;
    if (base.alternativa) palco.dataset.alt = usarAlt ? 'b' : 'a'; else delete palco.dataset.alt;
    clearInterval(relogio); relogio = null;
    tela.querySelectorAll('video').forEach(v => v.pause());
    /* a versão B é um desenho, não uma cena: o painel volta ao fundo claro
       da identidade, sem o galpão */
    painel.dataset.tipo = usarAlt && base.alternativa.svg ? 'svg' : f.tipo;
    painel.style.setProperty('--dir', dir);
    /* a sub-tela pode trazer o próprio galpão (Modalidades: a escada foi
       gerada junto com o fundo); as outras usam o galpão comum. Só troca
       quando muda, para não recarregar a imagem a cada seta. */
    /* nas cenas geradas com o galpão dentro, o cabeçalho ganha caixa: sobre
       a arte o texto solto no véu ficava por cima das ilhas */
    if (f.fundo) painel.dataset.cena = '1'; else delete painel.dataset.cena;
    /* sub-tela escura: tema da tela 03, vídeo de fundo e logotipo negativo */
    const bv = painel.querySelector('.hbVideo');
    if (f.escuro) {
      painel.dataset.escuro = '1';
      if (f.fundoVideo) {
        const src = `assets/video/${f.fundoVideo}.mp4`;
        if (bv.dataset.atual !== src) { bv.dataset.atual = src; bv.src = R(src); }
        bv.play().catch(() => {});
      } else bv.pause();
      if (f.fundoRede) { painel.dataset.rede = '1'; requestAnimationFrame(() => rede.liga()); }
      else { rede.desliga(); delete painel.dataset.rede; }
      marca.src = R('assets/brand/logo-negativo.svg');
    } else {
      if (painel.dataset.escuro) marca.src = R('assets/brand/logo-cor.svg');
      delete painel.dataset.escuro;
      delete painel.dataset.rede;
      rede.desliga();
      bv.pause();
    }
    const fundo = asset(f.fundo || 'hub/galpao.jpg');
    const galpao = painel.querySelector('.hbGalpao');
    if (galpao.getAttribute('src') !== fundo) {
      galpao.src = fundo;
      painel.querySelector('.hbBorrao').style.backgroundImage = `url("${fundo}")`;
    }
    /* fundoY: sobe (negativo) ou desce a cena em % do palco, para ajustar a
       composição sem gerar a arte de novo; o vão que sobra é coberto pela
       cópia desfocada. Os x/y dos rótulos já contam com esse deslocamento. */
    galpao.style.transform = f.fundoY ? `translate(-50%, calc(-50% + ${f.fundoY}%))` : '';
    /* a cena fica presa ao palco e a cópia desfocada cobre o resto da
       janela: as bordas da nítida esmaecem nela, para não haver emenda em
       tela larga ou alta. Com fundoY a borda de baixo sobe e esmaece mais. */
    const lados = 'linear-gradient(90deg,transparent 0,#000 2.5%,#000 97.5%,transparent 100%)';
    const topoBase = f.fundoY ? 'linear-gradient(to bottom,#000 88%,transparent 100%)'
                              : 'linear-gradient(to bottom,transparent 0,#000 2.5%,#000 97.5%,transparent 100%)';
    const mascara = `${lados},${topoBase}`;
    galpao.style.maskImage = mascara;
    galpao.style.webkitMaskImage = mascara;
    galpao.style.maskComposite = 'intersect';
    galpao.style.webkitMaskComposite = 'source-in';
    /* elemento NOVO a cada troca: é o que reinicia a animação de entrada,
       e o que garante que nenhum ouvinte da sub-tela anterior sobreviva */
    const el = document.createElement('div');
    el.className = 'hConteudo';
    el.dataset.id = f.id;
    /* rotEscala: multiplica o tamanho dos rótulos desta tela (Modalidades
       pediu o dobro em 21/09); o CSS lê em --rf */
    if (f.rotEscala) { el.style.setProperty('--rf', f.rotEscala); el.dataset.rot = 'escala'; }
    el.innerHTML = (usarAlt ? cena : MONTA[f.tipo] || (() => ''))(f);
    tela.replaceChildren(el);
    /* duas passadas: a primeira mede os rótulos com a caixa atual, a segunda
       confirma com a caixa já ajustada (o rótulo tem largura em px e não
       acompanha o zoom, então a folga muda um pouco). A terceira vem depois
       da animação de entrada — durante ela o rótulo ainda está deslocado, e
       medir no meio do movimento dava posição errada. */
    encaixar(); encaixar();
    el.addEventListener('animationend', () => encaixar(), { once: true });
    setTimeout(encaixar, 700);
    ligar(el, f);
    pintarNav();
  }

  /* ── escopo: a caixa que foi aberta ──
     Pedido do Ricardo (feedback de 16/09): cada caixa abre só o próprio
     conteúdo, como nos Cursos Técnicos. Quem entra em Espaços de inovação
     anda entre FabLab, Indústria 4.0, SAGA e Unidades Móveis, e no fim
     volta à tela de onde entrou; não emenda em Recursos educacionais.
     `escopo` são os índices [primeiro, último] das folhas daquela caixa. */
  let escopo = [0, 0];
  const escopoDe = (hubId, i) => {
    const fs = HUBS[hubId].folhas, g = fs[i].grupo;
    if (!g) return [i, i];
    let a = i, b = i;
    while (a > 0 && fs[a - 1].grupo === g) a--;
    while (b < fs.length - 1 && fs[b + 1].grupo === g) b++;
    return [a, b];
  };

  /* as abas: uma por caixa do tema (as `partes` do hub), a da vez acesa.
     O hub O que fazemos começa pela aba das áreas, que é a própria tela 04:
     clicar nela fecha o painel e volta para lá. Dentro da aba acesa, quando
     a caixa tem mais de uma tela, a paginação do learning map. A seta de
     trás no começo e a da frente no fim fecham a caixa e voltam à tela de
     entrada ("terminar o menu e voltar pro ponto onde entrou"). */
  function pintarNav() {
    const todas = HUBS[hubAtual].folhas;
    const [a, b] = escopo, n = b - a + 1, k = idx - a;
    /* Só o paginador das telas internas da caixa (pedido do André,
       17/09), no alto: para ir a outra caixa, o Voltar. Caixa de uma tela só fica sem
       barra. A seta de trás no começo e a da frente no fim fecham a caixa e
       voltam à tela de entrada. */
    nav.style.display = n < 2 ? 'none' : '';
    if (n < 2) { nav.innerHTML = ''; return; }
    nav.innerHTML = `<button type="button" class="hSeta" data-d="-1" aria-label="${k === 0 ? 'Fechar e voltar' : 'Tela anterior'}">‹</button>
      <span class="hubPontos">${todas.slice(a, b + 1).map((f, j) => `<button type="button" data-i="${a + j}" class="${j === k ? 'on' : ''}"
        title="${esc(f.nome)}" aria-label="${j + 1} de ${n}: ${esc(f.nome)}"></button>`).join('')}</span>
      <button type="button" class="hSeta" data-d="1" aria-label="${k === n - 1 ? 'Fechar e voltar' : 'Próxima tela'}">›</button>
      <em class="hubConta">${k + 1} de ${n}</em>`;
  }
  nav.addEventListener('click', e => {
    const s = e.target.closest('.hSeta');
    if (s) return passo(+s.dataset.d);
    const p = e.target.closest('[data-i]');
    if (p) irSub(+p.dataset.i);
  });

  function abrir(hubId, i = 0) {
    if (!HUBS[hubId]) return;
    hubAtual = hubId;
    idx = Math.max(0, Math.min(HUBS[hubId].folhas.length - 1, i));
    escopo = escopoDe(hubId, idx);
    palco.dataset.hub = hubId;
    encaixar();
    painel.classList.add('aberto');
    painel.setAttribute('aria-hidden', 'false');
    /* o painel é claro por padrão, e o chrome acompanha; antes de mostrar(),
       que troca para o logotipo negativo se a caixa for escura */
    palco.dataset.tema = 'claro'; palco.dataset.topo = 'claro';
    marca.src = R('assets/brand/logo-cor.svg');
    mostrar(0);
  }
  function fechar() {
    if (!hubAtual) return;
    clearInterval(relogio); relogio = null;
    tela.querySelectorAll('video').forEach(v => v.pause());
    painel.classList.remove('aberto');
    painel.setAttribute('aria-hidden', 'true');
    delete palco.dataset.hub;
    delete palco.dataset.alt;
    painel.querySelector('.hbVideo').pause();
    rede.desliga();
    delete painel.dataset.escuro;
    hubAtual = null;
    tema(slides[atual].classList.contains('dark'));
  }
  function passo(d) {
    if (!hubAtual) return;
    const n = idx + d;
    /* passou do começo ou do fim da caixa: fecha e volta à tela de entrada */
    if (n < escopo[0] || n > escopo[1]) return fechar();
    idx = n; mostrar(d);
  }
  function irSub(i) {
    if (!hubAtual || i === idx) return;
    const d = i > idx ? 1 : -1;
    idx = i;
    /* ir direto a uma folha de outra caixa (verificadores) troca o escopo */
    if (i < escopo[0] || i > escopo[1]) escopo = escopoDe(hubAtual, i);
    mostrar(d);
  }
  document.getElementById('hubVoltar').addEventListener('click', fechar);

  /* o logotipo alterna a versão, só nas sub-telas que têm alternativa */
  function alternar(liga) {
    if (!hubAtual) return false;
    const b = HUBS[hubAtual].folhas[idx];
    if (!b.alternativa) return false;
    const agora = versaoAlt[b.id] ?? !!b.alternativa.padrao;
    versaoAlt[b.id] = typeof liga === 'boolean' ? liga : !agora;
    mostrar(0);
    return true;
  }
  marca.addEventListener('click', () => alternar());
  window.hubAlt = alternar;

  /* ══════ rede em movimento do fundo escuro (fundoRede) ══════
     19/09, pedido do André: motion em laço, moderno, "uma rede", na linha
     dos fundos da Apple e da Samsung, sem sair da marca. Duas camadas num
     canvas só:
       · luzes — três halos grandes e desfocados (azul, azul profundo e
         ciano da Firjan) que respiram e derivam devagar, como os fundos
         de tela desses fabricantes;
       · malha — uma grade de pontos ondulando, vista em perspectiva, com
         as linhas das fileiras e das colunas ligando os nós. É o grafismo
         de ondas da marca virado rede. Uns poucos nós acendem e alguns
         pulsos correm pelas fileiras, como dado trafegando.
     Só roda enquanto a sub-tela está aberta; com "reduzir movimento" o
     sistema mostra um quadro parado. */
  const rede = (() => {
    const cv = painel.querySelector('.hbRede');
    if (!cv || !cv.getContext) return { liga() {}, desliga() {} };
    const ctx = cv.getContext('2d');
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COLS = 64, ROWS = 26;
    let raf = 0, W = 1, H = 1, dpr = 1;
    const medir = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(1.6, window.devicePixelRatio || 1);
      W = Math.max(1, Math.round(r.width * dpr)); H = Math.max(1, Math.round(r.height * dpr));
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    };
    /* brilho fixo por nó: sai de um hash, então é sempre o mesmo desenho */
    const fase = (i, j) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
    const halo = (x, y, r, c, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${c},${a})`); g.addColorStop(.55, `rgba(${c},${a * .35})`); g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    };
    const P = new Float32Array(ROWS * COLS * 3);
    function quadro(ms) {
      const t = ms / 1000;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, W, H);
      /* luzes: nos azuis da marca, somando-se umas às outras */
      ctx.globalCompositeOperation = 'lighter';
      halo(W * (.76 + .05 * Math.sin(t * .09)), H * (.26 + .07 * Math.cos(t * .07)), H * .8, '0,179,236', .24 + .06 * Math.sin(t * .23));
      halo(W * (.56 + .08 * Math.cos(t * .06)), H * (.98 + .05 * Math.sin(t * .11)), H * .95, '0,130,173', .34);
      halo(W * (.30 + .06 * Math.sin(t * .05)), H * (.05 + .05 * Math.cos(t * .08)), H * .7, '24,87,126', .34);
      /* malha: grade em ondas, projetada em perspectiva (câmera acima,
         olhando para o fundo). z perto = embaixo e largo; longe = no
         horizonte e estreito. */
      const f = H * .44, cx = W * .56, hor = H * .5, cam = 1.05;
      for (let j = 0; j < ROWS; j++) {
        const z = .62 + j * .2;
        for (let i = 0; i < COLS; i++) {
          const x = (i / (COLS - 1) - .5) * 9.5;
          const y = .34 * Math.sin(x * .7 + z * .35 + t * .45) + .22 * Math.sin(z * 1.3 - t * .36) +
                    .1 * Math.sin((x - z) * 1.9 + t * .7);
          const k = (j * COLS + i) * 3;
          P[k] = cx + x * f / z; P[k + 1] = hor + (cam - y) * f / z; P[k + 2] = z;
        }
      }
      const zMax = .62 + (ROWS - 1) * .2;
      const alfa = z => Math.max(0, 1 - (z - .62) / (zMax - .62)) ** 1.35;
      ctx.lineWidth = Math.max(1, dpr * .9);
      /* fileiras (as ondas) */
      for (let j = 0; j < ROWS; j++) {
        const a = alfa(.62 + j * .2);
        ctx.strokeStyle = `rgba(0,179,236,${(.08 + .5 * a).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < COLS; i++) { const k = (j * COLS + i) * 3; i ? ctx.lineTo(P[k], P[k + 1]) : ctx.moveTo(P[k], P[k + 1]); }
        ctx.stroke();
      }
      /* colunas, mais discretas: fecham a malha sem virar xadrez */
      for (let i = 0; i < COLS; i += 2) {
        ctx.strokeStyle = 'rgba(0,150,200,.22)';
        ctx.beginPath();
        for (let j = 0; j < ROWS; j++) { const k = (j * COLS + i) * 3; j ? ctx.lineTo(P[k], P[k + 1]) : ctx.moveTo(P[k], P[k + 1]); }
        ctx.stroke();
      }
      /* nós: pequenos, e uns poucos acendendo devagar */
      for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) {
        const k = (j * COLS + i) * 3, z = P[k + 2], a = alfa(z), h = fase(i, j);
        const r = Math.max(.5, 2.1 / z) * dpr;
        const brilho = h > .93 ? Math.max(0, Math.sin(t * (.6 + h) + h * 40)) : 0;
        ctx.fillStyle = `rgba(${brilho > .2 ? '190,240,255' : '120,215,245'},${(.12 + .6 * a + .4 * brilho * a).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(P[k], P[k + 1], r * (1 + 1.6 * brilho), 0, 6.283); ctx.fill();
        if (brilho > .5 && a > .2) halo(P[k], P[k + 1], r * 9, '0,179,236', .35 * brilho * a);
      }
      /* pulsos: um trecho claro percorrendo algumas fileiras */
      for (const [j, vel, desl] of [[3, .11, 0], [7, .08, .4], [11, .13, .7], [15, .06, .2]]) {
        const pos = ((t * vel + desl) % 1.25 - .1) * (COLS - 1);
        const a = alfa(.62 + j * .2);
        for (let q = 0; q < 6; q++) {
          const i0 = Math.floor(pos) - q;
          if (i0 < 0 || i0 >= COLS - 1) continue;
          const k0 = (j * COLS + i0) * 3, k1 = k0 + 3;
          ctx.strokeStyle = `rgba(160,235,255,${((1 - q / 6) * .8 * a).toFixed(3)})`;
          ctx.lineWidth = Math.max(1.4, dpr * 1.8);
          ctx.beginPath(); ctx.moveTo(P[k0], P[k0 + 1]); ctx.lineTo(P[k1], P[k1 + 1]); ctx.stroke();
        }
      }
      if (!quieto) raf = requestAnimationFrame(quadro);
    }
    return {
      liga() { medir(); cancelAnimationFrame(raf); if (quieto) quadro(12000); else raf = requestAnimationFrame(quadro); },
      desliga() { cancelAnimationFrame(raf); raf = 0; },
    };
  })();
  window.addEventListener('resize', () => { if (painel.dataset.rede) rede.liga(); });

  /* ══════ tela 05 em mapa ══════
     Uma ilha por solução, como o learning map: fio do chip até o meio da
     ilha e chip clicável que abre a caixa daquela solução. Só liga quando a
     cena carrega; sem a imagem a tela fica como estava (ilustração e abas). */
  (() => {
    const h = HUBS.solucoes, s = document.getElementById('sSol');
    if (!h || !h.mapa || !h.mapa.cena || !s) return;
    const ilhas = h.partes.filter(p => h.mapa.ilhas[p.id]);
    const px = (v, eixo) => (v / 100 * (eixo === 'x' ? 1920 : 1080)).toFixed(1);
    const img = document.createElement('img');
    img.className = 'solMapaCena';
    img.alt = 'Mapa das cinco soluções, uma ilha para cada';
    img.addEventListener('load', () => {
      s.querySelector('.bg').insertBefore(img, s.querySelector('.solMapaVeu'));
      document.getElementById('solFios').innerHTML = ilhas.map((p, k) => {
        const m = h.mapa.ilhas[p.id];
        return `<g class="chamada" style="--atraso:${(k * .08).toFixed(2)}s">
          <line x1="${px(m.cx, 'x')}" y1="${px(m.cy, 'y')}" x2="${px(m.ax, 'x')}" y2="${px(m.ay, 'y')}"/>
          <circle class="alvoFora" cx="${px(m.ax, 'x')}" cy="${px(m.ay, 'y')}" r="13"/>
          <circle class="alvoMiolo" cx="${px(m.ax, 'x')}" cy="${px(m.ay, 'y')}" r="4.5"/></g>`;
      }).join('');
      document.getElementById('solIlhas').innerHTML = ilhas.map((p, k) => {
        const m = h.mapa.ilhas[p.id], i = h.folhas.findIndex(f => f.id === p.id);
        return `<div class="ilha" data-ativo="1" data-hub="solucoes" data-i="${i}" role="button" tabindex="0"
            style="left:${m.cx}%;top:${m.cy}%;--atraso:${(k * .07).toFixed(2)}s;--giro:${(k * 1.7).toFixed(1)}s">
          <span class="ilhaIcone">${ICONES[m.icone] || ''}</span>
          <span class="ilhaTxt"><i>Solução</i><b>${esc(p.aba || p.nome)}</b><span>${esc(p.sub || '')}</span></span>
        </div>`;
      }).join('');
      s.dataset.mapa = '1';
    }, { once: true });
    img.src = asset(h.mapa.cena);
  })();

  /* ── o que o app.js e os verificadores enxergam ── */
  window.abrirHub = abrir;
  window.fecharHub = fechar;
  window.hubAberto = () => !!hubAtual;
  window.hubPasso = passo;
  window.hubIr = irSub;
  window.hubFolhas = id => (HUBS[id] ? HUBS[id].folhas.map(f => ({ id: f.id, tipo: f.tipo, nome: f.nome, grupo: f.grupo })) : []);
  /* teclado: devolve true quando a tecla era do hub, e o app para ali */
  window.hubTecla = e => {
    if (!hubAtual) return false;
    const zoom = tela.querySelector('.hZoom:not([hidden])');
    if (e.key === 'Escape') { if (zoom) zoom.hidden = true; else fechar(); return true; }
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); passo(1); return true; }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); passo(-1); return true; }
    return false;
  };
})();
