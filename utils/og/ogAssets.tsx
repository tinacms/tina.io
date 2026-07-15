// Build/runtime asset loading shared by the dynamic blog images.
//
// Assets load via `fetch(new URL('…', import.meta.url))` — the pattern the
// Next/@vercel/og docs recommend. Webpack traces each literal path and emits
// the file next to the function bundle, so fonts/images resolve identically
// whether an image is rendered at build time or on-demand at runtime — with no
// dependency on `public/` sitting on the serverless filesystem and no file
// tracing config. Fonts must be ttf/otf/woff (satori does not read woff2);
// images are returned as base64 data URIs.

import { svgDataUri } from './ogShared';

// Image assets, referenced by literal path so webpack can trace and emit each
// one. Author cutouts list only the photos that exist on disk today — add a
// line here when a new author photo lands (authors without one fall back to a
// llama). Keyed by the public path pickLlama()/authorImagePath() return.
const IMAGE_URLS: Record<string, URL> = {
  '/ai-llamas/Relax-Llama.png': new URL(
    '../../public/ai-llamas/Relax-Llama.png',
    import.meta.url,
  ),
  '/ai-llamas/tina-llama-working-laptop-table.png': new URL(
    '../../public/ai-llamas/tina-llama-working-laptop-table.png',
    import.meta.url,
  ),
  '/img/blog/authors/brook-jeynes.png': new URL(
    '../../public/img/blog/authors/brook-jeynes.png',
    import.meta.url,
  ),
  '/img/blog/authors/ivan.png': new URL(
    '../../public/img/blog/authors/ivan.png',
    import.meta.url,
  ),
  '/img/blog/authors/jack-pettit.png': new URL(
    '../../public/img/blog/authors/jack-pettit.png',
    import.meta.url,
  ),
  '/img/blog/authors/josh-berman.png': new URL(
    '../../public/img/blog/authors/josh-berman.png',
    import.meta.url,
  ),
  '/img/blog/authors/matt-wicks.png': new URL(
    '../../public/img/blog/authors/matt-wicks.png',
    import.meta.url,
  ),
};

const LOGO_URL = new URL(
  '../../public/svg/tina-extended-logo.svg',
  import.meta.url,
);

// IBM Plex Sans headings, Inter body. woff/ttf only — satori can't read woff2.
const FONT_URLS = {
  ibmPlexSemiBold: new URL(
    '../../public/fonts/IBMPlexSans-SemiBold.ttf',
    import.meta.url,
  ),
  interMedium: new URL('../../public/fonts/Inter-Medium.woff', import.meta.url),
  interRegular: new URL(
    '../../public/fonts/Inter-Regular.woff',
    import.meta.url,
  ),
};

async function readAsset(url: URL): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return null;
    }
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

/** Base64 PNG data URI for a mapped public path (llama or author), or null. */
export async function pngDataUri(publicPath: string): Promise<string | null> {
  const url = IMAGE_URLS[publicPath];
  if (!url) {
    return null;
  }
  const buf = await readAsset(url);
  if (!buf) {
    return null;
  }
  return `data:image/png;base64,${Buffer.from(buf).toString('base64')}`;
}

/** The official TinaCMS logo (orange llama + "tinacms"), as an SVG data URI. */
export async function logoDataUri(): Promise<string | null> {
  const buf = await readAsset(LOGO_URL);
  if (!buf) {
    return null;
  }
  return svgDataUri(Buffer.from(buf).toString('utf8'));
}

/** Font set shared by both renderers: IBM Plex Sans headings, Inter body. */
export async function ogFonts() {
  const [ibm, interMedium, interRegular] = await Promise.all([
    readAsset(FONT_URLS.ibmPlexSemiBold),
    readAsset(FONT_URLS.interMedium),
    readAsset(FONT_URLS.interRegular),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
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
