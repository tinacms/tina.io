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
          coverImageId: getFileId(values.coverImage.url),
        }
      );
    },
```

We also need a way to be able tell the form to submit the changes. So we'll create a simple Save button

Place the following component at the bottom of `[slug].js` and then put the component at the bottom of your `InlineForm`.

```js
export function SaveButton() {
  const { form } = useInlineForm()
  /*
   ** If there are no changes
   ** to save, return early
   */
  if (form.finalForm.getState().pristine) {
    return null
  }

  return <TinaButton onClick={form.submit}>Save</TinaButton>
}
```

```diff
    <InlineForm form={form} initialStatus={"active"}>
    <PostHeader
        title={post.title}
        coverImage={process.env.STRAPI_URL + post.coverImage.url}
        date={post.date}
        author={post.author}
    />
    <PostBody content={post.rawMarkdownBody} />
+   <SaveButton />
    </InlineForm>
```

Now, whenever you make a change the button will appear. Clicking it will make a mutation request to Strapi's GraphQL endpoint and save your changes.
