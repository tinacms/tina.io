---
title: Text Area Field
prev: /docs/fields/text
next: /docs/fields/markdown
consumes:
  - file: /packages/tinacms/src/plugins/fields/TextareaFieldPlugin.tsx
    details: Shows textarea field interface and config options
  - file: /packages/@tinacms/fields/src/TextArea.ts
    details: Shows textarea field interface and config options
---

The `textarea` field represents a multi-line text input. It should be used for content values that are long strings: for example, a page description.

![tinacms-textarea-field](/fields/textarea.png)

## Definition

Below is an example of how a `textarea` field could be defined in a Gatsby remark form. [Read more on passing in form field options](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'rawFrontmatter.description',
      component: 'textarea',
      label: 'Description',
      description: 'Enter the post description here',
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

## Interface

```typescript
interface TextareaConfig {
  name: string
  component: 'textarea'
  label?: string
  description?: string
}
```
