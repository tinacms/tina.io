---
title: |-
  Open Authoring 
  …Tina-style
date: '2020-02-25T07:00:00.000Z'
author: 'Kendall '
draft: false
consumes:
  - file: /packages/gatsby-tinacms-remark/src/remark-creator-plugin.ts
    details: Demonstrates use of RemarkCreatorPlugin
  - file: /packages/gatsby-tinacms-remark/src/remarkFormHoc.tsx
    details: Shows how to use inlineRemarkForm HOC
  - file: /packages/@tinacms/fields/src/Wysiwyg/Wysiwyg.tsx
    details: TinaField uses Wysiwyg component for inline editing
---
We're focused on helping people build better sites, create better content, and ultimately improve the independent web as a whole.

In-line with this mission, we built **Open Authoring**, but Tina-style:

> Picture an _"edit this page on GitHub"_ link, but when you click it, instead of kicking you over the GitHub, the site becomes instantly editable like a Google Doc. 😍

This requires authentication with GitHub so after you're done live-editing the site, you can submit your changes as a pull-request.

We're currently testing this on our own site but in the coming weeks, the API’s for integrating open authoring with Tina will become available. In the meantime, click the **edit icon** in the corner of this page to try it out and feel free to reference our site’s source code to see how it works. And if yew sea ani speling misteaks, pleeze ficks thim. Wee wood apprisheate that vary much 😂.

## Using [Next.js](nextjs.org) and [ZEIT](https://zeit.co/) to turn on "Edit-mode"

The timing was perfect...the Next.js team has been polishing their preview feature which we're using to switch your static site over to "Edit Mode". It's really quite magical and a testament to high-quality engineering. This is how it works:

<img src="" alt="diagram of edit mode">

## Crowd-sourcing your content

We see this approach as lowering the friction of website editing as a whole. Combine Open Authoring with live-edits and we have ourselves a content editing revolution. The web is all about community, crowd-sourcing, power in multitudinous perspectives. The easier it is to make content contributions, the more perspectives we get. The less context switching, the more space for creativity and expression of ideas themselves.