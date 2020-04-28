---
title: Adding API functions
---

We will need a few API functions to handle GitHub authentication and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode). With Next.js, any functions in the `pages/api` directory are are mapped to `/api/*` endpoints.

Using the code generator [Hygen](https://www.hygen.io/), we've created a few [scripts](https://github.com/dwalkr/hygen-next-tinacms-github) to **help generate the required files** for this step. From the terminal, run:

```bash
npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
npx hygen next-tinacms-github bootstrap --format ts
```

You should see a few API functions have been set up in your project, along with a new `_templates` directory.

- `preview.ts`: Contains API function to enter [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode), and set the preview-data with content stored in the cookies.
- `proxy-github.ts`: Contains API function to attach the user's auth token, and proxy requests to the GitHub API.
- `create-github-auth-token.ts`: Helper for creating a `createCreateAccessToken` server function.

> _Note:_ if your **pages directory is not in the root**, you will need to supply a `--dir [subDir]` option for this last script.
>
> ```bash
> # Example setting sub directory option
> npx hygen next-tinacms-github bootstrap --format ts --dir src
> ```
