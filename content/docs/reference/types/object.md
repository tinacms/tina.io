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
  /** `fields OR `templates` may be provided, not both **/
  fields?: Field[]
  templates?: Template[]
  list?: boolean
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    itemProps?(
      item: Record<string, any>
    ): {
      label?: string
    }
  }
}
```

<iframe width="100%" height="700px" src="https://tina-gql-playground.vercel.app/iframe/object" />

### As a `list`

> Note: you can set `defaultItem` to auto-populate new items as they're added

<a href="https://tina-gql-playground.vercel.app/object-list-data" target="_blank">See Example</a>

### With multiple `templates`

If you always want your object to have the same fields, use the `fields` property. But if an object can be one of any different shape, define them as `templates`.

<a href="https://tina-gql-playground.vercel.app/object-list-templates" target="_blank">See Example</a>
