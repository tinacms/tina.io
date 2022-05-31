---
title: The "reference" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `reference`

The `reference` field allows a "parent" document to connect to another document in different collection.  This relationship only needs to be defined on *one side*.

Once defined, the values of the *referenced* document become available to the parent.

```ts
type ReferenceField = {
  label: string
  name: string
  type: 'reference'
  /** The `name` of another collection **/
  collections: string[]
 /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: string, name: string, field: F) => any
    format?: (value: string, name: string, field: F) => any
    validate?(
      value: string,
      allValues: any,
      meta: any,
      field: UIField<F, Shape>
    ): string | undefined | void
  }
}
```

> Note: `reference` with `list: true` is not currently supported

## Example

Given the following schema:

```ts
export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Author",
      name: "author",
      type: "reference",
      collections: ["author"]
    }]
  }, {
    label: "Author",
    name: "author",
    path: "authors",
    fields: [{
      label: "Name",
      name: "name",
      type: "string",
    }, {
      label: "Avatar",
      name: "avatar",
      type: "string",
    }]
  }]
})
```

The `post` collection has a `reference` field to the `author` collection.

When editing in Tina, the user will be able to choose a document in the `author` collection for the value of `author`.

When querying for a `post` document, the `author` key in the response will contain the values of the *referenced* document:

```graphql
{
  post(relativePath: "myBlogPost.md") {
    title
    author {
      ... on Author {
        name
        avatar
      }
    }
  }
}
```

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/reference" />
