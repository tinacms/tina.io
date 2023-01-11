---
title: How To Create a Markdown Blog With Next.js
date: '2022-02-18T07:00:00.000Z'
last_edited: '2023-01-10T23:00:00.000Z'
author: 'Antonello Zanini, Kendall Strautman, and James Perkins'
draft: false
next: content/blog/using-tinacms-with-nextjs.md
---

# How To Create a Markdown Blog With Next.js

> 11.01.23: This post has been updated to use Next.js 13 and its latest features.

*Want to skip to using Tina with Next.js? Jump to[ Part II](https://tinacms.org/blog/using-tinacms-with-nextjs/ "") of this series.*

Next.js is a framework built on top of React for developing web applications. In detail, Next.js has become one of the most popular choices when it comes to web development thanks to its bootstrapped React environment (similar to `create-react-app`) and its simple, file-based routing logic.

Next.js is simple and flexible. Here you'll see how to use Next.js to build a simple Markdown-based blog.

Follow this step-by-step tutorial, and learn how to implement the following Markdown blog in Next.js:

![A complete overview of the Markdown-based Next.js blog](https://res.cloudinary.com/forestry-demo/image/upload/v1673425424/blog-media/tRBGrDoQ_1_dkgk2m.gif "A complete overview of the Markdown-based Next.js blog")

Now, let's learn how to implement this Next.js blog based on Markdown.

## Clone the Starter Project

First, let's clone the starter project. That's nothing more than a boilerplate blog app to use as a starting point for this tutorial. Check it out on[ GitHub](https://github.com/tinalabs/nextjs-starter-boilerplate "") for reference, or clone the starter repository in the `my-nextjs-blog` directory with:

```
git clone https://github.com/tinalabs/nextjs-starter-boilerplate my-nextjs-blog
```

Then, enter the project folder, install the project dependencies, and launch the blog app with the following commands

```
cd my-nextjs-blog
npm install
npm run dev
```

After cloning the project and starting the [Next.js dev server](https://nextjs.org/docs/api-reference/cli#development ""), navigate to `http://localhost:3000/` in your browser and you should be able to see the following page:

![The starter project in action](http://res.cloudinary.com/forestry-demo/image/upload/v1673425637/hm8AJj0t_hi0mer.png "The starter project in action")

As you can see, the blog app is pretty simple at the moment. Let's now dig into the structure of this starter project to learn how to turn this app into a real Markdown-based blog.

## Project Structure

If you take look at the starter project in your IDE, you'll see the following file structure:

```
my-nextjs-blog
├── components/
├── data/
├── pages/
├── public/
└── styles/
```

Note that `pages`, `public`, and `styles` come from the [Create Next App](https://nextjs.org/docs/api-reference/create-next-app "") initialization command. The other two directories were added to the project. Specifically, `data` contains the blog configuration and other data, while `components` stores all React components required by the blog.

Now, let's look at the `pages/index.js` file:

```javascript
// pages/index.js

const Index = props => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <BlogList />
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../data/config.json`)

  return {
    props: {
      title: configData.title,
      description: configData.description,
    },
  }
}
```

This file contains the home page component. Specifically, it returns a `Layout` component wrapping a `<section>` HTML element containing a `BlogList` component. These are all the pieces that render our little starter app so far.

This is what `BlogList` looks like:

```javascript
// components/BlogList.js

import styles from "../styles/BlogList.module.css"

const BlogList = ({ allBlogs }) => {
  return (
    <div className={styles.bloglist__container}>
      <h3>List of all blog posts will go here</h3>
    </div>
  )
}

export default BlogList
```

As you can see, it accepts a `allBlogs` prop value. This should contain the list of all blog posts to show on the home page of the blog. You'll learn how to populate this prop later in this tutorial.

## Layout and Styling

Each blog page has a common layout. This is defined in the `Layout` component below:

```javascript
// components/Layout.js

import Header from "./Header"
import Meta from "./Meta"
import styles from "../styles/Layout.module.css"

export default function Layout(props) {
  return (
    <section
      className={styles.layout}
    >
      <Meta
        siteTitle={props.siteTitle}
        siteDescription={props.siteDescription}
      />
      <Header siteTitle={props.siteTitle} />
      <div className={styles.content}>{props.children}</div>
    </section>
  )
}
```

In detail, the purpose of the `Layout` component is to provide the visual skeleton for every page of the site. Typically, such a component contains a nav and/or header that appears on most or all pages, along with a footer element. In this case, `Layout` only contains a header component that shows the site title. Keep in mind that the use of a `Layout` component isn't unique to Next.js, and Gatsby websites also rely on a similar approach.

Note that `Layout` contains also the following Meta component:

```javascript
// components/Meta.js

import Head from "next/head"

export default function Meta(props) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{props.siteTitle}</title>
      <meta name="Description" content={props.description}></meta>
    </Head>
  )
}
```

This uses the Next.js [`Head`](https://nextjs.org/docs/api-reference/next/head "") component that enables you to specify what to put in the head section of your page for SEO or accessibility purposes.

An important aspect to mention is that the `Layout` component uses component-level CSS. Don't forget that Next.js works out of the box with [component-level CSS](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css ""). That's super intuitive to use. All of the styles are scoped to the component. This means you don't have to worry about accidentally overriding a style rule somewhere else.

The global style of the blog app is handled in the `globals.css` you can find in the styles directory. So, if you want to change or add some global CSS rules, you can do it there. At the same time, keep in mind that the global font isn't defined in the `global.css` file. This is defined in the Next.js `_app.js` file below:

```javascript
// pages/_app.js

import "../styles/globals.css"
import { Work_Sans } from "@next/font/google"

// importing the Work Sans font with
// the Next.js 13 Font Optimization Feature
const workSans = Work_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  return <main className={workSans.className}>
    <Component {...pageProps} />
  </main>
}

export default MyApp
```

## Add the Posts Directory to the Project

Now that you're familiar with the structure of the project and Next.js fundamentals, let's add everything required to make the Markdown blog in Next.js work.

First, create a new directory called posts in the root folder of your project. This folder will contain all your Markdown blog posts. If you don't already have content ready, just add a few dummy blog posts. Consider using [Unsplash](https://unsplash.com/ "") for sample photos, while [Cupcake](http://www.cupcakeipsum.com/ ""), [Hipsum](https://hipsum.co/ ""), or [Sagan Ipsum](http://saganipsum.com/ "") can help you generate text for your posts.

### Create a Sample Post

Now that you have a posts folder, it's time to fill it with some Markdown posts.

Here's an example of filler content for `/posts/my-post.md` with commonly used frontmatter values.

```markdown
---
  title: A trip to Iceland
author: 'Watson & Crick '
date: '2019-07-10T16:04:44.000Z'
hero_image: /norris-niman-iceland.jpg
---
  Brain is the seed of intelligence something incredible is waiting to be known.
```

If you aren't familiar with this concept, a frontmatter is a way to store metadata in Markdown files. Typically, frontmatter metadata is stored in [YAML](https://en.wikipedia.org/wiki/YAML "") format in a block wrapped by three dashes placed at the beginning of a Markdown file.

Also, place the images referenced in the `.md` files in the public directory. In Next.js, you can access any file inside public from the base URL `/`. Learn more about [static file serving in Next.js](https://nextjs.org/docs/basic-features/static-file-serving "").

## Processing Markdown Files in Next.js

Now, it is time to install a few packages. These will help you process your Markdown files.

```
npm add raw-loader gray-matter react-markdown
```

Specifically:

* [Raw Loader](https://github.com/webpack-contrib/raw-loader "") will process your Markdown files.
* [Gray Matter](https://github.com/jonschlinkert/gray-matter "") will parse your YAML frontmatter values.
* [React Markdown](https://github.com/rexxars/react-markdown "") will parse and render the body of your Markdown files.

### Add a `next.config.js` File to Configure Next.js

Now that you installed some packages needed to handle Markdown, you need to configure the use of the raw-loader. First, create a [`next.config.js`](https://nextjs.org/docs#custom-configuration "") file at the root of the project.

This file enables you to handle any custom configuration for Webpack, routing, build and runtime config, export options, and more. In this use case, you simply have to [add a Webpack rule to make it use `raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/ "") to process Markdown `.md` files.

```javascript
// next.config.js

module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
}
```

Webpack is now able to deal with Markdown files. You now need to configure Next.js to create a web page for each Markdown blog post file. Let's learn how.

## Configure Dynamic Routing in Next.js

For some background knowledge, the pages directory is special in Next.js. Each `.js` file in this directory will respond to a matching HTTP request. For example, when the home page `"/"` is requested, the component exported from `pages/index.js` will be rendered. So, if you want your site to have a page at `/about`, simply create a file named `pages/about.js`.

This is awesome for static pages, but you want to have a single template from which all blog posts will be built, sourcing the different data from each Markdown file. This means you need to implement dynamic routing. In detail, you want each blog post to have a good-looking URL associated with a page based on this template.

This can be achieved in Next.js very easily. In detail, [dynamic routes](https://nextjs.org/docs#dynamic-routing "") in Next.js are identified by square brackets `[``]` in the filename. Within these brackets, you can pass a query parameter to the page component.

### Initialize the Blog Post Dynamic Content Page

Let's create a new folder in pages called blog, then add a new file within that blog folder `[slug].js`.

You'll learn how to complete this file soon. As for now, you need to know that this file represents a dynamic web page.

In other words, the content of `pages/blog/[slug].js` will change based on the `[slug]` parameter in the URL. In detail, based on the slug string extracted from the URL, `[slug].js` will read a Markdown file from the file system and use its data to render the blog post.

## Create the pages/blog/\[slug].js Page Component

Let's code the `BlogTemplate` blog page component that will render the content contained in a Markdown file read from posts. Thanks to this page, most of the blog logic will be implemented.

In the `[slug].js` page component stored inside the blog directory, you'll be able to access whatever string passed in the URL through the `slug` parameter. Typically, such info is used to dynamically retrieve the data to render the page. For example, if you visit `http://localhost:3000/blog/julius-caesar`, the slug query parameter in `[slug].js` will contain the “julius-caesar” string.

Let's now learn how to use the slug parameter to retrieve your content data.

### Get the Markdown Data for the Blog Page Component

With dynamic routing, you can make use of the slug parameter. Specifically, you can use slug to get the data from the corresponding Markdown file in `getStaticProps()` as follows:

```javascript
// pages/blog/[slug].js

import Image from "next/image"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import styles from "../../styles/Blog.module.css"
import glob from "glob"
import Layout from "../../components/Layout"

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toDateString().slice(4)
}

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
  return (
    <Layout siteTitle={siteTitle}>
      <article className={styles.blog}>
        <figure className={styles.blog__hero}>
          <Image
            width="1920"
            height="1080"
            src={frontmatter.hero_image}
            alt={`blog_hero_${frontmatter.title}`}
          />
        </figure>
        <div className={styles.blog__info}>
          <h1>{frontmatter.title}</h1>
          <h3>{reformatDate(frontmatter.date)}</h3>
        </div>
        <div className={styles.blog__body}>
          <ReactMarkdown>{markdownBody}</ReactMarkdown>
        </div>
        <h2 className={styles.blog__footer}>Written By: {frontmatter.author}</h2>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  // extracting the slug from the context
  const { slug } = context.params

  const config = await import(`../../data/config.json`)

  // retrieving the Markdown file associated to the slug
  // and reading its data
  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  // getting all .md files from the posts directory
  const blogs = glob.sync(`posts/**/*.md`)

  // converting the file names to their slugs
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // creating a path for each of the `slug` parameter
  const paths = blogSlugs.map(slug => { return { params: { slug: slug } } })

  return {
    paths,
    fallback: false,
  }
}
```

> Note the use of gray-matter and ReactMarkdown to properly handle the YAML frontmatter and Markdown body, respectively.

An in-depth look at how this snippet works. Let's assume you navigate to the `http://localhost:3000/blog/julius-caesar` dynamic route. The `BlogTemplate` component in `pages/blog/[slug].js` is passed the params object `{ slug: "julius-caesar" }`.

When the `getStaticProps()` function is called, that params object is passed in through the [context parameter](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter ""). Then, slug is extracted from the query params stored in `context`. In detail, slug is used to search for a .md file within the posts directory that has the same file name.

Once you get the data from that file, you parse the frontmatter from the Markdown body and return the data. That data is passed down as props to the `BlogTemplate` component, which will render that data as it needs.

### Implementing `getStaticPaths()`

At this point, you should be more familiar with `getStaticProps()`. But the [`getStatisPaths()`](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths "") function may look new to you. Since this template uses dynamic routes, you need to define a list of paths for each blog. This way, Next.js will be able to statically render each blog post past at build time. Keep in mind that you need to use `getStaticPaths()` only when it comes to dynamic routing.

In the return object from `getStaticPaths()`, the following two keys are required:

* [paths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths ""): contains an array of object having a params field with the required dynamic param. For example, `{ params : { slug: "julius-caesar"} }`.
* [fallback](https://nextjs.org/docs/basic-features/data-fetching/overview#the-fallback-key-required ""): allows you to control the Next.js behavior when a path isn't returned from `getStaticPaths()`. Set it to false to make Next.js return a 404 page for unknown paths.

> Before the release of Next.js 9.3, this path generation for static export could be handled via [`exportPathMap`](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap "").

Now Navigate to [`http://localhost:3000/blog/my-post`](http://localhost:3000/blog/my-post ""). This is what the BlogTemplate component looks like:

![http://localhost:3000/blog/my-post in action](http://res.cloudinary.com/forestry-demo/image/upload/v1673426650/mArAHU8g_1_bedrfy.gif "http://localhost:3000/blog/my-post in action")

As you can see, it perfectly renders the blog post data stored in Markdown format.

## Add a Homepage to Your Blog

Let's finish this simple Markdown-based blog in Next.js by completing the home page. All you have to do is change the data retrieval logic in `pages/index.js` page. Specifically, you want to pass the proper data to the `BlogList` component on the Index page. Since you can only use `getStaticProps()` on page components, you'll have to pass the blog data down from the Index component to `BlogList` as a prop.

Implement `pages/index.js` as follows:

```javascript
// pages/index.js

import matter from "gray-matter"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"

const Index = props => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section>
        <BlogList allBlogs={props.allBlogs} />
      </section>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  // getting the website config
  const siteConfig = await import(`../data/config.json`)

  const webpackContext = require.context("../posts", true, /\.md$/)
  // the list of file names contained
  // inside the "posts" directory
  const keys = webpackContext.keys()
  const values = keys.map(webpackContext)

  // getting the post data from the files contained
  // in the "posts" folder
  const posts = keys.map((key, index) => {
    // dynamically creating the post slug
    // from file name
    const slug = key
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".")

    // getting the .md file value associated
    // with the current file name
    const value = values[index]

    // parsing the YAML metadata and markdown body
    // contained in the .md file
    const document = matter(value.default)

    return {
      frontmatter: document.data,
      markdownBody: document.content,
      slug,
    }
  })

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
```

The `getStaticProps()` function here may be slightly complex to look at, but let's take it one step at a time. The logic here is based on the [`require.context()`](https://webpack.js.org/guides/dependency-management/#requirecontext "") function provided by Webpack. This allows you to create your own Webpack context based on three parameters:

* The directory to match within.
* A boolean flag to include or exclude subdirectories.
* A regular expression to match files against.

You can define a Webpack context with `require.context()` with the following syntax:

```javascript
require.context(
  directory,
  (useSubdirectories = true),
  (regExp = /^\.\/.*$/),
)
```

Note that the parameters in round brackets are optional. For example, this is how you can call the `require.context()` function:

```javascript
require.context("../posts", true, /\\.md$/)
```

Thanks to a Webpack context, you can pick out all the files matching a regular expression from a particular directory. This allows you to generate the slug string from each file name, read its content, parse it with the frontmatter library, and pass the manipulated data to Index as props.

Then, the blog data is passed as a prop to the `BlogList` component. In the `BlogList` component, you can iterate over the blog data and render the list of post previews as you wish. Specifically, the `BlogList` component takes care of rendering the blog data. This is what `BlogList` looks like:

```javascript
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import styles from "../styles/BlogList.module.css"
import Image from "next/image"

function truncateSummary(content) {
  return content.slice(0, 200).trimEnd()
}

function reformatDate(fullDate) {
  const date = new Date(fullDate)
  return date.toDateString().slice(4)
}

const BlogList = ({ allBlogs }) => {
  return (
    <ul>
      {allBlogs && allBlogs.length > 1 &&
        allBlogs.map(post => (
          <li key={post.slug}>
            <Link href={{ pathname: `/blog/${post.slug}` }} className={styles.blog__link}>
              <div className={styles.hero_image}>
                <Image
                  width={384}
                  height={288}
                  src={post.frontmatter.hero_image}
                  alt={post.frontmatter.hero_image}
                />
              </div>
              <div className={styles.blog__info}>
                <h2>{post.frontmatter.title}</h2>
                <h3>{reformatDate(post.frontmatter.date)}</h3>
                <ReactMarkdown disallowedElements={["a"]}>{truncateSummary(post.markdownBody)}</ReactMarkdown>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default BlogList
```

If your development server is running, you should now be able to navigate your Next.js Markdown blog app at `http://localhost:3000`. Otherwise, launch the app with:

```
npm run dev
```

Note that you may have to relaunch the homepage of the blog to see the blog posts.

Congrats! You just learned how to build a Markdown blog in Next.js!

If you'd like to take a look at the final result, feel free to check out the [repository of the Markdown-based blog website](https://github.com/tinalabs/brevifolia-next-2022 "").

Clone it with the command below:

```
git clone https://github.com/tinalabs/brevifolia-next-2023
```

Enter the project folder, and launch the following command to install the dependencies and launch the Mardkown-based Next.js blog app:

```
cd brevifolia-next-2023
npm install
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000 "") in your browser and you now should be seeing the Markdown-based blog application in action.

## Conclusion and Next Steps

In this article, you learned how to build a Markdown-based blog app in Next.js from scratch. As you saw here, this doesn't require a lot of code. In detail, you can easily configure Next.js to read Markdown files from the file system. You can then use these files as a source for your blog posts.

After setting up your Markdown-based blog site, you'll most likely need a CMS ([Content Management System)](https://en.wikipedia.org/wiki/Content_management_system "") to make editing and updating your posts or data easier. Stay tuned for the next blog on setting up this starter with TinaCMS. In the meantime, you can check out our[ documentation](https://tina.io/docs ""), or[ try out a starter](https://tina.io/docs/introduction/using-starter/ "") to start playing with TinaCMS right away.

## Where Can You Keep Up to Date with Tina?

You know that you want to be part of this creative, innovative, supportive community of developers (and even some editors and designers) who are experimenting and implementing Tina daily.

### Tina Community Discord

Tina has a community [Discord](https://discord.com/invite/zumN63Ybpf "") that is full of Jamstack lovers and Tina enthusiasts. When you join you will find a place:

* To get help with issues
* Find the latest Tina news and sneak previews
* Share your project with the Tina community, and talk about your experience
* Chat about the Jamstack

### Tina Twitter

Our Twitter account ([@tinacms](https://twitter.com/tinacms "")) announces the latest features, improvements, and sneak peeks to Tina. We would also be psyched if you tagged us in projects you have built.
