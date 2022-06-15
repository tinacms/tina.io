---
title: Collections
id: collections
last_edited: '2021-07-27T15:51:56.737Z'
next: /docs/reference/fields
prev: /docs/reference/schema
---


Collections represent a type of content (EX, blog post, page, author, etc). We recommend using singular naming in a collection.


| Property     | Description              |
|--------------|--------------------------|
| `name` | The name of the collection |
| `path` | The path (relative to where the CLI is running) to a folder where the content is stored. |
| `format` | The extension of all the documents in this collection (Default is "md"). Must be one of `"md"`, `"markdown"`, `"mdx"`, or `"json"`. |
| `label` | A human friendly label that will be displayed to the user|
| `fields` | An array of [fields](/docs/reference/fields/) |
| `templates` | An array of [templates](/docs/reference/templates/) |

> Note: Must provide only one of `fields` or `templates` but never both

## Example

```ts
const schema = defineSchema({
    collections: [
      {
       name: "posts",
       label: "Blog Posts",
       path: "content/posts",
       format: "mdx",
       fields: [
        // An array of fields
       ],
      },
    ]
}) 

// ...

export default schema
```


For more information [check out the content modeling docs](/docs/schema/)
