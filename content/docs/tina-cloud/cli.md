---
title: The TinaCMS CLI
---

The _TinaCMS CLI_ can be used to set up your project with TinaCMS schema configuration, and run a local version of the TinaCMS API (using your file system's content). For a real-world example of how this is being used checkout the [Tina Cloud Starter](https://github.com/tinacms/tina-cloud-starter).

## Installation

The CLI can be installed as a dev dependency in your project.

Npm:

```bash
npm install --save-dev @tinacms/cli
```

Yarn:

```bash
yarn add --dev @tinacms/cli
```

## Usage

```
$ -> yarn run @tinacms/cli

Usage:  command [options]

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  server:start [options]  Start Filesystem Graphql Server
  schema:compile          Compile schema into static files for the server
  schema:types            Generate a GraphQL query for your site's schema, (and
                          optionally Typescript types)
  help [command]          display help for command
```

## Getting started

The simplest way to get started is to add a `.tina/schema.ts` file

```
mkdir .tina && touch .tina/schema.ts
```

### `defineSchema`

`defineSchema` tells the CMS how to build your content API.

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      fields: [
        {
          type: 'string'
          label: 'Title',
          name: 'title',
        },
      ],
    },
  ],
})
```

Be sure this is your default export from this file, we'll validate the schema and build out the GraphQL API with it.

Given the example above, we'd end up with the following GraphQL queries available in our GraphQL schema:

```graphql
# global queries, these will be present regardless of the shape of your schema:
getDocument
getCollection
getCollections
# global mutations
addPendingDocument
updateDocument
# schema-specific queries.
getPostDocument
getPostList
# schema-specific mutations
updatePostDocument
```

You can find your generated schema at `/.tina/__generated__/schema.gql` for inspection.

For more information on how to work with GraphQL, head to the ["GraphQL API"](/docs/graphql) documentation. Or for details on how to define a schema, checkout to the ["Anatomy of a Tina schema"](/docs/schema/) documentation

## Run the local GraphQL server

Let's add some content so we can test out the GraphQL server

#### Add an author

```sh
mkdir content && mkdir content/authors && touch content/authors/napolean.md
```

Now let's add some content to the author

```markdown
---
name: Napolean
avatar: https://images.unsplash.com/photo-1606721977440-13e6c3a3505a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80
---
```

#### Add a post

```sh
mkdir content/posts && touch content/posts/voteForPedro.md
```

Now we add some content to the post

```markdown
---
title: Vote For Pedro
author: content/authors/napolean.md
---

When you use Tina's GraphQL forms, we know about all of the relationships in your content, this allows us to keep your content in-sync with your form state. Try changing the author in the sidebar, notice the author data changes to reflect your new author!
```

#### Start the server

```
yarn run tina-gql server:start
```

This will start the server on `http://localhost:4001` and can be accessed using a GraphQL client on `http://localhost:4001/graphql`

#### Query the content

With a GraphQL client, make the following request:

> Tip: Use a GraphQL client like [Altair](https://altair.sirmuel.design/) when developing locally.

```graphql
getPostDocument(relativePath: "voteForPedro.md") {
  data {
    title
    author {
      data {
        ... on BasicAuthor_Doc_Data {
          name
          avatar
        }
      }
    }
  }
}
```

To learn how to work with this data on a Tina-enabled site, check out the [client documentation](/docs/tina-cloud/client/)

> This API is currently somewhat limited. Specifically there's no support for filtering and sorting "list" queries. We have plans to tackle that in upcoming cycles
