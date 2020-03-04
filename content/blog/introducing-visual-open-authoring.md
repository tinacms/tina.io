---
title: Introducing Visual Open Authoring
date: '2020-03-05T07:00:00.000Z'
author: Scott Gallant
draft: false
consumes: null
---

We're focused on improving the independent web as a whole. We want to craft tools that help people build better sites and create better content.

In-line with this mission, we built Tina-style _Visual Open Authoring_ ✍️. [Netlify CMS](https://www.netlifycms.org/) spearheaded the [core idea](https://css-tricks.com/netlify-cms-open-authoring/#article-header-id-0) this past summer. It involves opening up your website to accept content-related _contributions from anyone_. And now, Tina takes this a step further to establish the **editing context on the page itself**.

## Picture this:

On your website, there's an _"Edit this page on GitHub"_ link — familiar enough. But imagine that when you click it, instead of kicking you over to GitHub, the site itself becomes editable, **like a Google Doc**.

This should feel familiar for anyone that has used a word processor or site builder. You navigate to the page you want to change, click “Edit”, make updates in a WYSIWYG, and then submit your changes. That’s it 🧞‍♂️.

![TinaCMS Visual Open Authoring](/gif/open_authoring.gif)

## What's under the hood?

The scaffolding underneath _Visual Open Authoring_ is a Git-based workflow. Triggering 'Edit Mode' creates a new fork to track and commit changes on. When content updates are ready, the editor can make a pull-request. The site owner can then review the work before making it live.

The Tina Team is currently prototyping this on our own site. In the coming weeks, the API’s for integrating _Visual Open Authoring_ with Tina will become available. In the meantime, click the **edit button** at the top of this blog to try it out. Feel free to reference this site’s [source code](https://github.com/tinacms/tinacms.org) to see how it works.

> If yew sea ani speling misteaks, pleeze ficks thim. Wee wood apprisheate that vary much 😂.

## Using Next.js to enable "Edit-mode"

Our ability to execute this idea coincided with updates for [Next.js](https://nextjs.org/). The ZEIT team has been polishing a "preview" feature that was instrumental for our _Visual Open Authoring_ prototype. We're using it to switch a static site into "Edit Mode". It's quite magical — a testament to their high-quality engineering.

### How it works

Before this "preview" feature, page templates in Next.js were either built to be static or used Server-Side Rendering (SSR). Now, the same page template can conditionally take advantage of **both static and SSR data-loading**. This allows us to switch “content” data-sources without rebuilding the site.

Any time an editor loads a page in "Edit Mode", we can build a unique page for them. This page gets its own data from a particular Git branch or fork. SSR renders the page with the user's dynamic content. We can even allow the user to create new pages that don't exist in the static 'production' build.

With this workflow, we don't have to host a separate [Cloud Editing Environment](https://tinacms.org/blog/editing-on-the-cloud). The **live site is the editing environment**, with Git to keep the guide-rails.

## Crowd-sourcing your content

We see this approach as _lowering the friction_ of website editing as a whole. Combine _Visual Open Authoring_ with [Inline Editing](https://tinacms.org/docs/inline-editing) and we have ourselves a digital-content revolution. What if it were effortless to fix a spelling error on the New York Times? Imagine contributing to the ReactJS documentation in an instant.

**The web is all about community**, crowd-sourcing, power in many perspectives. The easier it is to make content contributions, the more viewpoints we incorporate. The less context switching, the _more space for creative expression_ of ideas.

Let's democratize content and strengthen the independent web.
