---
title: 'Making your own Database Adapter'
id: '/docs/self-hosted/database-adapter/make-your-own'
prev: '/docs/self-hosted/database-adapter/mongodb'
next: null
---

The database adapter accepts any [abstract level](https://github.com/Level/abstract-level) implementation. To implement your own database adapter you will need to extend the abstract class.

Here is some example of the ones we have built:

- [upstash-redis-level](https://github.com/tinacms/upstash-redis-level)
- [mongodb-level](https://github.com/tinacms/mongodb-level)

See the [docs](https://github.com/Level/abstract-level#example) for more details on how to implement your own abstract-level database.
