import { describe, expect, it } from 'vitest';
import { captureChance, createBattle, damageFor, takeTurn } from './battle.js';
import { effectiveness } from './data.js';
import { createKin, resetKinIds } from './kin.js';

function rngSeq(values) {
  let i = 0;
  return () => {
    const value = values[i];
    i += 1;
    return value === undefined ? 0 : value;
  };
}

function readyFoe(level = 5) {
  resetKinIds();
  const player = createKin('cindertail', { level, rng: () => 0.5 });
  const foe = createKin('bramblet', { level, rng: () => 0.5 });
  return { player, foe };
}

describe('type chart', () => {
  it('makes ember strong against grove and frost', () => {
    expect(effectiveness('ember', 'grove')).toBe(2);
    expect(effectiveness('ember', 'frost')).toBe(2);
    expect(effectiveness('ember', 'stone')).toBe(0.5);
  });
});

describe('damage', () => {
  it('deals more damage on a strong matchup than a resisted one', () => {
    const { player, foe } = readyFoe(10);
    const groveFoe = foe;
    const stoneKin = createKin('pebblet', { level: 10, rng: () => 0.5 });
    const superHit = damageFor(player, groveFoe, { power: 40, acc: 100, type: 'ember' }, () => 0);
    const resistHit = damageFor(player, stoneKin, { power: 40, acc: 100, type: 'ember' }, () => 0);
    expect(superHit.amount).toBeGreaterThan(resistHit.amount);
    expect(superHit.mult).toBe(2);
    expect(resistHit.mult).toBe(0.5);
  });

  it('misses when accuracy fails', () => {
    const { player, foe } = readyFoe();
    const miss = damageFor(player, foe, { power: 40, acc: 90, type: 'ember' }, () => 0.99);
    expect(miss.miss).toBe(true);
    expect(miss.amount).toBe(0);
  });
});

describe('binding', () => {
  it('is more likely at low health and with better stones', () => {
    const foe = createKin('bramblet', { level: 5, rng: () => 0.5 });
    foe.hp = foe.maxHp;
    const full = captureChance(foe, 'binding_stone');
    foe.hp = 1;
    const low = captureChance(foe, 'binding_stone');
    const ancient = captureChance(foe, 'ancient_stone');
    expect(low).toBeGreaterThan(full);
    expect(ancient).toBeGreaterThan(low);
  });

  it('binds on a successful roll and refuses keeper binds', () => {
    const { player, foe } = readyFoe();
    foe.hp = 1;
    const wild = createBattle({
      party: [player],
      foe,
      context: { kind: 'wild' },
      rng: rngSeq([0, 0, 0, 0, 0]),
    });
    const events = takeTurn(wild, { type: 'bind', itemId: 'binding_stone' });
    expect(wild.result).toBe('bind');
    expect(events.some((event) => event.type === 'bind_ok')).toBe(true);

    const keeper = createBattle({
      party: [createKin('cindertail', { rng: () => 0.5 })],
      foe: createKin('gustling', { rng: () => 0.5 }),
      context: { kind: 'keeper', id: 'pine' },
      rng: () => 0,
    });
    const refused = takeTurn(keeper, { type: 'bind', itemId: 'binding_stone' });
    expect(refused[0].reason).toBe('cannot_bind');
  });
});

describe('turns', () => {
  it('cannot flee a shrine keeper', () => {
    const battle = createBattle({
      party: [createKin('cindertail', { rng: () => 0.5 })],
      foe: createKin('gustling', { rng: () => 0.5 }),
      context: { kind: 'keeper', id: 'pine' },
      rng: () => 0,
    });
    const events = takeTurn(battle, { type: 'flee' });
    expect(events[0].reason).toBe('cannot_flee');
    expect(battle.over).toBe(false);
  });

  it('sends the next keeper Kin after a faint', () => {
    const player = createKin('embermane', { level: 20, rng: () => 0.9 });
    const first = createKin('glowcap', { level: 3, rng: () => 0.1 });
    first.hp = 1;
    const second = createKin('gustling', { level: 8, rng: () => 0.5 });
    const battle = createBattle({
      party: [player],
      foeParty: [first, second],
      context: { kind: 'keeper', id: 'pine' },
      rng: () => 0,
    });
    takeTurn(battle, { type: 'move', moveId: 'ember_spark' });
    expect(battle.over).toBe(false);
    expect(battle.foe.speciesId).toBe('gustling');
  });
});
