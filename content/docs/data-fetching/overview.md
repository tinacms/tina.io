---
title: Querying content
id: '/docs/data-fetching/overview'
prev: null
next: /docs/data-fetching/custom-queries
---

## Introduction

As mentioned in [Introduction to Data fetching](/docs/features/data-fetching/), Tina provides a client for querying content.

> Note, for advanced use-cases, you can also manually query the underlying [GraphQL API](/docs/data-fetching/custom-queries/#writing-inline-queries).

## Querying a single document

```js
import { client } from '../[pathToTina]/tina/__generated__/client'

const myPost = await client.queries.post({ relativePath: 'HelloWorld.md' })

console.log(myPost.title)
```

In the above example `post` is the name of the collection being queried. This can be replaced with one of your schema's defined collection names.

## Querying a list of documents

```js
const postsResponse = await client.queries.postConnection()
const posts = postsResponse.data.postConnection.edges.map((post) => {
  return { slug: post.node._sys.filename }
})
// This would return an array like: [ { slug: 'HelloWorld.md'}, /*...*/ ]
```

`<collection-name>Connection` can be used to query a list of documents (in the above example, our collection name is `post`).

### Filtering

Filters can be added as an option to your `<collection-name>Collection` query.

```js
const postsResponse = await client.queries.postConnection({
  filter: { title: { startsWith: 'Vote' } },
})

// ...
```

The following operator types are available for querying

| Key        | Behavior                 | Type(s)                       |
| ---------- | ------------------------ | :---------------------------- |
| eq         | Equals                   | string, number, boolean       |
| in         | One of                   | string[], number[], boolean[] |
| gt         | Greater than             | string, number                |
| gte        | Greater than or equal to | string, number                |
| lt         | Less than                | string, number                |
| lte        | Less than or equal to    | string, number                |
| startsWith | Starts with              | string                        |
| after      | After                    | datetime                      |
| before     | Before                   | datetime                      |

> Only `gt`, `gte`, `lt`, `lte`, `after`, `before` may be used in ternary conditions.

### Sorting

Sorting can be added as an option to your `<collection-name>Collection` query.

```js
const postsResponse = await client.queries.postConnection({
  sort: 'date',
})

// ...
```

#### Sorting on multiple fields

Here we will query our post collection with postConnection and sort the results first by category and then by date using the multi-field index named category-date:

```js
const postsResponse = await client.queries.postConnection({
  sort: 'category-date',
})

// ...
```

### Pagination

Tina supports cursor-based pagination:

```js
const postsResponse = await client.queries.postConnection({
  first: 10,
  after:
    'cG9zdCNkYXRlIzE2NTUyNzY0MDAwMDAjY29udGVudC9wb3N0cy92b3RlRm9yUGVkcm8uanNvbg==',
})

// ...
```

One caveat to using the built-in queries on the client is that **you can only query one root collection at a time**. If you have a page that has multiple forms on it, you may need to use [custom queries](/docs/data-fetching/custom-queries/).
