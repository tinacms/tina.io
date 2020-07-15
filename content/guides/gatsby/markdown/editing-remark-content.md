---
title: Editing Markdown Content
---

With the Remark Form created, you can now edit your Markdown file in the Tina sidebar. The `markdown` component is [CommonMark](https://commonmark.org/help/) compatible. Content changes are written to the Markdown files in real time. Hitting `Save` will commit those changes to your repository.

**Why write to disk "on change"?**

This allows any `gatsby-remark-*` plugins to properly transform the data in to a remark node and provide a true-fidelity preview of the changes.

## Customizing Remark Forms

Tina's [remark hook or components](/guides/gatsby/markdown/create-remark-form) create the form based on the shape of the data. This is convenient for getting started but you will want to customize the form eventually to make it more user friendly.

**Why customize the form?**

1. The default `label` for a field is it's `name`.
2. Every field is made a `text` component.
3. The order of fields might not be consistent.

**How to customize the form**

You can pass additional configuration options to customize the form. The following properties are accepted:

- `label`: A label for the form that will render in a list if there are multiple forms. This will default to the name of the component.
- `actions`: A list of form actions, such as [`DeleteAction`](/guides/gatsby/creating-new-files/deleting-files).
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
