---
title: Tina is in Beta
date: '2021-07-27T20:00:00-04:00'
author: James Perkins
last_edited: '2021-07-27T15:22:06.367Z'
---
The team at Tina have been working hard since June 2nd when we launched Tina Cloud. We took all your feedback and thoughts and iterated to make huge improvements to the product.The Alpha release contained the core product yet we knew we had some features we wanted to add immediately, including a simplified integration path. 

We are pleased to annouce that Tina is in Beta! If you are excited as we are you can get started by [signing up](https://app.tina.io/register), but I'd love you to stick around and hear about the team's vision, lessons learnt and what we have added.

//Scott thoughts here?


## Lessons learnt 

We learnt a lot during our Alpha, which allowed us to really drive the product forward. Here is a summary of the things we learnt:

- It took people a lot longer than we expected to make their first commit using Tina. In the beginning on average it was over 8 hours, this to us signal that even our starter took too long to setup.
- Our user base had a lot of questions after using our starter, mostly surrounding content modeling, and our documentation didn't answer them. 
- Tina could be used in Production on large sites, and both developers and content writers loved it.
- Creating a [Discord](https://discord.gg/njvZZYHj2Q) allowed us to give and receive real time feedback, which  allowed us to add features, fix bugs and get people unstuck quickly.   


## What does being in Beta mean for you?

The team and I believe that our product combines a fantastic developer and content creator experience into a single product, the update from Alpha to Beta is so large that I wanted to write a short paragraph about each part. Below is a list of each update, feel free to click on it to take you to the long form update:


- Better Documentation
- Quicker to get started
- Better Guides
- Improving our Tina Quickstart
- Media Manager 
- Cache improvments
- Creating @tinacms/toolkit
- Vercel Integration
- Dashboard UI/UX improvements
- Changes to the way we model content


<div class="callout">
<img className="learnImage" src="/img/tina-laptop.png" alt="" />
  <div>
  <h3>Ready to get started?</h3>
  <p>Get a website running with Tina Cloud in no time!</P>
  <a href="/guides/tina-cloud/starter/overview/" class="calloutButton">Quick Start Guide <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg></a>
  </div>
</div>

## Getting started with Tina

We wanted to speed up getting Tina up and running, whether this was a newly bootstrapped Next.js application or your Production application. We introduced a number of things to improve this:

* A better documentation
* A tina init command
* New and improved guides

### Better Documentation

The documentation at Tina has been something that we wanted to improve as much as possible, we found people were unsure of Tina concepts because we did not clearly explain them in the documentation. We spent time crafting documentation that gives a developer of any experience a better understanding of each part of Tina, how they work together and how to accomplish specific tasks. 

We also moved and created new navigation menus to better convey the intent of a piece of documentation, for example if you were looking for the Next.js APIs we have a section for that. 

### Tina init

Tina init is my favourite addition to the Tina experience. A single command can bootstrap Tina on a Next.js application and do all the heavy lifting for you. The team spent quite a bit of time working on this, and refining it, to get it just right.  With the command `npx @tinacms/cli init` we will do the following:

1. Install all dependencies to your application
2. Add the Tina commands to your package.json (`tina-dev`, `tina-build`, `tina-start`)
3. Wrap your `app.js` / `app.tsx` in our `TinaEditProvider`
4. Create demo data that you can test Tina out with.
5. Create an admin route to allow people to edit, and a way to exit.
6. Create a schema file ready for you to shape your own content

This allows you to move quickly and experience Tina without having to write any code. Then when you are ready you can easily extend it to use parts of your existing site.

### Improving and adding guides

When we introduced Tina, we provided a quick start guide that guides you as a user through using our Tina Cloud Starter. This was a great way for users to experience Tina but we found that people were missing some key concepts of Tina.

I went back to the drawing board and created a new guide that takes the Next.js Starter Blog and adds Tina and Tina Cloud to it while explaining each concept as we went. This felt like a perfect way to show off Tina and use something many users are experienced with.

We also removed old guides that no longer promote Tina best practices and moved some of our other guides in to our experimental section. Experimental to us means that we can't guranateee that there won't be bugs or issues with the packages used. 

## Improving our Tina Quickstart

The Tina quickstart was built originally to show "the power of Tina" while it did that, we didn't feel that it showed a real world example. So we went back to the drawing board and created our new Tina Quickstart, it includes a landing page, blog and about pages. You can edit and rearrange the content and we styled it with TailwindCSS to give it some extra shine! Below is an example of just some of the work you can do:

![Quickstart Example](/img/edit-alongside-content.gif)

## Media Manager

Media manager was one of the most important features that we needed for Tina Cloud. Our Cloudinary Media manager allows you to change images, upload new images, and delete ones you no longer need without ever leaving the Tina editing experience. 

I wrote a [blog post announcing it](/blog/manage-your-media-with-cloudinary/) and how to implement it into your application.

## Improving Caching

Speed and performance have been something we have been actively working on. We introduced some improvements behind the scenes to improve the way we retrieve the data for your site. Tina was already performance first but now its even better! 

## Creating `@tinacms/toolkit`

TinaCMS was built-in with small modular packages, this meant that we relied heavily on React context, and the dependency mismatches from over-modularizing our toolkit, which led to many bugs related to missing context.

Our open-source team created @tinacms/toolkit which incorporates the essentials of Tina all in one place. This simplifies everything for you as a user and Tina as a product.

You can read about all the updates and why decided to make the changes in our pinned [GitHub issue](https://github.com/tinacms/tinacms/issues/1898).

## Vercel Integration

We wanted to reduce the friction to almost zero when testing TinaCMS, so we worked on adding Vercel integration. This means if you sign up for an account, you can one click and deploy in minutes and start playing around with TinaCMS and Tina Cloud, using our Starter. 

## Dashboard Overhaul

When using Tina Cloud in Alpha our dashboard UX wasn't a first class experience and at times could be confusing. We completely overhauled the experience, making it easier and quicker to add an application to the Cloud, invite users and find the important information such as site url(s) or client-id.

## Changes to Content modeling 

Content Modeling is the core of how you interact with TinaCMS and also retrieve the your content. We decided to make an important change and be more primitive based in nature. 

This allows for more simplist queries that don't require disambiguation, we believe this will allow you as a developer to craft queries with ease. 

If you used the Alpha of Tina you might want to read this article the team put together to explain all of the [changes and how to migrate](https://tina.io/docs/tina-cloud/migration-overview/). 

