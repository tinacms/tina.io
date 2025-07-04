import React, { useEffect, useRef, useState } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

/** Minimal inline docAndBlogComponents for headings only */
const docAndBlogComponents = {
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
};

/** UseWindowSize Hook */
function useWindowSize() {
  if (typeof window !== 'undefined') {
    return { width: 1200, height: 800 };
  }
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/** Throttled scroll listener */
function createListener(
  componentRef: React.RefObject<HTMLDivElement>,
  headings: Item[],
  setActiveIds: (activeIds: string[]) => void
) {
  let tick = false;
  const THROTTLE_INTERVAL = 100;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;

  const maxScrollYRelative =
    (maxScrollY - componentRef.current.offsetTop) /
    componentRef.current.scrollHeight;

  const relativePositionHeadingMap = headings.map((heading) => {
    const relativePosition =
      1 -
      (componentRef.current.scrollHeight - heading.offset) /
        componentRef.current.scrollHeight;

    return {
      ...heading,
      relativePagePosition:
        maxScrollYRelative > 1
          ? relativePosition
          : relativePosition * maxScrollYRelative,
    };
  });

  const throttledScroll = () => {
    if (!componentRef.current) return;
    const scrollPos =
      window.scrollY - componentRef.current.offsetTop + window.innerHeight / 6;
    const newActiveIds: string[] = [];
    const relativeScrollPosition =
      scrollPos / componentRef.current.scrollHeight;

    const activeHeadingCandidates = relativePositionHeadingMap.filter(
      (heading) => relativeScrollPosition >= heading.relativePagePosition
    );

    const activeHeading =
      activeHeadingCandidates.length > 0
        ? activeHeadingCandidates.reduce((prev, current) =>
            prev.offset > current.offset ? prev : current
          )
        : headings[0] ?? {};

    newActiveIds.push(activeHeading.id);

    if (activeHeading.level !== 'H2') {
      const activeHeadingParentCandidates =
        activeHeadingCandidates.length > 0
          ? activeHeadingCandidates.filter((h) => h.level === 'H2')
          : [];
      const activeHeadingParent =
        activeHeadingParentCandidates.length > 0
          ? activeHeadingParentCandidates.reduce((prev, current) =>
              prev.offset > current.offset ? prev : current
            )
          : null;

      if (activeHeadingParent?.id) {
        newActiveIds.push(activeHeadingParent.id);
      }
    }
    setActiveIds(newActiveIds);
  };

  return () => {
    if (!tick) {
      window.requestAnimationFrame(() => {
        throttledScroll();
        tick = false;
      });
      tick = true;
    }
  };
}

interface Item {
  id?: string;
  offset?: number;
  level?: string;
  src?: string;
}

/** Main Component */
export default function ScrollBasedShowcase(data: {
  showcaseItems: {
    title: string;
    image: string;
    content: any;
    useAsSubsection?: boolean;
  }[];
}) {
  const [headings, setHeadings] = useState<Item[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);
  const activeImg = useRef<HTMLImageElement>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const windowSize = useWindowSize();

  /** Build headings array on mount */
  useEffect(() => {
    const tempHeadings: Item[] = [];
    data.showcaseItems?.forEach((item, index) => {
      const headingData: Item = {
        id: `${item.title}-${index}`,
        level: item.useAsSubsection ? 'H3' : 'H2',
        src: item.image,
        offset: headingRefs.current[index]?.offsetTop ?? 0,
      };
      tempHeadings.push(headingData);
    });
    setHeadings(tempHeadings);
  }, [data.showcaseItems]);

  /** Update heading offsets on resize */
  useEffect(() => {
    const updateOffsets = () => {
      const updatedHeadings = headings.map((heading, index) => ({
        ...heading,
        offset: headingRefs.current[index]?.offsetTop ?? 0,
      }));
      setHeadings(updatedHeadings);
    };
    window.addEventListener('resize', updateOffsets);
    return () => window.removeEventListener('resize', updateOffsets);
  }, [headings]);

  /** Throttled scroll event */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const listener = createListener(componentRef, headings, setActiveIds);
    window.addEventListener('scroll', listener, { passive: true });
    return () => window.removeEventListener('scroll', listener);
  }, [headings]);

  /** Update active image when activeIds change */
  useEffect(() => {
    if (!activeIds.length) return;
    const heading = headings.find((h) => h.id === activeIds[0]);
    if (activeImg.current) {
      activeImg.current.src = heading?.src || '';
    }
  }, [activeIds, headings]);

  return (
    <div
      ref={componentRef}
      // doc-container replacements:
      className="block relative w-full my-5 mx-auto"
    >
      <div className="flex relative min-h-screen">
        <div id="main-content-container" className="flex-1 m-2 p-2 box-border">
          {data.showcaseItems?.map((item, index) => {
            const itemId = `${item.title}-${index}`;
            const isFocused = activeIds.includes(itemId);

            return (
              <div
                key={`showcase-item-${index}`}
                // If active => full opacity + orange border + text color
                // If not => half opacity + gray border
                className={`mt-0 md:mt-8 transition-all duration-300 ease-in-out
                  ${
                    isFocused
                      ? 'opacity-100  text-gray-900'
                      : 'opacity-15  border-gray-300 text-gray-800'
                  }
                `}
              >
                {item.useAsSubsection ? (
                  <div
                    id={itemId}
                    className="pointer-events-none"
                    ref={(el) => (headingRefs.current[index] = el)}
                  >
                    <div
                      className={`bg-linear-to-br bg-clip-text text-transparent text-xl font-medium mt-2 mb-2 ${
                        isFocused
                          ? 'from-orange-400 via-orange-500 to-orange-600'
                          : 'from-gray-800 to-gray-700'
                      } !important`}
                    >
                      {item.title}
                    </div>
                  </div>
                ) : (
                  <div
                    id={itemId}
                    className="pointer-events-none"
                    ref={(el) => (headingRefs.current[index] = el)}
                  >
                    <h2
                      className={`bg-linear-to-br  bg-clip-text text-transparent text-3xl mt-4 mb-3 ${
                        isFocused
                          ? 'from-orange-400 via-orange-500 to-orange-600'
                          : 'from-gray-800 to-gray-700'
                      }`}
                    >
                      {item.title}
                    </h2>
                  </div>
                )}

                <ul
                  className={`list-none pl-4 transition-colors duration-500 ease-in-out border-l-4 ${
                    isFocused ? 'border-orange-400' : 'border-gray-800'
                  }`}
                >
                  <li>
                    <TinaMarkdown
                      content={item.content}
                      components={docAndBlogComponents}
                    />
                  </li>
                </ul>

                {/* This image is only shown on mobile (md:hidden).
                    On larger screens, the separate container is used. */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="block md:hidden my-8"
                />
              </div>
            );
          })}
        </div>

        {/* This image container is only displayed on md+ */}
        <div className="relative w-full flex-1 hidden md:block overflow-hidden">
          <img
            ref={activeImg}
            src={headings[0]?.src || ''}
            alt=""
            className="absolute right-0 w-100 transition-all duration-1000 ease-in-out rounded-lg"
            style={{
              opacity: activeIds.length ? 1 : 0,
              bottom: Math.max(
                componentRef.current?.scrollHeight -
                  headings.filter((h) => activeIds.includes(h.id))[
                    activeIds.length - 1
                  ]?.offset -
                  (activeIds.includes(headings[0]?.id) && activeIds.length === 1
                    ? activeImg.current?.scrollHeight
                    : activeImg.current?.scrollHeight / 1.2) +
                  (activeIds.length - 1) * 32,
                0
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
