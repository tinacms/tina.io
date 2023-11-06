---
title: Hosting The Tina Backend with Vercel Functions
id: '/docs/self-hosted/tina-backend/vercel-functions'
next: '/docs/self-hosted/tina-backend/netlify-functions'
---

If you are not using Next.js but are using vercel to host your site, you can deploy the Tina Backend as a [vercel function](https://vercel.com/docs/functions/serverless-functions). This function will be responsible for handling all TinaCMS requests. This includes the GraphQL API, authentication, and authorization.

If you want to see netlify functions in action, check out the [demo repo](https://github.com/tinacms/tina-self-hosted-static-demo)

## Configuration

Create a file called api/tina/backend.{ts,js} and add the following code:

```ts
import express from 'express'
import type { RequestHandler } from 'express'
import cookieParser from 'cookie-parser'
import ServerlessHttp from 'serverless-http'
import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'
import { AuthJsBackendAuthentication, TinaAuthJSOptions } from 'tinacms-authjs'
import cors from 'cors'
import dotenv from 'dotenv'

import { databaseClient } from '../../tina/__generated__/databaseClient'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const tinaBackend = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : AuthJsBackendAuthentication({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
          debug: true,
        }),
      }),
  databaseClient,
})

app.post('/api/tina/*', async (req, res, next) => {
  // Modify request if needed
  tinaBackend(req, res, next)
})

app.get('/api/tina/*', async (req, res, next) => {
  // Modify request if needed
  tinaBackend(req, res, next)
})

export const handler = ServerlessHttp(app)
```

Add the following to your `vercel.json` file.

```toml
[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/tina/*"
  to = "/.netlify/functions/tina"
  status = 200
  force = true
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

Now you can run your site locally with the `next dev` command
