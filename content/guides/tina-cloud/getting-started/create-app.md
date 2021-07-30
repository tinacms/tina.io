---
title: Creating our Application
last_edited: '2021-07-19T10:00:00.000Z'
---

## Create a Next.js application

```bash
npx create-next-app --example blog-starter tina-quickstart

cd tina-quickstart
```

## Adding Tina

We created a quick way to bootstrap a Tina application to show the power of visual editing, from your terminal enter the following command:

```bash,copy
npx @tinacms/cli init
```

> Heads up, this will override the `_app.js`, which has a stylesheet in it. Make sure to add it back otherwise the styles will be broken.

Your import section should now look like

```diff 
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
+ import "../styles/index.css"

...
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

Once you have launch the application you have a couple of new URLS:

- `http://localhost:3000/demo/blog/HelloWorld`
- `http://localhost:4001/altair/`

The first URL brings you to a Tina Page, this Tina page describes how to continue setting up your application, but you can also edit the Title and Body above the small guide. 

If you navigate to http://localhost:3000/demo/blog/HelloWorld, you won't be able to edit right away. Firstly you need to enter edit mode, to enter edit mode, navigate to http://localhost:3000/admin you will enter into edit mode. Selecting the pencil in the bottom left allows you to edit the title and the body of the page right in the frontend. When you hit save, that will save your changes to the Markdown file.

<video controls autoplay muted loop>
  <source src="/gif/tina-init.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

> This works by using our Content API which will go into greater depth during this guide.

The second URL http://localhost:4001/altair/ will launch to a graphQL client that will allow you to interact and create queries which we will do in this guide.
