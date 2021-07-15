---
title: 'Front-end Setup'
---

We're going to be using the Next.js blog starter as the base of our project. By default, it pulls all its data from the filesystem, but we'll want to make some changes to have it pull data from Strapi's GraphQL API.

We want to _keep Strapi running_ throughout this entire process. So, open a new terminal and create a new project alongside Strapi using the following command:

```bash
yarn create next-app -e blog-starter tina-strapi-blog
```

Navigate into the new directory and start up the website's dev server.

```bash
cd tina-strapi-blog
yarn dev
```

Navigate to [http://localhost:3000](http://localhost:3000) and see what we'll be working with.

The blog is made up of two main pieces: an index page, and the blog post pages. Our goal will be to have the data on both of these pages come from Strapi, instead of from the filesystem.

## Setup Environment Variable

Our front-end has to know how to reach Strapi, so we'll set up an environment variable that will allow us to configure this. First, install `dotenv`

```bash
yarn add dotenv
```

Then in the root of the project create a file called `.env` and fill in the Strapi URL.

**.env**

```.env
STRAPI_URL=http://localhost:1337
```

Also at the root of the project create a new file called `next.config.js` and populate it with

**next.config.js**

```js
require('dotenv').config()

module.exports = {
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
}
```

Whenver we start up our front-end project, this URL will be loaded into our environment and we'll have access to Strapi's location wherever we end up needing it.

## Add Tina

Let's start getting Tina in place to let us use our editing experience a bit down the road. We'll install Tina, its `styled-components`, and a library that will help us work with Strapi.

```bash
yarn add tinacms styled-components react-tinacms-strapi
```

### Add the Provider

In `pages/_app.js`, we're going to configure our site to have access to Tina and Strapi functionality on every page.

**pages/\_app.js**

```js
import '../styles/index.css'

import {
  StrapiMediaStore,
  StrapiProvider,
  StrapiClient,
} from 'react-tinacms-strapi'
import { TinaCMS, TinaProvider } from 'tinacms'

import { useMemo } from 'react'

export default function MyApp({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled: true,
        toolbar: true,
        apis: {
          strapi: new StrapiClient(process.env.STRAPI_URL),
        },
        media: new StrapiMediaStore(process.env.STRAPI_URL),
      }),
    []
  )
  return (
    <TinaProvider cms={cms}>
      <StrapiProvider
        onLogin={() => {
          /* we'll come back to this */
        }}
        onLogout={() => {
          /* we'll come back to this */
        }}
      >
        <Component {...pageProps} />
      </StrapiProvider>
    </TinaProvider>
  )
}
```

If you refresh [your site](http://localhost:3000), you shouldn't see any changes. But we've made good progress under the hood.

First off, we instantiated the CMS object, which is the heart-and-soul of Tina. We've configured it to show only the [toolbar](https://tinacms.org/docs/cms/ui#toolbar-configuration) and hide the sidebar. We've also passed it a `StrapiClient` that is responsible for communicating with our Strapi server. Additionally, we've added a `StrapiMediaStore`, which will allow us to upload images to Strapi.

We're wrapping our pages with a `TinaProvider` and a `StrapiProvider` so that all of our pages can interact with Tina and Strapi respectively. We'll figure out what we want to happen `onLogin` and `onLogout` in just a little bit.
