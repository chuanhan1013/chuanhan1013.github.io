/**
 * Category filter for the project grid. Without JS every project is shown; with JS the
 * chips filter by `data-categories`, animated with a view transition where supported.
 */
export function initFilter(): void {
  const bar = document.querySelector<HTMLElement>('[data-filter]');
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  if (!bar || !grid) return;

  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('button[data-category]')];
  const items = [...grid.querySelectorAll<HTMLElement>(':scope > li')];

  // Give every card its own transition name so the grid reflows smoothly.
  items.forEach((item, i) => item.style.setProperty('view-transition-name', `project-item-${i}`));

  const apply = (category: string) => {
    let shown = 0;
    for (const item of items) {
      const match = category === 'all' || (item.dataset['categories'] ?? '').split(' ').includes(category);
      item.hidden = !match;
      if (match) {
        shown++;
        item.classList.add('is-visible'); // never leave a filtered-in card mid-reveal
      }
    }
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset['category'] === category)));
    if (status) status.textContent = `${shown} project${shown === 1 ? '' : 's'} shown`;
  };

  bar.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-category]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const category = button.dataset['category'] ?? 'all';
    const animate =
      'startViewTransition' in document && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (animate) document.startViewTransition(() => apply(category));
    else apply(category);
  });
}
