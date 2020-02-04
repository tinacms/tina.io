---
title: Image Field
prev: /docs/fields/date
next: /docs/fields/color
consumes:
  - file: /packages/tinacms/src/plugins/fields/ImageFieldPlugin.tsx
    details: Shows image field interface and how to use
  - file: /packages/@tinacms/fields/src/ImageUpload/ImageUpload.tsx
    details: References the image field and upload config
---

The `image` field is used for content values that point to an image used on the page. This field allows you to upload new images by via dragging or selection in Finder. Note this field does not handle any images included in the Markdown body, those would be handled by the [markdown](docs/fields/markdown) component.

![tinacms-image-field](/fields/image.png)

## Definition

Below is an example of how a `image` field could be defined in a Gatsby remark form. Read more on passing in form field options [here](/docs/gatsby/markdown#customizing-remark-forms).

```javascript
import get from "lodash.get";

const BlogPostForm = {
  fields: [
    {
      name: "rawFrontmatter.thumbnail",
      label: "Thumbnail",
      component: "image",
      parse: filename => `/content/images/${filename}`,

      previewSrc: (formValues, { input }) => {
        const path = input.name.replace("rawFrontmatter", "frontmatter")
        const gastbyImageNode = get(formValues, path)
        if (!gastbyImageNode) return ""
        //specific to gatsby-image
        return gastbyImageNode.childImageSharp.fluid.src
      },

      uploadDir: () => {
        return "/content/images/"
      },
      /*
      Or a more complicated example of uploadDir

      uploadDir: blogPost => {
        let postPathParts = blogPost.fileRelativePath.split("/")

        let postDirectory = postPathParts
          .splice(0, postPathParts.length - 1)
          .join("/")

        return postDirectory
      },
      */
    },
    },
    // ...
  ],
}
```

## Options

 - `name`: The path to some value in the data being edited.
 - `component`: The name of the React component that should be used to edit this field. Available field component types are [defined here](/docs/concepts/fields#field-types)
 - `label`: A human readable label for the field. This label displays in the sidebar and is optional. If no label is provided, the sidebar will default to the name.
 - `description`: An optional description that expands on the purpose of the field or prompts a specific action.
 - `parse`: Defines how the actual front matter or data value gets populated. The name of the file gets passed as an argument, and one can set the path this image as defined by the uploadDir property.
 - `previewSrc`: Defines the path for the src attribute on the image preview. If using gatsby-image, the path to the `childImageSharp.fluid.src` needs to be provided.
 - `uploadDir`: Defines the upload directory for the image. All of the post data is passed in, `fileRelativePath` is most useful in defining the upload directory, but you can also statically define the upload directory.

## Interface

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
