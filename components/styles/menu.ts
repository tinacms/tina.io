/**
 * Dropdown menus (#4964), specified as utilities in styles/tailwind.css:
 * the nav menus (pale cyan) and the npx starter menu (white, under the
 * command field). Both behave the same way.
 *
 * Behaviour to copy with them: put the hover handlers on one parent that holds
 * both the trigger and the panel, bridge the gap with padding (not margin),
 * keep the panel mounted inside MENU_REVEAL with data-state="open" or
 * "closed" (hidden from the keyboard when closed), and close it on Escape.
 */

/** The open / closed wrapper around a menu: fades, and hides from the keyboard when closed. */
export const MENU_REVEAL = 'menu-reveal';

/** The menu card: pale cyan, rounded, soft shadow, 8px inner padding. */
export const MENU_PANEL = 'menu-panel';

/** A row in a menu: white tint on hover. Give its text NAV_MENU_LINK. */
export const MENU_ITEM = 'menu-item';

/** A nav trigger whose menu is open or holds the current page: the cyan fill. */
export const MENU_TRIGGER_ACTIVE = 'menu-trigger-active';

/** The same cyan fill on hover, for nav triggers. */
export const MENU_TRIGGER_HOVER = 'hover:menu-trigger-active';

/** The npx command field: the neutral outline around the command (CodeButton). */
export const COMMAND_FIELD = 'command-field';

/** The flat orange copy block at the end of the command field. */
export const COMMAND_COPY = 'command-copy';

/** The npx starter menu's card: white, with the command field's outline. */
export const COMMAND_MENU = 'command-menu';

/**
 * A row in the starter menu: light grey with an orange label and icon on
 * hover; icons are ink until then. Give its text NAV_MENU_LINK.
 */
export const COMMAND_MENU_ITEM = 'command-menu-item';

/** The line between the starter list and the help text. */
export const COMMAND_MENU_RULE = 'command-menu-rule';
