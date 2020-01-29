---
title: Blocks Field
prev: /docs/fields/group-list
next: /docs/fields/custom-fields
consumes:
  - file: /packages/tinacms/src/plugins/fields/BlocksFieldPlugin.tsx
    details: Shows blocks interface
---

The **Blocks** field represents a list of items, similar to the [Group List](/docs/fields/group-list) field, but allows each entity in the list to have a unique shape.

<tip>For an in-depth explanation of the Blocks field, read our ["What are Blocks?"](/blog/what-are-blocks/) blog post. To see a real-world example of Blocks in use, check out the [Tina Grande Starter](https://github.com/tinacms/tina-starter-grande).
</tip>

![tinacms-blocks-gif](/gif/blocks.gif)

In the gif above, you see a list of Blocks: **Title**, **Image**, and **Content**. The form for this field could be configured like this:

```jsx
const PageForm = {
  label: 'Page',
  fields: [
    {
      label: 'Page Sections',
      name: 'rawJson.blocks',
      component: 'blocks',
      templates: {
        TitleBlock,
        ImageBlock,
        ContentBlock,
      },
    },
  ],
}
```

Each of the `templates` in this configuration represent a configuration object that looks more or less like a [top-level form configuration object](/docs/gatsby/markdown/#creating-remark-forms).

```jsx
/*
 **  Block template definition for the content block
 **/
export const ContentBlock = {
  label: 'Content',
  key: 'content-block',
  defaultItem: {
    content: '',
  },
  fields: [{ name: 'content', label: 'Content', component: 'markdown' }],
}
```

The source data for the `ContentBlock` might look like the example below. When new blocks are added, additional JSON objects will be added to the `blocks` array:

```json
{
  "blocks": [
    {
      "content": "**Billions upon billions** are creatures of the cosmos Orion's sword cosmic fugue at the edge of forever science?"
    }
  ]
}
```

## Blocks Field Options

- `name`: The path to the blocks value in the data being edited.
- `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types).
- `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
- `description`: An optional description of the field.
- `templates`: A list of **Block templates** that define the fields used in the Blocks.

## Block Template Options

- `label`: A human readable label for the Block.
- `key`: Should be unique to optimize the [rendering of the list](https://reactjs.org/docs/lists-and-keys.html).
- `fields`: An array of fields that will render as a sub-menu for each block. The fields should map to editable content.
- `defaultItem`: An optional function to provide the block with default data upon being created.
- `itemProps`: An optional function that generates `props` for each group item.
  - `key`: This property is used to optimize the rendering of lists. If rendering is causing problems, use `defaultItem` to generate a new key, as is seen in [this example](http://tinacms.org/docs/fields/group-list#definition). Feel free to reference the [React documentation](https://reactjs.org/docs/lists-and-keys.html) for more on keys and lists.
  - `label`: A readable label for the new Block.

## Interfaces

```typescript
import { Field } from '@tinacms/core'

interface BlocksConfig {
  name: string
  component: 'blocks'
  label?: string
  description?: string
  templates: {
    [key: string]: BlockTemplate
}

interface BlockTemplate {
  label: string
  key: string
  fields: Field[]
  defaultItem?: object | (() => object)
  itemProps?: (
    item: object
  ) => {
    key?: string
    label?: string
  }
}
```
