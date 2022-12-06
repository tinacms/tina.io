---
title: 'Migrating from Forestry: Media'
id: '/docs/forestry/media/'
---

## Overview

![](https://tina.io/img/media-manager-ui.png)

Forestry CMS supported the following media options:

- Repo-based media (default)
- Cloudinary
- Amazon S3
- Netlify Large Media

At this time, Tina offers the following media solutions:

- Repo-based media
- Cloudinary
- Amazon S3
- Digital Ocean Spaces

Tina's extendability also allows dev's to create custom API-based media provider integrations.

> Note: Netlify Large Media support is not planned in TinaCMS.

## Repo-based media

Out of the box, TinaCMS supports repo-based media. This is configured in `.tina/config.js`:

```ts
  export default defineConfig({
    // ...
    media: {
      tina: {
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
```

The above config would source your media from `/public/uploads`.

## 3rd-party Media Providers

Tina supports using external media providers (E.g Cloudinary, Digital Ocean Spaces, & S3), however a light backend media handler needs to be setup/hosted by the user. Tina offers some helpers to make this easy.

You can check out our 3rd-party media guides [here](http://localhost:3000/docs/reference/media/external/authentication/)
