import type { ReactNode } from 'react';
import { BODY_SMALL, CARD_TITLE, LINE } from '@/component/styles/typography';

/** The groups on /design that each show one component, by their anchor. */
export const COMPONENT_BLOCK_IDS = new Set([
  'text-links',
  'social-links',
  'pagination',
  'neutral-outline',
  'command-field',
  'menus',
  'segmented-toggles',
  'tabs',
  'button-groups',
  'button-states',
  'icon-buttons',
]);

export type ComponentBlockProps = {
  /** The anchor the index jumps to. */
  id?: string;
  title: string;
  intro?: string;
  /** The component's live examples. */
  children: ReactNode;
};

/**
 * One component: its examples first, centred on a stage drawn with a line and
 * no fill, then its name and text. The heading stays first for screen readers.
 */
export const ComponentBlock = ({
  id,
  title,
  intro,
  children,
}: ComponentBlockProps) => (
  <div id={id} className="grid min-w-0 scroll-mt-24 gap-5">
    <div>
      <h3 className={CARD_TITLE}>{title}</h3>
      {intro && <p className={`${BODY_SMALL} mt-1 max-w-3xl`}>{intro}</p>}
    </div>
    <div
      className={`order-first grid w-full min-w-0 justify-items-center gap-4 rounded-xl border ${LINE.subtle} p-8`}
    >
      {children}
    </div>
  </div>
);
