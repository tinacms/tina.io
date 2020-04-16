---
title: Open Authoring with Github
id: /docs/nextjs/github-public-repo
prev: /docs/nextjs/markdown
next:
---

Using Next.js's preview-mode ([announced in Next.js 9.3](https://nextjs.org/blog/next-9-3)), we can load a separate set of data depending on if we are in "edit-mode" or "production-mode". This pairs well with the Github API, where we can provide an "Open Authoring" experience where anyone can fork your site, make changes, and create a pull request, all through the TinaCMS UI!

## Requirements:

- You must be using Next.js v.9.3 or later.
- If your site is static, is must be hosted on a service that supports Next.js preview-mode (E.g Zeit's Now)
- Your editable content must be stored in Github
- Your repository containing your content must be public

## Installation

We'll need to add a few Tina-Github packages to our site:

```
npm install --save react-tinacms-github next-tinacms-github final-form-submit-listener
```

or

```
yarn add react-tinacms-github next-tinacms-github final-form-submit-listener
```

#### `react-tinacms-github`

This package provides helpers for setting up TinaCMS to use the Github API, with Github authentication.

#### `next-tinacms-github`

This package provides helpers for managing the github auth token for requests, as well as
providing helpers for loading content from the Github API.

## Getting Started

### Environment Variables

Throughout this guide, some environment variables will be used:

```
# .env
GITHUB_CLIENT_ID= # We will generate this later when we create a Github app.
GITHUB_CLIENT_SECRET= # We will generate this later when we create a Github app.
REPO_FULL_NAME=tinacms/tinacms.org # This is your github repository's owner / repo-name.
BASE_BRANCH=master
```

For help setting up environment variables with Next, see the [Next docs](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)

### Register the GithubClient

We will want to use the GithubClient to load/save our content using the Github API. Let's add it as an API plugin.

```ts
import { TinaCMS } from 'tinacms'
import { GithubClient } from 'react-tinacms-github'

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string // e.g: tinacms/tinacms.org

const cms = new TinaCMS({
  apis: {
    github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
  },
  // ... any other tina config
})
```

You'll notice that the GithubClient takes in a string ('/api/proxy-github' in our case). All requests using the GithubClient gets passed through a custom proxy, so that we can attach the authentication tokens on the backend.

Let's setup up some of these backend API functions.

## API functions

We will need a few API functions to handle Github authentication, and Next.js's preview-mode:
With Next.js, any functions in the `pages/api` directory are are mapped to `/api/*` endpoints.

We've created a script to make generating these files easier:

From the console, run:

```
$ npx hygen-add https://github.com/dwalkr/hygen-next-tinacms-github
$ npx hygen next-tinacms-github bootstrap --format ts
```

You'll see that a few API functions have been setup for us.

#### `preview.ts`

Contains API function to enter preview-mode, and set the preview-data with content stored in the cookies.

#### `proxy-github.ts`

Contains API function to attach the user's auth token, and proxy requests to the Github API.

#### `create-github-auth-token.ts`

Helper for creating a `createCreateAccessToken` server function.

> _Note: You may need to configure the `process.env.GITHUB_CLIENT_ID` and `process.env.GITHUB_CLIENT_SECRET` environment variables within this file._ _See [Next's documentation](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) for adding environment variables_

> [See below](#github-oauth-app) for instructions on creating a Github OAuth App to generate these **Client ID** & **Client Secret** variables.

## Managing "edit-mode" state

Next, we'll add the root `TinacmsGithubProvider` component to our main layout. This is responible for validating that the user has access to the repository, and managing entering/exiting edit-mode.
When we enter/exit edit-mode, we will hit our `/api` server functions that we created in the previous step.

```tsx
// YourLayout.ts
import { TinacmsGithubProvider } from 'react-tinacms-github'

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

const YourLayout = ({ error, pageProps, children }) => {
  return (
    <TinacmsGithubProvider
      clientId={process.env.GITHUB_CLIENT_ID || ''}
      authCallbackRoute="/api/create-github-access-token"
      enterEditMode={enterEditMode}
      exitEditMode={exitEditMode}
      error={pageProps.error}
    >
      {children}
    </TinacmsGithubProvider>
  )
}
```

## Entering / Exiting "edit-mode"

Next, we will need a way to enter/exit mode from our site. Let's create an "Edit Link" button. Ours will take `isEditing` as a parameter.

_We'll be using Next.js's [preview-mode](https://nextjs.org/docs/advanced-features/preview-mode) to set this `isEditing` value. We'll set that up later_

```tsx
//...EditLink.tsx
import React from 'react'
import { useGithubEditing } from 'react-tinacms-github'

export interface EditLinkProps {
  isEditing: boolean
}

export const EditLink = ({ isEditing }: EditLinkProps) => {
  const github = useGithubEditing()

  return (
    <button onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {isEditing ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

## Auth Redirects

We will also a page to redirect the user to while authenticating with Github.

```tsx
//pages/github/authorizing.tsx
// Our Github app redirects back to this page with auth code
import React from 'react'
import { useGithubAuthRedirect } from 'react-tinacms-github'

export default function Authorizing() {
  // Let the main app know, that we receieved an auth code from the Github redirect
  useGithubAuthRedirect()
  return <h2>Authorizing with Github, Please wait...</h2>
}
```

## Github Oauth App

In GitHub, within your account Settings, click [Oauth Apps](https://github.com/settings/developers) under Developer Settings.

click "New Oauth App".

For the **Authorization callback URL**, enter the url for the "authorizing" page that you created above (e.g https://your-url/github/authorizing). Fill out the other fields with your custom values.
_Note: If you are testing your app locally, you may need a separate development Github app (with a localhost redirect), and a production Github app._

Don't forget to add the **Client ID** and **Client Secret** to your environment variables.

## Using Github Forms

Any forms that we have on our site can be created with the `useGithubJsonForm` or `useGithubMarkdownForm` helpers

```tsx
function BlogTemplate({
  jsonFile, // content for this page
  sourceProviderConnection, // repository details
}) {
  const formOptions = {
    label: 'Blog Post',
    fields: [],
  }

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(
    jsonFile,
    formOptions,
    sourceProviderConnection
  )

  // ...
}
```

`useGithubJsonForm` will use the `GithubClient` api that we [registered earlier](#register-the-githubclient).

## Loading content from Github

The `preview` data, which gets set by calling your [preview function](#previewhandler), will be accesible through `getStaticProps` throughout your app.

```ts
//Blog template [slug].ts

import { getMarkdownFile as getGithubMarkdownFile } from 'next-tinacms-github'

// ...

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params

  let file = {}
  const filePath = `content/blog/${slug}.md`

  const sourceProviderConnection = {
    forkFullName: previewData.fork_full_name,
    headBranch: previewData.head_branch || 'master',
  }

  let error = null

  if (preview) {
    try {
      file = await getGithubMarkdownFile(
        filePath,
        sourceProviderConnection,
        previewData.accessToken
      )
    } catch (e) {
      // If there is an error initially loading the content from Github, we want to display an actionable error
      // to the user. They may need to re-authenticate or create a new fork.
      if (e instanceof GithubError) {
        error = { ...e } //workaround since we cant return error as JSON
      } else {
        throw e
      }
    }
  } else {
    // Get your production content here
    // when you are not in edit-mode
    file = await readLocalMarkdownFile(filePath)
  }

  return {
    props: {
      sourceProviderConnection,
      editMode: !!preview,
      file,
      error,
    },
  }
}
```

## Error Handling

We'll also need to add error handling to our forms, which prompts Github-specific action when errors occur (e.g a fork no longer exists).

```tsx
// YourSiteForm.ts
import { useGithubErrorListener } from 'react-tinacms-github'

const YourSiteForm = ({ form, children }) => {
  useGithubErrorListener(form)
  return <FormLayout>{children}</FormLayout>
}
```
