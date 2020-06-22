---
title: HTML Field
prev: /docs/fields/markdown
next: /docs/fields/number
consumes:
  - file: /packages/tinacms/src/plugins/fields/HtmlFieldPlugin.tsx
    details: Shows markdown interface and config options
---

The `html` field represents a chunk of HTML content.

![tinacms-markdown-field](/img/fields/markdown.png)

## Options

```typescript
interface HtmlConfig {
  component: 'html'
  name: string
  label?: string
  description?: string
}
```

| Option        | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'html'`.                                              |
| `name`        | The path to some value in the data being edited.                                                |
| `label`       | A human readable label for the field. Defaults to the `name`. _(Optional)_                      |
| `description` | Description that expands on the purpose of the field or prompts a specific action. _(Optional)_ |

> This interfaces only shows the keys unique to the html field.
>
> Visit the [Field Config](/docs/fields) docs for a complete list of options.

## Adding the Plugin

The `html` field plugin is not a default plugin. In order to use it in your site you must install the `react-tinacms-editor` package:

```
yarn add react-tinacms-editor
```

You can then add it to your cms:

```ts
import { HtmlFieldPlugin } from 'react-tinacms-editor'

cms.plugins.add(HtmlFieldPlugin)
```

> Visit the [plugins](/docs/cms/plugins) doc to learn how to reduce your initial bundle size by dynamically loading & registering the plugins.

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
