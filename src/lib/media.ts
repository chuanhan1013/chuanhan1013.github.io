import type { MediaItem } from '@/data/types';

/**
 * 1×1 transparent GIF. Inactive carousel slides start with this and swap in their real
 * `data-src` only when shown, so large GIFs are not downloaded up front.
 */
export const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** CSS custom properties consumed by `.carousel-slide--*` in `media.css`. */
export function slideStyle(item: MediaItem): string | undefined {
  const vars: string[] = [];
  if (item.fit === 'cover' && item.position) vars.push(`--slide-position:${item.position}`);
  if (item.fit === 'contain' && item.padding) vars.push(`--slide-padding:${item.padding}`);
  if ((item.fit === 'contain' || item.fit === 'flush') && item.background) {
    vars.push(`--slide-bg:${item.background}`, `--slide-img-bg:${item.background}`);
  }
  return vars.length ? vars.join(';') : undefined;
}

/** Zero-padded card number ("01", "02", …). */
export const cardNumber = (n: number) => String(n).padStart(2, '0');
