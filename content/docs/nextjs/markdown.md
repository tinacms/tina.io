---
title: Markdown in Next.js
id: /docs/nextjs/markdown
prev: /docs/nextjs/creating-forms
next: /docs/contributing/inline-editing
consumes:
  - file: packages/next-tinacms-markdown/src/use-local-markdown-form.ts
    details: Shows use of useLocalMarkdownForm
  - file: packages/next-tinacms-markdown/src/use-global-markdown-form.ts
    details: Shows use of useGlobalMarkdownForm
---

The `next-tinacms-markdown` package provides a set of methods for editing content sourced from Markdown files.

- `useLocalMarkdownForm( markdownFile, options? ):[values, form]`
- `useGlobalMarkdownForm( markdownFile, options? ):[values, form]`

These hooks work similarly, the biggest difference being whether they register [local or global](https://tinacms.org/docs/concepts/forms#local--global-forms) forms wih the CMS. They can only be used with [function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components).

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

### _useLocalMarkdownForm_ In Use

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
  const [data] = useLocalMarkdownForm(props.data, formOptions)

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
    data: {
      fileRelativePath: `data/info.md`,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}
```

> You can use [`gray-matter`](https://github.com/jonschlinkert/gray-matter) to parse the YAML frontmatter when importing a raw Markdown file.
