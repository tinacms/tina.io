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
 * - LINK, TITLE_LINK and SUBTLE_LINK are the only classes that combine with a
 *   role (they only add colour, and LINK an underline).
 * - Colour follows the surface: on a dark container use ON_DARK, on a chip or
 *   coloured row use a SURFACE. Roles inside both recolour themselves.
 * - Colour follows what text does, not the tag: a plan name in a pricing card
 *   is CARD_TITLE whether it is an h2 or an h3.
 */

// ─── Headings ────────────────────────────────────────────────────────────

/** The page's one h1. Brand orange gradient, lit from above line by line. 36 → 48 → 60px. */
export const PAGE_TITLE = 'role-page-title';

/** Page title for blog posts and legal pages, whose titles run long, and for a page title in a narrow card, like /meetings. 36 → 48px. */
export const ARTICLE_TITLE = 'role-article-title';

/** Opens a band of the page. Strong ink. 30 → 36 → 48px. */
export const SECTION_TITLE = 'role-section-title';

/** A heading in a card, tier, tile or grid item, and h1–h2 in rich text. Also prices. 20 → 24 → 30px. */
export const CARD_TITLE = 'role-card-title';

/**
 * Agreed exception: the recommended (starred) pricing plan's name and price.
 * CARD_TITLE's type in the brand orange gradient. Nowhere else.
 */
export const CARD_TITLE_FEATURED = 'role-card-title-featured';

/** A heading inside copy, names in dense grids, office names, h3–h6 in rich text. 18 → 20px. */
export const SUB_HEADING = 'role-sub-heading';

/** Testimonial and pull quotes. IBM Plex Sans Medium, no italics. 24 → 30px. */
export const QUOTE = 'role-quote';

// ─── Labels ──────────────────────────────────────────────────────────────

/**
 * SLUB (Smaller, Lighter, Uppercase, Bold): the small uppercase label above a
 * title, table column headers, pills, step labels. Short labels only, never names,
 * sentences, prices or addresses. Uppercased here, not in the copy. 14px.
 */
export const EYEBROW = 'role-eyebrow';

/** A standalone “Read more →” / “See all” link: SLUB in the link colour, underlined. */
export const EYEBROW_LINK = 'role-eyebrow-link';

/**
 * Short UI text that needs a little weight: chips, tags, status pills, table
 * row labels and values, times, “Page 1 of 15”. Inter Medium 14px.
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

/** Single-use: the command in the npx command field. IBM Plex Mono 14px at every width. */
export const COMMAND = 'role-command';

/**
 * Agreed exception: decorative terminal and code mockups (the homepage
 * terminal). IBM Plex Mono 13px at every width, line height 1.625. A picture of
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

/**
 * A heading that is a link, like a post title in a list. Keeps the heading's
 * role and ink and turns link blue on hover, e.g. `${CARD_TITLE} ${TITLE_LINK}`.
 */
export const TITLE_LINK = 'title-link';

/**
 * A standalone link that should stay quiet, like the GitHub stars line in the
 * top banner. Keeps its role's colour with no underline and darkens to ink on
 * hover, e.g. `${BODY_SMALL} ${SUBTLE_LINK}`.
 */
export const SUBTLE_LINK = 'subtle-link';

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
  /** Seafoam-100 fill and seafoam border with the normal ink. Good-news callouts in a post. */
  successPanel: 'surface-success-panel',
  /** Yellow-100 with yellow-800. Warnings, like the “English only” alert. */
  warning: 'surface-warning',
  /** Red-50 with red-800. Form errors. */
  error: 'surface-error',
  /** Slate-500 with white. Finished events, step numbers. */
  neutralSolid: 'surface-neutral-solid',
  /** Orange-600 with white. “Featured”, “new”. */
  brandSolid: 'surface-brand-solid',
  /** The page: the sky wash in light, the night sky in dark. Keeps the roles' inks. */
  page: 'surface-page',
  /** A card on the page: white in light; neutral-900 with a 1px edge in dark. Cards, tables, menus, dialogs. */
  card: 'surface-card',
  /** The card's fill with no ring, for an element that draws its own border (a dialog, ChooserCard). Pair it with a LINE.* border. */
  cardBordered: 'surface-card-bordered',
  /** A well inside a card: slate-100 in light, neutral-800 in dark. Fields and wells. */
  well: 'surface-well',
  /** A table's header row: slate-50 in light, the well level in dark. */
  tableHead: 'surface-table-head',
  /** A glass card on the page: white 10% to 40% in light; the card level at 45%, blurred, in dark. */
  glass: 'surface-glass',
  /** A frosted card on the page: white 25%, 50%, 75% in light; the same as glass in dark. */
  frosted: 'surface-frosted',
  /** The orange footer band (its picture) in light; the card with a 1px top edge in dark. Put ON_DARK beside it. */
  footerBand: 'surface-footer-band',
  /** The legal strip under the footer: orange-600 to 900 in light; the card in dark. Gradient stops only. */
  legalBand: 'surface-legal-band',
  /** Small orange bands and badges (consent banner): orange-400 to 600, both modes. Gradient stops only. */
  brandBand: 'surface-brand-band',
  /** Seafoam icon discs (tip, update): seafoam-500 to 700 with white, both modes. Gradient stops only. */
  successBand: 'surface-success-band',
  /** Blue icon discs: blue-400 to 600 with white, both modes. Gradient stops only. */
  infoBand: 'surface-info-band',
  /** The starred plan corner: flat orange-400 with white, both modes. */
  brandFlag: 'surface-brand-flag',
  /** Recipe code panels: grey-800 with a grey-700 edge in light; near-black with the card edge in dark. */
  recipePanel: 'surface-recipe-panel',
  /** The feature code panel: a charcoal fade, grey edge and pale ink in light; near-black in dark. Gradient stops only. */
  featureCodePanel: 'surface-feature-code-panel',
  /** The feature code panel's tab: the same fade without the black end. Gradient stops only. */
  featureCodeTab: 'surface-feature-code-tab',
  /** The stuck nav bar: sky glass at 60% in light; the dark glass with the card edge in dark. Gradient stops only. */
  navGlass: 'surface-nav-glass',
  /** The mobile drawer: blue-50 to white in light; the card in dark. Gradient stops only. */
  drawer: 'surface-drawer',
  /** The mobile menu tab: white to slate-50, a faint edge, orange ink; the card in dark. Gradient stops only. */
  menuTab: 'surface-menu-tab',
  /** The drawer's backdrop: grey-900 at 70%, both modes. */
  scrim: 'surface-scrim',
  /** The consent settings backdrop: black at 50%, both modes (an approved light change, as the code intended). */
  scrimConsent: 'surface-scrim-consent',
  /** A dialog's backdrop: black at 80%, both modes. */
  scrimDialog: 'surface-scrim-dialog',
  /** The SSW strip in the footer: SSW red to black, both modes. */
  sswStrip: 'surface-ssw-strip',
  /** The SSW strip's hover overlay: SSW red fading out. */
  sswStripHover: 'surface-ssw-strip-hover',
  /** A row on hover in a list or popover: slate-50 in light, the well in dark. */
  rowHover: 'surface-row-hover',
  /** A switch's track: grey-200 in light; the well with the strong edge in dark. */
  switch: 'surface-switch',
  /** A switch's track when on: orange-600, both modes. Use with peer-checked:. */
  switchOn: 'surface-switch-on',
  /** A switch's knob: white with the strong grey edge. Use with after:. */
  switchKnob: 'surface-switch-knob',
  /** A checkbox: the strong grey edge, orange when checked and for its focus ring. */
  checkbox: 'surface-checkbox',
  /** A text field: white with the strong grey edge in light; the well with the strong edge in dark. Its focus ring is orange. */
  field: 'surface-field',
  /** A field on a dark band: a white outline over white at 10%, both modes. */
  fieldOnDark: 'surface-field-on-dark',
  /** The glass search trigger: white at 50% in light; the dark glass in dark. */
  fieldGlass: 'surface-field-glass',
  /** The cloud banner: white into mint with a mint edge in light; the dark glass with the subtle line in dark. */
  cloudBanner: 'surface-cloud-banner',
  /** A CMS seafoam section: a seafoam wash in light; the dark glass in dark. Gradient stops only. */
  sectionSeafoam: 'surface-section-seafoam',
  /** The conference header banner: seafoam-100 to 200 in light; the dark glass in dark. Gradient stops only. */
  bannerSeafoam: 'surface-banner-seafoam',
  /** Behind a QR code: white in both modes, so it scans. */
  qr: 'surface-qr',
  /** A bright glass card: white to white 50% in light; the dark glass in dark. Gradient stops only. */
  glassBright: 'surface-glass-bright',
  /** A translucent panel: white at 60% in light; the dark glass in dark. The call site keeps its blur. */
  glassPanel: 'surface-glass-panel',
  /** A translucent panel: white at 70% in light; the dark glass in dark. The call site keeps its blur. */
  glassPanelStrong: 'surface-glass-panel-strong',
  /** Glass colours only (white 10% to 40%; the dark glass in dark), so the call site keeps its own direction and can layer a hover. Gradient stops only. */
  glassStops: 'surface-glass-stops',
  /** A glass card's hover tint: blue-500 at 10% in light; white at 6% in dark. Gradient start only. */
  glassHover: 'surface-glass-hover',
  /** A teal-to-cyan wash card: at 60% in light; the dark glass in dark. Gradient stops only. */
  washTeal: 'surface-wash-teal',
  /** An example card: white to white 30% with a lavender edge, white on hover; the dark glass in dark. Gradient stops only. */
  exampleCard: 'surface-example-card',
  /** A tooltip: white in light, the card in dark. */
  tooltip: 'surface-tooltip',
  /** A tooltip's arrow, drawn as a right border in the tooltip's colour. */
  tooltipArrow: 'surface-tooltip-arrow',
  /** The fade at a table's scroll edge: slate-50 in light, the well in dark. Gradient stops only. */
  tableFade: 'surface-table-fade',
  /** The fade at a table's scroll edge while its row is hovered: sky-50 in light; the hovered row over the well in dark. Gradient stops only. */
  tableFadeHover: 'surface-table-fade-hover',
  /** A table row on hover: sky-50 in light; white at 6% in dark. */
  tableRowHover: 'surface-table-row-hover',
  /** A striped blog-table row: blue-500 at 5% in light; white at 6% in dark. */
  blogTableStripe: 'surface-blog-table-stripe',
  /** A plain blog-table row: white at 5% in light; clear in dark. */
  blogTableRow: 'surface-blog-table-row',
  /** A blog table's header: white at 50% in light; the well in dark. */
  blogTableHead: 'surface-blog-table-head',
  /** A row on hover with a brand tint: orange-50 at 40% in light; the brand chip fill in dark. */
  rowHoverBrand: 'surface-row-hover-brand',
  /** The premier partner badge: an amber fade with amber-900 ink in light; the warning chip in dark. Gradient stops only. */
  partnerPremier: 'surface-partner-premier',
  /** A faint info box: blue-50 at 40% with the info border in light; the info chip in dark. */
  infoFaint: 'surface-info-faint',
  /** The scrim over a video or image: grey-800, its opacity set at the call site. */
  mediaScrim: 'surface-media-scrim',
  /** An empty media placeholder: grey-200 in light, the well in dark. */
  mediaPlaceholder: 'surface-media-placeholder',
  /** A panel behind a snippet image: slate-50 in light, the well in dark. */
  imagePanel: 'surface-image-panel',
  /** The command field's icon disc: ink-900 in light; the well in dark. */
  commandIconChip: 'surface-command-icon-chip',
  /** The terminal illustration's panel: white in light, the well in dark. */
  terminal: 'surface-terminal',
  /** The terminal illustration's bars: slate-50 in light, the well in dark. */
  terminalBar: 'surface-terminal-bar',
  /** A pricing plan card: no fill in light (its shadow draws it); the card with its edge in dark. */
  planCard: 'surface-plan-card',
  /** A plan card's hover wash: clear to cyan-100 in light; white at 6% in dark. Gradient stops only. */
  planHover: 'surface-plan-hover',
  /** A muted plan card: grey-50 at 70% in light; the card in dark. */
  planMuted: 'surface-plan-muted',
} as const;

/**
 * Line colours: a subtle line for decoration (dividers, table rules, card
 * edges) and a strong line for anything you click or type in. Put one beside
 * the border width and sides, e.g. `border-b ${LINE.subtle}`.
 */
export const LINE = {
  subtle: 'line-subtle',
  strong: 'line-strong',
  /** A faint edge on a white popover: slate-100 in light, the subtle line in dark. */
  faint: 'line-faint',
  /** A glass card's edge: white at 30% in light, the card edge in dark. */
  glass: 'line-glass',
  /** The terminal illustration's hairlines: black at 10% in light, the subtle line in dark. */
  terminal: 'line-terminal',
  /** A blog table's cell lines: orange-100 in light, the subtle line in dark. */
  blogTable: 'line-table-blog',
  /** A tip callout's side: teal-400 in light, the success chip border in dark. */
  calloutTip: 'line-callout-tip',
  /** A warning callout's side: orange-400, both modes. */
  calloutWarning: 'line-callout-warning',
  /** A selected choice card's edge: blue-500, both modes. */
  selected: 'line-selected',
  /** A 2px bar in the strong line colour (a fill, not a border). */
  fill: 'line-fill',
  /** The premier partner card's ring colour (with ring-2). */
  partnerPremier: 'line-partner-premier',
  /** ChooserCard's focus ring colour (with focus-visible:ring-1): shadcn's ink in light, the focus ring in dark. */
  chooserFocus: 'line-chooser-focus',
} as const;

/**
 * Inks for marks that aren't text: icons, logos, status dots, the roadmap
 * and the map. They set the colour, so an SVG takes one with fill-current or
 * stroke-current. Text uses a type role instead.
 */
export const INK = {
  /** The brand orange mark: orange-500, both modes. The Tina logo in the nav, brand icons. */
  brand: 'ink-brand',
  /** An icon on a band (the plan cards' white star): white, both modes. */
  onBand: 'ink-on-band',
  /** A logo on a dark band: white, both modes. The Tina logo in the footer. */
  logoOnDark: 'ink-logo-on-dark',
  /** Social link logos: brand colours in light, all near-white in dark. */
  socialTina: 'ink-social-tina',
  socialDiscord: 'ink-social-discord',
  socialGithub: 'ink-social-github',
  socialX: 'ink-social-x',
  /** The external-link icon beside a nav item: blue-200, blue-400 on group hover; the link blues in dark. */
  externalLink: 'ink-external-link',
  /** A decorative icon (an empty state): grey-300 in light, the subtle line grey in dark. */
  decor: 'ink-decor',
  /** A mark in the strong ink (was pure black, merged as an approved light change). */
  strong: 'ink-strong',
  /** A mark in the subtle ink, like the heading-link icon. */
  subtle: 'ink-subtle',
  /** A subtle mark that keeps its grey on a tinted surface (a chevron on a selected ChooserCard): slate-500 in light, the subtle ink in dark. */
  subtleFixed: 'ink-subtle-fixed',
  /** A blue icon: blue-600 in light, the link blue in dark. */
  blue: 'ink-blue',
  /** An active blue icon: blue-800 in light, the link hover blue in dark. */
  active: 'ink-active',
  /** A mark at half strength: black at 50% in light, the subtle ink in dark. */
  subtitle: 'ink-subtitle',
  /** A checkbox's accent colour: orange-500, both modes. */
  brandAccent: 'ink-brand-accent',
  /** Roadmap status icons: done green, in-progress amber, planned and default blue; the chip inks in dark. */
  statusDone: 'ink-status-done',
  statusProgress: 'ink-status-progress',
  statusPlanned: 'ink-status-planned',
  statusDefault: 'ink-status-default',
  /** The roadmap's timeline: blue-700 to blue-400 (gradient stops), its dot's edge, and the fade at its end. */
  timeline: 'ink-timeline',
  timelineDot: 'ink-timeline-dot',
  timelineFade: 'ink-timeline-fade',
  /** The world map's land (grey-300; neutral-700 in dark) and its coral markers (both modes). SVG fill. */
  mapLand: 'ink-map-land',
  mapMarker: 'ink-map-marker',
} as const;

/**
 * Colour treatments of pictures and edges: glows, the logo strip and the
 * framed showcase image.
 */
export const DECOR = {
  /** A white glow on hover behind footer links. Use with hover:. */
  linkGlow: 'decor-link-glow',
  /** The framed showcase image: a soft navy shadow and a faint edge; no shadow and the card edge in dark. */
  imageFrame: 'decor-image-frame',
  /** The sky glow behind quote and carousel blocks: 50% in light, hidden in dark. */
  skyGlow: 'decor-sky-glow',
  /** The customer logo strip: as drawn in light, all near-white in dark. */
  logoStrip: 'decor-logo-strip',
} as const;

/** The page title's orange gradient as an ink, for a highlighted heading word. A step lighter in dark. */
export const HEADING_HIGHLIGHT = 'text-heading';

/** Decorative shimmer for short promo text, like the homepage news banner. Keeps the role and surface ink. */
export const SHIMMER = 'shimmer';

/** A matched search term: brand tint and bold, keeping the size of the text around it. */
export const HIGHLIGHT = 'highlight';

/**
 * Put on a wrapper around markdown output. Bare h1–h2 become CARD_TITLE,
 * h3–h6 SUB_HEADING, paragraphs BODY, links LINK, inline code CODE,
 * table headers EYEBROW.
 */
export const RICH_TEXT = 'rich-text';
