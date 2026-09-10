import { describe, expect, it } from 'vitest';
import {
  PASS_ACCURACY,
  QUESTIONS_PER_LEVEL,
  accuracyPercent,
  canPassLevel,
  starsForScore,
} from './scoring.js';
import { recordLevelResult } from './storage.js';

describe('level passing gate', () => {
  it('requires at least 80 percent to pass', () => {
    expect(PASS_ACCURACY).toBe(0.8);
    expect(canPassLevel(8, QUESTIONS_PER_LEVEL)).toBe(true);
    expect(canPassLevel(7, QUESTIONS_PER_LEVEL)).toBe(false);
    expect(accuracyPercent(8, 10)).toBe(80);
  });

  it('awards 1-3 stars only after a passing score', () => {
    expect(starsForScore(7, 10)).toBe(0);
    expect(starsForScore(8, 10)).toBe(1);
    expect(starsForScore(9, 10)).toBe(2);
    expect(starsForScore(10, 10)).toBe(3);
  });

  it('unlocks the next level only when the player passes', () => {
    const failed = recordLevelResult({ unlockedLevel: 1, best: {} }, 1, 7, 10);
    expect(failed.passed).toBe(false);
    expect(failed.next.unlockedLevel).toBe(1);

    const passed = recordLevelResult(failed.next, 1, 8, 10);
    expect(passed.passed).toBe(true);
    expect(passed.next.unlockedLevel).toBe(2);
    expect(passed.next.best[1].stars).toBe(1);
  });
});
