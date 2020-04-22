---
title: Open Authoring with GitHub
id: /docs/nextjs/github-public-repo
prev: /docs/nextjs/markdown
next:
consumes:
---

Using Next.js's [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode), we can load a separate set of data depending on if we are in "edit-mode" or "production-mode". This pairs well with the GitHub API, where we can provide an "Open Authoring" experience where anyone can fork your site, make changes, and create a pull request, all through the TinaCMS UI!

## Requirements:

- You must be using [Next.js v.9.3](https://nextjs.org/blog/next-9-3) or later.
- If your site is static, is must be hosted on a service that supports Next.js [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) (E.g [Zeit's Now](https://zeit.co/home)).
- Your editable content must be stored in GitHub.
- Your repository containing your content **must be public**.

## Summary

1. [Install the required packages](/docs/nextjs/github-public-repo#installation)
2. [Configure the custom _\_app_ file](/docs/nextjs/github-public-repo#configure-the-custom-app-file)
3. [Setup API functions using hygen scripts](/docs/nextjs/github-public-repo#api-functions)
4. [Add an Auth Redirect page component](/docs/nextjs/github-public-repo#auth-redirects)
5. [Create the GitHub OAuth app](/docs/nextjs/github-public-repo#setup-the-github-oauth-app)
6. [Load content from GitHub](/docs/nextjs/github-public-repo#loading-content-from-github) — using `getStaticProps` and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
7. [Create a Tina Form that sources content from GitHub](/docs/nextjs/github-public-repo#using-github-forms)

## Installation

We'll need to add a few Tina-GitHub packages to our site:

```bash
$ npm install --save react-tinacms-github next-tinacms-github
```

The `react-tinacms-github` package provides helpers for setting up TinaCMS to use the GitHub API, with GitHub authentication. And the `next-tinacms-github` package provides helpers for managing the GitHub auth token and loading content from the GitHub API.

> _Note:_ If required peer dependencies aren't already installed, please add `tinacms` & `styled-components` — along with others listed in your terminal.

## Configure the [custom app](https://nextjs.org/docs/advanced-features/custom-app) file

A few steps must be followed in order to edit your GitHub content using TinaCMS. These changes will be made in `_app.tsx`. If you haven't [already created this file](/docs/nextjs/bootstrapping#adding-the-tina-provider), please do so in the `pages` directory.

1. **Create the TinaCMS instance**
2. **Register the GithubClient:** The client accepts a string ('/api/proxy-github' in our case). All requests using the `GithubClient` gets passed through a proxy on our site. This allows us to securely attach the authentication tokens on the backend.
3. Make sure the Sidebar is hidden unless we're in Next's [Preview/Edit mode](https://nextjs.org/docs/advanced-features/preview-mode).
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
    /*
     ** 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      apis: {
        /*
         ** 2. Register the GithubClient
         */
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
      sidebar: {
        /*
         ** 3. Make sure the Sidebar is hidden unless we're in Preview/Edit Mode
         */
        hidden: !props.pageProps.preview,
      },
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      /*
       ** 4. Wrap the page Component with the Tina and Github providers
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
          {/*
           ** 5. Add a button for entering Preview/Edit Mode
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

Now that **\_app.tsx** is ready. Let's setup up the backend API.

## API functions

We will need a few API functions to handle GitHub authentication and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode). With Next.js, any functions in the `pages/api` directory are are mapped to `/api/*` endpoints.

We've created a few [scripts](https://github.com/dwalkr/hygen-next-tinacms-github) to **help generate the required files**. From the console, run:

```bash
$ npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
$ npx hygen next-tinacms-github bootstrap --format ts
```

_Note:_ if your **pages directory is not in the root**, you will need to supply a `--dir [subDir]` option for this last script:

```bash
$ npx hygen next-tinacms-github bootstrap --format ts --dir src
```

You should see a few API functions have been setup in your project:

- `preview.ts`: Contains API function to enter [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode), and set the preview-data with content stored in the cookies.
- `proxy-github.ts`: Contains API function to attach the user's auth token, and proxy requests to the GitHub API.
- `create-github-auth-token.ts`: Helper for creating a `createCreateAccessToken` server function.

## Auth Redirects

We will also need a page to redirect the user to while authenticating with GitHub. This component will render as a modal during authentication.

```tsx
// pages/github/authorizing.tsx

import { useGithubAuthRedirect } from 'react-tinacms-github'

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect()

  return <h2>Authorizing with GitHub, Please wait...</h2>
}
```

## Setup the GitHub OAuth App

In GitHub, within your Account Settings, click <a href="https://github.com/settings/developers" target="_blank">Oauth Apps</a> under Developer Settings. Go ahead and create a "New Oauth App".

For the **Authorization callback URL**, enter the url for the "/github/authorizing" page that you created above (e.g https://your-url/github/authorizing). Fill out the other fields with your custom values.

> _Note:_ If you are **testing your app locally**, you may need a separate development GitHub app (with a localhost redirect), and a production GitHub app.

Next we will add the **Client ID** and **Client Secret** to your environment variables.

<!-- TODO: add ## Developing Locally section at this point? to explain where the content is sourcing from, etc. -->

### Setting Environment Variables

This guide will reference [environment variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) — these are sensitive values specific to your project. The Tina helpers will use these value to talk to your repository, enabling auth and data fetching via GitHub.

To set these variables, create a `.env` file in your project root:

```
# .env
GITHUB_CLIENT_ID= # Taken from GitHub
GITHUB_CLIENT_SECRET= # Taken from Github
REPO_FULL_NAME=tinacms/tinacms.org # This is your github repository's owner / repo-name.
BASE_BRANCH=master
```

You can use the `dotenv` package to load the `.env` file:

```bash
$ npm install --save dotenv
```

Now, to load these `.env` values in the front-end, your [next.config](https://nextjs.org/docs/api-reference/next.config.js/introduction) file will need to be configured.

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

## Loading content from GitHub

Now that we have access to the user's auth token, we can load content from GitHub within [_getStaticProps_](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation).

```tsx
// pages/index.tsx

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

// ...

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}
```

> We are currently working on making it possible to make commits directly on the base repository. Until then, to test editing on your own site you will need to test with a separate Github account.

## Using GitHub Forms

Any forms that we have on our site can be created with the `useGithubJsonForm` or `useGithubMarkdownForm` helpers. These helpers will fetch and post data through the GitHub API via the `GithubClient` we registered in `_app.tsx`.

```tsx
// pages/index.tsx

function Home({ file }) {
  const formOptions = {
    label: 'Home Page',
    fields: [{ name: 'title', component: 'text' }],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions)

  // ...
}
```

<!-- TODO: prompt folks to set up inline editing or take those next editing steps>
