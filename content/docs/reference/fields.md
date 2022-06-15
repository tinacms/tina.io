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

| Property     | Description              |
|--------------|--------------------------|
| `name` | The name of the field |
| `type` | The [type of the field](/docs/reference/types/) to be used |
| `label` | A human friendly label that will be displayed to the user (*optional* and will default to `name`)|
| `required` | If `true`, the collection can not be saved without this field present (*optional*, defaults to `false`) | 
| `isTitle`  | Denote a field as the title of a collection. [See below for more details](#istitle) (*optional*, defaults to `false`)|
| `isBody`  | If `true` this field will be used as the body of the document.  [See below for more details](#isbody) (*optional*, defaults to `false`) |
| `ui`  | Used to extend the user interface of the field and the field behaver. See [extending tina section](/docs/extending-tina/overview/) for more information (*optional*) |


## `isTitle` 

`isTitle` can be used to denote what the field represents the title of the document. This is what is displayed in the CMS list view page and will be used in the future for more functionality.


Make sure the following is true when using `isTitle`
- **The [Datalayer is enabled](/docs/tina-cloud/data-layer/)**
- It is a top-level field (it is defined in `collections.fields` or `collections.templates.fields`)
- It only used once per collection
- Required is also true

### Example of `isTitle`

```ts
const schema = defineSchema({
    collections: [
      {
       name: "posts",
       label: "Blog Posts",
       path: "content/posts",
       format: "mdx",
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
    ]
}) 
// ...

export default schema

```


## `isBody`

Is body can be used for `"mdx"`, `"markdown"`, and `"md"` format and the field must have type `string` or `rich-text`. When `isBody` is true it will save that field to the body of the document.
### Example of `isBody`

```ts
const schema = defineSchema({
    collections: [
      {
       name: "posts",
       label: "Blog Posts",
       path: "content/posts",
       format: "mdx",
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
    ]
}) 
// ...

export default schema

```
