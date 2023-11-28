---
title: Going to Production with Tina Cloud
id: '/docs/tina-cloud/overview'
---

To deploy your site to production, you'll need to connect Tina to a hosted backend. This doc will walk you through the steps to get your site from [running locally to running for production](/docs/tina-cloud/faq/#what-is-local-mode-vs-prod-mode).

## Prerequisites

- Make sure your site is on Github and all changes are pushed (including `tina/tina-lock.json`).
- Make sure you have a [Tina Cloud](https://app.tina.io) account.
  - Check out the [Tina Cloud Dashboard](/docs/tina-cloud/dashboard) docs for more information.

## Make a Tina Cloud Project

Go to [app.tina.io](https://app.tina.io) and create a new [project](/docs/tina-cloud/dashboard/projects/). You'll be asked to connect your Github account and select the repository you want to connect to Tina Cloud.

## Run the Backend Init Command

The next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

```bash
npx @tinacms/cli init backend
```

This will

- Ask you for your ClientId: Can be found in the "Overview" tab of your project.
- Ask you for a Read Only Token: Can be found in the "Tokens" tab of your project.
- Populate your `.env` file with the necessary environment variables to connect to Tina Cloud.
  - If you are using a different environment variable file, OR you have an existing .env fileyou will need to copy these variables over manually.

## Ensure ClientId and Token are Passed to the Config

In the your tina/config file, make sure the `clientId` and `token` are passed to the config.

```tsx
// tina/config.ts
//...
export default defineConfig({
  //...
  token:  process.env.TINA_TOKEN, // This should match the value in your .env file
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID // This should match the value in your .env file
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

This is may have already been setup in the init process but you should ensure that the branch is being passed to the config.

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```diff
// tina/config.ts
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

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is Vercel's [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit.
> `HEAD` is the equivalent system environment variable used by [Netlify](https://docs.netlify.com/configure-builds/environment-variables/#git-metadata).

Your fully configured `tina/config.{js,ts}` should look something like this:

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

The apiURL is configured to use the local Content API in development (to query your local files), and the hosted content API (with auth) in production.

## Deploying your site (with the TinaCMS admin)

The next step is to update your deployment configuration, so the TinaCMS admin gets built alongside your site. This allows your editors to enter the CMS through `<your-site>/admin` (or `your-site/admin/index.html`).

In general, you'll want to make sure that your build command is running `tinacms build` before your site's build command. This will build the TinaCMS admin alongside your site. You'll also want to make sure that your Tina `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are setup as environment variables on your host.

We have docs for some popular deployment options:

- [Vercel](/docs/tina-cloud/deployment-options/vercel)
- [Netlify](/docs/tina-cloud/deployment-options/netlify)
- [GitHub Pages](/docs/tina-cloud/deployment-options/github-pages)
