---
title: Adding the Tina Provider
---

We need to wrap every page in the `<TinaProvider>` component. This component will provide the CMS to all of our pages, allowing us to create an editor for our content. We can do this in Next.js by [creating a custom _App_ component](https://nextjs.org/docs#custom-app). Next will then use our custom app component to render the page.

Our blog starter already has this file created. Open up `pages/_app.js` and you should see something like this:

```jsx
import '../styles/index.css'

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

## Installation

From here, install `tinacms`. We also need to install `styled-components`, as it's a peer dependency:

```bash
yarn add tinacms styled-components
```

## Adding the Provider

Wrapping the main App component in the `withTina` higher-order component will automatically instantiate the CMS and set up the provider.

```javascript
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withTina(MyApp)
```

> You can configure the CMS by passing a second argument into `withTina`. Refer to [setting up the CMS object](/docs/cms#setting-up-the-cms-object) for details.

## More Info

- [NextJS.org: Custom App Component](https://nextjs.org/docs/advanced-features/custom-app)
- [Tina Docs: Setting up the CMS Object](/docs/cms#setting-up-the-cms-object)
