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

## Not Familiar with Tina?

We've put together a simple explanation of the project directory – in [_docs/Directory-Structure](_docs/Directory-Structure.md).

This should give you an idea of how it all fits into the project.

Additionally, the Tina [docs](https://tina.io/docs/) contains the usage details for development with Tina.

<br>