---
title: 'Querying Strapi'
---

Now we're ready to bridge the gap between our front-end and Strapi. Scroll all the way down to the bottom of `pages/index.js` and take a look at `getStaticProps`. This is where our index page is getting the list of blog posts from the filesystem. With a quick bit of surgery we can make this instead pull the data from Strapi.

```js
import { fetchGraphql } from 'react-tinacms-strapi-bm-test'

//...

export async function getStaticProps() {
  // TODO: MOVE THIS URL TO THE CLIENT
  const postResults = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query{
      blogPosts {
        title
        date
        slug
        author {
          name
          picture { 
            url
          }
        }
        excerpt
        coverImage {
          url
        }
      }
    }
  `
  )

  return {
    props: { allPosts: postResults.data.blogPosts },
  }
}
```

Take a moment to marvel at GraphQL. Each of the items that I'm querying are used to preview a blog post on the homepage. This _almost_ works exactly how we want it to, but there is one exception in how we need to deal with images.

In the Next.js example images are hosted locally and the `coverImage` field is a string that points to the relative location of the image. In our Strapi example, `coverImage` is an object with a `url` property. Additionally the API only returns a relative location, so we need to add on the URL of our Strapi server to be able to fully resolve our images.

@TODO: Can I write a helper to resolve these images better?

We need to make a change in just a few places to get this working.

**pages/index.js**

```diff
<HeroPost
    title={heroPost.title}
-   coverImage={heroPost.coverImage}
+   coverImage={process.env.STRAPI_URL + heroPost.coverImage.url}
    date={heroPost.date}
    author={heroPost.author}
    slug={heroPost.slug}
    excerpt={heroPost.excerpt}
/>
```

**components/hero-post.js**

```diff
<div>
  <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
  <Avatar
    name={author.name}
-   picture={author.picture}
+   picture={process.env.STRAPI_URL + author.picture.url}
  />
</div>
```

**components/more-stories.js**

```diff
{posts.map((post) => (
  <PostPreview
    key={post.slug}
    title={post.title}
-   coverImage={post.coverImage}
+   coverImage={process.env.STRAPI_URL + post.coverImage.url}
    date={post.date}
    author={post.author}
    slug={post.slug}
    excerpt={post.excerpt}
  />
}
```

**components/post-preview.js**

```diff
<Avatar
name={author.name}
- picture={author.picture}
+ picture={process.env.STRAPI_URL + author.picture.url}
/>
```

If everything has gone well, you should be able to reload your blog and see the posts that you created in Strapi.

![New index page with data from Strapi](/img/strapi-guide/updated_index.png)
