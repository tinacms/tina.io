---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to it's GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To now enable Tina Cloud on your site, we just need to tweak a few properties to make the site editable:

| property        | description                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientId`      | This identifier associates your site with a Tina Cloud project. You can find your clientId on the [Dashboard](https://app.tina.io/projects) by viewing your project's configuration.  |
| `isLocalClient` | When this is false, TinaCMS uses Tina Cloud's hosted API instead of a local server to load and save content during editing.                                                           |
| `branch`        | This is the branch in which we will load/save content to/from while in edit-mode. This can be a dynamic value if you'd like to implement more complex branching, or it can be static. |

### Example

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      isLocalClient={false}
      // Your app identifier when connecting to Tina Cloud
      clientId="<some-id-from-tina-cloud>"
      // Specify the git branch
      branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || 'main'}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is a [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit. If not using Vercel, this can replaced with a custom environment variable, or even a hardcoded value.
