---
title: Tina Cloud Authentication Provider
id: '/docs/reference/self-hosted/authentication-provider/tina-cloud'
prev: '/docs/reference/self-hosted/authentication-provider/authjs'
next: '/docs/reference/self-hosted/authentication-provider/bring-your-own'
---

You can use Tina Cloud for your authentication. This is the easiest way to get up and running quickly.

If you have not already you can create a Tina Cloud [account](app.tina.io) and create a new project.

Once you have created a project you will need to add the following environment variables to your project:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=***
```

## Configure the auth provider

Since we are using Tina Cloud no extra setup is required.

`tina/config.{ts,js}`

```ts
//...
export defualt defineConfig({
  // Make sure this is set to point to your graphql endpoint
  contentApiUrlOverride: "/api/tina/gql",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  //...
  admin: {
    auth: {
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === "true",
    },
  },
})
```

## Update the Tina Backend

First install the `@tinacms/auth` package:

```bash
yarn add @tinacms/auth
```

Next you can update your Tina Backend to use the `TinaCloudBackendAuthentication` class.

`/pages/api/tina/[...routes].{ts,js}`

```ts
import { TinaNodeBackend, LocalBackendAuthentication } from '@tinacms/datalayer'
import { TinaCloudBackendAuthentication } from '@tinacms/auth'

import databaseClient from '../../../tina/__generated__/databaseClient'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const handler = TinaNodeBackend({
  authentication: isLocal
    ? LocalBackendAuthentication()
    : TinaCloudBackendAuthentication(),
  databaseClient,
})

export default (req, res) => {
  // Modify the request here if you need to
  return handler(req, res)
}
```
