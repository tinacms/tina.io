'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import {
  HERO_BODY_TEXT,
  POSTER_HEADINGS_SIZE,
} from '@/component/styles/typography';

// Entrance order: headline, headline 2, body and buttons, then the image.
const RISE_DELAY = { headline: 0, headline2: 0.12, body: 0.28 };
const IMAGE_DELAY = 0.4;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Poster layout for the Hero block: a giant headline with the Poster Image
// flying in on the right. Motion is skipped for visitors who prefer reduced
// motion.
export const PosterHero = ({ data }) => {
  const reduceMotion = useReducedMotion();
  const Heading = data.blockSettings?.isHeadingOne ? 'h1' : 'h2';

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });

  return (
    <section
      id={data.anchorId || undefined}
      className={`relative overflow-hidden scroll-mt-24 ${
        data.margin || 'pt-24 sm:pt-12 lg:pt-20 lg:pb-24'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`relative z-10 flex flex-col items-start ${
            data.spacing || 'gap-10 lg:gap-12'
          }`}
        >
          <Heading
            className={`${POSTER_HEADINGS_SIZE} max-w-lg font-ibm-plex leading-none tracking-tight`}
          >
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
              className={`${HERO_BODY_TEXT} max-w-xl`}
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

        {/* A fixed 3:4 frame keeps any image in bounds. Below sm it sits
            beside the first line, leaving Headline 2 the full width. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 120, y: -40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 14,
            delay: IMAGE_DELAY,
          }}
          className="absolute -right-6 -top-20 w-28 sm:top-0 sm:w-36 md:w-56 lg:right-8 lg:-top-4 lg:w-96"
          data-tina-field={tinaField(data, 'posterImage')}
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
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
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 224px, 144px"
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
