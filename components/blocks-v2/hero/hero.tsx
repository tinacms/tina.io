'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import type { PageBlocksHeroV2 } from 'tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { H1_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { curlyBracketFormatter } from '@/component/util/CurlyBracketFormatter';
import { cn } from '@/lib/utils';
import RenderButton from '@/utils/renderButtonArrayHelper';
import { RecentNewsBanner } from './RecentNewsBanner';
import { TerminalPanel } from './TerminalPanel';

function FeatureTag({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
        role="img"
        aria-label={label}
      >
        <circle cx="8" cy="8" r="8" fill="#ec4815" />
        <path
          d="M5 8l2 2 4-4"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[#ec4815] text-xs font-semibold font-ibm-plex uppercase">
        {label}
      </span>
    </div>
  );
}

/**
 * Carousel navigation with CSS-animated progress bars.
 * The active dot fills smoothly via a CSS animation; `onAnimationEnd`
 * fires to advance the slide — no JS timers or rAF needed.
 */
function CarouselNav({
  slideCount,
  selectedIndex,
  isPaused,
  duration,
  onPrev,
  onNext,
  onDotClick,
  onAutoAdvance,
}: {
  slideCount: number;
  selectedIndex: number;
  isPaused: boolean;
  duration: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  onAutoAdvance: () => void;
}) {
  if (slideCount <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between mt-6 px-12">
      <button
        type="button"
        onClick={onPrev}
        className="size-8 rounded-full bg-[#ec4815] flex items-center justify-center hover:bg-[#d4400f] transition-colors"
        aria-label="Previous slide"
      >
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          className="rotate-180"
          aria-hidden="true"
        >
          <path
            d="M1 6h12M8 1l5 5-5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: slideCount }).map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              type="button"
              key={`dot-${String(index)}`}
              onClick={() => onDotClick(index)}
              className="relative h-2 w-12 rounded-full bg-[#ec4815]/20 overflow-hidden"
              aria-label={`Go to slide ${index + 1}`}
            >
              {isActive && (
                <div
                  key={`fill-${selectedIndex}`}
                  className="absolute inset-0 rounded-full bg-[#ec4815] will-change-transform"
                  style={{
                    animation: `hero-progress ${duration}ms cubic-bezier(0.4, 0, 0.8, 1) forwards`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                  onAnimationEnd={onAutoAdvance}
                />
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onNext}
        className="size-8 rounded-full bg-[#ec4815] flex items-center justify-center hover:bg-[#d4400f] transition-colors"
        aria-label="Next slide"
      >
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 6h12M8 1l5 5-5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function StaggerItem({
  isActive,
  delay,
  children,
}: {
  isActive: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      )}
      style={{ transitionDelay: isActive ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function SlideContent({
  slide,
  isActive,
}: {
  slide: PageBlocksHeroV2['slides'][number];
  isActive: boolean;
}) {
  const {
    title,
    subtext,
    buttons,
    buttonHorizontalAlignment,
    recentNewsBanner,
    featureTags,
  } = slide || {};
  const alignment = buttonHorizontalAlignment ?? 'center';
  const bannerFilled =
    recentNewsBanner && (recentNewsBanner.title || recentNewsBanner.link);

  let staggerIndex = 0;
  const nextDelay = () => staggerIndex++ * 120;

  return (
    <div
      className={cn(
        'flex @container items-start flex-col gap-8 py-10',
        bannerFilled && 'pt-0',
      )}
    >
      <div className="flex flex-col gap-3">
        {bannerFilled && (
          <StaggerItem isActive={isActive} delay={nextDelay()}>
            <RecentNewsBanner recentNewsBanner={recentNewsBanner} />
          </StaggerItem>
        )}
        {title && (
          <StaggerItem isActive={isActive} delay={nextDelay()}>
            <h2
              className={`${H1_HEADINGS_SIZE} max-w-md md:max-w-none font-ibm-plex`}
              data-tina-field={tinaField(slide, 'title')}
            >
              {curlyBracketFormatter(title)}
            </h2>
          </StaggerItem>
        )}
        {subtext && (
          <StaggerItem isActive={isActive} delay={nextDelay()}>
            <p
              className="text-neutral-text-secondary duration-75 md:max-w-[62ch] font-normal leading-relaxed text-lg max-w-md"
              data-tina-field={tinaField(slide, 'subtext')}
            >
              {subtext}
            </p>
          </StaggerItem>
        )}
      </div>
      {buttons && buttons.length > 0 && (
        <StaggerItem isActive={isActive} delay={nextDelay()}>
          <div
            className={`flex ${alignment === 'left' ? 'justify-center md:justify-start' : 'justify-center'} w-full flex-row flex-wrap gap-2 max-w-[62ch]`}
          >
            {buttons.map((button, index) => (
              <RenderButton
                key={`button-${button?.label || index}`}
                button={button}
                className="py-3"
                data-tina-field={tinaField(button, 'label')}
              />
            ))}
          </div>
        </StaggerItem>
      )}
      {featureTags && featureTags.length > 0 && (
        <StaggerItem isActive={isActive} delay={nextDelay()}>
          <div className="flex flex-wrap gap-x-6 gap-y-2 w-full">
            {featureTags.map((tag, index) =>
              tag?.label ? (
                <FeatureTag
                  key={`tag-${tag.label}-${index}`}
                  label={tag.label}
                />
              ) : null,
            )}
          </div>
        </StaggerItem>
      )}
    </div>
  );
}

function SlideImage({
  slide,
  isActive,
}: {
  slide: PageBlocksHeroV2['slides'][number];
  isActive: boolean;
}) {
  const { image, secondaryImage, showTerminal, title } = slide || {};

  if (showTerminal) {
    return (
      <StaggerItem isActive={isActive} delay={80}>
        <TerminalPanel secondaryImage={secondaryImage} />
      </StaggerItem>
    );
  }

  if (!image) {
    return null;
  }

  return (
    <StaggerItem isActive={isActive} delay={80}>
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
    </StaggerItem>
  );
}

export default function HeroV2(data: { data: PageBlocksHeroV2 }) {
  const { slides, autoplaySpeed } = data.data || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = slides?.length ?? 0;
  const duration = autoplaySpeed || 8000;

  const goToSlide = useCallback(
    (index: number) => {
      if (slideCount <= 1) {
        return;
      }
      setActiveIndex(index);
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  if (!slides || slides.length === 0) {
    return null;
  }

  if (slides.length === 1) {
    const slide = slides[0];
    const isReversed = slide.layout === 'reversed';
    return (
      <Container
        size="medium"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {isReversed ? (
          <>
            <SlideImage slide={slide} isActive={true} />
            <SlideContent slide={slide} isActive={true} />
          </>
        ) : (
          <>
            <SlideContent slide={slide} isActive={true} />
            <SlideImage slide={slide} isActive={true} />
          </>
        )}
      </Container>
    );
  }

  return (
    <Container size="medium">
      {/* CSS keyframes for the progress bar fill — injected once */}
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static keyframes string
        dangerouslySetInnerHTML={{
          __html:
            '@keyframes hero-progress { from { transform: translateX(-100%) } to { transform: translateX(0) } }',
        }}
      />
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isReversed = slide.layout === 'reversed';
          return (
            <div
              key={`slide-${slide.title || index}`}
              className={cn(
                'grid grid-cols-1 md:grid-cols-2 gap-4',
                index === 0 ? 'relative' : 'absolute inset-0',
                !isActive && 'pointer-events-none',
              )}
              aria-hidden={!isActive}
            >
              {isReversed ? (
                <>
                  <SlideImage slide={slide} isActive={isActive} />
                  <SlideContent slide={slide} isActive={isActive} />
                </>
              ) : (
                <>
                  <SlideContent slide={slide} isActive={isActive} />
                  <SlideImage slide={slide} isActive={isActive} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <CarouselNav
        slideCount={slideCount}
        selectedIndex={activeIndex}
        isPaused={isPaused}
        duration={duration}
        onPrev={goPrev}
        onNext={goNext}
        onDotClick={goToSlide}
        onAutoAdvance={goNext}
      />
    </Container>
  );
}
