---
title: Using the Tina Editor
id: /docs/using-tina-editor/
last_edited: '2021-12-03T00:00:00.000Z'
next: '/docs/schema'
---

Tina is very flexible & extendable, so any Tina site may have a unique experience. Here we'll document the out-of-the-box approach that most of our starters use.

## Entering Edit-mode

When Tina is initialized on a NextJS site, a "/admin" page is created to allow editors to login.

> Note: For demo purposes, some of our starters show a "Edit with Tina" link to the "/admin". This can be removed on production sites.

![tina-tailwind-starter](/img/using-tina/starter.png)

On the "/admin" page, you will see a "Log In" button.

> Note: When working in local-mode, you will not actually need to log in. In production-mode, only authorized users will be able to enter edit-mode on your site.

![tina-admin](/img/using-tina/admin.png)

Clicking "Log in" will put the user in "edit-mode" and take you back to the homepage.

## Editing the content

Once in edit-mode, you should see a little pencil icon in the bottom left corner.

Try clicking it and making some changes to the content!

![using-tina-sidebar](/img/using-tina/sidebar.gif)

Once you hit "Save Changes"..

- In "Local Mode", any changes that you make will be saved to the local Markdown/JSON files.

![tina-markdown](/img/using-tina/markdown.png)

- In "Production Mode", any changes that you make will be committed to the GitHub repository.

## What's next?

There's plenty to do to customize your editing experience. We suggest:

- Checking out [our concept docs](/docs/schema/), to learn how Tina powers the starters under the hood.
- Learn how [Tina can be extended](/docs/advanced/extending-tina/) to create new field components
- Make your site [editable with Tina on production](/docs/tina-cloud/)
