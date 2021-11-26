---
title: Querying the GraphQL API
---

When you [define a schema](/docs/schema), TinaCMS will generate a GraphQL API which treats your local filesystem as a database. You can serve this schema locally via the [CLI](/tina-cloud/cli) or you can consume it from Tina Cloud.

> Note: The following schema is used in all examples

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'json',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Category',
          name: 'category',
        },
        {
          type: 'reference',
          label: 'Author',
          name: 'author',
          collections: ['author'],
        },
      ],
    },
    {
      label: 'Authors',
      name: 'author',
      format: 'json',
      path: 'content/authors',
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
        },
        {
          type: 'string',
          label: 'Avatar',
          name: 'avatar',
        },
      ],
    },
  ],
})
```

## Schema-specific Queries

The GraphQL API will generate queries which are specific to the schema you define. For a given collection, it's `name` will be used to generate `get{name}Document` and `get{name}List` queries, and the `update{name}Document` mutation. You'll also notice the resulting _type_ is based on the collection name. Given the schema above, you'll find the following queries and mutations:

### `get{name}Document`

Get a single document, providing it's `relativePath` as the argument. `relativePath` is the portion of the path _relative_ to the `collection`'s path. So in this example, the `post` collection has a path of `content/posts`. And your document can be found at `content/posts/voteForPedro.md`, so `relativePath: "voteForPedro.md"`. If your item was at `content/posts/nested-folder/voteForPedro.md` you'd specify: `relativePath: "nested-folder/voteForPedro.md"`.

### `getPostDocument`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostDocument(relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20category%0A%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20__typename%0A%20%20%20%20%20%20%20%20%23%20Note%20that%20we%20need%20to%20%0A%20%20%20%20%20%20%20%20%23%20disambiguate%20because%20_author_%0A%20%20%20%20%20%20%20%20%23%20could%20be%20from%20one%20of%20%0A%20%20%20%20%20%20%20%20%23%20several%20collections%0A%20%20%20%20%20%20%20%20...on%20AuthorDocument%20%7B%0A%20%20%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

#### `getAuthorDocument`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getAuthorDocument(relativePath%3A%20%22napolean.json%22)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

### `get{name}List`

List queries offer limited functionality for now.

- Because of the nature of list items, we don't currently auto-generate Tina forms for these queries.
- Depending on how many items you may have in your collection, the query could be quite slow. We'll be working on a more robust data layer to improve this experience in the near future.

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostList%20%7B%0A%20%20%09edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

## General queries

### `getDocument`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getDocument(collection%3A%20%22post%22%2C%20relativePath%3A%20%22voteForPedro.json%22)%20%7B%0A%20%20%20%20...on%20PostDocument%20%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

### `getCollections`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getCollections%20%7B%0A%20%20%20%20name%0A%20%20%20%20documents%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20...on%20Document%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

### `getCollection`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getCollection(collection%3A%20%22post%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20documents%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20...on%20Document%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

## Schema-specific Mutations

> Note: Update mutations will overwrite _all_ fields. Omitting a field will result in it being nullified.

### `update{name}Document`

#### `updatePostDocument`

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20updatePostDocument(relativePath%3A%20%22voteForPedro.json%22%2C%20params%3A%20%7B%0A%20%20%20%20title%3A%20%22Vote%20For%20Napolean%20Instead%22%2C%0A%20%20%20%20category%3A%20%22politics%22%2C%0A%20%20%20%20author%3A%20%22content%2Fauthors%2Fnapolean.json%22%0A%20%20%7D)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20category%0A%20%20%20%20%20%20author%20%7B%0A%20%20%20%20%20%20%20%20...on%20AuthorDocument%20%7B%0A%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

#### `updateAuthorDocument`

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20updateAuthorDocument(relativePath%3A%20%22napolean.json%22%2C%20params%3A%20%7B%0A%20%20%20%20name%3A%20%22Napolean%22%0A%20%20%20%20avatar%3A%20%22https%3A%2F%2Fpath.to%2Fmy-avatar.jpg%22%0A%20%20%7D)%20%7B%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20avatar%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

# General Mutations

### `addPendingDocument`

> Note: `addPendingDocument` does not currently support fields of any kind, just creating the record.

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20addPendingDocument(collection%3A%20%22post%22%2C%20relativePath%3A%20%22pedro.json%22)%20%7B%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />

### `updateDocument`

<iframe loading="lazy" src="/api/graphiql/?query=mutation%20%7B%0A%20%20updateDocument(%0A%20%20%20%20collection%3A%20%22post%22%2C%0A%20%20%20%20relativePath%3A%20%22voteForPedro.json%22%2C%20%0A%20%20%20%20params%3A%20%7B%0A%20%20%20%20post%3A%20%7B%0A%20%20%20%20%20%20title%3A%20%22Vote%20For%20Napolean%20Instead%22%2C%20%0A%20%20%20%20%20%20category%3A%20%22politics%22%2C%20%0A%20%20%20%20%20%20author%3A%20%22content%2Fauthors%2Fnapolean.json%22%0A%20%20%20%20%7D%0A%20%20%7D)%20%7B%0A%20%20%20%20...on%20PostDocument%20%7B%0A%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=GetBlogPost" width="800" height="400" />
