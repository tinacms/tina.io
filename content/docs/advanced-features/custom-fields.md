---
title: Custom Fields
prev: Null
next: null
---

Custom fields are made possible by the [plugin system](/docs/plugins/) in TinaCMS. Custom fields are a way to either add [custom logic to existing fields](#adding-custom-logic) or provide an [entirely new field component](#adding-a-custom-field)

## Creating a Custom Field Plugin

Creating a new type of field involves a few steps

- Define a field plugin
- Register the field plugin
- Using the field plugin in your schema.

**FieldPlugin Interface**

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

The `Component` property can be a built-in component from the "tinacms" package or a [custom component](#adding-a-custom-field). [See here](#built-in-field-components) for a full list of built-in components.

> It is considered a good practice to have your plugins in a separate file, this allows the plugin to be lazy-loaded only when the CMS is enabled. This way it does not affect your production bundle.

```tsx
// ./plugins.tsx
import { TextField } from 'tinacms'

export const emailFieldPlugin = {
  Component: TextField, // Extend the built-in text
  name: 'text-email',
  validate: (email, allValues, meta, field) => {
    let isValidEmail = /.*@.*\..*/.test(email)
    if (!isValidEmail) return 'Invalid email address'
  },
}
```

> It is considered a good practice to declare your plugins in a separate file, this allows the plugin to be lazy-loaded only when in edit-mode. This way it does not affect your production bundle.

### 2. Register the Field Plugin

The plugin can then be registered in [the CMS callback](/docs/tinacms-context/#tinacms) in the `<TinaCMS>` wrapper component.

```tsx
<TinaCMS
  // ...
  cmsCallback={cms => {
    import('../plugins.tsx').then(({ emailFieldPlugin }) => {
      cms.plugins.add(emailFieldPlugin)
    })
  }}
/>
```

### 3. Use Field in `.tina/schema.ts`

Now in the [schema.ts file](/docs/schema/) this new field plugin can be used for any field. It can be added to the [`ui` property](/docs/schema/#the-ui-property)

```ts
export default defineSchema({
  collections: [
    {
      // ...
      fields: [
        {
          type: 'string',
          label: 'Email',
          name: 'email',
          ui: {
            component: 'text-email'
          }
        },
      ]
    }]
```

**Note** The ui `component` property must match the `name` of the field plugin.

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
