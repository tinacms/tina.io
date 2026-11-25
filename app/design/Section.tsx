import type { ReactNode } from 'react';
import { BODY, LINE, SECTION_TITLE } from '@/component/styles/typography';

export type SectionProps = {
  /** The anchor the index and the section links jump to. */
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
};

/** One top-level section of the guide: a rule above, its heading and intro, then its groups. */
export const Section = ({ id, title, intro, children }: SectionProps) => (
  <section
    id={id}
    className={`grid scroll-mt-24 gap-12 border-t ${LINE.subtle} pt-16`}
  >
    <div>
      <h2 className={SECTION_TITLE}>{title}</h2>
      <p className={`${BODY} mt-3 max-w-3xl`}>{intro}</p>
    </div>
    {children}
  </section>
);
