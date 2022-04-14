---
title: Sorting query results
id: /docs/graphql/queries/advanced/sorting
next: /docs/graphql/queries/advanced/pagination
---
{{ WarningCallout text="This is an experimental feature, and the API is subject to change. We don't yet suggest using this for production use-cases. Have any thoughts? Let us know in the chat, or through the [GitHub discussion](https://github.com/tinacms/tinacms/discussions/2811)!" }}

To sort collection results by a collection field, pass the `sort` argument to the `get<collection>List` query, with the value corresponding to the desired collection field to sort by. Results are returned in ascending order.

> See [reverse pagination](/docs/graphql/queries/advanced/pagination/) for how to retrieve results in descending order.

## Sorting on multiple fields

To sort collection results by multiple fields, we need to define a multi-field "index" in our schema. An index definition determines which fields in a collection are included in the index and the order of the fields when sorting results.

> In addition to determining the sort order of query results, indexes also impact query [performance](/docs/graphql/queries/advanced/performance/).

Here is an example index definition for our posts collection:

```ts
{
  name: "category-date",
  fields: [
    {
      name:"category"
    }, 
    {
      name:"date"
    }
  ]
}
```

The `name` property on the index definition is used when referencing it in the `sort` argument. The `fields` property is an ordered list of the fields from the collection that should be indexed, identified by the field `name`. Results returned using the associated sort for this example would be first ordered by `category` and then by `date`.

## Default sort order

If the `sort` parameter is not specified in a query, results will be returned based on the default filename ordering.

## Examples

### Sorting by a single field

Here we will query our `post` collection with `getPostList` and sort the results by the `date` field:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostList(sort%3A%22date%22)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" /> 

### Sorting by multiple fields

Here we will query our `post` collection with `getPostList` and sort the results first by `category` and then by `date` using the multi-field index named `category-date`:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20getPostList(sort%3A%22category-date%22)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20data%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />
