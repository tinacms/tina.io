---
title: TinaCMS Version 1.4
date: '2023-03-23T04:00:00.000Z'
last_edited: '2023-03-23T04:00:00.000Z'
author: Logan Anderson
---

Today we are excited to release `tinacms@1.4.0` and `@tinacms/clil@1.4.0`. These new versions add a `match` property (used for including/excluding a subset of documents), a massive update to our CLI, and various bug fixes and other improvements.  The full list of changes can be found [in the changeset PR](https://github.com/tinacms/tinacms/pull/3706 "Changset pull request").

## The `match` property on a collection

Now if you want to only include a subset of your documents in your collection this can be done with the match property.

For example,

```typescript
import { defineConfig } from 'tinacms'

export default defineConfig({
  schema: {
    collections: [
      {
        path: 'content/posts',
        match: {
          include: '*',
        },
        format: 'md'
      }
    ]
  }
})
```

this will not match on subdirectories. It will match `collections/posts/foo.md` but not `collections/posts/nested/bar.md`. Check out the [docs for more info](/docs/reference/collections/#matchinclude "Match docs").

\
CLI updates
-----------

The GraphQL playground is now hosted at \<YourDevUrl>/admin/index.html#/graphql (It was previously on the same port as the local GraphQL server). This allows the playground to be used in production and allows us to customize more in the feature. We have also updated are entire CLI to a more typesafe system allowing us to develop quicker and safer.

## Other Updates

### Use Markdown parser by default on .md files

We are now going to use a markdown parser by default if format: 'md' is used. This means that if you are using markdown files that contain templates you will have to turn on the mdx parser on each field by doing\


```typescript
{
  type: 'rich-text',
  parser: {
      type: 'mdx',
  },
  //...
}
```

### New Content API endpoint

We have migrated our endpoint to a versioned endpoint. This likely does not require any action unless you are using [custom data fetching](/docs/reference/content-api/content-delivery/ "Custom Data Fetching docs"). If you are using custom data fetching you will have to update the url from `/content/<ClientID>/github/<branch>` to `/<TinaGraphQLVersion>content/<ClientID>/github/<branch>` where TinaGraphQL version in the version of the @tinacms/graphql package.
