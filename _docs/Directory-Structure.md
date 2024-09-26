# 🏗️ Directory Structure

Last updated: 26/09/2024

```
.
├── components/
│   ├── DocumentNavigation/
│   │   └── ... various navigation menu components for the docs
│   ├── layout/
│   │   └── ... wrappers for site pages
│   ├── blocks/
│   │   ├── ... Tina block-editing components and schemas
│   │   └── ... 🦙 https://tina.io/docs/editing/blocks/ 🦙 
│   ├── tinaMarkdownComponents/
│   │   ├── ... Rich-Text styling and embedded components
│   │   └── ... 🦙 https://tina.io/docs/editing/markdown/ 🦙
│   ├── toc/
│   │   ├── ... contains docs table of contents (toc) schema
│   │   └── ... generated toc component from doc headings
│   ├── ui/
│   │   └── ... re-usable utility components
│   ├── styles/
│   │   └── ... mix of styling code, TODO: standardise this
│   └── ➕
├── content/
│   └── ... 🦙 🦙 🦙 (tina-managed site content)
├── data-api/ and indices/
│   └── ... related to algolia and content searching
├── pages/
│   └── ... 🖥️ nextjs page router 🖥️
├── public/
│   └── ... assets
├── rss/
│   └── ... rss generation (SEO or other reasons)
├── scripts/
│   ├── content-auditor/
│   │   ├── ... local AI audit script for /content
│   │   └── ... 🦙 https://ollama.com/ - unafilliated llama related software 🦙
│   └── ➕
├── styles/ (tailwind config)
├── tina/
│   ├── collectionsSchema/
│   │   ├── ... Tina schema definitions (other than block templates)
│   │   └── ... 🦙 https://tina.io/docs/reference/schema/ 🦙
│   └── ➕
├── utils/
│   └── ... function definitions
└── ... project config
```