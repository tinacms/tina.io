---
title: Self-Hosting TinaCMS's Data Layer
date: '2023-01-31T04:00:00.000Z'
last_edited: '2023-02-06T04:00:00.000Z'
author: Scott Gallant & James O'Halloran
---

Today we're excited to announce the first iteration of TinaCMS's self-hosted Data Layer. This has been a [highly requested feature](https://github.com/tinacms/tinacms/discussions/3096) for a veriety of reasons. Some feedback we've heard:

- "We want flexibility to eject from Tina Cloud down the road"
- "We need the content stored on-prem"
- "We need to host the servers in a a particular region"
- "We want to use our custom authentication that isn't supported in Tina Cloud"
- We want to customize/extend the behaviour used within Tina Cloud"

We're excited to get this is the community's hands so that we can learn, iterate, and flesh out this self-hosted experience.

## What is the Tina Data Layer

The Tina Data Layer provides a GraphQL API that serves Markdown and JSON files. It offers traditional database capabilities so you can do things like paginate, search, and make references between data in your Markdown files. The Data Layer’s store is a key-value database that acts a lot like a cache since your single source of truth for your content is your Markdown/JSON files. The store can be swapped out with adapters for any database you’d like to use.

## Why does TinaCMS need a Data Layer when I store my content in Markdown files?

TinaCMS treats your Markdown files as the single source of truth for you content but it still requires the Tina Data Layer to do its job. This includes things like content search, pagination, content references, incremental builds, and more. When you’re developing your site locally, the Data Layer doesn’t need to be configured and just runs in the background. In production, if you use Tina Cloud, we run your Tina Data Layer for you and handle communication with GitHub. Now, we’re giving you the ability to self-host the Tina Data Layer so you’re not dependant on Tina Cloud.

## Is the Tina Data Layer open-source?

Most of TinaCMS is open-source under the Apache 2.0 but we chose to use a source-available license for the Tina Data Layer. This license has a (generous) limit to the commercial usage but allows us to offer a cost-free, self-hosted solution for smaller sites like those at startups, small and medium businesses, or other simple use-cases. Source available licenses are used with many companies like MongoDB, Elastic, and Sentry.

## Where can I host it?

We've designed the Data Layer so that it can just as easily be hosted as a Serverless function alongside your site (ala Vercel/Netlify functions). You can also host it as a long function API function wherever you like!

## Try it out!

To learn more about self-hosting the Data Layer, checkout the [GitHub discussion](https://tinacms-site-next-git-self-hosted-doc-tinacms.vercel.app/docs/self-hosted/overview/).
