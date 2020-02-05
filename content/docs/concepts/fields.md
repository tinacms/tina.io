---
title: Fields
prev: /docs/concepts/forms
next: /docs/concepts/backends
consumes:
  - file: /packages/@tinacms/forms/src/form.ts
    details: Shows Field interface
---

A [form](/docs/concepts/forms 'Tina Concepts: Forms') in Tina is made up of one or more **fields**.

Tina has several built-in [field types](/docs/concepts/fields#field-types), as well as the ability to define your [own fields](/docs/fields/custom-fields).

## Field Definition

Fields can be added to Forms as object literals that conform to the following schema:

```typescript
interface Field {
  name: string
  label?: string
  description?: string
  component: React.FC<any> | string
  defaultValue?: any
}
```

- `name`: The form key of the field. The field's name should correspond to its key in the content source.
- `label`: _(Optional)_ A human-readable label to display above the field.
- `description`: _(Optional)_ A description that will appear below the field. It could be used to explain how the field data is used.
- `component`: Either a React component that renders the field or a string containing the ID of a built-in field type or custom field plugin
- `defaultValue`: _(Optional)_ This value will be inserted into the field if no value is set.

## Field Types

Checkout the interfaces for each field type below.

- [Text](/docs/fields/text)
- [Text-Area](/docs/fields/textarea)
- [Markdown](/docs/fields/markdown)
- [Date & Time](/docs/fields/date)
- [Image](/docs/fields/image)
- [Color](/docs/fields/color)
- [Toggle](/docs/fields/toggle)
- [Group](/docs/fields/group)
- [Group List](/docs/fields/group-list)
- [Blocks](/docs/fields/blocks)

Learn how to incorporate Tina's built-in field types into your [Gatsby remark forms](/docs/gatsby/markdown#customizing-remark-forms).
