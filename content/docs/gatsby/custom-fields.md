---
title: Custom Fields
id: /docs/gatsby/custom-fields
prev: /docs/gatsby/configure-git-plugin
next: /docs/gatsby/inline-editing
consumes:
  - file: /packages/@tinacms/form-builder/src/field-plugin.tsx
    details: Depends on Field Plugin props
  - file: /packages/@tinacms/forms/src/form.ts
    details: Depends on Field props
  - file: /packages/@tinacms/core/src/plugins.ts
    details: Depends on plugin manager methods
---

This doc explains how to add custom field plugins to a Gatsby site.

## 1. Registering an Email Field

In this example we'll create a simple email field for our Gatsby site. Besides the required `name`, we also want the email field definition to accept a `label` and a `description`.

First create the React component that accepts three props:

- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)
- `field`: The [field definition](https://tinacms.org/docs/concepts/fields#field-definition) for the current field.

**src/components/EmailField.js**

```javascript
import React from 'react'

export function EmailField({ input, meta, field }) {
  return (
    <div>
      <label htmFor={input.name}>{field.label || field.name}</label>
      <div>{field.description}</div>
      <input type="email" {...input} />
      <div class="field-error">{meta.error}</div>
    </div>
  )
}
```

Open your `gatsby-browser.js` and create an `onClientEntry`. In this function, we'll use the `cms.fields.add` method to register the `EmailField`.

**gatsby-browser.js**

```javascript
import { EmailField } from './src/components/EmailField'

export const onClientEntry = () => {
  window.tinacms.fields.add({
    name: 'email',
    Component: EmailField,
  })
}
```

Your field plugin can now be used in your forms!

```javascript
useRemarkForm(remark, {
  fields: [
    // ...
    {
      name: 'rawFrontmatter.author.email',
      component: 'email',
      label: 'Email',
      description: 'The email address of the author',
    },
  ],
})
```

##2. Validating the Email Field

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
