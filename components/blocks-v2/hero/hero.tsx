import Image from 'next/image';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { H1_HEADINGS } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import RenderButton from '@/utils/renderButtonArrayHelper';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { title, subtext, buttons, image } = data.data || {};

  return (
    <Container size="medium" className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center flex-col gap-8  border-red-500 py-10">
        {title && (
          <h2 className={`${H1_HEADINGS} max-w-md md:max-w-none font-ibm-plex`}>
            {curlyBracketFormatter(title)}
          </h2>
        )}
        {subtext && (
          <p className="text-neutral-text-secondary md:max-w-[62ch] font-light leading-relaxed text-lg max-w-md">
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
        <div className="relative flex items-center justify-center mx-auto max-w-md md:max-w-none">
          <Image
            src={image}
            alt={title || 'Hero image'}
            width={500}
            height={500}
            className="w-[250px] h-[300px] md:w-[500px] md:h-[500px]"
          />
        </div>
      )}
    </Container>
  );
}
