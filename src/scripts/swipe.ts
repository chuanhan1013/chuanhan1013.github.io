/** Horizontal swipe detection shared by the carousel and the lightbox. */
const SWIPE_THRESHOLD_PX = 45;

/**
 * Calls `handler(1)` after a swipe to the left (show next) and `handler(-1)` after a swipe
 * to the right (show previous). Gestures that move more vertically than horizontally are
 * page scrolls and are ignored.
 */
export function onSwipe(el: HTMLElement, handler: (direction: 1 | -1) => void): void {
  let start: { x: number; y: number } | null = null;

  el.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.touches[0];
      start = touch ? { x: touch.clientX, y: touch.clientY } : null;
    },
    { passive: true },
  );

  el.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0];
      if (!start || !touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      start = null;
      if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) handler(dx < 0 ? 1 : -1);
    },
    { passive: true },
  );
}
