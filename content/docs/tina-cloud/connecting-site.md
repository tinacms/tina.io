---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To have editing work in production, in the `.tina/config.<ts|js>` file, configure the `clientId` to point to your Tina Cloud project, and add your generated `token`.

```tsx
// .tina/config.ts
//...
const schema = defineSchema({
  collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ],
})

export default defineConfig({
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema,
})
```

{{ WarningCallout text="Note ⚠️ If you're loading your schema config values from a local environment file, note that Tina's build process will only pickup `.env` files, (not `.env.local` or `.env.development` files)" }}

## Configuring the branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```diff
// .tina/config.ts
//...
+const branch =
+  process.env.NEXT_PUBLIC_TINA_BRANCH ||
+  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
+  process.env.HEAD ||
+  ''
const schema = defineSchema({
  collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ],
})

export default defineConfig({
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema,
})
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit.
> `HEAD` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata).

Your fully configured `.tina/config.{js,ts}` should look something like this:

```ts
import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  //...
})

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD

export default defineConfig({
  token: '<Your Read Only Token>' // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema,
})
```

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.
