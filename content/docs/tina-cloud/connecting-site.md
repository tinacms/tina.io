---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To have editing work in production, in the config within the `.tina/client.<ts|js>` file, configure the `clientId` to point to our Tina Cloud project, and add our generated `token`.

```tsx
// .tina/client.ts

// config
// ...
const clientId = '<Your Client ID>' // generated on app.tina.io
const token = '<Your Read Only Token>' // generated on app.tina.io
//

// ...
```

## Configuring the branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```tsx
// .tina/client.ts

// config
// ...
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.BRANCH ||
  'main'
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit.
> `BRANCH` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata).

Your fully configured `.tina/client.ts` should look something like this:

```tsx
import { createClient } from 'tinacms/dist/client'

// config
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.BRANCH ||
  'main'
const clientId = '<Your Client ID>' // generated on app.tina.io
const token = '<Your Read Only Token>' // generated on app.tina.io
//

const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`

export const client = createClient({
  url: apiURL,
  token,
})
```

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.
