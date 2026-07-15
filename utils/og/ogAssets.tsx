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

// The deployment's own origin, used to fetch public/ assets when they aren't on
// the function filesystem. VERCEL_URL is the current deployment host at runtime
// (unset locally / at build, where the disk read below is used instead).
const RUNTIME_ORIGIN = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null;

/** Read a public/ asset by its web path ("/fonts/x.ttf"): disk first, then the
 *  live deployment. Returns null if neither has it (e.g. an unmapped author). */
async function loadPublic(webPath: string): Promise<Buffer | null> {
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
