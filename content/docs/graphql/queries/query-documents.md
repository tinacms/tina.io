---
title: Querying a List of Documents
id: /docs/graphql/queries/query-documents
next: /docs/graphql/queries/advanced/filter-documents
---

List queries offer limited functionality for now.

- Because of the nature of list items, we don't currently auto-generate Tina forms for these queries.
- Depending on how many items you may have in your collection, the query could be quite slow. To improve query performance, as well as utilize [filtering](/docs/graphql/queries/advanced/filter-documents), [sorting](/docs/graphql/queries/advanced/sorting), and [pagination](/docs/graphql/queries/advanced/pagination), we recommend [enabling](/docs/tina-cloud/data-layer/#enabling-the-data-layer) the experimental data layer.

## Example

Here we will query our `post` collection with `getPostList`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostList%20%7B%0A%20%20%09edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=GetBlogPost" width="800" height="400" />
