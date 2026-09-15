import { burstConfetti } from './confetti.js';
import { play, setSoundOn, setSpeechOn, speak, unlockAudio } from './audio.js';
import { bindQuestion, renderQuestion } from './games.js';
import { draw, iconLock, iconStar, mascot } from './illustrations.js';
import { LEVELS, buildLevelQuestions, getLevel } from './levels.js';
import { QUESTIONS_PER_LEVEL, accuracyPercent, canPassLevel, starsForScore } from './scoring.js';
import { loadState, recordLevelResult, resetProgress, saveState } from './storage.js';

let appEl;
let state = loadState();
let screen = 'splash';
let session = null;
let pendingAdvance = false;

function setState(patch) {
  state = { ...state, ...patch };
  saveState(state);
  setSoundOn(state.soundOn);
  setSpeechOn(state.speechOn);
}

export function boot(root) {
  appEl = root;
  setSoundOn(state.soundOn);
  setSpeechOn(state.speechOn);
  document.addEventListener('pointerdown', () => unlockAudio(), { once: true });
  window.speechSynthesis?.getVoices?.();
  render();
  setTimeout(() => {
    screen = state.playerName ? 'map' : 'welcome';
    render();
  }, 1600);
}

function render() {
  if (screen === 'splash') appEl.innerHTML = splash();
  else if (screen === 'welcome') appEl.innerHTML = welcome();
  else if (screen === 'map') appEl.innerHTML = mapScreen();
  else if (screen === 'play') appEl.innerHTML = playScreen();
  else if (screen === 'results') appEl.innerHTML = resultsScreen();
  else if (screen === 'parent') appEl.innerHTML = parentScreen();
  bind();
}

function splash() {
  return `
    <section class="screen splash">
      <div class="splash-sun"></div>
      ${mascot('celebrate')}
      <h1 class="logo">Lumi's Learning Quest</h1>
      <p class="tagline">Play · Learn · Level Up!</p>
    </section>`;
}

function welcome() {
  return `
    <section class="screen welcome">
      <div class="card hero-card">
        ${mascot('happy')}
        <div class="speech">Hi! I'm Lumi the owl. What should I call you?</div>
        <label class="sr-only" for="name">Your name</label>
        <input id="name" class="name-input" maxlength="16" placeholder="Type your name" value="${state.playerName || ''}" autocomplete="nickname" autocapitalize="words" autocorrect="off" spellcheck="false" enterkeyhint="go" inputmode="text" />
        <button class="btn btn-primary" data-action="save-name">Let's play!</button>
      </div>
    </section>`;
}

function starsRow(count) {
  return [1, 2, 3].map((n) => iconStar(n <= count)).join('');
}

function mapScreen() {
  const name = state.playerName || 'Explorer';
  const islands = LEVELS.map((level) => {
    const unlocked = level.id <= state.unlockedLevel;
    const best = state.best[level.id];
    const current = level.id === Math.min(state.unlockedLevel, 10) && !best?.passed;
    return `
      <button class="island ${unlocked ? 'is-open' : 'is-locked'} ${current ? 'is-current' : ''} ${best?.passed ? 'is-done' : ''}"
        data-level="${level.id}" type="button" ${unlocked ? '' : 'disabled'}>
        <span class="island-badge" style="--accent:${level.accent}">${unlocked ? draw(level.art) : iconLock()}</span>
        <span class="island-num">Level ${level.id}</span>
        <strong>${level.title}</strong>
        <small>${level.subtitle} · ${level.ages}</small>
        <span class="island-stars">${starsRow(best?.stars || 0)}</span>
      </button>`;
  }).join('');
  return `
    <section class="screen map-screen">
      <header class="topbar">
        <div>
          <p class="hello">Hi, ${escapeHtml(name)}!</p>
          <h1>Your Learning Path</h1>
        </div>
        <div class="top-actions">
          <button class="icon-btn" data-action="toggle-sound" aria-label="Sound">${state.soundOn ? '🔊' : '🔇'}</button>
          <button class="icon-btn" data-action="toggle-speech" aria-label="Voice">${state.speechOn ? '🗣️' : '🤫'}</button>
          <button class="text-btn" data-action="parent">Grown-ups</button>
        </div>
      </header>
      <div class="lumi-corner">${mascot('idle')}</div>
      <p class="path-note">Finish a level with at least <strong>80%</strong> to unlock the next adventure.</p>
      <div class="path">${islands}</div>
    </section>`;
}

function playScreen() {
  const level = getLevel(session.levelId);
  const q = session.questions[session.index];
  const dots = session.questions
    .map((_, i) => {
      const answered = session.answers[i];
      const cls = answered == null ? '' : answered ? 'is-yes' : 'is-no';
      const on = i === session.index ? 'is-on' : '';
      return `<span class="dot ${cls} ${on}"></span>`;
    })
    .join('');
  return `
    <section class="screen play-screen" style="--accent:${level.accent}">
      <header class="hud">
        <button class="text-btn" data-action="quit">Map</button>
        <div class="hud-mid">
          <strong>Level ${level.id} · ${level.title}</strong>
          <div class="skill-chip skill-${q.skill || 'explore'}">${skillLabel(q.skill)}</div>
          <div class="dots">${dots}</div>
        </div>
        <div class="score-chip">⭐ ${session.correct}</div>
      </header>
      <div class="prompt-row">
        ${mascot(session.lastWasWrong ? 'encourage' : 'idle')}
        <div class="speech">${q.prompt}</div>
        <button class="icon-btn speak-btn" data-action="speak" aria-label="Hear the question">🔊</button>
      </div>
      <div class="game-stage" id="game-stage">${renderQuestion(q)}</div>
    </section>`;
}

function resultsScreen() {
  const { correct, levelId } = session;
  const percent = accuracyPercent(correct, QUESTIONS_PER_LEVEL);
  const passed = canPassLevel(correct, QUESTIONS_PER_LEVEL);
  const stars = starsForScore(correct, QUESTIONS_PER_LEVEL);
  const level = getLevel(levelId);
  return `
    <section class="screen results-screen">
      <div class="card results-card">
        ${mascot(passed ? 'celebrate' : 'encourage')}
        <h1>${passed ? 'You did it!' : 'Almost there!'}</h1>
        <p class="result-line">${escapeHtml(state.playerName || 'Explorer')} scored <strong>${correct}/${QUESTIONS_PER_LEVEL}</strong></p>
        <div class="meter"><span style="width:${percent}%"></span></div>
        <p class="percent ${passed ? 'go' : 'stop'}">${percent}% ${passed ? '· Level passed!' : '· Need 80% to pass'}</p>
        <div class="big-stars">${starsRow(stars)}</div>
        <p class="fine">${passed ? `Level ${Math.min(levelId + 1, 10)} is unlocked.` : `Keep practicing ${level.title}. You can try again!`}</p>
        <div class="btn-row">
          <button class="btn btn-primary" data-action="${passed && levelId < 10 ? 'next-level' : 'retry'}">${passed && levelId < 10 ? 'Next level' : 'Try again'}</button>
          <button class="btn btn-ghost" data-action="to-map">Learning path</button>
        </div>
      </div>
    </section>`;
}

function skillLabel(skill) {
  if (skill === 'math') return 'Math quiz';
  if (skill === 'spelling') return 'Spelling';
  return 'Explore';
}

function parentScreen() {
  const rows = LEVELS.map((level) => {
    const best = state.best[level.id];
    return `<tr>
      <td>${level.id}. ${level.title}</td>
      <td>${level.grade}</td>
      <td>${best ? `${best.percent}%` : '—'}</td>
      <td>${best?.passed ? 'Passed' : level.id <= state.unlockedLevel ? 'Unlocked' : 'Locked'}</td>
      <td>${starsRow(best?.stars || 0)}</td>
    </tr>`;
  }).join('');
  return `
    <section class="screen parent-screen">
      <header class="topbar">
        <button class="text-btn" data-action="to-map">← Back</button>
        <h1>Grown-ups</h1>
      </header>
      <div class="card parent-card">
        <p>Inspired by ABCmouse’s 10-level path, Khan Academy Kids’ friendly coaching, and Duolingo ABC’s short illustrated games.</p>
        <p>Each world stays at its school year: preschool through 2nd grade only. Every level mixes the world theme with <strong>math</strong> and <strong>spelling</strong> games that get harder only up to that grade.</p>
        <p>Kids must score at least <strong>80%</strong> (8/10) to unlock the next level. Stars: 1 at 80%, 2 at 90%, 3 at 100%.</p>
        <div class="table-wrap">
        <table class="progress-table">
          <thead><tr><th>Level</th><th>Stage</th><th>Best</th><th>Status</th><th>Stars</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        </div>
        <button class="btn btn-ghost danger" data-action="reset">Reset progress</button>
      </div>
    </section>`;
}

function bind() {
  appEl.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => handleAction(btn.dataset.action));
  });
  appEl.querySelectorAll('[data-level]').forEach((btn) => {
    btn.addEventListener('click', () => startLevel(Number(btn.dataset.level)));
  });
  const nameInput = appEl.querySelector('#name');
  if (nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAction('save-name');
    });
  }
  if (screen === 'play') {
    const stage = appEl.querySelector('#game-stage');
    const q = session.questions[session.index];
    bindQuestion(stage, q, onAnswer);
    if (!pendingAdvance) speak(q.speak || q.prompt);
    window.onkeydown = (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 4) {
        const btn = stage.querySelectorAll('[data-choice]')[n - 1];
        btn?.click();
      }
    };
  } else {
    window.onkeydown = null;
  }
}

function handleAction(action) {
  play('tap');
  unlockAudio();
  if (action === 'save-name') {
    const name = (appEl.querySelector('#name')?.value || 'Explorer').trim().slice(0, 16);
    setState({ playerName: name || 'Explorer' });
    screen = 'map';
    render();
  } else if (action === 'toggle-sound') {
    setState({ soundOn: !state.soundOn });
    render();
  } else if (action === 'toggle-speech') {
    setState({ speechOn: !state.speechOn });
    render();
  } else if (action === 'parent') {
    screen = 'parent';
    render();
  } else if (action === 'to-map' || action === 'quit') {
    screen = 'map';
    session = null;
    render();
  } else if (action === 'speak' && session) {
    const q = session.questions[session.index];
    speak(q.speak || q.prompt);
  } else if (action === 'retry') {
    startLevel(session.levelId);
  } else if (action === 'next-level') {
    startLevel(Math.min(session.levelId + 1, 10));
  } else if (action === 'reset') {
    if (window.confirm('Reset all stars and locked levels?')) {
      state = resetProgress(state);
      screen = 'map';
      render();
    }
  }
}

function startLevel(levelId) {
  if (levelId > state.unlockedLevel) {
    play('lock');
    return;
  }
  play('whoosh');
  session = {
    levelId,
    questions: buildLevelQuestions(levelId),
    index: 0,
    correct: 0,
    answers: [],
    lastWasWrong: false,
  };
  screen = 'play';
  pendingAdvance = false;
  render();
}

function onAnswer(correct) {
  if (!session || pendingAdvance) return;
  pendingAdvance = true;
  session.answers[session.index] = correct;
  session.lastWasWrong = !correct;
  if (correct) session.correct += 1;
  const more = session.index + 1 < QUESTIONS_PER_LEVEL;
  setTimeout(() => {
    pendingAdvance = false;
    if (more) {
      session.index += 1;
      screen = 'play';
      render();
    } else {
      const result = recordLevelResult(state, session.levelId, session.correct);
      state = result.next;
      screen = 'results';
      render();
      if (result.passed) {
        play('fanfare');
        burstConfetti();
      } else {
        play('wrong');
      }
    }
  }, 120);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}
