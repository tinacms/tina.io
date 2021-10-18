---
title: Using an app
---

Once you've created an app within the **Tina Cloud Dashboard** it's ready to be used within your site. By doing so, your app's editors will be able to save content to your app's repository, right from your sire.

## Switching <TinaCMS> to production mode.

In the [Contextual Editing doc](http://localhost:3000/docs/tinacms-context/), we showed you how the Tina context is setup on your site. We just need to tweak a few values to make our site editable in production

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
      branch="main"
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

### isLocalClient

Switching this to false, means that we'll talk to Tina Cloud's hosted API instead of talking to localhost to load/save its content while in edit-mode.

### clientId

This is your identifier for your Tina Cloud app. It can be retrieved by going to app.tina.io, and looking at your app's configuration.

### branch

This is the branch in which we will load/save content to/from while in edit-mode. This can be a dynamic value if you'd like to implement a more complex branching, or can be fixed.
