---
title: Styles
prev: /docs/ui/alerts
next:
---

The `@tinacms/styles` package serves as the foundation for all Tina UI components. It contains a number of related elements:

- Definitions for a range of CSS custom properties that define color, spacing, sizing & timing of Tina components.
- `Theme` — this contains `GlobalStyles` (for Tina CSS custom properties) and a `FontLoader` for [Inter](https://rsms.me/inter/).
- `ResetStyles`— a wrapper component that applies `TinaResetStyles` CSS.
- The `Button` & `IconButton` components which are used throughout Tina.

## CSS Custom Properties

Tina uses CSS custom properties to define a range of universal values used by Tina UI components. Using CSS custom properties allows anyone using Tina in their project to override any or all of the definitions as needed, either at a global or local scope.

This is how they're defined in the `@tinacms/styles` package:

```css
:root {
  --tina-color-primary-light: #2296fe;
  --tina-color-primary: #2296fe;
  --tina-color-primary-dark: #0574e4;
  --tina-color-error-light: #eb6337;
  --tina-color-error: #ec4815;
  --tina-color-error-dark: #dc4419;
  --tina-color-warning-light: #f5e06e;
  --tina-color-warning: #e9d050;
  --tina-color-warning-dark: #d3ba38;
  --tina-color-success-light: #57c355;
  --tina-color-success: #3cad3a;
  --tina-color-success-dark: #249a21;
  --tina-color-grey-0: #ffffff;
  --tina-color-grey-1: #f6f6f9;
  --tina-color-grey-2: #edecf3;
  --tina-color-grey-3: #e1ddec;
  --tina-color-grey-4: #b2adbe;
  --tina-color-grey-5: #918c9e;
  --tina-color-grey-6: #716c7f;
  --tina-color-grey-7: #565165;
  --tina-color-grey-8: #433e52;
  --tina-color-grey-9: #363145;
  --tina-color-grey-10: #282828;

  --tina-radius-small: 5px;
  --tina-radius-big: 24px;

  --tina-padding-small: 12px;
  --tina-padding-big: 20px;

  --tina-font-size-0: 11px;
  --tina-font-size-1: 13px;
  --tina-font-size-2: 15px;
  --tina-font-size-3: 16px;
  --tina-font-size-4: 18px;
  --tina-font-size-5: 20px;
  --tina-font-size-6: 22px;
  --tina-font-size-7: 26px;
  --tina-font-size-8: 32px;

  --tina-font-family: 'Inter', sans-serif;

  --tina-font-weight-regular: 500;
  --tina-font-weight-bold: 600;

  --tina-shadow-big: 0px 2px 3px rgba(0, 0, 0, 0.12), 0px 4px 8px rgba(48, 48, 48, 0.1);
  --tina-shadow-small: 0px 2px 3px rgba(0, 0, 0, 0.12);

  --tina-timing-short: 85ms;
  --tina-timing-medium: 150ms;
  --tina-timing-long: 250ms;

  --tina-z-index-0: 500;
  --tina-z-index-1: 1000;
  --tina-z-index-2: 1500;
  --tina-z-index-3: 2000;
  --tina-z-index-4: 2500;
}
```

> ### Shouldn't Tina use `rem`?
>
> While `rem` and `em` are the current preference for UI work, Tina can't control the root font size of the page where UI components are displayed, so it's necessary to use a more predictable unit.

To override any Tina properties, you can redefine them in your own stylesheet with a higher specificity selector, or simply `:root` if you know your styles will be loaded after Tina's.

Here's an example where we override the default primary color in favor of red:

```css
html body {
  --tina-color-primary-light: Red;
  --tina-color-primary: Crimson;
  --tina-color-primary-dark: Firebrick;
}
```

## Button Component

The Button component is used throughout other Tina UI components. You can import and use it in your own project, which can be useful for in-page editing or additional UI.

Here is an example where we use two available boolean props to create a regular, primary, small, and small primary button.

```jsx
import { Button } from '@tinacms/styles'

export const MyComponent = () => {
    return (
      <Button>I'm a Button</Button>
      <Button primary>I'm a Primary Button</Button>
      <Button small>I'm a Small Button</Button>
      <Button small primary>I'm a Small Primary Button</Button>
    )
  }
)
```

## Dynamically loading Tina styles

By default, the `TinaProvider` component will add the `Theme` to your project. You can use the `styled` prop to conditionally render the theme. By default, the `TinaProvider` will load the `Theme` if the CMS is enabled and no `styled` prop has been passed.

### Example: Load styles based on environment variable

**pages/\_app.js**

```js
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'

export default class Site extends App {
  constructor() {
    //...
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider
        cms={this.cms}
        styled={process.env.NODE_ENV === 'production'}
      >
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}
```

In this example, the Tina `Theme` won't render in production. This means the CSS custom properties won't register and the custom 'Inter' font won't load.

### Example: Only load _GlobalStyles_

**pages/\_app.js**

```js
import React from 'react'
import App from 'next/app'
import { TinaProvider, TinaCMS } from 'tinacms'
import { GlobalStyles as TinaStyles } from '@tinacms/styles'

export default class Site extends App {
  constructor() {
    //...
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms} styled={false}>
        <TinaStyles />
        <Component {...pageProps} />
      </TinaProvider>
    )
  }
}
```

In this example, only the `GlobalStyles`(as `TinaStyles`) are manually imported and rendered, while the **'Inter' font will not load**.
