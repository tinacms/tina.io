---
title: Other JSON helpers
---

The previous example demonstrated how to create a form with `useJsonForm`, but there are additional hooks and HOC's to work with when using JSON as a data source.

### Global Forms

There is another hook, `useGlobalJsonForm`, that registers a [Global Form](https://tinacms.org/docs/forms) with the sidebar.

Using this hook looks almost exactly the same as the example for `useJsonForm`. This hook expects an object with the properties, `fileRelativePath` and `data`. The value of `data` should be the contents of the JSON file. The Global Form can be customized by passing in an _options_ object as the second argument.

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
