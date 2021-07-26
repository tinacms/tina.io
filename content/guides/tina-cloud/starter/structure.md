---
title: Tina Cloud Starter structure
last_edited: '2021-06-15T12:04:50.542Z'
---

From here, you're ready to start building your own project. This section explains a bit about how this project is structured, and how to modify it to make it your own.

## Starter structure

Tina Cloud Starter is a [Next.js](https://nextjs.org) application. The file-based routing happens through the `pages` directory. To edit this site click the "edit this site" button. This will cause you to go into edit mode where Tina is loaded. Tina is only loaded in edit mode so it will not effect the production bundle size.

### `.tina/schema.ts`

This is where your schema is defined, when you make changes here you'll notice that the generated GraphQL API changes too. It's a good idea to run your GraphQL server while editing so you can see any breakages.

> Tip: Visit the GraphQL GUI at `http://localhost:4001/altair` so you can see how changes to the schema are updated in GraphQL.

Head over to the [reference](/docs/tinacms-reference/) documentation to learn more about [defining a schema](/docs/schema/) or [querying with GraphQL](/docs/graphql/)

### The `content` folder

Here's where your actual content lives, you can control how content is stored from the `defineSchema` function, by default we use `markdown`.

### `pages/_app.js`

The `_app.js` file is a feature in Next.js that allows you to wrap all of your routes in some specific logic which will be applied to every page. We're using it to wrap your site content in TinaCMS context. We do this so when data passes through, we can _hydrate_ it so that it's editable in real time. You may notice that it's being loaded dynamically based on something called `EditState`, when you're in edit mode we'll load `TinaCMS` and all that it provides. When you're not in edit mode Tina stays out of the way so your builds stay lean.

By default we've toggle the `showEditButton` to `true`. You'll likely want to remove that option as it'll show for visitors to your site.

### `pages/posts/[filename].tsx`

The posts are stored in the `content/posts` directory of this repository, and their routes are built with `getStaticPaths` dynamically at build time. You'll notice a couple of helper functions like `getStaticPropsForTina` and `staticRequest`. These are helper functions to make sure you're returning data from the local GraphQL server in a shape that Tina understands. Feel free to bring your own http client if you'd like. Read more about these helpers in the [Next.JS APIs documentation](/docs/tinacms-context/)

### Creating your own pages

For now, TinaCMS works best when you:

1. Use `getStaticProps` for data
2. Return data from `getStaticProps` with `data`, `query`, and `variables` properties.
3. Wrap your `_app.js` in TinaCMS dynamically.

After that, you're on your own. Go build something and share it with us on [Twitter](https://twitter.com/tina_cms).
