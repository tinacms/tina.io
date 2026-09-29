'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { tinaField } from 'tinacms/dist/react';
import { splitHeadline } from 'utils/splitHeadline';

// Entrance order: headline lead, accent word, body copy, then the image.
const RISE_DELAY = { lead: 0, accent: 0.12, body: 0.28 };
const IMAGE_DELAY = 0.4;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Poster layout: a giant two-line headline with the final word in orange and
// a character image flying in on the right. Motion is skipped entirely for
// visitors who prefer reduced motion.
export const PosterHero = ({ data }) => {
  const reduceMotion = useReducedMotion();
  const Heading = data.blockSettings?.isHeadingOne ? 'h1' : 'h2';
  const [lead, accent] = splitHeadline(data.headline);

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  });

  return (
    <section
      id={data.anchorId || undefined}
      className="relative overflow-hidden scroll-mt-24 pt-24 pb-16 sm:pt-12 lg:pt-20 lg:pb-24"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <Heading
          className="relative z-10 font-ibm-plex font-bold leading-none tracking-tight text-7xl sm:text-8xl lg:text-9xl"
          data-tina-field={tinaField(data, 'headline')}
        >
          {lead && (
            <motion.span
              {...rise(RISE_DELAY.lead)}
              className="block text-gray-900"
            >
              {lead}
            </motion.span>
          )}
          <motion.span
            {...rise(RISE_DELAY.accent)}
            className="block text-orange-500"
          >
            {accent}
          </motion.span>
        </Heading>

        {/* Below sm the image sits beside the short first line, leaving the
            accent word the full width underneath it. */}
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
          >
            {/* Intrinsic size of the default llama; h-auto keeps any other
                image's own proportions. */}
            <Image
              src={data.posterImage}
              alt=""
              width={691}
              height={900}
              priority={true}
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 224px, 144px"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>

        {data.text && (
          <motion.p
            {...rise(RISE_DELAY.body)}
            className="relative z-10 mt-10 lg:mt-12 max-w-xl text-lg lg:text-xl leading-relaxed text-neutral-text-secondary"
            data-tina-field={tinaField(data, 'text')}
          >
            {data.text}
          </motion.p>
        )}
      </div>
    </section>
  );
};
