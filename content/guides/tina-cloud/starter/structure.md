---
title: Tina Cloud Starter structure
last_edited: '2021-08-23T01:43:21.819Z'
---
From here, you're ready to start building your own project. This section explains a bit about how this project is structured, and how to modify it to make it your own.

## Starter structure

Tina Cloud Starter is a <a href="https://nextjs.org" target="_blank">Next.js</a> application. The file-based routing happens through the `pages` directory. To edit this site, navigate to the `/admin` route. This will cause you to go into edit mode where Tina is loaded. Tina is only loaded in edit mode so it will not effect the production bundle size.

### `.tina/schema.ts`

This is where your schema is defined, when you make changes here you'll notice that the generated GraphQL API changes too. It's a good idea to run your GraphQL server while editing so you can see any breakages.

> Tip: Visit the GraphQL GUI at `http://localhost:4001/altair` so you can see how changes to the schema are updated in GraphQL.\\

### `pages/[filename].tsx`

This page can be seen at `http://localhost:3000/`, it loads the content from a markdown file which can be found in this repository at `/content/pages/home.md`. You can edit this page at by navigating to `http://localhost:3000/admin`.

### `pages/posts/[filename].tsx`

The posts are stored in the `content/posts` directory of this repository, and their routes are built with `getStaticPaths` dynamically at build time.

### `components`

Most of the components in this project are very basic and are for demonstration purposes, feel free to replace them with something of your own!

## Content Modeling

With Tina Cloud there's no need to build forms manually like you would with TinaCMS. Instead, you're required to define a schema that acts as the single source of truth for the shape and structure of your content.

This is set up for you in `./.tina/schema.ts`, let's break down what this function is doing:

```ts
import { defineSchema } from "tina-graphql-gateway-cli";
```

Head over to the [reference](/docs/tinacms-reference/) documentation to learn more about [defining a schema](/docs/schema/) or [querying with GraphQL](/docs/graphql/)

### `pages/posts/[filename].tsx`

### `defineSchema`

> ℹ️ <a href="/docs/schema" target="_blank">Read the CLI documentation</a> for more details about the `defineSchema` API.

Be sure this is your default export from this file, we'll validate the schema and build out the GraphQL API with it.

### `collections`

The top-level key in the schema is an array of _collections_, a `collection` informs the API about _where_ to save content. You can see from the example that a `posts` document would be stored in `content/posts`, and it can be the shape of any `template` from the `templates` key.

### `templates`

The posts are stored in the `content/posts` directory of this repository, and their routes are built with `getStaticPaths` dynamically at build time.

### The `content` folder

Here's where your actual content lives, you can control how content is stored from the `defineSchema` function, by default we use `markdown`.

### `components`

Most of the components in this project are very basic and are for demonstration purposes, feel free to replace them with something of your own!

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