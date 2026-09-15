import { QUESTIONS_PER_LEVEL, accuracyPercent, canPassLevel, starsForScore } from './scoring.js';

const KEY = 'lumi-quest-v1';

const defaultState = () => ({
  playerName: '',
  soundOn: true,
  speechOn: true,
  unlockedLevel: 1,
  best: {},
});

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function recordLevelResult(state, levelId, correct, total = QUESTIONS_PER_LEVEL) {
  const percent = accuracyPercent(correct, total);
  const passed = canPassLevel(correct, total);
  const stars = starsForScore(correct, total);
  const previous = state.best[levelId] || { percent: 0, stars: 0, passed: false, correct: 0 };
  const best = {
    percent: Math.max(previous.percent, percent),
    stars: Math.max(previous.stars, stars),
    passed: previous.passed || passed,
    correct: Math.max(previous.correct, correct),
  };
  const next = {
    ...state,
    best: { ...state.best, [levelId]: best },
    unlockedLevel: passed ? Math.max(state.unlockedLevel, levelId + 1) : state.unlockedLevel,
  };
  saveState(next);
  return { next, percent, passed, stars };
}

export function resetProgress(state) {
  const next = {
    ...state,
    unlockedLevel: 1,
    best: {},
  };
  saveState(next);
  return next;
}

export { defaultState };
