---
title: Inline Image Block
next: /docs/inline-blocks/block-image
consumes:
---

The Inline `BlockImage` field represents an image input. This field supports drag and drop upload, or via clicking on the image to select media from the local filesystem.

## Definition

Below is a simple example of how `BlockImage` could be implemented in a [Block Component](/docs/inline-blocks#block-component) definition.

```jsx
import { BlocksControls, BlockImage } from 'react-tinacms-inline'

// Default use of BlockImage, without children
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

## Examples

`BlockImage` will also **pass it's children**. Below is an example of how you could use this with _Gatsby Image_.

```jsx
import { BlocksControls, BlockImage } from 'react-tinacms-inline'
import Img from 'gatsby-image'

// Default use of BlockImage, without children
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
