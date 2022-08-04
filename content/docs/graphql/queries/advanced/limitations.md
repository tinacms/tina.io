---
title: Query limitations
id: /docs/graphql/queries/advanced/limitations
next: /docs/graphql/queries/update-document
---

There are a number of limitations to keep in mind when leveraging query functionality with Tina's Content API:

## Filter operations

Some filter operations are not currently supported:

- Combining conditions using a boolean `OR` operation
- Negating conditions using a boolean `NOT` operation
- `exists` operation

## Numeric value handling

Numeric values (in both filters and indexed documents) are currently zero-padded to 4 places to provide correct sorting. For example, a field value of `10` would be converted to `0010`. Because of this, numeric values larger than `9999` may currently result in unexpected behavior.

## Indexing

There are several known limitations to keep in mind when using indexes for improved query performance.

### IN Operators

Even when an index on a field matches the field(s) of a query filter, the use of the `IN` operator always results in a non-indexed full scan of the collection. This is because it is not possible to construct a single range with start and end values covering the condition.

### Object fields

A field in a collection that is of type `object` is always ignored during indexing. Because of this, fields within that object cannot be used for sorting. This limitation doesn't prevent filtering results using nested object fields, just sorting on those fields.

### Field type and field order in an index

A multi-field index may not be usable depending on the `filter` parameter and the order of the fields in the index definition. In order to construct an indexed query, a single range with start and end criteria covering a subset of the collection must be resolvable.

For example, if the filter for a query specifies a range condition (i.e. `gt`) on one field and another range condition on a different field, then it is impossible to construct a single contiguous range covering both conditions. When such a filter is used the entire collection must be scanned in order to provide consistent sorting and pagination.

Because of this, when defining a multi-field index, discrete value fields (`boolean` or `string`) should be ordered before any continuous value field (like `datetime` or `numeric` types). This is obviously constrained by use-case and the desired sort order, but is important to keep in mind when considering query performance.
