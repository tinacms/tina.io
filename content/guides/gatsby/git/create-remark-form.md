---
title: Creating Remark Forms
---

To use Markdown in your Gatsby site, you'll need to set up the `gatsby-transformer-remark` plugin. This plugin uses [_Remark_](https://remark.js.org/) to process Markdown. You'll be seeing the hooks and documentation refer to _Remark_ and that is referencing the processed Markdown data.

## Register the form

There are [a few helpers](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-remark) for creating Remark forms with the CMS. In this guide, we will cover the `useRemarkForm` hook. This hook work for components that source data from a [static query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) using Gatsby's `useStaticQuery` hook.

This hook connects the `markdownRemark` data with Tina to be made editable. It is useful in situations where you need to edit on non-page components, or just prefer working with hooks or static queries. You can also use this hook with functional page components.

### _useRemarkForm_ Hook

`useRemarkForm` accepts two arguments: `remark` — data returned from a Gatsby `markdownRemark` query and `options`, an optional [form configuration](/docs/plugins/forms#form-configuration) object.

The hook returns _Remark_ data to render in the template and the current [`form`](/docs/plugins/forms).

> `useRemarkForm` only creates the form, in order to _register_ it with the CMS, you'll use another hook — `usePlugin`.

#### Example

How to use this hook in your component:

1. Import `useRemarkForm` and `usePlugin`.
2. Add the GraphQL fragment `...TinaRemark` to your query. The fragment consists of these parameters: `id`, `fileRelativePath`, `rawFrontmatter`, and `rawMarkdownBody`.
3. Call the hook and pass in the `markdownRemark` data returned from your query.
4. Register the newly created form with `usePlugin`.

**src/components/Title.js**

```javascript
// 1. import useRemarkForm and usePlugin
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'
import { useStaticQuery } from 'gatsby'

const Title = data => {
  // 2. Add required GraphQL fragment
  const data = useStaticQuery(graphql`
    query TitleQuery {
      markdownRemark(fields: { slug: { eq: "song-of-myself" } }) {
        ...TinaRemark
        frontmatter {
          title
        }
      }
    }
  `)

  // 3. Call the hook and pass in the data
  const [markdownRemark, form] = useRemarkForm(data.markdownRemark)

  // 4. Register the form plugin
  usePlugin(form)

  return <h1>{markdownRemark.frontmatter.title}</h1>
}

export default Title
```

Now you can restart the dev server, and you should see a form populated with default text fields in the sidebar. Try editing one of the values and watch it live update on your site.

> _Note:_ You will only see the associated form in the sidebar if the component is currently rendered on the page.

To customize the form with different [fields](/docs/plugins/fields), you can pass in a config options object as the second parameter. Jump ahead to learn more on [customizing the form](http://tinacms.org/guides/gatsby/git/customize-form).

Next, we'll cover how to create forms for JSON data.
