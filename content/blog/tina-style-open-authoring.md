---
title: Open Authoring — Tina-Style
date: '2020-03-05T07:00:00.000Z'
author: Scott Gallant
draft: false
consumes:
  - file: null
    details: TODO - add consumer data
---

We're focused on helping people build better sites, create better content, and ultimately improve the independent web as a whole.

In-line with this mission, we built Tina-Style **Open Authoring**. The core idea for [Open Authoring](https://css-tricks.com/netlify-cms-open-authoring/#article-header-id-0) was spearheaded by [Netlify CMS](https://www.netlifycms.org/). In essence, it means opening up your website to accept content-related _contributions from anyone_ (with a Github profile 😉).

## Picture this:

On your website, there's an _"edit this page on GitHub"_ link, familiar enough. But imagine that when you click it, instead of kicking you over the GitHub, the site itself becomes editable, **like a Google Doc**.

Open Authoring is backed by a Git-workflow 😍. When 'Edit Mode' is triggered, a fork is created. Familiar teammates and internet do-gooders alike can contribute changes on their individual forks. When the new or revised content is ready, the editor can make a pull-request so the site owner can review the work before making it live.

The Tina Team is currently prototyping this on our own site. In the coming weeks, the API’s for integrating Open Authoring with Tina will become available. In the meantime, click the **edit icon** in the corner of this page to try it out and feel free to reference our site’s source code to see how it works.

> If yew sea ani speling misteaks, pleeze ficks thim. Wee wood apprisheate that vary much 😂.

## Using [Next.js](nextjs.org) to enable "Edit-mode"

Our ability to execute this idea coincided perfectly with updates for Next.js. The ZEIT team has been polishing a "preview" feature which we're using to switch a static site over to SSR-powered "Edit Mode". It's really quite magical and a testament to their high-quality engineering. This is how it works:

<img src="" alt="diagram of edit mode">

Up until the latest Next.js update, each page template was either static (consumed its data at build time) or used Server-Side Rendering(SSR - at the expense of page-load speed). With Next’s new “preview” feature, the same page template can be modelled for both static and SSR data-loading. This allows us to switch “content” data-sources without rebuilding the site.

Any time an editor loads a page in "Edit Mode", we can build a unique page for them given their own dataset from a particular Git branch or fork. SSR renders those dynamically generated pages and changes will be committed back to the unique data-source. Now content can be created on the site itself, with a familiar Git-based workflow under the hood.

## Crowd-sourcing your content

We see this approach as lowering the friction of website editing as a whole. Combine Open Authoring with [Inline Editing](https://tinacms.org/docs/inline-editing) and we have ourselves a content revolution on the horizon. The web is all about community, crowd-sourcing, power in multitudinous perspectives. What if it becomes effortless to fix a spelling error on the New York Times or update the ReactJS documentation instantly?

The easier it is to make content contributions, the more perspectives we get. The less context switching, the more space for creativity and expression of ideas themselves.

Let's democratize content and strengthen the independent web.
