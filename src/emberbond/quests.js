export const QUEST_META = {
  fractured_hearth: {
    title: 'The Fractured Hearth',
    steps: [
      'Speak with Elder Caldus in Hearthmere.',
      'Relight the Pine, Frost, and Ember shrines.',
      'Return to Elder Caldus.',
      'Face the Hollowmaw in the northern ruins.',
    ],
  },
  lost_kin: {
    title: "Lira's Lost Kin",
    steps: [
      'Ask Lira what is missing.',
      'Find the lost Bramblet in Pinewood.',
      'Bring word back to Lira.',
    ],
  },
  smith_ore: {
    title: "Bram's Ember Ore",
    steps: [
      'Talk to Bram the smith.',
      'Gather 3 Ember Ore on Emberridge.',
      'Return the ore to Bram.',
    ],
  },
  first_bond: {
    title: 'A First Bond',
    steps: ['Bind a wild Kin with a Binding Stone.'],
  },
};

function setStep(state, id, step) {
  const q = state.quests[id];
  if (!q || q.done) return;
  q.step = Math.max(q.step, step);
}

export function onTalk(state, npcId) {
  if (npcId === 'elder') {
    if (!state.flags.elderTalked) {
      state.flags.elderTalked = true;
      setStep(state, 'fractured_hearth', 1);
    }
    if (shrinesLit(state) && !state.flags.elderReturned) {
      state.flags.elderReturned = true;
      setStep(state, 'fractured_hearth', 3);
    }
  }
  if (npcId === 'lira' && !state.flags.liraTalked) {
    state.flags.liraTalked = true;
    setStep(state, 'lost_kin', 1);
  }
  if (npcId === 'lira' && state.flags.lostKinFound && !state.flags.lostKinReturned) {
    state.flags.lostKinReturned = true;
    state.quests.lost_kin.done = true;
    state.bag.bright_stone = (state.bag.bright_stone || 0) + 1;
    state.bag.gold += 40;
  }
  if (npcId === 'bram' && !state.flags.bramTalked) {
    state.flags.bramTalked = true;
    setStep(state, 'smith_ore', 1);
  }
  if (npcId === 'bram' && (state.bag.ember_ore || 0) >= 3 && !state.flags.oreReturned) {
    state.flags.oreReturned = true;
    state.bag.ember_ore -= 3;
    state.bag.ancient_stone = (state.bag.ancient_stone || 0) + 1;
    state.bag.gold += 50;
    state.quests.smith_ore.done = true;
  }
  return state;
}

export function shrinesLit(state) {
  return Boolean(state.flags.shrine_pine && state.flags.shrine_frost && state.flags.shrine_ember);
}

export function onBattleWin(state, context) {
  if (context?.kind === 'keeper' && context.id) {
    state.flags[`shrine_${context.id}`] = true;
    if (shrinesLit(state)) setStep(state, 'fractured_hearth', 2);
  }
  if (context?.kind === 'story' && context.id === 'hollowmaw') {
    state.flags.wyrmBeaten = true;
    state.quests.fractured_hearth.done = true;
    setStep(state, 'fractured_hearth', 4);
  }
  return state;
}

export function onCapture(state) {
  state.flags.firstBond = true;
  state.quests.first_bond.done = true;
  state.quests.first_bond.step = 1;
  return state;
}

export function onFindLostKin(state) {
  if (!state.flags.lostKinFound) {
    state.flags.lostKinFound = true;
    setStep(state, 'lost_kin', 2);
  }
  return state;
}

export function trackerLines(state) {
  return Object.entries(QUEST_META)
    .map(([id, meta]) => {
      const q = state.quests[id];
      if (!q) return null;
      const stepIndex = Math.min(q.step, meta.steps.length - 1);
      return {
        id,
        title: meta.title,
        hint: q.done ? 'Complete' : meta.steps[stepIndex],
        done: q.done,
      };
    })
    .filter(Boolean);
}

export function mainHint(state) {
  const lines = trackerLines(state);
  const active = lines.find((line) => !line.done) || lines[0];
  return active ? `${active.title}: ${active.hint}` : '';
}
