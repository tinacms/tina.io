---
title: Self Hosted Tina
last_edited: '2023-07-06T07:00:00.000Z'
next: /docs/self-hosted/starters/nextjs-vercel
---

## Introduction

By default, TinaCMS uses Tina Cloud as its backend. Tina Cloud is a powerful, out-of-the-box solution that handles reading/writing to your GitHub repository, caching content in a queryable data layer, and authentication / authorization.

For users who want to be independent of Tina Cloud, **we also offer a self-hosted alternative** where you can host your own Tina Data Layer and provide your own user authentication and git integration. We love the control and portability you get when storing content in Markdown and JSON files and this allows users to extend that flexibility to the rest of the CMS.


## How does it work?

You create a Tina Data Layer by creating backend functions that host the GraphQL API and you create a Data Layer that indexes content from the filesystem into a databse. This database is used to retrive the data. When an editor updates the data a [git provider](/docs/self-hosted/git-provider/overview/) is used to commit the changes to the filesystem.

## Getting Started

### Using a Starter (Recommended)

Self hosting TinaCMS can be a bit of a challenge. We have created a [starter](/docs/self-hosted/starters/overview/) that you can use to get started. This starter is a Next.js app that uses Vercel for hosting and GitHub for git integration. It also includes Next Auth authentication.


### Using the CLI init command

This will add the files needed to self host TinaCMS to your project. It is recommended to use this command in a next.js project.

TODO:

### Manually adding to an existing project

If you are not using next.js or you want to manually add the files needed to self host TinaCMS to your project, you can follow the steps below.

#### 1. Setup TinaCMS on your site

Follow the [getting started guide](/docs/setup-overview/) to setup TinaCMS on your site. (You can skip this step if you already have TinaCMS setup on your site)

#### 2. Choose a git provider, database adapter, and authentication provider

You will need to choose a [git provider](/docs/self-hosted/git-provider/overview/), [database adapter](/docs/self-hosted/database-adapter/overview/), and [authentication provider](/docs/self-hosted/authentication-provider/overview/). You can use any of the providers we have created or you can create your own. In the example below we will use GitHub, VercelKV, and Next Auth.

#### 3. Install the dependencies

```bash
yarn add tinacms @tinacms/datalayer
```

```bash
yarn add --dev @tinacms/cli
```

Install any dependencies for your chosen git provider, database adapter, and authentication provider (This may very to depending on what you have choses)

```bash
yarn add tinacms-gitprovider-github tinacms-next-auth upstash-redis-level @upstash/redis
```

#### 4. Create a database file

Create a file called `database.{js,ts}` in the the tina folder of your project. This file will be used to create the database.

`tina/database.{ts,js}`

```ts
import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";

// Change this to your chosen git provider
import { GitHubProvider } from "tinacms-gitprovider-github";

// Change this to your chosen database adapter
import { Redis } from "@upstash/redis";
import { RedisLevel } from "upstash-redis-level";

// Manage this flag in your CI/CD pipeline and make sure it is set to false in production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const branch = process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main"

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or process.env.VERCEL_GIT_COMMIT_REF environment variable."
  );
}

export default isLocal
// If we are running locally, use a local database that stores data in memory and writes to the locac filesystem on save
  ? createLocalDatabase()
  // If we are not running locally, use a database that stores data in redis and Saves data to github
  : createDatabase({
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
            (process.env.KV_REST_API_URL as string) || "http://localhost:8079",
          token: (process.env.KV_REST_API_TOKEN as string) || "example_token",
        }),
        debug: process.env.DEBUG === "true" || false,
        namespace: branch,
      }),
    });
```


#### 5. Host the GraphQL API

You will need a [backend endpoint](/docs/self-hosted/graphql-endpoint/overview) that hosts the GraphQL API.

In this example we will show how to host the GraphQL API on Vercel. You can use any hosting provider you want (May need to addjust the code to suite your chosen framwork)

```js
// pages/api/graphql.js
import { NextApiHandler } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

const nextApiHandler: NextApiHandler = async (req, res) => {
  // Your custom authentication function that returns true if the user is authenticated.
  const isAuthenticated = await customAuthFunction({token: req.headers.authorization});
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { query, variables } = req.body;
  const result = await databaseClient.request({ query, variables });
  return res.json(result);
};

export default nextApiHandler
```

> For more info see [GraphQL endpont docs](/docs/self-hosted/graphql-endpoint/overview)

#### 6. Update the TinaCMS config

Update the TinaCMS config to use the GraphQL API you created in the previous step.

```js
// tina/config.{js,ts}

export default defineConfig({
  // Make sure to set this to the url of your GraphQL API
  contentApiUrlOverride: '/api/gql',
  admin: {
    auth: {
      // Add your authentication provider's functions here. Please refer to the docs for your chosen authentication provider.
    }
    //...
  }
  //...
})
```

Now you should be able to run your site and use TinaCMS to edit your content. Pleas see our [core concept docs](/docs/self-hosted/core-concepts/overview/) for more info on how to self host TinaCMS.
