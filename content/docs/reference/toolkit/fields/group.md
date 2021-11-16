---
title: Group Field
prev: /docs/reference/toolkit/fields/select
next: /docs/reference/toolkit/fields/group-list
consumes:
  - file: /packages/tinacms/src/plugins/fields/GroupFieldPlugin.tsx
    details: Shows group field interface and how to use
---

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

Below is an example of how a `group` field could be defined in a Gatsby JSON form. Read more on passing in JSON form field options [here](/guides/gatsby/git/customize-form).

If the source JSON for the example contact info looked like this:

```json
{
  "contact": {
    "email": "hello@tinacms.org",
    "twitter_handle": "tina_cms",
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
