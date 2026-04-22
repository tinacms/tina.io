# TinaCMS Versions Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/versions` page on tina.io that lists every TinaCMS npm package with its current latest version and published date, fetched live from the npm registry. The page is rendered by a TinaCMS "Versions" block (with an editable title), so it can be composed like any other tina.io page in `/admin`.

**Architecture:** A new reusable `Versions` block lives under `components/blocks/Versions/`, registered like any other block (Blocks.tsx dispatcher + pages.tsx schema). The block's only editable field is its `title`; the package list is hardcoded in a sibling constants file. Rendering is client-side: for each package, fetch `https://registry.npmjs.org/<pkg>` in parallel (browser + Cloudflare cache the response), then extract `dist-tags.latest` and `time[latest]`. A single new page entry `content/pages/versions.mdx` renders the block at `/versions` through the existing `[...slug]` catch-all.

**Tech Stack:** Next.js 14 (App Router), TypeScript, TinaCMS, Tailwind CSS 4, Biome, Jest.

---

## Working directory

All paths below are relative to `/Users/josh/Desktop/Tina/tina.io/`. Tracking issue: https://github.com/tinacms/tinacms/issues/6715.

## File Structure

| File | Responsibility |
|---|---|
| `components/blocks/Versions/packages.ts` | **New.** Hardcoded list of TinaCMS packages (name + short description). |
| `components/blocks/Versions/fetchPackageInfo.ts` | **New.** `fetchPackageInfo(name)` — hits npm registry, returns `{ name, version, publishedAt }` or `{ name, error }`. |
| `components/blocks/Versions/fetchPackageInfo.test.ts` | **New.** Jest unit tests for fetch utility (happy path + failure path). |
| `components/blocks/Versions/formatPublishedDate.ts` | **New.** Formats an ISO string into a stable absolute date (`Nov 20, 2024`). |
| `components/blocks/Versions/formatPublishedDate.test.ts` | **New.** Jest unit tests for date formatter. |
| `components/blocks/Versions/Versions.tsx` | **New.** Client component — reads `data.title`, fetches for each package in parallel, renders the table with loading / error / resolved states. |
| `components/blocks/Versions/Versions.template.ts` | **New.** TinaCMS schema — one `title` string field. |
| `components/blocks/Blocks.tsx` | **Modify.** Add import + `PageBlocksVersions` case to the `blockByType` switch. |
| `tina/collectionsSchema/pages.tsx` | **Modify.** Import `versionsTemplate`, push into the `templates` array. |
| `content/main/versions.json` | **New.** Single-block page that instantiates the Versions block with a starting title. The `pages` collection is rooted at `content/main` (see `tina/collectionsSchema/pages.tsx:106`); files here are picked up by `generateStaticParams` in `app/[...slug]/page.tsx` and served at `/<slug>`. |

## Key conventions (discovered)

- Client components start with `'use client';`.
- Tina block data is passed as `{ data }` (see `Spacer/Spacer.tsx`).
- Block templates export a `Template` object (see `Spacer/Spacer.template.ts`).
- Blocks are registered in two places: the dispatcher switch in `components/blocks/Blocks.tsx` and the schema list in `tina/collectionsSchema/pages.tsx`.
- `__typename` for the block in GraphQL will be `PageBlocksVersions` (Tina derives it from the template `name: 'versions'`).
- TypeScript strict mode is off in this repo (per AGENTS.md) — don't add strict null assertions to match neighbors.
- Biome: single quotes, semicolons, 2-space indent, 80-char width.
- Run `pnpm lint:fix` after editing `.ts`/`.tsx` files.
- After schema changes, `pnpm dev` regenerates `tina-lock.json`; commit it.

---

## Task 1: Hardcoded package list

**Files:**
- Create: `components/blocks/Versions/packages.ts`

- [ ] **Step 1: Create the file**

```ts
export type TinaPackage = {
  name: string;
  description: string;
};

export const TINA_PACKAGES: TinaPackage[] = [
  { name: 'tinacms', description: 'Core TinaCMS runtime' },
  { name: '@tinacms/cli', description: 'CLI for dev, build, and admin generation' },
  { name: '@tinacms/app', description: 'Admin UI bundle' },
  { name: '@tinacms/auth', description: 'Self-hosted auth utilities' },
  { name: '@tinacms/datalayer', description: 'Self-hosted datalayer' },
  { name: '@tinacms/graphql', description: 'GraphQL engine' },
  { name: '@tinacms/mdx', description: 'MDX parser' },
  { name: '@tinacms/metrics', description: 'Metrics collector' },
  { name: '@tinacms/schema-tools', description: 'Schema utilities' },
  { name: '@tinacms/scripts', description: 'Build scripts' },
  { name: '@tinacms/search', description: 'Search feature' },
  { name: '@tinacms/vercel-previews', description: 'Vercel Previews integration' },
  { name: '@tinacms/webpack-helpers', description: 'Webpack helpers' },
  { name: 'tinacms-authjs', description: 'Auth.js integration' },
  { name: 'tinacms-clerk', description: 'Clerk integration' },
  { name: 'tinacms-gitprovider-github', description: 'GitHub git provider' },
  { name: 'next-tinacms-azure', description: 'Azure media adapter' },
  { name: 'next-tinacms-cloudinary', description: 'Cloudinary media adapter' },
  { name: 'next-tinacms-dos', description: 'DigitalOcean Spaces media adapter' },
  { name: 'next-tinacms-s3', description: 'S3 media adapter' },
  { name: 'create-tina-app', description: 'Project bootstrap tool' },
];
```

- [ ] **Step 2: Lint**

Run: `pnpm lint:fix components/blocks/Versions/packages.ts`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/blocks/Versions/packages.ts
git commit -m "feat(versions): add TinaCMS package list constant"
```

---

## Task 2: Date formatter utility (TDD)

**Files:**
- Create: `components/blocks/Versions/formatPublishedDate.ts`
- Test: `components/blocks/Versions/formatPublishedDate.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { formatPublishedDate } from './formatPublishedDate';

describe('formatPublishedDate', () => {
  it('formats an ISO date as month-day-year in en-US', () => {
    expect(formatPublishedDate('2024-11-20T14:23:45.123Z')).toEqual(
      'Nov 20, 2024',
    );
  });

  it('returns an empty string for undefined input', () => {
    expect(formatPublishedDate(undefined)).toEqual('');
  });

  it('returns an empty string for invalid input', () => {
    expect(formatPublishedDate('not-a-date')).toEqual('');
  });
});
```

- [ ] **Step 2: Run test and verify it fails**

Run: `pnpm test formatPublishedDate`
Expected: FAIL — `Cannot find module './formatPublishedDate'`.

- [ ] **Step 3: Implement the utility**

Create `components/blocks/Versions/formatPublishedDate.ts`:

```ts
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
});

export function formatPublishedDate(iso: string | undefined): string {
  if (!iso) {
    return '';
  }
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return formatter.format(date);
}
```

- [ ] **Step 4: Run test and verify it passes**

Run: `pnpm test formatPublishedDate`
Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add components/blocks/Versions/formatPublishedDate.ts components/blocks/Versions/formatPublishedDate.test.ts
git commit -m "feat(versions): add formatPublishedDate utility"
```

---

## Task 3: fetchPackageInfo utility (TDD)

**Files:**
- Create: `components/blocks/Versions/fetchPackageInfo.ts`
- Test: `components/blocks/Versions/fetchPackageInfo.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { fetchPackageInfo } from './fetchPackageInfo';

describe('fetchPackageInfo', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns the latest version and published date on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        'dist-tags': { latest: '2.3.4' },
        time: { '2.3.4': '2024-11-20T14:23:45.123Z' },
      }),
    }) as unknown as typeof fetch;

    const result = await fetchPackageInfo('tinacms');

    expect(result).toEqual({
      name: 'tinacms',
      version: '2.3.4',
      publishedAt: '2024-11-20T14:23:45.123Z',
    });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/tinacms',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.npm.install-v1+json',
        }),
      }),
    );
  });

  it('url-encodes scoped package names', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        'dist-tags': { latest: '1.0.0' },
        time: { '1.0.0': '2024-01-01T00:00:00.000Z' },
      }),
    }) as unknown as typeof fetch;

    await fetchPackageInfo('@tinacms/cli');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/@tinacms%2Fcli',
      expect.anything(),
    );
  });

  it('returns an error entry when the fetch response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as unknown as typeof fetch;

    const result = await fetchPackageInfo('does-not-exist');

    expect(result).toEqual({
      name: 'does-not-exist',
      error: 'HTTP 404',
    });
  });

  it('returns an error entry when fetch rejects', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('network down')) as unknown as typeof fetch;

    const result = await fetchPackageInfo('tinacms');

    expect(result).toEqual({
      name: 'tinacms',
      error: 'network down',
    });
  });
});
```

- [ ] **Step 2: Run test and verify it fails**

Run: `pnpm test fetchPackageInfo`
Expected: FAIL — `Cannot find module './fetchPackageInfo'`.

- [ ] **Step 3: Implement the utility**

Create `components/blocks/Versions/fetchPackageInfo.ts`:

```ts
export type PackageInfoSuccess = {
  name: string;
  version: string;
  publishedAt: string;
};

export type PackageInfoError = {
  name: string;
  error: string;
};

export type PackageInfo = PackageInfoSuccess | PackageInfoError;

export function isPackageInfoError(info: PackageInfo): info is PackageInfoError {
  return 'error' in info;
}

export async function fetchPackageInfo(name: string): Promise<PackageInfo> {
  const url = `https://registry.npmjs.org/${name.replace('/', '%2F')}`;
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.npm.install-v1+json',
      },
    });
    if (!res.ok) {
      return { name, error: `HTTP ${res.status}` };
    }
    const body = await res.json();
    const version = body?.['dist-tags']?.latest;
    const publishedAt = body?.time?.[version];
    if (!version) {
      return { name, error: 'No latest dist-tag' };
    }
    return { name, version, publishedAt: publishedAt ?? '' };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { name, error: message };
  }
}
```

- [ ] **Step 4: Run test and verify it passes**

Run: `pnpm test fetchPackageInfo`
Expected: 4 tests pass.

- [ ] **Step 5: Lint**

Run: `pnpm lint:fix components/blocks/Versions/`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add components/blocks/Versions/fetchPackageInfo.ts components/blocks/Versions/fetchPackageInfo.test.ts
git commit -m "feat(versions): add fetchPackageInfo utility with tests"
```

---

## Task 4: Versions.template.ts (Tina schema)

**Files:**
- Create: `components/blocks/Versions/Versions.template.ts`

- [ ] **Step 1: Create the template**

```ts
import type { Template } from 'tinacms';

export const versionsTemplate: Template = {
  label: 'Versions',
  name: 'versions',
  ui: {
    previewSrc: '/img/blocks/versions.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      description:
        'Heading shown above the live table of TinaCMS package versions.',
    },
  ],
};
```

Note: the `previewSrc` image does not exist yet; the admin renders a placeholder when missing. Adding an image is nice-to-have and out of scope for v1.

- [ ] **Step 2: Lint**

Run: `pnpm lint:fix components/blocks/Versions/Versions.template.ts`

- [ ] **Step 3: Commit**

```bash
git add components/blocks/Versions/Versions.template.ts
git commit -m "feat(versions): add Tina schema for Versions block"
```

---

## Task 5: Versions.tsx rendering component

**Files:**
- Create: `components/blocks/Versions/Versions.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/component/blocks';
import {
  type PackageInfo,
  fetchPackageInfo,
  isPackageInfoError,
} from './fetchPackageInfo';
import { formatPublishedDate } from './formatPublishedDate';
import { TINA_PACKAGES } from './packages';

type VersionsBlockData = {
  title?: string;
};

type RowState =
  | { status: 'loading'; name: string }
  | { status: 'resolved'; info: PackageInfo };

export function VersionsBlock({ data }: { data: VersionsBlockData }) {
  const [rows, setRows] = useState<RowState[]>(() =>
    TINA_PACKAGES.map((p) => ({ status: 'loading', name: p.name })),
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all(TINA_PACKAGES.map((p) => fetchPackageInfo(p.name))).then(
      (results) => {
        if (cancelled) {
          return;
        }
        setRows(results.map((info) => ({ status: 'resolved', info })));
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container width="medium">
      <h1 className="text-3xl md:text-4xl font-ibm-plex font-medium text-blue-800 mt-16 mb-4">
        {data?.title ?? 'TinaCMS Package Versions'}
      </h1>
      <p className="text-gray-700 mb-8">
        Latest published version of every TinaCMS package, fetched live from
        npm.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 pr-4 font-medium text-gray-600">Package</th>
              <th className="py-3 pr-4 font-medium text-gray-600">Latest</th>
              <th className="py-3 pr-4 font-medium text-gray-600">Published</th>
              <th className="py-3 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody>
            {TINA_PACKAGES.map((pkg, i) => {
              const row = rows[i];
              return (
                <tr key={pkg.name} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-mono text-sm text-blue-800">
                    <a
                      href={`https://www.npmjs.com/package/${pkg.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {pkg.name}
                    </a>
                  </td>
                  <td className="py-3 pr-4 font-mono text-sm">
                    <VersionCell row={row} />
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    <PublishedCell row={row} />
                  </td>
                  <td className="py-3 text-sm text-gray-700">
                    {pkg.description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

function VersionCell({ row }: { row: RowState }) {
  if (row.status === 'loading') {
    return <span className="text-gray-400">—</span>;
  }
  if (isPackageInfoError(row.info)) {
    return <span className="text-red-600">error</span>;
  }
  return <span>{row.info.version}</span>;
}

function PublishedCell({ row }: { row: RowState }) {
  if (row.status === 'loading' || isPackageInfoError(row.info)) {
    return <span className="text-gray-400">—</span>;
  }
  return <span>{formatPublishedDate(row.info.publishedAt)}</span>;
}
```

- [ ] **Step 2: Lint**

Run: `pnpm lint:fix components/blocks/Versions/Versions.tsx`
Expected: no errors.

- [ ] **Step 3: Typecheck**

Run: `pnpm type-check`
Expected: no errors. (If the `Container` import path or prop shape is wrong, adjust to match other blocks like `examples-client.tsx` which imports from `components/blocks`.)

- [ ] **Step 4: Commit**

```bash
git add components/blocks/Versions/Versions.tsx
git commit -m "feat(versions): add Versions block rendering component"
```

---

## Task 6: Register block in Blocks.tsx dispatcher

**Files:**
- Modify: `components/blocks/Blocks.tsx`

- [ ] **Step 1: Add the import**

Add near the other named imports at the top of the file (alphabetically, next to `SpacerComponent`):

```tsx
import { VersionsBlock } from './Versions/Versions';
```

- [ ] **Step 2: Add the case**

Inside `blockByType`, before the `default:` clause, add:

```tsx
case 'PageBlocksVersions':
  return <VersionsBlock data={block} />;
```

- [ ] **Step 3: Typecheck**

Run: `pnpm type-check`
Expected: no errors. (The generated `PageBlocks` union may not include `PageBlocksVersions` yet — that's expected until Task 7 + `pnpm dev` regenerates types. If it fails on this case at this step, skip typecheck here and run it after Task 7.)

- [ ] **Step 4: Commit**

```bash
git add components/blocks/Blocks.tsx
git commit -m "feat(versions): wire VersionsBlock into Blocks dispatcher"
```

---

## Task 7: Register template in pages.tsx

**Files:**
- Modify: `tina/collectionsSchema/pages.tsx`

- [ ] **Step 1: Add the import**

In the import block (alphabetical, next to `spacerTemplate`), add:

```ts
import { versionsTemplate } from '../../components/blocks/Versions/Versions.template';
```

- [ ] **Step 2: Add the template to the array**

In the `templates` array (end of the list is fine), add:

```ts
versionsTemplate as Template,
```

- [ ] **Step 3: Regenerate tina-lock.json**

Run: `pnpm dev` and wait for TinaCMS GraphQL to start (it prints "NEXT started server on ..."). Once running, stop it (Ctrl-C). This regenerates `tina/__generated__/` types and `tina-lock.json`.

Expected: `git status` shows `tina-lock.json` and files under `tina/__generated__/` modified.

- [ ] **Step 4: Typecheck**

Run: `pnpm type-check`
Expected: no errors — `PageBlocksVersions` is now part of the generated union.

- [ ] **Step 5: Commit**

```bash
git add tina/collectionsSchema/pages.tsx tina-lock.json tina/__generated__
git commit -m "feat(versions): register versions block in Tina schema"
```

---

## Task 8: Create the page content

**Files:**
- Create: `content/main/versions.json`

Reference: `content/main/home.json` is the existing single-page blocks entry. The `pages` collection (name: `page`) is rooted at `content/main` with `format: json` (see `tina/collectionsSchema/pages.tsx:105-107`). `app/[...slug]/page.tsx:19-22` globs `./content/main/**/*.json` into static params, so `content/main/versions.json` becomes `/versions`.

- [ ] **Step 1: Create the JSON**

```json
{
  "seo": {
    "title": "TinaCMS Package Versions",
    "description": "The current published version of every TinaCMS package, fetched live from npm.",
    "canonicalUrl": "https://tina.io/versions"
  },
  "blocks": [
    {
      "_template": "versions",
      "title": "TinaCMS Package Versions"
    }
  ]
}
```

- [ ] **Step 2: Lint**

Run: `pnpm lint:fix content/main/versions.json`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/main/versions.json
git commit -m "feat(versions): add /versions page content"
```

---

## Task 9: Dev-server smoke test

**Files:** (none modified)

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Wait until both Next (`:3000`) and Tina GraphQL (`:4001`) are ready.

- [ ] **Step 2: Open the page**

Open `http://localhost:3000/versions` in a browser.

**Verify:**
- Title renders ("TinaCMS Package Versions").
- All 21 package rows appear, showing `—` while loading, then version + published date within ~1s.
- Package-name links open the npm page in a new tab.
- No red error text in any row (if there is, inspect the Network tab — likely an incorrect package name in `packages.ts`).
- No console errors.

- [ ] **Step 3: Open the admin**

Navigate to `http://localhost:3000/admin` → open the Versions page → verify the Title field is editable and edits update the heading live.

- [ ] **Step 4: Stop the dev server (Ctrl-C)**

---

## Task 10: Full check + final commit

- [ ] **Step 1: Lint**

Run: `pnpm lint:fix`
Expected: no remaining errors.

- [ ] **Step 2: Typecheck**

Run: `pnpm type-check`
Expected: no errors.

- [ ] **Step 3: Run the test suite**

Run: `pnpm test`
Expected: all tests pass, including the new `formatPublishedDate` and `fetchPackageInfo` suites.

- [ ] **Step 4: Build to verify production compilation**

Run: `pnpm build`
Expected: build succeeds.

- [ ] **Step 5: Push the branch and open a PR**

```bash
git push -u origin feature/versions-page
gh pr create \
  --title "Add /versions page listing TinaCMS npm package versions" \
  --body "Implements tinacms/tinacms#6715. Adds a TinaCMS \`Versions\` block that fetches each Tina package's latest version and publish date from registry.npmjs.org and renders them in a table. Page is composed via \`content/pages/versions.mdx\` and accessible at /versions."
```

---

## Out of scope (tracked in sibling issues)

- Inter-package compatibility surfacing — blocks on the peerDependencies audit: tinacms/tinacms#6716, tinacms/tinacms#6717.
- `tinacms doctor` CLI — tinacms/tinacms#6718.
- Localisation (`zh` variant) — the block renders with English strings. A `zh` version of the page entry can be added later under `content/pages/zh/` following existing i18n patterns.
- Previews image for the admin block picker (`/img/blocks/versions.png`).
