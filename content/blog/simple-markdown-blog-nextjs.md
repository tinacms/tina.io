---
title: Creating a Markdown Blog with Next.js
date: '2019-11-16T07:00:00.000Z'
author: Kendall Strautman
draft: false
---

<div style="text-align: left;">
  <br>
    <h1>Tina + Next Part I</h1>
</div>

_Want to skip to using Tina with Next.js? Jump to [Part II](https://tinacms.org/blog/using-tinacms-with-nextjs/) of this series._

<br>

Next.js is a React "metaframework" (a framework built on a framework) for developing web applications. Next.js has become a popular choice for web developers due to its bootstrapped React environment (similar to `create-react-app`) and its simple, file-based routing for writing backend code.

**Next.js is simple and flexible.** Compared to a full-fledged static site generator, there are less prescriptive guiderails placed on developers in the implementation of an app or site. Due to this flexibility, this article shares just one perspective to approach building a simple, markdown-based blog. Take what’s helpful 🤗, disregard the rest.

&nbsp;
<tip>
If you'd like to skip ahead and reference final versions of the starter, feel free to checkout the [finished implementation](https://github.com/kendallstrautman/brevifolia-nextjs).
</tip>

## Clone the starter

Let’s get started. I have provided a [bare bones starter](https://github.com/kendallstrautman/nextjs-blog-starter) to use as a starting point for this tutorial. You can clone the project or check it out on [github](https://github.com/kendallstrautman/nextjs-blog-starter) for reference.

```javascript
// clone the repo from your terminal
$ git clone git@github.com:kendallstrautman/nextjs-blog-starter.git my-nextjs-blog

// install the dependencies
$ cd my-nextjs-blog
$ yarn install

// start up the dev server
$ yarn dev
```

After you clone the project and start the dev server, navigate to `http://localhost:3000/` in your browser to see what we're working with.

![nextjs starter blog](/blog/next-blog-1.png)

As you can see, it's pretty simple at the moment. If you look at the project in your code editor, you will see the following directory structure:

```
src/
├── components/
├── data/
└── pages/
```

## Project Structure

Let’s look at the `pages/index.js` file:

```javascript
const Index = props => {
  return (
    <Layout pathname="/" siteTitle={props.title} siteDescription={props.description}>
      <section>
        <BlogList />
      </section>
    </Layout>
  )
}

export default Index

Index.getInitialProps = async function() {
  const configData = await import(`../data/config.json`)
  return {
    ...configData,
  }
}
```

You’ll see that we have a `Layout` component wrapping a `<section>` with a `BlogList` component — these are all the pieces that render our little starter so far.

## Data Handling

Notice the use of [getInitialProps](https://nextjs.org/docs#fetching-data-and-component-lifecycle) below the component. Next.js will run this function to facilitate [server-side rendering](https://nextjs.org/features/server-side-rendering), or SSR. When Next loads this page, it will run the `getInitialProps` method, pass the return value to your page component as its props, and render the component server-side before sending the response to the browser.

**This is your bread and butter for retrieving page-level data in Next.** You can use `getInitialProps` fetch data from an external api, or as seen in this example, you can get ahold of local data sources.

<tip>**Note:** this method only works for components defined in the `pages/` directory, i.e., `page` components. You cannot use this method on child components, but you can pass down the data received to these child components, as you see being done with `Layout` in the example above.</tip>

`Layout` is being passed props such as the site title and description. If you look at the data in `src/data/config.json`, you’ll see the values these props are referencing. Go ahead and change the site title to your project name, then watch it update in the header.

## Layout & Styling 🦋

To zoom out a little, the purpose of the `Layout` component is to provide the visual skeleton for every page of the site. It typically will contain some sort of nav or header that shows up on most or all pages, along with a footer element. In our case we just have a header that contains the site title.

Within `Layout`, there is a `Meta` component that contains all global styles along with anything needed to be put in the `head` of the site for SEO or accessibility purposes. Note that the use of a `Layout` component isn’t unique to Next.js; you’ll see it commonly used in Gatsby sites as well.

One thing you may notice in the `Layout` component is the use of a `<style jsx>` tag. **Next.js works out of the box with** [**styled-jsx**](https://github.com/zeit/styled-jsx), a neat _css-in-js_ framework made by the ZEIT team. It’s super intuitive to use. All of the styles are scoped to the component, and you can do dynamic styling based on props. The css-in-js world is your oyster!

The only downside of `styled-jsx` is the lack of support for nesting, which may or may not be a concern for you. As long as you just write good ol’ fashioned vanilla css, you’ll be good. To learn more about how to use `styled-jsx`, take a look at the [styled-jsx GitHub repository](https://github.com/zeit/styled-jsx).

Note again that global styles and fonts are handled in the `Meta` component via the `<style jsx global>` tag. Use this anywhere you need to implement global styles.

## Adding the Posts Directory

Now that we’re familiar with the structure of the project and Next.js fundamentals, let’s start adding the pieces and parts to get the markdown blog up and running.

First, add a new folder called `posts` under the `src` directory. You can add all your markdown blog posts here. If you don’t already have content ready, just add a few dummy blog posts. I like to use [Unsplash](https://unsplash.com/) for sample photos and [Cupcake](http://www.cupcakeipsum.com), [Hipsum](https://hipsum.co/), or [Sagan Ipsum](http://saganipsum.com/) are my preferred text generators — keeps things interesting 🧁.

Here’s an example filler blog post with some commonly used frontmatter values.

```yaml
---
title: The coastal red giants
author: Watson & Crick
date: 2019-07-10
hero_image: ../static/bali-15.jpg
---
Brain is the seed of intelligence something incredible is waiting to be known.
```

Also, create a `static` folder within `src`. This is where you will keep images.

## Processing Markdown Files 🤖

Next, we need to install a few packages that will process our markdown files.

    $ yarn add raw-loader gray-matter react-markdown

[Raw Loader](https://github.com/webpack-contrib/raw-loader) will process our markdown files. [Gray Matter](https://github.com/jonschlinkert/gray-matter) will parse our yaml frontmatter values. And [React Markdown](https://github.com/rexxars/react-markdown) will parse and render the body of our markdown files.

### Add Next.js Config

Now that we’ve installed some packages needed to handle markdown, we need to configure the use of the `raw-loader` by creating a [next.config.js](https://nextjs.org/docs#custom-configuration) file at the root of the project. In this file we will handle any custom configuration for webpack, routing, build & runtime config, export options, and a whole lot more. In our use case, we will simply be adding a webpack rule to use `raw-loader` for processing all markdown files.

```javascript
//next.config.js
module.exports = {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
```

### Pages & Dynamic Routing

So we’re set up to use markdown files in our project. Let’s start coding a blog template page that will render the content from these markdown files in `src/posts`.

For some background knowledge, the `pages` directory is special in Next.js. Each `.js` file in this directory will respond to a matching HTTP request. For example, when the home page ('/') is requested, the component exported from `pages/index.js` will be rendered. If you wanted your site to have a page at `/about`, simply create a file named `pages/about.js`.

This is awesome for static pages, but we'd like to have a single template from which all blog posts will be built, sourcing the different data from each markdown file. This means we need some sort of dynamic routing, such that unique blog posts utilizing the same template have ‘pretty’ urls and their own individual pages.

[Dynamic routes](https://nextjs.org/docs#dynamic-routing) in Next.js are identified by **square brackets** `[]` in the filename. Within these brackets we can pass a query parameter to the page component. For example, let’s create a new folder within `src/pages` called `blog`, then add a new file within that blog folder `[slug].js`, we can use whatever is passed as this `slug` parameter to dynamically access data. So if we visit `http://localhost:3000/blog/julius-caesar`, whatever is returned from the `[slug].js` page component will render, and will have access to that ‘slug’ query parameter, i.e. ‘julius-caesar’.

### Get Markdown Data For the Blog Template

With dynamic routing, we can make use of this slug parameter by passing in the filename of the blog post and then getting the data from the corresponding markdown file via `getInitialProps`.

```javascript
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'

export default function BlogTemplate(props) {
  // data from getInitialProps
  const markdownBody = props.content
  const frontmatter = props.data
  return (
    <Layout siteTitle={props.siteTitle}>
      <article>
        <h1>{frontmatter.title}</h1>
        <div>
          <ReactMarkdown source={markdownBody} />
        </div>
      </article>
    </Layout>
  )
}

BlogTemplate.getInitialProps = async function(context) {
  // context contains the query param
  const { slug } = context.query
  // grab the file in the posts dir based on the slug
  const content = await import(`../../posts/${slug}.md`)
  // also grab the config file so we can pass down siteTitle
  const config = await import(`../../data/config.json`)
  //gray-matter parses the yaml frontmatter from the md body
  const data = matter(content.default)
  return {
    siteTitle: config.title,
    ...data,
  }
}
```

You’ll notice in this example that we’re making use of `gray-matter` and `ReactMarkdown` to properly handle the yaml frontmatter and markdown body.

**A zoomed out look at how this is working:** when you navigate to a dynamic route, .e.g. `http://localhost:3000/blog/julius-caesar`, the BlogTemplate component in `pages/blog/[slug].js` is passed the query object `{ slug: ‘julius-caesar’ }`. When the `getInitialProps` method is called, that query object is passed in through the context. We get ahold of that slug value and then go search for a file within the `posts` directory that contains the same filename. Once we get the data from that file, we parse the frontmatter from the markdown body and return the data. That data is passed down as props to the `BlogTemplate` component which can then render that data as it needs.

Checkout the [\[slug\].js file](https://github.com/kendallstrautman/brevifolia-next-forestry/blob/master/src/pages/blog/%5Bslug%5D.js) in the final version of my starter blog to get another idea of how that blog data could be rendered and styles applied.

### Get Data For the Blog Index

Let’s finish this simple blog off by adding in the proper data to the `BlogList` component for the `Index` page. Since we can only use `getInitialProps` on page components, we will get ahold of all the blog data in the `Index` component and then pass it down as a prop for `BlogList` to render.

```javascript
// src/pages/index.js
Index.getInitialProps = async function() {
  const siteConfig = await import(`../data/config.json`)
  // get all .md files from the src/posts dir
  const posts = (context => {
    // grab all the files matching this context
    const keys = context.keys()
    // grab the values from these files
    const values = keys.map(context)
    // go through each file
    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      // get the current file value
      const value = values[index]
      // Parse frontmatter & markdownbody for the current file
      const document = matter(value.default)
      // return the .md content & pretty slug
      return {
        document,
        slug,
      }
    })
    // return all the posts
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    allBlogs: posts,
    ...siteConfig,
  }
}
```

This can be slightly complex to look at, but let’s take it one step at a time. Feel free to reference [this blog](https://blog.toukopeltomaa.com/next-js-markdown-blog#gets-posts-from-posts-folder) for the original code. It uses a function provided by Webpack, [require.context()](https://webpack.js.org/guides/dependency-management/#requirecontext), that allows us to create our own ‘context’ based on three parameters:

- the directory to match within,
- a boolean flag to include or exclude subdirectories,
- a regular expression to match files against.

```javascript
require.context(directory, (useSubdirectories = false), (regExp = /^\.\//))
```

Creating a ‘context’ allows us to create a space essentially where we can pick out all the files matching a regular expression from a particular directory, and manipulate them into manageable formats that are provided back to the component as props to be rendered.

Now that we have all of the blog data, pass it as a prop to the `BlogList` component.

```javascript
const Index = props => {
  return (
    <Layout pathname="/" siteTitle={props.title} siteDescription={props.description}>
      <section>
        <BlogList allBlogs={props.allBlogs} />
      </section>
    </Layout>
  )
}

export default Index
```

Then you are free to loop through the blogs and render the list within your `BlogList` component as you need. Feel free to check out the [BlogList component](https://github.com/kendallstrautman/brevifolia-next-forestry/blob/master/src/components/BlogList.js) in my starter to see how that data could be handled.

## Next Steps

After setting up your blog or portfolio site, you’ll most likely need a content management system to make editing and updating your posts or data easier. Stay tuned for my next blog on setting up this starter with TinaCMS. In the meantime, you can check out our [documentation on using Next.js with TinaCMS](/docs/nextjs/overview), or [fork the finished product](https://github.com/kendallstrautman/brevifolia-nextjs) to start playing with TinaCMS right away.
