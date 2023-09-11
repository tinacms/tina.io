---
title: The "string" field
last_edited: '2021-07-27T15:51:56.737Z'
next: /docs/reference/types/number
---

## `string` type

```ts
type StringField = {
  label: string
  name: string
  type: 'string'
  list?: boolean
  options?: (string | { value: string; label: string })[]
  /** Represents the "body" of a markdown file **/
  isBody?: boolean
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: string | string[], name: string, field: F) => any
    format?: (value: string | string[], name: string, field: F) => any
    // Note: defaultItem can only can be used when {list: true}
    defaultItem?: () => string | string
    validate?(
      // string or string[] depends on list true or false
      value: string | string[],
      allValues: any,
      meta: any,
      field: UIField<F, Shape>
    ): string | undefined | void
  }
}
```

## Examples

Tina will generate the appropriate component depending on the
configuration provided.

::::code-snippets
:::code-snippet{open=true url="/img/code-snippets/string-1.png"}

### Simple

```ts
{
  type: 'string',
  name: 'title',
  label: 'Title'
}
```

:::
:::code-snippet{url="/img/code-snippets/string-2.png"}

### Simple w/list

Setting `list: true` will make the value an array

```ts
{
  type: 'string',
  name: 'title',
  label: 'Title'
  list: true
}
```

:::
:::code-snippet{url="/img/code-snippets/string-3.png"}

### As a list with options

Setting `list: true` and providing `options` will make the value an array with a selection list

```ts
{
  type: 'string',
  name: 'title',
  label: 'Title'
  list: true,
  options: [
    {
      value: "movies",
      label: "Movies"
    }, {
      value: "music",
      label: "Music"
    }
  ]
}
```

:::

:::code-snippet{url="/img/code-snippets/string-4.png"}

### Using the `isBody` property

When working with markdown, you can indicate that a given field should represent the markdown body

```ts
{
  type: 'string',
  name: 'body',
  label: 'Body'
  // Indicates this field should repesent the file's body
  isBody: true
}
```

:::
:::code-snippet{url="/img/code-snippets/string-5.png"}

### Override the built-in component

By default, the text field is used for `strings`. To use a different core field plugin, specify it with the `ui.component property`

```ts
{
  label: "Description",
  name: "description",
  type: "string",
  ui: {
    component: "textarea"
  }
}
```

:::
:::code-snippet{url="/img/code-snippets/string-6.png"}

### Providing a custom component

You can [create your own components](/docs/extending-tina/custom-field-components/)

```ts
{
  label: "Title",
  name: "title",
  type: "string",
  ui: {
    component: ({ input }) => {
      return (
        <div>
          <label htmlFor="title">Title: </label>
          <input {...input}></input>
        </div>
      );
    },
  },
}
```

:::
::::
