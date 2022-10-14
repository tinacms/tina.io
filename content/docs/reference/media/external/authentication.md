---
title: Setting up Authentication
prev: /docs/reference/media/repo-based
next: /docs/reference/media/external/cloudinary
---

Set up authenication for external media store access.

## Installation

```bash
yarn add @tinacms/auth
```

## Register the Media Store

Now, you can replace the default repo-based media with the external media store. You can register a media store via the `loadCustomStore` prop.

The `loadCustomStore` prop can be configured within `.tina/schema.ts`.

```diff
// .tina/schema.ts

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

## Set up API routes

You need to set up API routes and create a media handler to connect your instance of the Media Store to your external storage.

### Next.js

Set up a new API route in the `pages` directory of your Next.js app at `pages/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts`.

Then add a new catch all API route for media by calling createMediaHanlder method of your media store library.

Import `isAuthorized` from ["@tinacms/auth"](https://github.com/tinacms/tinacms/tree/main/packages/%40tinacms/auth).

The `authorized` key will make it so only authorized users within Tina Cloud can upload and make media edits.

```ts
// pages/api/<YOUR_MEDIA_STORE_NAME>/[...media].ts

import {
  createMediaHandler,
} from 'next-tinacms-<YOUR_MEDIA_STORE_NAME>/dist/handlers'

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

### Netlify

In case of Netlify, you can use Netlify Functions.

First, you must set up redirects so that all requests to `/api/*` can be redirected to Netlify Functions. You can set up redirects at `netlify.toml`.

```
...
[[redirects]]
  from = '/api/*'
  to = '/.netlify/functions/api/:splat'
  status = 200
```

Next, you must set up api routes for the media handler.

```js
const serverless = require('serverless-http')
const express, { Router } = require('express')
const { isAuthorized } = require('@tinacms/auth')
const { createMediaHandler } = require('next-tinacms-<YOUR_MEDIA_STORE_NAME>/dist/handlers')

const app = express()

const router = Router()

const handler = createMediaHandler({
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

router.get('/<YOUR_MEDIA_STORE_NAME>/meida', handler)

router.post('/<YOUR_MEDIA_STORE_NAME>/media', handler)

router.delete('/<YOUR_MEDIA_STORE_NAME>/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return handler(req, res)
})

app.use('/api/', router)
```

Now you can manage external media store inside TinaCMS. To check each media store in detail, please read next sections.
