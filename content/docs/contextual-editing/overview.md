---
title: Contextual Editing
id: '/docs/contextual-editing/overview'
prev: null
next: '/docs/contextual-editing/react'
---

Out of the box, once you define a new collection in Tina, its content becomes available through the "basic editor".

![basic editor](https://res.cloudinary.com/forestry-demo/image/upload/v1647455231/tina-io/docs/basic-editor.png)

Tina also allows for "Contextual Editing" so that editors can see their pages being updated in real-time as they make changes

![contextual editor](https://res.cloudinary.com/forestry-demo/image/upload/v1647455231/tina-io/docs/contextual-editing.png)

## Adding contextual-editing to a page

To add contextual editing to a page, you'll need to hydrate the pages data. In React, this is done by [using the `useTina`](/docs/contextual-editing/react) hook. We are currently working on adding support for other frameworks such as [vue](/docs/contextual-editing/vue).
