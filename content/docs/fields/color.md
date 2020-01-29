---
title: Color Field
prev: /docs/fields/image
next: /docs/fields/toggle
consumes:
  - file: /packages/tinacms/src/plugins/fields/ColorFieldPlugin.tsx
    details: Documents color field plugin
  - file: /packages/@tinacms/fields/src/ColorPicker/ColorPicker.tsx
    details: Shows color field in use & interface
---

The `color` field is a visual color picker. This field is used for content values that handle the rendering of color. Can be saved as RGB or hex value.


## Definition

Below is an example of how a `color` field could be defined in a Gatsby remark form. Read more on passing in form field options [here](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'rawFrontmatter.background_color',
      component: 'color',
      label: 'Background Color',
      description: 'Edit the page background color here',
      colorFormat: 'hex'
    },
    // ...
  ],
}
```

## Options

 - `name`: The path to some value in the data being edited.
 - `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types)
 - `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
 - `description`: An optional description that expands on the purpose of the field or prompts a specific action.
 -  `colorFormat`: Optionally specify whether you want the color value to be a hexadecimal ('hex') or RBG value.

 ## Interface

```typescript
interface ColorConfig {
  component: 'color'
  name: string
  label?: string
  description?: string
  colorFormat?: 'hex' | 'rgb' // Defaults to "hex"
}
```
