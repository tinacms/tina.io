// Renders the 4:5 portrait Instagram image for a blog post (served by the route
// handlers under app/blog/instagram and app/zh/blog/instagram).
//
// Same brand language as the landscape OpenGraph image (utils/og/blogOgImage) —
// dark text side, orange S-curve panel, author cutout or llama — reflowed for a
// tall 1080x1350 feed post with the subject shown larger.

import { ImageResponse } from 'next/og';
import { authorImagePath, type LlamaSrc, pickLlama } from './authorImages';
import { logoDataUri, ogFonts, pngDataUri } from './ogAssets';
import {
  darkOverlayUri,
  dotGridUri,
  orangePanelUri,
  pickFontSize,
  type SubjectLayout,
  truncateTitle,
} from './ogShared';

export const IG_SIZE = { width: 1080, height: 1350 };

const W = IG_SIZE.width;
const H = IG_SIZE.height;

// The orange panel takes a touch under half the width; the curve swings wider
// than the landscape version so it still reads as a clear S over the tall
// canvas. EDGE = nominal divider x, AMP = how far it swings either side.
const EDGE = Math.round(W * 0.52); // ~562
const AMP = 104;

const ORANGE_PANEL_URI = orangePanelUri({ W, H, edge: EDGE, amp: AMP });
const DARK_OVERLAY_URI = darkOverlayUri({ W, H, edge: EDGE, amp: AMP });
const DOT_GRID_URI = dotGridUri({ W, H, maxX: EDGE - 120 });

// Subject placement on the orange panel. The dark overlay clips anything that
// overflows past the curve.
const LLAMA_LAYOUT: Record<LlamaSrc, SubjectLayout> = {
  '/ai-llamas/Relax-Llama.png': { width: 520, bottom: 0, right: 36 },
  '/ai-llamas/tina-llama-working-laptop-table.png': {
    width: 640,
    bottom: 24,
    right: 0,
  },
};

// Author cutout: fit to a tall height and centred in the panel area, bottom-
// anchored — sized and placed identically for every author, never cropped.
// Centre the subject within the orange region (right of the curve), not the
// whole right half, so the curve doesn't clip into the body.
const AUTHOR_AREA = { width: 556, right: 0, height: H };
const AUTHOR_HEIGHT = 1000;

// Bigger type than the landscape image — a portrait feed post has the room and
// is viewed small, so the headline should dominate. Font shrinks by length
// ([maxLength, fontSize], largest-first), then truncates beyond TITLE_CAP.
const TITLE_TIERS: ReadonlyArray<[number, number]> = [
  [30, 88],
  [55, 76],
  [78, 58],
  [100, 48],
];
const TITLE_FONT_MIN = 42;
const TITLE_CAP = 118;

export interface BlogInstagramInput {
  title: string;
  author?: string | null;
  /** Stable seed for the llama fallback (use the post slug). */
  seed: string;
}

export async function renderBlogInstagramImage({
  title,
  author,
  seed,
}: BlogInstagramInput): Promise<ImageResponse> {
  const mappedAvatar = authorImagePath(author);
  const avatarUri = mappedAvatar ? pngDataUri(mappedAvatar) : null;
  const llamaSrc = pickLlama(seed);
  const llamaUri = avatarUri ? null : pngDataUri(llamaSrc);
  const llamaLayout = LLAMA_LAYOUT[llamaSrc];

  const logo = logoDataUri();
  const displayTitle = truncateTitle(title.trim() || 'TinaCMS Blog', TITLE_CAP);
  const fontSize = pickFontSize(
    displayTitle.length,
    TITLE_TIERS,
    TITLE_FONT_MIN,
  );
  // The portrait column is narrow, so credit just the first author (which also
  // matches the featured photo) rather than overflowing a long multi-author line.
  const firstAuthor = author?.split(/&|,| and /i)[0]?.trim();
  const authorLabel = firstAuthor || 'The TinaCMS Team';

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
          'linear-gradient(150deg, #1b1a1f 0%, #0a0a0b 55%, #050505 100%)',
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

      {/* AUTHOR — trimmed cutout, fit to a tall height, bottom-anchored */}
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

      {/* DARK CLIP OVERLAY — repaints the dark side over any overflow */}
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
          width: EDGE - AMP + 40,
          height: '100%',
          padding: '72px 36px 76px 76px',
          position: 'relative',
        }}
      >
        {/* New Post pill */}
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              backgroundColor: '#ffffff',
              color: '#16151a',
              fontFamily: 'IBM Plex Sans',
              fontSize: 30,
              lineHeight: 1,
              padding: '16px 30px',
              borderRadius: 9999,
              boxShadow: '0 8px 22px rgba(0,0,0,0.45)',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 13,
                height: 13,
                borderRadius: 9999,
                backgroundColor: '#EC4815',
              }}
            />
            New Post
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            minHeight: 0,
            padding: '40px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'IBM Plex Sans',
              fontSize,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              maxHeight: Math.round(fontSize * 1.1 * 8),
              overflow: 'hidden',
            }}
          >
            {displayTitle}
          </div>
        </div>

        {/* Author + official Tina logo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 34,
              fontFamily: 'Inter',
            }}
          >
            <span style={{ color: '#7d7d86', paddingRight: 12 }}>By</span>
            <span style={{ color: '#ffffff', fontWeight: 500 }}>
              {authorLabel}
            </span>
          </div>
          {logo ? (
            // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
            // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
            <img src={logo} width={236} height={59} />
          ) : (
            <div
              style={{
                display: 'flex',
                fontFamily: 'IBM Plex Sans',
                fontSize: 38,
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
      ...IG_SIZE,
      fonts: ogFonts(),
    },
  );
}
