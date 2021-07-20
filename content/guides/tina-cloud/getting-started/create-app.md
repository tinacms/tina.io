---
title: Creating our Application
last_edited: '2021-07-19T10:00:00.000Z'
---

### Create a Next.js application

```bash
npx create-next-app --example blog-starter tina-quickstart

cd tina-quickstart
```

### Adding Tina

We created a quick way to bootstrap a Tina application to show the power of visual editing, from your terminal enter the following command:

```bash,copy
npx tina-graphql-gateway-cli init
```

This command does a few things in your Next.js application:

1. Install all required dependencies for Tina
2. Define a basic schema that is easily extendable, in the `.tina` directory
3. Wrap your next.js application with Tina so that any page can be easily edited.
4. Create example content in the demo directory.
5. Edit the `package.json` to add scripts to launch tina (tina-dev, tina-build, tina-start)

Now that we have a basic Tina setup you can launch your application using the following commmand:

```bash,copy
yarn tina-dev
```

Once you have launch the application you have a couple of URLs to navigate to:

- http://localhost:3000/demo/blog/HelloWorld
- http://localhost:4001/altair

The first one will bring you to the frontend with the ability to edit the title of the post and the second will alllow you to interact with your GraphQL layer .

### A quick test.

Now that we have a basic Tina implementation we should give it a quick test before making the rest of the site editable. Using the URL mentioned above you should see the following screen:

![Instructions to add your Next.js app in edit state](https://res.craft.do/user/full/c67cad1b-6dc6-4909-0f8e-19d468ba9fd4/doc/A8636858-4B8D-4C7C-839D-30ACB08EFBD3/40389D93-8802-4E63-A184-8ADA6FD88114_2/Screen%20Shot%202021-07-12%20at%2010.29.18%20AM.png)

Selecting the pencil in the bottom left allows you to edit the title and the body of the page right in the frontend. When you hit save, that will save your changes to the Markdown file.

> This works by using our Content API which will go into greater depth during this guide.