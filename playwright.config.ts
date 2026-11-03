import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

/**
 * End-to-end tests run against the production build (`npm run build` first).
 * `npm run verify` does build + all checks in one go.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'unit', testDir: './tests/unit' },
    { name: 'desktop', testDir: './tests/e2e', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', testDir: './tests/e2e', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npx astro preview --port ${PORT} --ignore-lock`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env['CI'],
    timeout: 60_000,
  },
});
