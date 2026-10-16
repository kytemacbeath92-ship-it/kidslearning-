let ctx;
let enabled = true;

export function setSoundOn(on) {
  enabled = on;
}

export function isSoundOn() {
  return enabled;
}

export function unlockAudio() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ctx = new AudioCtx();
  }
  if (ctx.state === 'suspended') ctx.resume();
}

function tone(freq, time, duration, type = 'sine', gain = 0.07, slideTo) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + time);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + time + duration);
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
  if (name === 'tap') tone(480, 0, 0.07, 'triangle', 0.04);
  else if (name === 'hit') {
    tone(180, 0, 0.09, 'square', 0.05, 90);
    tone(420, 0.02, 0.08, 'sawtooth', 0.03);
  } else if (name === 'crit') {
    tone(520, 0, 0.1, 'square', 0.05);
    tone(780, 0.08, 0.12, 'triangle', 0.05);
  } else if (name === 'heal') {
    tone(392, 0, 0.12, 'sine', 0.05);
    tone(523, 0.1, 0.16, 'sine', 0.05);
  } else if (name === 'bind') {
    tone(330, 0, 0.12, 'triangle', 0.05, 620);
    tone(620, 0.12, 0.18, 'sine', 0.05);
  } else if (name === 'win') {
    [392, 494, 587, 784].forEach((f, i) => tone(f, i * 0.1, 0.2, 'triangle', 0.06));
  } else if (name === 'lose') tone(220, 0, 0.28, 'sine', 0.05, 110);
  else if (name === 'talk') tone(240, 0, 0.08, 'triangle', 0.03);
  else if (name === 'shrine') {
    tone(262, 0, 0.18, 'sine', 0.05);
    tone(392, 0.16, 0.22, 'sine', 0.05);
    tone(523, 0.32, 0.28, 'sine', 0.06);
  } else if (name === 'step') tone(140, 0, 0.04, 'sine', 0.015);
}
