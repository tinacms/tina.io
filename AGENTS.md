# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.
When making significant changes to the project, update this file to keep it accurate.

## Project Overview

Tina.io is the marketing and blog website for [TinaCMS](https://github.com/tinacms/tinacms). It is a Next.js 14 (App Router) application with TinaCMS for content management, deployed on Vercel. The documentation lives in the separate [tinacms/docs](https://github.com/tinacms/docs) repo and is served under `tina.io/docs` and `tina.io/zh/docs` through the `DOCS_UPSTREAM_URL` rewrite in `next.config.js`.

## Common Commands

```bash
# Setup
cp .env.example .env
pnpm i

# Development (starts Next.js on :3000 and TinaCMS GraphQL on :4001)
pnpm dev

# Build
pnpm build          # RSS + TinaCMS build + Next.js build
pnpm export         # Static export

# Code quality
pnpm lint           # Biome check
pnpm lint:fix       # Biome check --write
pnpm format         # Biome format --write
pnpm type-check     # TypeScript type checking (tsc)

# Testing
pnpm test           # Jest (runs with --passWithNoTests)
pnpm test-watch     # Jest in watch mode

# Other
pnpm create-indices # Rebuild Algolia search indices
pnpm create-rss     # Regenerate RSS feeds
```

## Architecture

### Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **CMS:** TinaCMS 3.x — content is edited visually at `/admin`
- **Styling:** Tailwind CSS 4. shadcn/ui (new-york style) is available but not strictly required. For design guidance, refer to the [Tina.io Design Library on Figma](https://www.figma.com/design/qFedRo7Xsc9oexI2IoPbFG/Tina.io-Design-Library) (access via SharePoint if needed), or follow conventions from existing components.
- **Linting/Formatting:** Biome (single quotes, semicolons, 2-space indent, 80-char width)
- **Package Manager:** pnpm 9.6.0
- **Node:** 24.x (see `.nvmrc`)
- **Search:** Algolia (custom indexing via `indices/createIndices.ts`)

### Key Directories

- `app/` — Next.js App Router pages and API routes
- `components/` — React components organized by feature:
  - `blocks/` — TinaCMS block-editing components and their schemas
  - `tinaMarkdownComponents/` — Rich-text rendering and embedded MDX components
  - `search/` (blog search modal and the `/search` results page components)
  - `ui/` — Reusable utility components (shadcn/ui)
  - `layout/` — Page layout wrappers
- `content/` — TinaCMS-managed content (MDX/JSON). Subdirectories include `blog/`, `blog-zh/`, `pages/`, navigation, footer, and settings
- `tina/` — TinaCMS configuration:
  - `config.ts` — Main Tina config (client ID, branch, search, media)
  - `schema.tsx` — Top-level schema combining collections
  - `collectionsSchema/` — Individual collection definitions (pages, blogs, events, etc.)
- `utils/` — Utility functions
- `indices/` — Algolia search index generation
- `rss/` — RSS feed generation
- `data-api/` — GraphQL API layer

### TypeScript Path Aliases

Defined in `tsconfig.json`:

- `@/*` → `./src/*`
- `@/public/*` → `./public/*`
- `@/content/*` → `./content/*`
- `@/styles/*` → `./styles/*`
- `@/utils/*` → `./utils/*`
- `@/component/*` → `./components/*` (note: singular `component` — intentional to avoid conflict with Marquee component)

### TypeScript Configuration

Strict mode and strict null checks are both **off**. This is intentional for the project.

### Internationalization (i18n)

Two locales: English (`en`, default) and Chinese (`zh`). Middleware handles locale detection/redirection. Content is maintained in parallel directories (`blog/` vs `blog-zh/`).

### TinaCMS Content Model

12 collections defined in `tina/collectionsSchema/`: Pages, Blogs, Blogs-ZH, Examples, Meeting Links, Navigation Bar, Events, Footer, Settings, What's New (TinaCMS/TinaCloud), Conference. The generated `tina-lock.json` must be committed.

## Important Workflow Notes

- **After switching branches or changing any TinaCMS schema** — not just files under `tina/`, but also the block/collection templates imported into it (e.g. `components/blocks/**/*.template.ts`) — run `pnpm dev` to regenerate `tina-lock.json`, then commit it. This is faster than a full build and keeps the TinaCMS schema in sync. Note: some schema edits (e.g. adding a field `description`) don't change `tina-lock.json` but still alter the schema TinaCloud validates. Because TinaCloud only re-indexes a branch when `tina-lock.json` changes, such an edit makes the build fail with `ERR_CLOUD_CHECK_FAILED` ("local Tina schema doesn't match the remote") and it won't self-resolve. Force a re-index by making a whitespace change to `tina/tina-lock.json` (e.g. add a trailing newline), committing, and pushing — [per the TinaCloud troubleshooting docs](https://tina.io/docs/tinacloud/troubleshooting).
- **After editing any `.ts`, `.tsx`, `.js`, or `.jsx` files**, run `pnpm lint:fix` to auto-fix formatting and lint issues before committing.

## Coding Standards

- **Biome** is the sole linter/formatter — no ESLint or Prettier
- Prioritise rem measurements over px measurements 
- Modularity is good; if we can make something a **reusable** component - this makes code more easily maintainable and readable 
- Single quotes, semicolons required, 2-space indent, LF line endings
- ❗ Use Tailwind classes - DO NOT use inline styles, <style> or other
- Block statements required (no single-line `if` without braces)
- `noUnusedVariables: error`, `useOptionalChain: error`, `noArrayIndexKey: error`
- `noExplicitAny` and `noNonNullAssertion` are allowed (off)
- Magic Numbers are a big no no! i.e: text-[15px] is bad, for type use a role from `typography.ts` instead. Another bad example is w-[14%] on a component... why 14%!? make it a standard
- to conditionally render html use {variable} && ( <...>) rather than {variable} ? <> : null 

## Typography

Every piece of text uses one type role. Role names live in `components/styles/typography.ts`, their specs (`role-*` utilities) in `styles/tailwind.css`, colour tokens in `app/global.css`.

- **Picking a role or reviewing type:** read `components/styles/typography.guide.ts`. It lists every role with what it's for and which role to use instead, plus the agreed exceptions. The Tina.io Style Guide at `/design` (noindex) renders that file, so edit role guidance there.
- **A role plus layout classes, nothing else.** A role sets font, size at every breakpoint, weight, line height, letter spacing, case and colour; add only margin, padding, alignment, width and truncation beside it. Hard guardrail: no `text-sm`, `font-bold`, `font-ibm-plex`, `leading-*`, `tracking-*`, `uppercase`, `italic`, text colours (`text-gray-*`, `text-white`, `text-[#…]`) or inline `style={{ fontSize, color }}` next to a role, including `md:`/`hover:` variants.
- **Links:** `LINK`, `TITLE_LINK` and `SUBTLE_LINK` are the only classes that combine with a role (`${BODY_SMALL} ${LINK}`). Any hover effect on text comes from one of them.
- **Colour follows the surface:** on a dark or orange container, put `ON_DARK` on the container; on a chip, pill or coloured row, put a `SURFACE.*` on it. The roles inside recolour themselves. Only the page title is orange.
- **Rich text:** wrap markdown in `RICH_TEXT` (`RichTextWrapper` and `DocsTextWrapper` already do). The styled-components stylesheets `components/styles/RichText.tsx` and `DocsRichText.tsx` hold spacing only.
- **Fonts** come with the roles. IBM Plex Sans ships 500 and 600 only, so headings have no bold.
- **Tokens:** components name roles, `SURFACE.*` and `ON_DARK`, never colour tokens, palette shades or hex values. Primitives → semantic tokens → roles, each layer pointing only at the one before.
- **No role fits:** add one to `styles/tailwind.css`, `typography.ts` and `typography.guide.ts`, then use it.

## Buttons

Every button is one of three levels, all one size (#4964). Level names live in `components/styles/buttons.ts`, their specs (`btn`, `btn-primary`, `btn-secondary`, `btn-tertiary`, `icon-btn`) in `styles/tailwind.css`, colour tokens (`--button-*`) in `app/global.css`. Guidance and agreed exceptions are in `components/styles/buttons.guide.ts`, rendered at `/design`.

- **Use the components:** `Button`, `LinkButton` or `ModalButton` from `components/ui/Button.tsx` with `level="primary" | "secondary" | "tertiary"`. Hand-rolled buttons are only for the agreed exceptions.
- **Levels:** Primary (orange gradient) is the main action and leads a group; a section's only button is Primary. Tertiary (orange outline) always sits beside a Primary. Secondary (blue gradient) is for buttons that shouldn't compete, like the nav's My TinaCloud. Never put a Tertiary next to a Secondary: make the lead Primary.
- **Arrows:** buttons have none. Text links (“Read more →”) always end in the short arrow, and nothing else.
- **One size:** 44px tall, 8px corners, label width plus 24px each side, Plex SemiBold 16 (`BUTTON_LABEL`). Add only layout classes (margin, width, alignment) beside a button. No colour, radius, padding, height or type classes.
- **Groups:** `ButtonGroup` (or `BUTTON_GROUP`) stacks buttons full width on phones and puts them side by side from `sm`. The highest level comes first.
- **On dark or orange:** put `ON_DARK` on the container; Primary turns white with an orange label, Tertiary a white outline.
- **Dropdown menus:** nav menus use `MENU_PANEL` and `MENU_ITEM` (pale cyan); the npx starter menu uses `COMMAND_MENU` and `COMMAND_MENU_ITEM` (white, exactly as wide as the command field). Both come from `components/styles/menu.ts`, with `NAV_MENU_LINK` on the row text. Put the hover handlers on one parent around the trigger and the panel, bridge the gap with padding, wrap the panel in `MENU_REVEAL` with `data-state="open" | "closed"` (closed menus are hidden from the keyboard), and close it on Escape.
- **Icon-only buttons:** `ICON_BUTTON` (44px tap area, 20px icon, 2px stroke) and always an `aria-label`. Other clickable controls get `FOCUS_RING`. Never `outline-hidden`.
- **Text links aren't buttons:** a standalone “Read more →” is `TextLink` (`components/ui/TextLink.tsx`), which always draws the short arrow; pass `as="span"` inside a card that is itself the link. Links inside a sentence are `LINK`. Never hand-build a text link with `EYEBROW_LINK` and an icon.
- **Social links:** `SocialLinks` (`components/ui/SocialLinks.tsx`): button size in the neutral outline with brand-colour logos. Not a button level.
- **Pagination:** numbered list pages use `Pagination`; the end of a blog post uses `PostPagination` (“Previous post” / “Next post” cards). Both in `components/ui/Pagination.tsx`.
- **Tabs:** flat tabs on dark code panels use `TAB_LIST` and `TAB` from `components/styles/tabs.ts`, with `role="tablist"` / `role="tab"` and `aria-selected`.
- **Neutral outline:** white with a light slate border that darkens on hover (`neutral-outline`); the command field, social links, the current page number and post cards share it.
- **CMS:** the Actions `variant` and Modal Button `color` fields hold a level (`primary`, `secondary`, `tertiary`; Actions also `textLink`). New buttons default to Primary, and `levelOf()` treats anything that isn't a level as Primary. There are no shape, size, arrow or icon fields; don't add them back.
- **New level, piece or exception:** add the token to `app/global.css`, the spec to `styles/tailwind.css`, the name to `components/styles/*` (or a component in `components/ui`), a section on `/design`, and a line here, together.

## CI Pipeline

PR checks (`.github/workflows/nodejs.yml`): install → build → lint → test → export → HTML validation. Requires TinaCMS secrets (`TINA_TOKEN`, `NEXT_PUBLIC_TINA_CLIENT_ID`, etc.).

## Contributing Notes

- Branch naming: `feature/your-feature-name` or `bugfix/your-bugfix-name`
- Commit `tina-lock.json` when TinaCMS schema changes
- Use TinaCMS visual editing (`/admin`) for content changes
- PRs require screenshots for UI changes
- Due to Vercel deployment constraints, maintainers may recreate changes on a new branch for testing
