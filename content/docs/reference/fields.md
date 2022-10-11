---
title: Fields
id: fields
last_edited: '2022-06-15T15:51:56.737Z'
next: /docs/reference/templates
prev: /docs/reference/collections
---

<!-- # next: /docs/reference/schema -->

Fields define the shape of the content and the user input. There are [many types of fields](/docs/reference/types) each with its own input and type.

Although some fields have more properties here is a list of common ones that are used.

## Definition

| Property   | Description                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | The name of the field                                                                                                                                                                   |
| `type`     | The [type of the field](/docs/reference/types/) to be used                                                                                                                              |
| `label`    | A human friendly label that will be displayed to the user (_optional_, defaults to `name`)                                                                                              |
| `required` | If `true`, the collection cannot be saved without this field present (_optional_, defaults to `false`)                                                                                  |
| `isTitle`  | Denote a field as the title of a collection. [See below for more details](#istitle) (_optional_, defaults to `false`)                                                                   |
| `isBody`   | If `true` this field will be used as the body of the document. [See below for more details](#isbody) (_optional_, defaults to `false`)                                                  |
| `ui`       | Used to extend the user interface of the field and the field behaver. See [extending tina section](/docs/extending-tina/overview/#customizing-fields) for more information (_optional_) |

## `isTitle`

`isTitle` can be used to denote which field represents the title of the document. The field set with `isTitle=true` is what is displayed in the CMS list view page.

Make sure the following is true when using `isTitle`

- It is a top-level field (it is defined in `collections.fields` or `collections.templates.fields`)
- It is only used once per collection
- `required` is set to true

### Example of `isTitle`

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            label: 'Title',
            name: 'title',
            isTitle: true,
            required: true,
          },
          // ... other fields
        ],
      },
    ],
  },
})
```

## `isBody`

`isBody` can be used for `"mdx"`, `"markdown"`, and `"md"` formats. The field used for `isBody = true` must have type `string` or `rich-text`. When `isBody` is true it will save that field to the body of the document.

### Example of `isBody`

```ts
export default defineConfig({
  //...
  collections: [
    {
      name: 'posts',
      label: 'Blog Posts',
      path: 'content/posts',
      format: 'mdx',
      fields: [
        {
          type: 'rich-text',
          label: 'Body of post',
          name: 'body',
          isBody: true,
        },
        //... Other fields
      ],
    },
  ],
})
```
