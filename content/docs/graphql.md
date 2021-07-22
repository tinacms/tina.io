---
title: The GraphQL API
---

When you [define a schema](/docs/schema), TinaCMS will generate a GraphQL API which treats your local filesystem as a database. You can serve this schema locally via the [CLI](/tina-cloud/cli) or you can consume it from Tina Cloud.

> Note: When making mutations on a hosted server, it's safest to use Tina Cloud. Using the fileystem on a hosted server is unpredictable at-best. Tina Cloud will automatically connect to Github so you're fileystem data stays in sync.

The following GraphQL playground has been set up with this schema:

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
          type: 'text',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'reference',
          label: 'Author',
          name: 'author',
          collection: 'authors',
        },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      path: 'content/authors',
      fields: [
        {
          type: 'text',
          label: 'Name',
          name: 'name',
        },
        {
          type: 'text',
          label: 'Avatar',
          name: 'avatar',
        },
      ],
    },
  ],
})
```

<iframe src="http://localhost:3000" width="800" height="400" />
