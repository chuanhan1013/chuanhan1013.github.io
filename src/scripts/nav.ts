/**
 * Header behaviour: mobile menu, "scrolled" state, and the active-section link with a
 * single underline that slides between links.
 */
export function initNav(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const nav = document.querySelector<HTMLElement>('.site-nav');
  const indicator = nav?.querySelector<HTMLElement>('.nav-indicator');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', (event) => {
      if (!(event.target as Element).closest('a')) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const links = [...(nav?.querySelectorAll<HTMLAnchorElement>("a[href^='#']") ?? [])];
  if (!nav || !links.length || !('IntersectionObserver' in window)) return;

  const moveIndicator = (link: HTMLAnchorElement | undefined) => {
    if (!indicator) return;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    const inset = 12; // matches the link's horizontal padding
    indicator.style.opacity = '1';
    indicator.style.transform = `translateX(${link.offsetLeft + inset}px) scaleX(${link.offsetWidth - inset * 2})`;
  };

  let current: HTMLAnchorElement | undefined;
  const setActive = (link: HTMLAnchorElement | undefined) => {
    current = link;
    links.forEach((l) => {
      const active = l === link;
      l.classList.toggle('is-active', active);
      if (active) l.setAttribute('aria-current', 'location');
      else l.removeAttribute('aria-current');
    });
    moveIndicator(link);
  };

  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.getAttribute('href') ?? ''))
    .filter((s): s is HTMLElement => !!s);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        setActive(links.find((l) => l.getAttribute('href') === `#${entry.target.id}`));
      }
    },
    { rootMargin: '-35% 0px -60% 0px' },
  );
  sections.forEach((section) => observer.observe(section));

  // Above the first section (in the hero) nothing is active.
  const first = sections[0];
  if (first) {
    const checkTop = () => {
      if (current && first.getBoundingClientRect().top > window.innerHeight * 0.4) setActive(undefined);
    };
    checkTop();
    window.addEventListener('scroll', checkTop, { passive: true });
  }

  // Link widths change on resize and when the web font replaces the fallback font.
  new ResizeObserver(() => moveIndicator(current)).observe(nav);
  void document.fonts?.ready.then(() => moveIndicator(current));
}
