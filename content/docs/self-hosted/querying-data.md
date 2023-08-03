---
title: Querying Data using the database
id: '/docs/self-hosted/querying-data'
---

## Overview

When using Tina Cloud you use the [TinaCMS client](/docs/data-fetching/overview/). This uses the fetch api to request data from Tina Cloud. When self-hosting, the URL of the GraphQL endpoint will likely not be available when querying data on the backend. For this reason, we provide a `databaseClient` that can be used to query data from the database directly. This should be used when querying data on the server. For example; `getStaticProps`, `getServerSideProps`, or using React Server Components, etc.

## How does it work?

The `databaseClient` uses the exported database in your `database.{ts,js}`. It creates a GraphQL resolver that uses the database to retrieve data from the database.

## Usage

The `databaseClient` has the same interface as the [TinaCMS client](/docs/data-fetching/overview/). This means you can use it in the same way you would use the [TinaCMS client](/docs/data-fetching/overview/).

```ts
import databaseClient from '../tina/__generated__/databaseClient'

//...
const res = await databaseClient.queries.postConnection()
```
