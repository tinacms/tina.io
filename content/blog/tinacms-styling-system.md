---
title: 'TinaCMS Styling System'
date: '2020-03-18T00:00:00.000Z'
author: Scott Byrne
---

## Writing an adaptable UI is hard.

When you're writing code for a quickly changing project, you want that code to be cheap and replaceable. [Styled Components](https://styled-components.com/) allow us to write styles right alongside the components they're used for. It lets us easily move components around — or completely replace them — with minimum effort.

All these components — spread across many packages and files — need a single source of truth. Colors, padding sizes, shadows, fonts.. everything had to be consistent between TinaCMS components. Styled Components offered a powerful theming system that was a natural fit for the problem. We could provide theme context to any component looking to use common Tina styles.

A major shift in our approach has been the ability to edit content directly inline where it's displayed. This meant that field specific UI would be displayed right on the user's website, not in an isolated TinaCMS container. We adapted our system to make this work, but the limitations of our approach became obvious. Even a simple button required type references to the styles package and a theme context provider. Theme changes — configured through gatsby-config.js — wouldn't take effect until the server restarted. We needed something more suited to the evolving TinaCMS project.

## Enter CSS custom properties.

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) bring variables to the CSS masses! Instead of being compile time or dependant on JavaScript, they can be defined and used in plain CSS. CSS custom properties are declared and scoped to a selector, like `:root`. You can override existing properties by redeclaring them, either at the same scope or on a child. In the case of TinaCMS, that means you can easily customize and use our theme in your on project, without having to compile our styles.

Here's an example where we override the primary color (blue by default) and use it in a custom button:

```css
:root {
  --tina-color-primary-light: #eb6337;
  --tina-color-primary: #ec4815;
  --tina-color-primary-dark: #dc4419;
}

.my-button {
  background-color: var(--tina-color-primary);
  border-radius: var(--tina-radius-big);

  :hover {
    background-color: var(--tina-color-primary-light);
  }
}
```

Reducing the complexity of our theme system makes it easier for us to adapt the UI to new features, but also makes it easier for those integrating TinaCMS with their project.

> [Take a look at the docs](https://tinacms.org/docs/cms/styles) for `@tinacms/styles` for a full reference of available properties.

## What's next?

Styled Components are easy to use and generally a pleasure to work with. But unfortunately they require a runtime. While this isn't an issue in an app or website, it's problematic for a library. It's possible the library consumer is already using a different version of styled components. Or even a different css-in-js library that requires a separate runtime. Ideally TinaCMS styles would be framework agnostic with no runtime.
Moving our theme system to CSS custom properties was the first step in aligning our style system with the needs of our project.
