import type { ReactNode } from 'react';
import { BUTTON, FOCUS_RING_PEER } from '@/component/styles/buttons';
import { BUTTON_LEVEL_GUIDE } from '@/component/styles/buttons.guide';
import {
  BODY_SMALL,
  CARD_TITLE,
  EYEBROW,
  PAGE_TITLE,
  SECTION_TITLE,
  SUB_HEADING,
  SUBTLE_LINK,
  SURFACE,
  TITLE_LINK,
} from '@/component/styles/typography';
import { TEXT_COLOURS } from '@/component/styles/typography.guide';
import { TextLink } from '@/component/ui/TextLink';
import type { OutlineCategory } from './outline';
import { SegmentedToggleExample } from './SegmentedToggleExample';

/** The type roles the Typography preview shows as Aa, largest first. */
const PREVIEW_TYPE_ROLES = [PAGE_TITLE, SECTION_TITLE, CARD_TITLE, SUB_HEADING];

/**
 * Each section's preview, drawn from its own roles and components. All but
 * the toggle are pictures (spans, hidden from screen readers), so the map
 * adds no dead buttons or links; the toggle is live, raised above the card's
 * link so it still takes clicks.
 */
const PREVIEWS: Record<string, ReactNode> = {
  typography: (
    <div aria-hidden className="flex flex-wrap items-baseline gap-8">
      {PREVIEW_TYPE_ROLES.map((role) => (
        <span key={role} className={role}>
          Aa
        </span>
      ))}
    </div>
  ),
  colour: (
    <div aria-hidden className="flex w-full">
      {TEXT_COLOURS.map((colour) => (
        <span
          key={colour.token}
          className={`${colour.swatch} block h-12 min-w-0 flex-1`}
        />
      ))}
    </div>
  ),
  buttons: (
    <div aria-hidden className="flex flex-wrap items-center gap-4">
      {BUTTON_LEVEL_GUIDE.map((guide) => (
        <span key={guide.level} className={BUTTON[guide.level]}>
          {guide.example}
        </span>
      ))}
    </div>
  ),
  links: (
    <div aria-hidden className="flex flex-wrap items-center gap-4">
      <TextLink as="span">Read more</TextLink>
      <TextLink as="span">See all events</TextLink>
    </div>
  ),
  navigation: (
    <div className="relative z-10">
      <SegmentedToggleExample />
    </div>
  ),
};

/**
 * The map of the guide under the intro: Foundations in one row, then
 * Components, each section on its own card with a live preview above its
 * name and its parts. The whole card links to the section (the name's link
 * stretches over it) and lifts on hover as the home page cards do; each part
 * link sits above it and goes to its group. Keyboard focus on the name rings
 * the whole card.
 */
export const FrontDoor = ({
  categories,
  className = '',
}: {
  categories: OutlineCategory[];
  className?: string;
}) => (
  <nav aria-label="Map of the guide" className={`grid gap-10 ${className}`}>
    {categories.map((category) => (
      <div key={category.title} className="grid gap-4">
        <p className={EYEBROW}>{category.title}</p>
        <ul className="grid auto-cols-fr grid-flow-col gap-6">
          {category.sections.map((section) => (
            <li
              key={section.id}
              className={`${SURFACE.card} relative grid content-start gap-2 rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-150 ease-out`}
            >
              <div className="mb-2 flex min-h-32 items-center overflow-hidden">
                {PREVIEWS[section.id]}
              </div>
              <a
                href={`#${section.id}`}
                className={`${SUB_HEADING} ${TITLE_LINK} peer focus-visible:outline-hidden after:absolute after:inset-0 after:rounded-2xl`}
              >
                {section.title}
              </a>
              <span
                aria-hidden
                className={`${FOCUS_RING_PEER} pointer-events-none absolute inset-0 rounded-2xl`}
              />
              <p className={BODY_SMALL}>
                {section.groups.map((group, index) => (
                  <span key={group.id}>
                    {index > 0 && ' · '}
                    <a
                      href={`#${group.id}`}
                      className={`${SUBTLE_LINK} relative z-10`}
                    >
                      {group.title}
                    </a>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </nav>
);
