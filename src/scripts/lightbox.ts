/**
 * Full-screen viewer for card media (`Lightbox.astro`). Clicking — or pressing
 * Enter/Space on — any `.feature-media img` opens it with the rest of that card's
 * media as the gallery.
 */
import { PLACEHOLDER_SRC } from '@/lib/media';
import { hydrate } from './lazy-media';
import { onSwipe } from './swipe';

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

  /** Modal behaviour: everything except the dialog is inert while it is open. */
  const setBackgroundInert = (inert: boolean) => {
    for (const el of document.body.children) {
      if (el !== lb && el instanceof HTMLElement && el.tagName !== 'SCRIPT') el.inert = inert;
    }
  };

  /** Visible, focusable controls inside the dialog (hidden prev/next are skipped). */
  const focusables = () =>
    [...lb.querySelectorAll<HTMLButtonElement>('button')].filter(
      (btn) => getComputedStyle(btn).visibility !== 'hidden',
    );

  const captionOf = (img: HTMLImageElement) =>
    img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || img.alt || '';

  const render = () => {
    const img = gallery[galleryIndex];
    if (!img) return;
    hydrate(img);
    // Keep the card image's referrer policy (remote hosts may reject hotlinks with a Referer).
    lbImg.referrerPolicy = img.referrerPolicy;
    // `img.src`, not `currentSrc`: right after hydration `currentSrc` still points at the
    // placeholder until the real image has loaded.
    lbImg.src = img.src;
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
    setBackgroundInert(true);
    closeBtn.focus();
  };

  const close = () => {
    lb.classList.remove('is-open');
    document.body.classList.remove('lightbox-open');
    setBackgroundInert(false);
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
    if (event.key === 'Tab') {
      // Wrap focus between the dialog's own controls.
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      const current = document.activeElement;
      if (event.shiftKey && (current === first || !lb.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !lb.contains(current))) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
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

  onSwipe(lb, move);
}
