---
title: Setting up a Router for Contextual Editing
id: '/docs/contextual-editing/router'
prev: '/docs/contextual-editing/overview'
---

## Accessing contextual-editing from the CMS

At this point, when your editors go to `/your-page-url` in edit-mode, they will be able to edit content and see those changes reflected on the page, in real-time. Next, let's ensure users will be navigated to that same live-editing experience (instead of the basic editor experience) every time they click on a document in the CMS Document List.

To accomplish this, we will make use of the [`ui.router`](/docs/reference/collections/#definition) property on a collection.

### The `router` Property

The `router` property is used by the CMS's Document List to navigate to a document's contextual editor rather than the basic editor.

```ts
router: ({ collection: Collection, document: Document }) => string | undefined
```

The `router` property is a function function, that is run when a document is clicked within a Document List:

- If `router` returns a `string`, the `string` is used as the document's route rather than the default.
- If `router` returns `undefined`, the user is navigated to the document's basic editor.

This is an example using `router`.

```tsx
const default defineConfig({
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Page',
        path: 'content/page',
        format: 'md',
        ui: {
          router: ({ document }) => {
            // navigate to the home page
            if (document._sys.filename === 'home') {
              return '/'
            }
            // navigate to the about page
            if (document._sys.filename === 'about') {
              return `/about`
            }
            return undefined
          },
        },
        fields: [
          // An array of fields
        ],
      },
      {
        label: 'Blog Posts',
        name: 'post',
        path: 'content/posts',
        format: 'mdx',
        ui: {
          router: ({ document }) => {
            // navigate to the post that was clicked
            return `/post/${document._sys.filename}`
          },
        },
        fields: [
          // An array of fields
        ],
      }
    ]
  }
})
```

Now when a document is clicked in the CMS we will be re-directed to the page in the site with contextual editing.

<video
className="video"
autoPlay="true"
loop
muted
playsInline><source
          src="https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/v1655919318/tina-io/docs/RoutMapperVid.webm"
          type="video/webm"
        /><source
src="https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/e_accelerate:-20/v1655919318/tina-io/docs/RoutMapperVid.mp4"
type="video/mp4"
/>
</video>

## Summary

- A piece of content can be made editable by running it through the `useTina` hook. In production, it returns the original data unchanged. In edit-mode, it returns the live data, which is updated as the user types in the sidebar.
- Make use of the `router` property to automatically navigate to the contextual-editing experience from the CMS.
