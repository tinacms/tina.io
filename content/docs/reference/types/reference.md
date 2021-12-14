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
  /** See docs/reference/toolkit/fields for customizing the UI **/
  ui?: object
}
```

<iframe width="100%" height="450px" src="https://tina-playground.vercel.app/reference" />

> Note: `reference` with `list: true` is not currently supported
