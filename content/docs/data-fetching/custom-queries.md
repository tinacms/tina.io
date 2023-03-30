---
title: Writing Custom Queries
id: '/docs/data-fetching/custom-queries'
prev: null
next: /docs/editing/overview
---

For most simple cases, you should be able to leverage the Tina Client's generated queries to do your data fetching:

```ts
const myPost = await client.queries.post({ relativePath: 'HelloWorld.md' })
```

In more advanced cases, you may want more control on the underlying GraphQL query. In these cases you have two options:

- Extending the auto-generated `client.queries`, by writing a custom query.
- Use `client.request`, and write an inline query.

## Extending the auto-generated `client.queries`

The client can be extended to perform more advanced queries (including querying multiple root collections at once), by adding queries to the `tina/queries` directory. All files that end in `gql` or `graphql` in this directory will be added to the client.

Tina generates custom [GraphQL fragments](https://graphql.org/learn/queries/#fragments) to be used in custom queries so that the queries will not have to be updated when the schema is updated.

<!-- TODO: add internal docs link -->

> Note: These fragments can be seen in [`tina/__generated__/frags.gql`]()

Example of `tina/queries/postWithNav.gql`:

```ts
query postWithNav($relativePath: String!) {
  nav(relativePath: "nav.json") {
    ...NavParts
  }
  post(relativePath: $relativePath) {
    ...PostParts
  }
}
```

To get autocomplete in your GraphQL files add a [`graphql.config.js`](https://github.com/tinacms/tina-cloud-starter/blob/main/graphql.config.js) that points to `tina/__generated__/schema.gql` and `tina/__generated__/frags.gql`.

> Note: fragments are named by using the collection name (capitalized) followed by "Parts"

We are using a `PostParts` & `NavParts` Fragment here. For each collection, this fragment is generated and updated when the schema is updated. You can view any available Fragments for your schema in `/tina/__generated__/frags.gql`.

Once the query is added, the client will have its types updated so that it can be used to request the new query.

```js
import { client } from '../[pathToTina]/tina/__generated__/client'

// Use the client to perform data fetching
// Here, it fetches a single "post" item
const myPost = await client.queries.postWithNav({
  relativePath: 'HelloWorld.md',
})

console.log(myPost.title)
console.log(myPost.nav.items)
```

## Writing inline queries

If you want to avoid using the types on the client altogether, you can also just write an inline query using the `client.request` function.

```js
import { client } from '../[pathToTina]/tina/__generated__/client'

// Use the client to perform data fetching
// Here, it fetches a single "post" item
const myPost = await client.request({
  query: `query getPost($relativePath: String!) {
      post(relativePath: $relativePath) {
        title
        body
      }
    `,
  variables: { relativePath: 'hello-world.md' },
})

console.log(myPost.title)
```

For more information on writing custom queries, check out the [querying reference docs](/docs/graphql/queries/).
