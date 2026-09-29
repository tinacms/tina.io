'use client';

import { MotionConfig, motion } from 'framer-motion';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import { BODY_TEXT, H1_HEADINGS_SIZE } from '@/component/styles/typography';

// Entrance order: headline, headline 2, body and buttons, then the image.
const RISE_DELAY = { headline: 0, headline2: 0.12, body: 0.28 };
const IMAGE_DELAY = 0.4;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Poster layout for the Hero block: headline and text on the left, the
// Poster Image flying in on the right. Stacks with the image below on
// mobile. MotionConfig drops the movement (keeping a short fade) for
// visitors who prefer reduced motion, without a server/client mismatch.
export const PosterHero = ({ data }) => {
  const Heading = data.blockSettings?.isHeadingOne ? 'h1' : 'h2';

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={data.anchorId || undefined}
        className={`overflow-hidden scroll-mt-24 ${data.margin || 'py-4 lg:py-8'}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12">
          <div
            className={`flex flex-col items-start ${data.spacing || 'gap-6'}`}
          >
            <Heading className={`${H1_HEADINGS_SIZE} font-ibm-plex`}>
              <motion.span
                {...rise(RISE_DELAY.headline)}
                className="block"
                data-tina-field={tinaField(data, 'headline')}
              >
                {data.headline}
              </motion.span>{' '}
              {data.headline2 && (
                <motion.span
                  {...rise(RISE_DELAY.headline2)}
                  className="block"
                  data-tina-field={tinaField(data, 'headline2')}
                >
                  {data.headline2}
                </motion.span>
              )}
            </Heading>

            {data.text && (
              <motion.p
                {...rise(RISE_DELAY.body)}
                className={`${BODY_TEXT} max-w-xl`}
                data-tina-field={tinaField(data, 'text')}
              >
                {data.text}
              </motion.p>
            )}

            {data.buttons?.length > 0 && (
              <motion.div
                {...rise(RISE_DELAY.body)}
                className="flex flex-wrap items-center gap-4"
              >
                {data.buttons.map((button) => (
                  <RenderButton
                    key={`posterHero-${button.label}`}
                    button={button}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* A fixed 3:4 frame keeps any image in bounds. */}
          <motion.div
            initial={{ opacity: 0, x: 120, y: -40 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 14,
              delay: IMAGE_DELAY,
            }}
            className="w-60 md:w-72 lg:w-96 justify-self-center md:justify-self-end"
            data-tina-field={tinaField(data, 'posterImage')}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
              }}
              className="relative aspect-3/4"
            >
              <Image
                src={data.posterImage}
                alt=""
                fill={true}
                priority={true}
                sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 240px"
                className="object-contain object-bottom"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};
