import { describe, expect, it } from 'vitest';
import { createKin, grantXp, healParty, xpToNext } from './kin.js';

describe('pact growth', () => {
  it('levels a Kin and evolves Cindertail into Embermane', () => {
    const kin = createKin('cindertail', { level: 11, rng: () => 0.4 });
    const notes = grantXp(kin, xpToNext(11) + xpToNext(12));
    expect(kin.level).toBeGreaterThanOrEqual(12);
    expect(kin.speciesId).toBe('embermane');
    expect(notes.some((note) => note.type === 'evolve')).toBe(true);
  });

  it('restores a fainted party at a hearth', () => {
    const kin = createKin('rimepup', { level: 5, rng: () => 0.5 });
    kin.hp = 0;
    healParty([kin], true);
    expect(kin.hp).toBe(kin.maxHp);
  });
});
