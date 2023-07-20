---
title: Product Tour
id: /docs/product-tour/
last_edited: '2022-01-17T15:51:56.737Z'
next: '/docs/setup-overview'
---

## Introduction

TinaCMS is an open-source Content Management System (CMS) that seamlessly integrates with your Markdown workflow.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif)

## The CMS Backend

- The TinaCMS backend provides the API for querying your content, offering support for filtering, searching, and pagination.

![](https://placehold.co/600x400?text=Backend+Image)

### Tina Cloud

- Out of the box, we provide an easy-to-use hosted version of the backend, called Tina Cloud.

![](https://placehold.co/600x400?text=Fade+To+Tina+Cloud+Path)

### Self-hosted Backend

- For those preferring more control and customization, TinaCMS also allows you to host the backend entirely on your own stack.

![](https://placehold.co/600x400?text=Fade+To+Self+Hosted+Path)

### Git-Sync

- Regardless of whether you're using Tina Cloud or a self-hosted solution, TinaCMS syncs with your Git repository.

![](https://placehold.co/600x400?text=Show+Git+Sync_Diagram)

## The CMS Frontend

- The intuitive TinaCMS user interface is accessible via an `/admin` page on your site.

![](https://placehold.co/600x400?text=Show+admin+URL)

### Visual Editing

- On React sites, TinaCMS enables "Visual Editing" to allow content editors to see real-time changes, thus improving the content creation process.

![](https://placehold.co/600x400?text=Visual+Editing)

### Saving

- When users make a change in the CMS, a commit is made back to your Git repository.

![](https://placehold.co/600x400?text=Show+Commit+Msg)

## Integrating TinaCMS into a site

TinaCMS can be setup on your site with `tinacms init`. This installs a few Tina packages, and add some boilerplate

![](https://placehold.co/600x400?text=CLI+INIT)

### Running TinaCMS Locally

- You also have the flexibility to run TinaCMS locally, sourcing local files instead of interacting with the hosted API, making it ideal for offline or isolated environments.

![](https://placehold.co/600x400?text=Show+Local+Dev)

### Content Modelling

- Content in TinaCMS is modelled using a `tina/config.ts` file in your project. Through this, you can define "collections" that model various content types on your site.

![](https://placehold.co/600x400?text=Content+Modelling+Code+Snippet)

### Data-fetching

- TinaCMS provides a GraphQL API, making data-fetching more efficient and powerful.

![](https://placehold.co/600x400?text=GraphQL+Query)

### Client

- Moreover, we also generate a user-friendly client that simplifies the process of querying your content.

![](https://placehold.co/600x400?text=Client+Query)

### Type-safety

- TinaCMS emphasizes type safety, ensuring your content queries remain error-free and consistent, thus improving code reliability and maintainability.

![](https://placehold.co/600x400?text=Type+Safety+Example)
