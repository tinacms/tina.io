import { test } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { discoverPages } from './discover-pages';

/**
 * Visual comparison capture spec.
 *
 * Discovers every page in the site and captures full-page screenshots.
 * Screenshots are saved to tests/visual-compare/screenshots/{label}/
 *
 * Usage:
 *   VISUAL_LABEL=baseline pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 *   VISUAL_LABEL=current  pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 */

// Limit workers to avoid overwhelming the dev server — too many concurrent
// requests cause random pages to render with missing assets or loading states.
test.describe.configure({ mode: 'parallel' });

const LABEL = process.env.VISUAL_LABEL || 'current';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots', LABEL);

const PAGES = discoverPages();

test.beforeAll(() => {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  console.log(`\nDiscovered ${PAGES.length} pages. Saving to ${LABEL}/\n`);
});

for (const pagePath of PAGES) {
  const slug =
    pagePath === '/' ? '_homepage' : pagePath.slice(1).replace(/\//g, '__');

  test(`capture ${pagePath}`, async ({ page }) => {
    const response = await page.goto(pagePath, {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    if (!response || response.status() >= 400) {
      console.warn(`⚠ Skipping ${pagePath} — status ${response?.status()}`);
      return;
    }

    // Give lazy-loaded images / animations a moment to settle
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${slug}.png`),
      fullPage: true,
    });
  });
}
