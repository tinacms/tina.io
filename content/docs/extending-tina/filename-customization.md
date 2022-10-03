---
title: Filename customization
id: '/docs/extending-tina/filename-customization'
prev: content/docs/extending-tina/format-and-parse.md
---

The filename customization API allows you to customize the filename of a document based on its content. This is useful when you do not want your editors to have to worry about the filename of a document.

## Definition

| Property               | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `ui.filename.disabled` | Disable the editor from editing the filename                             |
| `ui.filename.slugify`  | A function that takes in the values of the form and returns the filename |

## Usage

To use the filename customization API, you need to pass a `slugify` function that allows you to customize the filename of a document based on its content.

### Example with slugify and disabled

```ts
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
          disabled: true,
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

### Example with default slugify

If no slugify function is provided and there is a field with `isTItle: true`. A default slugify function will be used that strips out every non-alphanumeric character and replaces spaces with dashes.

```ts
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
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
          // If no slugify function is provided, then by default the "title" field will be used to generate the filename
          isTitle: true,
          required: true,
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
