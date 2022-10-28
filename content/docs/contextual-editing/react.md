---
title: Contextual Editing in React
id: '/docs/contextual-editing/react'
prev: '/docs/contextual-editing/overview'
next: '/docs/contextual-editing/router'
---

> **Contextual Editing Requirements:**
>
> - Before a page can be setup with contextual editing, it first needs to be using [Tina's data-fetching](/docs/features/data-fetching/).

In react, (or react based frameworks like Next.js) contextual editing can be set up on a page with the `useTina` hook

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

## The `useTina` hook:

`useTina` is used to make a piece of Tina content contextually editable. It is code-split, so that in production, this hook will simply pass through its data value. In edit-mode, it registers an editable form in the sidebar, and contextually updates its value as the user types.

`useTina` takes in a parameter with a few keys:

- `query` and `variables`: These are the same values that you would use for the [backend data-fetching](/docs/features/data-fetching/).
- `data`: This is the production value that gets passed through to the response unchanged in production.

> Note: Only queries for individual documents can be used with `useTina`

After a page is setup with the `useTina` hook, you can add a [router to your collection](/docs/contextual-editing/router) so that you can access contextual-editing from the CMS.
