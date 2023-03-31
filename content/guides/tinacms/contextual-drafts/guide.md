---
title: Using Drafts with Contextual Editing
last_edited: '2022-12-05T10:00:00.000Z'
---

> The following guide requires tinacms: 1.0.2 or later.

> Want to skip the the end result? [Check out the final result](https://github.com/tinacms/tina-barebones-starter-preview-mode)

## Adding contextual editing with Drafts

## Using Drafts with Contextual Editing

In most cases, you will not want to create pages on your production site for your draft documents. This makes [handling drafts](/docs/drafts/overview/) a challenge with contextual editing. In this example we will show how to add contextual editing to a draft document using [Next.js preview-mode](https://nextjs.org/docs/advanced-features/preview-mode).

In preview-mode `getStaticProps` will be called on every request. This means that we can conditionally grab draft documents in preview-mode, and keep them out of your production site.

"Preview-mode" can be added in just a few steps:

## 1. Add the preview-mode api handlers

> Note: If you have not installed `@tinacms/auth` you can do so by running `yarn add @tinacms/auth` or `npm install @tinacms/auth`

Create a file called `pages/api/preview/enter.{ts,js}` this will handle the request to enter preview-mode. This file should look like this:

```ts
import { isUserAuthorized } from '@tinacms/auth'

const handler = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    // Enter preview-mode in local development
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

This handler verifies (With Tina Cloud) that the token is valid and then redirects to the document we want to edit.

Next, create a file called `pages/api/preview/exit.{ts,js}` this will handle the request to exit preview-mode. This file should look like this:

```ts
const handler = (req, res) => {
  res.clearPreviewData()
  res.redirect(req.query.slug)
}

export default handler
```

Both of these files are based on the [Next.js preview-mode api handlers](https://nextjs.org/docs/advanced-features/preview-mode#step-1-create-and-access-a-preview-api-route).

## 2. Update `tina/config`

```ts
export default defineConfig({
  // ...
  // Add this to your config
  admin: {
    auth: {
      onLogin: async ({ token }) => {
        //  When the user logs in enter preview mode
        location.href =
          `/api/preview/enter?token=${token.id_token}&slug=` + location
      },
      onLogout: async () => {
        // When the user logs out exit preview mode
        location.href = `/api/preview/exit?slug=` + location
      },
    },
  },
  // ...
})
```

## 3. Update data fetching

### Updates to getStaticPaths

We'll now update our `getStaticPaths`, so that draft pages are excluded in our production site.

```ts
const req = await client.queries.postConnection()
```

```diff
export const getStaticPaths = async () => {
- const req = await client.queries.postConnection()
+ const req = await client.queries.postConnection({
+   filter: { draft: { eq: false } },
+ })

  // ...
}
```

Depending on your use case you can also safely use any value for `fallback`.

### Updates to getStaticProps

#### Listing pages

First we will create a util function that will either return all the documents or just the production documents depending on if we are in preview-mode.

_`util/getPosts.{ts,js}`_

```ts
import { client } from '../<PathToTina>/tina/__generated__/client'

export const getPosts = async ({ preview }) => {
  // by default get non-draft posts
  let filter = { draft: { eq: false } }

  // if preview-mode is enabled, get all posts
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

On pages that use SSR or "incremental static regeneration" (ISR), your `getStaticProps` function will be called on every request. This means that we need to return a 404 when the document is a draft and we are not in preview-mode.

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

To help with exiting preview-mode we can add a button to the top of the site. The button will show up in any page that returns `preview: true` in `getStaticProps`.

In `pages/_app.{ts,js}` add the following:

```tsx
const App = ({ Component, pageProps }) => {
  const slug = typeof window !== 'undefined' ? window.location.pathname : '/'
  return (
    <>
      {/* Feel free to add your own styling! */}
      {pageProps.preview && (
        <div>
          You are in preview-mode
          {/* This link will logout of Tina and exit preview mode */}
          <a
            href={`/admin/index.html#/logout?slug=/api/preview/exit?slug=${slug}`}
          >
            Click here
          </a>{' '}
          to exit
        </div>
      )}

      <Component {...pageProps} />
    </>
  )
}

export default App
```

Now when an editor logs in they will enter preview mode and be able to contextual edit draft documents.

You can see the [final result here](https://github.com/tinacms/tina-barebones-starter-preview-mode) and if you want to learn more about preview mode [see the Next.js docs](https://nextjs.org/docs/advanced-features/preview-mode).
