---
title: Self-Hosting the Tina Data Layer
date: '2023-01-31T04:00:00.000Z'
last_edited: '2023-02-06T04:00:00.000Z'
author: Scott Gallant & James O'Halloran
---

Today we're excited to announce the first iteration of TinaCMS's self-hosted Data Layer. This has been a [highly requested feature](https://github.com/tinacms/tinacms/discussions/3096) for a variety of reasons. Some feedback we've heard:

- "We want flexibility to eject from Tina Cloud down the road"
- "We need our content stored on-premise"
- "We need to host the servers in a particular region"
- "We want to use our custom authentication that isn't supported in Tina Cloud"
- We want to customize/extend the behaviour used within Tina Cloud"

By self-hosting the Tina Data Layer, you can run TinaCMS without lock-in to Tina Cloud.&#x20;

We're excited to get this in the community's hands so that we can learn, iterate, and flesh out the self-hosted experience.

## What is the Tina Data Layer

The Tina Data Layer provides a GraphQL API that serves Markdown and JSON files backed by a database. You can think of the database as more of an ephemeral cache, since the single source of truth for your content is really your Markdown/JSON files.

![TinaCMS GraphQL Data Layer](http://res.cloudinary.com/forestry-demo/image/upload/v1675375259/tinacms-data-layer_geyrv8.png 'TinaCMS Data Layer')

## Why does TinaCMS need a Data Layer when I store my content in Markdown files?

As mentioned above, your Markdown files are the source of truth but TinaCMS still requires the Data Layer to do things like search, pagination, references between Markdown files, and more.&#x20;

Also, since the Data Layer provides an API, you can fetch your content like you would with a traditional headless CMS.&#x20;

## How come I didn't know there was a Data Layer?

When you’re developing your site locally, the Data Layer doesn’t need to be configured and just runs in the background. If you use Tina Cloud in production, it runs your Tina Data Layer for you and syncs with GitHub. Now, you can host your own Data Layer as an alternative to using Tina Cloud.&#x20;

## Is the Tina Data Layer open-source?

Most of TinaCMS is open-source under the Apache 2.0 but we chose a [source-available](https://en.wikipedia.org/wiki/Source-available_software) license for the Tina Data Layer. This license limits some commercial usage but allows us to offer a cost-free, self-hosted solution for smaller sites like those used at startups or small and medium businesses. Source available licenses are used at many companies like MongoDB, Elastic, and Sentry. You can find the [license](https://github.com/tinacms/tinacms/blob/main/packages/%40tinacms/datalayer/LICENSE) and related [FAQ](https://github.com/tinacms/tinacms/blob/main/packages/@tinacms/datalayer/LICENSE-FAQ.md) in our repository.&#x20;

## Where can I host it?

We've designed the Data Layer so that it can be hosted as a Serverless function alongside your site (with Vercel/Netlify functions, for example). You can also host it separately wherever you like!

If you're self-hosting, you're also responsible for hosting your own database (Our self-hosted starter uses MongoDB).

## Try it out!

To learn more about self-hosting the Data Layer, checkout the [GitHub discussion](https://tinacms-site-next-git-self-hosted-doc-tinacms.vercel.app/docs/self-hosted/overview/).
