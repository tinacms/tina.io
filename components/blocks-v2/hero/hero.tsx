import Image from 'next/image';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import { cn } from '@/lib/utils';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { RecentNewsBanner } from './RecentNewsBanner';

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const {
    title,
    subtext,
    buttons,
    image,
    buttonHorizontalAlignment,
    recentNewsBanner,
  } = data.data || {};
  const alignment = buttonHorizontalAlignment ?? 'center';

  const bannerFilled =
    recentNewsBanner && (recentNewsBanner.title || recentNewsBanner.link);

  return (
    <Container
      size="medium"
      className="min-h-[50vh]  grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div
        className={cn(
          'flex @container items-center flex-col gap-8  border-red-500 py-10',
          bannerFilled && 'pt-0',
        )}
      >
        <div className="flex flex-col gap-3">
          {bannerFilled && (
            <RecentNewsBanner recentNewsBanner={recentNewsBanner} />
          )}
          {title && (
            <h1
              className={`${H1_HEADINGS_SIZE} max-w-md md:max-w-none font-ibm-plex`}
            >
              {curlyBracketFormatter(title)}
            </h1>
          )}
          {subtext && (
            <p className="text-neutral-text-secondary duration-75 md:max-w-[62ch] font-normal leading-relaxed text-lg max-w-md">
              {subtext}
            </p>
          )}
        </div>
        {buttons && buttons.length > 0 && (
          <div
            className={`flex ${alignment === 'left' ? 'justify-center md:justify-start' : 'justify-center'} w-full flex-row flex-wrap gap-2 max-w-[62ch]`}
          >
            {buttons.map((button, index) => (
              <RenderButton
                key={`button-${button?.label || index}`}
                button={button}
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
            quality={80}
            priority={true}
            fetchPriority="high"
            className="object-contain"
          />
        </div>
      )}
    </Container>
  );
}
