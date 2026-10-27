/**
 * Type roles for tina.io — the class layer of the design system.
 *
 *   primitives        app/global.css      --orange-500: #ec4815
 *   semantic tokens   app/global.css      --text-heading-start: var(--orange-500)
 *   roles             here                PAGE_TITLE -> text-heading
 *
 * Each role carries everything about how its text looks: family, size at
 * every breakpoint, weight, line height, letter spacing, wrapping and colour.
 * A component should never need to add another typography class next to a
 * role — reaching for one is a sign a role is missing, so add it here rather
 * than working around it in a component.
 *
 * What a role deliberately leaves out is layout: margins, alignment, width
 * and wrapping limits like `whitespace-nowrap` depend on where the text sits,
 * so those stay with the component.
 *
 * Colour follows what a heading *does*, not which tag it uses — a plan name
 * inside a pricing card is a card title whether it is marked up as h2 or h3.
 * Heading level stays for document structure and search.
 *
 * Weights match the font files that actually ship: IBM Plex Sans is loaded
 * at 600 (SemiBold) and 500 (Medium) only, so no heading asks for bold —
 * that would make the browser fake it. Inter (`font-sans`) has 400/500/700.
 * IBM Plex Mono (`font-mono`) has 400/500/600 and an italic.
 */

// The ramp, for layouts that need a size on its own.
export const H1_HEADINGS_SIZE = 'text-4xl md:text-5xl lg:text-6xl';

export const BLOCK_HEADINGS_SIZE = 'text-3xl md:text-4xl lg:text-5xl';

export const SECTION_HEADINGS_SIZE = 'text-xl md:text-2xl lg:text-3xl';

// Headings.

/**
 * The one orange moment at the top. Once per page, never twice.
 *
 * The only role allowed `text-heading` — a gradient from the brand orange
 * (orange-500) to orange-600. Brand orange is 3.82:1 on white, which passes as
 * large text but not body text, so it stays at title sizes.
 */
export const PAGE_TITLE = `font-ibm-plex font-semibold ${H1_HEADINGS_SIZE} leading-tight tracking-tight text-balance text-heading`;

/**
 * A page title for long-form pages — blog posts and legal pages — whose titles
 * run long. Same treatment as PAGE_TITLE, capped a size lower so a long title
 * doesn't wrap to four lines.
 */
export const ARTICLE_TITLE =
  'font-ibm-plex font-semibold text-4xl md:text-5xl leading-tight tracking-tight text-balance text-heading';

/** Opens a band of the page. Strong ink, so the page title stays the only orange. */
export const SECTION_TITLE = `font-ibm-plex font-semibold ${BLOCK_HEADINGS_SIZE} leading-tight tracking-tight text-balance text-strong`;

/** A heading inside a card, tier, tile or grid item. Strong ink, so a grid reads as a grid. */
export const CARD_TITLE = `font-ibm-plex font-semibold ${SECTION_HEADINGS_SIZE} leading-snug text-balance text-strong`;

/** A heading inside running copy, mostly blog posts and docs. Strong ink. */
export const SUB_HEADING =
  'font-ibm-plex font-semibold text-xl leading-snug text-balance text-strong';

/** The small uppercase label above a title. Uppercased here, not in the copy. */
export const EYEBROW =
  'font-ibm-plex-medium font-medium text-xs leading-normal tracking-widest uppercase text-subtle';

// Body. Headings with no role fall back to strong ink (styles/tailwind.css)
// and other text to body ink via text-foreground, but a role always names its
// own colour so it renders correctly on any element.

/** Opening paragraph under a title. */
export const LEDE =
  'font-sans font-normal text-xl leading-relaxed text-pretty text-body';

/** Default for every paragraph someone is meant to read. */
export const BODY =
  'font-sans font-normal text-base leading-relaxed text-pretty text-body';

/** Card copy and dense lists. */
export const BODY_SMALL =
  'font-sans font-normal text-sm leading-relaxed text-pretty text-body';

/** Captions, timestamps, footer links, form hints. Supporting text only. */
export const BODY_MUTED =
  'font-sans font-normal text-base leading-relaxed text-pretty text-subtle';

// Code.

/** Inline code, terminal output and technical labels such as file paths. */
export const CODE = 'font-mono font-normal text-sm leading-relaxed text-strong';
