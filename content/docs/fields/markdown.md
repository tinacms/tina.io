---
title: Markdown Field
prev: /docs/fields/textarea
next: /docs/fields/html
consumes:
  - file: /packages/tinacms/src/plugins/fields/MarkdownFieldPlugin.tsx
    details: Shows markdown interface and config options
---

The `markdown` field represents a chunk of Markdown content. This field is typically used for the body of Markdown files.

![tinacms-markdown-field](/img/fields/markdown.png)

## Adding the Plugin

The `markdown` field plugin is not a default plugin. In order to use it in your site you must install the `react-tinacms-editor` package:

```
yarn add react-tinacms-editor
```

You can then add it to your cms:

```ts
import { MarkdownFieldPlugin } from 'react-tinacms-editor'

cms.plugins.add(MarkdownFieldPlugin)
```

> Visit the [plugins](/docs/cms/plugins) doc to learn how to reduce your initial bundle size by dynamically loading & registering the plugins.

## Definition

Below is an example of how a `markdown` field could be defined in a Gatsby remark form. [Read more on passing in form field options](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
const BlogPostForm = {
  fields: [
    {
      name: 'rawMarkdownBody',
      component: 'markdown',
      label: 'Post Body',
      description: 'Edit the body of the post here',
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

## Interface

```typescript
interface MarkdownConfig {
  name: string
  component: 'markdown'
  label?: string
  description?: string
}
```
