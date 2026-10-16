import { describe, expect, it } from 'vitest';
import { createKin } from './kin.js';
import { onBattleWin, onCapture, onFindLostKin, onTalk, shrinesLit, trackerLines } from './quests.js';
import { loadSave, writeSave } from './save.js';
import { buyItem, collectOre, createNewGame, findInteract, maybeEncounter, restAtHearth, tryMove } from './sim.js';
import {
  LANDMARKS,
  NPCS,
  TILE,
  TILE_SIZE,
  biomeAt,
  encounterTables,
  generateWorld,
  isSolidTile,
  pickEncounter,
  tileAtTile,
} from './world.js';

describe('Hollow Vale map', () => {
  it('places a walkable hearth in Hearthmere', () => {
    generateWorld();
    expect(tileAtTile(50, 59)).toBe(TILE.HEARTH);
    expect(isSolidTile(TILE.HEARTH)).toBe(false);
    expect(isSolidTile(TILE.WATER)).toBe(true);
    expect(isSolidTile(TILE.WALL)).toBe(true);
    expect(tileAtTile(18, 48)).toBe(TILE.SHRINE);
    expect(tileAtTile(50, 12)).toBe(TILE.SHRINE);
    expect(tileAtTile(84, 44)).toBe(TILE.SHRINE);
    expect(tileAtTile(50, 50)).toBe(TILE.TALL);
  });

  it('keeps named landmarks and NPCs on the map', () => {
    expect(Object.keys(LANDMARKS)).toEqual(
      expect.arrayContaining(['village', 'pine', 'frost', 'ember', 'ruins', 'lake']),
    );
    expect(NPCS.map((npc) => npc.id)).toEqual(
      expect.arrayContaining(['sera', 'elder', 'bram', 'lira', 'rowan', 'ylva', 'kael']),
    );
  });

  it('returns wild Kin for every biome', () => {
    const tables = encounterTables();
    Object.keys(tables).forEach((biome) => {
      const row = pickEncounter(biome, 6, () => 0);
      expect(row.speciesId).toBeTruthy();
      expect(row.level).toBeGreaterThan(0);
    });
    expect(biomeAt(86, 70)).toBe('cave');
  });
});

describe('exploration', () => {
  it('blocks the player from walking through village walls', () => {
    generateWorld();
    const state = createNewGame('Ash', 'cindertail', () => 0.4);
    state.x = 45 * TILE_SIZE;
    state.y = 58 * TILE_SIZE;
    tryMove(state, -800, 0, 1, () => 1);
    expect(state.x / TILE_SIZE).toBeGreaterThan(43);
  });

  it('spawns in hunt-able meadow and can rest at the village hearth', () => {
    generateWorld();
    const state = createNewGame('Ash', 'rimepup', () => 0.4);
    expect(findInteract(state)?.kind).toBe('hunt');
    state.x = 50 * TILE_SIZE + 18;
    state.y = 61 * TILE_SIZE + 18;
    expect(findInteract(state)?.target?.id).toBe('sera');
    state.x = 50 * TILE_SIZE + 18;
    state.y = 59 * TILE_SIZE + 18;
    expect(findInteract(state)?.kind).toBe('hearth');
    restAtHearth(state);
    expect(state.party[0].hp).toBe(state.party[0].maxHp);
  });

  it('rolls a wild encounter after enough tall-grass travel', () => {
    generateWorld();
    const state = createNewGame('Ash', 'bramblet', () => 0.4);
    state.x = 48 * TILE_SIZE;
    state.y = 50 * TILE_SIZE;
    state.bushDist = TILE_SIZE;
    const hit = maybeEncounter(state, () => 0);
    expect(hit).toEqual(expect.objectContaining({ kind: 'wild', speciesId: expect.any(String) }));
  });
});

describe('quests and economy', () => {
  it('advances the shrine quest when keepers fall and lights all three', () => {
    const state = createNewGame('Ash', 'cindertail', () => 0.5);
    onTalk(state, 'elder');
    expect(state.flags.elderTalked).toBe(true);
    onBattleWin(state, { kind: 'keeper', id: 'pine' });
    onBattleWin(state, { kind: 'keeper', id: 'frost' });
    onBattleWin(state, { kind: 'keeper', id: 'ember' });
    expect(shrinesLit(state)).toBe(true);
    const lines = trackerLines(state);
    expect(lines[0].hint).toMatch(/Return to Elder/i);
  });

  it('completes Lira and Bram side pacts', () => {
    const state = createNewGame('Ash', 'cindertail', () => 0.5);
    onTalk(state, 'lira');
    onFindLostKin(state);
    onTalk(state, 'lira');
    expect(state.quests.lost_kin.done).toBe(true);
    expect(state.bag.bright_stone).toBe(1);
    onTalk(state, 'bram');
    collectOre(state, { flag: 'ore1' });
    collectOre(state, { flag: 'ore2' });
    collectOre(state, { flag: 'ore3' });
    onTalk(state, 'bram');
    expect(state.quests.smith_ore.done).toBe(true);
    expect(state.bag.ancient_stone).toBe(1);
    onCapture(state);
    expect(state.quests.first_bond.done).toBe(true);
  });

  it('buys stones only when the player can pay', () => {
    const state = createNewGame('Ash', 'cindertail', () => 0.5);
    state.bag.gold = 30;
    expect(buyItem(state, 'binding_stone')).toBe(true);
    expect(state.bag.gold).toBe(0);
    expect(buyItem(state, 'ancient_stone')).toBe(false);
  });
});

describe('save', () => {
  it('round-trips a wanderer', () => {
    const state = createNewGame('Nyx', 'cindertail', () => 0.2);
    state.flags.elderTalked = true;
    writeSave(state);
    const loaded = loadSave();
    expect(loaded.playerName).toBe('Nyx');
    expect(loaded.party[0].speciesId).toBe('cindertail');
    expect(loaded.flags.elderTalked).toBe(true);
    expect(loaded.party[0]).toEqual(expect.objectContaining({ level: 5, hp: expect.any(Number) }));
    expect(createKin('hollowmaw', { level: 16, rng: () => 0.5 }).nickname).toBe('Hollowmaw');
  });
});
