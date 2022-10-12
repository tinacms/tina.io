---
title: Contextual Editing
id: '/docs/tinacms-context'
next: '/docs/data-fetching/overview'
---

## Introduction

Out of the box, once you define a new collection in Tina, its content becomes available through the "basic editor".

![basic editor](https://res.cloudinary.com/forestry-demo/image/upload/v1647455231/tina-io/docs/basic-editor.png)

Tina also allows for "Contextual Editing" so that editors can see their pages being updated in real-time as they make changes

![contextual editor](https://res.cloudinary.com/forestry-demo/image/upload/v1647455231/tina-io/docs/contextual-editing.png)

> **Contextual Editing Requirements:**
>
> - Currently, contextual editing is only supported in React-based frameworks (E.g NextJS).
>
> - Before a page can be setup with contextual editing, it first needs to be using [Tina's data-fetching](/docs/features/data-fetching/).

## Adding contextual-editing to a page

Contextual editing can be set up on a page with the `useTina` hook

Here is an example of setting up contextual editing, on a NextJS-based site.

```jsx
// ...
import { useTina } from 'tinacms/dist/react'

export default function Home(props) {
  // Pass our data through the "useTina" hook to make it editable
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  // Note how our page body uses "data", and not the original "props.data".
  // This ensures that the content will be updated in edit-mode as the user types
  return <h1>{data.page.body}</h1>
}

export const getStaticProps = async () => {
  const pageResponse = await client.queries.page({ relativePath: 'home.mdx' })

  return {
    props: {
      data: pageResponse.data,
      query: pageResponse.query,
      variables: pageResponse.variables,
    },
  }
}
```

![usetina-hello-world](https://res.cloudinary.com/forestry-demo/image/upload/q_32/v1643294947/tina-io/hello-world.png)

### The `useTina` hook:

`useTina` is used to make a piece of Tina content contextually editable. It is code-split, so that in production, this hook will simply pass through its data value. In edit-mode, it registers an editable form in the sidebar, and contextually updates its value as the user types.

`useTina` takes in a parameter with a few keys:

- `query` and `variables`: These are the same values that you would use for the [backend data-fetching](/docs/features/data-fetching/).
- `data`: This is the production value that gets passed through to the response unchanged in production.

> Note: Only queries for individual documents can be used with `useTina`

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
