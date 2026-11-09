/** Media carousels rendered by `Gallery.astro` (`[data-carousel]`). */
import { hydrate } from './lazy-media';
import { onSwipe } from './swipe';

function setupCarousel(carousel: HTMLElement): void {
  const slides = [...carousel.querySelectorAll<HTMLElement>('.gallery__slide')];
  const dots = [...carousel.querySelectorAll<HTMLButtonElement>('.gallery__dot')];
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
    hydrate(slides[index]?.querySelector<HTMLImageElement | HTMLVideoElement>('img, video'));
    // The cross-page transition name follows the visible slide, so card → page morphs start
    // from the image the reader is looking at.
    const vtName = carousel.dataset['vtName'];
    if (vtName) {
      slides.forEach((slide, i) => {
        const media = slide.querySelector<HTMLElement>('img, video');
        if (media) media.style.viewTransitionName = i === index ? vtName : '';
      });
    }
    carousel.dispatchEvent(new CustomEvent('gallery:change', { bubbles: true }));
  };

  carousel.querySelector('.gallery__btn.prev')?.addEventListener('click', () => show(index - 1));
  carousel.querySelector('.gallery__btn.next')?.addEventListener('click', () => show(index + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));

  onSwipe(carousel, (direction) => show(index + direction));
}

export function initCarousels(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-carousel]').forEach(setupCarousel);
}
