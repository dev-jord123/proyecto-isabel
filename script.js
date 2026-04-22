/* ================================================================
   ROAD QUEST 2D — script.js
   Estética: Flat Design premium · Vista lateral con paralaje 3-capas
   Vehículo: Lamborghini Huracán 2D lateral con inclinación orgánica
   60fps · Canvas API puro
================================================================ */

/* ════════════════════════════════════════════════════════════════
   PALETA — coincide con CSS variables
════════════════════════════════════════════════════════════════ */
const P = {
  bgDeep:      '#1A0A2E',
  bgMid:       '#2D1B4E',
  sunsetA:     '#FF6B2B',
  sunsetB:     '#FF9F43',
  sunsetC:     '#FFD166',
  purple:      '#5C3199',
  purpleLight: '#8B5CF6',
  roadDark:    '#1C1C2E',
  roadMid:     '#252535',
  roadLight:   '#2E2E45',
  roadLine:    '#FFD166',
  btn: ['#FF6B2B','#06D6A0','#A78BFA'],
};

/* ════════════════════════════════════════════════════════════════
   1. DATOS — BLOQUES
   ────────────────────────────────────────────────────────────────
   Estructura: BLOCKS es un array de bloques de 5 preguntas c/u.
   Cada opción tiene { texto, score } (2=bien, 1=regular, 0=mal).
   Puntaje máximo por bloque: 5 × 2 = 10 pts.
   Mensajes motivacionales ordenados de mayor a menor minScore.
   Para agregar más bloques: copia la estructura de un bloque.
════════════════════════════════════════════════════════════════ */
const BLOCKS = [

  /* ── BLOQUE 1: ¿Cómo me siento hoy? ─────────────────── */
  {
    id: 1,
    titulo: '¿Cómo me siento hoy?',
    preguntas: [
      {
        id: 1,
        pregunta_visual: 'smile',
        pregunta_texto:  '¡Hola! ¿Cómo se siente tu cuerpo hoy?',
        opciones: [
          { texto: 'Súper bien',   score: 2 },
          { texto: 'Más o menos',  score: 1 },
          { texto: 'No muy bien',  score: 0 },
        ],
      },
      {
        id: 2,
        pregunta_visual: 'think',
        pregunta_texto:  '¿Cómo dormiste anoche?',
        opciones: [
          { texto: 'Muy bien',     score: 2 },
          { texto: 'Regular',      score: 1 },
          { texto: 'Mal o poco',   score: 0 },
        ],
      },
      {
        id: 3,
        pregunta_visual: 'smile',
        pregunta_texto:  '¿Tienes energía para jugar hoy?',
        opciones: [
          { texto: '¡Muchísima!',  score: 2 },
          { texto: 'Un poquito',   score: 1 },
          { texto: 'Nada de nada', score: 0 },
        ],
      },
      {
        id: 4,
        pregunta_visual: 'think',
        pregunta_texto:  '¿Tu pancita está bien hoy?',
        opciones: [
          { texto: 'Sí, bien',     score: 2 },
          { texto: 'Un poco rara', score: 1 },
          { texto: 'Me duele',     score: 0 },
        ],
      },
      {
        id: 5,
        pregunta_visual: 'happy',
        pregunta_texto:  '¿Tienes ganas de estar con tus amigos?',
        opciones: [
          { texto: '¡Sí, mucho!',  score: 2 },
          { texto: 'Tal vez',      score: 1 },
          { texto: 'Prefiero solo',score: 0 },
        ],
      },
    ],
    /* Mensajes ordenados de mayor a menor minScore */
mensajes: [
  { 
    minScore: 8, 
    emoji: '🚀', 
    titulo: '¡Modo imparable activado!',
    texto: 'Tu energía hoy es contagiosa. Aprovecha este impulso para conquistar tus metas y celebrar lo lejos que has llegado. ¡Brilla!',
    color: '#06D6A0', 
    estrellas: 3 
  },
  { 
    minScore: 5, 
    emoji: '🏗️', 
    titulo: 'Estás construyendo tu camino',
    texto: 'No todos los días tienen que ser perfectos para ser valiosos. Mantener el equilibrio es una victoria. ¡Sigue a tu ritmo!',
    color: '#FF9F43', 
    estrellas: 2 
  },
  { 
    minScore: 0, 
    emoji: '🎨', 
    titulo: 'Mañana será un lienzo nuevo',
    texto: 'Hoy tu cuerpo pide pausa y dársela es de valientes. Descansar no es rendirse, es recargar para volver a empezar con fuerza.',
    color: '#A78BFA', 
    estrellas: 1 
  },
],
  },

  /* ── BLOQUE 2: ¿Cómo me siento por dentro? ──────────── */
  {
    id: 2,
    titulo: '¿Cómo me siento por dentro?',
    preguntas: [
      {
        id: 6,
        pregunta_visual: 'smile',
        pregunta_texto:  '¿Hoy te sientes feliz o triste?',
        opciones: [
          { texto: '¡Feliz!',       score: 2 },
          { texto: 'Más o menos',   score: 1 },
          { texto: 'Triste',        score: 0 },
        ],
      },
      {
        id: 7,
        pregunta_visual: 'think',
        pregunta_texto:  '¿Tienes algún miedo hoy?',
        opciones: [
          { texto: 'No, ninguno',   score: 2 },
          { texto: 'Un poquito',    score: 1 },
          { texto: 'Sí, bastante',  score: 0 },
        ],
      },
      {
        id: 8,
        pregunta_visual: 'smile',
        pregunta_texto:  '¿Sientes que alguien te quiere mucho?',
        opciones: [
          { texto: '¡Claro que sí!',score: 2 },
          { texto: 'Creo que sí',   score: 1 },
          { texto: 'No sé',         score: 0 },
        ],
      },
      {
        id: 9,
        pregunta_visual: 'think',
        pregunta_texto:  '¿Te ha pasado algo que te preocupe?',
        opciones: [
          { texto: 'No, nada',      score: 2 },
          { texto: 'Algo pequeño',  score: 1 },
          { texto: 'Sí, bastante',  score: 0 },
        ],
      },
      {
        id: 10,
        pregunta_visual: 'happy',
        pregunta_texto:  '¿Cómo está tu corazón en este momento?',
        opciones: [
          { texto: 'Contento 😄',   score: 2 },
          { texto: 'Normal 😐',     score: 1 },
          { texto: 'Triste 😢',     score: 0 },
        ],
      },
    ],
    mensajes: [
      { minScore: 8, emoji: '🦋', titulo: '¡Tu corazón brilla hoy!',
        texto: 'Te sientes seguro, querido y feliz. ¡Eso es lo más importante!',
        color: '#A78BFA', estrellas: 3 },
      { minScore: 5, emoji: '🌈', titulo: '¡Las nubes pasan pronto!',
        texto: 'Hay días nublados, pero siempre viene el sol. ¡Tú puedes con esto!',
        color: '#FF9F43', estrellas: 2 },
      { minScore: 0, emoji: '🤗', titulo: '¡Mereces un abrazo enorme!',
        texto: 'Tus emociones están un poco revueltas hoy. Cuéntale a alguien de confianza.',
        color: '#06D6A0', estrellas: 1 },
    ],
  },

  /* ← AGREGA MÁS BLOQUES AQUÍ */
];

/* ── Helpers de navegación de bloques ────────────────────────── */
function getCurrentQ()   { return BLOCKS[state.currentBlock].preguntas[state.currentQInBlock]; }
function totalQs()       { return BLOCKS.reduce((s, b) => s + b.preguntas.length, 0); }
function answeredSoFar() {
  let n = 0;
  for (let b = 0; b < state.currentBlock; b++) n += BLOCKS[b].preguntas.length;
  return n + state.currentQInBlock;
}
function pickMessage(block, score) {
  return block.mensajes.find(m => score >= m.minScore) || block.mensajes[block.mensajes.length - 1];
}

/* ════════════════════════════════════════════════════════════════
   2. ESTADO
════════════════════════════════════════════════════════════════ */
const state = {
  phase: 'ENTER',  // ENTER | PLAYING | SELECTING | BLOCK_END | COMPLETE

  /* ── Sistema de bloques ── */
  currentBlock:    0,    // índice en BLOCKS[]
  currentQInBlock: 0,    // índice dentro del bloque
  blockScore:      0,    // puntaje acumulado del bloque actual
  blockAnswers:    [],   // [{id, texto, score}] del bloque actual
  allAnswers:      [],   // todas las respuestas de todos los bloques

  /* Coche */
  carX:       0,
  carTargetX: 0,
  carTilt:    0,
  carLane:    1,

  /* Mouse / toque */
  mouseX:     0,
  hoveredBtn: -1,

  /* Paralaje */
  layers:    [],
  roadOffset: 0,
  roadSpeed:  320,

  /* Partículas */
  exhaustParticles: [],
  dustParticles:    [],
  stars:            [],

  /* Obstáculos laterales */
  obstacles: [],

  /* Tiempo */
  time:        0,
  enterTimer:  0,
  exitTimer:   0,
  questionAlpha: 1,
};

/* ════════════════════════════════════════════════════════════════
   3. CANVAS
════════════════════════════════════════════════════════════════ */
const canvas = document.getElementById('road-canvas');
const ctx    = canvas.getContext('2d');

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeOut(t) { return 1 - (1 - t) * (1 - t); }

function resizeCanvas() {
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/* Dimensiones del layout */
function layout() {
  const W = canvas.width, H = canvas.height;
  const roadY      = H * 0.58;   // Y superior de la carretera
  const roadH      = H * 0.42;   // alto de la banda de carretera
  const laneH      = roadH / 3;
  const carBaseY   = roadY + laneH * 1.5; // centro del carril medio

  return { W, H, roadY, roadH, laneH, carBaseY };
}

/* ════════════════════════════════════════════════════════════════
   4. PARALAJE — 3 capas
   Capa 0 (fondo lejano): montañas silhouette, muy lenta
   Capa 1 (media): dunas y cactus vectoriales, media
   Capa 2 (primer plano): arbustos/piedras grandes, rápida
════════════════════════════════════════════════════════════════ */
function initParallax() {
  state.layers = [
    { speed: 18,  offset: 0, elements: generateMountains() },
    { speed: 60,  offset: 0, elements: generateDunes() },
    { speed: 140, offset: 0, elements: generateForeground() },
  ];
}

/* Montañas lejanas */
function generateMountains() {
  const items = [];
  for (let i = 0; i < 8; i++) {
    items.push({
      x: i * 380 + Math.random() * 200,
      w: 260 + Math.random() * 200,
      h: 90  + Math.random() * 70,
      type: 'mountain',
      shade: Math.random() < 0.5 ? '#3A1F6E' : '#4B2882',
    });
  }
  return items;
}

/* Dunas medias */
function generateDunes() {
  const items = [];
  for (let i = 0; i < 12; i++) {
    const type = ['dune','cactusV','cactusH'][i % 3];
    items.push({
      x: i * 280 + Math.random() * 140,
      w: 180 + Math.random() * 100,
      h:  60 + Math.random() * 50,
      type,
      shade: '#5C2D91',
      side: i % 2 === 0 ? 'top' : 'bottom',
    });
  }
  return items;
}

/* Primer plano */
function generateForeground() {
  const items = [];
  for (let i = 0; i < 16; i++) {
    const type = ['rock','bush','stone'][i % 3];
    items.push({
      x: i * 200 + Math.random() * 100,
      w: 30 + Math.random() * 40,
      h: 22 + Math.random() * 30,
      type,
      side: i % 2 === 0 ? 'top' : 'bottom',
    });
  }
  return items;
}

/* ════════════════════════════════════════════════════════════════
   5. OBSTÁCULOS LATERALES DE LA CARRETERA
════════════════════════════════════════════════════════════════ */
function initObstacles() {
  state.obstacles = [];
  const types = ['rock','cactus','sign'];
  for (let i = 0; i < 8; i++) {
    state.obstacles.push({
      x:    canvas.width + i * 300 + Math.random() * 200,
      lane: i % 3,       // carril 0/1/2
      side: i % 2 === 0 ? 'top' : 'bottom',
      type: types[i % types.length],
      size: 18 + Math.random() * 14,
    });
  }
}

function updateObstacles(dt) {
  const { W } = layout();
  state.obstacles.forEach(o => {
    o.x -= state.roadSpeed * 0.5 * dt;
    if (o.x < -80) {
      o.x = W + 80 + Math.random() * 200;
      o.type = ['rock','cactus','sign'][Math.floor(Math.random() * 3)];
      o.size = 18 + Math.random() * 14;
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   6. PARTÍCULAS
════════════════════════════════════════════════════════════════ */
function spawnExhaust(cx, cy) {
  for (let i = 0; i < 2; i++) {
    state.exhaustParticles.push({
      x:    cx - 24 + (Math.random() - 0.5) * 12,
      y:    cy + (Math.random() - 0.5) * 6,
      vx:   -(60 + Math.random() * 80),
      vy:   (Math.random() - 0.5) * 20,
      r:    4 + Math.random() * 6,
      alpha:0.55 + Math.random() * 0.2,
      life: 0,
      maxLife: 0.5 + Math.random() * 0.4,
      hue: 30 + Math.random() * 20,
    });
  }
}

function updateExhaust(dt) {
  state.exhaustParticles = state.exhaustParticles.filter(p => p.life < p.maxLife);
  state.exhaustParticles.forEach(p => {
    p.x    += p.vx * dt;
    p.y    += p.vy * dt;
    p.r    += dt * 14;
    p.alpha = 0.5 * (1 - p.life / p.maxLife);
    p.life += dt;
  });
}

function initStars(W, H) {
  const { roadY } = layout();
  state.stars = Array.from({ length: 60 }, () => ({
    x:    Math.random() * W,
    y:    Math.random() * roadY * 0.9,
    r:    0.4 + Math.random() * 1.4,
    alpha:0.3 + Math.random() * 0.6,
    twinkle: Math.random() * Math.PI * 2,
    speed: 0.8 + Math.random() * 2,
  }));
}

/* ════════════════════════════════════════════════════════════════
   7. DIBUJO — ESCENA COMPLETA
════════════════════════════════════════════════════════════════ */

/* ── 7a. Cielo atardecer ──────────────────────────────────── */
function drawSky() {
  const { W, H, roadY } = layout();

  /* Fondo degradado profundo */
  const sky = ctx.createLinearGradient(0, 0, 0, roadY);
  sky.addColorStop(0,    '#0D0618');
  sky.addColorStop(0.35, '#1A0A2E');
  sky.addColorStop(0.65, '#3D1560');
  sky.addColorStop(0.85, '#8B3A0F');
  sky.addColorStop(1,    '#D95F1A');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, roadY);

  /* Sol — círculo plano con halo difuso */
  const sunX = W * 0.72, sunY = roadY * 0.62;
  const sunR  = W * 0.055;

  const halo = ctx.createRadialGradient(sunX, sunY, sunR * 0.4, sunX, sunY, sunR * 3.5);
  halo.addColorStop(0,   'rgba(255,210,100,0.22)');
  halo.addColorStop(0.5, 'rgba(255,140,40,0.08)');
  halo.addColorStop(1,   'rgba(255,80,10,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, roadY);

  ctx.fillStyle = P.sunsetC;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  /* Anillo interior del sol */
  ctx.strokeStyle = 'rgba(255,255,200,0.3)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 0.7, 0, Math.PI * 2);
  ctx.stroke();

  /* Estrellas */
  state.stars.forEach(s => {
    s.twinkle += 0.04;
    const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
    ctx.fillStyle = `rgba(255,245,230,${a})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ── 7b. Paralaje capas ────────────────────────────────────── */
function drawParallax() {
  const { W, H, roadY } = layout();
  const dt = 1 / 60; // approx

  state.layers.forEach((layer, li) => {
    const el = layer.elements;
    const totalW = Math.max(...el.map(e => e.x + (e.w || 100))) + 400;

    el.forEach(e => {
      ctx.save();
      const yBase = e.side === 'bottom'
        ? roadY + (H - roadY) * 0.08 + (li * 8)
        : roadY - 12 - li * 4;

      const drawX = ((e.x - layer.offset) % (totalW + W) + W * 2) % (totalW + W) - e.w;

      if (li === 0) drawMountain(ctx, drawX, yBase, e);
      if (li === 1) drawDuneElement(ctx, drawX, yBase, e, roadY);
      if (li === 2) drawForegroundElement(ctx, drawX, yBase, e, roadY, H);

      ctx.restore();
    });
  });
}

function drawMountain(ctx, x, y, e) {
  ctx.fillStyle = e.shade;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + e.w * 0.5, y - e.h);
  ctx.lineTo(x + e.w, y);
  ctx.closePath();
  ctx.fill();

  /* Nieve / cresta clara */
  ctx.fillStyle = 'rgba(139,92,246,0.4)';
  ctx.beginPath();
  ctx.moveTo(x + e.w * 0.38, y - e.h * 0.72);
  ctx.lineTo(x + e.w * 0.5,  y - e.h);
  ctx.lineTo(x + e.w * 0.62, y - e.h * 0.72);
  ctx.closePath();
  ctx.fill();
}

function drawDuneElement(ctx, x, y, e, roadY) {
  if (e.type === 'dune') {
    const side = e.side === 'top' ? -1 : 1;
    const baseY = e.side === 'top' ? roadY - 2 : roadY + 2;
    ctx.fillStyle = '#4B2882';
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.quadraticCurveTo(x + e.w * 0.5, baseY - side * e.h, x + e.w, baseY);
    ctx.closePath();
    ctx.fill();
  } else if (e.type === 'cactusV') {
    drawCactusFlat(ctx, x + e.w * 0.5, e.side === 'top' ? roadY - 5 : roadY + 10, e.h * 0.9, '#3A1F6E');
  } else if (e.type === 'cactusH') {
    drawRockFlat(ctx, x + e.w * 0.5, e.side === 'top' ? roadY - 4 : roadY + 8, e.w * 0.4, e.h * 0.4, '#3A1F6E');
  }
}

function drawForegroundElement(ctx, x, y, e, roadY, H) {
  const by = e.side === 'top' ? roadY - 2 : H - 4;
  if (e.type === 'rock') {
    drawRockFlat(ctx, x, by, e.w, e.h, '#1C1230');
  } else if (e.type === 'bush') {
    drawBushFlat(ctx, x, by, e.w, '#1C1230');
  } else if (e.type === 'stone') {
    drawRockFlat(ctx, x, by, e.w * 0.6, e.h * 0.6, '#160D26');
  }
}

function drawCactusFlat(ctx, cx, baseY, h, color) {
  ctx.fillStyle = color;
  /* Tronco */
  ctx.fillRect(cx - 4, baseY - h, 8, h);
  /* Brazo izquierdo */
  ctx.fillRect(cx - 4 - 18, baseY - h * 0.62, 18, 6);
  ctx.fillRect(cx - 4 - 18, baseY - h * 0.62 - 14, 6, 14);
  /* Brazo derecho */
  ctx.fillRect(cx + 4, baseY - h * 0.5, 16, 6);
  ctx.fillRect(cx + 4 + 10, baseY - h * 0.5 - 12, 6, 12);
}

function drawRockFlat(ctx, cx, baseY, w, h, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.5, baseY);
  ctx.quadraticCurveTo(cx - w * 0.55, baseY - h * 0.7, cx - w * 0.15, baseY - h);
  ctx.lineTo(cx + w * 0.2, baseY - h);
  ctx.quadraticCurveTo(cx + w * 0.6, baseY - h * 0.6, cx + w * 0.5, baseY);
  ctx.closePath();
  ctx.fill();
}

function drawBushFlat(ctx, cx, baseY, w, color) {
  ctx.fillStyle = color;
  const bumps = [[0, 1], [-0.32, 0.8], [0.32, 0.8], [-0.58, 0.6], [0.58, 0.6]];
  bumps.forEach(([dx, scale]) => {
    ctx.beginPath();
    ctx.arc(cx + dx * w, baseY - w * 0.25 * scale, w * 0.28 * scale, 0, Math.PI * 2);
    ctx.fill();
  });
}

/* ── 7c. Carretera horizontal con 3 carriles ───────────────── */
function drawRoad() {
  const { W, H, roadY, roadH, laneH } = layout();

  /* Banda principal */
  const roadGrad = ctx.createLinearGradient(0, roadY, 0, H);
  roadGrad.addColorStop(0,   P.roadDark);
  roadGrad.addColorStop(0.4, P.roadMid);
  roadGrad.addColorStop(1,   P.roadLight);
  ctx.fillStyle = roadGrad;
  ctx.fillRect(0, roadY, W, roadH);

  /* Línea de horizonte de la carretera */
  ctx.strokeStyle = 'rgba(255,209,102,0.22)';
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.moveTo(0, roadY); ctx.lineTo(W, roadY);
  ctx.stroke();

  /* Separadores de carril animados */
  drawLaneLines();

  /* Borde inferior de la carretera */
  ctx.fillStyle = '#14102A';
  ctx.fillRect(0, H - 10, W, 10);

  /* Líneas de movimiento de velocidad */
  drawSpeedLines();

  /* Obstáculos en los carriles */
  drawRoadObstacles();
}

function drawLaneLines() {
  const { W, H, roadY, laneH } = layout();
  const DASH_W   = 48;
  const DASH_GAP = 32;
  const TOTAL    = DASH_W + DASH_GAP;
  const offset   = state.roadOffset % TOTAL;

  for (let lane = 1; lane <= 2; lane++) {
    const ly = roadY + laneH * lane;

    ctx.strokeStyle = 'rgba(255,209,102,0.35)';
    ctx.lineWidth   = 2;
    ctx.setLineDash([DASH_W, DASH_GAP]);
    ctx.lineDashOffset = -offset;
    ctx.beginPath();
    ctx.moveTo(0, ly); ctx.lineTo(W, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
  }

  /* Bordes laterales sólidos */
  ctx.strokeStyle = 'rgba(255,209,102,0.55)';
  ctx.lineWidth   = 3;
  const { roadY: ry, roadH: rh } = layout();
  ctx.beginPath();
  ctx.moveTo(0, ry + rh - 3); ctx.lineTo(W, ry + rh - 3);
  ctx.stroke();
}

function drawSpeedLines() {
  const { W, H, roadY, laneH } = layout();
  const t = state.time;

  ctx.save();
  for (let i = 0; i < 18; i++) {
    const progress = ((i / 18) + t * 1.1) % 1;
    const x  = progress * (W + 200) - 100;
    const ly = roadY + laneH * (0.3 + (i % 3) * 0.95 + 0.12);
    const lw = 20 + (i % 5) * 14;
    const alpha = 0.04 + (1 - progress) * 0.055;

    ctx.strokeStyle = `rgba(255,209,102,${alpha})`;
    ctx.lineWidth   = 1 + (i % 3) * 0.5;
    ctx.beginPath();
    ctx.moveTo(x, ly); ctx.lineTo(x + lw, ly);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRoadObstacles() {
  const { roadY, laneH } = layout();

  state.obstacles.forEach(o => {
    const cy = roadY + laneH * (o.lane + 0.5);
    ctx.save();
    ctx.globalAlpha = 0.85;

    if (o.type === 'rock') {
      drawRockFlat(ctx, o.x, cy + o.size * 0.4, o.size * 1.4, o.size, '#1A0F30');
    } else if (o.type === 'cactus') {
      drawCactusFlat(ctx, o.x, cy + o.size * 0.5, o.size * 1.6, '#1A0F30');
    } else if (o.type === 'sign') {
      drawWarningSign(ctx, o.x, cy, o.size);
    }

    ctx.restore();
  });
}

function drawWarningSign(ctx, cx, cy, s) {
  ctx.fillStyle = '#FFD166';
  ctx.beginPath();
  ctx.moveTo(cx, cy - s);
  ctx.lineTo(cx + s, cy);
  ctx.lineTo(cx, cy + s);
  ctx.lineTo(cx - s, cy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#1A0A2E';
  ctx.font = `bold ${s * 0.9}px Fredoka One`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('!', cx, cy + 1);
}

/* ── 7d. Lamborghini Huracán — Vista lateral 2D ─────────────
   El coche se mueve verticalmente entre carriles.
   Inclinación orgánica según velocidad de cambio.
   Amarillo canario plano con detalle de líneas.
──────────────────────────────────────────────────────────── */
function drawCar(dt) {
  const { roadY, laneH } = layout();

  /* Carril objetivo basado en el botón hovered o en el botón seleccionado */
  const targetLane  = (state.phase === 'PLAYING' && state.hoveredBtn >= 0)
    ? state.hoveredBtn
    : state.carLane;

  /* Posición Y del coche según el carril */
  const targetY = roadY + laneH * (targetLane + 0.5);

  /* Suavizar posición */
  if (state.carX === 0) state.carX = canvas.width * 0.28;
  state.carLane = targetLane;

  /* Interpolamos carY */
  if (!state.carY) state.carY = targetY;
  const prevY  = state.carY;
  state.carY   = lerp(state.carY, targetY, Math.min(1, dt * 8));

  /* Inclinación orgánica basada en la velocidad de cambio */
  const dy = state.carY - prevY;
  const tiltTarget = clamp(dy * 0.18, -0.18, 0.18);
  state.carTilt = lerp(state.carTilt || 0, tiltTarget, Math.min(1, dt * 10));

  const carW = Math.min(canvas.width * 0.16, 130);
  const carH = carW * 0.38;

  /* Partículas de escape */
  if (state.phase !== 'COMPLETE') {
    spawnExhaust(state.carX - carW * 0.5, state.carY + carH * 0.1);
  }

  /* Sombra del coche */
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(state.carX, state.carY + carH * 0.52, carW * 0.44, carH * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  /* Dibujar partículas de escape (antes del coche) */
  state.exhaustParticles.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = `hsla(${p.hue}, 40%, 55%, 1)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  /* Dibujar el Huracán */
  drawHuracanSide(ctx, state.carX, state.carY, carW, carH, state.carTilt);
}

/**
 * Lamborghini Huracán — Vista lateral 2D flat design
 * Forma muy baja, líneas rectas y angulares, spoiler trasero,
 * rueda trasera y delantera, ventanas oscuras, detalle de líneas.
 */
function drawHuracanSide(ctx, cx, cy, W, H, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);

  const hw = W / 2, hh = H / 2;

  /* ── CUERPO PRINCIPAL — amarillo canario ── */
  /* Carrocería baja y plana, forma de cuña */
  const body = ctx.createLinearGradient(0, -hh, 0, hh);
  body.addColorStop(0,    '#FFE040');
  body.addColorStop(0.35, '#FFD700');
  body.addColorStop(0.7,  '#E8C000');
  body.addColorStop(1,    '#C8A000');
  ctx.fillStyle = body;

  ctx.beginPath();
  /* Parte trasera (izquierda del sprite) */
  ctx.moveTo(-hw,        hh * 0.7);
  ctx.lineTo(-hw,        hh * 0.0);
  /* Perfil del techo — muy bajo y angular */
  ctx.lineTo(-hw * 0.55, -hh * 0.55);
  ctx.lineTo(-hw * 0.1,  -hh * 0.98);
  ctx.lineTo( hw * 0.22, -hh * 0.98);
  ctx.lineTo( hw * 0.55, -hh * 0.52);
  ctx.lineTo( hw * 0.65, -hh * 0.12);
  /* Morro delantero muy pronunciado */
  ctx.lineTo( hw * 0.88,  hh * 0.05);
  ctx.lineTo( hw,         hh * 0.35);
  ctx.lineTo( hw,         hh * 0.7);
  ctx.closePath();
  ctx.fill();

  /* ── LÍNEA DE CINTURA — característica Huracán ── */
  ctx.strokeStyle = '#C8A000';
  ctx.lineWidth   = H * 0.045;
  ctx.lineCap     = 'round';
  ctx.beginPath();
  ctx.moveTo(-hw * 0.82, hh * 0.12);
  ctx.lineTo(-hw * 0.55, -hh * 0.25);
  ctx.lineTo( hw * 0.52, -hh * 0.18);
  ctx.lineTo( hw * 0.84,  hh * 0.1);
  ctx.stroke();

  /* ── VENTANA / CABINA ── */
  ctx.fillStyle = 'rgba(20,10,50,0.88)';
  ctx.beginPath();
  ctx.moveTo(-hw * 0.45, -hh * 0.42);
  ctx.lineTo(-hw * 0.08, -hh * 0.92);
  ctx.lineTo( hw * 0.18, -hh * 0.92);
  ctx.lineTo( hw * 0.50, -hh * 0.46);
  ctx.closePath();
  ctx.fill();

  /* Reflejo en la ventana */
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.beginPath();
  ctx.moveTo(-hw * 0.42, -hh * 0.45);
  ctx.lineTo(-hw * 0.12, -hh * 0.88);
  ctx.lineTo(-hw * 0.02, -hh * 0.88);
  ctx.lineTo(-hw * 0.32, -hh * 0.45);
  ctx.closePath();
  ctx.fill();

  /* ── SPOILER TRASERO ── */
  ctx.fillStyle = '#1A0A00';
  ctx.beginPath();
  ctx.rect(-hw * 1.0, -hh * 0.78, W * 0.06, H * 0.18);
  ctx.fill();

  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.rect(-hw * 1.05, -hh * 0.82, W * 0.16, H * 0.065);
  ctx.fill();

  /* ── DIFUSOR TRASERO ── */
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.moveTo(-hw,        hh * 0.5);
  ctx.lineTo(-hw * 0.72, hh * 0.68);
  ctx.lineTo(-hw * 0.72, hh * 0.82);
  ctx.lineTo(-hw,        hh * 0.82);
  ctx.closePath();
  ctx.fill();

  /* Escape */
  ctx.fillStyle = '#888';
  ctx.beginPath();
  ctx.ellipse(-hw * 0.78, hh * 0.72, W * 0.045, H * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#444';
  ctx.beginPath();
  ctx.ellipse(-hw * 0.78, hh * 0.72, W * 0.025, H * 0.035, 0, 0, Math.PI * 2);
  ctx.fill();

  /* ── MORRO DELANTERO ── */
  ctx.fillStyle = '#1A0A00';
  ctx.beginPath();
  ctx.moveTo(hw * 0.88, hh * 0.05);
  ctx.lineTo(hw,        hh * 0.35);
  ctx.lineTo(hw * 0.78, hh * 0.38);
  ctx.lineTo(hw * 0.7,  hh * 0.08);
  ctx.closePath();
  ctx.fill();

  /* Faro delantero LED */
  ctx.shadowColor = '#FFE040';
  ctx.shadowBlur  = 14;
  ctx.fillStyle   = '#FFF8C0';
  ctx.beginPath();
  ctx.moveTo(hw * 0.82, -hh * 0.12);
  ctx.lineTo(hw * 0.92, -hh * 0.05);
  ctx.lineTo(hw * 0.9,   hh * 0.04);
  ctx.lineTo(hw * 0.72, -hh * 0.06);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;

  /* ── RUEDA TRASERA ── */
  drawWheel2D(ctx, -hw * 0.42, hh * 0.72, H * 0.35);

  /* ── RUEDA DELANTERA ── */
  drawWheel2D(ctx,  hw * 0.42, hh * 0.72, H * 0.32);

  /* ── DETALLE: toma de aire ── */
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath();
  ctx.rect(hw * 0.1, -hh * 0.28, W * 0.14, H * 0.16);
  ctx.fill();

  /* Gradiente de profundidad lateral */
  const depth = ctx.createLinearGradient(-hw, 0, hw, 0);
  depth.addColorStop(0,   'rgba(0,0,0,0.18)');
  depth.addColorStop(0.15,'rgba(0,0,0,0)');
  depth.addColorStop(0.85,'rgba(0,0,0,0)');
  depth.addColorStop(1,   'rgba(0,0,0,0.12)');
  ctx.fillStyle = depth;
  ctx.beginPath();
  ctx.rect(-hw, -hh, W, H);
  ctx.fill();

  ctx.restore();
}

/** Rueda plana estilo 2D con llanta de radios */
function drawWheel2D(ctx, cx, cy, size) {
  const r = size * 0.5;

  /* Neumático */
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  /* Rin metálico */
  const rimGrad = ctx.createRadialGradient(cx - r*0.2, cy - r*0.2, 0, cx, cy, r * 0.76);
  rimGrad.addColorStop(0,   '#CACACA');
  rimGrad.addColorStop(0.5, '#888');
  rimGrad.addColorStop(1,   '#444');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.76, 0, Math.PI * 2);
  ctx.fill();

  /* 5 radios */
  const spokeOffset = state.time * 3;
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + spokeOffset;
    const ix = cx + Math.cos(angle) * r * 0.12;
    const iy = cy + Math.sin(angle) * r * 0.12;
    const ox = cx + Math.cos(angle) * r * 0.7;
    const oy = cy + Math.sin(angle) * r * 0.7;
    ctx.strokeStyle = '#505050';
    ctx.lineWidth   = r * 0.16;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(ix, iy);
    ctx.lineTo(ox, oy);
    ctx.stroke();
  }

  /* Centro */
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1A0A00';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.08, 0, Math.PI * 2);
  ctx.fill();

  /* Aro del neumático */
  ctx.strokeStyle = 'rgba(80,80,80,0.5)';
  ctx.lineWidth   = r * 0.12;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.88, 0, Math.PI * 2);
  ctx.stroke();
}

/* ════════════════════════════════════════════════════════════════
   8. GESTIÓN DE PREGUNTAS — botones flotantes + sistema de bloques
════════════════════════════════════════════════════════════════ */

/**
 * Carga la pregunta actual según state.currentBlock / state.currentQInBlock.
 * Actualiza el HUD y construye los botones de respuesta.
 */
function loadQuestion() {
  const q     = getCurrentQ();
  const total = totalQs();
  const done  = answeredSoFar();

  document.getElementById('question-text').textContent = q.pregunta_texto;
  document.getElementById('progress-label').textContent = `${done + 1} / ${total}`;
  document.getElementById('progress-bar').style.width   = `${(done / total) * 100}%`;

  buildAnswerButtons(q.opciones);
  drawAvatar(q.pregunta_visual);

  state.phase      = 'ENTER';
  state.enterTimer = 0;
  state.exitTimer  = 0;
  state.hoveredBtn = -1;
}

/**
 * Construye los botones de respuesta.
 * opciones es un array de { texto, score }.
 */
function buildAnswerButtons(opciones) {
  const container = document.getElementById('answer-buttons');
  container.innerHTML = '';
  container.className = 'hidden';

  opciones.forEach((opcion, i) => {
    const btn = document.createElement('button');
    btn.className   = 'answer-btn';
    btn.textContent = opcion.texto;
    btn.dataset.idx = i;
    btn.style.animationDelay = `${i * 0.08}s`;

    btn.addEventListener('mouseenter', () => { state.hoveredBtn = i; state.carLane = i; });
    btn.addEventListener('mouseleave', () => { if (state.hoveredBtn === i) state.hoveredBtn = -1; });
    btn.addEventListener('click', () => handleAnswer(i, opcion.texto, opcion.score, btn));

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      state.hoveredBtn = i; state.carLane = i;
    }, { passive: false });
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleAnswer(i, opcion.texto, opcion.score, btn);
    }, { passive: false });

    container.appendChild(btn);
  });

  /* Los botones aparecen con leve retraso para que entre la animación de carretera */
  setTimeout(() => {
    container.className = 'visible';
    state.phase = 'PLAYING';
  }, 800);
}

/**
 * Procesa la respuesta del jugador.
 * Guarda texto + score, anima el botón y decide qué viene después.
 */
function handleAnswer(idx, texto, score, btn) {
  if (state.phase !== 'PLAYING') return;
  state.phase = 'SELECTING';

  btn.classList.add('selected');
  document.getElementById('answer-buttons').className = 'hidden';

  /* Acumula respuesta y puntaje del bloque */
  const q   = getCurrentQ();
  const ans = { id: q.id, texto, score };
  state.blockAnswers.push(ans);
  state.allAnswers.push(ans);
  state.blockScore += score;

  /* Flash del color del botón seleccionado */
  const colors = ['#FF6B2B', '#06D6A0', '#A78BFA'];
  triggerFlash(colors[idx]);

  setTimeout(() => {
    const block = BLOCKS[state.currentBlock];
    state.currentQInBlock++;

    if (state.currentQInBlock < block.preguntas.length) {
      /* Hay más preguntas en este bloque */
      loadQuestion();
    } else if (state.currentBlock < BLOCKS.length - 1) {
      /* Fin del bloque → muestra modal motivacional */
      showBlockResult();
    } else {
      /* Fin del último bloque → pantalla final */
      showFinalResults();
    }
  }, 600);
}

function triggerFlash(color) {
  const overlay = document.getElementById('flash-overlay');
  overlay.style.background = color;
  overlay.classList.remove('active');
  void overlay.offsetWidth;
  overlay.classList.add('active');
}

/* ── Modal motivacional entre bloques ─────────────────────────── */

function starsHTML(count, max = 3) {
  return Array.from({ length: max }, (_, i) =>
    `<span class="star ${i < count ? 'filled' : 'empty'}">★</span>`
  ).join('');
}

function showBlockResult() {
  state.phase = 'BLOCK_END';
  document.getElementById('answer-buttons').className = 'hidden';

  const block = BLOCKS[state.currentBlock];
  const msg   = pickMessage(block, state.blockScore);
  const maxSc = block.preguntas.length * 2;
  const pct   = Math.round((state.blockScore / maxSc) * 100);

  const screen = document.getElementById('motivational-screen');
  screen.querySelector('.mot-emoji').textContent       = msg.emoji;
  screen.querySelector('.mot-titulo').textContent      = msg.titulo;
  screen.querySelector('.mot-texto').textContent       = msg.texto;
  screen.querySelector('.mot-stars').innerHTML         = starsHTML(msg.estrellas);
  screen.querySelector('.mot-score-fill').style.width  = pct + '%';
  screen.querySelector('.mot-score-fill').style.background = msg.color;
  screen.querySelector('.mot-score-label').textContent =
    `${state.blockScore} / ${maxSc} puntos`;
  screen.querySelector('.mot-block-label').textContent =
    `Parte ${state.currentBlock + 1} de ${BLOCKS.length}`;
  screen.querySelector('.mot-card').style.setProperty('--mot-color', msg.color);

  screen.classList.remove('hidden');
}

function continueToNextBlock() {
  document.getElementById('motivational-screen').classList.add('hidden');
  state.currentBlock++;
  state.currentQInBlock = 0;
  state.blockScore      = 0;
  state.blockAnswers    = [];
  loadQuestion();
}

/* ── Pantalla final ───────────────────────────────────────────── */

function showFinalResults() {
  state.phase = 'COMPLETE';
  document.getElementById('progress-bar').style.width = '100%';
  document.getElementById('answer-buttons').className = 'hidden';

  const allQs  = BLOCKS.flatMap(b => b.preguntas);
  const colors = ['#FF6B2B', '#06D6A0', '#A78BFA'];

  const list = document.getElementById('results-list');
  list.innerHTML = state.allAnswers.map((a, i) => `
    <div class="result-item" style="--accent:${colors[i % colors.length]}">
      <span class="result-num">${i + 1}</span>
      <span class="result-q">${allQs[i].pregunta_texto}</span>
      <span class="result-a">${a.texto}</span>
    </div>
  `).join('');

  document.getElementById('results-screen').classList.remove('hidden');
}

function restartGame() {
  document.getElementById('results-screen').classList.add('hidden');
  document.getElementById('motivational-screen').classList.add('hidden');
  state.currentBlock    = 0;
  state.currentQInBlock = 0;
  state.blockScore      = 0;
  state.blockAnswers    = [];
  state.allAnswers      = [];
  state.carY            = null;
  state.carTilt         = 0;
  state.hoveredBtn      = -1;
  loadQuestion();
}

/* ════════════════════════════════════════════════════════════════
   9. AVATAR
════════════════════════════════════════════════════════════════ */
function drawAvatar(expression) {
  const ac   = document.getElementById('avatar-canvas');
  const actx = ac.getContext('2d');
  const S    = ac.width;
  const cx   = S / 2, cy = S / 2;

  actx.clearRect(0, 0, S, S);

  const bg = actx.createRadialGradient(cx, cy * 0.8, 0, cx, cy, S / 2);
  bg.addColorStop(0,   '#FFE680');
  bg.addColorStop(0.7, '#FFD93D');
  bg.addColorStop(1,   '#F5A623');
  actx.fillStyle = bg;
  actx.beginPath();
  actx.arc(cx, cy, S / 2 - 2, 0, Math.PI * 2);
  actx.fill();

  actx.fillStyle = '#2C2C2C';
  actx.beginPath();
  actx.ellipse(cx - S*0.18, cy - S*0.08, S*0.07, S*0.08, 0, 0, Math.PI*2);
  actx.ellipse(cx + S*0.18, cy - S*0.08, S*0.07, S*0.08, 0, 0, Math.PI*2);
  actx.fill();

  actx.fillStyle = 'rgba(255,255,255,0.7)';
  actx.beginPath();
  actx.arc(cx - S*0.15, cy - S*0.12, S*0.025, 0, Math.PI*2);
  actx.arc(cx + S*0.21, cy - S*0.12, S*0.025, 0, Math.PI*2);
  actx.fill();

  actx.fillStyle = 'rgba(255,120,100,0.28)';
  actx.beginPath();
  actx.ellipse(cx - S*0.30, cy + S*0.06, S*0.11, S*0.07, 0, 0, Math.PI*2);
  actx.ellipse(cx + S*0.30, cy + S*0.06, S*0.11, S*0.07, 0, 0, Math.PI*2);
  actx.fill();

  actx.strokeStyle = '#2C2C2C';
  actx.lineCap     = 'round';

  if (expression === 'smile') {
    actx.lineWidth = 3;
    actx.beginPath();
    actx.arc(cx, cy + S*0.04, S*0.22, 0.18, Math.PI - 0.18);
    actx.stroke();
  } else if (expression === 'think') {
    actx.lineWidth = 3;
    actx.beginPath();
    actx.arc(cx, cy + S*0.18, S*0.12, Math.PI*0.1, Math.PI*0.9);
    actx.stroke();
    actx.lineWidth = 2.5;
    actx.beginPath();
    actx.arc(cx - S*0.18, cy - S*0.22, S*0.10, Math.PI*1.15, Math.PI*1.85);
    actx.stroke();
    actx.beginPath();
    actx.arc(cx + S*0.18, cy - S*0.22, S*0.10, Math.PI*1.15, Math.PI*1.85);
    actx.stroke();
    actx.fillStyle = 'rgba(255,255,255,0.8)';
    actx.beginPath(); actx.arc(cx + S*0.32, cy - S*0.25, S*0.04, 0, Math.PI*2); actx.fill();
    actx.beginPath(); actx.arc(cx + S*0.39, cy - S*0.35, S*0.056, 0, Math.PI*2); actx.fill();
    actx.beginPath(); actx.arc(cx + S*0.44, cy - S*0.46, S*0.075, 0, Math.PI*2); actx.fill();
  } else if (expression === 'happy') {
    actx.lineWidth = 3.5;
    actx.beginPath();
    actx.arc(cx, cy + S*0.02, S*0.26, 0.1, Math.PI - 0.1);
    actx.stroke();
    actx.fillStyle = '#FF6B6B';
    actx.beginPath();
    actx.arc(cx, cy + S*0.02, S*0.22, 0.1, Math.PI - 0.1);
    actx.fill();
    actx.fillStyle = '#fff';
    actx.fillRect(cx - S*0.13, cy + S*0.02, S*0.26, S*0.06);
  } else {
    actx.lineWidth = 3;
    actx.beginPath();
    actx.arc(cx, cy + S*0.04, S*0.22, 0.18, Math.PI - 0.18);
    actx.stroke();
  }
}

/* ════════════════════════════════════════════════════════════════
   10. LOOP PRINCIPAL
════════════════════════════════════════════════════════════════ */
let lastTime = 0;

function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
  lastTime  = timestamp;
  state.time += dt;

  /* ── UPDATE ── */
  /* Offset de carretera */
  state.roadOffset += state.roadSpeed * dt;

  /* Paralaje */
  state.layers.forEach(layer => {
    layer.offset += layer.speed * dt;
  });

  updateObstacles(dt);
  updateExhaust(dt);

  /* ── DRAW ── */
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSky();
  drawParallax();
  drawRoad();

  if (state.phase !== 'COMPLETE' && state.phase !== 'BLOCK_END') {
    drawCar(dt);
  }

  requestAnimationFrame(gameLoop);
}

/* ════════════════════════════════════════════════════════════════
   11. INICIALIZACIÓN
════════════════════════════════════════════════════════════════ */
function init() {
  resizeCanvas();
  initParallax();
  initObstacles();
  initStars(canvas.width, canvas.height);

  state.carX = canvas.width * 0.28;

  window.addEventListener('resize', () => {
    resizeCanvas();
    initStars(canvas.width, canvas.height);
  });

  document.getElementById('restart-btn').addEventListener('click', restartGame);
  document.getElementById('continue-btn').addEventListener('click', continueToNextBlock);

  loadQuestion();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('DOMContentLoaded', init);
