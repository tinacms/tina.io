---
title: Choosing a Database Adapter
id: /docs/self-hosted/database-adapter/overview
prev: null
next: /docs/self-hosted/database-adapter/vercel-kv
---

A database adapter is a module that allows you to store your data in a database of your choice. The database adapter is responsible for storing, retrieving and indexing data from and to the database. We currently have support for the following database adapters:

- [Vercel KV](/docs/self-hosted/database-adapter/vercel-kv)
- [MongoDB](/docs/self-hosted/database-adapter/mongodb)

With plans on supporting more in the future.

Adding a database adapter can be done in the `database.{ts,js}` file by passing it to the `createDatabase` function.

```ts
// ...

export isLocal ? createLocalDatabase() : createDatabase({
    // ...
    databaseAdapter: new DatabaseAdapter()
})
```
