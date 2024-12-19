import Image from 'next/image';
import { useMemo, useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from 'utils';

const checkTouchScreen = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.('(pointer:coarse)');
    if (mQ?.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA: string = (navigator as Navigator).userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
};

const Testimonial = ({ data, ...props }) => {
  const Elem = data.link ? 'a' : 'div';

  return (
    <Elem
      className={`group px-7 lg:px-8 py-6 lg:py-7 mb-6 break-inside-avoid rounded-md bg-gradient-to-b from-white to-white/30 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)] flex flex-col gap-5 text-gray-700 ${
        data.link
          ? 'cursor-pointer hover:shadow-lg hover:bg-white hover:scale-[1.01] transition-all duration-150 ease-out'
          : ''
      }`}
      href={data.link}
      {...props}
      data-tina-field={tinaField(data, 'name')}
    >
      {data.testimonial && (
        <div className="text-base lg:text-md">
          <TinaMarkdown
            // components={contentComponents}
            content={data.testimonial}
          />
        </div>
      )}
      <div className="flex gap-4 items-center">
        {data.avatar && (
          <div
            className={`relative shrink-0 w-14 h-14 overflow-hidden ${
              data.imageBorder
                ? 'rounded-full shadow-[0_1px_3px_1px_rgba(66,_153,_225,0.3)]'
                : 'rounded-sm'
            } ${data.rhsImage ? 'order-1 ml-auto' : ''}`}
          >
            <Image
              alt="Testimonial avatar"
              width={56}
              height={56}
              className={`block absolute w-full h-full top-0 left-0 object-fill ${
                data.link
                  ? 'group-hover:scale-105 transition-all duration-300 ease-in-out'
                  : ''
              }`}
              src={data.avatar}
            />
            <div className="block absolute w-full h-full top-0 left-0 rounded-full"></div>
          </div>
        )}
        <div className="flex flex-col">
          {data.name && (
            <h4 className="text-lg lg:text-xl font-tuner text-blue-800 font-medium">
              {data.name}
            </h4>
          )}
          {(data.username || data.date) && (
            <p className="text-base font-medium text-blue-700">
              {data.username && <>@{data.username}</>}
              {data.username && data.date && (
                <span className="mx-1.5 opacity-30">&ndash;</span>
              )}
              {data.date && (
                <span className="opacity-70 text-blue-600">
                  {formatDate(data.date)}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </Elem>
  );
};

export default function TestimonialsBlock({ data, index }) {
  const isTouchScreen = useMemo(() => checkTouchScreen(), []);
  const [isShowingAll, setIsShowingAll] = useState(false);

  return (
    <>
      <h1
        className={`font-tuner inline-block text-3xl lg:text-3xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center mt-20`}
        data-tina-field={tinaField(data, 'title')}
      >
        {data?.title || 'Loved by Developers'}
      </h1>
      <section
        key={index}
        className={`relative px-8 py-12 lg:py-16 columns-md gap-6`}
        style={{
          columnFill: 'balance-all',
        }}
      >
        {data.testimonials &&
          data.testimonials.map((testimonial, index) => {
            return (
              (([0, 1].includes(index) || isShowingAll || !isTouchScreen) && (
                <Testimonial data={testimonial} key={index} />
              )) ||
              ([2].includes(index) && !isShowingAll && (
                <div
                  className="relative w-full h-full"
                  style={{
                    maskImage: 'linear-gradient(black, transparent 80%)',
                  }}
                >
                  <Testimonial data={testimonial} key={index} />
                </div>
              ))
            );
          })}
      </section>
      {!isShowingAll && isTouchScreen ? (
        <button
          className="text-blue-500 text-lg font-tuner cursor-pointer mb-8"
          onClick={() => setIsShowingAll(true)}
        >
          See all
        </button>
      ) : null}
    </>
  );
}
