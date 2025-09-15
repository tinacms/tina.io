import Image from 'next/image';
import type { PageBlocksFeatureCard } from 'tina/__generated__/types';
import {
  BLOCK_HEADINGS,
  SECTION_HEADINGS,
} from '@/component/styles/typography';
import Container from '@/component/util/Container';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { sanitizeLabel } from '@/utils/sanitizeLabel';

const HexagonBackground = ({
  textOnRight,
  headlineClass,
}: {
  textOnRight: boolean;
  headlineClass: string;
}) => (
  <div
    className={`pointer-events-none absolute w-2/3 lg:w-2/3 aspect-square ${headlineClass}`}
    style={{
      ...(textOnRight
        ? { top: '-220px', left: '-150px' }
        : { bottom: '-210px', right: '-180px' }),
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
      {/* Rounded hexagon, fill via tailwind class */}
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
  const {
    title,
    featureHeadline,
    featureText,
    buttons,
    image,
    textOnRight,
    themeColour,
  } = data.data;

  const themeColourMap = {
    black: 'text-black',
    blue: 'text-blue-600',
    tinaOrange: 'text-orange-500',
  };

  const headlineClass = themeColourMap[themeColour] || 'text-black';

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white/10 to-white/40  shadow-lg py-12 lg:py-24 px-5 lg:px-10 rounded-md overflow-hidden gap-y-10"
      id={sanitizeLabel(title)}
    >
      <HexagonBackground
        textOnRight={textOnRight}
        headlineClass={headlineClass}
      />
      <div
        className={` flex flex-col px-10 gap-8 ${textOnRight ? 'order-2' : 'order-1'}`}
      >
        <h3 className={`${BLOCK_HEADINGS} font-ibm-plex`}>{title}</h3>
        <h4
          className={`${SECTION_HEADINGS} font-ibm-plex-[400] ${headlineClass}`}
        >
          {featureHeadline}
        </h4>
        <p className="text-neutral-text-secondary font-light leading-relaxed text-lg max-w-[62ch]">
          {featureText}
        </p>
        <div className="flex gap-2">
          {buttons.map((button, index) => (
            <RenderButton key={button.label} button={button} index={index} />
          ))}
        </div>
      </div>
      <div
        className={`relative  flex items-center justify-center ${textOnRight ? 'order-1' : 'order-2'}`}
      >
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
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
      <h3 className="font-ibm-plex font-semibold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {sectionEyebrow}
      </h3>
      <h2 className={`${BLOCK_HEADINGS} font-ibm-plex`}>{title}</h2>
      <div className="grid grid-cols-1 w-full gap-10 py-10">
        {cards.map((card) => (
          <FeatureCardItem key={card.title} data={card} />
        ))}
      </div>
    </Container>
  );
}
