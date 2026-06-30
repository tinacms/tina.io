// Build-time asset loading shared by the dynamic blog images. Fonts must be
// ttf/otf/woff — satori (next/og) does not support woff2; images must be
// base64 data URIs. Kept separate from ./ogShared so the pure SVG builders
// there stay testable without a filesystem.

import fs from 'node:fs';
import path from 'node:path';
import { svgDataUri } from './ogShared';

export const fromPublic = (p: string) => path.join(process.cwd(), 'public', p);

export function readFont(file: string) {
  return fs.readFileSync(path.join(process.cwd(), 'public', 'fonts', file));
}

function fileToDataUri(absPath: string, mime: string): string | null {
  try {
    const data = fs.readFileSync(absPath);
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch {
    return null;
  }
}

export function pngDataUri(publicPath: string): string | null {
  return fileToDataUri(fromPublic(publicPath.replace(/^\//, '')), 'image/png');
}

/** The official TinaCMS logo (orange llama + "tinacms"), as an SVG data URI. */
export function logoDataUri(): string | null {
  try {
    const svg = fs.readFileSync(fromPublic('svg/tina-extended-logo.svg'), 'utf8');
    return svgDataUri(svg);
  } catch {
    return null;
  }
}

/** Font set shared by both renderers: IBM Plex Sans headings, Inter body. */
export function ogFonts() {
  return [
    {
      name: 'IBM Plex Sans',
      data: readFont('IBMPlexSans-SemiBold.ttf'),
      weight: 600 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter',
      data: readFont('Inter-Medium.woff'),
      weight: 500 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter',
      data: readFont('Inter-Regular.woff'),
      weight: 400 as const,
      style: 'normal' as const,
    },
  ];
}
