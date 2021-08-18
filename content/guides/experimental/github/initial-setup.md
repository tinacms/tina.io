---
title: Initial Setup
---

This guide will help you set up a Github backend with Tina using [_create-next-app_](https://nextjs.org/docs#setup).

The [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) offered by Next.js allows us to load a separate set of data [depending on the "edit" (or "preview") mode](/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode). With the help of the GitHub API, editors can fork or branch off the repository, make changes, and create a pull request from the Tina UI.

This type of backend can support [Open Authoring](/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode) workflows for public repositories, where anyone (with a GitHub account) can submit content changes for review. This guide will show you how to implement open authoring, but you can also set up the GitHub backend for a [private repository](/guides/nextjs/github/configure-custom-app#private-repositories).

![tinacms visual open authoring gif](/gif/open-auth.gif)

> Feel free to reference this [demo repository](https://github.com/kendallstrautman/tina-open-auth). The commits roughly correlate with specific steps outlined in this guide.

## Using _create-next-app_

Let's set up a [fresh install](https://nextjs.org/docs#setup) of _create-next-app_ and create a [new repository](https://github.com/new) in GitHub. It is important this repository is _public_, otherwise the GitHub Helpers won't know how to find your content.

Open up your terminal. Navigate to where you'd like this project to live and run:

```bash,copy
yarn create next-app
```

Name your project, then choose the 'Default Starter' from the terminal options. Go ahead and navigate into that project and start the development server.

```bash,copy
cd your-project-name
yarn dev
```

![fresh-create-next-app-install](/img/github-open-auth-cna/create-next-app.png)

Navigate to http://localhost:3000/ and you should see something like the image above. Now you can commit and push this `create-next-app` to your new GitHub repository.

> _Note:_ This guide assumes you are following along with a fresh _create-next-app_. However, **if you're configuring your own project**, you will want to make sure your project conforms to the following requirements:
>
> - Uses Next.js >= 9.3
> - Is stored in a **public** GitHub repository
> - Is hosted with [Vercel](https://vercel.com/) or another platform that can handle Preview Mode (in other words, not a static host.)

### With Typescript

The examples in this guide will use [Typescript](https://www.typescriptlang.org/). To set up your `create-next-app` with Typescript, run this in the terminal:

```bash,copy
yarn add --dev typescript @types/node @types/react
```

The next time you start the development server, Next.js will automatically create a `tsconfig.json` file and populate it with default options. You may also want to change your `pages/index.js` to `pages/index.tsx`.

## Install Tina-Github packages

Now that our `create-next-app` is set up, we can add a few Tina packages:

```bash,copy
yarn add react-tinacms-github next-tinacms-github tinacms styled-components
```

The `react-tinacms-github` package provides helpers for setting up TinaCMS to use the GitHub API, with GitHub authentication. And the `next-tinacms-github` package provides helpers for managing the GitHub auth token and loading content from the GitHub API.
