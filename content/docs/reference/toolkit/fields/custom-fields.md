---
title: Creating Custom Fields
prev: /docs/reference/toolkit/fields/html
next: null
consumes:
  - file: /packages/@tinacms/core/src/plugins.ts
    details: Uses the add method from plugin manager
  - file: /packages/@tinacms/form-builder/src/field-plugin.tsx
    details: Shows the field plugin interface
  - file: /packages/@tinacms/forms/src/form.ts
    details: Depends on Field props
---

There are two ways to create custom fields with Tina:

1. Create a custom component and add it directly to your form definition via the `component` property
2. Create a **field plugin** to allow forms to use this field simply by using its name

## 1. Custom Component

A field `Component` is React component that accepts three props:

- `field`: The [field definition](https://tinacms.org/docs/reference/toolkit/fields) for the current field.
- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)

Checkout the [react-final-form](https://github.com/final-form/react-final-form#fieldrenderprops) docs for a more detailed description of the `input` and `meta` props.

## 2. Creating Field Plugins

A field plugin is a JavaScript object with three properties:

- `name`: A string used to identify the component. This is the name that is set in a [field definition](https://tinacms.org/docs/reference/toolkit/fields). This name must be unique; if multiple plugins are registered with the same name, only the last will be used.
- `Component`: The component that will used in the form. The exact nature of this component depends on which form builder is being used.
- `validate`: An optional function that will be used to validate the field's data.

**Interface**

```typescript
interface FieldPlugin {
  __type: 'field'
  name: string
  Component: React.FC<any>
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

### Validate (optional)

The optional `validate` function can be utilized to configure field validation.

**Arguments**

- `value`: The field's current value
- `allValues`: The current state of the entire form
- `meta`: The form metadata for this field
- `field`: The field's configuration

### Registering the plugin

```javascript
import { MapPicker, validateMap } from 'cms-field-my-map-picker'

let cms = new CMS()

cms.fields.add({
  name: 'map',
  Component: MapPicker,
  validate: validateMap,
})
```

**To use this component in a [follow these steps](/docs/advanced-features/custom-fields/)**

### Example

Here is an example of a simple text field plugin. The `Component` renders the label, the input, and the errors for the field.

```javascript
import { CMS } from '@tinacms/core'

let cms = new CMS()

cms.fields.add({
  name: 'text',
  Component({ input, meta, field }) {
    return (
      <div>
        <label htmlFor={input.name}>{field.label || field.name}</label>
        <div>{field.description}</div>
        <input type="email" {...input} />
        <div className="field-error">{meta.error}</div>
      </div>
    )
  },
  validate(email, allValues, meta, field) {
    let isValidEmail = /.*@.*\..*/.test(email)

    if (!isValidEmail) return 'Invalid email address'
  },
})
```

**This can also be added to your schema by [following these steps](/docs/advanced-features/custom-fields/)**

## Using Tina Styles

If you want to style the custom field to fit in with the rest of the Tina sidebar, you'll need to use the [CSS custom properties](/docs/ui/styles) defined in [`@tinacms/styles`](https://github.com/tinacms/tinacms/blob/master/packages/%40tinacms/styles/src/Styles.tsx).

**Example**

```jsx
import styled from 'styled-components'

// Use the Tina CSS variables in your styled component
const Label = styled.h3`
  color: var(--tina-color-primary);
  font-size: var(--tina-font-size-3);
  font-weight: var(--tina-font-weight-bold);
  border-radius: var(--tina-radius-big);
  border: 1px solid var(--tina-color-primary-light);
  transition: color linear ease var(--tina-timing-medium);
  padding: var(--tina-padding-small);
`
```
