---
title: 'TinaCMS V0.69 '
date: '2022-07-21T04:00:00.000Z'
last_edited: '2022-07-21T04:00:00.000Z'
author: Logan Anderson
---

TinaCMS Version `0.69` brings some extensive improvements to Tina. Here is a short list of a few of the major features:

1.  New unified client that can be used on the frontend and backend.
2.  Data layer is enabled by default
3.  Better support for read only tokens
4.  Clearer and more concise way of working with TinaCMS in CI

To update to the latest version run:

```bash
yarn add tinacms@latest
yarn add --dev @tinacms/cli@latest
```

## New Unified client

TinaCMS has always been missing a "unified way" to query and fetch content. Previously, there was \`StaticRequest\`, "Read only token client", "Experimental Generated client" and "just using fetch". Now all of these have been reduced to a single client that can be used on both the frontend and backend.

There are only a couple of small changes to be made in order to update.

### Updates in `.tina/schema.{ts,js}`

Instead of passing an `apiURL`, now the clientID, branch and read only token (NEW) are all configured in the schema. The local graphql api url is used if the `--local` flag is passed.

This requires a change to the schema and the scripts:

```diff
// .tina/schema.ts
+ import { client } from "./__generated__/client";
// ...
const schema = defineSchema({
+    config: {
+        branch: "main",
+        clientID: "***",
+        token: "***",
    },
    collections: [
        // ...
    ]
})
// ...
- const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
- const clientId = 'YOUR-CLIENT-ID-HERE'
- const apiURL =
-   process.env.NODE_ENV == 'development'
-     ? 'http://localhost:4001/graphql'
-    : `https://content.tinajs.io/content/${clientId}/github/${branch}`
export const tinaConfig = defineConfig({
+  client,
-  apiURl,
  schema,
  // ...
})
export default schema
```

The token must be a wildcard token (`*`) and can be generated from the Tina dashboard. Read more about read only tokens [here](https://tina.io/docs/graphql/read-only-tokens/)

For more information about where to get these values, see the ["going to production"](/docs/tina-cloud/connecting-site/#enabling-tina-cloud-in-tinacms) docs.

### Updates to scripts in package.json

We now recommend separating the graphQL server into two separate processes (two separate terminals in development). The scripts should look like this:

```json
{
  "scripts": {
    "dev": "tinacms build --local && next dev",
    "dev-server": "tinacms server:start",
    "build": "tinacms build && next build"
    // ... Other Scripts
  }
}
```

When developing, in the first terminal run `yarn dev-server` and then `yarn dev` in the second.

The old `-c` subcommand can still be used. This will start the dev server and next dev process in the same terminal.

```json
{
  "scripts": {
    "dev": "tinacms server:start \"tinacms build --local && next dev\"",
    "dev-server": "tinacms server:start",
    "build": "tinacms build && next build"
    // ... Other Scripts
  }
}
```

### Updates to generated files (optional)

We now recommend ignoring most of the generated files. This is because `client.ts` and `types.ts` will be generated in CI when `tinacms build` runs.

To remove them from your repository, run `git rm --cached .tina/__generated__/*` and then `yarn tinacms build` to update the generated files that need to stay.

Once these updates have been made, the new client should be configured and ready to be used for querying.

## Migrating data fetching

To migrate data fetching, all uses of `staticRequest`, or `GetExperimentalClient` can be replaced with `client.request` or `client.queries.<QueryName>` respectively.

For example, to migrate usage of the `staticRequest` function:

```diff
// pages/home.js
- import { staticRequest } from 'tinacms'
+ import { client } from '../[pathToTina]/.tina/__generated__/client'

const getStaticProps = async () => {
  const query = `
      query Post($relativePath: String!) {
        post(relativePath: $relativePath) {
          title
        }
      }
    `
  const variables = {
    relativePath: 'hello-world.md',
  }

  let data = {}
  try {
-    data = await staticRequest({
-      query,
-      variables,
-    })

+    data = await client.request({
+      query,
+      variables,
+    })

  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      query,
      variables,
      data,
      //myOtherProp: 'some-other-data',
    },
  }
}
```

For more information, see the new [data fetching](/docs/features/data-fetching) docs.

## Data layer is enabled by default

The [data layer](/docs/reference/content-api/data-layer/) is now enabled by default. With this feature your repository is cached, allowing the content to be queried without using Github's API. This makes data fetching faster and it also allows us to bypass Github's [api limits](https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps).

There is no action required for this change besides updating to the latest version of `@tinacms/cli`.

For a full set of changes please see the [changelog](https://github.com/tinacms/tinacms/pull/3041) for this version.
