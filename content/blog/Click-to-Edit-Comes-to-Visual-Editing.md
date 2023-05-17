---
title: Click-to-Edit Comes to Visual Editing
date: '2023-05-17T03:00:00.000Z'
author: Scott Gallant
---

I’m excited to share that Tina’s visual editing UX just got a lot better with click-to-edit functionality.

This pops open the Tina sidebar at the right location when you click editable elements on the page.  

<Youtube embedSrc="https://www.youtube.com/embed/Yoh2c5RUTiY" />

Our goal is to make visual editing the most intuitive editing experience *without* compromising developer experience and code-quality.  We've been using this internally for some time now and it's one of those features that makes you think "how did we do it before?".   Going back to the old way where you have to traverse nested forms in Tina's sidebar to find the right field feels cumbersome.  This is a big UX win.

## Demo

If you want to get a feel for the UX, try this demo (no auth required). 

<Callout title="" description="" url="https://quick-edit-demo.vercel.app/admin" buttonText="Demo" />

## Getting Started

If you're already using visual editing, you can enable click-to-edit by adding the `data-tina-field` attribute to your DOM elements which allows Tina to map your content to the correct element on your page.  Note, this is different from the data-tinafield attribute used by our [Active Field Indicator](https://tina.io/docs/editing/active-field-indicator/).

```javascript
<h1 data-tina-field={tinaField(rest, "title")}>{title}</h1>
```

We provide a helper that makes this easier for pages with complex data structures.

See the click-to-edit [docs here](/docs/editing/click-to-edit).

We're excited to hear your feedback on this feature. 

Happy editing!

# To do

* Compare it with before: traversing complex data structure in the U
