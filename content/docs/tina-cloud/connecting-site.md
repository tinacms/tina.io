---
title: Connecting the site
next: '/docs/tina-cloud/faq'
---

Once you've created a project within the **Tina Cloud**, the next step is to connect your site. Once connected, your project's editors will be able to save content directly to its GitHub repository, entirely from within your site.

## Enabling Tina Cloud in TinaCMS

In the [Contextual Editing doc](/docs/tinacms-context/), we showed you how the Tina context is setup on your site.

To have editing work in production, in the `.tina/components/TinaConfig.tsx`, change the `apiURL` to point to Tina's hosted content API (instead of your local filesystem).

```diff
// .tina/components/TinaConfig.tsx

// ...

- const apiURL = `http://localhost:4001/graphql`
+ const apiURL = `https://content.tinajs.io/content/${myClientId}/github/${myBranch}`


```

`<myClientId>` is the value from the Tina Cloud dashboard, and `<myBranch>` is the branch which you wish to communicate with.

## Using the deployment branch

Typically you'll want to use the branch that you're deploying with your site. This will vary depending on your host, but most will provide an environment variable of some sort that you can use. Note that your client ID isn't a secret and is not likely to change, so hardcoding it is usually ok.

```tsx
// .tina/components/TinaConfig.tsx

import TinaCMS from 'tinacms'

const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF
const clientId = 'YOUR-CLIENT-ID-HERE'

// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`

// Importing the TinaProvider directly into your page will cause Tina to be added to the production bundle.
// Instead, import the tina/provider/index default export to have it dynamially imported in edit-moode
const TinaConfig = ({ children }) => {
  return (
    <TinaCMS
      apiURL={apiURL}
      cmsCallback={cms => {
        cms.flags.set('tina-admin', true)
      }}
    >
      {children}
    </TinaCMS>
  )
}

export default TinaConfig
```

> `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` is a [system environment variable](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables) that represents the branch that has made the deployment commit. If not using Vercel, this can replaced with a custom environment variable, or even a hardcoded value.
