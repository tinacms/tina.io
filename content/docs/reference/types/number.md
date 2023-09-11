---
title: The "number" field
last_edited: '2021-07-27T15:51:56.737Z'
---

## `number` type

```ts
type NumberField = {
  label: string
  name: string
  type: 'number'
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  list?: boolean
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: number | number[], name: string, field: F) => any
    format?: (value: number | number[], name: string, field: F) => any
    validate?(
      // number or  number[] depends on list true or false
      value: number | number[],
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
:::code-snippet{open=true url="/img/code-snippets/number-1.png"}

### Simple

```ts
{
  type: 'string',
  name: 'count',
  label: 'Count'
}
```

:::
::::
