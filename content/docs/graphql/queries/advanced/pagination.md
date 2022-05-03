---
title: Paginating query results
id: /docs/graphql/queries/advanced/pagination
next: /docs/graphql/queries/advanced/performance
---

{{ WarningCallout text="This is an experimental feature, and the API is subject to change. We don't yet suggest using this for production use-cases. The `--experimentalData` cli flag must be specified in order to enable this feature. Visit this [page](/docs/tina-cloud/data-layer/#enabling-the-data-layer) for more details. Have any thoughts? Let us know in the chat, or through the [GitHub discussion](https://github.com/tinacms/tinacms/discussions/2811)!" }}

Collection queries implement cursor based pagination. The client specifies a result limit parameter (using `first` or `last`) and a corresponding cursor parameter (using `after` or `before`) which is a pointer to the last item on the previous page of results.

Both of these parameters are optional. If a result limit is omitted, a maximum of `10` results will be returned. If the cursor is omitted, results will start with the first matching item.

## Page Info

A `pageInfo` object is available for collection queries and can be used for forward and reverse pagination.

> In addition to `pageInfo`, each edge in a query result provides a `cursor` field which can also be used for pagination.

The table below describes the properties available on the `pageInfo` object:

| Field           | Type    | Description                                                                   |
| --------------- | ------- | ----------------------------------------------------------------------------- |
| hasNextPage     | boolean | During forward pagination, indicates if another page of results is available. |
| hasPreviousPage | boolean | During reverse pagination, indicates if another page of results is available. |
| startCursor     | string  | The cursor of the first item in the result set.                               |
| endCursor       | string  | The cursor of the last item in the result set.                                |

## Forward pagination

To page through query results in the forward direction, the `first` and `after` arguments are used, in combination with the `PageInfo`'s endCursor.

### Example

Here we will query our `post` collection with `postConnection`, limiting the page size to `1` and starting at the second item:

<iframe width="800" height="500" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(sort%3A%20%22date%22%2C%20first%3A%201%2C%20after%3A%20%22cG9zdCNkYXRlIzE2NTUyNzY0MDAwMDAjY29udGVudC9wb3N0cy92b3RlRm9yUGVkcm8uanNvbg%3D%3D%22)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasNextPage%0A%20%20%20%20%20%20endCursor%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />

## Reverse pagination

To page through query results in the reverse direction, the `last` and `before` arguments are used, in combination with the `PageInfo`'s startCursor.

### Example

Here we will query our `post` collection with `postConnection`, limiting the page size to `1` and starting at the first item:

<iframe width="800" height="500" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(sort%3A%20%22date%22%2C%20last%3A%201%2C%20before%3A%20%22cG9zdCNkYXRlIzE2NTc4Njg0MDAwMDAjY29udGVudC9wb3N0cy9hbm90aGVyUG9zdC5qc29u%22)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20hasPreviousPage%0A%20%20%20%20%20%20endCursor%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />
