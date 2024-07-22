---
id: /docs/graphql/queries/advanced/filter-documents
title: Filtering a query result
prev: /docs/graphql/queries/query-documents
next: /docs/graphql/queries/advanced/sorting
---

Tina automatically creates filters for collections defined in your schema.

To filter collection results, pass the `filter` argument to the `<collection>Connection` query, followed by any of the filter [operator types](/docs/graphql/queries/advanced/filter-documents/#operator-types) for the fields on your collection.

The `filter` object is a nested set of conditions where the keys correspond to the collection field and the value describes the condition.

Conditions can be either "binary" or "ternary". A binary condition is composed of a single operator and a single operand (i.e. `{"eq":"foo"}`). A ternary condition is composed of two operators and two operands (.i.e. `{"gt":0, "lte": 10}`).

## Operator types

| Key        | Behavior                 | Type(s)                          |
| :--------- | ------------------------ | -------------------------------- |
| eq         | Equals                   | string, number, boolean          |
| in         | One of                   | string\[], number\[], boolean\[] |
| gt         | Greater than             | string, number                   |
| gte        | Greater than or equal to | string, number                   |
| lt         | Less than                | string, number                   |
| lte        | Less than or equal to    | string, number                   |
| startsWith | Starts with              | string                           |
| after      | After                    | datetime                         |
| before     | Before                   | datetime                         |

> Only `gt`, `gte`, `lt`, `lte`, `after`, `before` may be used in ternary conditions.

## Examples

### Filtering on a field

Here we will query our `post` collection with `postConnection` and filter the results by the post `title`:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(filter%3A%20%7Btitle%3A%20%7BstartsWith%3A%20%22Vote%22%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />

### Filtering on a field with the IN operator

Here we will query our `post` collection with `postConnection` and filter the results so that only members of the specified `category` are returned:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(filter%3A%20%7Bcategory%3A%20%7Bin%3A%20%5B%22politics%22%5D%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />

### Filtering on a date range

Here we will query our `post` collection with `postConnection` and filter the results so that only posts with a `date` between the specified range are returned:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(filter%3A%20%7Bdate%3A%20%7Bafter%3A%20%222022-06-01T07%3A00%3A00.000Z%22%2C%20before%3A%20%222022-06-30T07%3A00%3A00.000Z%22%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />

### Filtering on multiple fields

It is possible to filter on multiple fields. Multiple conditions are currently treated as a boolean `AND` operation. Here we will query our `post` collection with `postConnection` and filter the results by `category` and `title`:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(filter%3A%20%7Bcategory%3A%20%7Bin%3A%20%5B%22politics%22%5D%7D%2C%20title%3A%20%7BstartsWith%3A%20%22Vote%22%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />

#### Filtering on a reference

Here we will query our `post` collection with `postConnection`, and filtering on the referenced `author`'s name:

<iframe width="800" height="400" loading="lazy" src="/api/graphiql/?query=%7B%0A%20%20postConnection(filter%3A%20%7Bauthor%3A%20%7Bauthor%3A%20%7Bname%3A%20%7Beq%3A%20%22Napolean%22%7D%7D%7D%7D)%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20category%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A" />
