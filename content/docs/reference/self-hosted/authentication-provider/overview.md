---
id: '/docs/reference/self-hosted/authentication-provider/overview'
title: Choosing an Authentication Provider
prev: null
next: '/docs/reference/self-hosted/authentication-provider/next-auth'
---

The concept of an "Authentication Provider" refers to how TinaCMS will authenticate and authorize a user. There are two places that will require changes when setting up an authentication provider.

## 1. The config file (tina/config.{ts,tsx,js})

This is done by providing an [Auth Provider](/docs/reference/self-hosted/authentication-provider/bring-your-own#) to the `authProvider` option in `defineConfig`.

Example:

```ts
import { UsernamePasswordAuthJSProvider } from 'tinacms-authjs/dist/tinacms'
import { LocalAuthProvider } from 'tinacms'

export default defineConfig({
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  //...
})
```

## 2. Your Tina Backend

`/api/tina/[...routes].{ts,js}`

```ts
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

## Pre-Built Authentication Providers

- [AuthJS](/docs/reference/self-hosted/authentication-provider/next-auth)
- [Tina Cloud](/docs/reference/self-hosted/authentication-provider/tina-cloud)
- [Clerk](/docs/reference/self-hosted/authentication-provider/clerk-auth)

## Implementing an Authentication Provider

See [Custom Auth Provider](/docs/reference/self-hosted/authentication-provider/bring-your-own) for more information on how to implement your own auth provider.
