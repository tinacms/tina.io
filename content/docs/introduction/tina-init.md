---
title: Adding Tina to an Existing Site
id: /docs/introduction/tina-init/
last_edited: '2022-02-04T15:51:56.737Z'
next: '/docs/using-tina-editor'
---

> Note: This doc assumes that you have a working site. If not, you can quickly get started using one of our [NextJS starters](/docs/introduction/using-starter/).

## Adding Tina

We created a quick way to bootstrap a Tina application to show the power of visual editing; from your terminal, enter the following command:

```bash,copy
npx @tinacms/cli@latest init
```

_For help with the prompts for non-NextJS based sites, see [this guide](/docs/frameworks/other/)._

This command will ask you a few questions, and sets up the Tina boilerplate in your application:

1. Installs all required dependencies for Tina.
2. Defines a basic content schema in the `.tina` directory.
3. Creates example content in the demo directory.
4. **(NextJS-only)**: Edits the `package.json` to have the `dev`, `build`, and `start` scripts run the tina GraphQL API.

### Updating your build scripts

Depending on your framework, `tina init` may try to update your `package.json` scripts.

#### NextJS Example

```json
  "scripts": {
    "dev": "tinacms dev -c \"next dev\"",
    "build": "tinacms build && next build",
    "start": "tinacms build && next start"
  }
```

#### Hugo Example

```json
  "scripts": {
    "dev": "tinacms dev -c \"hugo server -D\"",
    "build": "tinacms build && hugo"
  }
```

These should be applied manually if they haven't been set by the CLI.

### A quick test

Now that we have a basic Tina boilerplate setup, you can launch your application using the following commmand:

```bash,copy
yarn dev
```

When Tina is initialized on a NextJS site, a "/admin/index.html" page is created to allow editors to log in and begin to make content changes.

Now, if you navigate to `http://localhost:3000/admin/index.html` (assuming your site runs on port 3000), you should see a new CMS landing page has been added to your site!

> Note, many frameworks offer a way to redirect `/admin/index.html` to `/admin`.

![Tina Login Page](/img/tina-login.png)

Next we'll show you how to use the CMS and start editing some content!
