/**
 * Button levels for tina.io — the names components use.
 *
 *   primitives        app/global.css        --orange-500, --blue-500
 *   semantic tokens   app/global.css        --button-primary-from: var(--orange-500)
 *   level specs       styles/tailwind.css   @utility btn, btn-primary, …
 *   level names       here                  BUTTON.primary = 'btn btn-primary'
 *
 * Rules and agreed exceptions: buttons.guide.ts, shown on /design.
 */

export const BUTTON = {
  /** The main action in a view: sign up, get started, schedule a call. Orange. */
  primary: 'btn btn-primary',
  /** A button that shouldn't compete with the page's Primary (the nav's My TinaCloud), or the quieter partner of a Primary. Blue. */
  secondary: 'btn btn-secondary',
  /** A lower-emphasis action beside a Primary: try the editor, learn more, cancel. Orange outline. */
  tertiary: 'btn btn-tertiary',
} as const;

export type ButtonLevel = keyof typeof BUTTON;

/** Icon-only utility buttons: close, copy, carousel arrows, search. 44px tap area, 20px icon. */
export const ICON_BUTTON = 'icon-btn';

/** The keyboard focus ring for other controls: toggles, disclosure rows, choice cards. */
export const FOCUS_RING = 'focus-ring';

/** The focus ring for a switch drawn after a hidden `peer` input: shows when the input has keyboard focus. */
export const FOCUS_RING_PEER = 'focus-ring-peer';

/** The neutral outline: white, a light slate border that darkens on hover. Not a button level. */
export const NEUTRAL_OUTLINE = 'neutral-outline';

/** The selected option in a segmented toggle: Secondary blue on a pill track. */
export const SEGMENTED_SELECTED = 'segmented-selected';

/**
 * A row of buttons. On phones they stack, full width; from sm (640px) up they
 * sit side by side at label width.
 */
export const BUTTON_GROUP =
  'flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center [&>*]:w-full sm:[&>*]:w-auto';

/**
 * The CMS options for a button's level (Actions `variant`, Modal Button
 * `color`). Editors pick a level, never a colour, shape or size.
 */
export const BUTTON_LEVEL_OPTIONS = [
  { value: 'primary', label: 'Primary (orange): the main action' },
  {
    value: 'secondary',
    label:
      'Secondary (blue): shouldn’t compete with the page’s Primary, like My TinaCloud',
  },
  {
    value: 'tertiary',
    label: 'Tertiary (orange outline): always beside a Primary',
  },
];

/** The level for a stored CMS value. Anything that isn't a level is Primary. */
export const levelOf = (value?: string | null): ButtonLevel =>
  value && Object.hasOwn(BUTTON, value) ? (value as ButtonLevel) : 'primary';
