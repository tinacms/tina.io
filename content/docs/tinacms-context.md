---
title: Next.js APIs
id: '/docs/tinacms-context'
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

## `<TinaCMS>`

To make data editable live on your site, you'll need to set up the TinaCMS context. The default import from `tinacms` is a context provider which sets up everything for you. You'll notice we're using a render prop pattern to pass `livePageProps` into your component.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // Required: The query from your `getStaticProps` request
      query={pageProps.query}
      // Required: The variables from your `getStaticProps` request
      variables={pageProps.variables} // Variables used in your query
      // Required: The data from your `getStaticProps` request
      data={pageProps.data}
      // Optional: Set to true when working with the local API
      isLocalClient={true}
      // Optional: When using Tina Cloud, specify the git branch
      branch="main"
      // Optional: Your identifier when connecting to Tina Cloud
      clientId="<some-id-from-tina-cloud>"
      // Optional: A callback for altering the CMS object if needed
      cmsCallback={cms => {
        cms.sidebar.position = 'overlay'
      }}
      // Optional: A callback for altering the form generation if needed
      formifyCallback={args => {
        if (args.formConfig.id === 'getNavDocument') {
          return args.skip()
        }
        return args.createForm(args.formConfig)
      }}
      // Optional: A callback for altering the document creator plugin
      documentCreatorCallback={args => {
        onNewDocument: args =>
          window.location.assign('https://my-site.com/my-new-url')
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

## `<EditState />`

We can leverage Next.js `dynamic` imports to avoid bundling TinaCMS with your production build:

```tsx
// pages/_app.js
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS {...pageProps}>
            {livePageProps => <Component {...livePageProps} />}
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
```

You can enter and exit edit mode by tapping into the `useEditState` hook, a common pattern is to place this hook on an "admin" page, which simply puts you into edit mode and sends you back to the page you were on:

```tsx
// pages/admin.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { useEditState } from 'tinacms/dist/edit-state'

const GoToEditPage = () => {
  const { editState, setEdit } = useEditState()
  const router = useRouter()
  useEffect(() => {
    setEdit(!editState)
    // Go back to the page you were on previously
    router.back()
  }, [])
  // Display a brief message to the user
  return <div>Going into edit mode...</div>
}

export default GoToEditPage
```

Note that the `tinacms/dist/edit-state (>2kb)` code _will_ be in your production bundle with this pattern.

## FAQ

### Do I need to use `getStaticPropsForTina` and `staticRequest`?

Absolutely not. These are helper functions which emphasize that static requests should only be made against your _local_ server. The `@tinacms/cli` runs a GraphQL server at `http://localhost:4001`, so feel free to use any HTTP client you'd like.

Note, however, that it's important to return an object from `getStaticProps` which has `data`, `query`, and `variables` properties so TinaCMS can make everything editable on your page.

### How do I customize the CMS instance?

TinaCMS is highly customizable, use the `cmsCallback` property to access the `TinaCMS` instance and customize to your heart's desire.
