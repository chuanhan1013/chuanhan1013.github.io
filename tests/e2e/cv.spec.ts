import { cv } from '../../src/data/cv';
import { expect, test } from './fixtures';

test('CV renders every entry and links back to the portfolio', async ({ page, pageErrors }) => {
  await page.goto('/cv.html');
  await expect(page).toHaveTitle(cv.title);
  await expect(page.locator('main h2')).toHaveText([
    ...cv.sections.map((s) => s.heading),
    'Technical Skills',
  ]);
  // The published CV never carries the phone number from the private source.
  await expect(page.locator('main')).not.toContainText('+65');
  const entries = cv.sections.flatMap((section) => section.entries);
  await expect(page.locator('.entry-head strong')).toHaveText(entries.map((e) => e.title));
  await expect(page.getByRole('button', { name: 'Print / Save PDF' })).toBeVisible();
  await page.getByRole('link', { name: '← Portfolio' }).click();
  await expect(page.locator('.hero__name')).toBeVisible();
  expect(pageErrors).toEqual([]);
});
