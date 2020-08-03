---
title: Inline Wysiwyg
prev: /docs/ui/inline-editing/inline-textarea
next: /docs/ui/inline-editing/inline-image
consumes:
  - file: /packages/react-tinacms-inline/src/inline-wysiwyg.tsx
    description: Shows InlineWysiwyg
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
  - file: /packages/react-tinacms-editor/src/Wysiwyg.tsx
    description: Depends on the Wysiwyg interface
  - file: /packages/react-tinacms-editor/src/Translator/index.ts
    description: Depends on the `Format` type
  - file: /packages/react-tinacms-editor/src/types.ts
    description: Depends on `ImageProps`
---

The `InlineWysiwyg` field represents a chunk of Markdown or HTML content.

## Install _react-tinacms-editor_

The `InlineWysiwyg` field is not a default field within `react-tinacms-inline`. In order to use it in your site you must install the `react-tinacms-editor` package:

```bash
yarn add react-tinacms-editor
```

## Definition

Below is an example of how an `InlineWysiwyg` field could be defined in an [Inline Form](/docs/ui/inline-editing).

```jsx
import ReactMarkdown from 'react-markdown'
import { useForm, usePlugin } from 'tinacms'
import { InlineForm } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'

// Example 'Page' Component
export function Page(props) {
  const [data, form] = useForm(props.data)
  usePlugin(form)
  return (
    <InlineForm form={form}>
      <InlineWysiwyg name="markdownBody" format="markdown">
        <ReactMarkdown source={data.markdownBody} />
      </InlineWysiwyg>
    </InlineForm>
  )
}
```

## Options

| Key           | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | The path to some value in the data being edited.                                                                                                                                                                                                                                                                                                                                                                |
| `children`    | Child components to render.                                                                                                                                                                                                                                                                                                                                                                                     |
| `sticky?`     | A boolean determining whether the Wysiwyg Toolbar 'sticks' to the top of the page on scroll.                                                                                                                                                                                                                                                                                                                    |
| `format?`     | This value denotes whether Markdown or HTML will be rendered.                                                                                                                                                                                                                                                                                                                                                   |
| `imageProps?` | Configures how images in the Wysiwyg are uploaded and rendered.                                                                                                                                                                                                                                                                                                                                                 |
| `focusRing`   | Either an object to style the focus ring or a boolean to show/hide the focus ring. Defaults to `true` which displays the focus ring with default styles. For style options, `offset` (in pixels) sets the distance from the ring to the edge of the component, and `borderRadius` (in pixels) controls the [rounded corners](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) of the focus ring. |

## Interface

```typescript
interface InlineWysiwygConfig {
  name: string
  children: any
  sticky?: boolean
  format?: 'markdown' | 'html'
  imageProps?: WysiwysImageProps
  focusRing?: boolean | FocusRingProps
}

interface WysiwygImageProps {
  upload?: (files: File[]) => Promise<string[]>
  previewUrl?: (url: string) => string
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}
```

<!-- TODO: Add better explanation (or example) of how to work with the Image Props -->
