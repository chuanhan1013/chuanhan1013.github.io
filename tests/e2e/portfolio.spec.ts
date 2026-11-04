import { research } from '../../src/data/research';
import { projects } from '../../src/data/projects';
import { expect, scrollThrough, test } from './fixtures';

test.describe('portfolio page', () => {
  test.beforeEach(async ({ page, pageErrors }) => {
    void pageErrors;
    await page.goto('/');
  });

  test('renders every section without runtime or network errors', async ({ page, pageErrors }) => {
    await expect(page).toHaveTitle('Chuan-Han Li — Robotics & Embodied AI');
    for (const id of ['about', 'research', 'projects', 'experience', 'education']) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }
    await scrollThrough(page);
    expect(pageErrors).toEqual([]);
  });

  test('numbers feature cards in order across research and projects', async ({ page }) => {
    const cards = [...research, ...projects];
    const numbers = page.locator('.feature-card .feature-number');
    await expect(numbers).toHaveText(cards.map((_, i) => String(i + 1).padStart(2, '0')));
    await expect(page.locator('.feature-card h3')).toHaveText(cards.map((c) => c.title));
  });

  test('every local image loads (including deferred carousel slides)', async ({ page, request }) => {
    await scrollThrough(page);
    const sources = await page.$$eval('img', (imgs) =>
      imgs.map((img) => img.dataset['src'] ?? img.getAttribute('src') ?? ''),
    );
    const local = [...new Set(sources.filter((src) => src.startsWith('/')))];
    expect(local.length).toBeGreaterThan(30);
    for (const src of local) {
      const res = await request.get(src);
      expect(res.status(), src).toBe(200);
    }
  });

  test('in-page navigation targets exist and the CV link works', async ({ page }) => {
    const hrefs = await page.$$eval('.site-nav a', (links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs.filter((h) => h.startsWith('#'))) {
      await expect(page.locator(href)).toBeAttached();
    }
    await page.locator('.download-card').click();
    await expect(page).toHaveURL(/\/cv(\.html)?$/);
    await expect(page.locator('h1')).toHaveText('Chuan-Han Li');
  });
});

test.describe('carousel', () => {
  const label = 'Triathlon robot project media';

  test('next/prev/dots cycle slides and lazy-load images', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: label });
    await carousel.scrollIntoViewIfNeeded();
    const slides = carousel.locator('.carousel-slide');
    const count = await slides.count();
    expect(count).toBeGreaterThan(2);

    const second = slides.nth(1).locator('img');
    await expect(second).toHaveAttribute('data-src', /triathlon/);

    await carousel.locator('.carousel-btn.next').dispatchEvent('click');
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await expect(slides.nth(0)).not.toHaveClass(/is-active/);
    await expect(second).not.toHaveAttribute('data-src');
    await expect.poll(() => second.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);

    await carousel.locator('.carousel-btn.prev').dispatchEvent('click');
    await carousel.locator('.carousel-btn.prev').dispatchEvent('click');
    await expect(slides.nth(count - 1)).toHaveClass(/is-active/);

    await carousel.locator('.carousel-dot').nth(2).dispatchEvent('click');
    await expect(slides.nth(2)).toHaveClass(/is-active/);
    await expect(carousel.locator('.carousel-dot').nth(2)).toHaveAttribute('aria-current', 'true');
  });
});

test('horizontal swipes change slides; vertical scrolling gestures do not', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'touch gestures');
  await page.goto('/');
  const carousel = page.getByRole('region', { name: 'Triathlon robot project media' });
  await carousel.scrollIntoViewIfNeeded();
  const swipe = (dx: number, dy: number) =>
    carousel.evaluate(
      (el, { dx, dy }) => {
        const r = el.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const touch = (cx: number, cy: number) =>
          new Touch({ identifier: 1, target: el, clientX: cx, clientY: cy });
        el.dispatchEvent(new TouchEvent('touchstart', { touches: [touch(x, y)], bubbles: true }));
        el.dispatchEvent(
          new TouchEvent('touchend', { changedTouches: [touch(x + dx, y + dy)], bubbles: true }),
        );
      },
      { dx, dy },
    );
  const slides = carousel.locator('.carousel-slide');

  await swipe(-60, 120); // mostly vertical: a page scroll, not a swipe
  await expect(slides.nth(0)).toHaveClass(/is-active/);
  await swipe(-80, 10); // swipe left → next
  await expect(slides.nth(1)).toHaveClass(/is-active/);
  await swipe(80, -10); // swipe right → previous
  await expect(slides.nth(0)).toHaveClass(/is-active/);
});

test('only the visible slide is reachable by keyboard and screen readers', async ({ page }) => {
  await page.goto('/');
  const carousel = page.getByRole('region', { name: 'Triathlon robot project media' });
  await carousel.scrollIntoViewIfNeeded();
  const reachable = () =>
    carousel.evaluate((el) =>
      [...el.querySelectorAll<HTMLElement>('.carousel-slide img')]
        .filter((img) => !img.closest('[inert]') && img.tabIndex >= 0)
        .map((img) => img.closest('.carousel-slide')?.classList.contains('is-active')),
    );
  expect(await reachable()).toEqual([true]);

  await carousel.locator('.carousel-btn.next').dispatchEvent('click');
  expect(await reachable()).toEqual([true]);
  await expect(carousel.locator('.carousel-slide').nth(0)).toHaveAttribute('inert');
  await expect(carousel.locator('.carousel-slide').nth(1)).not.toHaveAttribute('inert');
});

test.describe('lightbox', () => {
  test('opens from a card image, navigates, and closes with focus restored', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', {
      name: 'Duck egg visible and thermal fertility research media',
    });
    await carousel.scrollIntoViewIfNeeded();
    const first = carousel.locator('.carousel-slide.is-active img');
    await first.focus();
    await page.keyboard.press('Enter');

    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.locator('.lb-caption')).toHaveText(
      'Imaging setup · visible + thermal acquisition · 1 / 6',
    );
    await expect(page.locator('body')).toHaveClass(/lightbox-open/);

    await page.keyboard.press('ArrowRight');
    await expect(lightbox.locator('.lb-caption')).toHaveText(/· 2 \/ 6$/);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await expect(lightbox.locator('.lb-caption')).toHaveText(/· 6 \/ 6$/);

    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
    await expect(first).toBeFocused();
  });

  test('shows the real image for slides that were never displayed in the card', async ({ page }) => {
    // Slow the media down so the lightbox renders while the deferred image is still in flight.
    await page.route(/\/assets\/media\/basketball-/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await route.continue();
    });
    await page.goto('/');
    const carousel = page.getByRole('region', { name: 'Basketball sensing project media' });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.locator('.carousel-slide.is-active img').dispatchEvent('click');
    const lbImg = page.getByRole('dialog', { name: 'Media viewer' }).locator('.lb-stage img');
    await expect.poll(() => lbImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);

    await page.keyboard.press('ArrowRight');
    await expect(lbImg).toHaveAttribute('src', /basketball-wearable\.webp$/);
    await expect.poll(() => lbImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);
  });

  test('keeps the no-referrer policy of remote images', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: 'NUS dynamic manipulator research media' });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.locator('.carousel-slide.is-active img').dispatchEvent('click');
    const lbImg = page.getByRole('dialog', { name: 'Media viewer' }).locator('.lb-stage img');
    await expect(lbImg).toHaveJSProperty('referrerPolicy', 'no-referrer');
    await page.keyboard.press('ArrowRight');
    await expect(lbImg).toHaveJSProperty('referrerPolicy', '');
  });

  test('keeps keyboard focus inside the open dialog', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', {
      name: 'Duck egg visible and thermal fertility research media',
    });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.locator('.carousel-slide.is-active img').dispatchEvent('click');
    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox.locator('.lb-close')).toBeFocused();

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => !!document.activeElement?.closest('.media-lightbox'));
      expect(inside, `focus escaped the dialog after ${i + 1} Tab presses`).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(page.locator('.site-shell')).not.toHaveAttribute('inert');
  });

  test('single-image media hides gallery arrows', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('#han-agents .feature-media img');
    await img.scrollIntoViewIfNeeded();
    await img.dispatchEvent('click');
    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox).toHaveClass(/is-single/);
    await lightbox.locator('.lb-close').click();
    await expect(lightbox).toBeHidden();
  });
});

test.describe('mobile navigation', () => {
  test('menu toggles open and closes after choosing a link', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'menu button only shows on narrow screens');
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle navigation' });
    const nav = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(nav).toBeHidden();
    await toggle.click();
    await expect(nav).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await nav.getByRole('link', { name: 'Experience' }).click();
    await expect(nav).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
