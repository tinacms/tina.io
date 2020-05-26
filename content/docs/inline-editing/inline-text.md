---
title: Inline Text Field
prev: /docs/inline-editing
next: /docs/inline-editing/inline-textarea
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-text.tsx
    description: Shows InlineTextField
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
---
The `InlineTextField` component represents a **single line text input**. It should be used for content values that are short strings, for example, a page title.

## Definition

Below is an example of how `InlineTextField` may be used in an [Inline Form](/docs/inline-editing).

```jsx
import { useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineTextField } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [, form] = useForm(props.data)
  
  usePlugin(form)
  
  return (
    <InlineForm form={form}>
      <h1>
        <InlineTextField name="title" />
      </h1>
    </InlineForm>
  )
}
```

> **Note**: Some Inline Field [styles can be extended](/docs/inline-editing#extending-inline-field-styles) or overridden via _Styled Components_.

## Options

| Key | Description |
| --- | --- |
| `name` | The path to some value in the data being edited. |

## Interface

```typescript
export interface InlineTextFieldProps {
  name: string
}
```