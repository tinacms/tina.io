---
title: Query performance
id: /docs/graphql/queries/advanced/performance
next: /docs/graphql/queries/advanced/limitations
---
{{ WarningCallout text="This is an experimental feature, and the API is subject to change. We don't yet suggest using this for production use-cases. The `--experimentalData` cli flag must be specified in order to enable this feature. Visit this [page](/docs/tina-cloud/data-layer/#enabling-the-data-layer) for more details. Have any thoughts? Let us know in the chat, or through the [GitHub discussion](https://github.com/tinacms/tinacms/discussions/2811)!" }}

The GraphQL API indexes on collection fields to provide sorted results when using the `sort` parameter. If a `filter` is specified, the existence of an index can have a large impact on how quickly a query executes.

Things to keep in mind with indexing:
- By default, all primary fields on a collection are indexed.
- Indexing of text fields is limited to the first `100` characters.
- Object fields on a collection are always excluded from indexing.

## Improving Filtering Performance 

The GraphQL API always attempts to use an appropriate index when executing a query. The `sort` parameter takes precedence over the filter, though, which means sorting by one field and filtering by a different field may result in a slower query execution.

To improve query performance in scenarios like this, a multi-field index is recommended (as described [here](/docs/graphql/queries/advanced/sorting/#sorting-on-multiple-fields)). If, for example, we want to get only documents in a specific category, sorting by date, a multi-field index should be defined, with the category as the first field, and the date as the second field.

It is important to remember that the `sort` field _must_ be specified in order for an index to be used. If no `sort` is specified, all items in a collection will be scanned (in filename order). 

> Not all queries can leverage an index. See the [limitations](/docs/graphql/queries/advanced/limitations/#indexing) for more details.
