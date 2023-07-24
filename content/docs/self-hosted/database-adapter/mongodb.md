---
title: MongoDB Database Adapter
id: '/docs/self-hosted/database-adapter/mongodb'
prev: '/docs/self-hosted/database-adapter/vercel-kv'
next: '/docs/self-hosted/database-adapter/make-your-own'
---

The MongoDB database adapter allows you to store your data in a [MongoDB](https://www.mongodb.com/) database. This adapter uses the [mongodb](https://www.npmjs.com/package/mongodb) so it will work on any MongoDB database.

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
        // If you wanted to use a different collection for each branch the branch name could be used as the collection name
        collectionName: 'tinacms',
        dbName: 'tinacms',
        mongoUri: process.env.MONGODB_URI as string,
      }),
    })
```

```

```
