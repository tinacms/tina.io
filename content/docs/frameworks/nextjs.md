---
title: NextJS + TinaCMS Setup Guide
id: '/docs/frameworks/nextjs'
prev: '/docs/setup-overview'
next: '/docs/using-tina-editor'
---

## Introduction

TinaCMS can be added to your NextJS site locally. In this doc, we'll guide through the local setup, as well as editing on your production site.

> You can reference one of our [(NextJS) Tina Barebones Starter](https://github.com/tinacms/tina-barebones-starter) for an example.

## Getting Started

From within your site's directory, run:

```bash
 npx @tinacms/cli@latest init
```

This will ask you a few setup questions.

When prompted for the "**public assets directory**", enter: **public**.

## Updating your build scripts

Depending on your framework, `tina init` may try to update your `package.json` scripts.

```json
  "scripts": {
    "dev": "tinacms dev -c \"next dev\"",
    "build": "tinacms build && next build",
    "start": "tinacms build && next start"
  }
```

These should be applied manually if they haven't been set by the CLI.

## Model your content

To edit your site's content in Tina, you can model your content in the tina/config.ts file.

Learn more about content modelling [here](/docs/schema/)

## Starting TinaCMS

You can start TinaCMS with:

```bash
yarn tinacms dev -c "next dev"
```

> `next dev`can be replaced with your site's custom dev command.

With TinaCMS running, navigate to `http://localhost:3000/admin/index.html`

> ^ The above default port may differ depending on your framework.

> Hint: If you are getting error when running this command please see the [Common Errors](/docs/forestry/common-errors) page.

At this point, you should be able to see the Tina admin, select a post, save changes, and see the changes persisted to your local markdown files.

![](/img/hugo-tina-admin-screenshot.png)

## Setting up Visual Editing (Optional)

If you want to power your pages with TinaCMS's API, you'll be able to leverage TinaCMS's visual editing features.

![block-based-editing-visual](/gif/blocks.gif)

Read more about [data fetching](/docs/features/data-fetching/) and [visual editing](/docs/contextual-editing/overview/).

## Next Steps

- [Check out the content Modeling docs](/docs/schema/)
- [Learn how to query your content](/docs/features/data-fetching/)
- [Deploy Your Site](/docs/tina-cloud)
