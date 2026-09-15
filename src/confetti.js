const colors = ['#FF3B5C', '#FFD56A', '#7C5CFF', '#4CD964', '#5AD2FF', '#FF8A3D', '#FF7AD9'];

export function burstConfetti(duration = 1400) {
  const canvas = document.getElementById('confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const bits = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  for (let i = 0; i < 90; i += 1) {
    bits.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 80,
      r: 4 + Math.random() * 6,
      c: colors[i % colors.length],
      vy: 3 + Math.random() * 4,
      vx: -2 + Math.random() * 4,
      a: Math.random() * Math.PI,
      va: 0.1 + Math.random() * 0.2,
    });
  }
  const start = performance.now();
  function tick(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach((b) => {
      b.x += b.vx;
      b.y += b.vy;
      b.a += b.va;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.a);
      ctx.fillStyle = b.c;
      ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r);
      ctx.restore();
    });
    if (now - start < duration) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(tick);
}
