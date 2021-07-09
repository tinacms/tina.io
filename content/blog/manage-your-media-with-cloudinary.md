---
title: Manage your media with Cloudinary
date: '2021-07-09T08:34:47-04:00'
author: James Perkins
last_edited: '2021-07-09T12:48:46.027Z'
---
# Tina now supports Cloudinary & Media Manager

We released the Alpha just over a month ago and one thing that has come up in the feedback we have been collecting is the ability to use our Media Manager. This was a core feature that gives content creators the ability to drag and drop their images or replace an image easily. We decided to start with Cloudinary, to allow users to keep their GitHub repositories lightweight.

### Why did we start with Cloudinary?

Cloudinary has a powerful media API that can return optimized images, it can  be used with Next Image and Next image optimization, with minimal configuration.

### What formats are supported?

All image formats that are supported by Cloudinary are supported by Tina which are the following:

JPG, PNG, GIF, BMP, TIFF, ICO, PDF, EPS, PSD, SVG, WebP, JXR, and WDP.

### How to get started?

You will need to install our new [Cloudinary package](https://www.npmjs.com/package/next-tinacms-cloudinary), this package will handle adding, retrieving, updating and deleting images without the need of any additional code.

```other
yarn add next-tinacms-cloudinary
or
npm install next-tinacms-cloudinary
```

You also need to add your Cloudinary cloud name, api key and api secret from you Cloudinary account, to your `.env.local`  which you can find in your Cloudinary Dashboard.

```other
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

NEXT_PUBLIC_CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

### Adding Cloudinary to your application

Now that you have installed the Tina Cloudinary package, we need to make some changes to our Tina application to add support for images. Firstly you will need to update your Tina client to include the Cloudinary package:

```other
//Other imports

...
import { TinaCloudCloudinaryMediaStore } from 'next-tinacms-cloudinary'


....
const TinaWrapper = (props) => {
  const cms = React.useMemo(() => {
    return new TinaCMS({
      apis: {
        tina: client,
      },
      sidebar: {
        placeholder: SidebarPlaceholder,
      },
      enabled: true,
    })
  }, [])

  cms.media.store = new TinaCloudCloudinaryMediaStore(client)

  return (
    <TinaCloudAuthWall cms={cms}>
      <Inner {...props} />
    </TinaCloudAuthWall>
  )
}
....
// removed other code
```

Then we will need to update our schema to include the use of Images instead of a text field for a URL. Below contains an updated schema that would handle images, we have removed the other templates:

```other
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      templates: [
        {
          label: 'Article',
          name: 'article',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              name: 'hero',
              type: 'image',
              label: 'Hero',
            },
            {
              type: 'reference',
              label: 'Author',
              name: 'author',
              collection: 'authors',
            },
          ],
        },
      ],
    },
....
```

The last part of the Cloudinary integration is an API route that handles checking to see if the user is authorized to use the API route and then handle the correct api method.

```other
import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers'

import { isAuthorized } from 'tina-cloud-next'

export const config = mediaHandlerConfig

export default createMediaHandler({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
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

Now when you launch your application you will see a change in the sidebar, that gives you access to the media manager:

![Example.gif](https://res.cloudinary.com/dub20ptvt/image/upload/v1625834243/Tina/AnimatedImage_z7kaub.gif)