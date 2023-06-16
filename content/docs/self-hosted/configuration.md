---
title: Getting Started with Self-Hosting TinaCMS
id: /docs/self-hosted/configuration
last_edited: '2023-02-01T04:00:00.000Z'
---

## Elements of Self Hosted Tina

### Database File

The database is configured in **`.tina/database.{js,ts}`** .

This file is the main element of the self hosted solution. It exports an instance of the TinaCMS Database, which handles indexing, queries and CRUD operations. A database instance requires a LevelDB implementation. It is also configured with optional onPut/onDelete handlers which are used to make updates to your Git repository. The database acts as an ephemeral caching layer, so that when you query your content it is not necessary to retrieve it from the git provider.

```typescript
import { createDatabase, TinaLevelClient } from '@tinacms/datalayer'
import { MongodbLevel } from 'mongodb-level'
import { Octokit } from '@octokit/rest'
import { Base64 } from 'js-base64'

// `isLocal` determines if the database is running in "Local Mode" or "Production Mode". You can set this value in your .env file or use a different method for determining the value. In this example we are using an environment variable.

// When in "Local Mode" a local levelDB server is used and data is saved to the file system
// When in "Production Mode" Your provided LevelDB implementation is used (MongoDB Level in this example) and data is written to the Git repository with "onPut" and "onDelete" callback functions
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

if (isLocal) console.log('Running TinaCMS in local mode.')
else console.log('Running TinaCMS in production mode.')

const owner = process.env.GITHUB_OWNER as string
const repo = process.env.GITHUB_REPO as string
// Must create a personal access token
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string
const branch = process.env.GITHUB_BRANCH as string

const octokit = new Octokit({
  auth: token,
})
const localLevelStore = new TinaLevelClient()
const mongodbLevelStore = new MongodbLevel({
  collectionName: 'tinacms',
  dbName: 'tinacms',
  mongoUri: process.env.MONGODB_URI as string,
})
if (isLocal) {
  localLevelStore.openConnection()
}

// When the data is updated this function is called
const githubOnPut = async (key, value) => {
  // See example for implementation
}
const localOnPut = async (key, value) => {
  // See example for implementation
}

// When the data is deelted this function is called
const githubOnDelete = async (key) => {
  // See example for implementation
}
const localOnDelete = async (key, value) => {
  // See example for implementation
}

export default createDatabase({
  level: isLocal ? localLevelStore : mongodbLevelStore,
  onPut: isLocal ? localOnPut : githubOnPut,
  onDelete: isLocal ? localOnDelete : githubOnDelete,
})
```

#### `Level`

You must provide an [abstract-level database](https://github.com/Level/abstract-level 'Abstract Level ') implementation. In the example above we have used [mongodb-level](https://github.com/tinacms/mongodb-level#readme 'mongodb-level') which is a LevelDB implementation maintained by the TinaCMS team. You are free to use the mongodb-level implementation or make your own abstract-level implementation and use that instead.

#### `onPut` and `onDelete`

The onPut and onDelete functions are used to update the git repository when there are updates and deletes via the TinaCMS api. In the example above we show how to save data to Github, but feel free to swap our example for any git provider.

The onPut function takes key and value parameters. The key is the path to the file in the repository that was updated and the value is the file contents. The onDelete function takes a key parameter, which is the path to the file in the repository that was deleted.

### Using the database on the server

Querying the database from the server works a bit different when using self hosted Tina. When using Tina, you normally use [The Tina Client](https://tina.io/docs/features/data-fetching/ 'The Tina Client'), but when self hosting, it is likely that that the GraphQL endpoint will not be available at build time (If you are using Next.js api endpoints, for example). So when querying content from the server, we recommend querying the database directly. We have created an example of what this looks like:

##### `lib/databaseConnection.ts`&#x20;

```typescript
import database from '../.tina/database'
import { queries } from '../.tina/__generated__/types'
import { resolve } from '@tinacms/datalayer'
import type { TinaClient } from 'tinacms/dist/client'

export async function databaseRequest({ query, variables }) {
  const config = {
    useRelativeMedia: true,
  } as any

  const result = await resolve({
    config,
    database,
    query,
    variables,
    verbose: true,
  })

  return result
}

export function getDatabaseConnection<GenQueries = Record<string, unknown>>({
  queries,
}: {
  queries: (client: {
    request: TinaClient<GenQueries>['request']
  }) => GenQueries
}) {
  const request = async ({ query, variables }) => {
    const data = await databaseRequest({ query, variables })
    return { data: data.data as any, query, variables, errors: data.errors }
  }
  const q = queries({
    request,
  })
  return { queries: q, request }
}

export const dbConnection = getDatabaseConnection({ queries })
```

With this, you can use `dbConnection` just like [the Tina Client would be used](https://tina.io/docs/features/data-fetching/#making-requests-with-the-tina-client 'TinaCMS Client'). It will have all the generated queries and a request function for raw GraphQL requests.

Here is an example of using this:

```typescript
import { dbConnection } from '../../lib/databaseConnection'

export const getStaticProps = async ({ params }) => {
  const tinaProps = await dbConnection.queries.blogPostQuery({
    relativePath: `${params.filename}.mdx`,
  })
  return {
    props: {
      ...tinaProps,
    },
  }
}
```

`dbConnection` has direct database access, so it can only be used on the server. If you want to fetch data on the client side, you must use the [Tina Client]((https://tina.io/docs/features/data-fetching/#making-requests-with-the-tina-client 'TinaCMS Client')).

### The GraphQL Endpoint

When editing with TinaCMS, CRUD operations get sent to a GraphQL endpoint. Normally this is Tina Cloud, but when you self host you must provide this endpoint. The following examples show how this can be done in a Next.js API route, but it can adapted for use in any environment. You must add your own authorization function here or use Tina Cloud's auth server if you wish.

##### `pages/api/gql.{ts,js}`

```typescript
import { databaseRequest } from '../../lib/databaseConnection'
import database from '../.tina/database'

export default async function handler(req, res) {
  // Add your own Auth here.
  // For example
  // If(!await isAuthorized(token: req.headers.authorization)){
  //   return a 401
  //  }
  const { query, variables } = req.body
  const result = await databaseRequest({ query, variables, database })
  return res.json(result)
}
```

Now you can configure this endpoint in the config:

`.tina/config.{ts,js}`

```typescript
const config = defineConfig({
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === 'true',
    }
  }
  //...
```

### Authentication&#x20;

#### Using Tina Cloud for Authentication

If you just wish to self host your content and you don't need to customize authentication, you can use Tina Cloud for authorization and authentication. This can be done by adding the following to your endpoint:

##### `pages/api/gql.{ts,js}`

```diff
import { isUserAuthorized } from "@tinacms/auth";

import { databaseRequest } from "../../lib/databaseConnection";
import createDatabase from "../../.tina/database";
const database = createDatabase();

export default async function handler(req, res) {
+  const isAuthorized = await isUserAuthorized({
+    token: req.headers.authorization,
+    clientID: "<YourClientIdFromTinaCloud>",
+  });
+  if (!isAuthorized) {
+    return res.status(401).json({ message: "Unauthorized" });
+  }

  const { query, variables } = req.body;
  const result = await databaseRequest({ query, variables, database });
  return res.json(result);
}
```

#### Self hosting your Authentication

To self host your own authentication, you must implement several functions. These functions are passed to the TinaCMS client when it is initialized. The following functions are available:

`authenticate`: This function is called when the user goes into `/admin` and they are not logged in (determined by `getUser`). This function should redirect the user to the login page or do whatever is necessary to authenticate the user.

`getUser`: This function is called when the user goes into `/admin` and is used to determine if the user is logged in. If it returns a truthy value, the user is logged in and if it returns a falsy value the user is not logged in.

`getToken`: This function is called when a request is made to the GraphQL endpoint. It should return an object with an `id_token` property. This will be passed as an `Authorization` header in the format `Bearer <id_token>`

`logOut`: This function is called when the user clicks the logout button in the admin.

Set `customAuth` to `true` in the config to enable this.

Add the functions to your `config.{ts,js}`&#x20;

```javascript
export default defineConfig({
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      customAuth: true,
      // This is called when they want to authenticate a user. For a lot of implementations it just may be redirecting to the login page
      async authenticate() {
        console.log('Authenticating...')
        localStorage.setItem(
          'local_cache',
          JSON.stringify({ name: 'Logan', role: 'admin' })
        )
        return {}
      },
      // Get token this will be called when a request and will be passed as an `Authorization` header in the format `Bearer <id_token>`
      getToken: async () => {
        return {
          id_token: 'Foo',
        }
      },
      // Called to log the user out
      async logOut() {
        console.log('logOut...')
        localStorage.removeItem('local_cache')
        window.location.href = '/'
      },
      // The CMS uses this function to get info about the user. It also uses it to see if the user is logged in. Provide a truthy value if the user is logged in and a falsy value if the user is not
      async getUser() {
        console.log('getUser...')
        const userStr = localStorage.getItem('local_cache')
        if (!userStr) {
          return undefined
        } else {
          try {
            return JSON.parse(userStr)
          } catch {
            return null
          }
        }
      },
      //...

```

Next you can use the value passed from `getToken` in your backend function to make sure the user is authenticated:

`pages/api/gql.{js,ts}`

```diff
import { databaseRequest } from "../../lib/databaseConnection";
import createDatabase from "../../.tina/database";
const database = createDatabase();

export default async function handler(req, res) {
+  const isAuthorized = await myCustomIsAuthorizedFunction({
+       // This has the format of `Bearer <id_token>`
+       token: req.headers.authorization,
+  });

+  if (!isAuthorized) {
+    return res.status(401).json({ message: "Unauthorized" });
+  }

const { query, variables } = req.body;
const result = await databaseRequest({ query, variables, database });
return res.json(result);
}
```
