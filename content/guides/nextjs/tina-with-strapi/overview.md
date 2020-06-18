---
title: 'Overview'
---

This guide will show you how to setup Tina using [Strapi](https://strapi.io/) as a headless CMS. The goal here is to demonstrate how Tina can be used with "more traditional" CMS platforms where you have seperately hosted content APIs. This opens the doors to having your data be exposed to multiple services, hiding your data behind roles and permissions, and a whole host of other ideas that are more natural to think about server-side.

This guide will **not** get you fully production-ready. Choosing how you want to host a service is as much an art as it is a science. But hopefully after running through this guide you'll understand better how Tina slots into the picture.

> Here's where I'll put a link to the finished repo.

## About the project we'll create

As is tradition, we'll be putting together a simple blogging app. It will have two components:

1. a Strapi server,
2. a Next.js front-end using Tina.

We'll start out with getting the Strapi server running locally, defining our content types, and making some sample data. Then we'll move on to hooking up our front-end. We'll bounce back to additonal Strapi configuration whenever it feels natural and we need Strapi to give us a little bit more functionality.
