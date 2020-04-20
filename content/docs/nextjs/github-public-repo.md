---
title: Open Authoring with GitHub
id: /docs/nextjs/github-public-repo
prev: /docs/nextjs/markdown
next:
---

Using Next.js's preview-mode ([announced in Next.js 9.3](https://nextjs.org/blog/next-9-3)), we can load a separate set of data depending on if we are in "edit-mode" or "production-mode". This pairs well with the GitHub API, where we can provide an "Open Authoring" experience where anyone can fork your site, make changes, and create a pull request, all through the TinaCMS UI!

## Requirements:

- You must be using **Next.js v.9.3** or later.
- If your site is static, is must be hosted on a service that supports Next.js preview-mode (E.g [Zeit's Now](https://zeit.co/home))
- Your editable content must be stored in GitHub
- Your repository containing your content **must be public**

## Overall Steps:

1. [Install the required packages](/docs/nextjs/github-public-repo#installation)
2. [Set environment variables](/docs/nextjs/github-public-repo#environment-variables)
3. [Configure the custom _\_app_ file](/docs/nextjs/github-public-repo#configure-the-custom-app-file)
4. [Setup API functions using hygen scripts](/docs/nextjs/github-public-repo#api-functions)
5. [Add an Auth Redirect page component](/docs/nextjs/github-public-repo#auth-redirects)
6. [Create the GitHub OAuth app](/docs/nextjs/github-public-repo#github-oauth-app)
7. [Load content from GitHub](/docs/nextjs/github-public-repo#loading-content-from-github) — using `getStaticProps` and [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)
8. [Create a Tina Form that sources from GitHub](/docs/nextjs/github-public-repo#using-github-forms)

## Installation

We'll need to add a few Tina-GitHub packages to our site:

```bash
$ npm install --save react-tinacms-github next-tinacms-github
```

The `react-tinacms-github` package provides helpers for setting up TinaCMS to use the GitHub API, with GitHub authentication. And the `next-tinacms-github` package provides helpers for managing the GitHub auth token and loading content from the GitHub API.

> _Note:_ If required peer dependencies aren't already installed, please add `tinacms` & `styled-components` — along with others listed in your terminal.

### Environment Variables

Throughout this guide, some environment variables will be used:

You may want a `.env` file in your project root i.e

```
# .env
GITHUB_CLIENT_ID= # We will generate this later when we create a GitHub app.
GITHUB_CLIENT_SECRET= # We will generate this later when we create a GitHub app.
REPO_FULL_NAME=tinacms/tinacms.org # This is your github repository's owner / repo-name.
BASE_BRANCH=master
```

To load these .env values in the front-end, your [`next.config`](https://nextjs.org/docs/api-reference/next.config.js/introduction) file will need to be configured. We will also use the `dotenv` package to load our `.env` file:

`npm install --save dotenv`

```js
// next.config.js
require("dotenv").config();

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  // ...
}
```

For more help setting up environment variables with Next, see the [Next docs](https://nextjs.org/docs/api-reference/next.config.js/environment-variables).

> Note that we did not add `GITHUB_CLIENT_SECRET`. This is the a secert key that should only be used from the server and should not be accessible through the browser.

## Setup

### Configure the [custom app](https://nextjs.org/docs/advanced-features/custom-app) file

A few steps must be followed in order to edit your GitHub content using TinaCMS. These changes will be made in `_app.tsx`. If you haven't [already created this file](/docs/nextjs/bootstrapping#adding-the-tina-provider), please do so in the `pages` directory.

1. **Create the TinaCMS instance**
1. **Register the GithubClient:** The client accepts a string ('/api/proxy-github' in our case). All requests using the `GithubClient` gets passed through a proxy on our site. This allows us to securely attach the authentication tokens on the backend.
1. Make sure the Sidebar is hidden unless we're in Next's [Preview/Edit mode](https://nextjs.org/docs/advanced-features/preview-mode).
1. **Wrap the Page with `TinacmsGithubProvider`:** This component lets us authenticate with GitHub. It is given config and callbacks that hit our `/api` server functions to enable Preview/Edit Mode after authentication is complete.
1. **Add a button for entering Preview/Edit Mode:** We must provide a means of triggering authentication. This a simple example of how to dow so.


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
    // 1. Create the TinaCMS
    this.cms = new TinaCMS({
      apis: {
        // 2. Register the GithubClient
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
      sidebar: {
        // 3. Make sure the Sidebar is hidden unless we're in Preview/Edit Mode
        hidden: !props.pageProps.preview,
      },
    })
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      // 4. Wrap the page Component with the Tina and Github providers; and
      // 5. Add a button for entering Preview/Edit Mode
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          clientId={process.env.GITHUB_CLIENT_ID}
          authCallbackRoute="/api/create-github-access-token"
          editMode={pageProps.preview}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
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

Now that **\_app.tsx** is ready. Let's setup up the backend API.

## API functions

We will need a few API functions to handle GitHub authentication, and Next.js's preview-mode:
With Next.js, any functions in the `pages/api` directory are are mapped to `/api/*` endpoints.

We've created a script to make generating these files easier:

From the console, run:

```
$ npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
$ npx hygen next-tinacms-github bootstrap --format ts
```

_Note: if your **/pages** directory in not in the root, you will need to supply a `--dir [subDir]` option._

```
$ npx hygen next-tinacms-github bootstrap --format ts --dir src
```

You'll see that a few API functions have been setup for us.

#### `preview.ts`

Contains API function to enter preview-mode, and set the preview-data with content stored in the cookies.

#### `proxy-github.ts`

Contains API function to attach the user's auth token, and proxy requests to the GitHub API.

#### `create-github-auth-token.ts`

Helper for creating a `createCreateAccessToken` server function.

## Auth Redirects

We will also a page to redirect the user to while authenticating with GitHub.

**pages/github/authorizing.tsx**

```tsx
// Our GitHub app redirects back to this page with auth code
import { useGithubAuthRedirect } from 'react-tinacms-github'

export default function Authorizing() {
  // Let the main app know, that we receieved an auth code from the GitHub redirect
  useGithubAuthRedirect()
  return <h2>Authorizing with GitHub, Please wait...</h2>
}
```

## GitHub Oauth App

In GitHub, within your account Settings, click <a href="https://github.com/settings/developers" target="_blank">Oauth Apps</a> under Developer Settings.

click "New Oauth App".

For the **Authorization callback URL**, enter the url for the "authorizing" page that you created above (e.g https://your-url/github/authorizing). Fill out the other fields with your custom values.

> ### Authorizing in Development
>
> If you are testing your app locally, you may need a separate development GitHub app (with a localhost redirect), and a production GitHub app.

Don't forget to add the **Client ID** and **Client Secret** to your environment variables.

## Loading content from GitHub

Now that we have access to the user's auth token, we can load content from GitHub within `getStaticProps`.

**pages/index.tsx**

```tsx
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

## Using GitHub Forms

Any forms that we have on our site can be created with the `useGithubJsonForm` or `useGithubMarkdownForm` helpers

**pages/index.tsx**

```tsx
function BlogTemplate({ jsonFile }) {
  const formOptions = {
    label: 'Blog Post',
    fields: [],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(jsonFile, formOptions)

  // ...
}
```

`useGithubJsonForm` will use the `GithubClient` api that we [registered earlier](#register-the-githubclient).
