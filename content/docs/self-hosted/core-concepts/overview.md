---
title: Self Hosted Core Concepts
id: '/docs/self-hosted/core-concepts/overview'
prev: null
next: null
---

The Datalayer contains 3 main components all of these components are meant to be interchangeable, meaning you can use any of the components with any other component.

![Self Hosted Core Concepts](/Datalayer.svg)

- [Git Provider](/docs/self-hosted/git-provider/overview)
  - Handles saving content to git
- [Database Adapter](/docs/self-hosted/database-adapter/overview)
  - Handles indexing and interaction with the database
- [Authentication](/docs/self-hosted/authentication/overview)
  - Handles authentication and authorization

## Configuring the Datalayer

### tina/database.{ts,js}

The database is configured in **`.tina/database.{js,ts}`** .

This file is the main element of the self hosted solution. It exports an instance of the TinaCMS Database, which handles indexing, queries and CRUD operations. A database instance requires a [`databaseAdapter`](/docs/self-hosted/database-adapter/overview/) and a [`gitProvider`](/docs/self-hosted/git-provider/overview/). The database acts as an ephemeral caching layer, so that when you query your content it is not necessary to retrieve it from the git provider.

Example:

```ts
// tina/database.ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'

// isLocal will decide weather to use a local file system database or a remote database
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new MyGitProvider(),
      databaseAdapter: new MyDatabaseAdapter(),
    })
```

If you wanted to use MongoDB for your database and Github for your Git Provider you would do the following:

```ts
// tina/database.ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'
import { GitHubProvider } from 'tinacms-gitprovider-github'
import { MongodbLevel } from 'mongodb-level'

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        // Create a new collection for each branch (if you are using branches). If you are not using branches you can pass a static collection nam. ie: "tinacms"
        collectionName: branch,
        dbName: 'tinacms',
        mongoUri: process.env.MONGODB_URI as string,
      }),
      gitProvider: new GitHubProvider({
        branch: branch,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
    })
```

### CreateDatabase Function

This is a factory function that creates a new instance of the TinaCMS Database. It takes a [`databaseAdapter`](/docs/self-hosted/database-adapter/overview/) and a [`gitProvider`](/docs/self-hosted/git-provider/overview/).

| Parameter             | Description                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `databaseAdapter`     | The [database adapter](/docs/self-hosted/database-adapter/overview) to use. (Required)                                                                                                                                                                                                     |
| `gitProvider`         | The [git provider](/docs/self-hosted/git-provider/overview) to use. (Required)                                                                                                                                                                                                             |
| `tinaDirectory`       | The directory used to store tina files. Defaults to `tina` (Optional)                                                                                                                                                                                                                      |
| `bridge`              | The bridge used to index the content to the database adapter. This defaults to the FileSystem. The `bridge` is a more advanced use case if you want to index from a differt souce other then the fileSystem, please [reach out a discord](https://discord.gg/zumN63Ybpf) for further help. |
| `indexStatusCallback` | an async function that is called to report the status on the current indexing                                                                                                                                                                                                              |

### CreateLocalDatabase Function

This is a factory function that creates a database that can be used for locally development or [static builds](/docs/cli-overview/#examples).

It uses a local in memory database adapter and a file system git provider that just writes changes to the file system (note: it does not commit them).

(_does not take any parameter_)

## Custom Authentication

Custom authentication is setup in **`tina/config.{js,ts}`** file. Tina Cloud can also be used for authentication. For more info checkout the [auth provider docs](/docs/self-hosted/authentication-provider/overview/).

Example:

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
