---
title: Choosing a Database Adapter
id: /docs/self-hosted/database-adapter/overview
prev: null
next: /docs/self-hosted/database-adapter/vercel-kv
---

A database adapter provides an interface between the Tina database and the underlying database implementation. It implements a limited subset of functionality required by a sorted key-value store, which can be provided by almost any database implementation. We currently have database adapters for the following database implementations:

- [Vercel KV](/docs/self-hosted/database-adapter/vercel-kv)
- [MongoDB](/docs/self-hosted/database-adapter/mongodb)

We also plan to support additional database adapters for common databases in the future.

Configuring a database adapter can be done in the `database.{ts,js}` file by passing it to the `createDatabase` function.

```ts
// ...

export isLocal ? createLocalDatabase() : createDatabase({
    // ...
    databaseAdapter: new DatabaseAdapter()
})
```
