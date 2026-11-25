import type { ReactNode } from 'react';
import { BODY_SMALL, CARD_TITLE } from '@/component/styles/typography';

export type GroupProps = {
  /** The anchor the index jumps to, when the group has one. */
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

/** One group inside a section: its heading, an optional intro, then its table or examples. */
export const Group = ({ id, title, intro, children }: GroupProps) => (
  <div id={id} className="grid min-w-0 scroll-mt-24 gap-4">
    <div>
      <h3 className={CARD_TITLE}>{title}</h3>
      {intro && <p className={`${BODY_SMALL} mt-1 max-w-3xl`}>{intro}</p>}
    </div>
    {children}
  </div>
);
