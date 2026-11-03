/** Mobile menu toggle and "current section" highlighting in the top bar. */
export function initNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  if (!('IntersectionObserver' in window)) return;
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".site-nav a[href^='#']")];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const href = `#${entry.target.id}`;
        links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === href));
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );
  document.querySelectorAll('.section-anchor').forEach((section) => observer.observe(section));
}
