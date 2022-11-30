---
title: Draft Field
id: '/docs/drafts/draft-fields'
---

> NOTE: Drafts are in an initial stage. While this while these methods of drafts will be supported, our final version of drafts will be easier to use and will require less setup.

## What is "A draft field"?

Draft fields are just boolean fields that can be used to indicate whether a document is a draft or not. There is nothing special about draft fields are they are not treaded any differently then any other boolean fields.

### Setting up a draft field

The field can be added to the top level fields of a collection.

```ts
const schema = defineSchema({
  collections: [
    {
      name: 'post',
      label: 'Post',
      path: 'content/posts',
      fields: [
        {
          name: 'draft',
          label: 'Draft',
          type: 'boolean',
          required: true,
          description: 'If this is checked the post will not be published',
        },
        // ... other fields
      ],
    },
  ],
})
```

> Note: when draft fields must be required. This may require adding it to existing documents.

Now when you query the data you only look for documents that are not drafts.

```ts
// getting production posts
const req = await client.queries.postConnection({
  filter: { draft: { eq: false } },
})

// getting all posts
const req = await client.queries.postConnection()
```

Read more about querying data [here](/docs/data-fetching/overview).

## Potential issues

- Drafts can not be [contextual edited](/docs/contextual-editing/overview) as they are not published. To add contextual editing to drafts see this documentation [here](/docs/drafts/drafts-contextual-editing).
