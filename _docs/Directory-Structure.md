# Directory Structure

```
.
├── app/
│   ├── api/                  route handlers (analytics, contact, mailchimp, GitHub stars, and others)
│   ├── blog/, zh/blog/       blog routes (English and Chinese)
│   ├── search/               /search results page
│   ├── [...slug]/            catch-all route for Tina-managed pages
│   └── ...                   other Next.js App Router routes and layouts
├── components/
│   ├── blocks/, blocks-v2/   Tina block-editing components and their schemas
│   ├── blog/                 blog post components
│   ├── footer/, layout/      site footer and page layout wrappers
│   ├── forms/, modals/       form and modal components
│   ├── search/               blog search modal and /search results components
│   ├── styles/               typography, button, menu and tab style definitions
│   ├── tinaMarkdownComponents/  rich-text styling and embedded components
│   ├── ui/                   reusable utility components (shadcn/ui and project components)
│   └── ...
├── content/                  Tina-managed site content (MDX and JSON)
│   ├── blog/, blog-zh/       blog posts (English and Chinese)
│   ├── pages/, events/, conference/, examples/, whats-new-*/
│   └── navigationBar/, footer/, settings/, and other site configuration
├── data-api/                 reads blog files for the search indexer
├── indices/                  builds the Algolia blog index (pnpm create-indices)
├── rss/                      RSS feed generation
├── lib/, src/                shadcn/ui registry and shadcn/ui components
├── public/                   static assets
├── scripts/                  release notes, version update, Lighthouse and content auditor scripts
├── styles/                   Tailwind CSS 4 entry (tailwind.css)
├── tests/                   visual comparison tests
├── tina/
│   ├── collectionsSchema/    Tina collection definitions
│   ├── config.ts, schema.tsx Tina config and top-level schema
│   └── tina-lock.json        generated schema lock (commit it)
├── utils/                    helper functions
├── _docs/                    contributor docs
└── ...                       project config (next.config.js, biome.json, package.json)
```

The developer documentation for TinaCMS lives in the [tinacms/docs](https://github.com/tinacms/docs) repo.
