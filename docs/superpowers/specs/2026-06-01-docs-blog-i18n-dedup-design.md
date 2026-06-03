# Design: De-duplicate the Docs & Blog Route Trees (Tier 1 of i18n DRY cleanup)

- **Date:** 2026-06-01
- **PBI:** [tinacms/tina.io#3706 — 💸 Tech Debt – Massive DRY Violations](https://github.com/tinacms/tina.io/issues/3706)
- **Status:** Approved design, pending implementation plan

## Problem

The Chinese localization was implemented by **copying entire route trees**. `app/zh/docs/*`
and `app/zh/blog/*` are hand-forked clones of `app/docs/*` and `app/blog/*` — 12 file pairs in
total. A single change to docs or blog rendering must be made in two places, and in practice the
copies have already **drifted**: the two versions now behave differently in ways that look like
unintended regressions (see "Behavioral drift" below).

This design covers **Tier 1**: eliminate the duplicated *logic* by extracting locale-parameterized
shared modules, leaving each route file as a thin wrapper. It deliberately does **not** change URLs,
middleware, content folders, or the TinaCMS schema/collections.

### Explicitly out of scope (future work)

- **Tier 1b:** Collapsing the thin route wrappers into an `app/[locale]/...` segment with a
  middleware rewrite (the PBI's "native Next.js i18n" end-state). Tier 1 is the prerequisite that
  makes Tier 1b a small, isolated change.
- **Tier 2:** Merging the `doc`/`docZh` and `post`/`postZh` TinaCMS collections into single
  collections with locale subfolders. Requires a content migration (relativePath/reference/alias
  churn) and is not part of this work.

## Current state

- `middleware.ts` matcher is only `['/']`; it bounces the homepage to `/zh` based on locale cookie.
  It does **not** rewrite or prefix `/docs`, `/blog`, etc. English is served unprefixed; Chinese
  lives at hardcoded `/zh/...` paths linked from the nav.
- TinaCMS collections are separate per locale: `doc` → `content/docs`, `docZh` → `content/docs-zh`;
  `post` → `content/blog`, `postZh` → `content/blog-zh`. This yields distinct generated queries:
  `client.queries.doc` vs `docZh`, `postConnection` vs `postZhConnection`,
  `getExpandedPostDocument` vs `getExpandedPostZhDocument`. These stay as-is in Tier 1.
- Duplicated files (English ↔ Chinese):
  - Docs: `[...slug]/page.tsx`, `[...slug]/docs-client.tsx`, `doc-client.tsx`, `layout.tsx`,
    `page.tsx`, `toc-layout-client.tsx`
  - Blog: `page.tsx`, `[...slug]/page.tsx`, `[...slug]/BlogPageClient.tsx`, `[...slug]/BlogType.ts`,
    `page/[page_index]/page.tsx`, `page/[page_index]/BlogIndexPageClient.tsx`

## Behavioral drift found in the diffs

These differences exist **today** between the English and Chinese copies. The approved policy is
**reconcile everything to English**: English is the source of truth for all behavior and layout;
Chinese keeps only translated strings and locale-specific paths.

| Area | English (source of truth) | Chinese today | Resolution |
|---|---|---|---|
| Docs `generateMetadata` | older hand-built `canonicalUrl` block on `data.doc.seo` | newer `getSeo` + `getExcerpt` flow | **Unify to English's** `getSeo(data.<doc>.seo, ...)` flow for both, with locale-correct `canonicalUrl` prefix |
| Docs `generateStaticParams` | filters out `index.mdx` and the `/r` alias route | no filters | Apply English's filters to both locales |
| Docs client | renders `<GitHubMetadata>` | dropped it | Both render `<GitHubMetadata>` |
| Blog post client | uses `useTina` (live visual editing) | no `useTina` (static `data.post`) | Both use `useTina` — restores Chinese live editing |
| Blog post layout markup | inline date, `pt-6`, title `max-w-3xl` | stacked date, different padding, `max-w-[9em]` | Both use English markup |
| Blog index page strings/meta | English title/description/url | translated | Translated strings only; structure follows English |
| UI strings | "Last Edited", "Blog", `lang="en"` | "上次编辑", "博客", `lang="zh-CN"` | **Keep** — intentional locale difference, via string map |
| next/prev + index slug build | `.slice(7, -4)` | `.replace('docs-zh'→'zh/docs')` / `.replace('blog-zh'→'zh/blog')` | **Keep** — derive from locale (locale-specific path prefix) |

"Reconcile to English" means the resulting Chinese pages will change visually (blog layout, date
placement) and functionally (blog gains live editing) to match English. This requires visual QA on
the Chinese site and is called out as an intentional behavior change in the implementation plan.

## Architecture

For each surface (docs, blog), extract the logic into locale-parameterized modules. The `locale`
value (`'en' | 'zh'`) is the single input that drives every legitimate difference. Everything else
is English's implementation, shared verbatim.

### The one unavoidable branch: query selection

Because the collections are separate, the generated query functions and their result keys differ.
This is isolated into a single server-side data helper per surface that normalizes the result to a
locale-agnostic shape:

```ts
// utils/docs/getDocsPageData.ts  (illustrative)
export async function getDocsPageData(locale: Locale, slug: string) {
  const res = locale === 'zh'
    ? await client.queries.docZh({ relativePath: `${slug}.mdx` })
    : await client.queries.doc({ relativePath: `${slug}.mdx` });
  const document = locale === 'zh' ? res.data.docZh : res.data.doc; // normalized
  return { document, query: res.query, variables: res.variables, data: res.data };
}
```

Blog gets the analogous helper covering `postConnection`/`postZhConnection` and
`getExpandedPostDocument`/`getExpandedPostZhDocument`, normalizing `data.post` / `data.postZh`.

### Locale config

A small per-locale config object centralizes the mechanical values so they are not re-branched
everywhere:

```ts
// utils/i18n/routeConfig.ts (illustrative)
export const ROUTE_CONFIG = {
  en: { docsContentDir: './content/docs/',    blogContentDir: './content/blog/',
        pathPrefix: '',    docsCollectionSlug: 'docs',    blogCollectionSlug: 'blog',
        giscusLang: 'en' },
  zh: { docsContentDir: './content/docs-zh/', blogContentDir: './content/blog-zh/',
        pathPrefix: '/zh', docsCollectionSlug: 'docs-zh', blogCollectionSlug: 'blog-zh',
        giscusLang: 'zh-CN' },
} as const;
```

`canonicalUrl` becomes `${settings.siteUrl}${pathPrefix}/docs/...`; next/prev slug building uses
`docsCollectionSlug → ${pathPrefix}/docs` style replacement derived from config rather than
hardcoded literals.

### Translated UI strings

Follow the existing repo pattern (`content/not-found/{en,zh}.json` consumed via a `localeContent`
map). Add small string maps for the docs/blog surfaces ("Last Edited"/"上次编辑",
"Blog"/"博客", page-index titles/descriptions). The client components select strings by `locale` prop.

### Shared modules (proposed)

**Docs**
- `utils/docs/getDocsPageData(locale, slug)` — query + normalize (server)
- `utils/docs/generateDocsStaticParams(locale)` — glob + English filters (server)
- `utils/docs/generateDocsMetadata(locale, slug)` — unified `getSeo` flow (server)
- `components/docs/DocsClient` — single client component, `locale` prop (from `[...slug]/docs-client.tsx`)
- `components/docs/DocsLayout` — calls `getDocsNav(false, null, locale)` / `getLearnNav(..., locale)`
- Shared `toc-layout-client` and `doc-client` modules (currently near-identical / identical)

**Blog**
- `utils/blog/getBlogPageData(locale, slug)` and `utils/blog/getBlogIndexData(locale, pageIndex)` (server)
- `utils/blog/generateBlogStaticParams(locale)` / metadata helpers (server)
- `components/blog/BlogPageClient` — single client component, `locale` prop, uses `useTina`
- `components/blog/BlogIndexPageClient` — single client component, `locale` prop
- Shared `BlogType.ts`

(Final module names/locations to be settled in the implementation plan, following existing
`utils/` and `components/` conventions. Private colocated folders may use the `_`-prefix to stay out
of routing if colocation under `app/` is preferred.)

### Route files become thin wrappers

Each of the 12 route files reduces to a small wrapper that supplies `locale` and re-exports the
shared `generateStaticParams` / `generateMetadata`:

```tsx
// app/zh/docs/[...slug]/page.tsx
export const generateStaticParams = () => generateDocsStaticParams('zh');
export const generateMetadata = ({ params }) => generateDocsMetadata('zh', params.slug.join('/'));
export default DocsPage('zh'); // or a thin component that renders <DocsClient locale="zh" .../>
```

The English wrappers are identical except `'en'`. Routing, URLs, and the `app/zh/...` folder
locations are unchanged — only their contents shrink.

## Data flow

1. Next.js routes a request to the thin wrapper (e.g. `app/zh/docs/[...slug]/page.tsx`).
2. Wrapper calls the shared server helper with `locale='zh'`.
3. Helper picks the correct Tina query, fetches, and returns a normalized `{ document, query, variables }`.
4. Wrapper renders the shared client component with `locale` + the normalized data.
5. Client component uses `useTina` for live editing and selects translated strings / locale paths
   from the string map + route config.

## Error handling

- Preserve existing `notFound()` behavior on missing documents (English semantics applied to both).
- The query-selection branch is the only place the two collections are referenced; if a locale's
  query is missing data, the same `notFound()` path is taken.
- No new error surfaces are introduced; behavior matches the current English implementation.

## Testing / verification

- Build passes (`generateStaticParams` produces the same route set per locale as before, minus the
  now-filtered `index.mdx`/`/r` entries for zh which English already excluded).
- Manual/visual QA on the Chinese site for the intentional behavior changes: blog post layout,
  blog date placement, blog live editing (`useTina`), docs `GitHubMetadata`, docs metadata/SEO.
- Spot-check English pages are byte-equivalent in behavior (English is the source of truth, so it
  should be unchanged).
- Verify TinaCMS visual editing still works on both locales for docs and blog.

## Risks

- **Behavioral change on the Chinese site** (chosen "reconcile to English" policy) — mitigated by
  explicit QA checklist in the plan.
- **TinaCMS visual editing regressions** — the normalized `{ query, variables, data }` shape must be
  passed through to `useTina` unchanged so editing keeps working; verified during QA.
- **Static-param drift** — applying English's filters to zh changes which zh routes are generated;
  confirm no currently-live zh URL (e.g. a `docs-zh/index.mdx`) is dropped unintentionally.
