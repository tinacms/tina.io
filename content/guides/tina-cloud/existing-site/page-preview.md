---
title: Render page preview
last_edited: '2020-08-11T13:02:36.046Z'
---

We now can edit our site with Tina, however we can't see a preview of the changes as we type.
We are going to replace our static admin template's render function to show a preview of our changes.

## Format the data

In the previous step of this guide, we are fetching a post's content using the Tina Cloud API, but the editor can't currently see a preview of the page as they make edits.

Let's fix that by replacing our static rendered component with the page component from our production "post" page.

```diff
+ import Post from '../../posts/[slug]'

// ...

const [payload, isLoading] = useGraphqlForms({
  query,
  variables: { relativePath: `${router.query.slug}.md` },
})

- return <div>My admin page</div>;
+ if (isLoading) {
+   return <p>Loading...</p>;
+ }

+ const { _body, ...post } = payload.getPostsDocument.data;
+ const pageData = { post, content: _body };
+ return <Post {...pageData} />
```

**Notice how we are doing a big of re-formatting of our data, to match the shape that our production [slug].js page is expecting.**

This full file should now look like:

```jsx,copy
// pages/admin/posts/[slug].js
import React from 'react'
import { useGraphqlForms } from 'tina-graphql-gateway'
import { useRouter } from 'next/router'
import Post from '../../posts/[slug]'
export default function BlogPostEditor() {
  const query = gql => gql`
    query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on Post_Doc_Data {
            title
            excerpt
            coverImage
            date
            author {
              name
              picture
            }
            ogImage {
              url
            }
            _body
          }
        }
      }
    }
  `

  const router = useRouter()
  const [payload, isLoading] = useGraphqlForms({
    query,
    variables: { relativePath: `${router.query.slug}.md` },
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  let { _body, ...post } = payload.getPostsDocument.data
  post.slug = router.query.slug
  post.content = _body
  return <Post post={post} />
}
```

Now when you navigate to a [blog page](http://localhost:3000/admin/posts/hello-world), as you type you will see a live preview of your changes.

Congrats! You've just added editing to this site.

## Next steps

### Deploy your site

You've been working locally up until this point, but editing will also work on your hosted deployment. You may want to deploy with Netlify or Vercel. You will just need to modify the site url within the Tina Cloud dashboard for your app.

### Invite collaborators

Within Tina Cloud, you can add users to your organization. This will allow other users to start collaborating on your site and making edts.

### Experiment with the local graphql-gateway API

Tina Cloud has an amazing local dev-workflow, as you can run a version of Tina Cloud's content API locally using your local filesystem's content. Read the [Tina Graphql Gateway CLI](https://tinacms-site-next-git-tina-cloud-docs-tinacms.vercel.app/docs/tina-cloud/cli/) docs to learn more.

### Use the Tina Cloud API on your production pages

Currently, we are only using the Tina Cloud API on our /admin page. We can also update our production page so that we can source our content consistently between our production page and our editing pages. Read the [Tina Cloud Client](https://tinacms-site-next-git-tina-cloud-docs-tinacms.vercel.app/docs/tina-cloud/client/) docs to learn more.
