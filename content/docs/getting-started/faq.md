---
title: Frequently Asked Questions
prev: /docs/getting-started/backends
next: null
---

We hope these answers give you an honest insight into the project — its current state, the possibilities, and supported usecases etc. Please share additional questions on the [community forum](https://community.tinacms.org/)!

## Why do you say "Tina is not a CMS?"

Tina introduces an entirely new paradigm to the content management space, which can make it difficult to grasp. In short, Tina is a toolkit for making your website its own CMS. It's a suite of packages that enables developers to build a customized content management system into the website itself.

Tina allows you to expose content editing directly within your website's components. You can use Tina to build your own custom CMS and have precise control over how editors interact with those editing capabilities.

Here's an overview of the current CMS landscape:

- **Traditional Paradigm:** A CMS is an application you use to build a website (i.e. Wordpress, Drupal, etc.). A conventional CMS provides a fully-realized editing interface, coupled with a backend for managing data, requiring you to create and edit content within its bounds. You build your website on top of the CMS.
- **Headless Paradigm:** A CMS is an application that let's you edit your content. It lives independent of your website. Your website's build process loads data from the CMS to create the web pages. Your website and the content management are completely independent.
- **The Tina Paradigm:** Your website is its own CMS. You use Tina to build content editing capabilities directly into your website interface. You can set up a custom or pre-configured backend to handle how and where content is stored.

Tina is not an application on its own that you login to, however you could build that authenticated editing application into your site with Tina. It is not a one-size-fits all solution. It is incredibly flexible, providing precise control over an entire content editing infrastructure — from the database to the user experience.

## Is Tina stable?

Currently, Tina is pre Version-1. While much of the core architecture is fairly-well settled, many of the higher-level APIs are still being built and shaped. Breaking changes in non-core packages are introduced regularly (but communicated in [Release Notes](/docs/releases)) as we push limits and hone the developer experience.

## What framework do you best support?

Tina's editing UI is built entirely in React. Right now, you can only use Tina in React-based environments, such as [CRA](https://reactjs.org/docs/create-a-new-react-app.html), [Next.js](https://nextjs.org/), or [Gatsby](https://www.gatsbyjs.com/).

As of now, we'd recommend using Create React App (CRA) or Next.js if you're wanting to use [Tina in production](/docs/getting-started/faq#what-is-the-editing-environment-how-does-tina-work-in-production) due to a few constraints in the way Gatsby works.

## What about Vue?

While it is entirely possible to use Tina with Vue, currently there are no adaptors, packages, or documented methods of doing this. This is an unbeaten path.

We can identify a few different ways to approach Vue support:

- One way would be to create an adaptor that allows you to set up the React editing UI within your Vue site. This isn't ideal for many reasons, but it is an option.
- Another would be to completely rewrite the editing UI with Vue components.
- A third option would be to convert the editing UI to [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) (with [something like Stencil](https://github.com/tinacms/tinacms/pull/601)), so they can be independent of a UI framework.

The Core Tina Team is focused on creating a solid foundation with React first, before considering Vue. However, if someone in the community wants to [spearhead this effort](https://github.com/tinacms/tinacms/issues/1258), we will certainly offer support and guidance.

## Who should use Tina?

From a **development perspective**, folks who are comfortable with React and JavaScript.

From a **content editing perspective**, the current UX has been created with developers-first in mind. For example, the [GitHub editing workflow](https://tinacms.org/guides/nextjs/github/initial-setup) and interface assumes the content editor is comfortable with Git terminology such as forking, branching, pull requests etc. We chose to focus on developers editing sites before adding abstractions to smooth out the experience for non-technical editors. This strategy has allowed us to quickly expand Tina's core capabilities and improve it's stability.

## What is the editing environment? How does Tina work in production?

It depends on your framework and who is editing the site. The approaches outlined below represent the well-documented and supported avenues, but they are not the only methods.

### Git-Filesystem

Right now with Gatsby (or any Git-filesystem packages), you'd generally need to run a development server in a [cloud editing environment](https://tinacms.org/blog/editing-on-the-cloud) to track and manipulate the local filesystem directly. In theory, it is possible to use Gatsby with an API-based content source, but we haven't explored this yet.

Others in the community have found unique ways to work with Tina & Gatsby in production, from setting up an [AWS editing environment](https://levelup.gitconnected.com/provision-setup-and-secure-a-tinacms-cloud-editor-on-aws-e96b0e060e7c) to implementing [GitLab OAuth](https://community.tinacms.org/t/tinacms-with-gatsby-and-gitlab-oauth-for-authentication/143).

### Next.js & GitHub

There are obvious limitations to running a development server in the cloud, so we explored an alternative approach that leverages SSR to edit a live production site. The best example is our own website, [tinacms.org](https://github.com/tinacms/tinacms.org).

This site uses Next.js's [preview mode](https://tinacms.org/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode), which allows us to host a website that is fully static by default, but switches to a dynamic mode that runs server code for authenticated users. Content changes are managed through the GitHub API.

Currently, the easiest way to use Tina in production is with [Next.js and GitHub](https://tinacms.org/guides/nextjs/github/initial-setup) as a content source.

## Does Tina only work with Git or GitHub?

No, but these workflows are the best supported at this time. Tina is designed to potentially work with any data source.

## Will there be Tina code in my production build?

Yes — since the editing interface is built into your site, there will be Tina code in your production build. We've taken [steps to minimize](https://tinacms.org/docs/releases/2020-05-19#deprecation) this by preventing heavy dependencies (e.g. moment, react-color, react-dropzone, prosemirror) from loading by default.

An idea has been brought up to [strip Tina](https://github.com/tinacms/tinacms/issues/771) from production, but we do not have plans to implement this. It's also worth noting that some sites want to use Tina code in production (for example tinacms.org) since editing occurs on the live site itself.

A trade off for utilizing Tina’s editing interfaces (especially the inline editing interfaces) is that there will be extra code in your site. We will do our best to handle the biggest offenders via standard methods of decoupling but it is not possible to reduce the impact to 0kb.

## I added Tina to my website and now it's really slow and crashes the browser. What's going on?

Tina provides a **real-time preview** of React-based websites by manipulating the content that gets passed into a component's props, triggering the re-rendering of that component. Without Tina, this type of content is not usually changed after its initial render. It's common for latent performance issues to suddenly emerge when these props start receiving frequent updates. The following tips might help:

- [Memoize](https://reactjs.org/docs/hooks-reference.html#usememo) expensive operations
- Identify rendering loops with React Devtools

## What is up with the llama?

Give me some of your tots 🦙.

![tina eat](/gif/tina-eat.webp)
