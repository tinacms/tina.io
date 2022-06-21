---
title: Querying with the Tina Client
last_edited: '2021-11-06T18:00:00.000Z'
next: /docs/editing/overview
---

## The Tina client

Tina client provides a type-safe query builder, that is auto-generated based on your site's schema:

## Using the built-in Graphql Queries

The client comes with several built-in GraphQL queries to allow you to easily request content based on your defined collections.

The client can be imported from `/.tina/client.ts`

```js
import { client } from '../pathToTina/.tina/client'

// Use the client to perform data fetching
// Here, it fetches a single "post" item
const myPost = await client.queries.post({ relativePath: 'HelloWorld.md' })

console.log(myPost.title)
```

One caveat to using the built-in queries on the client is that it **does not resolve references**. To resolve a reference you will have to [write your own queries](#extending-the-client).

## Extending the client

The client can be extended to perform more advanced queries (including using relational fields), by adding queries to the `.tina/queries` directory.

Example of `.tina/queries/queries.gql`

```gql
query postWithAuthor($relativePath: String!) {
  post(relativePath: $relativePath) {
    ...PostParts
    author {
      ... on Author {
        ...AuthorsParts
      }
    }
  }
}
```

We are using an `AuthorsParts` Fragment. For each collection, this fragment is generated and updated when the schema is updated. You can view any available Fragments for your schema in `/.tina/__generated__/frags.gql`.

Once the query is added, the client will have its types updated so that it can be used to request the new query.

```js
import { client } from '../pathToTina/.tina/client'

// Use the client to perform data fetching
// Here, it fetches a single "post" item
const myPost = await client.queries.postWithAuthor({
  relativePath: 'HelloWorld.md',
})

console.log(myPost.title)
console.log(myPost.author.name)
```
