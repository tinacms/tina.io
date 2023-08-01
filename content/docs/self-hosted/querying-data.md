---
title: Querying Data using the database
id: '/docs/self-hosted/querying-data'
---

## Overview

When using TinaCloud you use the [TinaCMS client](/docs/data-fetching/overview/) this uses fetch to request data from TinaCloud. When self hosting the URL if the GraphQL endpoint will likely not be available when querying Data on the backend. For this reason, we provide a `databaseClient` that can be used to query data from the database directly. This should be used when querying data on the server. For example; `getStaticProps`, `getServerSideProps`, or using React Server Components, etc.

## How does it work?

The `databaseClient` uses exported database in your `database.{ts,js}`. It creates a GraphQL resolves that uses the database to resolve data from the database.

## Usage

The `databaseClient` is has the name interface as the [TinaCMS client](/docs/data-fetching/overview/). This means you can use it in the same way you would use the [TinaCMS client](/docs/data-fetching/overview/).

```ts
import databaseClient from '../tina/__generated__/databaseClient'

//...
const res = await databaseClient.queries.postConnection()
```
