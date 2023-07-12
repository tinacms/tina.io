---
title: Using Vercel KV & NextAuth to Self-host TinaCMS
date: '2023-06-30T04:00:00.000Z'
last_edited: '2023-07-12T04:00:00.000Z'
author: Kelly Davis
prev: content/blog/self-hosted-datalayer.md
---

Earlier this year, we [released](/blog/self-hosted-datalayer/ "released") the first iteration of self-hosted TinaCMS. The initial [demo](https://github.com/tinacms/tina-self-hosted-demo/tree/274c0d9ee004629ff0cef2539b56c88324abd8f8) relied on Tina Cloud for auth and used MongoDB for the data layer. That was the first step in helping our users avoid vendor lock-in.

Since then, we've been hard at work on improving our self-hosted offering to make it easier to get started and less dependent on other vendor services (including our own). Today we are excited to share the next iteration of our Tina self-hosted demo site, leveraging [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for the data layer and [NextAuth.js](NextAuth.js) for auth. It is now possible to set up a fully functioning [Next.js](https://nextjs.org/) site with TinaCMS only relying on GitHub and Vercel.

## What is Vercel KV?

Vercel KV is a durable Redis database that enables you to store and retrieve JSON data and is available on both hobby (free) and paid plans. The service is provided in partnership with [Upstash](https://upstash.com/about) and does not require a separate Upstash account. Because of its flexibility and performance, Vercel KV is a great fit for powering the self-hosted TinaCMS data layer.

## Using Vercel KV in the TinaCMS data layer

When you build your site with TinaCMS, the ultimate source of truth for your content is your Markdown files. However, features like search and filtering content require a data layer on top of those Markdown files. Virtually any database can be adapted for use with TinaCMS. To enable Vercel KV data layer, we have implemented a new Upstash Redis LevelDB [implementation](https://www.npmjs.com/package/upstash-redis-level). This provides all the data functionality needed by TinaCMS entirely within the Vercel ecosystem.

## Using NextAuth.js in TinaCMS

Tina Cloud provides user & role management, but TinaCMS also supports custom auth solutions that can be adapted for a wide variety of situations. The latest iteration of the Tina self-hosted demo site takes this a step further by integrating with [NextAuth.js](https://next-auth.js.org/). By leveraging NextAuth.js, any of the [available auth providers](https://next-auth.js.org/providers/) (e.g Github, Twitter, Google, etc...) can easily be integrated with TinaCMS. It also features customizable login screens, allowing your site to be fully branded. Lastly, the Tina self-hosted demo site provides a simple auth provider that leverages the same Vercel KV store to immediately enable auth without any additional configuration.

## Future Plans

Repo-based media is not currently available for self-hosted TinaCMS. We currently recommend one of our other media manager solutions when self-hosting, such as Cloudinary, AWS S3 or Digital Oceans. This is something that we are exploring and hope to make available. Additionally our new search capability currently requires Tina Cloud but is something we expect to add soon to self-hosting.

## Getting Started

Visit the self-hosted [demo](https://github.com/tinacms/tina-self-hosted-demo#deploy-this-repository-to-vercel) repo and click the Deploy button to launch the demo on Vercel.

<Youtube embedSrc="https://www.youtube.com/embed/Y_ACBtzf0gs" />
