---
title: Draft Field
id: '/docs/drafts/drafts-contextual-editing'
---

## Adding contextual editing with Drafts

The reason why contextual editing is not supported with drafts is because drafts are not published. This means when we go to contextual edit a draft document we will not be able to find it. In this example we will show how to add contextual editing to a draft document using [Next.js preview mode](https://nextjs.org/docs/advanced-features/preview-mode).

In preview mode `GetStaticProps` will be called on every request. This means that we can use the `preview` query to get the draft document we want to edit. We can then pass this data to the `useTina` hook to enable contextual editing.

Preview mode can be added in just a few steps:

## 1. Add the preview mode api handlers

> Note: If you have not installed `@tinacms/auth` you can do so by running `yarn add @tinacms/auth` or `npm install @tinacms/auth`

Create a file called `pages/api/preview/enter.{ts,js}` this will handel the request to enter preview mode. This file should look like this:

```ts
import { isUserAuthorized } from '@tinacms/auth'

const handler = async (req, res) => {
  if (process.env.IS_LOCAL === 'true') {
    // Enter preview mode in local development
    res.setPreviewData({})
    return res.redirect(req.query.slug)
  }

  // Check tina cloud token
  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${req.query.token}`,
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  })

  if (isAuthorizedRes) {
    res.setPreviewData({})
    return res.redirect(req.query.slug)
  }

  return res.status(401).json({ message: 'Invalid token' })
}

export default handler
```

Make sure to add `IS_LOCAL='true'` to your local `.env` file. This will allow you to enter preview mode without a token.

This handler verifies (With Tina Cloud) that the token is valid and then redirects to the document we want to edit.

Next, create a file called `pages/api/preview/exit.{ts,js}` this will handel the request to exit preview mode. This file should look like this:

```ts
const handler = (req, res) => {
  res.clearPreviewData()
  res.redirect(req.query.slug)
}

export default handler
```

Both of these files are based on the [Next.js preview mode api handlers](https://nextjs.org/docs/advanced-features/preview-mode#step-1-create-and-access-a-preview-api-route).

## 2. Update `.tina/config`

```ts
export default defineConfig({
  // ...
  // Add this to your config
  admin: {
    auth: {
      onLogin: async ({ token }) => {
        // Enter preview and pass the token
        location.href =
          `/api/preview/enter?token=${token.id_token}&slug=` +
          location?.pathname
      },
    },
  },
  // ...
})
```

## 3. Update data fetching

### Updates to getStaticPaths

Now that we have draft documents we do not want to return those in `getStaticPaths`. So updated your data fetching in getStaticPaths from

```ts
const req = await client.queries.postConnection()
```

to

```ts
const req = await client.queries.postConnection({
  filter: { draft: { eq: false } },
})
```

You can also safely use any value for `fallback`.

### Updates to getStaticProps

#### Listing pages

First we will create a util function that will either return all the documents or just the production documents depending on if we are in preview mode.

_`util/getPosts.{ts,js}`_

```ts
import { client } from '../<PathToTina>/.tina/__generated__/client'

export const getPosts = async ({ preview }) => {
  // by default get non-draft posts
  let filter = { draft: { eq: false } }

  // if preview mode is enabled, get all posts
  if (preview) {
    filter = {}
  }
  return client.queries.postConnection({
    filter,
  })
}
```

Use this function anywhere you are fetching a list of posts (Posts index page).

```ts
import { getPosts } from '../util/getPosts'
//...

export const getStaticProps = async ({ preview = false }) => {
  const { data, query, variables } = await getPosts({
    preview,
  })

  return {
    props: {
      preview,
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  }
}
```

#### Slug pages (_optional_)

On pages that use SSR or incremental static regeneration your `getStaticProps` function will be called on every request. This means that we need to return a 404 when the document is a draft and we are not in preview mode.

```ts
export const getStaticProps = async ({ params, preview = false }) => {
  const { data, query, variables } = await client.queries.post({
    relativePath: params.slug + '.md',
  })

  return {
    // the post is not found if its a draft and the preview is false
    notFound: data?.post?.draft && !preview,
    props: {
      preview,
      data,
      query,
      variables,
    },
  }
}
```

## 4. Add the exit preview button

To help with exiting preview mode we can add a button to the top of the site. The button will show up in any page that return `preview: true` in `getStaticProps`.

In `pages/_app.{ts,js}` add the following:

```tsx
const App = ({ Component, pageProps }) => {
  return (
    <>
      {/* Feel free to add your own styling! */}
      {pageProps.preview && (
        <div>
          You are in preview mode
          <a
            href={`/api/preview/exit?slug=${
              (typeof location !== 'undefined' && location?.pathname) || '/'
            }`}
          >
            Click here
          </a> to exit
        </div>
      )}

      <Component {...pageProps} />
    </>
  )
}

export default App
```

Now when an editor logs in they will enter preview mode and be able to contextual edit draft documents.
