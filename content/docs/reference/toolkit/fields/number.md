---
title: Number Field
prev: /docs/reference/toolkit/fields/textarea
next: /docs/reference/toolkit/fields/image
consumes:
  - file: /packages/@tinacms/fields/src/plugins/NumberFieldPlugin.tsx
    details: Shows text field interface and config options
  - file: /packages/@tinacms/fields/src/components/NumberField.ts
    details: Shows text field interface and config options
---

<div class="short-code-warning">
   <div>
      <p>This is an advanced-use feature, and likely not something you'll need to configure. What you probably want is the <a href="/docs/reference/types/">content types reference</a>!</p>
   </div>
   <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z"></path>
   </svg>
</div>

The `number` field represents a number input.

![tinacms-number-field](/img/fields/number-field.png)

## Options

```typescript
interface NumberConfig extends FieldConfig {
  component: 'number'
  name: string
  label?: string
  description?: string
  step?: string | number
}
```

| Option        | Description                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'number'`.                                            |
| `name`        | The path to some value in the data being edited.                                                |
| `label`       | A human readable label for the field. Defaults to the `name`. _(Optional)_                      |
| `description` | Description that expands on the purpose of the field or prompts a specific action. _(Optional)_ |
| `step`        | The interval used when using the up and down arrows to adjust the value. _(Optional)_           |

> This interfaces only shows the keys unique to the number field.
>
> Visit the [Field Config](/docs/reference/toolkit/fields) docs for a complete list of options.

## Example: A Sorting Weight

Below is an example of how a `number` field could be used to edit a `weight` value used for sorting blog posts.

```javascript
const BlogPostForm = {
  fields: [
    {
      component: 'number',
      name: 'weight',
      label: 'Weight',
      description: 'Enter a weight for post sorting',
      step: 1,
    },
    // ...
  ],
}
```
