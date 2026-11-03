/**
 * Full-screen viewer for card media (`Lightbox.astro`). Clicking — or pressing
 * Enter/Space on — any `.feature-media img` opens it with the rest of that card's
 * media as the gallery.
 */
import { PLACEHOLDER_SRC } from '@/lib/media';
import { hydrate } from './lazy-media';

const SWIPE_THRESHOLD_PX = 45;
const MEDIA_IMG = '.feature-media img';

export function initLightbox(): void {
  const lb = document.querySelector<HTMLElement>('.media-lightbox');
  const lbImg = lb?.querySelector<HTMLImageElement>('.lb-stage img');
  const lbCaption = lb?.querySelector<HTMLElement>('.lb-caption');
  const closeBtn = lb?.querySelector<HTMLButtonElement>('.lb-close');
  if (!lb || !lbImg || !lbCaption || !closeBtn) return;

  let gallery: HTMLImageElement[] = [];
  let galleryIndex = 0;
  let opener: HTMLElement | null = null;

  const captionOf = (img: HTMLImageElement) =>
    img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';

  const render = () => {
    const img = gallery[galleryIndex];
    if (!img) return;
    hydrate(img);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    const counter = gallery.length > 1 ? ` · ${galleryIndex + 1} / ${gallery.length}` : '';
    lbCaption.textContent = captionOf(img) + counter;
    lb.classList.toggle('is-single', gallery.length < 2);
  };

  const open = (img: HTMLImageElement) => {
    const media = img.closest('.feature-media');
    gallery = media ? [...media.querySelectorAll('img')] : [img];
    galleryIndex = Math.max(0, gallery.indexOf(img));
    opener = img;
    render();
    lb.classList.add('is-open');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  };

  const close = () => {
    lb.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    lbImg.src = PLACEHOLDER_SRC;
    gallery = [];
    opener?.focus();
    opener = null;
  };

  const move = (delta: number) => {
    if (gallery.length < 2) return;
    galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length;
    render();
  };

  const isOpen = () => lb.classList.contains('is-open');

  document.addEventListener('click', (event) => {
    const img = (event.target as Element | null)?.closest?.<HTMLImageElement>(MEDIA_IMG);
    if (img) open(img);
  });
  document.addEventListener('keydown', (event) => {
    const img = (event.target as Element | null)?.closest?.<HTMLImageElement>(MEDIA_IMG);
    if (img && !isOpen() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      open(img);
      return;
    }
    if (!isOpen()) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowLeft') move(-1);
    else if (event.key === 'ArrowRight') move(1);
  });

  closeBtn.addEventListener('click', close);
  lb.querySelector('.lb-prev')?.addEventListener('click', () => move(-1));
  lb.querySelector('.lb-next')?.addEventListener('click', () => move(1));
  lb.addEventListener('click', (event) => {
    if (event.target === lb) close();
  });

  let touchX: number | null = null;
  lb.addEventListener(
    'touchstart',
    (event) => {
      touchX = event.touches[0]?.clientX ?? null;
    },
    { passive: true },
  );
  lb.addEventListener(
    'touchend',
    (event) => {
      const endX = event.changedTouches[0]?.clientX;
      if (touchX === null || endX === undefined) return;
      const dx = endX - touchX;
      touchX = null;
      if (Math.abs(dx) > SWIPE_THRESHOLD_PX) move(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
}
