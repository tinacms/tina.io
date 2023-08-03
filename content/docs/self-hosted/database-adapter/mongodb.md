---
title: MongoDB Database Adapter
id: '/docs/self-hosted/database-adapter/mongodb'
prev: '/docs/self-hosted/database-adapter/vercel-kv'
next: '/docs/self-hosted/database-adapter/make-your-own'
---

The MongoDB database adapter allows you to store your data in a [MongoDB](https://www.mongodb.com/) database. This adapter uses the [MongoDB Node.js Driver](https://www.npmjs.com/package/mongodb), so it will work on any MongoDB database.

To get started you will need to add the following environment variables to your project:

```env
MONGODB_URI=***
```

## Create the database adapter

```ts
import { MongodbLevel } from 'mongodb-level'
//...

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      // ...
      databaseAdapter: new MongodbLevel<string, Record<string, any>>({
        // Create a new collection for each branch (if you are using branches). If you are not using branches you can pass a static collection name. ie: "tinacms"
        collectionName: branchName,
        dbName: 'tinacms',
        mongoUri: process.env.MONGODB_URI as string,
      }),
    })
```

```

```
