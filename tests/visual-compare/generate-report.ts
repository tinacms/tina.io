import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

/**
 * Generates a visual diff report comparing two sets of screenshots.
 *
 * Usage:
 *   npx tsx tests/visual-compare/generate-report.ts <labelA> <labelB>
 *   npx tsx tests/visual-compare/generate-report.ts prod staging
 */

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const DIFF_DIR = path.join(SCREENSHOT_DIR, 'diff');

const [labelA = 'prod', labelB = 'staging'] = process.argv.slice(2);
const dirA = path.join(SCREENSHOT_DIR, labelA);
const dirB = path.join(SCREENSHOT_DIR, labelB);

if (!fs.existsSync(dirA) || !fs.existsSync(dirB)) {
  console.error(`Missing screenshot directories. Expected:\n  ${dirA}\n  ${dirB}`);
  process.exit(1);
}

interface DiffResult {
  slug: string;
  pagePath: string;
  diffPixels: number;
  totalPixels: number;
  diffPercent: number;
  status: 'changed' | 'minimal' | 'identical' | 'only-a' | 'only-b' | 'size-mismatch';
  widthA?: number;
  heightA?: number;
  widthB?: number;
  heightB?: number;
}

async function compareImages(slug: string): Promise<DiffResult> {
  const pagePath = slug === '_homepage' ? '/' : '/' + slug.replace(/__/g, '/');
  const fileA = path.join(dirA, `${slug}.png`);
  const fileB = path.join(dirB, `${slug}.png`);

  if (!fs.existsSync(fileA)) return { slug, pagePath, diffPixels: 0, totalPixels: 0, diffPercent: 100, status: 'only-b' };
  if (!fs.existsSync(fileB)) return { slug, pagePath, diffPixels: 0, totalPixels: 0, diffPercent: 100, status: 'only-a' };

  // Read metadata to check dimensions
  const metaA = await sharp(fileA).metadata();
  const metaB = await sharp(fileB).metadata();

  const widthA = metaA.width!;
  const heightA = metaA.height!;
  const widthB = metaB.width!;
  const heightB = metaB.height!;

  // Use the larger dimensions for comparison canvas
  const width = Math.max(widthA, widthB);
  const height = Math.max(heightA, heightB);
  const bg = { r: 255, g: 255, b: 255, alpha: 1 };

  // Extend images from top-left to match canvas size (pad right/bottom only)
  const rgbaA = await sharp(fileA)
    .extend({
      top: 0, left: 0,
      right: width - widthA,
      bottom: height - heightA,
      background: bg,
    })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const rgbaB = await sharp(fileB)
    .extend({
      top: 0, left: 0,
      right: width - widthB,
      bottom: height - heightB,
      background: bg,
    })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diffPng = new PNG({ width, height });
  const totalPixels = width * height;

  const diffPixels = pixelmatch(
    new Uint8Array(rgbaA),
    new Uint8Array(rgbaB),
    new Uint8Array(diffPng.data.buffer),
    width,
    height,
    { threshold: 0.1 }
  );

  const diffPercent = (diffPixels / totalPixels) * 100;

  // Save diff image if there are differences
  if (diffPixels > 0) {
    fs.mkdirSync(DIFF_DIR, { recursive: true });
    const diffPath = path.join(DIFF_DIR, `${slug}.png`);
    const diffBuffer = PNG.sync.write(diffPng);
    fs.writeFileSync(diffPath, diffBuffer);
  }

  return {
    slug,
    pagePath,
    diffPixels,
    totalPixels,
    diffPercent,
    status: diffPixels === 0 ? 'identical' : diffPercent < 1 ? 'minimal' : 'changed',
    widthA, heightA, widthB, heightB,
  };
}

function generateHtml(results: DiffResult[]): string {
  const changed = results.filter(r => r.status === 'changed');
  const minimal = results.filter(r => r.status === 'minimal');
  const identical = results.filter(r => r.status === 'identical');
  const onlyA = results.filter(r => r.status === 'only-a');
  const onlyB = results.filter(r => r.status === 'only-b');

  function renderPageCards(items: DiffResult[], badgeClass: string, badgeLabel: string): string {
    return items
      .sort((a, b) => b.diffPercent - a.diffPercent)
      .map(r => {
        const aPath = `screenshots/${labelA}/${r.slug}.png`;
        const bPath = `screenshots/${labelB}/${r.slug}.png`;
        const diffPath = `screenshots/diff/${r.slug}.png`;
        return `
      <div class="page-card ${badgeClass}" data-diff="${r.diffPercent.toFixed(2)}">
        <div class="page-header" onclick="this.parentElement.classList.toggle('expanded')">
          <span class="status-badge ${badgeClass}">${badgeLabel}</span>
          <span class="page-path">${r.pagePath}</span>
          <span class="diff-percent">${r.diffPercent.toFixed(2)}% diff (${r.diffPixels.toLocaleString()} px)</span>
        </div>
        <div class="page-details">
          <div class="image-row">
            <div class="image-col">
              <h4>${labelA}</h4>
              <img loading="lazy" src="${aPath}" />
            </div>
            <div class="image-col diff-col">
              <h4>Diff</h4>
              <img loading="lazy" src="${diffPath}" />
            </div>
            <div class="image-col">
              <h4>${labelB}</h4>
              <img loading="lazy" src="${bPath}" />
            </div>
          </div>
        </div>
      </div>`;
      })
      .join('\n');
  }

  const changedRows = renderPageCards(changed, 'changed', 'CHANGED');
  const minimalRows = renderPageCards(minimal, 'minimal', 'MINIMAL');

  const identicalList = identical
    .map(r => `<li>${r.pagePath}</li>`)
    .join('\n');

  const onlyAList = onlyA.map(r => `<li>${r.pagePath} (only in ${labelA})</li>`).join('\n');
  const onlyBList = onlyB.map(r => `<li>${r.pagePath} (only in ${labelB})</li>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Visual Diff: ${labelA} vs ${labelB}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
  h1 { margin-bottom: 0.5rem; }
  .summary { display: flex; gap: 1rem; margin: 1rem 0 2rem; }
  .summary-card { padding: 1rem 1.5rem; border-radius: 8px; background: #1e293b; }
  .summary-card .num { font-size: 2rem; font-weight: bold; }
  .summary-card.changed .num { color: #f97316; }
  .summary-card.minimal .num { color: #eab308; }
  .summary-card.identical .num { color: #22c55e; }
  .summary-card.missing .num { color: #ef4444; }

  .page-card { border: 1px solid #334155; border-radius: 8px; margin-bottom: 0.5rem; overflow: hidden; }
  .page-header { display: flex; align-items: center; gap: 1rem; padding: 0.75rem 1rem; cursor: pointer; background: #1e293b; }
  .page-header:hover { background: #334155; }
  .status-badge { padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
  .status-badge.changed { background: #f97316; color: #000; }
  .status-badge.minimal { background: #eab308; color: #000; }
  .page-path { flex: 1; font-family: monospace; font-size: 0.9rem; }
  .diff-percent { font-size: 0.85rem; color: #f97316; }
  .page-card.minimal .diff-percent { color: #eab308; }

  .page-details { display: none; padding: 1rem; background: #0f172a; }
  .page-card.expanded .page-details { display: block; }
  .image-row { display: flex; gap: 0.5rem; }
  .image-col { flex: 1; min-width: 0; }
  .image-col h4 { text-align: center; margin-bottom: 0.5rem; color: #94a3b8; }
  .image-col img { width: 100%; border: 1px solid #334155; border-radius: 4px; }
  .diff-col img { border-color: #f97316; }

  .section { margin-top: 2rem; }
  .section h2 { margin-bottom: 1rem; }
  .identical-list { columns: 3; column-gap: 1rem; list-style: none; font-family: monospace; font-size: 0.85rem; color: #64748b; }
  .identical-list li { margin-bottom: 0.25rem; }

  .controls { margin: 1rem 0; display: flex; gap: 1rem; align-items: center; }
  .controls button { padding: 0.5rem 1rem; border: 1px solid #475569; border-radius: 6px; background: #1e293b; color: #e2e8f0; cursor: pointer; }
  .controls button:hover { background: #334155; }
</style>
</head>
<body>
  <h1>Visual Diff Report</h1>
  <p style="color:#94a3b8">${labelA} vs ${labelB} &mdash; ${new Date().toISOString().split('T')[0]}</p>

  <div class="summary">
    <div class="summary-card changed"><div class="num">${changed.length}</div>Changed</div>
    <div class="summary-card minimal"><div class="num">${minimal.length}</div>Minimal (&lt;1%)</div>
    <div class="summary-card identical"><div class="num">${identical.length}</div>Identical</div>
    <div class="summary-card missing"><div class="num">${onlyA.length + onlyB.length}</div>Missing</div>
  </div>

  <div class="controls">
    <button onclick="document.querySelectorAll('.page-card').forEach(c=>c.classList.add('expanded'))">Expand All</button>
    <button onclick="document.querySelectorAll('.page-card').forEach(c=>c.classList.remove('expanded'))">Collapse All</button>
  </div>

  ${changedRows}

  ${minimal.length > 0 ? `
  <div class="section">
    <h2>Minimal Changes — under 1% diff (${minimal.length})</h2>
    ${minimalRows}
  </div>` : ''}

  ${(onlyA.length + onlyB.length) > 0 ? `
  <div class="section">
    <h2>Missing Pages</h2>
    <ul class="identical-list">${onlyAList}${onlyBList}</ul>
  </div>` : ''}

  <div class="section">
    <h2>Identical Pages (${identical.length})</h2>
    <ul class="identical-list">${identicalList}</ul>
  </div>
</body>
</html>`;
}

async function main() {
  const filesA = new Set(fs.readdirSync(dirA).filter(f => f.endsWith('.png')).map(f => f.replace('.png', '')));
  const filesB = new Set(fs.readdirSync(dirB).filter(f => f.endsWith('.png')).map(f => f.replace('.png', '')));
  const allSlugs = [...new Set([...filesA, ...filesB])].sort();

  console.log(`Comparing ${allSlugs.length} pages between ${labelA} and ${labelB}...`);

  // Process in batches to avoid memory issues
  const BATCH_SIZE = 10;
  const results: DiffResult[] = [];

  for (let i = 0; i < allSlugs.length; i += BATCH_SIZE) {
    const batch = allSlugs.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(batch.map(slug => compareImages(slug)));
    results.push(...batchResults);

    const done = Math.min(i + BATCH_SIZE, allSlugs.length);
    const changed = results.filter(r => r.status === 'changed').length;
    process.stdout.write(`\r  ${done}/${allSlugs.length} compared, ${changed} changed`);
  }

  console.log('\n\nGenerating report...');

  const html = generateHtml(results);
  const reportPath = path.join(__dirname, 'report.html');
  fs.writeFileSync(reportPath, html);

  const changedCount = results.filter(r => r.status === 'changed').length;
  const minimalCount = results.filter(r => r.status === 'minimal').length;
  const identicalCount = results.filter(r => r.status === 'identical').length;
  console.log(`\nDone! ${changedCount} changed, ${minimalCount} minimal, ${identicalCount} identical.`);
  console.log(`Report: ${reportPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
