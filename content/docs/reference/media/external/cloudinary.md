---
title: Using Media with Cloudinary
prev: /docs/reference/media/external/authentication
next: /docs/reference/media/external/do-spaces
---

Manage **Cloudinary media assets** in TinaCMS.

> The following guide relies on NextJS's API functions to authenticate the 3rd-party media interactions. We hope to document a framework-agnostic approach soon.

## Installation

```bash
yarn add next-tinacms-cloudinary @tinacms/auth
```

## Connect with Cloudinary

You need to provide your Cloudinary credentials to connect to your media library. Do [register on Cloudinary](https://cloudinary.com/users/register/free) if you don't have an account yet, your account details are displayed on the Cloudinary dashboard.

**next-tinacms-cloudinary** uses environment variables within the context of a Next.js site to properly access your Cloudinary account.

Add the following variables to an `.env` file.

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<Your Cloudinary API key>
CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
```

## Register the Media Store

Now, you can replace the default repo-based media with the external media store. You can register the Cloudinary Media store via the `loadCustomStore` prop.

The `loadCustomStore` prop can be configured within `tina/config.{js,ts}`.

```diff
//tina/config.{ts,js}

export default defineConfig({
  //...
  media: {
-    tina: {
-      publicFolder: 'public',
-      mediaRoot: 'uploads',
-    },
+    loadCustomStore: async () => {
+      const pack = await import("next-tinacms-cloudinary");
+      return pack.TinaCloudCloudinaryMediaStore;
+    },
  },
})
```

## Set up API routes (Next.js example)

> ** NOTE: **this step will show you how to set up an API route for Next.js. If you are using a different framework, you will need to set up your own API route.

Tina's "external media provider" support requires a light backend media handler, that needs to be setup/hosted by the user. There are multiple ways to do this, including the framework-agnostic [Netlify Functions implementation](/docs/reference/media/external/authentication/#netlify).

### "NextJS API Routes" example (NextJS-only)

Set up a new API route in the `pages` directory of your Next.js app at `pages/api/cloudinary/[...media].ts`.
Then add a new catch all API route for media.

Call `createMediaHandler` to set up routes and connect your instance of the Media Store to your Cloudinary account.

Import `isAuthorized` from ["@tinacms/auth"](https://github.com/tinacms/tinacms/tree/main/packages/%40tinacms/auth).

The `authorized` key will make it so only authorized users within Tina Cloud can upload and make media edits.

```ts
// pages/api/cloudinary/[...media].ts

import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers'

import { isAuthorized } from '@tinacms/auth'

export const config = mediaHandlerConfig

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

## Update Schema

Now that the media store is registered and the API route for media set up, let's add an image to your schema.

In your `tina/config.{ts,tsx,js}` add a new field for the image, e.g:

```ts
 {
  name: 'hero',
  type: 'image',
  label: 'Hero Image',
 }
```

Now, when editing your site, the image field will allow you to connect to your Cloudinary account via the Media Store to manage your media assets.
