import type { Metadata } from 'next';
import {
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  EYEBROW,
  LEDE,
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
    note: 'The one orange moment at the top. Once per page, never twice — it pairs with the wordmark above it.',
    token: 'text-orange-600',
  },
  {
    name: 'SECTION_TITLE',
    label: 'Section title',
    note: 'Opens a band of the page. Orange, because these are the signposts a scanning reader uses.',
    token: 'text-orange-600',
  },
  {
    name: 'CARD_TITLE',
    label: 'Card title',
    note: 'A heading inside a card, tier or grid item. Ink, so a grid of nine reads as a grid.',
    token: 'inherits ink',
  },
  {
    name: 'SUB_HEADING',
    label: 'Sub-heading',
    note: 'A heading inside running copy, mostly blog posts and docs. Ink.',
    token: 'inherits ink',
  },
  {
    name: 'EYEBROW',
    label: 'Eyebrow',
    note: 'The small uppercase label above a title. Uppercased in CSS, not in the copy.',
    token: 'text-neutral-text-secondary',
  },
];

const SCALE = [
  {
    cls: PAGE_TITLE,
    name: 'PAGE_TITLE',
    size: '36 / 48 / 60px',
    sample: 'Meet TinaCMS',
  },
  {
    cls: SECTION_TITLE,
    name: 'SECTION_TITLE',
    size: '30 / 36 / 48px',
    sample: 'Built for marketers and developers',
  },
  {
    cls: CARD_TITLE,
    name: 'CARD_TITLE',
    size: '20 / 24 / 30px',
    sample: 'Visual editing',
  },
  {
    cls: SUB_HEADING,
    name: 'SUB_HEADING',
    size: '20px',
    sample: 'Editorial workflow',
  },
  {
    cls: LEDE,
    name: 'LEDE',
    size: '20px',
    sample: 'The open-source, Git-backed CMS with visual editing.',
  },
  {
    cls: BODY,
    name: 'BODY',
    size: '16px',
    sample:
      'Store content as Markdown or MDX in your repo, and edit it visually without leaving the page.',
  },
  {
    cls: BODY_SMALL,
    name: 'BODY_SMALL',
    size: '14px',
    sample: 'Drafts, branches and approvals, backed by your Git provider.',
  },
];

const COLOURS = [
  {
    swatch: 'bg-orange-600',
    name: 'orange-600',
    value: '#D13F13',
    ratio: '4.74:1',
    use: 'Page and section titles. Passes at every size, which is why it replaces orange-500.',
  },
  {
    swatch: 'bg-foreground',
    name: 'ink',
    value: '#1C1B2E',
    ratio: '16.4:1',
    use: 'Every other heading, and every paragraph. Set as --foreground.',
  },
  {
    swatch: 'bg-neutral-text-secondary',
    name: 'neutral-text-secondary',
    value: '#64748B',
    ratio: '4.8:1',
    use: 'Muted only — captions, eyebrows, footer links, form hints.',
  },
];

const Rule = ({ role }: { role: (typeof ROLES)[number] }) => (
  <div className="grid grid-cols-1 gap-2 border-b border-neutral-border-subtle py-5 last:border-b-0 md:grid-cols-[14rem_1fr_14rem] md:gap-6">
    <div>
      <p className="font-ibm-plex font-semibold">{role.label}</p>
      <p className="font-mono text-xs text-neutral-text-secondary">
        {role.name}
      </p>
    </div>
    <p className={`${BODY_MUTED} min-w-0`}>{role.note}</p>
    <p className="min-w-0 self-start rounded-lg bg-seafoam-50 px-3 py-2 font-mono text-xs text-neutral-text-secondary">
      {role.token}
    </p>
  </div>
);

export default function DesignPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
      <p className={EYEBROW}>tina.io · internal reference</p>
      <h1 className={`${PAGE_TITLE} mt-3`}>Type Rules</h1>
      <p className={`${LEDE} mt-5 max-w-2xl text-balance`}>
        One heading scale, one body scale, one dark. Colour follows what a
        heading does on the page, not which tag it uses.
      </p>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>The rule</h2>
        <p className={`${BODY_MUTED} mt-2 max-w-2xl`}>
          Five roles. Two are orange, and only one of those appears more than
          once on a page.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-border-subtle bg-white px-6">
          {ROLES.map((role) => (
            <Rule key={role.name} role={role} />
          ))}
        </div>
        <p className={`${BODY_MUTED} mt-4 max-w-2xl`}>
          Ink needs no class. Because <code>--foreground</code> is the ink, a
          correct card title carries no colour class at all.
        </p>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>The scale</h2>
        <p className={`${BODY_MUTED} mt-2 max-w-2xl`}>
          Every specimen here is rendered with the constant beside it, so this
          page always shows what the site actually uses.
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-border-subtle bg-white px-6">
          {SCALE.map((row) => (
            <div
              key={row.name}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-neutral-border-subtle py-5 last:border-b-0"
            >
              <p className={`${row.cls} min-w-0 flex-1 wrap-anywhere`}>
                {row.sample}
              </p>
              <p className="font-mono text-xs whitespace-nowrap text-neutral-text-secondary">
                {row.name} · {row.size}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Body and muted</h2>
        <p className={`${BODY_MUTED} mt-2 max-w-2xl`}>
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
            <p className="mt-3 font-mono text-xs text-neutral-text-secondary">
              BODY
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-border-subtle bg-white p-6">
            <p className="mb-3 inline-block rounded-full border border-neutral-border-subtle px-3 py-1 font-ibm-plex text-xs font-semibold tracking-wider text-neutral-text-secondary uppercase">
              Exception
            </p>
            <p className={BODY_MUTED}>
              Muted is for captions, timestamps, footer links and form hints.
              Never a paragraph that carries meaning, and never a whole block of
              copy.
            </p>
            <p className="mt-3 font-mono text-xs text-neutral-text-secondary">
              BODY_MUTED
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className={SECTION_TITLE}>Colour</h2>
        <p className={`${BODY_MUTED} mt-2 max-w-2xl`}>
          Only the tokens type depends on. Buttons and fills are a separate
          piece of work.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-border-subtle">
          <table className="w-full bg-white text-left">
            <thead>
              <tr className="bg-seafoam-50">
                <th className={`${BODY_SMALL} px-5 py-3 font-ibm-plex`}>
                  Token
                </th>
                <th className={`${BODY_SMALL} px-5 py-3 font-ibm-plex`}>
                  Value
                </th>
                <th className={`${BODY_SMALL} px-5 py-3 font-ibm-plex`}>
                  On white
                </th>
                <th className={`${BODY_SMALL} px-5 py-3 font-ibm-plex`}>
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {COLOURS.map((c) => (
                <tr
                  key={c.name}
                  className="border-t border-neutral-border-subtle"
                >
                  <td className={`${BODY_SMALL} px-5 py-3 whitespace-nowrap`}>
                    <span
                      className={`${c.swatch} mr-2 inline-block size-3 rounded-sm align-middle`}
                    />
                    <span className="font-mono">{c.name}</span>
                  </td>
                  <td className={`${BODY_SMALL} px-5 py-3 font-mono`}>
                    {c.value}
                  </td>
                  <td className={`${BODY_SMALL} px-5 py-3 font-mono`}>
                    {c.ratio}
                  </td>
                  <td className={`${BODY_SMALL} px-5 py-3`}>{c.use}</td>
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
