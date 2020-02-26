---
title: Fields
prev: /docs/forms
next: /docs/inline-editing
---

Fields are added to forms via the `fields` array and create the editing interface of a form.

## Field Config

All field plugins share a common config:

```typescript
interface FieldConfig {
  name: string
  parse?: (value: any, name: string, field: Field) => any
  format?: (value: any, name: string, field: Field) => any
  component: string | ReactComponent
}
```

| key         | description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `name`      | Equivalent of an input's `name` attribute.                                                     |
| `component` | Either a string denoting a field already registered with the CMS, or a custom field component. |
| `parse`     | _Optional:_ Prepare the data for usage in the field component.                                 |
| `format`    | _Optional:_ Prepare the data for saving.                                                       |
