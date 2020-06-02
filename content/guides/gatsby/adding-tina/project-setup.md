---
title: Project Setup
---

We're going to use the [Gatsby Starter Blog](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/) as the base for our project. Create a new project by running the following commands in your terminal:

```bash
gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

This will create a new blog starter in the `gatsby-starter-blog` directory. Navigate to the project directory and run `yarn dev` to start the website in dev mode.

```bash
cd gatsby-starter-blog
gatsby develop
```

You will now be able to visit your site at https://localhost:8000

## Installing

```
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

   ```
   gatsby develop
   ```

1. **Visit your Website**

   Go to https://localhost:8000 to access your website.

1. **Open the CMS**

   You will notice there's a pencil icon, this is the way you can toggle the Tina sidebar.

Hooray!

If you see the icon and can open the editing sidebar, this means you've successfully installed & configured Tina. You will see a note that there is no editable content on the site yet. Follow the next steps to learn how to make content editable.
