# Lumi's Learning Quest

An illustrated learning game for kids under 10, with a 10-level path inspired by ABCmouse, Khan Academy Kids, and Duolingo ABC.

## Play

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (default `http://localhost:5173`).

Works in a mobile or tablet browser (iPhone, Android, iPad). Add to the Home Screen for a full-screen app. Portrait and landscape are supported, with larger tap targets on touch screens.

### Permanent Safari / phone URL

GitHub Pages is not on yet in this repo’s settings. Turn it on once:

1. Open **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**, or **Deploy from a branch** `gh-pages` / `/`
3. The game will be at `https://kytemacbeath92-ship-it.github.io/kidslearning-/`

Use that HTTPS address in iPhone/iPad Safari. Add to Home Screen for a full-screen app.

## How it works

- **10 gated levels** from preschool through 2nd grade only. Content gets harder with each world, but never past that year’s ceiling.
- Every level mixes the world theme with **math quizzes** and **spelling games** (tap-the-word, missing letters, and tap-to-spell).
- Each level is **10 illustrated mini-games**. Score **at least 80%** (8/10) to unlock the next level.
- Stars: 1 at 80%, 2 at 90%, 3 at 100%.
- Bright cartoon pictures, bouncing hunt games, spoken questions, and sound effects.
- Progress is saved in the browser (`localStorage`). Grown-ups can view scores and reset.

## Levels

| Level | World | Grade ceiling | Math | Spelling |
| --- | --- | --- | --- | --- |
| 1 | Rainbow World | Preschool | Count 1–5 | First letter |
| 2 | Letter Land A–M | Preschool | Count 1–5 | First-letter spelling |
| 3 | Farm Friends | Pre-K | Count 1–10 | First letter of animal names |
| 4 | Letter Land N–Z | Pre-K | Count to 10, more/less | Beginning sounds |
| 5 | Number Jungle | Kindergarten | Count to 20, add to 5 | CVC words (cat, sun) |
| 6 | Wild Safari | Kindergarten | Add/sub within 10 | Spell CVC words |
| 7 | Math Castle | 1st Grade | Add/sub within 20 | CVC and blends (frog, tree) |
| 8 | Word Zoo | 1st Grade | Add/sub quiz within 20 | Sight words (the, said) |
| 9 | World Explorers | 2nd Grade | Add tens within 100 | Silent-e (kite, cake) |
| 10 | Super Scholars | 2nd Grade | Skip count, groups of 2/5/10 | Country names, 4-letter words |

## Tests

```bash
npm test
```
