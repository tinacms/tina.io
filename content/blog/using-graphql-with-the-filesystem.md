---
title: Limitations of using the filesystem for web content and how Tina's GraphQL API solves this
date: '2021-04-22T10:00:00.000Z'
draft: true
author: Jeff See
---

- The power of Git
- The limitations of the Git-based CMS
  - Relationships: it's complicated.
- The Power of GraphQL
- Mixing best of both worlds
- Example / Demo
- Conclusion

---

---

title: Limitations of using the filesystem for web content and how Tina's GraphQL API solves this
date: '2021-04-22T10:00:00.000Z'
draft: true
author: Jeff See

---

- The power of Git
- The limitations of the Git-based CMS
  - Relationships: it's complicated.
- The Power of GraphQL
- Mixing best of both worlds
- Example / Demo
- Conclusion

---

## The Power of Git and the filesystem

Using the filesystem for website content has been a mainstay of the web development ecosystem for years. Not needing to deal with databases and being able to ship your entire website in one fell swoop and roll anything back with thanks to Git has made this a popular and efficient way to get things done.

On the other hand, the open nature of using files for content can lead to headaches. Content Management Systems (CMS) have always provided confidence in another way - knowing that your content's shape won't change out from underneath you. The scary (and powerful) thing about using the filesystem is that there's no layer between you and the raw data. It's a trade-off that has many valid use-cases and a lot of potential foot guns.

## An example

We're going to use the [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) as an example for this post, if you'd like to follow along you can fork this repo [here]() and start with the branch called `start`. To skip ahead to the final solution check out the `final` branch.

### Our content structure

```
- _posts
  - dynamic-routing.md
  - hello-world.md
  - preview.md
- pages
  - index.md # lists the blog posts
  - posts
    - [slug].js # dynamically shows the appropriate blog post
```

On the home page we get each post from the `_posts` directory and sort them by date before showing them:

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

What we have so far is great, since this content is file-based we can ship our site to production with full confidence that if we made a mistake we'll be able to easily roll it back to a previous version. Ok, now let's break it...

Each markdown post consists of the following fields: `title`, `excerpt`, `coverImage`, `date`, `author.name`, `author.picture`, `ogImage.url`, and of course the markdown body which we'll refer to as `body`.

For example, the "Dynamic Routing and Static Generation" blog post looks like this:

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

Let's say we decide to only show featured posts. To do that we'll add a new value to each post called `featured`, to indicate that it's featured you'll need to set the value to `true`.

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

Ok great, now we can control which pages show within our function:

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

This logic says, grab all of the posts, then filter them so that if `featured: false` we wouldn't show them. Now let's add a new post, this one won't be featured:

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

This is the kind of issue that wouldn't have been possible with a CMS. And while it may be simple example, as your content grows in complexity, these types of things become difficult spot. We'll fix this with a simple code change from our previous update:

```diff
export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
-   return posts.filter((post) => post.featured);
+   return posts.filter((post) => post.featured === true);
}
```

And we're good to go. However there's something else you may have notice from our new blog post that doesn't feel quite right. Notice our author:

```
author:
  name: JJ Kasper
  picture: "/assets/blog/authors/jj.jpeg"
```

This content is the same over in the "Dynamic Routing and Static Generation" post. If JJ wanted to change his `picture` he'll need to update it on every post he's written. Sounds like something a CMS would solve with a content relationship, JJ should ideally be an author who _has many_ posts, and trying to do this within the filesystem is where things get messy.

### Supercharge your filesystem with GraphQL

Headless CMSs are a great way to maintain full control over your frontend code while offloading issues like those mentioned above to a more robust content layer. But when you hand your content over to a CMS you lose the built-in power of Git that you get with file-based content. What this means is that when you make a change to the shape of your content you need to coordinate that with a remote resource, and you need to make sure your content fits the new shape appropriately before deploying those changes to a production website. CMSs have come up with various ways to help with this, separate sandbox environments for developers, preview APIs, and migration SDK scripts -- all of which carry their own set of headaches. But what if we could bring the robust features of a headless CMS to your local filesystem? What might that look like?

## The Tina Content API

Today we're introducing a tool that marries the power of a headless CMS with the convenience and portability of file-based content. The Tina Content API is a GraphQL service that sources content from your local filesystem.

> It'll also soon be available via our Tina Cloud API, which connects to your GitHub repository to offer a similar cloud-based service. [Sign up](https://tina.io/early-access/) for early access.

To get a sense for how this works, let's make some tweaks to the blog demo.

## The Downside

While file-based content works great for developers, this is far from ideal for non-technical authors. We built Forestry.io to solve this and it's been a great way to leverage Git-based content ever since. We're brining that philophy into Tina with Tina Cloud, which is currently in beta.

### Our content structure

Let's say you have a blog. Your typical blog post has a `title`, some information about the `author`, a `published` flag to indicate if it's ready to be shown on your website, and of course, a `body`. You decide to store it in a Markdown file:

```md
---
title: Vote For Pedro
published: true
author:
  name: Napolean
  role: Llama Caretaker
---

You should really vote for Pedro
```

From your website, you pull down all of the files which are `published` and pass them through your rendering templates. You instruct Napolean to pass in `published: false` when he's working on a new blog post. So he does:

```md
---
title: Tater Tots
published: 'false'
author:
  name: Napolean
  role: Llama Caretaker
---

Gimme some of your 'tots
```

Can you spot the issue? `"false"` is a string. Your logic will likely be checking for a "truthy" value on the `published` key. `"false"` will pass that test, meaning you've just published this post by accident!

You're starting to think perhaps using a CMS would have been a safer bet. Most CMSs require you to be explicit about the shape of your content to avoid these issues. But then you think again - "Nah, this site is so simple. CMSs are clunky and hard to set up." So you build in some type checks to make sure this kind of mistake doesn't happen again, and with a revived sense of confidence, you're ready to add new features.

### Relationships: it's complicated

Let's get back to the example. Your site is growing, and Napolean is writing more and more blog posts. Aside from that publishing mistake, things are pretty good! A few months go by, and Napolean is crushing it with the blog posts. Your boss decides it's time to promote him. You'll need to make this new role reflect on all of his blog posts. Unfortunately, the only way to do this right now is to go through them one by one to make the change. Wouldn't it be great if you could update that value in one place and have it populate for every blog Napolean has written?

It's certainly possible with the filesystem, so you build a separate file entirely that houses Napolean's information. Now a blog post looks like this (notice how `author` is pointing to the location of Napolean's file):

```md
---
title: Vote For Pedro
published: true
author: /path/to/authors/napolean.md
---

You should really vote for Pedro
```

And in `/path/to/authors/napolean.md` we have Napolean with his new role:

```md
---
name: Napolean
role: Interpretive Dancer
---
```

Future updates to the author only need to happen in one place, but we now have a new problem with this change. When you render the webpage, you need to fetch the "Vote for Pedro" blog post, and then you need to grab the path to the author from _that_ data and fetch the author's information. You removed tedious work from the editing experience but added complexity to the developer experience. Still, it seems like a worthwhile trade-off; things are working, and your site is easier to for editors to maintain. You take a well-deserved break.

While you were out, someone came along and deleted the `/path/to/authors/napolean.md` file. They worked on a separate part of the app and didn't know that it was being referenced in the `blog post` section. So when it came time to render the blog post section, we looked up that `author` and attempted to fetch that data... oops, our site broke. Luckily for us, we're using Git, and those changes can be reverted — 1 point to the filesystem.

But wouldn't it have been nice if there was something in place to tell us that we had just broken all of Napolean's blog posts by deleting that one file? Perhaps that whole _relational_ database idea wasn't too bad, after all.

## The Tina Content API

Today we're introducing a tool that marries the power of a headless CMS with the convenience and portability of file-based content. The Tina Content API is a GraphQL-based server that sources content from your local filesystem. It'll also soon be available via our Tina Cloud API, which connects to your GitHub repository to offer a similar cloud-based service. [Sign up](https://tina.io/early-access/) for early access.

### How does it work?

The problems mentioned above can be solved by telling the Tina Content API a little bit about the shape of your content:

```ts
// in `.tina/schema.ts`
import { defineSchema } from 'tina-graphql-gateway-cli'

defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts', // where to store the 'posts' documents
      templates: [
        {
          label: 'Simple Blog Post Template',
          name: 'simple_post',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'boolean', // This is a boolean field
              label: 'Published',
              name: 'Published',
            },
            {
              type: 'reference',
              label: 'Author',
              name: 'author',
              collection: 'authors', // a "reference" to a document from the "authors" collection
            },
            {
              type: 'textarea',
              label: 'Body',
              name: 'body',
            },
          ],
        },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      path: 'content/authors', // where to store the 'authors' documents
      templates: [
        {
          label: 'Author Template',
          name: 'author',
          fields: [
            {
              label: 'Name',
              type: 'text',
              name: 'name',
            },
            {
              label: 'Role',
              type: 'text',
              name: 'role',
            },
          ],
        },
      ],
    },
  ],
})
```

This explicit step is key to our understanding of your content structure as a whole. So now when you query through GraphQL, you're guaranteed to get the shape you'd expect. And resolving content across multiple documents is trivial:

```graphql
query BlogPost($relativePath: String!) {
  getPostsDocument(relativePath: $relativePath) {
    data {
      ... on BlogPost_Doc_Data {
        title
        published
        author {
          data {
            ... on Author_Doc_Data {
              name
              role
            }
          }
        }
        body
      }
    }
  }
}
```

## FAQ

### How does this relate to the Tina ecosystem?

A nice side-effect of knowing all about your content schema is that we know exactly how it should be mutated as well. While this post's topic is more about the GraphQL API itself, we fully support autogenerated Tina forms that you can edit locally or via the Tina Cloud API, which of course, has support for `mutations`.

> Tina Cloud is currently open to a limited set of Next.js projects, [sign up](https://tina.io/early-access/) for early access to get into the private beta.

### What frameworks are supported?

While we'll support a full "headless" CMS soon, we're still working hard on our cloud-based API - so until then, we only recommend using this API for Next.js projects, which are built statically with `getStaticProps`. This way, all of your content files are built during CI, so there's no need for runtime data fetching.

### GraphQL on top of the filesystem? How is this different from Gatsby's filesystem plugin?

With Gatsby you query the filesystem through GraphQL, this gives you some pretty powerful features, but it doesn't have the same concept of defining a schema. With Gatsby, you'd continue to have the same problems with data integrity. Tina Cloud is much closer to a CMS like [Forestry](https://forstry.io); it's just like we added a headless CMS on top of it.

## Roadmap

**Pagination and Filtering** - Currently, the API has some limitations with regard to supporting the full API we'd like to provide. Specifically, we're working on a rich filtering and pagination API, so the API features have a minimal "list" query until that's finished.

**Reverse** **Relationships -** Soon, it'll be possible to query a document _through_ its dependency. So if a `post` belongs to an `author` - you will soon be able to query all of the `author`'s `posts`.

**Performance** - If you consume the GraphQL API from Tina Cloud, you may notice it's a little slow. We're working on supporting a Git-based database solution that will performantly let you bounce between branches and treat it the same as you would locally. To that end, we recommend only consuming the Content API in Tina's edit mode.

**Primitive types** - Right now, the `defineSchema` function supports various types which are loosely based on [TinaCMS fields](/docs/plugins/fields/) - we have plans to provide a smaller, but more expressive, API which will be more composable. Please chime into the [RFC](https://github.com/tinacms/rfcs/pull/18) for any input!

## Demo
