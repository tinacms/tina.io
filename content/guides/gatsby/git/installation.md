---
title: Install & Set-up
---

This guide will show you how to set up a Git-based backend on your Gatsby site. It will also cover creating forms to edit Markdown and / or JSON data files with changes tracked in Git.

## Prerequisites

- A Gatsby site with [Tina Configured](/guides/gatsby/adding-tina/project-setup)

## Install the Packages

    yarn add gatsby-tinacms-git gatsby-tinacms-remark gatsby-tinacms-json

> This guide assumes your Gatsby site is already setup to use either Markdown or JSON. Check out the [Gatsby Docs](https://www.gatsbyjs.org/docs/adding-markdown-pages/) to learn how to use Markdown in your site.

## Adding the Plugins

Open the `gatsby-config.js` file and add the packages to the `plugins` array for `gatsby-plugin-tinacms`:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          "gatsby-tinacms-git",
          "gatsby-tinacms-remark",
          "gatsby-tinacms-json"
        ],
      },
    },
    // ...
  ],
}
```

Now the Git, Markdown, & JSON plugins are set up, your forms should be able to persist and save changes to the associated repository. Next, we need to configure the Git Plugin for it to work properly.
