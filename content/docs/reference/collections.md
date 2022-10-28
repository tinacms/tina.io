---
title: Collections
id: collections
last_edited: '2022-06-15T15:51:56.737Z'
next: /docs/reference/fields
prev: /docs/reference/schema
---

Collections represent a type of content (EX, blog post, page, author, etc). We recommend using singular naming in a collection (Ex: use post and not posts).

## Definition

| Property      | Description                                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | The name of the collection                                                                                                                            |
| `path`        | The path (relative to where the CLI is running) to a folder where the content is stored.                                                              |
| `format`      | The extension of all the documents in this collection (Default is "md"). Must be one of `"md"`, `"markdown"`, `"mdx"`, or `"json"`.                   |
| `label`       | A human friendly label that will be displayed to the user                                                                                             |
| `fields`      | An array of [fields](/docs/reference/fields/)                                                                                                         |
| `templates`   | An array of [templates](/docs/reference/templates/)                                                                                                   |
| `defaultItem` | An object or a function that returns an object. The object that is returned will be the data used as the default data when a new document is created. |
| `ui.filename` | See [Filename customization](/docs/extending-tina/filename-customization/)                                                                            |
| `ui.global`   | A boolean that if true will make this collection Global. (_optional_)                                                                                 |
| `ui.router`   | A function that takes in a document and returns the route for it. If nothing is returned the admin view will be used. (_optional_)                    |

> Note: Must provide only one of `fields` or `templates` but never both

## Examples

### Basic Example

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
          // An array of fields
        ],
      },
    ],
  },
})
```

### Example with router and global

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
        ui: {
          router: ({ document }) => {
            // navigate to the post that was clicked
            return `/post/${document._sys.filename}`
          },
        },
        fields: [
          // An array of fields
        ],
      },
      {
        label: 'Global',
        name: 'global',
        path: 'content/global',
        ui: {
          global: true,
        },
        format: 'json',
        fields: [
          // An array of fields
        ],
      },
    ],
  },
})
```

### Example with default item

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
        defaultItem: () => {
          return {
            // Return a default title and the current date as the default date
            title: 'new post',
            date: new Date().toISOString(),
          }
        },
        fields: [
          {
            label: 'Title',
            name: 'title',
            type: 'string',
          },
          {
            label: 'Date',
            name: 'date',
            type: 'date',
          },
        ],
      },
    ],
  },
})
```

For more information [check out the content modeling docs](/docs/schema/)
