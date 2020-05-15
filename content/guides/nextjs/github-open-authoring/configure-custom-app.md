---
title: Configure the Custom App File
---

Now we will set up TinaCMS to work with the GitHub App. First, create a new file in the `pages` directory called `_app.tsx`. This is a special file in Next.js that allows us to configure a [custom app](https://nextjs.org/docs/advanced-features/custom-app). Our custom `_app.tsx` will do a few things:

1. **Create the TinaCMS instance**
2. **Register the GithubClient:** The client allows us to authenticate with GitHub. All requests using the `GithubClient` gets passed through a proxy on our site. This allows us to securely attach the authentication tokens on the backend.
3. Configure the **[Editing UI](/docs/cms/ui) to be 'hidden'** unless we're in [Preview/Edit mode](https://nextjs.org/docs/advanced-features/preview-mode).
4. **Wrap the Page with `TinacmsGithubProvider`:** This component is given config and callbacks that hit our `/api` server functions to enable Preview/Edit Mode after authentication is complete.
5. **Add a button for entering Preview/Edit Mode:** We must provide a means of triggering authentication to enter/exit edit mode. This a simple example of how to do so.

**pages/\_app.tsx**

```tsx
import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  useGithubEditing,
  GithubClient,
  TinacmsGithubProvider,
} from 'react-tinacms-github'

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
        github: new GithubClient({
          proxy: '/api/proxy-github',
          authCallbackRoute: '/api/create-github-access-token',
          clientId: process.env.GITHUB_CLIENT_ID,
          baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
        }),
      },
      /**
       * 3. Hide the Sidebar & Toolbar
       *    unless we're in Preview/Edit Mode
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

> _Note:_ For brevity, the example above configures many steps in a single file, but **a few components can be configured in different places**. For example you could put the `EditLink` in a Layout component, or set up the Github Provider only on certain pages.

If you restart the dev server, you should see a **button in the top left-hand corner** that says, "Edit This Site". If you click it, you'll be _prompted to authenticate_ with GitHub. 

If auth is successful, you should see a refresh and then it will look the same as before, just like this:

![create-next-app with tina edit button](/img/github-open-auth-cna/edit-this-site.png)

To make sure it did work, check your cookies. You should now see these four cookies: **\_\_next\_preview\_data**, **\_\_prerender\_bypass**, **working\_repo\_full\_name**, and **github\_access\_token**. 

Those first two, **\_\_next\_preview\_data** and **\_\_prerender\_bypass**, are for using preview mode.

The **working\_repo\_full\_name** points to the repository you'll be editing (i.e. the _Working Repo_). In this case, it should point to your repo, the original repo, because you have access to it, which we also call the _Base Repo_. Therefore your edits will go to the `master` branch.

If you didn't have access, then you would be requested to create a fork of the _Base Repo_, that fork would then be your _Working Repo_. You would commit edits on that fork and create a PR for review.

![github-create-fork-step](/img/github-open-auth-cna/create-fork-step.png)

The final cookie, **github\_access\_token**, proves that the authentication worked, since you now have an access token for the Github APIs. 


Next we'll need to configure Previews on the index page to enter the editing environment on our _Working Repository_.
