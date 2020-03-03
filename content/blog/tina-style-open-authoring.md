---
title: Open Authoring — Tina-Style
date: '2020-03-05T07:00:00.000Z'
author: Scott Gallant
draft: false
consumes:
  - file: null
    details: TODO - add consumer data
---

We're focused on improving the independent web as a whole. We want to craft tools that help people build better sites and create better content.

In-line with this mission, we built **Tina-Style Open Authoring** ✍️. [Netlify CMS](https://www.netlifycms.org/) spearheaded the [core idea](https://css-tricks.com/netlify-cms-open-authoring/#article-header-id-0) this past summer. It involves opening up your website to accept content-related _contributions from anyone_.

## Picture this:

On your website, there's an _"Edit this page on GitHub"_ link — familiar enough. But imagine that when you click it, instead of kicking you over to GitHub, the site itself becomes editable — **like a Google Doc**.

The scaffolding underneath Open Authoring is a Git-based workflow 😍. Triggering 'Edit Mode' creates a new fork to track and commit changes on. When content updates are ready, the editor can make a pull-request. The site owner can then review the work before making it live.

The Tina Team is currently prototyping this on our own site. In the coming weeks, the API’s for integrating Open Authoring with Tina will become available. In the meantime, click the **edit icon** in the corner of this page to try it out. Feel free to reference this site’s [source code](https://github.com/tinacms/tinacms.org) to see how it works.

> If yew sea ani speling misteaks, pleeze ficks thim. Wee wood apprisheate that vary much 😂.

## Using [Next.js](nextjs.org) to enable "Edit-mode"

Our ability to execute this idea coincided with updates for [Next.js](https://nextjs.org/). The ZEIT team has been polishing a "preview" feature that was instrumental for our Open Authoring prototype. We're using it to switch a static site into "Edit Mode". It's quite magical — a testament to their high-quality engineering. In a few words, this is how it works:

<img src="" alt="diagram of edit mode">

Before this "preview" feature, page templates in Next.js were either static or used Server-Side Rendering (SSR). Now, the same page template can take advantage of **both static and SSR data-loading**. This allows us to switch “content” data-sources without rebuilding the site.

Any time an editor loads a page in "Edit Mode", we can build a unique page for them. This page get its own data from a particular Git branch or fork. SSR renders the page and enables Tina editing magic 🧙‍♀️. This is how we can make content changes right on the page, with a familiar Git-based workflow under the hood.

## Crowd-sourcing your content

We see this approach as _lowering the friction_ of website editing as a whole. Combine Open Authoring with [Inline Editing](https://tinacms.org/docs/inline-editing) and we have ourselves a digital-content revolution. What if it were effortless to fix a spelling error on the New York Times? Imagine contributing to the ReactJS documentation in an instant.

**The web is all about community**, crowd-sourcing, power in many perspectives. The easier it is to make content contributions, the more viewpoints we incorporate. The less context switching, the _more space for creative expression_ of ideas.

Let's democratize content and strengthen the independent web.
