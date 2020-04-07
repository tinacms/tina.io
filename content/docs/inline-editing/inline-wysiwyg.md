---
title: Inline Wysiwyg
prev: /docs/inline-editing/inline-textarea
next: /docs/inline-editing/inline-image
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

## Definition

Below is an example of how an `InlineWysiwyg` field could be defined in an [Inline Form](/docs/inline-editing).

```jsx
import ReactMarkdown from 'react-markdown'
import { useLocalForm } from 'tinacms'
import { InlineForm, InlineWysiwyg } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [data, form] = useLocalForm(props.data)
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

| Key           | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| `name`        | The path to some value in the data being edited.                                             |
| `children`    | Child components to render.                                                                  |
| `sticky?`     | A boolean determining whether the Wysiwyg Toolbar 'sticks' to the top of the page on scroll. |
| `format?`     | This value denotes whether Markdown or HTML will be rendered.                                |
| `imageProps?` | Configures how images in the Wysiwyg are uploaded and rendered.                              |

## Interface

```typescript
interface InlineWysiwygConfig {
  name: string
  children: any
  sticky?: boolean
  format?: 'markdown' | 'html'
  imageProps?: WysiwysImageProps
}

interface WysiwygImageProps {
  upload?: (files: File[]) => Promise<string[]>
  previewUrl?: (url: string) => string
}
```

<!-- TODO: Add better explanation (or example) of how to work with the Image Props -->
