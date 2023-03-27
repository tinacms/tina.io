---
title: 'Comparing Tina & Forestry: Migrating from Forestry: Media'
id: '/docs/forestry/media/'
next: '/docs/forestry/missing-forestry-features'
---

## Media in Forestry

Forestry CMS supports the following media options:

- Repo-based media (default)
- Cloudinary
- Amazon S3
- Netlify Large Media

Each media destination was configured through ForestryCMS's UI

## Media in TinaCMS

![](https://tina.io/img/media-manager-ui.png)

At this time, Tina has integrations the following media solutions:

- Repo-based media
- Cloudinary
- Amazon S3
- Digital Ocean Spaces

Tina's extendability also allows dev's to create custom API-based media provider integrations.

> Note: Netlify Large Media support is not planned in TinaCMS.

### Repo-based media

Out of the box, TinaCMS supports repo-based media. This is configured in `tina/config.js`:

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

#### Unsupported parent-directory relatives paths.

In Forestry, you could use images outside of your configured media directory:

```
![](../images/post-img.jpg)
```

Using `..` in the media path isn't supported in TinaCMS.

### 3rd-party Media Providers

Tina supports using external media providers (E.g Cloudinary, Digital Ocean Spaces, S3, etc), however a light backend media handler needs to be setup/hosted by the user. Tina offers some helpers to make this easy. This is usually pretty simple thanks to Netlify & Vercel's serverless function support.

You can check out our 3rd-party media guides [here](/docs/reference/media/external/authentication/)
