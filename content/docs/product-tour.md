---
title: Product Tour
id: /docs/product-tour/
last_edited: '2022-01-17T15:51:56.737Z'
next: '/docs/setup-overview'
---

To understand the power of Tina, let us first break down Tina into its components.

## Tina CLI

![TinaCMS CLI](https://res.cloudinary.com/forestry-demo/image/upload/v1642516210/img/create-tina-app.png 'Setup a project with TinaCMS CLI')

TinaCMS CLI is a quick and easy way to set up a project with Tina. The CLI can inject Tina into a pre-existing Next.js site, or create a Tina starter site (see our list of [starters](https://app.tina.io/quickstart)) with Tina pre-configured.

A Tina-ified site includes:

- A Tina config file that be used to structure your content and configure Tina.
- A local version of the Tina GraphQL API (see below!) used to fetch your content.

The Tina schema file is used to define the shape of your content. To learn more about content modelling within the Tina schema file, click [here](/docs/schema).
For a list of CLI commands or to learn more about Tina’s CLI, click [here](/docs/cli-overview).

## Tina GraphQl API

![Tina GraphQL API](https://res.cloudinary.com/deuzrsg3m/image/upload/v1651008834/carbon_csq54s.png "Fetch data using Tina's GraphQL API")

Tina’s GraphQL API provides a structured API that can be used to fetch your site’s content. This GraphQL API uses your local filesystem as a database. When you define your schema in the Tina schema file, the Tina GraphQL API will generate queries specific to your schema.

When running your site locally, Tina spins up a local GraphQL server at `http://localhost:3000` as well as an Altair client at `http://localhost:4001/altair/` . This allows developers to test out the API and its file fetching capabilities.

> When running your site in production with Tina Cloud, instead of the local GraphQL server, your site will run using our hosted content API (more info below!).

For more info on Tina’s GraphQL API or to understand content fetching, click [here](/docs/features/data-fetching).

## Tina Editing UI

Tina's editing UI is compiled statically into the sites public directory. This allows Tina to be used in any site, regardless of the framework it is built with.

When a Tina site is served, navigating to the `/admin` (or `/admin/index.html`) route takes you to the Tina editing UI. This UI is used to edit content and manage your site’s content.

For more info on Tina’s editing UI, click [here](/docs/using-tina-editor).

Tina has two editing modes. Basic editing, which allows an editor to edit in a "basic editor" and visual editing which can be used on any Reactive site (currently only support react).

### Visual editing

![Real-time editing with TinaCMS and Tina Cloud](https://res.cloudinary.com/forestry-demo/image/upload/v1619023278/tina-cms-visual-editing.gif 'Real-time editing with TinaCMS and Tina Cloud')

Tina’s sidebar editor allows users to make changes to text, styling or components. Tina’s sidebar editor is set up on the frontend of your site and can be customizable to suit the needs of your site.

To learn more about visual editing and setting up the sidebar, click [here](/docs/tinacms-context).

## Tina Cloud

![Tina Cloud Dashboard](https://res.cloudinary.com/forestry-demo/image/upload/v1642524904/tina-dashboard.png 'Tina Cloud Dashboard')

Tina Cloud is our final piece to providing a full content management experience!

When working with Tina in a local environment, **changes made through the Tina sidebar editor are saved locally to your content files** using the local GraphQL API. When editing with Tina Cloud, **edits are saved directly to GitHub** using our hosted content API. The Tina Cloud Dashboard enables you to connect Tina Cloud to your site’s GitHub repo.

Additionally, when a site is configured with Tina Cloud, the editing capability is set behind an authentication wall. This allows only authorized users to make changes to your site. The Tina Cloud Dashboard enables you to invite other users, thus granting them access to edit content on your site and permitting their changes to reflect directly in GitHub.

Currently Tina Cloud is free to sign up - check it out [here](https://app.tina.io/register)! Or to learn more about Tina Cloud, click [here](/docs/tina-cloud).
