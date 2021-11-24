---
title: Contextual Editing
id: '/docs/tinacms-context'
next: '/docs/features/extending-tina'
---

After modelling out content, and using Tina's API for data-fetching, we can add TinaCMS to our site's frontend and add contextual editing.

## Adding Tina to the site's frontend

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

## Dynamically loading tinacms with `<TinaEditProvider />`

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

Instead of having the full `tinacms` code in your production site, your main production bundle will just contain the much smaller `tinacms/dist/edit-state` bundle (>2kb).

## Manually toggling edit-mode

You can enter and exit edit mode by tapping into the `useEditState` hook. A common pattern is to place this hook on an "admin" page, which simply puts you into edit mode and sends you back to the page you were on.

> If you setup Tina with [`tina init`]('/docs/setup-overview/#manual-setup-on-an-existing-site'), this should already be setup for you in the `/admin` page.

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

### There are no forms in the Tina sidebar

TinaCMS will automatically build forms for supported queries. For now, only ["single-document" queries](https://tina.io/docs/graphql/#getnamedocument) are supported.
