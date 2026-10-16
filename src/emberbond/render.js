import { SPECIES } from './data.js';
import { speciesOf } from './kin.js';
import { LANDMARKS, MAP_H, MAP_W, NPCS, NODES, TILE, TILE_SIZE, getTiles, hash2 } from './world.js';

const PALETTE = {
  [TILE.GRASS]: ['#3d6b3a', '#4c7a45'],
  [TILE.TALL]: ['#2f5a32', '#3f6e3c'],
  [TILE.PATH]: ['#b59a6a', '#c4ab78'],
  [TILE.WATER]: ['#24556e', '#2d6a84'],
  [TILE.TREE]: ['#1e3d2f', '#1e3d2f'],
  [TILE.SNOW]: ['#dfe7f2', '#eef3fa'],
  [TILE.DEEP]: ['#c9d6e8', '#dbe4f0'],
  [TILE.ASH]: ['#6b3f2a', '#7a4a32'],
  [TILE.WALL]: ['#3b322c', '#2c2622'],
  [TILE.CAVE]: ['#2a2428', '#352c32'],
  [TILE.FLOOR]: ['#8b6848', '#9a7554'],
  [TILE.HEARTH]: ['#8b6848', '#c45c26'],
  [TILE.SHRINE]: ['#5b5348', '#d4a056'],
  [TILE.BRIDGE]: ['#6b4f32', '#7c5c3c'],
  [TILE.ICE]: ['#b9d8ea', '#d4eaf6'],
  [TILE.RUIN]: ['#4a4450', '#5c5462'],
  [TILE.FLOWER]: ['#4a7c4a', '#6a9a58'],
  [TILE.FENCE]: ['#5a4030', '#3d2c22'],
  [TILE.ROCK]: ['#6d6358', '#7a7166'],
  [TILE.CLIFF]: ['#3a3530', '#2b2723'],
};

export function drawKin(ctx, species, x, y, scale, time, face = 1) {
  const c = species.colors;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(face, 1);
  ctx.translate(-x, -y);
  const s = scale;
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.42, s * 0.38, s * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();

  if (species.shape === 'fox' || species.shape === 'wolf') {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.34, s * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + s * 0.28, y - s * 0.06, s * 0.18, s * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.dark;
    ctx.beginPath();
    ctx.moveTo(x + s * 0.22, y - s * 0.18);
    ctx.lineTo(x + s * 0.32, y - s * 0.4);
    ctx.lineTo(x + s * 0.38, y - s * 0.14);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + s * 0.12, y - s * 0.16);
    ctx.lineTo(x + s * 0.08, y - s * 0.38);
    ctx.lineTo(x + s * 0.24, y - s * 0.14);
    ctx.fill();
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = s * 0.08;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.28, y);
    ctx.quadraticCurveTo(x - s * 0.55, y - s * 0.35 - Math.sin(time * 4) * s * 0.05, x - s * 0.18, y - s * 0.08);
    ctx.stroke();
    ctx.fillStyle = '#1a120c';
    ctx.beginPath();
    ctx.arc(x + s * 0.34, y - s * 0.08, s * 0.035, 0, Math.PI * 2);
    ctx.fill();
  } else if (species.shape === 'hedgehog') {
    ctx.fillStyle = c.dark;
    for (let i = 0; i < 8; i += 1) {
      const a = -Math.PI + (i / 7) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(a) * s * 0.48, y + Math.sin(a) * s * 0.4);
      ctx.lineTo(x + Math.cos(a + 0.2) * s * 0.3, y + Math.sin(a + 0.2) * s * 0.24);
      ctx.fill();
    }
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.04, s * 0.28, s * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.ellipse(x + s * 0.16, y + s * 0.06, s * 0.12, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (species.shape === 'bird') {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.22, s * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.05, y);
    ctx.quadraticCurveTo(x - s * 0.1, y - s * 0.42 + Math.sin(time * 8) * 4, x + s * 0.35, y - s * 0.04);
    ctx.quadraticCurveTo(x, y - s * 0.08, x - s * 0.05, y);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.moveTo(x + s * 0.2, y);
    ctx.lineTo(x + s * 0.38, y + s * 0.04);
    ctx.lineTo(x + s * 0.2, y + s * 0.08);
    ctx.fill();
  } else if (species.shape === 'armadillo') {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.34, s * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.dark;
    ctx.lineWidth = 2;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.arc(x + i * s * 0.08, y, s * 0.2, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
    }
  } else if (species.shape === 'mushroom') {
    ctx.fillStyle = '#f1e3c6';
    ctx.fillRect(x - s * 0.08, y - s * 0.02, s * 0.16, s * 0.28);
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y - s * 0.08, s * 0.28, s * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.arc(x - s * 0.1, y - s * 0.12, s * 0.05, 0, Math.PI * 2);
    ctx.arc(x + s * 0.08, y - s * 0.04, s * 0.04, 0, Math.PI * 2);
    ctx.fill();
  } else if (species.shape === 'lizard') {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.3, s * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + s * 0.26, y - s * 0.04, s * 0.12, s * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = s * 0.07;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.28, y);
    ctx.quadraticCurveTo(x - s * 0.5, y + Math.sin(time * 6) * 6, x - s * 0.22, y + s * 0.08);
    ctx.stroke();
  } else if (species.shape === 'fish') {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.28, s * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.24, y);
    ctx.lineTo(x - s * 0.42, y - s * 0.14);
    ctx.lineTo(x - s * 0.42, y + s * 0.14);
    ctx.fill();
  } else if (species.shape === 'wisp') {
    const g = ctx.createRadialGradient(x, y, 4, x, y, s * 0.42);
    g.addColorStop(0, c.accent);
    g.addColorStop(1, 'rgba(20,0,40,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y + Math.sin(time * 3) * 3, s * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.arc(x, y, s * 0.16, 0, Math.PI * 2);
    ctx.fill();
  } else if (species.shape === 'moth') {
    ctx.fillStyle = c.accent;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.ellipse(x - s * 0.18, y, s * 0.22, s * 0.3, -0.4, 0, Math.PI * 2);
    ctx.ellipse(x + s * 0.18, y, s * 0.22, s * 0.3, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = c.body;
    ctx.fillRect(x - s * 0.05, y - s * 0.16, s * 0.1, s * 0.32);
  } else {
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(x, y, s * 0.36, s * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = c.accent;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.12, y - s * 0.22);
    ctx.lineTo(x - s * 0.22, y - s * 0.5);
    ctx.lineTo(x, y - s * 0.28);
    ctx.moveTo(x + s * 0.12, y - s * 0.22);
    ctx.lineTo(x + s * 0.22, y - s * 0.5);
    ctx.lineTo(x, y - s * 0.28);
    ctx.fill();
    ctx.fillStyle = '#f8f4ff';
    ctx.beginPath();
    ctx.arc(x + s * 0.16, y - s * 0.04, s * 0.045, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawTree(ctx, x, y, tile, time) {
  const sway = Math.sin(time * 0.8 + x * 0.01) * 3;
  ctx.fillStyle = '#4a2f1c';
  ctx.fillRect(x + tile * 0.42, y + tile * 0.45, tile * 0.16, tile * 0.4);
  ctx.fillStyle = '#1b3a28';
  ctx.beginPath();
  ctx.arc(x + tile * 0.5 + sway, y + tile * 0.38, tile * 0.34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#27563b';
  ctx.beginPath();
  ctx.arc(x + tile * 0.38 + sway, y + tile * 0.32, tile * 0.22, 0, Math.PI * 2);
  ctx.fill();
}

function drawNpc(ctx, npc, time) {
  const x = npc.tx * TILE_SIZE + TILE_SIZE / 2;
  const y = npc.ty * TILE_SIZE + TILE_SIZE / 2;
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(x, y + 10, 10, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = npc.cloak;
  ctx.beginPath();
  ctx.moveTo(x - 9, y + 10);
  ctx.lineTo(x + 9, y + 10);
  ctx.lineTo(x + 7, y - 4);
  ctx.lineTo(x - 7, y - 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = npc.color;
  ctx.beginPath();
  ctx.arc(x, y - 8 + Math.sin(time * 2 + npc.tx) * 0.6, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1a1410';
  ctx.beginPath();
  ctx.ellipse(x, y - 12, 7, 4, 0, Math.PI, Math.PI * 2);
  ctx.fill();
}

function drawPlayer(ctx, state, time) {
  const x = state.x;
  const y = state.y;
  const bob = Math.sin(time * 8) * (state._moving ? 1.8 : 0.4);
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(x, y + 16, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2b211c';
  ctx.beginPath();
  ctx.moveTo(x - 13, y + 14);
  ctx.lineTo(x + 13, y + 14);
  ctx.lineTo(x + 10, y - 4 + bob);
  ctx.lineTo(x - 10, y - 4 + bob);
  ctx.fill();
  ctx.fillStyle = '#e2c9a0';
  ctx.beginPath();
  ctx.arc(x, y - 10 + bob, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3b2a1e';
  ctx.beginPath();
  ctx.ellipse(x, y - 14 + bob, 9, 5, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d4a056';
  ctx.fillRect(x - 3, y + 1 + bob, 6, 7);
  ctx.strokeStyle = '#f4d58d';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y - 2 + bob, 16, 0, Math.PI * 2);
  ctx.stroke();
}

export function renderWorld(ctx, cam, state, time) {
  const tiles = getTiles();
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const dpr = cam.dpr || 1;
  const viewW = w / dpr;
  const viewH = h / dpr;
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.fillStyle = '#0f1410';
  ctx.fillRect(0, 0, viewW, viewH);

  const tx0 = Math.max(0, Math.floor(cam.x / TILE_SIZE) - 1);
  const ty0 = Math.max(0, Math.floor(cam.y / TILE_SIZE) - 1);
  const tx1 = Math.min(MAP_W - 1, Math.ceil((cam.x + viewW) / TILE_SIZE) + 1);
  const ty1 = Math.min(MAP_H - 1, Math.ceil((cam.y + viewH) / TILE_SIZE) + 1);

  for (let ty = ty0; ty <= ty1; ty += 1) {
    for (let tx = tx0; tx <= tx1; tx += 1) {
      const t = tiles[ty * MAP_W + tx];
      const x = tx * TILE_SIZE - cam.x;
      const y = ty * TILE_SIZE - cam.y;
      const pal = PALETTE[t] || PALETTE[TILE.GRASS];
      ctx.fillStyle = hash2(tx, ty) > 0.5 ? pal[0] : pal[1];
      ctx.fillRect(x, y, TILE_SIZE + 0.5, TILE_SIZE + 0.5);
      if (t === TILE.TALL) {
        ctx.strokeStyle = 'rgba(180, 230, 140, 0.35)';
        ctx.lineWidth = 1.4;
        for (let i = 0; i < 3; i += 1) {
          const bx = x + 8 + i * 10;
          ctx.beginPath();
          ctx.moveTo(bx, y + TILE_SIZE - 4);
          ctx.quadraticCurveTo(bx + Math.sin(time * 2 + tx) * 3, y + 10, bx + 2, y + 8);
          ctx.stroke();
        }
      }
      if (t === TILE.WATER || t === TILE.ICE) {
        ctx.strokeStyle = 'rgba(220, 240, 255, 0.22)';
        ctx.beginPath();
        const wy = y + ((time * 18 + ty * 8) % TILE_SIZE);
        ctx.moveTo(x, wy);
        ctx.lineTo(x + TILE_SIZE, wy - 4);
        ctx.stroke();
      }
      if (t === TILE.FLOWER && hash2(tx, ty) > 0.55) {
        ctx.fillStyle = hash2(tx + 3, ty) > 0.5 ? '#e8c547' : '#d77a8b';
        ctx.beginPath();
        ctx.arc(x + 18, y + 16, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t === TILE.HEARTH) {
        ctx.fillStyle = `rgba(255, 140, 60, ${0.45 + Math.sin(time * 5) * 0.15})`;
        ctx.beginPath();
        ctx.arc(x + 18, y + 16, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t === TILE.SHRINE) {
        const lit =
          (tx === 18 && state.flags.shrine_pine) ||
          (tx === 50 && state.flags.shrine_frost) ||
          (tx === 84 && state.flags.shrine_ember);
        ctx.fillStyle = lit ? '#f4d58d' : '#7a7368';
        ctx.beginPath();
        ctx.arc(x + 18, y + 18, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = lit ? '#fff3c4' : '#3a3530';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (t === TILE.TREE) drawTree(ctx, x, y, TILE_SIZE, time);
    }
  }

  ctx.save();
  ctx.translate(-cam.x, -cam.y);
  NODES.forEach((node) => {
    if (state.flags[node.flag]) return;
    const x = node.tx * TILE_SIZE + TILE_SIZE / 2;
    const y = node.ty * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = node.kind === 'ore' ? '#e85d04' : '#80b918';
    ctx.beginPath();
    ctx.arc(x, y, 6 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2);
    ctx.fill();
  });
  NPCS.forEach((npc) => drawNpc(ctx, npc, time));
  drawPlayer(ctx, state, time);
  ctx.restore();

  const hour = (state.playTime / 420) % 1;
  let tint = 'rgba(0,0,0,0)';
  if (hour < 0.22) tint = 'rgba(12, 18, 40, 0.28)';
  else if (hour > 0.78) tint = 'rgba(12, 18, 40, 0.32)';
  else if (hour > 0.7 || hour < 0.3) tint = 'rgba(80, 40, 20, 0.12)';
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, viewW, viewH);
  ctx.restore();
}

export function renderMinimap(ctx, state) {
  const w = 112;
  const h = 84;
  ctx.clearRect(0, 0, 200, 200);
  ctx.fillStyle = 'rgba(12, 10, 8, 0.72)';
  ctx.fillRect(0, 0, w, h);
  const tiles = getTiles();
  const sx = w / MAP_W;
  const sy = h / MAP_H;
  for (let ty = 0; ty < MAP_H; ty += 2) {
    for (let tx = 0; tx < MAP_W; tx += 2) {
      const t = tiles[ty * MAP_W + tx];
      if (t === TILE.WATER || t === TILE.ICE) ctx.fillStyle = '#2d6a84';
      else if (t === TILE.SNOW || t === TILE.DEEP) ctx.fillStyle = '#dfe7f2';
      else if (t === TILE.TREE) ctx.fillStyle = '#1e3d2f';
      else if (t === TILE.TALL) ctx.fillStyle = '#2f5a32';
      else if (t === TILE.ASH) ctx.fillStyle = '#7a4a32';
      else if (t === TILE.FLOOR || t === TILE.PATH) ctx.fillStyle = '#b59a6a';
      else if (t === TILE.CLIFF || t === TILE.WALL) ctx.fillStyle = '#2b2723';
      else continue;
      ctx.fillRect(tx * sx, ty * sy, sx * 2, sy * 2);
    }
  }
  Object.entries(LANDMARKS).forEach(([id, mark]) => {
    if (!state.discovered[id]) return;
    ctx.fillStyle = mark.shrine
      ? state.flags[`shrine_${mark.shrine}`]
        ? '#f4d58d'
        : '#8a8178'
      : '#c9b18a';
    ctx.fillRect(mark.tx * sx - 2, mark.ty * sy - 2, 4, 4);
  });
  ctx.fillStyle = '#f1faee';
  ctx.beginPath();
  ctx.arc((state.x / TILE_SIZE) * sx, (state.y / TILE_SIZE) * sy, 2.4, 0, Math.PI * 2);
  ctx.fill();
}

export function renderBattleField(ctx, battle, time) {
  const dpr = window.devicePixelRatio || 1;
  const viewW = ctx.canvas.width / dpr;
  const viewH = ctx.canvas.height / dpr;
  ctx.save();
  ctx.scale(dpr, dpr);
  const g = ctx.createLinearGradient(0, 0, 0, viewH);
  g.addColorStop(0, '#1b2838');
  g.addColorStop(0.45, '#243322');
  g.addColorStop(1, '#1a1714');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, viewW, viewH);
  ctx.fillStyle = '#2f4a38';
  ctx.beginPath();
  ctx.ellipse(viewW * 0.68, viewH * 0.34, 90, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#3d4f32';
  ctx.beginPath();
  ctx.ellipse(viewW * 0.32, viewH * 0.58, 100, 32, 0, 0, Math.PI * 2);
  ctx.fill();
  const foe = SPECIES[battle.foe.speciesId];
  const ally = speciesOf(battle.party[battle.activeIndex]);
  drawKin(ctx, foe, viewW * 0.68, viewH * 0.28, 88, time, -1);
  drawKin(ctx, ally, viewW * 0.3, viewH * 0.54, 96, time, 1);
  ctx.restore();
}
