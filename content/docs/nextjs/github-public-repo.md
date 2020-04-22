---
title: Open Authoring with GitHub
id: /docs/nextjs/github-public-repo
prev: /docs/nextjs/markdown
next:
consumes:
---

This guide will help you set up [Open Authoring](/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode) with Github using [_create-next-app_](https://nextjs.org/docs#setup).

The [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) offered by Next.js allows us to load a separate set of data [depending on the "edit" (or "preview") mode](/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode). With the help of the GitHub API, we can allow anyone to fork your site, make changes, and create a pull request from the Tina UI.

## Summary

1. [Setup _create-next-app_ in a new repository](/docs/nextjs/github-public-repo#using-create-next-app)
2. [Install the required packages](/docs/nextjs/github-public-repo#install-tina-github-packages)
3. [Configure the custom _\_app_ file](/docs/nextjs/github-public-repo#configure-the-custom-_-file)
4. [Setup API functions using hygen scripts](/docs/nextjs/github-public-repo#adding-api-functions)
5. [Add an Auth Redirect page component](/docs/nextjs/github-public-repo#create-an-auth-redirect-page)
6. [Create the GitHub OAuth app](/docs/nextjs/github-public-repo#setup-the-github-oauth-app)
7. [Load content from GitHub](/docs/nextjs/github-public-repo#loading-content-from-github) — using `getStaticProps` and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
8. [Create a Tina Form that sources content from GitHub](/docs/nextjs/github-public-repo#using-github-forms)

## Using _create-next-app_

Let's set up a [fresh install](https://nextjs.org/docs#setup) of _create-next-app_ and create a [new repository](https://github.com/new) in GitHub. It is important this repository is _public_, otherwise the GitHub Helpers won't know how to find your content.

Open up your terminal. Navigate to where you'd like this project to live and run:

```bash
yarn create next-app
```

Name your project, then choose the 'Default Starter' from the terminal options. Go ahead and navigate into that project and start the development server.

```bash
cd your-project-name
yarn dev
```

![fresh-create-next-app-install](/img/github-open-auth-cna/create-next-app.png)

Navigate to http://localhost:3000/ and you should see something like the image above. Now you can commit and push this `create-next-app` to your new GitHub repository.

> _Note:_ This guide assumes you are following along with a fresh _create-next-app_. However, **if you're configuring your own project**, some requirements of setting up GitHub Open Authoring are that you use _Next.js >= 9.3 in a public GitHub repository that is deployed with Vercel_ (formerly ZEIT Now) or another platform that can handle Next.js Previews.

### With Typescript

The examples in this guide will use [Typescript](https://www.typescriptlang.org/). To set up your `create-next-app` with Typescript, run this in the terminal:

```bash
yarn add --dev typescript @types/node
```

The next time you start the development server, Next.js will automatically create a `tsconfig.json` file and populate it with default options. You may also want to change your `pages/index.js` to `pages/index.tsx`.

## Install Tina-Github packages

Now that our `create-next-app` is set up, we can add a few Tina packages:

```bash
yarn add react-tinacms-github next-tinacms-github tinacms styled-components
```

The `react-tinacms-github` package provides helpers for setting up TinaCMS to use the GitHub API, with GitHub authentication. And the `next-tinacms-github` package provides helpers for managing the GitHub auth token and loading content from the GitHub API.

## Configure the custom _\_app_ file

Now we need to step up TinaCMS to work with Github. First, create a new file in the `pages` directory called `_app.tsx`. This is a special file in Next.js that allows us to configure a [custom app](https://nextjs.org/docs/advanced-features/custom-app). Our custom `_app.tsx` will do a few things:

1. **Create the TinaCMS instance**
2. **Register the GithubClient:** The client accepts a string ('/api/proxy-github' in our case). All requests using the `GithubClient` gets passed through a proxy on our site. This allows us to securely attach the authentication tokens on the backend.
3. Make sure the Sidebar & Toolbar are hidden unless we're in Next's [Preview/Edit mode](https://nextjs.org/docs/advanced-features/preview-mode).
4. **Wrap the Page with `TinacmsGithubProvider`:** This component lets us authenticate with GitHub. It is given config and callbacks that hit our `/api` server functions to enable Preview/Edit Mode after authentication is complete.
5. **Add a button for entering Preview/Edit Mode:** We must provide a means of triggering authentication. This a simple example of how to do so.

```tsx
// pages/_app.tsx

import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github'

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string // e.g: tinacms/tinacms.org

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
      /**
       * 3. Make sure the Sidebar & Toolbar are
       *    hidden unless we're in Preview/Edit Mode
       */
      sidebar: {
        hidden: !props.pageProps.preview,
      },
      toolbar: {
        hidden: !props.pageProps.preview,
      },
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          clientId={process.env.GITHUB_CLIENT_ID}
          authCallbackRoute="/api/create-github-access-token"
          editMode={pageProps.preview}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
          {/**
           * 5. Add a button for entering Preview/Edit Mode
           */}
          <EditLink editMode={pageProps.preview} />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname
  })
}

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export interface EditLinkProps {
  editMode: boolean
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

> _Note:_ For brevity, the example above configures many steps in a single file, but **a few components can be configured in different places**. For example you could put the `EditLink` in a Layout component, or setup the Github Provider only on certain pages.

If you restart the dev server, you should see a **button in the top left-hand corner** that says, "Edit This Site". If you click it, you'll be prompted to authenticate with GitHub, but we still have some steps to get this working. Let's setup up the backend API.

## Adding API functions

We will need a few API functions to handle GitHub authentication and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode). With Next.js, any functions in the `pages/api` directory are are mapped to `/api/*` endpoints.

Using the code generator [Hygen](https://www.hygen.io/), we've created a few [scripts](https://github.com/dwalkr/hygen-next-tinacms-github) to **help generate the required files** for this step. From the terminal, run:

```bash
npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
npx hygen next-tinacms-github bootstrap --format ts
```

> _Note:_ if your **pages directory is not in the root**, you will need to supply a `--dir [subDir]` option for this last script.

```bash
# Example setting sub directory option
npx hygen next-tinacms-github bootstrap --format ts --dir src
```

You should see a few API functions have been setup in your project, along with a new `_templates` directory.

- `preview.ts`: Contains API function to enter [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode), and set the preview-data with content stored in the cookies.
- `proxy-github.ts`: Contains API function to attach the user's auth token, and proxy requests to the GitHub API.
- `create-github-auth-token.ts`: Helper for creating a `createCreateAccessToken` server function.

## Create an Auth Redirect page

We also need to create a new page to redirect the user to while authenticating with GitHub. This component **will render as a modal** during authentication.

Create a new directory in `pages`, called `github` and then make a new file, `authorizing.tsx`.

```tsx
// pages/github/authorizing.tsx

import { useGithubAuthRedirect } from 'react-tinacms-github'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect()

  return <h2>Authorizing with GitHub, please wait...</h2>
}
```

## Setup the GitHub OAuth App

Now we need to setup an OAuth App in Github to allow for authorization. In GitHub, within your Account Settings, click <a href="https://github.com/settings/developers" target="_blank">Oauth Apps</a> under Developer Settings. Go ahead and create a "New Oauth App".

Since you are **testing your app locally**, you'll create a _development_ GitHub app that redirects to localhost. Eventually you'll need to create separate OAuth Apps: one for development and a production app whose URLs will connect to the 'live' domain. We'll circle back to the production app once when we cover hosting.

For now, fill in http://localhost:3000 for the _Homepage Url_. With the **Authorization callback URL**, enter the url for the "/github/authorizing" page that you created above (e.g http://localhost:3000/github/authorizing).

![oauth-app-config-example](/img/github-open-auth-cna/oAuth-app-config.jpg)

After creating the app, you should see a page with information such as **Client ID** and **Client Secret**. Next, we'll add those as environment variables to the project to connect this App to the Tina-GitHub helpers.

### Setting Environment Variables

[Environment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) are sensitive values specific to your project. The Tina-GitHub helpers will use these values to talk to your repository, enabling auth and data fetching via GitHub.

To set these variables, create a `.env` file in your project root. Add the _secret_ and _id_ values from the OAuth App, and fill in the repo name. _Do not commit this file_; you may need to add `.env` to the `.gitignore` file.

```
# .env
GITHUB_CLIENT_ID= # Taken from GitHub
GITHUB_CLIENT_SECRET= # Taken from Github
REPO_FULL_NAME=tinacms/tinacms.org # This is your github repository's owner / repo-name.
BASE_BRANCH=master
```

> Make sure to **delete the comments** in this file after filling in the correct values! Otherwise the authentication may not work.

You can use the `dotenv` package to load the `.env` file:

```bash
yarn add dotenv
```

Now, to load these `.env` values in the front-end, create a file called [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) in the root of your project. Add the code from this example:

```js
// next.config.js

require('dotenv').config()

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  // ...
}
```

> Note that we did not add `GITHUB_CLIENT_SECRET` to the config exports. This is the a secret key that should only be used from the server and should not be accessible through the browser.

At this point you should be able to authenticate with GitHub! Try clicking the 'Edit This Site' button again and try to authenticate.

<!-- TODO: add an image here to show auth flow modal steps? -->

If all is successful, you should see another modal prompting you to create a fork, go ahead and do so. If you weren't the owner of this repository, a fork would be made where someone else could commit edits and create a PR for review. Since you're the owner of this repository, a fork won't be created and edits will just go to the `master` branch.

## Loading content from GitHub

Now that we have authentication set up, it's time to wire up some content to edit.

Check out `pages/index.tsx`, right now the content for this page is statically written into the component. Let's create a data file to source this content from. Add a new directory in the root of your project called `content` (or `data`, whichever you prefer) and create a new file called `home.json`. We'll start small by just adding editing a title.

```json
// content/home.json

{
  "title": "Give me your tots 🦙"
}
```

Back in `pages/index.tsx`, we need to set up data fetching. We will use [_getStaticProps_](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) to return different sets of data based on the "Preview" or "Edit Mode".

```diff
// pages/index.tsx

import Head from 'next/head'
/**
 * Import helpers and GetStaticProps type
 */
+ import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
+ import { GetStaticProps } from 'next'

- export default function Home() {
+ export default function Home({ file }) {
+  const data = file.data

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          {/**
           * Render the title from `home.json`
           */}
-          Welcome to <a href="https://nextjs.org">Next.js!</a>
+          {data.title}
        </h1>

        //...

      </main>

      //...

    </div>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
+ export const getStaticProps: GetStaticProps = async function({
+  preview,
+  previewData,
+ }) {
+  if (preview) {
+    return getGithubPreviewProps({
+      ...previewData,
+      fileRelativePath: 'content/home.json',
+      parse: parseJson,
+    })
+  }
+  return {
+    props: {
+      sourceProvider: null,
+      error: null,
+      preview: false,
+      file: {
+        fileRelativePath: 'content/home.json',
+        data: (await import('../content/home.json')).default,
+      },
+    },
+  }
+ }
```

Now your `create-next-app` should look something like the image below.

![create-next-app-custom-content](/img/github-open-auth-cna/create-next-app-2.png)

> Make sure to commit your changes so that when you toggle 'Edit Mode', the content file will be in the GitHub repo. If you don't, you'll get a 404 error.

## Using GitHub Forms

Now we need to create a Form for editing this content. Any forms that we have on our site can be created with the `useGithubJsonForm` or `useGithubMarkdownForm` helpers. These helpers will fetch and post data through the GitHub API via the `GithubClient` we registered in `_app.tsx`.

```diff
// pages/index.tsx

+import { useGithubJsonForm } from 'react-tinacms-github'

export default function Home({ file }) {
-  const data = file.data
+  const formOptions = {
+    label: 'Home Page',
+    fields: [{ name: 'title', component: 'text' }],
+  }

  // Registers a JSON Tina Form
+  const [data, form] = useGithubJsonForm(file, formOptions)

  return (
    // ...
  )
}

//...
```

> **This is a different approach** than the Git-based Tina form helpers. Instead of writing locally to the filesystem via Git, the Tina-GitHub helpers source data and commit to a _Working GitHub Repository_.

Start up the dev server, enter "Edit Mode" open the sidebar and edit the title! You've set up GitHub editing with Tina. If you "Save", that will commit your master branch.

If you update and save the content changes, when you toggle edit mode you may notice a difference in the content source. When you're not in edit mode, the site will reference _local content_. When you go into edit mode, it will reference content in the associated GitHub repository (i.e. _Working Repository_).

<!-- TODO: Toolbar config?? or getting the site on Now? -->
