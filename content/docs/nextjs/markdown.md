---
title: Markdown in Next.js
id: /docs/nextjs/markdown
prev: /docs/nextjs/creating-forms
next:
consumes:
  - file: packages/next-tinacms-markdown/src/use-local-markdown-form.ts
    details: Shows use of useLocalMarkdownForm
  - file: packages/next-tinacms-markdown/src/use-global-markdown-form.ts
    details: Shows use of useGlobalMarkdownForm
---

The `next-tinacms-markdown` package provides a set of methods for editing content sourced from Markdown files.

- `useLocalMarkdownForm( markdownFile, options? ):[values, form]` - A [React Hook](https://reactjs.org/docs/hooks-intro.html) for registering local forms with [function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components).
- `useGlobalMarkdownForm( markdownFile, options? ):[values, form]` - A [React Hook](https://reactjs.org/docs/hooks-intro.html) for registering global forms with [function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components).
- `markdownForm( Component, options? ): Component` - A [React Higher-Order Component](https://reactjs.org/docs/higher-order-components.html) for registering local forms with class or function components.

## Using the hooks

The hooks, `useLocalMarkdownForm` & `useGlobalMarkdownForm`, work similarly. The biggest difference between them is whether they register [local or global](https://tinacms.org/docs/forms) forms wih the CMS.

**Arguments**

- `markdownFile`: Both hooks expect an object as the first argument that matches the following interface:

```typescript
// A datastructure representing a MarkdownFile file stored in Git
export interface MarkdownFile {
  fileRelativePath: string
  frontmatter: any
  markdownBody: string
}
```

- `options`: The second argument is an _optional configuration object_ that can include [options](https://tinacms.org/docs/gatsby/markdown/#customizing-remark-forms) to customize the form.

**Return Values**

- `values`: An object containing the current values from `frontmatter` and `markdownBody`. You can use these values to render content.
- `form`: A reference to the `Form` registered to the CMS. Most of the time you won't need to work directly with the `Form`, so you won't see it used in the example.

### _useLocalMarkdownForm_ Example

The `useLocalMarkdownForm` hook will connect the return data from `getInitialProps` with Tina, then return the `frontmatter` and `markdownBody` values to be rendered.

```jsx
/*
** 1. Import `useLocalMarkdownForm`
*/
import { useLocalMarkdownForm } from 'next-tinacms-markdown'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'

export default function Info(props) {

  /*
  ** Optional — define an options object
  ** to customize the form
  */
  const formOptions = {
    label: 'Home Page',
    fields: [
      { label: 'Name', name: 'frontmatter.name', component: 'text' },
      {
        name: 'markdownBody',
        label: 'Home Page Content',
        component: 'markdown',
      },
    ],
  }
  /*
  ** 2. Call `useLocalMarkdownForm` and pass in the
  **    `data` object returned from `getInitialProps`,
  **    along with any form options.
  */
  const [data] = useLocalMarkdownForm(props.markdownFile, formOptions)

  /*
  **  3. Render content from your Markdown source file
  **     with the returned `data` object.
  */
  return (
    <Layout>
      <section>
        <h1>{data.frontmatter.name}<h2>
        <ReactMarkdown>{data.markdownBody}</ReactMarkdown>
      </section>
    </Layout>
  )
}

Info.getInitialProps = async function() {
  const infoData = await import(`../data/info.md`)
  const data = matter(infoData.default)

  return {
    /*
    ** 4. Make sure your return data matches this shape
    */
    markdownFile: {
      fileRelativePath: `data/info.md`,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}
```

> You can use [`gray-matter`](https://github.com/jonschlinkert/gray-matter) to parse the YAML frontmatter when importing a raw Markdown file.

## Using _markdownForm_ HOC

`markdownForm` accepts two arguments: _a component and an [form configuration object](https://tinacms.org/docs/gatsby/markdown/#customizing-remark-forms)_. The component being passed is expected to receive data as props that matches the `markdownFile` interface outlined below.

```typescript
// A datastructure representing a MarkdownFile file stored in Git
export interface MarkdownFile {
  fileRelativePath: string
  frontmatter: any
  markdownBody: string
}
```

`markdownForm` returns the original component with a local form registered with Tina. Below is the same example from `useLocalMarkdownForm`, but refactored to use the HOC.

```ts
/*
** 1. import `markdownForm`
*/
import { markdownForm } from 'next-tinacms-markdown'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Layout from '../components/Layout'

function Info(props) {
  const data = props.markdownFile
  return (
    <Layout>
      <section>
        <h1>{data.frontmatter.name}<h2>
        <ReactMarkdown>{data.markdownBody}</ReactMarkdown>
      </section>
    </Layout>
  )
}

/*
** Optional — define an options object
** to customize the form
*/
const formOptions = {
  //...
}

/*
 ** 2. Wrap your component with `markdownForm`,
 **    pass in optional form field config object
 **    and declare a new variable to hold the
 **    returned component
 */
const EditableInfo = markdownForm(Info, formOptions)

/*
 ** 3. Export the 'editable' version of the
 **    original component
 */
export default EditableInfo

/*
 ** 4. Call your data fetching method
 **    on the 'editable' component
 */
EditableInfo.getInitialProps = async function() {
  const configData = await import(`../data/config.json`)
  const infoData = await import(`../data/info.md`)
  const data = matter(infoData.default)

  return {
    title: configData.title,
    description: configData.description,
    /*
    ** 5. Structure your return object
    **    with this shape. Make sure
    **    to use the `markdownFile`
    **    property name
    */
    markdownFile: {
      fileRelativePath: `data/info.md`,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}
```
