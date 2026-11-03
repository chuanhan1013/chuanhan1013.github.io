// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://chuanhan1013.github.io',
  // Emit `cv.html` instead of `cv/index.html` so existing links keep working.
  build: { format: 'file', assets: '_astro' },
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  vite: {
    // Always emit icons as cacheable files instead of inlining them as data URIs.
    build: { assetsInlineLimit: 0 },
  },
});
