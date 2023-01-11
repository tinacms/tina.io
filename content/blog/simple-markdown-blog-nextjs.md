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

Want to skip to using Tina with Next.js? Jump to[ Part II](https://tinacms.org/blog/using-tinacms-with-nextjs/) of this series.

Next.js is a framework built on top of React for developing web applications. In detail, Next.js has become one of the most popular choices when it comes to web development thanks to its bootstrapped React environment (similar to create-react-app) and its simple, file-based routing logic.

Next.js is simple and flexible. Here you’ll see how to use Next.js to build a simple Markdown-based blog. 

Follow this step-by-step tutorial, and learn how to implement the following Markdown blog in Next.js:

![A complete overview of the Markdown-based Next.js blog](https://res.cloudinary.com/forestry-demo/image/upload/v1673425424/blog-media/tRBGrDoQ_1_dkgk2m.gif "A complete overview of the Markdown-based Next.js blog")


Now, let's learn how to implement this Next.js blog based on Markdown.

## Clone the Starter Project

First, let's clone the starter project. That’s nothing more than a boilerplate blog app to use as a starting point for this tutorial. Check it out on[ GitHub](https://github.com/tinalabs/nextjs-starter-boilerplate) for reference, or clone the starter repository in the my-nextjs-blog directory with: 

git clone https://github.com/tinalabs/nextjs-starter-boilerplate my-nextjs-blog


Then, enter the project folder, install the project dependencies, and launch the blog app with the following commands

cd my-nextjs-blog

npm install

npm run dev



After cloning the project and starting the [Next.js dev server](https://nextjs.org/docs/api-reference/cli#development), navigate to http://localhost:3000/ in your browser and you should be able to see the following page:

![The starter project in action](http://res.cloudinary.com/forestry-demo/image/upload/v1673425637/hm8AJj0t_hi0mer.png "The starter project in action")

As you can see, the blog app is pretty simple at the moment. Let’s now dig into the structure of this starter project to learn how to turn this app into a real Markdown-based blog.

## Project Structure

If you take look at the starter project in your IDE, you’ll see the following file structure:

my-nextjs-blog

├── components/

├── data/

├── pages/

├── public/

└── styles/

Note that pages, public, and styles come from the [Create Next App](https://nextjs.org/docs/api-reference/create-next-app) initialization command. The other two directories were added to the project. Specifically, data contains the blog configuration and other data, while components stores all React components required by the blog.

Now, let's look at the pages/index.js file:

// pages/index.js 




const Index = props => {

  return (

    \<Layout

      pathname="/"

      siteTitle={props.title}

      siteDescription={props.description}

    >

      \<section>

        \<BlogList />

      \</section>

    \</Layout>

  )

}




export default Index




export async function getStaticProps() {

  const configData = await import(\`../data/config.json\`)




  return {

    props: {

      title: configData.title,

      description: configData.description,

    },

  }

}


This file contains the home page component. Specifically, it returns a Layout component wrapping a \<section> HTML element containing a BlogList component. These are all the pieces that render our little starter app so far. 

This is what BlogList looks like:

// components/BlogList.js




import styles from "../styles/BlogList.module.css"




const BlogList = ({ allBlogs }) => {

    return (

    \<div className={styles.bloglist\_\_container}>

      \<h3>List of all blog posts will go here\</h3>

    \</div>

    )

}




export default BlogList


As you can see, it accepts a allBlogs prop value. This should contain the list of all blog posts to show on the home page of the blog. You’ll learn how to populate this prop later in this tutorial. As for now, let’s learn how data fetching works in Next.js.

## Layout and Styling

Each blog page has a common layout. This is defined in the Layout component below:

// components/Layout.js




import Header from "./Header"

import Meta from './Meta'

import styles from '../styles/Layout.module.css'




export default function Layout(props) {

  return (

    \<section

    className={styles.layout}

  >

    \<Meta

      siteTitle={props.siteTitle}

      siteDescription={props.siteDescription}

    />

    \<Header siteTitle={props.siteTitle} />

    \<div className={styles.content}>{props.children}\</div>

  \</section>

  )

}


In detail, the purpose of the Layout component is to provide the visual skeleton for every page of the site. Typically, such a component contains a nav and/or header that appears on most or all pages, along with a footer element. In this case, Layout only contains a header component that shows the site title. Keep in mind that the use of a Layout component isn’t unique to Next.js, and Gatsby websites also rely on a similar approach.


Note that Layout contains also the following Meta component:

// components/Meta.js




import Head from 'next/head'




export default function Meta(props) {

    return (

          \<Head>

              \<meta name="viewport" content="width=device-width, initial-scale=1" />

              \<meta charSet="utf-8" />

              \<title>{props.siteTitle}\</title>

              \<meta name="Description" content={props.description}>\</meta>

          \</Head>

    )

}




This uses the Next.js [Head](https://nextjs.org/docs/api-reference/next/head) component that enables you to specify what to put in the head section of your page for SEO or accessibility purposes.


An important aspect to mention is that the Layout component uses component-level CSS. Don’t forget that Next.js works out of the box with[ component-level CSS](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css). That’s super intuitive to use. All of the styles are scoped to the component. This means you don't have to worry about accidentally overriding a style rule somewhere else.


The global style of the blog app is handled in the globals.css you can find in the styles directory. So, if you want to change or add some global CSS rules, you can do it there. At the same time, keep in mind that the global font isn’t defined in the global.css file. This is defined in the Next.js \_app.js file below:

// pages/\_app.js




import '../styles/globals.css'

import { Work\_Sans } from '@next/font/google'




// importing the Work Sans font with

// the Next.js 13 Font Optimization Feature

const workSans = Work\_Sans({

  weight: \['400', '700'],

  style: \['normal', 'italic'],

  subsets: \['latin'],

})




function MyApp({ Component, pageProps }) {

  return \<main className={workSans.className}>

    \<Component {...pageProps} />

  \</main>

}




export default MyApp


This file defines the font to use in the entire application through the[ Next.js Font Optimization feature for Google Fonts introduced in Next.js 13](https://nextjs.org/docs/basic-features/font-optimization#google-fonts).

## Add the Posts Directory to the Project

Now that you’re familiar with the structure of the project and Next.js fundamentals, let’s add everything required to make the Markdown blog in Next.js work.

First, create a new directory called posts in the root folder of your project. This folder will contain all your Markdown blog posts. If you don’t already have content ready, just add a few dummy blog posts. Consider using[ Unsplash](https://unsplash.com/) for sample photos, while [Cupcake](http://www.cupcakeipsum.com/), [Hipsum](https://hipsum.co/), or [Sagan Ipsum](http://saganipsum.com/) can help you generate text for your posts.

### Create a Sample Post 

Now that you have a posts folder, it’s time to fill it with some Markdown posts.

Here’s an example of filler content for /posts/my-post.md with commonly used frontmatter values.

\---

title: A trip to Iceland

author: 'Watson & Crick '

date: '2019-07-10T16:04:44.000Z'

hero\_image: /norris-niman-iceland.jpg

\---

Brain is the seed of intelligence something incredible is waiting to be known.



If you aren’t familiar with this concept, a frontmatter is a way to store metadata in Markdown files. Typically, frontmatter metadata is stored in[ YAML](https://en.wikipedia.org/wiki/YAML) format in a block wrapped by three dashes placed at the beginning of a Markdown file.

Also, place the images referenced in the .md files in the public directory. In Next.js, you can access any file inside public from the base URL /. Learn more about [static file serving in Next.js](https://nextjs.org/docs/basic-features/static-file-serving).

## Processing Markdown Files in Next.js

Now, it is time to install a few packages. These will help you process your Markdown files.

npm add raw-loader gray-matter react-markdown

Specifically:

* [Raw Loader](https://github.com/webpack-contrib/raw-loader) will process your Markdown files.
* [Gray Matter](https://github.com/jonschlinkert/gray-matter) will parse your YAML frontmatter values.
* [React Markdown](https://github.com/rexxars/react-markdown) will parse and render the body of your Markdown files.

### Add a next.config.js File to Configure Next.js 

Now that you installed some packages needed to handle Markdown, you need to configure the use of the raw-loader. First, create a [next.config.js](https://nextjs.org/docs#custom-configuration) file at the root of the project.

This file enables you to handle any custom configuration for Webpack, routing, build and runtime config, export options, and more. In this use case, you simply have to [add a Webpack rule to make it use raw-loader](https://v4.webpack.js.org/loaders/raw-loader/) to process Markdown .md files.

// next.config.js

module.exports = {

  webpack: function(config) {

    config.module.rules.push({

      test: /\\.md$/,

      use: 'raw-loader',

    })

    return config

  },

}

Webpack is now able to deal with Markdown files. You now need to configure Next.js to create a web page for each Markdown blog post file. Let’s learn how.

## Configure Dynamic Routing in Next.js

For some background knowledge, the pages directory is special in Next.js. Each .js file in this directory will respond to a matching HTTP request. For example, when the home page “/” is requested, the component exported from pages/index.js will be rendered. So, if you want your site to have a page at /about, simply create a file named pages/about.js.

This is awesome for static pages, but you want to have a single template from which all blog posts will be built, sourcing the different data from each Markdown file. This means you need to implement dynamic routing. In detail, you want each blog post to have a good-looking URL associated with a page based on this template. 

This can be achieved in Next.js very easily. In detail, [dynamic routes](https://nextjs.org/docs#dynamic-routing) in Next.js are identified by square brackets \[] in the filename. Within these brackets, you can pass a query parameter to the page component.

### Initialize the Blog Post Dynamic Content Page

Let’s create a new folder in pages called blog, then add a new file within that blog folder \[slug].js.

You’ll learn how to complete this file soon. As for now, you need to know that this file represents a dynamic web page.

In other words, the content of pages/blog/\[slug].js will change based on the \[slug] parameter in the URL. In detail, based on the slug string extracted from the URL, \[slug].js will read a Markdown file from the file system and use its data to render the blog post.

## Create the pages/blog/\[slug].js Page Component

Let’s code the BlogTemplate blog page component that will render the content contained in a Markdown file read from posts. Thanks to this page, most of the blog logic will be implemented.

In the \[slug].js page component stored inside the blog directory, you’ll be able to access whatever string passed in the URL through the slug parameter. Typically, such info is used to dynamically retrieve the data to render the page. For example, if you visit http://localhost:3000/blog/julius-caesar, the slug query parameter in \[slug].js will contain the “julius-caesar” string.

Let’s now learn how to use the slug parameter to retrieve your content data.

### Get the Markdown Data for the Blog Page Component

With dynamic routing, you can make use of the slug parameter. Specifically, you can use slug to get the data from the corresponding Markdown file in getStaticProps() as follows:

// pages/blog/\[slug].js



import Image from "next/image"

import matter from 'gray-matter'

import ReactMarkdown from 'react-markdown'

import styles from "../../styles/Blog.module.css"

import glob from "glob"




import Layout from '../../components/Layout'




function reformatDate(fullDate) {

  const date = new Date(fullDate)

  return date.toDateString().slice(4)

}




export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {

  return (

    \<Layout siteTitle={siteTitle}>

      \<article className={styles.blog}>

        \<figure className={styles.blog\_\_hero}>

          \<Image

            width="1920"

            height="1080"

            src={frontmatter.hero\_image}

            alt={\`blog\_hero\_${frontmatter.title}\`}

          />

        \</figure>

        \<div className={styles.blog\_\_info}>

          \<h1>{frontmatter.title}\</h1>

          \<h3>{reformatDate(frontmatter.date)}\</h3>

        \</div>

        \<div className={styles.blog\_\_body}>

          \<ReactMarkdown>{markdownBody}\</ReactMarkdown>

        \</div>

        \<h2 className={styles.blog\_\_footer}>Written By: {frontmatter.author}\</h2>

      \</article>

    \</Layout>

  )

}




export async function getStaticProps(context) {

  // extracting the slug from the context

  const { slug } = context.params




  const config = await import(\`../../data/config.json\`)




  // retrieving the Markdown file associated to the slug

  // and reading its data

  const content = await import(\`../../posts/${slug}.md\`)

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

  const blogs = glob.sync('posts/\*\*/\*.md')




  // converting the file names to their slugs

  const blogSlugs = blogs.map(file =>

    file

      .split('/')\[1]

      .replace(/ /g, '-')

      .slice(0, -3)

      .trim()

  )




  // creating a path for each of the \`slug\` parameter

  const paths = blogSlugs.map(slug => { return { params: { slug: slug} } })




  return {

    paths,

    fallback: false,

  }

}




> Note the use of gray-matter and ReactMarkdown to properly handle the YAML frontmatter and Markdown body, respectively.
>

An in-depth look at how this snippet works. Let’s assume you navigate to the http://localhost:3000/blog/julius-caesar dynamic route. The BlogTemplate component in pages/blog/\[slug].js is passed the params object { slug: "julius-caesar" }. 

When the getStaticProps() function is called, that params object is passed in through the [context parameter](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#context-parameter). Then, slug is extracted from the query params stored in context. In detail, slug is used to search for a .md file within the posts directory that has the same file name. 

Once you get the data from that file, you parse the frontmatter from the Markdown body and return the data. That data is passed down as props to the BlogTemplate component, which will render that data as it needs.

#### Implementing getStaticPaths()

At this point, you should be more familiar with getStaticProps(). But the [getStatisPaths()](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths) function may look new to you. Since this template uses dynamic routes, you need to define a list of paths for each blog. This way, Next.js will be able to statically render each blog post past at build time. Keep in mind that you need to use getStaticPaths() only when it comes to dynamic routing.

In the return object from getStaticPaths(), the following two keys are required: 

* [paths](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#paths): contains an array of object having a params field with the required dynamic param. For example, { params : { slug: "julius-caesar"} }. 
* [fallback](https://nextjs.org/docs/basic-features/data-fetching/overview#the-fallback-key-required): allows you to control the Next.js behavior when a path isn’t returned from getStaticPaths(). Set it to false to make Next.js return a 404 page for unknown paths.

> Before the release of Next.js 9.3, this path generation for static export could be handled via [exportPathMap](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap).

Now Navigate to [http://localhost:3000/blog/my-post](http://localhost:3000/blog/my-post). This is what the BlogTemplate component looks like:

![http://localhost:3000/blog/my-post in action](http://res.cloudinary.com/forestry-demo/image/upload/v1673426650/mArAHU8g_1_bedrfy.gif "http://localhost:3000/blog/my-post in action")

As you can see, it perfectly renders the blog post data stored in Markdown format.

## Add a Homepage to Your Blog

Let’s finish this simple Markdown-based blog in Next.js by completing the home page. All you have to do is change the data retrieval logic in pages/index.js page. Specifically, you want to pass the proper data to the BlogList component on the Index page. Since you can only use getStaticProps() on page components, you’ll have to pass the blog data down from the Index component to BlogList as a prop.

Implement pages/index.js as follows:




// pages/index.js




import matter from "gray-matter"

import Layout from "../components/Layout"

import BlogList from "../components/BlogList"




const Index = props => {

  return (

      \<Layout

          pathname="/"

          siteTitle={props.title}

          siteDescription={props.description}

      >

        \<section>

          \<BlogList allBlogs={props.allBlogs} />

        \</section>

      \</Layout>

  )

}




export default Index




export async function getStaticProps() {

  // getting the website config

  const siteConfig = await import(\`../data/config.json\`)




  const webpackContext = require.context("../posts", true, /\\.md$/)

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

        .replace(/^.\*\[\\\\\\/]/, "")

        .split(".")

        .slice(0, -1)

        .join(".")




    // getting the .md file value associated

    // with the current file name

    const value = values\[index]




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

The getStaticProps() function here may be slightly complex to look at, but let’s take it one step at a time. The logic here is based on the [require.context()](https://webpack.js.org/guides/dependency-management/#requirecontext) function provided by Webpack. This allows you to create your own Webpack context based on three parameters:

* The directory to match within.
* A boolean flag to include or exclude subdirectories.
* A regular expression to match files against.

You can define a Webpack context with require.context() with the following syntax:

require.context(

  directory, 

  (useSubdirectories = true),

  (regExp = /^\\.\\/.\*$/),

)

Note that the parameters in round brackets are optional. For example, this is how you can call the require.context() function:

require.context("../posts", true, /\\.md$/)




Thanks to a Webpack context, you can pick out all the files matching a regular expression from a particular directory. This allows you to generate the slug string from each file name, read its content, parse it with the frontmatter library, and pass the manipulated data to Index as props.




Then, the blog data is passed as a prop to the BlogList component. In the BlogList component, you can iterate over the blog data and render the list of post previews as you wish. Specifically, the BlogList component takes care of rendering the blog data.This is what BlogList looks like:

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

        \<ul>

            {allBlogs && allBlogs.length > 1 &&

                allBlogs.map(post => (

                    \<li key={post.slug}>

                        \<Link href={{ pathname: \`/blog/${post.slug}\` }} className={styles.blog\_\_link}>

                            \<div className={styles.hero\_image}>

                                \<Image

                                    width={384}

                                    height={288}

                                    src={post.frontmatter.hero\_image}

                                    alt={post.frontmatter.hero\_image}

                                />

                            \</div>

                            \<div className={styles.blog\_\_info}>

                                \<h2>{post.frontmatter.title}\</h2>

                                \<h3>{reformatDate(post.frontmatter.date)}\</h3>

                                \<ReactMarkdown disallowedElements={\["a"]}>{truncateSummary(post.markdownBody)}\</ReactMarkdown>

                            \</div>

                        \</Link>

                    \</li>

                ))}

        \</ul>

    )

}




export default BlogList




If your development server is running, you should now be able to navigate your Next.js Markdown blog app at http://localhost:3000. Otherwise, launch the app with:

npm run dev


Note that you may have to relaunch the homepage of the blog to see the blog posts.


Congrats! You just learned how to build a Markdown blog in Next.js!

> Check out the[ final repo](https://github.com/tinalabs/brevifolia-next-2022)!

## Conclusion and Next Steps

In this article, you learned how to build a Markdown-based blog app in Next.js from scratch. As you saw here, this doesn’t require a lot of code. In detail, you can easily configure Next.js to read Markdown files from the file system. You can then use these files as a source for your blog posts.

After setting up your Markdown-based blog site, you’ll most likely need a CMS ([Content Management System)](https://en.wikipedia.org/wiki/Content_management_system) to make editing and updating your posts or data easier. Stay tuned for the next blog on setting up this starter with TinaCMS. In the meantime, you can check out our[ documentation](https://tina.io/docs), or[ try out a starter](https://tina.io/docs/introduction/using-starter/) to start playing with TinaCMS right away.



## Tina + Next Part I

> **02.08.22**: This post has been updated to use Next 12 and it's latest features.

*Want to skip to using Tina with Next.js? Jump to [Part II](https://tinacms.org/blog/using-tinacms-with-nextjs/ "") of this series.*

Next.js is a React "metaframework" (a framework built on a framework) for developing web applications. Next.js has become a popular choice for web developers due to its bootstrapped React environment (similar to `create-react-app`) and its simple, file-based routing for writing backend code.

**Next.js is simple and flexible.** Compared to a full-fledged static site generator, there are less prescriptive guide rails placed on developers in the implementation of an app or site. Due to this flexibility, this article shares just one perspective to approach building a simple, Markdown-based blog. Take what’s helpful, disregard the rest.

***

If you'd like to skip ahead and reference final versions of the starter, feel free to checkout the [finished implementation](https://github.com/tinalabs/brevifolia-next-2022 "").

## Clone the starter

Let’s get started. I have provided a [bare bones starter](https://github.com/tinalabs/nextjs-starter-boilerplate "") to use as a starting point for this tutorial. You can clone the project or check it out on [github](https://github.com/tinalabs/nextjs-starter-boilerplate "") for reference.

```javascript
// clone the repo from your terminal
$ git clone https://github.com/tinalabs/nextjs-starter-boilerplate my-nextjs-blog

// install the dependencies
$ cd my-nextjs-blog
$ yarn install

// start up the dev server
$ yarn dev
```

After you clone the project and start the dev server, navigate to `http://localhost:3000/` in your browser to see what you're working with.

![nextjs starter blog](/img/blog/next-blog-1.png "")

As you can see, it's pretty simple at the moment. If you look at the project in your code editor, you will see the following directory structure:

```
components/
data/
pages/
styles/
```

## Project Structure

Let’s look at the `pages/index.js` file:

```javascript
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

You’ll see that you now have a `Layout` component wrapping a `<section>` with a `BlogList` component — these are all the pieces that render our little starter so far.

## Data Handling

Next.js [pre-renders](https://nextjs.org/docs/basic-features/pages#pre-rendering "") every page, meaning it generates HTML for pages in advance. As of [Next.js 9.3](https://nextjs.org/blog/next-9-3 ""), there are two ways to pre-render pages: **static generation or server-side-rendering (SSR)**. Next.js is unique in that you can use either approach depending on the project.

For this blog, you will implement static generation, this means HTML pages for each route will be generated at build time. Static generation allows pages to be cached by a CDN, improving performance.

### *getStaticProps*

In the initial example`index.js`, notice the use of [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation "") below the component. This function allows you to fetch data and return it as props to your page component. The page will be rendered at **build time** with the props from the return object in `getStaticProps`.

**This is your bread and butter for retrieving page-level data in Next.** You can use `getStaticProps` to fetch data from an external api, or as seen in this example, you can get a hold of local data sources.

**Note:** this method only works for components defined in the `pages/` directory, i.e., `page` components. You cannot use this method on child components, but you can pass down the data received to these child components, as you see being done with `Layout` in the example above.

`Layout` is being passed props such as the site title and description. If you look at the data in `data/config.json`, you’ll see the values these props are referencing. Go ahead and change the site title to your project name, then watch it update in the header.

## Layout & Styling

To zoom out a little, the purpose of the `Layout` component is to provide the visual skeleton for every page of the site. It typically will contain some sort of nav or header that shows up on most or all pages, along with a footer element. In your case you just have a header that contains the site title.

Within `Layout`, there is a `Meta` component that contains all global styles along with anything needed to be put in the `head` of the site for SEO or accessibility purposes. Note that the use of a `Layout` component isn’t unique to Next.js; you’ll see it commonly used in Gatsby sites as well.

One thing you may notice in the `Layout` component is the use of component level CSS. **Next.js works out of the box with** **[component level css](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css "")**. It’s super intuitive to use. All of the styles are scoped to the component, this means you don't have to worry about accidentally overriding a style somewhere else.

Note that global styles and fonts are handled in the `globals.css` found in the `styles` directory, so if you want to change fonts, or add more global styles you can add it here.

## Adding the Posts Directory

Now that you’re familiar with the structure of the project and Next.js fundamentals, let’s start adding the pieces and parts to get the Markdown blog up and running.

First, add a new folder in the root of your project called `posts`. You can add all your Markdown blog posts here. If you don’t already have content ready, just add a few dummy blog posts. I like to use [Unsplash](https://unsplash.com/ "") for sample photos and [Cupcake](http://www.cupcakeipsum.com ""), [Hipsum](https://hipsum.co/ ""), or [Sagan Ipsum](http://saganipsum.com/ "") are my preferred text generators — keeps things interesting.

Here’s an example filler blog post with some commonly used frontmatter values.

```yaml
---
title: A trip to Iceland
author: 'Watson & Crick '
date: '2019-07-10T16:04:44.000Z'
hero_image: /norris-niman-iceland.jpg
---
Brain is the seed of intelligence something incredible is waiting to be known.
```

Also, create a `public` folder in the root. This is where you will keep images.

## Processing Markdown Files

Next, you need to install a few packages that will process your Markdown files.

```
$ yarn add raw-loader gray-matter react-markdown
```

[Raw Loader](https://github.com/webpack-contrib/raw-loader "") will process your Markdown files. [Gray Matter](https://github.com/jonschlinkert/gray-matter "") will parse your yaml frontmatter values. And [React Markdown](https://github.com/rexxars/react-markdown "") will parse and render the body of your Markdown files.

### Add Next.js Config

Now that you’ve installed some packages needed to handle Markdown, you need to configure the use of the `raw-loader` by creating a [next.config.js](https://nextjs.org/docs#custom-configuration "") file at the root of the project. In this file you will handle any custom configuration for webpack, routing, build & runtime config, export options, and a whole lot more. In your use case, you will simply be adding a webpack rule to use `raw-loader` for processing all Markdown files.

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

So you’re set up to use Markdown files in your project. Let’s start coding a blog template page that will render the content from these Markdown files in `posts`.

For some background knowledge, the `pages` directory is special in Next.js. Each `.js` file in this directory will respond to a matching HTTP request. For example, when the home page ('/') is requested, the component exported from `pages/index.js` will be rendered. If you want your site to have a page at `/about`, simply create a file named `pages/about.js`.

This is awesome for static pages, but you’d like to have a single template from which all blog posts will be built, sourcing the different data from each Markdown file. This means you need some sort of dynamic routing, such that unique blog posts utilizing the same template have ‘pretty’ urls and their own individual pages.

[Dynamic routes](https://nextjs.org/docs#dynamic-routing "") in Next.js are identified by **square brackets** `[]` in the filename. Within these brackets you can pass a query parameter to the page component. For example, let’s create a new folder within `pages` called `blog`, then add a new file within that blog folder `[slug].js`, you can use whatever is passed as this `slug` parameter to dynamically access data. So if you visit `http://localhost:3000/blog/julius-caesar`, whatever is returned from the `[slug].js` page component will render, and will have access to that ‘slug’ query parameter, i.e. ‘julius-caesar’.

### Get Markdown Data For the Blog Template

With dynamic routing, you can make use of this slug parameter by passing in the filename of the blog post and then getting the data from the corresponding Markdown file via `getStaticProps`.

```javascript
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'

export default function BlogTemplate(props) {
  // Render data from `getStaticProps`
  return (
    <Layout siteTitle={props.siteTitle}>
      <article>
        <h1>{props.frontmatter.title}</h1>
        <div>
          <ReactMarkdown source={props.markdownBody} />
        </div>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../posts/${slug}.md`)
  const config = await import(`../../data/config.json`)
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
  //get all .md files in the posts dir
  const blogs = glob.sync('posts/**/*.md')

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map(file =>
    file
      .split('/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
  )

  // create paths with `slug` param
  const paths = blogSlugs.map(slug => `/blog/${slug}`)

  return {
    paths,
    fallback: false,
  }
}
```

> Notice in this example that we’re making use of `gray-matter` and `ReactMarkdown` to properly handle the YAML frontmatter and Markdown body.

**A zoomed out look at how this is working:** when you navigate to a dynamic route, .e.g. `http://localhost:3000/blog/julius-caesar`, the BlogTemplate component in `pages/blog/[slug].js` is passed the `params` object `{ slug: ‘julius-caesar’ }`. When the `getStaticProps` function is called, that `params` object is passed in through the context. You get a hold of that slug value and then go search for a file within the `posts` directory that contains the same filename. Once you get the data from that file, you parse the frontmatter from the Markdown body and return the data. That data is passed down as props to the `BlogTemplate` component which can then render that data as it needs.

#### *getStaticPaths*

At this point, you may be more familiar with `getStaticProps`, but this function should look new — `getStaticPaths`. Since this template uses dynamic routes, you need to define a list of paths for each blog, so all the pages will be rendered statically at build time.

In the return object from `getStaticPaths`, **two keys are required**: `paths` and `fallback`. `paths` should return an array of pathnames and any `params` used in the page name. For example the 'param' used in `/blog/[slug].js` is 'slug'. You should only need to use `getStaticPaths` for dynamic routing.

The [`fallback` property](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required "") allows you to control the behavior if a path is not returned from `getStaticPaths`. You should set this to `false` so that unreturned paths will show a 404 page.

> Before the release of Next.js 9.3, this path generation for static export could be handled via [`exportPathMap`](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap "").

Checkout the [\[slug\].js file](brevifolia-next-2022blob/master/pages/blog/%5Bslug%5D.js "") in the final version of my starter blog to get another idea of how that blog data could be rendered and styles applied.

### Get Data For the Blog Index

Let’s finish this simple blog off by adding in the proper data to the `BlogList` component for the `Index` page. Since you can only use `getStaticProps` on page components, you will get a hold of all the blog data in the `Index` component and then pass it down as a prop for `BlogList` to render.

```javascript
// pages/index.js
export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`)
  //get posts & context from folder
  const posts = (context => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      // Create slug from filename
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const value = values[index]
      // Parse yaml metadata & markdownbody in document
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  }
}
```

This can be slightly complex to look at, but let’s take it one step at a time. Feel free to reference [this blog](https://blog.toukopeltomaa.com/next-js-markdown-blog#gets-posts-from-posts-folder "") for the original code. It uses a function provided by Webpack, [require.context()](https://webpack.js.org/guides/dependency-management/#requirecontext ""), that allows you to create your own ‘context’ based on three parameters:

* The directory to match within.
* A boolean flag to include or exclude subdirectories.
* A regular expression to match files against.

```javascript
require.context(directory, (useSubdirectories = false), (regExp = /^\.\//))
```

Creating a ‘context’ allows us to create a space where you can **pick out all the files matching a regular expression** from a particular directory, and manipulate them into manageable formats that are provided back to the component as props to be rendered.

Now that you have all of the blog data, pass it as a prop to the `BlogList` component.

```javascript
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
```

Then you are free to loop through the blogs and render the list within your `BlogList` component as you need. Feel free to check out the [BlogList component](https://github.com/tinalabs/brevifolia-next-2022/blob/master/components/BlogList.js "") in my starter to see how that data could be handled.

## Next Steps

> Checkout the [final repo](https://github.com/tinalabs/brevifolia-next-2022 "")!

After setting up your blog or portfolio site, you’ll most likely need a content management system to make editing and updating your posts or data easier. Stay tuned for my next blog on setting up this starter with TinaCMS. In the meantime, you can check out our [documentation ](/docs ""), or [try out a starter](https://tina.io/docs/introduction/using-starter/ "") to start playing with TinaCMS right away.

## Where can you keep up to date with Tina?

You know that you want to be part of this creative, innovative, supportive community of developers (and even some editors and designers) who are experimenting and implementing Tina daily.

### Tina Community Discord

Tina has a community [Discord](https://discord.com/invite/zumN63Ybpf "") that is full of Jamstack lovers and Tina enthusiasts. When you join you will find a place:

* To get help with issues
* Find the latest Tina news and sneak previews
* Share your project with Tina community, and talk about your experience
* Chat about the Jamstack

### Tina Twitter

Our Twitter account ([@tinacms](https://twitter.com/tinacms "")) announces the latest features, improvements, and sneak peeks to Tina. We would also be psyched if you tagged us in projects you have built.
