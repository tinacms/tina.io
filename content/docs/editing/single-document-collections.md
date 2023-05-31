---
title: Single Document Collections
id: '/docs/editing/single-document-collections'
last_edited: '2023-03-28T04:00:00.000Z'
prev: /docs/editing/blocks
---

## Overview

In Tina, single-document collections refer to collections that can only accommodate a solitary document. In the UI, achieving this can be accomplished by disabling the creation and deletion buttons through setting `ui.allowedActions.create` and `ui.allowedActions.delete` to false. For more information, please refer to the [Collection Reference ](/docs/reference/collections/ 'Collection reference').

Once both settings have been applied, and the document contains a single file, the UI will forego the list page and direct the user straight to the document.

<video
className="video"
autoPlay="true"
loop
muted
playsInline
src="https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/tina-io/docs/extending-tina/Single_Collection_Demo.webm"
poster="https://res.cloudinary.com/forestry-demo/video/upload/so_0/tina-io/docs/extending-tina/Single_Collection_Demo.jpg" >

<source
  src="https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/tina-io/docs/extending-tina/Single_Collection_Demo.webm"
  type="video/webm"
/>
<source
  src="https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/e_accelerate:-20/tina-io/docs/extending-tina/Single_Collection_Demo.mp4"
  type="video/mp4"
/>
<source
  src="https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/tina-io/docs/extending-tina/Single_Collection_Demo.mov"
  type="video/mov"
/>
</video>

## Caveats

At present, query generation isn't available, meaning you'll need to craft your [custom query](/docs/data-fetching/custom-queries/ 'Custom Query Docs').

It's worth noting that setting `ui.allowedActions` merely modifies the user interface. If you'd like to prevent the API from adding more files to the collection, you can do so by utilizing the `match` property, as detailed in the [Collection Docs](/docs/reference/collections/#matchinclude).

```javascript
match: {
  include: 'documentName'
}
```

By implementing this, new documents will be prevented from being created.
