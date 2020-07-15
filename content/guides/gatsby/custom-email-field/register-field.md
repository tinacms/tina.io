---
title: Creating Custom Fields
---

This guide explains how to add custom field plugins to a Gatsby site.

## 1. Registering an Email Field

In this example we'll create a simple email field for our Gatsby site. Besides the required `name`, we also want the email field definition to accept a `label` and a `description`.

First create the React component that accepts three props:

- `input`: The data and callbacks necessary to make an input.
- `meta`: Metadata about the field in the form. (e.g. `dirty`, `valid`)
- `field`: The [field definition](https://tinacms.org/docs/fields) for the current field.

**src/components/EmailField.js**

```javascript
import React from 'react'

export function EmailField({ input, meta, field }) {
  return (
    <div>
      <label htmlFor={input.name}>{field.label || field.name}</label>
      <div>{field.description}</div>
      <input type="email" {...input} />
      <div className="field-error">{meta.error}</div>
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
