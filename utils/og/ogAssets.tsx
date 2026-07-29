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

export function logoDataUri(): string | null {
  try {
    const svg = fs.readFileSync(
      fromPublic('svg/tina-extended-logo.svg'),
      'utf8',
    );
    return svgDataUri(svg);
  } catch {
    return null;
  }
}

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
