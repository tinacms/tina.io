---
title: Using the Tina Editor
id: /docs/using-tina-editor/
last_edited: '2022-01-09T00:00:00.000Z'
next: '/docs/schema'
---

Tina is very flexible & extendable, so any Tina site may have a unique experience. As an introduction, we'll cover the out-of-the-box experience that most of our starters implement.

## Entering the Admin

When Tina is initialized on a NextJS site, a "/admin" page is created to allow editors to log in and begin to make content changes.

![Tina Login Page](/img/tina-login.png)

After successfully logging in, the user will land in the Admin with the Dashboard and Main Navigation.

## Using the Admin

![Tina Editor Dashboard](/img/tina-dashboard.png)

Depending on how Tina is configured, one or more Collections will appear in the Main Navigation. Clicking on a Collection will take the user to a Document List page for that Collection.

![Tina Editor List Page](/img/tina-list-page.png)

The table here lists all existing Documents for that Collection. This page also allows the user to create a new Document.

If "Contextual Editing" has been configured for Tina, clicking on an existing Document will route the user to that Document's Preview Page with the Tina Sidebar open and ready for editing.

![Tina Editor Contextual Editing](/img/tina-contextual-editing.png)

However, if "Contextual Editing" is not configured or simply not available for a particular Collection, clicking on an existing Document will present the user with a fullscreen form.

![Tina Editor Standard Editing](/img/tina-standard-editing.png)

> Note: You can learn more about how to set up "Contextual Editing" for your users [here](/docs/tinacms-context).

Once saved, the changes to the Document, whether in "Contextual Mode" or "Fullscreen Mode", will be stored against the files.

## What's Next?

There's plenty to do to customize your editing experience. We suggest:

- Checking out [our concept docs](/docs/schema/), to learn how Tina powers the starters under the hood.
- Learn how [Tina can be extended](/docs/advanced/extending-tina/) to create new field components
- Make your site [editable with Tina on production](/docs/tina-cloud/)
