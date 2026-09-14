import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '../..');

/** List files in a single directory (non-recursive) matching an extension. */
function listFiles(dir: string, ext: string): string[] {
  const absDir = path.resolve(ROOT, dir);
  if (!fs.existsSync(absDir)) {
    return [];
  }
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
    '/community',
    '/conference',
    '/events',
    '/examples',
    '/search',
    '/whats-new/tinacms',
    '/whats-new/tinacloud',
    '/zh/blog',
  );

  // ── Main (EN) ────────────────────────────────────────────
  // content/main/*.json → /{filename}
  // home.json → / (already in static routes)
  for (const file of listFiles('content/main', '.json')) {
    const slug = path.basename(file, '.json');
    if (slug === 'home') {
      continue;
    }
    pages.push(`/${slug}`);
  }

  // ── Main (ZH) ────────────────────────────────────────────
  // content/main/zh/*.json → /zh/{slug}
  for (const file of listFiles('content/main/zh', '.json')) {
    const slug = path.basename(file, '.json');
    if (slug === 'home') {
      continue;
    }
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

  return Array.from(new Set(pages)).sort();
}
