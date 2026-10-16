export const MAP_W = 100;
export const MAP_H = 84;
export const TILE_SIZE = 36;

export const TILE = {
  GRASS: 0,
  TALL: 1,
  PATH: 2,
  WATER: 3,
  TREE: 4,
  SNOW: 5,
  DEEP: 6,
  ASH: 7,
  WALL: 8,
  CAVE: 9,
  FLOOR: 10,
  HEARTH: 11,
  SHRINE: 12,
  BRIDGE: 13,
  ICE: 14,
  RUIN: 15,
  FLOWER: 16,
  FENCE: 17,
  ROCK: 18,
  CLIFF: 19,
};

const SOLID = new Set([
  TILE.WATER,
  TILE.TREE,
  TILE.WALL,
  TILE.FENCE,
  TILE.ROCK,
  TILE.CLIFF,
]);

export const LANDMARKS = {
  village: { tx: 50, ty: 60, name: 'Hearthmere', hearth: true },
  pine: { tx: 18, ty: 48, name: 'Pinewood Shrine', shrine: 'pine' },
  frost: { tx: 50, ty: 12, name: 'Frostfield Shrine', shrine: 'frost' },
  ember: { tx: 84, ty: 44, name: 'Emberridge Shrine', shrine: 'ember' },
  gale: { tx: 14, ty: 18, name: 'Galecliff' },
  cave: { tx: 86, ty: 70, name: 'Stonebarrow' },
  ruins: { tx: 78, ty: 14, name: 'Hollow Ruins' },
  lake: { tx: 32, ty: 32, name: 'Mirror Lake' },
};

export const NPCS = [
  { id: 'sera', name: 'Sera', tx: 50, ty: 61, color: '#c9a227', cloak: '#3d5a3d' },
  { id: 'elder', name: 'Elder Caldus', tx: 52, ty: 58, color: '#e9ecef', cloak: '#4a3f35' },
  { id: 'bram', name: 'Bram', tx: 44, ty: 62, color: '#c77e48', cloak: '#5c4033' },
  { id: 'lira', name: 'Lira', tx: 55, ty: 63, color: '#b08968', cloak: '#1d3557' },
  { id: 'mira', name: 'Mira', tx: 47, ty: 57, color: '#e0b1cb', cloak: '#6d597a' },
  { id: 'rowan', name: 'Keeper Rowan', tx: 18, ty: 50, color: '#95d5b2', cloak: '#1b4332' },
  { id: 'ylva', name: 'Keeper Ylva', tx: 50, ty: 14, color: '#caf0f8', cloak: '#1d3557' },
  { id: 'kael', name: 'Keeper Kael', tx: 84, ty: 46, color: '#f4a261', cloak: '#6a040f' },
  { id: 'tamsin', name: 'Scout Tamsin', tx: 68, ty: 52, color: '#ffd6a5', cloak: '#6b4226' },
  { id: 'oren', name: 'Pilgrim Oren', tx: 34, ty: 36, color: '#dee2e6', cloak: '#343a40' },
];

export const NODES = [
  { id: 'ore1', kind: 'ore', tx: 80, ty: 40, flag: 'ore1' },
  { id: 'ore2', kind: 'ore', tx: 88, ty: 48, flag: 'ore2' },
  { id: 'ore3', kind: 'ore', tx: 78, ty: 50, flag: 'ore3' },
  { id: 'lost', kind: 'lost_kin', tx: 16, ty: 54, flag: 'lostKinFound' },
];

export const KEEPER_TEAMS = {
  pine: [
    { speciesId: 'gustling', level: 8 },
    { speciesId: 'bramblet', level: 9 },
  ],
  frost: [
    { speciesId: 'icefin', level: 10 },
    { speciesId: 'rimepup', level: 11 },
  ],
  ember: [
    { speciesId: 'cindernewt', level: 11 },
    { speciesId: 'cindertail', level: 12 },
  ],
  tamsin: [{ speciesId: 'pebblet', level: 7 }],
  oren: [{ speciesId: 'glowcap', level: 8 }],
  hollowmaw: [{ speciesId: 'hollowmaw', level: 16 }],
};

const ENCOUNTERS = {
  tall: [
    { speciesId: 'bramblet', w: 3, min: 3, max: 6 },
    { speciesId: 'glowcap', w: 2, min: 3, max: 5 },
    { speciesId: 'gustling', w: 2, min: 3, max: 6 },
  ],
  pine: [
    { speciesId: 'bramblet', w: 3, min: 4, max: 8 },
    { speciesId: 'glowcap', w: 2, min: 4, max: 7 },
    { speciesId: 'gustling', w: 2, min: 5, max: 8 },
  ],
  frost: [
    { speciesId: 'rimepup', w: 3, min: 5, max: 9 },
    { speciesId: 'icefin', w: 2, min: 4, max: 8 },
    { speciesId: 'shadeling', w: 1, min: 6, max: 9 },
  ],
  ember: [
    { speciesId: 'cindernewt', w: 3, min: 5, max: 9 },
    { speciesId: 'cindertail', w: 2, min: 5, max: 8 },
    { speciesId: 'pebblet', w: 1, min: 4, max: 7 },
  ],
  gale: [
    { speciesId: 'gustling', w: 4, min: 5, max: 9 },
    { speciesId: 'stormkite', w: 1, min: 8, max: 11 },
  ],
  cave: [
    { speciesId: 'pebblet', w: 3, min: 6, max: 10 },
    { speciesId: 'shadeling', w: 2, min: 6, max: 10 },
    { speciesId: 'cragback', w: 1, min: 10, max: 13 },
  ],
  ruins: [
    { speciesId: 'shadeling', w: 3, min: 8, max: 12 },
    { speciesId: 'gravemoth', w: 2, min: 9, max: 13 },
  ],
  lake: [
    { speciesId: 'icefin', w: 4, min: 4, max: 8 },
    { speciesId: 'glowcap', w: 1, min: 4, max: 6 },
  ],
};

let tiles;

export function hash2(x, y) {
  let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function idx(x, y) {
  return y * MAP_W + x;
}

export function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < MAP_W && y < MAP_H;
}

function setTile(x, y, value) {
  if (inBounds(x, y)) tiles[idx(x, y)] = value;
}

function fillRect(x, y, w, h, value) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) setTile(xx, yy, value);
  }
}

function dist(x, y, cx, cy) {
  return Math.hypot(x - cx, y - cy);
}

function line(x0, y0, x1, y1, paint) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let x = x0;
  let y = y0;
  while (true) {
    paint(x, y);
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
}

function paintRoad(x0, y0, x1, y1) {
  line(x0, y0, x1, y1, (x, y) => {
    for (let oy = -1; oy <= 1; oy += 1) {
      const t = tileAtTile(x, y + oy);
      if (t === TILE.WATER) setTile(x, y + oy, TILE.BRIDGE);
      else if (t !== TILE.WALL && t !== TILE.CLIFF) setTile(x, y + oy, TILE.PATH);
    }
  });
}

export function generateWorld() {
  tiles = new Uint8Array(MAP_W * MAP_H);
  tiles.fill(TILE.GRASS);

  for (let y = 0; y < MAP_H; y += 1) {
    for (let x = 0; x < MAP_W; x += 1) {
      const n = Math.sin(x * 0.17 + y * 0.11) + Math.cos(x * 0.07 - y * 0.19);
      const dVillage = dist(x, y, 50, 60);
      const dPine = dist(x, y, 18, 48);
      const dFrost = dist(x, y, 50, 12);
      const dEmber = dist(x, y, 84, 44);
      const dGale = dist(x, y, 14, 18);
      const dCave = dist(x, y, 86, 70);
      const dRuins = dist(x, y, 78, 14);
      const dLake = dist(x, y, 32, 32);

      if (y < 22 || dFrost < 16) setTile(x, y, hash2(x, y) < 0.18 ? TILE.DEEP : TILE.SNOW);
      if (dEmber < 15) setTile(x, y, hash2(x, y) < 0.12 ? TILE.ROCK : TILE.ASH);
      if (dPine < 14) setTile(x, y, n > 0.35 ? TILE.TREE : TILE.TALL);
      if (dGale < 12) setTile(x, y, hash2(x, y) < 0.2 ? TILE.CLIFF : TILE.FLOWER);
      if (dCave < 9) setTile(x, y, TILE.CAVE);
      if (dCave >= 9 && dCave < 13) setTile(x, y, TILE.CLIFF);
      if (dRuins < 9) setTile(x, y, hash2(x, y) < 0.22 ? TILE.ROCK : TILE.RUIN);
      if (dLake < 6.5) setTile(x, y, TILE.WATER);
      else if (dLake < 9) setTile(x, y, TILE.FLOWER);
      if (dVillage < 7) setTile(x, y, TILE.FLOOR);
      if (y > 72 && hash2(x, y) < 0.08) setTile(x, y, TILE.TREE);
    }
  }

  // River from north to south, west of village.
  for (let y = 0; y < MAP_H; y += 1) {
    const cx = 38 + Math.round(Math.sin(y * 0.09) * 3);
    for (let w = -1; w <= 1; w += 1) {
      const x = cx + w;
      const t = tileAtTile(x, y);
      if (t !== TILE.FLOOR && t !== TILE.PATH) setTile(x, y, y < 20 ? TILE.ICE : TILE.WATER);
    }
  }

  paintRoad(50, 66, 50, 14);
  paintRoad(50, 60, 18, 48);
  paintRoad(50, 60, 84, 44);
  paintRoad(50, 60, 14, 20);
  paintRoad(84, 44, 86, 70);
  paintRoad(50, 14, 78, 14);
  paintRoad(32, 36, 50, 60);

  fillRect(44, 54, 13, 12, TILE.FLOOR);
  fillRect(43, 53, 15, 1, TILE.WALL);
  fillRect(43, 66, 15, 1, TILE.WALL);
  fillRect(43, 53, 1, 14, TILE.WALL);
  fillRect(57, 53, 1, 14, TILE.WALL);
  setTile(50, 53, TILE.PATH);
  setTile(50, 66, TILE.PATH);
  setTile(49, 53, TILE.PATH);
  setTile(51, 53, TILE.PATH);
  setTile(49, 66, TILE.PATH);
  setTile(51, 66, TILE.PATH);
  fillRect(45, 55, 3, 3, TILE.WALL);
  setTile(46, 57, TILE.FLOOR);
  fillRect(54, 55, 3, 3, TILE.WALL);
  setTile(55, 57, TILE.FLOOR);
  setTile(50, 59, TILE.HEARTH);

  setTile(18, 48, TILE.SHRINE);
  setTile(50, 12, TILE.SHRINE);
  setTile(84, 44, TILE.SHRINE);
  setTile(78, 14, TILE.RUIN);

  // Hunt-able grass around Hearthmere (north meadow and the west fields toward the river).
  for (let y = 46; y <= 53; y += 1) {
    for (let x = 44; x <= 56; x += 1) {
      const t = tileAtTile(x, y);
      if (t === TILE.GRASS || t === TILE.PATH || t === TILE.FLOOR) setTile(x, y, TILE.TALL);
    }
  }
  for (let y = 54; y <= 66; y += 1) {
    for (let x = 32; x <= 42; x += 1) {
      if (tileAtTile(x, y) === TILE.GRASS) setTile(x, y, TILE.TALL);
    }
  }

  for (let i = 0; i < MAP_W; i += 1) {
    setTile(i, 0, TILE.CLIFF);
    setTile(i, 1, TILE.CLIFF);
    setTile(i, MAP_H - 1, TILE.CLIFF);
    setTile(i, MAP_H - 2, TILE.TREE);
    setTile(0, i, TILE.CLIFF);
    setTile(1, i, TILE.CLIFF);
    setTile(MAP_W - 1, i, TILE.CLIFF);
    setTile(MAP_W - 2, i, TILE.CLIFF);
  }

  return tiles;
}

export function getTiles() {
  if (!tiles) generateWorld();
  return tiles;
}

export function tileAtTile(tx, ty) {
  if (!tiles) generateWorld();
  if (!inBounds(tx, ty)) return TILE.CLIFF;
  return tiles[idx(tx, ty)];
}

export function tileAtWorld(px, py) {
  return tileAtTile(Math.floor(px / TILE_SIZE), Math.floor(py / TILE_SIZE));
}

export function isSolidTile(t) {
  return SOLID.has(t);
}

export function isEncounterTile(t) {
  return (
    t === TILE.TALL ||
    t === TILE.GRASS ||
    t === TILE.PATH ||
    t === TILE.SNOW ||
    t === TILE.DEEP ||
    t === TILE.CAVE ||
    t === TILE.FLOWER ||
    t === TILE.RUIN ||
    t === TILE.ASH ||
    t === TILE.ICE
  );
}

export function biomeAt(tx, ty) {
  const dPine = dist(tx, ty, 18, 48);
  const dFrost = dist(tx, ty, 50, 12);
  const dEmber = dist(tx, ty, 84, 44);
  const dGale = dist(tx, ty, 14, 18);
  const dCave = dist(tx, ty, 86, 70);
  const dRuins = dist(tx, ty, 78, 14);
  const dLake = dist(tx, ty, 32, 32);
  const tile = tileAtTile(tx, ty);
  if (tile === TILE.CAVE || dCave < 10) return 'cave';
  if (dRuins < 10 || tile === TILE.RUIN) return 'ruins';
  if (dLake < 11) return 'lake';
  if (dFrost < 16 || tile === TILE.SNOW || tile === TILE.DEEP) return 'frost';
  if (dEmber < 15 || tile === TILE.ASH) return 'ember';
  if (dGale < 13) return 'gale';
  if (dPine < 16) return 'pine';
  return 'tall';
}

export function pickEncounter(biome, playerLevel, rng) {
  const table = ENCOUNTERS[biome] || ENCOUNTERS.tall;
  const total = table.reduce((sum, row) => sum + row.w, 0);
  let roll = rng() * total;
  let row = table[0];
  for (const entry of table) {
    roll -= entry.w;
    if (roll <= 0) {
      row = entry;
      break;
    }
  }
  const span = row.max - row.min + 1;
  let level = row.min + Math.floor(rng() * span);
  level = Math.max(row.min, Math.min(row.max, Math.round((level + playerLevel) / 2)));
  return { speciesId: row.speciesId, level };
}

export function npcWorldPos(npc) {
  return { x: npc.tx * TILE_SIZE + TILE_SIZE / 2, y: npc.ty * TILE_SIZE + TILE_SIZE / 2 };
}

export function blockedAt(px, py) {
  const r = 10;
  const points = [
    [px - r, py],
    [px + r, py],
    [px, py - r],
    [px, py + r * 0.6],
  ];
  return points.some(([x, y]) => isSolidTile(tileAtWorld(x, y)));
}

export function slowFactor(tile) {
  if (tile === TILE.DEEP) return 0.62;
  if (tile === TILE.WATER) return 0.5;
  if (tile === TILE.TALL || tile === TILE.ASH) return 0.86;
  return 1;
}

export function encounterTables() {
  return ENCOUNTERS;
}
