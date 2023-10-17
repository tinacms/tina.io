---
title: Tina CMS & Level.js
date: '2023-10-17T04:00:00.000Z'
last_edited: '2023-10-17T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/Supercharge-Your-Markdown-Blog-with-AI.md
---

Tina CMS is an open-source, Git-backed headless content management system (CMS) with a unique approach to content storage and retrieval. In this article, we are going to dive into its architecture and discover how Level.js strikes the perfect balance between simplicity and functionality needed by Tina.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1697555916/tina-io/new-homepage/homepage-demo-2b_lmoaj8.gif)

# The Challenge of Building a CMS on Git

One of the key features of Tina CMS is that instead of writing content to a database, it is stored in a Git repository. With Git, Tina gets built-in version control and enables Git-based collaborative workflows. Similar to other headless CMS products, content is exposed for rendering using a queryable API that is generated using a developer-defined schema.
