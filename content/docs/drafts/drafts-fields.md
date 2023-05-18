---
title: Draft Fields
id: '/docs/drafts/draft-fields'
---

Adding a "Draft Field" is one approach to handling "drafts" in TinaCMS

## What is a "Draft Field"?

"Draft Fields" are just simply fields that can be used to indicate whether a document is a draft or not. There is nothing special about draft fields, are they are not treated any differently then any other boolean field.

### Setting up a draft field

The "draft" field can be added to the top level fields of a collection.

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

> Note: It's usually a good practice to make draft fields required. This may require adding the draft field to your existing documents

### Excluding drafts from your production queries

You can add a filter to filter out draft documents from your queries:

```ts
// getting production posts
const req = await client.queries.postConnection({
  filter: { draft: { eq: false } },
})

// getting all posts
const req = await client.queries.postConnection()
```

Read more about querying data [here](/docs/data-fetching/overview).

> If you're using a Draft field with a static site generator like Hugo, any documents with "draft: true" will be omitted from your production site out-of-the-box.

## Caveats:

- The above solution won't work as-is with [visual editing](/docs/contextual-editing/overview). To setup visual editing with drafts, you will need to implement [NextJS Preview-Mode](/guides/tinacms/contextual-drafts/guide/).
