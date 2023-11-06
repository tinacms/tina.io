---
title: Hosting The Tina Backend on Netlify Functions
id: '/docs/self-hosted/tina-backend/netlify-functions'
---

If you are not using Next.js but are using netlify to host your site, you can deploy the Tina Backend as a [Netlify function](). This function will be responsible for handling all TinaCMS requests. This includes the GraphQL API, authentication, and authorization.

## Configuration

Create a file called `netlify/functions/tina.{ts,js}` and add the following code:

```ts
// netlify/functions/tina.{ts,js}

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

Since Vercel Functions do not support catch all routes, you will need to add the following to your `vercel.json` file.

```json
{
  "rewrites": [
    {
      "source": "/api/tina/:path*",
      "destination": "/api/tina/backend"
    }
  ]
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

Next make sure to update your dev command to pass in the correct port so that both the backend and frontend are running on the same port.

```json
{
  "scripts": {
    "dev": "TINA_PUBLIC_IS_LOCAL=true tinacms dev -c \" <Your Dev Command> --port $PORT\""
  }
}
```

Now you can run your site locally with `vercel dev`.
