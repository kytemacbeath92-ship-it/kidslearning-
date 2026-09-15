const ink = '#2d2150';

function svg(inner, className = 'illu') {
  return `<svg viewBox="0 0 160 160" class="${className}" aria-hidden="true">${inner}</svg>`;
}

function eyes(cx, cy, mood = 'idle') {
  const pupilY = mood === 'think' ? cy - 2 : cy;
  const smile =
    mood === 'sad'
      ? `<path d="M${cx - 10} ${cy + 18} Q${cx} ${cy + 10} ${cx + 10} ${cy + 18}" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`
      : `<path d="M${cx - 10} ${cy + 12} Q${cx} ${cy + 20} ${cx + 10} ${cy + 12}" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`;
  return `
    <circle cx="${cx - 12}" cy="${cy}" r="10" fill="#fff"/>
    <circle cx="${cx + 12}" cy="${cy}" r="10" fill="#fff"/>
    <circle class="pupil" cx="${cx - 12}" cy="${pupilY}" r="4.5" fill="${ink}"/>
    <circle class="pupil" cx="${cx + 12}" cy="${pupilY}" r="4.5" fill="${ink}"/>
    <circle cx="${cx - 9}" cy="${pupilY - 2}" r="1.7" fill="#fff"/>
    <circle cx="${cx + 15}" cy="${pupilY - 2}" r="1.7" fill="#fff"/>
    ${smile}
  `;
}

function ground() {
  return `<ellipse cx="80" cy="148" rx="42" ry="8" fill="rgba(45,33,80,.14)"/>`;
}

function shine(cx, cy, rx = 11, ry = 7) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="rgba(255,255,255,.38)"/>`;
}

function farmEye(cx, cy, r = 4.4) {
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${ink}" stroke-width="1.3"/>
    <circle cx="${cx + r * 0.08}" cy="${cy + r * 0.06}" r="${r * 0.58}" fill="#3a2412"/>
    <circle cx="${cx - r * 0.18}" cy="${cy - r * 0.22}" r="${r * 0.22}" fill="#fff"/>
  `;
}

function clovenHoof(x, y, fill = '#3a2a18') {
  return `
    <path d="M${x - 5.2} ${y} q-1 7.5 5.2 8 v-8z" fill="${fill}" stroke="${ink}" stroke-width="1.7" stroke-linejoin="round"/>
    <path d="M${x + 5.2} ${y} q1 7.5 -5.2 8 v-8z" fill="${fill}" stroke="${ink}" stroke-width="1.7" stroke-linejoin="round"/>
  `;
}

export function mascot(mood = 'idle') {
  const wing =
    mood === 'celebrate'
      ? `<g class="illu-wiggle"><ellipse cx="38" cy="78" rx="18" ry="28" fill="#9b7cff" stroke="${ink}" stroke-width="3"/><ellipse cx="122" cy="58" rx="18" ry="28" fill="#9b7cff" stroke="${ink}" stroke-width="3"/></g>`
      : `<ellipse cx="40" cy="92" rx="16" ry="26" fill="#9b7cff" stroke="${ink}" stroke-width="3"/><ellipse cx="120" cy="92" rx="16" ry="26" fill="#9b7cff" stroke="${ink}" stroke-width="3"/>`;
  const spark = mood === 'happy' || mood === 'celebrate'
    ? `<g class="illu-spin-slow" fill="#ffd56a" stroke="${ink}" stroke-width="2">
        <polygon points="20,24 24,34 34,30 26,40 32,50 20,44 8,50 14,40 6,30 16,34"/>
        <polygon points="140,22 144,32 154,28 146,38 152,48 140,42 128,48 134,38 126,28 136,32"/>
      </g>`
    : '';
  return svg(`
    ${spark}
    <ellipse cx="80" cy="148" rx="36" ry="8" fill="rgba(45,33,80,.15)"/>
    <ellipse cx="80" cy="108" rx="46" ry="42" fill="#7c5cff" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="80" cy="118" rx="28" ry="26" fill="#ffe27a"/>
    <polygon points="80,104 86,116 74,116" fill="#ff8a3d" stroke="${ink}" stroke-width="2"/>
    <circle cx="80" cy="58" r="38" fill="#8b6cff" stroke="${ink}" stroke-width="4"/>
    <polygon points="48,28 58,48 42,46" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <polygon points="112,28 118,46 102,48" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    ${eyes(80, 58, mood === 'encourage' ? 'idle' : mood)}
    <ellipse cx="80" cy="74" rx="7" ry="5" fill="#ff8a3d" stroke="${ink}" stroke-width="2"/>
    ${wing}
  `, `illu mascot-illu ${mood === 'celebrate' ? 'illu-wiggle' : 'illu-bob'}`);
}

export function colorBlob(hex, label = '') {
  return svg(`
    <defs>
      <radialGradient id="g${hex.replace('#', '')}" cx="35%" cy="30%">
        <stop offset="0%" stop-color="#fff"/>
        <stop offset="55%" stop-color="${hex}"/>
        <stop offset="100%" stop-color="${hex}"/>
      </radialGradient>
    </defs>
    <ellipse cx="80" cy="138" rx="40" ry="10" fill="rgba(45,33,80,.12)"/>
    <path d="M40 88c0-28 18-58 40-58s40 30 40 58c0 26-18 40-40 40s-40-14-40-40z" fill="url(#g${hex.replace('#', '')})" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="62" cy="70" rx="12" ry="8" fill="rgba(255,255,255,.55)"/>
    ${label ? `<text x="80" y="96" text-anchor="middle" font-size="16" font-family="Fredoka, sans-serif" font-weight="700" fill="${ink}">${label}</text>` : ''}
  `, 'illu illu-bob');
}

function animalCow() {
  return svg(`
    ${ground()}
    <path d="M58 108 l-4 24" stroke="#f4f0e6" stroke-width="8" stroke-linecap="round"/>
    <path d="M74 112 l2 22" stroke="#2d2150" stroke-width="8" stroke-linecap="round"/>
    <path d="M104 112 l-2 22" stroke="#f4f0e6" stroke-width="8" stroke-linecap="round"/>
    <path d="M120 108 l4 24" stroke="#2d2150" stroke-width="8" stroke-linecap="round"/>
    ${clovenHoof(54, 130, '#3a2a18')}
    ${clovenHoof(76, 132, '#2a1c10')}
    ${clovenHoof(102, 132, '#3a2a18')}
    ${clovenHoof(124, 130, '#2a1c10')}
    <path d="M132 86 q16 8 6 34" fill="#efe6d4" stroke="${ink}" stroke-width="3"/>
    <path d="M138 116 q4 12 10 10" fill="none" stroke="#2d2150" stroke-width="5" stroke-linecap="round"/>
    <path d="M52 92 q8 -28 40 -30 q40 -4 52 18 q10 22 -6 38 q-28 12 -70 8 q-22 -4 -16 -34z" fill="#f6f1e8" stroke="${ink}" stroke-width="4"/>
    <path d="M70 72 q16 -8 28 2 q6 14 -8 18 q-20 2 -20 -20z" fill="#2d2150"/>
    <path d="M108 78 q18 -6 28 10 q2 14 -12 16 q-18 0 -16 -26z" fill="#2d2150"/>
    <ellipse cx="88" cy="122" rx="11" ry="8" fill="#f4a7b8" stroke="${ink}" stroke-width="2"/>
    <ellipse cx="84" cy="124" rx="1.8" ry="2.4" fill="#e0859a"/>
    <ellipse cx="92" cy="124" rx="1.8" ry="2.4" fill="#e0859a"/>
    <path d="M48 86 q-8 10 2 22" fill="#efe6d4" stroke="${ink}" stroke-width="3"/>
    <path d="M54 70 q-28 6 -34 22 q2 12 20 10 q16 -6 18 -20z" fill="#f6f1e8" stroke="${ink}" stroke-width="3.6"/>
    <ellipse cx="22" cy="90" rx="11" ry="8" fill="#f3b3c2" stroke="${ink}" stroke-width="2.4"/>
    <ellipse cx="18" cy="89" rx="2" ry="2.8" fill="#5a2a38"/>
    <ellipse cx="26" cy="90" rx="2" ry="2.8" fill="#5a2a38"/>
    <path d="M44 62 q-8 -16 6 -10" fill="none" stroke="#efe6d4" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="50" cy="68" rx="7" ry="11" fill="#efe6d4" stroke="${ink}" stroke-width="2.6"/>
    <ellipse cx="50" cy="70" rx="3.2" ry="6" fill="#ffc2d0"/>
    ${farmEye(38, 80, 4.2)}
    <ellipse cx="60" cy="86" rx="8" ry="6" fill="#2d2150"/>
  `, 'illu illu-bob');
}

function animalPig() {
  return svg(`
    ${ground()}
    <path d="M62 114 l-3 20" stroke="#f39ab4" stroke-width="9" stroke-linecap="round"/>
    <path d="M78 118 l1 18" stroke="#f39ab4" stroke-width="9" stroke-linecap="round"/>
    <path d="M104 118 l-1 18" stroke="#f39ab4" stroke-width="9" stroke-linecap="round"/>
    <path d="M120 114 l3 20" stroke="#f39ab4" stroke-width="9" stroke-linecap="round"/>
    ${clovenHoof(59, 132, '#d46b88')}
    ${clovenHoof(79, 134, '#d46b88')}
    ${clovenHoof(103, 134, '#d46b88')}
    ${clovenHoof(123, 132, '#d46b88')}
    <path d="M130 96 q18 6 8 24" fill="none" stroke="#ee8eab" stroke-width="5"/>
    <path d="M138 118 q8 8 0 2 q-8 0 -2 -8z" fill="#ee8eab" stroke="${ink}" stroke-width="2"/>
    <path d="M48 100 q10 -32 44 -34 q40 -2 46 24 q8 24 -10 36 q-30 10 -64 4 q-20 -4 -16 -30z" fill="#ffb3c6" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="88" cy="116" rx="26" ry="10" fill="#f48eaa"/>
    <path d="M70 108 q8 8 -2 12 M108 108 q-8 8 2 12" fill="none" stroke="#f48eaa" stroke-width="2.6" stroke-linecap="round"/>
    ${shine(72, 88, 14, 8)}
    <path d="M50 88 q-24 4 -32 16 q2 12 18 8 q16 -4 16 -16z" fill="#ffb3c6" stroke="${ink}" stroke-width="3.4"/>
    <ellipse cx="18" cy="102" rx="10" ry="9" fill="#f48eaa" stroke="${ink}" stroke-width="2.6"/>
    <ellipse cx="14" cy="100" rx="2.2" ry="3" fill="#5a2a38"/>
    <ellipse cx="22" cy="101" rx="2.2" ry="3" fill="#5a2a38"/>
    <ellipse cx="52" cy="70" rx="12" ry="16" fill="#f39ab4" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="52" cy="74" rx="5" ry="8" fill="#ffd4e0"/>
    ${farmEye(40, 90, 4.4)}
  `, 'illu illu-bob');
}

function animalChicken() {
  return svg(`
    ${ground()}
    <path d="M68 124 l-6 18 10 -4 8 8 8 -8 10 4 -6 -18" fill="#e67a20" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M66 140 h10 M84 140 h10" stroke="#c45e12" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M58 104 q8 -28 34 -22 q18 6 16 28 q-4 18 -28 20 q-24 0 -22 -26z" fill="#fff8ea" stroke="${ink}" stroke-width="4"/>
    <path d="M92 86 q22 -8 36 8 q8 16 -6 28 q-18 6 -28 -8 q-8 -12 -2 -28z" fill="#f6d56a" stroke="${ink}" stroke-width="3.2"/>
    <path d="M104 84 q12 -6 18 8 M112 90 q10 -2 14 10 M118 98 q8 2 10 12" fill="none" stroke="#e2b84a" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M70 100 q-4 14 16 16" fill="#fff3c8" stroke="${ink}" stroke-width="2.6"/>
    <path d="M64 102 q2 10 12 8 M74 100 q4 12 12 8" fill="none" stroke="#f0d9a0" stroke-width="2" stroke-linecap="round"/>
    <circle cx="56" cy="78" r="16" fill="#fff8ea" stroke="${ink}" stroke-width="3.4"/>
    <path d="M46 64 q2 -14 12 0 q8 -14 14 2 q-8 4 -12 0 q-6 6 -14 -2z" fill="#e23b4c" stroke="${ink}" stroke-width="2.4"/>
    <path d="M58 88 q2 10 -2 14 q-8 0 -8 -8 q2 -6 10 -6z" fill="#e23b4c" stroke="${ink}" stroke-width="2"/>
    <path d="M40 78 q-14 2 -16 8 q2 4 16 2z" fill="#f08a28" stroke="${ink}" stroke-width="2.2"/>
    ${farmEye(52, 76, 4.4)}
  `, 'illu illu-bob');
}

function animalHorse() {
  return svg(`
    ${ground()}
    <path d="M64 100 l-6 36" stroke="#6b3a18" stroke-width="7" stroke-linecap="round"/>
    <path d="M78 104 l2 34" stroke="#6b3a18" stroke-width="7" stroke-linecap="round"/>
    <path d="M108 104 l-2 34" stroke="#6b3a18" stroke-width="7" stroke-linecap="round"/>
    <path d="M122 100 l6 36" stroke="#6b3a18" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="58" cy="136" rx="6" ry="3.2" fill="#2d1a0c" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="80" cy="138" rx="6" ry="3.2" fill="#2d1a0c" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="106" cy="138" rx="6" ry="3.2" fill="#2d1a0c" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="128" cy="136" rx="6" ry="3.2" fill="#2d1a0c" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="58" cy="130" rx="3.6" ry="2.6" fill="#d8b48a"/>
    <ellipse cx="80" cy="132" rx="3.6" ry="2.6" fill="#d8b48a"/>
    <ellipse cx="106" cy="132" rx="3.6" ry="2.6" fill="#d8b48a"/>
    <ellipse cx="128" cy="130" rx="3.6" ry="2.6" fill="#d8b48a"/>
    <path d="M128 78 q20 6 10 40" fill="#4a2610" stroke="${ink}" stroke-width="3"/>
    <path d="M134 92 q8 12 2 24 M140 98 q6 12 0 20" fill="none" stroke="#3a1c0c" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M58 86 q16 -22 52 -18 q28 4 28 24 q2 20 -16 28 q-36 8 -56 0 q-12 -6 -8 -34z" fill="#c36e2e" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="86" cy="88" rx="16" ry="10" fill="#d88844"/>
    <path d="M58 80 q-18 -8 -16 18 q4 16 18 12" fill="#c36e2e" stroke="${ink}" stroke-width="3.4"/>
    <path d="M42 62 q-26 8 -28 22 q2 10 16 8 q16 -4 16 -16z" fill="#c36e2e" stroke="${ink}" stroke-width="3.4"/>
    <ellipse cx="16" cy="84" rx="10" ry="6" fill="#e8c090"/>
    <ellipse cx="12" cy="85" rx="1.8" ry="1.3" fill="#5a2a18"/>
    <ellipse cx="19" cy="85" rx="1.8" ry="1.3" fill="#5a2a18"/>
    <path d="M20 72 q-2 -10 8 -6" fill="#f7efe2" stroke="${ink}" stroke-width="2"/>
    <path d="M56 56 q18 -22 8 16" fill="#3f210e" stroke="${ink}" stroke-width="3"/>
    <path d="M50 64 q10 -14 4 8 M60 70 q10 -12 2 8 M66 78 q8 -10 0 8" fill="#4a2610"/>
    <ellipse cx="52" cy="52" rx="5" ry="9" fill="#c36e2e" stroke="${ink}" stroke-width="2.4"/>
    <ellipse cx="52" cy="52" rx="2" ry="4.4" fill="#e8c090"/>
    ${farmEye(30, 74, 4.2)}
  `, 'illu illu-bob');
}

function animalSheep() {
  return svg(`
    ${ground()}
    <path d="M66 116 l-2 18" stroke="#2d2150" stroke-width="7" stroke-linecap="round"/>
    <path d="M80 118 l1 16" stroke="#2d2150" stroke-width="7" stroke-linecap="round"/>
    <path d="M104 118 l-1 16" stroke="#2d2150" stroke-width="7" stroke-linecap="round"/>
    <path d="M118 116 l2 18" stroke="#2d2150" stroke-width="7" stroke-linecap="round"/>
    ${clovenHoof(64, 132)}
    ${clovenHoof(81, 132)}
    ${clovenHoof(103, 132)}
    ${clovenHoof(120, 132)}
    <circle cx="70" cy="86" r="20" fill="#f7f5ee" stroke="${ink}" stroke-width="2.6"/>
    <circle cx="94" cy="80" r="24" fill="#f4f2ea" stroke="${ink}" stroke-width="2.6"/>
    <circle cx="118" cy="90" r="18" fill="#f7f5ee" stroke="${ink}" stroke-width="2.6"/>
    <circle cx="82" cy="108" r="16" fill="#efebe0" stroke="${ink}" stroke-width="2.6"/>
    <circle cx="108" cy="110" r="15" fill="#f7f5ee" stroke="${ink}" stroke-width="2.6"/>
    <circle cx="96" cy="96" r="14" fill="#fff"/>
    <path d="M64 86 q8 6 0 10 M88 74 q10 6 2 10 M110 82 q8 6 0 10" fill="none" stroke="#e4ddd0" stroke-width="2" stroke-linecap="round"/>
    <path d="M54 88 q-16 2 -18 16 q2 10 14 6 q12 -4 10 -16z" fill="#3d2a1c" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="50" cy="78" rx="5" ry="10" fill="#3d2a1c" stroke="${ink}" stroke-width="2.2"/>
    <ellipse cx="50" cy="80" rx="2.2" ry="5" fill="#c9a48a"/>
    <ellipse cx="36" cy="104" rx="5" ry="3.2" fill="#f4a7b8"/>
    ${farmEye(42, 96, 3.8)}
  `, 'illu illu-bob');
}

function animalDuck() {
  return svg(`
    ${ground()}
    <path d="M62 124 q12 18 22 0" fill="#f08a28" stroke="${ink}" stroke-width="2.4"/>
    <path d="M82 124 q12 18 22 0" fill="#f08a28" stroke="${ink}" stroke-width="2.4"/>
    <path d="M66 140 h14 M86 140 h14" stroke="#d96b18" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M52 104 q16 -22 48 -16 q24 6 22 26 q-4 16 -28 18 q-36 2 -42 -28z" fill="#fff6dc" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="70" cy="100" rx="14" ry="10" fill="#fff"/>
    <path d="M108 98 q16 2 18 16 q-4 8 -18 6" fill="#fff0c8" stroke="${ink}" stroke-width="2.6"/>
    <path d="M48 88 q-8 -20 10 -28 q8 8 4 20" fill="#fff6dc" stroke="${ink}" stroke-width="3"/>
    <circle cx="48" cy="68" r="16" fill="#fff6dc" stroke="${ink}" stroke-width="3.4"/>
    <path d="M32 66 q-18 2 -20 10 q2 5 20 3z" fill="#f08a28" stroke="${ink}" stroke-width="2.4"/>
    <path d="M32 70 q-14 2 -14 5" fill="#d96b18"/>
    <ellipse cx="24" cy="68" rx="2" ry="1.3" fill="#8a3a10"/>
    ${farmEye(46, 64, 4.6)}
  `, 'illu illu-bob');
}

function animalDog() {
  return svg(`
    ${ground()}
    <path d="M126 96 q20 12 8 32" fill="#c47a3a" stroke="${ink}" stroke-width="3"/>
    <path d="M64 112 l-4 22" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <path d="M80 116 l2 20" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <path d="M104 116 l-2 20" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <path d="M118 112 l4 22" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="60" cy="134" rx="7" ry="3.2" fill="#5a3a1a" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="82" cy="136" rx="7" ry="3.2" fill="#5a3a1a" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="102" cy="136" rx="7" ry="3.2" fill="#5a3a1a" stroke="${ink}" stroke-width="1.7"/>
    <ellipse cx="122" cy="134" rx="7" ry="3.2" fill="#5a3a1a" stroke="${ink}" stroke-width="1.7"/>
    <path d="M58 96 q14 -24 44 -20 q28 4 30 24 q2 18 -16 24 q-34 6 -50 -4 q-10 -6 -8 -24z" fill="#e2a35c" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="88" cy="112" rx="16" ry="8" fill="#f3d2a4"/>
    <path d="M58 88 q-16 0 -22 14 q2 10 14 6 q12 -4 10 -14z" fill="#e2a35c" stroke="${ink}" stroke-width="3.2"/>
    <ellipse cx="32" cy="102" rx="10" ry="7" fill="#f3d2a4"/>
    <ellipse cx="28" cy="104" rx="3.4" ry="2.4" fill="#5a3a1a"/>
    <ellipse cx="48" cy="78" rx="9" ry="14" fill="#c47a3a" stroke="${ink}" stroke-width="2.6"/>
    <rect x="70" y="92" width="28" height="7" rx="3.5" fill="#7c5cff" stroke="${ink}" stroke-width="1.8"/>
    <circle cx="84" cy="95.5" r="1.8" fill="#ffd56a"/>
    ${farmEye(48, 90, 4.4)}
  `, 'illu illu-bob');
}

function animalCat() {
  return svg(`
    ${ground()}
    <path d="M122 96 q22 14 4 40" fill="none" stroke="#f0a030" stroke-width="8" stroke-linecap="round"/>
    <path d="M128 108 q6 6 -2 8 M132 118 q6 6 -2 8 M134 128 q4 4 -2 6" stroke="#c47a20" stroke-width="2" stroke-linecap="round"/>
    <path d="M62 114 l-2 18" stroke="#f0a030" stroke-width="7" stroke-linecap="round"/>
    <path d="M78 118 l1 16" stroke="#f0a030" stroke-width="7" stroke-linecap="round"/>
    <path d="M100 118 l-1 16" stroke="#f0a030" stroke-width="7" stroke-linecap="round"/>
    <path d="M114 114 l2 18" stroke="#f0a030" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="60" cy="132" rx="6" ry="2.8" fill="#ffe7b8" stroke="${ink}" stroke-width="1.5"/>
    <ellipse cx="79" cy="134" rx="6" ry="2.8" fill="#ffe7b8" stroke="${ink}" stroke-width="1.5"/>
    <ellipse cx="99" cy="134" rx="6" ry="2.8" fill="#ffe7b8" stroke="${ink}" stroke-width="1.5"/>
    <ellipse cx="116" cy="132" rx="6" ry="2.8" fill="#ffe7b8" stroke="${ink}" stroke-width="1.5"/>
    <path d="M58 96 q12 -22 40 -18 q24 4 26 22 q2 16 -14 20 q-30 4 -46 -4 q-8 -4 -6 -20z" fill="#f0a030" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="86" cy="110" rx="12" ry="6" fill="#ffe7b8"/>
    <path d="M62 94 q0 10 10 6 M78 88 q2 12 10 6 M96 88 q-2 12 8 6" fill="none" stroke="#c47a20" stroke-width="2" stroke-linecap="round"/>
    <path d="M56 84 q-12 2 -16 14 q2 8 12 4 q10 -4 8 -12z" fill="#f0a030" stroke="${ink}" stroke-width="3"/>
    <polygon points="50,78 46,56 62,76" fill="#f0a030" stroke="${ink}" stroke-width="2.4"/>
    <polygon points="50,74 48,62 56,74" fill="#ffd0dc"/>
    <ellipse cx="38" cy="98" rx="5" ry="3.4" fill="#ffe7b8"/>
    <path d="M38 98 l-3 3 6 0 z" fill="#ff7aa2" stroke="${ink}" stroke-width="1.4"/>
    <path d="M28 96 h-12 M28 101 h-10" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
    ${farmEye(46, 90, 4)}
  `, 'illu illu-wiggle');
}

function animalLion() {
  return svg(`
    ${ground()}
    <ellipse cx="80" cy="124" rx="22" ry="14" fill="#e2b15a" stroke="${ink}" stroke-width="3"/>
    <circle cx="80" cy="82" r="50" fill="#d96b24" stroke="${ink}" stroke-width="4"/>
    <circle cx="42" cy="58" r="16" fill="#e07a2e"/>
    <circle cx="118" cy="58" r="16" fill="#e07a2e"/>
    <circle cx="40" cy="104" r="15" fill="#c45c18"/>
    <circle cx="120" cy="104" r="15" fill="#c45c18"/>
    <circle cx="80" cy="38" r="16" fill="#ff8a3d"/>
    <circle cx="80" cy="84" r="30" fill="#ffe08a" stroke="${ink}" stroke-width="4"/>
    ${shine(70, 74, 10, 6)}
    ${eyes(80, 78)}
    <ellipse cx="80" cy="94" rx="9" ry="7" fill="#c47a3a"/>
    <circle cx="77" cy="93" r="1.4" fill="${ink}"/><circle cx="83" cy="93" r="1.4" fill="${ink}"/>
    <path d="M70 104 q10 8 20 0" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    <path d="M58 92 h-10 M102 92 h10" stroke="${ink}" stroke-width="2"/>
  `, 'illu illu-bob');
}

function animalElephant() {
  return svg(`
    ${ground()}
    <rect x="70" y="122" width="14" height="22" rx="6" fill="#9aa3bb" stroke="${ink}" stroke-width="3"/>
    <rect x="96" y="122" width="14" height="22" rx="6" fill="#9aa3bb" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="92" cy="108" rx="44" ry="28" fill="#b8c0d4" stroke="${ink}" stroke-width="4"/>
    ${shine(78, 96, 14, 8)}
    <circle cx="58" cy="70" r="28" fill="#b8c0d4" stroke="${ink}" stroke-width="4"/>
    <path d="M36 64 q-22 -8 -18 18 q4 16 22 8" fill="#c5cde0" stroke="${ink}" stroke-width="3"/>
    <path d="M36 68 q-12 0 -10 12 q2 8 12 4" fill="#e8b8c8"/>
    <ellipse cx="118" cy="58" rx="16" ry="20" fill="#b8c0d4" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="118" cy="62" rx="8" ry="12" fill="#e8b8c8"/>
    <path d="M48 88 q-26 22 -6 48 q8 2 12 -8" fill="#9aa3bb" stroke="${ink}" stroke-width="3"/>
    <path d="M42 112 q-4 8 6 10" fill="none" stroke="#8b95ad" stroke-width="3"/>
    <path d="M70 86 q8 18 -2 28" fill="#f4f1ea" stroke="${ink}" stroke-width="2.5"/>
    <path d="M78 90 q8 16 0 26" fill="#f4f1ea" stroke="${ink}" stroke-width="2.5"/>
    <circle cx="50" cy="64" r="6" fill="#fff"/><circle cx="50" cy="64" r="3" fill="${ink}"/>
    <circle cx="52" cy="62" r="1.1" fill="#fff"/>
  `, 'illu illu-bob');
}

function animalGiraffe() {
  return svg(`
    ${ground()}
    <rect x="70" y="122" width="12" height="22" rx="5" fill="#e2a84a" stroke="${ink}" stroke-width="3"/>
    <rect x="90" y="122" width="12" height="22" rx="5" fill="#e2a84a" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="86" cy="124" rx="30" ry="16" fill="#f4c96b" stroke="${ink}" stroke-width="4"/>
    <rect x="74" y="48" width="22" height="78" rx="11" fill="#f4c96b" stroke="${ink}" stroke-width="4"/>
    ${shine(82, 70, 6, 16)}
    <ellipse cx="64" cy="68" rx="8" ry="6" fill="#c47a3a"/>
    <ellipse cx="92" cy="86" rx="9" ry="7" fill="#c47a3a"/>
    <ellipse cx="70" cy="102" rx="8" ry="6" fill="#c47a3a"/>
    <ellipse cx="94" cy="114" rx="9" ry="7" fill="#c47a3a"/>
    <ellipse cx="80" cy="38" rx="20" ry="16" fill="#f4c96b" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="62" cy="36" rx="7" ry="10" fill="#f4c96b" stroke="${ink}" stroke-width="3"/>
    <rect x="70" y="16" width="6" height="16" rx="3" fill="#c47a3a" stroke="${ink}" stroke-width="2"/>
    <rect x="86" y="14" width="6" height="16" rx="3" fill="#c47a3a" stroke="${ink}" stroke-width="2"/>
    <circle cx="70" cy="16" r="4" fill="#a85d28"/>
    <circle cx="86" cy="14" r="4" fill="#a85d28"/>
    <circle cx="68" cy="36" r="5" fill="#fff"/><circle cx="68" cy="36" r="2.5" fill="${ink}"/>
    <ellipse cx="56" cy="44" rx="8" ry="5" fill="#e2b07a"/>
    <path d="M104 56 q8 18 2 36" fill="none" stroke="#c47a3a" stroke-width="4" stroke-linecap="round"/>
  `, 'illu illu-bob');
}

function animalMonkey() {
  return svg(`
    ${ground()}
    <path d="M44 108 q-18 16 4 28" fill="none" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <path d="M116 108 q18 16 -4 28" fill="none" stroke="#c47a3a" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="80" cy="116" rx="32" ry="22" fill="#c47a3a" stroke="${ink}" stroke-width="4"/>
    <circle cx="80" cy="68" r="28" fill="#c47a3a" stroke="${ink}" stroke-width="4"/>
    ${shine(70, 58, 10, 6)}
    <circle cx="52" cy="60" r="13" fill="#f4d7b0" stroke="${ink}" stroke-width="3"/>
    <circle cx="108" cy="60" r="13" fill="#f4d7b0" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="80" cy="80" rx="22" ry="18" fill="#f4d7b0"/>
    ${eyes(80, 70)}
    <ellipse cx="80" cy="86" rx="7" ry="5" fill="#e2b07a"/>
    <path d="M70 92 q10 8 20 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
  `, 'illu illu-wiggle');
}

function animalPenguin() {
  return svg(`
    ${ground()}
    <ellipse cx="80" cy="92" rx="32" ry="46" fill="#2d2150" stroke="${ink}" stroke-width="4"/>
    ${shine(68, 70, 8, 14)}
    <ellipse cx="80" cy="104" rx="20" ry="30" fill="#fffaf4"/>
    <circle cx="80" cy="48" r="20" fill="#2d2150" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="80" cy="56" rx="12" ry="8" fill="#fffaf4"/>
    <circle cx="72" cy="46" r="5" fill="#fff"/><circle cx="88" cy="46" r="5" fill="#fff"/>
    <circle cx="72" cy="46" r="2.5" fill="${ink}"/><circle cx="88" cy="46" r="2.5" fill="${ink}"/>
    <polygon points="80,54 96,62 80,66" fill="#ff8a3d" stroke="${ink}" stroke-width="2"/>
    <ellipse cx="46" cy="92" rx="11" ry="18" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="114" cy="92" rx="11" ry="18" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <path d="M64 136 q8 10 16 0 q8 10 16 0" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}

function animalFish() {
  return svg(`
    <ellipse cx="70" cy="148" rx="28" ry="6" fill="rgba(45,33,80,.1)"/>
    <polygon points="112,80 146,52 140,80 146,108" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="76" cy="82" rx="42" ry="26" fill="#5ad2ff" stroke="${ink}" stroke-width="4"/>
    ${shine(60, 72, 12, 8)}
    <path d="M70 66 q8 16 0 32 M86 64 q8 18 0 36" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3"/>
    <polygon points="76,56 88,44 96,58" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <polygon points="76,108 90,122 98,106" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <path d="M48 82 q-8 0 -6 10" fill="none" stroke="#3aa8d4" stroke-width="3"/>
    <circle cx="54" cy="76" r="7" fill="#fff"/><circle cx="54" cy="76" r="3.2" fill="${ink}"/>
    <circle cx="56" cy="74" r="1.2" fill="#fff"/>
    <path d="M62 90 q12 8 22 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
    <circle cx="118" cy="48" r="5" fill="rgba(255,255,255,.55)" stroke="#cfefff" stroke-width="2"/>
    <circle cx="132" cy="40" r="3.5" fill="rgba(255,255,255,.45)"/>
  `, 'illu illu-float');
}

function animalFrog() {
  return svg(`
    ${ground()}
    <ellipse cx="52" cy="128" rx="16" ry="8" fill="#3bb354" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="108" cy="128" rx="16" ry="8" fill="#3bb354" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="80" cy="108" rx="46" ry="26" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    ${shine(64, 98, 12, 7)}
    <ellipse cx="80" cy="114" rx="18" ry="9" fill="#2f9e4a"/>
    <circle cx="56" cy="72" r="18" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    <circle cx="104" cy="72" r="18" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    <circle cx="56" cy="70" r="8" fill="#fff"/><circle cx="104" cy="70" r="8" fill="#fff"/>
    <circle cx="56" cy="70" r="4" fill="${ink}"/><circle cx="104" cy="70" r="4" fill="${ink}"/>
    <circle cx="58" cy="68" r="1.4" fill="#fff"/><circle cx="106" cy="68" r="1.4" fill="#fff"/>
    <path d="M64 104 q16 12 32 0" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="68" cy="100" r="4" fill="#3bb354"/>
    <circle cx="96" cy="102" r="4" fill="#3bb354"/>
  `, 'illu illu-bob');
}

function animalBear() {
  return svg(`
    ${ground()}
    <ellipse cx="80" cy="112" rx="40" ry="26" fill="#8b5a2b" stroke="${ink}" stroke-width="4"/>
    ${shine(66, 100, 12, 7)}
    <ellipse cx="80" cy="118" rx="16" ry="9" fill="#c48a5a"/>
    <circle cx="80" cy="68" r="28" fill="#8b5a2b" stroke="${ink}" stroke-width="4"/>
    <circle cx="52" cy="46" r="13" fill="#8b5a2b" stroke="${ink}" stroke-width="3"/>
    <circle cx="108" cy="46" r="13" fill="#8b5a2b" stroke="${ink}" stroke-width="3"/>
    <circle cx="52" cy="46" r="6" fill="#e7c9a5"/>
    <circle cx="108" cy="46" r="6" fill="#e7c9a5"/>
    <ellipse cx="80" cy="82" rx="16" ry="12" fill="#e7c9a5"/>
    ${eyes(80, 64)}
    <ellipse cx="80" cy="80" rx="8" ry="6" fill="#5a3a1a"/>
    <path d="M70 90 q10 7 20 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
  `, 'illu illu-bob');
}

function animalTiger() {
  return svg(`
    ${ground()}
    <path d="M118 104 q20 16 4 32" fill="none" stroke="#ff8a3d" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="80" cy="112" rx="38" ry="24" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    ${shine(66, 102, 10, 6)}
    <path d="M60 104 v16 M78 100 v18 M98 104 v16" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="80" cy="118" rx="14" ry="8" fill="#fff6e8"/>
    <circle cx="80" cy="68" r="28" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    <polygon points="54,52 58,28 74,52" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <polygon points="106,52 102,28 86,52" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <polygon points="58,48 60,36 68,48" fill="${ink}"/>
    <polygon points="102,48 100,36 92,48" fill="${ink}"/>
    <path d="M64 50 v16 M80 44 v14 M96 50 v16" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>
    ${eyes(80, 66)}
    <ellipse cx="80" cy="82" rx="12" ry="8" fill="#fff6e8"/>
    <path d="M80 78 l-4 5 8 0 z" fill="#2d2150"/>
    <path d="M70 90 q10 6 20 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
  `, 'illu illu-wiggle');
}

function animalZebra() {
  return svg(`
    ${ground()}
    <rect x="60" y="122" width="11" height="22" rx="5" fill="#2d2150" stroke="${ink}" stroke-width="3"/>
    <rect x="78" y="124" width="11" height="20" rx="5" fill="#f7f7f4" stroke="${ink}" stroke-width="3"/>
    <rect x="98" y="124" width="11" height="20" rx="5" fill="#2d2150" stroke="${ink}" stroke-width="3"/>
    <rect x="114" y="122" width="11" height="22" rx="5" fill="#f7f7f4" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="94" cy="108" rx="40" ry="24" fill="#f7f7f4" stroke="${ink}" stroke-width="4"/>
    <path d="M70 96 v22 M86 92 v26 M104 96 v22 M118 100 v18" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
    <rect x="50" y="70" width="22" height="42" rx="11" fill="#f7f7f4" stroke="${ink}" stroke-width="4"/>
    <path d="M58 78 v24 M70 82 v22" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="44" cy="62" rx="20" ry="14" fill="#f7f7f4" stroke="${ink}" stroke-width="4"/>
    <path d="M50 54 v16 M62 56 v12" stroke="${ink}" stroke-width="4"/>
    <path d="M64 44 q16 -20 2 16" fill="#2d2150" stroke="${ink}" stroke-width="2"/>
    <circle cx="32" cy="58" r="5" fill="#fff"/><circle cx="32" cy="58" r="2.5" fill="${ink}"/>
    <ellipse cx="26" cy="66" rx="7" ry="5" fill="#e8e4dc"/>
  `, 'illu illu-bob');
}

function animalPanda() {
  return svg(`
    ${ground()}
    <ellipse cx="80" cy="114" rx="38" ry="24" fill="#fff" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="56" cy="122" rx="12" ry="10" fill="${ink}"/>
    <ellipse cx="104" cy="122" rx="12" ry="10" fill="${ink}"/>
    <circle cx="80" cy="68" r="28" fill="#fff" stroke="${ink}" stroke-width="4"/>
    ${shine(70, 58, 9, 6)}
    <circle cx="52" cy="46" r="13" fill="${ink}"/>
    <circle cx="108" cy="46" r="13" fill="${ink}"/>
    <ellipse cx="66" cy="68" rx="11" ry="13" fill="${ink}"/>
    <ellipse cx="94" cy="68" rx="11" ry="13" fill="${ink}"/>
    <circle cx="68" cy="68" r="4.5" fill="#fff"/><circle cx="96" cy="68" r="4.5" fill="#fff"/>
    <circle cx="68" cy="68" r="2.3" fill="${ink}"/><circle cx="96" cy="68" r="2.3" fill="${ink}"/>
    <ellipse cx="80" cy="84" rx="8" ry="6" fill="#f4f1ea"/>
    <ellipse cx="80" cy="84" rx="4" ry="3" fill="#2d2150"/>
    <path d="M70 92 q10 6 20 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
  `, 'illu illu-bob');
}

function animalWhale() {
  return svg(`
    <ellipse cx="70" cy="148" rx="36" ry="6" fill="rgba(45,33,80,.1)"/>
    <path d="M118 78 l28 -18 -8 22 18 16 -30 -4" fill="#4a7fe0" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="76" cy="90" rx="52" ry="28" fill="#5b8def" stroke="${ink}" stroke-width="4"/>
    ${shine(54, 80, 16, 10)}
    <ellipse cx="76" cy="104" rx="22" ry="10" fill="#89b4ff"/>
    <ellipse cx="46" cy="104" rx="16" ry="8" fill="#4a7fe0" stroke="${ink}" stroke-width="3"/>
    <circle cx="48" cy="82" r="6" fill="#fff"/><circle cx="48" cy="82" r="3" fill="${ink}"/>
    <path d="M40 96 q12 8 28 2" fill="none" stroke="${ink}" stroke-width="2.5"/>
    <path d="M58 62 q2 -20 12 -6" fill="none" stroke="#cfe4ff" stroke-width="6" stroke-linecap="round"/>
    <circle cx="64" cy="46" r="4" fill="rgba(255,255,255,.5)"/>
    <circle cx="70" cy="36" r="3" fill="rgba(255,255,255,.4)"/>
  `, 'illu illu-float');
}

function animalButterfly() {
  return svg(`
    <path d="M72 36 q-6 -16 2 -24 M88 36 q6 -16 -2 -24" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="74" cy="14" r="3" fill="#ffd56a"/>
    <circle cx="86" cy="14" r="3" fill="#ffd56a"/>
    <ellipse cx="80" cy="84" rx="8" ry="30" fill="#5a3a1a" stroke="${ink}" stroke-width="2"/>
    <ellipse cx="48" cy="60" rx="30" ry="24" fill="#c77dff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="112" cy="60" rx="30" ry="24" fill="#c77dff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="50" cy="104" rx="24" ry="18" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="110" cy="104" rx="24" ry="18" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <circle cx="46" cy="58" r="10" fill="#ffd56a" stroke="${ink}" stroke-width="2"/>
    <circle cx="114" cy="58" r="10" fill="#ffd56a" stroke="${ink}" stroke-width="2"/>
    <circle cx="46" cy="58" r="4" fill="#ff8a3d"/>
    <circle cx="114" cy="58" r="4" fill="#ff8a3d"/>
    <circle cx="52" cy="104" r="6" fill="#ffb6c8"/>
    <circle cx="108" cy="104" r="6" fill="#ffb6c8"/>
  `, 'illu illu-float');
}

function animalBird() {
  return svg(`
    ${ground()}
    <ellipse cx="76" cy="96" rx="34" ry="24" fill="#5ad2ff" stroke="${ink}" stroke-width="4"/>
    ${shine(64, 86, 10, 6)}
    <path d="M58 90 q-20 -22 10 -34 q8 10 4 24" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <path d="M88 108 q18 6 16 24 q-12 2 -24 -4" fill="#3eb6e8" stroke="${ink}" stroke-width="3"/>
    <circle cx="112" cy="70" r="18" fill="#5ad2ff" stroke="${ink}" stroke-width="4"/>
    <polygon points="126,70 146,76 126,84" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <circle cx="116" cy="66" r="5.5" fill="#fff"/><circle cx="116" cy="66" r="2.8" fill="${ink}"/>
    <circle cx="118" cy="65" r="1" fill="#fff"/>
    <path d="M54 128 l8 12 8 -4 8 4 8 -12" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-float');
}

function animalRabbit() {
  return svg(`
    ${ground()}
    <ellipse cx="118" cy="118" rx="10" ry="8" fill="#fff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="80" cy="116" rx="32" ry="22" fill="#f7f0e8" stroke="${ink}" stroke-width="4"/>
    ${shine(68, 106, 10, 6)}
    <circle cx="80" cy="76" r="26" fill="#f7f0e8" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="64" cy="36" rx="8" ry="26" fill="#f7f0e8" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="96" cy="36" rx="8" ry="26" fill="#f7f0e8" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="64" cy="38" rx="4" ry="16" fill="#ffd0dc"/>
    <ellipse cx="96" cy="38" rx="4" ry="16" fill="#ffd0dc"/>
    ${eyes(80, 74)}
    <ellipse cx="80" cy="88" rx="7" ry="5" fill="#ffb6c8"/>
    <path d="M80 90 v6" stroke="${ink}" stroke-width="2"/>
    <path d="M70 96 q10 6 20 0" fill="none" stroke="${ink}" stroke-width="2.5"/>
  `, 'illu illu-bob');
}

function animalFox() {
  return svg(`
    ${ground()}
    <ellipse cx="124" cy="112" rx="22" ry="12" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="138" cy="112" rx="8" ry="8" fill="#fff" stroke="${ink}" stroke-width="2"/>
    <ellipse cx="80" cy="114" rx="34" ry="22" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    ${shine(66, 104, 10, 6)}
    <ellipse cx="80" cy="120" rx="16" ry="8" fill="#fff"/>
    <rect x="58" y="126" width="10" height="16" rx="4" fill="#2d2150" stroke="${ink}" stroke-width="2"/>
    <rect x="92" y="126" width="10" height="16" rx="4" fill="#2d2150" stroke="${ink}" stroke-width="2"/>
    <circle cx="80" cy="72" r="26" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    <polygon points="54,60 56,32 74,58" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <polygon points="106,60 104,32 86,58" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <polygon points="58,54 58,40 68,54" fill="#2d2150"/>
    <polygon points="102,54 102,40 92,54" fill="#2d2150"/>
    <ellipse cx="80" cy="86" rx="16" ry="10" fill="#fff"/>
    ${eyes(80, 70)}
    <path d="M80 80 l-4 5 8 0 z" fill="#2d2150"/>
  `, 'illu illu-bob');
}

export const animals = {
  cow: animalCow,
  pig: animalPig,
  chicken: animalChicken,
  horse: animalHorse,
  sheep: animalSheep,
  duck: animalDuck,
  dog: animalDog,
  cat: animalCat,
  lion: animalLion,
  elephant: animalElephant,
  giraffe: animalGiraffe,
  monkey: animalMonkey,
  penguin: animalPenguin,
  fish: animalFish,
  frog: animalFrog,
  bear: animalBear,
  tiger: animalTiger,
  zebra: animalZebra,
  panda: animalPanda,
  whale: animalWhale,
  butterfly: animalButterfly,
  bird: animalBird,
  rabbit: animalRabbit,
  fox: animalFox,
};

function objApple() {
  return svg(`
    <ellipse cx="80" cy="96" rx="32" ry="36" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <path d="M80 64 q8 -24 20 -20" fill="none" stroke="#4cd964" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="64" cy="84" rx="10" ry="8" fill="rgba(255,255,255,.35)"/>
  `, 'illu illu-bob');
}
function objBall() {
  return svg(`
    <circle cx="80" cy="84" r="36" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    <path d="M44 84 h72 M80 48 v72 M56 56 q24 28 48 0 M56 112 q24 -28 48 0" fill="none" stroke="#fff" stroke-width="4"/>
  `, 'illu illu-bob');
}
function objBanana() {
  return svg(`
    <path d="M48 48 q60 -10 72 64 q-40 18 -70 8 q8 -36  -2 -72z" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
    <path d="M50 50 q8 -10 16 -2" fill="#6b3b1f"/>
  `, 'illu illu-bob');
}
function objGrapes() {
  return svg(`
    <circle cx="80" cy="70" r="14" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <circle cx="62" cy="88" r="14" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <circle cx="98" cy="88" r="14" fill="#7c5cff" stroke="${ink}" stroke-width="3"/>
    <circle cx="80" cy="106" r="14" fill="#6a48e6" stroke="${ink}" stroke-width="3"/>
    <path d="M80 56 q8 -18 20 -12" fill="none" stroke="#4cd964" stroke-width="5"/>
  `, 'illu illu-bob');
}
function objStrawberry() {
  return svg(`
    <path d="M80 40 c28 8 40 40 0 72 c-40 -32 -28 -64 0 -72z" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <path d="M60 44 h40 l-20 -16z" fill="#4cd964" stroke="${ink}" stroke-width="3"/>
    <circle cx="70" cy="70" r="3" fill="#ffd56a"/><circle cx="90" cy="78" r="3" fill="#ffd56a"/>
    <circle cx="78" cy="92" r="3" fill="#ffd56a"/>
  `, 'illu illu-bob');
}
function objCarrot() {
  return svg(`
    <polygon points="80,40 108,128 52,128" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    <path d="M70 40 q10 -24 20 0" fill="#4cd964" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objSun() {
  return svg(`
    <circle cx="80" cy="80" r="26" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
    <g stroke="#ff8a3d" stroke-width="6" stroke-linecap="round">
      <path d="M80 18 v16 M80 126 v16 M18 80 h16 M126 80 h16 M34 34 l12 12 M114 114 l12 12 M34 126 l12 -12 M114 46 l12 -12"/>
    </g>
  `, 'illu illu-spin-slow');
}
function objMoon() {
  return svg(`
    <path d="M90 30 a46 46 0 1 0 0 100 a36 36 0 1 1 0 -100" fill="#ffe9a8" stroke="${ink}" stroke-width="4"/>
    <circle cx="88" cy="70" r="6" fill="#f0d48a"/>
    <circle cx="100" cy="96" r="4" fill="#f0d48a"/>
  `, 'illu illu-bob');
}
function objTree() {
  return svg(`
    <rect x="70" y="100" width="20" height="36" rx="4" fill="#8b5a2b" stroke="${ink}" stroke-width="3"/>
    <circle cx="80" cy="70" r="36" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    <circle cx="56" cy="84" r="18" fill="#3dbb55"/>
    <circle cx="104" cy="84" r="18" fill="#3dbb55"/>
  `, 'illu illu-bob');
}
function objLeaf() {
  return svg(`
    <path d="M40 100 q20 -70 80 -80 q-10 70 -80 80z" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    <path d="M48 96 q30 -36 64 -64" fill="none" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-float');
}
function objHat() {
  return svg(`
    <ellipse cx="80" cy="110" rx="50" ry="12" fill="#7c5cff" stroke="${ink}" stroke-width="4"/>
    <rect x="50" y="50" width="60" height="60" rx="8" fill="#7c5cff" stroke="${ink}" stroke-width="4"/>
    <rect x="50" y="86" width="60" height="10" fill="#ffd56a"/>
  `, 'illu illu-bob');
}
function objCake() {
  return svg(`
    <rect x="36" y="78" width="88" height="44" rx="8" fill="#f4d7b0" stroke="${ink}" stroke-width="4"/>
    <path d="M36 90 q18 -16 36 0 q18 16 36 0 q16 -14 16 0" fill="#ff7ad9" stroke="${ink}" stroke-width="3"/>
    <rect x="74" y="46" width="12" height="34" fill="#ffd56a" stroke="${ink}" stroke-width="2"/>
    <circle cx="80" cy="42" r="8" fill="#ff3b5c"/>
  `, 'illu illu-bob');
}
function objKite() {
  return svg(`
    <polygon points="80,24 124,80 80,136 36,80" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <path d="M80 24 L80 136 M36 80 H124" stroke="#fff" stroke-width="3"/>
    <path d="M80 136 q16 16 8 28 q16 8 4 18" fill="none" stroke="#7c5cff" stroke-width="4"/>
  `, 'illu illu-float');
}
function objUmbrella() {
  return svg(`
    <path d="M28 88 q52 -60 104 0z" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <path d="M80 88 v36 q8 12 18 8" fill="none" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>
    <path d="M28 88 q18 16 34 0 q18 16 36 0 q18 16 34 0" fill="#ff7a9c"/>
  `, 'illu illu-bob');
}
function objIcecream() {
  return svg(`
    <polygon points="80,148 52,84 108,84" fill="#e0a15a" stroke="${ink}" stroke-width="4"/>
    <circle cx="80" cy="70" r="28" fill="#ff7ad9" stroke="${ink}" stroke-width="4"/>
    <circle cx="80" cy="48" r="18" fill="#fff" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objBalloon() {
  return svg(`
    <ellipse cx="80" cy="70" rx="28" ry="36" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <path d="M80 106 l-6 10 h12z" fill="#ff3b5c" stroke="${ink}" stroke-width="2"/>
    <path d="M80 116 q-10 16 0 28" fill="none" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-float');
}
function objFlower() {
  return svg(`
    <circle cx="80" cy="54" r="16" fill="#ffd56a" stroke="${ink}" stroke-width="3"/>
    <circle cx="50" cy="70" r="16" fill="#ff7ad9" stroke="${ink}" stroke-width="3"/>
    <circle cx="110" cy="70" r="16" fill="#ff7ad9" stroke="${ink}" stroke-width="3"/>
    <circle cx="60" cy="100" r="16" fill="#ff7ad9" stroke="${ink}" stroke-width="3"/>
    <circle cx="100" cy="100" r="16" fill="#ff7ad9" stroke="${ink}" stroke-width="3"/>
    <rect x="76" y="108" width="8" height="28" fill="#4cd964"/>
  `, 'illu illu-bob');
}
function objFiretruck() {
  return svg(`
    <rect x="28" y="70" width="104" height="40" rx="8" fill="#ff3b5c" stroke="${ink}" stroke-width="4"/>
    <rect x="78" y="48" width="40" height="28" rx="6" fill="#5ad2ff" stroke="${ink}" stroke-width="3"/>
    <circle cx="52" cy="114" r="12" fill="${ink}"/><circle cx="114" cy="114" r="12" fill="${ink}"/>
    <rect x="36" y="78" width="16" height="16" fill="#ffd56a"/>
  `, 'illu illu-bob');
}
function objNest() {
  return svg(`
    <ellipse cx="80" cy="100" rx="46" ry="20" fill="#c47a3a" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="80" cy="92" rx="34" ry="12" fill="#8b5a2b"/>
    <ellipse cx="68" cy="86" rx="10" ry="12" fill="#fff" stroke="${ink}" stroke-width="3"/>
    <ellipse cx="92" cy="86" rx="10" ry="12" fill="#fff" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objOrange() {
  return svg(`
    <circle cx="80" cy="86" r="36" fill="#ff8a3d" stroke="${ink}" stroke-width="4"/>
    <path d="M80 50 q10 -16 22 -8" fill="none" stroke="#4cd964" stroke-width="5"/>
    <path d="M80 86 l20 -12 M80 86 l12 20 M80 86 l-22 8" stroke="rgba(255,255,255,.4)" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objPizza() {
  return svg(`
    <path d="M80 28 l48 96 h-96z" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
    <path d="M80 40 l36 76 h-72z" fill="#ff8a3d"/>
    <circle cx="80" cy="84" r="7" fill="#ff3b5c"/>
    <circle cx="68" cy="100" r="6" fill="#ff3b5c"/>
    <circle cx="94" cy="104" r="6" fill="#ff3b5c"/>
  `, 'illu illu-bob');
}
function objCrown() {
  return svg(`
    <polygon points="30,100 30,60 55,82 80,42 105,82 130,60 130,100" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
    <rect x="30" y="96" width="100" height="16" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
    <circle cx="80" cy="42" r="6" fill="#ff3b5c"/>
  `, 'illu illu-bob');
}
function objRainbow() {
  return svg(`
    <path d="M28 120 a52 52 0 0 1 104 0" fill="none" stroke="#ff3b5c" stroke-width="10"/>
    <path d="M38 120 a42 42 0 0 1 84 0" fill="none" stroke="#ff8a3d" stroke-width="10"/>
    <path d="M48 120 a32 32 0 0 1 64 0" fill="none" stroke="#ffd56a" stroke-width="10"/>
    <path d="M58 120 a22 22 0 0 1 44 0" fill="none" stroke="#4cd964" stroke-width="10"/>
    <path d="M68 120 a12 12 0 0 1 24 0" fill="none" stroke="#5ad2ff" stroke-width="10"/>
  `, 'illu illu-bob');
}
function objViolin() {
  return svg(`
    <ellipse cx="80" cy="100" rx="24" ry="34" fill="#c47a3a" stroke="${ink}" stroke-width="4"/>
    <rect x="74" y="28" width="12" height="50" rx="4" fill="#e0a15a" stroke="${ink}" stroke-width="3"/>
    <path d="M68 90 q12 10 24 0" fill="none" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objWatermelon() {
  return svg(`
    <path d="M28 100 a52 52 0 0 1 104 0z" fill="#4cd964" stroke="${ink}" stroke-width="4"/>
    <path d="M40 100 a40 40 0 0 1 80 0z" fill="#ff5b78"/>
    <circle cx="70" cy="88" r="3" fill="${ink}"/><circle cx="90" cy="86" r="3" fill="${ink}"/>
    <circle cx="80" cy="96" r="3" fill="${ink}"/>
  `, 'illu illu-bob');
}
function objYarn() {
  return svg(`
    <circle cx="80" cy="86" r="36" fill="#ff7ad9" stroke="${ink}" stroke-width="4"/>
    <path d="M50 70 q30 10 60 0 M48 90 q32 12 64 0 M60 54 q20 40 20 64" fill="none" stroke="#fff" stroke-width="3"/>
    <path d="M110 110 q20 16 8 28" fill="none" stroke="#ff7ad9" stroke-width="6"/>
  `, 'illu illu-bob');
}
function objXylophone() {
  return svg(`
    <rect x="28" y="48" width="104" height="16" rx="4" fill="#ff3b5c" stroke="${ink}" stroke-width="3"/>
    <rect x="32" y="68" width="96" height="16" rx="4" fill="#ff8a3d" stroke="${ink}" stroke-width="3"/>
    <rect x="36" y="88" width="88" height="16" rx="4" fill="#ffd56a" stroke="${ink}" stroke-width="3"/>
    <rect x="40" y="108" width="80" height="16" rx="4" fill="#4cd964" stroke="${ink}" stroke-width="3"/>
  `, 'illu illu-bob');
}
function objEgg() {
  return svg(`
    <ellipse cx="80" cy="88" rx="28" ry="38" fill="#fff6d8" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="70" cy="76" rx="8" ry="6" fill="rgba(255,255,255,.7)"/>
  `, 'illu illu-bob');
}
function objJuice() {
  return svg(`
    <rect x="52" y="48" width="56" height="76" rx="10" fill="#ffb24d" stroke="${ink}" stroke-width="4"/>
    <rect x="52" y="48" width="56" height="18" fill="#5ad2ff" stroke="${ink}" stroke-width="4"/>
    <path d="M80 48 v-16 h16" fill="none" stroke="${ink}" stroke-width="4"/>
    <ellipse cx="80" cy="90" rx="16" ry="8" fill="#ff8a3d"/>
  `, 'illu illu-bob');
}
function objStar() {
  return svg(`
    <polygon points="80,24 94,62 134,62 102,86 114,126 80,102 46,126 58,86 26,62 66,62" fill="#ffd56a" stroke="${ink}" stroke-width="4"/>
  `, 'illu illu-spin-slow');
}
function objBook() {
  return svg(`
    <rect x="36" y="40" width="88" height="84" rx="8" fill="#5ad2ff" stroke="${ink}" stroke-width="4"/>
    <rect x="78" y="40" width="8" height="84" fill="#2d2150"/>
    <rect x="48" y="58" width="22" height="8" rx="3" fill="#fff"/>
    <rect x="90" y="58" width="22" height="8" rx="3" fill="#fff"/>
  `, 'illu illu-bob');
}

export const objects = {
  apple: objApple,
  ball: objBall,
  banana: objBanana,
  grapes: objGrapes,
  strawberry: objStrawberry,
  carrot: objCarrot,
  sun: objSun,
  moon: objMoon,
  tree: objTree,
  leaf: objLeaf,
  hat: objHat,
  kite: objKite,
  cake: objCake,
  umbrella: objUmbrella,
  icecream: objIcecream,
  balloon: objBalloon,
  flower: objFlower,
  firetruck: objFiretruck,
  nest: objNest,
  orange: objOrange,
  pizza: objPizza,
  crown: objCrown,
  rainbow: objRainbow,
  violin: objViolin,
  watermelon: objWatermelon,
  yarn: objYarn,
  xylophone: objXylophone,
  egg: objEgg,
  juice: objJuice,
  star: objStar,
  book: objBook,
};

export function letterCard(letter) {
  return svg(`
    <rect x="22" y="22" width="116" height="116" rx="24" fill="#fff6d8" stroke="${ink}" stroke-width="4"/>
    <text x="80" y="108" text-anchor="middle" font-size="84" font-family="Nunito, sans-serif" font-weight="900" fill="#7c5cff">${letter}</text>
  `, 'illu illu-bob');
}

export function numberCard(n) {
  return svg(`
    <rect x="22" y="22" width="116" height="116" rx="24" fill="#e8f8ff" stroke="${ink}" stroke-width="4"/>
    <text x="80" y="112" text-anchor="middle" font-size="84" font-family="Nunito, sans-serif" font-weight="900" fill="#2d2150">${n}</text>
  `, 'illu illu-bob');
}

export function flag(country) {
  const flags = {
    usa: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${ink}" stroke-width="4"/>
      <g fill="#ff3b5c">${[0, 16, 32, 48, 64].map((y) => `<rect x="20" y="${40 + y}" width="120" height="8"/>`).join('')}
      </g><rect x="20" y="40" width="50" height="40" fill="#3c3b6e"/>`,
    uk: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#012169" stroke="${ink}" stroke-width="4"/>
      <path d="M20 40 L140 120 M140 40 L20 120" stroke="#fff" stroke-width="14"/>
      <path d="M20 40 L140 120 M140 40 L20 120" stroke="#c8102e" stroke-width="6"/>
      <path d="M80 40 v80 M20 80 h120" stroke="#fff" stroke-width="18"/>
      <path d="M80 40 v80 M20 80 h120" stroke="#c8102e" stroke-width="10"/>`,
    france: `<rect x="20" y="40" width="40" height="80" fill="#0055a4"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ef4135"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${ink}" stroke-width="4"/>`,
    japan: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${ink}" stroke-width="4"/><circle cx="80" cy="80" r="22" fill="#bc002d"/>`,
    australia: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#012169" stroke="${ink}" stroke-width="4"/><polygon points="96,70 100,82 112,82 102,90 106,102 96,94 86,102 90,90 80,82 92,82" fill="#fff"/>`,
    brazil: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#009b3a" stroke="${ink}" stroke-width="4"/><polygon points="80,52 128,80 80,108 32,80" fill="#fedf00"/><circle cx="80" cy="80" r="16" fill="#002776"/>`,
    egypt: `<rect x="20" y="40" width="120" height="27" fill="#ce1126"/><rect x="20" y="67" width="120" height="26" fill="#fff"/><rect x="20" y="93" width="120" height="27" fill="#000"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${ink}" stroke-width="4"/><polygon points="80,72 86,88 74,88" fill="#c09300"/>`,
    china: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#de2910" stroke="${ink}" stroke-width="4"/><polygon points="48,58 52,70 64,70 54,78 58,90 48,82 38,90 42,78 32,70 44,70" fill="#ffde00"/>`,
    india: `<rect x="20" y="40" width="120" height="27" fill="#ff9933"/><rect x="20" y="67" width="120" height="26" fill="#fff"/><rect x="20" y="93" width="120" height="27" fill="#138808"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${ink}" stroke-width="4"/><circle cx="80" cy="80" r="10" fill="none" stroke="#000080" stroke-width="3"/>`,
    canada: `<rect x="20" y="40" width="120" height="80" rx="6" fill="#fff" stroke="${ink}" stroke-width="4"/><rect x="20" y="40" width="28" height="80" fill="#ff0000"/><rect x="112" y="40" width="28" height="80" fill="#ff0000"/><polygon points="80,56 88,72 104,72 92,84 96,100 80,90 64,100 68,84 56,72 72,72" fill="#ff0000"/>`,
    italy: `<rect x="20" y="40" width="40" height="80" fill="#009246"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ce2b37"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${ink}" stroke-width="4"/>`,
    mexico: `<rect x="20" y="40" width="40" height="80" fill="#006847"/><rect x="60" y="40" width="40" height="80" fill="#fff"/><rect x="100" y="40" width="40" height="80" fill="#ce1126"/><rect x="20" y="40" width="120" height="80" rx="6" fill="none" stroke="${ink}" stroke-width="4"/><circle cx="80" cy="80" r="10" fill="#8b5a2b"/>`,
  };
  return svg(flags[country] || flags.usa, 'illu illu-bob');
}

export function landmark(name) {
  const items = {
    liberty: `<rect x="60" y="110" width="40" height="24" fill="#8aa39a" stroke="${ink}" stroke-width="3"/><rect x="72" y="58" width="16" height="54" fill="#6f9b8a" stroke="${ink}" stroke-width="3"/><circle cx="80" cy="46" r="14" fill="#6f9b8a" stroke="${ink}" stroke-width="3"/><rect x="92" y="28" width="6" height="22" fill="#ffd56a"/>`,
    eiffel: `<path d="M80 24 L96 132 H64z" fill="none" stroke="#c47a3a" stroke-width="6"/><path d="M68 70 H92 M62 100 H98" stroke="#c47a3a" stroke-width="5"/>`,
    bigben: `<rect x="58" y="28" width="44" height="112" fill="#d8b36a" stroke="${ink}" stroke-width="4"/><polygon points="58,28 80,10 102,28" fill="#8b5a2b"/><circle cx="80" cy="70" r="14" fill="#fff" stroke="${ink}" stroke-width="3"/>`,
    pyramid: `<polygon points="80,28 140,128 20,128" fill="#e0c07a" stroke="${ink}" stroke-width="4"/><polygon points="80,28 140,128 80,128" fill="#c9a45a"/>`,
    wall: `<rect x="20" y="72" width="120" height="36" fill="#c9a45a" stroke="${ink}" stroke-width="4"/>${[20, 44, 68, 92, 116].map((x) => `<rect x="${x}" y="56" width="20" height="18" fill="#d8b36a" stroke="${ink}" stroke-width="2"/>`).join('')}<path d="M20 108 q30 -30 60 -8 q30 20 60 -6" fill="none" stroke="#4cd964" stroke-width="6"/>`,
    opera: `<path d="M30 110 q18 -60 40 -4 q18 -70 40 0 q10 -40 28 4" fill="#f7f4ea" stroke="${ink}" stroke-width="4"/><rect x="24" y="108" width="112" height="16" fill="#5ad2ff"/>`,
    taj: `<ellipse cx="80" cy="70" rx="28" ry="22" fill="#fff" stroke="${ink}" stroke-width="3"/><rect x="44" y="80" width="72" height="44" fill="#fff" stroke="${ink}" stroke-width="3"/><rect x="28" y="70" width="12" height="54" fill="#fff" stroke="${ink}" stroke-width="2"/><rect x="120" y="70" width="12" height="54" fill="#fff" stroke="${ink}" stroke-width="2"/>`,
    fuji: `<polygon points="80,28 140,120 20,120" fill="#7aa0c4" stroke="${ink}" stroke-width="4"/><polygon points="80,28 104,70 56,70" fill="#fff"/>`,
    redeemer: `<rect x="72" y="70" width="16" height="58" fill="#f0e6d0" stroke="${ink}" stroke-width="3"/><rect x="36" y="78" width="88" height="12" fill="#f0e6d0" stroke="${ink}" stroke-width="3"/><circle cx="80" cy="58" r="14" fill="#f0e6d0" stroke="${ink}" stroke-width="3"/><polygon points="20,128 80,96 140,128" fill="#4cd964"/>`,
    colosseum: `<rect x="28" y="48" width="104" height="72" rx="20" fill="#d8b36a" stroke="${ink}" stroke-width="4"/>${[40, 64, 88, 112].map((x) => `<ellipse cx="${x}" cy="84" rx="8" ry="18" fill="#8b5a2b"/>`).join('')}`,
  };
  return svg(`<ellipse cx="80" cy="140" rx="50" ry="8" fill="rgba(45,33,80,.12)"/>${items[name] || items.pyramid}`, 'illu illu-bob');
}

export function continentMap(highlight) {
  const fill = {
    'north-america': '#ff8a3d',
    'south-america': '#4cd964',
    europe: '#7c5cff',
    africa: '#ffd56a',
    asia: '#ff3b5c',
    oceania: '#5ad2ff',
    antarctica: '#fff',
  };
  const glow = (id) => (highlight === id ? 'filter="url(#glow)"' : '');
  return `<svg viewBox="0 0 320 180" class="world-map" aria-hidden="true">
    <defs><filter id="glow"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffd56a"/></filter></defs>
    <rect x="0" y="0" width="320" height="180" rx="18" fill="#8fd3ff"/>
    <path data-id="north-america" ${glow('north-america')} d="M40 38 l50 -8 28 18 -10 32 -40 10 -28 -12z" fill="${fill['north-america']}" stroke="${ink}" stroke-width="3"/>
    <path data-id="south-america" ${glow('south-america')} d="M78 90 l22 6 8 40 -18 20 -16 -18 -4 -36z" fill="${fill['south-america']}" stroke="${ink}" stroke-width="3"/>
    <path data-id="europe" ${glow('europe')} d="M150 40 l28 4 6 22 -24 8 -16 -10z" fill="${fill.europe}" stroke="${ink}" stroke-width="3"/>
    <path data-id="africa" ${glow('africa')} d="M148 72 l32 4 10 40 -18 28 -28 -8 -8 -36z" fill="${fill.africa}" stroke="${ink}" stroke-width="3"/>
    <path data-id="asia" ${glow('asia')} d="M186 32 l70 8 18 28 -20 30 -54 8 -28 -20z" fill="${fill.asia}" stroke="${ink}" stroke-width="3"/>
    <path data-id="oceania" ${glow('oceania')} d="M250 110 l28 4 8 16 -22 12 -20 -8z" fill="${fill.oceania}" stroke="${ink}" stroke-width="3"/>
    <path data-id="antarctica" ${glow('antarctica')} d="M70 158 h180 l-20 12 h-140z" fill="${fill.antarctica}" stroke="${ink}" stroke-width="3"/>
  </svg>`;
}

export function habitat(name) {
  if (name === 'farm') {
    return svg(`<rect x="20" y="90" width="120" height="40" fill="#8fd36a"/><polygon points="40,90 80,40 120,90" fill="#ff3b5c" stroke="${ink}" stroke-width="3"/><rect x="58" y="70" width="24" height="20" fill="#5ad2ff"/>`, 'illu');
  }
  if (name === 'ocean') {
    return svg(`<rect x="16" y="16" width="128" height="128" rx="16" fill="#5ad2ff"/><path d="M20 90 q20 16 40 0 q20 16 40 0 q20 16 40 0" fill="none" stroke="#fff" stroke-width="6"/>`, 'illu');
  }
  if (name === 'jungle') {
    return svg(`<rect x="16" y="16" width="128" height="128" rx="16" fill="#3dbb55"/><circle cx="50" cy="60" r="24" fill="#4cd964"/><circle cx="110" cy="70" r="28" fill="#2f9e4a"/><rect x="72" y="90" width="16" height="40" fill="#8b5a2b"/>`, 'illu');
  }
  if (name === 'arctic') {
    return svg(`<rect x="16" y="16" width="128" height="128" rx="16" fill="#d6f3ff"/><polygon points="40,120 70,50 100,120" fill="#fff" stroke="${ink}" stroke-width="3"/><polygon points="90,120 120,64 146,120" fill="#eef9ff" stroke="${ink}" stroke-width="3"/>`, 'illu');
  }
  return svg(`<circle cx="80" cy="80" r="40" fill="#ffd56a"/>`, 'illu');
}

export function paintMix(a, b, result) {
  return svg(`
    <circle cx="46" cy="70" r="22" fill="${a}" stroke="${ink}" stroke-width="4"/>
    <circle cx="114" cy="70" r="22" fill="${b}" stroke="${ink}" stroke-width="4"/>
    <text x="80" y="78" text-anchor="middle" font-size="28" font-family="Nunito" font-weight="900" fill="${ink}">+</text>
    <path d="M80 92 v12" stroke="${ink}" stroke-width="4"/>
    <circle class="illu-pulse" cx="80" cy="128" r="16" fill="${result}" stroke="${ink}" stroke-width="4"/>
  `, 'illu');
}

export function countGroup(itemFn, count) {
  const cells = Array.from({ length: count }, (_, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    return `<g transform="translate(${8 + col * 30} ${12 + row * 36}) scale(.34)">${itemFn().replace('class="illu illu-bob"', '').replace('class="illu illu-float"', '').replace('class="illu illu-wiggle"', '').replace('class="illu illu-spin-slow"', '')}</g>`;
  }).join('');
  return `<svg viewBox="0 0 160 160" class="illu" aria-hidden="true">${cells}</svg>`;
}

export function iconLock() {
  return `<svg viewBox="0 0 64 64" class="icon"><rect x="12" y="28" width="40" height="28" rx="8" fill="#2d2150"/><path d="M20 28 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke="#2d2150" stroke-width="6"/></svg>`;
}

export function iconStar(filled = true) {
  const fill = filled ? '#ffd56a' : 'transparent';
  return `<svg viewBox="0 0 64 64" class="icon star-icon"><polygon points="32,6 40,24 60,24 44,36 50,56 32,44 14,56 20,36 4,24 24,24" fill="${fill}" stroke="#2d2150" stroke-width="4"/></svg>`;
}

export function draw(name) {
  if (animals[name]) return animals[name]();
  if (objects[name]) return objects[name]();
  if (name.startsWith('letter-')) return letterCard(name.replace('letter-', ''));
  if (name.startsWith('number-')) return numberCard(name.replace('number-', ''));
  if (name.startsWith('color-')) return colorBlob(name.replace('color-', ''));
  if (name.startsWith('flag-')) return flag(name.replace('flag-', ''));
  if (name.startsWith('landmark-')) return landmark(name.replace('landmark-', ''));
  if (name.startsWith('habitat-')) return habitat(name.replace('habitat-', ''));
  return objects.star();
}
