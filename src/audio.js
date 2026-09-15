let ctx;
let enabled = true;
let speechEnabled = true;

export function setSoundOn(on) {
  enabled = on;
}

export function setSpeechOn(on) {
  speechEnabled = on;
  if (!on && window.speechSynthesis) window.speechSynthesis.cancel();
}

export function unlockAudio() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
}

function tone(freq, time, duration, type = 'sine', gain = 0.08, slideTo) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + time + duration);
  }
  amp.gain.setValueAtTime(0.0001, ctx.currentTime + time);
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + time + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + duration);
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(ctx.currentTime + time);
  osc.stop(ctx.currentTime + time + duration + 0.02);
}

export function play(name) {
  if (!enabled) return;
  unlockAudio();
  if (!ctx) return;
  if (name === 'tap') {
    tone(520, 0, 0.08, 'triangle', 0.05);
  } else if (name === 'pop') {
    tone(320, 0, 0.12, 'square', 0.04, 180);
  } else if (name === 'correct') {
    tone(523, 0, 0.12, 'triangle', 0.08);
    tone(659, 0.09, 0.12, 'triangle', 0.08);
    tone(784, 0.18, 0.18, 'triangle', 0.09);
  } else if (name === 'wrong') {
    tone(330, 0, 0.16, 'sine', 0.05, 220);
  } else if (name === 'star') {
    tone(784, 0, 0.1, 'sine', 0.07);
    tone(988, 0.1, 0.16, 'sine', 0.07);
  } else if (name === 'fanfare') {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.12, 0.22, 'triangle', 0.09));
  } else if (name === 'lock') {
    tone(180, 0, 0.14, 'square', 0.03);
  } else if (name === 'whoosh') {
    tone(240, 0, 0.2, 'sawtooth', 0.03, 520);
  }
}

export function speak(text) {
  if (!speechEnabled || !text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 1.18;
  utterance.volume = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const friendly = voices.find((v) => /child|kid|samantha|google us|female/i.test(`${v.name} ${v.lang}`));
  if (friendly) utterance.voice = friendly;
  window.speechSynthesis.speak(utterance);
}
