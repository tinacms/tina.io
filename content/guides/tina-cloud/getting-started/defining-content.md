---
title: Defining Content
last_edited: '2021-07-30T15:40:41.129Z'
---
## Defining the shape of our content

One key element of Tina is defining a schema that allows you to shape and interact with the content on the page. Opening up the project, you will see a folder called `.tina` which contains a `schema.ts` file. This file allows you to instruct Tina's Content API what content type to look for, how it should be labeled and much more!

Before we look at our current project, let's discuss how the content is shaped. Our schema can be broken down into four sections: `collections`, `fields` and `references`. Each one of them has its role:

### Collections

The top-level key in the schema is an array of _collections_, a `collection` informs the API about _where_ to save content.

### Fields

Fields instruct the Content API of the type expected for example text as well as the queryable name and the name to display to your content team.

### References

We also have `reference` fields. This is an important concept, when you _reference_ another collection, you're effectively saying: "this document _belongs to_ that document".

## Creating our content Schema

The Next.js blog starter comes with three example blog posts that we are going to use to shape our content in our schema. You can find on any of the blog posts in the `_posts` directory, let us look at the front matter of the `preview.md`.

```md
---
title: Preview Mode for Static Generation
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/preview/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: Joe Haddad
  picture: '/assets/blog/authors/joe.jpeg'
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

Lorem ipsum dolor sit amet, ...
```

As you can see, we have a quite a few fields that we want our content team to be able to edit as well as the body of the blog post.

### Making changes to the Schema

Open up the Tina `schema.ts` file located at `/.tina/schema.ts` To begin with underneath the object we provided, we need to replace the current collection with the content we want:

```diff
{
  label: "Blog Posts",
  name: "posts",
-  path: "content/posts"
+  path: '_posts',
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Blog Post Body",
      name: "body",
      isBody: true,
    },
  ]
}
```

We have only replaced a single line so far, which is to update the `path` to the where the content from the Starter Blog is stored.

Now we need to handle each field for our posts frontmatter, below is the finished file:

```js,copy
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: '_posts',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
        },
        {
          type: 'string',
          label: 'Cover Image',
          name: 'coverImage',
        },
        {
          type: 'string',
          label: 'Date',
          name: 'date',
        },
        {
          type: 'object',
          label: 'Author',
          name: 'author',
          fields: [
            {
              type: 'string',
              label: 'Name',
              name: 'name',
            },
            {
              type: 'string',
              label: 'Picture',
              name: 'picture',
            },
          ],
        },
        {
          type: 'object',
          label: 'OG Image',
          name: 'ogImage',
          fields: [
            {
              type: 'string',
              label: 'Url',
              name: 'url',
            },
          ],
        },
        {
          type: 'string',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
  ],
})
```

There are a couple of things you might notice. First, we have a `type` called `object`, this works as a way to group fields together and on the UI which you will see in the future, it allows you to click into them and edit each individual field.

Second, there's a `string` field called `body` with `isBody` set to true. By setting `isBody` to true we're stating that this field is responsible for the main _body_ of the markdown file. There can only be one field with the `isBody: true` property.

### Next steps

Our markdown files are now backed by a well-defined schema, this paves the way for us to query file content with GraphQL. Follow along as we update our NextJS site to use our new capabilities