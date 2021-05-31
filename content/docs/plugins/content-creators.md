---
title: Content Creator Plugins
prev: /docs/fields
next: /docs/media
last_edited: '2021-03-16T16:20:35.632Z'
---

The ability to create content is one of the key responsibilities of any CMS. The `content-creator` plugin type is one way Tina lets you add this behaviour.

![content-creator-plugin-tinacms](/img/content-creator-ex.jpg)

## Interface

```ts
interface ContentCreatorPlugin<FormShape> {
  __type: 'content-creator'
  name: string
  fields: Field[]
  onSubmit(value: FormShape, cms: CMS): Promise<void> | void
}
```

| Option     | Description                                                                             |
| ---------- | --------------------------------------------------------------------------------------- |
| `__type`   | The name of the plugin. Always `'content-creator'`.                                     |
| `name`     | The text to be displayed in the "Add Content" menu.                                     |
| `fields`   | An array of fields that populate a modal form. Field values can populate new file data. |
| `onSubmit` | A function that creates content. Called once the form is submitted.                     |

## Examples

### Building a _ContentCreatorPlugin_

```ts
const BlogPostCreatorPlugin = {
  __type: 'content-creator',
  fields: [
    {
      label: 'Title',
      name: 'title',
      component: 'text',
      validation(title) {
        if (!title) return 'Required.'
      },
    },
    {
      label: 'Date',
      name: 'date',
      component: 'date',
      description: 'The default will be today.',
    },
    {
      label: 'Author',
      name: 'author_name',
      component: 'text',
      description: 'Who wrote this, yo?',
    },
  ],
  onSubmit(values, cms) {
    // Call functions that create the new blog post. For example:
    cms.apis.someBackend.createPost(values)
  },
}
```

After [registering the plugin](/docs/plugins#adding-plugins) with the CMS it will be accessible.

```ts
cms.plugins.add(BlogPostCreatorPlugin)
```

## Further Reading

- Learn how to [register plugins](/docs/plugins#adding-plugins) with the CMS
- Visit the [Field Plugins](/docs/plugins/fields) docs to learn about how you can customize your form.
