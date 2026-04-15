import type { PageBlocksMarkdownFeature } from 'tina/__generated__/types';
import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import { TerminalPanel } from './TerminalPanel';

function FeatureTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
        role="img"
        aria-label={label}
      >
        <circle cx="8" cy="8" r="8" fill="#ec4815" />
        <path
          d="M5 8l2 2 4-4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[#ec4815] text-xs font-semibold font-ibm-plex uppercase">
        {label}
      </span>
    </div>
  );
}

export default function MarkdownFeature(data: {
  data: PageBlocksMarkdownFeature;
}) {
  const { title, subtitle, subtext, featureTags, secondaryImage } = data.data;

  return (
    <Container
      size="medium"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10"
    >
      <div className="order-1 md:order-1 pt-8 md:pt-16">
        <TerminalPanel secondaryImage={secondaryImage} />
      </div>
      <div className="flex flex-col gap-6 order-2 md:order-2">
        {title && (
          <h2 className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex`}>
            {curlyBracketFormatter(title)}
          </h2>
        )}
        {(subtitle || subtext) && (
          <p className="text-neutral-text-secondary font-normal leading-relaxed text-lg max-w-[62ch]">
            {subtitle && <strong className="text-black">{subtitle} </strong>}
            {subtext}
          </p>
        )}
        {featureTags && featureTags.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 py-1">
            {featureTags.map((tag) =>
              tag?.label ? (
                <FeatureTag key={tag.label} label={tag.label} />
              ) : null,
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
