/**
 * Standalone links (#4964), specified as utilities in styles/tailwind.css.
 *
 * - A text link (“Read more →”) is not a button. Use the TextLink component,
 *   which always draws the short arrow. No other arrow or icon goes on a
 *   text link.
 * - Social links (Discord, GitHub, …) use the SocialLinks component: button
 *   size in the neutral outline, never a button level.
 */

/** A standalone text link: SLUB in the link colour, underlined, with the arrow. */
export const TEXT_LINK = 'arrow-link';

/** The short arrow at the end of every text link. TextLink draws it. */
export const TEXT_LINK_ARROW = 'arrow-link-arrow';

/** A social link: white, light slate outline, ink label, brand-colour logo. */
export const SOCIAL_LINK = 'social-link';
