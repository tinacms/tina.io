import type { ReactNode } from 'react';
import { BUTTON_LEVEL_GUIDE } from '@/component/styles/buttons.guide';
import {
  BODY,
  CAPTION,
  CARD_TITLE,
  CODE,
  PAGE_TITLE,
  SECTION_TITLE,
  SUB_HEADING,
} from '@/component/styles/typography';
import { TEXT_COLOURS } from '@/component/styles/typography.guide';
import { Button } from '@/component/ui/Button';
import { TextLink } from '@/component/ui/TextLink';
import { SegmentedToggleExample } from './SegmentedToggleExample';

/** The heading and body roles the type scale shows, largest first. */
const SCALE = [
  { name: 'PAGE_TITLE', role: PAGE_TITLE },
  { name: 'SECTION_TITLE', role: SECTION_TITLE },
  { name: 'CARD_TITLE', role: CARD_TITLE },
  { name: 'SUB_HEADING', role: SUB_HEADING },
  { name: 'BODY', role: BODY },
  { name: 'CAPTION', role: CAPTION },
];

/** “Aa” in each role, its name underneath. */
const TypeScale = () => (
  <div className="flex flex-wrap items-baseline gap-8">
    {SCALE.map(({ name, role }) => (
      <div key={name} className="grid justify-items-start gap-2">
        <span className={role}>Aa</span>
        <span className={CODE}>{name}</span>
      </div>
    ))}
  </div>
);

/**
 * Every text colour as one strip of swatches, each named underneath from lg;
 * below it the strip shows the colours only, and the table names them.
 */
const ColourStrip = () => (
  <div className="flex w-full">
    {TEXT_COLOURS.map((c) => (
      <div key={c.token} className="grid min-w-0 flex-1 gap-2">
        <span className={`${c.swatch} block h-16`} />
        <span className={`${CODE} hidden truncate lg:block`}>{c.token}</span>
      </div>
    ))}
  </div>
);

/** The three button levels, side by side. */
const ButtonLevels = () => (
  <div className="flex flex-wrap items-center gap-4">
    {BUTTON_LEVEL_GUIDE.map((g) => (
      <Button key={g.level} level={g.level}>
        {g.example}
      </Button>
    ))}
  </div>
);

const TextLinks = () => (
  <div className="flex flex-wrap items-center gap-8">
    <TextLink href="#text-links">Read more</TextLink>
    <TextLink href="#text-links">See all events</TextLink>
  </div>
);

/** Each section's graphic, keyed by the section's id. */
const GRAPHICS: Record<string, () => ReactNode> = {
  typography: TypeScale,
  colour: ColourStrip,
  buttons: ButtonLevels,
  links: TextLinks,
  // The combined section the page had before Links and Navigation split.
  'links-and-navigation': TextLinks,
  navigation: () => <SegmentedToggleExample />,
};

export type SectionOpenerProps = {
  /** The section's id; a section without a graphic opens on its intro alone. */
  id: string;
};

/**
 * A section's opening graphic, drawn from its own roles and components: the
 * type scale, the text colours, the button levels, the text links or the
 * segmented toggle. It sits straight under the intro, with no lines around it.
 */
export const SectionOpener = ({ id }: SectionOpenerProps) => {
  const Graphic = GRAPHICS[id];
  if (!Graphic) {
    return null;
  }
  return (
    <div className="mt-8">
      <Graphic />
    </div>
  );
};
