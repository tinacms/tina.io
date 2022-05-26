---
title: The "reference" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `reference`

The `reference` field allows a document to connect to another in another `collection`.  This relationship only needs to be defined on *one side*.

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

## Example

Given the following schema:

```ts
const schema = defineSchema({
  collections: [
    {
      label: "Blog Posts",
      name: "post",
      path: "content/posts",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "reference",
          label: "Author",
          name: "postAuthor",
          collections: ['author'],
        },
      ],
    },
    {
      label: "Authors",
      names: "author",
      path: "content/authors",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        }
      ],
    }
  ]
})
```

The `post` collection has a `reference` field to the `author` collection.

When editing in Tina, the user will be able to choose a document in the `author` collection for the value of `postAuthor`.

When querying for a `post` document, the `postAuthor` in the response will contain the values of the *referenced* document:

```graphql
{
  post(relativePath: "myBlogPost.md") {
    title
    postAuthor {
      ... on Author {
        name
      }
    }
  }
}
```

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/reference" />

> Note: `reference` with `list: true` is not currently supported
