import {
  animals,
  colorBlob,
  continentMap,
  countGroup,
  draw,
  flag,
  habitat,
  landmark,
  letterCard,
  mascot,
  numberCard,
  objects,
  paintMix,
} from './illustrations.js';
import { QUESTIONS_PER_LEVEL, pickN, shuffle, withShuffledChoices } from './scoring.js';

export const COLORS = [
  { id: 'red', name: 'Red', hex: '#FF3B5C', object: 'strawberry' },
  { id: 'blue', name: 'Blue', hex: '#5AD2FF', object: 'bird' },
  { id: 'yellow', name: 'Yellow', hex: '#FFD56A', object: 'sun' },
  { id: 'green', name: 'Green', hex: '#4CD964', object: 'frog' },
  { id: 'orange', name: 'Orange', hex: '#FF8A3D', object: 'orange' },
  { id: 'purple', name: 'Purple', hex: '#7C5CFF', object: 'grapes' },
  { id: 'pink', name: 'Pink', hex: '#FF7AD9', object: 'flower' },
  { id: 'brown', name: 'Brown', hex: '#8B5A2B', object: 'bear' },
];

const LETTERS_AM = [
  ['A', 'apple'], ['B', 'ball'], ['C', 'cat'], ['D', 'dog'], ['E', 'egg'],
  ['F', 'fish'], ['G', 'grapes'], ['H', 'hat'], ['I', 'icecream'], ['J', 'juice'],
  ['K', 'kite'], ['L', 'leaf'], ['M', 'moon'],
];

const LETTERS_NZ = [
  ['N', 'nest'], ['O', 'orange'], ['P', 'pizza'], ['Q', 'crown'], ['R', 'rainbow'],
  ['S', 'sun'], ['T', 'tree'], ['U', 'umbrella'], ['V', 'violin'], ['W', 'watermelon'],
  ['X', 'xylophone'], ['Y', 'yarn'], ['Z', 'zebra'],
];

const FARM = [
  { id: 'cow', name: 'Cow', sound: 'moo' },
  { id: 'pig', name: 'Pig', sound: 'oink' },
  { id: 'chicken', name: 'Chicken', sound: 'cluck' },
  { id: 'horse', name: 'Horse', sound: 'neigh' },
  { id: 'sheep', name: 'Sheep', sound: 'baa' },
  { id: 'duck', name: 'Duck', sound: 'quack' },
  { id: 'dog', name: 'Dog', sound: 'woof' },
  { id: 'cat', name: 'Cat', sound: 'meow' },
];

const WILD = [
  { id: 'lion', name: 'Lion', habitat: 'jungle' },
  { id: 'elephant', name: 'Elephant', habitat: 'jungle' },
  { id: 'giraffe', name: 'Giraffe', habitat: 'jungle' },
  { id: 'monkey', name: 'Monkey', habitat: 'jungle' },
  { id: 'tiger', name: 'Tiger', habitat: 'jungle' },
  { id: 'zebra', name: 'Zebra', habitat: 'jungle' },
  { id: 'penguin', name: 'Penguin', habitat: 'arctic' },
  { id: 'whale', name: 'Whale', habitat: 'ocean' },
  { id: 'panda', name: 'Panda', habitat: 'jungle' },
  { id: 'fox', name: 'Fox', habitat: 'jungle' },
];

export const COUNTRIES = [
  { id: 'usa', name: 'United States', capital: 'Washington, D.C.', continent: 'north-america', landmark: 'liberty', landmarkName: 'Statue of Liberty' },
  { id: 'uk', name: 'United Kingdom', capital: 'London', continent: 'europe', landmark: 'bigben', landmarkName: 'Big Ben' },
  { id: 'france', name: 'France', capital: 'Paris', continent: 'europe', landmark: 'eiffel', landmarkName: 'Eiffel Tower' },
  { id: 'japan', name: 'Japan', capital: 'Tokyo', continent: 'asia', landmark: 'fuji', landmarkName: 'Mount Fuji' },
  { id: 'australia', name: 'Australia', capital: 'Canberra', continent: 'oceania', landmark: 'opera', landmarkName: 'Sydney Opera House' },
  { id: 'brazil', name: 'Brazil', capital: 'Brasilia', continent: 'south-america', landmark: 'redeemer', landmarkName: 'Christ the Redeemer' },
  { id: 'egypt', name: 'Egypt', capital: 'Cairo', continent: 'africa', landmark: 'pyramid', landmarkName: 'the Pyramids' },
  { id: 'china', name: 'China', capital: 'Beijing', continent: 'asia', landmark: 'wall', landmarkName: 'the Great Wall' },
  { id: 'india', name: 'India', capital: 'New Delhi', continent: 'asia', landmark: 'taj', landmarkName: 'the Taj Mahal' },
  { id: 'canada', name: 'Canada', capital: 'Ottawa', continent: 'north-america', landmark: 'liberty', landmarkName: 'maple forests' },
  { id: 'italy', name: 'Italy', capital: 'Rome', continent: 'europe', landmark: 'colosseum', landmarkName: 'the Colosseum' },
  { id: 'mexico', name: 'Mexico', capital: 'Mexico City', continent: 'north-america', landmark: 'pyramid', landmarkName: 'Chichen Itza' },
];

const CONTINENTS = [
  { id: 'north-america', name: 'North America' },
  { id: 'south-america', name: 'South America' },
  { id: 'europe', name: 'Europe' },
  { id: 'africa', name: 'Africa' },
  { id: 'asia', name: 'Asia' },
  { id: 'oceania', name: 'Australia / Oceania' },
  { id: 'antarctica', name: 'Antarctica' },
];

export const LEVELS = [
  {
    id: 1,
    title: 'Rainbow World',
    subtitle: 'Colors · count 1–5 · first letters',
    ages: 'Ages 3–4',
    grade: 'Preschool',
    subject: 'colours',
    art: 'rainbow',
    accent: '#FF3B5C',
  },
  {
    id: 2,
    title: 'Letter Land A–M',
    subtitle: 'A–M · count 1–5 · first-letter spelling',
    ages: 'Ages 3–5',
    grade: 'Preschool',
    subject: 'alphabet',
    art: 'letter-A',
    accent: '#7C5CFF',
  },
  {
    id: 3,
    title: 'Farm Friends',
    subtitle: 'Farm animals · count 1–10 · first letters',
    ages: 'Ages 4–5',
    grade: 'Pre-K',
    subject: 'animals',
    art: 'cow',
    accent: '#4CD964',
  },
  {
    id: 4,
    title: 'Letter Land N–Z',
    subtitle: 'N–Z · count to 10 · beginning sounds',
    ages: 'Ages 4–5',
    grade: 'Pre-K',
    subject: 'alphabet',
    art: 'zebra',
    accent: '#FF8A3D',
  },
  {
    id: 5,
    title: 'Number Jungle',
    subtitle: 'Count to 20 · add to 5 · CVC spelling',
    ages: 'Ages 5–6',
    grade: 'Kindergarten',
    subject: 'math',
    art: 'star',
    accent: '#5AD2FF',
  },
  {
    id: 6,
    title: 'Wild Safari',
    subtitle: 'Animals · add to 10 · CVC spelling',
    ages: 'Ages 5–6',
    grade: 'Kindergarten',
    subject: 'animals',
    art: 'lion',
    accent: '#FF8A3D',
  },
  {
    id: 7,
    title: 'Math Castle',
    subtitle: 'Add/sub to 20 · CVC & blend spelling',
    ages: 'Ages 6–7',
    grade: '1st Grade',
    subject: 'math',
    art: 'apple',
    accent: '#C77DFF',
  },
  {
    id: 8,
    title: 'Word Zoo',
    subtitle: 'Sight words · add/sub quiz · habitats',
    ages: 'Ages 6–7',
    grade: '1st Grade',
    subject: 'alphabet',
    art: 'book',
    accent: '#4CD964',
  },
  {
    id: 9,
    title: 'World Explorers',
    subtitle: 'Flags · add tens to 100 · silent-e spelling',
    ages: 'Ages 7–8',
    grade: '2nd Grade',
    subject: 'countries',
    art: 'flag-japan',
    accent: '#5AD2FF',
  },
  {
    id: 10,
    title: 'Super Scholars',
    subtitle: 'Capitals · skip count · 2nd-grade spelling',
    ages: 'Ages 7–8',
    grade: '2nd Grade',
    subject: 'countries',
    art: 'crown',
    accent: '#FFD56A',
  },
];

function uniqueOptions(correct, extras) {
  const values = [correct];
  extras.forEach((value) => {
    if (!values.includes(value) && value >= 0) values.push(value);
  });
  let filler = 0;
  while (values.length < 4) {
    if (!values.includes(filler)) values.push(filler);
    filler += 1;
  }
  return values.slice(0, 4);
}

function choice(prompt, speak, stemHtml, answers) {
  return withShuffledChoices({
    type: 'choice',
    prompt,
    speak,
    stem: stemHtml,
    choices: answers.map((a) => ({
      id: a.id,
      label: a.label,
      html: a.html,
      correct: Boolean(a.correct),
    })),
  });
}

function distractors(pool, keepId, n = 3) {
  return pickN(pool.filter((p) => (p.id || p[0]) !== keepId), n);
}

function colorQuestions() {
  const blobQs = COLORS.map((color) => {
    const wrong = distractors(COLORS, color.id).map((c) => ({
      id: c.id,
      label: c.name,
      html: colorBlob(c.hex),
      correct: false,
    }));
    return choice(
      `Tap the ${color.name.toUpperCase()} one!`,
      `Tap the ${color.name} one`,
      mascot('think'),
      [
        { id: color.id, label: color.name, html: colorBlob(color.hex), correct: true },
        ...wrong,
      ],
    );
  });
  const objectQs = COLORS.map((color) => {
    const wrong = distractors(COLORS, color.id).map((c) => ({
      id: c.id,
      label: c.name,
      html: colorBlob(c.hex),
      correct: false,
    }));
    return choice(
      `What color is this?`,
      `What color is this?`,
      draw(color.object),
      [
        { id: color.id, label: color.name, html: colorBlob(color.hex, color.name), correct: true },
        ...wrong,
      ],
    );
  });
  const huntQs = pickN(COLORS, 4).map((color) => ({
    type: 'hunt',
    prompt: `Catch the ${color.name} one!`,
    speak: `Catch the ${color.name} one`,
    items: shuffle([
      { id: color.id, html: colorBlob(color.hex), correct: true, label: color.name },
      ...distractors(COLORS, color.id, 5).map((c) => ({
        id: c.id,
        html: colorBlob(c.hex),
        correct: false,
        label: c.name,
      })),
    ]),
  }));
  return [...blobQs, ...objectQs, ...huntQs];
}

function alphabetQuestions(pairs) {
  const pictureToLetter = pairs.map(([letter, pic]) => {
    const wrong = distractors(pairs.map((p) => ({ id: p[0], pic: p[1] })), letter).map((p) => ({
      id: p.id,
      label: p.id,
      html: letterCard(p.id),
      correct: false,
    }));
    return choice(
      `Which letter starts this picture?`,
      `${pic}. Which letter?`,
      draw(pic),
      [
        { id: letter, label: letter, html: letterCard(letter), correct: true },
        ...wrong,
      ],
    );
  });
  const letterToPicture = pairs.map(([letter, pic]) => {
    const wrong = distractors(pairs.map((p) => ({ id: p[1] })), pic).map((p) => ({
      id: p.id,
      label: p.id,
      html: draw(p.id),
      correct: false,
    }));
    return choice(
      `Letter ${letter} is for...`,
      `Letter ${letter} is for what?`,
      letterCard(letter),
      [
        { id: pic, label: pic, html: draw(pic), correct: true },
        ...wrong,
      ],
    );
  });
  const hunt = pickN(pairs, 3).map(([letter, pic]) => ({
    type: 'hunt',
    prompt: `Find the picture for ${letter}!`,
    speak: `Find the picture for letter ${letter}`,
    items: shuffle([
      { id: pic, html: draw(pic), correct: true, label: pic },
      ...distractors(pairs.map((p) => ({ id: p[1] })), pic, 5).map((p) => ({
        id: p.id,
        html: draw(p.id),
        correct: false,
        label: p.id,
      })),
    ]),
  }));
  return [...pictureToLetter, ...letterToPicture, ...hunt];
}

function farmQuestions() {
  const identifyFixed = FARM.map((animal) => {
    const wrong = distractors(FARM, animal.id).map((a) => ({
      id: a.id,
      label: a.name,
      html: animals[a.id](),
      correct: false,
    }));
    return choice(
      'Which animal is this?',
      'Which animal is this?',
      animals[animal.id](),
      [
        { id: animal.id, label: animal.name, html: `<div class="word-chip">${animal.name}</div>`, correct: true },
        ...wrong.map((w) => ({ ...w, html: `<div class="word-chip">${w.label}</div>` })),
      ],
    );
  });
  const soundQs = FARM.map((animal) => {
    const wrong = distractors(FARM, animal.id).map((a) => ({
      id: a.id,
      label: a.name,
      html: animals[a.id](),
      correct: false,
    }));
    return choice(
      `Who says “${animal.sound}”?`,
      `Who says ${animal.sound}?`,
      mascot('happy'),
      [
        { id: animal.id, label: animal.name, html: animals[animal.id](), correct: true },
        ...wrong,
      ],
    );
  });
  const hunt = pickN(FARM, 3).map((animal) => ({
    type: 'hunt',
    prompt: `Catch the ${animal.name}!`,
    speak: `Catch the ${animal.name}`,
    items: shuffle([
      { id: animal.id, html: animals[animal.id](), correct: true, label: animal.name },
      ...distractors(FARM, animal.id, 5).map((a) => ({
        id: a.id,
        html: animals[a.id](),
        correct: false,
        label: a.name,
      })),
    ]),
  }));
  return [...identifyFixed, ...soundQs, ...hunt];
}

function mathCountQuestions() {
  const qs = [];
  for (let n = 1; n <= 10; n += 1) {
    const item = n % 2 === 0 ? objects.apple : objects.star;
    const itemName = n % 2 === 0 ? 'apples' : 'stars';
    const options = uniqueOptions(n, [n - 1, n + 1, n === 4 ? 7 : 4, n + 2, n - 2]);
    qs.push(
      choice(
        `How many ${itemName}?`,
        `How many ${itemName}?`,
        countGroup(item, n),
        options.map((num) => ({
          id: `n${num}`,
          label: String(num),
          html: numberCard(num),
          correct: num === n,
        })),
      ),
    );
  }
  qs.push({
    type: 'hunt',
    prompt: 'Tap the group of 5 stars!',
    speak: 'Tap the group of 5 stars',
    items: shuffle([
      { id: 'five', html: countGroup(objects.star, 5), correct: true, label: '5' },
      { id: 'two', html: countGroup(objects.star, 2), correct: false, label: '2' },
      { id: 'seven', html: countGroup(objects.apple, 7), correct: false, label: '7' },
      { id: 'three', html: countGroup(objects.balloon, 3), correct: false, label: '3' },
      { id: 'nine', html: countGroup(objects.apple, 9), correct: false, label: '9' },
      { id: 'one', html: countGroup(objects.balloon, 1), correct: false, label: '1' },
    ]),
  });
  const moreLess = [3, 5, 8].map((n) =>
    choice(
      'Which group has MORE?',
      'Which group has more?',
      mascot('think'),
      shuffle([
        { id: 'more', label: String(n + 2), html: countGroup(objects.apple, n + 2), correct: true },
        { id: 'less', label: String(n), html: countGroup(objects.apple, n), correct: false },
        { id: 'tiny', label: '1', html: countGroup(objects.apple, 1), correct: false },
        { id: 'mid', label: String(n - 1), html: countGroup(objects.apple, Math.max(1, n - 1)), correct: false },
      ]),
    ),
  );
  return [...qs, ...moreLess];
}

function wildQuestions() {
  const identify = WILD.map((animal) => {
    const wrong = distractors(WILD, animal.id).map((a) => ({
      id: a.id,
      label: a.name,
      html: animals[a.id](),
      correct: false,
    }));
    return choice(
      'Which wild animal is this?',
      `Which wild animal is this?`,
      animals[animal.id](),
      [
        { id: animal.id, label: animal.name, html: `<div class="word-chip">${animal.name}</div>`, correct: true },
        ...wrong.map((w) => ({ ...w, html: `<div class="word-chip">${w.label}</div>` })),
      ],
    );
  });
  const mixes = [
    ['#FF3B5C', '#FFD56A', '#FF8A3D', 'Orange', 'Red plus yellow makes orange'],
    ['#5AD2FF', '#FFD56A', '#4CD964', 'Green', 'Blue plus yellow makes green'],
    ['#FF3B5C', '#5AD2FF', '#7C5CFF', 'Purple', 'Red plus blue makes purple'],
  ].map(([a, b, r, name, speak]) =>
    choice(
      'Mix the paints! What color appears?',
      speak,
      paintMix(a, b, r),
      shuffle([
        { id: name, label: name, html: colorBlob(r, name), correct: true },
        { id: 'red', label: 'Red', html: colorBlob('#FF3B5C', 'Red'), correct: false },
        { id: 'blue', label: 'Blue', html: colorBlob('#5AD2FF', 'Blue'), correct: false },
        { id: 'yellow', label: 'Yellow', html: colorBlob('#FFD56A', 'Yellow'), correct: false },
      ]),
    ),
  );
  const hunt = pickN(WILD, 3).map((animal) => ({
    type: 'hunt',
    prompt: `Catch the ${animal.name}!`,
    speak: `Catch the ${animal.name}`,
    items: shuffle([
      { id: animal.id, html: animals[animal.id](), correct: true, label: animal.name },
      ...distractors(WILD, animal.id, 5).map((a) => ({
        id: a.id,
        html: animals[a.id](),
        correct: false,
        label: a.name,
      })),
    ]),
  }));
  return [...identify, ...mixes, ...hunt];
}

function addSubQuestions() {
  const adds = [
    [1, 2], [2, 2], [3, 1], [4, 2], [5, 3], [3, 3], [6, 2], [4, 5],
  ].map(([a, b]) => {
    const sum = a + b;
    const options = uniqueOptions(sum, [sum + 1, sum - 1, sum + 2, a, b]);
    return choice(
      `${a} + ${b} = ?`,
      `${a} plus ${b} equals what?`,
      `<div class="equation">${countGroup(objects.apple, a)}<span class="plus">+</span>${countGroup(objects.apple, b)}</div>`,
      options.map((n) => ({
        id: `s${n}`,
        label: String(n),
        html: numberCard(n),
        correct: n === sum,
      })),
    );
  });
  const subs = [
    [5, 2], [6, 1], [8, 3], [7, 4], [10, 2], [9, 5],
  ].map(([a, b]) => {
    const diff = a - b;
    const options = uniqueOptions(diff, [diff + 1, diff - 1, diff + 2, a, b]);
    return choice(
      `${a} − ${b} = ?`,
      `${a} minus ${b} equals what?`,
      `<div class="equation">${countGroup(objects.balloon, a)}<span class="plus">−</span>${countGroup(objects.balloon, b)}</div>`,
      options.map((n) => ({
        id: `d${n}`,
        label: String(n),
        html: numberCard(n),
        correct: n === diff,
      })),
    );
  });
  return [...adds, ...subs];
}

function wordZooQuestions() {
  const habitats = WILD.map((animal) => {
    const options = ['jungle', 'ocean', 'arctic', 'farm'];
    return choice(
      `Where does the ${animal.name} live?`,
      `Where does the ${animal.name} live?`,
      animals[animal.id](),
      options.map((h) => ({
        id: h,
        label: h,
        html: habitat(h),
        correct: h === animal.habitat,
      })),
    );
  });
  const words = [
    ['CAT', 'cat'],
    ['DOG', 'dog'],
    ['SUN', 'sun'],
    ['HAT', 'hat'],
    ['PIG', 'pig'],
    ['BUS', 'firetruck'],
  ].map(([word, pic]) => {
    const wrong = pickN(['CAP', 'DOT', 'SAD', 'HIT', 'PEN', 'BAT'].filter((w) => w !== word), 3);
    return choice(
      'Pick the word that matches the picture.',
      `Which word matches this picture?`,
      draw(pic),
      shuffle([
        { id: word, label: word, html: `<div class="word-chip big">${word}</div>`, correct: true },
        ...wrong.map((w) => ({ id: w, label: w, html: `<div class="word-chip big">${w}</div>`, correct: false })),
      ]),
    );
  });
  const missing = [
    ['C_T', 'A', 'cat', ['O', 'E', 'I']],
    ['D_G', 'O', 'dog', ['A', 'I', 'U']],
    ['S_N', 'U', 'sun', ['A', 'E', 'O']],
    ['P_G', 'I', 'pig', ['A', 'E', 'O']],
  ].map(([pattern, letter, pic, wrong]) =>
    choice(
      `Fill in the missing letter: ${pattern}`,
      `Fill in the missing letter in ${pattern.replace('_', ' blank ')}`,
      draw(pic),
      shuffle([
        { id: letter, label: letter, html: letterCard(letter), correct: true },
        ...wrong.map((w) => ({ id: w, label: w, html: letterCard(w), correct: false })),
      ]),
    ),
  );
  return [...habitats, ...words, ...missing];
}

function countryQuestions() {
  const flagQs = COUNTRIES.map((c) => {
    const wrong = distractors(COUNTRIES, c.id).map((x) => ({
      id: x.id,
      label: x.name,
      html: flag(x.id),
      correct: false,
    }));
    return choice(
      `Which flag is ${c.name}?`,
      `Which flag is ${c.name}?`,
      mascot('think'),
      [
        { id: c.id, label: c.name, html: flag(c.id), correct: true },
        ...wrong,
      ],
    );
  });
  const landmarkQs = COUNTRIES.filter((c) => c.landmarkName !== 'maple forests').map((c) => {
    const wrong = distractors(
      COUNTRIES.filter((x) => x.landmark !== c.landmark),
      c.id,
    ).map((x) => ({
      id: x.id,
      label: x.landmarkName,
      html: landmark(x.landmark),
      correct: false,
    }));
    return choice(
      `${c.landmarkName} is in which country?`,
      `${c.landmarkName} is in which country?`,
      landmark(c.landmark),
      [
        { id: c.id, label: c.name, html: `<div class="word-chip">${c.name}</div>`, correct: true },
        ...wrong.map((w) => ({
          ...w,
          label: COUNTRIES.find((cc) => cc.id === w.id).name,
          html: `<div class="word-chip">${COUNTRIES.find((cc) => cc.id === w.id).name}</div>`,
        })),
      ],
    );
  });
  const mapQs = pickN(CONTINENTS.filter((c) => c.id !== 'antarctica'), 6).map((cont) => ({
    type: 'map',
    prompt: `Tap ${cont.name} on the map!`,
    speak: `Tap ${cont.name} on the map`,
    stem: continentMap(),
    answer: cont.id,
  }));
  return [...flagQs, ...landmarkQs, ...mapQs];
}

function scholarQuestions() {
  const capitalQs = COUNTRIES.map((c) => {
    const wrong = distractors(COUNTRIES, c.id).map((x) => ({
      id: x.capital,
      label: x.capital,
      html: `<div class="word-chip">${x.capital}</div>`,
      correct: false,
    }));
    return choice(
      `What is the capital of ${c.name}?`,
      `What is the capital of ${c.name}?`,
      flag(c.id),
      [
        { id: c.capital, label: c.capital, html: `<div class="word-chip">${c.capital}</div>`, correct: true },
        ...wrong,
      ],
    );
  });
  const continentQs = pickN(COUNTRIES, 8).map((c) => {
    const answer = CONTINENTS.find((x) => x.id === c.continent);
    const options = [...pickN(CONTINENTS.filter((x) => x.id !== c.continent), 3), answer];
    return choice(
      `${c.name} is on which continent?`,
      `${c.name} is on which continent?`,
      flag(c.id),
      options.map((cont) => ({
        id: cont.id,
        label: cont.name,
        html: `<div class="word-chip">${cont.name}</div>`,
        correct: cont.id === c.continent,
      })),
    );
  });
  const skip = [2, 5, 10].map((step) => {
    const seq = [step, step * 2, step * 3, '?', step * 5];
    const answer = step * 4;
    const options = uniqueOptions(answer, [answer + step, answer - step, answer + 1, step]);
    return choice(
      `Skip count: ${seq.join(', ')}`,
      `Skip count by ${step}. What number is missing?`,
      countGroup(step === 2 ? objects.star : step === 5 ? objects.apple : objects.balloon, step),
      options.map((n) => ({
        id: `k${n}`,
        label: String(n),
        html: numberCard(n),
        correct: n === answer,
      })),
    );
  });
  const groups = [
    [2, 3],
    [2, 4],
    [5, 2],
  ].map(([groupsCount, size]) => {
    const product = groupsCount * size;
    const options = uniqueOptions(product, [product + 2, product - 1, groupsCount + size, groupsCount, size]);
    return choice(
      `${groupsCount} groups of ${size} = ?`,
      `${groupsCount} groups of ${size} equals what?`,
      `<div class="equation">${Array.from({ length: groupsCount }, () => countGroup(objects.apple, size)).join('')}</div>`,
      options.map((n) => ({
        id: `p${n}`,
        label: String(n),
        html: numberCard(n),
        correct: n === product,
      })),
    );
  });
  const mapQs = pickN(CONTINENTS, 3).map((cont) => ({
    type: 'map',
    prompt: `Tap ${cont.name}!`,
    speak: `Tap ${cont.name}`,
    stem: continentMap(),
    answer: cont.id,
  }));
  return [...capitalQs, ...continentQs, ...skip, ...groups, ...mapQs];
}

function mathCount(min, max) {
  const qs = [];
  for (let n = min; n <= max; n += 1) {
    const item = n % 2 === 0 ? objects.apple : objects.star;
    const itemName = n % 2 === 0 ? 'apples' : 'stars';
    const options = uniqueOptions(n, [n - 1, n + 1, n + 2, Math.max(min, n - 2)]);
    qs.push({
      ...choice(
        `How many ${itemName}?`,
        `How many ${itemName}?`,
        countGroup(item, n),
        options.map((num) => ({
          id: `n${num}`,
          label: String(num),
          html: numberCard(num),
          correct: num === n,
        })),
      ),
      maxValue: max,
    });
  }
  return qs;
}

function mathMoreLess(max) {
  return [2, 3, Math.min(5, max - 2)].filter((n) => n > 0 && n + 2 <= max).map((n) => ({
    ...choice(
      'Which group has MORE?',
      'Which group has more?',
      mascot('think'),
      shuffle([
        { id: 'more', label: String(n + 2), html: countGroup(objects.apple, n + 2), correct: true },
        { id: 'less', label: String(n), html: countGroup(objects.apple, n), correct: false },
        { id: 'tiny', label: '1', html: countGroup(objects.apple, 1), correct: false },
        { id: 'mid', label: String(Math.max(1, n - 1)), html: countGroup(objects.balloon, Math.max(1, n - 1)), correct: false },
      ]),
    ),
    maxValue: max,
  }));
}

function mathAdd(pairs, max) {
  return pairs.filter(([a, b]) => a + b <= max).map(([a, b]) => {
    const sum = a + b;
    const options = uniqueOptions(sum, [sum + 1, sum - 1, sum + 2, a, b]);
    return {
      ...choice(
        `${a} + ${b} = ?`,
        `${a} plus ${b} equals what?`,
        `<div class="equation">${countGroup(objects.apple, a)}<span class="plus">+</span>${countGroup(objects.apple, b)}</div>`,
        options.map((n) => ({
          id: `s${n}`,
          label: String(n),
          html: numberCard(n),
          correct: n === sum,
        })),
      ),
      maxValue: max,
    };
  });
}

function mathSub(pairs, max) {
  return pairs.filter(([a, b]) => a <= max && a - b >= 0).map(([a, b]) => {
    const diff = a - b;
    const options = uniqueOptions(diff, [diff + 1, diff - 1, diff + 2, a, b]);
    return {
      ...choice(
        `${a} − ${b} = ?`,
        `${a} minus ${b} equals what?`,
        `<div class="equation">${countGroup(objects.balloon, a)}<span class="plus">−</span>${countGroup(objects.balloon, b)}</div>`,
        options.map((n) => ({
          id: `d${n}`,
          label: String(n),
          html: numberCard(n),
          correct: n === diff,
        })),
      ),
      maxValue: max,
    };
  });
}

function mathTens() {
  const pairs = [[20, 10], [40, 20], [50, 30], [30, 10], [60, 20]];
  return pairs.map(([a, b]) => {
    const sum = a + b;
    const options = uniqueOptions(sum, [sum + 10, sum - 10, a, b]);
    return {
      ...choice(
        `${a} + ${b} = ?`,
        `${a} plus ${b} equals what?`,
        `<div class="equation"><div class="word-chip big">${a}</div><span class="plus">+</span><div class="word-chip big">${b}</div></div>`,
        options.map((n) => ({
          id: `t${n}`,
          label: String(n),
          html: numberCard(n),
          correct: n === sum,
        })),
      ),
      maxValue: 100,
    };
  });
}

function mathSkipSecondGrade() {
  return [2, 5, 10].map((step) => {
    const seq = [step, step * 2, step * 3, '?', step * 5];
    const answer = step * 4;
    const options = uniqueOptions(answer, [answer + step, answer - step, answer + 1, step]);
    return {
      ...choice(
        `Skip count: ${seq.join(', ')}`,
        `Skip count by ${step}. What number is missing?`,
        countGroup(step === 2 ? objects.star : step === 5 ? objects.apple : objects.balloon, step),
        options.map((n) => ({
          id: `k${n}`,
          label: String(n),
          html: numberCard(n),
          correct: n === answer,
        })),
      ),
      maxValue: 50,
    };
  });
}

function mathGroupsSecondGrade() {
  return [[2, 3], [2, 4], [5, 2]].map(([groupsCount, size]) => {
    const product = groupsCount * size;
    const options = uniqueOptions(product, [product + 2, product - 1, groupsCount + size, size]);
    return {
      ...choice(
        `${groupsCount} groups of ${size} = ?`,
        `${groupsCount} groups of ${size} equals what?`,
        `<div class="equation">${Array.from({ length: groupsCount }, () => countGroup(objects.apple, size)).join('')}</div>`,
        options.map((n) => ({
          id: `p${n}`,
          label: String(n),
          html: numberCard(n),
          correct: n === product,
        })),
      ),
      maxValue: 10,
    };
  });
}

function firstLetterSpelling(pairs) {
  return pairs.map(([letter, pic]) => {
    const wrong = distractors(pairs.map((p) => ({ id: p[0] })), letter).map((p) => ({
      id: p.id,
      label: p.id,
      html: letterCard(p.id),
      correct: false,
    }));
    return choice(
      `Which letter starts this picture?`,
      `What letter does ${pic} start with?`,
      draw(pic),
      [
        { id: letter, label: letter, html: letterCard(letter), correct: true },
        ...wrong,
      ],
    );
  });
}

function spellingQuiz(items) {
  return items.map(({ word, pic, wrong }) =>
    choice(
      'Spelling quiz: which word matches the picture?',
      `Which word matches this picture?`,
      draw(pic),
      shuffle([
        { id: word, label: word, html: `<div class="word-chip big">${word}</div>`, correct: true },
        ...wrong.map((w) => ({ id: w, label: w, html: `<div class="word-chip big">${w}</div>`, correct: false })),
      ]),
    ),
  );
}

function missingLetterQuiz(items) {
  return items.map(({ pattern, letter, pic, wrong }) =>
    choice(
      `Spelling quiz: ${pattern}`,
      `Fill in the missing letter in ${pattern.replace('_', ' blank ')}`,
      draw(pic),
      shuffle([
        { id: letter, label: letter, html: letterCard(letter), correct: true },
        ...wrong.map((w) => ({ id: w, label: w, html: letterCard(w), correct: false })),
      ]),
    ),
  );
}

function spellWords(items, extraLetters) {
  return items.map(({ word, pic }) => {
    const letters = [...word.toUpperCase()];
    const extras = pickN(extraLetters.filter((l) => !letters.includes(l)), 2);
    return {
      type: 'spell',
      prompt: `Spell this word!`,
      speak: `Spell ${word.toLowerCase()}`,
      stem: draw(pic),
      word: word.toUpperCase(),
      tiles: shuffle([...letters, ...extras]),
      maxLetters: word.length,
    };
  });
}

const CVC = [
  { word: 'CAT', pic: 'cat', wrong: ['COT', 'CAP', 'CUT'] },
  { word: 'DOG', pic: 'dog', wrong: ['DIG', 'DOT', 'DUG'] },
  { word: 'SUN', pic: 'sun', wrong: ['SON', 'SIN', 'SAD'] },
  { word: 'HAT', pic: 'hat', wrong: ['HIT', 'HOT', 'HUT'] },
  { word: 'PIG', pic: 'pig', wrong: ['PEG', 'PAG', 'POD'] },
  { word: 'EGG', pic: 'egg', wrong: ['AGG', 'IGG', 'UG'] },
];

const BLENDS = [
  { word: 'FROG', pic: 'frog', wrong: ['FOG', 'FRG', 'FRAG'] },
  { word: 'TREE', pic: 'tree', wrong: ['TEE', 'TRY', 'TRE'] },
  { word: 'FISH', pic: 'fish', wrong: ['FESH', 'FOSH', 'FAS'] },
  { word: 'NEST', pic: 'nest', wrong: ['NAST', 'NOST', 'NET'] },
];

const SIGHT = [
  { word: 'THE', pic: 'book', wrong: ['TEH', 'THA', 'HTE'] },
  { word: 'AND', pic: 'book', wrong: ['ADN', 'NAD', 'END'] },
  { word: 'YOU', pic: 'sun', wrong: ['YUO', 'YOH', 'UOY'] },
  { word: 'SAID', pic: 'book', wrong: ['SIAD', 'SED', 'SAIDD'] },
];

const SILENT_E = [
  { word: 'KITE', pic: 'kite', wrong: ['KIT', 'KIET', 'KYTE'] },
  { word: 'CAKE', pic: 'cake', wrong: ['CAK', 'CAEK', 'CAKKE'] },
  { word: 'GAME', pic: 'ball', wrong: ['GAM', 'GAEM', 'GAMEE'] },
].map((item) => ({ ...item, wrong: item.wrong.filter((w) => w !== item.word).slice(0, 3) }));

function tag(list, skill) {
  return list.map((question) => ({ ...question, skill }));
}

function composeLevel(theme, math, spelling, mix) {
  return shuffle([
    ...pickN(tag(theme, 'explore'), mix.theme),
    ...pickN(tag(math, 'math'), mix.math),
    ...pickN(tag(spelling, 'spelling'), mix.spelling),
  ]);
}

const BUILDERS = {
  1: () => composeLevel(
    colorQuestions(),
    [...mathCount(1, 5), ...mathMoreLess(5)],
    firstLetterSpelling([['R', 'rainbow'], ['S', 'sun'], ['B', 'ball'], ['A', 'apple'], ['F', 'flower']]),
    { theme: 4, math: 3, spelling: 3 },
  ),
  2: () => composeLevel(
    alphabetQuestions(LETTERS_AM),
    mathCount(1, 5),
    firstLetterSpelling(LETTERS_AM),
    { theme: 4, math: 3, spelling: 3 },
  ),
  3: () => composeLevel(
    farmQuestions(),
    [...mathCount(1, 10), ...mathMoreLess(10)],
    firstLetterSpelling(FARM.map((a) => [a.name[0], a.id])),
    { theme: 4, math: 3, spelling: 3 },
  ),
  4: () => composeLevel(
    alphabetQuestions(LETTERS_NZ),
    [...mathCount(4, 10), ...mathMoreLess(10)],
    [
      ...firstLetterSpelling(LETTERS_NZ),
      ...missingLetterQuiz([
        { pattern: 'SU_', letter: 'N', pic: 'sun', wrong: ['T', 'P', 'M'] },
        { pattern: '_EST', letter: 'N', pic: 'nest', wrong: ['M', 'B', 'P'] },
      ]),
    ],
    { theme: 4, math: 3, spelling: 3 },
  ),
  5: () => composeLevel(
    mathCountQuestions(),
    [...mathCount(11, 20), ...mathAdd([[1, 1], [2, 1], [2, 2], [3, 1], [4, 1]], 5)],
    [...spellingQuiz(CVC), ...spellWords(CVC, ['B', 'M', 'R', 'L'])],
    { theme: 3, math: 4, spelling: 3 },
  ),
  6: () => composeLevel(
    wildQuestions(),
    [...mathAdd([[2, 3], [4, 2], [5, 3], [1, 6], [4, 4]], 10), ...mathSub([[8, 2], [7, 3], [10, 1], [6, 4]], 10)],
    [...spellWords(CVC, ['B', 'N', 'R', 'L']), ...spellingQuiz(CVC)],
    { theme: 4, math: 3, spelling: 3 },
  ),
  7: () => composeLevel(
    addSubQuestions(),
    [...mathAdd([[6, 7], [8, 5], [9, 4], [10, 8], [7, 7]], 20), ...mathSub([[15, 6], [18, 9], [14, 5], [20, 8]], 20)],
    [...spellWords([...CVC, ...BLENDS], ['S', 'P', 'L', 'N']), ...missingLetterQuiz([
      { pattern: 'FR_G', letter: 'O', pic: 'frog', wrong: ['A', 'E', 'I'] },
      { pattern: 'TR_E', letter: 'E', pic: 'tree', wrong: ['A', 'O', 'I'] },
    ])],
    { theme: 3, math: 4, spelling: 3 },
  ),
  8: () => composeLevel(
    wordZooQuestions(),
    [...mathAdd([[9, 8], [7, 6], [12, 5]], 20), ...mathSub([[16, 7], [19, 8], [13, 4]], 20)],
    [...spellingQuiz(SIGHT), ...spellWords(BLENDS, ['A', 'O', 'U', 'I']), ...missingLetterQuiz([
      { pattern: 'S_ID', letter: 'A', pic: 'book', wrong: ['E', 'I', 'O'] },
    ])],
    { theme: 3, math: 3, spelling: 4 },
  ),
  9: () => composeLevel(
    countryQuestions(),
    [...mathTens(), ...mathSub([[80, 10], [90, 20], [70, 30]], 100)],
    [...spellWords(SILENT_E, ['O', 'U', 'I', 'A']), ...spellingQuiz(SILENT_E)],
    { theme: 4, math: 3, spelling: 3 },
  ),
  10: () => composeLevel(
    scholarQuestions(),
    [...mathSkipSecondGrade(), ...mathGroupsSecondGrade(), ...mathTens()],
    [
      ...spellingQuiz([
        { word: 'JAPAN', pic: 'flag-japan', wrong: ['JAPEN', 'JPN', 'JAPN'] },
        { word: 'FRANCE', pic: 'flag-france', wrong: ['FRANS', 'FRANC', 'FRNSE'] },
        { word: 'EGYPT', pic: 'flag-egypt', wrong: ['EJYPT', 'EGYPTA', 'EGIPT'] },
        { word: 'ITALY', pic: 'flag-italy', wrong: ['ITALI', 'ITLY', 'ITALYY'] },
      ]),
      ...spellWords([{ word: 'LION', pic: 'lion' }, { word: 'BOOK', pic: 'book' }, { word: 'KITE', pic: 'kite' }], ['A', 'E', 'U']),
    ],
    { theme: 3, math: 4, spelling: 3 },
  ),
};

export function buildLevelQuestions(levelId) {
  const questions = BUILDERS[levelId]();
  return questions.map((q, index) => ({
    ...q,
    id: `l${levelId}-q${index + 1}`,
  }));
}

export function getLevel(id) {
  return LEVELS.find((l) => l.id === id);
}
