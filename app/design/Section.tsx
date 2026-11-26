import type { ReactNode } from 'react';
import {
  BODY,
  EYEBROW,
  LINE,
  SECTION_TITLE,
} from '@/component/styles/typography';
import { SectionOpener } from './SectionOpener';

export type SectionProps = {
  /** The anchor the index and the section links jump to. */
  id: string;
  title: string;
  intro: string;
  /** The group the section opens, such as Foundations, shown above its heading. */
  label?: string;
  children: ReactNode;
};

/**
 * A section's rules (its group with an id ending in -rules) set in two
 * columns at full width, each rule kept whole.
 */
const RULES_IN_TWO_COLUMNS =
  '[&>[id$=-rules]>ol]:block [&>[id$=-rules]>ol]:max-w-none [&>[id$=-rules]>ol]:columns-2 [&>[id$=-rules]>ol]:gap-x-12 [&>[id$=-rules]>ol>li]:mb-2 [&>[id$=-rules]>ol>li]:break-inside-avoid';

/**
 * One top-level section of the guide: a rule above, its heading and intro,
 * its graphic straight underneath, then its groups.
 */
export const Section = ({
  id,
  title,
  intro,
  label,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={`grid scroll-mt-24 gap-12 border-t ${LINE.subtle} pt-16 ${RULES_IN_TWO_COLUMNS}`}
  >
    <div>
      {label && <p className={`${EYEBROW} mb-3`}>{label}</p>}
      <h2 className={SECTION_TITLE}>{title}</h2>
      <p className={`${BODY} mt-3 max-w-3xl`}>{intro}</p>
      <SectionOpener id={id} />
    </div>
    {children}
  </section>
);
