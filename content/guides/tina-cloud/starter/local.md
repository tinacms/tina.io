---
title: Run Tina Cloud Starter Locally
last_edited: '2021-05-10T10:00:00.000Z'
---

## Fork the repository

⚠️⚠️ Start by [**forking** the repositorty](https://github.com/tinacms/tina-cloud-starter) and then pull it down to your computer. ⚠️⚠️

## Install

> ℹ️ This project uses `yarn` as a package manager, if `yarn` isn't installed on your machine, open a terminal and run `npm install -g yarn`

Install the project's dependencies:

```
yarn install
```

> ⚠️ If you'd like to use `npm` beware that there is no `package-lock.json` so we can't guarantee the dependencies are the same for you.

## Run the project locally

Copy the sample `.env.local.sample` file and run the local development server:

```
cp .env.local.sample .env.local
```

```
yarn dev
```

> In your .env.local file `NEXT_PUBLIC_USE_LOCAL_CLIENT` should be set to `1`, other values can be ignored for now.

This command starts the GraphQL server and the Next.js application in development mode. It also regenerates your schema types for TypeScript and GraphQL so changes to your `.tina` config are reflected immediately.

One of the most interesting aspects of the Tina Cloud Content API is that it doesn't actually require anything from the Cloud to work locally. Since Tina is by default a Git-backed CMS, everything can be run from your local filesystem via the CLI. 😎 

This is ideal for development workflows and the API is identical to the one used in the cloud, so once you're ready to deploy your application you won't face any challenges there.

Open [`http://localhost:3000`](http://localhost:3000) in your browser to see your file-based content being loaded from the GraphQL API.

## Edit content locally

In the right-hand corner, click the "Edit this page" button. You'll see the page refresh and Tina will be enabled.

Click on the pencil in the lower left-hand corner to open Tina's sidebar which displays a form with fields you can edit and see update live on the page. Since we're working locally, saving results in changes to your local filesystem.

<div style="position: relative; padding-bottom: 61.155152887882224%; height: 0;"><iframe src="https://www.loom.com/embed/357f858c7e634637a1b67671203d76fd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

From here, you're ready to start building your own project, to read a little bit about how this project is structured, and how to modify it to make it your own,
read the [folder structure](/guides/tina-cloud/starter/structure/) section.

When you're ready to deploy your site, read on about how you can connect to Tina Cloud and make authenticated changes via our Cloud API.
