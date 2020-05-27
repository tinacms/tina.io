---
title: Inline Textarea Field
prev: /docs/inline-editing/inline-text
next: /docs/inline-editing/inline-wysiwyg
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-textarea.tsx
    description: Shows InlineTextarea
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
---

The `InlineTextarea` component represents a **multi-line text input**. It should be used for content values that are long strings: for example, a page description.

## Definition

Below is an example of how `InlineTextarea` may be used in an [Inline Form](/docs/inline-editing).

```jsx
import { useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineTextarea } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [, form] = useForm(props.data)
  usePlugin(form)
  return (
    <InlineForm form={form}>
      <h3>
        <InlineTextarea name="title" />
      </h3>
    </InlineForm>
  )
}
```

> **Note**: Some Inline Field [styles can be extended](/docs/inline-editing#extending-inline-field-styles) or overridden via _Styled Components_.

## Options

| Key         | Description                                      |
| ----------- | ------------------------------------------------ |
| `name`      | The path to some value in the data being edited. |
| `focusRing` | Controls whether to display a focus outline      |

## Interface

```typescript
interface InlineTextareaProps {
  name: string
  focusRing?: boolean
}
```
