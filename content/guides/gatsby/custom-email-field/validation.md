---
title: Email Field Validation
---

An optional `validate` function can also be added to your Field Plugin.

**Arguments**

- `value`: The field's current value
- `allValues`: The current state of the entire form
- `meta`: The form metadata for this field
- `field`: The field's configuration

**Return: string | null | undefined**

If the value is invalid, then return the error message to be displayed.

**gatsby-browser.js**

```javascript
import { EmailField } from './src/components/EmailField'

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: 'email',
    Component: EmailField,
    validate(value, allValues, meta, field) {
      let isValidEmail = /.*@.*\..+/.test(value)

      if (!isValidEmail) return 'Invalid email address'
    },
  })
}
```

## Next Steps

Read more on how to create [custom field components](https://tinacms.org/blog/custom-field-components) and [custom field plugins](https://tinacms.org/blog/custom-field-plugins)!
