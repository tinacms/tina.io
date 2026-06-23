// utils/og/blogOgImage.tsx
//
// Renders the dynamic OpenGraph image for a blog post. Used by the
// `opengraph-image` file conventions under app/blog and app/zh/blog.
//
// Design: a dark charcoal left side (white "New Post" pill, IBM Plex headline,
// "By {author}", orange Tina logo) and an orange brand-gradient panel on the
// right whose left edge is a smooth S-curve. The subject — the author's cutout
// if we have one, otherwise a llama mascot — stands on the orange panel and is
// clipped to the curve.

import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { authorImagePath, type LlamaSrc, pickLlama } from './authorImages';

export const OG_SIZE = { width: 1200, height: 630 };

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

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/** The official TinaCMS logo (orange llama + "tinacms"), as an SVG data URI. */
function logoDataUri(): string | null {
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

// The S-curve dividing the dark side from the orange panel. CURVE_BODY is the
// two cubic segments (top -> bottom); the orange panel and the dark clip
// overlay reuse it so their edges line up exactly.
const CURVE_TOP_X = EDGE + AMP * 0.55;
const CURVE_BOT_X = EDGE - AMP * 0.55;
const CURVE_BODY =
  `C ${CURVE_TOP_X - AMP * 1.9} ${H * 0.3}, ${EDGE - AMP * 1.2} ${H * 0.34}, ${EDGE - AMP * 0.15} ${H * 0.5} ` +
  `C ${EDGE + AMP * 0.9} ${H * 0.66}, ${CURVE_BOT_X + AMP * 1.7} ${H * 0.7}, ${CURVE_BOT_X} ${H}`;

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

// Bottom-right placement on the orange panel, tuned per subject (silhouettes
// differ a lot). The dark overlay clips anything that overflows past the curve.
type SubjectLayout = { width: number; bottom: number; right: number };

const LLAMA_LAYOUT: Record<LlamaSrc, SubjectLayout> = {
  '/ai-llamas/Relax-Llama.png': { width: 352, bottom: 0, right: 46 },
  '/ai-llamas/tina-llama-working-laptop-table.png': {
    width: 452,
    bottom: 16,
    right: 12,
  },
};

// Author cutouts are trimmed to the person, then fit to a fixed HEIGHT and
// centred in this panel area, bottom-anchored — so every author is sized and
// placed identically, never cropped (no straight edges) and never clipping.
const AUTHOR_AREA = { width: 540, right: 0, height: H };
const AUTHOR_HEIGHT = 552; // leaves ~78px headroom above the head

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

  // Right-hand subject: the author's trimmed cutout if we have one, otherwise a
  // llama mascot. Authors fit-to-height + centre in the panel; the llama
  // mascots are scene illustrations placed by their own per-llama layout.
  const mappedAvatar = authorImagePath(author);
  const avatarUri = mappedAvatar ? pngDataUri(mappedAvatar) : null;
  const llamaSrc = pickLlama(seed);
  const llamaUri = avatarUri ? null : pngDataUri(llamaSrc);
  const llamaLayout = LLAMA_LAYOUT[llamaSrc];

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
      {/* Orange S-curve panel */}
      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={ORANGE_PANEL_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* AUTHOR — trimmed cutout, fit to a fixed height and centred in the
          panel area, bottom-anchored. Same treatment for every author. */}
      {avatarUri ? (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: AUTHOR_AREA.right,
            width: AUTHOR_AREA.width,
            height: AUTHOR_AREA.height,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
          {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
          <img src={avatarUri} height={AUTHOR_HEIGHT} />
        </div>
      ) : null}

      {/* LLAMA fallback — scene illustration placed by its own layout */}
      {llamaUri ? (
        // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
        // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
        <img
          src={llamaUri}
          width={llamaLayout.width}
          style={{
            position: 'absolute',
            bottom: llamaLayout.bottom,
            right: llamaLayout.right,
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
            <img src={logo} width={188} height={47} />
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
