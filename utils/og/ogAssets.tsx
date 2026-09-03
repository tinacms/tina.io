// Build/runtime asset loading shared by the dynamic blog images.
//
// Loads fonts/logo/images from `public/`. At build time (and any runtime where
// public/ is on the function filesystem) it reads from disk. When rendered
// on-demand at runtime, public/ may NOT be bundled into the serverless function
// (this app sets outputFileTracing: false, so nothing is traced in), so we fall
// back to fetching the asset from the live deployment. That keeps image
// generation off the build path without depending on the bundle layout.
//
// Fonts must be ttf/otf/woff (satori does not read woff2); images are returned
// as base64 data URIs.

import fs from 'node:fs';
import path from 'node:path';
import { svgDataUri } from './ogShared';

// Origin used to fetch public/ assets when they aren't on the function
// filesystem. Prefer the stable production host: it's a public alias that's
// never deployment-protected, so the self-fetch below can't 401 (the
// per-deployment VERCEL_URL can be gated by Vercel Deployment Protection).
// Fall back to VERCEL_URL, then null (local/build, where the disk read is used).
const ASSET_HOST =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || null;
const RUNTIME_ORIGIN = ASSET_HOST ? `https://${ASSET_HOST}` : null;

// Memoize successful loads per asset: fonts/logo are identical for every image
// and a warm function serves many renders, so this avoids re-reading/re-fetching
// them each time. Misses are evicted (see loadPublic) so a transient failure
// isn't pinned for the life of the instance.
const assetCache = new Map<string, Promise<Buffer | null>>();

async function fetchPublic(webPath: string): Promise<Buffer | null> {
  const rel = webPath.replace(/^\//, '');
  try {
    return fs.readFileSync(path.join(process.cwd(), 'public', rel));
  } catch {
    // Not on the function fs — fall through to an origin fetch.
  }
  if (!RUNTIME_ORIGIN) {
    return null;
  }
  // Bound the self-fetch: a hung production host would otherwise stall the
  // render to the function's max duration. A timeout rejects, which the caller
  // treats as a transient failure (below) — 500, not cached, retried.
  const res = await fetch(`${RUNTIME_ORIGIN}/${rel}`, {
    signal: AbortSignal.timeout(5000),
  });
  if (res.ok) {
    return Buffer.from(await res.arrayBuffer());
  }
  if (res.status === 404) {
    // Genuinely absent (e.g. an unmapped author) — the caller falls back.
    return null;
  }
  // Any other status — or a network error, which rejects fetch — is a transient
  // failure. Throw so the render 500s and is NOT ISR-cached, rather than silently
  // shipping a degraded image (dropped font, llama-substituted author) that would
  // otherwise stick for the life of the deployment.
  throw new Error(`OG asset fetch failed: /${rel} (${res.status})`);
}

/** Read a public/ asset by its web path ("/fonts/x.ttf"): disk first, then the
 *  production host. Returns null when the asset is genuinely absent (404, e.g. an
 *  unmapped author); rejects on a transient load failure (see fetchPublic). */
function loadPublic(webPath: string): Promise<Buffer | null> {
  let cached = assetCache.get(webPath);
  if (!cached) {
    cached = fetchPublic(webPath);
    assetCache.set(webPath, cached);
    // Only successful buffers stay cached. Evict a miss (null) or a rejection so
    // a transient failure can't poison the warm instance (a pinned rejected
    // promise would re-throw for every later render); the next render retries.
    cached
      .then((buf) => {
        if (!buf) {
          assetCache.delete(webPath);
        }
      })
      .catch(() => assetCache.delete(webPath));
  }
  return cached;
}

/** Base64 PNG data URI for a public path (llama or author cutout), or null. */
export async function pngDataUri(webPath: string): Promise<string | null> {
  const buf = await loadPublic(webPath);
  if (!buf) {
    return null;
  }
  return `data:image/png;base64,${buf.toString('base64')}`;
}

/** The official TinaCMS logo (orange llama + "tinacms"), as an SVG data URI. */
export async function logoDataUri(): Promise<string | null> {
  const buf = await loadPublic('/svg/tina-extended-logo.svg');
  if (!buf) {
    return null;
  }
  return svgDataUri(buf.toString('utf8'));
}

/** Font set shared by both renderers: IBM Plex Sans headings, Inter body. */
export async function ogFonts() {
  const specs = [
    {
      name: 'IBM Plex Sans',
      path: '/fonts/IBMPlexSans-SemiBold.ttf',
      weight: 600,
    },
    { name: 'Inter', path: '/fonts/Inter-Medium.woff', weight: 500 },
    { name: 'Inter', path: '/fonts/Inter-Regular.woff', weight: 400 },
  ] as const;

  const bufs = await Promise.all(specs.map((s) => loadPublic(s.path)));
  // Fonts are required assets. satori only throws when ZERO fonts load, so a
  // silently-dropped font would ship a valid-but-wrong-typography 200 that ISR
  // then caches for the deploy's life. Throw instead: 500s aren't cached, so the
  // next request retries.
  return specs.map((s, i) => {
    const data = bufs[i];
    if (!data) {
      throw new Error(`OG font failed to load: ${s.path}`);
    }
    return { name: s.name, data, weight: s.weight, style: 'normal' as const };
  });
}
