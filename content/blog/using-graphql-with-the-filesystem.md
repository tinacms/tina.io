---
title:
date: '2021-04-22T10:00:00.000Z'
draft: true
author: Jeff See
---

Using the filesystem for website content has been a mainstay of the web development ecosystem for years. Not needing to deal with databases and being able to ship your entire website in one fell swoop and roll anything back with thanks to Git has made this a popular and efficient way to get things done.

On the other hand, the open nature of using files for content can lead to headaches. Content Management Systems (CMS) have always provided confidence in another way - knowing that your content's shape won't change out from underneath you. The scary (and powerful) thing about using the filesystem is that there's no layer between you and the raw data. It's a trade-off that has many valid use-cases and a lot of potential foot guns.

## An example

We're going to use the [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) to demonstrate some of the problems with file-based content and how we hope to solve them. If you'd like to follow along you can fork this repo [here]() and start with the branch called `start`. To skip ahead to the final solution check out the `final` branch.

### Our content structure

This app sources its content from markdown files in a folder called `_posts`:

```
- _posts
  - dynamic-routing.md
  - hello-world.md
  - preview.md
- pages
  - index.js # lists the blog posts
  - posts
    - [slug].js # dynamically shows the appropriate blog post
```

On the home page we get each post from the `_posts` directory and sort them by date before showing them with our `getAllPosts` function:

```js
export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
```

And the result:

![](https://res.cloudinary.com/deuzrsg3m/image/upload/v1619558511/tina-blog-post/next-demo-home_kcnyv5.png)

#### File-based content is simple

What we have so far is great, since our changes are stored in Git we can ship our site to production with full confidence that if we made a mistake we'll be able to easily roll it back to a previous version. But as we increase the complexity of our content things become less straightforward.

To demonstrate that, let's first look at how our content is structured. As an example, the "Dynamic Routing and Static Generation" blog post looks like this:

```markdown
---
title: 'Dynamic Routing and Static Generation'
excerpt: 'Lorem  ...'
featured: true
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

Lorem ipsum dolor sit amet ...
```

We'll expand on this structure by adding the ability to filter which blog posts show up on the home page. To do that we'll add a new `boolean` value to each post called `featured`.

```markdown
---
title: "Dynamic Routing and Static Generation"
excerpt: "Lorem  ..."
featured: true
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: JJ Kasper
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
featured: true
---

Lorem ipsum dolor sit amet ...
```

Now we can control which pages show on the home page from within our `getAllPosts` function:

```diff
export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
-   return posts
+   return posts.filter((post) => post.featured);
}
```

To test this out we'll add a new post, this one won't be featured:

```markdown
---
title: "Why Tina is Great"
excerpt: "Lorem  ..."
featured: true
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2021-04-25T05:35:07.322Z"
author:
  name: JJ Kasper
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
featured: "false"
---

Lorem ipsum dolor sit amet ...
```

Woops, look who's showing up on our home page:

![](https://res.cloudinary.com/deuzrsg3m/image/upload/v1619560025/tina-blog-post/llama-woops_cchyel.png)

Can you spot the issue? We accidentally set `featured` to `"false"` instead of `false`!

While this is a simple example, as your content grows in complexity these types of things become difficult spot. Mosts CMSs would never let this happen, they require that the shape of your content is well-defined. But that's not the only thing they help with, there's something else you may have noticed from our new blog post structure that doesn't feel quite right. Notice our author:

```
author:
  name: JJ Kasper
  picture: "/assets/blog/authors/jj.jpeg"
```

This content is the same over in the "Dynamic Routing and Static Generation" post. If JJ wanted to change his `picture` he'll need to update it on every post he's written. Sounds like something a CMS would solve with a content relationship, JJ should ideally be an author who _has many_ posts. We could split the author data into its own file and place a reference to that author in the `post` structure:

```
author: _authors/jj.md
```

But now we have to update our data fetching logic so that whenever it comes across the `posts`'s `author` field it knows to make an additional request for that data. This is pretty cumbersome, and again - as complexity grows these this type of logic quickly become untenable.

### Content Management Systems: pretty useful, actually

Headless CMSs are a great way to maintain full control over your frontend code while offloading issues like those mentioned above to a more robust content layer. But when you hand your content over to a CMS you lose the power of Git that comes built-in with file-based content.

With a CMS, when you make a change to the shape of your content you also need to coordinate that with a remote resource, and you need to make sure your content fits the new shape appropriately before deploying those changes to a production website. CMSs have come up with various ways to help with this, separate sandbox environments, preview APIs, and migration SDK scripts -- all of which carry their own set of headaches. But what if we could bring the robust features of a headless CMS to your local filesystem? What might that look like?

## The Tina Content API

Today we're introducing a tool that marries the power of a headless CMS with the convenience and portability of file-based content. The Tina Content API is a GraphQL service that sources content from your local filesystem. It'll also soon be available via our Tina Cloud API, which connects to your GitHub repository to offer a similar cloud-based service.

> Tina Cloud is currently open to a limited set of Next.js projects, [sign up](https://tina.io/early-access/) for early access. for early access to get into the private beta.

To get a sense for how this works, let's make some tweaks to the blog demo.

First we'll install the tina CLI:

```sh
yarn add tina-graphql-gateway-cli
```

We'll add a schema so the API knows exactly what kind of shape to build for your content:

```sh
mkdir .tina && touch .tina/schema.ts
```

```ts
// in `.tina/schema.ts`
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Posts',
      name: 'posts',
      path: '_posts',
      templates: [
        {
          label: 'Simple',
          name: 'simple_post',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'text',
              label: 'Excerpt',
              name: 'excerpt',
            },
            {
              type: 'text',
              label: 'Cover Image',
              name: 'coverImage',
            },
            {
              type: 'text',
              label: 'Date',
              name: 'date',
            },
            {
              type: 'group',
              name: 'author',
              label: 'Author',
              fields: [
                {
                  type: 'text',
                  label: 'Name',
                  name: 'name',
                },

                {
                  name: 'picture',
                  label: 'Picture',
                  type: 'text',
                },
              ],
            },
            {
              type: 'group',
              name: 'ogImage',
              label: 'Open Graph Image',
              fields: [
                {
                  type: 'text',
                  label: 'URL',
                  name: 'url',
                },
              ],
            },
            {
              type: 'toggle',
              label: 'Featured',
              name: 'featured',
            },
          ],
        },
      ],
    },
  ],
})
```

Next we'll replace the `dev` command to start the GraphQL server in tandem with our Next.js app:

```json
  "scripts": {
    "dev": "yarn tina-gql server:start -c \"next dev\"",
    ...
  },
```

Run the dev command and you'll see that we now have a local GraphQL server listening on port 4001 along with some information about autogenerated configuration files:

```sh
Started Filesystem GraphQL server on port: 4001
Generating Tina config
Tina config ======> /.tina/__generated__/config
Typescript types => /.tina/__generated__/types.ts
GraphQL types ====> /.tina/__generated__/schema.gql
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Let's test it out:

> Tip: if you have a GraphQL client like [Altair](https://altair.sirmuel.design/) you can explore the API by pointing it to http://localhost:4001/graphql

```graphql
# Point your request to http://localhost:4001/graphql
{
  getPostsList {
    data {
      ... on SimplePost_Doc_Data {
        title
      }
    }
  }
}
```

And our result:

```json
{
  "errors": [
    {
      "message": "Unexpected value of type string for boolean value",
      "path": ["getPostsList"]
    }
  ],
  ...
}
```

This error is coming from our old friend `featured: "false"`. After fixing the issue, we get what we expected:

```json
{
  "data": {
    "getPostsList": [
      {
        "data": {
          "title": "Dynamic Routing and Static Generation"
        }
      },
      ... # truncated
    ]
  }
}
```

We can use GraphQL to replace all of our bespoke filesystem data-fetching logic and rest assured that the data we get back will be exactly what we expect it to be.

Querying for a post now looks like this:

```graphql
query BlogPostQuery($relativePath: String!) {
  getPostsDocument(relativePath: $relativePath) {
    data {
      ... on SimplePost_Doc_Data {
        title
        excerpt
        date
        coverImage
        author {
          name
          picture
        }
        ogImage {
          url
        }
        featured
        _body
      }
    }
  }
}
```

### Fixing our author problem

Earlier we pointed out how painful it would be to split the `author` data out into it's own file, with GraphQL it's trivial. We'll update our schema to treat author as a separate record:

```ts
// in `.tina/schema.ts`
import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Posts',
      name: 'posts',
      path: '_posts',
      templates: [
        {
          label: 'Simple',
          name: 'simple_post',
          fields: [
            ...
            {
              type: 'reference',
              name: 'author',
              label: 'Author',
              collection: 'authors'
            },
            ...
          ],
        },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      path: '_authors',
      templates: [
        {
          label: 'Author',
          name: 'author',
          fields: [
            {
              type: 'text',
              name: 'name',
              label: 'Name',
            },
            {
              type: 'text',
              name: 'picture',
              label: 'Picture',
            },
          ],
        },
      ],
    },
  ],
})
```

And the resulting query:

```graphql
query BlogPostQuery($relativePath: String!) {
  getPostsDocument(relativePath: $relativePath) {
    data {
      ... on SimplePost_Doc_Data {
        title
        excerpt
        date
        coverImage
        author {
          data {
            ... on Author_Doc_Data {
              name
              picture
            }
          }
        }
        ogImage {
          url
        }
        featured
        _body
      }
    }
  }
}
```

And our result:

```json
{
  "data": {
    "getPostsDocument": {
      "data": {
        "title": "Dynamic Routing and Static Generation",
        "excerpt": "Lorem ...",
        "date": "2020-03-16T05:35:07.322Z",
        "coverImage": "/assets/blog/dynamic-routing/cover.jpg",
        "author": {
          "data": {
            "name": "JJ Kasper",
            "picture": "/assets/blog/authors/jj.jpeg"
          }
        },
        "ogImage": {
          "url": "/assets/blog/dynamic-routing/cover.jpg"
        },
        "featured": true,
        "_body": "Lorem ipsum dolor sit amet, ..."
      }
    }
  }
}
```
