---
title: Getting Started
id: /docs/setup-overview/
last_edited: '2021-10-18T15:51:56.737Z'
next: '/docs/schema'
---

## Quick Setup

To quickly setup a new Tina starter, from the command line, run:

```bash
npx create-tina-app
# or
yarn create tina-app
```

To run the starter, `cd <your-starter-name>` into its new directory & run:

```bash,copy
yarn dev
```

### Testing out Tina

To start editing, with the starter running, navigate to http://localhost:3000/admin. This allows you to enter edit-mode. Now navigate back to any page, start making edits, and see your local markdown files being updated!.

<video controls autoplay=true muted loop>
<source src="/gif/tina-init.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>

> ## Already have a NextJS site?
>
> The tina `init` command can be used to bootstrap Tina within your existing NextJS application.
> If you're looking to setup Tina on an existing NextJS, [checkout our guide](/guides/tina-cloud/add-tinacms-to-existing-site/overview/)

## What's next?

There's plenty to do to customize your editing experience. We suggest:

- Checking out [our concept docs](/docs/schema/), to learn how Tina powers the starters under the hood.
- Learn how [Tina can be extended](/docs/advanced/extending-tina/) to create new field components
- Make your site [editable with Tina on production](/docs/tina-cloud/)
