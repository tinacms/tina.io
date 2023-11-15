---
title: Hosting The Tina Backend on Netlify Functions
id: '/docs/reference/self-hosted/tina-backend/netlify-functions'
---

If you are not using Next.js but are using Netlify to host your site, you can deploy the Tina Backend as a [Netlify function](https://www.netlify.com/platform/core/functions/). This function will be responsible for handling all TinaCMS requests. This includes the GraphQL API, authentication, and authorization.

If you want to see Netlify functions in action, check out the [demo repo](https://github.com/tinacms/tina-self-hosted-static-demo)

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

Since Netlify Functions do not support catch all routes, you will need to add the following to your `vercel.json` file.

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

Next make sure to update your TinaCMS config to use the new endpoint.

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

Now you can run your site locally with `netlify dev`.
