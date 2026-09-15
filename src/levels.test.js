import { describe, expect, it } from 'vitest';
import { LEVELS, buildLevelQuestions } from './levels.js';
import { QUESTIONS_PER_LEVEL } from './scoring.js';

const MATH_CAP = {
  1: 5, 2: 5, 3: 10, 4: 10, 5: 20, 6: 10, 7: 20, 8: 20, 9: 100, 10: 100,
};

const SPELL_CAP = {
  1: 1, 2: 1, 3: 1, 4: 1, 5: 3, 6: 3, 7: 4, 8: 4, 9: 5, 10: 5,
};

describe('curriculum', () => {
  it('has ten named adventure levels', () => {
    expect(LEVELS).toHaveLength(10);
    expect(LEVELS.map((level) => level.subject)).toEqual(expect.arrayContaining([
      'colours',
      'alphabet',
      'animals',
      'math',
      'countries',
    ]));
  });

  it.each(LEVELS.map((level) => [level.id, level.title]))(
    'level %s (%s) builds 10 playable questions',
    (id) => {
      const questions = Array.from({ length: 5 }, () => buildLevelQuestions(id)).flat();
      expect(questions.length).toBe(QUESTIONS_PER_LEVEL * 5);
      questions.forEach((question) => {
        if (question.type === 'choice') {
          const correct = question.choices.filter((choice) => choice.correct);
          expect(correct).toHaveLength(1);
          expect(question.choices).toHaveLength(4);
          expect(question.stem).toBeTruthy();
        } else if (question.type === 'hunt') {
          expect(question.items.filter((item) => item.correct)).toHaveLength(1);
          expect(question.items.length).toBeGreaterThan(3);
        } else if (question.type === 'map') {
          expect(question.answer).toBeTruthy();
          expect(question.stem).toContain('data-id');
        } else if (question.type === 'spell') {
          expect(question.word).toMatch(/^[A-Z]+$/);
          expect(question.tiles.join('')).toContain(question.word[0]);
          expect(question.tiles.length).toBeGreaterThanOrEqual(question.word.length);
        } else {
          throw new Error(`Unknown question type ${question.type}`);
        }
      });
    },
  );

  it.each(LEVELS.map((level) => [level.id, level.title, level.grade]))(
    'level %s (%s, %s) mixes math and spelling at grade ceiling',
    (id) => {
      const questions = buildLevelQuestions(id);
      expect(questions.some((q) => q.skill === 'math')).toBe(true);
      expect(questions.some((q) => q.skill === 'spelling')).toBe(true);

      questions.filter((q) => q.skill === 'math' && q.maxValue != null).forEach((q) => {
        expect(q.maxValue).toBeLessThanOrEqual(MATH_CAP[id]);
      });

      questions.filter((q) => q.type === 'spell').forEach((q) => {
        expect(q.word.length).toBeLessThanOrEqual(SPELL_CAP[id]);
      });
    },
  );
});
