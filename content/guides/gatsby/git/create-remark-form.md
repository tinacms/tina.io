---
title: Creating Remark Forms
---

To use Markdown in your Gatsby site, you should already have the `gatsby-transformer-remark` plugin set up. This plugin uses [_Remark_](https://remark.js.org/) to process Markdown.

You'll be seeing the hooks and documentation refer to _Remark_ to reference the processed Markdown data.

## Create & Register the form

There are [a few helpers](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-remark) for creating Remark forms. In this guide, we will cover the `useRemarkForm` hook. This hook works for functional components that source data from a [static query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) using Gatsby's `useStaticQuery` hook. It also works with functional page components, using a [page query](https://www.gatsbyjs.org/docs/page-query/).

This hook connects the data returned from a `markdownRemark` query with Tina to be made editable.

> If you're using a class component, refer to [the documentation](https://github.com/tinacms/tinacms/tree/master/packages/gatsby-tinacms-remark) for other helpers.

### _useRemarkForm_ Hook

`useRemarkForm` accepts two arguments: `remark` — data returned from a Gatsby `markdownRemark` query and `options`, an optional [form configuration](/docs/plugins/forms#form-configuration) object.

The hook returns _Remark_ data to render in the template and the current [`form`](/docs/plugins/forms).

> `useRemarkForm` only creates the form. In order to interact with a form you must _register_ it with the CMS. There are two main approaches to register forms in Tina: page forms and screen plugins. Please refer to the [form concepts](/docs/plugins/forms#registering-forms) doc to get clarity on the differences. In the examples below, we will only use the `usePlugin` hook to register the form.

#### Example

How to use this hook in your component:

1. Import `useRemarkForm` and `usePlugin`.
2. Add the GraphQL fragment `...TinaRemark` to your query. The fragment consists of these parameters: `id`, `fileRelativePath`, `rawFrontmatter`, and `rawMarkdownBody`.
3. Call the hook and pass in the `markdownRemark` data returned from your query.
4. Register the newly created form with `usePlugin`.

**src/templates/blog-post.js**

```javascript
// 1. Import `useRemarkForm` & `usePlugin`
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'
import { graphql } from 'gatsby'

export default function BlogPostTemplate(props) {
  // 2. Create the Form
  const [markdownRemark, form] = useRemarkForm(props.markdownRemark)

  // 3. Register the form as a plugin
  usePlugin(form)

  return (
    <>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.description}</p>
    </>
  )
}

// 4. Add ...TinaRemark fragment to query
export const blogPostQuery = graphql`
  query BlogPostQuery {
    markdownRemark(fields: { slug: { eq: "song-of-myself" } }) {
      ...TinaRemark
      frontmatter {
        title
        description
      }
    }
  }
`
```

After creating and registering the form in your component, restart the dev server and you should see a form in the sidebar populated with default text fields in the sidebar. Try editing one of the values and watch it live update on your site.

> _Note:_ You will only see the associated form in the sidebar if the component is currently rendered on the page.

To customize the form with different [fields](/docs/plugins/fields), you can pass in a config options object as the second parameter. Jump ahead to learn more on [customizing the form](http://tinacms.org/guides/gatsby/git/customize-form).

Next, we'll cover how to create forms for JSON data.
