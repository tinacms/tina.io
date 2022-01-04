---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To use Tina Cloud, change the `apiURL` to:

```
https://content.tinajs.io/content/<myClientId>/github/<myBranch>
```

`<myClientId>` is the value from the Tina Cloud dashboard, and `<myBranch>` is the branch which you wish to communicate with.

We recommend storing this URL in an environment variable so you can switch between `localhost` and Tina Cloud easily. Note that it's safe for this variable to be public so if you're using Next, prefix it with `NEXT_PUBLIC_` for client-side access.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const apiURL = process.env.NEXT_PUBLIC_TINA_API_URL

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      apiURL={process.env.NEXT_PUBLIC_TINA_API_URL}
      // ... other props
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

## Using the deployment branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID
const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF

const apiURL =
  clientId && branch
    ? `https://content.tinajs.io/content/${clientId}/github/${branch}`
    : 'http://localhost:4001/graphql'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      apiURL={apiURL}
      // ... other props
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is a [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit. If not using Vercel, this can replaced with a custom environment variable, or even a hardcoded value.
