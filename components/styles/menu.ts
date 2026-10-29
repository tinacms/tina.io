/**
 * Dropdown menus (#4964): the nav menus and the npx starter menu share one
 * look, specified as utilities in styles/tailwind.css.
 *
 * Behaviour to copy with them: put the hover handlers on one parent that holds
 * both the trigger and the panel, bridge the gap with padding (not margin),
 * and keep the panel mounted, fading it with opacity.
 */

/** The menu card: pale cyan, rounded, soft shadow, 8px inner padding. */
export const MENU_PANEL = 'menu-panel';

/** A row in a menu: white tint on hover. Give its text NAV_MENU_LINK. */
export const MENU_ITEM = 'menu-item';
