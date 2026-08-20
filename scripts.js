const pInput = document.getElementById('p');
const qInput = document.getElementById('q');
const formula = document.getElementById('formula');
const statusBox = document.getElementById('status');
const countA2 = document.getElementById('countA2');
const countA = document.getElementById('countA');
const countOne = document.getElementById('countOne');
const board = document.getElementById('board');

function findFactorPair(p, q) {
  for (let m = 1; m <= Math.sqrt(q); m++) {
    if (q % m === 0) {
      const n = q / m;
      if (m + n === p) return { m, n };
    }
  }
  return null;
}

function makeSvg(p, q, pair) {
  const A = 150;
  const U = 42;
  const m = pair.m;
  const n = pair.n;

  const width = A + n * U;
  const height = A + m * U;
  const margin = 75;
  const svgW = width + margin * 2;
  const svgH = height + margin * 2;

  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.max(svgW, 430)}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`;

  // a² tile
  s += `<rect class="tile-a2" x="${margin}" y="${margin}" width="${A}" height="${A}"/>`;
  s += `<text class="tile-text" x="${margin + A/2}" y="${margin + A/2}" font-size="26">a²</text>`;

  // n vertical a tiles
  for (let j = 0; j < n; j++) {
    const x = margin + A + j * U;
    s += `<rect class="tile-a" x="${x}" y="${margin}" width="${U}" height="${A}"/>`;
    s += `<text class="tile-text" x="${x + U/2}" y="${margin + A/2}" font-size="18">a</text>`;
  }

  // m horizontal a tiles
  for (let i = 0; i < m; i++) {
    const y = margin + A + i * U;
    s += `<rect class="tile-a" x="${margin}" y="${y}" width="${A}" height="${U}"/>`;
    s += `<text class="tile-text" x="${margin + A/2}" y="${y + U/2}" font-size="18">a</text>`;
  }

  // q unit tiles
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const x = margin + A + j * U;
      const y = margin + A + i * U;
      s += `<rect class="tile-one" x="${x}" y="${y}" width="${U}" height="${U}"/>`;
      s += `<text class="tile-text" x="${x + U/2}" y="${y + U/2}" font-size="15">1</text>`;
    }
  }

  // Outer rectangle
  s += `<rect x="${margin}" y="${margin}" width="${width}" height="${height}" fill="none" stroke="#111827" stroke-width="3"/>`;

  // Base dimension
  const baseY = margin + height + 28;
  s += `<line class="dimension" x1="${margin}" y1="${baseY}" x2="${margin + width}" y2="${baseY}"/>`;
  s += `<line class="dimension" x1="${margin}" y1="${baseY-6}" x2="${margin}" y2="${baseY+6}"/>`;
  s += `<line class="dimension" x1="${margin + width}" y1="${baseY-6}" x2="${margin + width}" y2="${baseY+6}"/>`;
  s += `<text class="dimension-text" x="${margin + width/2}" y="${baseY + 23}" font-size="18">Base = (a + ${n})</text>`;

  // Height dimension
  const sideX = margin - 28;
  s += `<line class="dimension" x1="${sideX}" y1="${margin}" x2="${sideX}" y2="${margin + height}"/>`;
  s += `<line class="dimension" x1="${sideX-6}" y1="${margin}" x2="${sideX+6}" y2="${margin}"/>`;
  s += `<line class="dimension" x1="${sideX-6}" y1="${margin + height}" x2="${sideX+6}" y2="${margin + height}"/>`;
  s += `<text class="dimension-text" x="${sideX-12}" y="${margin + height/2}" font-size="18" transform="rotate(-90 ${sideX-12} ${margin + height/2})">Altura = (a + ${m})</text>`;

  s += `</svg>`;
  return s;
}

function calculate() {
  const p = Number(pInput.value);
  const q = Number(qInput.value);

  if (!Number.isInteger(p) || !Number.isInteger(q) || p <= 0 || q <= 0) {
    formula.textContent = '';
    statusBox.className = 'status warning';
    statusBox.textContent = 'Ingresa valores enteros positivos para p y q.';
    countA.textContent = '0';
    countOne.textContent = '0';
    board.innerHTML = '';
    return;
  }

  formula.textContent = `a² + ${p}a + ${q}`;
  countA.textContent = p;
  countOne.textContent = q;

  const pair = findFactorPair(p, q);

  if (pair) {
    const {m, n} = pair;
    statusBox.className = 'status success';
    statusBox.innerHTML = `Sí se puede formar el rectángulo. <strong>Factorización: (a + ${m})(a + ${n})</strong>.`;
    board.innerHTML = makeSvg(p, q, pair);
  } else {
    statusBox.className = 'status warning';
    statusBox.innerHTML = `No se puede formar un rectángulo cuyas dimensiones correspondan a binomios con términos enteros positivos para este caso.`;
    board.innerHTML = `
      <div style="padding:40px;text-align:center;border:2px dashed #d97706;border-radius:10px;">
        <strong>No hay una pareja de enteros positivos m y n</strong>
        <p>que cumpla simultáneamente m · n = ${q} y m + n = ${p}.</p>
        <p>Por eso, el modelo no obtiene una factorización de la forma (a + m)(a + n) con términos enteros positivos.</p>
      </div>`;
  }
}

document.getElementById('calculate').addEventListener('click', calculate);
[pInput, qInput].forEach(input => input.addEventListener('keydown', e => {
  if (e.key === 'Enter') calculate();
}));

calculate();