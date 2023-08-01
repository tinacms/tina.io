---
id: '/docs/self-hosted/authentication-provider/overview'
title: Choosing an Authentication Provider
prev: null
next: '/docs/self-hosted/authentication-provider/next-auth'
---

The concept of an "Authentication Provider" refers to how TinaCMS will authenticate and authorize a user. There is two places that will require changes when setting up an authentication provder.

1. The config file (`tina/config.{ts,tsx,js}`)

This is done by providing [various functions](/docs/self-hosted/authentication-provider/bring-your-own#) to the `auth` option in `defineConfig`. If you are using a [pre-built authentication provider](), it will provide these functions for you.

Example:

```ts
import { createHandlers } from 'tinacms-some-auth-provider'

export default defineConfig({
  // ...
  auth: createHandlers({
    // ...
  }),
})
```

2. Your GraphQL endpoint

EX: /api/gql.{ts,tsx,js}

```ts
import { NextApiHandler } from 'next'
import databaseClient from '../../tina/__generated__/databaseClient'
import { withAuth } from 'tinacms-some-auth-provider'

const nextApiHandler: NextApiHandler = async (req, res) => {
  const { query, variables } = req.body
  const result = await databaseClient.request({ query, variables })
  return res.json(result)
}

export default withNextAuthApiRoute(nextApiHandler)
```

See [Bring Your Own Authentication Provider](/docs/self-hosted/authentication-provider/bring-your-own) for more information on how to implement your own authentication provider.

## Pre-Built Authentication Providers

- [NextAuth](/docs/self-hosted/authentication-provider/next-auth)
