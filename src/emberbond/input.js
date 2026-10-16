export function createInput(root) {
  const keys = new Set();
  const joy = { x: 0, y: 0, active: false };
  let nav = null;
  let pointerId = null;

  const onKeyDown = (event) => {
    keys.add(event.key);
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
      event.preventDefault();
    }
  };
  const onKeyUp = (event) => keys.delete(event.key);

  const base = root.querySelector('.joy-base');
  const knob = root.querySelector('.joy-knob');

  function setKnob(x, y) {
    if (!knob) return;
    knob.style.transform = `translate(${x * 34}px, ${y * 34}px)`;
  }

  function readStick(event) {
    if (!base) return;
    const rect = base.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let x = (event.clientX - cx) / (rect.width / 2);
    let y = (event.clientY - cy) / (rect.height / 2);
    const mag = Math.hypot(x, y);
    if (mag > 1) {
      x /= mag;
      y /= mag;
    }
    joy.x = x;
    joy.y = y;
    joy.active = mag > 0.12;
    setKnob(joy.x, joy.y);
  }

  function endStick() {
    joy.x = 0;
    joy.y = 0;
    joy.active = false;
    pointerId = null;
    setKnob(0, 0);
  }

  const onPointerDown = (event) => {
    if (!base) return;
    pointerId = event.pointerId;
    base.setPointerCapture?.(pointerId);
    nav = null;
    readStick(event);
  };
  const onPointerMove = (event) => {
    if (pointerId == null || event.pointerId !== pointerId) return;
    readStick(event);
  };
  const onPointerUp = (event) => {
    if (event.pointerId !== pointerId) return;
    endStick();
  };

  base?.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return {
    vector() {
      let x = joy.x;
      let y = joy.y;
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) x -= 1;
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) x += 1;
      if (keys.has('ArrowUp') || keys.has('w') || keys.has('W')) y -= 1;
      if (keys.has('ArrowDown') || keys.has('s') || keys.has('S')) y += 1;
      const mag = Math.hypot(x, y);
      if (mag < 0.18 && !nav) return { x: 0, y: 0, mag: 0, run: false, nav: null };
      if (mag >= 0.18) nav = null;
      const nx = mag >= 0.18 ? x / mag : 0;
      const ny = mag >= 0.18 ? y / mag : 0;
      return {
        x: nx,
        y: ny,
        mag: Math.min(1, mag),
        run: keys.has('Shift') || mag > 0.84,
        interact: keys.has(' ') || keys.has('e') || keys.has('E') || keys.has('Enter'),
        menu: keys.has('Escape') || keys.has('m') || keys.has('M'),
        nav,
      };
    },
    setNav(worldX, worldY) {
      if (joy.active) return;
      nav = { x: worldX, y: worldY };
    },
    clearNav() {
      nav = null;
    },
    consume(keySet) {
      keySet.forEach((key) => keys.delete(key));
    },
    destroy() {
      base?.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
  };
}
