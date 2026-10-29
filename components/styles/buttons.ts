/**
 * Button levels for tina.io — the names components use (#4964).
 *
 *   primitives        app/global.css        --orange-500, --blue-500
 *   semantic tokens   app/global.css        --button-primary-from: var(--orange-500)
 *   level specs       styles/tailwind.css   @utility btn, btn-primary, …
 *   level names       here                  BUTTON.primary = 'btn btn-primary'
 *
 * The rules:
 * - Every button is one of three levels, all one size (44px, 8px corners).
 *   Use the Button, LinkButton or ModalButton components with `level`.
 * - Primary is the main action, and a section's only button is Primary.
 *   Tertiary (orange outline) always sits beside a Primary. Secondary (blue)
 *   is for buttons that shouldn't compete, like the nav's My TinaCloud.
 * - Buttons have no arrows; text links always end in one.
 * - On a dark or orange container, put ON_DARK on the container. Primary
 *   turns white and Tertiary a white outline by themselves.
 * - Add only layout classes beside a button: margin, width, alignment.
 *   Never a colour, radius, padding, height or type class.
 * - Icon-only buttons use ICON_BUTTON and always get an aria-label.
 * - A link that reads as text (“Read more →”) is a text link, not a button:
 *   use EYEBROW_LINK or LINK from typography.ts.
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

export const BUTTON_LEVELS = Object.keys(BUTTON) as ButtonLevel[];

/** Icon-only utility buttons: close, copy, carousel arrows, search. 44px tap area, 20px icon. */
export const ICON_BUTTON = 'icon-btn';

/** The keyboard focus ring for other controls: toggles, disclosure rows, choice cards. */
export const FOCUS_RING = 'focus-ring';

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
  { value: 'secondary', label: 'Secondary (blue): quieter, beside a Primary' },
  { value: 'tertiary', label: 'Tertiary (orange outline): beside a Primary' },
];

/**
 * Old CMS colour values, for content that hasn't been migrated (and for the
 * migration script). Pairing rules are applied in content, not here, so an
 * unmigrated blue outline maps to Tertiary.
 */
export const LEVEL_FROM_LEGACY: Record<string, ButtonLevel> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  orange: 'primary',
  black: 'primary',
  blue: 'secondary',
  default: 'secondary',
  seafoam: 'secondary',
  command: 'secondary',
  white: 'tertiary',
  ghost: 'tertiary',
  orangeWithBorder: 'tertiary',
  ghostOutline: 'tertiary',
  blueOutline: 'tertiary',
};

/** The level for any stored value; unknown or missing values are Secondary (the old default). */
export const levelOf = (value?: string | null): ButtonLevel =>
  (value && LEVEL_FROM_LEGACY[value]) || 'secondary';
