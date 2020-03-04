---
title: Number Field
prev: /docs/fields/html
next: /docs/fields/date
consumes:
  - file: /packages/tinacms/src/plugins/fields/NumberFieldPlugin.tsx
    details: Shows text field interface and config options
  - file: /packages/@tinacms/fields/src/NumberField.ts
    details: Shows text field interface and config options
---

The `number` field represents a number input.

![tinacms-number-field](/img/fields/number-field.png)

## Definition

Below is an example of how a `number` field could be defined in a Gatsby remark form. [Read more on passing in form field options](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'frontmatter.weight',
      component: 'number',
      label: 'Weight',
      description: 'Enter a weight for post sorting',
    },
    // ...
  ],
}
```

## Options

- `name`: The path to some value in the data being edited.
- `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/fields)
- `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
- `description`: An optional description that expands on the purpose of the field or prompts a specific action.
- `step`: An optional stepping interval to use when using up and down arrows to adjust the value, as well as for validation

## Interface

```typescript
interface NumberConfig {
  name: string
  component: 'number'
  label?: string
  description?: string
  step?: string
}
```
