import { shrinesLit } from './quests.js';
import { KEEPER_TEAMS } from './world.js';

export function talkTo(npc, state) {
  switch (npc.id) {
    case 'sera':
      return {
        speaker: 'Sera',
        pages: [
          'The Kin heard you before I did. That pull in your chest is a pact waiting to happen.',
          'Walk the tall grass north of the gate. When a wild Kin appears, you can fight — or bind it with a stone.',
          'Rest at the village hearth when your party is worn. Bram sells extra stones if you run dry.',
        ],
      };
    case 'elder':
      if (state.flags.wyrmBeaten) {
        return {
          speaker: 'Elder Caldus',
          pages: [
            'The vale breathes again. You did not inherit this land — you earned a place in it.',
            'Keep walking. The Hollow Vale is larger than any one fire.',
          ],
        };
      }
      if (shrinesLit(state)) {
        return {
          speaker: 'Elder Caldus',
          pages: [
            'Three fires answer the north. Good. The last wound is in the Hollow Ruins.',
            'The Hollowmaw is not a king and not a god. It is hunger that learned a shape. End it.',
          ],
          onFinish: 'elder_return',
        };
      }
      return {
        speaker: 'Elder Caldus',
        pages: [
          'The World-Hearth in the north is cracking. Winter is crawling down the pine.',
          'Three lesser shrines hold the vale together: pine in the west, frost in the north, ember in the east.',
          'Relight them. Then we will speak of the ruins.',
        ],
        onFinish: 'elder_talk',
      };
    case 'bram':
      if (state.flags.oreReturned) {
        return {
          speaker: 'Bram',
          pages: ['That ancient stone should hold even a stubborn Kin. Need ordinary stock? I still sell it.'],
          shop: true,
        };
      }
      if ((state.bag.ember_ore || 0) >= 3 && state.flags.bramTalked) {
        return {
          speaker: 'Bram',
          pages: [
            'Three warm stones. That is smith-luck. Take this relic-stone — I never could wake it.',
          ],
          onFinish: 'bram_ore',
          shop: true,
        };
      }
      return {
        speaker: 'Bram',
        pages: [
          'Binding stones, salves, and gossip. The gossip is free.',
          'If you wander Emberridge, bring me three chunks of ember ore. I will pay in something older than coin.',
        ],
        onFinish: 'bram_talk',
        shop: true,
      };
    case 'lira':
      if (state.flags.lostKinReturned) {
        return {
          speaker: 'Lira',
          pages: ['My Bramblet is eating half the garden and I have never been happier. Hunt well.'],
        };
      }
      if (state.flags.lostKinFound) {
        return {
          speaker: 'Lira',
          pages: [
            'You found the little thorn? Then it will find its way home. Take a bright stone — you have better aim than I do.',
          ],
          onFinish: 'lira_return',
        };
      }
      return {
        speaker: 'Lira',
        pages: [
          'My Bramblet slipped the garden and ran west into Pinewood. It is stubborn, not fast.',
          'If you see a frightened grove-kin near the shrine, call to it. It knows a kind voice.',
        ],
        onFinish: 'lira_talk',
      };
    case 'mira':
      return {
        speaker: 'Mira',
        pages: [
          'Night comes quicker since the Hearth cracked. If you see the lights on the shrines, tell me. I miss them.',
          state.flags.shrine_pine ? 'Pinewood glows again. I slept better.' : 'The west wood feels too quiet.',
        ],
      };
    case 'rowan':
      if (state.flags.shrine_pine) {
        return { speaker: 'Keeper Rowan', pages: ['The grove remembers your step. Walk softly among the roots.'] };
      }
      return {
        speaker: 'Keeper Rowan',
        pages: ['None pass the grove untested. Show me a Kin that belongs to the wilds, not a leash.'],
        battle: { kind: 'keeper', id: 'pine', team: KEEPER_TEAMS.pine, title: 'Keeper Rowan' },
      };
    case 'ylva':
      if (state.flags.shrine_frost) {
        return { speaker: 'Keeper Ylva', pages: ['The ice sings in tune again. Do not linger — the wind still bites.'] };
      }
      return {
        speaker: 'Keeper Ylva',
        pages: ['Frostfield does not forgive a weak pact. Come, then.'],
        battle: { kind: 'keeper', id: 'frost', team: KEEPER_TEAMS.frost, title: 'Keeper Ylva' },
      };
    case 'kael':
      if (state.flags.shrine_ember) {
        return { speaker: 'Keeper Kael', pages: ['The ridge burns honest. Take an ember and go.'] };
      }
      return {
        speaker: 'Keeper Kael',
        pages: ['Emberridge answers heat with heat. Let us see which of us blinks.'],
        battle: { kind: 'keeper', id: 'ember', team: KEEPER_TEAMS.ember, title: 'Keeper Kael' },
      };
    case 'tamsin':
      if (state.flags.beat_tamsin) {
        return { speaker: 'Scout Tamsin', pages: ['Road is clear. Hollow Ruins still are not.'] };
      }
      return {
        speaker: 'Scout Tamsin',
        pages: ['Hold. If you can stand a scout, maybe you can stand the ridge.'],
        battle: { kind: 'trainer', id: 'tamsin', team: KEEPER_TEAMS.tamsin, title: 'Scout Tamsin' },
      };
    case 'oren':
      if (state.flags.beat_oren) {
        return { speaker: 'Pilgrim Oren', pages: ['The lake keeps secrets. I keep walking.'] };
      }
      return {
        speaker: 'Pilgrim Oren',
        pages: ['Share the road? My Glowcap has been itching for a bout.'],
        battle: { kind: 'trainer', id: 'oren', team: KEEPER_TEAMS.oren, title: 'Pilgrim Oren' },
      };
    default:
      return { speaker: npc.name, pages: ['The vale is wide. Keep your stones dry.'] };
  }
}

export function lostKinDialogue() {
  return {
    speaker: 'Lost Bramblet',
    pages: [
      'The little grove-kin bristles, then sniffs your cloak. It knows Lira’s scent on the wind.',
      'It turns toward Hearthmere and trundles into the trees.',
    ],
    onFinish: 'find_lost',
  };
}

export function hollowmawDialogue(state) {
  if (state.flags.wyrmBeaten) {
    return {
      speaker: 'Hollow Ruins',
      pages: ['Ash settles. The ruin is only stone now.'],
    };
  }
  if (!shrinesLit(state) || !state.flags.elderReturned) {
    return {
      speaker: 'Hollow Ruins',
      pages: ['A hunger breathes under the stone. The shrines are not yet loud enough to wake a fair fight.'],
    };
  }
  return {
    speaker: 'Hollowmaw',
    pages: ['The ruin exhales. Something old, antlered in shadow, unfolds from the cracked hearth-stone.'],
    battle: { kind: 'story', id: 'hollowmaw', team: KEEPER_TEAMS.hollowmaw, title: 'Hollowmaw' },
  };
}

export function restDialogue() {
  return {
    speaker: 'Village Hearth',
    pages: ['Warmth climbs your party’s bones. The Kin sleep like coals in ash.'],
    onFinish: 'rest',
  };
}
