// utils/og/blogOgImage.tsx
//
// Renders the dynamic OpenGraph image for a blog post. Used by the
// `opengraph-image` file conventions under app/blog and app/zh/blog.
//
// Design: a dark charcoal left side (white "New Post" pill, IBM Plex headline,
// "By {author}", orange Tina logo) and an S-curve dividing it from the right.
// Two right-hand modes:
//  - photo mode: a framed author photo (.jpg) masked to the curve, with the
//    orange brand panel revealed alongside it as a border.
//  - figure mode: a transparent cutout / llama mascot standing on the orange
//    panel (the no-photo fallback).

import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { authorImagePath, type LlamaSrc, pickLlama } from './authorImages';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';
export const OG_ALT = 'TinaCMS Blog';

const W = OG_SIZE.width;
const H = OG_SIZE.height;

// Orange panel occupies ~42% on the right; its left edge is a vertical S-curve.
// EDGE = nominal divider x; the curve swings AMP px either side as it descends.
const EDGE = Math.round(W * 0.58); // ~696
const AMP = 70;

// ---------------------------------------------------------------------------
// Asset loading (Node runtime, build time). Fonts must be ttf/otf/woff —
// satori does not support woff2.
// ---------------------------------------------------------------------------

const fromPublic = (p: string) => path.join(process.cwd(), 'public', p);

function readFont(file: string) {
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

function pngDataUri(publicPath: string): string | null {
  return fileToDataUri(fromPublic(publicPath.replace(/^\//, '')), 'image/png');
}

/** Load a public image, picking the mime from its extension. */
function imageDataUri(publicPath: string): string | null {
  const mime = /\.jpe?g$/i.test(publicPath) ? 'image/jpeg' : 'image/png';
  return fileToDataUri(fromPublic(publicPath.replace(/^\//, '')), mime);
}

/** Is this a framed photo (rectangular, with background) vs a cutout/llama? */
function isFramedPhoto(publicPath: string | null): boolean {
  return !!publicPath && /\.jpe?g$/i.test(publicPath);
}

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/** The official TinaCMS logo (orange wordmark), inlined as an SVG data URI. */
function logoDataUri(): string | null {
  try {
    const svg = fs.readFileSync(fromPublic('svg/tina-logo.svg'), 'utf8');
    return svgDataUri(svg);
  } catch {
    return null;
  }
}

// Curve geometry. curveAt(edge) returns the S-curve pieces for a given nominal
// divider x, so the dark side, the orange panel, and a right-shifted copy (for
// the border reveal) all come from one definition.
function curveAt(edge: number) {
  const topX = edge + AMP * 0.55;
  const botX = edge - AMP * 0.55;
  const c1a = `${topX - AMP * 1.9} ${H * 0.3}`;
  const c1b = `${edge - AMP * 1.2} ${H * 0.34}`;
  const p1 = `${edge - AMP * 0.15} ${H * 0.5}`;
  const c2a = `${edge + AMP * 0.9} ${H * 0.66}`;
  const c2b = `${botX + AMP * 1.7} ${H * 0.7}`;
  const end = `${botX} ${H}`;
  return {
    topX,
    botX,
    body: `C ${c1a}, ${c1b}, ${p1} C ${c2a}, ${c2b}, ${end}`, // top -> bottom
    reversed: `C ${c2b}, ${c2a}, ${p1} C ${c1b}, ${c1a}, ${topX} 0`, // bottom -> top
  };
}

// BORDER = how much orange is revealed to the left of the photo.
const BORDER = 46;
const MAIN = curveAt(EDGE);
const SHIFTED = curveAt(EDGE + BORDER);

const CURVE_TOP_X = MAIN.topX;
const CURVE_BOT_X = MAIN.botX;
const CURVE_BODY = MAIN.body;

// Orange panel: from the curve to the right edge, with a faint highlight along
// the curve.
const ORANGE_PANEL_URI = svgDataUri(
  `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="o" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#FF724B"/><stop offset="1" stop-color="#D13F13"/>
      </linearGradient>
      <linearGradient id="hl" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="0.12" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M ${CURVE_TOP_X} 0 ${CURVE_BODY} L ${W} ${H} L ${W} 0 Z" fill="url(#o)"/>
    <path d="M ${CURVE_TOP_X} 0 ${CURVE_BODY} L ${CURVE_BOT_X + 80} ${H} C ${EDGE + AMP * 0.9 + 80} ${H * 0.66}, ${EDGE - AMP * 0.15 + 80} ${H * 0.34}, ${CURVE_TOP_X + 80} 0 Z" fill="url(#hl)"/>
  </svg>`,
);

// Dark clip overlay: from the left edge to the curve, painted over the subject
// so anything overflowing past the curve is hidden (the "clip").
const DARK_OVERLAY_URI = svgDataUri(
  `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="d" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1b1a1f"/><stop offset="0.55" stop-color="#0a0a0b"/><stop offset="1" stop-color="#050505"/>
      </linearGradient>
    </defs>
    <path d="M 0 0 L ${CURVE_TOP_X} 0 ${CURVE_BODY} L 0 ${H} Z" fill="url(#d)"/>
  </svg>`,
);

// Orange border band: the orange panel revealed between the main curve (left)
// and the right-shifted curve (right), i.e. the orange peeking out to the left
// of the photo. Same orange as the panel.
const ORANGE_RIBBON_URI = svgDataUri(
  `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ob" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#FFA06B"/>
        <stop offset="0.45" stop-color="#F2541B"/>
        <stop offset="1" stop-color="#B83310"/>
      </linearGradient>
    </defs>
    <path d="M ${MAIN.topX} 0 ${MAIN.body} L ${SHIFTED.botX} ${H} ${SHIFTED.reversed} Z" fill="url(#ob)"/>
  </svg>`,
);

// Faint dot texture for the dark side.
const DOT_GRID_URI = (() => {
  const dots: string[] = [];
  for (let y = 44; y < H; y += 46) {
    for (let x = 44; x < EDGE - 130; x += 46) {
      dots.push(
        `<circle cx="${x}" cy="${y}" r="1.6" fill="#ffffff" fill-opacity="0.05"/>`,
      );
    }
  }
  return svgDataUri(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${dots.join('')}</svg>`,
  );
})();

// Bottom-right placement, tuned per subject (silhouettes differ a lot). Llamas
// sit fully on the orange panel; author photos fill it and may clip the curve.
type SubjectLayout = { width: number; bottom: number; right: number };

const LLAMA_LAYOUT: Record<LlamaSrc, SubjectLayout> = {
  '/ai-llamas/Peek-Llama.png': { width: 372, bottom: -12, right: 54 },
  '/ai-llamas/Relax-Llama.png': { width: 352, bottom: 0, right: 46 },
  '/ai-llamas/tina-llama-working-laptop-table.png': {
    width: 452,
    bottom: 16,
    right: 12,
  },
};

// Placement for a transparent cutout figure (e.g. a .png author cutout) that
// stands on the orange panel, like the llamas. Framed .jpg photos use photo
// mode instead and don't use this.
const AUTHOR_PORTRAIT_LAYOUT: SubjectLayout = {
  width: 500,
  bottom: 0,
  right: 8,
};

function titleFontSize(title: string): number {
  const len = title.length;
  if (len <= 34) {
    return 66;
  }
  if (len <= 66) {
    return 54;
  }
  if (len <= 104) {
    return 44;
  }
  return 38;
}

export interface BlogOgInput {
  title: string;
  author?: string | null;
  /** Stable seed for the llama fallback (use the post slug). */
  seed: string;
}

export async function renderBlogOgImage({
  title,
  author,
  seed,
}: BlogOgInput): Promise<ImageResponse> {
  const [ibmPlexSemiBold, interMedium, interRegular] = [
    readFont('IBMPlexSans-SemiBold.ttf'),
    readFont('Inter-Medium.woff'),
    readFont('Inter-Regular.woff'),
  ];

  // Right-hand subject. Two modes:
  //  - photo mode: a framed photo (.jpg, with background) masked to the curve.
  //  - figure mode: a transparent cutout / llama standing on the orange panel.
  const mappedAvatar = authorImagePath(author);
  const photoUri =
    mappedAvatar && isFramedPhoto(mappedAvatar)
      ? imageDataUri(mappedAvatar)
      : null;
  const cutoutUri =
    mappedAvatar && !isFramedPhoto(mappedAvatar)
      ? imageDataUri(mappedAvatar)
      : null;
  const llamaSrc = pickLlama(seed);
  const figureUri = cutoutUri ?? pngDataUri(llamaSrc);
  const figureLayout = cutoutUri
    ? AUTHOR_PORTRAIT_LAYOUT
    : LLAMA_LAYOUT[llamaSrc];
  const usePhoto = !!photoUri;

  const logo = logoDataUri();
  const fontSize = titleFontSize(title);

  // Author display: keep the full credited string, but the avatar reflects the
  // first author only.
  const authorLabel = author?.trim() || 'The TinaCMS Team';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        fontFamily: 'Inter',
        backgroundColor: '#0c0c0e',
        backgroundImage:
          'linear-gradient(135deg, #1b1a1f 0%, #0a0a0b 55%, #050505 100%)',
      }}
    >
      {/* PHOTO MODE: framed photo filling the right side (clipped to the curve
          by the dark overlay below) */}
      {usePhoto ? (
        // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
        // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
        <img
          src={photoUri ?? ''}
          width={W - EDGE + AMP + 30}
          height={H}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: H,
            objectFit: 'cover',
          }}
        />
      ) : null}

      {/* FIGURE MODE: orange panel + cutout/llama standing on it */}
      {!usePhoto ? (
        // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
        // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
        <img
          src={ORANGE_PANEL_URI}
          width={W}
          height={H}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : null}
      {!usePhoto && figureUri ? (
        // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
        // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
        <img
          src={figureUri}
          width={figureLayout.width}
          style={{
            position: 'absolute',
            bottom: figureLayout.bottom,
            right: figureLayout.right,
            objectFit: 'contain',
          }}
        />
      ) : null}

      {/* DARK CLIP OVERLAY — repaints the dark side over any overflow,
          clipping the subject exactly along the curve */}
      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={DARK_OVERLAY_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* Orange border band revealed to the left of the photo (photo mode) */}
      {usePhoto ? (
        // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
        // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
        <img
          src={ORANGE_RIBBON_URI}
          width={W}
          height={H}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      ) : null}

      {/* faint dot texture on the dark side */}
      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={DOT_GRID_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* LEFT COLUMN (dark charcoal side) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: EDGE - AMP - 30,
          height: '100%',
          padding: '60px 40px 58px 72px',
          position: 'relative',
        }}
      >
        {/* New Post pill (white on dark, orange dot) */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: '#ffffff',
              color: '#16151a',
              fontFamily: 'IBM Plex Sans',
              fontSize: 25,
              lineHeight: 1,
              padding: '13px 24px',
              borderRadius: 9999,
              boxShadow: '0 8px 22px rgba(0,0,0,0.45)',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 11,
                height: 11,
                borderRadius: 9999,
                backgroundColor: '#EC4815',
              }}
            />
            New Post
          </div>
        </div>

        {/* Title (vertically centred so it never collides with the row below) */}
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            minHeight: 0,
            padding: '26px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'IBM Plex Sans',
              fontSize,
              lineHeight: 1.13,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              maxHeight: Math.round(fontSize * 1.13 * 4.4),
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
        </div>

        {/* Author + official Tina logo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 27,
              fontFamily: 'Inter',
            }}
          >
            <span style={{ color: '#7d7d86', paddingRight: 10 }}>By</span>
            <span style={{ color: '#ffffff', fontWeight: 500 }}>
              {authorLabel}
            </span>
          </div>
          {logo ? (
            // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
            // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
            <img src={logo} width={140} height={60} />
          ) : (
            <div
              style={{
                display: 'flex',
                fontFamily: 'IBM Plex Sans',
                fontSize: 30,
                color: '#ffffff',
              }}
            >
              TinaCMS
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        {
          name: 'IBM Plex Sans',
          data: ibmPlexSemiBold,
          weight: 600,
          style: 'normal',
        },
        { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
