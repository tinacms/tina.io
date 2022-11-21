---
title: Group Field
prev: /docs/reference/toolkit/fields/select
next: /docs/reference/toolkit/fields/group-list
consumes:
  - file: /packages/tinacms/src/plugins/fields/GroupFieldPlugin.tsx
    details: Shows group field interface and how to use
---

<div class="short-code-warning">
   <div>
      <p>This is an advanced-use feature, and likely not something you'll need to configure. What you probably want is the <a href="/docs/reference/types/">content types reference</a>!</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

The `group` field represents a group of values. This field is best used when there is a **single** group to be edited, typically with a single JSON object or nested frontmatter values. If there are multiple groups, checkout the [group-list](/docs/reference/toolkit/fields/group-list) field.

![tinacms-date-field](/img/fields/group.gif)

## Options

```typescript
import { Field } from '@tinacms/core'

interface GroupConfig {
  name: string
  component: 'group'
  label?: string
  fields: Field[]
}
```

| Option        | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'group'`                                             |
| `name`        | The path to some value in the data being edited.                                               |
| `fields`      | An array of [`Field`](/docs/reference/toolkit/fields) values that will render as a sub-menu.   |
| `label`       | A human readable label for the field. Defaults to the `name` _(Optional)_                      |
| `description` | Description that expands on the purpose of the field or prompts a specific action _(Optional)_ |

> ### FieldConfig
>
> This interfaces only shows the keys unique to the group field.
>
> Visit the [Field Config](/docs/reference/toolkit/fields) docs for a complete list of options.

## Definition

If the source JSON for the example contact info looked like this:

```json
{
  "contact": {
    "email": "hello@tinacms.org",
    "twitter_handle": "tinacms",
    "github_handle": "tinacms"
  }
}
```

Our form options would look like this:

```javascript
const formOptions = {
  label: 'Info Page',
  fields: [
    {
      label: 'Contact Info',
      name: 'rawJson.contact',
      description: 'Contact info',
      component: 'group',
      fields: [
        {
          label: 'Email',
          name: 'email',
          description: 'Contact email',
          component: 'text',
        },
        {
          label: 'Twitter',
          name: 'twitter_handle',
          description: 'Twitter handle',
          component: 'text',
        },
        {
          label: 'Github',
          name: 'github_handle',
          description: 'Github username',
          component: 'text',
        },
      ],
    },
    //...
  ],
}
```
