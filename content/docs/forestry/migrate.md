---
title: Migrate from Forestry
id: '/docs/forestry/migrate/'
next: '/docs/forestry/accessing-cms'
---

## Introduction

TinaCMS can be added to your site locally. In this doc, we'll guide through the local setup, as well as editing on your production site.

## Getting Started

From within your site's directory, run:

```bash
 npx @tinacms/cli@latest init
```

This will ask you a few questions, and eventually drop the Tina boilerplate in your project.

You can start TinaCMS with:

```bash
npx tinacms dev -c "<your-dev-process>"
```

> E.g: For a Hugo site, this might look like: `npx tinacms dev -c "hugo server -D -p 1313"`

With TinaCMS running, navigate to `http://localhost:1313/admin`

> ^ The above default port may differ depending on your framework.

At this point, you should be able to see the Tina admin, select a dummy post, save changes, and see the changes persisted to your local markdown files.

![](/img/hugo-tina-admin-screenshot.png)

## Model your content

Out of the box, there is a content model created for a "dummy-post".
In Forestry, your content models were defined as "Front Matter Templates", but in TinaCMS, these are called "Collections". These are defined in your `.tina/config.js` file. You can update the dummy collection to map to a real model used on your site:

```diff
// ...
schema: {
  collections: [
    {
-      name: "post",
+      name: "<name-of-your-model>",
-      label: "Posts",
+      label: "<readable-label-of-your-model>",
-      path: "content/posts",
+      path: "<path-to-models-directory>"
      fields: [
-     {
-         type: "string",
-         name: "title",
-         label: "Title",
-         isTitle: true,
-         required: true,
-     },
      {
         type: "rich-text",
         name: "body",
         label: "Body",
         isBody: true,
      },
      // See https://tina.io/docs/schema/
      // for help modelling your fields
      ],
    },
  ],
}
// ...
```

To test out Tina, you might want to start by modeling a single collection with a single field. The "body" field above is a good test, to demo any markdown file with a body below its frontmatter.

You can lean more about content modelling in Tina's [content modeling docs](https://tina.io/docs/schema/).

## Deploy Tina to your site

Next we'll take you from editing with TinaCMS locally, to editing in production with your team.

### Step 1) Push your repo to git

Push your repo up to git, along with its new Tina configuration (including `.tina/__generated__`).

### Step 2) Setup a Tina Cloud project

In production, we'll want to make sure only authorized users can access your Tina admin, and make changes to your content. You can setup a [Tina Cloud project](https://app.tina.io/) to handle this.
Once your project is created, you'll also need to generate a read-only-token.

See our [Tina Cloud docs](https://tina.io/docs/tina-cloud/) for help using Tina Cloud.

### Step 3) Connect the Tina Cloud config to your site

Locally, in your .tina/config.js file, set the following config properties:

```diff
export default defineConfig({
// ...
-    clientId: null,
+    clientId: "<your-tina-cloud-projects-client-id>",
-    token: null,
+    token: "<your-tina-cloud-projects-token>"
```

> You should apply the token above in an environment variable, instead of hardcoding it.

### Step 4) Configure build commands

Tina's build will need to be apart of your site's static generation.
If you are using Netlify, this is configured in `app.netlify.com/sites/<your-site-id>/settings/deploys`

You should prepend `yarn tinacms && ` or `npm run tinacms && ` to your site's build command:

![](https://res.cloudinary.com/forestry-demo/image/upload/v1670337650/tina-io/docs/forestry-migration/Screen_Shot_2022-12-06_at_10.38.10_AM.png)

### Step 5) Start using Tina!

With that set, you should be able to push your config to Git and start editing on production at `<your-site-url>/admin`!

> Tip: If you have Netlify or Vercel previews set up, you can even edit on `<your-preview-url>/admin`.

At this point, you'll be able to edit one of your site's files in production. Next we'll guide you through setting up some other Forestry-supported features like media, data files,
