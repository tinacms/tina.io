---
title: Creating Custom Fields
prev: /docs/fields/blocks
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

- `field`: The [field definition](https://tinacms.org/docs/concepts/fields#field-definition) for the current field.
- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)

Checkout the [react-final-form](https://github.com/final-form/react-final-form#fieldrenderprops) docs for a more detailed description of the `input` and `meta` props.

## 2. Creating Field Plugins

A field plugin is a JavaScript object with three properties:

- `name`: A string used to identify the component. This is the name that is set in a [field definition](https://tinacms.org/docs/concepts/fields#field-definition). This name must be unique; if multiple plugins are registered with the same name, only the last will be used.
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

The optional `validate` function let's you define how you 're

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
        <label htmFor={input.name}>{field.label || field.name}</label>
        <div>{field.description}</div>
        <input type="email" {...input} />
        <div class="field-error">{meta.error}</div>
      </div>
    )
  },
  validate(email, allValues, meta, field) {
    let isValidEmail = /.*@.*\..*/.test(email)

    if (!isValidEmail) return 'Invalid email address'
  },
})
```

## Using Tina Styles

If you want to style the custom field to fit in with the rest of the Tina sidebar, you'll need to access Tina theme styles from [`@tinacms/styles`](https://github.com/tinacms/tinacms/blob/master/packages/%40tinacms/styles/src/Styles.tsx).

If the Tina theme has been [customized](https://tinacms.org/docs/concepts/sidebar#customizing-the-sidebar-theme), the `Theme` values will be a combination of the customized styles and those set by [`DefaultTheme`](https://tinacms.org/docs/concepts/sidebar#default-theme). The theme will fallback to all default values if no customization is set.

To utilize these `Theme` values, helper functions have been created.

### Helper Functions

> The helpers will only work when using [`styled-components`](https://styled-components.com/) to style custom fields. If using another _CSS-in-JS_ framework, use the [`DefaultTheme` object directly](https://tinacms.org/docs/fields/custom-fields#using-the-default-theme).

| Color                                                 | Default Value |
| ----------------------------------------------------- | ------------- |
| `primary(value?: "light" | "medium" | "dark")`        | "medium"      |
| `grey(value?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)` | 0             |
| `error(value?: "light" | "medium" | "dark")`          | "medium"      |

| Font                                      | Default Value |
| ----------------------------------------- | ------------- |
| `size(value?: 0 | 1 | 2 | 3 | 4 | 5 | 6)` | 0             |
| `weight(value?: "regular" | "bold")`      | "regular"     |

| Misc                                          | Default       | Notes               |
| --------------------------------------------- | ------------- | ------------------- |
| `radius(size?: "small" | "big")`              | "big"         | For `border-radius` |
| `padding(size?: "small" | "big")`             | "big"         |                     |
| `shadow(size?: "small" | "big")`              | "big"         | For `box-shadow`    |
| `timing(length: "medium" | "short" | "long")` | `length` req. | For `transition`    |

```jsx
/*
 ** Example: Helper functions used
 ** within a styled component that will
 ** render in a custom field
 */

// 1. Import the helpers
import { padding, color, radius, font } from '@tinacms/styles'
import styled from 'styled-components'

// 2. Use the helpers in your styled components
const Label = styled.h3`
  color: ${color.primary()};
  font-size: ${font.size(3)};
  font-weight: ${font.weight('bold')};
  border-radius: ${radius()};
  border: 1px solid ${color.primary('light')};
  transition: color linear ease ${timing('medium')};
  padding: ${padding('small')};
`
```

### Using the Default Theme

You can also access the [`DefaultTheme`](https://tinacms.org/docs/concepts/sidebar#default-theme) directly without using the helpers. This is helpful when you want to utilize Tina Theme styles outside of `styled-components` or if you just prefer working with the theme values directly, without helpers.

> Although it's called `DefaultTheme`, note that if you pass [custom values to the sidebar](https://tinacms.org/docs/concepts/sidebar#customizing-the-sidebar-theme), `DefaultTheme` provides the overridden values instead of the true Tina defaults.

```jsx
/*
 ** Example: Using `DefaultTheme`
 ** directly with a CSS-in-JS,
 ** framework `styled-jsx`
 */

// 1. Import `DefaultTheme`
import { DefaultTheme } from '@tinacms/styles'

//2. Use `DefaultTheme` values in your styles
;<style jsx>{`
  label {
    color: ${DefaultTheme.color.primary.medium};
  }
`}</style>
```

## Further Reading

- [Registering Fields in Gatsby](/docs/gatsby/custom-fields)
