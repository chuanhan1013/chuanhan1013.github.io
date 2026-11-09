import { expect, scrollThrough, test } from './fixtures';

const EGG = 'Multimodal Visual–Thermal Fertility Detection media';

test.describe('home page', () => {
  test('renders every section without runtime or network errors', async ({ page, pageErrors }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Chuan-Han Li — Robotics & Embodied AI');
    for (const id of ['about', 'research', 'projects', 'experience', 'education']) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }
    await scrollThrough(page);
    expect(pageErrors).toEqual([]);
  });

  test('every card links to a working project page', async ({ page, request }) => {
    await page.goto('/');
    const links = await page.$$eval('.research-card h3 a, .project-card h3 a', (as) =>
      as.map((a) => a.getAttribute('href') ?? ''),
    );
    expect(links.length).toBeGreaterThanOrEqual(10);
    expect(new Set(links).size).toBe(links.length);
    for (const href of links) {
      expect(href).toMatch(/^\/projects\/[\w-]+\.html$/);
      expect((await request.get(href)).status(), href).toBe(200);
    }
  });

  test('category filter shows only matching projects and can be reset', async ({ page }) => {
    await page.goto('/');
    const grid = page.locator('[data-project-grid] > li');
    const total = await grid.count();
    const chip = page.locator('[data-filter] button[data-category="humanoids"]');
    const expected = Number(await chip.locator('.count').textContent());
    await chip.click();
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(grid.filter({ visible: true })).toHaveCount(expected);
    for (const item of await grid.filter({ visible: true }).all()) {
      await expect(item).toHaveAttribute('data-categories', /\bhumanoids\b/);
    }
    await page.locator('[data-filter] button[data-category="all"]').click();
    await expect(grid.filter({ visible: true })).toHaveCount(total);
  });

  test('in-page navigation targets exist and the CV link works', async ({ page, isMobile }) => {
    await page.goto('/');
    const hrefs = await page.$$eval('.site-nav a', (links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs.filter((h) => h.startsWith('#'))) {
      await expect(page.locator(href)).toBeAttached();
    }
    if (isMobile) await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.locator('.site-nav .nav-cta').click();
    await expect(page).toHaveURL(/\/cv(\.html)?$/);
    await expect(page.locator('h1')).toHaveText('Chuan-Han Li');
  });
});

test.describe('project pages', () => {
  test('load all media and link to neighbours', async ({ page, request, pageErrors }) => {
    await page.goto('/');
    const pages = await page.$$eval('.research-card h3 a, .project-card h3 a', (as) =>
      as.map((a) => a.getAttribute('href') ?? ''),
    );
    for (const href of pages) {
      await page.goto(href);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.gallery')).toBeVisible();
      await expect(page.locator('.project-pager a').first()).toBeVisible();
      const media = await page.$$eval('.gallery img, .gallery video', (els) =>
        els.flatMap((el) => [
          el.dataset['src'] ?? el.getAttribute('src') ?? '',
          el instanceof HTMLVideoElement ? el.poster.replace(location.origin, '') : '',
        ]),
      );
      for (const src of media.filter((s) => s.startsWith('/'))) {
        expect((await request.get(src)).status(), `${href} → ${src}`).toBe(200);
      }
    }
    expect(pageErrors).toEqual([]);
  });

  test('pager navigates to the next project', async ({ page }) => {
    await page.goto('/projects/catchpoint.html');
    const next = page.locator('.project-pager a.next');
    const title = (await next.textContent())?.replace('Next →', '').trim() ?? '';
    await next.click();
    await expect(page.locator('h1')).toHaveText(title);
  });

  test('clips play while visible and carry a poster', async ({ page }) => {
    await page.goto('/projects/humanoid-vla.html');
    const video = page.locator('.gallery__slide.is-active video');
    await expect(video).toHaveAttribute('poster', /\.webp$/);
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  });
});

test('no horizontal overflow on any page type', async ({ page }) => {
  for (const path of ['/', '/projects/catchpoint.html', '/cv.html']) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test.describe('carousel', () => {
  test('next/prev/dots cycle slides, lazy-load images and keep hidden slides inert', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: EGG });
    await carousel.scrollIntoViewIfNeeded();
    const slides = carousel.locator('.gallery__slide');
    const count = await slides.count();
    expect(count).toBeGreaterThan(2);

    const second = slides.nth(1).locator('img');
    await expect(second).toHaveAttribute('data-src', /egg/);
    await expect(slides.nth(1)).toHaveAttribute('inert');

    await carousel.locator('.gallery__btn.next').dispatchEvent('click');
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await expect(slides.nth(1)).not.toHaveAttribute('inert');
    await expect(slides.nth(0)).toHaveAttribute('inert');
    await expect(second).not.toHaveAttribute('data-src');
    await expect.poll(() => second.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);

    await carousel.locator('.gallery__btn.prev').dispatchEvent('click');
    await carousel.locator('.gallery__btn.prev').dispatchEvent('click');
    await expect(slides.nth(count - 1)).toHaveClass(/is-active/);

    await carousel.locator('.gallery__dot').nth(2).dispatchEvent('click');
    await expect(slides.nth(2)).toHaveClass(/is-active/);
    await expect(carousel.locator('.gallery__dot').nth(2)).toHaveAttribute('aria-current', 'true');
  });

  test('the cross-page transition name follows the visible slide', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: EGG });
    const name = await carousel.getAttribute('data-vt-name');
    expect(name).toBeTruthy();
    const media = carousel.locator('.gallery__slide img');
    await expect(media.nth(0)).toHaveCSS('view-transition-name', name ?? '');
    await carousel.locator('.gallery__btn.next').dispatchEvent('click');
    await expect(media.nth(1)).toHaveCSS('view-transition-name', name ?? '');
    await expect(media.nth(0)).toHaveCSS('view-transition-name', 'none');
  });

  test('horizontal swipes change slides; vertical scrolling gestures do not', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'touch gestures');
    await page.goto('/');
    const carousel = page.getByRole('region', { name: EGG });
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
    const slides = carousel.locator('.gallery__slide');
    await swipe(-60, 120);
    await expect(slides.nth(0)).toHaveClass(/is-active/);
    await swipe(-80, 10);
    await expect(slides.nth(1)).toHaveClass(/is-active/);
    await swipe(80, -10);
    await expect(slides.nth(0)).toHaveClass(/is-active/);
  });
});

test.describe('lightbox', () => {
  test('opens from a gallery image, navigates, and closes with focus restored', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: EGG });
    await carousel.scrollIntoViewIfNeeded();
    const first = carousel.locator('.gallery__slide.is-active img');
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

  test('shows the real image for slides never displayed in the gallery', async ({ page }) => {
    await page.route(/\/assets\/media\/basketball-/, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 600));
      await route.continue();
    });
    await page.goto('/projects/basketball-sensing.html');
    await page.locator('.gallery__slide.is-active img').dispatchEvent('click');
    const lbImg = page.getByRole('dialog', { name: 'Media viewer' }).locator('.lb-stage img');
    await expect.poll(() => lbImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);
    await page.keyboard.press('ArrowRight');
    await expect(lbImg).toHaveAttribute('src', /basketball-wearable\.webp$/);
    await expect.poll(() => lbImg.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(1);
  });

  test('keeps the no-referrer policy of remote images', async ({ page }) => {
    await page.goto('/projects/dynamic-manipulator-planning.html');
    await page.locator('.gallery__slide.is-active img').dispatchEvent('click');
    const lbImg = page.getByRole('dialog', { name: 'Media viewer' }).locator('.lb-stage img');
    await expect(lbImg).toHaveJSProperty('referrerPolicy', '');
    await page.keyboard.press('ArrowRight');
    await expect(lbImg).toHaveJSProperty('referrerPolicy', 'no-referrer');
  });

  test('keeps keyboard focus inside the open dialog', async ({ page }) => {
    await page.goto('/');
    const carousel = page.getByRole('region', { name: EGG });
    await carousel.scrollIntoViewIfNeeded();
    await carousel.locator('.gallery__slide.is-active img').dispatchEvent('click');
    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox.locator('.lb-close')).toBeFocused();
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => !!document.activeElement?.closest('.media-lightbox'));
      expect(inside, `focus escaped after ${i + 1} Tab presses`).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(page.locator('main')).not.toHaveAttribute('inert');
  });

  test('counts clips and images in carousel order', async ({ page }) => {
    await page.goto('/projects/catchpoint.html');
    const slides = await page.locator('.gallery__slide').count();
    await page.locator('.gallery__slide.is-active img').dispatchEvent('click');
    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox.locator('.lb-caption')).toHaveText(new RegExp(`· 1 / ${slides}$`));
    await page.keyboard.press('ArrowRight');
    await expect(lightbox.locator('.lb-stage video')).toBeVisible();
    await expect(lightbox.locator('.lb-stage img')).toBeHidden();
    await page.keyboard.press('Escape');
    await expect(lightbox).toBeHidden();
  });

  test('single-image media hides gallery arrows', async ({ page }) => {
    await page.goto('/projects/han-agents.html');
    await page.locator('.gallery img').dispatchEvent('click');
    const lightbox = page.getByRole('dialog', { name: 'Media viewer' });
    await expect(lightbox).toHaveClass(/is-single/);
    await lightbox.locator('.lb-close').click();
    await expect(lightbox).toBeHidden();
  });
});

test.describe('motion', () => {
  test('cards fade in on scroll when the page script runs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/reveal-ready/);
    await expect(page.locator('html')).toHaveAttribute('data-reveal-active');
    const card = page.locator('.reveal').last();
    await expect(card).not.toHaveClass(/is-visible/);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/is-visible/);
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('content stays visible when the page script fails to load', async ({ page }) => {
    await page.route(/\/_astro\/.*\.js$/, (route) => route.abort());
    await page.goto('/');
    const card = page.locator('.reveal').first();
    await card.scrollIntoViewIfNeeded();
    await expect.poll(() => card.evaluate((el) => getComputedStyle(el).opacity), { timeout: 5000 }).toBe('1');
  });

  test('hero end-effector travels along its path', async ({ page }) => {
    await page.goto('/');
    const ee = page.locator('.traj__ee');
    // The marker only animates while the illustration is on screen (it sits below the fold on phones).
    await page.locator('.hero__art').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const a = await ee.evaluate((el) => (el as SVGGElement).style.transform);
    await page.waitForTimeout(700);
    const b = await ee.evaluate((el) => (el as SVGGElement).style.transform);
    expect(a).not.toBe(b);
  });

  test('with reduced motion, nothing is hidden and clips do not autoplay', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/projects/humanoid-vla.html');
    await expect(page.locator('html')).not.toHaveClass(/reveal-ready/);
    const video = page.locator('.gallery__slide.is-active video');
    await expect(video).toHaveJSProperty('controls', true);
    await page.waitForTimeout(500);
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await context.close();
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
