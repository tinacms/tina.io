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

## Next Steps

- [Check out the content Modeling docs](/docs/schema/)
- [Learn how to query your content](/docs/features/data-fetching/)
- [Deploy Your Site](/docs/tina-cloud)
