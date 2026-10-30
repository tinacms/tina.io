import type { ButtonLevel } from './buttons';

/**
 * Guidance for the button levels, rendered by the Tina.io Style Guide
 * at /design. Edit button guidance here, not in the page.
 */

export interface ButtonLevelGuide {
  level: ButtonLevel;
  /** Label for the live example, taken from the site. */
  example: string;
  useFor: string;
  notFor: { job: string; instead: string };
}

export const BUTTON_LEVEL_GUIDE: ButtonLevelGuide[] = [
  {
    level: 'primary',
    example: 'Schedule Call',
    useFor:
      'The main action in a view: get started, schedule a call, start a plan. A group always leads with it, and a section’s only button is always Primary.',
    notFor: {
      job: 'Several equal actions in one row',
      instead: 'BUTTON.secondary',
    },
  },
  {
    level: 'secondary',
    example: 'My TinaCloud',
    useFor:
      'A button that shouldn’t compete with the page’s Primary, like the nav’s My TinaCloud, or the quieter partner of a Primary.',
    notFor: {
      job: 'A section’s only button, or leading a group with a Tertiary',
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
  'A group leads with Primary, and a section’s only button is Primary. Tertiary (the orange outline) always sits beside a Primary; blue Secondary is for buttons that shouldn’t compete, like the nav’s My TinaCloud.',
  'Buttons have no arrows. Text links (“Read more →”) always end in one.',
  'The highest level comes first in a group. Cancel is Tertiary, after the action it cancels.',
  'Let the label set the width. On phones, groups stack full width (ButtonGroup or BUTTON_GROUP does this).',
  'Add only layout classes beside a button: margin, width, alignment. Never a colour, radius, padding, height or type class.',
  'On a dark or orange container, put ON_DARK on the container. Primary turns white with an orange label, Tertiary a white outline.',
  'Name the action in the label: a verb and an object, sentence case, one line. Never “OK” or “Click here”.',
  'Navigation is a link and an action is a button; either can be any level. Anything that submits or changes data is a <button>.',
  'Disable rather than hide an unavailable button. Disabled is 60% with no hover.',
  'Icon-only buttons use ICON_BUTTON and always have an aria-label.',
  'A link that reads as text (“Read more →”) is a TextLink, not a button. It always ends in the short arrow; no other arrow or icon. Links inside a sentence are LINK. In the CMS that’s the Text link option.',
];

/** Agreed exceptions: their own styling is expected, not a bug. */
export const BUTTON_EXCEPTIONS = [
  'The phone menu tab and the language flag in the nav: deliberate one-offs.',
  'Nav menu triggers and footer column toggles: text, styled by NAV_LINK, NAV_MENU_LINK and FOOTER_LINK.',
  'Pricing plan cards: each card has its own lone Tertiary, and the cards side by side act as the group.',
  'TinaCon: the Agenda button stays Tertiary even when Register isn’t shown.',
  'Roadmap links are plain text links (LINK), not buttons.',
  'Video play overlays, social icons and logos.',
  'Clickable chips and badges (What’s New contributors and commits, the hero news badge): typography surfaces.',
  'Choice cards (Book a demo locations, language picker).',
  'Segmented toggles (pricing): a pill track, with the selected option in the Secondary blue (SEGMENTED_SELECTED).',
  'Contrast: the Primary and Secondary gradients keep white labels at 3.8:1 and 3.7:1 on their light ends, and the starter menu’s hovered row is orange-600 on light grey at 4.3:1. Agreed with design; don’t darken without checking.',
  'Third-party widgets: the chatbot, YouTube player, Giscus comments and HubSpot forms.',
];
