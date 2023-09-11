---
title: The "boolean" field
last_edited: '2021-07-27T15:51:56.737Z'
---

## `boolean` type

```ts
type BooleanField = {
  label: string
  name: string
  type: 'boolean'
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  list?: boolean
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: boolean | boolean[], name: string, field: F) => any
    format?: (value: boolean | boolean[], name: string, field: F) => any
    validate?(
      // boolean or  boolean[] depends on list true or false
      value: boolean | boolean[],
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
:::code-snippet{open=true url="/img/code-snippets/boolean-1.png"}

### Simple

```ts
{
  type: 'boolean',
  name: 'published',
  label: 'Published'
}
```

:::
::::
