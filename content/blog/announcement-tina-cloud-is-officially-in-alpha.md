---
title: Tina Cloud is in public Alpha
date: '2021-06-01T20:00:00-04:00'
author: James Perkins
last_edited: '2021-06-01T13:09:59.131Z'
---
The team at Tina is pleased to announce that [Tina Cloud](/cloud/) is officially in public Alpha. Everyone is encouraged to register a free account on our headless GitHub-backed CMS and start committing. We have been working incredibly hard behind the scenes to get our vision in the hands of developers and content teams.

Tina Cloud brings the power of Tina's open-source content editor with [a GraphQL API that allows you to interact with your Markdown files stored in your repository](/blog/using-graphql-with-the-filesystem/). Also, with Tina Cloud, you can allow _any_ team member to edit content — even if they don’t have a GitHub account.

When we [launched TinaCMS](https://www.youtube.com/watch?v=iPDCmbaEF0Y), it was mainly an open-source Javascript UI for editing your site, visually.

![Real-time editing of a Next.js + Tailwind CSS site with Tina’s sidebar.](https://res.cloudinary.com/forestry-demo/image/upload/v1619023278/tina-cms-visual-editing.gif "Real-time editing of a Next.js + Tailwind CSS site with Tina’s sidebar.")

At that time, TinaCMS was just a 3-month-old, open-source project and we relied on developers to roll their own solution for user management, authentication, roles, content storage, and more. But we quickly learned that developers need more out-of-the-box to get their teams successful.  With Tina Cloud, we're staying true to our vision of Git-backed content management, but with a batteries-included experience.

## What to Expect with the Tina Cloud Alpha?

Tina cloud is still being actively developed, and is in a place we believe you can have a great experience with it. You may run into issues we didn't run into yet or be required to update to the latest version because we have improved our API.

Tina cloud is missing some features which we will be adding in the near future:

* Media Management Solution
* Multi-branch workflows
* Read-only tokens for our GraphQL API. That means it's only used when you are editing content.

## What tech stack should be used with Tina Cloud

* [**Next**](https://nextjs.org/)**.js**: Next.js is a perfect match for our product and is the default choice for everyone at the company.
* [**GitHub**](https://github.com):  GitHub is required as it is the only Git provider we support on Tina Cloud currently, in the future we hope to bring on others.
* **Static, file-based builds**: When you go to build our Tina Cloud product collects your filesystem content, in the future, you will be able to fetch data from our cloud API during build times.

## How can I get started?

The first thing you will want to do is signup for [Tina Cloud](https://auth.tina.io/register), once you have signed up for the Alpha, the Tina team has created a few ways to get started with Tina Cloud and get up and running in minutes.

* [Tina Cloud Starter](): A basic implementation of Tina Cloud that allows you to get up and running in a few minutes.
* [Add Tina Cloud to an existing site](https://tina.io/guides/tina-cloud/existing-site/overview/) - We provide a guide to show you have to take the Next.js starter and add Tina Cloud.

## Where can I give feedback or get help?

We have opened a few channels for you to be able to reach out and provide us with feedback or get help with any challenges you may have.

* Connect with us on [Discord](https://discord.gg/6RrAXJws).
* We can help you at [support@tina.io](mailto:support@tina.io). Email us if you would like to schedule a chat!
* Chat with us from your Tina Cloud dashboard (there's a chat widget at the bottom of the screen on the left side).
* Dig into the [documentation](https://tina.io/docs/tina-cloud/) that covers Tina Cloud implementations.

## What about pricing?

We are still deciding out what we believe will be fair pricing for people who decided to use Tina Cloud. During the Alpha, Tina Cloud will be at no cost for small teams and we will contact you if we believe your use case may eventually fit within our post-beta paid plans.

## Please reach out

The whole team is truly excited to enter a public Alpha phase and hope you will check it out and give us honest feedback. We wanna hear about your projects, let us know how Tina Cloud can help your team make progress.

To keep up to date with Tina goings-on make sure to follow [@tina_cms](https://twitter.com/tina_cms) and [@jamesr_perkins](https://twitter.com/james_r_perkins) on Twitter.

Stay tuned for further improvements, features, community-built projects and more!