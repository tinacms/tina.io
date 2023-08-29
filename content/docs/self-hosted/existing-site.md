---
title: Setting up Self-Hosted Backend on an existing project
id: /docs/self-hosted/existing-site
last_edited: '2023-07-07T04:00:00.000Z'
next: /docs/self-hosted/querying-data
---

If you want to self-host the Tina backend, and don't want to use our [pre-configured starter](/docs/self-hosted/starters/nextjs-vercel/), you can follow the steps below.

We offer a CLI init to quickly setup the backend on NextJS sites, or you can take the manual setup approach if you're using another framework.

> This guide assumes that you have already init the TinaCMS admin into your site. If you haven't already done so, see our [Getting Started Guide](/docs/setup-overview/)

## Using the CLI init command (NextJS Only)

In the terminal, run:

```bash
npx @tinacms/cli@latest init backend
```

This will prompt you to answer some questions:

### GitHub Personal Access Token

A Github Personal Access Token can be created in the [GitHub account settings](https://github.com/settings/personal-access-tokens/new).

Make sure to assign it `repo` access to your new repository with Read/Write access to Contents.

### Choosing a Database Adapter

Out of the box, TinaCMS provides two database adapters in the init workflow: "Redis" & "Vercel KV". Learn more about Database Adapters [here](/docs/reference/self-hosted/database-adapter/overview/).

### Enable NextAuth.js integration

The "init-backend" command offers one out-of-the-box auth solution, which is built with Next-Auth. The will store your CMS users inside your own database alongside your content.

If you wish to use another auth provider, or want to learn more about Tina auth, see our [reference docs](/docs/reference/self-hosted/authentication-provider/overview/).

### Apply Output self-hosted config

Once you've finished going through all the prompts, the CLI will output some code that needs to be added to your tina/config.ts file.

At this point, your self-hosted setup should be complete.

## Manually configuring the Self-hosted backend

### 1. Choose a Git provider, database adapter, and authentication provider

You will need to choose a [Git provider](/docs/reference/self-hosted/git-provider/overview/), [database adapter](/docs/reference/self-hosted/database-adapter/overview/), and [authentication provider](/docs/reference/self-hosted/authentication-provider/overview/). You can use any of the providers we have created or you can create your own. In the example below we will use GitHub, VercelKV, and Next Auth.

### 2. Install the dependencies

```bash
yarn add tinacms @tinacms/datalayer
```

```bash
yarn add --dev @tinacms/cli
```

Install any dependencies for your chosen git provider, database adapter, and authentication provider (This may very to depending on what you have chosen)

```bash
yarn add tinacms-gitprovider-github tinacms-next-auth upstash-redis-level @upstash/redis
```

### 3. Create a database file

Create a file called `database.{js,ts}` in the the `/tina` folder of your project. This file will be used to create the database.

`tina/database.{ts,js}`

```ts
import { createDatabase, createLocalDatabase } from '@tinacms/datalayer'

// Change this to your chosen git provider
import { GitHubProvider } from 'tinacms-gitprovider-github'

// Change this to your chosen database adapter
import { Redis } from '@upstash/redis'
import { RedisLevel } from 'upstash-redis-level'

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main'

if (!branch) {
  throw new Error(
    'No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable.'
  )
}

export default isLocal
  ? // If we are running locally, use a local database that stores data in memory and writes to the locac filesystem on save
    createLocalDatabase()
  : // If we are not running locally, use a database that stores data in redis and Saves data to github
    createDatabase({
      // May very depending on your git provider
      gitProvider: new GitHubProvider({
        repo: process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG,
        owner: process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        branch,
      }),
      // May very depending on your database adapter
      databaseAdapter: new RedisLevel<string, Record<string, any>>({
        redis: new Redis({
          url:
            (process.env.KV_REST_API_URL as string) || 'http://localhost:8079',
          token: (process.env.KV_REST_API_TOKEN as string) || 'example_token',
        }),
        debug: process.env.DEBUG === 'true' || false,
        namespace: branch,
      }),
    })
```

### 4. Host the GraphQL API

You will need a [backend endpoint](/docs/self-hosted/graphql-endpoint/overview) that hosts the GraphQL API.

In this example we will show how to host the GraphQL API on Vercel. You can use any hosting provider you want (May need to adjust the code to suite your chosen framework)

```js
// pages/api/graphql.js
import { NextApiHandler } from 'next'
import databaseClient from '../../tina/__generated__/databaseClient'

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Your custom authentication function that returns true if the user is authenticated.
  const isAuthenticated = await customAuthFunction({
    token: req.headers.authorization,
  })
  if (!isAuthenticated) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const { query, variables } = req.body
  const result = await databaseClient.request({ query, variables })
  return res.json(result)
}

export default nextApiHandler
```

> For more info see [GraphQL endpont docs](/docs/self-hosted/graphql-endpoint/overview)

### 5. Update the TinaCMS config

Update the TinaCMS config to use the GraphQL API you created in the previous step.

```js
// tina/config.{js,ts}

export default defineConfig({
  // Make sure to set this to the url of your GraphQL API
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      // Add your authentication provider's functions here. Please refer to the docs for your chosen authentication provider.
    },
    //...
  },
  //...
})
```

Now you should be able to run your site and use TinaCMS to edit your content. Pleas see our [Hosting the API docs](/docs/self-hosted/graphql-endpoint/overview/) for more info on how to self-host TinaCMS.
