---
title: Select Field
prev: /docs/fields/toggle
next: /docs/fields/tags
consumes:
  - file: /packages/@tinacms/fields/src/Select.tsx
    details: Shows select field and Option interfaces
  - file: /packages/tinacms/src/plugins/fields/SelectFieldPlugin.tsx
    details: Shows select field and Option interfaces
---

The `select` field represents a select element.

![TinaCMS Select Field](/img/fields/select-field.png)

## Definition

Below is an example of how a `select` field could be defined in a [form](/docs/forms). Read more on passing in [form field options](/docs/gatsby/markdown#customizing-remark-forms)) for Gatsby.

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'frontmatter.authors',
      component: 'select',
      label: 'Author',
      description: 'Select an author for this post',
      options: ['Arundhati Roy', 'Ruth Ozeki', 'Zadie Smith'],
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
- `options`: An array of strings.

## Interface

```typescript
interface SelectField {
  name: string
  component: 'select'
  label?: string
  description?: string
  options: string[]
}
```
