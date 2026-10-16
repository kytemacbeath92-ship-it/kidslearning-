import { play, setSoundOn, unlockAudio, isSoundOn } from './audio.js';
import { createBattle, describeEvent, takeTurn } from './battle.js';
import { SPECIES } from './data.js';
import { firstAliveIndex } from './kin.js';
import { createInput } from './input.js';
import { onBattleWin, onCapture, onFindLostKin, onTalk, mainHint } from './quests.js';
import { renderBattleField, renderMinimap, renderWorld } from './render.js';
import { loadSave, writeSave } from './save.js';
import {
  buyItem,
  collectOre,
  createNewGame,
  fastTravel,
  findInteract,
  huntHere,
  restAtHearth,
  spawnTrainerKin,
  tryMove,
  useBagHeal,
  warpToHearth,
} from './sim.js';
import {
  battleHtml,
  dialogueHtml,
  endingHtml,
  hpChip,
  menuHtml,
  setupHtml,
  shellHtml,
  shopHtml,
  titleHtml,
} from './ui.js';
import { hollowmawDialogue, lostKinDialogue, restDialogue, talkTo } from './dialogue.js';
import { MAP_H, MAP_W, TILE_SIZE, generateWorld } from './world.js';

const WALK = 118;
const RUN = 188;

export function boot(root) {
  generateWorld();
  root.innerHTML = shellHtml();
  const canvas = root.querySelector('#eb-view');
  const mini = root.querySelector('#eb-mini');
  const overlay = root.querySelector('#eb-overlay');
  const hud = root.querySelector('#eb-hud');
  const ctx = canvas.getContext('2d');
  const miniCtx = mini.getContext('2d');
  const input = createInput(root);

  const game = {
    mode: 'title',
    state: null,
    cam: { x: 0, y: 0, dpr: 1 },
    battle: null,
    convo: null,
    page: 0,
    log: '',
    animating: false,
    queue: [],
    menuTab: 'party',
    toast: '',
    lastInteract: 0,
    lastMenu: 0,
    pendingBattle: null,
    setupName: 'Wanderer',
  };

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    game.cam.dpr = dpr;
    canvas.width = Math.floor(root.clientWidth * dpr);
    canvas.height = Math.floor(root.clientHeight * dpr);
    canvas.style.width = `${root.clientWidth}px`;
    canvas.style.height = `${root.clientHeight}px`;
  }
  resize();
  window.addEventListener('resize', resize);

  function setWorldChrome(on) {
    hud.classList.toggle('is-hidden', !on);
    mini.classList.toggle('is-hidden', !on);
  }

  function setOverlay(html, center) {
    overlay.innerHTML = html;
    overlay.classList.add('show');
    overlay.classList.toggle('center', Boolean(center));
  }

  function hideOverlay() {
    overlay.classList.remove('show', 'center');
    overlay.innerHTML = '';
  }

  function showTitle() {
    game.mode = 'title';
    setWorldChrome(false);
    setOverlay(titleHtml(Boolean(loadSave())), true);
  }

  function showSetup() {
    game.mode = 'setup';
    setWorldChrome(false);
    setOverlay(setupHtml(game.setupName), true);
    overlay.querySelector('#wanderer-name')?.focus();
  }

  function enterWorld(state) {
    game.state = state;
    game.mode = 'world';
    hideOverlay();
    setWorldChrome(true);
    generateWorld();
    game.cam.x = state.x - canvas.width / game.cam.dpr / 2;
    game.cam.y = state.y - canvas.height / game.cam.dpr / 2;
    refreshHud();
    writeSave(state);
  }

  let hudKey = '';
  function refreshHud() {
    if (!game.state) return;
    const lead = game.state.party[firstAliveIndex(game.state.party)] || game.state.party[0];
    const near = findInteract(game.state);
    const key = `${mainHint(game.state)}|${game.state.bag.gold}|${lead?.hp}|${lead?.maxHp}|${near?.label || ''}`;
    if (key === hudKey) return;
    hudKey = key;
    root.querySelector('#quest-chip').textContent = mainHint(game.state);
    root.querySelector('#gold-chip').textContent = `${game.state.bag.gold} shards`;
    root.querySelector('#lead-chip').innerHTML = hpChip(lead);
    const btn = root.querySelector('#act-btn');
    btn.textContent = near?.label || 'Look';
    btn.classList.toggle('lit', Boolean(near));
  }

  function openDialogue(convo) {
    game.convo = convo;
    game.page = 0;
    game.mode = 'dialogue';
    setOverlay(dialogueHtml(convo, 0), false);
    play('talk');
  }

  function finishDialogue() {
    const convo = game.convo;
    game.convo = null;
    if (convo?.onFinish) applyDialogueFlag(convo.onFinish);
    if (convo?.battle) {
      startBattleFrom(convo.battle);
      return;
    }
    if (convo?.shop) {
      openShop();
      return;
    }
    game.mode = 'world';
    hideOverlay();
    setWorldChrome(true);
    refreshHud();
  }

  function applyDialogueFlag(flag) {
    const s = game.state;
    if (flag === 'elder_talk' || flag === 'elder_return') onTalk(s, 'elder');
    if (flag === 'bram_talk' || flag === 'bram_ore') onTalk(s, 'bram');
    if (flag === 'lira_talk' || flag === 'lira_return') onTalk(s, 'lira');
    if (flag === 'find_lost') onFindLostKin(s);
    if (flag === 'rest') restAtHearth(s);
    writeSave(s);
  }

  function interact() {
    if (game.mode !== 'world' || !game.state) return;
    const now = performance.now();
    if (now - game.lastInteract < 250) return;
    game.lastInteract = now;
    const near = findInteract(game.state);
    if (!near) {
      flash('Nothing to do here.');
      return;
    }
    if (near.kind === 'npc') {
      openDialogue(talkTo(near.target, game.state));
      return;
    }
    if (near.kind === 'hunt') {
      const encounter = huntHere(game.state);
      if (encounter) startWild(encounter);
      return;
    }
    if (near.kind === 'ore') {
      collectOre(game.state, near.target);
      play('bind');
      flash('Ember ore pocketed.');
      writeSave(game.state);
      refreshHud();
      return;
    }
    if (near.kind === 'lost_kin') {
      openDialogue(lostKinDialogue());
      return;
    }
    if (near.kind === 'hearth') {
      openDialogue(restDialogue());
      play('heal');
      return;
    }
    if (near.kind === 'ruins') {
      openDialogue(hollowmawDialogue(game.state));
      return;
    }
    if (near.kind === 'shrine') {
      const keepers = { pine: 'rowan', frost: 'ylva', ember: 'kael' };
      const shrineId = near.target?.shrine;
      const npcId = keepers[shrineId];
      if (npcId) openDialogue(talkTo({ id: npcId, name: npcId }, game.state));
    }
  }

  function startBattleFrom(spec) {
    const rng = Math.random;
    const foeParty = spawnTrainerKin(spec.team, rng);
    game.battle = createBattle({
      party: game.state.party,
      foeParty,
      context: { kind: spec.kind, id: spec.id, title: spec.title },
      rng,
    });
    game.mode = 'battle';
    game.log = `${spec.title || 'A Kin'} bars the way.`;
    game.animating = false;
    game.queue = [];
    setWorldChrome(false);
    overlay.classList.add('show');
    overlay.classList.remove('center');
    paintBattle();
  }

  function startWild(encounter) {
    const foeParty = spawnTrainerKin([{ speciesId: encounter.speciesId, level: encounter.level }], Math.random);
    game.battle = createBattle({
      party: game.state.party,
      foeParty,
      context: { kind: 'wild' },
      rng: Math.random,
    });
    game.mode = 'battle';
    game.log = `A wild ${foeParty[0].nickname} rises from the wilds!`;
    setWorldChrome(false);
    overlay.classList.add('show');
    overlay.classList.remove('center');
    paintBattle();
    play('talk');
  }

  function paintBattle() {
    overlay.innerHTML = battleHtml(game.battle, game.log, game.state.bag);
  }

  function enqueue(events) {
    game.queue.push(...events);
    if (!game.animating) pump();
  }

  function pump() {
    const ev = game.queue.shift();
    if (!ev) {
      game.animating = false;
      if (game.battle?.over) {
        endBattle();
        return;
      }
      paintBattle();
      return;
    }
    game.animating = true;
    const line = describeEvent(ev);
    if (line) game.log = line;
    if (ev.type === 'damage' || ev.type === 'hit') play('hit');
    if (ev.type === 'crit') play('crit');
    if (ev.type === 'heal' || ev.type === 'level') play('heal');
    if (ev.type === 'bind_ok' || ev.type === 'evolve') play('bind');
    if (ev.type === 'over' && ev.result === 'win') play('win');
    if (ev.type === 'over' && ev.result === 'lose') play('lose');
    paintBattle();
    setTimeout(pump, ev.type === 'over' ? 700 : 520);
  }

  function spendItem(id) {
    if (!game.state.bag[id]) return false;
    game.state.bag[id] -= 1;
    return true;
  }

  function battleAction(action) {
    if (!game.battle || game.animating || game.battle.over) return;
    if (action.type === 'bind' && !spendItem(action.itemId)) {
      game.log = 'No stones left.';
      paintBattle();
      return;
    }
    if (action.type === 'item' && !spendItem(action.itemId)) {
      game.log = 'No salves left.';
      paintBattle();
      return;
    }
    const events = takeTurn(game.battle, action);
    if (action.type === 'bind' && game.battle.result !== 'bind') {
      // stone already spent
    }
    enqueue(events);
  }

  function endBattle() {
    const battle = game.battle;
    const result = battle.result;
    if (result === 'win' || result === 'bind') {
      if (battle.reward?.gold) game.state.bag.gold += battle.reward.gold;
      if (result === 'bind' && battle.captured) {
        if (game.state.party.length < 6) {
          game.state.party.push(battle.captured);
          onCapture(game.state);
          flash(`${battle.captured.nickname} joined your party.`);
        } else {
          flash('Party full — the Kin faded back into the vale.');
        }
      }
      if (result === 'win') {
        onBattleWin(game.state, battle.context);
        if (battle.context.kind === 'trainer') {
          game.state.flags[`beat_${battle.context.id}`] = true;
        }
        if (battle.context.id === 'hollowmaw') {
          writeSave(game.state);
          game.mode = 'ending';
          setOverlay(endingHtml(), true);
          game.battle = null;
          play('shrine');
          return;
        }
      }
    }
    if (result === 'lose') {
      warpToHearth(game.state);
      flash('You blacked out and woke at a hearth.');
    }
    game.battle = null;
    game.mode = 'world';
    hideOverlay();
    setWorldChrome(true);
    writeSave(game.state);
    refreshHud();
  }

  function openMenu() {
    if (game.mode !== 'world') return;
    game.mode = 'menu';
    game.menuTab = 'party';
    setOverlay(menuHtml(game.state, game.menuTab), true);
  }

  function openShop() {
    game.mode = 'shop';
    setOverlay(shopHtml(game.state), true);
  }

  function flash(text) {
    game.toast = text;
    let node = root.querySelector('.toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'toast';
      root.appendChild(node);
    }
    node.textContent = text;
    node.classList.add('show');
    setTimeout(() => node.classList.remove('show'), 1600);
  }

  overlay.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-act]');
    unlockAudio();
    if (!btn) {
      if (game.mode === 'dialogue') {
        game.page += 1;
        if (game.page >= game.convo.pages.length) finishDialogue();
        else overlay.innerHTML = dialogueHtml(game.convo, game.page);
      }
      return;
    }
    const act = btn.dataset.act;
    play('tap');
    if (act === 'new') showSetup();
    if (act === 'continue') {
      const save = loadSave();
      if (save) enterWorld(save);
    }
    if (act === 'starter') {
      const name = (overlay.querySelector('#wanderer-name')?.value || 'Wanderer').trim().slice(0, 16) || 'Wanderer';
      enterWorld(createNewGame(name, btn.dataset.id));
      flash(`${SPECIES[btn.dataset.id].name} walks beside you.`);
    }
    if (act === 'advance-dialogue') {
      game.page += 1;
      if (game.page >= game.convo.pages.length) finishDialogue();
      else overlay.innerHTML = dialogueHtml(game.convo, game.page);
    }
    if (act === 'move') battleAction({ type: 'move', moveId: btn.dataset.id });
    if (act === 'bind') battleAction({ type: 'bind', itemId: btn.dataset.id });
    if (act === 'heal') battleAction({ type: 'item', itemId: btn.dataset.id, targetIndex: game.battle.activeIndex });
    if (act === 'flee') battleAction({ type: 'flee' });
    if (act === 'switch') battleAction({ type: 'switch', index: Number(btn.dataset.index), free: game.battle.mustSwitch });
    if (act === 'menu') openMenu();
    if (act === 'close-menu') {
      game.mode = 'world';
      hideOverlay();
    }
    if (act === 'tab') {
      game.menuTab = btn.dataset.id;
      overlay.innerHTML = menuHtml(game.state, game.menuTab);
    }
    if (act === 'save-now') {
      writeSave(game.state);
      flash('Wander saved.');
    }
    if (act === 'title') {
      writeSave(game.state);
      showTitle();
    }
    if (act === 'travel') {
      if (fastTravel(game.state, btn.dataset.id)) {
        game.mode = 'world';
        hideOverlay();
        flash('The vale folds; you arrive.');
        refreshHud();
      }
    }
    if (act === 'buy') {
      if (buyItem(game.state, btn.dataset.id)) {
        play('bind');
        overlay.innerHTML = shopHtml(game.state);
        refreshHud();
      } else flash('Not enough shards.');
    }
    if (act === 'close-shop') {
      game.mode = 'world';
      hideOverlay();
    }
    if (act === 'use-heal') {
      const idx = firstAliveIndex(game.state.party);
      if (useBagHeal(game.state, btn.dataset.id, idx)) {
        play('heal');
        overlay.innerHTML = menuHtml(game.state, 'bag');
        refreshHud();
      } else flash('Cannot use that now.');
    }
    if (act === 'keep-wandering') {
      game.mode = 'world';
      hideOverlay();
      setWorldChrome(true);
      refreshHud();
    }
    if (act === 'interact') interact();
  });

  hud.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-act]');
    if (!btn) return;
    unlockAudio();
    play('tap');
    if (btn.dataset.act === 'menu') openMenu();
    if (btn.dataset.act === 'interact') interact();
  });

  canvas.addEventListener('pointerdown', (event) => {
    if (game.mode !== 'world') return;
    const rect = canvas.getBoundingClientRect();
    const x = game.cam.x + (event.clientX - rect.left);
    const y = game.cam.y + (event.clientY - rect.top);
    input.setNav(x, y);
  });

  let last = performance.now();
  let time = 0;
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    time += dt;
    if (game.state && game.mode === 'world') {
      game.state.playTime += dt;
      const vec = input.vector();
      let vx = vec.x;
      let vy = vec.y;
      let mag = vec.mag;
      if (vec.nav && mag < 0.18) {
        const dx = vec.nav.x - game.state.x;
        const dy = vec.nav.y - game.state.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 8) input.clearNav();
        else {
          vx = dx / dist;
          vy = dy / dist;
          mag = 1;
        }
      }
      if (vec.interact) interact();
      if (vec.menu) {
        const tnow = performance.now();
        if (tnow - game.lastMenu > 400) {
          game.lastMenu = tnow;
          openMenu();
        }
      }
      if (mag > 0) {
        const spd = (vec.run || mag > 0.84 ? RUN : WALK) * Math.max(mag, 0.55);
        game.state._moving = true;
        const { encounter } = tryMove(game.state, vx * spd, vy * spd, dt);
        if (encounter) startWild(encounter);
      } else game.state._moving = false;
      const viewW = canvas.width / game.cam.dpr;
      const viewH = canvas.height / game.cam.dpr;
      const tx = game.state.x - viewW / 2;
      const ty = game.state.y - viewH / 2;
      game.cam.x += (tx - game.cam.x) * Math.min(1, dt * 8);
      game.cam.y += (ty - game.cam.y) * Math.min(1, dt * 8);
      game.cam.x = Math.max(0, Math.min(MAP_W * TILE_SIZE - viewW, game.cam.x));
      game.cam.y = Math.max(0, Math.min(MAP_H * TILE_SIZE - viewH, game.cam.y));
      refreshHud();
    }
    if (game.mode === 'battle' && game.battle) renderBattleField(ctx, game.battle, time);
    else if (game.state) {
      renderWorld(ctx, game.cam, game.state, time);
      renderMinimap(miniCtx, game.state);
    } else {
      ctx.fillStyle = '#12100e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  showTitle();

  window.addEventListener('keydown', (event) => {
    if (event.key === 'm' && isSoundOn() === false) setSoundOn(true);
  });

  return game;
}

