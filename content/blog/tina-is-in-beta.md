---
title: Tina is in Beta
date: '2021-07-27T20:00:00-04:00'
author: James Perkins
last_edited: '2021-07-27T14:59:54.951Z'
---
The team at Tina have been working hard since June 2nd when we launched Tina Cloud. We took all your feedback and thoughts and iterated to make huge improvements to the product.

The Alpha release contained the core product yet we knew we had some features we wanted to add immediately, including a simplified integration path.

## What has changed since Alpha?

Quite a lot has changed since we released the Alpha, we wanted to move quickly to add features and improve on a great core concept.  We are going to discuss each of them in detail to give you a understanding of where the product is at and where we are heading:

## Getting started with Tina

We wanted to speed up getting Tina up and running, whether this was a newly bootstrapped Next.js application or your Production application. We introduced a number of things to improve this

* Better documentation
* Tina init
* Guide improvements, more guides.

### Better Docs

The documentation at Tina has been something that we wanted to improve as much as possible, we found people were getting confused by concepts because we did not clearly explain them in the documentation.

I spent quite a bit of time reading the documentation over and over again when I first started at Tina and had a large amount of notes. I decided to treat each documentation page as a "first time" Tina user and added clarity and context where required.

### Tina init

Tina init is my favorite addition to the Tina experience. A single command can bootstrap Tina on a Next.js application and do all the heavy lifting for you. The team spent quite a bit of time working on this, and refining it, to get it just right.  With the command `npx @tinacms/cli init` we will do the following:

1. Install all dependencies to your application
2. Add the Tina commands to your package.json (tina-dev, tina-build, tina-start
3. Wrap your app.js / app.tsx in TinaProvider
4. Create demo data that you can test Tina with
5. Create an admin route to allow people to edit
6. Create a schema file ready for you to shape your own content

This allows you to move quickly and experience Tina without having to write any code. Then when you are ready you can easily extend it to use parts of your existing site.

### Improving and adding guides

When we introduced Tina, we provided a quick start guide that guide you as a user through using our Tina Cloud Starter. This was a great way for users to experience Tina but we found that people were missing some key concepts of Tina.

I went back to the drawing board and created a new guide that takes the NextJS Starter Blog and adds Tina and Tina Cloud to it, while explaining each concept as we went. This felt like a perfect way to show off Tina and use something many users are experienced with.

We also went through our existing Next.js guides and made sure that the concepts we were promoting were easily translated to Tina Cloud, in case a user wanted the power of real time editing without using the Cloud but then decided in the future to use our cloud offering.

## Media Manager

Media manager was one of the most important features that we needed for Tina Cloud. Our Media manager allows you to change images, upload new images, and delete ones you no longer need without ever leaving the front end.

We introduced this in the middle of the Alpha and you can read about it in our [blog post announcing it]().

## Improving Caching

Speed and performance has been something we have been actively working on. We introduced some improvements behind the scenes to improve the way we retrieve the data for your site.

## Creating `@tinacms/toolkit`

TinaCMS was built in with small modular packages, this meant that we relied heavily on React context, and the dependency mismatches from over-modularizing our toolkit, which led to many bugs related to missing context.

Our open source team created @tinacms/toolkit which incorporates the essentials of Tina all in one place. This simplifies everything for you as a user and Tina as a product.