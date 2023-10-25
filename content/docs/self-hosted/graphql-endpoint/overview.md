---
title: Hosting The Tina Backend
id: '/docs/self-hosted/graphql-endpoint/overview'
---

The Tina Backend is hosted in a single endpoint that is responsible for handling all TinaCMS requests. This includes the GraphQL API, authentication, and authorization.

The handler can be created with a `TinaNodeBackend` function. This function takes a `TinaNodeBackendOptions` object as an argument.

## Configuration

You need to create an endpoint that can handle post requests. In this example we will use Next.js api routes, but you can use any framework you want.

```js
// pages/api/tina/[...routes].{ts,js}

import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'
import { TinaAuthJSOptions, AuthJsBackendAuthentication } from 'tinacms-authjs'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET,
        }),
      }),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}
```

Next Make sure to update your TinaCMS config to use the new endpoint.

```js
// tina/config.{js,ts}
export default defineConfig({
  // This is the url to your graphql endpoint
  contentApiUrlOverride: '/api/tina/gql',
  //...
})
```
