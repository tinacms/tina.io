import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { docAndBlogComponents } from '../docAndBlogComponents';

function useWindowSize() {
  if (typeof window !== 'undefined') {
    return { width: 1200, height: 800 };
  }

  const [windowSize, setWindowSize] = React.useState<{
    width: number;
    height: number;
  }>();

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, []);

  return windowSize;
}

function createListener(
  componentRef: React.RefObject<HTMLDivElement>,
  headings: Item[],
  setActiveIds: (activeIds: string[]) => void
): () => void {
  let tick = false;
  const THROTTLE_INTERVAL = 100;
  //Find maximum relative scroll position
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
      //Find the relative position of the heading based on the page content.
      relativePagePosition:
        maxScrollYRelative > 1
          ? relativePosition
          : relativePosition * maxScrollYRelative,
    };
  });

  const throttledScroll = () => {
    if (!componentRef.current) {
      return;
    }
    //Find the current vertical scroll pixel value
    const scrollPos =
      window.scrollY - componentRef.current.offsetTop + window.innerHeight / 6;
    const newActiveIds = [];
    //Find the relative position on the page based on the scroll.
    const relativeScrollPosition =
      scrollPos / componentRef.current.scrollHeight;

    //Find the headings that are above the current scroll position
    //This is adjusted to account for differences between min/max scroll values and content height
    const activeHeadingCandidates = relativePositionHeadingMap.filter(
      (heading) => {
        return relativeScrollPosition >= heading.relativePagePosition;
      }
    );

    const activeHeading =
      activeHeadingCandidates.length > 0
        ? activeHeadingCandidates.reduce((prev, current) =>
            prev.offset > current.offset ? prev : current
          )
        : headings[0] ?? {};
    newActiveIds.push(activeHeading.id);

    if (activeHeading.level != 'H2') {
      const activeHeadingParentCandidates =
        activeHeadingCandidates.length > 0
          ? activeHeadingCandidates.filter((heading) => {
              return heading.level == 'H2';
            })
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

  return function onScroll(): void {
    if (!tick) {
      setTimeout(function () {
        throttledScroll();
        tick = false;
      }, THROTTLE_INTERVAL);
    }
    tick = true;
  };
}

interface Item {
  id?: string;
  offset?: number;
  level?: string;
  src?: string;
}

export default function ScrollBasedShowcase(data) {
  const [headings, setHeadings] = React.useState<Item[]>([]);
  const componentRef = useRef(null);
  const activeImg = useRef(null);

  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const [activeIds, setActiveIds] = React.useState([]);

  const windowSize = useWindowSize();

  useEffect(() => {
    const tempHeadings = [];
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

  useEffect(() => {
    const updateOffsets = () => {
      const updatedHeadings = headings.map((heading, index) => {
        return {
          ...heading,
          offset: headingRefs.current[index]?.offsetTop ?? 0,
        };
      });

      setHeadings(updatedHeadings);
    };

    window.addEventListener('resize', updateOffsets);
    return () => window.removeEventListener('resize', updateOffsets);
  }, [headings]);

  React.useEffect(() => {
    if (typeof window === `undefined`) {
      return;
    }

    const activeTocListener = createListener(
      componentRef,
      headings,
      setActiveIds
    );
    window.addEventListener('scroll', activeTocListener);

    return () => window.removeEventListener('scroll', activeTocListener);
  }, [headings, windowSize, componentRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!activeIds.length) {
      return;
    }

    const heading = headings.find((heading) => heading.id === activeIds[0]);

    activeImg.current.src = heading?.src;
  }, [activeIds, activeImg]);

  console.log(
    componentRef.current?.scrollHeight -
      headings.filter((heading) => activeIds.includes(heading.id))[
        activeIds.length - 1
      ]?.offset -
      activeImg.current?.scrollHeight
  );

  return (
    <DocContainer ref={componentRef}>
      <SplitContent>
        <div id="main-content-container">
          {data.showcaseItems?.map((item, index) => {
            return (
              <div
                key={`showcase-item-${index}`}
                className={`showcase-head-wrapper ${
                  activeIds.includes(`${item.title}-${index}`) ? 'focused' : ''
                }`}
              >
                {item.useAsSubsection ? (
                  <div
                    id={`${item.title}-${index}`}
                    className="showcase-heading pointer-events-none"
                    ref={(el) => (headingRefs.current[index] = el)}
                  >
                    <docAndBlogComponents.h3>
                      {item.title}
                    </docAndBlogComponents.h3>
                  </div>
                ) : (
                  <div
                    id={`${item.title}-${index}`}
                    className="showcase-heading pointer-events-none"
                    ref={(el) => (headingRefs.current[index] = el)}
                  >
                    <docAndBlogComponents.h2>
                      {item.title}
                    </docAndBlogComponents.h2>
                  </div>
                )}
                <ul>
                  <li>
                    <TinaMarkdown
                      content={item.content}
                      components={docAndBlogComponents}
                    />
                  </li>
                </ul>
                <div>
                  <img src={item.image} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="img-container">
          {/* Im keeping this as a .gif rather than transferring to .webm as a .gif would require me to change from <img> to <video> which would break the rest of the active images */}
          <img
            className="transition-img"
            ref={activeImg}
            src={headings[0]?.src ?? ''}
            style={{
              opacity: activeIds.length ? 1 : 0,
              bottom:
                Math.max(
                  componentRef.current?.scrollHeight -
                    headings.filter((heading) =>
                      activeIds.includes(heading.id)
                    )[activeIds.length - 1]?.offset -
                    activeImg.current?.scrollHeight,
                  0
                ) + 'px',
            }}
          />
        </div>
      </SplitContent>
    </DocContainer>
  );
}

export const DocContainer = styled.div`
  display: block;
  width: 100%;
  position: relative;
  padding: 1rem 2rem 3rem 2rem;
  margin: 5rem auto;
`;

const MAX_SPLIT_IMG_WIDTH = 768;
const SplitContent = styled.div`
  display: flex;
  position: relative;
  min-height: 100vh;

  h3 {
    font-size: 1.2rem;
  }

  > * {
    flex: 1;
    margin: 0 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  @media (min-width: ${MAX_SPLIT_IMG_WIDTH + 1}px) {
    #main-content-container > h3:not(:first-child),
    #main-content-container > h2:not(:first-child) {
      margin-top: 4.5rem !important;
    }

    .showcase-head-wrapper {
      margin-top: 2rem;
    }

    ul {
      list-style: none;
      padding-left: 1rem;
      border-left: 4px solid var(--color-light-dark);

      color: var(--color-light-dark);
      transition: color 0.5s ease-in-out;
      * {
        color: var(--color-light-dark);
        
      }
    }

    p {
      transition: color 0.1s ease-in-out;
    }

    a {
      transition: all 0.5s ease-in-out;
      pointer-events: none;
    }

    h2, h3 {
      background-clip: unset;
      background-image: none;
    }

    .showcase-heading {
      color: var(--color-light-dark);

      &:not(.focused) * {
        color: var(--color-light-dark);
      }
    }

      div.focused a,
      div.focused a {
        color: var(--color-orange) !important; 
      }

      div.focused > p,
      div.focused > ul {
        border-left: 4px solid var(--color-orange);

        color: var(--color-primary);
        * {
          color: var(--color-primary);
        }
      }
    }
  }

  #main-content-container img {
    display: none;
  }

  @media (max-width: ${MAX_SPLIT_IMG_WIDTH}px) {
    .img-container {
      display: none;
    }

    #main-content-container img {
      display: initial;
      margin: 2rem 0
    }
  }

    .transition-img {
      position: absolute;
      right: 0;
      width: 50%;
      transition: all 1s ease-in-out;
      border-radius: 10px;
    }
  }

  .img-container {
    position: relative;
    width: 100%;
    flex: 1;
  }
`;
