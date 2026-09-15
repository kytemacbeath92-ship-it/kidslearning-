import { describe, expect, it } from 'vitest';
import { LEVELS, buildLevelQuestions } from './levels.js';
import { QUESTIONS_PER_LEVEL } from './scoring.js';

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
        } else {
          throw new Error(`Unknown question type ${question.type}`);
        }
      });
    },
  );
});
