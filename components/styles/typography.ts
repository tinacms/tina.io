/**
 * Type roles for tina.io — the names components use.
 *
 *   primitives        app/global.css        --orange-500: #ec4815
 *   semantic tokens   app/global.css        --text-heading-start: var(--orange-500)
 *   role specs        styles/tailwind.css   @utility role-page-title { … }
 *   role names        here                  PAGE_TITLE = 'role-page-title'
 *
 * Every role is a named utility in styles/tailwind.css that sets family, size
 * at every breakpoint, weight, line height, letter spacing, case, wrapping and
 * colour. The spec lives there once, so markdown stylesheets can @apply the
 * same role a component uses. Read the full set, rendered, at /design.
 *
 * The rules:
 * - Use a role and nothing else for type. Never add a size, weight, family,
 *   line-height, tracking, case or text colour class next to one. Needing one
 *   means a role is missing: add it to styles/tailwind.css and here.
 * - Layout classes (margin, alignment, width, truncation) are fine.
 * - LINK is the one class that combines with a role (it only adds colour and
 *   underline).
 * - Colour follows the surface: on a dark container use ON_DARK, on a chip or
 *   coloured row use a SURFACE. Roles inside both recolour themselves.
 * - Colour follows what text does, not the tag: a plan name in a pricing card
 *   is CARD_TITLE whether it is an h2 or an h3.
 */

// ─── Headings ────────────────────────────────────────────────────────────

/** The page's one h1. Brand orange gradient, the only orange text. 36 → 48 → 60px. */
export const PAGE_TITLE = 'role-page-title';

/** Page title for blog posts and legal pages, whose titles run long. 36 → 48px. */
export const ARTICLE_TITLE = 'role-article-title';

/** Opens a band of the page. Strong ink. 30 → 36 → 48px. */
export const SECTION_TITLE = 'role-section-title';

/** A heading in a card, tier, tile or grid item, and h1–h2 in rich text. Also prices. 20 → 24 → 30px. */
export const CARD_TITLE = 'role-card-title';

/** A heading inside copy, names in dense grids, office names, h3–h6 in rich text. 18 → 20px. */
export const SUB_HEADING = 'role-sub-heading';

/** Testimonial and pull quotes. IBM Plex Sans Medium, no italics. 24 → 30px. */
export const QUOTE = 'role-quote';

// ─── Labels ──────────────────────────────────────────────────────────────

/**
 * SLUB (Smaller, Lighter, Uppercase, Bold): the small uppercase label above a
 * title, table column headers, pills. Short labels only, never names,
 * sentences, prices or addresses. Uppercased here, not in the copy. 14px.
 */
export const EYEBROW = 'role-eyebrow';

/** A standalone “Read more →” / “See all” link: SLUB in the link colour, underlined. */
export const EYEBROW_LINK = 'role-eyebrow-link';

/**
 * Short UI text that needs a little weight: chips, tags, status pills, table
 * row labels and values, times, step labels, “Page 1 of 15”. Inter Medium 14px.
 */
export const LABEL = 'role-label';

// ─── Reading text ────────────────────────────────────────────────────────

/** Every paragraph someone is meant to read. 16 → 18px. A bare <p> in <main> already looks like this. */
export const BODY = 'role-body';

/** Dense copy: card blurbs, lists, descriptions, checklist items. 14 → 16px. */
export const BODY_SMALL = 'role-body-small';

/** Dates, bylines, captions, units, hints. Supporting text only, never a paragraph. Subtle grey, 14 → 16px. */
export const BODY_MUTED = 'role-body-muted';

/** Small fixed-size text that sits tight under other content: billing notes, address lines. 14px at every width. */
export const CAPTION = 'role-caption';

/** Inline code, terminal output, package names, versions, commit hashes, published dates. IBM Plex Mono, 14 → 16px. */
export const CODE = 'role-code';

/**
 * Agreed exception: decorative terminal and code mockups (the homepage
 * terminal). IBM Plex Mono 13px at every width, line height 1.7. A picture of
 * code, not code to read — real code uses CODE.
 */
export const CODE_ILLUSTRATION = 'role-code-illustration';

// ─── Navigation, links and forms ─────────────────────────────────────────

/** Top-level nav items. Link blue. 18px in the mobile menu, 16px from xl. */
export const NAV_LINK = 'role-nav-link';

/** Items inside a nav menu. Body ink, link blue on hover. 18px in the mobile menu, 16px from xl. */
export const NAV_MENU_LINK = 'role-nav-menu-link';

/** Footer column links. IBM Plex Sans SemiBold 16px, uppercase. Use inside ON_DARK. */
export const FOOTER_LINK = 'role-footer-link';

/** The small legal links under the footer. White at 75% on dark, white on hover. Use inside ON_DARK. */
export const FOOTER_LEGAL_LINK = 'role-footer-legal-link';

/**
 * A link inside text. Adds the link colour and underline and keeps the size of
 * the role around it, e.g. `${BODY_SMALL} ${LINK}`. On ON_DARK it turns white.
 */
export const LINK = 'link';

/** Text inputs, selects and text areas. 16px so phones don't zoom. Placeholder in the label grey. */
export const FIELD = 'role-field';

// ─── Containers ──────────────────────────────────────────────────────────

/**
 * Put on a dark or brand-orange container (footer, newsletter) and every role
 * inside switches to white (SLUB and legal links to white at 75%). Use the
 * normal roles inside, never `text-white` by hand.
 */
export const ON_DARK = 'on-dark';

/**
 * Fill + text pairs for chips, pills, badges and coloured table rows. Put one
 * on the chip and give its text a role (usually LABEL, EYEBROW or CODE); the
 * role picks up the paired ink. All pass AA at 14px.
 */
export const SURFACE = {
  /** Slate-100 with ink. Tags, commit hashes, inline code. */
  neutral: 'surface-neutral',
  /** Orange-100 with orange-700. Contributors, breaks, “Closed”. */
  brand: 'surface-brand',
  /** Blue-50 with blue-800. Talks, table header rows. */
  info: 'surface-info',
  /** Seafoam-100 with seafoam-900. “Open”, success. */
  success: 'surface-success',
  /** Yellow-100 with yellow-800. Warnings, like the “English only” alert. */
  warning: 'surface-warning',
  /** Slate-500 with white. Finished events, step numbers. */
  neutralSolid: 'surface-neutral-solid',
  /** Orange-600 with white. “Featured”, “new”. */
  brandSolid: 'surface-brand-solid',
} as const;

/** A matched search term: brand tint and bold, keeping the size of the text around it. */
export const HIGHLIGHT = 'highlight';

/**
 * Put on a wrapper around markdown output. Bare h1–h2 become CARD_TITLE,
 * h3–h6 SUB_HEADING, paragraphs BODY, links LINK, inline code CODE,
 * table headers EYEBROW.
 */
export const RICH_TEXT = 'rich-text';
