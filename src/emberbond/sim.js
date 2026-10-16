import { createKin, healParty, leadLevel } from './kin.js';
import {
  LANDMARKS,
  NODES,
  NPCS,
  TILE,
  TILE_SIZE,
  biomeAt,
  blockedAt,
  isEncounterTile,
  npcWorldPos,
  pickEncounter,
  slowFactor,
  tileAtWorld,
} from './world.js';

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createNewGame(name, starterId, rng = Math.random) {
  return {
    version: 1,
    playerName: name,
    x: 50 * TILE_SIZE + TILE_SIZE / 2,
    y: 51 * TILE_SIZE + TILE_SIZE / 2,
    facing: 'down',
    party: [createKin(starterId, { level: 5, rng })],
    bag: {
      binding_stone: 5,
      bright_stone: 0,
      ancient_stone: 0,
      salve: 3,
      full_salve: 0,
      ember_ore: 0,
      gold: 80,
    },
    flags: {},
    discovered: { village: true },
    lastHearth: 'village',
    playTime: 0,
    bushSteps: 0,
    bushDist: 0,
    quests: {
      fractured_hearth: { step: 0, done: false },
      lost_kin: { step: 0, done: false },
      smith_ore: { step: 0, done: false },
      first_bond: { step: 0, done: false },
    },
  };
}

export function discoverLandmarks(state) {
  Object.entries(LANDMARKS).forEach(([id, mark]) => {
    const dx = state.x / TILE_SIZE - mark.tx;
    const dy = state.y / TILE_SIZE - mark.ty;
    if (dx * dx + dy * dy < 36) state.discovered[id] = true;
  });
}

export function maybeEncounter(state, rng) {
  const tile = tileAtWorld(state.x, state.y);
  if (!isEncounterTile(tile)) {
    state.bushSteps = 0;
    state.bushDist = 0;
    return null;
  }
  if ((state.bushDist || 0) < TILE_SIZE * 0.55) return null;
  state.bushDist = 0;
  state.bushSteps += 1;
  const dense = tile === TILE.TALL || tile === TILE.DEEP || tile === TILE.CAVE || tile === TILE.RUIN;
  const rate = state.flags.firstEncounterDone ? (dense ? 0.16 : 0.07) : 0.95;
  const guaranteed = !state.flags.firstEncounterDone && state.bushSteps >= 2;
  if (!guaranteed && rng() > rate) return null;
  state.flags.firstEncounterDone = true;
  state.bushSteps = 0;
  const tx = Math.floor(state.x / TILE_SIZE);
  const ty = Math.floor(state.y / TILE_SIZE);
  const spec = pickEncounter(biomeAt(tx, ty), leadLevel(state.party), rng);
  return { kind: 'wild', ...spec };
}

export function tryMove(state, vx, vy, dt, rng = Math.random) {
  const tile = tileAtWorld(state.x, state.y);
  const speed = slowFactor(tile);
  const ox = state.x;
  const oy = state.y;
  const remainX = vx * speed * dt;
  const remainY = vy * speed * dt;
  const dist = Math.hypot(remainX, remainY);
  const steps = Math.max(1, Math.ceil(dist / 8));
  for (let i = 0; i < steps; i += 1) {
    const nx = state.x + remainX / steps;
    const ny = state.y + remainY / steps;
    if (!blockedAt(nx, ny)) {
      state.x = nx;
      state.y = ny;
    } else if (!blockedAt(nx, state.y)) {
      state.x = nx;
    } else if (!blockedAt(state.x, ny)) {
      state.y = ny;
    } else {
      break;
    }
  }
  state.bushDist = (state.bushDist || 0) + Math.hypot(state.x - ox, state.y - oy);
  if (Math.abs(vx) > Math.abs(vy)) state.facing = vx < 0 ? 'left' : 'right';
  else if (vy) state.facing = vy < 0 ? 'up' : 'down';
  discoverLandmarks(state);
  return { encounter: maybeEncounter(state, rng) };
}

export function findInteract(state) {
  const reach = 42;
  for (const npc of NPCS) {
    const pos = npcWorldPos(npc);
    if (Math.hypot(pos.x - state.x, pos.y - state.y) < reach) {
      return { kind: 'npc', target: npc, label: 'Talk' };
    }
  }
  for (const node of NODES) {
    if (state.flags[node.flag]) continue;
    const x = node.tx * TILE_SIZE + TILE_SIZE / 2;
    const y = node.ty * TILE_SIZE + TILE_SIZE / 2;
    if (Math.hypot(x - state.x, y - state.y) < reach) {
      return {
        kind: node.kind,
        target: node,
        label: node.kind === 'ore' ? 'Take' : 'Approach',
      };
    }
  }
  const tile = tileAtWorld(state.x, state.y);
  const tx = Math.floor(state.x / TILE_SIZE);
  const ty = Math.floor(state.y / TILE_SIZE);
  if (Math.abs(tx - LANDMARKS.ruins.tx) <= 1 && Math.abs(ty - LANDMARKS.ruins.ty) <= 1) {
    return { kind: 'ruins', label: 'Enter' };
  }
  if (isEncounterTile(tile)) {
    return { kind: 'hunt', label: 'Hunt' };
  }
  if (tile === TILE.HEARTH) return { kind: 'hearth', label: 'Rest' };
  if (tile === TILE.SHRINE) {
    const shrine = Object.entries(LANDMARKS).find(([, mark]) => mark.tx === tx && mark.ty === ty);
    return { kind: 'shrine', target: shrine?.[1], id: shrine?.[0], label: 'Touch' };
  }
  return null;
}

export function restAtHearth(state) {
  healParty(state.party, true);
  const nearest = Object.entries(LANDMARKS).find(([, mark]) => {
    return mark.hearth && Math.hypot(state.x / TILE_SIZE - mark.tx, state.y / TILE_SIZE - mark.ty) < 8;
  });
  if (nearest) state.lastHearth = nearest[0];
  else state.lastHearth = 'village';
  return state;
}

export function warpToHearth(state) {
  const mark = LANDMARKS[state.lastHearth] || LANDMARKS.village;
  state.x = mark.tx * TILE_SIZE + TILE_SIZE / 2;
  state.y = (mark.ty + 2) * TILE_SIZE + TILE_SIZE / 2;
  healParty(state.party, false);
  state.bag.gold = Math.max(0, Math.floor(state.bag.gold * 0.9));
  return state;
}

export function fastTravel(state, landmarkId) {
  const mark = LANDMARKS[landmarkId];
  if (!mark || !state.discovered[landmarkId]) return false;
  state.x = mark.tx * TILE_SIZE + TILE_SIZE / 2;
  state.y = (mark.ty + 1) * TILE_SIZE + TILE_SIZE / 2;
  return true;
}

export function buyItem(state, itemId) {
  const prices = {
    binding_stone: 30,
    bright_stone: 90,
    ancient_stone: 200,
    salve: 20,
    full_salve: 55,
  };
  const price = prices[itemId];
  if (price == null || state.bag.gold < price) return false;
  state.bag.gold -= price;
  state.bag[itemId] = (state.bag[itemId] || 0) + 1;
  return true;
}

export function useBagHeal(state, itemId, partyIndex) {
  const heals = { salve: 40, full_salve: 999 };
  const amount = heals[itemId];
  const kin = state.party[partyIndex];
  if (!amount || !kin || !state.bag[itemId]) return false;
  if (kin.hp <= 0) return false;
  if (kin.hp >= kin.maxHp) return false;
  state.bag[itemId] -= 1;
  kin.hp = Math.min(kin.maxHp, kin.hp + amount);
  return true;
}

export function collectOre(state, node) {
  if (state.flags[node.flag]) return false;
  state.flags[node.flag] = true;
  state.bag.ember_ore = (state.bag.ember_ore || 0) + 1;
  return true;
}

export function spawnTrainerKin(defs, rng) {
  return defs.map((row) => createKin(row.speciesId, { level: row.level, rng }));
}

export function huntHere(state, rng = Math.random) {
  if (!isEncounterTile(tileAtWorld(state.x, state.y))) return null;
  state.flags.firstEncounterDone = true;
  const tx = Math.floor(state.x / TILE_SIZE);
  const ty = Math.floor(state.y / TILE_SIZE);
  return { kind: 'wild', ...pickEncounter(biomeAt(tx, ty), leadLevel(state.party), rng) };
}
