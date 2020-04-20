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
npm install --save react-tinacms-github next-tinacms-github
```

or

```
yarn add react-tinacms-github next-tinacms-github
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

For more help setting up environment variables with Next, see the [Next docs](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)

## Setup

### Register the GitHubClient

We will want to use the GitHubClient to load/save our content using the GitHub API. Let's add it as an API plugin.

```ts
// pages/_app.js
import App from 'next/app';
import { TinaCMS, TinaProvider } from 'tinacms';
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github';

const REPO_FULL_NAME = process.env.REPO_FULL_NAME as string; // e.g: tinacms/tinacms.org

const enterEditMode = () => {
  return fetch(`/api/preview`).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export default class Site extends App {
  cms: TinaCMS;

  constructor(props) {
    super(props);
    this.cms = new TinaCMS({
      apis: {
        github: new GithubClient('/api/proxy-github', REPO_FULL_NAME),
      },
      sidebar: {
        hidden: !props.pageProps.preview,
      },
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          clientId={process.env.GITHUB_CLIENT_ID}
          authCallbackRoute='/api/create-github-access-token'
          editMode={pageProps.preview}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.error}
        >
          <EditLink editMode={pageProps.preview} />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </TinaProvider>
    );
  }
}

export interface EditLinkProps {
  editMode: boolean;
}

export const EditLink = ({ editMode }: EditLinkProps) => {
  const github = useGithubEditing();

  return (
    <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
      {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  );
};

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

We will also a page to redirect the user to while authenticating with GitHub.

```tsx
//pages/github/authorizing.tsx
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
> If you are testing your app locally, you may need a separate development GitHub app (with a localhost redirect), and a production GitHub app.

Don't forget to add the **Client ID** and **Client Secret** to your environment variables.

## Loading content from GitHub

Now that we have access to the user's auth token, we can load content from GitHub within `getStaticProps`.

```tsx
//About template about.tsx

import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

// ...

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'src/content/home.json',
      parse: parseMarkdown
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'src/content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  };
}
```

## Using GitHub Forms

Any forms that we have on our site can be created with the `useGitHubJsonForm` or `useGitHubMarkdownForm` helpers

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

`useGitHubJsonForm` will use the `GitHubClient` api that we [registered earlier](#register-the-githubclient).
