---
title: Querying the GraphQL API
id: /docs/graphql/queries
next: /docs/graphql/queries/get-document
---

## Schema-specific queries

When you [define a schema](/docs/schema), TinaCMS will generate a GraphQL API which treats your local filesystem as a database. You can serve this schema locally via the [CLI](/docs/graphql/cli) or you can consume it from Tina Cloud.

The GraphQL API will generate queries which are specific to the schema you define.

**Available queries**:

- `<collection>`
- `<collection>Connection`

**Available mutations**

- `update<collection>`
- `addPendingDocument`

For a given collection, it's `name` will be used to generate `<collection>` and `<collection>Connection` queries, and the `update<collection>` mutation.

### General queries

As an alternative to the schema-specific queries, the GraphQL API also makes the following general queries available:

- document
- collection
- collections
- addPendingDocument
- updateDocument

## Example schema

Using the following schema, we'll show you how each of the schema-specific queries/mutations can be used.

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
          type: 'datetime',
          label: 'Date',
          name: 'date',
        },
        {
          type: 'reference',
          label: 'Author',
          name: 'author',
          collections: ['author'],
        },
      ],
      indexes: [
        {
          name: 'category-date',
          fields: [{ name: 'category' }, { name: 'date' }],
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
