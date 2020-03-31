---
title: Inline Text Block
prev: /docs/inline-blocks
next: /docs/inline-blocks/block-textarea
consumes:
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-field-controls.tsx
    description: Uses BlocksControls
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-text.tsx
    description: Shows BlockText examples
  - file: /packages/react-tinacms-inline/src/inline-field-text.tsx
    description: Depends on inline text field config
---

Inline `BlockText` represents a **single line text input**. It should be used for content values that are short strings, for example, a page title.

## Definition

Below is an example of how `BlockText` may be used in a [Block Component](/docs/inline-blocks#block-component) definition.

```jsx
import styled from 'styled-components'
import { BlocksControls, BlockTextArea } from 'react-tinacms-inline'

// Example 'Tagline' Block
export function Tagline(props) {
  return (
    <BlocksControls index={props.index}>
      <h2>
        <BlockText name="tagline" />
      </h2>
    </BlocksControls>
  )
}
```

> **Note**: Block Field [styles can be extended](https://tinacms.org/docs/inline-blocks#extending-block-field-styles) or overridden via _Styled Components_.

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
