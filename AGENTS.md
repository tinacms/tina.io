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
- Magic Numbers are a big no no! i.e: text-[15px] is bad, use text-md for example. Another bad example is w-[14%] on a component... why 14%!? make it a standard
- to conditionally render html use {variable} && ( <...>) rather than {variable} ? <> : null 

## Typography

Text styles live in `components/styles/typography.ts`. The full reference, with every style rendered, is at `/design` (noindex).

- **Don't style text by hand.** Pick a role. A role sets font, size at every breakpoint, weight, line height, letter spacing, wrapping and colour, so never add `text-lg`, `font-bold`, `leading-*`, `tracking-*` or a text colour next to one. Add only layout classes (margin, alignment, width).
- **Plain elements are already right.** A bare `<p>`, `<li>` or `<blockquote>` inside `<main>` is body text; a bare `<h1>`–`<h6>` is IBM Plex Sans in the strong ink. Reach for a role only when you need something else.
- **The roles:**
  - `PAGE_TITLE`: the page's one `h1`, brand-orange gradient. Once per page.
  - `ARTICLE_TITLE`: page title for blog posts and legal pages (long titles).
  - `SECTION_TITLE`, `CARD_TITLE`, `SUB_HEADING`: section, card and in-copy headings.
  - `EYEBROW`: small uppercase label above a title.
  - `BODY`: any paragraph. `BODY_SMALL`: dense copy. `BODY_MUTED`: captions, dates, bylines and hints only, never a paragraph.
  - `CODE`: inline code, terminal output, file paths.
- **Colour follows the role, not the tag.** A plan name inside a card is `CARD_TITLE` even if it is an `h2`.
- **Fonts:** IBM Plex Sans for headings, Inter for reading text, IBM Plex Mono for code. IBM Plex Sans only ships at 600 and 500. Never use `font-bold` on it, or the browser fakes the weight.
- **Colours:** name semantic tokens (`text-heading`, `text-strong`, `text-body`, `text-subtle`), never palette shades (`text-orange-600`) or hex values. Tokens are defined in `app/global.css`: primitives → semantic tokens → roles.
- **Nothing fits?** Add a role to `typography.ts` and show it on `/design`. Don't hand-roll classes in a component.
- **Not covered yet:** text on dark backgrounds (footer, newsletter form). Those keep their own classes until there is an on-dark variant.



## CI Pipeline

PR checks (`.github/workflows/nodejs.yml`): install → build → lint → test → export → HTML validation. Requires TinaCMS secrets (`TINA_TOKEN`, `NEXT_PUBLIC_TINA_CLIENT_ID`, etc.).

## Contributing Notes

- Branch naming: `feature/your-feature-name` or `bugfix/your-bugfix-name`
- Commit `tina-lock.json` when TinaCMS schema changes
- Use TinaCMS visual editing (`/admin`) for content changes
- PRs require screenshots for UI changes
- Due to Vercel deployment constraints, maintainers may recreate changes on a new branch for testing
