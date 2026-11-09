/**
 * Moves the hero illustration's end-effector along its planned path in sync with the
 * CSS path-drawing animation (6 s loop). Static at the goal when reduced motion is
 * preferred; no per-frame work while the illustration is off-screen.
 */
const LOOP_MS = 6000;
const TRAVEL = 0.55; // fraction of the loop spent travelling (matches the CSS keyframes)

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function initTrajectory(): void {
  const ee = document.querySelector<SVGGElement>('.traj__ee');
  const d = ee?.dataset['path'];
  if (!ee || !d || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  const length = path.getTotalLength();

  // Read the CSS path animation's clock so the marker and the drawn line never drift apart.
  const drawn = document.querySelector('.traj__path')?.getAnimations()[0];
  const startedAt = performance.now();
  const clock = (now: number) => {
    const t = drawn?.currentTime;
    return typeof t === 'number' ? t : now - startedAt;
  };

  let visible = true;
  const frame = (now: number) => {
    if (visible) {
      const phase = (clock(now) % LOOP_MS) / LOOP_MS;
      const progress = easeInOut(Math.min(phase / TRAVEL, 1));
      const point = path.getPointAtLength(progress * length);
      ee.style.transform = `translate(${point.x}px, ${point.y}px)`;
    }
    requestAnimationFrame(frame);
  };

  // Skip the per-frame work while the illustration is off-screen.
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
  }).observe(ee.ownerSVGElement ?? ee);

  requestAnimationFrame(frame);
}
