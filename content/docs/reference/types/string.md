---
title: The "string" field
last_edited: '2021-07-27T15:51:56.737Z'
next: content/docs/reference/types/number.md
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

<iframe width="100%" height="450px" src="https://tina-gql-playground.vercel.app/iframe/string" />

## Examples

### With `options`

Specifying an `options` array will provide a selection list

<a href="https://tina-gql-playground.vercel.app/string-options" target="_blank">See Example</a>

### As a `list`

Setting `list: true` will make the value an array

<a href="https://tina-gql-playground.vercel.app/string-list" target="_blank">See Example</a>

### As a `list` with `options`

Setting `list: true` and providing `options` will make the value an array with a selection list

<a href="https://tina-gql-playground.vercel.app/string-list-options" target="_blank">See Example</a>

## The `isBody` property

When working with markdown, you can indicate that a given field should repesent the markdown body

<a href="https://tina-gql-playground.vercel.app/string-body" target="_blank">See Example</a>

## Overriding the component

By default, the `text` field is used for strings. To use a different core field plugin, specify it with the `ui.component` property

<a href="https://tina-gql-playground.vercel.app/iframe/string-textarea" target="_blank">See Example</a>

## Providing a custom component

You can [create your own components](/docs/extending-tina/custom-field-components/)

<a href="https://tina-gql-playground.vercel.app/string-component" target="_blank">See Example</a>

## Providing validation

You can provide a [validation function](/docs/extending-tina/validation/) for frontend validation

<a href="https://tina-gql-playground.vercel.app/validation" target="_blank">See Example</a>

## Format and parse

You can provide [custom format and parse functions](/docs/extending-tina/format-and-parse/) to a string field

<a href="https://tina-gql-playground.vercel.app/string-format-parse" target="_blank">See Example</a>
