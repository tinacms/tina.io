import { ImageResponse } from 'next/og';
import { authorImagePath, type LlamaSrc, pickLlama } from './authorImages';
import { logoDataUri, ogFonts, pngDataUri } from './ogAssets';
import {
  dotGridUri,
  orangeSweepUri,
  pickFontSize,
  truncateTitle,
} from './ogShared';

export const IG_SIZE = { width: 1080, height: 1350 };

const W = IG_SIZE.width;
const H = IG_SIZE.height;

const CY = 700;
const ORANGE_PANEL_URI = orangeSweepUri({ W, H, cy: CY });
const DOT_GRID_URI = dotGridUri({ W, H, maxX: W - 44, maxY: CY });

const AUTHOR_HEIGHT = 770;
const LLAMA_WIDTH: Record<LlamaSrc, number> = {
  '/ai-llamas/Relax-Llama.png': 520,
  '/ai-llamas/tina-llama-working-laptop-table.png': 600,
};

const TITLE_TIERS: ReadonlyArray<[number, number]> = [
  [42, 82],
  [82, 66],
  [118, 54],
];
const TITLE_FONT_MIN = 50;
const TITLE_CAP = 118;
const TITLE_MAX_H = 240;

export interface BlogInstagramInput {
  title: string;
  author?: string | null;
  seed: string;
}

export async function renderBlogInstagramImage({
  title,
  author,
  seed,
}: BlogInstagramInput): Promise<ImageResponse> {
  const mappedAvatar = authorImagePath(author);
  const avatarUri = mappedAvatar ? await pngDataUri(mappedAvatar) : null;
  const llamaSrc = pickLlama(seed);
  const llamaUri = avatarUri ? null : await pngDataUri(llamaSrc);
  const llamaWidth = LLAMA_WIDTH[llamaSrc];

  const logo = await logoDataUri();
  const displayTitle = truncateTitle(title.trim() || 'TinaCMS Blog', TITLE_CAP);
  const fontSize = pickFontSize(
    displayTitle.length,
    TITLE_TIERS,
    TITLE_FONT_MIN,
  );
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
          'linear-gradient(160deg, #1b1a1f 0%, #0a0a0b 55%, #050505 100%)',
      }}
    >
      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={DOT_GRID_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM */}
      {/* biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse */}
      <img
        src={ORANGE_PANEL_URI}
        width={W}
        height={H}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: W,
          height: H,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {avatarUri ? (
          // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
          // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
          <img src={avatarUri} height={AUTHOR_HEIGHT} />
        ) : llamaUri ? (
          // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
          // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
          <img src={llamaUri} width={llamaWidth} />
        ) : null}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 76,
          width: W - 152,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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

        <div
          style={{
            display: 'flex',
            marginTop: 44,
            fontFamily: 'IBM Plex Sans',
            fontSize,
            lineHeight: 1.05,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            maxHeight: TITLE_MAX_H,
            overflow: 'hidden',
          }}
        >
          {displayTitle}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 32,
            marginTop: 38,
          }}
        >
          <span style={{ color: '#8a8a92', paddingRight: 12 }}>By</span>
          <span style={{ color: '#ffffff', fontWeight: 500 }}>
            {authorLabel}
          </span>
        </div>

        {logo ? (
          // biome-ignore lint/a11y/useAltText: rendered by satori, not the DOM
          // biome-ignore lint/performance/noImgElement: next/image is unsupported in ImageResponse
          <img src={logo} width={224} height={56} style={{ marginTop: 28 }} />
        ) : (
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontFamily: 'IBM Plex Sans',
              fontSize: 36,
              color: '#ffffff',
            }}
          >
            TinaCMS
          </div>
        )}
      </div>
    </div>,
    {
      ...IG_SIZE,
      fonts: await ogFonts(),
    },
  );
}
