import Image from 'next/image';
import type { PageBlocksFeatureCard } from 'tina/__generated__/types';
import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { sanitizeLabel } from '@/utils/sanitizeLabel';

function FeatureCardItem(data: {
  data: PageBlocksFeatureCard['cards'][number];
}) {
  const { title, featureHeadline, featureText, buttons, image, themeColour } =
    data.data;

  const themeColourMap = {
    black: 'text-black',
    blue: 'text-blue-600',
    tinaOrange: 'text-orange-500',
  };

  const headlineClass = themeColourMap[themeColour] || 'text-black';

  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/40 shadow-lg"
      id={sanitizeLabel(title)}
    >
      <div className="flex flex-col gap-3 p-8">
        <h3 className="text-2xl md:text-3xl font-bold font-ibm-plex">
          {title}
        </h3>
        <h4
          className={`text-base md:text-lg font-ibm-plex font-normal ${headlineClass}`}
        >
          {featureHeadline}
        </h4>
        <p className="text-neutral-text-secondary font-normal leading-relaxed text-sm">
          {featureText}
        </p>
        <div className="flex flex-row gap-2 pt-1">
          {buttons?.map((button, _index) => (
            <RenderButton key={button.label} button={button} />
          ))}
        </div>
      </div>
      {image && (
        <div className="mt-auto px-6">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="rounded-t-md shadow-xl w-full"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}

export default function FeatureCard(data: { data: PageBlocksFeatureCard }) {
  const { title, sectionEyebrow, cards } = data.data;

  return (
    <Container className="flex flex-col items-center gap-6">
      <h3 className="font-ibm-plex font-semibold bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
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
