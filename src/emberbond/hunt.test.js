import { describe, expect, it } from 'vitest';
import { createNewGame, tryMove } from './sim.js';
import { TILE, TILE_SIZE, generateWorld, tileAtTile } from './world.js';

describe('first hunt', () => {
  it('starts a wild encounter after walking north of Hearthmere', () => {
    generateWorld();
    expect(tileAtTile(50, 50)).toBe(TILE.TALL);
    const state = createNewGame('Ash', 'cindertail', () => 0.4);
    let found = null;
    for (let i = 0; i < 80 && !found; i += 1) {
      const { encounter } = tryMove(state, 20, -140, 0.05, () => 0.99);
      found = encounter;
    }
    expect(found).toEqual(expect.objectContaining({ kind: 'wild', speciesId: expect.any(String) }));
    expect(state.y).toBeLessThan(62 * TILE_SIZE);
  });
});
