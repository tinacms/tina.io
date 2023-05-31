---
title: Click-to-Edit Comes to Visual Editing
date: '2023-05-17T03:00:00.000Z'
author: Scott Gallant
---

I’m excited to share that Tina’s visual editing UX just got a lot better with click-to-edit functionality.

This pops open the Tina sidebar at the right location when you click editable elements on the page.  See it in action on [roev.com](https://www.roev.com/) here:

<CloudinaryVideo src="https://res.cloudinary.com/forestry-demo/video/upload/v1684428946/blog-media/click-to-edit-may-2023/click-to-edit-demo" />

Our goal is to make visual editing the most intuitive editing experience _without_ compromising the developer's experience and code-quality. Click-to-edit is a big UX win and easy to implement on your site.

## Demo

If you want to get a feel for the UX, try this demo (no log in required).

<Button link="https://quick-edit-demo.vercel.app/admin" label="Try the Demo" />

## Getting Started

If you're already using visual editing, you can enable click-to-edit by adding the `data-tina-field` attribute to your DOM elements which allows Tina to map the editable elements on your page to the correct CMS field. We provide a helper that makes it easy to add this to pages with complex data structures.

<Button link="https://tina.io/docs/contextual-editing/react/#click-to-edit-experimental" label="See the Docs" />

Note, the `data-tina-field` attribute is different from the `data-tinafield` attribute used by our [Active Field Indicator](https://github.com/tinacms/tina.io/blob/2edf55f664e41d40ca99b5fc9ee6e689890e411a/content/docs/editing/active-field-indicator.md) (which will be phased out in the future).

## No Going Back

We've been using this internally for a while now and it's one of those features that makes you think "how did we do it before?". Going back to the old way where you have to traverse nested forms in Tina's sidebar to find the right field feels very cumbersome.

We're excited to hear what you think about click-to-edit. Please hop in our [Discord server](https://discord.com/invite/zumN63Ybpf) if you have feedback.
