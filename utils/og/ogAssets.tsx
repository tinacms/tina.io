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

// Memoize per asset: fonts/logo are identical for every image and a warm
// function serves many renders, so this avoids re-reading/re-fetching them each
// time. A miss (null) is cached too — a new deployment resets the module.
const assetCache = new Map<string, Promise<Buffer | null>>();

async function fetchPublic(webPath: string): Promise<Buffer | null> {
  const rel = webPath.replace(/^\//, '');
  try {
    return fs.readFileSync(path.join(process.cwd(), 'public', rel));
  } catch {
    // Not on the function fs — fall through to an origin fetch.
  }
  if (RUNTIME_ORIGIN) {
    try {
      const res = await fetch(`${RUNTIME_ORIGIN}/${rel}`);
      if (res.ok) {
        return Buffer.from(await res.arrayBuffer());
      }
    } catch {
      // fall through
    }
  }
  return null;
}

/** Read a public/ asset by its web path ("/fonts/x.ttf"): disk first, then the
 *  production host. Returns null if neither has it (e.g. an unmapped author). */
function loadPublic(webPath: string): Promise<Buffer | null> {
  let cached = assetCache.get(webPath);
  if (!cached) {
    cached = fetchPublic(webPath);
    assetCache.set(webPath, cached);
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
  const [ibm, interMedium, interRegular] = await Promise.all([
    loadPublic('/fonts/IBMPlexSans-SemiBold.ttf'),
    loadPublic('/fonts/Inter-Medium.woff'),
    loadPublic('/fonts/Inter-Regular.woff'),
  ]);

  const fonts: {
    name: string;
    data: Buffer;
    weight: 400 | 500 | 600;
    style: 'normal';
  }[] = [];
  if (ibm) {
    fonts.push({
      name: 'IBM Plex Sans',
      data: ibm,
      weight: 600,
      style: 'normal',
    });
  }
  if (interMedium) {
    fonts.push({
      name: 'Inter',
      data: interMedium,
      weight: 500,
      style: 'normal',
    });
  }
  if (interRegular) {
    fonts.push({
      name: 'Inter',
      data: interRegular,
      weight: 400,
      style: 'normal',
    });
  }
  return fonts;
}
