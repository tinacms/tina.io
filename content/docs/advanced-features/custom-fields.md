---
title: Custom Fields
prev: Null
next: null
---

Custom fields are made possible by the [plugin system](/docs/plugins/) in TinaCMS. Custom fields are a way to either add [custom logic to existing fields](#adding-custom-logic) or provide an [entirely new field component](#adding-a-custom-field)

## Using a Custom Field Component

Instead of using one of the built-in fields a [custom component can be provided](/docs/fields/custom-fields/). This can be any react component and it will render in the sidebar as a field. Follow the steps above but provide a custom `Component` as shown [here](/docs/fields/custom-fields/).

## Built-in Field Components

In general the field components can be imported from `tinacms` and then used as a component in your field plugin.

```ts
import { FieldComponentName } from 'tinacms'

export const MyPlugin = {
    Component: FieldComponentName,
    ...
}
```

Where `FieldComponentName` is an a Field Component from this list

- [TextField](/docs/reference/toolkit/fields/text/)
- [TextareaField](/docs/reference/toolkit/fields/textarea/)
- [NumberField](/docs//reference/toolkit/fields/number/)
- [ImageField](/docs/reference/toolkit/fields/image/)
- [ColorField](/docs/reference/toolkit/fields/color/)
- [ToggleField](/docs/reference/toolkit/fields/toggle/)
- [RadioGroupField](/docs/reference/toolkit/fields/radio-group/)
- [SelectField](/docs/reference/toolkit/fields/select/)
- [TagsField](/docs/reference/toolkit/fields/tags/)
- [ListField](/docs/reference/toolkit/fields/list/)
- [GroupField](/docs/reference/toolkit/fields/group/)
- [GroupListField](/docs/reference/toolkit/fields/group-list/)
- [BlocksField](/docs/reference/toolkit/fields/blocks/)
- [DateField](/docs/reference/toolkit/fields/date/)

Some fields must be imported from [`react-tinacms-editor`](/packages/react-tinacms-editor/)

- [MarkdownField](/docs/reference/toolkit/fields/markdown/)
- [HTMLField](/docs/reference/toolkit/fields/html/)
