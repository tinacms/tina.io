### Hi Legends 👋
# <p align="center">Tina.io – the Website for [TinaCMS](https://github.com/tinacms/tinacms)</p>
  
Source code for the tina.io website, including the TinaCMS documentation and blog.

Found a bug? Create a PBI and we'll look into it.


## 🧿 Vision

Make a wesbite to communicate the awesomeness of TinaCMS.

## 🛠️ Tech Stack

Static web application built with...

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

- and of course... [TinaCMS](https://github.com/tinacms/tinacms)! 🦙

Hosting and deployment...

- GitHub and [Vercel](https://vercel.com/)

<br>

## 🛠️ Dependency Installation + Setup

We're using [pnpm](https://pnpm.io/) as the package manager for node.
  
```bash
cp .env.example .env
pnpm i
```

**Note**: Python is required for gyp – install [python](https://www.python.org/downloads/) and if necessary (newer python versions) the [setup tools](https://stackoverflow.com/a/77638742).

<br>

## 🧑🏻‍💻 Running the Project
```bash
pnpm dev
```
This will spin up the react/Next project locally, running on [localhost:3000](http://localhost:3000) (react app) and [localhost:4001](http://localhost:4001/graphql) (playground for testing graphql against the Tina datalayer).

<br>

## 📜 Contribution Expectations

We welcome contributions to improve the Tina.io experience!

1. **Fork the Repo**: Work on your own fork to avoid conflicts.
1. **Branching**: Use `feature/your-feature-name` or `bugfix/your-bugfix-name` for changes.
1. **Using TinaCMS**: For content changes (e.g., docs), use visual editing with TinaCMS locally (e.g., http://localhost:3000/admin).
1. **Commits**: Write clear, descriptive messages. Break large changes into multiple commits.
1. **Code Quality**:
   - Use Tailwind over inline CSS or styled components.
   - Follow DRY principles and refactor reusable code.
   - Comment on calculations or workarounds, and open issues for any technical debt.
1. **Pull Requests**:
   - Reference related issues and include screenshots for UI changes.
   - If no issue exists, create one and link it.
   - Commit the generated `tina-lock.json` file, and rerun the project locally after merging to update it.
1. **Review Process**:
   - Due to Vercel deployment issues, maintainers will recreate your changes on a new branch to test before approval.

Cheers! 🦙

<br>

## 📚 Additional Info

### Testing Local TinaCMS 🦙 Changes

It's also possible to modify a local copy of TinaCMS and use that with the website instance. 

If you have the **tinacms** repository cloned locally you can use it when running **tina.io**:

```
TINA=../path/to/tinacms pnpm dev
```

You can also specify which packages you want to watch:

```
TINA=../path/to/tinacms TINA_WATCH=@tinacms/forms,react-tinacms-inline
```

> ### Warning
>
> This will only work for packages loaded by webpack. That means that environments which don't use
> webpack (i.e. SSR builds) will not use this alias

### 🏗️ Project Structure

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
<br>