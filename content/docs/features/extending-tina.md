---
title: Extending Tina
id: '/docs/features/extending-tina'
next: '/docs/tina-cloud'
---

TinaCMS exposes some hooks that make it easy to extend. Most of these hooks exist on the `<TinaCMS>` container

## Customizing a form or field with `formifyCallback`

With Tina, the form definition for a piece of content is generated automatically.

If you'd like to control the output of those forms, tap into the `formifyCallback` callback parameter on the root `<TinaCMS>` container.

### Customizing a field

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      formifyCallback={{ formConfig, createForm, skip }) => {
        return createForm({
          ...formConfig,
          fields: formConfig.fields.map(field => {
            if (field.name === 'title') {
              // replace `text` with `textarea`
              field.component = 'textarea'
            }
            return field
          }),
        })
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

### Customizing a form

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
