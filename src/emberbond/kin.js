import { SPECIES, MOVES } from './data.js';

let nextId = 1;

export function resetKinIds(start = 1) {
  nextId = start;
}

export function createKin(speciesId, { level = 5, rng = Math.random } = {}) {
  const species = SPECIES[speciesId];
  if (!species) throw new Error(`Unknown species: ${speciesId}`);
  const ivs = {
    hp: 4 + Math.floor(rng() * 12),
    atk: 4 + Math.floor(rng() * 12),
    def: 4 + Math.floor(rng() * 12),
    spd: 4 + Math.floor(rng() * 12),
  };
  const stats = computeStats(species, level, ivs);
  return {
    uid: `kin-${nextId++}`,
    speciesId,
    nickname: species.name,
    level,
    xp: 0,
    ivs,
    hp: stats.hp,
    maxHp: stats.hp,
    stats,
    atkStage: 0,
    defStage: 0,
    moves: [...species.moves],
  };
}

export function computeStats(species, level, ivs) {
  const stat = (base, iv) => Math.floor((2 * base + iv) * level / 100) + 5;
  return {
    hp: Math.floor((2 * species.base.hp + ivs.hp) * level / 100) + level + 10,
    atk: stat(species.base.atk, ivs.atk),
    def: stat(species.base.def, ivs.def),
    spd: stat(species.base.spd, ivs.spd),
  };
}

export function speciesOf(kin) {
  return SPECIES[kin.speciesId];
}

export function isAlive(kin) {
  return kin.hp > 0;
}

export function firstAliveIndex(party) {
  return party.findIndex(isAlive);
}

export function partyAlive(party) {
  return party.some(isAlive);
}

export function stageMultiplier(stage) {
  const clamped = Math.max(-3, Math.min(3, stage || 0));
  return 1 + clamped * 0.25;
}

export function xpToNext(level) {
  return 10 * level + 8;
}

export function xpYield(foe) {
  const species = speciesOf(foe);
  const bonus = species.legendary ? 40 : 0;
  return 16 + foe.level * 5 + bonus;
}

export function grantXp(kin, amount) {
  const notes = [];
  kin.xp += amount;
  notes.push({ type: 'xp', kin: kin.nickname, amount });
  while (kin.xp >= xpToNext(kin.level) && kin.level < 30) {
    kin.xp -= xpToNext(kin.level);
    kin.level += 1;
    const species = speciesOf(kin);
    const stats = computeStats(species, kin.level, kin.ivs);
    const hpGain = stats.hp - kin.maxHp;
    kin.stats = stats;
    kin.maxHp = stats.hp;
    kin.hp = Math.min(kin.maxHp, kin.hp + Math.max(0, hpGain));
    notes.push({ type: 'level', kin: kin.nickname, level: kin.level });
    if (species.evolveLevel && species.evolveTo && kin.level >= species.evolveLevel) {
      evolveKin(kin, species.evolveTo);
      notes.push({ type: 'evolve', from: species.name, to: SPECIES[species.evolveTo].name, kin });
    }
  }
  return notes;
}

export function evolveKin(kin, speciesId) {
  const next = SPECIES[speciesId];
  kin.speciesId = speciesId;
  kin.nickname = next.name;
  kin.moves = [...next.moves];
  kin.stats = computeStats(next, kin.level, kin.ivs);
  const ratio = kin.maxHp ? kin.hp / kin.maxHp : 1;
  kin.maxHp = kin.stats.hp;
  kin.hp = Math.max(1, Math.round(kin.maxHp * ratio));
  return kin;
}

export function healKin(kin, amount) {
  if (!isAlive(kin) && amount <= 0) return 0;
  if (kin.hp <= 0 && amount > 0) {
    kin.hp = 0;
  }
  const before = kin.hp;
  kin.hp = Math.min(kin.maxHp, kin.hp + amount);
  return kin.hp - before;
}

export function healParty(party, full = true) {
  party.forEach((kin) => {
    const species = speciesOf(kin);
    kin.stats = computeStats(species, kin.level, kin.ivs);
    kin.maxHp = kin.stats.hp;
    kin.hp = full ? kin.maxHp : Math.max(kin.hp, Math.ceil(kin.maxHp * 0.3));
    kin.atkStage = 0;
    kin.defStage = 0;
  });
  return party;
}

export function resetBattleStages(kin) {
  kin.atkStage = 0;
  kin.defStage = 0;
}

export function knownMoves(kin) {
  return kin.moves.map((id) => MOVES[id]).filter(Boolean);
}

export function cloneKin(kin, { rng = Math.random } = {}) {
  const copy = createKin(kin.speciesId, { level: kin.level, rng });
  copy.nickname = kin.nickname;
  copy.xp = 0;
  copy.ivs = { ...kin.ivs };
  copy.stats = computeStats(speciesOf(kin), kin.level, copy.ivs);
  copy.maxHp = copy.stats.hp;
  copy.hp = Math.max(1, Math.min(copy.maxHp, kin.hp || copy.maxHp));
  copy.moves = [...kin.moves];
  return copy;
}

export function leadLevel(party) {
  const lead = party.find(isAlive) || party[0];
  return lead?.level || 5;
}
