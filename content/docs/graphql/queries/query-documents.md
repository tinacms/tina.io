---
title: Querying a List of Documents
id: /docs/graphql/queries/query-documents
next: /docs/graphql/queries/advanced/filter-documents
---

List queries offer limited functionality for now. Depending on how many items you may have in your collection, the query could be quite slow. To improve query performance and enable [filtering](/docs/graphql/queries/advanced/filter-documents), [sorting](/docs/graphql/queries/advanced/sorting), and [pagination](/docs/graphql/queries/advanced/pagination), we recommend activating the experimental data layer with the `--experimentalData` cli flag. Visit this [page](/docs/tina-cloud/data-layer/#enabling-the-data-layer) for more details.

## Example

Here we will query our `post` collection with `postConnection`

<iframe loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" width="800" height="400" />
