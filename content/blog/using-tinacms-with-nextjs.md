---
title: Using TinaCMS with Next.js
date: '2019-12-02T07:00:00.000Z'
author: Kendall Strautman & DJ Walker
draft: false
consumes:
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Uses tina-git-server
  - file: /packages/@tinacms/api-git/src/router.ts
    details: Uses tina-git-server
  - file: /packages/@tinacms/api-git/src/server.ts
    details: Sets up Git client to consume backend
  - file: /packages/tinacms/src/components/Tina.tsx
    details: Shows wrapping Next.js app with Tina component
  - file: /packages/tinacms/src/tina-cms.tsx
    details: Creates cms instance with TinaCMS
  - file: /packages/@tinacms/react-core/src/use-form.ts
    details: Demonstrates using useLocalForm on a Next.js site
  - file: /packages/@tinacms/react-core/src/use-watch-form-values.ts
    details: Demonstrates usage of useWatchFormValues
  - file: /packages/react-tinacms/src/index.ts
    details: Imports useLocalForm and useWatchFormValues from react-tinacms metapackage
next: /blog/deprecating-tina-git-server
prev: /blog/introducing-tina-grande
---

## Tina + Next: Part II

**Note: This blog was updated as of 12.06.19 related to [these changes](https://tinacms.org/blog/deprecating-tina-git-server/)**

This blog is a part of a series exploring the use of Next.js + Tina. In [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/), we learned how to create a simple markdown-based blog with Next. In this post we’ll add content editing capacity by configuring the site with TinaCMS.

### Next.js Recap ▲

[Next.js](https://nextjs.org/) is **a React “metaframework”** (a framework built on a framework) for developing web applications, built by the team at [ZEIT](https://zeit.co/). Read [Part I](/blog/simple-markdown-blog-nextjs/) to get familiar with Next.js basics.

### Tina Overview 🦙

We like to say that "[Tina](https://tinacms.org/) is not a CMS". Rather, Tina is a collection of open-source javascript components that you build into your site codebase — **a toolkit for creating a real time content-editing UI.** It's incredibly flexible, developers are in absolute control over content management, and editors get a "real-time WYSIWYG" experience.

The best way to get a feel for how Tina works is to use it. We hope that by the end of this tutorial, you’ll not only learn how to use Tina, but also how Tina rethinks the way a CMS should work.

## Let’s Get Started

![tinacms editing gif](/gif/tina-nextjs.gif)

This tutorial will show you how to install and **configure Tina for editing content on a simple markdown-based blog** that was created in last week’s post. If you want to dig into how the base blog was made, read [Part I](/blog/simple-markdown-blog-nextjs/) of this series.

> Jump ahead to see the [final repo here](https://github.com/kendallstrautman/brevifolia-next-tinacms). Or check out the [Tina + Next.js documentation](/docs/integrations/nextjs) here

### Some Background 🏜

It’s important to note that due to the open-ended nature of Next.js, there are numerous ways you could incorporate Tina into Next.js sites or apps. This tutorial will showcase just one approach with straightforward examples.

It's also worth noting that unlike Gatsby, Next.js does not currently have a plugin system. If you've previously looked at Tina's [Gatsby setup guide](/guides/gatsby/adding-tina/project-setup), you'll see that we're utilizing a few different plugins to set up Tina. With Next.js, we'll need to write that boostrapping code directly into our project.

### Set up Locally 🏡

Feel free to follow along and fit these guidelines to your own site or blog, or you can use the starter we created in the previous tutorial. In your terminal, navigate to where you would like this blog to live, then run:

```bash
#clone the repo
$ git clone git@github.com:kendallstrautman/brevifolia-nextjs.git next-tina-blog

#navigate to the directory
$ cd next-tina-blog

#install dependencies & run dev server with yarn
$ yarn install
$ yarn dev
```

Now that the development server is running, navigate to http://localhost:3000/ to check it out.

### Configure TinaCMS in App 🔆

With Next.js, there is an [`App` class component](https://nextjs.org/docs#custom-app) that initializes pages. We need to override this component to wrap every page in a `Tina` component that will provide access to the `cms` instance.

Following along with the [Tina documentation:](https://tinacms.org/guides/nextjs/git/getting-started)

```bash
# Install `tinacms` and other peer dependencies
$ yarn add tinacms styled-components moment
```

Create a new file in the pages directory called `_app.js` and add this code.

```javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'

class MyApp extends App {
  constructor() {
    super()
    // initialize the cms
    this.cms = new TinaCMS({
      enabled: true,
    })
  }
  render() {
    const { Component, pageProps } = this.props
    // Wrap the page with Tina, provide the cms
    return (
      <Tina cms={this.cms}>
        <Component {...pageProps} />
      </Tina>
    )
  }
}

export default MyApp
```

If you restart the dev server, you should now see a pencil icon in the lower left-hand corner. Go ahead and click it to reveal a sidebar. The `Tina` component we added in `_app.js` gives each page access to this sidebar). Think of it as your "home base" for editing content with Tina.

### Setting up a Git Backend 👾

As of now, the sidebar is empty because Tina doesn’t know what content to edit. Before we connect Tina to content, we need to [set up a backend](https://tinacms.org/guides/nextjs/git/adding-backend) that will talk to Git and can keep track of content changes as they are happening.

```bash
# Install Express, cors & Tina Git packages
$ yarn add express cors @tinacms/api-git @tinacms/git-client
```

Tina's backend plugins are set up as Express middleware. This means that we'll need to run Express with our Next.js dev server. Create a `server.js` file in the root of your project with the following:

```javascript
const express = require('express')
const next = require('next')
const cors = require('cors')
const gitApi = require('@tinacms/api-git')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(cors())
  server.use(
    '/___tina',
    gitApi.router({
      pathToRepo: process.cwd(),
      pathToContent: '',
    })
  )

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
```

Then in your package.json file, add this script:

```json
"scripts": {
    "develop": "node server.js",
    //...
  }
```

This will have Next use your custom server code instead if its default development server. Take a look at the [Next.js custom server docs](https://nextjs.org/docs#custom-server-and-routing) and [Tina's Next.js docs](/guides/nextjs/git/adding-backend) for more information.

### Connecting Back & Front 🖇

Now we need to link this Git backend with the instance of the `cms` within our starter blog. Head over to your `_app.js` file and register an instance of `GitClient` with the `cms` as seen in the code below.

```javascript
import React from 'react'
import App from 'next/app'
import { Tina, TinaCMS } from 'tinacms'
// import the Git client
import { GitClient } from '@tinacms/git-client'

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS({
      enabled: true,
    })
    // create the client
    const client = new GitClient('/___tina')
    // register client with the cms
    this.cms.registerApi('git', client)
  }

  render() {
    //...
  }
}

export default MyApp
```

That’s all the config for tracking and persisting content changes with Git & Tina. To test, run the `develop` script and make sure there are no errors. Things should look the same, but behind the scenes we've added a way to send content changes from the frontend to the backend.

### Creating Content Forms 📝

Alright, now the fun starts — let’s dig into [editing content](https://tinacms.org/guides/nextjs/git/creating-git-forms). We access Tina’s editing powers by registering forms to the `cms`. When creating these [forms](https://tinacms.org/docs/plugins/forms), we define [fields](https://tinacms.org/docs/plugins/fields) that connect to bits and pieces of the content you want to make editable.

Since our site is mainly comprised of blog data, let’s configure Tina to edit blog posts. Open up the [blog template](https://github.com/kendallstrautman/brevifolia-nextjs/blob/master/pages/blog/%5Bslug%5D.js) file (`pages/blog/[slug].js`).

As a recap from [Part I](https://tinacms.org/blog/simple-markdown-blog-nextjs/), we’re using the `getInitialProps` method to grab markdown data that will be passed as props to the `BlogTemplate` component.

#### Content Form Config

First, we need to add an additional property to the return object from `getInitialProps` called `fileRelativePath`. Tina needs this path in order to know what file to update. Here’s an example of how you could add `fileRelativePath`:

```javascript
BlogTemplate.getInitialProps = async function(ctx) {
  const { slug } = ctx.query
  const content = await import(`../../posts/${slug}.md`)
  const config = await import(`../../data/config.json`)
  const data = matter(content.default)

  return {
    fileRelativePath: `posts/${slug}.md`,
    title: config.title,
    ...data,
  }
}
```

Next, we will create and register a form with the `useLocalForm` hook. When registering a form, it needs to know four things: a unique `id`, what `initialValues` it can edit, the shape of the content via [`field`](https://tinacms.org/docs/plugins/fields) definitions, and what to do `onSubmit`.

Check out the code below to see an example of invoking `useLocalForm`:

```jsx
import { useCMS, useLocalForm } from 'react-tinacms'
import * as yaml from 'js-yaml'

export default function BlogTemplate(props) {

  function toMarkdownString(formValues) {
    return (
      '---\n' +
      yaml.dump(formValues.frontmatter) +
      '---\n' +
      (formValues.markdownBody || '')
    )
  }

 // access the cms instance
 const cms = useCMS()

 // hook to register the form
 const [post, form] = useLocalForm({

   id: props.fileRelativePath, // needs to be unique
   label: 'Edit Post', // label appears in the sidebar

   // starting values for the post object
   initialValues: {
     fileRelativePath: props.fileRelativePath,
     frontmatter: props.data,
     markdownBody: props.content
   },

   // field definitions shape content editing UI
   fields: [
     {
       label: "Hero Image",
       name: 'frontmatter.hero_image',
       component: "image",
       // Generate the frontmatter value based on the filename
       parse: filename => `../static/${filename}`,
        // Decide the file upload directory for the post
       uploadDir: () => "/static/",
        // Generate the src attribute for the preview image.
       previewSrc: data => `/static/${data.frontmatter.hero_image}`,
     },
     {
       name: 'frontmatter.title',
       label: 'Title',
       component: 'text',
     },
     {
       name: 'frontmatter.date',
       label: 'Date',
       component: 'date',
     },
     {
       name: 'frontmatter.author',
       label: 'Author',
       component: 'text',
     },
     {
       name: 'markdownBody',
       label: 'Blog Body',
       component: 'markdown',
     },
   ],

   // save & commit the file when the "save" button is pressed
   onSubmit(data) {
     return cms.api.git
       .writeToDisk({
         fileRelativePath: props.fileRelativePath,
         content: toMarkdownString(data),
       })
       .then(() => {
         return cms.api.git.commit({
           files: [props.fileRelativePath],
           message: `Commit from Tina: Update ${data.fileRelativePath}`,
         })
       })
   },
 })

 // useWatchFormValues will go here

 return (
    //...
   );
}


```

Observe that in the `onSubmit` callback function, we access the Git API we registered earlier to write file changes to disk and then commit those changes. We're also serializing our data via the `toMarkdownString` function; the Git backend is deliberately unopinionated, so we need to take care of preparing our data for writing before sending it back.

#### Update Rendered Data 🎨

Look again at the way we're calling `useLocalForm`:

```jsx
const [post, form] = useLocalForm(...)
```

This is a common pattern for React hooks. `useLocalForm` returns a two-element array that we are destructuring into two separate objects. `form` returns the form object that we can do some neat stuff with (more on that in a moment), but what we really care about right now is the `post` object. This object contains the form data, and will update whenever the values in the form are changed by the user. If we use _this_ data when rendering our layout, our site will update in real time as the data changes!

The `post` object will contain the `initialValues` on first render. Since it has the same shape as the `props` we're using in our layout, all we have to do is replace the appropriate references to `props` with `post`:

```jsx
// replace "props" with "post" for editable form content
return (
  <Layout siteTitle={props.title}>
    <article className="blog">
      <figure className="blog__hero">
        <img
          src={post.frontmatter.hero_image}
          alt={`blog_hero_${post.frontmatter.title}`}
        />
      </figure>
      <div className="blog__info">
        <h1>{post.frontmatter.title}</h1>
        <h3>{post.frontmatter.date}</h3>
      </div>
      <div className="blog__body">
        <ReactMarkdown source={post.markdownBody} />
      </div>
      <h2 className="blog__footer">Written By: {post.frontmatter.author}</h2>
    </article>
  </Layout>
)
```

Note the `siteTitle` still references `props.title`, this is because this value isn't being passed to Tina as an editable part of this form. If we want to edit this site config, we could create another form (for example on the `Layout` component) that would connect Tina to the `config.json` file.

#### Edit Content 🎯

If you run `yarn develop` and open up a blog post in the browser, you should see editable fields in the sidebar. Try to update the post title, hit save and see what happens.

If everything is set up correctly, Tina will try to commit those changes (you may be prompted for your password in the terminal). Kill the dev server and run `git log` to see the commit from Tina. 🙌🏻

This is amazing! We wired up Tina to make edits and commit changes. One thing you’ll notice, however, is that any unsaved changes disappear when navigating to another page or refreshing.

#### Watching for Real-Time Content Changes ⌚️

If you want your changes writing to disk in real time, we’ll need to use another hook, `useWatchFormValues`. This hook allows you to execute a function any time the form state changes. `useWatchFormValues` takes the form object created by the `useLocalForm` hook, and a callback function to invoke when the form changes.

Add this example code below to your template component just before the `return` statement. Feel free to reference the final file [here](https://github.com/kendallstrautman/brevifolia-next-tinacms/blob/master/pages/blog/%5Bslug%5D.js).

```jsx
// add useWatchFormValues to import
import { useCMS, useLocalForm, useWatchFormValues } from 'react-tinacms'

export default function BlogTemplate(props) {
  // useLocalForm config...

  // callback function for form changes
  const writeToDisk = React.useCallback(formState => {
   cms.api.git.onChange({
     fileRelativePath: props.fileRelativePath,
     content: toMarkdownString(formState.values),
   })
  }, [])

  // invoke the hook
  useWatchFormValues(form, writeToDisk)

  return (
    //...
  )
}
```

### Test & Edit Content ✨

If all went well, your blog posts will now be editable by Tina. Let's see it in action!

Start up the dev server by running `yarn develop`, and open up a blog post in the browser. Go ahead and make edits, and then check the source file in a text editor. If you keep the browser and code editor open side-by-side, you should be able to watch the changes reflect in real time in both places!

> **Troubleshooting Tip**: If you’re only seeing changes update in the browser, but not immediately writing to the file system, **make sure you are using the correct script** that initiates both the next dev server and the Git API via `concurrently`.

### Next Steps 🚶‍♀️

Well done! With some config and calling a few hooks, we can now edit all our blog posts with Tina.

To set up content editing on the rest of the site, we’ll want to configure Tina for the ‘info’ page, along with any other general site metadata. Try to implement the same approach in the `info` page component. Checkout the [final repo](https://github.com/kendallstrautman/brevifolia-next-tinacms) for reference on how to do this.

**Stay tuned:** in subsequent posts, we’ll cover how to setup this site for static export, implementing global forms, and extracting this Tina config into a single reusable function.
