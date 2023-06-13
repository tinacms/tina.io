---
title: Gatsby + Tina Setup Guide
id: '/docs/frameworks/gatsby'
prev: '/docs/setup-overview'
next: '/docs/using-tina-editor'
---

## Introduction

TinaCMS can be added to your Gatsby site locally. In this doc, we'll guide through the local setup, as well as editing on your production site.

## Getting Started

From within your site's directory, run:

```bash
 npx @tinacms/cli@latest init
```

This will ask you a few setup questions.

When prompted for the "**public assets directory**", enter: **static**.

> If you are importing your site from Forestry.io CMS, some models & config will be auto-imported.

### Workaround for GraphQL Mismatch issue

For Gatsby sites, you may run into the following error:

```
> "Duplicate "graphql" modules cannot be used at the same time since different versions may have different capabilities and behavior."
```

To work around this, add the following lines to your **tina/config.ts** file.

```diff
export default defineConfig({
+  client: { skip: true },
// ...
```

### Allowing static /admin/index.html file in dev-mode

Depending on your Gatsby version, you may need to add the following code to your **gatsby-node.js** file, so that the Tina admin is accessible in dev-mode.

```diff
+ const express = require("express");

+ exports.onCreateDevServer = ({ app }) => {
+   app.use("/admin", express.static("public/admin"));
+ };
```

## Model your content

To edit your site's content in Tina, you can model your content in the tina/config.ts file.

Learn more about content modelling [here](/docs/schema/)

## Starting TinaCMS

You can start TinaCMS with:

```bash
npx tinacms dev -c "gatsby develop"
```

> `gatsby develop`can be replaced with your site's custom dev command.

With TinaCMS running, navigate to `http://localhost:8000/admin/index.html`

> ^ The above default port may differ depending on your framework.

> Hint: One common error is caused by running `gatsby clean` **after** `tinacms build`. This causes your admin html file to be wiped out. For more common errors, please see the [Common Errors](/docs/forestry/common-errors) page.

At this point, you should be able to see the Tina admin, select a post, save changes, and see the changes persisted to your local markdown files.

![](/img/hugo-tina-admin-screenshot.png)

## Setting up Visual Editing (Optional)

If you want to power your pages with TinaCMS's API, you'll be able to leverage TinaCMS's visual editing features.

![block-based-editing-visual](/gif/blocks.gif)

Read more about [data fetching](/docs/features/data-fetching/) and [visual editing](/docs/contextual-editing/overview/).

> Note: Visual Editing with Gatsby is considered experimental.

## Deploy Tina to your site

Next we'll take you from editing with TinaCMS locally, to editing in production with your team.

### Step 1) Push your repo to git

Push your repo up to git, along with its new Tina configuration (including `tina/__generated__`).

### Step 2) Setup a Tina Cloud project

In production, we'll want to make sure only authorized users can access your Tina admin, and make changes to your content. You can set up a [Tina Cloud project](https://app.tina.io/) to handle this.
A read-only content token will be automatically generated when the project is created.

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

> You should apply the token above in an environment variable, instead of hard-coding it.

### Step 4) Configure build commands

Tina's build will need to be a part of your site's static generation.
If you are using Netlify, this is configured in `app.netlify.com/sites/<your-site-id>/settings/deploys`

You should prepend `yarn tinacms build && ` or `npm run tinacms build && ` to your site's build command:

![](https://res.cloudinary.com/forestry-demo/image/upload/v1670337650/tina-io/docs/forestry-migration/Screen_Shot_2022-12-06_at_10.38.10_AM.png)

> If your package.json has a "build" script like `tinacms build && <your-site-build-cmd>`, this likely doesn't need to be changed. If your Netlify config is not running a custom build script (e.g `gatsby build`), you would have to change this to `tinacms build && gatsby build`

> If your project has a `netlify.toml` with a build command set, that will take precedence over the above build command UI

For more information on deploying Tina with Netlify, Vercel, or GitHub Pages, [see this doc](/docs/tina-cloud/connecting-site/#deploying-your-site-with-the-tinacms-admin)

### Step 5) Start using Tina!

With that set, you should be able to push your config to Git and start editing on production at `<your-site-url>/admin`!

> Tip: If you have Netlify or Vercel previews set up, you can even edit on `<your-preview-url>/admin`.
