---
title: The "image" field
last_edited: '2022-06-15T15:51:56.737Z'
---

# `image`

```ts
type ImageField = {
  label: string
  name: string
  type: 'image'
  /** See https://tina.io/docs/extending-tina/overview/ for customizing the UI **/
  ui?: {
    label?: string
    description?: string
    component?: FC<any> | string | null
    parse?: (value: string, name: string, field: F) => any
    format?: (value: string, name: string, field: F) => any
    validate?(
      value: string,
      allValues: any,
      meta: any,
      field: UIField<F, Shape>
    ): string | undefined | void
  }
}
```

## Example

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        fields: [
          {
            type: 'image',
            label: 'Hero image',
            name: 'imgSrc',
          },
          // ... other fields
        ],
      },
    ],
  },
})
// ...
```

Please see [the media docs](/docs/reference/media/cloudinary/) for how to set up media in your site.
