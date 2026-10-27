import type { Metadata } from 'next';
import {
  ARTICLE_TITLE,
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  CODE,
  EYEBROW,
  ON_DARK,
  PAGE_TITLE,
  SECTION_TITLE,
  SUB_HEADING,
} from '@/component/styles/typography';

export const metadata: Metadata = {
  title: 'Type Rules | TinaCMS',
  description:
    'The heading and body rules every page on tina.io follows, and the tokens behind them.',
  robots: { index: false, follow: false },
};

/**
 * Internal type reference, served at /design and kept out of the index.
 *
 * Every specimen below renders through the same constants the site uses, so
 * this page cannot drift from the code — change a role in typography.ts and
 * this page changes with it.
 */

const ROLES = [
  {
    name: 'PAGE_TITLE',
    label: 'Page title',
    note: 'The one orange moment at the top, in the brand gradient. Once per page, never twice — it pairs with the wordmark above it.',
    token: 'text-heading',
  },
  {
    name: 'ARTICLE_TITLE',
    label: 'Article title',
    note: 'The page title for blog posts and legal pages, whose titles run long. Same gradient, one size smaller at the top end.',
    token: 'text-heading',
  },
  {
    name: 'SECTION_TITLE',
    label: 'Section title',
    note: 'Opens a band of the page. Ink, so the page title stays the only orange thing on screen.',
    token: 'inherits text-strong',
  },
  {
    name: 'CARD_TITLE',
    label: 'Card title',
    note: 'A heading inside a card, tier or grid item. Ink, so a grid of nine reads as a grid.',
    token: 'inherits text-strong',
  },
  {
    name: 'SUB_HEADING',
    label: 'Sub-heading',
    note: 'A heading inside running copy, mostly blog posts and docs. Ink.',
    token: 'inherits text-strong',
  },
  {
    name: 'EYEBROW',
    label: 'Eyebrow',
    note: 'The small uppercase label above a title. Uppercased in CSS, not in the copy.',
    token: 'text-subtle',
  },
];

const SCALE = [
  {
    cls: PAGE_TITLE,
    name: 'PAGE_TITLE',
    size: 'IBM Plex Sans 600 · 36 / 48 / 60px · leading tight · tracking tight',
    sample: 'Meet TinaCMS',
  },
  {
    cls: ARTICLE_TITLE,
    name: 'ARTICLE_TITLE',
    size: 'IBM Plex Sans 600 · 36 / 48px · leading tight · tracking tight',
    sample: 'Tipping the iceberg: the WordPress era is over',
  },
  {
    cls: SECTION_TITLE,
    name: 'SECTION_TITLE',
    size: 'IBM Plex Sans 600 · 30 / 36 / 48px · leading tight · tracking tight',
    sample: 'Built for marketers and developers',
  },
  {
    cls: CARD_TITLE,
    name: 'CARD_TITLE',
    size: 'IBM Plex Sans 600 · 20 / 24 / 30px · leading snug',
    sample: 'Visual editing',
  },
  {
    cls: SUB_HEADING,
    name: 'SUB_HEADING',
    size: 'IBM Plex Sans 600 · 20px · leading snug',
    sample: 'Editorial workflow',
  },
  {
    cls: EYEBROW,
    name: 'EYEBROW',
    size: 'IBM Plex Sans Medium 500 · 14px · tracking widest · uppercase',
    sample: 'Trusted by teams shipping at scale',
  },
  {
    cls: BODY,
    name: 'BODY',
    size: 'Inter 400 · 16px, 18px from tablet · leading relaxed',
    sample:
      'Store content as Markdown or MDX in your repo, and edit it visually without leaving the page.',
  },
  {
    cls: BODY_SMALL,
    name: 'BODY_SMALL',
    size: 'Inter 400 · 14px, 16px from tablet · leading relaxed',
    sample: 'Drafts, branches and approvals, backed by your Git provider.',
  },
  {
    cls: BODY_MUTED,
    name: 'BODY_MUTED',
    size: 'Inter 400 · 14px, 16px from tablet · leading relaxed · subtle',
    sample: 'Published 23 October 2026 · 6 min read',
  },
  {
    cls: CODE,
    name: 'CODE',
    size: 'IBM Plex Mono 400 · 14px, 16px from tablet · leading relaxed',
    sample: 'npx create-tina-app@latest',
  },
];

// Each row is one chain through the three layers. Components and roles may
// only use the right-hand column; the primitive is there so you can see what
// a token resolves to, not so you can reach for it.
const COLOURS = [
  {
    swatch: 'bg-heading',
    primitive: '--orange-500 → 600',
    value: '#EC4815 → #D13F13',
    token: '--text-heading-start / -end',
    cls: 'text-heading',
    ratio: '3.82 → 4.74:1',
    use: 'Page titles only. A gradient that starts on the official brand orange — the logo colour — and darkens one step. Both stops pass as large text, so it stays at title sizes (36px and up).',
  },
  {
    swatch: 'bg-strong',
    primitive: '--ink-900',
    value: '#1C1B2E',
    token: '--text-strong',
    cls: 'text-strong',
    ratio: '16.9:1',
    use: 'Every heading that is not the page title. Headings default to it, so it rarely needs writing.',
  },
  {
    swatch: 'bg-body',
    primitive: '--slate-700',
    value: '#334155',
    token: '--text-body',
    cls: 'text-body',
    ratio: '10.4:1',
    use: 'Every paragraph. A step lighter than headings so running text reads softer. The site default.',
  },
  {
    swatch: 'bg-subtle',
    primitive: '--slate-500',
    value: '#64748B',
    token: '--text-subtle',
    cls: 'text-subtle',
    ratio: '4.8:1',
    use: 'Supporting text only — captions, eyebrows, footer links, form hints.',
  },
];

const LAYERS = [
  {
    name: 'Primitives',
    where: 'app/global.css',
    example: '--orange-500: #ec4815',
    rule: 'Raw values, named for what they are. The only place a hex code should appear.',
  },
  {
    name: 'Semantic tokens',
    where: 'app/global.css',
    example: '--text-heading-start: var(--orange-500)',
    rule: 'Named for what they are for. Always point at a primitive, never a hex.',
  },
  {
    name: 'Classes',
    where: 'components/styles/typography.ts',
    example: 'PAGE_TITLE → text-heading',
    rule: 'Size, weight and colour together. Name semantic tokens only.',
  },
];

const Rule = ({ role }: { role: (typeof ROLES)[number] }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-neutral-border-subtle py-5 last:border-b-0 md:grid-cols-[14rem_1fr_14rem] md:gap-6">
    <div>
      <h3 className={SUB_HEADING}>{role.label}</h3>
      <p className={CODE}>{role.name}</p>
    </div>
    <p className={`${BODY_SMALL} min-w-0`}>{role.note}</p>
    <p
      className={`${CODE} min-w-0 self-start rounded-lg bg-seafoam-50 px-3 py-2`}
    >
      {role.token}
    </p>
  </div>
);

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
      <p className={EYEBROW}>tina.io · internal reference</p>
      <h1 className={`${PAGE_TITLE} mt-3`}>Type Rules</h1>
      <p className={`${BODY} mt-5 max-w-2xl`}>
        One heading scale, one body scale, two inks. Colour follows what a
        heading does on the page, not which tag it uses.
      </p>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>The rule</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Six heading roles. Only the page title is orange — the article title
          is its long-form version — and it appears once per page. Headings are
          set in IBM Plex Sans; everything people read is set in Inter; code is
          set in IBM Plex Mono.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-border-subtle bg-white px-6">
          {ROLES.map((role) => (
            <Rule key={role.name} role={role} />
          ))}
        </div>
        <p className={`${BODY} mt-4 max-w-2xl`}>
          Each role carries everything — font, size at every breakpoint, weight,
          line height, letter spacing, wrapping and colour — so a component only
          adds layout. Headings with no role still default to IBM Plex Sans in
          the strong ink.
        </p>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>The scale</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Every specimen here is rendered with the constant beside it, so this
          page always shows what the site actually uses.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-border-subtle bg-white px-6">
          {SCALE.map((row) => (
            <div
              key={row.name}
              className="flex flex-col gap-2 border-b border-neutral-border-subtle py-5 last:border-b-0"
            >
              <p className={`${row.cls} wrap-anywhere`}>{row.sample}</p>
              <p className="font-mono text-xs text-subtle">
                {row.name} · {row.size}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Body and muted</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Two paragraph colours. The default is the plain one, not the grey.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-border-subtle bg-white p-6">
            <p className="mb-3 inline-block rounded-full bg-seafoam-100 px-3 py-1 font-ibm-plex text-xs font-semibold tracking-wider text-seafoam-700 uppercase">
              Use this
            </p>
            <p className={BODY}>
              Body is the default for every paragraph someone is meant to read.
              It needs no colour class — it is what text already is.
            </p>
            <p className={`${CODE} mt-3`}>BODY</p>
          </div>
          <div className="rounded-2xl border border-neutral-border-subtle bg-white p-6">
            <p className="mb-3 inline-block rounded-full border border-neutral-border-subtle px-3 py-1 font-ibm-plex text-xs font-semibold tracking-wider text-subtle uppercase">
              Exception
            </p>
            <p className={BODY_MUTED}>
              Muted is for captions, timestamps, footer links and form hints.
              Never a paragraph that carries meaning, and never a whole block of
              copy.
            </p>
            <p className={`${CODE} mt-3`}>BODY_MUTED</p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>On dark</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          On the orange footer or any dark surface, put <code>ON_DARK</code> on
          the container and use the normal roles inside. Every text level turns
          solid white: on brand orange, any faded white drops below a readable
          contrast, so hierarchy comes from size and weight instead.
        </p>
        <div
          className={`${ON_DARK} mt-6 rounded-2xl bg-[url('/svg/orange-bg.svg')] bg-cover bg-center p-8`}
        >
          <p className={EYEBROW}>Resources</p>
          <h3 className={`${SUB_HEADING} mt-2`}>Join the Herd!</h3>
          <p className={`${BODY_SMALL} mt-2 max-w-md`}>
            Join our coding community for the latest tips and news.
          </p>
          <p className={`${BODY_MUTED} mt-4`}>© TinaCMS 2019–2026</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Colour</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Three layers, each only allowed to point at the one before it.
          Changing the brand orange is one edit to a primitive; every token and
          class follows.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {LAYERS.map((layer, i) => (
            <div
              key={layer.name}
              className="rounded-2xl border border-neutral-border-subtle bg-white p-6"
            >
              <p className={EYEBROW}>Layer {i + 1}</p>
              <h3 className={`${SUB_HEADING} mt-1`}>{layer.name}</h3>
              <p className={`${CODE} mt-1 wrap-anywhere`}>{layer.where}</p>
              <p
                className={`${CODE} mt-4 rounded-lg bg-seafoam-50 px-3 py-2 wrap-anywhere`}
              >
                {layer.example}
              </p>
              <p className={`${BODY_SMALL} mt-4`}>{layer.rule}</p>
            </div>
          ))}
        </div>

        <h3 className={`${CARD_TITLE} mt-12`}>Type colours</h3>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          The four tokens type uses. Buttons and fills are issue #4964.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-border-subtle">
          <table className="w-full bg-white text-left">
            <thead>
              <tr className="bg-seafoam-50">
                {[
                  'Primitive',
                  'Semantic token',
                  'Class',
                  'On white',
                  'Use',
                ].map((h) => (
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
                  <td className={`${BODY_SMALL} px-5 py-3 whitespace-nowrap`}>
                    <span
                      className={`${c.swatch} mr-2 inline-block size-3 rounded-sm align-middle`}
                    />
                    <span className="font-mono">{c.primitive}</span>
                    <span className="ml-2 font-mono text-subtle">
                      {c.value}
                    </span>
                  </td>
                  <td className={`${CODE} px-5 py-3 whitespace-nowrap`}>
                    {c.token}
                  </td>
                  <td className={`${CODE} px-5 py-3 whitespace-nowrap`}>
                    {c.cls}
                  </td>
                  <td className={`${CODE} px-5 py-3`}>{c.ratio}</td>
                  <td className={`${BODY_SMALL} min-w-64 px-5 py-3`}>
                    {c.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>How it holds</h2>
        <p className={`${BODY} mt-2 max-w-2xl`}>
          Nine heading variants appeared because building a heading meant
          copying a class string out of whichever component was open, and every
          copy drifted. The roles above live in one file and are imported by
          name, so the easy path is the correct one.
        </p>
        <p className={`${BODY} mt-3 max-w-2xl`}>
          Anything still needing a one-off is a sign a role is missing. Add it
          to <code>components/styles/typography.ts</code> rather than working
          around it in a component.
        </p>
      </section>
    </main>
  );
}
