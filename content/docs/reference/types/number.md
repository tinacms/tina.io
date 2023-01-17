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

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/number" />

## Examples

### `number` with validate

This is an example of how to use the [frontend validate function](/docs/extending-tina/validation/) with the number field

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/number-validate" />
