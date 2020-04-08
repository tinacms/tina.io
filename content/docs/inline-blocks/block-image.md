---
title: Inline Image Block
prev: /docs/inline-blocks/block-textarea
next:
consumes:
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-field-controls.tsx
    description: Uses BlocksControls
  - file: /packages/react-tinacms-inline/src/blocks/inline-block-image.tsx
    description: Shows BlockImage examples
  - file: /packages/react-tinacms-inline/src/inline-field-image.tsx
    description: Depends on inline image field config
---

The Inline `BlockImage` field represents an image input. This field supports drag and drop upload, or via clicking on the image to select media from the local filesystem.

## Definition

Below is a simple example of how `BlockImage` could be implemented in a [Block Component](/docs/inline-blocks#block-component) definition.

```jsx
import { BlocksControls, BlockImage } from 'react-tinacms-inline'

export function Image({ index }) {
  return (
    <BlocksControls index={index}>
      <BlockImage
        name="src"
        parse={filename => `/img/${filename}`}
        uploadDir={() => '/public/img/'}
      />
    </BlocksControls>
  )
}
```

There are two ways to use `BlockImage`, with and without children. If no children are passed, `BlockImage` will render a default `img` element. However, you may want more control over the image behavior, in which case you can [**pass children**](/docs/inline-blocks/block-image#example) to `Block Image`.

> **Tip**: Reference [this example](/docs/inline-blocks#using-the-settings-modal) to see how **alt text metadata** could be configured via the _Settings Modal_.

## Options

| Key         | Description                                                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | The path to some value in the data being edited.                                                                                                                                                            |
| `parse`     | Defines how the actual front matter or data value gets populated. The name of the file gets passed as an argument, and one can set the path this image as defined by the uploadDir property.                |
| `uploadDir` | Defines the upload directory for the image. All of the post data is passed in, `fileRelativePath` is most useful in defining the upload directory, but you can also statically define the upload directory. |
| `children`  | Any child elements.                                                                                                                                                                                         |

---

## Interface

```typescript
export interface InlineImageProps {
  name: string
  parse(filename: string): string
  uploadDir(form: Form): string
  children?: any
}
```

## Example

Below is an example of how you could **pass children** to `BlockImage` to work with _Gatsby Image_. Read more on [proper image paths](/docs/fields/image#proper-image-paths-in-gatsby) in Gatsby to get context on the `parse` & `uploadDir` configuration.

```jsx
import { BlocksControls, BlockImage } from 'react-tinacms-inline'
import Img from 'gatsby-image'

// Using BlockImage with Gatsby Image
export function Image({ data, index }) {
  return (
    <BlocksControls index={index}>
      <BlockImage
        name="thumbnail"
        parse={filename => (filename ? `./${filename}` : null)}
        uploadDir={blogPost => {
          // Upload the image to the same directory as the source file
          const postPathParts = blogPost.initialValues.fileRelativePath.split(
            '/'
          )
          const postDirectory = postPathParts
            .splice(0, postPathParts.length - 1)
            .join('/')

          return postDirectory
        }}
      >
        <Img fluid={data.thumbnail.childImageSharp.fluid} alt={data.alt} />
      </BlockImage>
    </BlocksControls>
  )
}
```
