---
title: Astro + Tina Setup Guide
id: '/docs/frameworks/astro'
prev: '/docs/setup-overview'
next: '/docs/using-tina-editor'
---

## Introduction

TinaCMS can be added to your Astro site locally. In this doc, we'll guide through the local setup, as well as editing on your production site.

## Getting Started

From within your site's directory, run:

```bash
 npx @tinacms/cli@latest init
```

This will ask you a few setup questions.

When prompted for the "**public assets directory**", enter: **public**.

## Model your content

To edit your site's content in Tina, you can model your content in the tina/config.ts file.

Learn more about content modelling [here](/docs/schema/)

## Starting TinaCMS

You can start TinaCMS with:

```bash
npx tinacms dev -c "astro dev --port 8080"
```

> `astro dev --port 8080`can be replaced with your site's custom dev command.

With TinaCMS running, navigate to `http://localhost:8080/admin/index.html`

> ^ The above default port may differ depending on your framework.

> Hint: If you are getting error when running this command please see the [Common Errors](/docs/forestry/common-errors) page.

At this point, you should be able to see the Tina admin, select a post, save changes, and see the changes persisted to your local markdown files.

![](/img/hugo-tina-admin-screenshot.png)

## Setting up Visual Editing (Optional)

If you want to power your pages with TinaCMS's API, you'll be able to leverage TinaCMS's visual editing features.

![block-based-editing-visual](/gif/blocks.gif)

Read more about [data fetching](/docs/features/data-fetching/) and [visual editing](/docs/contextual-editing/overview/).

> Note: Visual Editing with Astro is considered experimental. [See Discussion](https://github.com/tinacms/tinacms/discussions/3399)

## Deploy Tina to your site

Next we'll take you from editing with TinaCMS locally, to editing in production with your team.

### Step 1) Push your repo to git

Push your repo up to git, along with its new Tina configuration (including `tina/__generated__`).

### Step 2) Setup a Tina Cloud project

In production, we'll want to make sure only authorized users can access your Tina admin, and make changes to your content. You can setup a [Tina Cloud project](https://app.tina.io/) to handle this.
Once your project is created, you'll also need to generate a read-only-token.

See our [Tina Cloud docs](https://tina.io/docs/tina-cloud/) for help using Tina Cloud.

### Step 3) Connect the Tina Cloud config to your site

Locally, in your tina/config.js file, set the following config properties:

```diff
export default defineConfig({
// ...
-    clientId: null,
+    clientId: "<your-tina-cloud-projects-client-id>",
-    token: null,
+    token: "<your-tina-cloud-projects-token>"
```

> You should apply the token above in an environment variable, instead of hardcoding it.

### Step 4) Configure build commands

Tina's build will need to be apart of your site's static generation.
If you are using Netlify, this is configured in `app.netlify.com/sites/<your-site-id>/settings/deploys`

You should prepend `yarn tinacms build && ` or `npm run tinacms build && ` to your site's build command:

![](https://res.cloudinary.com/forestry-demo/image/upload/v1670337650/tina-io/docs/forestry-migration/Screen_Shot_2022-12-06_at_10.38.10_AM.png)

> If you're using the build command defined in your package.json, this value is likely something like: `yarn build`

For more information on deploying Tina with Netlify, Vercel, or GitHub Pages, [see this doc](/docs/tina-cloud/connecting-site/#deploying-your-site-with-the-tinacms-admin)

### Step 5) Start using Tina!

With that set, you should be able to push your config to Git and start editing on production at `<your-site-url>/admin`!

> Tip: If you have Netlify or Vercel previews set up, you can even edit on `<your-preview-url>/admin`.
