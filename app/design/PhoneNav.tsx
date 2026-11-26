'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { FOCUS_RING, NEUTRAL_OUTLINE } from '@/component/styles/buttons';
import { MENU_ITEM, MENU_PANEL, MENU_REVEAL } from '@/component/styles/menu';
import {
  EYEBROW,
  LABEL,
  NAV_MENU_LINK,
  SURFACE,
} from '@/component/styles/typography';
import { ModeToggle } from './ModeToggle';
import type { OutlineCategory } from './outline';

/**
 * The /design navigation below lg, at the top of the page: an "On this page"
 * trigger in the neutral outline that opens a menu of the sections under
 * their category labels, anchored under it, with the mode toggle beside it.
 *
 * The menu stays mounted inside MENU_REVEAL, hidden from the keyboard when
 * closed, and sits above the site's sticky header. The trigger, the toggle
 * and every item are at least 44px tall, the phone tap target. It closes on
 * Escape (focus goes back to the trigger), on a tap or focus outside it, and
 * when an item is chosen; the item's hash jump does the rest.
 */
export const PhoneNav = ({
  categories,
  className = '',
}: {
  categories: OutlineCategory[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const isOutside = (target: EventTarget | null) =>
      !(target instanceof Node && menuRef.current?.contains(target));
    const onPointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`relative flex items-center justify-between gap-3 ${className}`}
    >
      <div ref={menuRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          className={`${NEUTRAL_OUTLINE} ${FOCUS_RING} inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg px-4`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <span className={LABEL}>On this page</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        <nav
          id={panelId}
          aria-label="Style guide sections"
          data-state={open ? 'open' : 'closed'}
          className={`${MENU_REVEAL} ${MENU_PANEL} ${SURFACE.card} absolute start-0 top-full z-50 mt-2 w-68`}
        >
          <ul className="grid gap-0.5">
            {categories.map((category) => (
              <li key={category.title} className="grid gap-0.5">
                <p className={`${EYEBROW} px-2 pt-2 pb-1`}>{category.title}</p>
                <ul className="grid gap-0.5">
                  {category.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={`${MENU_ITEM} ${NAV_MENU_LINK} min-h-11`}
                        onClick={() => setOpen(false)}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ModeToggle className={NEUTRAL_OUTLINE} />
    </div>
  );
};
