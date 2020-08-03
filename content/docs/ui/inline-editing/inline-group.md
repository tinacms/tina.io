---
title: Inline Group
prev: /docs/ui/inline-editing/inline-image
next: /docs/ui/inline-editing/inline-blocks
consumes:
---

The `InlineGroup` represents a collection of inline fields. It serves as a wrapper for providing additional UI for inline elements outside of blocks. This group provides its own _simple controls_ — exposing the ability to display a **modal with additional form fields**.

## Definition

Below is an example of how `InlineGroup` may be used in an [Inline Form](/docs/ui/inline-editing).

```jsx
import { useForm, usePlugin } from 'tinacms'
import {
  InlineForm,
  InlineGroup,
} from 'react-tinacms-inline'

// Example 'Hero' Component
export function Hero(props) {
  const [data, form] = useForm(props.data)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <InlineGroup
        name="hero"
        fields={[
          {
            name: 'typography.style',
            label: 'Type Style',
            description: 'Select a type style for the hero copy',
            component: 'select',
            options: ['Swiss-Style','Art-Nouveau', 'Command-Line'],
          },
          {
            name: 'typography.color',
            label: 'Type Color',
            description: 'Select a color for the hero copy',
            component: 'color'
            widget: 'block'
            colors: ['#404040', '#ff0000', '#1B1E25'],
          },
        ]}
        >
          <HeroCopy typography={data.hero.typography}>
            <InlineText focusRing={false} name="heroCopy" />
          </HeroCopy>
      </InlineGroup>
    </InlineForm>
  )
}
```

This example assumes your data looks something like this:

```json
{
  "hero": {
    "heroCopy": "Call me Ishmael",
    "typography": {
      "style": "Swiss-Style",
      "color": "#1B1E25"
    }
  }
}
```

## Options

| Key             | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | The path to some value in the data being edited. If no value is provided, the child fields will reference the root of the source file.                                                                                                                                                                                                                                                                          |
| `fields`        | An array of [Tina Fields](/docs/plugins/fields) to display in a settings modal form.                                                                                                                                                                                                                                                                                                                            |
| `insetControls` | A boolean to denote whether the group controls display within or outside the group.                                                                                                                                                                                                                                                                                                                             |
| `focusRing`     | Either an object to style the focus ring or a boolean to show/hide the focus ring. Defaults to `true` which displays the focus ring with default styles. For style options, `offset` (in pixels) sets the distance from the ring to the edge of the component, and `borderRadius` (in pixels) controls the [rounded corners](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) of the focus ring. |
| `children`      | Any child elements.                                                                                                                                                                                                                                                                                                                                                                                             |

## Interface

```typescript
interface InlineGroupProps {
  name: string
  fields: TinaField[]
  insetControls?: boolean
  focusRing?: boolean | FocusRingProps
  children?: any
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}
```
