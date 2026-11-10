import { cv } from '../../src/data/cv';
import { expect, test } from './fixtures';

test('CV renders every entry and links back to the portfolio', async ({ page, pageErrors }) => {
  await page.goto('/cv.html');
  await expect(page).toHaveTitle(cv.title);
  const entries = [...cv.education, ...cv.projects, ...cv.research, ...cv.work];
  await expect(page.locator('.entry-head strong')).toHaveText(entries.map((e) => e.title));
  await expect(page.getByRole('button', { name: 'Print / Save PDF' })).toBeVisible();
  await page.getByRole('link', { name: '← Portfolio' }).click();
  await expect(page.locator('.hero__name')).toBeVisible();
  expect(pageErrors).toEqual([]);
});
