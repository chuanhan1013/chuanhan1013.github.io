import { test as base, expect, type Page } from '@playwright/test';

/** Third-party hosts are blocked so tests are hermetic and never flaky on the network. */
const isLocal = (url: string) => /^(https?:\/\/localhost[:/]|data:)/.test(url);

export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: async ({ page }, use) => {
    const errors: string[] = [];
    await page.route('**/*', (route) =>
      isLocal(route.request().url()) ? route.continue() : route.abort('blockedbyclient'),
    );
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('response', (res) => {
      if (res.status() >= 400) errors.push(`${res.status()} ${res.url()}`);
    });
    await use(errors);
  },
});

export { expect };

/** Scroll the whole page so lazy images load, then return to the top. */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 25));
    }
    window.scrollTo(0, 0);
  });
}
