---
title: Register Plugin to Sidebar
---

Now that we've created the `content-creator` plugin, we need to add it to the sidebar so we can access it. When we register the plugin to the sidebar, a create-icon will show up in the sidebar menu. Keep in mind this icon will only show up when the component that registers it is rendered.

![content-creator-icon](/img/content-creator.png)

### Adding the Button to the Blog Index

In this example, we will add the button to the Tina sidebar when visiting the blog index page. There are 3 steps involved:

1. Install `tinacms`
2. Import `RemarkCreatorPlugin` and `withPlugin`
3. Create the `content-creator` plugin
4. Add the plugin to the component

First, if you haven't already, install the `tinacms` package.

```bash
$ yarn add tinacms || npm install --save tinacms
```

**Example: src/pages/index.js**

```jsx
// 1. Import `RemarkCreatorPlugin` and `withPlugin`
import { withPlugin } from 'tinacms'
import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

// Note: this is just an example index component.
function BlogIndex(props) {
  const { data } = props
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
    </Layout>
  )
}

// 2. Create the `content-creator` plugin
const CreatePostPlugin = new RemarkCreatorPlugin({
  label: 'Create Post',
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/blog/hello-world/index.md',
      description:
        'The full path to the new markdown file, relative to the repository root.',
    },
  ],
  filename: form => {
    return form.filename
  },
})

// 3. Add the plugin to the component
export default withPlugin(BlogIndex, CreatePostPlugin)
```

> NOTE: No changes need to be made to the `BlogIndex` component itself.

### Creating Content

With the plugin in place, **open TinaCMS and click the menu button** in the top-left corner. The menu panel will slide into view with the button at the top.

Click the "Create Post" button and a modal will pop up. Enter the path to a new file relative to your repository root (e.g. `content/blog/my-new-post.md`) and then click "create". A moment later the new post will be added to your Blog Index.
