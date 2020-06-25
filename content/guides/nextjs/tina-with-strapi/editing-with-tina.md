---
title: 'Editing with Tina '
---

At this point, we have a blog that is pulling all its data from Strapi! You _could_ stop here and edit your blog through the Strapi management console, but this guide is about editing with Tina!

## Prepare our page

Almost all of the work we'll be doing will be in `pages/posts/[slug].js`. Our goal is to be able to make changes to a blog post's `content`, `title`, and `coverImage` without having to log in to Strapi.

### Transform Markdown on the Frontend

Currently, markdown is being parsed in `getStaticProps`, which is to say markdown is being parsed when our page is generated, not while our page is being displayed. Let's get rid of that so that we can parse markdown on the front-end as we are editing the page.

**pages/posts/\[slug\].js**

```diff
- const content = await markdownToHtml(post.content || '')

  if (preview) {
    return {
      props: {
        post: {
          ...post,
-         content
        },
        preview,
        ...previewData,
      },
    };
  }

  return {
    props: {
      post: {
        ...post,
-       content,
      },
    },
  }
}
```

If you refresh a blog post now, there's a good chance things will look slightly different. We've removed all markdown parsing from the page so any text formatting should be gone. We'll be fixing this by adding a form and fields that will parse the markdown for us.

### Adding a form

To make things a bit easier, we're going to rename the initial post that we hand to our `Post` component to `initialPost`. This will allow us to use the name `post` to hold the values that Tina will pass us, and we won't need to make changes to the page's content.

```diff
- export default function Post({ post, morePosts, preview }) {
+ export default function Post({ post: initialPost, morePosts, preview }) {
```

Now we set up a form and the fields that we'll be editing. Check out our [form docs](/docs/forms) to get more information about how to configure forms.

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
  fields: [],
}
const [post, form] = useForm(formConfig)
usePlugin(form)
```

I've left `onSubmit` empty for now. The next page in the guide will show you how to save changes to Strapi.

We need to install a few more dependencies to give ourselves access to inline and markdown editing.

```bash
yarn add react-tinacms-inline react-markdown react-tinacms-editor
```

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
      <PostBody content={post.content} />
+  </InlineForm>
```

Then we will use the appropriate inline fields on each of the fields that we want to be editable.

**components/post-header.js**

```diff
+  import { InlineText } from 'react-tinacms-inline'
   <PostTitle>
-    {title}
+    <InlineText name="title" />
   </PostTitle>
```

**components/post-body.js**

```js
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from 'react-markdown'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <InlineWysiwyg name="content" format="markdown">
        <ReactMarkdown source={content} />
      </InlineWysiwyg>
    </div>
  )
}
```

**components/post-header.js**

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

> It may look weird that we're not adding the `InlineImage` field to **post-header.js** instead of **cover-image.js**, but we're doing this because **CoverImage** is also used on the index page, where we don't want to add an editing experience.

Now reload one of your blog posts, if you previously noticed that formatting was missing you should notice that it's back. Click on the button to **Edit this Site** and you should see that you can now change the fields on this page.
