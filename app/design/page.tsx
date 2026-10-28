import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
  ARTICLE_TITLE,
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CAPTION,
  CARD_TITLE,
  CARD_TITLE_FEATURED,
  CODE,
  CODE_ILLUSTRATION,
  EYEBROW,
  EYEBROW_LINK,
  FIELD,
  FOOTER_LEGAL_LINK,
  FOOTER_LINK,
  HIGHLIGHT,
  LABEL,
  LINK,
  NAV_LINK,
  NAV_MENU_LINK,
  ON_DARK,
  PAGE_TITLE,
  QUOTE,
  RICH_TEXT,
  SECTION_TITLE,
  SHIMMER,
  SUB_HEADING,
  SUBTLE_LINK,
  SURFACE,
  TITLE_LINK,
} from '@/component/styles/typography';

export const metadata: Metadata = {
  title: 'Tina.io Style Guide | TinaCMS',
  description:
    'Every text style and colour on tina.io, when to use it, and the tokens behind it.',
  robots: { index: false, follow: false },
};

/**
 * The tina.io style guide, served at /design and kept out of the index.
 *
 * Laid out like the SSW Figma style guide: one page, one section per
 * foundation (Typography, Colour; Buttons later), each with spec lines,
 * dividers and live specimens. Every specimen renders through the same
 * constants the site uses, so the page can't drift from the code. The page
 * follows its own rules: roles only, no hand-set type.
 */

// ── Spec lines ────────────────────────────────────────────────────────────

/** "Font size: 60px / 3.75rem" from a pixel size. */
const size = (px: number) => `${px}px / ${px / 16}rem`;

type HeadingRow = {
  name: string;
  cls: string;
  desktop: number;
  /** A middle step from 768px, when the role has one. */
  tablet?: number;
  mobile: number;
  lineHeight: string;
  face: string;
  use: string;
  never?: string;
  sample: string;
};

const HEADINGS: HeadingRow[] = [
  {
    name: 'PAGE_TITLE',
    cls: PAGE_TITLE,
    desktop: 60,
    tablet: 48,
    mobile: 36,
    lineHeight: '125%',
    face: 'IBM Plex Sans 600 · tracking tight · orange gradient, lit from above',
    use: 'The page’s one h1.',
    never: 'Twice on a page, or anywhere below the top.',
    sample: 'Meet TinaCMS',
  },
  {
    name: 'ARTICLE_TITLE',
    cls: ARTICLE_TITLE,
    desktop: 48,
    mobile: 36,
    lineHeight: '125%',
    face: 'IBM Plex Sans 600 · tracking tight · orange gradient, lit from above',
    use: 'The page title on blog posts and legal pages, whose titles run long.',
    sample: 'Tipping the iceberg: the WordPress era is over',
  },
  {
    name: 'SECTION_TITLE',
    cls: SECTION_TITLE,
    desktop: 48,
    tablet: 36,
    mobile: 30,
    lineHeight: '125%',
    face: 'IBM Plex Sans 600 · tracking tight · ink',
    use: 'Opens a band of the page.',
    sample: 'Built for marketers and developers',
  },
  {
    name: 'CARD_TITLE',
    cls: CARD_TITLE,
    desktop: 30,
    tablet: 24,
    mobile: 20,
    lineHeight: '137.5%',
    face: 'IBM Plex Sans 600 · ink',
    use: 'Headings in cards, tiers and tiles; prices; h1–h2 in rich text.',
    sample: 'Visual editing',
  },
  {
    name: 'SUB_HEADING',
    cls: SUB_HEADING,
    desktop: 20,
    mobile: 18,
    lineHeight: '137.5%',
    face: 'IBM Plex Sans 600 · ink',
    use: 'Headings inside copy; names in grids and chooser cards; h3–h6 in rich text.',
    sample: 'Editorial workflow',
  },
  {
    name: 'QUOTE',
    cls: QUOTE,
    desktop: 30,
    mobile: 24,
    lineHeight: '137.5%',
    face: 'IBM Plex Sans 500 · ink · no italics',
    use: 'Testimonials and pull quotes. Attribution underneath is BODY_MUTED.',
    sample: '“Tina is transforming the way we do docs at Unity”',
  },
  {
    name: 'EYEBROW (SLUB)',
    cls: EYEBROW,
    desktop: 14,
    mobile: 14,
    lineHeight: '150%',
    face: 'IBM Plex Sans 500 · uppercase · tracking widest · label grey',
    use: 'The label above a title, table column headers, pills, step labels.',
    never:
      'Names, sentences, prices or addresses. Uppercase it in CSS, not in the copy.',
    sample: 'Trusted by teams shipping at scale',
  },
];

type TextRole = {
  name: string;
  /** e.g. "14px / 0.875rem → 16px / 1rem from 768px" */
  fontSize: string;
  lineHeight: string;
  face: string;
  use: string;
  never?: string;
  sample: ReactNode;
};

const READING: TextRole[] = [
  {
    name: 'BODY',
    fontSize: `${size(16)} → ${size(18)} from 768px`,
    lineHeight: '162.5%',
    face: 'Inter 400 · body ink',
    use: 'Every paragraph someone is meant to read. A bare <p> inside <main> already looks like this.',
    sample: (
      <p className={BODY}>
        Store content as Markdown or MDX in your repo, and edit it visually
        without leaving the page.
      </p>
    ),
  },
  {
    name: 'BODY_SMALL',
    fontSize: `${size(14)} → ${size(16)} from 768px`,
    lineHeight: '162.5%',
    face: 'Inter 400 · body ink',
    use: 'Dense copy: card blurbs, lists, descriptions, checklist items.',
    sample: (
      <p className={BODY_SMALL}>
        Drafts, branches and approvals, backed by your Git provider.
      </p>
    ),
  },
  {
    name: 'BODY_MUTED',
    fontSize: `${size(14)} → ${size(16)} from 768px`,
    lineHeight: '162.5%',
    face: 'Inter 400 · subtle grey',
    use: 'Dates, bylines, captions, units, hints, attributions.',
    never: 'A paragraph that carries meaning, or anything you can click.',
    sample: <p className={BODY_MUTED}>23 Oct 2026 · By Josh Berman</p>,
  },
  {
    name: 'CAPTION',
    fontSize: `${size(14)} at every width`,
    lineHeight: '20px',
    face: 'Inter 400 · body ink',
    use: 'Small text that sits tight under other content: billing notes, address lines.',
    sample: <p className={CAPTION}>$290 billed annually (save $58)</p>,
  },
  {
    name: 'CODE',
    fontSize: `${size(14)} → ${size(16)} from 768px`,
    lineHeight: '162.5%',
    face: 'IBM Plex Mono 400 · ink',
    use: 'Inline code, terminal output, package names, versions, commit hashes.',
    sample: <p className={CODE}>npx create-tina-app@latest</p>,
  },
];

const LABELS_AND_LINKS: TextRole[] = [
  {
    name: 'LABEL',
    fontSize: `${size(14)} at every width`,
    lineHeight: '20px',
    face: 'Inter 500 · ink',
    use: 'Chips, tags, status pills, table row labels and values, times, “Page 1 of 15”.',
    never: 'Paragraphs or anything longer than a phrase.',
    sample: <p className={LABEL}>Included users</p>,
  },
  {
    name: 'EYEBROW_LINK',
    fontSize: `${size(14)} at every width`,
    lineHeight: '150%',
    face: 'IBM Plex Sans 500 · uppercase · link blue · underlined',
    use: 'Standalone links: “Read more →”, “See all events →”.',
    sample: (
      <a className={EYEBROW_LINK} href="#labels-and-links">
        Read more →
      </a>
    ),
  },
  {
    name: 'LINK',
    fontSize: 'Keeps the size of the role around it',
    lineHeight: 'From the role around it',
    face: 'Link blue · underlined · darker on hover',
    use: 'A link inside text, combined with its role: BODY_SMALL + LINK.',
    sample: (
      <p className={BODY_SMALL}>
        Questions? Start a{' '}
        <a className={LINK} href="#labels-and-links">
          GitHub Discussion
        </a>
        .
      </p>
    ),
  },
  {
    name: 'TITLE_LINK',
    fontSize: 'Keeps the size of the heading',
    lineHeight: 'From the heading',
    face: 'Ink · link blue on hover',
    use: 'A heading that is a link, like a post title in a list: CARD_TITLE + TITLE_LINK.',
    sample: (
      <a className="inline-block" href="#labels-and-links">
        <span className={`${CARD_TITLE} ${TITLE_LINK}`}>
          Tipping the iceberg
        </span>
      </a>
    ),
  },
  {
    name: 'SUBTLE_LINK',
    fontSize: 'Keeps the size of the role around it',
    lineHeight: 'From the role around it',
    face: 'Role colour · no underline · ink on hover',
    use: 'A standalone link that should stay quiet, like the GitHub stars line in the top banner.',
    sample: (
      <a
        className={`${BODY_SMALL} ${SUBTLE_LINK} inline-block`}
        href="#labels-and-links"
      >
        Loving Tina? Star us on GitHub 13.8k
      </a>
    ),
  },
  {
    name: 'HIGHLIGHT',
    fontSize: 'Keeps the size of the role around it',
    lineHeight: 'From the role around it',
    face: 'Brand tint · bold',
    use: 'A matched search term, inside any role.',
    sample: (
      <p className={BODY_SMALL}>
        The best <span className={HIGHLIGHT}>Markdown</span> CMS.
      </p>
    ),
  },
];

const NAV_AND_FORMS: TextRole[] = [
  {
    name: 'NAV_LINK',
    fontSize: `${size(18)} in the menu → ${size(16)} from 1280px`,
    lineHeight: '150%',
    face: 'Inter 500 · link blue',
    use: 'Top-level nav items.',
    sample: <span className={NAV_LINK}>TinaCMS</span>,
  },
  {
    name: 'NAV_MENU_LINK',
    fontSize: `${size(18)} in the menu → ${size(16)} from 1280px`,
    lineHeight: '150%',
    face: 'Inter 500 · body ink · link blue on hover',
    use: 'Items inside a nav menu.',
    sample: <span className={NAV_MENU_LINK}>Docs for TinaCMS</span>,
  },
  {
    name: 'FIELD',
    fontSize: `${size(16)} at every width`,
    lineHeight: '150%',
    face: 'Inter 400 · ink · placeholder in the label grey',
    use: 'Inputs, selects and text areas. 16px stops phones zooming in.',
    sample: (
      <input
        className={`${FIELD} h-10 w-full rounded-md border border-neutral-border-subtle px-3`}
        placeholder="name@example.com"
        aria-label="Email (example)"
      />
    ),
  },
  {
    name: 'FOOTER_LINK',
    fontSize: `${size(16)} at every width`,
    lineHeight: '150%',
    face: 'IBM Plex Sans 600 · uppercase · tracking wide',
    use: 'Footer column links. Use inside ON_DARK, where it turns white.',
    sample: <span className={FOOTER_LINK}>Showcase</span>,
  },
  {
    name: 'FOOTER_LEGAL_LINK',
    fontSize: `${size(16)} at every width`,
    lineHeight: '150%',
    face: 'Inter 400 · label grey · ink on hover',
    use: 'The small legal links under the footer. Use inside ON_DARK, where it turns white at 75%.',
    sample: <span className={FOOTER_LEGAL_LINK}>Privacy</span>,
  },
];

// Roles that exist for one job each. They're shown so people recognise
// them, not so they get reused elsewhere.
const EXCEPTION_ROLES: TextRole[] = [
  {
    name: 'CARD_TITLE_FEATURED',
    fontSize: `${size(20)} → ${size(24)} → ${size(30)}`,
    lineHeight: '137.5%',
    face: 'CARD_TITLE in the orange gradient',
    use: 'The recommended pricing plan’s name and price.',
    never: 'Any other card title or price. Every other card title is ink.',
    sample: <p className={CARD_TITLE_FEATURED}>Business · $299</p>,
  },
  {
    name: 'CODE_ILLUSTRATION',
    fontSize: `${size(13)} at every width`,
    lineHeight: '162.5%',
    face: 'IBM Plex Mono 400 · ink',
    use: 'Decorative terminal and code mockups, like the homepage terminal.',
    never: 'Code a reader needs to read or copy. That’s CODE.',
    sample: (
      <p className={CODE_ILLUSTRATION}>$ npx create-tina-app@latest my-blog</p>
    ),
  },
  {
    name: 'SHIMMER',
    fontSize: 'Keeps the size of the role around it',
    lineHeight: 'From the role around it',
    face: 'A light sweep · colours from the surface',
    use: 'Short promo text in the homepage news banner.',
    never: 'Body copy, headings, or with a text colour added.',
    sample: (
      <span
        className={`${SURFACE.info} ${LABEL} inline-flex rounded-full border px-3.5 py-1.5`}
      >
        <span className={SHIMMER}>What we’re planning for v4</span>
      </span>
    ),
  },
];

// ── Typefaces ─────────────────────────────────────────────────────────────

type Typeface = {
  job: string;
  family: string;
  /** Roles for the family name and the glyph samples, so both show the real
   *  face at a size it's used at. Inter never runs larger than BODY. */
  name: string;
  glyphs: string;
  weights: { label: string; cls: string; sample: string; roles: string }[];
};

const TYPEFACES: Typeface[] = [
  {
    job: 'Headings and labels',
    family: 'IBM Plex Sans',
    name: CARD_TITLE,
    glyphs: SUB_HEADING,
    weights: [
      {
        label: '600 SemiBold',
        cls: SUB_HEADING,
        sample: 'Headings',
        roles: 'PAGE_TITLE → SUB_HEADING, FOOTER_LINK',
      },
      {
        label: '500 Medium',
        cls: EYEBROW,
        sample: 'Labels',
        roles: 'QUOTE, EYEBROW, EYEBROW_LINK',
      },
    ],
  },
  {
    job: 'Reading text and UI',
    family: 'Inter',
    name: BODY,
    glyphs: BODY,
    weights: [
      {
        label: '400 Regular',
        cls: BODY_SMALL,
        sample: 'Paragraphs and fields',
        roles: 'BODY, BODY_SMALL, BODY_MUTED, CAPTION, FIELD',
      },
      {
        label: '500 Medium',
        cls: LABEL,
        sample: 'Labels and nav',
        roles: 'LABEL, NAV_LINK, NAV_MENU_LINK',
      },
    ],
  },
  {
    job: 'Code',
    family: 'IBM Plex Mono',
    name: CODE,
    glyphs: CODE,
    weights: [
      {
        label: '400 Regular',
        cls: CODE,
        sample: 'npm run dev',
        roles: 'CODE, CODE_ILLUSTRATION',
      },
    ],
  },
];

// ── Colour ────────────────────────────────────────────────────────────────

const SURFACES = [
  {
    name: 'SURFACE.neutral',
    cls: SURFACE.neutral,
    text: 'Next.js',
    role: LABEL,
    ratio: '15.4:1',
    use: 'Tags, commit hashes, inline code',
  },
  {
    name: 'SURFACE.brand',
    cls: SURFACE.brand,
    text: '@dependabot',
    role: LABEL,
    ratio: '6.1:1',
    use: 'Contributors, breaks, “Closed”',
  },
  {
    name: 'SURFACE.info',
    cls: SURFACE.info,
    text: 'Talk',
    role: LABEL,
    ratio: '7.6:1',
    use: 'Talks, table header rows',
  },
  {
    name: 'SURFACE.success',
    cls: SURFACE.success,
    text: 'Open',
    role: LABEL,
    ratio: '9.0:1',
    use: '“Open”, success',
  },
  {
    name: 'SURFACE.warning',
    cls: SURFACE.warning,
    text: 'English only',
    role: LABEL,
    ratio: '6.4:1',
    use: 'Warnings',
  },
  {
    name: 'SURFACE.neutralSolid',
    cls: SURFACE.neutralSolid,
    text: 'Event Finished',
    role: LABEL,
    ratio: '4.8:1',
    use: 'Finished events, step numbers',
  },
  {
    name: 'SURFACE.brandSolid',
    cls: SURFACE.brandSolid,
    text: 'Featured',
    role: EYEBROW,
    ratio: '4.7:1',
    use: '“Featured”, “new”',
  },
];

// Each row is one chain through the layers. Components only ever name the
// right-hand side; the primitive shows what a token resolves to.
const COLOURS = [
  {
    swatch: 'bg-heading',
    primitive: '--orange-400 → 500 → 700',
    token: '--text-heading-highlight / -start / -end',
    ratio: '2.9 (highlight) · 3.8 → 6.1:1',
    use: 'Page titles, lit from above: each line runs light to deep. Large text only (36px and up), plus the recommended plan.',
  },
  {
    swatch: 'bg-strong',
    primitive: '--ink-900',
    token: '--text-strong',
    ratio: '16.9:1',
    use: 'Headings, labels, code.',
  },
  {
    swatch: 'bg-body',
    primitive: '--slate-700',
    token: '--text-body',
    ratio: '10.4:1',
    use: 'Paragraphs, captions. The site default.',
  },
  {
    swatch: 'bg-subtle',
    primitive: '--slate-500',
    token: '--text-subtle / --text-label',
    ratio: '4.8:1',
    use: 'Muted text and SLUB.',
  },
  {
    swatch: 'bg-link',
    primitive: '--blue-700 → 800',
    token: '--text-link / -hover',
    ratio: '6.3 → 9.0:1',
    use: 'Links and top-level nav.',
  },
];

// ── How to use ────────────────────────────────────────────────────────────

const RULES = [
  'Pick a role and use nothing else for type. Never add a size, weight, font, line-height, letter-spacing, case or text-colour class next to one.',
  'Layout classes are fine: margin, padding, alignment, width, truncation.',
  'LINK, TITLE_LINK and SUBTLE_LINK are the only classes that combine with a role. LINK adds colour and underline and keeps the size around it; TITLE_LINK turns a linked heading link blue on hover; SUBTLE_LINK keeps a quiet standalone link in its own colour and darkens it on hover.',
  'On a dark or orange container, put ON_DARK on the container and use the normal roles inside. Never write text-white.',
  'On a chip, pill, badge or coloured row, put a SURFACE on it and give the text a role. Never colour text on a fill by hand.',
  'Markdown output goes in a RICH_TEXT wrapper; it maps headings, paragraphs, links and code onto the roles.',
  'Nothing fits? Add a role to styles/tailwind.css and typography.ts, show it here, and use it.',
];

const EXCEPTIONS = [
  'Buttons (issue #4964).',
  'Syntax-highlighting colours in code blocks and the homepage terminal.',
  'Data-driven brand colours, like partner tier badges.',
  'Icons sized or coloured with text classes, social icons, logos.',
  'Two-tone homepage headings, until the team decides.',
  'TinaCMS admin field components, which render inside the editor.',
];

// ── Building blocks ───────────────────────────────────────────────────────

/** One Figma-style section: a white panel with a big title. */
const Section = ({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className="scroll-mt-24 rounded-2xl border border-neutral-border-subtle bg-white p-6 md:p-10 lg:p-16"
  >
    <h2 className={SECTION_TITLE}>{title}</h2>
    <p className={`${BODY} mt-4 max-w-3xl`}>{intro}</p>
    <div className="mt-12 grid gap-20 lg:mt-16 lg:gap-32">{children}</div>
  </section>
);

/** A block inside a section, like "Headings" or "Surfaces". */
const Block = ({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) => (
  <div id={id} className="grid min-w-0 scroll-mt-24 gap-8">
    <div>
      <h3 className={CARD_TITLE}>{title}</h3>
      {intro && <p className={`${BODY_SMALL} mt-2 max-w-3xl`}>{intro}</p>}
    </div>
    {children}
  </div>
);

/** Figma's spec line: small text with a divider underneath. */
const SpecLine = ({ children }: { children: ReactNode }) => (
  <p className={`${BODY_SMALL} border-b border-neutral-border-subtle pb-2`}>
    {children}
  </p>
);

/** The role name, what it's for, and where it never goes. */
const RoleNotes = ({
  name,
  face,
  use,
  never,
}: {
  name: string;
  face: string;
  use: string;
  never?: string;
}) => (
  <div className="grid gap-1">
    <p className={CODE}>{name}</p>
    <p className={BODY_MUTED}>{face}</p>
    <p className={BODY_SMALL}>{use}</p>
    {never && (
      <p className={BODY_SMALL}>
        <span className={LABEL}>Never: </span>
        {never}
      </p>
    )}
  </div>
);

/** Figma's text grid: a column per role, spec header, divider, sample. */
const RoleGrid = ({ roles }: { roles: TextRole[] }) => (
  <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
    {roles.map((role) => (
      <div key={role.name} className="grid min-w-0 content-start gap-6">
        <div className="border-b border-neutral-border-subtle pb-2">
          <p className={BODY_SMALL}>Font size: {role.fontSize}</p>
          <p className={BODY_SMALL}>Line height: {role.lineHeight}</p>
        </div>
        <div className="min-w-0 wrap-anywhere">{role.sample}</div>
        <RoleNotes
          name={role.name}
          face={role.face}
          use={role.use}
          never={role.never}
        />
      </div>
    ))}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────

export default function StyleGuidePage() {
  return (
    // The site layout already provides <main>.
    <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-6 lg:gap-16 lg:px-8">
      <header>
        <p className={EYEBROW}>tina.io · internal reference</p>
        <h1 className={`${PAGE_TITLE} mt-3`}>Tina.io Style Guide</h1>
        <p className={`${BODY} mt-5 max-w-3xl`}>
          The foundations every page on tina.io is built from. Each specimen
          below renders through the same code the site uses, so what you see
          here is what ships.
        </p>
        <nav aria-label="Style guide sections" className="mt-6 flex gap-8">
          <a className={EYEBROW_LINK} href="#typography">
            Typography
          </a>
          <a className={EYEBROW_LINK} href="#colour">
            Colour
          </a>
        </nav>
      </header>

      <Section
        id="typography"
        title="Typography"
        intro="Every piece of text uses one of these roles. A role carries its full spec (font, size at every width, weight, line height, spacing, case and colour), so a component only adds layout."
      >
        <Block
          title="Typefaces"
          intro="Three families, and only the weights listed here ship. IBM Plex Sans has no bold, so never ask a heading for one."
        >
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {TYPEFACES.map((face) => (
              <div
                key={face.family}
                className="grid min-w-0 content-start gap-6"
              >
                <div className="border-b border-neutral-border-subtle pb-4">
                  <p className={BODY_MUTED}>{face.job}</p>
                  <p className={`${face.name} mt-1`}>{face.family}</p>
                </div>
                <div className={`${face.glyphs} wrap-anywhere`}>
                  <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                  <p>abcdefghijklmnopqrstuvwxyz</p>
                  <p>1234567890!@#$%^&amp;*()</p>
                </div>
                <div className="grid gap-4">
                  {face.weights.map((w) => (
                    <div key={w.label} className="grid gap-1">
                      <p className={LABEL}>{w.label}</p>
                      <p className={w.cls}>{w.sample}</p>
                      <p className={BODY_MUTED}>{w.roles}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block
          title="Headings"
          intro="Sizes step up with the screen. Each row shows the desktop and mobile spec side by side; the specimen under it is live, so narrow the window to see the mobile size."
        >
          <div className="grid gap-8">
            <div className="hidden gap-16 md:grid md:grid-cols-2">
              <p className={SUB_HEADING}>Desktop</p>
              <p className={SUB_HEADING}>Mobile</p>
            </div>
            <div className="grid gap-16">
              {HEADINGS.map((h) => (
                <div key={h.name} className="grid min-w-0 gap-6">
                  <div className="grid gap-4 md:grid-cols-2 md:gap-16">
                    <SpecLine>
                      <span className="md:hidden">Desktop · </span>
                      Font size: {size(h.desktop)}
                      {h.tablet && ` (${h.tablet}px from 768px)`} | Line height:{' '}
                      {h.lineHeight}
                    </SpecLine>
                    <SpecLine>
                      <span className="md:hidden">Mobile · </span>
                      Font size: {size(h.mobile)} | Line height: {h.lineHeight}
                    </SpecLine>
                  </div>
                  <p className={`${h.cls} wrap-anywhere`}>{h.sample}</p>
                  <RoleNotes
                    name={h.name}
                    face={h.face}
                    use={h.use}
                    never={h.never}
                  />
                </div>
              ))}
            </div>
          </div>
        </Block>

        <Block
          title="Reading text"
          intro="Inter. One reading size, one step smaller for dense copy, and a muted grey for supporting text only."
        >
          <RoleGrid roles={READING} />
        </Block>

        <Block
          id="labels-and-links"
          title="Labels and links"
          intro="Short text that names or tags something, and the link styles. LINK, TITLE_LINK, SUBTLE_LINK and HIGHLIGHT combine with a role and keep its size."
        >
          <RoleGrid roles={LABELS_AND_LINKS} />
        </Block>

        <Block
          title="Navigation and forms"
          intro="The nav switches to its slide-out menu below 1280px, where items are a step larger for tapping. Footer roles are shown on white here; on the site they sit inside ON_DARK."
        >
          <RoleGrid roles={NAV_AND_FORMS} />
        </Block>

        <Block
          title="Rich text"
          intro="Markdown goes inside RICH_TEXT: h1–h2 become CARD_TITLE, h3–h6 SUB_HEADING, paragraphs BODY, links LINK, inline code CODE, table headers EYEBROW."
        >
          <div
            className={`${RICH_TEXT} grid gap-4 rounded-xl border border-neutral-border-subtle p-6`}
          >
            <h2>Simple fields and compound fields</h2>
            <p>
              Simple fields hold <a href="#typography">one value</a>, like a
              string. Compound fields such as <code>group</code> hold others.
            </p>
            <h3>Group lists</h3>
            <p>A group list is a list of groups with the same fields.</p>
          </div>
        </Block>

        <Block
          title="Agreed exceptions"
          intro="Three roles exist for one job each. They’re shown so you recognise them, not so you reuse them."
        >
          <RoleGrid roles={EXCEPTION_ROLES} />
          <div className="grid gap-2">
            <p className={LABEL}>Everything else outside the roles</p>
            <ul className="grid list-disc gap-2 pl-6">
              {EXCEPTIONS.map((e) => (
                <li key={e} className={BODY_SMALL}>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Block>

        <Block title="How to use">
          <ol className="grid max-w-4xl list-decimal gap-3 pl-6">
            {RULES.map((rule) => (
              <li key={rule} className={BODY}>
                {rule}
              </li>
            ))}
          </ol>
        </Block>
      </Section>

      <Section
        id="colour"
        title="Colour"
        intro="Primitives (raw values) → semantic tokens (what a colour is for) → roles. Components only name roles, surfaces and ON_DARK; tokens live in app/global.css, role specs in styles/tailwind.css."
      >
        <Block title="Text colours">
          <div className="overflow-x-auto rounded-xl border border-neutral-border-subtle">
            <table className="w-full text-left">
              <thead>
                <tr className={SURFACE.neutral}>
                  {['Primitive', 'Token', 'On white', 'Use'].map((h) => (
                    <th
                      key={h}
                      className={`${EYEBROW} px-5 py-3 whitespace-nowrap`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COLOURS.map((c) => (
                  <tr
                    key={c.token}
                    className="border-t border-neutral-border-subtle"
                  >
                    <td className={`${CODE} px-5 py-3 whitespace-nowrap`}>
                      <span
                        className={`${c.swatch} mr-2 inline-block size-3 rounded-sm align-middle`}
                      />
                      {c.primitive}
                    </td>
                    <td className={`${CODE} px-5 py-3 whitespace-nowrap`}>
                      {c.token}
                    </td>
                    <td className={`${CODE} px-5 py-3`}>{c.ratio}</td>
                    <td className={`${BODY_SMALL} min-w-56 px-5 py-3`}>
                      {c.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block
          title="Surfaces"
          intro="A surface is a fill and the text colour that belongs on it. Put one on the chip and give its text a role; the role recolours itself. Every pair passes AA at 14px."
        >
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {SURFACES.map((s) => (
              <div key={s.name} className="grid min-w-0 content-start gap-4">
                <SpecLine>
                  {s.ratio} · {s.use}
                </SpecLine>
                <span
                  className={`${s.cls} ${s.role} w-fit rounded-full border px-3 py-0.5`}
                >
                  {s.text}
                </span>
                <p className={CODE}>{s.name}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block
          title="On dark"
          intro="Put ON_DARK on the container and use the normal roles inside. Text turns solid white; SLUB and legal links are white at 75% (agreed below AA for short labels). Links turn white."
        >
          <div
            className={`${ON_DARK} grid gap-8 rounded-xl bg-[url('/svg/orange-bg.svg')] bg-cover bg-center p-8 md:grid-cols-2`}
          >
            <div className="grid content-start gap-2">
              <p className={EYEBROW}>Product</p>
              <span className={FOOTER_LINK}>Showcase</span>
              <span className={FOOTER_LINK}>Roadmap</span>
              <p className={`${CODE} mt-2`}>EYEBROW · FOOTER_LINK</p>
            </div>
            <div className="grid content-start gap-3">
              <h4 className={SUB_HEADING}>Join the Herd!</h4>
              <p className={BODY_SMALL}>
                Join our coding community for the latest tips and news.
              </p>
              <input
                className={`${FIELD} h-10 rounded-md border border-white/80 bg-white/10 px-3`}
                placeholder="Email"
                aria-label="Email (example on dark)"
              />
              <p className="flex flex-wrap gap-x-5">
                <span className={FOOTER_LEGAL_LINK}>Privacy</span>
                <span className={FOOTER_LEGAL_LINK}>Terms of Service</span>
              </p>
              <p className={CODE}>SUB_HEADING · BODY_SMALL · FIELD</p>
              <p className={CODE}>FOOTER_LEGAL_LINK</p>
            </div>
          </div>
        </Block>
      </Section>
    </div>
  );
}
