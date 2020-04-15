---
title: Creating Forms
id: /docs/nextjs/creating-forms
prev: /docs/nextjs/adding-backends
next: /docs/nextjs/markdown
consumes:
  - file: /packages/next-tinacms-json/src/use-json-form.ts
    details: Demonstrates using useLocalJsonForm on a Next.js site
  - file: /packages/next-tinacms-json/src/use-local-json-form.ts
    details: Demonstrates using useLocalJsonForm on a Next.js site
  - file: /packages/next-tinacms-json/src/use-global-json-form.ts
    details: Demonstrates using useGlobalJsonForm on a Next.js site
---
Let's imagine we have a Page component in our NextJS app using the dynamic route of `pages/[slug].js`. This page will get its content from a corresponding JSON file located at `posts/[slug].json`. Thus, when you visit `/hello-world`, it will display the contents of `/posts/hello-world.json`. We can set up a very simple version of this with the following code:

```jsx
// /pages/[slug].js

import * as React from 'react'

export default function Page({ post }) {
  return (
    <>
      <h1>{post.data.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    post: {
      fileRelativePath: `/posts/${slug}.json`,
      data: content.default,
    },
  }
}
```

The `getInitialProps` function is run by Next when the page is requested to load the data, and the return value is passed to our component as its initial props. Take note of `fileRelativePath`; we'll need that when we set up the form.

## Adding a Form for JSON With _useJsonForm_

The `next-tinacms-json` package provides a hook to help us make JSON content editable. `useJsonForm` receives an object matching the following interface:

```typescript
// A datastructure representing a JSON file stored in Git
interface JsonFile<T = any> {
  fileRelativePath: string
  data: T
}
```

and returns the contents of `data` after it's been exposed to the editor.

To use this hook, install `next-tinacms-json`:

    npm install next-tinacms-json

Since the object we're returning from `getInitialProps` already matches the `JsonFile` interface, all that's required is to pass this object into `useJsonForm`, and replace the `post` object in our render with the hook's return value:

```diff
 // /pages/[slug].js

 import * as React from 'react'
 import { usePlugins } from 'tinacms'
 import { useJsonForm } from 'next-tinacms-json'

 export default function Page({ post }) {
   // Create the Form
+  const [postData, form] = useJsonForm(post)

   // Register it with the CMS
   usePlugin(form)

   return (
     <>
+      <h1>{postData.title}</h1>
     </>
   )
 }

 Page.getInitialProps = function(ctx) {
   const { slug } = ctx.query
   let content = require(`../posts/${slug}.json`)

   return {
     post: {
       fileRelativePath: `/posts/${slug}.json`,
       data: content.default,
     },
   }
 }
```

By default, `useJsonForm` creates a text field for each value in `data`. It's possible to customize the form by passing a second argument into `useJsonForm`:

```jsx
export default function Page({ post }) {
  const [postData] = useJsonForm(post, {
    fields: [
      {
        name: 'title',
        label: 'Post Title',
        component: 'text',
      },
    ],
  })

  usePlugin(form)

  return (
    <>
      <h1>{postData.title}</h1>
    </>
  )
}
```

### Global Forms

There is another hook, `useGlobalJsonForm`, that registers a [Global Form](https://tinacms.org/docs/forms) with the sidebar.

Using this hook looks almost exactly the same as the example for `useJsonForm`. This hook expects an object with the properties, `fileRelativePath` and `data`. The value of `data` should be the contents of the JSON file. The [Global Form](https://tinacms.org) can be customized by passing in an _options_ object as the second argument.

## Using _jsonForm_ HOC

Using a hook is an incredibly flexible and intuitive way to register forms with Tina. Unfortunately hooks only work with function components in React. If you need to register a form with Tina on a class component, or are fond of the [higher-order component](https://reactjs.org/docs/higher-order-components.html) pattern, `jsonForm` is the function to reach for.

`jsonForm` accepts two arguments: _a component and an optional [form configuration object](https://tinacms.org/docs/gatsby/markdown/#customizing-remark-forms)_. The component being passed is expected to receive data as props that matches the `jsonFile` interface outlined below.

```typescript
// A datastructure representing a JSON file stored in Git
interface JsonFile<T = any> {
  fileRelativePath: string
  data: T
}
```

`jsonForm` returns the original component with a local form registered with Tina. Below is the same example from `useJsonForm`, but refactored to use the `jsonForm` HOC.

**Example**

```js
/*
 ** 1. import jsonForm
 */
import { jsonForm } from 'next-tinacms-json'
import * as React from 'react'

function Page({ jsonFile }) {
  return (
    <>
      <h1>{jsonFile.data.title}</h1>
    </>
  )
}

/*
 ** 2. Wrap the Page component with jsonForm
 */
const EditablePage = jsonForm(Page)

/*
 ** 3. Export the editable component
 */
export default EditablePage

/*
 ** 4. Call your data fetching method
 **    on the editable component
 */
EditablePage.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    /*
     ** 5. Ensure your return data has
     **    this shape.
     */
    jsonFile: {
      fileRelativePath: `/posts/${slug}.json`,
      data: content.default,
    },
  }
}
```

[More info: creating custom forms](/docs/forms)