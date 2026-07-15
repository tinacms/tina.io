// Renders the dynamic OpenGraph image for a blog post (served by the route
// handlers under app/blog/og and app/zh/blog/og).
//
// Design: a dark charcoal left side (title, "By {author}", tinacms logo, "New
// Post" pill) and an orange S-curve panel on the right holding the author's
// cutout — or a llama mascot when there's no photo.

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

export const OG_SIZE = { width: 1200, height: 630 };

const W = OG_SIZE.width;
const H = OG_SIZE.height;

// Orange panel occupies ~42% on the right; its left edge is a vertical S-curve.
// EDGE = nominal divider x; the curve swings AMP px either side as it descends.
const EDGE = Math.round(W * 0.58); // ~696
const AMP = 70;

const ORANGE_PANEL_URI = orangePanelUri({ W, H, edge: EDGE, amp: AMP });
const DARK_OVERLAY_URI = darkOverlayUri({ W, H, edge: EDGE, amp: AMP });
const DOT_GRID_URI = dotGridUri({ W, H, maxX: EDGE - 130 });

// Bottom-right placement on the orange panel, tuned per subject (silhouettes
// differ a lot). The dark overlay clips anything that overflows past the curve.
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

// Font shrinks by length so each tier's longest title still fits ~4 lines in
// the title column (satori doesn't honour line-clamp, so we size to fit), then
// truncates beyond TITLE_CAP. Tiers are [maxLength, fontSize], largest-first.
const TITLE_TIERS: ReadonlyArray<[number, number]> = [
  [40, 64],
  [62, 54],
  [80, 44],
];
const TITLE_FONT_MIN = 38;
const TITLE_CAP = 86;

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
  // Right-hand subject: the author's trimmed cutout if we have one, otherwise a
  // llama mascot. Authors fit-to-height + centre in the panel; the llama
  // mascots are scene illustrations placed by their own per-llama layout.
  const mappedAvatar = authorImagePath(author);
  const avatarUri = mappedAvatar ? await pngDataUri(mappedAvatar) : null;
  const llamaSrc = pickLlama(seed);
  const llamaUri = avatarUri ? null : await pngDataUri(llamaSrc);
  const llamaLayout = LLAMA_LAYOUT[llamaSrc];

  const logo = await logoDataUri();
  const displayTitle = truncateTitle(title, TITLE_CAP);
  const fontSize = pickFontSize(
    displayTitle.length,
    TITLE_TIERS,
    TITLE_FONT_MIN,
  );

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
            {displayTitle}
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
      fonts: await ogFonts(),
    },
  );
}
