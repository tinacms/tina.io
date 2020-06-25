---
title: 'Saving to Strapi '
---

Our next goal is to be able to save the edits we've made back to Strapi. We'll be doing this with a pretty simple GraphQL mutation.

In `[slug].js` we'll fill in our form's `onSubmit` with

```js
    onSubmit: async (values) => {
      const saveMutation = `
      mutation UpdateBlogPost(
        $id: ID!
        $title: String
        $content: String
        $coverImageId: ID!
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
      const response = await fetchGraphql(
        process.env.STRAPI_URL,
        saveMutation,
        {
          id: values.id,
          title: values.title,
          content: values.rawMarkdownBody,
          coverImageId: cms.media.store.getFileId(values.coverImage.url),
        }
      );
    },
```

Now, whenever you make a change the button will appear. Clicking it will make a mutation request to Strapi's GraphQL endpoint and save your changes.
