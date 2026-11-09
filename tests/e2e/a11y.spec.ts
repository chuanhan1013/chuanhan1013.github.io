import AxeBuilder from '@axe-core/playwright';
import { expect, scrollThrough, test } from './fixtures';

/** Automated accessibility scan (WCAG 2.x A/AA, including colour contrast). */
for (const path of ['/', '/projects/catchpoint.html', '/projects/humanoid-vla.html', '/cv.html']) {
  test(`no detectable a11y violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await scrollThrough(page);
    // Measure contrast on settled content, not on cards that are still fading in.
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .every((a) => a.playState !== 'running' || a.effect?.getTiming().iterations === Infinity),
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}
