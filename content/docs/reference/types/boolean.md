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

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/boolean" />

## Examples

### `boolean` with custom component

This example shows how a [custom component](/docs/extending-tina/custom-field-components/) can be rendered to the user instead of the default component.

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/boolean-component" />
