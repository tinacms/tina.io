---
title: Adding the Tina Provider
---

We need to wrap every page in the `<TinaProvider>` component. This component will provide the CMS to all of our pages, allowing us to create an editor for our content. We can do this in NextJS by creating a file at `pages/_app.js` and extending the default NextJS [`App`](https://nextjs.org/docs#custom-app) class. Next will then use our custom app component to render the page. A basic boilerplate for extending the default `App` class looks like this:

```javascript
import React from 'react'
import App from 'next/app'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
```

## Installation

From here, install `tinacms`. We also need to install `styled-components` if it isn't installed already, as it's a peer dependency:

```bash
npm install tinacms styled-components
```

## Adding the Provider

There are two ways to wrap your App component with the Tina Provider:

- using the `<TinaProvider>` component
- using the `withTina` higher-order component

### Using _TinaProvider_

After installing `tinacms`, we need to create an instance of the CMS and pass it through to our pages via the `TinaProvider` component. Our new App class will look like this:

```javascript
import React from 'react'
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'

class MyApp extends App {
  constructor() {
    super()
    this.cms = new TinaCMS()
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}

export default MyApp
```

### Using the _withTina_ HOC

Wrapping your main App component in the `withTina` higher-order component will automatically instantiate the CMS and set up the provider.

```javascript
import React from 'react'
import App from 'next/app'
import { withTina } from 'tinacms'

export default withTina(App)
```

> You can configure the CMS by passing a second argument into `withTina`. Refer to [setting up the CMS object](/docs/cms#setting-up-the-cms-object) for details.

## More Info

- [Tina Docs: Setting up the CMS Object](/docs/cms#setting-up-the-cms-object)
