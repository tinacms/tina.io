---
title: The "reference" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `reference`

```ts
type ReferenceField = {
  label: string
  name: string
  type: 'reference'
  /** The `name` of another collection **/
  collections: string[]
 /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: string, name: string, field: F) => any
    format?: (value: string, name: string, field: F) => any
    validate?(
      value: string,
      allValues: any,
      meta: any,
      field: UIField<F, Shape>
    ): string | undefined | void
  }
}
```

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/reference" />

> Note: `reference` with `list: true` is not currently supported
