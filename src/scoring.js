export const PASS_ACCURACY = 0.8;
export const QUESTIONS_PER_LEVEL = 10;

export function accuracy(correct, total) {
  if (!total) return 0;
  return correct / total;
}

export function accuracyPercent(correct, total) {
  return Math.round(accuracy(correct, total) * 100);
}

export function canPassLevel(correct, total = QUESTIONS_PER_LEVEL) {
  return accuracy(correct, total) >= PASS_ACCURACY;
}

export function starsForScore(correct, total = QUESTIONS_PER_LEVEL) {
  const percent = accuracyPercent(correct, total);
  if (percent < PASS_ACCURACY * 100) return 0;
  if (percent >= 100) return 3;
  if (percent >= 90) return 2;
  return 1;
}

export function shuffle(list) {
  const items = [...list];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function pickN(list, n) {
  return shuffle(list).slice(0, n);
}

export function withShuffledChoices(question) {
  if (!question.choices) return question;
  return {
    ...question,
    choices: shuffle(question.choices),
  };
}
