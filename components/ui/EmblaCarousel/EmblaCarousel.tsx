'use client';

import { EmblaOptionsType } from 'embla-carousel';
import ClassNames from 'embla-carousel-class-names';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides } = props;
  const options: EmblaOptionsType = {
    loop: true,
  };
  const [slideNumber, setSlideNumber] = useState(slides?.length);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section
      className="max-w-3xl m-auto"
      style={{
        WebkitMaskImage: `linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  )`,
        maskImage: `linear-gradient(
    to right,
    transparent,
    black 5%,
    black 95%,
    transparent
  )`,
        WebkitMaskRepeat: 'no repeat',
        maskRepeat: 'no repeat',
      }}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="touch-pan-y touch-pinch-zoom -ml-1 flex">
          {slides.map((slide, index) => (
            <div
              className="embla__slide flex-none basis-[70%] md:basis-[50%] min-w-0 my-16 pl-4 opacity-40 [&.is-snapped]:opacity-100"
              key={`embla-carousel-slide-${index}`}
              style={{
                transform: 'translate3d(0, 0, 0)',
                transition: 'opacity 0.2s ease-in-out',
              }}
            >
              <div className="rounded-[1.8rem] text-4xl font-semibold flex items-center justify-center select-none h-full">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        {Array.from({ length: slideNumber }).map((_, index) => (
          <button
            className={`w-4 h-4 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
            key={`embla-carousel-dot-${index}`}
            onClick={() => scrollTo(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
};

export default EmblaCarousel;
