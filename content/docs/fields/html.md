---
title: HTML Field
prev: /docs/fields/markdown
next: /docs/fields/number
consumes:
  - file: /packages/tinacms/src/plugins/fields/HtmlFieldPlugin.tsx
    details: Shows markdown interface and config options
---

The `html` field represents a chunk of HTML content.

<!-- TODO: Check if this widget still works -->

![tinacms-markdown-field](/img/fields/markdown.png)

## Definition

Below is an example of how a `html` field could be defined. [Read more on passing in form field options](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'frontmatter.summary',
      component: 'html',
      label: 'Summary',
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
interface HtmlConfig {
  name: string
  component: 'html'
  label?: string
  description?: string
}
```
