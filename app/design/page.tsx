import { Copy, Search, X } from 'lucide-react';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ICON_BUTTON } from '@/component/styles/buttons';
import {
  BUTTON_EXCEPTIONS,
  BUTTON_LEVEL_GUIDE,
  BUTTON_RULES,
} from '@/component/styles/buttons.guide';
import {
  BODY,
  BODY_MUTED,
  BODY_SMALL,
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
  ON_DARK,
  PAGE_TITLE,
  SECTION_TITLE,
  SHIMMER,
  SUBTLE_LINK,
  SURFACE,
  TITLE_LINK,
} from '@/component/styles/typography';
import {
  ROLE_GROUPS,
  type RoleGuide,
  roleClass,
  SURFACE_GUIDE,
  TEXT_COLOURS,
  TYPE_EXCEPTIONS,
  TYPE_RULES,
} from '@/component/styles/typography.guide';
import { Button, ButtonArrow, ButtonGroup } from '@/component/ui/Button';

export const metadata: Metadata = {
  title: 'Tina.io Style Guide | TinaCMS',
  description:
    'Pick the type role, colour and button level for anything on tina.io.',
  robots: { index: false, follow: false },
};

/**
 * The tina.io style guide, served at /design and kept out of the index.
 *
 * Written for the developers (and agents) building pages: which role to use,
 * and which to use instead. Every table renders
 * components/styles/typography.guide.ts, the single source for that guidance,
 * so this page and AGENTS.md can't drift apart. Examples render through the
 * real roles; the page itself uses roles only.
 */

/** Kebab-case id from a group title, so an example can link to its own table. */
const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/**
 * A role's example, drawn through the real role. Anything clickable on the
 * site is a real link here too, so it shows the pointer and its hover state.
 */
const Example = ({ role, href }: { role: RoleGuide; href: string }) => {
  const cls = roleClass(role.name);
  switch (role.exampleKind) {
    case 'link':
      return (
        <a className={cls} href={href}>
          {role.example}
        </a>
      );
    case 'inline-link':
      return (
        <p className={BODY_SMALL}>
          Start a{' '}
          <a className={LINK} href={href}>
            {role.example}
          </a>
        </p>
      );
    case 'heading-link':
      return (
        <a className="inline-block" href={href}>
          <span className={`${CARD_TITLE} ${TITLE_LINK}`}>{role.example}</span>
        </a>
      );
    case 'subtle-link':
      return (
        <a className={`${BODY_SMALL} ${SUBTLE_LINK}`} href={href}>
          {role.example}
        </a>
      );
    case 'highlight':
      return (
        <p className={BODY_SMALL}>
          The best <span className={HIGHLIGHT}>{role.example}</span> CMS
        </p>
      );
    case 'shimmer':
      return (
        <a
          className={`${SURFACE.info} ${LABEL} inline-flex rounded-full border px-3.5 py-1.5`}
          href={href}
        >
          <span className={SHIMMER}>{role.example}</span>
        </a>
      );
    case 'field':
      return (
        <input
          className={`${cls} h-10 w-full max-w-xs rounded-md border border-neutral-border-subtle px-3`}
          placeholder={role.example}
          aria-label="Example field"
        />
      );
    default:
      return <p className={cls}>{role.example}</p>;
  }
};

/**
 * The one table layout on the page. A table from md up; on phones each row
 * stacks into a block, with the column name in front of each value.
 */
const GuideTable = ({
  columns,
  widths,
  rows,
}: {
  columns: string[];
  /** Column widths from md up, so every table of one kind lines up. */
  widths?: string[];
  rows: { key: string; cells: ReactNode[] }[];
}) => (
  <div className="overflow-hidden rounded-xl border border-neutral-border-subtle bg-white">
    <table
      className={`w-full text-left max-md:block ${widths ? 'md:table-fixed' : ''}`}
    >
      {widths && (
        <colgroup>
          {widths.map((w, i) => (
            <col key={columns[i]} className={w} />
          ))}
        </colgroup>
      )}
      <thead className="max-md:hidden">
        <tr className={SURFACE.neutral}>
          {columns.map((c) => (
            <th key={c} className={`${EYEBROW} px-5 py-3 whitespace-nowrap`}>
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="max-md:block">
        {rows.map((row) => (
          <tr
            key={row.key}
            className="border-t border-neutral-border-subtle first:border-t-0 max-md:grid max-md:gap-3 max-md:p-5 md:first:border-t"
          >
            {row.cells.map((cell, i) => (
              <td
                key={columns[i]}
                className="min-w-0 align-middle max-md:block md:px-5 md:py-4"
              >
                {i > 0 && (
                  <p className={`${EYEBROW} mb-1 md:hidden`}>{columns[i]}</p>
                )}
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const RoleTable = ({ roles, href }: { roles: RoleGuide[]; href: string }) => (
  <GuideTable
    columns={['Example', 'Role', 'Use for', 'Not for']}
    widths={['w-5/12', 'w-1/6', 'w-1/4', 'w-1/6']}
    rows={roles.map((role) => ({
      key: role.name,
      cells: [
        <div key="example" className="wrap-anywhere">
          <Example role={role} href={href} />
        </div>,
        <p key="role" className={`${CODE} wrap-anywhere`}>
          {role.name}
        </p>,
        <p key="use" className={BODY_SMALL}>
          {role.useFor}
        </p>,
        role.notFor && (
          <p key="not" className={BODY_SMALL}>
            {role.notFor.job} →{' '}
            <span className={CODE}>{role.notFor.instead}</span>
          </p>
        ),
      ],
    }))}
  />
);

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
    className="grid scroll-mt-24 gap-12 border-t border-neutral-border-subtle pt-16"
  >
    <div>
      <h2 className={SECTION_TITLE}>{title}</h2>
      <p className={`${BODY} mt-3 max-w-3xl`}>{intro}</p>
    </div>
    {children}
  </section>
);

const Group = ({
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
  <div id={id} className="grid min-w-0 scroll-mt-24 gap-4">
    <div>
      <h3 className={CARD_TITLE}>{title}</h3>
      {intro && <p className={`${BODY_SMALL} mt-1 max-w-3xl`}>{intro}</p>}
    </div>
    {children}
  </div>
);

export default function StyleGuidePage() {
  return (
    // The site layout already provides <main>.
    <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-16 px-4 py-16 md:px-8 lg:px-12">
      <header>
        <h1 className={PAGE_TITLE}>Tina.io Style Guide</h1>
        <p className={`${BODY} mt-4 max-w-3xl`}>
          Use this page to pick the type role, colour and button level for
          anything on tina.io. Each example uses the same code as the live site.
        </p>
        <nav aria-label="Style guide sections" className="mt-6 flex gap-8">
          <a className={EYEBROW_LINK} href="#typography">
            Typography
          </a>
          <a className={EYEBROW_LINK} href="#colour">
            Colour
          </a>
          <a className={EYEBROW_LINK} href="#buttons">
            Buttons
          </a>
        </nav>
      </header>

      <Section
        id="typography"
        title="Typography"
        intro="Give each piece of text one role from components/styles/typography.ts, chosen by the job the text does. The size comes with the role."
      >
        <Group title="The rules">
          <ol className="grid max-w-4xl list-decimal gap-2 pl-6">
            {TYPE_RULES.map((rule) => (
              <li key={rule} className={BODY_SMALL}>
                {rule}
              </li>
            ))}
          </ol>
        </Group>

        {ROLE_GROUPS.map((group) => (
          <Group
            key={group.title}
            id={slug(group.title)}
            title={group.title}
            intro={group.intro}
          >
            <RoleTable roles={group.roles} href={`#${slug(group.title)}`} />
          </Group>
        ))}

        <Group
          title="Agreed exceptions"
          intro="You can hand-set type in these places. Use a role everywhere else."
        >
          <ul className="grid list-disc gap-1 pl-6">
            {TYPE_EXCEPTIONS.map((e) => (
              <li key={e} className={BODY_SMALL}>
                {e}
              </li>
            ))}
          </ul>
        </Group>
      </Section>

      <Section
        id="colour"
        title="Colour"
        intro="Each role sets its own text colour, so components don't name colours. To change a text colour, change the surface under it."
      >
        <Group
          title="Text colours"
          intro="Check these when you add a role. The values live in app/global.css."
        >
          <GuideTable
            columns={['Token', 'Used by', 'Use for']}
            rows={TEXT_COLOURS.map((c) => ({
              key: c.token,
              cells: [
                <p key="token" className={`${CODE} whitespace-nowrap`}>
                  <span
                    className={`${c.swatch} mr-2 inline-block size-3 rounded-sm align-middle`}
                  />
                  {c.token}
                </p>,
                <p key="used" className={CODE}>
                  {c.usedBy.join(', ')}
                </p>,
                <p key="use" className={BODY_SMALL}>
                  {c.useFor}
                </p>,
              ],
            }))}
          />
        </Group>

        <Group
          title="Surfaces"
          intro="Put a SURFACE on the chip, pill or row with the fill, and give its text a role. The role takes the paired colour."
        >
          <GuideTable
            columns={['Example', 'Surface', 'Use for']}
            rows={SURFACE_GUIDE.map((s) => ({
              key: s.name,
              cells: [
                <span
                  key="example"
                  className={`${SURFACE[s.name]} ${roleClass(s.role)} inline-block rounded-full border px-3 py-0.5`}
                >
                  {s.example}
                </span>,
                <p key="name" className={CODE}>
                  SURFACE.{s.name}
                </p>,
                <p key="use" className={BODY_SMALL}>
                  {s.useFor}
                </p>,
              ],
            }))}
          />
        </Group>

        <Group
          id="on-dark"
          title="On dark"
          intro="Put ON_DARK on a dark or orange container and keep the normal roles inside. Text turns white; SLUB and legal links turn white at 75%."
        >
          <div
            className={`${ON_DARK} flex flex-wrap items-center gap-x-10 gap-y-4 rounded-xl bg-[url('/svg/orange-bg.svg')] bg-cover bg-center p-8`}
          >
            <span className={EYEBROW}>Product</span>
            <a className={FOOTER_LINK} href="#on-dark">
              Showcase
            </a>
            <span className={BODY_SMALL}>Join the herd for tips and news.</span>
            <input
              className={`${FIELD} h-10 rounded-sm border border-white bg-white/10 px-3`}
              placeholder="Email"
              aria-label="Example field on dark"
            />
            <a className={FOOTER_LEGAL_LINK} href="#on-dark">
              Privacy
            </a>
          </div>
        </Group>
      </Section>

      <Section
        id="buttons"
        title="Buttons"
        intro="Every button is one of three levels from components/styles/buttons.ts, all one size. Pick the level by the job; the look comes with it."
      >
        <Group title="The rules">
          <ol className="grid max-w-4xl list-decimal gap-2 pl-6">
            {BUTTON_RULES.map((rule) => (
              <li key={rule} className={BODY_SMALL}>
                {rule}
              </li>
            ))}
          </ol>
        </Group>

        <Group id="button-levels" title="Levels">
          <GuideTable
            columns={['Example', 'Level', 'Use for', 'Not for']}
            widths={['w-1/4', 'w-1/6', 'w-1/3', 'w-1/4']}
            rows={BUTTON_LEVEL_GUIDE.map((g) => ({
              key: g.level,
              cells: [
                <Button key="example" level={g.level}>
                  {g.example}
                  {g.arrow && <ButtonArrow />}
                </Button>,
                <p key="level" className={`${CODE} wrap-anywhere`}>
                  BUTTON.{g.level}
                </p>,
                <p key="use" className={BODY_SMALL}>
                  {g.useFor}
                </p>,
                <p key="not" className={BODY_SMALL}>
                  {g.notFor.job} →{' '}
                  <span className={CODE}>{g.notFor.instead}</span>
                </p>,
              ],
            }))}
          />
        </Group>

        <Group
          id="button-groups"
          title="Groups"
          intro="A group leads with Primary and a Tertiary sits beside it. On phones the buttons stack, full width. Narrow the window to see it."
        >
          <ButtonGroup>
            <Button level="primary">
              Learn about TinaCMS
              <ButtonArrow />
            </Button>
            <Button level="tertiary">Try the Editor</Button>
          </ButtonGroup>
        </Group>

        <Group
          id="buttons-on-dark"
          title="On dark"
          intro="Put ON_DARK on the orange or dark container and keep the normal levels inside. Primary turns white with an orange label; Tertiary turns into a white outline."
        >
          <div
            className={`${ON_DARK} rounded-xl bg-[url('/svg/orange-bg.svg')] bg-cover bg-center p-8`}
          >
            <ButtonGroup>
              <Button level="primary">Accept All</Button>
              <Button level="tertiary">Reject All</Button>
            </ButtonGroup>
          </div>
        </Group>

        <Group
          id="button-states"
          title="States"
          intro="Hover lifts 1px with a soft shadow, and pressing drops it back. Keyboard focus shows a 2px ink ring (tab to it). Disabled is 60% with no hover."
        >
          <ButtonGroup>
            <Button level="primary">Schedule Call</Button>
            <Button level="primary" disabled>
              Sending…
            </Button>
          </ButtonGroup>
        </Group>

        <Group
          id="icon-buttons"
          title="Icon buttons"
          intro="ICON_BUTTON for close, copy, carousel arrows and search: a 44px tap area, a 20px icon at a 2px stroke, slate, with a light square on hover. White on dark. Always add an aria-label."
        >
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={ICON_BUTTON} aria-label="Close">
              <X />
            </button>
            <button type="button" className={ICON_BUTTON} aria-label="Search">
              <Search />
            </button>
            <span
              className={`${ON_DARK} inline-flex rounded-lg bg-[url('/svg/orange-bg.svg')] bg-cover p-1`}
            >
              <button
                type="button"
                className={ICON_BUTTON}
                aria-label="Copy code"
              >
                <Copy />
              </button>
            </span>
          </div>
        </Group>

        <Group
          title="Agreed exceptions"
          intro="These keep their own styling. Every other button uses a level."
        >
          <ul className="grid list-disc gap-1 pl-6">
            {BUTTON_EXCEPTIONS.map((e) => (
              <li key={e} className={BODY_SMALL}>
                {e}
              </li>
            ))}
          </ul>
        </Group>
      </Section>

      <p className={BODY_MUTED}>
        To change this guidance, edit components/styles/typography.guide.ts and
        components/styles/buttons.guide.ts.
      </p>
    </div>
  );
}
