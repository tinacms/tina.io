---
title: Creating New Files
---

An integral aspect of content management is the ability to create new content. To create new content files with Tina, you will need to configure and register `content-creator` plugins with the CMS.

Currently, Tina provides `content-creator` plugins for both Markdown and JSON files in **Gatsby projects**. Once registered, actions from these `content-creator` plugins are accessible from the sidebar menu. If you have an idea for a new `content-creator` plugin, [consider contributing!](/docs/contributing/guidelines)

![content-creator-plugin-tinacms](/img/content-creator-ex.jpg)

### General steps

1. Add a `content-creator` plugin
2. Register the plugin with Tina
3. Configure how content is created by:
   - Formatting the filename and path
   - Providing default data (front matter, Markdown, or JSON)

### Prerequisites

- A Gatsby site [configured with Tina](/docs/gatsby/manual-setup)
- Content editing with [Markdown](/docs/gatsby/markdown) or [JSON](/docs/gatsby/json) set up

## 1. Add Content-Creator Plugin

There are two `content-creator` plugins to use with Gatsby.

- `RemarkCreatorPlugin`: Constructs a `content-creator` plugin for Markdown files.

```javascript
interface RemarkCreatorPlugin{
     label: string
     fields: Field[]
     filename(form: any): Promise<string>
     frontmatter?(form: any): Promise<any>
     body?(form: any): Promise<string>
}
```

- `JsonCreatorPlugin`: contstructs a `content-creator` plugin for JSON files.

```typescript
interface JsonCreatorPlugin {
  label: string
  fields: Field[]
  filename(form: any): Promise<string>
  data?(form: any): Promise<any>
}
```

These classes need to be instantiated with at least these three things:

- `label`: A simple action label displayed when users interact with the + button in the sidebar.
- `filename`: A function whose return value should be the path to the new file.
- `fields`: An array of field objects. [Read more on field definitions](/docs/fields).

**Markdown Example**

```javascript
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'New Blog Post',
  filename: form => {
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description:
        'The full path to the new Markdown file, relative to the repository root.',
    },
  ],
})
```

> The `createRemarkButton` function is deprecated as of `gatsby-tinacms-remark: 0.4.0`.
> This is a function that served the same purpose as the `RemarkCreatorPlugin` class. Below is an example of `createRemarkButton` in use.

```javascript
import { createRemarkButton } from 'gatsby-tinacms-remark'

/*
 ** Deprecated — gatsby-tinacms-remark: 0.4.0
 ** in favor of RemarkCreatorPlugin class
 */
const CreatePostPlugin = createRemarkButton({
  label: 'Create Post',
  filename: form => {
    return form.filename
  },
  fields: [
    //...
  ],
})
```

**JSON Example**

```javascript
import { JsonCreatorPlugin } from 'gatsby-tinacms-json'

const CreatePostPlugin = new JsonCreatorPlugin({
  label: 'New JSON File',
  filename: form => {
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/data/puppies.json',
      description:
        'The full path to the new Markdown file, relative to the repository root.',
    },
  ],
})
```

### Where To Add the Plugin

When adding a `content-creator` plugin, you'll have to consider when you want this functionality available to the editor. If the component where you registered the plugin is actively rendered on the site, you will be able to add new content via the plugin.

These are some places you may want to add the plugin:

- The Root component: it will always be available
- A Layout component: it will always available when that Layout is used.
- A Blog Index component: it will only be available when looking at the list of blog posts.
