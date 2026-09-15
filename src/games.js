import { play } from './audio.js';

function disableAll(root) {
  root.querySelectorAll('button, [data-choice], [data-hunt], [data-continent]').forEach((el) => {
    el.disabled = true;
    el.setAttribute('aria-disabled', 'true');
  });
}

export function renderQuestion(question) {
  if (question.type === 'hunt') return renderHunt(question);
  if (question.type === 'map') return renderMap(question);
  if (question.type === 'spell') return renderSpell(question);
  return renderChoice(question);
}

function renderChoice(question) {
  const choices = question.choices
    .map(
      (choice, index) => `
      <button class="choice-card" data-choice="${choice.id}" data-correct="${choice.correct}" type="button">
        <span class="choice-key">${index + 1}</span>
        <div class="choice-art">${choice.html}</div>
        <span class="choice-label">${choice.label}</span>
      </button>`,
    )
    .join('');
  return `
    <div class="q-stem">${question.stem || ''}</div>
    <div class="choice-grid">${choices}</div>
  `;
}

function renderHunt(question) {
  const items = question.items
    .map((item, i) => {
      const left = 6 + (i % 3) * 31 + (i % 2) * 4;
      const top = 8 + Math.floor(i / 3) * 46 + (i % 2) * 6;
      return `
        <button class="hunt-item roam-${(i % 4) + 1}" data-hunt="${item.id}" data-correct="${item.correct}"
          style="left:${left}%; top:${top}%" type="button" aria-label="${item.label}">
          ${item.html}
        </button>`;
    })
    .join('');
  return `<div class="playfield">${items}</div>`;
}

function renderMap(question) {
  return `<div class="map-wrap">${question.stem}<p class="map-hint">Tap a continent</p></div>`;
}

function renderSpell(question) {
  const slots = [...question.word].map((_, i) => `<span class="spell-slot" data-slot="${i}"></span>`).join('');
  const tiles = question.tiles
    .map(
      (letter, i) => `
      <button class="spell-tile" data-letter="${letter}" data-tile="${i}" type="button">${letter}</button>`,
    )
    .join('');
  return `
    <div class="spell-game" data-word="${question.word}">
      <div class="q-stem">${question.stem || ''}</div>
      <div class="spell-slots" aria-label="spelling">${slots}</div>
      <div class="spell-tiles">${tiles}</div>
    </div>`;
}

export function bindQuestion(root, question, onAnswer) {
  let done = false;
  const finish = (correct) => {
    if (done) return;
    done = true;
    root.classList.add('is-locked');
    disableAll(root);
    setTimeout(() => onAnswer(correct), correct ? 700 : 1100);
  };

  if (question.type === 'choice') {
    root.querySelectorAll('[data-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (done) return;
        const correct = btn.dataset.correct === 'true';
        play(correct ? 'correct' : 'wrong');
        btn.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (!correct) {
          const right = root.querySelector('[data-correct="true"]');
          if (right) right.classList.add('is-correct');
        }
        finish(correct);
      });
    });
  }

  if (question.type === 'hunt') {
    root.querySelectorAll('[data-hunt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (done) return;
        const correct = btn.dataset.correct === 'true';
        play(correct ? 'correct' : 'wrong');
        btn.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (!correct) {
          const right = root.querySelector('[data-correct="true"]');
          if (right) right.classList.add('is-correct');
        }
        finish(correct);
      });
    });
  }

  if (question.type === 'spell') {
    let next = 0;
    const word = question.word.toUpperCase();
    root.querySelectorAll('[data-letter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (done) return;
        const letter = btn.dataset.letter;
        play('tap');
        if (letter === word[next]) {
          const slot = root.querySelector(`[data-slot="${next}"]`);
          if (slot) slot.textContent = letter;
          btn.disabled = true;
          btn.classList.add('is-used');
          next += 1;
          play('pop');
          if (next >= word.length) {
            play('correct');
            root.querySelector('.spell-slots')?.classList.add('is-correct');
            finish(true);
          }
        } else {
          play('wrong');
          btn.classList.add('is-wrong');
          [...word].forEach((ch, i) => {
            const slot = root.querySelector(`[data-slot="${i}"]`);
            if (slot) slot.textContent = ch;
          });
          root.querySelector('.spell-slots')?.classList.add('is-wrong');
          finish(false);
        }
      });
    });
  }

  if (question.type === 'map') {
    root.querySelectorAll('[data-id]').forEach((shape) => {
      shape.style.cursor = 'pointer';
      shape.addEventListener('click', () => {
        if (done) return;
        const correct = shape.getAttribute('data-id') === question.answer;
        play(correct ? 'correct' : 'wrong');
        shape.classList.add(correct ? 'is-correct' : 'is-wrong');
        if (!correct) {
          const right = root.querySelector(`[data-id="${question.answer}"]`);
          if (right) right.classList.add('is-correct');
        }
        finish(correct);
      });
    });
  }
}
