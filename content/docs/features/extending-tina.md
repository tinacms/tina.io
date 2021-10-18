---
title: Extending Tina
id: '/docs/features/extending-tina'
---

TinaCMS exposes some hooks that make it easy to extend. Most of these hooks exist on the `<TinaCMS>` container

## Customizing the form

The root `<TinaCMS>` container has an optional `formifyCallback` parameter that can be added to customize the Tina form generation.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      formifyCallback={args => {
        if (args.formConfig.id === 'getNavDocument') {
          return args.skip()
        }
        return args.createForm(args.formConfig)
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

With `formifyCallback`, we can do things like hiding specific forms, customizing a field's UI, etc.

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
