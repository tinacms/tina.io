/**
 * Type roles for tina.io — Layer 3 of the colour system.
 *
 *   primitives        app/global.css      --orange-600: #d13f13
 *   semantic tokens   app/global.css      --text-heading: var(--orange-600)
 *   roles             here                PAGE_TITLE -> text-heading
 *
 * A role names a semantic colour (`text-heading`, `text-body`, `text-subtle`)
 * and never a primitive, so changing the brand orange is one edit in the
 * primitives block rather than a search across components.
 *
 * Colour follows what a heading *does* on the page, not which tag it uses — a
 * plan name inside a pricing card is a card title whether it is marked up as
 * h2 or h3, and takes body ink either way. Heading level stays for document
 * structure and search.
 *
 * Prefer a role over the raw sizes below. Reaching for a one-off is a sign a
 * role is missing; add it here rather than working around it in a component.
 */

// The ramp, for layouts that need a size on its own.
export const H1_HEADINGS_SIZE = 'text-4xl md:text-5xl lg:text-6xl';

export const BLOCK_HEADINGS_SIZE = 'text-3xl md:text-4xl lg:text-5xl';

export const SECTION_HEADINGS_SIZE = 'text-xl md:text-2xl lg:text-3xl';

// Roles. Size, weight and colour together.

/** The one orange moment at the top. Once per page, never twice. */
export const PAGE_TITLE = `font-ibm-plex font-bold text-balance text-heading ${H1_HEADINGS_SIZE}`;

/** Opens a band of the page — the signposts a scanning reader uses. */
export const SECTION_TITLE = `font-ibm-plex font-bold text-balance text-heading ${BLOCK_HEADINGS_SIZE}`;

/** A heading inside a card, tier, tile or grid item. Ink, so a grid reads as a grid. */
export const CARD_TITLE = `font-ibm-plex font-semibold ${SECTION_HEADINGS_SIZE}`;

/** A heading inside running copy, mostly blog posts and docs. Ink. */
export const SUB_HEADING = 'font-ibm-plex font-semibold text-xl';

/** The small uppercase label above a title. Uppercased here, not in the copy. */
export const EYEBROW =
  'font-ibm-plex text-xs font-medium uppercase tracking-wider text-subtle';

// Body. Ink is the default and needs no colour class; muted is the exception.

/** Opening paragraph under a title. */
export const LEDE = 'text-xl';

/** Default for every paragraph someone is meant to read. */
export const BODY = 'text-base';

/** Card copy and dense lists. */
export const BODY_SMALL = 'text-sm';

/** Captions, timestamps, footer links, form hints. Supporting text only. */
export const BODY_MUTED = 'text-base text-subtle';
