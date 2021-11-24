---
title: Extending Tina
id: '/docs/features/extending-tina'
next: '/docs/tina-cloud'
---

## Customizing a form

With Tina, the form definition for a piece of content is generated automatically.

If you'd like to control the output of those forms, tap into the `formifyCallback` callback parameter on the root `<TinaCMS>` container.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      formifyCallback={({ formConfig, createForm, skip }) => {
        if (formConfig.id === 'getSiteNavsDocument') {
          const form = new Form(formConfig)
          // The site nav will be a global plugin
          cms.plugins.add(new GlobalFormPlugin(form))
          return form
        }

        return createForm(formConfig)
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

## Customizing the CMS instance

The root `<TinaCMS>` container has an optional `cmsCallback` parameter that can be added to customize the CMS instance.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      cmsCallback={cms => {
        cms.sidebar.position = 'overlay'
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

`cmsCallback` might be used to alter Tina's UI, dynamically hide the sidebar on certain pages, tap into the CMS event bus, etc.
