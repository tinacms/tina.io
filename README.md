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

## Not Familiar with Tina?

We've put together a simple explanation of the project directory – in [_docs/Directory-Structure](_docs/Directory-Structure.md).

This should give you an idea of how it all fits into the project.

Additionally, the Tina [docs](https://tina.io/docs/) contains the usage details for development with Tina.

<br>