---
title: Overview
last_edited: '2022-04-06T10:00:00.000Z'
---

![Localized List](https://res.cloudinary.com/forestry-demo/image/upload/v1649260596/tina-io/docs/i18n/list-page.png)

Here at Tina, we are still working on our built-in solution for internationalizing your website.

However, for those users that need a simple solution and are willing to navigate a few hurdles, we do have a potential workaround suggested by our team.

## Prerequisites

For this solution, we're going to leverage an advanced feature offered by Next.js: internationalized routing.

https://nextjs.org/docs/advanced-features/i18n-routing

While Next.js is used in our solution, other frameworks could be substituted as long as they offer similar features.

## In this Guide

- Updating the `next.config.json` to support `i18n` locales
- Modifying `getStaticPaths` to build `locale`-aware paths
- Modifying `getStaticProps` to include `locale` in the `relativePath`
- Creating `locale`-ready Documents in the CMS
