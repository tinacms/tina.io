---
title: Content Modeling with TinaCMS
id: /docs/schema/
next: '/docs/features/data-fetching'
---

## Introduction

The Tina schema defines the shape of your content. Tina uses a "content-modeling as code" approach. This has a few benefits compared to modelling through a UI:

- The schema is version-controlled
- Mutating the schema is easy, as you can test out changes locally, or in a branch.
- The developer can extend the schema in interesting ways (custom validation, custom UI fields, etc).

The content model is defined in a file called `.tina/schema.ts`.

```ts
// .tina/schema.ts
import { defineSchema } from 'tinacms'

const schema = defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Post Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
  ],
})

export default schema
```

## Defining "collections"

Each item in your `collections` array represents its own entity. In the above example, we defined a `post` collection, and set its path as `content/posts`, which maps to a directory in our site's repository. Each collection contains an array of `fields`, that each have a defined `type`.

```md
---
title: This is my title
---

This is my main post body.
```

> Note: The `isBody` property is used to output a given field to the markdown body, instead of its frontmatter.

Once we've defined a collection, we can edit its fields through the Tina UI, or [query its content](/docs/graphql/overview/) using the Tina Content API.

## "List" fields

Specifying `list: true` on _any_ field type will turn that field into an array of items:

```js
// ...
fields: [
  // ...
  {
    label: 'Categories',
    name: 'categories',
    type: 'string',
    list: true,
  },
]
```

The resulting field in your TinaCMS form will be a `list` field. And the resulting data structure would be: `["movies", "art"]`.

## Limiting values to a set of options

Any _scalar_ field can accept an `options` array, note that in the example below we're using both `options` and `list` properties:

```js
// ...
fields: [
  // ...
  {
    label: 'Categories',
    name: 'categories',
    type: 'string',
    options: ['movies', 'art', 'food', 'sports'],
    list: true,
  },
]
```

In this example, the resulting field in your TinaCMS form will be a `checkbox` field. Omitting `list: true` (or setting it to `false`) would result in a `radio` field.

## Grouping properties as an "object"

An object type takes either a `fields` or `templates` property (just like the `collections` definition). The simplest kind of `object` is one with `fields`:

```js
// ...
fields: [
  // ...
  {
    label: 'Social Media',
    name: 'socialMedia',
    type: 'object',
    fields: [
      {
        label: 'Handle',
        name: 'handle',
        type: 'string',
      },
      {
        label: 'Service',
        name: 'service',
        type: 'string',
        options: ['twitter', 'instagram', 'tiktok'],
      },
    ],
  },
]
// ...
```

The resulting data structure would be:

```js
{
  socialMedia: {
    handle: "tinacms",
    service: "twitter"
  }
}
```

Setting `list: true` would turn the values into an array:

```js
{
  socialMedia: [
    {
      handle: 'tinacms',
      service: 'twitter',
    },
    {
      handle: 'tinacms',
      service: 'instagram',
    },
  ]
}
```

> More complex shapes can be built by using the [`templates`](/docs/reference/types/object/#with-multiple-templates) property. This allows your editors to build out pages using predefined blocks.

## Referencing another document

The `reference` field connects one document to another and only needs to be defined on _one_ side of the relationship. You can specify any number of collections you'd like to connect:

```js
// ...
fields: [
  // ...
  {
    label: 'Author',
    name: 'author',
    type: 'reference',
    collections: ['author'], // points to a collection with the name "author"
  },
]
//
```

This will result in a resolvable node in your GraphQL structure (Don't worry, we'll discuss how to use the GraphQL API later):

```graphql
{
  post(relativePath: $relativePath) {
    author {
      # disambiguate because could have _many_ collections
      ... on Author {
        name
      }
    }
  }
}
```

The resulting field in your TinaCMS form will be a `select` field, whose `options` are all of the documents in the referenced collections.

## Using different data types

Each field in a collection can be of the following `type`:

### _scalar types_

- [string](/docs/reference/types/string/)
- [datetime](/docs/reference/types/datetime/)
- [boolean](/docs/reference/types/boolean/)
- [image](/docs/reference/types/image/)
- [number](/docs/reference/types/number/)

### _nonscalar types_

- [reference](/docs/reference/types/reference/)
- [object](/docs/reference/types/object/)
- [rich-text](/docs/reference/types/rich-text/)

## Summary

- Your content is modeled in the `.tina/schema.{ts,js,tsx}` of your repo
- Your content model contains an array "collections". A "collection" maps a content type to a directory in your repo.
- A "collection" contains multiple fields, which can be of multiple scalar or non-scalar data types.
