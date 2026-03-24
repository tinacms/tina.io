import fs from 'node:fs';
import path from 'node:path';

/**
 * Playwright globalSetup — runs exactly once before any workers spawn.
 * Handles VISUAL_CLEAN to avoid the race condition where multiple workers
 * each try to delete and recreate the screenshot directory.
 */
export default function globalSetup() {
  const label = process.env.VISUAL_LABEL || 'current';
  const screenshotDir = path.join(__dirname, 'screenshots', label);

  if (process.env.VISUAL_CLEAN === '1' && fs.existsSync(screenshotDir)) {
    fs.rmSync(screenshotDir, { recursive: true });
    console.log(`Cleaned screenshot directory: ${screenshotDir}`);
  }

  fs.mkdirSync(screenshotDir, { recursive: true });
}
