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

const EDGE = Math.round(W * 0.58);
const AMP = 70;

const ORANGE_PANEL_URI = orangePanelUri({ W, H, edge: EDGE, amp: AMP });
const DARK_OVERLAY_URI = darkOverlayUri({ W, H, edge: EDGE, amp: AMP });
const DOT_GRID_URI = dotGridUri({ W, H, maxX: EDGE - 130 });

const LLAMA_LAYOUT: Record<LlamaSrc, SubjectLayout> = {
  '/ai-llamas/Relax-Llama.png': { width: 352, bottom: 0, right: 46 },
  '/ai-llamas/tina-llama-working-laptop-table.png': {
    width: 452,
    bottom: 16,
    right: 12,
  },
};

const AUTHOR_AREA = { width: 540, right: 0, height: H };
const AUTHOR_HEIGHT = 552;

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
  seed: string;
}

export async function renderBlogOgImage({
  title,
  author,
  seed,
}: BlogOgInput): Promise<ImageResponse> {
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
      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={ORANGE_PANEL_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

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

      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={DARK_OVERLAY_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={DOT_GRID_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

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
