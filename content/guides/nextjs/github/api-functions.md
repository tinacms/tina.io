---
title: Adding API functions
---

We need a few API functions to handle GitHub authorization and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode). With Next.js, any functions in the `pages/api` directory are mapped to `/api/*` endpoints. Files in this directory are treated as [API endpoints](<](https://nextjs.org/docs/api-routes/introduction)>) instead of pages.

> If you see a 'dummy' `hello.js` file in the `pages/api` directory, feel free to delete it.

We'll add some files in this directory to connect the API helpers to our project. Using the code generator [Hygen](https://www.hygen.io/), we've created a few [scripts](https://github.com/dwalkr/hygen-next-tinacms-github) to **help generate the required files** for this step. From the terminal, run:

```bash,copy
npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
npx hygen next-tinacms-github bootstrap --format ts
```

> _Note:_ if your **pages directory is not in the root**, you will need to supply a `--dir [subDir]` option for this last script.
>
> ```bash
> # Example setting sub directory option
> npx hygen next-tinacms-github bootstrap --format ts --dir src
> ```

You should see a new `_templates` directory has been created and a few API files have been set up in `pages/api`:

- `preview.ts`: Contains an API function to enter [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and set up preview data.
- `reset-preview.ts`: Contains an API function to exit Preview Mode.
- `proxy-github.ts`: Proxies requests to the GitHub API, attaching the user's OAuth token to the request.
- `create-github-access-token.ts`: Creates a function to handle authorization with the GitHub OAuth API.

After these files are created, you can delete the `_templates` folder.
