---
title: Backends
id: /docs/concepts/backends
prev: /docs/concepts/fields
next: /docs/concepts/plugins
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Explains creating a custom Express backend
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Explains creating a custom Express backend
---

A **backend** for the CMS will specify where content is stored, as well as where the latest version of content is sourced from.

Backend should be implemented as an [express router](https://expressjs.com/en/guide/routing.html#express-router), which can be plugged into the website's development server to expose a content storage API.

## Available Backends

- Git

## Creating a Custom Backend

<tip> **Please note:** the examples below are considered advanced use-cases; it is currently recommended for most folks to use the default Git-based backend.</tip>

We recommend that backends that intend to support multiple platforms be broken into two parts:

1. a core package that provides an Express router
2. an adapter package that plugs this router into an express server running on the website

The following example creates an arbitrary backend API and hooks it up to Gatsby's dev server. We can create a standalone package called `custom-backend` that returns an express router:

```javascript
// custom-backend/index.js

const express = require('express')

function customBackend() {
  let router = express.Router()

  router.put('/update-content', (req, res) => {
    //update the content
  })

  return router
}

module.exports = customBackend
```

Then, create a Gatsby plugin that leverages its `onCreateDevServer` hook to plugin this backend's router into the Gatsby dev server:

```javascript
// gatsby-plugin-custombackend/gatsby-node.js

const customBackend = require('custom-backend')

exports.onCreateDevServer = ({ app }) => {
  app.use('/my-route-prefix', customBackend())
}
```

In our client-side code, this backend API can now be accessed by making a PUT request to `/my-route-prefix/update-content`. Including a route prefix is optional but highly recommended to prevent collisions with pages on the user's website.
