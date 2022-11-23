---
title: Draft Field
id: '/docs/drafts/draft-fields'
---

> NOTE: Drafts are in an initial stage. While this while these methods of drafts will be supported, our final version of drafts will be easier to use and will require less setup.

## What is "A draft field"?

Draft fields are just boolean fields that can be used to indicate weather a document is a draft or not. There is nothing special about draft fields are they are not treaded any differently then any other boolean fields.

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

> Work in progress

## Examples in Next.js

### Naive example

This is an example of how to use draft fields in a Next.js app. This example is naive and does not handle contextual editing of draft documents

```tsx
// pages/blog/[slug].tsx
import { useTina } from 'tinacms/dist/react'

const BlogPage = ({ data: postData, query, variables }: PageProps) => {
  const { data } = useTina({ data: postData, query, variables })

  // .. Your blog page
}

export const getStaticProps: GetStaticProps = async function ({ params }) {
  const relativePath = (params?.slug as string) + '.md'
  const tinaProps = await client.queries.postAndFeaturePosts({ relativePath })
  return {
    props: {
      ...tinaProps,
    },
  }
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection({
    filter: { draft: { eq: false } },
  })
  const res: GetStaticPathsResult<{ slug: string }> = {
    paths:
      postsListData.data.postConnection?.edges?.map((post) => ({
        params: { slug: post?.node?._sys.filename || '' },
      })) || [],
    fallback: true,
  }

  return res
}

export default BlogPage
```

The problem with this approach is that the `getStaticPaths` function will not be able to find draft documents. This means that when you go to contextual edit a draft document it will not be found.

There are two solutions to this problem:

- Return all documents in `getStaticPaths` but don't show them in your blog listing page.
  - this means they will be available for contextual editing but will also be available to the public
- Do two separate builds of your application
  - One build shows the draft documents and can be served from a different domain.
  - One build for the public that does not show the draft documents.
