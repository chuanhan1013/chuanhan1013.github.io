/**
 * Scroll-reveal for cards. Active only when `<html>` has `.reveal-ready`, which an inline
 * script in `index.astro` sets before first paint (skipped for reduced motion); if this
 * module never runs, that script removes the class again so nothing stays hidden.
 */
const REVEAL_TARGETS = '.feature-card, .timeline article, .edu-card, .skills > div, .award-strip > div';

export function initReveal(): void {
  const root = document.documentElement;
  if (!root.classList.contains('reveal-ready')) return;

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
  // Tells the inline fallback in index.astro that cards will be revealed.
  root.setAttribute('data-reveal-active', '');
}
