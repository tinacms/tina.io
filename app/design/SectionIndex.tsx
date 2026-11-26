'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { INDEX_CURRENT } from '@/component/styles/tabs';
import { EYEBROW, NAV_MENU_LINK } from '@/component/styles/typography';
import type { OutlineCategory, OutlineSection } from './outline';

/**
 * The activation line, as a share of the viewport height from the top. A
 * section is current once its top has crossed it. Mid-screen, so a section
 * centred by a jump or scrollIntoView counts as current, not its neighbour.
 */
const ACTIVATION_LINE = 0.5;

/** Sub-pixel slack when deciding the page is scrolled to the bottom. */
const BOTTOM_SLACK_PX = 1;

/** Input that means the reader is scrolling, which ends a hash jump's hold. */
const READER_SCROLL_EVENTS = ['wheel', 'touchmove', 'keydown', 'mousedown'];

const topOf = (id: string) =>
  document.getElementById(id)?.getBoundingClientRect().top ??
  Number.POSITIVE_INFINITY;

/** The section whose top last crossed the activation line. */
const currentFromScroll = (sections: OutlineSection[]): string => {
  const line = window.innerHeight * ACTIVATION_LINE;
  const root = document.documentElement;
  const atBottom =
    window.innerHeight + window.scrollY >= root.scrollHeight - BOTTOM_SLACK_PX;
  if (atBottom) {
    return sections[sections.length - 1].id;
  }
  const crossed = sections.filter((section) => topOf(section.id) <= line);
  return (crossed[crossed.length - 1] ?? sections[0]).id;
};

/** The section a hash names, by its own id, an alias or one of its groups. */
const currentFromHash = (
  sections: OutlineSection[],
  hash: string,
): string | null => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const section = sections.find(
    (candidate) =>
      candidate.id === id ||
      candidate.aliases?.includes(id) ||
      candidate.groups.some((group) => group.id === id),
  );
  return section?.id ?? null;
};

/** Scrolls the index itself, never the window, so the link stays in view. */
const keepInView = (container: HTMLElement | null, link: Element | null) => {
  if (!container || !link) {
    return;
  }
  const box = container.getBoundingClientRect();
  const item = link.getBoundingClientRect();
  if (item.top < box.top) {
    container.scrollTop -= box.top - item.top;
  } else if (item.bottom > box.bottom) {
    container.scrollTop += item.bottom - box.bottom;
  }
};

/**
 * The /design sticky index: each category's label over its sections, with
 * the current section marked on scroll. Parts are reached from the map, the
 * sections and the page, not from here. Links are plain hash jumps. Without
 * JS it shows with no marker.
 */
export const SectionIndex = ({
  categories,
  className = '',
}: {
  categories: OutlineCategory[];
  className?: string;
}) => {
  const [current, setCurrent] = useState<string | null>(null);
  const held = useRef<string | null>(null);
  const frame = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const sections = useMemo(
    () => categories.flatMap((category) => category.sections),
    [categories],
  );

  const update = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setCurrent(held.current ?? currentFromScroll(sections));
    });
  }, [sections]);

  const hold = useCallback(
    (hash: string) => {
      held.current = currentFromHash(sections, hash);
      update();
    },
    [sections, update],
  );

  useEffect(() => {
    const release = () => {
      held.current = null;
    };
    const onHashChange = () => hold(window.location.hash);
    hold(window.location.hash);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('hashchange', onHashChange);
    for (const event of READER_SCROLL_EVENTS) {
      window.addEventListener(event, release, { passive: true });
    }
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('hashchange', onHashChange);
      for (const event of READER_SCROLL_EVENTS) {
        window.removeEventListener(event, release);
      }
    };
  }, [hold, update]);

  useEffect(() => {
    if (!current) {
      return;
    }
    const nav = navRef.current;
    keepInView(nav, nav?.querySelector(`a[href="#${current}"]`) ?? null);
  }, [current]);

  return (
    <nav ref={navRef} aria-label="Style guide sections" className={className}>
      <ul className="grid gap-4">
        {categories.map((category) => (
          <li key={category.title} className="grid gap-4">
            <p className={`${EYEBROW} pl-3`}>{category.title}</p>
            <ul className="grid gap-4">
              {category.sections.map((section) => {
                const isCurrent = current === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`${NAV_MENU_LINK} block border-l-2 ${isCurrent ? INDEX_CURRENT : 'border-transparent'} pl-3`}
                      aria-current={isCurrent ? 'location' : undefined}
                      onClick={() => hold(`#${section.id}`)}
                    >
                      {section.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};
