---
title: Data Fetching
id: '/docs/features/data-fetching'
---

There are essentially two touch points you'll need set up in order for Tina to work with your Next.js application or website.

1. Load data from the TinaCMS GraphQL API from `getStaticProps`
2. Conditionally wrap your app in the TinaCMS context

## `getStaticPropsForTina`

TinaCMS is easiest to work with when you provide a predictable shape to the props you return from `getStaticProps`. `getStaticPropsForTina` enforces this shape for you:

```tsx
// pages/home.js
import { getStaticPropsForTina } from 'tinacms'

const getStaticProps = async () => {
  const tinaProps = await getStaticPropsForTina({
    query: `
      query GetPostDocument($relativePath: String!) {
        getPostDocument(relativePath: $relativePath) {
          data {
            title
            body
          }
        }
      }
    `,
    variables: {
      relativePath: 'hello-world.md',
    },
  })

  return {
    props: {
      ...tinaProps,
      myOtherProp: 'some-other-data',
    },
  }
}
```

```ts
type getStaticPropsForTina = (args: {
  query: string
  variables?: object
}) => Promise<{
  query: string
  variables?: object
  data: object
}>
```

> Note: for now, TinaCMS only supports static data fetching, so you must use `getStaticProps` (and `getStaticPaths` for dynamic pages). We'll be opening up more capabilities in the near future!

## `staticRequest`

You'll likely want to query the GraphQL API for [dynamic routes](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation). `staticRequest` is a simple helper function which wraps the built-in `fetch` API:

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

### Do I need to use `getStaticPropsForTina` and `staticRequest`?

Absolutely not. These are helper functions which emphasize that static requests should only be made against your _local_ server. The `@tinacms/cli` runs a GraphQL server at `http://localhost:4001`, so feel free to use any HTTP client you'd like.

Note, however, that it's important to return an object from `getStaticProps` which has `data`, `query`, and `variables` properties so TinaCMS can make everything editable on your page.
