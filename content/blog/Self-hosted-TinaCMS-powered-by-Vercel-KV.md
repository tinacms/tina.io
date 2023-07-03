---
title: 'Self-hosted TinaCMS, now powered by Vercel KV & NextAuth!'
date: '2023-06-30T04:00:00.000Z'
last_edited: '2023-06-30T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/self-hosted-datalayer.md
---

Earlier this year, we [released](/blog/self-hosted-datalayer/ "released") the first iteration of self-hosted TinaCMS. The initial [demo](https://github.com/tinacms/tina-self-hosted-demo/tree/274c0d9ee004629ff0cef2539b56c88324abd8f8) relied on Tina Cloud for auth and used MongoDB for the data layer. That was the first step in freeing TinaCMS users from vendor lock-in, but there were limitations, such as requiring a custom auth implementation when not using Tina Cloud and requiring MongoDB for the data layer.

Since then, we've been hard at work on improving our self-hosted offering to make it easier to get started and less dependent on other vendor services (including our own). Today we are excited to announce the next iteration of our self-hosted Tina demo, leveraging [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for the data layer and [NextAuth.js](NextAuth.js) for auth. It is now possible for a developer to setup a fully functioning [Next.js](https://nextjs.org/) site running TinaCMS relying on only GitHub for source control and Vercel for hosting, auth, and data management.

## What is Vercel KV?

Vercel KV is a durable Redis database that enables you to store and retrieve JSON data and is available on both hobby (free) and paid plans. The service is provided in partnership with [Upstash](https://upstash.com/about) and does not require a separate account. Because of it's flexibility and performance, Vercel KV is a great fit for powering the self-hosted TinaCMS data layer.

## Using Vercel KV in the TinaCMS data layer

When you build your site with TinaCMS, the ultimate source of truth is your Markdown files. Features like search and filtering of content while editing, though, require a data layer on top of those Markdown files. TinaCMS has incorporated an open source library called [LevelDB](https://github.com/Level/abstract-level) to provide a further layer of abstraction between TinaCMS's data layer and the underlying database implementation. By leveraging LevelDB in the data layer, virtually any database can be adapted for use with TinaCMS. To enable Vercel KV to work with TinaCMS, we have implemented a new Upstash Redis LevelDB [implementation](https://www.npmjs.com/package/upstash-redis-level). This provides all the data functionality needed by TinaCMS entirely within the Vercel ecosystem.

## Using NextAuth.js in TinaCMS

Tina Cloud provides organization and project-level user & role management, but we recognize that every project has its own specific authentication and authorization requirements. TinaCMS already provides built-in support for custom auth solutions that can be adapted for a wide variety of situations. The latest iteration of self-hosted TinaCMS takes this a step further by integrating with [NextAuth.js](https://next-auth.js.org/). By leveraging NextAuth.js, any of the available auth providers [offered by the framework](https://next-auth.js.org/providers/) (e.g Github, Twitter, Google, etc...) can easily be integrated with TinaCMS. It also allows fully customizable login screens, allowing your sites to be fully branded. The latest iteration of the self-hosted demo also provides a basic Credentials provider that leverages the Vercel KV store to immediately enable auth without additional configuration.
