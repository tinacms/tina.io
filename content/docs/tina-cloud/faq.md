---
title: Tina Cloud FAQ
last_edited: '2021-08-10T18:02:19.898Z'
---

## What's the difference between Tina Cloud and TinaCMS?

TinaCMS is our original open source toolkit that enables developers to create a live editing experience on a site.

Tina Cloud brings together Tina's open-source content editor with a GraphQL API that talks to content stored in your Github repository (ie. Markdown and soon JSON). Additonally, the Tina Cloud dashboard grants authorization for other users (content creators, editors, marketers, etc) to login and edit their site.

## Where do I start?

- Have a look at the updated [Tina Cloud docs](https://tina.io/docs/)
- Try the [Next.js starter site](https://github.com/tinacms/tina-cloud-starter) (fork it, then follow the readme)
- Follow the Tina Cloud [getting started guide](https://tina.io/guides/tina-cloud/starter/overview)
- [Sign up to Tina Cloud](https://app.tina.io/register)!
- [Find us on Discord](https://discord.com/invite/zumN63Ybpf)

## What do I need to know about working with the current release of Tina Cloud?

Since this is an early release you should expect to run into bugs occasionally or be required to update your code because of API improvements.

These features are not (yet) included in Tina Cloud and you might miss them:

- A multi-branch workflow
- The GraphQL API for your content is not yet queryable with read-only tokens. That means it’s only used while editing content with Tina.

## What technical considerations should I make when working with Tina Cloud?

You'll find success with Tina Cloud if your project includes:

- [Next.js](https://nextjs.org/) - The flexibility of this fantastic React framework lowers the bar to build with Tina Cloud.
- GitHub - The first Git provider that Tina Cloud integrates with. Other Git providers may be available in the future.
- Static, file-based builds - The Tina Cloud client collects your filesystem content at build time. The ability to fetch content from our cloud API during builds will come soon.

The [Next.js starter](https://github.com/tinacms/tina-cloud-starter) can get you up and running quickly with the above considerations. Give it a try and let us know how we can make developing with Tina easier.

## How can I share an idea or get help using Tina Cloud?

- If you haven't checked yet, the [docs](/docs/) may have the answer you are looking for!
- Connect with us on [Discord](https://discord.com/invite/zumN63Ybpf).
- We can help you at support@tina.io. Email us if you would like to schedule a chat!
- Chat with us from your Tina Cloud dashboard (there's a chat widget at the bottom of the screen on the left side).

## What is the pricing for Tina Cloud?

There will be no cost for small teams to use Tina Cloud while it is in Alpha.

A fair use policy will be coming soon.

We will contact you if we believe your use case may eventually fit within our post-beta paid plans.

## Tina.io Login window doesn't close when logging in from a site

When a user logs in from your site, we will pop open a login window. When login is complete, we will attempt to send a message back to the main window.

The most common reasons for this issue are:

- The Site URL is not properly set for the Tina project. The main window's base URL will need to match the Tina project's Site URL setup in the Tina Cloud Dashboard.
- The Client ID setup in your site's environment variables does not match the Client ID in your project's settings on the Tina Cloud dashboard.
- The user attempting to login to Tina Cloud does not have access to edit this site. Ensure that this user is authorized on the Tina Cloud dashboard.

> Make sure to include `https` in the Site URL eg: https://forestry.io or if you are testing locally, it might be something like http://localhost:3000
