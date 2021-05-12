---
title: Tina Cloud Starter structure
last_edited: '2021-05-10T10:00:00.000Z'
---

## Starter structure

Tina Cloud Starter is a [Next.js](https://nextjs.org) application. The file-based routing happens through the `pages` directory. To edit this site click the "edit this site" button. This will cause you to go into edit mode where Tina is loaded. Tina is only loaded in edit mode so it will not effect the production bundle size.

### `pages/index.tsx`

This page can be seen at `http://localhost:3000/`, it loads the content from a markdown file which can be found in this repository at `/content/marketing-pages/index.md`. You can edit this page at by clicking the "enter edit mode" button in the top right hand corner

We wrap the site in a small `EditProvider` component, that stores whether or not we are in edit mode in React state and localstorage. When we are in edit mode it triggers authentication when needed, and then one is in edit mode.

What makes this possible is `getStaticProps`: you'll notice that every editable page exports a `query` prop and a data prop from `getStaticProps`. When we are not in `editMode` we use the data prop to render the site. When we are in edit mode we use the query to fetch the latest data from Tina Cloud and create the sidebar form.

### `pages/posts/[filename].tsx`

The posts are stored in the `content/posts` directory of this repository, and their routes are built with `getStaticPaths` dynamically at build time. To go in edit mode, click the "edit this site" button. This re-renders your site by wrapping it when a `TinaProvider` component, this only happens in edit mode to make sure Tina is not added to your production bundle.

### `components`

Most of the components in this project are very basic and are for demonstration purposes, feel free to replace them with something of your own!

## Content Modeling

With Tina Cloud there's no need to build forms manually like you would with TinaCMS. Instead, you're required to define a schema which acts as the single source of truth for the shape and structure of your content.

This is set up for you in `./.tina/schema.ts`, let's break down what this function is doing:

```ts
import { defineSchema } from "tina-graphql-gateway-cli";

export default defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      templates: [
        {
          label: "Article",
          name: "article",
          fields: [
            {
              type: "text",
              label: "Title",
              name: "title",
            },
            {
              type: "reference",
              label: "Author",
              name: "author",
              collection: "authors",
            },
          ],
        },
      ],
    },
  ]
}
```

### `defineSchema`

> ℹ️ Read the CLI documentation for for more details about the `defineSchema` API.

Be sure this is your default export from this file, we'll validate the schema and build out the GraphQL API with it.

### `collections`

The top-level key in the schema is an array of _collections_, a `collection` informs the API about _where_ to save content. You can see from the example that a `posts` document would be stored in `content/posts`, and it can be the shape of any `template` from the `templates` key.

### `templates`

Templates are responsible for defining the shape of your content, you'll see in the schema for this starter that we use `templates` for `collections` as well as `blocks`. If you look at the `landingPage` template, you'll notice that it has a set of `blocks`, which are also templates.

## Local development workflow tips

### Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated TypeScript types.
These are rebuilt when your `.tina` config changes.

You can import them from the `.tina` folder and use them to help guide your application development:

```tsx
import type { Posts_Document } from "../../.tina/__generated__/types";

...
return {
  props: {
    data: await client.request<{ getPostsDocument: Posts_Document }>(query,
    {
      variables,
    }),
    ...
  },
};
```

### Visual Studio Code

#### GraphQL extension

Tina Cloud generates your GraphQL schema automatically. 🪄

[Install GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) to benefit from type auto-completion.

### Explore the GraphQL API

If you have a GraphQL client like [Altair](https://altair.sirmuel.design/) go to `http://localhost:4001/graphql` to learn more about our GraphQL API.
