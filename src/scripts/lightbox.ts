/**
 * Full-screen viewer for gallery media (`Lightbox.astro`). Clicking — or pressing
 * Enter/Space on — any `.gallery img` opens it with the rest of that gallery's media
 * (images and clips, in carousel order).
 * Where the View Transitions API is available (and motion is allowed), the image
 * morphs from its thumbnail into the viewer and back.
 */
import { PLACEHOLDER_SRC } from '@/lib/media';
import { hydrate } from './lazy-media';
import { onSwipe } from './swipe';

const MEDIA_IMG = '.gallery img';
const MORPH_NAME = 'lightbox-media';

const canMorph = () =>
  'startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Run `update` inside a view transition that morphs `from` into `to`. Both elements may
 * already carry a view-transition-name (cross-page card covers), so names are swapped
 * temporarily and restored afterwards. While it runs, `.lb-morphing` on <html> suspends
 * every other named element so nothing else is lifted above the backdrop.
 */
function morph(from: HTMLElement | null, to: HTMLElement, update: () => void | Promise<void>): void {
  if (!from || !canMorph()) {
    void update();
    return;
  }
  const root = document.documentElement;
  const fromName = from.style.viewTransitionName;
  const toName = to.style.viewTransitionName;
  root.classList.add('lb-morphing');
  from.dataset['morph'] = '';
  from.style.viewTransitionName = MORPH_NAME;
  const transition = document.startViewTransition(async () => {
    from.style.viewTransitionName = fromName;
    delete from.dataset['morph'];
    await update();
    to.dataset['morph'] = '';
    to.style.viewTransitionName = MORPH_NAME;
  });
  void transition.finished.finally(() => {
    to.style.viewTransitionName = toName;
    delete to.dataset['morph'];
    root.classList.remove('lb-morphing');
  });
}

/** Wait until the image can be painted (bounded, so a slow network never blocks the UI). */
const ready = (img: HTMLImageElement) =>
  Promise.race([img.decode().catch(() => undefined), new Promise((r) => setTimeout(r, 400))]);

type Media = HTMLImageElement | HTMLVideoElement;

export function initLightbox(): void {
  const lb = document.querySelector<HTMLElement>('.media-lightbox');
  const lbImg = lb?.querySelector<HTMLImageElement>('.lb-stage img');
  const lbVideo = lb?.querySelector<HTMLVideoElement>('.lb-stage video');
  const lbCaption = lb?.querySelector<HTMLElement>('.lb-caption');
  const closeBtn = lb?.querySelector<HTMLButtonElement>('.lb-close');
  if (!lb || !lbImg || !lbVideo || !lbCaption || !closeBtn) return;

  let gallery: Media[] = [];
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

  const captionOf = (media: Media) => {
    const figure = media.closest('figure');
    const label =
      media instanceof HTMLImageElement ? media.alt : figure?.querySelector('.sr-only')?.textContent;
    return figure?.querySelector('figcaption')?.textContent?.trim() || label?.trim() || '';
  };

  const stopVideo = () => {
    lbVideo.pause();
    lbVideo.removeAttribute('src');
    lbVideo.load();
  };

  /** The element currently shown on the stage (image or clip). */
  const stageMedia = (): HTMLElement => (lbVideo.hidden ? lbImg : lbVideo);

  const render = () => {
    const media = gallery[galleryIndex];
    if (!media) return;
    hydrate(media);
    if (media instanceof HTMLVideoElement) {
      lbImg.hidden = true;
      lbImg.src = PLACEHOLDER_SRC;
      lbVideo.hidden = false;
      lbVideo.poster = media.poster;
      lbVideo.src = media.src;
      if (canMorph()) void lbVideo.play().catch(() => undefined);
    } else {
      stopVideo();
      lbVideo.hidden = true;
      lbImg.hidden = false;
      // Keep the card image's referrer policy (remote hosts may reject hotlinks with a Referer).
      lbImg.referrerPolicy = media.referrerPolicy;
      // `src`, not `currentSrc`: right after hydration `currentSrc` still points at the
      // placeholder until the real image has loaded.
      lbImg.src = media.src;
      lbImg.alt = media.alt;
    }
    const counter = gallery.length > 1 ? ` · ${galleryIndex + 1} / ${gallery.length}` : '';
    lbCaption.textContent = captionOf(media) + counter;
    lb.classList.toggle('is-single', gallery.length < 2);
  };

  const open = (img: HTMLImageElement) => {
    const container = img.closest('.gallery');
    gallery = container ? [...container.querySelectorAll<Media>('img, video')] : [img];
    galleryIndex = Math.max(0, gallery.indexOf(img));
    opener = img;
    morph(img, lbImg, async () => {
      render();
      lb.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      setBackgroundInert(true);
      closeBtn.focus();
      await ready(lbImg);
    });
  };

  const close = () => {
    const target = opener;
    // Morph back only if the viewer still shows the image that opened it.
    const morphBack = target && gallery[galleryIndex] === target;
    const finish = () => {
      lb.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      setBackgroundInert(false);
      stopVideo();
      lbImg.src = PLACEHOLDER_SRC;
      gallery = [];
      opener = null;
      // Background is interactive again, so focus can return to the image that opened it.
      target?.focus();
    };
    if (morphBack) morph(stageMedia(), target, finish);
    else finish();
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
