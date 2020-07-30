---
title: 'Editing with Tina '
---

At this point, we have a blog that is pulling all its data from Strapi! You _could_ stop here and edit your blog through the Strapi management console, but this guide is about editing with Tina!

## Prepare our page

Almost all of the work we'll be doing will be in `pages/posts/[slug].js`. Our goal is to be able to make changes to a blog post's `content`, `title`, and `coverImage` without logging in to the Strapi admin interface.

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

**pages/posts/\[slug\].js**

```diff
- export default function Post({ post, morePosts, preview }) {
+ export default function Post({ post: initialPost, preview }) {
```

Now we set up a form and the fields that we'll be editing. Check out our [form docs](/docs/forms) to get more information about how to configure forms.

**pages/posts/\[slug\].js**

```js
import { useForm, usePlugin } from 'tinacms'
// ...

export default function Post({ post: initialPost, preview }) {

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

  //...
```

I've left `onSubmit` empty for now. The next page in the guide will show you how to save changes to Strapi.

We need to install a few more dependencies to give ourselves access to inline and markdown editing.

```bash
yarn add react-tinacms-inline react-markdown react-tinacms-editor
```

We're going to make a few changes to wrap the fields on this page with inline-editable versions. Let's take this piece by piece and explain as we go.

First we'll wrap the entirety of the blog post page with an inline form.

**pages/posts/\[slug\].js**

```diff
+ import { InlineForm } from "react-tinacms-inline";
   // ...
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

Next we need to go into the components used on this page, and wrap the content with the appropriate inline-fields. The `title` is just a simple `InlineText` field.

**components/post-header.js**

```diff
+  import { InlineText } from 'react-tinacms-inline'

   // ...
   <PostTitle>
-    {title}
+    <InlineText name="title" />
   </PostTitle>
```

A little more complicated is the `InlineImage` field that we'll need to include. This field needs a bit of additional contex because it needs to know how to upload and display the image that lives in the Strapi server.

**components/post-header.js**

```diff
+ import { useCMS } from "tinacms";
- import { InlineText } from 'react-tinacms-inline'
+ import { InlineImage, InlineText } from 'react-tinacms-inline'
  // ...
- import CoverImage from '../components/cover-image'

  export default function PostHeader({ title, coverImage, date, author }) {
+   const cms = useCMS();
    // ...

  <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
-    <CoverImage title={title} src={coverImage} />
+    <InlineImage
+      name="coverImage.url"
+      previewSrc={(formValues) => {
+        process.env.STRAPI_URL + cms.media.store.getFilePath(formValues.coverImage.url)
+      }}
+      uploadDir={() => "/uploads"}
+      parse={(filename) => {
+        return `/uploads/${filename}`;
+      }}
+    >
+      {() => <img src={coverImage} alt={`Cover Image for ${title}`} />}
+    </InlineImage>
   </div>
```

Here we used the `useCMS` hook to get access to our CMS object. In `_app.js` we've attached a Strapi media store to this object, and we need access to that here to help us resolve image urls.

🤚In order to be able to upload images you'll want to head over to Strapi's **Roles & Permissions**, then select all **uploads** and save.  

Now let's head over to `post-body.js` and wrap the content of our blog post with a WYSIWYG markdown editor. This will take care of the markdown parsing that we removed earlier.

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

Now reload one of your blog posts, if you previously noticed that formatting was missing you should notice that it's back. Click on the button to **Edit this Site** and you should see that you can now change the fields on this page. Clicking the save button won't quite work yet. That's our next and final step!
