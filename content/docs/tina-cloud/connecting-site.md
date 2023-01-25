---
title: Connecting the site
next: /docs/tina-cloud/faq
---

Once you've created a project in **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/ ""), we showed you how the Tina context is setup on your site.

To have editing work in production, in the `.tina/config.<ts|js>` file, configure the `clientId` to point to your Tina Cloud project, and add your generated `token`.

```tsx
// .tina/config.ts
//...
export default defineConfig({
  //...
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ]}
})
```

<div class="short-code-warning">
  <div>
    <p>Note ⚠️ If you're loading your schema config values from a local environment file, note that Tina's build process will only pickup `.env` files, (not `.env.local` or `.env.development` files)</p>
  </div>

  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z" />
  </svg>
</div>

## Configuring the branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```diff
// .tina/config.ts
//...
+ const branch =
+  process.env.NEXT_PUBLIC_TINA_BRANCH ||
+  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
+  process.env.HEAD ||
+  ''
export default defineConfig({
  //...
  token: '<Your Read Only Token>' // generated on app.tina.io,
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    collections: [
    //...
    // See https://tina.io/docs/schema/ for more info about "collections"
  ]}
})
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables "") that represents the branch that has made the deployment commit.
> `HEAD` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata "").

Your fully configured `.tina/config.{js,ts}` should look something like this:

```ts
import {  defineConfig } from 'tinacms'

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD

export default defineConfig({
  token: '<Your Read Only Token>' // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  branch,
  schema: {
    // ...
  },
})
```

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.\
\
\## Deploying your site (with the TinaCMS admin)\
\
The next step is to update your deployment configuration, so the TinaCMS admin gets built alongside your site. This allows your editors to enter the CMS through \`\<your-site>/admin\` (or \`your-site/admin/index.html\`).\
\
Here are some popular deployment options:\
\
\### Option: Netlify\
\
\#### Build Configuration\
\
In Netlify, your build configuration can be updated at **Settings** > **Build & Deploy** > **Build Command**.

![Netlify build config](http://res.cloudinary.com/forestry-demo/image/upload/v1674607585/Screen_Shot_2023-01-24_at_8.45.23_PM_gbqyqb.png "Netlify build config")

> If your package.json has a "build" script like \`tinacms && \<your-site-build-cmd>\`, this likely doesn't need to be changed. If your Netlify config is not running a custom build script (e.g \`next build\`), you would have to change this to \`tinacms dev && next build\`

\#### Environment variables\
\
Assuming that your Tina `clientID` and `token` are setup as environment variables, you will need to add those to the Netlify UI for your project. You can learn more about environment variables [here](https://docs.netlify.com/environment-variables/overview/?_ga=2.128850127.213489666.1674607241-1149277376.1674150726 "netlify environment variables")\
\
\### Option: Vercel\
\
Docs coming soon\
\
\### Option: GitHub Pages\
\
Docs coming soon
