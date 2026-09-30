import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import { BODY_TEXT, H1_HEADINGS_SIZE } from '@/component/styles/typography';

// Entrance: the text rises in, then the image flies in from the right and
// hovers. Visitors who prefer reduced motion get a short fade instead.
const RISE =
  'motion-safe:animate-fade-up motion-safe:animate-duration-700 motion-safe:animate-ease-out motion-reduce:animate-fade motion-reduce:animate-duration-200';
const FLY_IN =
  'motion-safe:animate-fade-left motion-safe:animate-duration-1000 motion-safe:animate-ease-out motion-safe:animate-delay-700 motion-reduce:animate-fade motion-reduce:animate-duration-200';

// Side image layout for the Hero block: headline and text on the left, the
// Side Image on the right. Stacks with the image below on mobile.
export const SideImageHero = ({ data }) => {
  const Heading = data.blockSettings?.isHeadingOne ? 'h1' : 'h2';

  return (
    <section
      id={data.anchorId || undefined}
      className={`overflow-hidden scroll-mt-24 ${data.margin || 'py-4 lg:py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">
        <div className={`flex flex-col items-start ${data.spacing || 'gap-6'}`}>
          <Heading className={`${H1_HEADINGS_SIZE} font-ibm-plex ${RISE}`}>
            <span
              className="block"
              data-tina-field={tinaField(data, 'headline')}
            >
              {data.headline}
            </span>{' '}
            {data.headline2 && (
              <span
                className="block"
                data-tina-field={tinaField(data, 'headline2')}
              >
                {data.headline2}
              </span>
            )}
          </Heading>

          {data.text && (
            <p
              className={`${BODY_TEXT} max-w-xl ${RISE} motion-safe:animate-delay-200`}
              data-tina-field={tinaField(data, 'text')}
            >
              {data.text}
            </p>
          )}

          {data.buttons?.length > 0 && (
            <div
              className={`flex flex-wrap items-center gap-4 ${RISE} motion-safe:animate-delay-200`}
            >
              {data.buttons.map((button) => (
                <RenderButton
                  key={`sideImageHero-${button.label}`}
                  button={button}
                />
              ))}
            </div>
          )}
        </div>

        {/* A fixed 3:4 frame keeps any image in bounds. */}
        <div
          className={`w-60 md:w-72 lg:w-96 justify-self-center md:justify-self-end ${FLY_IN}`}
          data-tina-field={tinaField(data, 'sideImage')}
        >
          <div className="relative aspect-3/4 motion-safe:animate-bob">
            <Image
              src={data.sideImage}
              alt=""
              fill={true}
              priority={true}
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 240px"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
