import { ITEMS, SPECIES, STARTERS, TYPE_LABEL } from './data.js';
import { knownMoves, speciesOf } from './kin.js';
import { LANDMARKS } from './world.js';
import { trackerLines } from './quests.js';

export function shellHtml() {
  return `
    <canvas id="eb-view"></canvas>
    <canvas id="eb-mini" width="112" height="84" aria-hidden="true"></canvas>
    <div id="eb-hud" class="hud">
      <div class="hud-top">
        <p class="quest-chip" id="quest-chip"></p>
        <div class="hud-right">
          <span class="gold-chip" id="gold-chip"></span>
          <button class="icon-btn" data-act="menu" type="button" aria-label="Menu">Menu</button>
        </div>
      </div>
      <div class="lead-chip" id="lead-chip"></div>
      <div class="hud-bottom">
        <div class="joy-base" aria-hidden="true"><div class="joy-knob"></div></div>
        <button class="act-btn" data-act="interact" type="button" id="act-btn">Talk</button>
      </div>
    </div>
    <div id="eb-overlay"></div>
  `;
}

export function titleHtml(hasSave) {
  return `
    <section class="panel title-panel">
      <p class="kicker">An original open-world pact</p>
      <h1>Emberbond</h1>
      <p class="sub">Hollow Vale</p>
      <p class="blurb">Wander a Nordic-inspired vale, bind wild Kin, and relight the shrines before the north goes dark.</p>
      <div class="stack">
        <button class="btn primary" data-act="new" type="button">New wanderer</button>
        <button class="btn" data-act="continue" type="button" ${hasSave ? '' : 'disabled'}>Continue</button>
      </div>
      <p class="legal">Original world and creatures. Inspired by open-world RPGs and creature-collection adventures — not a crossover of any commercial game.</p>
    </section>`;
}

export function setupHtml(name = '') {
  const cards = STARTERS.map((id) => {
    const s = SPECIES[id];
    return `
      <button class="starter" data-act="starter" data-id="${id}" type="button">
        <strong>${s.name}</strong>
        <span class="type-pill type-${s.type}">${TYPE_LABEL[s.type]}</span>
        <small>${id === 'cindertail' ? 'Quick ember fox' : id === 'rimepup' ? 'Loyal frost wolf' : 'Sturdy grove hedgehog'}</small>
      </button>`;
  }).join('');
  return `
    <section class="panel setup-panel">
      <h2>Name your wanderer</h2>
      <input id="wanderer-name" maxlength="16" value="${escapeHtml(name)}" placeholder="Wanderer" autocomplete="nickname" />
      <h3>Choose a first Kin</h3>
      <div class="starter-row">${cards}</div>
    </section>`;
}

export function dialogueHtml(convo, pageIndex) {
  const page = convo.pages[pageIndex] || '';
  const last = pageIndex >= convo.pages.length - 1;
  return `
    <section class="dialogue" data-act="advance-dialogue">
      <p class="speaker">${escapeHtml(convo.speaker)}</p>
      <p class="line">${escapeHtml(page)}</p>
      <p class="more">${last ? (convo.battle ? 'Challenge' : convo.shop ? 'Open shop' : 'Close') : 'Tap to continue'}</p>
    </section>`;
}

export function battleHtml(battle, logLine, bag) {
  const foe = battle.foe;
  const ally = battle.party[battle.activeIndex];
  const foeSp = speciesOf(foe);
  const allySp = speciesOf(ally);
  const moves = knownMoves(ally)
    .map(
      (move) =>
        `<button class="move" data-act="move" data-id="${move.id}" type="button">
          <strong>${move.name}</strong>
          <span class="type-pill type-${move.type}">${TYPE_LABEL[move.type]}</span>
        </button>`,
    )
    .join('');
  const stones = ['binding_stone', 'bright_stone', 'ancient_stone']
    .filter((id) => (bag[id] || 0) > 0)
    .map((id) => `<button class="btn slim" data-act="bind" data-id="${id}" type="button">${ITEMS[id].name} ×${bag[id]}</button>`)
    .join('');
  const heals = ['salve', 'full_salve']
    .filter((id) => (bag[id] || 0) > 0)
    .map((id) => `<button class="btn slim" data-act="heal" data-id="${id}" type="button">${ITEMS[id].name} ×${bag[id]}</button>`)
    .join('');
  const switchers = battle.party
    .map(
      (kin, i) =>
        `<button class="btn slim" data-act="switch" data-index="${i}" type="button" ${kin.hp <= 0 || i === battle.activeIndex ? 'disabled' : ''}>${kin.nickname} ${kin.hp}/${kin.maxHp}</button>`,
    )
    .join('');
  return `
    <section class="battle-ui">
      <div class="battler foe">
        <div class="name-row"><strong>${foe.nickname}</strong> <span>Pact ${foe.level}</span> <span class="type-pill type-${foeSp.type}">${TYPE_LABEL[foeSp.type]}</span></div>
        <div class="bar"><i style="width:${Math.max(0, (foe.hp / foe.maxHp) * 100)}%"></i></div>
      </div>
      <div class="battler ally">
        <div class="name-row"><strong>${ally.nickname}</strong> <span>Pact ${ally.level}</span> <span class="type-pill type-${allySp.type}">${TYPE_LABEL[allySp.type]}</span></div>
        <div class="bar"><i style="width:${Math.max(0, (ally.hp / ally.maxHp) * 100)}%"></i></div>
        <small>${ally.hp} / ${ally.maxHp}</small>
      </div>
      <p class="blog">${escapeHtml(logLine || 'A wild Kin bars the path.')}</p>
      <div class="moves ${battle.mustSwitch ? 'is-hidden' : ''}">${moves}</div>
      <div class="battle-extra">
        ${battle.context.kind === 'wild' && !battle.mustSwitch ? `<div class="row-wrap">${stones || '<span class="muted">No binding stones</span>'}</div>` : ''}
        <div class="row-wrap">${heals}${switchers}</div>
        ${battle.context.kind === 'wild' && !battle.mustSwitch ? '<button class="btn ghost" data-act="flee" type="button">Withdraw</button>' : ''}
      </div>
    </section>`;
}

export function menuHtml(state, tab) {
  const tabs = ['party', 'bag', 'quests', 'map', 'save']
    .map((id) => `<button class="tab ${tab === id ? 'on' : ''}" data-act="tab" data-id="${id}" type="button">${id}</button>`)
    .join('');
  let body = '';
  if (tab === 'party') {
    body = state.party
      .map((kin) => {
        const sp = speciesOf(kin);
        return `<article class="card-row">
          <div><strong>${kin.nickname}</strong> · Pact ${kin.level}<br><span class="type-pill type-${sp.type}">${TYPE_LABEL[sp.type]}</span>
          <div class="bar"><i style="width:${(kin.hp / kin.maxHp) * 100}%"></i></div></div>
          <small>${kin.hp}/${kin.maxHp}</small>
        </article>`;
      })
      .join('');
  } else if (tab === 'bag') {
    body = Object.entries(state.bag)
      .filter(([id, n]) => id !== 'gold' && n > 0)
      .map(([id, n]) => {
        const item = ITEMS[id] || { name: id, desc: '' };
        const heal = item.kind === 'heal';
        return `<article class="card-row">
          <div><strong>${item.name}</strong> ×${n}<br><small>${item.desc || ''}</small></div>
          ${heal ? `<button class="btn slim" data-act="use-heal" data-id="${id}" type="button">Use</button>` : ''}
        </article>`;
      })
      .join('') || '<p class="muted">The satchel is empty.</p>';
    body += `<p class="gold-line">Shards: ${state.bag.gold}</p>`;
  } else if (tab === 'quests') {
    body = trackerLines(state)
      .map((q) => `<article class="card-row"><div><strong>${q.title}</strong><br><small>${q.hint}</small></div><span>${q.done ? 'Done' : ''}</span></article>`)
      .join('');
  } else if (tab === 'map') {
    body = Object.entries(LANDMARKS)
      .map(([id, mark]) => {
        const known = state.discovered[id];
        return `<button class="card-row travel" data-act="travel" data-id="${id}" type="button" ${known ? '' : 'disabled'}>
          <div><strong>${known ? mark.name : 'Unknown wilds'}</strong><br><small>${known ? 'Tap to travel' : 'Not yet discovered'}</small></div>
        </button>`;
      })
      .join('');
  } else {
    body = `
      <p>Progress is stored on this device.</p>
      <button class="btn primary" data-act="save-now" type="button">Save wander</button>
      <button class="btn" data-act="title" type="button">Return to title</button>`;
  }
  return `
    <section class="panel menu-panel">
      <header class="menu-head">
        <h2>${escapeHtml(state.playerName)}</h2>
        <button class="icon-btn" data-act="close-menu" type="button">Close</button>
      </header>
      <div class="tabs">${tabs}</div>
      <div class="menu-body">${body}</div>
    </section>`;
}

export function shopHtml(state) {
  const stock = ['binding_stone', 'bright_stone', 'ancient_stone', 'salve', 'full_salve'];
  const rows = stock
    .map((id) => {
      const item = ITEMS[id];
      return `<button class="card-row" data-act="buy" data-id="${id}" type="button">
        <div><strong>${item.name}</strong><br><small>${item.desc}</small></div>
        <span>${item.price} shards</span>
      </button>`;
    })
    .join('');
  return `
    <section class="panel shop-panel">
      <header class="menu-head"><h2>Bram's Bench</h2><button class="icon-btn" data-act="close-shop" type="button">Close</button></header>
      <p class="gold-line">You have ${state.bag.gold} shards</p>
      ${rows}
    </section>`;
}

export function toastHtml(text) {
  return `<div class="toast">${escapeHtml(text)}</div>`;
}

export function endingHtml() {
  return `
    <section class="panel title-panel">
      <p class="kicker">The vale holds</p>
      <h1>Hearth restored</h1>
      <p class="blurb">Hollowmaw is gone. The shrines burn. You may keep wandering the Hollow Vale — the wilds do not end with one hunger.</p>
      <button class="btn primary" data-act="keep-wandering" type="button">Keep wandering</button>
    </section>`;
}

export function hpChip(kin) {
  if (!kin) return '';
  const sp = speciesOf(kin);
  return `<strong>${kin.nickname}</strong> <span class="type-pill type-${sp.type}">${TYPE_LABEL[sp.type]}</span> ${kin.hp}/${kin.maxHp}`;
}

export function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (ch) => (
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])
  ));
}
