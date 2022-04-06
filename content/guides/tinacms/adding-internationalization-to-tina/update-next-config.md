---
title: Update next.config.js
last_edited: '2022-04-06T10:00:00.000Z'
---

First off, we'll need to add the `i18n` section to the `next.config.js` along with both `locales` and a `defaultLocale`:

https://nextjs.org/docs/advanced-features/i18n-routing#getting-started

> Note: `defaultLocale` provides a fallback for any unsupported locales.

```js
/**
 * next.config.js
 */

module.exports = {
  ...
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US'
  }
}
```
