---
title: Inline Textarea
prev: /docs/ui/inline-editing/inline-text
next: /docs/ui/inline-editing/inline-wysiwyg
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-textarea.tsx
    description: Shows InlineTextarea
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
---

The `InlineTextarea` component represents a **multi-line text input**. It should be used for content values that are long strings: for example, a page description.

## Definition

Below is an example of how `InlineTextarea` may be used in an [Inline Form](/docs/ui/inline-editing).

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

> **Note**: Some Inline Field [styles can be extended](/docs/ui/inline-editing#extending-inline-field-styles) or overridden via _Styled Components_.

## Options

| Key         | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | The path to some value in the data being edited.                                                                                                                                                                                                                                                                                                                                                                |
| `className` | To set styles directly on the input or extend via [styled components](/docs/ui/inline-editing#extending-inline-field-styles).                                                                                                                                                                                                                                                                                   |
| `focusRing` | Either an object to style the focus ring or a boolean to show/hide the focus ring. Defaults to `true` which displays the focus ring with default styles. For style options, `offset` (in pixels) sets the distance from the ring to the edge of the component, and `borderRadius` (in pixels) controls the [rounded corners](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) of the focus ring. |

## Interface

```typescript
interface InlineTextareaProps {
  name: string
  className?: string
  focusRing?: boolean | FocusRingProps
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}
```
