---
title: Text Field
next: /docs/fields/textarea
consumes:
  - file: /packages/tinacms/src/plugins/fields/TextFieldPlugin.tsx
    details: Shows text field interface and config options
  - file: /packages/@tinacms/fields/src/TextField.ts
    details: Shows text field interface and config options
---

The `text` field represents a single line text input. It should be used for content values that are short strings: for example, a page title.

## Definition

Below is an example of how a `text` field could be defined in a Gatsby remark form. [Read more on passing in form field options](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'rawFrontmatter.title',
      component: 'text',
      label: 'Title',
      description: 'Enter the title of the post here',
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
interface TextConfig {
  name: string
  component: 'text'
  label?: string
  description?: string
}
```
