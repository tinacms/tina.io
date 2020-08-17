---
title: Project Setup
---

We're going to use the Next.js [blog starter](https://github.com/zeit/next.js/tree/canary/examples/blog-starter) as the base for our project. Create a new project by running the following commands in your terminal:

```bash
yarn create next-app -e blog-starter my-tina-blog
```

This will create a new blog starter in the `my-tina-blog` directory. Navigate to the project directory and run `yarn dev` to start the website in dev mode.

```bash
cd my-tina-blog
yarn dev
```

## Additional Setup

Next.js' default blog starter is _almost_ perfectly equipped to start implementing Tina right away. Per our [project setup recommendations](https://tinacms.org/guides/nextjs/adding-tina/overview#project-setup-recommendations), this blog starter nails two out of three:

- ✔️ Uses the new data fetching methods introduced in Next.js 9.3
- ✔️ Uses function components instead of class components

However, there is one point we need to address:

- ❌ Does not perform content transformation client-side

This last point, as mentioned before, is a significant obstacle to ensuring a good editing experience with Tina. The Next.js blog starter stores its content in Markdown, and requires a compile step to convert the Markdown into HTML, which it performs at build time.

It's worth noting that you can expect to come across this issue frequently for projects that aren't set up to work with Tina. Unless you are building your site to work specifically with a CMS that runs on the client-side and offers real-time previewing, there's no reason to perform this transformation client-side. Most projects, like this one, will opt to do it server-side or (as is common with JAMstack projects) during a build step.

## Setting up Client-Side Content Transformation

The good news is that setting up client-side content transformation for the Next.js starter blog doesn't require too many steps.

> **Transforming content at build-time isn't bad**
>
> It's important to emphasize that transforming content client-side is not _better_ than doing it server-side or at build time, we just want it to be possible so that Tina users can preview their transformed content as they edit the source.
>
> Indeed, the best solution will usually involve continuing to transform your content at the server-side or build step as usual, but adding additional content-transforming behavior to the client-side.

### 1. Send the Raw Markdown From the Backend

The first thing we need to do is send the raw Markdown to the frontend. Open up `pages/posts/[slug].js` and take a look at the `getStaticProps` function. This function runs at build time to generate an object of props that are sent to the Post component. Remove the call to `markdownToHtml`

```diff
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
- const content = await markdownToHtml(post.content || '')

  return {
    props: {
-     post: {
-       ...post,
-       content,
-     },
+     post,
    },
  }
}
```

Now in the component props, `post.content` will refer to the raw markdown.

### 2. Parse the Markdown Client Side using _react-markdown_

```bash,copy
yarn add react-markdown
```

Open `components/page-body.js` and replace its contents with:

```js,copy
import ReactMarkdown from 'react-markdown'
import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles['markdown']}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
```

## So, Why Did We do This?

In a moment, we'll be creating a form with Tina. The values we expose for editing via this form will be sent back through our Post component, causing our layout to re-render with the updated content. This is what makes it possible for updates to be previewed in real-time as the content is being written.

If we didn't transform the Markdown on the client-side, we would need to send the updated content back to the filesystem and re-run the build every time something is changed. This is a significantly slower and more resource-intensive workflow, and is complicated to run in the cloud. Doing the extra work to keep the content feedback loop running exclusively in the browser gives us a lot more flexibility in the long run.
