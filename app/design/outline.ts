import { ROLE_GROUPS } from '@/component/styles/typography.guide';

/** Kebab-case id from a title, so an example can link to its own table. */
export const slug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * A Typography role group's id. Prefixed like the section's other groups,
 * so a group such as Links can't share an id with the Links section.
 */
export const roleGroupId = (title: string) => `typography-${slug(title)}`;

export type OutlineGroup = { id: string; title: string };
export type OutlineSection = {
  id: string;
  title: string;
  intro: string;
  /** Older anchors that still land on this section. */
  aliases?: string[];
  groups: OutlineGroup[];
};
/** A run of sections under one label: Foundations, then Components. */
export type OutlineCategory = { title: string; sections: OutlineSection[] };

const ONE_LOOK =
  'Each has one look, built the same way as the buttons, so there is nothing to choose.';

const TYPOGRAPHY: OutlineSection = {
  id: 'typography',
  title: 'Typography',
  intro:
    'Give each piece of text one role from components/styles/typography.ts, chosen by the job the text does. The size comes with the role.',
  groups: [
    { id: 'typography-rules', title: 'The rules' },
    ...ROLE_GROUPS.map((group) => ({
      id: roleGroupId(group.title),
      title: group.title,
    })),
    { id: 'typography-exceptions', title: 'Agreed exceptions' },
  ],
};

const COLOUR: OutlineSection = {
  id: 'colour',
  title: 'Colour',
  intro:
    "Each role sets its own text colour, so components don't name colours. To change a text colour, change the surface under it.",
  groups: [
    { id: 'text-colours', title: 'Text colours' },
    { id: 'surfaces', title: 'Surfaces' },
    { id: 'lines', title: 'Lines' },
    { id: 'inks', title: 'Inks' },
    { id: 'on-dark', title: 'On dark' },
  ],
};

const BUTTONS: OutlineSection = {
  id: 'buttons',
  title: 'Buttons',
  intro:
    'Every button is one of three levels from components/styles/buttons.ts, all one size. Pick the level by the job; the look comes with it.',
  groups: [
    { id: 'button-rules', title: 'The rules' },
    { id: 'button-levels', title: 'Levels' },
    { id: 'button-groups', title: 'Groups' },
    { id: 'buttons-on-dark', title: 'On dark' },
    { id: 'button-states', title: 'States' },
    { id: 'icon-buttons', title: 'Icon buttons' },
    { id: 'button-exceptions', title: 'Agreed exceptions' },
  ],
};

const LINKS: OutlineSection = {
  id: 'links',
  title: 'Links',
  intro: `Text links, social links and the neutral outline. ${ONE_LOOK}`,
  // Links and Navigation were one section; its old anchor lands here.
  aliases: ['links-and-navigation'],
  groups: [
    { id: 'text-links', title: 'Text links' },
    { id: 'social-links', title: 'Social links' },
    { id: 'neutral-outline', title: 'Neutral outline' },
  ],
};

const NAVIGATION: OutlineSection = {
  id: 'navigation',
  title: 'Navigation',
  intro: `Pagination, dropdown menus, segmented toggles, tabs and the command field. ${ONE_LOOK}`,
  groups: [
    { id: 'pagination', title: 'Pagination' },
    { id: 'menus', title: 'Dropdown menus' },
    { id: 'segmented-toggles', title: 'Segmented toggles' },
    { id: 'tabs', title: 'Tabs' },
    { id: 'command-field', title: 'Command field' },
  ],
};

/**
 * The guide's two categories and their sections, in page order: the index,
 * the map under the intro and the page itself all read from here. Each id
 * and title matches its Section or Group in page.tsx;
 * tests/design-modes.spec.ts checks every section has exactly one index link.
 */
export const OUTLINE_CATEGORIES: OutlineCategory[] = [
  { title: 'Foundations', sections: [TYPOGRAPHY, COLOUR] },
  { title: 'Components', sections: [BUTTONS, LINKS, NAVIGATION] },
];

/** Every section, in page order. */
export const OUTLINE: OutlineSection[] = OUTLINE_CATEGORIES.flatMap(
  (category) => category.sections,
);

/** One section by id, for the page to take its title and intro from. */
export const sectionOf = (id: string): OutlineSection => {
  const section = OUTLINE.find((candidate) => candidate.id === id);
  if (!section) {
    throw new Error(`No /design section with id "${id}"`);
  }
  return section;
};

/** The category a section opens, such as Foundations, or nothing mid-run. */
export const categoryOpenedBy = (id: string): string | undefined =>
  OUTLINE_CATEGORIES.find((category) => category.sections[0]?.id === id)?.title;
