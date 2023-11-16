---
title: TinaCMS is Now Fully Open-Source
date: '2023-11-15T05:00:00.000Z'
last_edited: '2023-11-15T05:00:00.000Z'
author: James O'Halloran
prev: content/blog/Tina-CMS--Leveljs.md
---

Earlier this year, we [released](/blog/self-hosted-datalayer/ "released") the first iteration of the self-hosted TinaCMS backend. The initial [demo](https://github.com/tinacms/tina-self-hosted-demo/tree/274c0d9ee004629ff0cef2539b56c88324abd8f8) relied on Tina Cloud for auth and used MongoDB for the [Data Layer](/blog/self-hosted-datalayer/). That was the first step in helping our users avoid vendor lock-in, but there were limitations, such as requiring a custom auth implementation when not using Tina Cloud and requiring MongoDB for the Data Layer.

We initially released the self-hosted backend under a "source available" license. While this was a very permissive license, we still want developers to feel comfortable building on TinaCMS without fearing that they'll hit a ceiling.

We're excited to announce that TinaCMS's Self-hosted Backend is now open-source, under the Apache 2.0 license!

## Fully self-host TinaCMS on Vercel

Since then, we've been hard at work on improving our self-hosted offering to make it easier to get started and less dependent on other vendor services (including our own). Today we are excited to announce the next iteration of self-hosted Tina, leveraging [Vercel KV](https://vercel.com/docs/storage/vercel-kv) for the Data Layer and a built-in auth solution based on [Auth.js](https://authjs.dev/). It is now possible for a developer to setup a fully functioning [Next.js](https://nextjs.org/) site running TinaCMS relying on only GitHub for source control and Vercel for hosting, auth, and data management.


TODO VIDEO HERE

Try it out with our NextJS starter here TODO BUTTON HERE

## Does self-hosted TinaCMS require Next.js / Vercel?

While our self-hosted Next.js demo provides an easy way to get started self-hosting using Vercel, self-hosted Tina does not require Vercel and can be used with any framework that is supported by Tina. The main consideration when self-hosting is the backend API which provides the GraphQL and auth endpoints. The backend API can be hosted on any platform that supports Express request handlers, including AWS, Google Cloud, and Netlify.

## Is self-hosted TinaCMS open-source?

Yes, TinaCMS is now fully open-source under the Apache 2.0 license.

## Future Plans

Repo-based media is not currently available for self-hosted TinaCMS. We currently recommend one of our other media manager solutions when self-hosting, such as Cloudinary, AWS S3 or Digital Oceans. This is something that we are exploring and hope to make available. Additionally our search capability currently requires Tina Cloud but is something we expect to add soon to self-hosting.

## Getting Started

Visit the self-hosted [docs](/docs/self-hosted/starters/nextjs-vercel/) and click the Deploy button to launch the self-hosted starter template on Vercel.
