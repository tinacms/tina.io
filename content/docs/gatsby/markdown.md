---
title: Markdown in Gatsby
prev: /docs/gatsby/manual-setup
next: /docs/gatsby/json
consumes:
  - file: /packages/gatsby-tinacms-remark/src/RemarkForm.tsx
    details: Demonstrates use of RemarkForm
  - file: /packages/gatsby-tinacms-remark/src/remarkFormHoc.tss
    details: Shows how to use remarkForm HOC
  - file: /packages/gatsby-tinacms-remark/src/useRemarkForm.tsx
    details: Demonstrates useRemarkForm usage
  - file: /packages/gatsby-tinacms-remark/src/remark-fragment.ts
    details: Explains what the fragment adds
  - file: /packages/@tinacms/forms/src/form.ts
    details: Explains form options interface
---

Gatsby allows you to build sites from many different data sources. Currently Tina has plugins for editing content in [Markdown](/docs/gatsby/markdown#editing-markdown-content) & [JSON](/docs/gatsby/json#editing-json-in-gatsby) files, with plans to support many more data sources.

Have an idea for a Tina content editing plugin? [Consider contributing](/docs/contributing/guidelines)! Check out how to create your own [form](/docs/using-tina/creating-forms) or [field plugin](/docs/using-tina/creating-fields).

## Editing Markdown in Gatsby

The [`gatsby-transformer-remark`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin lets us use Markdown in our Gatsby sites. Two other plugins let us edit Markdown with Tina:

- `gatsby-tinacms-remark`: Provides hooks and components for creating Remark forms.
- `gatsby-tinacms-git`: Extends the gatsby development server to write changes to the local filesystem.

> This guide assumes your Gatsby site is already setup to use Markdown. Check out the [Gatsby Docs](https://www.gatsbyjs.org/docs/adding-markdown-pages/) to learn how to use Markdown in your site.

## Install the Git & Markdown Packages

    npm install --save gatsby-tinacms-remark gatsby-tinacms-git

or

    yarn add gatsby-tinacms-remark gatsby-tinacms-git

## Adding the Git Plugin

Open the `gatsby-config.js` file and add both plugins:

```JavaScript
module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-plugin-tinacms',
      options: {
        plugins: [
          "gatsby-tinacms-git",
          "gatsby-tinacms-remark",
        ],
      },
    },
    // ...
  ],
}
```

## Creating Remark Forms

There are three ways to register remark forms with the CMS, depending on the component:

- [`useRemarkForm`](https://tinacms.org/docs/gatsby/markdown/#1-the-hook-useremarkform) - A [React Hook](https://reactjs.org/docs/hooks-intro.html) — useful for any function component. You can use this with components that source data from a [static query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) using Gatsby's `useStaticQuery` hook.
- [`RemarkForm`](https://tinacms.org/docs/gatsby/markdown/#2-the-render-props-component-remarkform) — A [Render Props](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns) component — useful for any class component. Can be used with components sourcing data from a [static query](https://www.gatsbyjs.org/docs/static-query/#how-staticquery-differs-from-page-query) using Gatsby's [`StaticQuery`](https://www.gatsbyjs.org/docs/static-query/) render props component.
- [`remarkForm`](https://tinacms.org/docs/gatsby/markdown/#3-the-higher-order-component-remarkform) — A [Higher-Order Component](https://reactjs.org/docs/higher-order-components.html) — useful for [page components](https://www.gatsbyjs.org/docs/recipes/#creating-pages-automatically) (function or class), that source data from a [page query](https://www.gatsbyjs.org/docs/page-query/).

All of these options can only take data (transformed by `gatsby-transformer-remark`) from a `markdownRemark` query. If you need more information on using Markdown in Gatsby, refer to [this documentation](https://www.gatsbyjs.org/docs/adding-markdown-pages/).

> If you're adding Tina to a page component in Gatsby, skip to [`remarkForm`](http://tinacms.org/docs/gatsby/markdown#3-the-higher-order-component-remarkform).

### 1. The Hook: useRemarkForm

This hook connects the `markdownRemark` data with Tina to be made editable. It is useful in situations where you need to edit on non-page components, or just prefer working with hooks or static queries. You can also use this hook with functional page components.

#### Usage:

`useRemarkForm(remark, options): [values, form]`

#### Arguments:

- `remark`: The data returned from a Gatsby `markdownRemark` query.
- `options`: A configuration object that can include [form options](https://tinacms.org/docs/gatsby/markdown#customizing-remark-forms) or form actions (such as the [`DeleteAction`](https://tinacms.org/docs/gatsby/creating-new-files#deleting-files))— optional.

#### Return:

- `[values, form]`
  - `values`: The current values to render in the template. This has the same shape as the `markdownRemark` data.
  - `form`: A reference to the `Form`. Most of the time you won't need to directly work with the `Form`.

```javascript
/*
 ** example component --> src/components/Title.js
 */

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

To use this hook, you'll first need to import it from `gatsby-tinacms-remark`. Then you'll need to add the GraphQL fragment `...TinaRemark` to your query. The fragment adds these parameters: `id`, `fileRelativePath`, `rawFrontmatter`, and `rawMarkdownBody`. Finally you'll call the hook and pass in the `markdownRemark` data.

The form will populate with default text fields. To customize it, you can pass in a config options object as the second parameter. Jump ahead to learn more on [customizing the form](http://tinacms.org/docs/gatsby/markdown#customizing-remark-forms).

### 2. The Render Props Component: RemarkForm

`RemarkForm` is a thin wrapper around `useRemarkForm` and `usePlugin`. Since React [Hooks](https://reactjs.org/docs/hooks-intro.html) are only available within [function components](https://reactjs.org/docs/components-and-props.html) you will need to use `RemarkForm` instead of calling those hooks directly working with a [class component](https://reactjs.org/docs/components-and-props.html).

#### Props:

- `remark`: the data returned from a Gatsby `markdownRemark` query.
- `render(renderProps): JSX.Element`: A function that returns JSX elements
  - `renderProps.markdownRemark`: The current values to be displayed. This has the same shape as the `markdownRemark` data that was passed in.
  - `renderProps.form`: A reference to the [`Form`](http://localhost:8000/docs/plugins/forms/).

You can use this with both page and non-page components in Gatsby. Below is an example of using `RemarkForm` in a non-page component using [`StaticQuery`](https://www.gatsbyjs.org/docs/static-query/).

```javascript
/*
 ** example component --> src/components/Title.js
 */
import { StaticQuery, graphql } from 'gatsby'

// 1. import RemarkFrom
import { RemarkForm } from 'gatsby-tinacms-remark'

class Title extends React.Component {
  render() {
    return (
      <StaticQuery
        // 2. add ...TinaRemark fragment to query
        query={graphql`
          query TitleQuery {
            markdownRemark(fields: { slug: { eq: "song-of-myself" } }) {
              ...TinaRemark
              frontmatter {
                title
              }
            }
          }
        `}
        render={data => (
          /*
           ** 3. Return RemarkForm, pass in the props
           **    and then return the JSX this component
           **    should render
           */
          <RemarkForm
            remark={data.markdownRemark}
            render={({ markdownRemark }) => {
              return <h1>{markdownRemark.frontmatter.title}</h1>
            }}
          />
        )}
      />
    )
  }
}

export default Title
```

Here is another example using `RemarkForm` with a page component:

```js
/*
 ** src/templates/blog-post.js
 */

// 1. import RemarkForm
import { RemarkForm } from '@tinacms/gatsby-tinacms-remark'

class BlogPostTemplate extends React.Component {
  render() {
    /*
     ** 2. Return RemarkForm, pass in markdownRemark
     **    as props and return the jsx this component
     **    should render
     */
    return (
      <RemarkForm
        remark={this.props.data.markdownRemark}
        render={({ markdownRemark }) => {
          return <h1>{markdownRemark.frontmatter.title}</h1>
        }}
      />
    )
  }
}

export default BlogPostTemplate

// 3. Add ...TinaRemark fragment to query
export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      ...TinaRemark
      frontmatter {
        title
      }
    }
  }
`
```

Learn how to customize the fields displayed in the form [below](/docs/gatsby/markdown#customizing-remark-forms).

### 3. The Higher-Order Component: remarkForm

The `remarkForm` [higher-order component](https://reactjs.org/docs/higher-order-components.html) (HOC) let's us register forms with `Tina` on Gatsby page components.

There are 3 steps to making a Markdown file editable with `remarkForm`:

1. Import the `remarkForm` HOC
2. Wrap your template with `remarkForm`
3. Add `...TinaRemark` to the GraphQL query

> Required fields used to be queried individually: `id`, `fileRelativePath`, `rawFrontmatter`, & `rawMarkdownBody`. The same fields are now being queried via `...TinaRemark`

**Example: src/templates/blog-post.js**

```jsx
// 1. Import the `remarkForm` HOC
import { remarkForm } from 'gatsby-tinacms-remark'

function BlogPostTemplate(props) {
  return <h1>{props.data.markdownRemark.frontmatter.title}</h1>
}

// 2. Wrap your template with `remarkForm`
export default remarkForm(BlogPostTemplate)

// 3. Add the required fields to the GraphQL query
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
      ...TinaRemark
    }
  }
`
```

You should now see text inputs for each of your front matter fields and for the Markdown body. Try changing the title and see what happens!

### Queries aliasing 'markdownRemark'

NOTE: If your query uses an alias for 'markdownRemark', then you will have to use the 'queryName' option to specify the alias name.

**Example: src/templates/blog-post.js**

```jsx
/// ...

// Use 'queryName' to specify where markdownRemark is found.
export default remarkForm(BlogPostTemplate, { queryName: 'myContent' })

// Aliasing markdownRemark as 'myContent'
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    myContent: markdownRemark(fields: { slug: { eq: $slug } }) {
      // ...
    }
  }
`
```

## Editing Markdown Content

With the Remark Form created, you can now edit your Markdown file in the Tina sidebar. The `markdown` component is [CommonMark](https://commonmark.org/help/) compatible. Content changes are written to the Markdown files in real time. Hitting `Save` will commit those changes to your repository.

**Why write to disk "on change"?**

This allows any `gatsby-remark-*` plugins to properly transform the data in to a remark node and provide a true-fidelity preview of the changes.

## Customizing Remark Forms

Tina's [remark hook or components](http://tinacms.org/docs/gatsby/markdown#creating-remark-forms) create the form based on the shape of the data. This is convenient for getting started but you will want to customize the form eventually to make it more user friendly.

**Why customize the form?**

1. The default `label` for a field is it's `name`.
2. Every field is made a `text` component.
3. The order of fields might not be consistent.

**How to customize the form**

You can pass additional configuration options to customize the form. The following properties are accepted:

- `label`: A label for the form that will render in a list if there are multiple forms. This will default to the name of the component.
- `actions`: A list of form actions, such as [`DeleteAction`](https://tinacms.org/docs/gatsby/creating-new-files#deleting-files).
- `fields`: A list of field definitions
  - `name`: The path to some value in the data being edited. (e.g. `frontmatter.title`)
  - `component`: The name of the React component that should be used to edit this field.
    The default options are: `"text"`, `"textarea"`, `"color"`.
  - `label`: A human readable label for the field.
  - `description`: An optional description that expands on the purpose of the field or prompts a specific action.

### `remarkForm` HOC Example

The `remarkForm` HOC and `useRemarkForm` hook both accept an optional `config` object as the second argument.

```jsx
/*
 ** src/templates/blog-post.js
 */

import { remarkForm } from 'gatsby-tinacms-remark'

function BlogPostTemplate(props) {
  return (
    <>
      <h1>{props.markdownRemark.frontmatter.title}</h1>
      <p>{props.markdownRemark.frontmatter.description}</p>
    </>
  )
}

// 1. Define the form config
const BlogPostForm = {
  label: 'Blog Post',
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      description: 'Enter the title of the post here',
      component: 'text',
    },
    {
      label: 'Description',
      name: 'frontmatter.description',
      description: 'Enter the post description',
      component: 'textarea',
    },
  ],
}

// 2. Pass it as a the second argument to `remarkForm`
export default remarkForm(BlogPostTemplate, BlogPostForm)
```

### `useRemarkForm` Hook Example

```js
import { useRemarkForm } from 'gatsby-tinacms-remark'

function BlogPostTemplate(props) {
  // 1. Define the form
  const BlogPostForm = {
    label: 'Blog Post',
    fields: [
      {
        label: 'Title',
        name: 'frontmatter.title',
        description: 'Enter the title of the post here',
        component: 'text',
      },
      {
        label: 'Description',
        name: 'frontmatter.description',
        description: 'Enter the post description',
        component: 'textarea',
      },
    ],
  }

  // 2. Pass the form as the second argument
  const [markdownRemark, form] = useRemarkForm(
    props.markdownRemark,
    BlogPostForm
  )

  // 3. Register the form as a plugin
  usePlugin(form)

  return (
    <>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <p>{markdownRemark.frontmatter.description}</p>
    </>
  )
}

export default BlogPostTemplate
```

### `RemarkForm` Render Props Example

For the `RemarkForm`component, you pass in the config options individually as props to the render function.

```js
import { RemarkForm } from 'gatsby-tinacms-remark'

class BlogPostTemplate extends React.Component {
  render() {
    return (
      <RemarkForm
        remark={this.props.data.markdownRemark}
        render={({ markdownRemark }) => {
          return (
            <>
              <h1>{markdownRemark.frontmatter.title}</h1>
              <p>{markdownRemark.frontmatter.description}</p>
            </>
          )
        }}
        label="Blog Post"
        fields={[
          {
            label: 'Title',
            name: 'frontmatter.title',
            description: 'Enter the title of the post here',
            component: 'text',
          },
          {
            label: 'Description',
            name: 'frontmatter.description',
            description: 'Enter the post description',
            component: 'textarea',
          },
        ]}
      />
    )
  }
}

export default BlogPostTemplate
```

## Avoiding Errors Caused by Empty Fields

If a value is empty from a source file, for example an empty string, Tina will delete the entire key-value pair from the file. This will cause Gatsby to throw a GraphQL error, since it's trying to query a field that doesn't exist. If you're editing in Tina and you completely delete the text from a field, you may see this error.

This may not be a problem if you have a query that is running over numerous files with a similar data shape. Let's say you have a collection of recipes, and they all have the same frontmatter data. The recipe pages are generated from a template where this query lives. If a key-value pair gets deleted from one recipe file, the query will still run since there are other files that still have the populated value.

However, if you have a single source file for a page, you will run into issues because this is the only instance of the data shape. If the value is deleted, then GraphQL doesn't know what field it's querying.

To work around this, we need to create either a dummy file or manually override the parse value in the field object by passing in an empty string.

### Option 1: Override the parse value

```js
/*
** Override the parse value
** in the field definition object
*/

fields: [
  {
    label: "Favorite Food",
    name: "frontmatter.fav_food",
    component: "text",
    // If there's no value, return empty string
    parse(value) {
      return value || ""
    },
  },...
]
```

This option will provide an empty string if no value exists, so the frontmatter key/value pair will not get fully deleted from the source file.

### Option 2: Creating a Dummy File

This second option involves **creating a dummy source file** with the same shape of data in your real source files, but filled with dummy values. This works best when you're using a template to generate numerous pages.

> Check-out this approach implemented in Tina Grande: the [dummy file](https://github.com/tinacms/tina-starter-grande/blob/master/content/pages/dummy.json), the [other content files files](https://github.com/tinacms/tina-starter-grande/tree/master/content/pages), and the [query](https://github.com/tinacms/tina-starter-grande/blob/master/src/templates/page.js#L136).
