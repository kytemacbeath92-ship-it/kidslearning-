import { ITEMS, MOVES, effectiveness } from './data.js';
import {
  cloneKin,
  firstAliveIndex,
  grantXp,
  isAlive,
  knownMoves,
  partyAlive,
  resetBattleStages,
  speciesOf,
  stageMultiplier,
  xpYield,
} from './kin.js';

export function createBattle({ party, foe, foeParty, context, rng = Math.random }) {
  const activeIndex = Math.max(0, firstAliveIndex(party));
  const foes = foeParty?.length ? foeParty : [foe];
  party.forEach(resetBattleStages);
  foes.forEach(resetBattleStages);
  return {
    party,
    activeIndex,
    foeParty: foes,
    foeIndex: 0,
    foe: foes[0],
    context: context || { kind: 'wild' },
    rng,
    over: false,
    result: null,
    captured: null,
    reward: null,
    mustSwitch: false,
  };
}

export function activeKin(battle) {
  return battle.party[battle.activeIndex];
}

function actorName(kin) {
  return kin.nickname || speciesOf(kin).name;
}

export function captureChance(foe, stoneId) {
  const stone = ITEMS[stoneId];
  if (!stone || stone.kind !== 'bind') return 0;
  const species = speciesOf(foe);
  const hpRatio = foe.maxHp ? foe.hp / foe.maxHp : 1;
  const hpFactor = 1.05 - hpRatio;
  return Math.max(0.04, Math.min(0.92, species.catchRate * stone.bonus * hpFactor));
}

export function damageFor(attacker, defender, move, rng = Math.random) {
  if (!move.power) return { amount: 0, mult: 1, crit: false, miss: false };
  if (rng() * 100 > move.acc) return { amount: 0, mult: 1, crit: false, miss: true };
  const atk = attacker.stats.atk * stageMultiplier(attacker.atkStage);
  const def = Math.max(1, defender.stats.def * stageMultiplier(defender.defStage));
  const level = attacker.level;
  const base = move.power * (atk / def) * (0.55 + level * 0.045);
  const defType = speciesOf(defender).type;
  const mult = effectiveness(move.type, defType);
  const crit = rng() < 0.08;
  const jitter = 0.9 + rng() * 0.12;
  const amount = Math.max(1, Math.floor(base * mult * jitter * (crit ? 1.5 : 1)));
  return { amount, mult, crit, miss: false };
}

function applyMove(user, target, move, rng) {
  const events = [];
  events.push({ type: 'move', actor: actorName(user), move: move.name, moveId: move.id });
  if (move.effect && !move.power) {
    if (rng() * 100 > move.acc) {
      events.push({ type: 'miss', actor: actorName(user) });
      return events;
    }
    const who = move.effect.target === 'self' ? user : target;
    if (move.effect.stat === 'atk') who.atkStage = Math.max(-3, Math.min(3, who.atkStage + move.effect.stages));
    if (move.effect.stat === 'def') who.defStage = Math.max(-3, Math.min(3, who.defStage + move.effect.stages));
    events.push({
      type: 'buff',
      target: actorName(who),
      stat: move.effect.stat,
      stages: move.effect.stages,
    });
    return events;
  }
  const hit = damageFor(user, target, move, rng);
  if (hit.miss) {
    events.push({ type: 'miss', actor: actorName(user) });
    return events;
  }
  target.hp = Math.max(0, target.hp - hit.amount);
  events.push({
    type: 'damage',
    target: actorName(target),
    side: target === user ? 'self' : 'other',
    amount: hit.amount,
    hp: target.hp,
    maxHp: target.maxHp,
    mult: hit.mult,
    crit: hit.crit,
  });
  if (hit.crit) events.push({ type: 'crit' });
  if (hit.mult > 1) events.push({ type: 'effective', mult: hit.mult });
  if (hit.mult < 1) events.push({ type: 'resist', mult: hit.mult });
  if (target.hp <= 0) events.push({ type: 'faint', target: actorName(target) });
  return events;
}

export function chooseFoeMove(battle) {
  const foe = battle.foe;
  const moves = knownMoves(foe);
  const player = activeKin(battle);
  const playerType = speciesOf(player).type;
  const superMoves = moves.filter((move) => move.power && effectiveness(move.type, playerType) > 1);
  if (superMoves.length && battle.rng() < 0.7) {
    return superMoves[Math.floor(battle.rng() * superMoves.length)];
  }
  const attacks = moves.filter((move) => move.power);
  const pool = attacks.length ? attacks : moves;
  return pool[Math.floor(battle.rng() * pool.length)];
}

function finishWin(battle, events) {
  const winner = activeKin(battle);
  const xp = xpYield(battle.foe);
  const gold = 8 + battle.foe.level * 3 + (battle.context.kind === 'keeper' ? 18 : 0);
  const notes = grantXp(winner, xp);
  battle.reward = battle.reward || { xp: 0, gold: 0 };
  battle.reward.xp += xp;
  battle.reward.gold += gold;
  events.push(...notes);
  events.push({ type: 'gold', amount: gold });
  const next = battle.foeIndex + 1;
  if (next < battle.foeParty.length) {
    battle.foeIndex = next;
    battle.foe = battle.foeParty[next];
    resetBattleStages(battle.foe);
    events.push({ type: 'foe_send', kin: actorName(battle.foe) });
    return;
  }
  battle.over = true;
  battle.result = 'win';
  events.push({ type: 'over', result: 'win' });
}

function finishLose(battle, events) {
  battle.over = true;
  battle.result = 'lose';
  events.push({ type: 'over', result: 'lose' });
}

function afterPlayerAction(battle, events) {
  if (battle.over) return events;
  if (battle.foe.hp <= 0) {
    finishWin(battle, events);
    return events;
  }
  const foeMove = chooseFoeMove(battle);
  events.push(...applyMove(battle.foe, activeKin(battle), foeMove, battle.rng));
  if (activeKin(battle).hp <= 0) {
    if (partyAlive(battle.party)) {
      battle.mustSwitch = true;
      events.push({ type: 'must_switch' });
    } else {
      finishLose(battle, events);
    }
  }
  return events;
}

export function takeTurn(battle, action) {
  if (battle.over) return [{ type: 'over', result: battle.result }];
  const events = [];
  const player = activeKin(battle);
  const rng = battle.rng;

  if (action.type === 'switch') {
    if (action.index === battle.activeIndex || !isAlive(battle.party[action.index])) {
      events.push({ type: 'fail', reason: 'switch' });
      return events;
    }
    battle.activeIndex = action.index;
    battle.mustSwitch = false;
    resetBattleStages(activeKin(battle));
    events.push({ type: 'switch', kin: actorName(activeKin(battle)) });
    if (action.free) return events;
    events.push(...applyMove(battle.foe, activeKin(battle), chooseFoeMove(battle), rng));
    if (activeKin(battle).hp <= 0) {
      if (partyAlive(battle.party)) {
        battle.mustSwitch = true;
        events.push({ type: 'must_switch' });
      } else finishLose(battle, events);
    }
    return events;
  }

  if (battle.mustSwitch) {
    events.push({ type: 'fail', reason: 'must_switch' });
    return events;
  }

  if (action.type === 'move') {
    const move = MOVES[action.moveId];
    if (!move || !player.moves.includes(action.moveId)) {
      events.push({ type: 'fail', reason: 'move' });
      return events;
    }
    const playerFirst = player.stats.spd * stageMultiplier(player.atkStage) >= battle.foe.stats.spd || rng() < 0.08;
    if (playerFirst) {
      events.push(...applyMove(player, battle.foe, move, rng));
      return afterPlayerAction(battle, events);
    }
    events.push(...applyMove(battle.foe, player, chooseFoeMove(battle), rng));
    if (player.hp <= 0) {
      if (partyAlive(battle.party)) {
        battle.mustSwitch = true;
        events.push({ type: 'must_switch' });
      } else finishLose(battle, events);
      return events;
    }
    events.push(...applyMove(player, battle.foe, move, rng));
    if (battle.foe.hp <= 0) finishWin(battle, events);
    return events;
  }

  if (action.type === 'bind') {
    if (battle.context.kind !== 'wild') {
      events.push({ type: 'fail', reason: 'cannot_bind' });
      return events;
    }
    const item = ITEMS[action.itemId];
    if (!item || item.kind !== 'bind') {
      events.push({ type: 'fail', reason: 'item' });
      return events;
    }
    events.push({ type: 'bind_try', item: item.name });
    const chance = captureChance(battle.foe, action.itemId);
    if (rng() < chance) {
      const bound = cloneKin(battle.foe, { rng });
      bound.hp = Math.max(1, bound.hp);
      battle.captured = bound;
      battle.over = true;
      battle.result = 'bind';
      const gold = 5 + battle.foe.level;
      battle.reward = { xp: 0, gold };
      events.push({ type: 'bind_ok', kin: actorName(bound) });
      events.push({ type: 'over', result: 'bind' });
      return events;
    }
    events.push({ type: 'bind_fail' });
    return afterPlayerAction(battle, events);
  }

  if (action.type === 'item') {
    const item = ITEMS[action.itemId];
    if (!item || item.kind !== 'heal') {
      events.push({ type: 'fail', reason: 'item' });
      return events;
    }
    const target = battle.party[action.targetIndex ?? battle.activeIndex];
    if (!target || target.hp <= 0) {
      events.push({ type: 'fail', reason: 'target' });
      return events;
    }
    const before = target.hp;
    target.hp = Math.min(target.maxHp, target.hp + item.heal);
    events.push({ type: 'heal', kin: actorName(target), amount: target.hp - before, hp: target.hp, maxHp: target.maxHp });
    return afterPlayerAction(battle, events);
  }

  if (action.type === 'flee') {
    if (battle.context.kind !== 'wild') {
      events.push({ type: 'fail', reason: 'cannot_flee' });
      return events;
    }
    const spd = player.stats.spd - battle.foe.stats.spd;
    const chance = Math.max(0.22, Math.min(0.92, 0.52 + spd / 80));
    if (rng() < chance) {
      battle.over = true;
      battle.result = 'flee';
      events.push({ type: 'flee_ok' });
      events.push({ type: 'over', result: 'flee' });
      return events;
    }
    events.push({ type: 'flee_fail' });
    return afterPlayerAction(battle, events);
  }

  events.push({ type: 'fail', reason: 'unknown' });
  return events;
}

export function describeEvent(event) {
  switch (event.type) {
    case 'move':
      return `${event.actor} used ${event.move}!`;
    case 'damage':
      return `${event.target} took ${event.amount} damage.`;
    case 'miss':
      return `${event.actor} missed!`;
    case 'crit':
      return 'A piercing hit!';
    case 'effective':
      return 'A fierce type matchup!';
    case 'resist':
      return 'It barely bites…';
    case 'faint':
      return `${event.target} collapsed.`;
    case 'buff':
      return `${event.target}'s ${event.stat === 'atk' ? 'force' : 'guard'} ${event.stages > 0 ? 'rose' : 'fell'}.`;
    case 'bind_try':
      return `You loosed a ${event.item}!`;
    case 'bind_ok':
      return `${event.kin} accepted the bond!`;
    case 'bind_fail':
      return 'The Kin shook free.';
    case 'flee_ok':
      return 'You slipped back into the wilds.';
    case 'flee_fail':
      return 'Could not get away!';
    case 'heal':
      return `${event.kin} recovered ${event.amount} health.`;
    case 'xp':
      return `${event.kin} gained ${event.amount} pact-light.`;
    case 'level':
      return `${event.kin} reached pact ${event.level}!`;
    case 'evolve':
      return `${event.from} reshaped into ${event.to}!`;
    case 'gold':
      return `You found ${event.amount} shards.`;
    case 'switch':
      return `Go, ${event.kin}!`;
    case 'foe_send':
      return `A new Kin steps forward: ${event.kin}!`;
    case 'must_switch':
      return 'Choose another Kin.';
    case 'fail':
      if (event.reason === 'cannot_bind') return 'This Kin will not be bound.';
      if (event.reason === 'cannot_flee') return 'A Keeper blocks the path.';
      if (event.reason === 'must_switch') return 'Your Kin cannot fight.';
      return 'Nothing happened.';
    case 'over':
      if (event.result === 'win') return 'The wilds grow quiet.';
      if (event.result === 'bind') return 'A new pact is sealed.';
      if (event.result === 'flee') return 'You withdrew.';
      return 'Your party can fight no more.';
    default:
      return '';
  }
}

export { MOVES };
