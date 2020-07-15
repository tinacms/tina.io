---
title: Install & Set-up
---

This guide will show you how to set up a Git-based backend on your Gatsby site.

## Install the Git Package

    yarn add gatsby-tinacms-remark gatsby-tinacms-git

## Adding the Git Plugin

Open the `gatsby-config.js` file and add the package to the `plugins` array for `gatsby-plugin-tinacms`:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          "gatsby-tinacms-git",

        ],
      },
    },
    // ...
  ],
}
```

Now the Git plugin is set up, your forms should be able to persist and save changes to the associated repository. Next, we'll look into various configuration options.
