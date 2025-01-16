import Marquee from '@/components/ui/marquee';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from 'utils';

// const checkTouchScreen = () => {
//   let hasTouchScreen = false;
//   if ('maxTouchPoints' in navigator) {
//     hasTouchScreen = navigator.maxTouchPoints > 0;
//   } else {
//     const mQ = matchMedia?.('(pointer:coarse)');
//     if (mQ?.media === '(pointer:coarse)') {
//       hasTouchScreen = !!mQ.matches;
//     } else if ('orientation' in window) {
//       hasTouchScreen = true; // deprecated, but good fallback
//     } else {
//       // Only as a last resort, fall back to user agent sniffing
//       const UA: string = (navigator as Navigator).userAgent;
//       hasTouchScreen =
//         /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
//         /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
//     }
//   }
//   return hasTouchScreen;
// };

const TestimonialCard = ({ ...data }) => {
  const Elem = data?.link ? 'a' : 'div';

  return (
    <Elem href={data.link} data-tina-field={tinaField(data, 'name')}>
      <figure
        className={cn(
          'relative w-96 h-48 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col justify-between',
          // light styles
          'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
          // dark styles
          'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
        )}
      >
        <blockquote className="text-sm text-gray-700 leading-relaxed">
          {data.testimonial && (
            <div className="text-base lg:text-md line-clamp-3">
              <TinaMarkdown
                // components={contentComponents}
                content={data.testimonial}
              />
            </div>
          )}
        </blockquote>
        <div
          className={cn(
            'flex items-center gap-3',
            data.rhsImage ? 'flex-row-reverse justify-between' : 'flex-row'
          )}
        >
          <img
            className={cn(
              'w-12 h-12 border border-gray-300',
              data.imageBorder ? 'rounded-full' : 'rounded-sm'
            )}
            alt="Testimonial avatar"
            width={48}
            height={48}
            src={data.avatar}
          />
          <div className="flex flex-col">
            {data.name && (
              <h4 className="text-lg font-medium text-blue-800">{data.name}</h4>
            )}
            {(data.username || data.date) && (
              <p className="text-sm text-blue-600">
                {data.username && <>@{data.username}</>}
                {data.username && data.date && (
                  <span className="mx-1.5 text-gray-400">&ndash;</span>
                )}
                {data.date && (
                  <span className="text-blue-500">{formatDate(data.date)}</span>
                )}
              </p>
            )}
          </div>
        </div>
      </figure>
    </Elem>
  );
};

export default function TestimonialsBlock({ data, index }) {
  // const isTouchScreen = useMemo(() => checkTouchScreen(), []);
  const [isShowingAll, setIsShowingAll] = useState(false);
  const titleRef = useRef(null);
  const firstRow = data.testimonials.slice(0, data.testimonials.length / 2);
  const secondRow = data.testimonials.slice(data.testimonials.length / 2);

  return (
    <>
      <h1
        className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center mt-20`}
        data-tina-field={tinaField(data, 'title')}
        ref={titleRef}
      >
        {data?.title || 'Loved by Developers'}
      </h1>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden ">
        <Marquee pauseOnHover className="[--duration:40s]">
          {firstRow.map((review, index) => (
            <div key={index} className="mr-4">
              <TestimonialCard key={review.username} {...review} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((review, index) => (
            <div key={index} className="mr-4">
              <TestimonialCard key={review.username} {...review} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </>
  );
}
