---
title: Setting up the self-hosted Backend on an existing project
id: /docs/self-hosted/existing-site
last_edited: '2023-07-07T04:00:00.000Z'
next: /docs/self-hosted/querying-data
---

If you want to self-host the Tina backend, and don't want to use our [pre-configured starter](/docs/self-hosted/starters/nextjs-vercel/), you can follow the steps below.

We offer a CLI init to quickly setup the backend on Next.js sites, or you can take the manual setup approach if you're using another framework.

## Using the CLI init command (Next.js Only)

> Prefer a video walkthrough? Check out this video:

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/Jq5yWF1c0aM" title="Adding Self Hosted TinaCMS to an existing site" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>

In the terminal, run:

```bash
npx @tinacms/cli@latest init backend
```

This will prompt you to answer some questions:

### GitHub Personal Access Token

A Github Personal Access Token can be created in the [GitHub account settings](https://github.com/settings/personal-access-tokens/new).

Make sure to assign it `repo` access to your new repository with Read/Write access to Contents.

### Choosing a Database Adapter

TinaCMS provides two database adapters in the init workflow: "Redis" (VercelKV) & "MongoDB". Learn more about Database Adapters [here](/docs/reference/self-hosted/database-adapter/overview/).

### What the init command does

The init commands does the following:

- Sets up pages/tina/[...routes].{ts,js} to handle TinaCMS GraphQL and auth requests
- Sets up tina/database.{ts,js} to handle the database
  - Configures the GitHub Git provider
  - Configures the database adapter
- Configures the TinaCMS Auth.js auth provider
- Installs any dependencies needed for the chosen Git provider, database adapter, and authentication provider

### After the init command

Once the init command finishes **make sure to copy the environment variables** that are printed in the terminal. You will also need to add these to your hosting provider.

After these steps are completed the `dev` and `build` commands should be ready for use

## Manually configuring the self-hosted backend

### 1. Choose a Git provider, database adapter, and authentication provider

You will need to choose a [Git provider](/docs/reference/self-hosted/git-provider/overview/), [database adapter](/docs/reference/self-hosted/database-adapter/overview/), and [auth provider](/docs/reference/self-hosted/authentication-provider/overview/). You can use any of the providers we have created or you can create your own. In the example below we will use GitHub, Vercel KV, and the TinaCMS Auth.js provider.

### 2. Install the dependencies

```bash
yarn add tinacms @tinacms/datalayer
```

```bash
yarn add --dev @tinacms/cli
```

Install any dependencies for your chosen git provider, database adapter, and auth provider (This may very to depending on what you have chosen)

```bash
yarn add tinacms-gitprovider-github tinacms-authjs upstash-redis-level @upstash/redis
```

### 3. Create a database file

Create a file called `database.{js,ts}` in the `tina` folder of your project. This file will be used to create the database.

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

### 4. Host the Tina Backend

You will need a [backend endpoint](/docs/self-hosted/graphql-endpoint/overview) that hosts the GraphQL and auth api endpoints.

In this example we will show how to host the GraphQL API on Vercel. You can use any hosting provider you want (code may need to be adjusted to suit your chosen framework).

```js
// pages/api/tina/[...routes].{ts,js}

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

> For more info see [Tina Backend docs](/docs/self-hosted/graphql-endpoint/overview)

### 5. Update the TinaCMS config

Update the TinaCMS config to use the GraphQL API you created in the previous step.

```js
// tina/config.{js,ts}

export default defineConfig({
  // Make sure to set this to the url of your GraphQL API
  contentApiUrlOverride: '/api/tina/gql',
  authProvider:  // Add your authentication provider. Please refer to the docs for your chosen authentication provider.
  //...
})
```

Now you should be able to run your site and use TinaCMS to edit your content. Pleas see our [Hosting the API docs](/docs/self-hosted/graphql-endpoint/overview/) for more info on how to self-host TinaCMS.
