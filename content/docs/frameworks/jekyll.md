---
title: Jekyll + TinaCMS Setup Guide
id: '/docs/frameworks/jekyll'
prev: '/docs/setup-overview'
next: '/docs/using-tina-editor'
---

## Introduction

TinaCMS can be added to your Jekyll site locally. In this doc, we'll guide through the local setup, as well as editing on your production site.

## Getting Started

From within your site's directory, run:

```bash
 npx @tinacms/cli@latest init
```

This will ask you a few setup questions.

When prompted for the "**public assets directory**", enter: "**./**".

> If you are importing your site from Forestry.io CMS, some models & config will be auto-imported.

## Model your content

To edit your site's content in Tina, you can model your content in the tina/config.ts file.

Learn more about content modelling [here](/docs/schema/)

## Starting TinaCMS

You can start TinaCMS with:

```bash
npx tinacms dev -c "jekyll serve"
```

> `jekyll serve`can be replaced with your site's custom dev command.

With TinaCMS running, navigate to `http://localhost:4000/admin/index.html`

> ^ The above default port may differ depending on your framework.

> Hint: If you are getting error when running this command please see the [Common Errors](/docs/forestry/common-errors) page.

At this point, you should be able to see the Tina admin, select a post, save changes, and see the changes persisted to your local markdown files.

![](/img/hugo-tina-admin-screenshot.png)

## Next Steps

- [Check out the content Modeling docs](/docs/schema/)
- [Learn how to query your content](/docs/features/data-fetching/)
- [Deploy Your Site](/docs/tina-cloud)
