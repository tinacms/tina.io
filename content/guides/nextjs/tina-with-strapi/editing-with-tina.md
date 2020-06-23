---
title: 'Editing with Tina '
---

At this point, we have a blog that is pulling all its data from Strapi! You _could_ stop here and edit your blog through the Strapi management console, but this guide is about editing with Tina!.

From this point on, this guide will share a lot of similarities with our other guide on [Adding Tina to a Next.js Site](/guides/nextjs/adding-tina/overview). If I leave out some context on one of the steps here, you can always head over there and see if that guide fills in any gaps.

## Prepare our page

Almost all of the work we'll be doing will be in `pages/posts/[slug].js`. Our goal is to be able to make changes to a blog post's content, title, and coverImage without having to log in to Strapi.

### Transform Markdown on the Frontend

Currently, markdown is being parsed in `getStaticProps`, which is to say markdown is being parsed when our page is generated, not while our page is being displayed. We want markdown to be parsed while our page is displayed so we can see formatting in real-time. To facilitate this, we need to send the raw markdown from `getStaticProps`.

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

Let's create a state variable to store the parsed markdown and tell the page to use this new variable.

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

Everything should be working as it did before. But now we can watch for state changes and parse them from markdown on the fly. Let's add a side effect that does this.

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

Now, any time `post.rawMarkdownBody` changes, we'll transform it into HTML and set it in the `htmlContent` state variable. We're ready to give the user a way to edit this data.

> For a better explanation of that steps we took, take a look at [our other guide](/guides/nextjs/adding-tina/project-setup#1-send-the-raw-markdown-from-the-backend).

### Adding a form

To make things a bit easier, we're going to rename the initial post that we hand to our `Post` component to `initialPost`. This will allow us to use the name `post` to hold the values that Tina will pass us, and we won't need to make changes to the page's content.

```diff
- export default function Post({ post, morePosts, preview }) {
+ export default function Post({ post: initialPost, morePosts, preview }) {
```

Now we set up a form and the fields that we'll be editing. Check out our [form docs](/docs/forms) to get more information about how to configure forms. .

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
usePlugin(form)
```

I've left `onSubmit` empty for now. The next page in the guide will show you how to save changes to Strapi.

@TODO: Install react-tinacms-inline
@TODO: react-markdown, react-tinacms-editor

We'll wrap the portion of the page that we want to be editable with an `InlineForm`..

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

Then we will use the appropriate inline fields on each of the fields that we want to be editable.

TODO: Expound
**components/post-header.js**

```diff
      <PostTitle>
-       {title}
+       <InlineText name="title" />
      </PostTitle>
```

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

@TODO: Explain why I did this here instead of inside CoverImage

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

Reload the page, enter edit mode, and you should see that all of these fields are now editable in some form. They should look roughly the same as they do outside of edit mode. Now let's work on being able to save any changes we make back to Strapi.
