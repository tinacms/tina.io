---
title: Field Plugins
prev: /docs/plugins/forms
next: /docs/plugins/content-creators
---

Fields are added to forms via the `fields` array and create the editing interface of a form.

## Field Config

All field plugins share a common config:

```typescript
interface FieldConfig {
  name: string
  component: string | ReactComponent
  parse?(value: any, name: string, field: Field): any
  format?(value: any, name: string, field: Field): any
  validate?(
    value: any,
    allValues: any,
    meta: any,
    field: Field
  ): string | object | undefined
}
```

| key         | description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `name`      | Equivalent of an input's `name` attribute.                                                     |
| `component` | Either a string denoting a field already registered with the CMS, or a custom field component. |
| `parse`     | _Optional:_ Prepare the data for usage in the field component.                                 |
| `format`    | _Optional:_ Prepare the data for saving.                                                       |
| `validate`  | _Optional:_ Return undefined when valid. Return a string or an object when there are errors.   |
