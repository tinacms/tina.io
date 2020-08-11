---
title: TinaCMS Guides
---

The guides featured here will show you how to accomplish pointed tasks with Tina.

Guides are set up as step-by-step opportunities for learning, with specific guide-rails. They are intended to introduce you to certain APIs, configurations, or workflows and provide working (usually simple) examples as a reference.

Sometimes the guides will be accompanied with a demo repository — these aren't meant to be starters, but rather a reference point for the steps outlined.

## How To Use

Guides should help you get familiar with a particular workflow. Use them to learn the basics of the task you are trying to solve, then refer back to the [documentation](/docs) for support in applying general solutions for your distinct needs.

At any point along the way, get support in the [community forum](https://community.tinacms.org/). If you see typos or outdated information, feel free to click the 'Edit This Site' button in the footer and open a PR to correct it.

> Before you start any guide, it is assumed that you have worked through the [Introductory Tutorial](/docs/getting-started/overview) to get familiar with Tina Basics

## Categories

Guides are organized by various categories. Guides in the _General_ category use plain React (or `create-react-app`); the information can generally be applied to any React framework (although the implementation may look different). Guides in the _Next.js_ and _Gatsby_ categories contain information specific to each framework's integration.

### General

- [**Working with Inline Blocks**](/guides/general/inline-blocks/overview): Set up [inline editing](/docs/ui/inline-editing) and [inline blocks](/docs/ui/inline-editing/inline-blocks) in a [CRA demo](https://logan-anderson.github.io/cra-hosted-demo/). [Overview](/guides/general/inline-blocks/overview) | [Inline Form & Fields](/guides/general/inline-blocks/inline-form-fields) | [Convert Hero Component to a Block](/guides/general/inline-blocks/hero-to-block) | [Customize Blocks Controls](/guides/general/inline-blocks/customize-controls) | [Settings Modal Fields](/guides/general/inline-blocks/settings-modal) | [Add More Blokcs](/guides/general/inline-blocks/add-more-blocks)| [Nested Blocks](/guides/general/inline-blocks/nested-blocks) | [Extend Styles](/guides/general/inline-blocks/extend-styles) | [Wrap Up](/guides/general/inline-blocks/wrap-up)

### Next.js

- [**Adding Tina**](/guides/nextjs/adding-tina/overview): Set up Tina without a backend in a [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter). [Overview](/guides/nextjs/adding-tina/overview) | [Project Setup](/guides/nextjs/adding-tina/project-setup) | [Adding the Tina Provider](/guides/nextjs/adding-tina/adding-tina-provider) | [Creating Forms](/guides/nextjs/adding-tina/creating-forms) | [Next Steps](/guides/nextjs/adding-tina/next-steps)
  <br><br>
- [**Using a Git Backend**](/guides/nextjs/git/getting-started): Set up filesystem-based content management with Git & Next.js. [Getting Started](/guides/nextjs/git/getting-started) | [Adding a Backend](/guides/nextjs/git/adding-backend) | [Creating Git Forms](/guides/nextjs/git/creating-git-forms)
  <br><br>
- [**Using a GitHub Backend**](/guides/nextjs/github/initial-setup): Learn how to manage content in a Next.js site via the GitHub API with [`create-next-app`](https://nextjs.org/docs#setup). This guide is appropriate for public or private repositories and can also be used to implement [Open Authoring](/blog/introducing-visual-open-authoring). [Initial Setup](/guides/nextjs/github/initial-setup) | [Setup the GitHub OAuth App](/guides/nextjs/github/github-oauth-app) | [Adding API Functions](/guides/nextjs/github/api-functions) | [Create an Auth Redirect Page](/guides/nextjs/github/auth-redirect) | [Configure the Custom App File](/guides/nextjs/github/configure-custom-app) | [Loading Content From GitHub](/guides/nextjs/github/loading-github-content) | [Using GitHub Forms](/guides/nextjs/github/github-forms) | [Setup Toolbar Plugins](/guides/nextjs/github/toolbar-plugins) | [Add a Custom Document for Styles](/guides/nextjs/github/custom-doc-styled-components) | [Hosting With Vercel](/guides/nextjs/github/hosting-vercel)
  <br><br>
- [**Using a Strapi Backend**](/guides/nextjs/tina-with-strapi/overview): Set up Tina on a Next.js site using [Strapi](https://strapi.io/) as a backend and headless CMS. [Overview](/guides/nextjs/tina-with-strapi/overview) | [Setting up Strapi](/guides/nextjs/tina-with-strapi/strapi-setup) | [Front end Setup](/guides/nextjs/tina-with-strapi/front-end-setup) | [Querying Strapi](/guides/nextjs/tina-with-strapi/querying-strapi) | [Authenticating with Strapi](/guides/nextjs/tina-with-strapi/authenticating-with-strapi) | [Editing with Tina](/guides/nextjs/tina-with-strapi/editing-with-tina) | [Saving to Strapi](/guides/nextjs/tina-with-strapi/saving-to-strapi)

### Gatsby

- [**Adding Tina**](/guides/gatsby/adding-tina/project-setup): Set up Tina without a backend on the [`gatsby-starter-blog`](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/). [Project Setup](/guides/gatsby/adding-tina/project-setup) | [Creating Forms](/guides/gatsby/adding-tina/creating-forms) | [Next Steps](/guides/gatsby/adding-tina/next-steps)
  <br><br>
- [**Using a Git Backend**](/guides/gatsby/git/installation): Set up filesystem-based content management with Git & Gatsby. [Installation](/guides/gatsby/git/installation) | [Creating Remark Forms](/guides/gatsby/git/create-remark-form) | [Creating JSON Forms](/guides/gatsby/git/create-json-form) | [Customizing Forms](/guides/gatsby/git/customize-form) | [Avoid Empty Fields Errors](/guides/gatsby/git/empty-field-errors) | [Creating New Files](/guides/gatsby/git/create-new-files) | [New File Configuration](/guides/gatsby/git/configuration) | [Deleting Files](/guides/gatsby/git/deleting-files) | [Next Steps](/guides/gatsby/git/next-steps)

> Reference the [Next.js](/docs/integrations/nextjs) or [Gatsby](/docs/integrations/gatsby) Integration pages to see all of the blogs, packages, and guides specific to each framework.
