---
title: Getting Started
id: /docs/setup-overview/
last_edited: '2021-10-18T15:51:56.737Z'
next: '/docs/schema'
---

## Quick Setup

To quickly setup a new Tina starter, from the command line, run:

```bash
npx create-next-app --example https://github.com/tinacms/tina-cloud-starter
# or
yarn create next-app --example https://github.com/tinacms/tina-cloud-starter
```

To run the starter, run:

```bash,copy
yarn dev
```

### Testing out Tina

To start editing, with the starter running, navigate to http://localhost:3000/admin. This allows you to enter edit-mode. Now navigate back to any page, start making edits, and see your local markdown files being updated!.

## Manual Setup (on an existing site)

The tina `init` command can be used to bootstrap Tina within your existing NextJS application.

From the command line, run:

We created a quick way to bootstrap a Tina application to show the power of visual editing, from your terminal enter the following command:

```bash,copy
npx @tinacms/cli@latest init
```

Now run you project along with the Tina graphql API with:

```bash,copy
yarn tina-dev
```

### Testing out Tina

> Let's assume your local site runs on port 3000.

Navigate to http://localhost:3000/demo/blog/HelloWorld. This is a new page created for you for demo purposes. You won't be able to edit right away, you'll first need to enter edit mode.

To enter edit mode, navigate to http://localhost:3000/admin.

Selecting the pencil in the bottom left allows you to edit the title and the body of the page right in the frontend. When you hit save, that will save your changes to the Markdown file.

> Want to see your changes? Open up the file located at `/content/HelloWorld.md` and the changes you've made will be there!

<video controls autoplay=true muted loop>
<source src="/gif/tina-init.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
