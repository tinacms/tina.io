# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.
When making significant changes to the project, update this file to keep it accurate.

## Project Overview

Tina.io is the documentation, blog, and marketing website for [TinaCMS](https://github.com/tinacms/tinacms). It is a Next.js 14 (App Router) application with TinaCMS for content management, deployed on Vercel.

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
- **Styling:** Tailwind CSS 4 + shadcn/ui (new-york style)
- **Linting/Formatting:** Biome (single quotes, semicolons, 2-space indent, 80-char width)
- **Package Manager:** pnpm 9.6.0
- **Node:** 22.x (see `.nvmrc`)
- **Search:** Algolia (custom indexing via `indices/createIndices.ts`)

### Key Directories

- `app/` — Next.js App Router pages and API routes
- `components/` — React components organized by feature:
  - `blocks/` — TinaCMS block-editing components and their schemas
  - `tinaMarkdownComponents/` — Rich-text rendering and embedded MDX components
  - `DocumentNavigation/` — Docs sidebar navigation
  - `toc/` — Table of contents schema + generated components
  - `ui/` — Reusable utility components (shadcn/ui)
  - `layout/` — Page layout wrappers
- `content/` — TinaCMS-managed content (MDX/JSON). Subdirectories include `blog/`, `blog-zh/`, `docs/`, `docs-zh/`, `pages/`, navigation, footer, and settings
- `tina/` — TinaCMS configuration:
  - `config.ts` — Main Tina config (client ID, branch, search, media)
  - `schema.tsx` — Top-level schema combining collections
  - `collectionsSchema/` — Individual collection definitions (pages, docs, blogs, events, etc.)
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

Two locales: English (`en`, default) and Chinese (`zh`). Middleware handles locale detection/redirection. Content is maintained in parallel directories (`docs/` vs `docs-zh/`, `blog/` vs `blog-zh/`).

### TinaCMS Content Model

14 collections defined in `tina/collectionsSchema/`: Pages, Docs, Docs-ZH, Blogs, Blogs-ZH, Examples, Meeting Links, Navigation Bar, Events, Footer, Settings, What's New (TinaCMS/TinaCloud), Conference, Table of Contents. The generated `tina-lock.json` must be committed.

## Important Workflow Notes

- **After switching branches or changing TinaCMS schema files** (`tina/` directory), run `pnpm dev` to regenerate `tina-lock.json`. This is faster than a full build and keeps the TinaCMS schema in sync.
- **After editing any `.ts`, `.tsx`, `.js`, or `.jsx` files**, run `pnpm lint:fix` to auto-fix formatting and lint issues before committing.

## Coding Standards

- **Biome** is the sole linter/formatter — no ESLint or Prettier
- Single quotes, semicolons required, 2-space indent, LF line endings
- Use Tailwind classes over inline CSS or styled components
- Block statements required (no single-line `if` without braces)
- `noUnusedVariables: error`, `useOptionalChain: error`, `noArrayIndexKey: error`
- `noExplicitAny` and `noNonNullAssertion` are allowed (off)

## CI Pipeline

PR checks (`.github/workflows/nodejs.yml`): install → build → lint → test → export → HTML validation. Requires TinaCMS secrets (`TINA_TOKEN`, `NEXT_PUBLIC_TINA_CLIENT_ID`, etc.).

## Contributing Notes

- Branch naming: `feature/your-feature-name` or `bugfix/your-bugfix-name`
- Commit `tina-lock.json` when TinaCMS schema changes
- Use TinaCMS visual editing (`/admin`) for content changes
- PRs require screenshots for UI changes
- Due to Vercel deployment constraints, maintainers may recreate changes on a new branch for testing
