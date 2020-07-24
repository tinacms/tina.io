---
title: 'Overview'
---

This guide will show you how to set up Tina using [Strapi](https://strapi.io) as a headless CMS. The goal is to demonstrate how Tina can be used with "more traditional" CMS platforms where your content is exposed via APIs that are hosted separately from your frontend.

This guide will **not** get you fully production-ready. But after running through this guide, you should understand better how you could use Tina in conjunction with Strapi or any other services that expose similar APIs.

> **The Finished Product**
>
> The repository [https://github.com/mittonface/tina-strapi-blog](https://github.com/mittonface/tina-strapi-blog) contains the finished Tina portion of this guide. Feel free to take a look as you follow along.

## What we'll be making

We'll be putting together a simple blogging app. It will have two components:

1. a Strapi server,
2. a Next.js front-end using Tina.

Our Strapi server will live in the directory `./tina-strapi-server` and our front-end code will live in a directory next to that called `./tina-strapi-blog`.

We'll start out with getting the Strapi server running locally, defining our content types, and then creating some sample data. We'll move on to hooking up our front-end. Whenever necessary, we'll head back to Strapi and make additional configuration changes.
