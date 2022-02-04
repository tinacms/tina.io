---
title: Contextual Editing
id: '/docs/tinacms-context'
next: '/docs/graphql/overview'
---

After modelling our content, and using Tina's API for data-fetching, we can add TinaCMS to our site's frontend and add contextual editing.

## Adding contextual-editing to a page

Contextual editing can be set up on a page with the `useTina` hook

```jsx
// ...
import { useTina } from 'tinacms/dist/edit-state'

const query = `{
  getPageDocument(relativePath: "home.mdx"){
    data{
      body
    }
  }
}`

export default function Home(props) {
  // Pass our data through the "useTina" hook to make it editable
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  })

// Note how our page body uses "data", and not the original "props.data".
// This ensures that the content will be updated in edit-mode as the user types
  return <h1>{data.getPageDocument.data.body}</h1>
}

export const getStaticProps = async () => {
  const data = await staticRequest({
      query,
      variables = {},
    })

  // return the original data, which is used in our production page
  return { props: { data } }
}
```

![usetina-hello-world](https://res.cloudinary.com/forestry-demo/image/upload/q_32/v1643294947/tina-io/hello-world.png)

### The `useTina` hook:

`useTina` is used to make a piece of Tina content contextually editable. It is code-split, so that in production, this hook will simply pass through its data value. In edit-mode, it registers an editable form in the sidebar, and contextually updates its value as the user types.

`useTina` takes in a parameter with a few keys:

- `query` and `variables`: These are the same values that you would use for the [backend data-fetching](/docs/features/data-fetching/).
- `data`: This is the production value that gets passed through to the response unchanged in production.

## Summary

- Tina can be added to a site's UI by wrapping its layout in the `<TinaCMS>` component.
- The `<TinaEditProvider>` component should be used to dynamically code-split Tina out of your production site.
- The Tina admin usually lives on the `/admin` route. This page allows editors to log in and enter edit-mode.
- A piece of content can be made editable by running it through the `useTina` hook. In production, it returns the original data unchanged. In edit-mode, it returns the live data, which is updated as the user types in the sidebar.
