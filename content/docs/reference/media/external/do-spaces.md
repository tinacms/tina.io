---
title: Using Media with Digital Ocean Spaces
prev: /docs/reference/media/external/cloudinary
next: /docs/reference/media/external/s3
---

Manage **Digital Ocean Spaces media assets** in TinaCMS.

> The following guide relies on NextJS's API functions to authenticate the 3rd-party media interactions. We hope to document a framework-agnostic approach soon.

## Installation

### With Yarn

```bash
yarn add next-tinacms-dos
```

### With NPM

```bash
npm install next-tinacms-dos
```

## Connect with Digital Ocean Spaces

You need some credentials provided by Digital Ocean Spaces to set this up properly. If you do not already have an account, you can [register here](https://cloud.digitalocean.com/registrations/new) .

**next-tinacms-dos** uses environment variables within the context of a Next.js site to properly access your Digital Ocean Spaces account.

Add the following variables to an `.env` file.

```env
NEXT_PUBLIC_SPACES_ENDPOINT=<Your Digital Ocean Spaces Endpoint: ex. https://fra1.digitaloceanspaces.com> (Does not include the space name)

NEXT_PUBLIC_SPACES_NAME=<Your Digital Ocean Spaces Name: ex. my-spaces>

NEXT_PUBLIC_SPACES_KEY=<Your Digital Ocean Spaces access key>

SPACES_SECRET_KEY=<Your Digital Ocean Spaces access secret>
```

## Register the Media Store

You can register the Digital Ocean Space Media store via the `loadCustomStore` prop.

The `loadCustomStore` prop can be configured within `tina/config.{js,ts,tsx}`.

```tsx
//tina/config.{ts,js}
//...

export default defineConfig({
  //...
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-dos')
      return pack.TinaCloudCloudinaryMediaStore
    },
  },
})
```

## Set up API routes

Tina's "external media provider" support requires a light backend media handler, that needs to be setup/hosted by the user. There are multiple ways to do this, including the framework-agnostic [Netlify Functions implementation](/docs/reference/media/external/authentication/#netlify).

> **NOTE:** this step will show you how to set up an API route for Next.js. If you are using a different framework, you will need to set up your own API route.

### Next.js Example

Set up a new API route in the `pages` directory of your Next.js app, e.g. `pages/api/dos/[...media].ts`.
Then add a new catch all API route for media.

Call `createMediaHandler` to set up routes and connect your instance of the Media Store to your Digital Ocean Spaces.

Import `isAuthorized` from ["@tinacms/auth"](https://github.com/tinacms/tinacms/tree/main/packages/%40tinacms/auth).

The `authorized` key will make it so only authorized users within Tina Cloud can upload and make media edits.

```ts
// pages/api/dos/[...media].ts

import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-dos/dist/handlers'

import { isAuthorized } from '@tinacms/auth'

export const config = mediaHandlerConfig

export default createMediaHandler({
  config: {
    endpoint: process.env.NEXT_PUBLIC_SPACES_ENDPOINT,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_SPACES_KEY || '',
      secretAccessKey: process.env.SPACES_SECRET_KEY || '',
    },
    region: 'us-east-1',
  },
  bucket: process.env.NEXT_PUBLIC_SPACES_NAME || '',
  authorized: async (req, _res) => {
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    try {
      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
})
```

For Netlify use case, please read how to set up Netlify Functions [here](/docs/reference/media/external/authentication/#netlify)

### Using a Custom URL

If you're using a custom URL for your S3 bucket, you can pass in a `cdnUrl` value to `createMediaHandler`.

```ts
export default createMediaHandler({
  config: ...,
  bucket: ...,
  authorized: ...,
},
{
 cdnUrl: "https://my-custom-domain.com"
}
)
```

## Update Schema

Now that the media store is registered and the API route for media set up, let's add an image to your schema.

In your schema add a new field for the image, e.g:

```ts
 {
  name: 'hero',
  type: 'image',
  label: 'Hero Image',
 }
```

Now, when editing your site, the image field will allow you to connect to your Digital Ocean Spaces via the Media Store to manage your media assets.
