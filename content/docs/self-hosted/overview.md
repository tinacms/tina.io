---
title: Self Hosted Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/starters/nextjs-vercel
---

## Introduction

By default, TinaCMS uses Tina Cloud as its backend. Tina Cloud is a powerful, out-of-the-box solution that handles reading/writing to your GitHub repository, caching content in a queryable data layer, and authentication / authorization.

For users who want to be independent of Tina Cloud, **we also offer a self-hosted alternative** where you can host your own Tina Data Layer and provide your own database, user authentication, and custom Git integration.

> In this doc, we will give an overview of the Self-hosted architecture. If you're looking to skip ahead, check out our [Self-hosted Starter Docs](/docs/self-hosted/starters/overview/)

## How does it work?

By Self-hosting TinaCMS's backend, you can host the API in a single API function. This API function acts as a GraphQL endpoint w/ CRUD for your content.

```js
// pages/api/graphql.js
import databaseClient from '../../tina/__generated__/databaseClient'

const apiHandler = async (req, res) => {
  const { query, variables } = req.body

  // Your custom authentication function
  const isAuthenticated = await authenticate({
    token: req.headers.authorization,
  })
  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  // make the request
  const result = await databaseClient.request({ query, variables })
  return res.json(result)
}

export default apiHandler
```

The backend relies upon a three configurable modules:

- [Auth](/docs/self-hosted/authentication/overview)
  - Handles authentication and authorization for CMS operations.
- [The Database](/docs/reference/self-hosted/database-adapter/overview)
  - Handles indexing and interaction with the database
- [The Git Provider](/docs/reference/self-hosted/git-provider/overview)
  - Handles saving content to Git

### Custom Authentication

Tina's self-hosted solution allows you to bring your own authentication.

> Out of the box, we provide a default implementation with NextAuth, and we also have an example [working with Clerk](https://github.com/tinacms/tina-cloud-starter-self-hosted-clerk).

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

> For more information on configuring auth, check out the [Auth Provider docs](/docs/reference/self-hosted/authentication-provider/overview/).

### Configuring the database

Content in a Tina projects needs to be indexed in a database. Tina's self-hosted backend works with several different types of databases.

Tina provides 2 types database adapters out of the box: Redis & MongoDB.

The database is configured in **`.tina/database.{js,ts}`**.

#### tina/database.{ts,js}

This file exports an instance of the TinaCMS Database, which handles indexing, queries and CRUD operations. A database instance requires a [`databaseAdapter`](/docs/reference/self-hosted/database-adapter/overview/) and a [`gitProvider`](/docs/reference/self-hosted/git-provider/overview/). The database acts as an ephemeral caching layer for your content.

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

> For more information of configuring a Database Provider, check out our [reference docs](/docs/reference/self-hosted/database-adapter/overview/).

### Configuring the Git Provider

The Git Provider is responsible for saving content to git when your editors make updates. It is configured within a prop on the `createDatabase` function. Out of the box we support a [GitHub Git Provider](/docs/reference/self-hosted/git-provider/github).

```ts
// database.{ts,js}
//...

export default isLocal ? createLocalDatabase() ? createDatabase({
    gitProvider: new SomeGitProvider(),
    // ...
})
```

> If you do not use Github, you can [make your own Git Provider](/docs/reference/self-hosted/git-provider/make-your-own).

If you're interested in self-hosting Tina, you can read about this solution on [GitHub](https://github.com/tinacms/tinacms/discussions/3589) or in this [blog](https://tina.io/blog/self-hosted-datalayer/) post.

**Note on Licensing -** TinaCMS is licensed under the Apache 2.0 license.
