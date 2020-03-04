---
title: Select Field
prev: /docs/fields/toggle
next: /docs/fields/group
consumes:
  - file: null
    details: null
---

The `select` field represents a select element.

![TinaCMS Select Field](/img/fields/select-field.png)

## Definition

Below is an example of how a `select` field could be defined in a [form](http://localhost:3000/docs/forms). Read more on passing in [form field options](/docs/gatsby/markdown#customizing-remark-forms)) for Gatsby.

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'frontmatter.authors',
      component: 'select',
      label: 'Author',
      description: 'Select an author for this post',
      options: ['Ruth Ozeki', 'Zadie Smith', 'Arundhati Roy'],
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
- `options`: An array of options. The options could be a string, a number, or an `Option` object.

## Interface

```typescript
interface SelectField {
  name: string
  component: 'select'
  label?: string
  description?: string
  options: (Option | string | number)[]
}

interface Option {
  label: string
  value: string
}
```
