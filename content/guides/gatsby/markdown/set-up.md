---
title: Set-Up
---

This guide will show you how to use helpers from the `gatsby-tinacms-remark` package to make editing Markdown content easier.

## Prerequisites

- A Gatsby site with [Tina Configured](/guides/gatsby/adding-tina/project-setup)
- A [Git backend](/guides/gatsby/using-git/installation) set up

## Install the Markdown Package

The [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin lets us use Markdown in our Gatsby sites:

- `gatsby-tinacms-remark`: Provides hooks and components for creating Remark forms.

> This guide assumes your Gatsby site is already setup to use Markdown. Check out the [Gatsby Docs](https://www.gatsbyjs.org/docs/adding-markdown-pages/) to learn how to use Markdown in your site.

    yarn add gatsby-tinacms-remark

## Adding the Remark Plugin

Open the `gatsby-config.js` file and add the plugin:

```diff
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          "gatsby-tinacms-git",
+         "gatsby-tinacms-remark",
        ],
      },
    },
    // ...
  ],
}
```

Next, we'll create a form to edit content.
