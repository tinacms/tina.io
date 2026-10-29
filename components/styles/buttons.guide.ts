import type { ButtonLevel } from './buttons';

/**
 * Guidance for the button levels (#4964), rendered by the Tina.io Style Guide
 * at /design. Edit button guidance here, not in the page.
 */

export interface ButtonLevelGuide {
  level: ButtonLevel;
  /** Label for the live example, taken from the site. */
  example: string;
  /** Show the trailing arrow in the example. */
  arrow?: boolean;
  useFor: string;
  notFor: { job: string; instead: string };
}

export const BUTTON_LEVEL_GUIDE: ButtonLevelGuide[] = [
  {
    level: 'primary',
    example: 'Schedule Call',
    useFor:
      'The main action in a view: get started, schedule a call, start a plan. A group always leads with it.',
    notFor: {
      job: 'Several equal actions in one row',
      instead: 'BUTTON.secondary',
    },
  },
  {
    level: 'secondary',
    example: 'My TinaCloud',
    useFor:
      'A button on its own that shouldn’t compete with the page’s Primary, like the nav’s My TinaCloud, or the quieter partner of a Primary.',
    notFor: {
      job: 'Leading a group that has a Tertiary in it',
      instead: 'BUTTON.primary',
    },
  },
  {
    level: 'tertiary',
    example: 'Try the Editor',
    useFor:
      'A lower-emphasis action beside a Primary: try the editor, contact sales, cancel.',
    notFor: {
      job: 'Next to a blue Secondary',
      instead: 'make the lead BUTTON.primary',
    },
  },
];

/** The rules, phrased as what to do. */
export const BUTTON_RULES = [
  'Every button is one of three levels and one size: 44px tall, 8px corners, the label plus 24px each side. Use Button, LinkButton or ModalButton with a level.',
  'A group leads with Primary. Tertiary (the orange outline) always sits beside a Primary; blue Secondary stands on its own or as the quieter partner of a Primary.',
  'The highest level comes first in a group. Cancel is Tertiary, after the action it cancels.',
  'Let the label set the width. On phones, groups stack full width (ButtonGroup or BUTTON_GROUP does this).',
  'Add only layout classes beside a button: margin, width, alignment. Never a colour, radius, padding, height or type class.',
  'On a dark or orange container, put ON_DARK on the container. Primary turns white with an orange label, Tertiary a white outline.',
  'Name the action in the label: a verb and an object, sentence case, one line. Never “OK” or “Click here”.',
  'Navigation is a link and an action is a button; either can be any level. Anything that submits or changes data is a <button>.',
  'Disable rather than hide an unavailable button. Disabled is 60% with no hover.',
  'Icon-only buttons use ICON_BUTTON and always have an aria-label.',
  'A link that reads as text (“Read more →”) is a text link: EYEBROW_LINK or LINK, not a button. In the CMS that’s the Text link option.',
];

/** Agreed exceptions: their own styling is expected, not a bug. */
export const BUTTON_EXCEPTIONS = [
  'The phone menu tab and the language flag in the nav: deliberate one-offs.',
  'Nav menu triggers and footer column toggles: text, styled by NAV_LINK, NAV_MENU_LINK and FOOTER_LINK.',
  'The npx create-tina-app command button and its copy segment.',
  'Video play overlays, social icons and logos.',
  'Clickable chips and badges (What’s New contributors and commits, the hero news badge): typography surfaces.',
  'Choice cards (Book a demo locations, language picker).',
  'Segmented toggles (pricing): a pill track, with the selected option in the Secondary blue (SEGMENTED_SELECTED).',
  'Contrast: the Primary and Secondary gradients keep white labels at 3.8:1 and 3.7:1 on their light ends. Agreed with design; don’t darken without checking.',
  'Third-party widgets: the chatbot, YouTube player, Giscus comments and HubSpot forms.',
];
