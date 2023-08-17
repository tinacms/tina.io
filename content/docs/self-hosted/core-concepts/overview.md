---
title: Self-Hosted Architecture
id: '/docs/self-hosted/core-concepts/overview'
prev: null
next: /docs/self-hosted/querying-data
---

## Overview

By Self-hosting TinaCMS's backend, you can host the API in a single API function. This API function acts as a GraphQL endpoint. This endpoint is responsible for handling CRUD for your content.

If you're using a NextJS serverless function to host your API, if might look like this:

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

The above implementation relies upon a few configurable modules:

- [Authentication](/docs/self-hosted/authentication/overview)
  - Handles authentication and authorization
- [The Database](/docs/reference/self-hosted/database-adapter/overview)
  - Handles indexing and interaction with the database
- [The Git Provider](/docs/reference/self-hosted/git-provider/overview)
  - Handles saving content to git

![Self Hosted Core Concepts](/Datalayer.svg)

## Custom Authentication

Tina's self-hosted solution allows you to bring your own authentication.

> Out of the box, we provide a default implementation with NextAuth, and we also have an example working with Clerk.

Custom authentication is setup in the **`tina/config.{js,ts}`** file.

```ts
// tina/config.ts
import { defineConfig } from 'tinacms'

export default defineConfig({
  // ...
  auth: {
    // ...
  },
})
```

There are also a few boilerplate auth files that are generated in your project during the `tina init` process.

For more info, check out the [auth provider docs](/docs/reference/self-hosted/authentication-provider/overview/).

## Configuring the database

Content in a Tina projects needs to be indexed in a database. Tina's self-hosted backend works with several different types of NoSQL databases.

Tina provides 2 types database adapters out of the box: Redis & MongoDB.

The database is configured in **`.tina/database.{js,ts}`**.

### tina/database.{ts,js}

This file exports an instance of the TinaCMS Database, which handles indexing, queries and CRUD operations. A database instance requires a [`databaseAdapter`](/docs/reference/self-hosted/database-adapter/overview/) and a [`gitProvider`](/docs/reference/self-hosted/git-provider/overview/). The database acts as an ephemeral caching layer, so that when you query your content it is not necessary to retrieve it from the git provider.

Example:

```ts
// tina/database.ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'

// isLocal will decide whether to use a local file system database or a remote database
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new MyGitProvider(),
      databaseAdapter: new MyDatabaseAdapter(),
    })
```

## Configuring the Git Provider

The Git Provider is responsible for saving content to git. It is passed as a prop to the `createDatabase` function. Out of the box we support a [GitHub Git Provider](/docs/reference/self-hosted/git-provider/github).

```ts
// database.{ts,js}
//...

export default isLocal ? createLocalDatabase() ? createDatabase({
    gitProvider: new SomeGitProvider(),
    // ...
})
```

If you do not use Github, you can [make your own Git Provider](/docs/reference/self-hosted/git-provider/make-your-own).
