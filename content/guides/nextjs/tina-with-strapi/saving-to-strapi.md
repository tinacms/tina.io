---
title: 'Saving to Strapi '
---

Our next goal is to be able to save the edits we've made back to Strapi. We'll be doing this with a pretty simple GraphQL mutation.

First, since we're dealing with image uploading we'll need access to the CMS object again so that the Strapi media store can help us out.

**pages/posts/\[slug\].js**
```diff
- import { useForm, usePlugin } from "tinacms";
+ import { useCMS, useForm, usePlugin } from "tinacms";
  // ...

  export default function Post({ post: initialPost, morePosts, preview }) {
+   const cms = useCMS();
    // ...
```

Now we'll replace the dummy `onSubmit` that we created earlier with a function that calls a GraphQL mutation to when we submit the form.

**pages/posts/\[slug\].js**

```js
    onSubmit: async (values) => {
      const saveMutation = `
      mutation UpdateBlogPost(
        $id: ID!
        $title: String
        $content: String
        $coverImageId: ID
      ) {
        updateBlogPost(
          input: {
            where: { id: $id }
            data: { title: $title, content: $content, coverImage: $coverImageId}
          }
        ) {
          blogPost {
            id
          }
        }
      }`;
      const response = await cms.api.strapi.fetchGraphql(
        saveMutation,
        {
          id: values.id,
          title: values.title,
          content: values.content,
          coverImageId: cms.media.store.getFileId(values.coverImage.url),
        }
      );
      if (response.data) {
        cms.alerts.success("Changes Saved");
      } else {
        cms.alerts.error("Error saving changes");
      }
    },
```

Take a read through the mutation, it's pretty simple! Strings prepended with a `$` are variables that we send as a second argument to the `fetchGraphql` function. We're doing a little bit of magic with `getFileId` because we need to pass GraphQL the **ID** of the uploaded image and not the **URL**.

With this in place, reload your site and enter edit mode. Now make some changes to a blog post and click the save button. If everything has gone well, those changes will have been sent to Strapi and saved.
