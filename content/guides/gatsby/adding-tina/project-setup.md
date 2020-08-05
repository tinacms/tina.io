---
title: Project Setup
---

This guide will show you how to set up Tina on a Gatsby site. Since Gatsby lets you pull content in from multiple data sources, these docs will only cover adding to Tina to your site and creating forms for content stored in memory. This guide does not show you how to set up a backend, which would persist content changes.

The purpose of this is to get you familiar with the rudimentary steps of setting up Tina on a Gatsby site.

---

## Prerequisites

To run all the tools required you need at least the following installed:

- [Node.js](https://nodejs.org/en/) (8.0.0+)
- [Yarn](https://yarnpkg.com) (Optional. You can still use `npm` if you want, but this is for your own sanity.)

We're going to use the [Gatsby Starter Blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) as the base for our project. Create a new project by running the following commands in your terminal:

```bash
# If you don't have Gatsby CLI installed
yarn global add gatsby-cli
# Create a new starter blog
gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

This will create a new blog starter in the `gatsby-starter-blog` directory. Navigate to the project directory and run `yarn dev` to start the website in dev mode.

```bash
cd gatsby-starter-blog
gatsby develop
```

You will now be able to visit your site at https://localhost:8000

## Installing

```bash
yarn add gatsby-plugin-tinacms styled-components
```

## Add the Plugin

Open your `gatsby-config.js` file and add `'gatsby-plugin-tinacms'` to the list of plugins:

**gatsby-config.js**

```javascript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        // The CMS will be disabled on your production site
        enabled: process.env.NODE_ENV !== 'production',
        sidebar: true,
        plugins: [
          // We'll add some gatsby-tinacms plugins later
        ],
      },
    },
    // ...
  ],
}
```

## Accessing the CMS

1. **Restart the Gatsby development server**

```bash
    gatsby develop
```

2. **Visit your Website**

   Go to https://localhost:8000 to access your website.

3. **Open the CMS**

   You will notice there's a pencil icon, this is the way you can toggle the Tina sidebar.

Hooray!

If you see the icon and can open the editing sidebar, this means you've successfully installed & configured Tina. You will see a note that there is no editable content on the site yet. Follow the next steps to learn how to make content editable.
