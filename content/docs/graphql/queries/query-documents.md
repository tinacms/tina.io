---
title: Querying a List of Documents
id: /docs/graphql/queries/query-documents
next: /docs/graphql/queries/advanced/filter-documents
---

Tina's list queries implement the cursor-based Relay specification. Collection lists can be queried with `<collection>Connection`.

## Example

Here we will query our `post` collection with `postConnection`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="800" height="400" />
