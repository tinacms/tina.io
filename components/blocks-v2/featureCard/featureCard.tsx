import Image from 'next/image';
import type { PageBlocksFeatureCard } from 'tina/__generated__/types';
import {
  BLOCK_HEADINGS_SIZE,
  SECTION_HEADINGS_SIZE,
} from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { cn } from '@/lib/utils';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { sanitizeLabel } from '@/utils/sanitizeLabel';

const HexagonBackground = ({
  headlineClass,
  className = '',
}: {
  headlineClass: string;
  className?: string;
}) => (
  <div
    className={cn(
      'pointer-events-none absolute w-full aspect-square bottom-[-200px] right-[-150px]',
      headlineClass,
      className,
    )}
    style={{
      zIndex: 0,
      transform: 'rotate(45deg)',
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="
          M50,8
          Q55,8 58,12
          L87,30
          Q92,33 92,40
          L92,70
          Q92,77 87,80
          L58,98
          Q55,102 50,98
          L21,80
          Q16,77 16,70
          L16,40
          Q16,33 21,30
          L50,12
          Q45,8 50,8
          Z
        "
        fill="currentColor"
      />
    </svg>
  </div>
);

function FeatureCardItem(data: {
  data: PageBlocksFeatureCard['cards'][number];
}) {
  const { title, featureHeadline, featureText, buttons, image, themeColour } =
    data.data;

  const hexagonColourMap = {
    black: 'text-black',
    blue: 'text-blue-600',
    tinaOrange: 'text-orange-500',
  };

  const subheadingGradientMap = {
    black:
      'bg-gradient-to-l from-black/80 to-black/40 bg-clip-text text-transparent',
    blue: 'bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent',
    tinaOrange:
      'bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent',
  };

  const hexagonClass = hexagonColourMap[themeColour] || 'text-black';
  const subheadingClass = subheadingGradientMap[themeColour] || 'text-black';

  return (
    <div
      className="relative flex flex-col gap-8 items-center bg-gradient-to-br from-white/10 to-white/40 shadow-lg px-8 lg:px-12 py-8 lg:py-10 rounded-md overflow-hidden"
      id={sanitizeLabel(title)}
    >
      <HexagonBackground headlineClass={`hidden lg:block ${hexagonClass}`} />
      <div className="relative z-10 flex flex-col gap-2 w-full flex-1">
        <h3 className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex`}>{title}</h3>
        <h4
          className={`${SECTION_HEADINGS_SIZE} font-ibm-plex-[400] ${subheadingClass}`}
        >
          {featureHeadline}
        </h4>
        <div className="flex-1" />
        <p className="text-neutral-text-secondary font-normal leading-relaxed text-lg max-w-[62ch] py-4">
          {featureText}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          {buttons?.map((button, _index) => (
            <RenderButton
              key={button.label}
              button={button}
              className="w-full sm:w-auto"
            />
          ))}
        </div>
      </div>
      <div className="relative z-10 hidden lg:flex items-center justify-center w-full mt-auto">
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="rounded-md shadow-xl"
            style={{ objectFit: 'contain' }}
          />
        )}
      </div>
    </div>
  );
}

export default function FeatureCard(data: { data: PageBlocksFeatureCard }) {
  const { title, sectionEyebrow, cards } = data.data;

  return (
    <Container className="flex flex-col items-center gap-6">
      <h3 className="font-ibm-plex font-semibold text-orange-500">
        {sectionEyebrow}
      </h3>
      <h2 className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex`}>{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 py-10">
        {cards?.map((card) => (
          <FeatureCardItem key={card.title} data={card} />
        ))}
      </div>
    </Container>
  );
}
