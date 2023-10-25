---
title: The "object" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `object`

```ts
type ObjectField = {
  label: string
  name: string
  type: 'object'
  list?: boolean
  /** `fields OR `templates` may be provided, not both **/
  fields?: Field[]
  templates?: Template[]
  /** Customize the default "_template" key that gets set
     in a document to identify a block-type.
     Only applicable when list: true **/
  templatesKey?: string
  list?: boolean
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
     /** Weather or not the Visual Selector  is enabled. See https://tina.io/docs/editing/blocks/#adding-a-visual-block-selector-experimental **/
    visualSelector?: boolean,
    defaultItem?: Record<string, any> | () => Record<string, any>,
    itemProps?(
      item: Record<string, any>
    ): {
      label?: string
    }
  }
}
```

## Examples

Tina will generate the appropriate component depending on the
configuration provided.

::::code-snippets
:::code-snippet{open=true url="/img/code-snippets/object-1.png"}

### A basic object configuration

```ts
{
  label: "Testimonial",
  name: "testimonial",
  type: "object",
  fields: [
    {
      label: "Author",
      name: "author",
      type: "string"
    },
    {
      label: "Role",
      name: "role",
      type: "string"
    },
    {
      label: "Quote",
      name: "quote",
      type: "string",
      ui: {
        component: "textarea"
      }
    }
  ]
}
```

:::
:::code-snippet{open=true url="/img/code-snippets/object-2.png"}

### As a list with default values

> **Default Values**
> To display default values when fields are first added to a page, use the `ui.defaultItem` property.

```ts
{
  label: "Testimonials",
  name: "testimonials",
  type: "object",
  list: true,
  ui: {
    itemProps: (item) => {
      return { label: `${item?.author}  ( ${item?.role} ) `}
    },
    defaultItem: {
      author: "Judith Black",
      role: "CEO",
      quote: "Lorem ipsum dol..."
    }
  },
  fields: [
    {
      name: "author",
      // ...
    },
    {
      name: "role",
      // ...
    },
    {
      name: "quote",
      // ...
    }
  ]
}
```

:::
:::code-snippet{open=true url="/img/code-snippets/object-3.png"}

### Using `templates` instead of fields

If you always want your object to have the same fields, use the fields property. But if an object can be one of any different shape, define them as templates.

```ts
{
  label: "Page Blocks",
  name: "pageBlocks",
  type: "object",
  list: true,
  templates: [
    {
      label: "CTA",
      name: "cta",
      fields: [...]
    },
    {
      label: "Testimonial",
      name: "testimonial",
      fields: [...]
    }
  ]
}
```

:::
::::
