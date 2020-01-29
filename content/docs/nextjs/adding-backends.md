---
title: Adding a Backend
id: /docs/nextjs/adding-backends
prev: /docs/nextjs/bootstrapping
next: /docs/nextjs/creating-forms
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Demonstrates using Express server
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Demonstrates using Express server
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Sets up git client to consume backend
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Shows wrapping Next.js app with Tina component
  - file: /packages/tinacms/src/tina-cms.tsx
    details: Creates cms instance with TinaCMS
---

The `<Tina>` component makes it possible to attach [forms](../concepts/forms.md) to the Tina sidebar, but we need to wire up a [backend](../concepts/backends.md) in order for content changes to be persisted anywhere. Let's set up the default git backend.

The git backend consists of two parts:

1. The server-side application that handles file manipulation and interaction with the git protocol, and
2. The client-side adapter that allows forms registered with Tina to send data to the server-side app.

Because backends in Tina are designed as [express-compatible middleware](/docs/concepts/backends), we need a way to add middleware to our Next.js dev server. To do this, we will need to use Next.js with a [custom development server](https://github.com/zeit/next.js#custom-server-and-routing) that will use Express and allow us to attach the git middleware.

## Installation

Run the following installation command:

```
npm install express cors @tinacms/api-git @tinacms/git-client
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

```json
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.js"
  }
```

### Add Backend Middleware to the Dev Server

As mentioned previously, backends in Tina are written as middleware that can be attached to any Express server. Now that we have our custom dev server running Express and handling requests, all that's left to do is attach the necessary middleware:

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
+   server.use('/___tina', gitApi.router())

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

All that's left is to configure the CMS to consume the git API that now runs on the backend. We can do this easily with the `GitClient` class from the `@tinacms/git-client` package. To get started, install the package:

```
npm install @tinacms/git-client
```

When creating an instance of `GitClient`, we need to pass it the URL where the API endpoints can be reached. Since we're running the server locally on port 3000, the full URL to our git backend is `http://localhost:3000/___tina`. We could then instantiate the git client as follows:

```javascript
const client = new GitClient('http://localhost:3000/___tina')
```

We'll need to amend our `_app.js` application wrapper to register this with the CMS. We can attach APIs to our CMS using the `registerApi` method.

The `_app.js` file should now look something like this:

```javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
import { GitClient } from '@tinacms/git-client'

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
    const client = new GitClient('http://localhost:3000/___tina')
    this.cms.registerApi('git', client)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp
```
