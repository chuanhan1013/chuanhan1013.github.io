/**
 * Hero: the letters of the name make way for the robot arm and the obstacle in the film.
 *
 * The film is a pre-rendered loop, so the screen-space path of the arm and the ball is known
 * (`src/data/hero-track.json`, exported by docs/illustrations/fr3-avoidance/track.py). Each
 * frame we look up where they are, map that into the page, and push nearby letters away and
 * back in depth. Without JS, with reduced motion, or where the film sits above the text
 * (narrow screens), the name is plain static text.
 */
import track from '@/data/hero-track.json';

const WIDE = '(min-width: 861px)';
const REDUCED = '(prefers-reduced-motion: reduce)';

interface Letter {
  el: HTMLElement;
  /** Centre and size inside the heading, measured without transforms. */
  cx: number;
  cy: number;
  size: number;
  /** Smoothed state. */
  x: number;
  y: number;
  f: number;
}

export function initHeroAvoid(): void {
  const heading = document.querySelector<HTMLElement>('.hero__name');
  const film = document.querySelector<HTMLVideoElement>('.hero__film video');
  if (!heading || !film) return;
  const name: HTMLElement = heading;
  const video: HTMLVideoElement = film;
  if (!matchMedia(WIDE).matches || matchMedia(REDUCED).matches) return;

  // Split into letters, keeping the heading's accessible name.
  const text = name.textContent?.trim() ?? '';
  name.setAttribute('aria-label', text);
  name.textContent = '';
  const letters: Letter[] = [...text].map((ch) => {
    const el = document.createElement('span');
    el.className = 'hero__ch';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = ch === ' ' ? ' ' : ch;
    name.append(el);
    return { el, cx: 0, cy: 0, size: 0, x: 0, y: 0, f: 0 };
  });
  name.classList.add('is-split');

  const measure = () => {
    for (const l of letters) {
      l.cx = l.el.offsetLeft + l.el.offsetWidth / 2;
      l.cy = l.el.offsetTop + l.el.offsetHeight / 2;
      l.size = l.el.offsetHeight;
    }
  };
  measure();
  addEventListener('resize', measure);
  void document.fonts?.ready.then(measure);

  const { frames, fps, aspect, arm, ball } = track;
  const count = frames.length;
  const points = (frames[0]?.length ?? 0) / 2;

  let visible = false;
  let raf = 0;
  new IntersectionObserver(([entry]) => {
    visible = !!entry?.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(tick);
  }).observe(name);

  function tick() {
    raf = 0;
    if (!visible || !matchMedia(WIDE).matches) {
      for (const l of letters) l.el.style.transform = '';
      return;
    }
    raf = requestAnimationFrame(tick);

    // Film frame (interpolated) -> viewport coordinates of the arm points and the ball.
    const box = video.getBoundingClientRect();
    const scale = Math.min(box.width / aspect, box.height); // object-fit: contain
    const cw = scale * aspect;
    const ch = scale;
    const [px = 50, py = 50] = getComputedStyle(video)
      .objectPosition.split(' ')
      .map((v) => parseFloat(v));
    const ox = box.left + ((box.width - cw) * px) / 100;
    const oy = box.top + ((box.height - ch) * py) / 100;
    const playing = !video.paused && video.readyState >= 2;
    const at = (playing ? video.currentTime : 1.6) * fps;
    const i0 = Math.floor(at) % count;
    const i1 = (i0 + 1) % count;
    const mix = at - Math.floor(at);
    const a = frames[i0] ?? [];
    const b = frames[i1] ?? [];

    const origin = name.getBoundingClientRect();
    for (const l of letters) {
      const lx = origin.left + l.cx;
      const ly = origin.top + l.cy;
      let tx = 0;
      let ty = 0;
      let tf = 0;
      for (let p = 0; p < points; p++) {
        const x = ox + ((a[2 * p] ?? 0) * (1 - mix) + (b[2 * p] ?? 0) * mix) * cw;
        const y = oy + ((a[2 * p + 1] ?? 0) * (1 - mix) + (b[2 * p + 1] ?? 0) * mix) * ch;
        const radius = (p === points - 1 ? ball : arm) * ch;
        const reach = radius + l.size * 0.62;
        const dx = lx - x;
        const dy = ly - y;
        const dist = Math.hypot(dx, dy);
        if (dist >= reach) continue;
        const push = (1 - dist / reach) ** 2;
        if (push > tf) {
          tf = push;
          tx = (dx / (dist || 1)) * push * l.size * 0.42;
          ty = (dy / (dist || 1)) * push * l.size * 0.42;
        }
      }
      // Critically damped follow, so letters ease away and settle back.
      l.x += (tx - l.x) * 0.16;
      l.y += (ty - l.y) * 0.16;
      l.f += (tf - l.f) * 0.16;
      if (l.f < 0.002 && Math.abs(l.x) < 0.05 && Math.abs(l.y) < 0.05) {
        l.el.style.transform = '';
        continue;
      }
      const tilt = l.f * 38;
      const nx = l.x / (l.size * 0.42 || 1);
      const ny = l.y / (l.size * 0.42 || 1);
      l.el.style.transform =
        `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, ${(-l.f * 140).toFixed(1)}px) ` +
        `rotateY(${(nx * tilt).toFixed(2)}deg) rotateX(${(-ny * tilt).toFixed(2)}deg)`;
    }
  }
}
