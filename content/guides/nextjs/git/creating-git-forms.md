---
title: Creating Git Forms
consumes:
  - file: /packages/next-tinacms-json/src/use-json-form.ts
    details: Demonstrates using useJsonForm on a Next.js site
---

Let's imagine we have a Page component in our NextJS app using the dynamic route of `pages/[slug].js`. This page will get its content from a corresponding JSON file located at `posts/[slug].json`. Thus, when you visit `/posts/hello-world`, it will display the contents of `/posts/hello-world.json`. We can set up a very simple version of this with the following code:

**/pages/\[slug].js**

```jsx
import * as React from 'react'

export default function Page({ jsonFile }) {
  const post = jsonFile.data

  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../posts/${slug}.json`)

  return {
    props: {
      jsonFile: {
        fileRelativePath: `/posts/${slug}.json`,
        data: content.default,
      },
    },
  }
}

export async function getStaticPaths() {
  //get all .json files in the posts dir
  const posts = glob.sync('posts/**/*.json')

  //remove path and extension to leave filename only
  const postSlugs = posts.map(file =>
    file
      .split('/')[2]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // create paths with `slug` param
  const paths = postSlugs.map(slug => `/posts/${slug}`)
  return {
    paths,
    fallback: true,
  }
}
```

By exporting the async function called [_getStaticProps_](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) from a page, Next.js pre-renders this page at build time using the props returned by `getStaticProps`. The [_getStaticPaths_](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) function define a list of paths that have to be rendered to HTML at build time.

Note the shape of the props returned by `getStaticProps`. This `jsonFile` shape is needed to set up a form with Tina using the Git helpers.

## Adding a Form for JSON With _useJsonForm_

The `next-tinacms-json` package provides a hook to help us make JSON content editable. `useJsonForm` receives an object matching the following interface:

```typescript
// A datastructure representing a JSON file stored in Git
interface JsonFile<T = any> {
  fileRelativePath: string
  data: T
}
```

It then returns the contents of `data` after it's been exposed to the editor.

To use this hook, install `next-tinacms-json`:

```bash
yarn add next-tinacms-json
```

There are two steps to adding a form with the CMS:

1. Create the form.
2. Register it with the CMS.

To create the form, we will pass `jsonFile` into `useJsonForm`, and update the `post` variable to the hook's return value. To register the form with the CMS, we'll pass `form` to the `usePlugin` hook.

**/pages/\[slug].js**

```diff
 import * as React from 'react'
+ import { usePlugin } from 'tinacms'
+ import { useJsonForm } from 'next-tinacms-json'

 export default function Page({ jsonFile }) {
   // Create the Form
-  const post = jsonFile.data
+  const [post, form] = useJsonForm(jsonFile)

   // Register it with the CMS
+  usePlugin(form)

   return (
     <>
+      <h1>{post.title}</h1>
     </>
   )
 }

 export async function getStaticProps({ ...ctx }) {
   const { slug } = ctx.params
   const content = await import(`../../posts/${slug}.json`)

   return {
     props: {
       jsonFile: {
         fileRelativePath: `/posts/${slug}.json`,
         data: content.default,
       },
     },
   }
 }

 //...
```

By default, `useJsonForm` creates a text field for each value in `data`. It's possible to [customize](/docs/plugins/forms) the form by passing a second argument into `useJsonForm`:

**/pages/\[slug].js**

```jsx
//...

export default function Page({ jsonFile }) {
  const formConfig = {
    fields: [
      {
        name: 'title',
        label: 'Post Title',
        component: 'text',
      },
    ],
  }

  const [post, form] = useJsonForm(jsonFile, formConfig)

  usePlugin(form)

  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

//...
```

If you restart the dev server, you should see a form populated with this `title` field in the sidebar. Try updating the title and watch the changes update on the page in real time! You should now be more familiar with setting up a Git-based workflow with Tina & Next.js.
