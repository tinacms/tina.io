---
title: Querying Tina Content in NextJS
last_edited: '2022-04-08T10:00:00.000Z'
---

## Querying Tina Content in NextJS

In NextJS, content can be queried statically at build-time or dynamically at runtime (using [SSR](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props), or [CSR](https://nextjs.org/docs/basic-features/data-fetching/client-side)).

For build-time queries, Tina provides a `staticRequest` helper function, which makes a request to your locally-running GraphQL server.

### Example: Fetching content through getStaticProps

```tsx
// pages/home.js
import { staticRequest } from 'tinacms'

const getStaticProps = async () => {
  const query = `
      query Post($relativePath: String!) {
        post(relativePath: $relativePath) {
          title
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

### Example: Fetching content through getStaticPaths

You'll likely want to query the Tina data layer for [dynamic routes](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths#getstaticpaths).

```js
export const getStaticPaths = async () => {
  const postsListData = await staticRequest({
    query: gql`
      query PostConnection {
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }
    `,
  })

  return {
    paths: postsListData.postConnection.edges.map(post => ({
      params: { filename: post.node._sys.filename },
    })),
  }
}
```

> Note: for now, TinaCMS only supports static data fetching, so you must use `getStaticProps` (and `getStaticPaths` for dynamic pages). We'll be opening up more capabilities (like SSR, and client-side data-fetching) in the near future!

### Example: Fetching content dynamically

If you wish to fetch content at runtime with server-side rendering (SSR) or client-side rendering (CSR), you can do so with Tina's [read-only tokens](/docs/tina-cloud/dashboard/projects/#read-only-tokens/). The following blog post provides examples - [Read-only tokens - Query Requests anytime](https://tina.io/blog/read-only-tokens-content-anytime/).

### Do I need to use `staticRequest`?

Absolutely not. This is a helper function which emphasizes that static requests should only be made against your _local_ server. The `staticRequest` helper function makes the request against `http://localhost:4001`, which is where `@tinacms/cli` runs its GraphQL server. Feel free to use any HTTP client you'd like.

### Next.js `fallback: "blocking"`

In Next.js one can specify [`fallback: "blocking"`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-blocking), this allows `getStaticProps` to run server-side at request time when a user goes to a page that was not specified in `getStaticPaths`.

With read-only tokens we can fetch the list of blog posts. This will allow us to visit pages that have been created but not statically generated.

#### Example page

```js
// pages/posts/[filename].{js,tsx}

import { client } from '../pathToTina/.tina/client'

const BlogPage = props => {
  // (Does not change)
  //...
}

export const getStaticProps = async ctx => {
  const query = `query Post($relativePath: String!) {
    post(relativePath: $relativePath) {
      title
      body
    }
  }
  `
  const variables = {
    relativePath: ctx.params.slug + '.md',
  }
  let data
  try {
    // This will use the URL that was passed to the client
    const res = await client.request({
      query,
      variables,
    })
    data = res?.data
  } catch (error) {
    // swallow errors related to document creation
  }

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
      query,
      variables,
    },
  }
}

export const getStaticPaths = async () => {
  //... Same as before
  return {
    paths,
    fallback: 'blocking',
  }
}

export default BlogPage
```
