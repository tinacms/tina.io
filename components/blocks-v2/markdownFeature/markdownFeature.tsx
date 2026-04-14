import Image from 'next/image';
import type { PageBlocksMarkdownFeature } from 'tina/__generated__/types';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';

const terminalLines = [
  { type: 'command', text: '$ npx create-tina-app@latest my-blog' },
  { type: 'success', text: 'Creating your markdown repository...' },
  { type: 'success', text: 'Content ready for GEO optimization' },
  { type: 'blank' },
  { type: 'command', text: '$ echo "GEO loves markdown"' },
  { type: 'result', text: 'AI-powered search optimization' },
  { type: 'result', text: 'No complex build steps' },
  {
    type: 'result',
    text: 'LLM compatibility:',
    badge: 'excellent',
    badgeColor: 'text-green-400',
  },
  {
    type: 'result',
    text: 'GEO readiness:',
    badge: 'excellent',
    badgeColor: 'text-green-400',
  },
];

function TerminalWindow() {
  return (
    <div className="relative w-full max-w-lg">
      <div className="rounded-lg bg-gradient-to-br from-white/10 to-white/40 shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-gray-500 text-xs ml-2 font-mono">
            ~/my-tina-site
          </span>
        </div>
        <div className="px-6 py-5 font-mono text-sm leading-loose space-y-1">
          {terminalLines.map((line) => {
            if (line.type === 'blank') {
              return <div key="blank" className="h-4" />;
            }
            if (line.type === 'command') {
              return (
                <div key={line.text} className="text-gray-800 font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.text} className="text-gray-600">
                  <span className="text-green-500 mr-1">{'\u2713'}</span>
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.text} className="text-gray-600">
                <span className="text-blue-500 mr-1">{'>'}</span>
                {line.text}
                {line.badge && (
                  <span className="ml-4 text-green-500">{line.badge}</span>
                )}
              </div>
            );
          })}
          <div className="w-3 h-4 bg-orange-500 mt-1" />
        </div>
        <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-gray-200 text-xs">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Markdown in
          </span>
          <span className="text-gray-400">{'\u2192'}</span>
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            AI + GEO ready
          </span>
        </div>
      </div>
    </div>
  );
}

function CheckBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-orange-500 font-semibold text-sm">
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" />
      </svg>
      {children}
    </span>
  );
}

export default function MarkdownFeature(data: {
  data: PageBlocksMarkdownFeature;
}) {
  const { title, subtitle, bodyText, badges, mascotImage } = data.data;

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-10">
        <div className="relative flex justify-center pt-20">
          <TerminalWindow />
          {mascotImage && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 lg:w-40 z-10">
              <Image
                src={mascotImage}
                alt="Tina mascot"
                width={160}
                height={160}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {title && (
            <h2
              className={`${H1_HEADINGS_SIZE} font-ibm-plex font-bold leading-tight`}
            >
              {curlyBracketFormatter(title)}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              {subtitle}
            </p>
          )}
          {bodyText && (
            <p className="text-neutral-text-secondary text-lg md:text-xl leading-relaxed">
              {bodyText}
            </p>
          )}
          {badges?.length > 0 && (
            <div className="flex flex-wrap gap-6 pt-4">
              {badges.map((badge) => (
                <CheckBadge key={badge}>{badge}</CheckBadge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
