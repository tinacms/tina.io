---
title: Image Field
prev: /docs/plugins/fields/date
next: /docs/plugins/fields/color
consumes:
  - file: /packages/tinacms/src/plugins/fields/ImageFieldPlugin.tsx
    details: Shows image field interface and how to use
  - file: /packages/@tinacms/fields/src/ImageUpload/ImageUpload.tsx
    details: References the image field and upload config
---

The `image` field is used for content values that point to an image used on the page. This field allows you to upload new images by via dragging or selection in Finder. Note this field does not handle any images included in the Markdown body, those would be handled by the [markdown](/docs/plugins/fields/markdown) component.

![tinacms-image-field](/img/fields/image.png)

## Definition

```typescript
interface ImageConfig {
  component: 'image'
  name: string
  label?: string
  description?: string
  parse(filename: string): string
  previewSrc(formValues: any): string
  uploadDir(formValues: any): string
}
```

---

| Key           | Description                                                                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component`   | The name of the plugin component. Always `'image'`.                                                                                                                                                         |
| `name`        | The path to some value in the data being edited.                                                                                                                                                            |
| `label`       | A human readable label for the field. Defaults to the `name`. _(Optional)_                                                                                                                                  |
| `description` | Description that expands on the purpose of the field or prompts a specific action. _(Optional)_                                                                                                             |
| `parse`       | Defines how the actual front matter or data value gets populated. The name of the file gets passed as an argument, and one can set the path this image as defined by the uploadDir property.                |
| `previewSrc`  | Defines the path for the src attribute on the image preview. If using gatsby-image, the path to the `childImageSharp.fluid.src` needs to be provided.                                                       |
| `uploadDir`   | Defines the upload directory for the image. All of the post data is passed in, `fileRelativePath` is most useful in defining the upload directory, but you can also statically define the upload directory. |

---

> This interfaces only shows the keys unique to the image field.
>
> Visit the [Field Config](/docs/plugins/fields) docs for a complete list of options.

## Examples

Below is an example of how a `image` field could be defined in a Gatsby Remark form. Read more on passing in form field options in the [Gatsby Markdown Docs](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
import get from 'lodash.get'

const BlogPostForm = {
  fields: [
    {
      name: 'rawFrontmatter.thumbnail',
      label: 'Thumbnail',
      component: 'image',

      previewSrc: (formValues, { input }) => {
        const path = input.name.replace('rawFrontmatter', 'frontmatter')
        const gatsbyImageNode = get(formValues, path)
        if (!gatsbyImageNode) return ''
        //specific to gatsby-image
        return gatsbyImageNode.childImageSharp.fluid.src
      },

      uploadDir: () => {
        return '/content/images/'
      },

      parse: filename => `../images/${filename}`,
    },
    // ...
  ],
}
```

### Proper Image Paths in Gatsby

In order for image paths to be properly sourced into GraphQL, it's best if a _relative path_ to the image is saved to the content file's front matter. Constructing this relative path will depend on where the image is uploaded to as well as the location of the content file. The following example uses a colocation strategy, where a blog post is stored in `content/blog/$slug/index.md` and its images will be uploaded to `content/blog/$slug/$image.png`:

```javascript
import get from 'lodash.get'
const path = require('path').posix

const BlogPostForm = {
  fields: [
    {
      name: 'rawFrontmatter.thumbnail',
      label: 'Thumbnail',
      component: 'image',
      previewSrc: (formValues, { input }) => {
        const path = input.name.replace('rawFrontmatter', 'frontmatter')
        const gatsbyImageNode = get(formValues, path)
        if (!gatsbyImageNode) return ''
        //specific to gatsby-image
        return gatsbyImageNode.childImageSharp.fluid.src
      },

      // upload images to same directory as content file
      uploadDir: blogPost => path.dirname(blogPost.fileRelativePath),

      // image file is sibling of content file
      parse: filename => `./${filename}`,
    },
    // ...
  ],
}
```
