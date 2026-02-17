import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '../..');

/** Recursively find files matching a pattern in a directory. */
function findFiles(dir: string, ext: string): string[] {
  const absDir = path.resolve(ROOT, dir);
  if (!fs.existsSync(absDir)) return [];

  const results: string[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(ext) && !entry.name.startsWith('.')) {
        results.push(path.relative(absDir, full));
      }
    }
  };
  walk(absDir);
  return results.sort();
}

/** List files in a single directory (non-recursive) matching an extension. */
function listFiles(dir: string, ext: string): string[] {
  const absDir = path.resolve(ROOT, dir);
  if (!fs.existsSync(absDir)) return [];
  return fs
    .readdirSync(absDir)
    .filter((f) => f.endsWith(ext) && !f.startsWith('.'))
    .sort();
}

/**
 * Discovers every routable page in the site by scanning
 * content directories and known static routes.
 */
export function discoverPages(): string[] {
  const pages: string[] = [];

  // ── Static routes ────────────────────────────────────────────────
  pages.push(
    '/',
    '/blog',
    '/docs',
    '/community',
    '/conference',
    '/events',
    '/examples',
    '/search',
    '/whats-new/tinacms',
    '/whats-new/tinacloud',
    '/zh/blog',
    '/zh/docs'
  );

  // ── BlocksPages (EN) ────────────────────────────────────────────
  // content/blocksPages/*.json → /{filename}
  // home.json → / (already in static routes)
  for (const file of listFiles('content/blocksPages', '.json')) {
    const slug = path.basename(file, '.json');
    if (slug === 'home') continue;
    pages.push(`/${slug}`);
  }

  // ── BlocksPages (ZH) ────────────────────────────────────────────
  // content/blocksPages/zh/*.json → /zh/{slug}
  for (const file of listFiles('content/blocksPages/zh', '.json')) {
    const slug = path.basename(file, '.json');
    if (slug === 'home') continue;
    pages.push(`/zh/${slug}`);
  }

  // ── Blog posts (EN) ─────────────────────────────────────────────
  // content/blog/*.mdx → /blog/{filename}
  const enBlogFiles = listFiles('content/blog', '.mdx');
  for (const file of enBlogFiles) {
    const slug = path.basename(file, '.mdx');
    pages.push(`/blog/${slug}`);
  }

  // Blog pagination (EN): 8 posts per page
  const enBlogPageCount = Math.ceil(enBlogFiles.length / 8);
  for (let i = 1; i <= enBlogPageCount; i++) {
    pages.push(`/blog/page/${i}`);
  }

  // ── Blog posts (ZH) ─────────────────────────────────────────────
  // content/blog-zh/*.mdx → /zh/blog/{filename}
  const zhBlogFiles = listFiles('content/blog-zh', '.mdx');
  for (const file of zhBlogFiles) {
    const slug = path.basename(file, '.mdx');
    pages.push(`/zh/blog/${slug}`);
  }

  // Blog pagination (ZH)
  const zhBlogPageCount = Math.ceil(zhBlogFiles.length / 8);
  for (let i = 1; i <= zhBlogPageCount; i++) {
    pages.push(`/zh/blog/page/${i}`);
  }

  // ── Docs (EN) ────────────────────────────────────────────────────
  // content/docs/**/*.mdx → /docs/{path}
  // Excludes: r/ directory (redirects), index.mdx (served at /docs)
  for (const relPath of findFiles('content/docs', '.mdx')) {
    if (relPath.startsWith('r/') || relPath.startsWith('r\\')) continue;
    const slug = relPath.replace(/\.mdx$/, '').replace(/\\/g, '/');
    if (slug === 'index') continue;
    pages.push(`/docs/${slug}`);
  }

  // ── Docs (ZH) ────────────────────────────────────────────────────
  // content/docs-zh/**/*.mdx → /zh/docs/{path}
  for (const relPath of findFiles('content/docs-zh', '.mdx')) {
    const slug = relPath.replace(/\.mdx$/, '').replace(/\\/g, '/');
    if (slug === 'index') continue;
    pages.push(`/zh/docs/${slug}`);
  }

  return Array.from(new Set(pages)).sort();
}
