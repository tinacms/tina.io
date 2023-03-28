---
title: The tina folder
id: /docs/tina-folder/overview/
# next: '/docs/features/data-fetching'
---

## Overview

The `tina` folder is where the configuration, schema and UI customization for TinaCMS is located.

The `tina` folder is normally at the root of the repo (unless a [mono repo setup](/docs/tina-cloud/faq/#does-tina-cloud-work-with-monorepos) is being used). It has the following folder structure:

- `config.{ts,tsx,js}`
- `queries` folder (_optional_)
- `__generated___` folder
  - `_graphql.json`
  - `_lookup.json`
  - `_schema.json`
  - `frags.gql`
  - `queries.gql`
  - `schema.gql`

## `Config.{ts,tsx,js}`

This file contains the [definition for the project's schema](/docs/schema), as well as the Tina configuration object. The schema must be the default export of this file.

See our ["Tina Cloud Starter"](https://github.com/tinacms/tina-cloud-starter/blob/main/tina/config.ts) for an example of how this file is used. The default export of the file must be `defineConfig({})`.

```ts
import { defineConfig } from 'tinacms'

export default defineConfig({
  schema: schema,
  // ...
})
```

> For help defining the Tina schema, see our [content modelling documentation](/docs/schema/)

## `queries` folder (_optional_)

The `queries` folder is optional and is used by the [experimental generated client](/docs/data-fetching/overview/). The queries that are defined in this folder will automatically be attached to the generated client when it is built.

## `__generated___` folder

This is where all the files that are generated during the schema build process are stored. Generally speaking, these files **must be checked into source control and pushed to github** with a couple of exceptions (Listed below). The reason for this is that Tina Cloud uses the generated files in order to resolve documents.

### `_graphql.json`

The Graphql AST (represented in JSON). Must be pushed to GitHub.

### `_lookup.json`

This is a lookup file that is used to resolve document names. Must be pushed to GitHub.

### `_schema.json`

The Graphql Schema AST (represented in JSON). Must be pushed to GitHub.

### `types.{js,ts}`

This file is where all the types of the schema are generated. This file is for the user to use in there site if they want to use the types. It is generated on every build, and does not need to be pushed to GitHub.

### `client.{js,ts}`

This file is where all client is generated. This client can be used on the backend and the frontend. It is very lightweight as to not bloat the bundle size. It is generated on every build, and does not need to be pushed to GitHub. [Check out this document](/docs/data-fetching/overview/) for more information on how to use the client.

### `frags.gql`

This file contains the raw Graphql fragments that are generated and used by the [experimental generated client](/docs/data-fetching/overview/). Does not need to be checked into source control.

### `queries.gql`

This file contains the raw graphql queries that are generated and used by the [experimental generated client](/docs/data-fetching/overview/). Does not need to be checked into source control since the the code for the generated client is `tina/__generated__/types.ts`.

### `schema.gql`

This file contains the raw graphql schema. Does not need to be checked into source control.
