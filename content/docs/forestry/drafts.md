---
title: 'Comparing Tina & Forestry: Drafts'
id: '/docs/forestry/drafts/'
---

## Drafts In Forestry

In Forestry, if you're using a static site generator like Hugo, we automatically show a "draft" toggle for each document. This makes it easy to switch between draft and published versions of your content, and to preview your changes before making them live.

![Forestry Drafts](https://res.cloudinary.com/forestry-demo/image/upload/v1670503904/tina-io/docs/forestry-migration/forestry-drafts.png)

## Drafts in Tina

In TinaCMS, you need to explicitly add a "draft" field to any collection that can be a draft. This means that you have more control over which collections can be drafts, but it also means that you'll need to add this field yourself, rather than having it automatically included.

![Tina Drafts](https://res.cloudinary.com/forestry-demo/image/upload/v1670504072/tina-io/docs/forestry-migration/tina-drafts.png)

```js
// ...
collections: [
  {
    name: 'doc',
    label: 'Docs',
    path: 'content/docs',
    format: 'md',
    fields: [
      {
        name: 'draft',
        label: 'Draft',
        type: 'boolean',
      },
    ],
  },
]
```
