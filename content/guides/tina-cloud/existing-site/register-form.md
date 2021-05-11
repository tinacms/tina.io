---
title: Make your pages editable
last_edited: '2020-08-11T13:02:36.046Z'
---

We've added Tina to our site and defined a Tina Cloud schema for our content. We're now ready to connect to the Tina Cloud content API, and make our content editable.

Let's register a Tina form in our admin page template that we created earlier.

```jsx,copy
// pages/admin/posts/[slug].js
import React from 'react'
import { useGraphqlForms } from 'tina-graphql-gateway'
import { useRouter } from 'next/router'

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
    variables: {
      relativePath: `${router.query.slug}.md`,
    },
    formify: ({ createForm, formConfig }) => {
      formConfig.fields?.forEach(field => {
        //use markdown plugin with _body field
        if (field.name === '_body') {
          field.component = 'markdown'
        }
      })
      return createForm(formConfig)
    },
  })

  return <div>My admin page</div>
}
```

The query object defined above is GraphQL, and maps to the schema that we defined earlier for our content.

The "formify" option is being used to use the markdown plugin on the body of our content.

## Make a commit

At this point, you should be able to navigate to a blog post's admin page such as [the hello-world post](http://localhost:3000/posts/hello-world). This time, when you click the pencil, you will notice that the sidebar contains fields for your content.

If you make a change and click "Save", Tina Cloud will make a commit to your repository. Try it out, and take a look at your GitHub repo to see your commit.

## What's next?

In the next step we will wire up our page's preview, which will live-update as we're editing.
