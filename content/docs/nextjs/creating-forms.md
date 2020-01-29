---
title: Creating Forms
id: /docs/nextjs/bootstrapping
prev: /docs/nextjs/adding-backends
next: /docs/contributing/guidelines
consumes:
  - file: /packages/@tinacms/react-core/src/use-form.ts
    details: Demonstrates using useLocalForm on a Next.js site
  - file: /packages/@tinacms/react-core/src/use-watch-form-values.ts
    details: Demonstrates usage of useWatchFormValues
  - file: /packages/react-tinacms/src/index.ts
    details: Imports useLocalForm and useWatchFormValues from react-tinacms metapackage
---

Let's imagine we have a Page component in our NextJS app using the dynamic route of `pages/[slug].js`. This page will get its content from a corresponding JSON file located at `posts/[slug].json`. Thus, when you visit `nextjsapp.com/hello-world`, it will display the contents of `/posts/hello-world.json`. We can set up a very simple version of this with the following code:

```javascript
// /pages/[slug].js

import * as React from 'react'

export default function Page(props) {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    fileRelativePath: `/posts/${slug}.json`,
    title: content.title,
  }
}
```

The `getInitialProps` function is run by Next when the page is requested to load the data, and the return value is passed to our component as its initial props. Take note of `fileRelativePath`; we'll need that when we set up the form.

## Adding a Form with _useLocalForm_

<tip>Update react-tinacms version:0.9.0: The previous hook `useCMSForm` used to create custom forms is now the same as `useLocalForm`</tip>

To add forms to the Tina sidebar, we'll use the `useLocalForm` hook inside our page component. Using this hook, we will configure the following:

1. `initialValues` containing the editable content provided by `getInitialProps`
2. `fields` to define the shape of our form
3. The `onSubmit` callback that calls the git API [registered in our app component](./adding-backends.md) to commit the changes

`useLocalForm` will return two values in an array, following the convention of React hooks. The first value is the current data in the form, and the second value is the form object itself. We want to capture the form data in a variable called `post`, and replace the call to `props` in our render function with this `post` variable. This will enable our layout to dynamically update as changes are made to the form data.

```javascript
// /pages/[slug].js

import * as React from 'react'
import { useCMS, useLocalForm } from 'tinacms'

export default function Page(props) {
  // grab the instance of the CMS to access the registered git API
  let cms = useCMS()

  // add a form to the CMS; store form data in `post`
  let [post, form] = useLocalForm({
    id: props.fileRelativePath, // needs to be unique
    label: 'Edit Post',

    // starting values for the post object
    initialValues: {
      title: props.title,
    },

    // field definition
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
    ],

    // save & commit the file when the "save" button is pressed
    onSubmit(data) {
      return cms.api.git
        .writeToDisk({
          fileRelativePath: props.fileRelativePath,
          content: JSON.stringify({ title: data.title }),
        })
        .then(() => {
          return cms.api.git.commit({
            files: [props.fileRelativePath],
            message: `Commit from Tina: Update ${data.fileRelativePath}`,
          })
        })
    },
  })

  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    slug: slug,
    fileRelativePath: `/posts/${slug}.json`,
    title: content.title,
  }
}
```

## Watching for Form Changes

At this point, we have successfully set up a form for our content that will commit to git and dynamically update the page as we change the data. However, you may have a use case where you want to update the file contents immediately instead of waiting for the content to be saved. For example, if you are doing some server-side transformation in `getInitialProps` that you don't want to re-implement on the client side, you might prefer to save updates to the source content files and rely on hot reloading to render dynamic changes.

In this case, you can use another hook provided by `tinacms` called `useWatchFormValues`. `useWatchFormValues` receives a form object (returned by `useLocalForm`) and a callback function to invoke when the form is changed. The code below demonstrates using the git API to write contents to the source file in response to form changes:

```javascript
// /pages/[slug].js

import * as React from 'react'
import { useCMS, useLocalForm, useWatchFormValues } from 'tinacms'

export default function Page(props) {
  // grab the instance of the cms to access the registered git API
  let cms = useCMS()

  // add a form to the CMS; store form data in `post`
  let [post, form] = useLocalForm({
    id: props.fileRelativePath, // needs to be unique
    label: 'Edit Post',

    // starting values for the post object
    initialValues: {
      title: props.title,
    },

    // field definition
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      },
    ],

    // save & commit the file when the "save" button is pressed
    onSubmit(data) {
      return cms.api.git
        .writeToDisk({
          fileRelativePath: props.fileRelativePath,
          content: JSON.stringify({ title: formState.values.title }),
        })
        .then(() => {
          return cms.api.git.commit({
            files: [props.fileRelativePath],
            message: `Commit from Tina: Update ${data.fileRelativePath}`,
          })
        })
    },
  })

  let writeToDisk = React.useCallback(formState => {
    cms.api.git.writeToDisk({
      fileRelativePath: props.fileRelativePath,
      content: JSON.stringify({ title: formState.values.title }),
    })
  }, [])

  useWatchFormValues(form, writeToDisk)

  return (
    <>
      <h1>{post.title}</h1>
    </>
  )
}

Page.getInitialProps = function(ctx) {
  const { slug } = ctx.query
  let content = require(`../posts/${slug}.json`)

  return {
    slug: slug,
    fileRelativePath: `/posts/${slug}.json`,
    title: content.title,
  }
}
```
