---
title: Data Fetching
id: '/docs/features/data-fetching'
next: '/docs/tinacms-context'
---

With Tina, your content is stored in Git along with your codebase. Instead of using something like `fs.readfile` to access your content, Tina provides an API to query your content through GraphQL, based on your defined content models.

## `staticRequest`

`staticRequest` is a helper function, which makes a request to your locally-running GraphQL server.

### Example: Fetching content through getStaticProps

```tsx
// pages/home.js
import { staticRequest } from 'tinacms'

const getStaticProps = async () => {
  const query = `
      query GetPostDocument($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      }
    `
  const variables = {
    relativePath: 'hello-world.md',
  }

  let data = {}
  try {
    data = await staticRequest({
      query,
      variables,
    })
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      query,
      variables,
      data,
      //myOtherProp: 'some-other-data',
    },
  }
}
```

> Note: for now, TinaCMS only supports static data fetching, so you must use `getStaticProps` (and `getStaticPaths` for dynamic pages). We'll be opening up more capabilities in the near future!

### Example: Fetching content through getStaticPaths

You'll likely want to query the Tina data layer for [dynamic routes](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

```js
export const getStaticPaths = async () => {
  const postsListData = await staticRequest({
    query: gql`
      query GetPostList {
        getPostList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
  })

  return {
    paths: postsListData.getPostList.edges.map(post => ({
      params: { filename: post.node.sys.filename },
    })),
  }
}
```

## FAQ

### Do I need to use `staticRequest`?

Absolutely not. This is a helper function which emphasizes that static requests should only be made against your _local_ server. The `staticRequest` helper function makes the request against `http://localhost:4001`, which is where `@tinacms/cli` runs its GraphQL server. Feel free to use any HTTP client you'd like.

Note, however, that it's important to return an object from `getStaticProps` which has `data`, `query`, and `variables` properties so the client-side TinaCMS container can make everything editable on your page.
