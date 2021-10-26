---
title: The TinaCMS Package
---

## Installation

Npm:

```bash
npm install tinacms
```

Yarn:

```bash
yarn add tinacms
```

## Usage

## `<TinaCMS>`

To allow editing on your live site, you'll need to set up the TinaCMS context. The default import from `tinacms` is a context provider which sets up everything for you. You'll notice we're using a render prop pattern to pass `livePageProps` into your component.

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

> Tip: import `TinaCMS` _dynamically_ to keep TinaCMS out of your production bundles

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

## `staticRequest`

Since TinaCMS currently only supports Next.js sites using Static Site Generation, `staticRequest` is all you need to handle data fetching:

```tsx
// pages/posts/[filename].js
import { staticRequest } from 'tinacms'

const getStaticProps = async ({ params }) => {
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
  const data = await staticRequest({
    query,
    variables: { relativePath: `${params.filename}.md` },
  })

  return {
    props: {
      data,
    },
  }
}

// Build the file paths dynamically
export const getStaticPaths = async () => {
  const postsListData = (await staticRequest({
    query: `
      {
        getPostsList {
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
  })) as any
  return {
    paths: postsListData.getPostsList.edges.map(post => ({
      params: { filename: post.node.sys.filename },
    })),
    fallback: true,
  }
}
```
