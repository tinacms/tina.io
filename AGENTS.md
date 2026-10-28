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

Every piece of text uses a type role. Role names live in `components/styles/typography.ts`; their specs are named utilities (`role-*`) in `styles/tailwind.css`; colour tokens are in `app/global.css`. The full set, rendered, with when-to-use rules, is the Tina.io Style Guide at `/design` (noindex), laid out like the SSW Figma style guide: one section per foundation (Typography, Colour; Buttons to come).

- **Use a role and nothing else for type.** A role sets font, size at every breakpoint, weight, line height, letter spacing, case and colour. Never add `text-sm`, `font-bold`, `font-ibm-plex`, `leading-*`, `tracking-*`, `uppercase`, `italic` or any text colour (`text-gray-*`, `text-white`, `text-[#…]`, inline `style={{ fontSize, color }}`) next to one, including `md:`/`hover:` variants. Add only layout classes (margin, padding, alignment, width, truncation).
- **Which role:**
  - Headings: `PAGE_TITLE` (the one h1, orange gradient), `ARTICLE_TITLE` (blog/legal titles), `SECTION_TITLE` (opens a band), `CARD_TITLE` (cards, tiers, prices, rich-text h1–h2), `SUB_HEADING` (headings in copy, names in grids, rich-text h3–h6), `QUOTE` (testimonials).
  - Labels: `EYEBROW` (SLUB: label above a title, table column headers, pills, step labels; short labels only, never names or sentences), `EYEBROW_LINK` (standalone “Read more →”), `LABEL` (chips, tags, table row labels and values, times).
  - Reading: `BODY` (paragraphs; a bare `<p>` in `<main>` already gets it), `BODY_SMALL` (dense copy, lists, descriptions), `BODY_MUTED` (dates, bylines, captions, units, hints; never a paragraph, never something clickable), `CAPTION` (fixed 14px notes: billing notes, addresses), `CODE` (code, terminal output, package names, versions, hashes).
  - Navigation and forms: `NAV_LINK`, `NAV_MENU_LINK`, `FOOTER_LINK`, `FOOTER_LEGAL_LINK`, `FIELD` (inputs, selects, text areas; 16px so phones don't zoom).
- **Search highlights:** `HIGHLIGHT` marks a matched term inside any role (brand tint and bold, size from the surrounding text).
- **Shimmer:** `SHIMMER` is a decorative sweep for short promo text (the homepage news banner). It keeps the role and takes its colours from the surface, so never add text colours to it.
- **Links:** `LINK` is the one class that combines with a role (`${BODY_SMALL} ${LINK}`). It adds link blue (`--text-link`, blue-700) and an underline and keeps the size around it. `TITLE_LINK` is for a heading that is a link (post titles in lists): `${CARD_TITLE} ${TITLE_LINK}` stays ink and turns link blue on hover. `SUBTLE_LINK` is for a standalone link that should stay quiet (the GitHub stars line in the top banner): it keeps the role's colour, has no underline and darkens to ink on hover. Never hand-write `hover:underline` or a hover colour on a heading.
- **Colour follows the surface, not the tag.**
  - On a dark or brand-orange container, put `ON_DARK` on the container and use the normal roles inside. Everything turns white; SLUB and footer legal links turn white at 75% (agreed below AA). Never write `text-white`.
  - On a chip, pill, badge or coloured table row, put a `SURFACE.*` (`neutral`, `brand`, `info`, `success`, `warning`, `neutralSolid`, `brandSolid`) on the element with the fill and give the text a role. The role picks up the paired ink. Never colour text on a fill by hand, and never put a fill colour on text without its surface.
  - Only the page title is orange. Section, card and sub headings are ink whatever their tag.
- **Rich text:** wrap markdown output in `RICH_TEXT` (`RichTextWrapper` and `DocsTextWrapper` already do). It maps bare `h1`–`h6`, `p`, `a`, `code`, `th`/`td` onto the roles. The styled-components stylesheets (`components/styles/RichText.tsx`, `DocsRichText.tsx`) hold spacing only; never put type in them.
- **Fonts:** IBM Plex Sans for headings and labels (only 600 `font-ibm-plex` and 500 `font-ibm-plex-medium` ship, so never `font-bold` on it), Inter for reading text, IBM Plex Mono for code. These come with the roles; don't name them in components.
- **Tokens:** components name roles, `SURFACE.*`, `ON_DARK` and `LINK` only, never colour tokens, palette shades or hex values. Primitives → semantic tokens → roles, each layer pointing only at the one before.
- **Nothing fits?** Add a role to `styles/tailwind.css` and `typography.ts`, show it on `/design`, then use it. Don't hand-roll classes in a component.
- **Agreed exceptions:** buttons (issue #4964); syntax-highlighting colours in code blocks and the homepage terminal; decorative terminal and code mockups use `CODE_ILLUSTRATION` (IBM Plex Mono 13px, a picture of code, never real code); data-driven brand colours (partner tiers); the recommended pricing plan's name and price (`CARD_TITLE_FEATURED`, CARD_TITLE in the orange gradient — nowhere else); icons, social icons and logos; the two-tone homepage headings (pending a team decision); TinaCMS admin field components.

## CI Pipeline

PR checks (`.github/workflows/nodejs.yml`): install → build → lint → test → export → HTML validation. Requires TinaCMS secrets (`TINA_TOKEN`, `NEXT_PUBLIC_TINA_CLIENT_ID`, etc.).

## Contributing Notes

- Branch naming: `feature/your-feature-name` or `bugfix/your-bugfix-name`
- Commit `tina-lock.json` when TinaCMS schema changes
- Use TinaCMS visual editing (`/admin`) for content changes
- PRs require screenshots for UI changes
- Due to Vercel deployment constraints, maintainers may recreate changes on a new branch for testing
