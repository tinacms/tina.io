---
title: Inline Image
prev: /docs/ui/inline-editing/inline-wysiwyg
next: /docs/ui/inline-editing/inline-group
consumes:
  - file: /packages/react-tinacms-inline/src/inline-field-image.tsx
    description: Shows InlineImage
  - file: /packages/react-tinacms-inline/src/inline-field.tsx
    description: Depends on InlineField
last_edited: '2020-09-24T18:11:37.665Z'
---

The `InlineImage` field represents an image input. This field supports drag and drop upload, or via clicking on the image to select media from the local filesystem.

## Definition

Below is a simple example of how `InlineImage` could be implemented in in an [Inline Form](/docs/ui/inline-editing).

```jsx
import ReactMarkdown from 'react-markdown'
import { useForm, usePlugin } from 'tinacms'
import { InlineForm, InlineImage } from 'react-tinacms-inline'

// Example 'Page' Component
export function Page(props) {
  const [data, form] = useForm(props.data)
  usePlugin(form)
  return (
    <InlineForm form={form}>
      <InlineImage
        name="hero_image"
        parse={media => media.id}
        uploadDir={() => '/public/images/'}
        alt="hero-image"
      />
    </InlineForm>
  )
}
```

There are two ways to use `InlineImage`, with and without children. If no children are passed, `InlineImage` will render a default `img` element. However, you may want more control over the image behavior, in which case you can [**pass children**](/docs/ui/inline-editing/inline-image#example) to `InlineImage`.

## Options

| Key          | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | The path to some value in the data being edited.                                                                                                                                                                                                                                                                                                                                                                           |
| `parse`      | Defines how the actual front matter or data value gets populated. The name of the file gets passed as an argument, and one can set the path this image as defined by the uploadDir property.                                                                                                                                                                                                                               |
| `uploadDir`  | _Optional_ Defines the upload directory for the image. All of the post data is passed in, `fileRelativePath` is most useful in defining the upload directory, but you can also statically define the upload directory.                                                                                                                                                                                                     |
| `previewSrc` | _Optional_ Defines the path for the src attribute on the image preview. If using gatsby-image, the path to the `childImageSharp.fluid.src` needs to be provided. This defaults to the MediaStore's `previewSrc` method.                                                                                                                                                                                                    |
| `focusRing`  | _Optional_ Either an object to style the focus ring or a boolean to show/hide the focus ring. Defaults to `true` which displays the focus ring with default styles. For style options, `offset` (in pixels) sets the distance from the ring to the edge of the component, and `borderRadius` (in pixels) controls the [rounded corners](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) of the focus ring. |
| `className`  | _Optional_ A string associated with a CSS class to extend the inline image container styled component.                                                                                                                                                                                                                                                                                                                     |
| `alt`        | _Optional_ A string to pass for the alt attribute of the `img` element when not using the Render Props pattern.                                                                                                                                                                                                                                                                                                            |
| `children`   | _Optional_ Children need to be passed through the [Render Props](https://reactjs.org/docs/render-props.html) pattern to access `src`.                                                                                                                                                                                                                                                                                      |

---

## Interface

```typescript
interface InlineImageProps {
  name: string
  parse(media: Media): string
  uploadDir?(form: Form): string
  previewSrc?(
    src: string,
    fieldPath?: string,
    formValues?: any
  ): Promise<string> | string
  focusRing?: boolean | FocusRingProps
  className?: string
  alt?: string
  children?: ImageRenderChildren
}

interface FocusRingProps {
  offset?: number | { x: number; y: number }
  borderRadius?: number
}

interface ImageRenderChildrenProps {
  src?: string
}

type ImageRenderChildren = (props: ImageRenderChildrenProps) => React.ReactNode
```

The `parse` function handles how the path gets written in the source data when a _new image_ is uploaded. `parse` is passed the [media object](/docs/media) for the newly uploaded image. A simple return value could look something like this:

```js
parse: media => media.id
```

The path **depends on where images live** in your project structure. `uploadDir` sets where those new images should live:

```js
uploadDir: () => `/example-dir`
```

The `previewSrc` provides a path for the image **when inline editing is active** (a.k.a when the [CMS is enabled](https://tinacms.org/docs/cms#disabling--enabling-the-cms)). When inline editing is not active (`cms.enabled === false`), the image will reference the path in the source data.

`previewSrc` is passed the current field value, the field path, and current form values. The return value should be the entire path to the image from the source data — e.g. `/example-dir/image.jpg`.

> You can [extend styles](/docs/ui/inline-editing#extending-inline-field-styles) of the `InlineImage` container via styled-components or with a `className`.

## Examples

### Image Block

Below is an example of an Inline Image field used in an [Inline Block](/docs/ui/inline-editing/inline-blocks/) in a Next.js project.

```js
import { useCMS } from 'tinacms'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'

export function Image({ data, index }) {
  const cms = useCMS()

  return (
    <div className="block">
      <BlocksControls
        index={index}
        focusRing={{ offset: { x: 0, y: 0 }, borderRadius: 0 }}
        insetControls
      >
        <InlineImage
          name="src"
          previewSrc={fieldValue => cms.media.previewSrc(`public${fieldValue}`)}
          parse={media => `/img/${media.filename}`}
          uploadDir={() => '/public/img/'}
          className="img--wrap"
          alt={data.alt}
          focusRing={false}
        />
      </BlocksControls>
    </div>
  )
}
```

The `className` will apply corresponding styles to the Inline Image container div. In this case, the `focusRing` is false because the

### Render Props Pattern

Below is the same example, refactored to use the [Render Props pattern](https://reactjs.org/docs/render-props.html):

```js
import { useCMS } from 'tinacms'
import { BlocksControls, InlineImage } from 'react-tinacms-inline'

export function Image({ data, index }) {
  const cms = useCMS()

  return (
    <div className="block">
      <BlocksControls
        index={index}
        focusRing={{ offset: { x: 0, y: 0 }, borderRadius: 0 }}
        insetControls
      >
        <InlineImage
          name="src"
          previewSrc={fieldValue => cms.media.previewSrc(`public${fieldValue}`)}
          parse={media => `/img/${media.filename}`}
          uploadDir={() => '/public/img/'}
          className="img--wrap"
          focusRing={false}
        >
          {props => <img src={props.src} alt={data.alt} />}
        </InlineImage>
      </BlocksControls>
    </div>
  )
}
```

With this pattern, the `src` is passed as a prop to the render children. The value of `src` will either be the return value from the `previewSrc` function (when the CMS is enabled) or the value stored in the source data (when the CMS is disabled).

### Using Gatsby Image

Below is an example of how you could **pass children** as a to `InlineImage` to work with _Gatsby Image_. Notice how _children_ **need to be passed via** [**render props**](https://reactjs.org/docs/render-props.html).

You'll notice that this component looks a bit different with its handling of `src`. Since with Gatsby Image, the path to the image is transformed, you'll need to provide a fallback `src` that references the transformed path from `childImageSharp`.

Also, the `previewSrc` function uses the third argument, `formValues` to access the entire form and retrieve the transformed, `childImageSharp` path.

Read more on [proper image paths](/docs/plugins/fields/image#proper-image-paths-in-gatsby) in Gatsby to get context on the `parse` & `uploadDir` configuration.

```jsx
import { InlineForm, InlineImage } from 'react-tinacms-inline'
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin, useCMS } from 'tinacms'
import Img from 'gatsby-image'

// Using InlineImage with Gatsby Image
export function Hero({ data }) {
  const cms = useCMS()
  const [post, form] = useRemarkForm(data.markdownRemark)

  usePlugin(form)

  return (
    <InlineForm form={form}>
      <InlineImage
        name="rawFrontmatter.thumbnail"
        parse={media => (media.filename ? `./${filename}` : null)}
        uploadDir={blogPost => {
          const postPathParts = blogPost.initialValues.fileRelativePath.split(
            '/'
          )

          const postDirectory = postPathParts
            .splice(0, postPathParts.length - 1)
            .join('/')

          return postDirectory
        }}
        previewSrc={(fieldValue, fieldPath, formValues) =>
          formValues.frontmatter.thumbnail.childImageSharp.fluid.src
        }
      >
        {props => (
          <Img
            fluid={
              cms.enabled
                ? props.src
                : post.frontmatter.thumbnail.childImageSharp.fluid
            }
            alt="Gatsby can't find me"
            {...props}
          />
        )}
      </InlineImage>
    </InlineForm>
  )
}
```
