---
title: 'Querying Strapi'
---

Now we're ready to bridge the gap between our front-end and Strapi. Scroll all the way down to the bottom of `pages/index.js` and take a look at `getStaticProps`. This is where our index page is getting the list of blog posts from the filesystem. With a quick bit of surgery, we can make this instead pull the data from Strapi..

```js
import { fetchGraphql } from 'react-tinacms-strapi-bm-test'

//...

export async function getStaticProps() {
  // TODO: fetchGraphql can pull this from env variable instead
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

Take a moment to marvel at GraphQL. Each of the items that I'm querying is used to preview a blog post on the homepage. This _almost_ works how we want it to, but there is one exception in how we need to deal with images..

In the Next.js example, images are hosted locally, and the `coverImage` field is a _string_ that points to the relative location of the picture. In our Strapi example, `coverImage` is an _object_ with a `url` property. Additionally, the API only returns a relative location, so we need to add on the URL of our Strapi server to fully resolve our images.

@TODO: Create an image resolver so that I can stop typing process.env.STRAPI_URL

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

## Adjusting Strapi permissions

By default, you won't be able to access any data from Strapi without authentication. For our purposes, let's give unauthenticated users read access to our two content types.

Head back to Strapi and click on **Roles & Permissions** in the sidebar. Click into the **Public** role. On this page, we can adjust our permissions for the Author and Blog-post types. Give the public access to **count**, **find**, and **findone** then click the **Save** button..

![Public permission configuration](/img/strapi-guide/public_permissions.png)

Refresh the index page and see the blog posts you created in Strapi!

![New index page with data from Strapi](/img/strapi-guide/updated_index.png)

If you try to navigate to any blog post, you'll be met with a 404. Head over to `pages/posts/[slug].js` and we'll get the blog post pages working..

## Pull blog posts from Strapi

First let's change `getStaticProps` to fetch the data from the blog post we're trying to view.

```js
import { fetchGraphql } from 'react-tinacms-strapi-bm-test'
// ...
export async function getStaticProps({ params }) {
  const postResults = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query{
      blogPosts(where: {slug: "${params.slug}"}){
        id
        title
        date
        slug
        content
        author {
          name
          picture { 
            url
          }
        }
        coverImage {
          url
        }
      }
    }
  `
  )
  const post = postResults.data.blogPosts[0]
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
```

Right now, we can't get a blog post directly using its slug and instead need to get a list of blog posts with a search. This is a problem we can fix a bit later by writing a quick bit of code for our Strapi server. For now, we'll just leave it like this.

We need to correct some image paths here as well.

**pages/posts/\[slug\].js**

```diff
  <Head>
    <title>
      {post.title} | Next.js Blog Example with {CMS_NAME}
    </title>
-    <meta property="og:image" content={post.ogImage.url} />
+    <meta property="og:image" content={process.env.STRAPI_URL + post.coverImage.url} />
  </Head>
  <PostHeader
    title={post.title}
-    coverImage={post.coverImage}
+    coverImage={process.env.STRAPI_URL + post.coverImage.url}
    date={post.date}
    author={post.author}
  />
```

**components/post-header.js**

```diff
  <div className="hidden md:block md:mb-12">
-    <Avatar name={author.name} picture={author.picture} />
+    <Avatar name={author.name} picture={process.env.STRAPI_URL + author.picture.url} />
  </div>
  <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
    <CoverImage title={title} src={coverImage} />
  </div>
  <div className="max-w-2xl mx-auto">
    <div className="block md:hidden mb-6">
-    <Avatar name={author.name} picture={author.picture} />
+    <Avatar name={author.name} picture={process.env.STRAPI_URL + author.picture.url} /    </div>
    <div className="mb-6 text-lg">
      <DateFormater dateString={date} />
    </div>
  </div>
```

Our blog post pages _should_ work, but we still can't navigate to them. After some quick changes to `getStaticPaths` in our `[slug].js` file, we'll have a fully functional blog.

```js
export async function getStaticPaths() {
  const postResults = await fetchGraphql(
    process.env.STRAPI_URL,
    `
    query{
      blogPosts{
        slug
      }
    }
  `
  )

  return {
    paths: postResults.data.blogPosts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
```

We should now be able to load our Strapi blog posts based on their `slug`. Give your site a refresh and try it out!
![A working blog post page](/img/strapi-guide/working_blog_post.jpg)

Next, we'll be adding Tina's _slick_ editing experience to our blog posts.
