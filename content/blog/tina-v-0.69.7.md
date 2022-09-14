---
title: 'TinaCMS V0.69.7'
date: '2022-09-14T04:00:00.000Z'
last_edited: '2022-09-14T04:00:00.000Z'
author: James O'Halloran
---

TinaCMS Version `0.69.7` brings some fixes, improved error handling, and overall DX improvements.

## Simpler "router" API

Route-mapping can now be configured within a collection's definition.

```tsx
// ...
  name: 'post',
  path: 'posts',
  ui: {
    router: ({ document }) => {
      // eg. post items can be previewed at posts/hello-world
      return `/posts/${document._sys.filename}`;
    },
  },
// ...
```

[See docs](https://tina.io/docs/tinacms-context/#the-router-property)

## Simpler "Global Forms" API

A collection can be marked as "global", from within a collection's definition.

```tsx
// ...
name: 'post',
path: 'posts',
ui: {
  global: true
},
// ...
```

This allows its form to be configured from anywhere in the contextual sidebar.

![Global Form](https://res.cloudinary.com/forestry-demo/image/upload/v1663153667/blog-media/0.69.7/global-form.png)

## Event Log UI

The sidebar now links to an "Event Log" UI, which makes it easier to debug things like the GitHub to Tina connection being broken.

![Event Log UI](https://res.cloudinary.com/forestry-demo/image/upload/v1663153677/blog-media/0.69.7/event-log.png)

## Other Improvements & Fixes

- Fix for when collection paths overlap [see issue](https://github.com/tinacms/tinacms/issues/2947)
- Improved error outputs from the CLI builds
- Fix "create-tina-app" on Windows
- Fix large image previews being too large for the screen
- S3 media store (docs still WIP)
