---
title: Setting up Authentication
prev: /docs/reference/media/repo-based
next: /docs/reference/media/external/cloudinary
---

Tina supports using external media providers, however a light backend media handler needs to be setup/hosted by the user. Tina offers some helpers to make this easy, for `cloudinary`,`s3`, & `dos` ("Digital Ocean Spaces")

## Installation

```bash
yarn add @tinacms/auth
```

Depending on your site's framework & hosting provider, there are multiple ways to host the media handler.

> In the following examples, replace `<YOUR_MEDIA_STORE_NAME>` with `cloudinary`,`s3`, or `dos`.

### Option 1) Next.js API Routes (NextJS-only)

Set up a new API route in the `pages` directory of your Next.js app at `pages/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts`.

Then add a new catch-all API route for media by calling createMediaHandler method of your media store library.

Import `isAuthorized` from ["@tinacms/auth"](https://github.com/tinacms/tinacms/tree/main/packages/%40tinacms/auth).

The `authorized` key will make it so only authorized users within Tina Cloud can upload and make media edits.

```ts
// pages/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts

import { createMediaHandler } from 'next-tinacms-<YOUR_MEDIA_STORE_NAME>/dist/handlers'

import { isAuthorized } from '@tinacms/auth'

export default createMediaHandler({
  // ...
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
})
```

### Option 2) Vercel API Routes

Vercel supports creating Serverless functions by creating a `/api` directory at the project root. To set this up, follow the above [NextJS-specific instructions](/docs/reference/media/external/authentication/#option-1-nextjs-api-routes-nextjs-only), but use `/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts` instead of `/pages/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts`

> Note: You may notice that the package names may contain "next" (e.g: `next-tinacms-cloudinary`). You can still use these packages for other frameworks.

### Option 3) Netlify Functions

If your site is hosted on Netlify, you can use ["Netlify Functions"](https://docs.netlify.com/functions/overview/) to host your media handler.

First, you must set up redirects so that all requests to `/api/*` can be redirected to Netlify Functions. You can set up redirects at `netlify.toml`. We are also going to build our functions with [esbuild](https://docs.netlify.com/configure-builds/file-based-configuration/#functions) so we will set that in the `netlify.toml` as well.

Add the following to the `netlify.toml` file in the root of your project.

```text
[[redirects]]
    from = '/api/*'
    to = '/.netlify/functions/api/:splat'
    status = 200

[functions]
    node_bundler = 'esbuild'
```

Next, you must set up api routes for the media handler.

Install the following dependencies.

```bash
yarn add serverless-http express @tinacms/auth next-tinacms-<YOUR_MEDIA_STORE_NAME>
```

Make a new file called `netlify/functions/api/api.js` and add the following code.

> Note: the file path could be different if you are using a different [functions directory](https://docs.netlify.com/configure-builds/file-based-configuration/#functions).

```js
import ServerlessHttp from 'serverless-http'
import express, { Router } from 'express'
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-<YOUR_MEDIA_STORE_NAME>/dist/handlers'

const app = express()

const router = Router()

const mediaHandler = createMediaHandler({
  // ...
  // See the next section for more details on what goes in the createMediaHandler
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
})

router.get('/cloudinary/media', mediaHandler)

router.post('/cloudinary/media', mediaHandler)

router.delete('/cloudinary/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/api/', router)
app.use('/.netlify/functions/api/', router)

export const handler = ServerlessHttp(app)
```

## Register the Media Store on the frontend

Now, you can replace the default repo-based media with the external media store. You can register a media store via the `loadCustomStore` prop.

The `loadCustomStore` prop can be configured within `tina/schema.ts`.

```diff
// tina/schema.ts

// ...

export default defineSchema({
  // ...
  config: {
     media: {
-       tina: {
-         publicFolder: "",
-         mediaRoot: ""
-       },
+       loadCustomStore: async () => {
+         const pack = await import("next-tinacms-<YOUR_MEDIA_STORE_NAME>");
+         return pack.TinaCloud<YOUR_MEDIA_STORE>;
+       },
     }
  },
})
```

Now you can manage external media store inside TinaCMS. To learn more about each media store in detail, please refer to the next sections.
