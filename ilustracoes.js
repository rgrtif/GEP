/* ══════════════════════════════════════════════════════════════════════
   ilustracoes.js — uma cena por área tecnológica, para os cartões da
   tela do videowall. Vetor, sem figura humana, mesma gramática de traço:
   linha ciano 2.4, preenchimento azul translúcido, um acento âmbar por cena.

   São PROVISÓRIAS: no deck final entram renders 3D fotorrealistas, um por
   curso. Trocar é substituir o retorno de ilustra() por <img src=...>.
   ══════════════════════════════════════════════════════════════════════ */
const CENAS = {

automacao: `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-f" d="M40 116h160v12H40z"/><path class="il-l" d="M40 116h160v12H40z"/>
<circle class="il-l" cx="70" cy="128" r="5"/><circle class="il-l" cx="120" cy="128" r="5"/><circle class="il-l" cx="170" cy="128" r="5"/>
<path class="il-l" d="M120 116V74l38-22 22 18"/>
<circle class="il-a" cx="120" cy="74" r="6"/><circle class="il-a" cx="158" cy="52" r="5"/>
<rect class="il-f" x="86" y="98" width="22" height="18"/><rect class="il-l" x="86" y="98" width="22" height="18"/>`,

eletroeletronica: `<circle class="il-s" cx="120" cy="126" r="66"/>
<rect class="il-f" x="52" y="46" width="136" height="76" rx="6"/><rect class="il-l" x="52" y="46" width="136" height="76" rx="6"/>
<path class="il-l" d="M52 74h28v20h26V70h30M188 98h-30V74h-22"/>
<circle class="il-l" cx="80" cy="74" r="4"/><circle class="il-l" cx="158" cy="98" r="4"/>
<path class="il-a" d="M126 34l-16 28h20l-14 28"/>`,

metalmecanica: `<circle class="il-s" cx="120" cy="128" r="68"/>
<circle class="il-f" cx="94" cy="76" r="32"/><circle class="il-l" cx="94" cy="76" r="32"/>
<circle class="il-l" cx="94" cy="76" r="39" stroke-dasharray="6 10"/><circle class="il-l" cx="94" cy="76" r="12"/>
<circle class="il-l" cx="154" cy="104" r="19"/><circle class="il-a" cx="154" cy="104" r="25" stroke-dasharray="5 8"/>
<circle class="il-l" cx="154" cy="104" r="7"/>`,

soldagem: `<circle class="il-s" cx="120" cy="126" r="68"/>
<path class="il-f" d="M62 102h116v20H62z"/><path class="il-l" d="M62 102h116v20H62z"/>
<path class="il-l" d="M150 46l-32 34"/><rect class="il-l" x="146" y="26" width="30" height="13" rx="5" transform="rotate(-42 161 32)"/>
<circle class="il-a" cx="114" cy="84" r="6"/>
<path class="il-a" d="M104 92l-14 14M110 96l-18 8M100 82l-16 2M118 96l-4 18"/>`,

midias: `<circle class="il-s" cx="120" cy="128" r="70"/>
<rect class="il-f" x="42" y="62" width="88" height="58" rx="4"/><rect class="il-l" x="42" y="62" width="88" height="58" rx="4"/>
<path class="il-l" d="M42 78h88"/><path class="il-l" d="M60 62l-9 16M84 62l-9 16M108 62l-9 16"/>
<rect class="il-l" x="142" y="50" width="56" height="46" rx="4"/>
<path class="il-a" d="M150 76l7-14 7 22 6-16 7 10 7-5"/>
<path class="il-l" d="M170 96v14h-16"/>`,

ti: `<circle class="il-s" cx="120" cy="128" r="70"/>
<rect class="il-f" x="42" y="44" width="96" height="64" rx="5"/><rect class="il-l" x="42" y="44" width="96" height="64" rx="5"/>
<path class="il-l" d="M56 64h22M56 76h42M56 88h30"/><path class="il-a" d="M108 68l11 8-11 8"/>
<path class="il-l" d="M90 108v14H70"/>
<rect class="il-l" x="156" y="42" width="42" height="80" rx="4"/>
<path class="il-l" d="M156 62h42M156 82h42M156 102h42"/><circle class="il-a" cx="190" cy="52" r="3"/>`,

logistica: `<circle class="il-s" cx="120" cy="126" r="72"/>
<path class="il-l" d="M36 118h168"/>
<rect class="il-f" x="48" y="60" width="74" height="44" rx="3"/><rect class="il-l" x="48" y="60" width="74" height="44" rx="3"/>
<path class="il-l" d="M122 72h28l18 20v12h-46z"/>
<circle class="il-l" cx="72" cy="112" r="9"/><circle class="il-l" cx="150" cy="112" r="9"/>
<rect class="il-a" x="178" y="84" width="22" height="20"/><path class="il-a" d="M178 94h22"/>`,

gestao: `<circle class="il-s" cx="120" cy="128" r="70"/>
<path class="il-l" d="M44 118h152"/>
<rect class="il-f" x="58" y="88" width="26" height="30"/><rect class="il-l" x="58" y="88" width="26" height="30"/>
<rect class="il-f" x="96" y="66" width="26" height="52"/><rect class="il-l" x="96" y="66" width="26" height="52"/>
<rect class="il-f" x="134" y="44" width="26" height="74"/><rect class="il-l" x="134" y="44" width="26" height="74"/>
<path class="il-a" d="M60 80l38-18 36-22 38-8"/><circle class="il-a" cx="172" cy="32" r="4"/>`,

refrigeracao: `<circle class="il-s" cx="120" cy="128" r="68"/>
<rect class="il-f" x="46" y="54" width="88" height="68" rx="5"/><rect class="il-l" x="46" y="54" width="88" height="68" rx="5"/>
<circle class="il-l" cx="90" cy="88" r="25"/>
<path class="il-l" d="M90 88l17-11M90 88l-5 20M90 88l-15-13"/>
<path class="il-a" d="M172 46v56M148 60l48 28M196 60l-48 28"/>`,

seguranca: `<circle class="il-s" cx="120" cy="128" r="68"/>
<path class="il-l" d="M40 118h160"/>
<path class="il-f" d="M58 92a34 34 0 0 1 68 0z"/><path class="il-l" d="M58 92a34 34 0 0 1 68 0z"/>
<path class="il-l" d="M48 92h88M92 58v34"/>
<path class="il-a" d="M150 118l14-56 14 56z"/><path class="il-a" d="M156 96h16"/>`,

alimentos: `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M40 116h160"/>
<path class="il-f" d="M56 116a36 22 0 0 1 72 0z"/><path class="il-l" d="M56 116a36 22 0 0 1 72 0z"/>
<path class="il-l" d="M74 102l9-9M92 97l9-9M110 102l9-9"/>
<path class="il-a" d="M170 116V70"/>
<path class="il-a" d="M170 86c-11-6-15-17-13-24 9 1 15 9 13 24zM170 86c11-6 15-17 13-24-9 1-15 9-13 24z"/>`,

construcao: `<circle class="il-s" cx="120" cy="128" r="72"/>
<path class="il-l" d="M36 118h168"/>
<rect class="il-f" x="120" y="52" width="68" height="66"/><rect class="il-l" x="120" y="52" width="68" height="66"/>
<path class="il-l" d="M120 74h68M120 96h68M143 52v66M166 52v66"/>
<path class="il-l" d="M62 118V30M38 38h64M62 30L38 38M62 30l40 8"/>
<path class="il-a" d="M92 38v26"/><rect class="il-a" x="84" y="64" width="16" height="11"/>`,

energias: `<circle class="il-s" cx="120" cy="128" r="72"/>
<path class="il-l" d="M36 118h168"/>
<path class="il-l" d="M72 118V50M72 50L44 32M72 50l32-11M72 50l-7 34"/>
<circle class="il-a" cx="72" cy="50" r="5"/>
<path class="il-f" d="M128 112l17-48h46l-17 48z"/><path class="il-l" d="M128 112l17-48h46l-17 48z"/>
<path class="il-l" d="M136 88h46M160 64l-15 48"/>`,

quimica: `<circle class="il-s" cx="120" cy="128" r="66"/>
<path class="il-l" d="M78 44v28L50 118h60L82 72V44M72 44h16"/>
<path class="il-f" d="M60 100h40l10 18H50z"/>
<circle class="il-a" cx="152" cy="56" r="7"/><circle class="il-a" cx="190" cy="78" r="7"/><circle class="il-a" cx="148" cy="98" r="7"/>
<path class="il-l" d="M158 60l26 13M152 63l-3 28M155 94l29-11"/>`,

vestuario: `<circle class="il-s" cx="120" cy="128" r="70"/>
<path class="il-f" d="M44 100h144v20H44z"/><path class="il-l" d="M44 100h144v20H44z"/>
<path class="il-l" d="M58 100V52h100v22"/>
<path class="il-l" d="M158 74v14"/><path class="il-a" d="M158 88v12"/>
<rect class="il-l" x="68" y="36" width="11" height="16" rx="2"/><path class="il-l" d="M79 44h62"/>`,

automotiva: `<circle class="il-s" cx="120" cy="126" r="72"/>
<path class="il-l" d="M36 116h168"/>
<path class="il-f" d="M52 100l11-28h32l15-15h31l11 26 15 4v13z"/>
<path class="il-l" d="M52 100l11-28h32l15-15h31l11 26 15 4v13z"/>
<circle class="il-l" cx="84" cy="104" r="11"/><circle class="il-l" cx="152" cy="104" r="11"/>
<path class="il-a" d="M99 72h22"/>`,

/* ── cenas específicas de curso: evitam dois cartões iguais na mesma tela ── */
mecatronica: `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M40 118h160"/>
<path class="il-l" d="M78 118V80l34-24 26 18"/>
<circle class="il-a" cx="78" cy="80" r="6"/><circle class="il-a" cx="112" cy="56" r="5"/>
<circle class="il-f" cx="164" cy="86" r="26"/><circle class="il-l" cx="164" cy="86" r="26"/>
<circle class="il-l" cx="164" cy="86" r="32" stroke-dasharray="5 9"/><circle class="il-l" cx="164" cy="86" r="9"/>`,

'eletroeletronica': `<circle class="il-s" cx="120" cy="128" r="68"/>
<rect class="il-f" x="46" y="44" width="106" height="72" rx="6"/><rect class="il-l" x="46" y="44" width="106" height="72" rx="6"/>
<path class="il-a" d="M58 92l14-30 12 44 12-32 10 18 12-8h22"/>
<path class="il-l" d="M46 62h106"/>
<rect class="il-l" x="166" y="66" width="30" height="14" rx="4"/>
<path class="il-l" d="M166 73h-14M196 73h-6M181 80v18M170 98h22"/>`,

'eletromecanica': `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M40 118h160"/>
<rect class="il-f" x="56" y="66" width="76" height="52" rx="8"/><rect class="il-l" x="56" y="66" width="76" height="52" rx="8"/>
<path class="il-l" d="M56 80h76M56 96h76"/><rect class="il-l" x="132" y="84" width="18" height="16"/>
<circle class="il-l" cx="172" cy="92" r="18"/><circle class="il-a" cx="172" cy="92" r="24" stroke-dasharray="5 8"/>
<circle class="il-l" cx="172" cy="92" r="6"/>`,

'maquinas-industriais': `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M36 118h168"/>
<path class="il-f" d="M48 96h124v22H48z"/><path class="il-l" d="M48 96h124v22H48z"/>
<circle class="il-l" cx="82" cy="72" r="20"/><circle class="il-l" cx="82" cy="72" r="7"/>
<path class="il-l" d="M102 72h44v24"/>
<path class="il-a" d="M156 40l-16 16a14 14 0 0 0 18 18l22 22"/><circle class="il-a" cx="166" cy="50" r="4"/>`,

metalurgia: `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M36 118h168"/>
<path class="il-f" d="M62 52h72l-12 46H74z"/><path class="il-l" d="M62 52h72l-12 46H74z"/>
<path class="il-l" d="M62 52l-14-10M134 52l14-10"/>
<path class="il-a" d="M104 98c6 10 14 14 26 14"/>
<path class="il-f" d="M132 106h52l8 12h-68z"/><path class="il-l" d="M132 106h52l8 12h-68z"/>`,

'computacao-grafica': `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-f" d="M120 34l58 32v58l-58 32-58-32V66z"/>
<path class="il-l" d="M120 34l58 32v58l-58 32-58-32V66z"/>
<path class="il-l" d="M62 66l58 32 58-32M120 98v58"/>
<path class="il-a" d="M46 132c26-42 62-42 88 0"/><circle class="il-a" cx="46" cy="132" r="4"/><circle class="il-a" cx="134" cy="132" r="4"/>`,

redes: `<circle class="il-s" cx="120" cy="126" r="70"/>
<rect class="il-f" x="82" y="70" width="76" height="26" rx="5"/><rect class="il-l" x="82" y="70" width="76" height="26" rx="5"/>
<circle class="il-a" cx="96" cy="83" r="3"/><circle class="il-a" cx="108" cy="83" r="3"/>
<path class="il-l" d="M120 70V44M120 96v14M96 110H60v14M144 110h36v14"/>
<rect class="il-l" x="42" y="124" width="36" height="20" rx="3"/>
<rect class="il-l" x="162" y="124" width="36" height="20" rx="3"/>
<path class="il-l" d="M104 44a24 24 0 0 1 32 0M112 32a40 40 0 0 1 16 0"/>`,

qualidade: `<circle class="il-s" cx="120" cy="126" r="68"/>
<rect class="il-f" x="56" y="34" width="94" height="106" rx="7"/><rect class="il-l" x="56" y="34" width="94" height="106" rx="7"/>
<rect class="il-l" x="84" y="24" width="38" height="18" rx="5"/>
<path class="il-l" d="M74 68h38M74 92h48M74 116h30"/>
<path class="il-a" d="M126 62l8 8 16-18"/>
<circle class="il-a" cx="166" cy="102" r="20"/><path class="il-a" d="M180 116l16 16"/>`,

panificacao: `<circle class="il-s" cx="120" cy="126" r="70"/>
<path class="il-l" d="M36 118h168"/>
<rect class="il-f" x="52" y="46" width="96" height="72" rx="7"/><rect class="il-l" x="52" y="46" width="96" height="72" rx="7"/>
<rect class="il-l" x="66" y="62" width="68" height="34" rx="4"/><path class="il-a" d="M76 80h48"/>
<path class="il-l" d="M66 106h68"/>
<path class="il-f" d="M158 118a24 15 0 0 1 44 0z"/><path class="il-l" d="M158 118a24 15 0 0 1 44 0z"/>
<path class="il-l" d="M170 108l6-6M184 106l6-6"/>`,

moda: `<circle class="il-s" cx="120" cy="126" r="68"/>
<path class="il-l" d="M36 118h168"/>
<path class="il-f" d="M92 46h34l26 18-12 16-8-5v43H86V75l-8 5-12-16z"/>
<path class="il-l" d="M92 46h34l26 18-12 16-8-5v43H86V75l-8 5-12-16z"/>
<path class="il-l" d="M92 46a17 17 0 0 0 34 0"/>
<circle class="il-a" cx="176" cy="66" r="9"/><circle class="il-a" cx="176" cy="96" r="9"/>
<path class="il-a" d="M183 73l-24 22M183 89l-24-22"/>`,

graficas: `<circle class="il-s" cx="120" cy="128" r="68"/>
<path class="il-f" d="M52 72h136v36H52z"/><path class="il-l" d="M52 72h136v36H52z"/>
<path class="il-l" d="M76 72V40h88v32"/>
<path class="il-f" d="M76 108h88v26H76z"/><path class="il-l" d="M76 108h88v26H76z"/>
<path class="il-a" d="M90 118h60M90 126h40"/>
<circle class="il-l" cx="172" cy="86" r="4"/>`,
};

/* área tecnológica → cena */
const ILUSTRA = {
  'Automação e Mecatrônica': 'automacao', 'Eletroeletrônica': 'eletroeletronica',
  'Metalmecânica': 'metalmecanica', 'Metalmecânica · Soldagem': 'soldagem',
  'Comunicação Midiática': 'midias', 'TI - Software': 'ti', 'TI - Hardware': 'ti',
  'Logística': 'logistica', 'Gestão Industrial': 'gestao',
  'Refrigeração e Climatização': 'refrigeracao', 'Gráfica e Mídias': 'graficas',
  'Segurança do Trabalho': 'seguranca', 'Alimentos': 'alimentos',
  'Construção Civil': 'construcao', 'Energias Renováveis': 'energias',
  'Química': 'quimica', 'Vestuário': 'vestuario', 'Automotiva': 'automotiva',
};

/* o slug do curso tem prioridade sobre a área: é assim que dois cursos da
   mesma área tecnológica não caem com o mesmo desenho no mesmo videowall */
const ilustra = (area, slug) =>
  `<svg class="il" viewBox="0 0 240 150" aria-hidden="true">${
    CENAS[slug] || CENAS[ILUSTRA[area]] || CENAS.gestao}</svg>`;
