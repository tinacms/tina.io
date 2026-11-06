# Docs & Blog i18n Route De-duplication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate the duplicated logic in the forked `app/zh/docs/*` and `app/zh/blog/*` route trees by extracting locale-parameterized shared modules, leaving each route file as a thin `locale`-passing wrapper.

**Architecture:** English is the single source of truth for behavior and layout (per approved design). The `locale` value (`'en' | 'zh'`) drives only what must differ: which TinaCMS collection/query to hit, the content directory, the URL path prefix, translated UI strings, the `giscus` language, and locale-specific link-slug building. All rendering logic lives once in `components/docs/*`, `components/blog/*`, and `utils/{docs,blog,i18n}/*`. Route files under `app/docs`, `app/zh/docs`, `app/blog`, `app/zh/blog` shrink to thin wrappers. No URL, middleware, content-folder, or TinaCMS schema changes.

**Tech Stack:** Next.js App Router, TypeScript, TinaCMS (`tina/__generated__/client`, `useTina`), Jest (pure-util tests only), Biome (lint/format), `fast-glob`.

**Reference:** Design spec at `docs/superpowers/specs/2026-06-01-docs-blog-i18n-dedup-design.md`. PBI [#3706](https://github.com/tinacms/tina.io/issues/3706).

**Verification model:** This repo has Jest only for pure utilities (`utils/*.test.ts`); there is no component/route test harness. Therefore: pure helpers in Phase 0 are built with TDD (Jest). Server helpers, components, and route wrappers are verified with `pnpm type-check`, `pnpm lint`, `pnpm build`, and the manual visual-QA checklist in Phase 7. Do not fabricate component tests.

**Locale-vs-English policy (from the design's drift table):**
- Reconcile to English: docs `generateMetadata` (use the `getSeo(seo, {pageTitle, body})` flow), docs `generateStaticParams` filters (drop `index.mdx` and `/r`), docs `GitHubMetadata`, blog post `useTina` live editing, blog post layout markup, blog index page structure.
- Keep as locale difference: translated UI strings, `giscus` `lang`, and next/prev/index link-slug building (locale path prefix).

---

## File Structure

**New shared files:**
- `utils/i18n/localeRouteConfig.ts` — `Locale` type + per-locale config (content dirs, path prefix, content slug, giscus lang).
- `utils/i18n/buildLinkSlug.ts` — `buildDocLinkSlug` / `buildBlogLinkSlug` (pure, tested).
- `utils/i18n/uiStrings.ts` — per-locale UI string map for docs/blog (pure, tested).
- `utils/docs/getDocsDocument.ts` — locale-aware doc fetch, normalized return.
- `utils/docs/generateDocsStaticParams.ts` — locale-aware static params (English filters).
- `utils/docs/generateDocsMetadata.ts` — locale-aware docs metadata (English `getSeo` flow).
- `components/docs/DocsLayoutServer.tsx` — server component fetching nav by locale.
- `components/docs/DocsLayoutClient.tsx` — moved from `app/docs/toc-layout-client.tsx` (context provider + layout).
- `components/docs/DocsClient.tsx` — moved from `app/docs/[...slug]/docs-client.tsx`, `locale` prop.
- `components/docs/MainDocClient.tsx` — moved from `app/docs/doc-client.tsx`.
- `utils/blog/getBlogPost.ts` — locale-aware single-post fetch + `BlogPost` builder.
- `utils/blog/getBlogIndexPosts.ts` — locale-aware paginated index fetch.
- `utils/blog/generateBlogStaticParams.ts` — locale-aware blog static params.
- `components/blog/BlogType.ts` — moved from `app/blog/[...slug]/BlogType.ts`.
- `components/blog/BlogPageClient.tsx` — moved from `app/blog/[...slug]/BlogPageClient.tsx`, `locale` prop.
- `components/blog/BlogIndexPageClient.tsx` — moved from `app/blog/page/[page_index]/BlogIndexPageClient.tsx`, `locale` prop.

**Route files reduced to thin wrappers (kept in place):**
- Docs: `app/docs/layout.tsx`, `app/docs/page.tsx`, `app/docs/[...slug]/page.tsx` and the three `app/zh/docs/*` equivalents.
- Blog: `app/blog/page.tsx`, `app/blog/[...slug]/page.tsx`, `app/blog/page/[page_index]/page.tsx` and the three `app/zh/blog/*` equivalents.

**Deleted after extraction:** `app/docs/toc-layout-client.tsx`, `app/docs/doc-client.tsx`, `app/docs/[...slug]/docs-client.tsx`, `app/zh/docs/toc-layout-client.tsx`, `app/zh/docs/doc-client.tsx`, `app/zh/docs/[...slug]/docs-client.tsx`, `app/blog/[...slug]/BlogPageClient.tsx`, `app/blog/[...slug]/BlogType.ts`, `app/blog/page/[page_index]/BlogIndexPageClient.tsx`, `app/zh/blog/[...slug]/BlogPageClient.tsx`, `app/zh/blog/[...slug]/BlogType.ts`, `app/zh/blog/page/[page_index]/BlogIndexPageClient.tsx`.

---

## Phase 0 — Shared i18n foundation (TDD)

### Task 0.1: Locale route config

**Files:**
- Create: `utils/i18n/localeRouteConfig.ts`

- [ ] **Step 1: Create the config module**

```ts
// utils/i18n/localeRouteConfig.ts
export type Locale = 'en' | 'zh';

export interface LocaleRouteConfig {
  /** Directory globbed for static params, e.g. './content/docs/' */
  docsContentDir: string;
  blogContentDir: string;
  /** URL prefix: '' for English, '/zh' for Chinese */
  pathPrefix: string;
  /** Path segment inside Tina document ids, e.g. 'docs' or 'docs-zh' */
  docsContentSlug: string;
  blogContentSlug: string;
  /** Public URL segment the content slug maps to, e.g. 'docs' or 'zh/docs' */
  docsUrlSlug: string;
  blogUrlSlug: string;
  /** giscus comment widget language */
  giscusLang: string;
}

export const LOCALE_ROUTE_CONFIG: Record<Locale, LocaleRouteConfig> = {
  en: {
    docsContentDir: './content/docs/',
    blogContentDir: './content/blog/',
    pathPrefix: '',
    docsContentSlug: 'docs',
    blogContentSlug: 'blog',
    docsUrlSlug: 'docs',
    blogUrlSlug: 'blog',
    giscusLang: 'en',
  },
  zh: {
    docsContentDir: './content/docs-zh/',
    blogContentDir: './content/blog-zh/',
    pathPrefix: '/zh',
    docsContentSlug: 'docs-zh',
    blogContentSlug: 'blog-zh',
    docsUrlSlug: 'zh/docs',
    blogUrlSlug: 'zh/blog',
    giscusLang: 'zh-CN',
  },
};
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS (no new errors).

- [ ] **Step 3: Commit**

```bash
git add utils/i18n/localeRouteConfig.ts
git commit -m "feat(i18n): add locale route config for docs/blog dedup"
```

### Task 0.2: Link-slug builders (pure, TDD)

These replace the inline `id.slice(7, -4)` / `.replace(...)` logic. The Tina `id` looks like `content/docs/foo.mdx` or `content/docs-zh/foo.mdx`. `.slice(7, -4)` strips the leading `content` and trailing `.mdx`, yielding `/docs/foo` or `/docs-zh/foo`. For `zh`, the content slug is rewritten to the URL slug and a trailing `/index` is dropped (preserving current zh behavior). English keeps its exact current output.

**Files:**
- Create: `utils/i18n/buildLinkSlug.ts`
- Test: `utils/i18n/buildLinkSlug.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// utils/i18n/buildLinkSlug.test.ts
import { buildBlogLinkSlug, buildDocLinkSlug } from './buildLinkSlug';

describe('buildDocLinkSlug', () => {
  it('returns the English slug unchanged from a doc id', () => {
    expect(buildDocLinkSlug('content/docs/setup/install.mdx', 'en')).toBe(
      '/docs/setup/install',
    );
  });

  it('rewrites the zh content slug to the zh url slug', () => {
    expect(buildDocLinkSlug('content/docs-zh/setup/install.mdx', 'zh')).toBe(
      '/zh/docs/setup/install',
    );
  });

  it('drops a trailing /index for zh', () => {
    expect(buildDocLinkSlug('content/docs-zh/setup/index.mdx', 'zh')).toBe(
      '/zh/docs/setup',
    );
  });

  it('returns empty string for a missing id', () => {
    expect(buildDocLinkSlug(undefined, 'en')).toBe('');
  });
});

describe('buildBlogLinkSlug', () => {
  it('returns the English slug unchanged', () => {
    expect(buildBlogLinkSlug('content/blog/hello-world.mdx', 'en')).toBe(
      '/blog/hello-world',
    );
  });

  it('rewrites the zh blog slug', () => {
    expect(buildBlogLinkSlug('content/blog-zh/hello-world.mdx', 'zh')).toBe(
      '/zh/blog/hello-world',
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest utils/i18n/buildLinkSlug.test.ts`
Expected: FAIL — `Cannot find module './buildLinkSlug'`.

- [ ] **Step 3: Implement**

```ts
// utils/i18n/buildLinkSlug.ts
import { LOCALE_ROUTE_CONFIG, type Locale } from './localeRouteConfig';

/** Strip the leading "content" prefix (7 chars) and trailing ".mdx" (4 chars). */
function stripContentWrapper(id: string): string {
  return id.slice(7, -4);
}

export function buildDocLinkSlug(
  id: string | undefined,
  locale: Locale,
): string {
  if (!id) {
    return '';
  }
  let slug = stripContentWrapper(id);
  if (locale === 'zh') {
    const cfg = LOCALE_ROUTE_CONFIG.zh;
    slug = slug.replace(cfg.docsContentSlug, cfg.docsUrlSlug);
    if (slug.endsWith('/index')) {
      slug = slug.substring(0, slug.length - '/index'.length);
    }
  }
  return slug;
}

export function buildBlogLinkSlug(
  id: string | undefined,
  locale: Locale,
): string {
  if (!id) {
    return '';
  }
  let slug = stripContentWrapper(id);
  if (locale === 'zh') {
    const cfg = LOCALE_ROUTE_CONFIG.zh;
    slug = slug.replace(cfg.blogContentSlug, cfg.blogUrlSlug);
  }
  return slug;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm jest utils/i18n/buildLinkSlug.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add utils/i18n/buildLinkSlug.ts utils/i18n/buildLinkSlug.test.ts
git commit -m "feat(i18n): add tested locale link-slug builders"
```

### Task 0.3: UI string map (pure, TDD)

**Files:**
- Create: `utils/i18n/uiStrings.ts`
- Test: `utils/i18n/uiStrings.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// utils/i18n/uiStrings.test.ts
import { getUiStrings } from './uiStrings';

describe('getUiStrings', () => {
  it('returns English strings', () => {
    const s = getUiStrings('en');
    expect(s.docs.lastEdited).toBe('Last Edited');
    expect(s.blogIndex.heading).toBe('Blog');
    expect(s.blogIndex.pageSuffix(2)).toBe(' - Page 2');
    expect(s.blogIndex.metaTitle(2)).toBe('TinaCMS Blog - Page 2');
  });

  it('returns Chinese strings', () => {
    const s = getUiStrings('zh');
    expect(s.docs.lastEdited).toBe('上次编辑');
    expect(s.blogIndex.heading).toBe('博客');
    expect(s.blogIndex.pageSuffix(2)).toBe(' - 第2页');
    expect(s.blogIndex.metaTitle(2)).toBe('TinaCMS 博客 - 第 2 页');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm jest utils/i18n/uiStrings.test.ts`
Expected: FAIL — `Cannot find module './uiStrings'`.

- [ ] **Step 3: Implement**

```ts
// utils/i18n/uiStrings.ts
import type { Locale } from './localeRouteConfig';

export interface UiStrings {
  docs: {
    lastEdited: string;
  };
  blogPost: {
    lastEdited: string;
  };
  blogIndex: {
    heading: string;
    pageSuffix: (pageIndex: number) => string;
    metaTitle: (pageIndex: number) => string;
    metaDescription: string;
  };
}

const STRINGS: Record<Locale, UiStrings> = {
  en: {
    docs: { lastEdited: 'Last Edited' },
    blogPost: { lastEdited: 'Last Edited' },
    blogIndex: {
      heading: 'Blog',
      pageSuffix: (pageIndex) => (pageIndex > 1 ? ` - Page ${pageIndex}` : ''),
      metaTitle: (pageIndex) => `TinaCMS Blog - Page ${pageIndex}`,
      metaDescription:
        'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    },
  },
  zh: {
    docs: { lastEdited: '上次编辑' },
    blogPost: { lastEdited: 'Last Edited' },
    blogIndex: {
      heading: '博客',
      pageSuffix: (pageIndex) => (pageIndex > 1 ? ` - 第${pageIndex}页` : ''),
      metaTitle: (pageIndex) => `TinaCMS 博客 - 第 ${pageIndex} 页`,
      metaDescription:
        '关注 TinaCMS 博客，获取内容管理和开发的技巧、指南和最新资讯',
    },
  },
};

export function getUiStrings(locale: Locale): UiStrings {
  return STRINGS[locale];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm jest utils/i18n/uiStrings.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add utils/i18n/uiStrings.ts utils/i18n/uiStrings.test.ts
git commit -m "feat(i18n): add tested per-locale UI string map"
```

---

## Phase 1 — Docs server helpers

### Task 1.1: `getDocsDocument`

Isolates the only mandatory query branch (`doc` vs `docZh`) and normalizes the result so callers are locale-agnostic.

**Files:**
- Create: `utils/docs/getDocsDocument.ts`

- [ ] **Step 1: Implement**

```ts
// utils/docs/getDocsDocument.ts
import client from 'tina/__generated__/client';
import type { Locale } from 'utils/i18n/localeRouteConfig';

/**
 * Fetch a docs document for the given locale and normalize the result.
 * `document` is the locale-agnostic doc node; `query`/`variables`/`data`
 * are passed through verbatim so the client component can call useTina.
 */
export async function getDocsDocument(locale: Locale, slug: string) {
  const relativePath = `${slug}.mdx`;
  const res =
    locale === 'zh'
      ? await client.queries.docZh({ relativePath })
      : await client.queries.doc({ relativePath });
  const document = locale === 'zh' ? res.data.docZh : res.data.doc;
  return {
    document,
    data: res.data,
    query: res.query,
    variables: res.variables,
  };
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add utils/docs/getDocsDocument.ts
git commit -m "feat(docs): add locale-aware getDocsDocument helper"
```

### Task 1.2: `generateDocsStaticParams`

Applies the English filters (drop `index.mdx`, drop the `/r` alias route) to both locales.

**Files:**
- Create: `utils/docs/generateDocsStaticParams.ts`

- [ ] **Step 1: Implement**

```ts
// utils/docs/generateDocsStaticParams.ts
import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';

export async function generateDocsStaticParams(locale: Locale) {
  try {
    const contentDir = LOCALE_ROUTE_CONFIG[locale].docsContentDir;
    const files = await glob(`${contentDir}**/*.mdx`);
    return files
      .filter((file) => !file.endsWith('index.mdx'))
      .map((file) => {
        const path = file.substring(contentDir.length, file.length - 4);
        return { slug: path.split('/') };
      })
      .filter((params) => params.slug[0] !== 'r');
  } catch (error) {
    console.error(error);
    notFound();
  }
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add utils/docs/generateDocsStaticParams.ts
git commit -m "feat(docs): add locale-aware generateDocsStaticParams"
```

### Task 1.3: `generateDocsMetadata`

Uses the English `getSeo(seo, { pageTitle, body })` flow for both locales, with a locale-correct `canonicalUrl` prefix.

**Files:**
- Create: `utils/docs/generateDocsMetadata.ts`

- [ ] **Step 1: Implement**

```ts
// utils/docs/generateDocsMetadata.ts
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';
import { getDocsDocument } from './getDocsDocument';

export async function generateDocsMetadata(locale: Locale, slug: string) {
  const { document } = await getDocsDocument(locale, slug);
  const prefix = LOCALE_ROUTE_CONFIG[locale].pathPrefix; // '' or '/zh'
  const canonicalUrl = `${settings.siteUrl}${prefix}/docs${
    slug === 'index' ? '' : `/${slug}`
  }`;

  if (!document.seo) {
    document.seo = {
      __typename: 'DocSeo',
      canonicalUrl,
    };
  } else if (!document.seo.canonicalUrl) {
    document.seo.canonicalUrl = canonicalUrl;
  }

  return getSeo(document.seo, {
    pageTitle: document.title,
    body: document.body,
  });
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS. If the `docZh.seo.__typename` literal type differs from `'DocSeo'`, cast the assigned object `as typeof document.seo` to satisfy the union; record the cast in the commit body.

- [ ] **Step 3: Commit**

```bash
git add utils/docs/generateDocsMetadata.ts
git commit -m "feat(docs): add locale-aware generateDocsMetadata (English getSeo flow)"
```

---

## Phase 2 — Docs shared components

### Task 2.1: Move `DocsLayoutClient` to shared location

The English `app/docs/toc-layout-client.tsx` is the source of truth. Move it verbatim to `components/docs/DocsLayoutClient.tsx`; all its imports are absolute (`components/Docs/...`) so they survive the move unchanged.

**Files:**
- Create: `components/docs/DocsLayoutClient.tsx`

- [ ] **Step 1: Create the file with the English content**

```tsx
// components/docs/DocsLayoutClient.tsx
'use client';

import {
  DocsNavigationProvider,
  useDocsNavigation,
} from 'components/Docs/DocsNavigationContext';
import { LeftHandSideParentContainer } from 'components/Docs/docsSearch/SearchNavigation';

// biome-ignore lint/style/useImportType: <TODO>
import React, { createContext, useContext } from 'react';

type NavigationDataContextType = {
  NavigationDocsData: any;
  NavigationLearnData: any;
};

const NavigationDataContext = createContext<NavigationDataContextType>({
  NavigationDocsData: {},
  NavigationLearnData: {},
});

export const useNavigationData = () => useContext(NavigationDataContext);

export default function DocsLayoutClient({
  children,
  NavigationDocsData,
  NavigationLearnData,
}: {
  children: React.ReactNode;
  NavigationDocsData: any;
  NavigationLearnData: any;
}) {
  return (
    <DocsNavigationProvider>
      <NavigationDataContext.Provider
        value={{ NavigationDocsData, NavigationLearnData }}
      >
        <DocsLayoutContent>{children}</DocsLayoutContent>
      </NavigationDataContext.Provider>
    </DocsNavigationProvider>
  );
}

function DocsLayoutContent({ children }: { children: React.ReactNode }) {
  const { learnActive, setLearnActive } = useDocsNavigation();
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();

  return (
    <div className="relative my-6 lg:mb-16 xl:mt-16 flex justify-center items-start">
      <div
        className={`xl:px-16 md:px-8 px-3 w-full max-w-[2000px] grid grid-cols-1 md:grid-cols-[1.25fr_3fr] xl:grid-cols-[1.25fr_3fr_0.75fr]`}
      >
        <div className={`sticky top-32 h-[calc(100vh)] hidden md:block`}>
          <LeftHandSideParentContainer
            tableOfContents={NavigationDocsData?.data}
            tableOfContentsLearn={NavigationLearnData?.data}
            learnActive={learnActive}
            setLearnActive={setLearnActive}
          />
        </div>
        <div className="col-span-2 md:col-span-1 xl:col-span-2">{children}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/docs/DocsLayoutClient.tsx
git commit -m "refactor(docs): extract shared DocsLayoutClient"
```

### Task 2.2: Create shared `DocsClient` with `locale` prop

Source of truth is the English `app/docs/[...slug]/docs-client.tsx`. Changes from the English original: (1) import `useNavigationData` from `./DocsLayoutClient`; (2) accept a `locale` prop; (3) read the doc node via locale (`data.docZh` for zh); (4) build next/prev slugs via `buildDocLinkSlug`; (5) the "Last Edited" label comes from `getUiStrings`. Everything else (including `GitHubMetadata`) is the English layout verbatim.

**Files:**
- Create: `components/docs/DocsClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/docs/DocsClient.tsx
'use client';

import { useDocsNavigation } from 'components/Docs/DocsNavigationContext';
import MainDocsBodyHeader from 'components/Docs/docsMain/docsMainBody';
import TocOverflowButton from 'components/Docs/docsMain/tocOverflowButton';
import ToC from 'components/Docs/toc';
import { useTocListener } from 'components/Docs/toc_helper';
import { GitHubMetadata } from 'components/PageMetadata';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
import { useCallback, useEffect, useState } from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from '@/utils/formatDate';
import { buildDocLinkSlug } from 'utils/i18n/buildLinkSlug';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';
import { useNavigationData } from './DocsLayoutClient';

export default function DocsClient({
  props,
  locale,
}: {
  props: any;
  locale: Locale;
}) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();
  const { PageTableOfContents } = props;
  const DocumentationData = locale === 'zh' ? data.docZh : data.doc;
  const strings = getUiStrings(locale);

  const { learnActive, setLearnActive } = useDocsNavigation();
  const [_isLearnDocument, setIsLearnDocument] = useState(learnActive);

  const { activeIds, contentRef } = useTocListener(DocumentationData);

  const previousPage = {
    slug: buildDocLinkSlug(DocumentationData?.previous?.id, locale),
    title: DocumentationData?.previous?.title,
  };

  const nextPage = {
    slug: buildDocLinkSlug(DocumentationData?.next?.id, locale),
    title: DocumentationData?.next?.title,
  };

  const checkLearn = useCallback(
    (callback: (value: boolean) => void) => {
      const filepath = DocumentationData?.id;
      if (filepath) {
        const slug = `${filepath.substring(7, filepath.length - 4)}/`;
        const recurseItems = (items: any[]) => {
          items?.forEach((item) => {
            if (item.items) {
              recurseItems(item.items);
            } else if (item.slug === slug) {
              callback(true);
            }
          });
        };
        recurseItems(NavigationLearnData?.data);
      }
    },
    [DocumentationData?.id, NavigationLearnData?.data],
  );

  useEffect(() => {
    checkLearn(setIsLearnDocument);
  }, [checkLearn]);

  useEffect(() => {
    checkLearn(setLearnActive);
  }, [checkLearn, setLearnActive]);

  const lastEdited = DocumentationData?.last_edited;
  const formattedDate = formatDate(lastEdited);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_0.5fr] xl:grid-cols-[3fr_0.25fr]">
      <div
        className={`mx-1 md:mx-8 max-w-full overflow-hidden break-words px-1 col-span-2 ${
          !DocumentationData?.tocIsHidden ? 'xl:col-span-1' : ''
        }`}
      >
        <MainDocsBodyHeader
          DocumentTitle={DocumentationData?.title}
          NavigationDocsItems={NavigationDocsData.data}
          learnActive={learnActive}
          setLearnActive={setLearnActive}
          NavigationLearnItems={NavigationLearnData?.data}
        />
        <GitHubMetadata path={DocumentationData?.id} className="mt-2" />
        <div className="block xl:hidden">
          <TocOverflowButton tocData={PageTableOfContents} />
        </div>
        <div
          ref={contentRef}
          className="pb-6 leading-7 text-slate-800 max-w-full space-y-3 mt-6 text-lg"
        >
          {' '}
          <TinaMarkdown
            content={DocumentationData?.body}
            components={docAndBlogComponents}
          />
        </div>

        {formattedDate && (
          <span className="text-slate-500 text-md">
            {' '}
            {strings.docs.lastEdited}: {formattedDate}
          </span>
        )}
        <DocsPagination prevPage={previousPage} nextPage={nextPage} />
      </div>
      {DocumentationData?.tocIsHidden ? null : (
        <div className={`sticky top-32 h-[calc(100vh)] hidden xl:block`}>
          <ToC
            tocItems={PageTableOfContents}
            activeId={activeIds[activeIds.length - 1] || ''}
          />
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/docs/DocsClient.tsx
git commit -m "refactor(docs): extract shared DocsClient with locale prop"
```

### Task 2.3: Create shared `MainDocClient` (index page wrapper)

Source: English `app/docs/doc-client.tsx`. Add a `locale` prop threaded to `DocsClient`; import siblings from `./`.

**Files:**
- Create: `components/docs/MainDocClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/docs/MainDocClient.tsx
'use client';

import { TinaClient } from 'app/tina-client';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import DocsClient from './DocsClient';
import { useNavigationData } from './DocsLayoutClient';

export default function MainDocClient({
  props,
  locale,
}: {
  props: any;
  locale: Locale;
}) {
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();

  return (
    <TinaClient
      Component={DocsClient}
      props={{
        props: { ...props, NavigationDocsData, NavigationLearnData },
        locale,
      }}
    />
  );
}
```

> Note: `TinaClient` renders `<Component {...props} />`. `DocsClient` expects `{ props, locale }`, so the `props` passed to `TinaClient` is the full prop object for `DocsClient`. Verify against `app/tina-client.tsx` in Step 2; if `TinaClient` spreads differently, match its contract (the English original passed a flat object because the old `DocsClient` destructured `{ props }` only).

- [ ] **Step 2: Read `app/tina-client.tsx` and confirm prop spreading**

Run: `sed -n '1,60p' app/tina-client.tsx`
Expected: confirm how `props` is forwarded to `Component`. Adjust the `props={...}` shape above so `DocsClient` receives `{ props: {...}, locale }`. Type-check after.

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/docs/MainDocClient.tsx
git commit -m "refactor(docs): extract shared MainDocClient with locale prop"
```

### Task 2.4: Create shared `DocsLayoutServer`

Replaces the duplicated `layout.tsx` bodies. Calls `getDocsNav`/`getLearnNav` with the locale.

**Files:**
- Create: `components/docs/DocsLayoutServer.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/docs/DocsLayoutServer.tsx
import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import DocsLayoutClient from './DocsLayoutClient';

export default async function DocsLayoutServer({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const lang = locale === 'zh' ? 'zh' : undefined; // English passes undefined today
  const [navDocData, navLearnData] = await Promise.all([
    getDocsNav(false, null, lang),
    getLearnNav(false, null, lang),
  ]);

  return (
    <DocsLayoutClient
      NavigationDocsData={navDocData}
      NavigationLearnData={navLearnData}
    >
      {children}
    </DocsLayoutClient>
  );
}
```

> The English layout calls `getDocsNav()` (no args); the zh layout calls `getDocsNav(false, null, 'zh')`. Passing `undefined` as `lang` for English reproduces the no-arg behavior because `getDocsNav(preview?, _previewData?, lang?)` only branches on `lang === 'zh'`.

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add components/docs/DocsLayoutServer.tsx
git commit -m "refactor(docs): extract shared DocsLayoutServer"
```

---

## Phase 3 — Docs thin route wrappers

### Task 3.1: English docs route wrappers

**Files:**
- Modify: `app/docs/layout.tsx`
- Modify: `app/docs/page.tsx`
- Modify: `app/docs/[...slug]/page.tsx`

- [ ] **Step 1: Replace `app/docs/layout.tsx`**

```tsx
// app/docs/layout.tsx
import DocsLayoutServer from 'components/docs/DocsLayoutServer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutServer locale="en">{children}</DocsLayoutServer>;
}
```

- [ ] **Step 2: Replace `app/docs/[...slug]/page.tsx`**

```tsx
// app/docs/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import getTableOfContents from 'utils/docs/getTableOfContents';
import DocsClient from 'components/docs/DocsClient';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { generateDocsStaticParams } from 'utils/docs/generateDocsStaticParams';
import { getDocsDocument } from 'utils/docs/getDocsDocument';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateDocsStaticParams('en');
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generateDocsMetadata('en', params.slug.join('/'));
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'en',
      slug,
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    const props = {
      query,
      variables,
      data,
      PageTableOfContents,
      DocumentationData: document,
    };
    return <DocsClient props={props} locale="en" />;
  } catch (error) {
    console.error('Found an error catching data:', error);
    return notFound();
  }
}
```

- [ ] **Step 3: Replace `app/docs/page.tsx`**

```tsx
// app/docs/page.tsx
import { notFound } from 'next/navigation';
import getTableOfContents from 'utils/docs/getTableOfContents';
import MainDocClient from 'components/docs/MainDocClient';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { getDocsDocument } from 'utils/docs/getDocsDocument';

export function generateMetadata() {
  return generateDocsMetadata('en', 'index');
}

export default async function DocsPage() {
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'en',
      'index',
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    return (
      <MainDocClient
        props={{
          query,
          variables,
          data,
          PageTableOfContents,
          DocumentationData: document,
        }}
        locale="en"
      />
    );
  } catch (_error) {
    notFound();
  }
}
```

- [ ] **Step 4: Type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/docs/layout.tsx app/docs/page.tsx "app/docs/[...slug]/page.tsx"
git commit -m "refactor(docs): reduce English docs routes to thin wrappers"
```

### Task 3.2: Chinese docs route wrappers + delete forks

**Files:**
- Modify: `app/zh/docs/layout.tsx`
- Modify: `app/zh/docs/page.tsx`
- Modify: `app/zh/docs/[...slug]/page.tsx`
- Delete: `app/docs/toc-layout-client.tsx`, `app/docs/doc-client.tsx`, `app/docs/[...slug]/docs-client.tsx`, `app/zh/docs/toc-layout-client.tsx`, `app/zh/docs/doc-client.tsx`, `app/zh/docs/[...slug]/docs-client.tsx`

- [ ] **Step 1: Replace `app/zh/docs/layout.tsx`**

```tsx
// app/zh/docs/layout.tsx
import DocsLayoutServer from 'components/docs/DocsLayoutServer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutServer locale="zh">{children}</DocsLayoutServer>;
}
```

- [ ] **Step 2: Replace `app/zh/docs/[...slug]/page.tsx`** (identical to English wrapper but `'zh'`)

```tsx
// app/zh/docs/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import getTableOfContents from 'utils/docs/getTableOfContents';
import DocsClient from 'components/docs/DocsClient';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { generateDocsStaticParams } from 'utils/docs/generateDocsStaticParams';
import { getDocsDocument } from 'utils/docs/getDocsDocument';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateDocsStaticParams('zh');
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generateDocsMetadata('zh', params.slug.join('/'));
}

export default async function DocPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = params.slug.join('/');
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'zh',
      slug,
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    const props = {
      query,
      variables,
      data,
      PageTableOfContents,
      DocumentationData: document,
    };
    return <DocsClient props={props} locale="zh" />;
  } catch (error) {
    console.error('Found an error catching data:', error);
    return notFound();
  }
}
```

- [ ] **Step 3: Replace `app/zh/docs/page.tsx`** (identical to English index wrapper but `'zh'`)

```tsx
// app/zh/docs/page.tsx
import { notFound } from 'next/navigation';
import getTableOfContents from 'utils/docs/getTableOfContents';
import MainDocClient from 'components/docs/MainDocClient';
import { generateDocsMetadata } from 'utils/docs/generateDocsMetadata';
import { getDocsDocument } from 'utils/docs/getDocsDocument';

export function generateMetadata() {
  return generateDocsMetadata('zh', 'index');
}

export default async function DocsPage() {
  try {
    const { document, data, query, variables } = await getDocsDocument(
      'zh',
      'index',
    );
    const PageTableOfContents = getTableOfContents(document.body.children);
    return (
      <MainDocClient
        props={{
          query,
          variables,
          data,
          PageTableOfContents,
          DocumentationData: document,
        }}
        locale="zh"
      />
    );
  } catch (_error) {
    notFound();
  }
}
```

- [ ] **Step 4: Delete the now-unused fork files**

```bash
git rm "app/docs/toc-layout-client.tsx" "app/docs/doc-client.tsx" \
  "app/docs/[...slug]/docs-client.tsx" \
  "app/zh/docs/toc-layout-client.tsx" "app/zh/docs/doc-client.tsx" \
  "app/zh/docs/[...slug]/docs-client.tsx"
```

- [ ] **Step 5: Type-check and confirm no dangling imports**

Run: `pnpm type-check && grep -rn "toc-layout-client\|doc-client\|\[\.\.\.slug\]/docs-client" app | grep -v node_modules`
Expected: type-check PASS; grep returns nothing.

- [ ] **Step 6: Commit**

```bash
git add app/zh/docs
git commit -m "refactor(docs): reduce zh docs routes to thin wrappers; delete forked clients"
```

---

## Phase 4 — Blog server helpers

### Task 4.1: `getBlogPost`

Holds the `post`/`postZh` branch and builds the `BlogPost` object (English builder). Returns the normalized `post` plus `query`/`variables` so the client uses `useTina`.

**Files:**
- Create: `utils/blog/getBlogPost.ts`

- [ ] **Step 1: Implement**

```ts
// utils/blog/getBlogPost.ts
import client from 'tina/__generated__/client';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import type { BlogPost } from 'components/blog/BlogType';

export async function getBlogPost(locale: Locale, slugPath: string) {
  const vars = { relativePath: `${slugPath}.mdx` };
  const res =
    locale === 'zh'
      ? await client.queries.getExpandedPostZhDocument(vars)
      : await client.queries.getExpandedPostDocument(vars);

  const fetchedPost = locale === 'zh' ? res.data.postZh : res.data.post;
  if (!fetchedPost) {
    return { post: null, query: res.query, variables: res.variables, data: res.data };
  }

  const post: BlogPost = {
    _sys: fetchedPost._sys,
    id: fetchedPost.id,
    title: fetchedPost.title,
    date: fetchedPost.date || '',
    last_edited: fetchedPost.last_edited ?? null,
    author: fetchedPost.author || '',
    seo: fetchedPost.seo
      ? {
          title: fetchedPost.seo.title || 'Default SEO Title',
          description: fetchedPost.seo.description || 'Default SEO Description',
        }
      : null,
    prev: fetchedPost.prev ?? null,
    next: fetchedPost.next ?? null,
    body: fetchedPost.body as TinaMarkdownContent,
    giscusProps: {
      giscusRepo: `${process.env.GISCUS_ORG}/${process.env.GISCUS_REPO_NAME}`,
      giscusRepoId: process.env.GISCUS_REPO_ID,
      giscusCategory: process.env.GISCUS_CATEGORY,
      giscusCategoryId: process.env.GISCUS_CATEGORY_ID,
      giscusThemeUrl: process.env.GISCUS_THEME_URL,
    },
  };

  return { post, query: res.query, variables: res.variables, data: res.data };
}
```

- [ ] **Step 2: Type-check** (depends on `components/blog/BlogType.ts`, created in Task 5.1 — run after that task; for now expect an unresolved-import error and proceed)

Run: `pnpm type-check`
Expected: error only for `components/blog/BlogType` not yet existing. Resolved in Task 5.1.

- [ ] **Step 3: Commit**

```bash
git add utils/blog/getBlogPost.ts
git commit -m "feat(blog): add locale-aware getBlogPost helper"
```

### Task 4.2: `generateBlogStaticParams` and `getBlogIndexPosts`

**Files:**
- Create: `utils/blog/generateBlogStaticParams.ts`
- Create: `utils/blog/getBlogIndexPosts.ts`

- [ ] **Step 1: Implement `generateBlogStaticParams.ts`** (post-slug params for `[...slug]`)

```ts
// utils/blog/generateBlogStaticParams.ts
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import type { Locale } from 'utils/i18n/localeRouteConfig';

export async function generateBlogStaticParams(locale: Locale) {
  let allPosts: { slug: string[] }[] = [];
  let hasNextPage = true;
  let after: string | null = null;

  while (hasNextPage) {
    try {
      const res =
        locale === 'zh'
          ? await client.queries.postZhConnection({ after })
          : await client.queries.postConnection({ after });
      const connection =
        locale === 'zh' ? res?.data?.postZhConnection : res?.data?.postConnection;
      const edges = connection?.edges || [];
      const pageInfo = connection?.pageInfo || {
        hasNextPage: false,
        endCursor: null,
      };
      allPosts = allPosts.concat(
        edges.map((post) => ({ slug: [post?.node?._sys?.filename] })),
      );
      hasNextPage = pageInfo.hasNextPage;
      after = pageInfo.endCursor;
    } catch (error) {
      console.error('Error during static params generation:', error);
      notFound();
    }
  }
  return allPosts;
}
```

- [ ] **Step 2: Implement `getBlogIndexPosts.ts`** (paginated index data)

```ts
// utils/blog/getBlogIndexPosts.ts
import { glob } from 'fast-glob';
import { notFound } from 'next/navigation';
import client from 'tina/__generated__/client';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';

export const POSTS_PER_PAGE = 8;

export async function getBlogIndexStaticParams(locale: Locale) {
  const contentDir = LOCALE_ROUTE_CONFIG[locale].blogContentDir;
  const files = await glob(`${contentDir}**/*.mdx`);
  const numFiles = Math.ceil(files.length / POSTS_PER_PAGE);
  return Array.from(Array(numFiles).keys()).map((page) => ({
    page_index: (page + 1).toString(),
  }));
}

export async function getBlogIndexPosts(locale: Locale, pageIndexParam: string) {
  const contentDir = LOCALE_ROUTE_CONFIG[locale].blogContentDir;
  const posts = await glob(`${contentDir}**/*.mdx`);
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageIndex = parseInt(pageIndexParam, 10) || 1;
  const startIndex = (pageIndex - 1) * POSTS_PER_PAGE;

  let postResponse = null;
  try {
    postResponse =
      locale === 'zh'
        ? await client.queries.postZhConnection({ first: posts.length, sort: 'date' })
        : await client.queries.postConnection({ first: posts.length, sort: 'date' });
  } catch (err) {
    console.error('Error fetching postConnection:', err);
    notFound();
  }

  const connection =
    locale === 'zh'
      ? postResponse?.data?.postZhConnection
      : postResponse?.data?.postConnection;

  let reversedPosts = [];
  try {
    reversedPosts = connection?.edges
      ?.map((edge) => edge?.node)
      ?.filter(Boolean)
      ?.reverse();
  } catch (err) {
    console.error('Error processing posts:', err);
    notFound();
  }

  const finalisedPostData = reversedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  return { pageIndex, numPages, posts: finalisedPostData };
}
```

- [ ] **Step 3: Commit**

```bash
git add utils/blog/generateBlogStaticParams.ts utils/blog/getBlogIndexPosts.ts
git commit -m "feat(blog): add locale-aware blog static-params and index helpers"
```

---

## Phase 5 — Blog shared components

### Task 5.1: Move `BlogType.ts` to shared location

`BlogPageClientProps` is updated so `variables`/`query` are required (English contract — zh now uses `useTina` too).

**Files:**
- Create: `components/blog/BlogType.ts`

- [ ] **Step 1: Create the file**

```ts
// components/blog/BlogType.ts
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';

interface Sys {
  filename: string;
  basename: string;
  breadcrumbs: string[];
  path: string;
  relativePath: string;
  extension: string;
}

interface Seo {
  title: string;
  description: string;
}

interface PostSummary {
  id: string;
  title: string;
}

interface GiscusProps {
  giscusRepo: `${string}/${string}`;
  giscusRepoId: string;
  giscusCategory: string;
  giscusCategoryId: string;
  giscusThemeUrl: string;
}

export interface BlogPost {
  _sys: Sys;
  id: string;
  title: string;
  date: string;
  last_edited: string | null;
  author: string;
  seo: Seo | null;
  prev: PostSummary | null;
  next: PostSummary | null;
  body: TinaMarkdownContent;
  giscusProps: GiscusProps;
}

export interface BlogPageClientProps {
  data: { post: BlogPost };
  variables: any;
  query: string;
  locale: import('utils/i18n/localeRouteConfig').Locale;
}
```

- [ ] **Step 2: Type-check** (this resolves the Task 4.1 import)

Run: `pnpm type-check`
Expected: `getBlogPost.ts` import now resolves. Other blog routes still reference old paths until Phase 6 — defer their errors.

- [ ] **Step 3: Commit**

```bash
git add components/blog/BlogType.ts
git commit -m "refactor(blog): extract shared BlogType with required useTina props"
```

### Task 5.2: Create shared `BlogPageClient` with `locale` prop

Source of truth: English `app/blog/[...slug]/BlogPageClient.tsx` (uses `useTina`, English layout). Changes: accept `locale`; build prev/next via `buildBlogLinkSlug`; `giscus` `lang` from config.

**Files:**
- Create: `components/blog/BlogPageClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/blog/BlogPageClient.tsx
'use client';

import Giscus from '@giscus/react';
import { docAndBlogComponents } from 'components/tinaMarkdownComponents/docAndBlogComponents';
import { DocsPagination } from 'components/ui';
// biome-ignore lint/style/useImportType: React is required
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { formatDate } from '@/utils/formatDate';
import { buildBlogLinkSlug } from 'utils/i18n/buildLinkSlug';
import { LOCALE_ROUTE_CONFIG } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';
import type { BlogPageClientProps } from './BlogType';

const BlogPageClient: React.FC<BlogPageClientProps> = ({
  data,
  variables,
  query,
  locale,
}) => {
  const { data: blogPostData } = useTina({ query, variables, data });

  const post = blogPostData.post;
  const strings = getUiStrings(locale);
  const postedDate = formatDate(post.date);
  const lastEditedDate = post.last_edited ? formatDate(post.last_edited) : null;

  const previousPage = post.prev
    ? { slug: buildBlogLinkSlug(post.prev.id, locale), title: post.prev.title }
    : null;

  const nextPage = post.next
    ? { slug: buildBlogLinkSlug(post.next.id, locale), title: post.next.title }
    : null;

  return (
    <article>
      <BlogPageTitle title={post.title} />
      <div className="p-6">
        <div className="max-w-prose mx-auto">
          <div className="flex justify-between items-center opacity-80 m-0">
            <span className="flex flex-row text-lg gap-1">
              By
              <strong>{post.author}</strong>
            </span>
            <time dateTime={post.date}>{postedDate}</time>
          </div>
          <div className=" pt-6">
            <TinaMarkdown content={post.body} components={docAndBlogComponents} />
          </div>

          {lastEditedDate && (
            <div className="mt-2 text-sm opacity-50">
              {strings.blogPost.lastEdited}:{' '}
              <time dateTime={post.last_edited}>{lastEditedDate}</time>
            </div>
          )}
          <DocsPagination prevPage={previousPage} nextPage={nextPage} />
          <div className="mt-8">
            <Giscus
              id="discussion-box"
              repo={post.giscusProps?.giscusRepo}
              repoId={post.giscusProps?.giscusRepoId}
              category={post.giscusProps?.giscusCategory}
              categoryId={post.giscusProps?.giscusCategoryId}
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={post.giscusProps?.giscusThemeUrl}
              lang={LOCALE_ROUTE_CONFIG[locale].giscusLang}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

function BlogPageTitle({ title }: { title: string }) {
  const blogTitleStyling =
    'leading-[1.3] max-w-3xl bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 ' +
    'text-transparent bg-clip-text font-ibm-plex mx-auto text-4xl md:text-5xl lg:text-6xl';

  return (
    <header className="relative z-10 overflow-visible text-center px-8 pt-12 pb-4">
      <h1 className={blogTitleStyling}>{title}</h1>
    </header>
  );
}

export default BlogPageClient;
```

- [ ] **Step 2: Commit**

```bash
git add components/blog/BlogPageClient.tsx
git commit -m "refactor(blog): extract shared BlogPageClient with locale prop"
```

### Task 5.3: Create shared `BlogIndexPageClient` with `locale` prop

Source: English `app/blog/page/[page_index]/BlogIndexPageClient.tsx`. Changes: accept `locale`; heading + page suffix from `getUiStrings`; post link prefix from config (`${pathPrefix}/blog/...`).

**Files:**
- Create: `components/blog/BlogIndexPageClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/blog/BlogIndexPageClient.tsx
'use client';

import { MarkdownContent } from 'components/layout';
import { DynamicLink } from 'components/ui';
import NewBlogPagination from '@/component/Blogs/BlogPagination';
import { extractTextFromBody } from '@/utils/extractTextFromBody';
import { formatDate } from '@/utils/formatDate';
import { LOCALE_ROUTE_CONFIG, type Locale } from 'utils/i18n/localeRouteConfig';
import { getUiStrings } from 'utils/i18n/uiStrings';

interface Post {
  id: string;
  title: string;
  date?: string;
  author?: string;
  body?: string;
  seo?: { title?: string; description?: string };
  _sys: {
    filename: string;
    basename: string;
    breadcrumbs: string[];
    path: string;
    relativePath: string;
    extension: string;
  };
}

interface BlogIndexPageClientProps {
  currentPageIndexNumber: number;
  numberOfPages: number;
  postsForPageIndex: Post[];
  locale: Locale;
}

export default function BlogIndexPageClient({
  currentPageIndexNumber: pageIndex,
  postsForPageIndex: posts,
  numberOfPages: numPages,
  locale,
}: BlogIndexPageClientProps) {
  const strings = getUiStrings(locale);
  const prefix = LOCALE_ROUTE_CONFIG[locale].pathPrefix; // '' or '/zh'

  return (
    <section className="p-6">
      <header className="text-center pt-8 pb-4">
        <h1 className="font-ibm-plex text-4xl md:text-5xl lg:text-6xl bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          {strings.blogIndex.heading}
          {strings.blogIndex.pageSuffix(pageIndex)}
        </h1>
      </header>
      <div className="py-12 lg:py-16 last:pb-20 lg:last:pb-32 max-w-prose mx-auto">
        {posts.map((post) => (
          <article
            key={post.id}
            className="w-full group flex flex-col gap-6 lg:gap-8 items-start mb-6 lg:mb-8"
          >
            <DynamicLink href={`${prefix}/blog/${post._sys.filename}`} passHref>
              <h2 className="font-ibm-plex text-3xl lg:text-4xl lg:leading-tight bg-linear-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
                {post.title}
              </h2>
            </DynamicLink>
            <div className="w-full">
              <div className="flex justify-between items-center w-full mb-6 -mt-2">
                <p className="opacity-70">
                  <span className="mr-1">By</span>
                  <strong>{post.author}</strong>
                </p>
                <time className="opacity-70" dateTime={post.date}>
                  {formatDate(post.date || '')}
                </time>
              </div>
              <div className=" font-normal mb-6">
                <MarkdownContent
                  skipHtml={true}
                  content={extractTextFromBody(post.body)}
                />
              </div>
              <hr className="block border-none bg-[url('/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8" />
            </div>
          </article>
        ))}
        <nav aria-label="Blog pagination" className="mt-12">
          <NewBlogPagination currentPage={pageIndex} numPages={numPages} />
        </nav>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS for the new files (route wrappers fixed in Phase 6).

- [ ] **Step 3: Commit**

```bash
git add components/blog/BlogIndexPageClient.tsx
git commit -m "refactor(blog): extract shared BlogIndexPageClient with locale prop"
```

---

## Phase 6 — Blog thin route wrappers

### Task 6.1: English blog route wrappers

**Files:**
- Modify: `app/blog/[...slug]/page.tsx`
- Modify: `app/blog/page/[page_index]/page.tsx`
- Modify: `app/blog/page.tsx`

- [ ] **Step 1: Replace `app/blog/[...slug]/page.tsx`**

```tsx
// app/blog/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { getExcerpt } from 'utils/getExcerpt';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPageClient from 'components/blog/BlogPageClient';
import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('en');
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('en', slugPath);
  if (!post) {
    console.warn(`No metadata found for slug: ${slugPath}`);
    return notFound();
  }
  const excerpt = getExcerpt(post.body, 140);
  return getSeo({
    title: `${post.title} | TinaCMS Blog`,
    description: excerpt,
    canonicalUrl: `${settings.siteUrl}/blog/${slugPath}`,
  });
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  try {
    const { post, query, variables } = await getBlogPost('en', slugPath);
    if (!post) {
      console.warn(`No post found for slug: ${slugPath}`);
      return notFound();
    }
    return (
      <BlogPageClient
        data={{ post }}
        variables={variables}
        query={query}
        locale="en"
      />
    );
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);
    return notFound();
  }
}
```

> Note: the English `generateMetadata` originally computed `excerpt` from `data.post.body` before the null check; this wrapper computes it after, which is strictly safer and behavior-equivalent for existing posts.

- [ ] **Step 2: Replace `app/blog/page/[page_index]/page.tsx`**

```tsx
// app/blog/page/[page_index]/page.tsx
import BlogIndexPageClient from 'components/blog/BlogIndexPageClient';
import {
  getBlogIndexPosts,
  getBlogIndexStaticParams,
} from 'utils/blog/getBlogIndexPosts';
import { getUiStrings } from 'utils/i18n/uiStrings';

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogIndexStaticParams('en');
}

export function generateMetadata({
  params,
}: {
  params: { page_index: string };
}) {
  const pageIndex = parseInt(params.page_index, 10) || 1;
  const strings = getUiStrings('en');
  const title = strings.blogIndex.metaTitle(pageIndex);
  const description = strings.blogIndex.metaDescription;
  const url = `https://tina.io/blog/page/${params.page_index}`;
  return {
    title,
    description,
    openGraph: { title, description, url },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const { pageIndex, numPages, posts } = await getBlogIndexPosts(
    'en',
    params.page_index,
  );
  return (
    <BlogIndexPageClient
      currentPageIndexNumber={pageIndex}
      postsForPageIndex={posts}
      numberOfPages={numPages}
      locale="en"
    />
  );
}
```

- [ ] **Step 3: Replace `app/blog/page.tsx`**

```tsx
// app/blog/page.tsx
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPaginationPage from './page/[page_index]/page';

export function generateMetadata() {
  return getSeo({
    title: 'TinaCMS Blog',
    description:
      'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    canonicalUrl: `${settings.siteUrl}/blog`,
  });
}

export default async function BlogPage() {
  return await BlogPaginationPage({ params: { page_index: '1' } });
}
```

- [ ] **Step 4: Type-check**

Run: `pnpm type-check`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/blog/page.tsx "app/blog/[...slug]/page.tsx" "app/blog/page/[page_index]/page.tsx"
git commit -m "refactor(blog): reduce English blog routes to thin wrappers"
```

### Task 6.2: Chinese blog route wrappers + delete forks

**Files:**
- Modify: `app/zh/blog/[...slug]/page.tsx`
- Modify: `app/zh/blog/page/[page_index]/page.tsx`
- Modify: `app/zh/blog/page.tsx`
- Delete: `app/blog/[...slug]/BlogPageClient.tsx`, `app/blog/[...slug]/BlogType.ts`, `app/blog/page/[page_index]/BlogIndexPageClient.tsx`, `app/zh/blog/[...slug]/BlogPageClient.tsx`, `app/zh/blog/[...slug]/BlogType.ts`, `app/zh/blog/page/[page_index]/BlogIndexPageClient.tsx`

- [ ] **Step 1: Replace `app/zh/blog/[...slug]/page.tsx`** (English wrapper with `'zh'` and `/zh` canonical)

```tsx
// app/zh/blog/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { getExcerpt } from 'utils/getExcerpt';
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPageClient from 'components/blog/BlogPageClient';
import { generateBlogStaticParams } from 'utils/blog/generateBlogStaticParams';
import { getBlogPost } from 'utils/blog/getBlogPost';

export const dynamicParams = false;

export function generateStaticParams() {
  return generateBlogStaticParams('zh');
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  const { post } = await getBlogPost('zh', slugPath);
  if (!post) {
    console.warn(`No metadata found for slug: ${slugPath}`);
    return notFound();
  }
  const excerpt = getExcerpt(post.body, 140);
  return getSeo({
    title: `${post.title} | TinaCMS Blog`,
    description: excerpt,
    canonicalUrl: `${settings.siteUrl}/zh/blog/${slugPath}`,
  });
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slugPath = params.slug.join('/');
  try {
    const { post, query, variables } = await getBlogPost('zh', slugPath);
    if (!post) {
      console.warn(`No post found for slug: ${slugPath}`);
      return notFound();
    }
    return (
      <BlogPageClient
        data={{ post }}
        variables={variables}
        query={query}
        locale="zh"
      />
    );
  } catch (error) {
    console.error(`Error fetching post for slug: ${slugPath}`, error);
    return notFound();
  }
}
```

- [ ] **Step 2: Replace `app/zh/blog/page/[page_index]/page.tsx`**

```tsx
// app/zh/blog/page/[page_index]/page.tsx
import BlogIndexPageClient from 'components/blog/BlogIndexPageClient';
import {
  getBlogIndexPosts,
  getBlogIndexStaticParams,
} from 'utils/blog/getBlogIndexPosts';
import { getUiStrings } from 'utils/i18n/uiStrings';

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogIndexStaticParams('zh');
}

export function generateMetadata({
  params,
}: {
  params: { page_index: string };
}) {
  const pageIndex = parseInt(params.page_index, 10) || 1;
  const strings = getUiStrings('zh');
  const title = strings.blogIndex.metaTitle(pageIndex);
  const description = strings.blogIndex.metaDescription;
  const url = `https://tina.io/zh/blog/page/${params.page_index}`;
  return {
    title,
    description,
    openGraph: { title, description, url },
  };
}

export default async function BlogPaginationPage({
  params,
}: {
  params: { page_index: string };
}) {
  const { pageIndex, numPages, posts } = await getBlogIndexPosts(
    'zh',
    params.page_index,
  );
  return (
    <BlogIndexPageClient
      currentPageIndexNumber={pageIndex}
      postsForPageIndex={posts}
      numberOfPages={numPages}
      locale="zh"
    />
  );
}
```

- [ ] **Step 3: Replace `app/zh/blog/page.tsx`**

```tsx
// app/zh/blog/page.tsx
import settings from '@/content/settings/config.json';
import { getSeo } from '@/utils/metadata/getSeo';
import BlogPaginationPage from './page/[page_index]/page';

export function generateMetadata() {
  return getSeo({
    title: 'TinaCMS Blog',
    description:
      'Stay updated with the TinaCMS blog. Get tips, guides and the latest news on content management and development',
    canonicalUrl: `${settings.siteUrl}/zh/blog`,
  });
}

export default async function BlogPage() {
  return await BlogPaginationPage({ params: { page_index: '1' } });
}
```

> Confirm the original `app/zh/blog/page.tsx` content matches this shape before overwriting (it was a near-identical clone of the English `app/blog/page.tsx` with a `/zh/blog` canonical). If the original differs materially, surface it rather than overwriting.

- [ ] **Step 4: Delete the now-unused fork files**

```bash
git rm "app/blog/[...slug]/BlogPageClient.tsx" "app/blog/[...slug]/BlogType.ts" \
  "app/blog/page/[page_index]/BlogIndexPageClient.tsx" \
  "app/zh/blog/[...slug]/BlogPageClient.tsx" "app/zh/blog/[...slug]/BlogType.ts" \
  "app/zh/blog/page/[page_index]/BlogIndexPageClient.tsx"
```

- [ ] **Step 5: Type-check and confirm no dangling imports**

Run: `pnpm type-check && grep -rn "BlogPageClient\|BlogIndexPageClient\|BlogType" app | grep -v node_modules`
Expected: type-check PASS; grep returns nothing (all references now point to `components/blog/*`, which lives outside `app/`).

- [ ] **Step 6: Commit**

```bash
git add app/zh/blog
git commit -m "refactor(blog): reduce zh blog routes to thin wrappers; delete forked components"
```

---

## Phase 7 — Verification & cleanup

### Task 7.1: Lint, type-check, build

**Files:** none (verification only)

- [ ] **Step 1: Format and lint**

Run: `pnpm lint`
Expected: PASS. If Biome reports import-ordering issues in new files, run `pnpm lint:fix` and re-check.

- [ ] **Step 2: Type-check**

Run: `pnpm type-check`
Expected: PASS, no errors.

- [ ] **Step 3: Full build (generates Tina client + Next build)**

Run: `pnpm build`
Expected: build completes; both `/docs/*` + `/zh/docs/*` and `/blog/*` + `/zh/blog/*` static routes are generated. Confirm the generated route count for zh docs/blog is non-zero and that `/zh/docs` (index) and `/zh/blog` exist.

- [ ] **Step 4: Commit any lint:fix changes**

```bash
git add -A
git commit -m "chore: lint fixes for i18n dedup" || echo "nothing to commit"
```

### Task 7.2: Manual visual-QA checklist (reconcile-to-English behavior changes)

**Files:** none (manual QA)

Run `pnpm dev` and verify on the Chinese site (these are the intended behavior changes from the "reconcile to English" policy):

- [ ] `/zh/blog/<some-post>` renders with the **English layout** (date inline next to author, header padding `pt-12 pb-4`, title `max-w-3xl`) and **live TinaCMS editing works** (`useTina`) — previously zh had no `useTina`.
- [ ] `/zh/blog/<post>` giscus widget loads with `lang="zh-CN"`.
- [ ] `/zh/blog` and `/zh/blog/page/2` heading reads "博客" / "博客 - 第2页"; post links go to `/zh/blog/...`; pagination works.
- [ ] `/zh/docs/<page>` shows `GitHubMetadata` (newly added to zh), "上次编辑: <date>", and next/prev links resolve to `/zh/docs/...`.
- [ ] `/zh/docs` index renders and left-nav uses the zh nav (`getDocsNav(..., 'zh')`).
- [ ] Spot-check English `/docs/<page>`, `/docs`, `/blog`, `/blog/<post>`, `/blog/page/2` are visually unchanged (English is source of truth).
- [ ] TinaCMS visual editing works on both an English and a Chinese docs page and blog post.

- [ ] **Step 1: Record QA results** in the PR description (which pages checked, screenshots of zh blog before/after if available).

### Task 7.3: Final diff review

- [ ] **Step 1: Confirm no `app/zh` logic remains beyond thin wrappers**

Run: `find app/zh -type f -name '*.tsx' | xargs wc -l | sort -n`
Expected: every `app/zh/{docs,blog}` route file is small (roughly ≤ 60 lines); no client components remain under `app/zh`.

- [ ] **Step 2: Confirm shared modules are the single source**

Run: `grep -rln "useTina" app/zh app/docs app/blog | grep -v node_modules`
Expected: no matches — `useTina` now lives only in `components/docs` and `components/blog`.

---

## Self-Review

**Spec coverage:**
- Shared query-selection branch → Tasks 1.1, 4.1, 4.2 ✓
- Locale config → Task 0.1 ✓
- Translated UI strings (string map pattern) → Task 0.3, consumed in 2.2/5.2/5.3/6.x ✓
- Drift reconciliation to English (docs metadata flow, static-param filters, GitHubMetadata, blog useTina, blog layout) → Tasks 1.2/1.3/2.2/5.2/6.x ✓
- Thin route wrappers, URLs/middleware/content unchanged → Phases 3, 6 ✓
- Verification (build + visual QA) + static-param drift check → Phase 7 ✓
- Out-of-scope (Tier 1b `[locale]` segment, Tier 2 collection merge) → not included ✓

**Placeholder scan:** No TBD/TODO left as work items. The one `biome-ignore ... <TODO>` comments are copied verbatim from existing source (not new work). Two explicit "confirm against existing file" checks (Task 2.3 Step 2 for `TinaClient`'s prop contract; Task 6.2 Step 3 for the original zh blog index page) are deliberate verification steps, not placeholders.

**Type consistency:** `Locale` type used consistently; `getDocsDocument`/`getBlogPost` return shapes (`{ document|post, data, query, variables }`) match their consumers; `BlogPageClientProps` gains `locale` and required `query`/`variables`, matched by all `BlogPageClient` call sites in Phase 6; `getUiStrings(...).blogIndex.metaTitle/pageSuffix` signatures match usage.

**Known risk to watch during execution:** the normalized `data` passed to `useTina` must retain the locale-correct key (`data.docZh` for zh, `data.postZh` for zh) — the helpers pass `res.data` through unchanged, and the client reads the locale-correct key, so `useTina` round-trips correctly. Verify in Task 7.2.
