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

## Options

```typescript
interface MarkdownConfig {
  component: 'markdown'
  name: string
  label?: string
  description?: string
}
```

| Option        | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'markdown'`.                                          |
| `name`        | The path to some value in the data being edited.                                                |
| `label`       | A human readable label for the field. Defaults to the `name`. _(Optional)_                      |
| `description` | Description that expands on the purpose of the field or prompts a specific action. _(Optional)_ |

> ### FieldConfig
>
> This interfaces only shows the keys unique to the markdown field.
>
> Visit the [Field Config](/docs/fields) docs for a complete list of options.

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

Below is an example of how a `markdown` field could be defined in a Gatsby remark form. [Read more on passing in form field options](/guides/gatsby/markdown/editing-remark-content#customizing-remark-forms).

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
