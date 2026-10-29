/**
 * Dropdown menus (#4964), specified as utilities in styles/tailwind.css:
 * the nav menus (pale cyan) and the npx starter menu (white, under the
 * command field). Both behave the same way.
 *
 * Behaviour to copy with them: put the hover handlers on one parent that holds
 * both the trigger and the panel, bridge the gap with padding (not margin),
 * and keep the panel mounted, fading it with opacity.
 */

/** The menu card: pale cyan, rounded, soft shadow, 8px inner padding. */
export const MENU_PANEL = 'menu-panel';

/** A row in a menu: white tint on hover. Give its text NAV_MENU_LINK. */
export const MENU_ITEM = 'menu-item';

/** The npx starter menu's card: white, with the command field's outline. */
export const COMMAND_MENU = 'command-menu';

/**
 * A row in the starter menu: light grey with an orange label and icon on
 * hover; icons are ink until then. Give its text NAV_MENU_LINK.
 */
export const COMMAND_MENU_ITEM = 'command-menu-item';
