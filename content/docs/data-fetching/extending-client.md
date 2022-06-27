---
title: Extending the Tina client
id: '/docs/data-fetching/extending-client'
prev: null
next: /docs/editing/overview
---

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
