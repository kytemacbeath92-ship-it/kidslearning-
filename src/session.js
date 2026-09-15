export function recordQuizAnswer(session, correct) {
  const answers = session.answers.slice();
  answers[session.index] = Boolean(correct);
  return {
    ...session,
    answers,
    lastWasWrong: !correct,
    correct: session.correct + (correct ? 1 : 0),
    phase: 'between',
  };
}

export function retryQuiz(session) {
  const answers = session.answers.slice();
  const wasCorrect = answers[session.index] === true;
  answers[session.index] = undefined;
  return {
    ...session,
    answers,
    lastWasWrong: false,
    correct: wasCorrect ? Math.max(0, session.correct - 1) : session.correct,
    phase: 'play',
  };
}

export function advanceQuiz(session, total) {
  if (session.index + 1 >= total) {
    return { ...session, phase: 'results' };
  }
  return {
    ...session,
    index: session.index + 1,
    lastWasWrong: false,
    phase: 'play',
  };
}
