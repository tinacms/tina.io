---
title: Adding Tina to an existing NextJS site
last_edited: '2022-02-04T15:51:56.737Z'
next: '/docs/introduction/tina-init'
---

> Note: This doc assumes that our have a working NextJS site. If not, you can quickly get started using one of our [starters](/docs/introduction/using-starter/).

## Adding Tina

We created a quick way to bootstrap a Tina application to show the power of visual editing, from your terminal enter the following command:

```bash,copy
npx @tinacms/cli@latest init
```

This command does a few things in your Next.js application:

1. Install all required dependencies for Tina.
2. Define a basic content schema in the `.tina` directory.
3. Add some Tina boilerplate components.
4. Create example content in the demo directory.
5. Edit the `package.json` to add scripts to launch tina (tina-dev, tina-build, tina-start).

Now that Tina has been installed in your site, you will need to add the Tina Provider to your site's layout:

### A quick test

Now that we have a basic Tina setup you can launch your application using the following commmand:

```bash,copy
yarn tina-dev
```

Now, if you navigate to http://localhost:3000/admin (assuming your site runs on port 3000), you will be able to edit any content that is defined in the schema.

#### Edit some content

Try navigating to a blog post, editing some content, and hitting save. If you look at the underlying markdown file in your project, you will notice that its content has been updated.

### What's next:

- Learn about content modeling
- Explore Tina's expressive content GraphQL API
- Setup contextual editing on your pages.
