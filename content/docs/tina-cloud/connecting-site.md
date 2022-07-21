---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To have editing work in production, in the `.tina/schema.<ts|js>` file, configure the `clientId` to point to your Tina Cloud project, and add your generated `token`.

```tsx
// .tina/schema.ts
//...
const schema = defineSchema({
  config: {
    token: '<Your Read Only Token>' // generated on app.tina.io,
    clientId: '<Your Client ID>', // generated on app.tina.io
    branch,
  },
  collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ],
})

export default schema
```

## Configuring the branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```diff
// .tina/schema.ts
//...
+const branch =
+  process.env.NEXT_PUBLIC_TINA_BRANCH ||
+  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
+  process.env.HEAD ||
+  'main'
const schema = defineSchema({
  config: {
    token: '<Your Read Only Token>' // generated on app.tina.io,
    clientId: '<Your Client ID>', // generated on app.tina.io
    branch,
  },
  collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ],
})

export default schema
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit.
> `BRANCH` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata).

Your fully configured `.tina/schema.ts` should look something like this:

```ts
// .tina/schema.ts
import { defineSchema } from 'tinacms'

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'
const schema = defineSchema({
  config: {
    token: '<Your Read Only Token>' // generated on app.tina.io
    clientId: '<Your Client ID>', // generated on app.tina.io
    branch,
  },
  collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ],
})

export default schema
```

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.
