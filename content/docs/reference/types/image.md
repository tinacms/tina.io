---
title: The "image" field
last_edited: '2021-07-27T15:51:56.737Z'
---

# `image`

```ts
type ImageField = {
  label: string
  name: string
  type: 'image'
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
