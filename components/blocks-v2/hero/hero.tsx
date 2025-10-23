import Image from 'next/image';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import RenderButton from '@/utils/renderButtonArrayHelper';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { title, subtext, buttons, image } = data.data || {};

  return (
    <Container
      size="medium"
      className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="flex items-center flex-col gap-8  border-red-500 py-10">
        {title && (
          <h2
            className={`${H1_HEADINGS_SIZE} max-w-md md:max-w-none font-ibm-plex`}
          >
            {curlyBracketFormatter(title)}
          </h2>
        )}
        {subtext && (
          <p className="text-neutral-text-secondary md:max-w-[62ch] font-normal leading-relaxed text-lg max-w-md">
            {subtext}
          </p>
        )}
        {buttons && buttons.length > 0 && (
          <div className="flex justify-center md:justify-start flex-row flex-wrap gap-2 max-w-[62ch]">
            {buttons.map((button, index) => (
              <RenderButton
                key={`button-${button?.label || index}`}
                button={button}
                index={index}
                className="py-3"
              />
            ))}
          </div>
        )}
      </div>
      {image && (
        <div className="relative w-[250px] h-[300px] md:w-[450px] md:h-[500px] mx-auto">
          <Image
            src={image}
            alt={title || 'Hero image'}
            fill={true}
            sizes="(max-width: 768px) 250px, 450px"
            quality={60}
            priority={true}
            fetchPriority="high"
            className="object-contain"
          />
        </div>
      )}
    </Container>
  );
}
