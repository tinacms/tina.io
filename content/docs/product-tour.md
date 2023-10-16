---
title: Introduction to TinaCMS
id: /docs/product-tour/
last_edited: '2022-01-17T15:51:56.737Z'
next: '/docs/setup-overview'
---

Here we give a quick **2 minute overview of TinaCMS**, and how it fits into your website.

> If you're instead just looking to quickly get started, jump to our [Getting Started Guide](/docs/setup-overview/).

## Introduction

TinaCMS is an open-source Content Management System (CMS) that seamlessly integrates with your Markdown workflow.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif)

### Your Website

- With TinaCMS, The developer hosts the site where they like, using whichever framework they choose.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874025/tina-io/docs/product-tour/headless_cms1.png)

### Headless CMS

- TinaCMS is "Headless", meaning it's decoupled from your website. TinaCMS provides a queryable content API that your website's code consumes.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874025/tina-io/docs/product-tour/headless_cms2.png)

## The CMS Backend

- The TinaCMS backend provides the API for querying your content, offering support for filtering, searching, and pagination.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/queryable_database.png)

### Git-backed Content

- All your content gets backed by git into JSON/Markdown/MDX files

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874025/tina-io/docs/product-tour/git-backed.png)

### Tina Cloud

- Out of the box, we provide an easy-to-use hosted version of the backend, called Tina Cloud.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/tina-cloud.png)

### Self-hosted Backend

- For those preferring more control and customization, TinaCMS also allows you to host the backend entirely on your own stack.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/self-host-backend.png)

## The CMS Frontend

- TinaCMS provides an intuitive CMS interface for your editors. For sites using React, TinaCMS supports "Visual Editing" to allow content editors to see real-time changes.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif)

### /admin route

- Users interact with the CMS by navigating to the `/admin` page on your site.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/admin.png)

### Saving

- When users make a change in the CMS, a commit is made back to your Git repository.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/git-save.png)

## Integrating TinaCMS into a site

TinaCMS can be setup on your site with `tinacms init`. This installs a few Tina packages, and add some boilerplate

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689819318/tina-io/docs/product-tour/cli-init.png)

### Running TinaCMS Locally

- You also have the flexibility to run TinaCMS locally, sourcing local files instead of interacting with the hosted API. This gives developers an ultra-fast feedback loop.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1689874024/tina-io/docs/product-tour/local-workflow.png)

### Content Modelling

- Content in TinaCMS is modelled using a `tina/config.ts` file in your project. Through this, you can define "collections" that model various content types on your site.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1690206543/tina-io/docs/product-tour/content-modelling.png)

### Data-fetching

- TinaCMS provides a GraphQL API, making data-fetching more efficient and powerful.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1690205968/tina-io/docs/product-tour/graphql-query_5.png)

### Client

- Moreover, we also generate a user-friendly client that simplifies the process of querying your content.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1690206445/tina-io/docs/product-tour/client.png)

### Type-safety

- TinaCMS emphasizes type safety, ensuring your content queries remain error-free and consistent, thus improving code reliability and maintainability.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1690206441/tina-io/docs/product-tour/client-typesafe.png)
