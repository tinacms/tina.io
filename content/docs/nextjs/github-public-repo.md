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

## Installation

We'll need to add a few Tina-GitHub packages to our site:

```
npm install --save react-tinacms-github next-tinacms-github final-form-submit-listener
```

or

```
yarn add react-tinacms-github next-tinacms-github final-form-submit-listener
```

#### `react-tinacms-github`

This package provides helpers for setting up TinaCMS to use the GitHub API, with GitHub authentication.

#### `next-tinacms-github`

This package provides helpers for managing the github auth token for requests, as well as
providing helpers for loading content from the GitHub API.

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

To load these .env values in the front-end, your `next.config` will need to be configured. We will also use the `dotenv` package to load our `.env` file:

`npm install --save dotenv`

```
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

For help setting up environment variables with Next, see the [Next docs](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)

## Setup

### Register the GitHubClient

We will want to use the GitHubClient to load/save our content using the GitHub API. Let's add it as an API plugin.

```ts
// pages/_app.js
import { TinaCMS } from 'tinacms'
import { GitHubClient } from 'react-tinacms-github'

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string // e.g: tinacms/tinacms.org

const cms = new TinaCMS({
  apis: {
    github: new GitHubClient('/api/proxy-github', REPO_FULL_NAME),
  },
  // ... any other tina config
})
```

You'll notice that the GitHubClient takes in a string ('/api/proxy-github' in our case). All requests using the GitHubClient gets passed through a custom proxy, so that we can attach the authentication tokens on the backend.

Let's setup up some of these backend API functions.

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

> _Note: You may need to configure the `process.env.GITHUB_CLIENT_ID` and `process.env.GITHUB_CLIENT_SECRET` environment variables within this file._ _See [Next's documentation](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) for adding environment variables_

> [See below](#github-oauth-app) for instructions on creating a GitHub OAuth App to generate these **Client ID** & **Client Secret** variables.

### Managing "edit-mode" state

Add the root `TinacmsGithubProvider` component to our main layout. We will supply it with handlers for authenticating and entering/exiting edit-mode.
In this case, we will hit our `/api` server functions.

```tsx
// YourLayout.ts
import { TinacmsGithubProvider } from 'react-tinacms-github';

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

const YourLayout = ({ editMode, error, children }) => {
  return (
    <TinacmsGithubProvider
      clientId={process.env.GITHUB_CLIENT_ID}
      authCallbackRoute='/api/create-github-access-token'
      editMode={editMode}
      enterEditMode={enterEditMode}
      exitEditMode={exitEditMode}
      error={error}>
      {children}
    </TinacmsGithubProvider>
  )
}

## Entering / Exiting "edit-mode"

Next, we will need a way to enter/exit mode from our site. Let's create an "Edit Link" button. Ours will take `isEditing` as a parameter.

_We'll be using Next.js's [preview-mode](https://nextjs.org/docs/advanced-features/preview-mode) to set this `isEditing` value. We'll set that up later_

```tsx
//...EditLink.tsx
import React from 'react'
import { useGitHubEditing } from 'react-tinacms-github'

export interface EditLinkProps {
  isEditing: boolean
}

export const EditLink = ({ isEditing }: EditLinkProps) => {
  const github = useGitHubEditing()

  return (
    <button onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {isEditing ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

## Auth Redirects

We will also a page to redirect the user to while authenticating with GitHub.

```tsx
//pages/github/authorizing.tsx
// Our GitHub app redirects back to this page with auth code
import React from 'react'
import { useGitHubAuthRedirect } from 'react-tinacms-github'

export default function Authorizing() {
  // Let the main app know, that we receieved an auth code from the GitHub redirect
  useGitHubAuthRedirect()
  return <h2>Authorizing with GitHub, Please wait...</h2>
}
```

## GitHub Oauth App

In GitHub, within your account Settings, click [Oauth Apps](https://github.com/settings/developers) under Developer Settings.

click "New Oauth App".

For the **Authorization callback URL**, enter the url for the "authorizing" page that you created above (e.g https://your-url/github/authorizing). Fill out the other fields with your custom values.
_Note: If you are testing your app locally, you may need a separate development GitHub app (with a localhost redirect), and a production GitHub app._

Don't forget to add the **Client ID** and **Client Secret** to your environment variables.

## Loading content from GitHub

Now that we have access to the user's auth token, we can load content from GitHub within `getStaticProps`.

```ts
//About template about.tsx

import { getGitHubPreviewProps, GitHubPreviewProps } from 'next-tinacms-github'

// ...

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const filePath = `content/about.md`

  if (preview) {
    return getGitHubPreviewProps({
      ...previewData,
      fileRelativePath: filePath,
      format: 'markdown',
    })
  } else {
    // Get your production content here
    // when you are not in edit-mode.
    // This should make format of GitHubPreviewData
    const file = await readLocalMarkdownFile(filePath)

    return {
      props: {
        sourceProviderConnection: null,
        editMode: false,
        file,
        error: null,
      },
    }
  }
}
```

## Using GitHub Forms

Any forms that we have on our site can be created with the `useGitHubJsonForm` or `useGitHubMarkdownForm` helpers

```tsx
function BlogTemplate({
  file, // content for this page
  sourceProviderConnection, // repository details
}) {
  const formOptions = {
    label: 'About',
    fields: [
      //...
    ],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGitHubJsonForm(file, formOptions, {
    branch: sourceProvider?.headBranch || '',
    forkFullName: sourceProvider?.forkFullName || '',
    baseRepoFullName: process.env.baseRepoFullName || '',
  })

  // ...
}
```

`useGitHubJsonForm` will use the `GitHubClient` api that we [registered earlier](#register-the-githubclient).

## Error Handling

We'll also need to add error handling to our forms, which prompts GitHub-specific action when errors occur (e.g a fork no longer exists).

```tsx
// YourSiteForm.ts
import { useGitHubErrorListener } from 'react-tinacms-github'

const YourSiteForm = ({ form, children }) => {
  useGitHubErrorListener(form)
  return <FormLayout>{children}</FormLayout>
}
```
