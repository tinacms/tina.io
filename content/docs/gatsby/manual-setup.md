---
title: Manual Setup
id: /docs/gatsby/manual-setup
prev: /docs/gatsby/quickstart
next: /docs/gatsby/markdown
consumes:
  - file: /packages/gatsby-plugin-tinacms/gatsby-browser.tsx
    details: Depends on Tina component wrapping the root element
  - file: /packages/gatsby-plugin-tinacms/gatsby-ssr.tsx
    details: Depends on Tina component wrapping the root element
---

Learn how to set up Tina on an existing Gatsby site.

After this guide, you will have installed and added the TinaCMS sidebar to your project. However, this won't make your content editable. Go to the [next guide](/docs/gatsby/markdown) to learn how to make content editable.

Assumptions: This guide assumes you have the Gatsby CLI installed, Node & a package manager.

Note: Don't have a site yet? Refer to the [quickstart page](/docs/gatsby/quickstart).

## Installation

```
npm install --save gatsby-plugin-tinacms styled-components
```

or

```
yarn add gatsby-plugin-tinacms styled-components
```

## Adding the Plugin

Open your `gatsby-config.js` file and add `'gatsby-plugin-tinacms'` to the list of plugins:

**gatsby-config.js**

```javascript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          // We'll add some Tinacms plugins in the next step.
        ],
      },
    },
    // ...
  ],
}
```

## Accessing the CMS

1. **Start the Gatsby development server**

   ```
   gatsby develop
   ```

1. **Visit your Website**

   Go to https://localhost:8000 to access your website.

1. **Open the CMS**

   You will notice there's a pencil icon, this is the way you can toggle the Tina sidebar.

Hooray!

If you see the icon and can open the editing sidebar, this means you've successfully installed & configured Tina. You will see a note that there is no editable content on the site yet. Follow the next steps to learn how to make content editable.
