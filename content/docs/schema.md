---
title: Content Modeling with TinaCMS
id: /docs/schema/
next: '/docs/features/data-fetching'
---

## Introduction

The Tina schema defines the shape of your content. With traditional content management systems you may have done this sort of content modeling via a GUI; however, given its tight coupling to Git, TinaCMS considers the filesystem the ultimate source of truth and leverages a "content-modeling as code" approach.

Your schema is defined in a file called `.tina/schema.ts` (only `.ts` is supported for now).

```ts
// .tina/schema.ts
import { defineSchema, defineConfig } from 'tinacms'

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

export const config = defineConfig({
  schema: schema,
  // This is the URL for "Local Mode" using the file system. In production it will be `https://content.tinajs.io/content/${myClientId}/github/${myBranch}`
  apiUrl: 'https://localhost:4001/graphql',
  //... Other config
})

export default schema
```

Each item in your `collections` array represents its own entity.

> Note: The `isBody` property is used to output a given field to the markdown body, instead of its frontmatter.

## Using different data types

Each of a collection's fields can be of the following `type`

### _scalar_

- [string](/docs/reference/types/string/)
- [datetime](/docs/reference/types/datetime/)
- [boolean](/docs/reference/types/boolean/)
- [image](/docs/reference/types/image/)
- [number](/docs/reference/types/number/)

### _nonscalar_

- [reference](/docs/reference/types/reference/)
- [object](/docs/reference/types/object/)
- [rich-text](/docs/reference/types/rich-text/)

## Using lists of items

Specifying `list: true` on _any_ field type will turn that field into an array of items:

```js
{
  label: "Categories",
  name: "categories",
  type: "string",
  list: true
}
```

The resulting field in your TinaCMS form will be a `list` field. And the resulting data structure would be: `["movies", "art"]`.

## Limiting values to a set of options

Any _scalar_ field can accept an `options` array, note that in the example below we're using both `options` and `list` properties:

```js
{
  label: "Categories",
  name: "categories",
  type: "string",
  options: ["movies", "art", "food", "sports"],
  list: true
}
```

In this example, the resulting field in your TinaCMS form will be a `checkbox` field. Omitting `list: true` (or setting it to `false`) would result in a `radio` field.

## Grouping properties within an "object"

An object type takes either a `fields` or `templates` property (just like the `collections` definition). The simplest kind of `object` is one with `fields`:

```js
{
  label: "Social Media",
  name: "socialMedia",
  type: "object",
  fields: [{
    label: "Handle",
    name: "handle",
    type: "string"
  }, {
    label: "Service",
    name: "service",
    type: "string",
    options: ["twitter", "instagram", "tiktok"]
  }]
}
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

## Using references within a document

The `reference` field connects one document to another and only needs to be defined on _one_ side of the relationship. You can specify any number of collections you'd like to connect:

```js
{
  label: "Author",
  name: "author",
  type: "reference",
  collections: ["author"] // points to a collection with the name "author"
}
```

This will result in a resolvable node in your GraphQL structure (Don't worry, we'll discuss how to use the GraphQL API later):

```graphql
{
  getPostDocument(relativePath: $relativePath) {
    data {
      author {
        # disambiguate because could have _many_ collections
        ... on AuthorDocument {
          name
        }
      }
    }
  }
}
```


The resulting field in your TinaCMS form will be a `select` field, whose `options` are all of the documents in the referenced collections.

## Customizing fields with the `UI` property

<!-- TODO add links when https://github.com/tinacms/tinacms.org/pull/1293/files is merged -->

Fields can be customized to provide a better experience for content editors. The `ui` property on each field can enable: [custom frontend validation functions](/docs/extending-tina/validation/) which does not allow editors to submit values that are invalid, [formate and parse](/docs/extending-tina/format-and-parse/) functions to allow customization of what is saved to the document and what is displayed to the user, and allow [custom field components](/docs/extending-tina/custom-field-components/) to display any input imaginable in the CMS. 

This is done by using the `ui` key in the field definition.

```ts
{
  label: "Title",
  name: "title",
  type: "string",
  ui: {
    validate: (val) => {
      if ( val.length > 20 ) {
        return 'The title field must be less then 20 characters'
      }
      if ( val.length < 5 ) {
        return 'The title field must be more then 5 characters'
      }
    }
  }
}
```
## Summary

- Your content is modeled in the `.tina/schema.{ts,js,tsx}` of your repo
- Your content model contains an array "collections". A "collection" maps a content type to a directory in your repo.
- A "collection" contains multiple fields, which can be of multiple scalar or non-scalar data types.
