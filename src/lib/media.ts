import type { MediaItem } from '@/data/schemas';

/**
 * 1×1 transparent GIF. Inactive carousel slides start with this and swap in their real
 * `data-src` only when shown, so large GIFs are not downloaded up front.
 */
export const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** CSS custom properties consumed by `.gallery__slide` / `.project-card__cover`. */
export function mediaStyle(item: MediaItem, prefix: 'slide' | 'cover'): string | undefined {
  const vars: string[] = [];
  if (item.background) vars.push(`--${prefix}-bg:${item.background}`);
  if (item.position) vars.push(`--${prefix}-position:${item.position}`);
  if (prefix === 'cover' && item.fit !== 'cover') vars.push('--cover-fit:contain');
  return vars.length ? vars.join(';') : undefined;
}

/** Short clips are rendered as muted, looping <video> elements. */
export const isVideo = (item: Pick<MediaItem, 'src'>) => /\.(mp4|webm)$/i.test(item.src);

/** The still image that represents an item on cards (poster for clips). */
export const stillOf = (item: MediaItem) => (isVideo(item) ? (item.poster ?? item.src) : item.src);
