/**
 * Which type role to use, and which to use instead.
 *
 * The single source of truth for picking a role, a text colour or a surface.
 * The style guide at /design renders these tables, and AGENTS.md points here,
 * so a change to the guidance is a one-place edit. The role specs themselves
 * (size, weight, colour) live in styles/tailwind.css and the colour values in
 * app/global.css; nothing here restates them.
 */
import * as typography from './typography';

/**
 * How /design draws a role's example. Most roles are plain text in the role;
 * the link helpers, HIGHLIGHT, SHIMMER and FIELD need markup around them.
 */
export type ExampleKind =
  | 'text'
  /** Plain text in the role, drawn as a link because it's clickable on the site. */
  | 'link'
  | 'inline-link'
  | 'heading-link'
  | 'subtle-link'
  | 'highlight'
  | 'shimmer'
  | 'field';

type Typography = typeof typography;

/** A class-name constant exported by components/styles/typography.ts. */
export type RoleName = {
  [K in keyof Typography]: Typography[K] extends string ? K : never;
}[keyof Typography];

/** The class behind a role's name, so a guide entry can't name one role and draw another. */
export const roleClass = (name: RoleName): string => typography[name];

export type RoleGuide = {
  /** The constant to import from components/styles/typography.ts. */
  name: RoleName;
  example: string;
  exampleKind?: ExampleKind;
  useFor: string;
  /** The nearest wrong job, and the role that does that job instead. */
  notFor?: { job: string; instead: string };
};

export type RoleGroup = { title: string; intro?: string; roles: RoleGuide[] };

export const ROLE_GROUPS: RoleGroup[] = [
  {
    title: 'Headings',
    intro:
      'Only the page title is orange. Every other heading is ink, whatever its tag.',
    roles: [
      {
        name: 'PAGE_TITLE',
        example: 'Meet TinaCMS',
        useFor: 'The page’s one h1.',
        notFor: { job: 'Any heading below the top', instead: 'SECTION_TITLE' },
      },
      {
        name: 'ARTICLE_TITLE',
        example: 'Tipping the iceberg',
        useFor:
          'The h1 on blog posts and legal pages, whose titles run long, and a page title in a narrow card, like /meetings.',
        notFor: { job: 'Landing and block pages', instead: 'PAGE_TITLE' },
      },
      {
        name: 'SECTION_TITLE',
        example: 'Built for developers',
        useFor: 'The heading that opens a band of the page.',
        notFor: { job: 'Headings inside cards', instead: 'CARD_TITLE' },
      },
      {
        name: 'CARD_TITLE',
        example: 'Visual editing',
        useFor: 'Card, tier and tile headings; prices; markdown h1–h2.',
        notFor: { job: 'Names in a grid', instead: 'SUB_HEADING' },
      },
      {
        name: 'SUB_HEADING',
        example: 'Editorial workflow',
        useFor:
          'Headings inside copy; names in grids and chooser cards; markdown h3–h6.',
        notFor: { job: 'A short label above a title', instead: 'EYEBROW' },
      },
      {
        name: 'QUOTE',
        example: '“Tina changed how we do docs”',
        useFor: 'Testimonials and pull quotes.',
        notFor: { job: 'The attribution under a quote', instead: 'BODY_MUTED' },
      },
    ],
  },
  {
    title: 'Labels',
    roles: [
      {
        name: 'EYEBROW',
        example: 'Trusted by teams',
        useFor:
          'SLUB: a short label above a title, table headers, pills, step labels. Write the copy in sentence case; the role uppercases it. The current step (aria-current="step") reads in ink.',
        notFor: {
          job: 'Names, sentences, prices, addresses',
          instead: 'LABEL',
        },
      },
      {
        name: 'LABEL',
        example: 'Included users',
        useFor: 'Chips, tags, status pills, table values, times.',
        notFor: { job: 'Anything longer than a phrase', instead: 'BODY_SMALL' },
      },
    ],
  },
  {
    title: 'Reading text',
    intro: 'HIGHLIGHT goes on top of a role and keeps its size.',
    roles: [
      {
        name: 'BODY',
        example: 'Edit Markdown visually, right in your repo.',
        useFor: 'Paragraphs. A bare <p> inside <main> already gets it.',
        notFor: { job: 'Card blurbs and lists', instead: 'BODY_SMALL' },
      },
      {
        name: 'BODY_SMALL',
        example: 'Drafts, branches and approvals.',
        useFor: 'Dense copy: card blurbs, lists, descriptions.',
        notFor: { job: 'A page’s main paragraphs', instead: 'BODY' },
      },
      {
        name: 'BODY_MUTED',
        example: '23 Oct 2026 · By Josh Berman',
        useFor: 'Dates, bylines, captions, units, hints.',
        notFor: {
          job: 'Anything clickable or that carries meaning',
          instead: 'BODY_SMALL',
        },
      },
      {
        name: 'CAPTION',
        example: '$290 billed annually',
        useFor: 'Notes that sit tight under content: billing notes, addresses.',
        notFor: { job: 'Dates and bylines', instead: 'BODY_MUTED' },
      },
      {
        name: 'CODE',
        example: 'npx create-tina-app',
        useFor: 'Inline code, terminal output, package names, versions.',
        notFor: {
          job: 'Decorative terminal mockups',
          instead: 'CODE_ILLUSTRATION',
        },
      },
      {
        name: 'HIGHLIGHT',
        example: 'Markdown',
        exampleKind: 'highlight',
        useFor: 'A matched search term, inside any role.',
        notFor: { job: 'Emphasis in copy', instead: '<strong>' },
      },
    ],
  },
  {
    title: 'Links',
    intro:
      'LINK, TITLE_LINK and SUBTLE_LINK go on top of a role and keep its size, e.g. BODY_SMALL + LINK.',
    roles: [
      {
        name: 'LINK',
        example: 'GitHub Discussion',
        exampleKind: 'inline-link',
        useFor: 'A link inside text.',
        notFor: {
          job: 'A standalone “Read more” link',
          instead: 'EYEBROW_LINK',
        },
      },
      {
        name: 'EYEBROW_LINK',
        example: 'Read more →',
        exampleKind: 'link',
        useFor: 'A standalone link: “Read more →”, “See all events →”.',
        notFor: { job: 'A link inside a sentence', instead: 'LINK' },
      },
      {
        name: 'TITLE_LINK',
        example: 'Tipping the iceberg',
        exampleKind: 'heading-link',
        useFor:
          'A heading that is a link, like a post title in a list. Ink, link blue on hover.',
        notFor: { job: 'A link inside text', instead: 'LINK' },
      },
      {
        name: 'SUBTLE_LINK',
        example: 'Star us on GitHub',
        exampleKind: 'subtle-link',
        useFor:
          'A quiet standalone link, like the top banner. Darkens on hover.',
        notFor: {
          job: 'A link that should stand out',
          instead: 'EYEBROW_LINK',
        },
      },
    ],
  },
  {
    title: 'Navigation and forms',
    intro:
      'FOOTER_LINK and FOOTER_LEGAL_LINK sit inside ON_DARK on the site, where they turn white.',
    roles: [
      {
        name: 'NAV_LINK',
        example: 'TinaCMS',
        exampleKind: 'link',
        useFor: 'Top-level nav items.',
        notFor: { job: 'Items inside a nav menu', instead: 'NAV_MENU_LINK' },
      },
      {
        name: 'NAV_MENU_LINK',
        example: 'Docs for TinaCMS',
        exampleKind: 'link',
        useFor: 'Items inside a nav menu.',
        notFor: { job: 'Top-level nav items', instead: 'NAV_LINK' },
      },
      {
        name: 'FIELD',
        example: 'name@example.com',
        exampleKind: 'field',
        useFor:
          'Inputs, selects and text areas. 16px, so phones don’t zoom in.',
        notFor: { job: 'The label above a field', instead: 'LABEL' },
      },
      {
        name: 'FOOTER_LINK',
        example: 'Showcase',
        exampleKind: 'link',
        useFor: 'Footer column links.',
        notFor: {
          job: 'Legal links under the footer',
          instead: 'FOOTER_LEGAL_LINK',
        },
      },
      {
        name: 'FOOTER_LEGAL_LINK',
        example: 'Privacy',
        exampleKind: 'link',
        useFor: 'The legal links under the footer.',
        notFor: { job: 'Footer column links', instead: 'FOOTER_LINK' },
      },
    ],
  },
  {
    title: 'Single-use roles',
    intro:
      'Each one has a single job. Use the everyday role for anything else.',
    roles: [
      {
        name: 'CARD_TITLE_FEATURED',
        example: 'Business · $299',
        useFor: 'The recommended pricing plan’s name and price.',
        notFor: { job: 'Any other card title or price', instead: 'CARD_TITLE' },
      },
      {
        name: 'CODE_ILLUSTRATION',
        example: '$ npx create-tina-app my-blog',
        useFor:
          'Decorative terminal and code mockups, like the homepage terminal.',
        notFor: { job: 'Code people read or copy', instead: 'CODE' },
      },
      {
        name: 'SHIMMER',
        example: 'What’s new in v4',
        exampleKind: 'shimmer',
        useFor:
          'Short promo text in the homepage news banner. It goes on top of a role.',
        notFor: { job: 'Body copy and headings', instead: 'their usual role' },
      },
    ],
  },
];

/** The rules, phrased as what to do. */
export const TYPE_RULES = [
  'Give text one role, and add only layout classes beside it: margin, padding, alignment, width, truncation.',
  'Fonts, sizes, weights and colours come with the role. IBM Plex Sans ships 500 and 600 only, so headings have no bold.',
  'On a dark or orange container, put ON_DARK on the container. The roles inside turn white.',
  'On a chip, pill or coloured row, put a SURFACE on it. The role inside takes the paired colour.',
  'Wrap markdown in RICH_TEXT. It maps headings, paragraphs, links and code onto the roles.',
  'If no role fits, add one to styles/tailwind.css, typography.ts and typography.guide.ts, then use it.',
];

/** Agreed exceptions: hand-set type here is expected, not a bug. */
export const TYPE_EXCEPTIONS = [
  'Buttons (issue #4964).',
  'Syntax-highlighting colours in code blocks and the homepage terminal.',
  'Data-driven brand colours, like partner tier badges.',
  'Icons, social icons and logos.',
  'The two-tone homepage headings, until the team decides.',
  'TinaCMS admin field components, which render inside the editor.',
];

/** Text colour tokens, for reference when adding a role. Values live in app/global.css. */
export const TEXT_COLOURS: {
  token: string;
  /** A bg-* class that fills a swatch with the token. */
  swatch: string;
  usedBy: RoleName[];
  useFor: string;
}[] = [
  {
    token: '--text-heading-*',
    swatch: 'bg-heading',
    usedBy: ['PAGE_TITLE', 'ARTICLE_TITLE', 'CARD_TITLE_FEATURED'],
    useFor:
      'The orange gradient. Page titles, plus the recommended pricing plan as the one agreed exception.',
  },
  {
    token: '--text-strong',
    swatch: 'bg-strong',
    usedBy: [
      'SECTION_TITLE',
      'CARD_TITLE',
      'SUB_HEADING',
      'QUOTE',
      'LABEL',
      'CODE',
      'CODE_ILLUSTRATION',
      'FIELD',
      'FOOTER_LINK',
    ],
    useFor: 'Every other heading and short UI text.',
  },
  {
    token: '--text-body',
    swatch: 'bg-body',
    usedBy: ['BODY', 'BODY_SMALL', 'CAPTION', 'NAV_MENU_LINK'],
    useFor: 'Reading text. The site default.',
  },
  {
    token: '--text-subtle',
    swatch: 'bg-subtle',
    usedBy: ['BODY_MUTED'],
    useFor: 'Supporting text: dates, bylines, hints.',
  },
  {
    token: '--text-label',
    swatch: 'bg-label',
    usedBy: ['EYEBROW', 'FOOTER_LEGAL_LINK', 'FIELD'],
    useFor:
      'SLUB, field placeholders and legal links. The same grey as subtle on light; white at 75% on dark.',
  },
  {
    token: '--text-link',
    swatch: 'bg-link',
    usedBy: ['LINK', 'EYEBROW_LINK', 'NAV_LINK', 'TITLE_LINK'],
    useFor: 'Links. TITLE_LINK only turns this colour on hover.',
  },
];

/** The SURFACE pairs: a fill and the ink that belongs on it. */
export const SURFACE_GUIDE: {
  name: keyof Typography['SURFACE'];
  example: string;
  /** The role the example text takes. */
  role: RoleName;
  useFor: string;
}[] = [
  {
    name: 'neutral',
    example: 'Next.js',
    role: 'LABEL',
    useFor: 'Tags, commit hashes, inline code.',
  },
  {
    name: 'brand',
    example: '@dependabot',
    role: 'LABEL',
    useFor: 'Contributors, breaks, “Closed”, “Required”.',
  },
  {
    name: 'info',
    example: 'Talk',
    role: 'LABEL',
    useFor: 'Talks, event countdowns, “Experimental”, table header rows.',
  },
  {
    name: 'success',
    example: 'Open',
    role: 'LABEL',
    useFor: '“Open”, form success messages.',
  },
  {
    name: 'warning',
    example: 'English only',
    role: 'LABEL',
    useFor: 'Warnings, like the “English only” alert and form warnings.',
  },
  {
    name: 'error',
    example: 'Please try again',
    role: 'LABEL',
    useFor: 'Form errors, through StatusMessage.',
  },
  {
    name: 'neutralSolid',
    example: 'Event Finished',
    role: 'LABEL',
    useFor: 'Finished events, step numbers.',
  },
  {
    name: 'brandSolid',
    example: 'Featured',
    role: 'EYEBROW',
    useFor: '“Featured”, “new”.',
  },
];
