---
title: Fields
prev: /docs/forms
next: /docs/media
---
Fields are added to forms via the `fields` array and create the editing interface of a form.

## Field Config

All field plugins share a common config:

```typescript
interface FieldConfig {
  name: string
  Component: string | ReactComponent
```

```typescript
  parse?: (value: any, name: string, field: Field) => any
  format?: (value: any, name: string, field: Field) => any
```

```typescript
  validate
}
```

| key | description |
| --- | --- |
| `name` | Equivalent of an input's `name` attribute. |
| `Component` | Either a string denoting a field already registered with the CMS, or a custom field component. |
| `parse` | _Optional:_ Prepare the data for usage in the field component. |
| `format` | _Optional:_ Prepare the data for saving. |
