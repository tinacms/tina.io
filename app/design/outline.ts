import { ROLE_GROUPS } from '@/component/styles/typography.guide';

/** Kebab-case id from a title, so an example can link to its own table. */
export const slug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export type OutlineGroup = { id: string; title: string };
export type OutlineSection = {
  id: string;
  title: string;
  groups: OutlineGroup[];
};

/**
 * Every section and group on /design, in page order, for the sticky index.
 * Each id and title matches its Section or Group in page.tsx;
 * tests/design-modes.spec.ts checks every target has exactly one index link.
 */
export const OUTLINE: OutlineSection[] = [
  {
    id: 'typography',
    title: 'Typography',
    groups: [
      { id: 'typography-rules', title: 'The rules' },
      ...ROLE_GROUPS.map((group) => ({
        id: slug(group.title),
        title: group.title,
      })),
      { id: 'typography-exceptions', title: 'Agreed exceptions' },
    ],
  },
  {
    id: 'colour',
    title: 'Colour',
    groups: [
      { id: 'text-colours', title: 'Text colours' },
      { id: 'surfaces', title: 'Surfaces' },
      { id: 'lines', title: 'Lines' },
      { id: 'inks', title: 'Inks' },
      { id: 'on-dark', title: 'On dark' },
    ],
  },
  {
    id: 'buttons',
    title: 'Buttons',
    groups: [
      { id: 'button-rules', title: 'The rules' },
      { id: 'button-levels', title: 'Levels' },
      { id: 'button-groups', title: 'Groups' },
      { id: 'buttons-on-dark', title: 'On dark' },
      { id: 'button-states', title: 'States' },
      { id: 'icon-buttons', title: 'Icon buttons' },
      { id: 'button-exceptions', title: 'Agreed exceptions' },
    ],
  },
  {
    id: 'links-and-navigation',
    title: 'Links and navigation',
    groups: [
      { id: 'text-links', title: 'Text links' },
      { id: 'social-links', title: 'Social links' },
      { id: 'pagination', title: 'Pagination' },
      { id: 'neutral-outline', title: 'Neutral outline' },
      { id: 'command-field', title: 'Command field' },
      { id: 'menus', title: 'Dropdown menus' },
      { id: 'segmented-toggles', title: 'Segmented toggles' },
      { id: 'tabs', title: 'Tabs' },
    ],
  },
];
