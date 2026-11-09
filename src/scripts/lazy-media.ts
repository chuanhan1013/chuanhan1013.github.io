/**
 * Deferred images: inactive carousel slides render a placeholder `src` and keep the
 * real URL in `data-src` until they are first shown.
 */
export function hydrate(img: HTMLImageElement | null | undefined): void {
  const src = img?.dataset['src'];
  if (!img || !src) return;
  img.src = src;
  delete img.dataset['src'];
}
