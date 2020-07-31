---
title: Inline Text
prev: /docs/ui/inline-editing
next: /docs/ui/inline-editing/inline-textarea
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-text.tsx
    description: Shows InlineText
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
---

The `InlineText` component represents a **single line text input**. It should be used for content values that are short strings, for example, a page title.

## Definition

Below is an example of how `InlineText` may be used in an [Inline Form](/docs/ui/inline-editing).

```jsx
import { useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineText } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [, form] = useForm(props.data)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <h1>
        <InlineText name="title" />
      </h1>
    </InlineForm>
  )
}
```

> **Note**: Some Inline Field [styles can be extended](/docs/ui/inline-editing#extending-inline-field-styles) or overridden via _Styled Components_.

## Options

| Key         | Description                                                                                                                                                                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | The path to some value in the data being edited.                                                                                                                                                                                                                                                                                   |
| `className` | To set styles directly on the input or extend via [styled components](/docs/ui/inline-editing#extending-inline-field-styles).                                                                                                                                                                                                      |
| `focusRing` | Either an object to style the focus ring or `false`, which hides the focus ring entirely. For styles, `offset` (in pixels) controls the distance from the ring to the edge of the group; `borderRadius`(in pixels) controls the [rounding](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) edge of the focus ring. |

## Interface

```typescript
interface InlineTextProps {
  name: string
  className?: string
  focusRing?: boolean | FocusRingProps
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}
```
