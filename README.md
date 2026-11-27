### Hi Legends 👋

# <p align="center">Tina.io – the Website for [TinaCMS](https://github.com/tinacms/tinacms)</p>

Source code for the tina.io website: the TinaCMS marketing site and blog. The documentation lives in [tinacms/docs](https://github.com/tinacms/docs) and is served under `tina.io/docs` through a rewrite.

Found a bug? Create a PBI and we'll look into it.

## 🧿 Vision

Make a website to communicate the awesomeness of TinaCMS.

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

The repo uses Node 24 (pinned in `.nvmrc` and the `engines` field of `package.json`) and [pnpm](https://pnpm.io/) 9.6.0 (pinned in the `packageManager` field of `package.json`).

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

Note: if you get an error that say's something like "end of JSON input" – try running the command again.

<br>

## Not Familiar with Tina?

We've put together a simple explanation of the project directory – in [\_docs/Directory-Structure](_docs/Directory-Structure.md).

This should give you an idea of how it all fits into the project.

Additionally, the Tina [docs](https://tina.io/docs/) contains the usage details for development with Tina.

<br>

## Additional Documentation

- [Definition of Done (work requirements)](/_docs/Definition-of-Done.md)
- [Definition of Ready (PBI requrements)](/_docs/Definition-of-Ready.md)
- [Contribution Guidelines](CONTRIBUTING.md)

### Design  

The Tina.io site aims to adhere to the design library created by the awesome designers at [SSW](https://ssw.com.au)

- [Tina.io Design Library](https://www.figma.com/design/qFedRo7Xsc9oexI2IoPbFG/Tina.io-Design-Library?node-id=0-1&p=f&t=Dvm7mhFHhIWC6Rru-0) on Figma

### 🔍 Search Functionality Overview

- `indices/createIndices.ts` indexes the blog posts in `content/blog`, which `data-api/fetchBlogs.ts` reads from disk.
- The posts go into an **[Algolia](https://www.algolia.com/)** index that backs the blog search modal and the `/search` page.
- The `create-indices.yml` GitHub Actions workflow rebuilds the index on every push to the `main` branch.

The documentation is not indexed here. It lives in the [tinacms/docs](https://github.com/tinacms/docs) repo.
