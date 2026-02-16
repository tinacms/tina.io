import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

/**
 * Re-captures pages that are missing from one screenshot set but present in the other.
 * Uses domcontentloaded + longer wait instead of networkidle to handle flaky pages.
 *
 * Usage:
 *   npx tsx tests/visual-compare/recapture-missing.ts <labelA> <labelB> <baseUrlA> <baseUrlB>
 */

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

const [labelA = 'prod', labelB = 'staging', baseUrlA = 'https://tina.io', baseUrlB = ''] = process.argv.slice(2);
const dirA = path.join(SCREENSHOT_DIR, labelA);
const dirB = path.join(SCREENSHOT_DIR, labelB);

function slugToPath(slug: string): string {
  return slug === '_homepage' ? '/' : '/' + slug.replace(/__/g, '/');
}

function findMissing(): { slug: string; missingFrom: 'a' | 'b' }[] {
  const filesA = new Set(fs.readdirSync(dirA).filter(f => f.endsWith('.png')).map(f => f.replace('.png', '')));
  const filesB = new Set(fs.readdirSync(dirB).filter(f => f.endsWith('.png')).map(f => f.replace('.png', '')));

  const missing: { slug: string; missingFrom: 'a' | 'b' }[] = [];
  for (const slug of filesB) {
    if (!filesA.has(slug)) missing.push({ slug, missingFrom: 'a' });
  }
  for (const slug of filesA) {
    if (!filesB.has(slug)) missing.push({ slug, missingFrom: 'b' });
  }
  return missing;
}

async function main() {
  const missing = findMissing();
  if (missing.length === 0) {
    console.log('No missing pages to recapture!');
    return;
  }

  console.log(`Found ${missing.length} missing pages. Recapturing with domcontentloaded strategy...\n`);

  const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] });

  for (const { slug, missingFrom } of missing) {
    const pagePath = slugToPath(slug);
    const baseUrl = missingFrom === 'a' ? baseUrlA : baseUrlB;
    const dir = missingFrom === 'a' ? dirA : dirB;
    const label = missingFrom === 'a' ? labelA : labelB;
    const screenshotPath = path.join(dir, `${slug}.png`);

    const url = `${baseUrl}${pagePath}`;
    console.log(`  ${label}: ${pagePath} (${url})`);

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 90000,
      });

      if (!response || response.status() >= 400) {
        console.log(`    SKIP — status ${response?.status()}`);
        await context.close();
        continue;
      }

      // Longer settle time for these problematic pages
      await page.waitForTimeout(5000);

      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });
      console.log(`    OK`);
    } catch (err: any) {
      console.log(`    FAIL — ${err.message.split('\n')[0]}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
