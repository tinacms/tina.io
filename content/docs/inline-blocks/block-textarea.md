---
title: Inline Textarea Block
prev: /docs/inline-blocks/block-text
next: /docs/inline-blocks/block-image
consumes:
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-field-controls.tsx
    description: Uses BlocksControls
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-textarea.tsx
    description: Shows BlockTextarea examples
  - file: /packages/react-tinacms-inline/src/inline-field-textarea.tsx
    description: Depends on inline textarea field config
---

Inline `BlockTextarea` represents a multiline text input. It should be used for content values that are long strings: for example, a page description.

## Definition

Below is an example of how `BlockTextarea` may be used in a [Block Component](/docs/inline-blocks#block-component) definition.

```jsx
import { BlocksControls, BlockTextArea } from 'react-tinacms-inline'

// Example 'SupportCopy' Block
export function SupportCopy({ index }) {
  return (
    <BlocksControls index={index}>
      <h3>
        <BlockTextarea name="support_copy" />
      </h3>
    </BlocksControls>
  )
}
```

> **Note**: Block Field [styles can be extended](/docs/inline-blocks#extending-block-field-styles) or overridden via _Styled Components_.

## Options

| Key    | Description                                      |
| ------ | ------------------------------------------------ |
| `name` | The path to some value in the data being edited. |

## Interface

```typescript
export interface BlockTextProps {
  name: string
}
```
