---
title: Getting Started
last_edited: '2020-08-18T18:00:32.970Z'
---

This guide will show you how to set up **Git-based content** editing with Tina & Next.js. With a Git-based approach, changes made to content in Tina's editor are immediately written back to their local Markdown or JSON source files. Updated content files can then by 'saved' via commit and pushed to an origin Git repository.

Building off the _[Adding Tina to a Next.js Site](/guides/nextjs/adding-tina/overview)_ guide, this guide assumes you have a basic understanding of Tina's fundamental building blocks. Below is a **recap of the initial steps** needed to set Tina up on a Next.js site.

## Prerequisite Steps:

### 1. Install the Tina packages.

```bash
yarn add tinacms styled-components
```

<!-- TODO: test if we still need to add moment as a peerdep at this step? -->

### 2. Configure a custom \_app file.

See [here](https://nextjs.org/docs/advanced-features/custom-app) for information about custom \_apps.

Feel free to reference the [example](/guides/nextjs/adding-tina/adding-tina-provider) in the previous guide using the `withTina` HOC. Or checkout the example below where the `cms` & `TinaProvider` are manually added.

**pages/_app.js**

```js
import React from 'react'
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'

class MyApp extends App {
  constructor() {
    super()

    // Instantiate the cms
    this.cms = new TinaCMS({ enabled: true, sidebar: true })
  }
  render() {
    const { Component, pageProps } = this.props

    // Wrap the TinaProvider around all page components
    return (
      <TinaProvider cms={this.cms}>
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}

export default MyApp
```

Next, **we'll set up a backend** to persist content changes.
