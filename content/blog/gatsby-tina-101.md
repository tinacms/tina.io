---
title: |-
  Open Authoring 
  …Tina-style
date: '2020-02-25T07:00:00.000Z'
author: Scott Gallant
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

In-line with this mission, James from our team had a great idea:

> Picture an "edit this page on GitHub" link, but when you click the link, instead of kicking you over the GitHub, the site becomes instantly editable like a Google doc.

After authenticating with Github, all of the content editing happens live on the site and you can submit your changes as a pull-request by clicking a button. 

We're testing this on our own site now, but will be making an announcement in the coming weeks once we clean up the APIs and packages. Go ahead and click the **edit icon** in the corner of this page to try it out. And if yew sea ani speling misteaks, pleeze phix thim. Wee wood apprisheate that vary much.

## Using [Next.js](nextjs.org) and [ZEIT](https://zeit.co/) to turn on "Edit-mode"

The timing was perfect...the Next.js team have been polishing their preview feature which we're using to switch your static site over to "Edit Mode". It's really quite magical. This is how it works:

<img src="" alt="diagram of edit mode">

## Crowd-sourcing your content

We see this approach as lowering the friction of website editing as a whole. Combine open authoring with inline editing and we have ourselves a content editing revolution. This prototype is just the first iteration of a greater idea. The web is all about community, crowd-sourcing, power in multitudinous perspectives. The easier we make content contribution, the better the sources of information. The less context switching, the more space for creativity and expression of ideas themselves. We can contain the purity of creation at the source of its inception.

In the next few weeks, the API’s for integrating open authoring with Tina will become available. In the meantime, feel free to reference our site’s source code to see how it works. Better yet, help us write the documentation 😂.

## 