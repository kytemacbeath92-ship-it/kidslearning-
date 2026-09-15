import { describe, expect, it } from 'vitest';
import { advanceQuiz, recordQuizAnswer, retryQuiz } from './session.js';

function makeSession(patch = {}) {
  return {
    levelId: 1,
    index: 0,
    correct: 0,
    answers: [],
    lastWasWrong: false,
    phase: 'play',
    ...patch,
  };
}

describe('per-quiz next and retry', () => {
  it('records a correct answer and pauses for congratulations', () => {
    const next = recordQuizAnswer(makeSession(), true);
    expect(next.answers[0]).toBe(true);
    expect(next.correct).toBe(1);
    expect(next.lastWasWrong).toBe(false);
    expect(next.phase).toBe('between');
  });

  it('records a wrong answer without adding a point', () => {
    const next = recordQuizAnswer(makeSession(), false);
    expect(next.answers[0]).toBe(false);
    expect(next.correct).toBe(0);
    expect(next.lastWasWrong).toBe(true);
    expect(next.phase).toBe('between');
  });

  it('retry undoes the last score and replays the same quiz', () => {
    const afterCorrect = recordQuizAnswer(makeSession({ index: 2, correct: 1, answers: [true, false] }), true);
    const retried = retryQuiz(afterCorrect);
    expect(retried.index).toBe(2);
    expect(retried.correct).toBe(1);
    expect(retried.answers[2]).toBeUndefined();
    expect(retried.phase).toBe('play');
    expect(retried.lastWasWrong).toBe(false);
  });

  it('retry after a miss leaves the score unchanged', () => {
    const afterMiss = recordQuizAnswer(makeSession({ index: 1, correct: 1, answers: [true] }), false);
    const retried = retryQuiz(afterMiss);
    expect(retried.correct).toBe(1);
    expect(retried.answers[1]).toBeUndefined();
  });

  it('next moves to the following quiz until the last one', () => {
    const mid = advanceQuiz(makeSession({ index: 0, phase: 'between' }), 10);
    expect(mid.index).toBe(1);
    expect(mid.phase).toBe('play');

    const last = advanceQuiz(makeSession({ index: 9, phase: 'between' }), 10);
    expect(last.index).toBe(9);
    expect(last.phase).toBe('results');
  });
});
