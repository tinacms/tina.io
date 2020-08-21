---
title: Install & Set-up
---

This guide will show you how to set up a Git-based backend on your Gatsby site. It will also cover creating forms to edit Markdown and/or JSON data files with changes tracked in Git.

> **Note:** Building a CMS with Gatsby requires that you run a development server for content-editing. You can use a service like [Gatsby Cloud](/blog/using-tinacms-on-gatsby-cloud) or you can [run your own server](https://levelup.gitconnected.com/provision-setup-and-secure-a-tinacms-cloud-editor-on-aws-e96b0e060e7c).

## Prerequisites

- A Gatsby site with [Tina Configured](/guides/gatsby/adding-tina/project-setup)
- This guide assumes your Gatsby site is already setup to use [Markdown](https://www.gatsbyjs.org/docs/adding-markdown-pages/) and/or [JSON](https://www.gatsbyjs.org/docs/sourcing-content-from-json-or-yaml/) as a data source.

## Install the Packages

    yarn add gatsby-tinacms-git gatsby-tinacms-remark gatsby-tinacms-json

## Add the Plugins

Open the `gatsby-config.js` file and add the packages to the `plugins` array for `gatsby-plugin-tinacms`:

```javascript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        enabled: process.env.NODE_ENV !== 'production',
        sidebar: true,
        plugins: [
          'gatsby-tinacms-git',
          'gatsby-tinacms-remark',
          'gatsby-tinacms-json',
        ],
      },
    },
    // ...
  ],
}
```

Notice the `enabled` & `sidebar` options, these ensure that the CMS [sidebar UI](/docs/ui) will render in development mode. Refer to the documentation to learn about all the [CMS configuration options](/docs/cms#cms-configuration).

## Configure the Git Plugin

The Git plugin provides some options that can be adjusted depending on the needs of your project. These options need to be configured for content changes to properly persist.

In your `gatsby-config.js` file, you can define these plugin options. Please reference [the documentation](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-git) to learn about all of the available options.

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
        enabled: process.env.NODE_ENV !== 'production',
        sidebar: true,
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

Now the Git, Markdown, & JSON plugins are set up, you can create forms that can persist and commit changes to the associated repository.

If you restart the dev server, you should see the sidebar toggle in the lower left-hand corner. Since we don't have any forms registered, the sidebar is empty. Next, we'll create a form to edit content.
