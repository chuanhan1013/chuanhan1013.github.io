/** Media carousels rendered by `FeatureMedia.astro` (`[data-carousel]`). */
import { hydrate } from './lazy-media';

const SWIPE_THRESHOLD_PX = 45;

function setupCarousel(carousel: HTMLElement): void {
  const slides = [...carousel.querySelectorAll<HTMLElement>('.carousel-slide')];
  const dots = [...carousel.querySelectorAll<HTMLButtonElement>('.carousel-dot')];
  if (slides.length < 2) return;

  let index = Math.max(
    0,
    slides.findIndex((slide) => slide.classList.contains('is-active')),
  );

  const show = (next: number) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      // Hidden slides are only transparent; `inert` also drops them from tab order and the a11y tree.
      slide.inert = i !== index;
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      if (i === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    hydrate(slides[index]?.querySelector('img'));
  };

  carousel.querySelector('.carousel-btn.prev')?.addEventListener('click', () => show(index - 1));
  carousel.querySelector('.carousel-btn.next')?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  let startX: number | null = null;
  carousel.addEventListener(
    'touchstart',
    (event) => {
      startX = event.touches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  carousel.addEventListener(
    'touchend',
    (event) => {
      const endX = event.changedTouches[0]?.clientX;
      if (startX === null || endX === undefined) return;
      const dx = endX - startX;
      startX = null;
      if (Math.abs(dx) > SWIPE_THRESHOLD_PX) show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
}

export function initCarousels(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setupCarousel);
}
