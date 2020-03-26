---
title: Inline Textarea Block
prev: /docs/inline-blocks/block-text
next: /docs/inline-blocks/block-image
consumes:
---

Inline `BlockTextarea` represents a multiline text input. It should be used for content values that are long strings: for example, a page description.

## Definition

Below is an example of how `BlockTextarea` may be used in a [Block Component](/docs/inline-blocks#block-component) definition.

> **Note:** Styles can be overwritten or extended via _Styled Components_ as in the example below, or the `BlockTextarea` field can just be called directly.

```jsx
import styled from 'styled-components'
import { BlocksControls, BlockTextArea } from 'react-tinacms-inline'

// Example 'SupportCopy' Block
export function SupportCopy({ index }) {
  return (
    <BlocksControls index={index}>
      <h3>
        <StyledBlockTextarea name="support_copy" />
      </h3>
    </BlocksControls>
  )
}

// Extended BlockTextarea styles
const StyledBlockText = styled(BlockTextarea)`
  text-align: center;
  margin: 1rem 0;
`
```

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
