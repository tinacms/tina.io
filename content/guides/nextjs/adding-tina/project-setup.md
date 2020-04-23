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

Next.js' default blog starter is _almost_ perfectly equipped to start implementing Tina right away. Per our [project setup recommendations](http://localhost:3000/guides/nextjs/adding-tina/overview#project-setup-recommendations), this blog starter nails two out of three:

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

The first thing we need to do is send the raw Markdown to the frontend. Open up `pages/posts/[slug].js` and take a look at the `getStaticProps` function. This function runs at build time to generate an object of props that are sent to the Post component:

```js
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
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
```

This function calls `markdownToHtml` to transform the markdown content, in `post.content`, into HTML. This HTML is then sent to the Post component instead of the raw Markdown.

All we need to do in order to send the raw Markdown to the frontend is to add the original `post.content` to the return statement:

```diff
  return {
    props: {
      post: {
        ...post,
        content,
+       rawMarkdownBody: post.content,
      },
    },
  }
```

Now in the compoent props, `post.content` will continue to refer to the HTML content, but we can access the raw markdown from `post.rawMarkdownBody`.

### 2. Create a Side Effect to Transform the Markdown

Now that we have access to the raw Markdown in our Post component, we can create a side effect to transform and update it when it changes. If you look at the `Post` component in `pages/posts/[slug].js`, you should see something like this (simplified for brevity):

```jsx
export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    //...
    <PostBody content={post.content} />
    //...
  )
}
```

The component accesses the HTML content of the post in `post.content`. We just saw how `getStaticProps` provides this content to the `Post` component. So, what we need to do here is add some code to transform the Markdown in `post.rawMarkdownBody` and send this to the `PostBody` component instead.

First, add `useState` and `useEffect` to the imports at the top of this file:

```js
import { useState, useEffect } from 'react'
```

**In the body of the Post component**, let's create a State variable to store the transformed HTML. By initializing it with the already-transformed HTML, we will ensure that (1) the blog post will render immediately without having to wait for the initial transformation, and (2) the HTML will still be rendered during Next.js' _Server-Side Rendering_ step.

```js
export default function Post({ post, morePosts, preview }) {
  //...

  const [htmlContent, setHtmlContent] = useState(post.content)

  return (
    //...
    <PostBody content={htmlContent} />
    //...
  )
}
```

At this point, things should work identical to how they did before. Now, though, we can add our side effect to transform the raw Markdown and store it in our State variable:

```jsx
export default function Post({ post, morePosts, preview }) {
  //...

  const [htmlContent, setHtmlContent] = useState(post.content)
  useEffect(() => {
    markdownToHtml(post.rawMarkdownBody).then(setHtmlContent)
  }, [post.rawMarkdownBody])

  return (
    //...
    <PostBody content={htmlContent} />
    //...
  )
}
```

Once you're done, you should be able to open up the `Post` component in React DevTools and edit the `rawMarkdownBody` to see the transformed HTML automatically updated in your browser.

### 3. Prevent Unnecessary Transformation

One minor downside of this is that, even though the Markdown is also transformed at build time, the client-side `markdownToHtml` call is always executed at least once. This may not seem like _that_ big of a deal, but since we're doing this exclusively to facilitate content editing, we should do everything possible to minimize the impact of Tina on visitors to your site.

One way to improve this is to skip the client-side transformation step when the Post component is first mounted with the HTML generated at build time. To do this, let's add `useMemo` to our react imports at the top of the file:

```js
import { useState, useEffect, useMemo } from 'react'
```

We'll use `useMemo` to memoize the initial raw Markdown we receive from `getStaticProps`, and bail out of our `useEffect` if the current value of `rawMarkdownBody` hasn't changed from this initial value.

```diff
export default function Post({ post, morePosts, preview }) {
  //...

  const [htmlContent, setHtmlContent] = useState(post.content)
+ const initialContent = useMemo(() => post.rawMarkdownBody, [])
  useEffect(() => {
+   if (initialContent == post.rawMarkdownBody) return
    ;(async () => {
      const markdownHtml = await markdownToHtml(post.rawMarkdownBody)
      setHtmlContent(markdownHtml)
    })()
  }, [post.rawMarkdownBody])

  return (
    //...
    <PostBody content={htmlContent} />
    //...
  )
}
```

Passing an empty dependencies array to the `useMemo` call will ensure that `initialContent` isn't updated after the initial component mount.

## So, Why Did We do This?

In a moment, we'll be creating a form with Tina. The values we expose for editing via this form will be sent back through our Post component, causing our layout to re-render with the updated content. This is what makes it possible for updates to be previewed in real-time as the content is being written.

If we didn't transform the Markdown on the client-side, we would need to send the updated content back to the filesystem and re-run the build every time something is changed. This is a significantly slower and more resource-intensive workflow, and is complicated to run in the cloud. Doing the extra work to keep the content feedback loop running exclusively in the browser gives us a lot more flexibility in the long run.
