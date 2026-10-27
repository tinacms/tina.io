import type { Metadata } from 'next';
import {
  ARTICLE_TITLE,
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CAPTION,
  CARD_TITLE,
  CODE,
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
  SUB_HEADING,
  SURFACE,
} from '@/component/styles/typography';

export const metadata: Metadata = {
  title: 'Type Rules | TinaCMS',
  description:
    'Every text style on tina.io, when to use it, and the tokens behind it.',
  robots: { index: false, follow: false },
};

/**
 * Internal type reference, served at /design and kept out of the index.
 *
 * Every specimen renders through the same constants the site uses, so this
 * page can't drift from the code: change a role in styles/tailwind.css and
 * this page changes with it. This page follows its own rules — roles only.
 */

type Role = {
  name: string;
  cls: string;
  spec: string;
  use: string;
  never?: string;
  sample: string;
};

const GROUPS: { title: string; intro: string; roles: Role[] }[] = [
  {
    title: 'Headings',
    intro:
      'IBM Plex Sans at 600. Only the page title is orange; everything else is ink, so colour follows what a heading does, not its tag.',
    roles: [
      {
        name: 'PAGE_TITLE',
        cls: PAGE_TITLE,
        spec: 'Plex 600 · 36 / 48 / 60px · leading tight · tracking tight · orange gradient, lit from above',
        use: 'The page’s one h1.',
        never: 'Twice on a page, or anywhere below the top.',
        sample: 'Meet TinaCMS',
      },
      {
        name: 'ARTICLE_TITLE',
        cls: ARTICLE_TITLE,
        spec: 'Plex 600 · 36 / 48px · leading tight · tracking tight · orange gradient, lit from above',
        use: 'The page title on blog posts and legal pages, whose titles run long.',
        sample: 'Tipping the iceberg: the WordPress era is over',
      },
      {
        name: 'SECTION_TITLE',
        cls: SECTION_TITLE,
        spec: 'Plex 600 · 30 / 36 / 48px · leading tight · tracking tight · ink',
        use: 'Opens a band of the page.',
        sample: 'Built for marketers and developers',
      },
      {
        name: 'CARD_TITLE',
        cls: CARD_TITLE,
        spec: 'Plex 600 · 20 / 24 / 30px · leading snug · ink',
        use: 'Headings in cards, tiers and tiles; prices; h1–h2 in rich text.',
        sample: 'Visual editing',
      },
      {
        name: 'SUB_HEADING',
        cls: SUB_HEADING,
        spec: 'Plex 600 · 18 / 20px · leading snug · ink',
        use: 'Headings inside copy; names in dense grids; office names; talk titles; h3–h6 in rich text.',
        sample: 'Editorial workflow',
      },
      {
        name: 'QUOTE',
        cls: QUOTE,
        spec: 'Plex 500 · 24 / 30px · leading snug · ink · no italics',
        use: 'Testimonials and pull quotes. Attribution underneath is BODY_MUTED.',
        sample: '“Tina is transforming the way we do docs at Unity”',
      },
    ],
  },
  {
    title: 'Labels',
    intro:
      'Short text that names or tags something. SLUB is uppercase and spaced; Label is the plain, slightly heavier option.',
    roles: [
      {
        name: 'EYEBROW (SLUB)',
        cls: EYEBROW,
        spec: 'Plex 500 · 14px · uppercase · tracking widest · label grey',
        use: 'The label above a title, table column headers, pills.',
        never:
          'Names, sentences, prices or addresses. Uppercase it in CSS, not in the copy.',
        sample: 'Trusted by teams shipping at scale',
      },
      {
        name: 'EYEBROW_LINK',
        cls: EYEBROW_LINK,
        spec: 'Plex 500 · 14px · uppercase · tracking widest · link blue · underlined',
        use: 'Standalone links: “Read more →”, “See all events →”.',
        sample: 'Read more →',
      },
      {
        name: 'LABEL',
        cls: LABEL,
        spec: 'Inter 500 · 14px · ink',
        use: 'Chips, tags, status pills, table row labels and values, times, “Page 1 of 15”, step labels.',
        never: 'Paragraphs or anything longer than a phrase.',
        sample: 'Included users',
      },
    ],
  },
  {
    title: 'Reading text',
    intro:
      'Inter. One reading size, one step smaller for dense copy, and a muted grey for supporting text only.',
    roles: [
      {
        name: 'BODY',
        cls: BODY,
        spec: 'Inter 400 · 16 / 18px · leading relaxed · body ink',
        use: 'Every paragraph someone is meant to read. A bare <p> inside <main> already looks like this.',
        sample:
          'Store content as Markdown or MDX in your repo, and edit it visually without leaving the page.',
      },
      {
        name: 'BODY_SMALL',
        cls: BODY_SMALL,
        spec: 'Inter 400 · 14 / 16px · leading relaxed · body ink',
        use: 'Dense copy: card blurbs, lists, descriptions, checklist items.',
        sample: 'Drafts, branches and approvals, backed by your Git provider.',
      },
      {
        name: 'BODY_MUTED',
        cls: BODY_MUTED,
        spec: 'Inter 400 · 14 / 16px · leading relaxed · subtle grey',
        use: 'Dates, bylines, captions, units, hints, attributions.',
        never: 'A paragraph that carries meaning, or anything you can click.',
        sample: 'Published 23 October 2026 · 6 min read',
      },
      {
        name: 'CAPTION',
        cls: CAPTION,
        spec: 'Inter 400 · 14px at every width · leading 1.43 · body ink',
        use: 'Small text that sits tight under other content: billing notes, address lines.',
        sample: '$290 billed annually (save $58)',
      },
      {
        name: 'CODE',
        cls: CODE,
        spec: 'IBM Plex Mono 400 · 14 / 16px · leading relaxed · ink',
        use: 'Inline code, terminal output, package names, versions, commit hashes.',
        sample: 'npx create-tina-app@latest',
      },
    ],
  },
  {
    title: 'Navigation, links and forms',
    intro:
      'Links are blue (#0D5DBD, 6.3:1) so orange stays with the page title. The nav switches to its slide-out menu below xl, where items are a step larger for tapping.',
    roles: [
      {
        name: 'NAV_LINK',
        cls: NAV_LINK,
        spec: 'Inter 500 · 18px in the mobile menu, 16px from xl · link blue',
        use: 'Top-level nav items.',
        sample: 'TinaCMS',
      },
      {
        name: 'NAV_MENU_LINK',
        cls: NAV_MENU_LINK,
        spec: 'Inter 500 · 18 / 16px · body ink · link blue on hover',
        use: 'Items inside a nav menu.',
        sample: 'Docs for TinaCMS',
      },
      {
        name: 'FIELD',
        cls: FIELD,
        spec: 'Inter 400 · 16px · ink · placeholder in the label grey',
        use: 'Inputs, selects and text areas. 16px stops phones zooming in.',
        sample: 'name@example.com',
      },
    ],
  },
];

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

const RULES = [
  'Pick a role and use nothing else for type. Never add a size, weight, font, line-height, letter-spacing, case or text-colour class next to one.',
  'Layout classes are fine: margin, padding, alignment, width, truncation.',
  'LINK is the one class that combines with a role: it adds colour and underline and keeps the size around it.',
  'On a dark or orange container, put ON_DARK on the container and use the normal roles inside. Never write text-white.',
  'On a chip, pill, badge or coloured row, put a SURFACE on it and give the text a role. Never colour text on a fill by hand.',
  'Markdown output goes in a RICH_TEXT wrapper; it maps headings, paragraphs, links and code onto the roles.',
  'Nothing fits? Add a role to styles/tailwind.css and typography.ts, show it here, and use it.',
];

const EXCEPTIONS = [
  'Buttons (issue #4964).',
  'Syntax-highlighting colours in code blocks and the homepage terminal.',
  'Decorative terminal and code mockups (the homepage terminal) use CODE_ILLUSTRATION: IBM Plex Mono at 13px, a picture of code rather than code to read. Real code uses CODE.',
  'Data-driven brand colours, like partner tier badges.',
  'The recommended pricing plan: its name and price use CARD_TITLE_FEATURED, CARD_TITLE in the brand orange gradient. Every other card title is ink.',
  'Icons sized or coloured with text classes, social icons, logos.',
  'Two-tone homepage headings, until the team decides.',
  'TinaCMS admin field components, which render inside the editor.',
];

const Spec = ({ role }: { role: Role }) => (
  <div className="grid grid-cols-1 gap-3 border-b border-neutral-border-subtle py-6 last:border-b-0 md:grid-cols-[1fr_18rem] md:gap-8">
    <div className="min-w-0">
      <p className={`${role.cls} wrap-anywhere`}>{role.sample}</p>
      <p className={`${BODY_MUTED} mt-2`}>{role.spec}</p>
    </div>
    <div className="min-w-0">
      <p className={CODE}>{role.name}</p>
      <p className={`${BODY_SMALL} mt-1`}>{role.use}</p>
      {role.never && (
        <p className={`${BODY_SMALL} mt-1`}>
          <span className={LABEL}>Never: </span>
          {role.never}
        </p>
      )}
    </div>
  </div>
);

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
      <p className={EYEBROW}>tina.io · internal reference</p>
      <h1 className={`${PAGE_TITLE} mt-3`}>Type Rules</h1>
      <p className={`${BODY} mt-5 max-w-2xl`}>
        Every piece of text on the site uses one of the styles below. Each
        carries its full spec — font, size at every breakpoint, weight, line
        height, spacing, case and colour — so a component only adds layout.
      </p>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>The rules</h2>
        <ol className="mt-6 grid list-decimal gap-3 pl-6">
          {RULES.map((rule) => (
            <li key={rule} className={BODY}>
              {rule}
            </li>
          ))}
        </ol>
      </section>

      {GROUPS.map((group) => (
        <section key={group.title} className="mt-16">
          <h2 className={SECTION_TITLE}>{group.title}</h2>
          <p className={`${BODY} mt-2 max-w-2xl`}>{group.intro}</p>
          <div className="mt-6 rounded-2xl border border-neutral-border-subtle bg-white px-6">
            {group.roles.map((role) => (
              <Spec key={role.name} role={role} />
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Links</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          <code className={CODE}>LINK</code> keeps the size of the text around
          it. Inside a paragraph:{' '}
          <a className={LINK} href="#links">
            read the editorial workflow guide
          </a>
          . Inside small copy:
        </p>
        <p className={`${BODY_SMALL} mt-2`}>
          A matched search term is <code className={CODE}>HIGHLIGHT</code>: the
          best <span className={HIGHLIGHT}>Markdown</span> CMS.
        </p>
        <p className={`${BODY_SMALL} mt-2`}>
          Questions? Start a{' '}
          <a className={LINK} href="#links">
            GitHub Discussion
          </a>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Surfaces</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          A surface is a fill and the text colour that belongs on it. Put one on
          the chip and give its text a role; the role recolours itself. Every
          pair passes AA at 14px.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {SURFACES.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-neutral-border-subtle bg-white p-5"
            >
              <span
                className={`${s.cls} inline-block rounded-full border px-3 py-0.5 ${s.role}`}
              >
                {s.text}
              </span>
              <p className={`${CODE} mt-3`}>{s.name}</p>
              <p className={`${BODY_MUTED} mt-1`}>
                {s.ratio} · {s.use}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>On dark</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Put <code className={CODE}>ON_DARK</code> on the container and use the
          normal roles inside. Text turns solid white; SLUB and legal links are
          white at 75% (agreed below AA for short labels). Links turn white.
        </p>
        <div
          className={`${ON_DARK} mt-6 grid gap-8 rounded-2xl bg-[url('/svg/orange-bg.svg')] bg-cover bg-center p-8 md:grid-cols-2`}
        >
          <div className="grid content-start gap-2">
            <p className={EYEBROW}>Product</p>
            <span className={FOOTER_LINK}>Showcase</span>
            <span className={FOOTER_LINK}>Roadmap</span>
            <p className={`${CODE} mt-2`}>EYEBROW · FOOTER_LINK</p>
          </div>
          <div className="grid content-start gap-3">
            <h3 className={SUB_HEADING}>Join the Herd!</h3>
            <p className={BODY_SMALL}>
              Join our coding community for the latest tips and news.
            </p>
            <input
              className={`${FIELD} h-10 rounded-md border border-white/80 bg-white/10 px-3`}
              placeholder="Email"
              aria-label="Email (example)"
            />
            <p className="flex flex-wrap gap-x-5">
              <span className={FOOTER_LEGAL_LINK}>Privacy</span>
              <span className={FOOTER_LEGAL_LINK}>Terms of Service</span>
            </p>
            <p className={CODE}>SUB_HEADING · BODY_SMALL · FIELD</p>
            <p className={CODE}>FOOTER_LEGAL_LINK</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Rich text</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Markdown goes inside <code className={CODE}>RICH_TEXT</code>: h1–h2
          become CARD_TITLE, h3–h6 SUB_HEADING, paragraphs BODY, links LINK,
          inline code CODE, table headers EYEBROW.
        </p>
        <div
          className={`${RICH_TEXT} mt-6 grid gap-4 rounded-2xl border border-neutral-border-subtle bg-white p-6`}
        >
          <h2>Simple fields and compound fields</h2>
          <p>
            Simple fields hold <a href="#rich-text">one value</a>, like a
            string. Compound fields such as <code>group</code> hold others.
          </p>
          <h3>Group lists</h3>
          <p>A group list is a list of groups with the same fields.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Colour</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Primitives (raw values) → semantic tokens (what a colour is for) →
          roles. Components only name roles, surfaces and ON_DARK; tokens live
          in <code className={CODE}>app/global.css</code>, role specs in{' '}
          <code className={CODE}>styles/tailwind.css</code>.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-border-subtle">
          <table className="w-full bg-white text-left">
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
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Agreed exceptions</h2>
        <ul className="mt-6 grid list-disc gap-2 pl-6">
          {EXCEPTIONS.map((e) => (
            <li key={e} className={BODY}>
              {e}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
