/**
 * Deferred media: inactive carousel slides keep the real URL in `data-src` (images start with a
 * placeholder `src`; videos with none) until they are first shown.
 */
export function hydrate(media: HTMLImageElement | HTMLVideoElement | null | undefined): void {
  const src = media?.dataset['src'];
  if (!media || !src) return;
  media.src = src;
  delete media.dataset['src'];
}
