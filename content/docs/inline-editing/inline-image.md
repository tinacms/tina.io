---
title: Inline Image
prev: /docs/inline-editing/inline-wysiwyg
next: /docs/inline-editing/inline-group
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-image.tsx
    description: Shows InlineImage
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
---
The `InlineImage` field represents an image input. This field supports drag and drop upload, or via clicking on the image to select media from the local filesystem.

## Definition

Below is a simple example of how `InlineImage` could be implemented in in an [Inline Form](/docs/inline-editing).

```jsx
import ReactMarkdown from 'react-markdown'
import { useLocalForm } from 'tinacms'
import { InlineForm, InlineImage } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [data, form] = useLocalForm(props.data)
  return (
    <InlineForm form={form}>
      <InlineImage
        name="hero_image"
        parse={filename => `/images/${filename}`}
        uploadDir={() => '/public/images/'}
        previewSrc={formValues => {}}
      />
    </InlineForm>
  )
}
```

There are two ways to use `InlineImage`, with and without children. If no children are passed, `InlineImage` will render a default `img` element. However, you may want more control over the image behavior, in which case you can [**pass children**](/docs/inline-editing/inline-image#example) to `InlineImage`.

## Options

| Key | Description |
| --- | --- |
| `name` | The path to some value in the data being edited. |
| `parse` | Defines how the actual front matter or data value gets populated. The name of the file gets passed as an argument, and one can set the path this image as defined by the uploadDir property. |
| `uploadDir` | Defines the upload directory for the image. All of the post data is passed in, `fileRelativePath` is most useful in defining the upload directory, but you can also statically define the upload directory. |
| `previewSrc` | Defines the path for the src attribute on the image preview. If using gatsby-image, the path to the `childImageSharp.fluid.src` needs to be provided. |
| `focusRing` | Controls whether to display a focus outline. |
| `children` | Children need to be passed through the [Render Props](https://reactjs.org/docs/render-props.html) pattern to access `previewSrc`. |

***

## Interface

```typescript
interface InlineImageProps {
  name: string
  parse(filename: string): string
  uploadDir(form: Form): string
  previewSrc(formValues: any): string
  focusRing?: boolean
  children?: any
}
```

The `parse` function handles how the path gets written in the source data when a _new image_ is uploaded. `parse` is passed the filename of the newly uploaded image — `image.jpg`. A simple return value could look something like this:

```js
parse: filename => `/example-dir/${filename}`
```

The path **depends on where images live** in your project structure. `uploadDir` sets where those new images should live:

```js
uploadDir: () => `/example-dir`
```

The `previewSrc` provides a path for the image **when inline editing is active** (a.k.a when the [CMS is enabled](https://tinacms.org/docs/cms#disabling--enabling-the-cms)). When inline editing is not active (`cms.enabled === false`), the image will reference the path in the source data. `previewSrc` is passed **current form values** as its first argument.

## Examples

### _previewSrc_ with blocks

If using `InlineImage` as a block, use these values, along with the block `index` to target the proper image source from the data.

```js
/**
 * `index` is passed as props to the block component
 * that renders the inline image
 */
function ImageBlock({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="image-block">
        <InlineImage
          name="src"
          parse={filename => `/assets/${filename}`}
          uploadDir={() => '/public/assets'}
          previewSrc={formValues => `${formValues.blocks[index].left.src}`}
          focusRing={false}
        />
      </div>
    </BlocksControls>
  )
}
```

The return value should be the entire path to the image from the source data — e.g. `/example-dir/image.jpg`.

### Accessing block index in the template fields

Using the `index` in the `previewSrc` to target the correct block is very helpful. While `index` is passed to the _Block Component_, it is not directly available in the _Block Template_.

One way to work around this is to access the second argument, `input`. Manipulate the form input data to get the index of the current field.

See the example below for a variation on getting the block index:

**components/Images.js**

```jsx
export const imagesBlock = {
  Component: Images,
  template: {
    //... Other block template config
    fields: [
      {
        name: 'left.src',
        label: 'Left-Hand Image',
        component: 'image',
        parse: filename => `/${filename}`,
        uploadDir: () => '/',
        previewSrc: (formValues, input) => {
          /**
           * Get index from field input. Assumes the block
           * is only one level deep
           */
          const index = input.field.name.split('.')[1]
          /**
           * Use that index to target the correct
           * block in `formValues`
           */
          const currentBlockImage = formValues.blocks[index].left.src
          return currentBlockImage
        },
        focusRing: false,
      },
      {
        name: 'left.alt',
        label: 'Left-Hand Image Alt Text',
        component: 'text',
      },
      {
        name: 'right.src',
        label: 'Right-Hand Image',
        component: 'image',
        parse: filename => `/${filename}`,
        uploadDir: () => '/',
        previewSrc: (formValues, input) => {
          const index = input.field.name.split('.')[1]
          const currentBlockImage = formValues.blocks[index].right.src
          return currentBlockImage
        },
        focusRing: false,
      },
      {
        name: 'right.alt',
        label: 'Right-Hand Image Alt Text',
        component: 'text',
      },
    ],
  },
}
```

### Passing children with Gatsby Image

Below is an example of how you could **pass children** as a to `InlineImage` to work with _Gatsby Image_. Notice how _children_ **need to be passed via** [**render props**](https://reactjs.org/docs/render-props.html). 

The return value from the `previewSrc` function is passed as a prop. You can use this as the Img src when the CMS is enabled. This allows it so when new images are uploaded, the correct `previewSrc` should render. A fallback `src` should be provided based on the form data — this will be the `src` when the CMS is disabled.

Read more on [proper image paths](/docs/fields/image#proper-image-paths-in-gatsby) in Gatsby to get context on the `parse` & `uploadDir` configuration.

```jsx
import {
  Inlineform,
  InlineImage,
  InlineTextareaField,
} from 'react-tinacms-inline'
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'
import Img from 'gatsby-image'

// Using InlineImage with Gatsby Image
export function Hero({ data }) {
  const [post, form] = useRemarkForm(data.markdownRemark)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <InlineImage
        name="rawFrontmatter.thumbnail"
        parse={filename => (filename ? `./${filename}` : null)}
        uploadDir={blogPost => {
          const postPathParts = blogPost.initialValues.fileRelativePath.split(
            '/'
          )

          const postDirectory = postPathParts
            .splice(0, postPathParts.length - 1)
            .join('/')

          return postDirectory
        }}
        previewSrc={formValues => {
          const preview =
            formValues.frontmatter.thumbnail.childImageSharp.fluid.src
          return preview
        }}
      >
        {props => (
          <Img
            fluid={props?.previewSrc || post.frontmatter.thumbnail.childImageSharp.fluid}
            alt="Gatsby can't find me"
            {...props}
          />
        )}
      </InlineImage>
      <h1>
        <InlineTextareaField name="rawFrontmatter.title" />
      </h1>
    </InlineForm>
  )
}
```

<!-- TODO: no way to edit alt text? implement and make example-->