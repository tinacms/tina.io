---
title: Creating our Application
last_edited: '2021-08-13T17:36:53.377Z'
---

## Create a Next.js application

> Note: If you already have a NextJS site, you can skip this first step.

We are going to be using the Next.js Blog Starter for this guide, so from your terminal run the following:

```bash
npx create-next-app --example blog-starter tina-quickstart

cd tina-quickstart
```

## Adding Tina

We created a quick way to bootstrap a Tina application to show the power of visual editing, from your terminal enter the following command:

```bash,copy
npx @tinacms/cli@latest init
```

This command does a few things in your Next.js application:

1. Install all required dependencies for Tina
2. Define a basic schema that is easily extendable, in the `.tina` directory
3. Wrap your next.js application with Tina so that any page can be easily edited.
4. Create example content in the demo directory.
5. Edit the `package.json` to add scripts to launch tina (tina-dev, tina-build, tina-start)

### A quick test

Now that we have a basic Tina setup you can launch your application using the following commmand:

```bash,copy
yarn tina-dev
```

Once you have launched the application you have a couple of new URLS:

- `http://localhost:3000/demo/blog/HelloWorld`
- `http://localhost:4001/altair/`

The first URL brings you to a demo of TinaCMS, it will show you the power of Tina and also give you some informational links you check out. If you navigate to http://localhost:3000/demo/blog/HelloWorld, you won't be able to edit right away. Firstly you need to enter edit mode, to enter edit mode, navigate to http://localhost:3000/admin you will enter into edit mode. Selecting the pencil in the bottom left allows you to edit the title and the body of the page right in the frontend. When you hit save, that will save your changes to the Markdown file.

> Want to see your changes? Open up the file located at `/content/HelloWorld.md` and the changes you've made will be there!

<video controls autoplay=true muted loop>
<source src="https://res.cloudinary.com/forestry-demo/video/upload/v1645712750/tina-io/docs/tina-init.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>

> This works by using our Content API which will go into greater depth during this guide.

The second URL http://localhost:4001/altair/ will launch to a graphQL client that will allow you to interact and create queries which we will do in this guide.
