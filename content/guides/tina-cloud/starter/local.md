---
title: Run Tina Cloud Starter Locally
last_edited: '2021-08-26T13:33:47.873Z'
---
## Initial Setup

In the previous step, you forked the <a href="https://github.com/tinacms/tina-cloud-starter" target="_blank">tina-cloud-starter</a>. Now, **clone** this repository and ensure this is your working directory.

## Install

> ℹ️ This project uses `yarn` as a package manager, if `yarn` isn't installed on your machine, open a terminal and run `npm install -g yarn`

Install the project's dependencies:

    yarn install

> ⚠️ If you'd like to use `npm` beware that there is no `package-lock.json` so we can't guarantee the dependencies are the same for you.

## Run the project locally

    yarn dev

This command starts the GraphQL server and the Next.js application in development mode. It also regenerates your schema types for TypeScript and GraphQL so changes to your `.tina` config are reflected immediately.

One of the most interesting aspects of the TinaCMS Content API is that it doesn't actually require anything from the Tina backend to work locally. Since Tina is by default a Git-backed CMS, everything can be run from your local filesystem via the CLI. 😎

This is ideal for development workflows and the API is identical to the one used when working with the backend, so once you're ready to deploy your application you won't face any challenges there.

Open <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> in your browser to see your file-based content being loaded from the GraphQL API.

## Edit content locally

To enter edit mode, navigate to the `/admin` route in the URL. This will prompt you to log in to Tina Cloud and will prompt you to either return to the page you were on or return to the home page.

Next, click on the pencil in the lower left-hand corner to open Tina's sidebar which displays a variety of forms with fields you can edit and see updates live on the page. Since we're working locally, clicking save results in changes to your local filesystem.

![tina-cloud-starter](/img/tina-cloud-starter.jpg)

Make some changes, build your own components and experience contextual editing with Tina. As fun as this is, you'll likely want to collaborate with others and view changes on a publicly available URL. To do that, in the next step we'll connect to Tina Cloud.

> Hint: To exit edit mode, navigate to the `/exit-admin` route.  If you are running on `localhost`, it is `http://localhost:3000/exit-admin`.