---
title: Gatsby + Tina 101
date: '2020-02-24T07:00:00.000Z'
author: Madelyn Eriksen
draft: false
consumes:
  - file: /packages/gatsby-tinacms-remark/src/remark-creator-plugin.ts
    details: Demonstrates use of RemarkCreatorPlugin
---

Static site generators like [Gatsby](https://www.gatsbyjs.org/) are a huge win for developers- with easy deployments, faster development cycles, and reduced security burden compared to older server-side frameworks.

However, static sites have a hampered content editing story- working with Git or markdown directly is not as user-friendly as content management systems like Wordpress or Drupal. Content authors need a better solution for content editing.

[TinaCMS](https://tinacms.org/docs/getting-started/introduction) is an _extensible_ toolkit for adding CMS-functionality to static sites. Tina allows us as developers to still use the formats we love, like Markdown and JSON, while providing a slick experience for our content authors.

I decided to add TinaCMS to an existing Gatsby site- my [Gatsby starter, _Tyra_](https://github.com/madelyneriksen/gatsby-starter-tyra/). Here's a walkthrough of my process that you can use to convert your own site!

> **In a rush?** _Check out the code [on Github](https://github.com/madelyneriksen/gatsby-starter-tyra)_

## Getting Started with Tina

Tina is a non-intrusive library you can use to add editing capabilities to your site. All your page generation logic can remain _exactly_ the same- it's easy to take an existing Gatsby site and drop in dynamic content editing.

There's a collection of plugins you will need to install and register with Gatsby to add Tina into your site. Let's do that now.

### Installing Tina

Like most things in the Javascript world, the packages we need are installable with `npm` or `yarn`. _Tyra_ uses NPM, but use whichever command is relevant for your project.

```bash
# NPM
npm i --save gatsby-plugin-tinacms gatsby-tinacms-git gatsby-tinacms-remark styled-components

# Or using Yarn
yarn add gatsby-plugin-tinacms gatsby-tinacms-git gatsby-tinacms-remark styled-components
```

We need to add the Gatsby plugins for Tina itself, to interface Git with Tina, and to support markdown files (via Remark). Since _Tyra_ already had the Remark Gatsby plugin and all related dependencies installed, I only needed to install plugins specific to TinaCMS.

If you're starting from scratch, you'll need to install Gatsby plugins for loading Markdown files. The [Gatsby docs](https://www.gatsbyjs.org/docs/adding-markdown-pages/) have a great guide to using Markdown in Gatsby!

### Configuring Tina

In Gatsby, most new or complex functionality is added with _plugins_- Tina is no different in this regard. We'll need to add the relevant entires for Tina to our `gatsby-config.js` file.

```javascript
# gatsby-config.js
module.exports = {
  siteMetadata: {
    // ...snip
  },
  plugins: [
    {
      resolve: `gatsby-plugin-tinacms`,
      options: {
        plugins: [
          `gatsby-tinacms-git`,
          `gatsby-tinacms-remark`,
        ],
      },
    },
    // ... Other plugins below!!
  ]
}
```

I'm using Remark for all my content in _Tyra_, but TinaCMS also supports the use of JSON content using the [gatsby-tinacms-json](https://tinacms.org/docs/gatsby/json/) plugin. JSON is great for page content and [blocks](https://tinacms.org/blog/what-are-blocks/), but for simple blog posts the Remark Gatsby plugin is sufficient.

Since _Tyra_ is a Git repository, all changes in content will need to be committed back into the repository. The `gatsby-tinacms-git` plugin handles the creation of new commits with content, without requiring your content authors to use Git. By default, changes are pushed to a remote branch, but the plugin can be configured with different behavior.

## Tina-Powered Editing

In the _Tyra Starter_, blog posts are contained in a functional `Post` component, which renders the markdown, SEO-focused metadata, and the hero image for each post.

To let our content authors edit these, we can wrap our `Post` component in a higher-order component provided by Tina- `inlineRemarkForm`.

Here's what that looks like:

```javascript
// src/blog/post.js

import React from 'react'
import Layout from '../common/layouts'
import Hero from './components/hero.js'
import Body from './components/body.js'
import Seo from './seo.js'
import MetaSeo from '../common/seo'
import { graphql } from 'gatsby'

import { inlineRemarkForm } from 'gatsby-tinacms-remark' // New Tina Imports!

const Post = ({ location, data }) => {
  const {
    category,
    date,
    dateOriginal,
    author,
    title,
    slug,
    metaDescription,
  } = data.post.frontmatter
  const content = data.post.html
  return (
    <Layout>
      <Seo
        slug={slug}
        title={title}
        date={dateOriginal}
        description={metaDescription}
        author={author}
        image={data.post.frontmatter.postImage.childImageSharp.original.src}
      />
      <MetaSeo title={title} description={metaDescription} />
      <Hero author={author} date={date} category={category} title={title} />
      <Body
        content={content}
        description={metaDescription}
        image={data.post.frontmatter.postImage.childImageSharp.original.src}
        location={location}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMM Do, YYYY")
        dateOriginal: date
        category
        author
        title
        metaDescription
        slug
        postImage {
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      # Tina uses additional, specialized query data. You can add required
      # data using this GraphQL fragment.
      ...TinaRemark
    }
    date: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date
      }
    }
  }
`

export default inlineRemarkForm(Post, { queryName: 'post' })
```

The function `inlineRemarkForm` will take our `Post` component as an argument and return a wrapped component with all the plumbing Tina needs. This pattern is named ["higher-order components"](https://reactjs.org/docs/higher-order-components.html)- it allows the injection of custom logic into existing React components.

In our GraphQL, we've added a fragment `TinaRemark`. This pulls out additional data that Tina needs in order to allow file editing. I also used a non-standard query name for my post data (`post`). Thankfully, it's easy to change what data Tina uses by passing in a configuration object to `inlineRemarkForm`.

At this point, if we start our application, we can hop over to [localhost:8000](http://localhost:8000/) and see that Tina is working!

```bash
npm start
```

When you navigate to a blog post, and click the "Pencil" icon in the bottom left-hand corner, the Tina sidebar will appear and let you edit your Markdown posts.

![Woohoo! Markdown editing is working!](/img/blog/gatsby-tina-101/madalyn_blog_1.png)

Awesome right? Here I've changed the author from "Jane Doe" to "Madelyn Eriksen". I can actually save those changes in the Tina sidebar too- that process triggers an automatic commit in `git` and will push to a remote branch.

How Tina interacts with git is completely configurable- it's possible to change the commit message, disable automatic commits, or even change the git user.

```javascript
// gatsby-config.js
module.exports = {
  // ...snip
  plugins: [
    {
      resolve: `gatsby-plugin-tinacms`,
      options: {
        plugins: [
          `gatsby-tinacms-remark`,
          // Replaces the other gatsby-tinacms-git entry.
          {
            resolve: `gatsby-tinacms-git`,
            options: {
              defaultCommitMessage: `Custom Commit Message`, // Change this!
              pushOnCommit: false,
            },
          },
        ],
      },
    },
    // ...snip
  ],
}
```

### Friendly Form Fields

Our sidebar is okay for making changes to articles, but it would be a lot nicer if the form fields weren't things like `rawFrontmatter.title`. Our content authors would likely not appreciate labels like that!

There's also fields _Tyra_ uses internally that should be considered "private"- like `type` to identify posts.

We can configure the sidebar form fields by passing in a `FormConfig` object to Tina to control rendering. [Customizing forms with Tina](https://tinacms.org/docs/gatsby/markdown/#customizing-remark-forms) is straightforward, only requiring the addition of a Javscript object to declare our form fields.

Back in our `src/blog/post.js`, we can add in a config to define how our fields should be labeled:

```
// ...snip

const FormConfig = {
  label: `Blog Post`,
  queryName: `post`,
  fields: [
    {
      label: `Title`,
      name: `rawFrontmatter.title`,
      description: `The title of your post.`,
      component: `text`,  // A simple text input
    },
    {
      label: `Post Image`,
      name: `rawFrontmatter.postImage`,
      component: `image`,
      // Converts uploaded images into filepaths.
      parse: filename => `./img/${filename}`,
      // Creates a filepath to preview thumbnails.
      previewSrc: (formValues, { input }) => {
        const [_, field] = input.name.split(".");
        const node = formValues.frontmatter[field];
        const result = node ? node.childImageSharp.fluid.src : "";
        return result;
      },
      uploadDir: () => `/content/posts/img/`,
    },
    {
      label: `Author`,
      name: `rawFrontmatter.author`,
      description: `Your full name.`,
      component: `text`,
    },
    {
      label: `Date Published`,
      name: `rawFrontmatter.date`,
      description: `The date your post was published.`,
      component: `date`,
      dateFormat: `YYYY-MM-DD`,
      timeFormat: false,
    },
    {
      label: `Category`,
      name: `rawFrontmatter.category`,
      description: `The category of your post.`,
      component: `text`,
    },
    {
      label: `Post URL`,
      name: `rawFrontmatter.slug`,
      description: `The URL your post will be visible at.`,
      component: `text`,
    },
    {
      label: `SEO Description`,
      name: `rawFrontmatter.metaDescription`,
      description: `Description used for search engine results.`,
      component: `text`,
    },
    {
      label: `Content`,
      name: `rawMarkdownContent`,
      description: `Write your blog post here!`,
      component: `markdown`,
    },
  ]
};

export default inlineRemarkForm(Post, FormConfig);  // Replaces the inline form config.
```

We're using `text`, `markdown`, `date`, and even `image` fields to make the post authoring experience nicer. Tina has [a bunch](https://tinacms.org/docs/fields/) of built-in fields, and even allows you to [add your own](https://tinacms.org/docs/fields/custom-fields) if you'd like.

Since the post image is included in the frontmatter, we need Tina to handle image uploads for our content authors, as well as update previews. Setting up uploads is easy- you just declare the upload directory, as well as parse out a preview thumbnail from uploaded images.

```javascript
{
  label: `Post Image`,
  name: `rawFrontmatter.postImage`,
  component: `image`,
  parse: filename => `./img/${filename}`, // function to convert uploaded images.
  previewSrc: (formValues, { input }) => {
    // Create a function for viewing previews.
    const [_, field] = input.name.split(".");
    const node = formValues.frontmatter[field];
    const result = node ? node.childImageSharp.fluid.src : "";
    return result;
  },
  uploadDir: () => `/content/posts/img/`,
}
```

Putting all that together, our sidebar looks a _lot_ more inviting and easier to work with.

![We have a sidebar that's nice!](/img/blog/gatsby-tina-101/madalyn_blog_2.png)

> **Note:** Since your content authors may not fill out all fields immediately (like a developer in a Markdown file), its important to make sure your site robustly handles potentially empty fields in `frontmatter`.

It'd sure be nicer though if we could just edit content right on the page, though. Let's do that now.

## Inline WYSIWYG Editing

Inline editing means changing the page _on the page itself_. Rather than using a different authoring screen, your content authors can just click on the page to start making edits. It's a natural way to write content for the web (if you aren't a developer 😉).

Thankfully, Tina supports inline editing with a "what you see is what you get" (WYSIWYG) editor for markdown! Adding an inline editor only requires a few changes to our code- no architectural changes to our site.

### Adding Edit Props

The higher order `inlineRemarkForm` component passes down two props we haven't used yet: `isEditing` and `setIsEditing`. You can use these props to toggle and observe "edit mode" in your code. These need to be added to your component that gets wrapped in `inlineRemarkForm`:

```
// src/blog/post.js

// ...snip
const Post = ({ location, data, isEditing, setIsEditing }) => {
  // ...snip
}
```

I wanted to have edit mode be toggled with a simple button right above the post- the toggle can be anything you want! Fancier options would be using [React Portals](https://reactjs.org/docs/portals.html) to render buttons elsewhere in the DOM, or listening to click or keyboard events.

To add a button, I used standard "props drilling" to pass down the editing state to my `Body` component:

```
// src/blog/post.js

const Post = ({ location, data, isEditing, setIsEditing }) => {
// ...snip
  return (
    // ...snip
    <Body
      content={content}
      description={metaDescription}
      image={data.post.frontmatter.postImage.childImageSharp.original.src}
      location={location}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
    // ...snip
  );
```

In my `Body` component, I then added a button that's only rendered in `development` mode. In production builds, our editing button will never get rendered- but out content authors will still see it on the development server.

```javascript
import React from 'react'
import Sidebar from './sidebar.js'
import Suggested from './suggested.js'

import 'tachyons'

import '../../common/styles/custom.tachyons.css'
import '../styles/grid.css'

const buttonStyles = `
db pv3 ph5 mb3 tracked ttu b bg-dark-gray
near-white sans-serif no-underline
hover-gray b--dark-gray
`

export default ({
  isEditing,
  setIsEditing,
  content,
  image,
  description,
  location,
}) => (
  <div className="min-vh-100 blog__grid">
    <div style={{ gridArea: 'header' }} />
    <section
      className="mw8 serive f4 lh-copy center pa2 article__container"
      style={{ gridArea: 'content' }}
    >
      {/* Only display the edit button in development mode! */}
      {process.env.NODE_ENV === 'development' && (
        <button className={buttonStyles} onClick={() => setIsEditing(p => !p)}>
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
    <Sidebar img={image} desc={description} location={location} />
    <Suggested />
  </div>
)
```

This adds a big button that our content authors can use to turn on the editor. On the page, it ends up looking like this:

![](/img/blog/gatsby-tina-101/madalyn_blog_3.png)

Neat! Now that we have edit mode configured, we need to add inline editing support itself.

### Adding Inline Editing

Now the complicated part- adding inline editing. Did I say complicated? It's actually only four lines of code! 😱

```javascript
// ...snip

import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'

export default (
  {
    // ...snip
  }
) => (
  <div className="min-vh-100 blog__grid">
    <div style={{ gridArea: 'header' }} />
    <section
      className="mw8 serive f4 lh-copy center pa2 article__container"
      style={{ gridArea: 'content' }}
    >
      {process.env.NODE_ENV === 'development' && (
        <button className={buttonStyles} onClick={() => setIsEditing(p => !p)}>
          {isEditing ? 'Preview' : 'Edit'}
        </button>
      )}
      {/* Wraps up the content with a WYSIWYG Editor */}
      <TinaField name="rawMarkdownBody" Component={Wysiwyg}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TinaField>
    </section>
    <Sidebar img={image} desc={description} location={location} />
    <Suggested />
  </div>
)
```

Before adding the inline editor, we had a `div` that renders internal HTML. To convert it to a WYSIWYG editor, all we had to do was wrap it in a `TinaField` component:

```javascript
<TinaField name="rawMarkdownBody" Component={Wysiwyg}>
  <div dangerouslySetInnerHTML={{ __html: content }} />
</TinaField>
```

Since it's wrapping markdown body, we assign the `name` prop the value `rawMarkdownBody`. To render the Wysiwyg editor, we pass in the `Wysiwyg` editor component from `@tinacms/fields` as a property. Tina uses this passed in component to render the "edit mode" version of the content.

Of course, we also had to import the relevant React components to be able to _use_ them.

```javascript
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'
```

With those code snippets added, we actually can use the inline editor now- right on the blog post page!

![Woah! Now that's fancy.](/img/blog/gatsby-tina-101/madalyn_blog_4.png)

To finish of our editing experience, all we really need is the ability to add new posts using Tina!

## Authoring New Posts

Tina has a type of plugin to create content, aptly named [content creator plugins](https://tinacms.org/docs/gatsby/creating-new-files#1-add-content-creator-plugin). Content creators are in essence factories that create file objects, except they are injected or "plugged in" to your React site.

We need to create a plugin to author new markdown files, so let's add a new plugin to our blog in `src/blog/plugins/postCreator.js`:

```javascript
// src/blog/plugins/postCreator.js

import { RemarkCreatorPlugin } from 'gatsby-tinacms-remark'

// Convert a URL slug into a filename
const slugToFilename = str => str.replace(`/`, `-`) + `.md`

// Turns a date into a string in YYYY-MM-DD format
const YYYYMMDD = date => date.toISOString().split('T')[0]

const defaultFrontmatter = form => ({
  title: form.title,
  slug: form.slug,
  author: form.author,
  category: form.category,
  date: YYYYMMDD(new Date()),
  postImage: `./img/flatlay.jpg`,
  metaDescription: ``,
  type: `post`,
})

const CreatePostPlugin = new RemarkCreatorPlugin({
  label: `New Blog Post`,
  filename: form => `content/posts/${slugToFilename(form.slug)}`,
  frontmatter: defaultFrontmatter,
  fields: [
    {
      label: `Title`,
      name: `title`,
      description: `The title of your post.`,
      component: `text`,
    },
    {
      label: `Author`,
      name: `author`,
      description: `Your full name.`,
      component: `text`,
    },
    {
      label: `Category`,
      name: `category`,
      description: `Category of your post.`,
      component: `text`,
    },
    {
      label: `Post URL`,
      name: `slug`,
      description: `The URL your post will be visible at.`,
      component: `text`,
    },
  ],
})

export default CreatePostPlugin
```

The function `RemarkCreatorPlugin` in `gatsby-tinacms-remark` uses a configuration object to create our new plugin class, `CreatePostPlugin`. In the config, the `field` values follow the same patterns TinaCMS uses for defining forms in the content editor.

You also can control the generated frontmatter using the `frontmatter` property. Tina expects a function that transforms an object with form values into an object that becomes the frontmatter.

I added a function called `defaultFrontmatter` to convert those form values into the frontmatter of a Markdown file. Additionally, "private" parts of the frontmatter, like the `type` field, have values added directly.

```javascript
const defaultFrontmatter = form => ({
  title: form.title,
  slug: form.slug,
  author: form.author,
  category: form.category,
  // All default values are below
  date: YYYYMMDD(new Date()),
  postImage: `./img/flatlay.jpg`,
  metaDescription: ``,
  type: `post`,
})
```

What you need in each post will be different for every site, and that's the best part- Tina works _with_ the code you have, rather than requiring you to accommodate it.

### Adding the Plugin to the Site

I wanted content authors to be able to add new posts to the site from anywhere. To that end, I used the `withPlugin` function on my root layout component.

```javascript
// src/common/layouts/index.js
import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/navbar.js'
import Footer from '../components/footer.js'
import 'tachyons'
import '../styles/custom.tachyons.css'

import { withPlugin } from 'tinacms'
import CreatePostPlugin from '../../blog/plugins/postCreator'

const Layout = props => (
  <React.Fragment>
    <Helmet>
      <body className="bg-near-white mid-gray" />
    </Helmet>
    <Navbar />
    {props.children}
    <Footer />
  </React.Fragment>
)

export default withPlugin(Layout, CreatePostPlugin)
```

`withPlugin` is another higher-order component that adds a plugin to the Tina sidebar when the component it wraps is being used. Since my `Layout` component is used for every page in _Tyra_, content authors can easily add posts from anywhere!

Now we can use our new plugin in the sidebar! Hitting the "plus" symbol in the sidebar will provide an option to create a new blog post. If we click that, our plugin's form pops up in a modal.

![We can create new posts!](/img/blog/gatsby-tina-101/madalyn_blog_5.png)

## Conclusions + Next Steps

That's all it takes to create a basic blog's CMS! 🎉 We've used TinaCMS to allow content authors to easily create and edit new posts- right on the blog itself. You can check out the finished result over [on Github](TODO: Github Link)!

This only scratches the surface of what you can build using Tina. If you want to go further, there's several more advanced features you can use to expand your Gatsby site!

- Creating [custom form fields](https://tinacms.org/docs/fields/custom-fields) for new data types,
- Using [global forms](https://tinacms.org/docs/concepts/forms#local--global-forms) to allow custom site themes,
- Or adding [block-level editing](https://tinacms.org/docs/fields/blocks) to allow for completely custom pages!

The Tina project is also [active on Github](https://github.com/tinacms/tinacms), with a [guide to contribution](https://tinacms.org/docs/contributing/guidelines) if you want to hack on the code!

---

Thanks for reading! I had a bunch of fun working with TinaCMS and Gatsby for this project. If you have any questions or want to point out something I missed, please feel free to [shoot me an email](https://madelyneriksen.com/contact) tell me what's on your mind!
