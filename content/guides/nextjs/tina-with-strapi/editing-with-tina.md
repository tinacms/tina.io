---
title: 'Editing with Tina '
---

We have a blog set up and pulling data from Strapi now 🎉! You _could_ stop here and edit your blog through the Strapi management console, but since you're on our website you're probably interested in using Tina's slick editing experience.

From this point on this guide is going to share a lot of similarities with our other guide on [Adding Tina to a Next.js Site](/guides/nextjs/adding-tina/overview). If I leave out some context on one of the steps here, you can always head over there and see if that guide fills in any gaps.

## Prepare our page

Almost all of the work we'll be doing will be in our `pages/posts/[slug].js` file. Our goal is to be able to make changes to a blog post without needing to navigate away from the front-end experience.

### Transform Markdown on the Frontend

Right now markdown is being parsed in `getStaticProps`, which is to say markdown is being parsed when our page is generated, not while our page is being displayed. We want markdown to be parsed while our page is being displayed so we can see formatting in real-time. To faciliate this the first thing we need to do is send the raw markdown from `getStaticProps`.

```diff
  return {
    props: {
      post: {
        ...post,
        content,
+       rawMarkdownBody: post.content,
      },
    },
  };
}
```

Let's create a state variable to store the parsed markdown and tell the page to use this new state variable.

```js
import { useState } from 'react'
export default function Post({ post, morePosts, preview }) {
  // ...
  const [htmlContent, setHtmlContent] = useState(post.content)
  // ...
  return (
    //...
    <PostBody content={htmlContent} />
    //...
  )
}
```

Everything should be working as it did before. But now we have ability to watch for state changes and parse them from markdown on the fly. Let's add a side effect that does this.

```js
import { useState, useEffect, useMemo } from 'react'
export default function Post({ post, morePosts, preview }) {
  //...

  const [htmlContent, setHtmlContent] = useState(post.content)
  const initialContent = useMemo(() => post.rawMarkdownBody, [])
  useEffect(() => {
    // a little optimization to save us from transforming on initial render
    if (initialContent == post.rawMarkdownBody) return
    markdownToHtml(post.rawMarkdownBody).then(setHtmlContent)
  }, [post.rawMarkdownBody])
  // ...
  return (
    //...
    <PostBody content={htmlContent} />
    //...
  )
}
```

Now, any time `post.rawMarkdownBody` changes we'll transform it into HTML and set it in the `htmlContent` state variable. Neat. Now we're ready to give the user a way to actually edit this data.

> For a better explanation of that steps we took, take a look at [our other guide](/guides/nextjs/adding-tina/project-setup#1-send-the-raw-markdown-from-the-backend).

### Adding a form

To make our lives a little bit easier, the first thing we're going to do is rename intial post that we hand to our `Post` component to `initialPost`. This will allow us to easily swap to a variable called `post` that Tina will be working with.

```diff
- export default function Post({ post, morePosts, preview }) {
+ export default function Post({ post: initialPost, morePosts, preview }) {
```

@TODO: Rejigger
Checkout our [form docs](/docs/forms) to get more information about how to configure forms. In this guide we're going to set up a simple inline form that let's you change the title, body, and image associated with a blog post. Add the following into the `Post` component to set up and initialize the form.

```js
import { useForm, usePlugin } from 'tinacms'
// ...
const formConfig = {
  id: initialPost.id,
  label: 'Blog Post',
  initialValues: initialPost,
  onSubmit: () => {
    alert('Saving!')
  },
  fields: [
    {
      name: 'title',
      label: 'Post Title',
      component: 'text',
    },
    {
      name: 'rawMarkdownBody',
      label: 'Content',
      component: 'markdown',
    },
    {
      // TODO: Add the image stuff
    },
  ],
}
const [post, form] = useForm(formConfig)
// usePlugin(form);
```

I've left `onSubmit` empty for right now, since it's probably worth talking about seperately. @TODO The image stuff will probably need a bit of explaining too.

@TODO: Install react-tinacms-inline

Now we need to do some work to wrap our input with the inline form/fields components.

**pages/posts/\[slug\].js**

```diff
+  <InlineForm form={form} initialStatus={"active"}>
      <PostHeader
      title={post.title}
      coverImage={process.env.STRAPI_URL + post.coverImage.url}
      date={post.date}
      author={post.author}
      />
      <PostBody content={htmlContent} />
+  </InlineForm>
```

**components/post-header.js**

```diff
      <PostTitle>
-       {title}
+       <InlineText name="title" />
      </PostTitle>
```

@TODO: react-markdown, react-tinacms-editor

**components/post-body.js**

```js
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <InlineWysiwyg name="rawMarkdownBody" format="markdown">
        <ReactMarkdown source={content} />
      </InlineWysiwyg>
    </div>
  )
}
```

### Inline Image Field

```diff
 <div className="-mx-5 sm:mx-0">
-   <CoverImage title={title} src={coverImage} />
+   <InlineImage
+     name="coverImage.url"
+     previewSrc={(formValues) => {
+       process.env.STRAPI_URL + getFilePath(formValues.coverImage.url)
+     }}
+     uploadDir={() => "/uploads"}
+     parse={(filename) => {
+       return `/uploads/${filename}`;
+     }}
+   >
+     {() => <img src={coverImage} alt={`Cover Image for ${title}`} />}
+   </InlineImage>
 </div>
```

Reload the page and you should see that all of these fields are now editable in some form, with roughly the same styling that they had before. Now let's work on being able to save any changes we make back to Strapi.
