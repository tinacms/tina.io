---
title: TinaCMS V0.69.13
date: '2022-09-27T04:00:00.000Z'
last_edited: '2022-09-27T04:00:00.000Z'
author: Logan Anderson
---

# Announcing TinaCMS 0.69.12

Today, we are releasing a new version of Tinacms. This version adds several improvements including;

- A new default values behavior
- Filename customization

## New default values behavior

To start we are deprecating the use of `defaultValue` this value would misbehave and make it hard or impossible in some cases to nullify a value.

Now `defaultItem` can be provided at the collection level. This will serve as the default values for the form when **the document is being created**. This is a breaking change and will be removed in the next major version.

### Example using defaultItem

```ts
const schema = defineSchema({
  collections: [
    {
      name: 'posts',
      label: 'Blog Posts',
      path: 'content/posts',
      format: 'mdx',
      defaultItem: () => {
        return {
          // Return a default title and the current date as the default date
          title: 'new post',
          date: new Date().toISOString(),
        }
      },
      fields: [
        {
          label: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          label: 'Date',
          name: 'date',
          type: 'date',
        },
      ],
    },
  ],
})

// ...

export default schema
```

When a new documented is created the default values will be used to populate the form.

Fore more information [check out the docs](/docs/reference/collections/#definition 'Collection Docs reference').

## Filename Customization

In this new version the filename can be customized with the ui.filename prop in the schema. With this prop you can provide a slugify function to generate the filename and optionally disable the filename input from editors.

Here is an example of how the slugify function can be used to generate a filename with the format `${topic}-${title}`.

### Example

```typescript
const schema = defineSchema({
  config: {
    //...
  },
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/post',
      format: 'md',
      ui: {
        filename: {
          // if disabled, the editor can not edit the filename
          readonly: true,
          // Example of using a custom slugify function
          slugify: values => {
            // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
            return `${values?.topic ||
              'no-topic'}-${values?.title?.toLowerCase().replace(/ /g, '-')}`
          },
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Topic',
          name: 'topic',
          options: ['programming', 'blacksmithing'],
        },
      ],
    },
  ],
})
```

For more information [checkout the docs](/docs/extending-tina/filename-customization/ 'Docs filename customization').
