import AxeBuilder from '@axe-core/playwright';
import { expect, scrollThrough, test } from './fixtures';

/**
 * Automated accessibility scan (WCAG 2.x A/AA). Colour contrast is excluded because the
 * existing visual design intentionally uses light, small captions; revisit if it changes.
 */
for (const path of ['/', '/cv.html']) {
  test(`no detectable a11y violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await scrollThrough(page);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
  });
}
