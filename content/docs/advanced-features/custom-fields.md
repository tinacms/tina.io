---
title: Custom Fields
prev: Null
next: null
---

Custom fields are made possible by the [plugin system](/docs/plugins/) in TinaCMS. Custom fields are a way to either add [custom logic to existing fields](#adding-custom-logic) or provide an [entirely new field component](#adding-a-custom-field)

## Adding Custom Logic

Adding custom logic involves two steps: first registering a field plugin and then using the field plugin in your schema.

### 1. Create a Field Plugin

**Interface**

```ts
export interface FieldPlugin<ExtraFieldProps = {}, InputProps = {}> {
  __type: 'field'
  name: string
  Component: React.FC<InputFieldType<ExtraFieldProps, InputProps>>
  type?: string
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: Field
  ): string | object | undefined
  parse?: (value: any, name: string, field: Field) => any
  format?: (value: any, name: string, field: Field) => any
  defaultValue?: any
}
```

Where component can be a [custom component](#adding-a-custom-field) or a built in component. [See here](#list-of-field-components) for a full list of custom components.

It is considered a good practice to have your plugins in a separate file, this allows the plugin to be lazy-loaded only when the CMS is enabled. This way it does not affect your production bundle.

```tsx
// ./plugins.tsx
import { TextField } from 'tinacms'

export const validationPlugin = {
  Component: TextField,
  name: 'text-email-validation',
  validate: (email, allValues, meta, field) => {
    let isValidEmail = /.*@.*\..*/.test(email)
    if (!isValidEmail) return 'Invalid email address'
  },
}
```

### 2. Register a Field Plugin

The plugin can then be registered in [the CMS callback](/docs/tinacms-context/#tinacms) in the `<Tina>` wrapper component.

```tsx
cmsCallback={cms => {
    import('../plugins.tsx').then(({validationPlugin})=>{
        cms.plugins.add(validationPlugin)
    })
}}
```

### 3. Use Field in `.tina/schema.ts`

Now in the [schema.ts file](/docs/schema/) this field can be used for any field. It can be added to the [`ui` property](/docs/schema/#the-ui-property)

```ts
ui: {
  component: 'text-email-validation'
}
```

**Note** that the `name` of the field plugin must match that `component` used in the `ui` property.

## Adding a Custom Field

Instead of using one of the build in fields a [custom component can be provided](/docs/reference/toolkit/fields/custom-fields/). This can be any react component and it will render in the sidebar as a field. Follow the steps above but provide a custom `Component` as shown [here](/docs/reference/toolkit/fields/custom-fields/).

## List of Field Components

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
- [NumberField](docs/fields/number/)
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
