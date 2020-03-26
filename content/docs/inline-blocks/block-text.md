---
title: Inline Text Block
prev: /docs/inline-blocks
next: /docs/inline-blocks/block-textarea
consumes:
---

Inline `BlockText` represents a single line text input. It should be used for content values that are short strings: for example, a page title.

## Definition

Below is an example of how `BlockText` may be used in a [Block Component](/docs/inline-blocks#block-component) definition.

> **Note:** Styles can be overwritten or extended via _Styled Components_ as in the example below, or the `BlockText` field can just be called directly.

```jsx
import styled from 'styled-components'
import { BlocksControls, BlockTextArea } from 'react-tinacms-inline'

// Example 'Tagline' Block
export function Tagline(props) {
  return (
    <BlocksControls index={props.index}>
      <h2>
        <StyledBlockText name="tagline" />
      </h2>
    </BlocksControls>
  )
}

// Extended BlockText styles
const StyledBlockText = styled(BlockText)`
  color: green;
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
