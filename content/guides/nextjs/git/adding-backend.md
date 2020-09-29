---
title: Adding a Backend
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Demonstrates using Express server
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Demonstrates using Express server
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Sets up Git client to consume backend
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Shows wrapping Next.js app with Tina component
  - file: /packages/tinacms/src/tina-cms.tsx
    details: Creates cms instance with TinaCMS
---

The `TinaProvider` component makes it possible to attach [forms](/docs/plugins/forms) to the Tina sidebar, but we need to wire up a backend in order for content changes to be persisted anywhere. Let's set up the default Git backend.

**The Git backend consists of two parts:**

1. The _server-side application_ that handles file manipulation and interaction with the Git protocol, and
2. The _client-side adapter_ that allows forms registered with Tina to send data to the server-side app.

Because backends in Tina are designed as Express-compatible middleware, we need a way to add middleware to our Next.js dev server. To do this, we will need to use Next.js with a [custom development server](https://nextjs.org/docs/advanced-features/custom-server) that will use Express and allow us to attach the Git middleware.

## Installation

Run the following installation command:

```bash
yarn add express cors @tinacms/api-git @tinacms/git-client
```

## Adding the Server-side Middleware

### Using a Custom Dev Server

Start by creating a custom server file to run your dev server. Next.js provides an example of using an Express server in [this GitHub repository](https://github.com/zeit/next.js/tree/canary/examples/custom-server-express), which we'll be following pretty closely.

A bare-bones `server.js` file might look something like this:

```javascript
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

In order to run this server instead of the default Next.js dev server, you will need to set up a script in your `package.json` file to run this file:

```diff
   "scripts": {
-    "dev": "next",
+    "dev": "node server.js",
     "build": "next build",
     "start": "cross-env NODE_ENV=production node server.js"
   }
```

### Add Backend Middleware to the Dev Server

As mentioned previously, backends in Tina are written as middleware that can be attached to any Express server. Now that we have our custom dev server running Express and handling requests, all that's left to do is attach the necessary middleware in `server.js`:

```diff
  const express = require('express')
  const next = require('next')
+ const cors = require('cors')
+ const gitApi = require('@tinacms/api-git')

  const port = parseInt(process.env.PORT, 10) || 3000
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    const server = express()

+   server.use(cors())
+   server.use('/___tina', gitApi.router({
+     pathToRepo: process.cwd(),
+     pathToContent: "",
+   }))

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
```

## Hooking up the Frontend

Now we need to configure the CMS to consume the Git API now running on the backend. We can do this easily with the `GitClient` class from the `@tinacms/git-client` package.

When creating an instance of `GitClient`, we need to pass it the URL where the API endpoints can be reached. Since we're running the server locally on port 3000, the full URL to our Git backend is `http://localhost:3000/___tina`. We could then instantiate the Git client as follows:

```javascript
const client = new GitClient('/___tina')
```

We'll need to amend our `_app.js` application wrapper to register this with the CMS. We can pass [APIs](/docs/apis), [Media](/docs/media), and [UI](/docs/ui-components) settings in a config object to `TinaCMS`.

The `pages/_app.js` file should now look something like this:

```javascript
import React from 'react'
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'
import { GitClient, GitMediaStore } from '@tinacms/git-client'

class MyApp extends App {
  constructor() {
    super()

    const client = new GitClient('/___tina')

    this.cms = new TinaCMS({
      enabled: true,
      apis: {
        git: client,
      },
      media: new GitMediaStore(client),
      sidebar: {
        position: 'overlay',
      },
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}

export default MyApp
```

If you restart the dev server, you should see an 'edit icon' in the lower left-hand corner. If you open that, you'll see and empty Tina sidebar! Let's create some forms to edit content from the sidebar.
