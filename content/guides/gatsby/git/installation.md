---
title: Install & Set-up
---

This guide will show you how to set up a Git-based backend on your Gatsby site. It will also cover creating forms to edit Markdown and/or JSON data files with changes tracked in Git.

## Prerequisites

- A Gatsby site with [Tina Configured](/guides/gatsby/adding-tina/project-setup)
- This guide assumes your Gatsby site is already setup to use either Markdown or JSON as a data source. Check out the Gatsby Docs to learn how to use [Markdown](https://www.gatsbyjs.org/docs/adding-markdown-pages/) or [JSON](https://www.gatsbyjs.org/docs/sourcing-content-from-json-or-yaml/) in your site.

## Install the Packages

    yarn add gatsby-tinacms-git gatsby-tinacms-remark gatsby-tinacms-json

## Add the Plugins

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

The Git plugin provides some options that can be adjusted depending on the needs of your project. These options need to be configured for content changes to properly persist.

<!-- TODO: update this doc link to the site docs, not the README-->

In your `gatsby-config.js` file, you can define these plugin options. The only options that are required are `pathToRepo` and `pathToContent`. Please reference [the documentation](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-git) to see all of the available options.

## Example

**gatsby-config.js**

```javascript
const path = require('path')
const REPO_ABSOLUTE_PATH = path.join(process.cwd(), '../..')

module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          {
            resolve: 'gatsby-tinacms-git',
            options: {
              pathToRepo: REPO_ABSOLUTE_PATH,
              pathToContent: '/',
              defaultCommitMessage: 'Edited with TinaCMS',
              defaultCommitName: 'TinaCMS',
              defaultCommitEmail: 'git@tinacms.org',
              pushOnCommit: false,
            },
          },
          'gatsby-tinacms-json',
          'gatsby-tinacms-remark',
        ],
      },
    },
    // ...
  ],
}
```

Now the Git, Markdown, & JSON plugins are set up, your forms should be able to persist and save changes to the associated repository. Next, we'll create a form to edit content.
