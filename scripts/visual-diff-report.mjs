#!/usr/bin/env node

/**
 * Visual Diff Report Generator
 *
 * Compares screenshots from two directories (baseline vs current),
 * computes pixel diffs, and generates a self-contained HTML report.
 *
 * Usage:
 *   node scripts/visual-diff-report.mjs [baselineDir] [currentDir] [outputPath]
 *
 * Defaults:
 *   baselineDir = tests/visual-compare/screenshots/baseline
 *   currentDir  = tests/visual-compare/screenshots/current
 *   outputPath  = tests/visual-compare/report.html
 */

import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASELINE_DIR =
  process.argv[2] ||
  path.join(ROOT, 'tests/visual-compare/screenshots/baseline');
const CURRENT_DIR =
  process.argv[3] ||
  path.join(ROOT, 'tests/visual-compare/screenshots/current');
const OUTPUT_PATH =
  process.argv[4] || path.join(ROOT, 'tests/visual-compare/report.html');

// Branch names passed via env vars from the shell script
const BASELINE_BRANCH = process.env.VISUAL_BASE_BRANCH || 'baseline';
const CURRENT_BRANCH = process.env.VISUAL_PR_BRANCH || 'current';

function readPng(filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(new PNG());
    stream.on('parsed', function () {
      resolve(this);
    });
    stream.on('error', reject);
  });
}

function pngToBase64(png) {
  const buffer = PNG.sync.write(png);
  return buffer.toString('base64');
}

function fileToBase64(filePath) {
  return fs.readFileSync(filePath).toString('base64');
}

async function comparePair(baselinePath, currentPath) {
  const baseline = await readPng(baselinePath);
  const current = await readPng(currentPath);

  // Handle size differences — use the larger canvas
  const width = Math.max(baseline.width, current.width);
  const height = Math.max(baseline.height, current.height);

  // Create padded versions if sizes differ
  const padImage = (img, w, h) => {
    if (img.width === w && img.height === h) return img;
    const padded = new PNG({ width: w, height: h });
    // Fill with white
    for (let i = 0; i < padded.data.length; i += 4) {
      padded.data[i] = 255;
      padded.data[i + 1] = 255;
      padded.data[i + 2] = 255;
      padded.data[i + 3] = 255;
    }
    PNG.bitblt(img, padded, 0, 0, img.width, img.height, 0, 0);
    return padded;
  };

  const paddedBaseline = padImage(baseline, width, height);
  const paddedCurrent = padImage(current, width, height);

  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    paddedBaseline.data,
    paddedCurrent.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  const totalPixels = width * height;
  const diffPercent = ((numDiffPixels / totalPixels) * 100).toFixed(2);

  return {
    diffPercent: parseFloat(diffPercent),
    numDiffPixels,
    totalPixels,
    diffPng: diff,
    sizeChanged:
      baseline.width !== current.width || baseline.height !== current.height,
    baselineSize: { w: baseline.width, h: baseline.height },
    currentSize: { w: current.width, h: current.height },
  };
}

function slugToPagePath(slug) {
  if (slug === '_homepage') return '/';
  return '/' + slug.replace(/__/g, '/');
}

async function main() {
  if (!fs.existsSync(BASELINE_DIR)) {
    console.error(`❌ Baseline directory not found: ${BASELINE_DIR}`);
    console.error(
      '   Run captures on the base branch first with VISUAL_LABEL=baseline'
    );
    process.exit(1);
  }
  if (!fs.existsSync(CURRENT_DIR)) {
    console.error(`❌ Current directory not found: ${CURRENT_DIR}`);
    console.error(
      '   Run captures on the PR branch with VISUAL_LABEL=current'
    );
    process.exit(1);
  }

  const baselineFiles = new Set(
    fs.readdirSync(BASELINE_DIR).filter((f) => f.endsWith('.png'))
  );
  const currentFiles = new Set(
    fs.readdirSync(CURRENT_DIR).filter((f) => f.endsWith('.png'))
  );

  const allFiles = new Set([...baselineFiles, ...currentFiles]);
  const results = [];

  console.log(`Comparing ${allFiles.size} pages...\n`);

  for (const file of [...allFiles].sort()) {
    const slug = file.replace('.png', '');
    const pagePath = slugToPagePath(slug);
    const baselinePath = path.join(BASELINE_DIR, file);
    const currentPath = path.join(CURRENT_DIR, file);

    const hasBaseline = baselineFiles.has(file);
    const hasCurrent = currentFiles.has(file);

    if (!hasBaseline) {
      console.log(`  🆕  ${pagePath} — new page (no baseline)`);
      results.push({
        slug,
        pagePath,
        status: 'added',
        currentImg: fileToBase64(currentPath),
      });
      continue;
    }

    if (!hasCurrent) {
      console.log(`  🗑️  ${pagePath} — removed (no current)`);
      results.push({
        slug,
        pagePath,
        status: 'removed',
        baselineImg: fileToBase64(baselinePath),
      });
      continue;
    }

    const comparison = await comparePair(baselinePath, currentPath);

    if (comparison.diffPercent === 0) {
      console.log(`  ✓  ${pagePath} — unchanged`);
      results.push({ slug, pagePath, status: 'unchanged' });
    } else {
      const sizeNote = comparison.sizeChanged
        ? ` (size: ${comparison.baselineSize.w}x${comparison.baselineSize.h} → ${comparison.currentSize.w}x${comparison.currentSize.h})`
        : '';
      console.log(
        `  ✗  ${pagePath} — ${comparison.diffPercent}% changed${sizeNote}`
      );
      results.push({
        slug,
        pagePath,
        status: 'changed',
        diffPercent: comparison.diffPercent,
        numDiffPixels: comparison.numDiffPixels,
        sizeChanged: comparison.sizeChanged,
        baselineSize: comparison.baselineSize,
        currentSize: comparison.currentSize,
        baselineImg: fileToBase64(baselinePath),
        currentImg: fileToBase64(currentPath),
        diffImg: pngToBase64(comparison.diffPng),
      });
    }
  }

  // Summary
  const changed = results.filter((r) => r.status === 'changed');
  const added = results.filter((r) => r.status === 'added');
  const removed = results.filter((r) => r.status === 'removed');
  const unchanged = results.filter((r) => r.status === 'unchanged');

  console.log(`\n── Summary ──────────────────────────────`);
  console.log(`  Changed:   ${changed.length}`);
  console.log(`  Added:     ${added.length}`);
  console.log(`  Removed:   ${removed.length}`);
  console.log(`  Unchanged: ${unchanged.length}`);
  console.log(`  Total:     ${results.length}`);

  // Generate HTML report
  const html = generateReport(results, { changed, added, removed, unchanged });
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, html);
  console.log(`\n📄 Report: ${OUTPUT_PATH}`);
}

function generateReport(results, { changed, added, removed, unchanged }) {
  const changedRows = [...changed]
    .sort((a, b) => b.diffPercent - a.diffPercent)
    .map((r) => generateChangedSection(r))
    .join('\n');

  const addedRows = added.map((r) => generateAddedSection(r)).join('\n');
  const removedRows = removed.map((r) => generateRemovedSection(r)).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Visual Diff Report</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0d1117; color: #c9d1d9; padding: 24px; }
  h1 { font-size: 24px; margin-bottom: 8px; }
  .subtitle { color: #8b949e; margin-bottom: 24px; }
  .summary { display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
  .stat { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px 24px; min-width: 140px; }
  .stat .number { font-size: 32px; font-weight: 700; }
  .stat .label { color: #8b949e; font-size: 13px; margin-top: 4px; }
  .stat.changed .number { color: #f0883e; }
  .stat.added .number { color: #3fb950; }
  .stat.removed .number { color: #f85149; }
  .stat.unchanged .number { color: #8b949e; }
  .filters { margin-bottom: 24px; display: flex; gap: 8px; flex-wrap: wrap; }
  .filter-btn { background: #21262d; border: 1px solid #30363d; color: #c9d1d9; padding: 6px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; transition: all 0.15s; }
  .filter-btn:hover { border-color: #58a6ff; }
  .filter-btn.active { background: #1f6feb; border-color: #1f6feb; color: #fff; }
  .page-card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
  .page-header { padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; }
  .page-header:hover { background: #1c2128; }
  .page-path { font-family: 'SF Mono', Monaco, monospace; font-size: 14px; }
  .badge { font-size: 12px; padding: 2px 10px; border-radius: 12px; font-weight: 600; }
  .badge.changed { background: #f0883e22; color: #f0883e; }
  .badge.added { background: #3fb95022; color: #3fb950; }
  .badge.removed { background: #f8514922; color: #f85149; }
  .diff-detail { padding: 0 16px 16px; display: none; }
  .diff-detail.open { display: block; }
  .view-tabs { display: flex; gap: 4px; margin-bottom: 12px; }
  .view-tab { background: #21262d; border: 1px solid #30363d; color: #8b949e; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 12px; }
  .view-tab.active { background: #30363d; color: #c9d1d9; }
  .view-panel { display: none; }
  .view-panel.active { display: block; }
  .side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .side-by-side .col { text-align: center; }
  .side-by-side .col-label { font-size: 12px; color: #8b949e; margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .img-container { border: 1px solid #30363d; border-radius: 4px; overflow: hidden; background: #fff; }
  .img-container img { width: 100%; display: block; }
  .diff-img { border: 1px solid #30363d; border-radius: 4px; overflow: hidden; text-align: center; }
  .diff-img img { width: 100%; max-width: 1280px; display: block; margin: 0 auto; }
  .size-note { font-size: 12px; color: #8b949e; margin-top: 4px; }
  .meta { font-size: 12px; color: #8b949e; padding: 4px 0 8px; }
  .expand-icon { transition: transform 0.2s; color: #8b949e; }
  .expand-icon.open { transform: rotate(90deg); }
  .unchanged-list { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 16px; margin-top: 24px; }
  .unchanged-list summary { cursor: pointer; color: #8b949e; font-size: 14px; }
  .unchanged-list ul { margin-top: 8px; padding-left: 20px; }
  .unchanged-list li { font-family: 'SF Mono', Monaco, monospace; font-size: 13px; color: #8b949e; padding: 2px 0; }
</style>
</head>
<body>

<h1>Visual Diff Report</h1>
<p class="subtitle"><code>${CURRENT_BRANCH}</code> vs <code>${BASELINE_BRANCH}</code> — ${new Date().toLocaleString()}</p>

<div class="summary">
  <div class="stat changed"><div class="number">${changed.length}</div><div class="label">Changed</div></div>
  <div class="stat added"><div class="number">${added.length}</div><div class="label">Added</div></div>
  <div class="stat removed"><div class="number">${removed.length}</div><div class="label">Removed</div></div>
  <div class="stat unchanged"><div class="number">${unchanged.length}</div><div class="label">Unchanged</div></div>
</div>

<div class="filters">
  <button class="filter-btn active" onclick="filterCards('all')">All</button>
  <button class="filter-btn" onclick="filterCards('changed')">Changed</button>
  <button class="filter-btn" onclick="filterCards('added')">Added</button>
  <button class="filter-btn" onclick="filterCards('removed')">Removed</button>
</div>

<div id="cards">
${changedRows}
${addedRows}
${removedRows}
</div>

${
  unchanged.length > 0
    ? `
<details class="unchanged-list">
  <summary>${unchanged.length} unchanged pages</summary>
  <ul>${unchanged.map((r) => `<li>${r.pagePath}</li>`).join('\n    ')}</ul>
</details>`
    : ''
}

<script>
function toggleCard(el) {
  const detail = el.nextElementSibling;
  const icon = el.querySelector('.expand-icon');
  detail.classList.toggle('open');
  icon.classList.toggle('open');
}
function switchView(btn, cardId, view) {
  const card = document.getElementById(cardId);
  card.querySelectorAll('.view-tab').forEach(t => t.classList.remove('active'));
  card.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  card.querySelector('.view-' + view).classList.add('active');
}
function filterCards(status) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.page-card').forEach(card => {
    if (status === 'all' || card.dataset.status === status) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
</script>
</body>
</html>`;
}

function generateChangedSection(r) {
  const id = `card-${r.slug}`;
  const sizeInfo = r.sizeChanged
    ? `<span class="size-note">Size: ${r.baselineSize.w}×${r.baselineSize.h} → ${r.currentSize.w}×${r.currentSize.h}</span>`
    : '';

  return `
<div class="page-card" data-status="changed" id="${id}">
  <div class="page-header" onclick="toggleCard(this)">
    <span><span class="expand-icon">▶</span> <span class="page-path">${r.pagePath}</span></span>
    <span><span class="badge changed">${r.diffPercent}% diff</span></span>
  </div>
  <div class="diff-detail">
    <div class="meta">${r.numDiffPixels.toLocaleString()} pixels changed ${sizeInfo}</div>
    <div class="view-tabs">
      <button class="view-tab active" onclick="switchView(this,'${id}','sidebyside')">Side by Side</button>
      <button class="view-tab" onclick="switchView(this,'${id}','diff')">Diff Overlay</button>
      <button class="view-tab" onclick="switchView(this,'${id}','baseline')">Baseline</button>
      <button class="view-tab" onclick="switchView(this,'${id}','current')">Current</button>
    </div>
    <div class="view-panel view-sidebyside active">
      <div class="side-by-side">
        <div class="col"><div class="col-label">Baseline (${BASELINE_BRANCH})</div><div class="img-container"><img src="data:image/png;base64,${r.baselineImg}" loading="lazy"></div></div>
        <div class="col"><div class="col-label">Current (${CURRENT_BRANCH})</div><div class="img-container"><img src="data:image/png;base64,${r.currentImg}" loading="lazy"></div></div>
      </div>
    </div>
    <div class="view-panel view-diff"><div class="diff-img"><img src="data:image/png;base64,${r.diffImg}" loading="lazy"></div></div>
    <div class="view-panel view-baseline"><div class="img-container"><img src="data:image/png;base64,${r.baselineImg}" loading="lazy"></div></div>
    <div class="view-panel view-current"><div class="img-container"><img src="data:image/png;base64,${r.currentImg}" loading="lazy"></div></div>
  </div>
</div>`;
}

function generateAddedSection(r) {
  return `
<div class="page-card" data-status="added">
  <div class="page-header" onclick="toggleCard(this)">
    <span><span class="expand-icon">▶</span> <span class="page-path">${r.pagePath}</span></span>
    <span class="badge added">New</span>
  </div>
  <div class="diff-detail">
    <div class="img-container"><img src="data:image/png;base64,${r.currentImg}" loading="lazy"></div>
  </div>
</div>`;
}

function generateRemovedSection(r) {
  return `
<div class="page-card" data-status="removed">
  <div class="page-header" onclick="toggleCard(this)">
    <span><span class="expand-icon">▶</span> <span class="page-path">${r.pagePath}</span></span>
    <span class="badge removed">Removed</span>
  </div>
  <div class="diff-detail">
    <div class="img-container"><img src="data:image/png;base64,${r.baselineImg}" loading="lazy"></div>
  </div>
</div>`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
