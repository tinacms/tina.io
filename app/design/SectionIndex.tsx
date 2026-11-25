'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { INDEX_CURRENT } from '@/component/styles/tabs';
import {
  BODY_SMALL,
  NAV_MENU_LINK,
  SUBTLE_LINK,
} from '@/component/styles/typography';
import type { OutlineSection } from './outline';

/**
 * The activation line, as a share of the viewport height from the top. An
 * item is current once its top has crossed it. Mid-screen, so a short group
 * centred by a jump or scrollIntoView counts as current, not its neighbour.
 */
const ACTIVATION_LINE = 0.5;

/** Sub-pixel slack when deciding the page is scrolled to the bottom. */
const BOTTOM_SLACK_PX = 1;

/** Input that means the reader is scrolling, which ends a hash jump's hold. */
const READER_SCROLL_EVENTS = ['wheel', 'touchmove', 'keydown', 'mousedown'];

type Current = { section: string; group: string | null };

const topOf = (id: string) =>
  document.getElementById(id)?.getBoundingClientRect().top ??
  Number.POSITIVE_INFINITY;

/** The section and group whose tops last crossed the activation line. */
const currentFromScroll = (outline: OutlineSection[]): Current => {
  const line = window.innerHeight * ACTIVATION_LINE;
  const root = document.documentElement;
  const atBottom =
    window.innerHeight + window.scrollY >= root.scrollHeight - BOTTOM_SLACK_PX;
  const crossed = outline.filter((section) => topOf(section.id) <= line);
  const section = atBottom
    ? outline[outline.length - 1]
    : (crossed[crossed.length - 1] ?? outline[0]);
  const groups = section.groups.filter((group) => topOf(group.id) <= line);
  return { section: section.id, group: groups[groups.length - 1]?.id ?? null };
};

/** The section and group a hash names, or null if it names neither. */
const currentFromHash = (
  outline: OutlineSection[],
  hash: string,
): Current | null => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  for (const section of outline) {
    if (section.id === id) {
      return { section: id, group: null };
    }
    if (section.groups.some((group) => group.id === id)) {
      return { section: section.id, group: id };
    }
  }
  return null;
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
 * The /design sticky index (D6 as amended by D49, D46, D47): every section
 * and every group, always shown, with the current pair marked on scroll.
 * Links are plain hash jumps. Without JS it shows with no marker.
 */
export const SectionIndex = ({
  outline,
  className = '',
}: {
  outline: OutlineSection[];
  className?: string;
}) => {
  const [current, setCurrent] = useState<Current | null>(null);
  const held = useRef<Current | null>(null);
  const frame = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const update = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const next = held.current ?? currentFromScroll(outline);
      setCurrent((before) =>
        before?.section === next.section && before?.group === next.group
          ? before
          : next,
      );
    });
  }, [outline]);

  const hold = useCallback(
    (hash: string) => {
      held.current = currentFromHash(outline, hash);
      update();
    },
    [outline, update],
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
    keepInView(
      nav,
      nav?.querySelector(`a[href="#${current.group ?? current.section}"]`) ??
        null,
    );
  }, [current]);

  const linkClass = (isCurrent: boolean) =>
    `block border-l-2 ${isCurrent ? INDEX_CURRENT : 'border-transparent'}`;

  return (
    <nav ref={navRef} aria-label="Style guide sections" className={className}>
      <ul className="grid gap-4">
        {outline.map((section) => {
          const sectionCurrent = current?.section === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`${NAV_MENU_LINK} ${linkClass(sectionCurrent)} pl-3`}
                aria-current={sectionCurrent ? 'location' : undefined}
                onClick={() => hold(`#${section.id}`)}
              >
                {section.title}
              </a>
              <ul className="mt-2 ml-3 grid gap-1">
                {section.groups.map((group) => {
                  const groupCurrent =
                    sectionCurrent && current?.group === group.id;
                  return (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className={`${BODY_SMALL} ${SUBTLE_LINK} ${linkClass(groupCurrent)} pl-3`}
                        aria-current={groupCurrent ? 'location' : undefined}
                        onClick={() => hold(`#${group.id}`)}
                      >
                        {group.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
