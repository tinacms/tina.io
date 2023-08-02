---
title: Vercel KV Database Adapter (Upstash Redis)
id: '/docs/self-hosted/database-adapter/vercel-kv'
prev: '/docs/self-hosted/database-adapter/overview'
next: '/docs/self-hosted/database-adapter/mongodb'
---

The vercel KV database adapter allows you to store your data in the [Vercel KV](https://vercel.com/docs/concepts/projects#environment-variables). This adapter uses the [upstash redis client](https://www.npmjs.com/package/@upstash/redis) so will work on [upstash redis](https://docs.upstash.com/redis) as well.

To get started you will need to setup some en  environment variables.

First copy your values from the Vercel or Upstash dashboard.

![Vercel Dashboard](https://res.cloudinary.com/forestry-demo/image/upload/v1690998148/tina-io/docs/self-hosted/Screenshot_2023-08-02_at_1.29.58_PM.png)

Then add the following environment variables to your project:

```env
KV_REST_API_URL=***
KV_REST_API_TOKEN=***
```

## Create the database adapter

```ts
//...
import { RedisLevel } from 'upstash-redis-level'
import { Redis } from '@upstash/redis'

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      // ...

      databaseAdapter: new RedisLevel({
        namespace: branch,
        redis: new Redis({
          url: process.env.KV_REST_API_URL || 'http://localhost:8079',
          token: process.env.KV_REST_API_TOKEN || 'example_token',
        }),
        debug: process.env.DEBUG === 'true' || false,
      }),
    })
```
