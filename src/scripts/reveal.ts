/**
 * Scroll-reveal for cards. Active only when `<html>` has `.reveal-ready`, which an inline
 * script in `index.astro` sets before first paint (skipped for reduced motion).
 */
const REVEAL_TARGETS = '.feature-card, .timeline article, .edu-card, .skills > div, .award-strip > div';

export function initReveal(): void {
  if (!document.documentElement.classList.contains('reveal-ready')) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll<HTMLElement>(REVEAL_TARGETS).forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 3, 2) * 55}ms`;
    observer.observe(el);
  });
}
