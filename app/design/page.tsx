import { Copy, Search, Star, X } from 'lucide-react';
import type { Metadata } from 'next';
import { CodeButton } from '@/component/blocks/CodeButton/CodeButton';
import { ICON_BUTTON, NEUTRAL_OUTLINE } from '@/component/styles/buttons';
import {
  BUTTON_EXCEPTIONS,
  BUTTON_LEVEL_GUIDE,
  BUTTON_RULES,
} from '@/component/styles/buttons.guide';
import {
  COMMAND_MENU,
  COMMAND_MENU_ITEM,
  MENU_ITEM,
  MENU_PANEL,
} from '@/component/styles/menu';
import { CODE_PANEL, TAB, TAB_LIST } from '@/component/styles/tabs';
import {
  BODY,
  BODY_MUTED,
  BODY_SMALL,
  CARD_TITLE,
  CODE,
  EYEBROW,
  FIELD,
  FOOTER_LEGAL_LINK,
  FOOTER_LINK,
  INK,
  LINE,
  NAV_MENU_LINK,
  ON_DARK,
  PAGE_TITLE,
  SURFACE,
} from '@/component/styles/typography';
import {
  INK_GUIDE,
  LINE_GUIDE,
  PAGE_BACKGROUND_ROLES,
  PAGE_BACKGROUNDS,
  ROLE_GROUPS,
  roleClass,
  SURFACE_GUIDE,
  TEXT_COLOURS,
  TYPE_EXCEPTIONS,
  TYPE_RULES,
} from '@/component/styles/typography.guide';
import { Button, ButtonGroup } from '@/component/ui/Button';
import { Pagination, PostPagination } from '@/component/ui/Pagination';
import { SocialLinks, TINA_SOCIAL_LINKS } from '@/component/ui/SocialLinks';
import { TextLink } from '@/component/ui/TextLink';
import { FrontDoor } from './FrontDoor';
import { Group } from './Group';
import { GuideTable } from './GuideTable';
import { IndexColumn } from './IndexColumn';
import {
  categoryOpenedBy,
  OUTLINE_CATEGORIES,
  roleGroupId,
  sectionOf,
} from './outline';
import { PhoneNav } from './PhoneNav';
import { RoleTable } from './RoleTable';
import { Section } from './Section';
import { SegmentedToggleExample } from './SegmentedToggleExample';

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
 * real roles; the page itself uses roles only. The parts it is built from
 * (Section, Group, GuideTable, RoleTable, Example) live beside it, and every
 * section's id, title and intro come from outline.ts.
 */

const TYPOGRAPHY = sectionOf('typography');
const COLOUR = sectionOf('colour');
const BUTTONS = sectionOf('buttons');
const LINKS = sectionOf('links');
const NAVIGATION = sectionOf('navigation');

export default function StyleGuidePage() {
  return (
    // The site layout already provides <main>. Below lg the index column is
    // hidden, the content wrapper is display: contents, and the header's
    // phone navigation takes the index's place.
    <div className="mx-auto grid w-full max-w-(--breakpoint-2xl) gap-16 px-4 py-16 md:px-8 lg:flex lg:items-start lg:gap-12 lg:px-12">
      <IndexColumn />

      <div className="max-lg:contents lg:grid lg:min-w-0 lg:flex-1 lg:gap-16">
        <header>
          <PhoneNav
            categories={OUTLINE_CATEGORIES}
            className="mb-8 lg:hidden"
          />
          <h1 className={PAGE_TITLE}>Tina.io Style Guide</h1>
          <p className={`${BODY} mt-4 max-w-3xl`}>
            Use this page to pick the type role, colour and button level for
            anything on tina.io. Each example uses the same code as the live
            site.
          </p>
          <FrontDoor categories={OUTLINE_CATEGORIES} className="mt-12" />
        </header>

        <Section
          id={TYPOGRAPHY.id}
          title={TYPOGRAPHY.title}
          intro={TYPOGRAPHY.intro}
          label={categoryOpenedBy(TYPOGRAPHY.id)}
        >
          <Group id="typography-rules" title="The rules">
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
              id={roleGroupId(group.title)}
              title={group.title}
              intro={group.intro}
            >
              <RoleTable
                roles={group.roles}
                href={`#${roleGroupId(group.title)}`}
              />
            </Group>
          ))}

          <Group
            id="typography-exceptions"
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

        <Section id={COLOUR.id} title={COLOUR.title} intro={COLOUR.intro}>
          <Group
            id="text-colours"
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
            id="surfaces"
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
            <GuideTable
              columns={['Background', 'Surface', 'Use for']}
              widths={['w-5/12', 'w-1/6', 'w-5/12']}
              rows={PAGE_BACKGROUNDS.map((b) => ({
                key: b.label,
                cells: [
                  // bg-scroll shows the whole page background in the swatch,
                  // not the slice of the screen it happens to sit over.
                  <div
                    key="example"
                    className={`${b.mode ?? ''} ${SURFACE[b.name]} grid gap-1 rounded-xl bg-scroll p-6`}
                  >
                    <p className={CARD_TITLE}>{b.label}</p>
                    {PAGE_BACKGROUND_ROLES.map((role) => (
                      <p key={role} className={roleClass(role)}>
                        {role}
                      </p>
                    ))}
                  </div>,
                  <p key="name" className={CODE}>
                    SURFACE.{b.name}
                  </p>,
                  <p key="use" className={BODY_SMALL}>
                    {b.useFor}
                  </p>,
                ],
              }))}
            />
          </Group>

          <Group
            id="lines"
            title="Lines"
            intro="Put a LINE beside the border width and sides. Subtle for decoration, strong for anything you click or type in."
          >
            <GuideTable
              columns={['Example', 'Line', 'Use for']}
              widths={['w-1/6', 'w-1/4', 'w-7/12']}
              rows={LINE_GUIDE.map((l) => ({
                key: l.name,
                cells: [
                  <span
                    key="example"
                    className={`${LINE[l.name]} block size-10 rounded-md border-2`}
                  />,
                  <p key="name" className={CODE}>
                    LINE.{l.name}
                  </p>,
                  <p key="use" className={BODY_SMALL}>
                    {l.useFor}
                  </p>,
                ],
              }))}
            />
          </Group>

          <Group
            id="inks"
            title="Inks"
            intro="Put an INK on an icon, logo or dot that isn't text. An SVG takes it with fill-current or stroke-current. Text uses a type role instead."
          >
            <GuideTable
              columns={['Example', 'Ink', 'Use for']}
              widths={['w-1/6', 'w-1/4', 'w-7/12']}
              rows={INK_GUIDE.map((ink) => ({
                key: ink.name,
                cells: [
                  <Star
                    key="example"
                    aria-hidden
                    className={`${INK[ink.name]} size-6`}
                  />,
                  <p key="name" className={CODE}>
                    INK.{ink.name}
                  </p>,
                  <p key="use" className={BODY_SMALL}>
                    {ink.useFor}
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
              className={`${ON_DARK} ${SURFACE.footerBand} flex flex-wrap items-center gap-x-10 gap-y-4 rounded-xl bg-cover bg-center p-8`}
            >
              <span className={EYEBROW}>Product</span>
              <a className={FOOTER_LINK} href="#on-dark">
                Showcase
              </a>
              <span className={BODY_SMALL}>
                Join the herd for tips and news.
              </span>
              <input
                className={`${FIELD} ${SURFACE.fieldOnDark} h-10 rounded-sm border px-3`}
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
          id={BUTTONS.id}
          title={BUTTONS.title}
          intro={BUTTONS.intro}
          label={categoryOpenedBy(BUTTONS.id)}
        >
          <Group id="button-rules" title="The rules">
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
              <Button level="primary">Learn about TinaCMS</Button>
              <Button level="tertiary">Try the Editor</Button>
            </ButtonGroup>
          </Group>

          <Group
            id="buttons-on-dark"
            title="On dark"
            intro="Put ON_DARK on the orange or dark container and keep the normal levels inside. Primary turns white with an orange label; Tertiary turns into a white outline."
          >
            <div
              className={`${ON_DARK} ${SURFACE.footerBand} rounded-xl bg-cover bg-center p-8`}
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
            intro="Hover lifts 1px with a soft shadow, and pressing drops it back. Keyboard focus shows a 2px ink ring, near-white in dark mode (tab to it). Disabled is 60% with no hover."
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
            intro="ICON_BUTTON for close, copy, carousel arrows and search: a 44px tap area, a 20px icon at a 2px stroke, slate, with a light square on hover. In dark mode it takes the body ink and hovers to the well. White inside ON_DARK. Always add an aria-label."
          >
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={ICON_BUTTON} aria-label="Close">
                <X />
              </button>
              <button type="button" className={ICON_BUTTON} aria-label="Search">
                <Search />
              </button>
              <span
                className={`${ON_DARK} ${SURFACE.footerBand} inline-flex rounded-lg bg-cover p-1`}
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
            id="button-exceptions"
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

        {/* Links and navigation were one section: its old anchor wraps Links. */}
        <div id={LINKS.aliases?.[0]} className="scroll-mt-24">
          <Section id={LINKS.id} title={LINKS.title} intro={LINKS.intro}>
            <Group
              id="text-links"
              title="Text links"
              intro="TextLink for a standalone “Read more →”: SLUB in the link colour, underlined, always ending in the short arrow. No other arrow or icon. Inside a card that is itself the link, use as=&quot;span&quot;. Links inside a sentence are LINK."
            >
              <div className="flex flex-wrap items-center gap-8">
                <TextLink href="#text-links">Read more</TextLink>
                <TextLink href="#text-links">See all events</TextLink>
              </div>
            </Group>
            <Group
              id="social-links"
              title="Social links"
              intro="SocialLinks: button size in the neutral outline (white, a light slate border that darkens on hover), an ink label and each network’s own logo colour; in dark mode every logo is near-white. Not a button level, so a row of them needs no Primary."
            >
              <SocialLinks links={TINA_SOCIAL_LINKS} />
            </Group>
            <Group
              id="neutral-outline"
              title="Neutral outline"
              intro="NEUTRAL_OUTLINE: white with a light slate border that darkens on hover; in dark mode the card with the strong edge, lightening on hover. The command field, social links, the current page number and the post cards all wear it, so they read as one family next to the orange and blue buttons."
            >
              <div className={`${NEUTRAL_OUTLINE} max-w-sm rounded-lg p-4`}>
                <p className={BODY_SMALL}>Hover to see the border darken.</p>
              </div>
            </Group>
          </Section>
        </div>

        <Section
          id={NAVIGATION.id}
          title={NAVIGATION.title}
          intro={NAVIGATION.intro}
        >
          <Group
            id="pagination"
            title="Pagination"
            intro="Pagination for a list of pages: ink numbers and Previous / Next at button size, a light slate outline on hover, and the current page outlined. On phones only ‹ [3] › shows. At the end of a blog post, PostPagination shows ← Previous / Next → cards, the arrow on the label."
          >
            <Pagination
              currentPage={3}
              numPages={24}
              hrefFor={() => '#pagination'}
              labels={{
                pagination: 'Example pages',
                previous: 'Previous',
                next: 'Next',
                page: (page) => `Page ${page}`,
              }}
            />
            <PostPagination
              previous={{
                title: 'TinaCMS v4 is coming',
                slug: '#pagination',
              }}
              next={{
                title: 'Editorial Workflow for media',
                slug: '#pagination',
              }}
              labels={{ previous: 'Previous', next: 'Next' }}
            />
          </Group>
          <Group
            id="menus"
            title="Dropdown menus"
            intro="Nav menus are pale cyan (MENU_PANEL, MENU_ITEM); the starter menu under the command field is white (COMMAND_MENU, COMMAND_MENU_ITEM). In dark mode both are the card. Both open on hover or click, cross the gap under the trigger on padding, are hidden from the keyboard when closed (MENU_REVEAL), and close on Escape."
          >
            <div className="flex flex-wrap items-start gap-8">
              <ul className={`${MENU_PANEL} w-56`}>
                <li>
                  <a href="#menus" className={`${MENU_ITEM} ${NAV_MENU_LINK}`}>
                    Docs for TinaCMS
                  </a>
                </li>
                <li>
                  <a href="#menus" className={`${MENU_ITEM} ${NAV_MENU_LINK}`}>
                    Showcase
                  </a>
                </li>
              </ul>
              <ul className={`${COMMAND_MENU} w-56`}>
                <li>
                  <a
                    href="#menus"
                    className={`${COMMAND_MENU_ITEM} ${NAV_MENU_LINK}`}
                  >
                    Astro
                  </a>
                </li>
                <li>
                  <a
                    href="#menus"
                    className={`${COMMAND_MENU_ITEM} ${NAV_MENU_LINK}`}
                  >
                    Next.js
                  </a>
                </li>
              </ul>
            </div>
          </Group>
          <Group
            id="segmented-toggles"
            title="Segmented toggles"
            intro="SegmentedToggle: one choice from two or three short options, like Monthly / Annually. A frosted track with square corners, link-blue options, and a Secondary blue thumb that slides under the selected one. In dark mode the track is the card with the strong edge, and the options take the body ink. Each option is a pressed button."
          >
            <SegmentedToggleExample />
          </Group>
          <Group
            id="tabs"
            title="Tabs"
            intro="TAB_LIST and TAB on dark code panels: flat, the selected tab with a solid orange underline and the others at 70%. Use role=&quot;tablist&quot;, role=&quot;tab&quot; and aria-selected."
          >
            <div className={`${CODE_PANEL} rounded-md`}>
              <div role="tablist" className={`${TAB_LIST} px-2`}>
                <button type="button" role="tab" aria-selected className={TAB}>
                  Query
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  className={TAB}
                >
                  Response
                </button>
              </div>
              <div className="h-16" />
            </div>
          </Group>
          <Group
            id="command-field"
            title="Command field"
            intro="CodeButton: the npx command in the neutral outline (COMMAND role) with a flat orange copy block. Clicking copies the command and opens the starter menu, which is exactly as wide as the field."
          >
            <CodeButton
              label="npx create-tina-app@latest"
              className="w-fit"
              starterTemplates={[
                {
                  title: 'Astro',
                  icon: '/Starters/astro.svg',
                  link: 'https://app.tina.io/quickstart',
                },
                {
                  title: 'Next.js',
                  icon: '/Starters/next.js.svg',
                  link: 'https://app.tina.io/quickstart',
                },
              ]}
            />
          </Group>
        </Section>

        <p className={BODY_MUTED}>
          To change this guidance, edit components/styles/typography.guide.ts
          and components/styles/buttons.guide.ts.
        </p>
      </div>
    </div>
  );
}
