---
title: Tina Cloud Alpha FAQ
---

## What is the Tina Cloud Alpha release?

The Tina Cloud Alpha release gives early adopters the chance to test visual content editing and our Git-backed content API!

Tina Cloud brings together Tina's open-source content editor with a GraphQL API that talks to content stored in your repository (ie. Markdown and soon JSON).

## Where do I start?

- Have a look at the updated [Tina Cloud docs](https://tina.io/docs/)
- Try the [Next.js starter site](https://github.com/tinacms/tina-cloud-starter) (fork it, then follow the readme)
- Follow the Tina Cloud [getting started guide](https://tina.io/guides/tina-cloud/existing-site/overview/)
- [Sign up to Tina Cloud](https://auth.tina.io/register)!
- [Find us on Discord](https://discord.gg/6RrAXJws)

## What do I need to know about working with the Alpha release of Tina Cloud?

Since this is an Alpha release you should expect to run into bugs occasionally or be required to update your code because of API improvements.

These features are not (yet) included in Tina Cloud and you might miss them:

- A media management solution
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
- Connect with us on [Discord](https://discord.gg/6RrAXJws).
- We can help you at support@tina.io. Email us if you would like to schedule a chat!
- Chat with us from your Tina Cloud dashboard (there's a chat widget at the bottom of the screen on the left side).

## What is the pricing for Tina Cloud?

There will be no cost for small teams to use Tina Cloud while it is in Alpha.

A fair use policy will be coming soon.

We will contact you if we believe your use case may eventually fit within our post-beta paid plans.
