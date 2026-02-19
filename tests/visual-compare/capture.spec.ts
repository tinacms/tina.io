import fs from 'node:fs';
import path from 'node:path';
import { test } from '@playwright/test';
import { discoverPages } from './discover-pages';

/**
 * Visual comparison capture spec.
 *
 * Discovers every page in the site and captures full-page screenshots.
 * Screenshots are saved to tests/visual-compare/screenshots/{label}/
 *
 * Environment variables:
 *   VISUAL_LABEL   — subfolder name for screenshots (default: "current")
 *   VISUAL_CLEAN   — set to "1" to delete existing screenshots before capture
 *   BASE_URL       — target a staging/production URL instead of localhost
 *
 * Usage:
 *   # Capture baseline against staging
 *   VISUAL_LABEL=baseline BASE_URL=https://tina.io pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 *
 *   # Capture current against a PR preview
 *   VISUAL_LABEL=current BASE_URL=https://preview-123.vercel.app pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 *
 *   # Resume an interrupted run (already-captured pages are skipped)
 *   VISUAL_LABEL=baseline BASE_URL=https://tina.io pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 *
 *   # Start fresh by clearing existing screenshots
 *   VISUAL_CLEAN=1 VISUAL_LABEL=baseline BASE_URL=https://tina.io pnpm exec playwright test tests/visual-compare/capture.spec.ts --project=chromium
 */

test.describe.configure({ mode: 'parallel' });

const LABEL = process.env.VISUAL_LABEL || 'current';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots', LABEL);

const PAGES = discoverPages();

for (const pagePath of PAGES) {
  const slug =
    pagePath === '/' ? '_homepage' : pagePath.slice(1).replace(/\//g, '__');
  const screenshotPath = path.join(SCREENSHOT_DIR, `${slug}.png`);

  test(`capture ${pagePath}`, async ({ page }, testInfo) => {
    // Skip pages that already have a screenshot (resumable runs)
    if (fs.existsSync(screenshotPath)) {
      test.skip();
      return;
    }

    // Use networkidle on first attempt; fall back to domcontentloaded on retries
    // (some pages have persistent network activity that prevents networkidle)
    const isRetry = testInfo.retry > 0;
    const waitUntil = isRetry ? 'domcontentloaded' : 'networkidle';

    const response = await page.goto(pagePath, {
      waitUntil,
      timeout: 60000,
    });

    if (!response || response.status() >= 400) {
      console.warn(`Skipping ${pagePath} — status ${response?.status()}`);
      return;
    }

    // Give lazy-loaded images / animations a moment to settle
    // Use longer wait on retry since we didn't wait for networkidle
    await page.waitForTimeout(isRetry ? 5000 : 2000);

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
  });
}
