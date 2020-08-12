---
title: TinaCMS Guides
---

The guides featured here will show you how to accomplish specific tasks with Tina. Guides are set up as step-by-step opportunities for learning. They are intended to introduce you to certain APIs, configurations, or workflows and provide rudimentary examples as a reference.

## How To Use

Guides should help you get familiar with a particular workflow or task. Use them to learn the basics, then refer back to the [documentation](/docs) for support in applying general solutions for your distinct needs.

Sometimes the guides will be accompanied with a demo repository — these aren't meant to be starters, but rather a general reference or entry point.

Get support in the [community forum](https://community.tinacms.org/) at any point. If you see typos or outdated information, feel free to click the 'Edit This Site' button in the footer and open a PR to correct it.

> Before you start any guide, it is assumed that you have worked through the [Introductory Tutorial](/docs/getting-started/overview) to get familiar with Tina Basics.

## Categories

Guides are organized by various categories. Those in the _General_ category use plain React (or `create-react-app`); the information can generally be applied to any React framework (although the implementation may look different). Guides in the _Next.js_ and _Gatsby_ categories contain information specific to individual framework integration.

### General

- [**Working with Inline Blocks**](/guides/general/inline-blocks/overview) — Set up [inline editing](/docs/ui/inline-editing) and [inline blocks](/docs/ui/inline-editing/inline-blocks) in a [CRA demo](https://logan-anderson.github.io/cra-hosted-demo/).

  > [Step 1: _Overview_](/guides/general/inline-blocks/overview) - [ Step 2: _Inline Form & Fields_](/guides/general/inline-blocks/inline-form-fields) - [ Step 3: _Convert Hero Component to a Block_](/guides/general/inline-blocks/hero-to-block) - [Step 4: _Customize Blocks Controls_](/guides/general/inline-blocks/customize-controls) - [Step 5: _Settings Modal Fields_](/guides/general/inline-blocks/settings-modal) - [Step 6: _Add More Blocks_](/guides/general/inline-blocks/add-more-blocks) - [Step 7: _Nested Blocks_](/guides/general/inline-blocks/nested-blocks) - [Step 8: _Extend Styles_](/guides/general/inline-blocks/extend-styles) - [Step 9: _Wrap Up_](/guides/general/inline-blocks/wrap-up)

### Next.js

- [**Adding Tina**](/guides/nextjs/adding-tina/overview) — Set up Tina without a backend in a [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

  > [Step 1: _Overview_](/guides/nextjs/adding-tina/overview) - [Step 2: _Project Setup_](/guides/nextjs/adding-tina/project-setup) - [Step 3: _Adding the Tina Provider_](/guides/nextjs/adding-tina/adding-tina-provider) - [Step 4: _Creating Forms_](/guides/nextjs/adding-tina/creating-forms) - [Step 5: _Next Steps_](/guides/nextjs/adding-tina/next-steps)

- [**Using a Git Backend**](/guides/nextjs/git/getting-started) — Set up filesystem-based content management with Git & Next.js.

  > [Step 1: _Getting Started_](/guides/nextjs/git/getting-started) - [Step 2: _Adding a Backend_](/guides/nextjs/git/adding-backend) - [Step 3: _Creating Git Forms_](/guides/nextjs/git/creating-git-forms)

- [**Using a GitHub Backend**](/guides/nextjs/github/initial-setup) — Learn how to manage content in a Next.js site via the GitHub API with [`create-next-app`](https://nextjs.org/docs#setup). This guide is appropriate for public or private repositories and can also be used to implement [Open Authoring](/blog/introducing-visual-open-authoring).

  > [Step 1: _Initial Setup_](/guides/nextjs/github/initial-setup) - [Step 2: _Setup the GitHub OAuth App_](/guides/nextjs/github/github-oauth-app) - [Step 3: _Adding API Functions_](/guides/nextjs/github/api-functions) - [Step 4: _Create an Auth Redirect Page_](/guides/nextjs/github/auth-redirect) - [Step 5: _Configure the Custom App File_](/guides/nextjs/github/configure-custom-app) - [Step 6: _Loading Content From GitHub_](/guides/nextjs/github/loading-github-content) - [Step 7: _Using GitHub Forms_](/guides/nextjs/github/github-forms) - [Step 8: _Setup Toolbar Plugins_](/guides/nextjs/github/toolbar-plugins) - [Step 9: _Add a Custom Document for Styles_](/guides/nextjs/github/custom-doc-styled-components) - [Step 10: _Hosting With Vercel_](/guides/nextjs/github/hosting-vercel)

- [**Using a Strapi Backend**](/guides/nextjs/tina-with-strapi/overview) — Set up Tina on a Next.js site using [Strapi](https://strapi.io/) as a content source.

  > [Step 1: _Overview_](/guides/nextjs/tina-with-strapi/overview) - [Step 2: _Setting up Strapi_](/guides/nextjs/tina-with-strapi/strapi-setup) - [Step 3: _Front end Setup_](/guides/nextjs/tina-with-strapi/front-end-setup) - [Step 4: _Querying Strapi_](/guides/nextjs/tina-with-strapi/querying-strapi) - [Step 5: _Authenticating with Strapi_](/guides/nextjs/tina-with-strapi/authenticating-with-strapi) - [Step 6: _Editing with Tina_](/guides/nextjs/tina-with-strapi/editing-with-tina) - [Step 7: _Saving to Strapi_](/guides/nextjs/tina-with-strapi/saving-to-strapi)

### Gatsby

- [**Adding Tina**](/guides/gatsby/adding-tina/project-setup) — Set up Tina without a backend on the [`gatsby-starter-blog`](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/).

  > [Step 1: _Project Setup_](/guides/gatsby/adding-tina/project-setup) - [Step 2: _Creating Forms_](/guides/gatsby/adding-tina/creating-forms) - [Step 3: _Next Steps_](/guides/gatsby/adding-tina/next-steps)

- [**Using a Git Backend**](/guides/gatsby/git/installation) — Set up local filesystem-based content management with Git & Gatsby.

  > [Step 1: _Installation_](/guides/gatsby/git/installation) - [Step 2: _Creating Remark Forms_](/guides/gatsby/git/create-remark-form) - [Step 3: _Creating JSON Forms_](/guides/gatsby/git/create-json-form) - [Step 4: _Customizing Forms_](/guides/gatsby/git/customize-form) - [Step 5: _Avoid Empty Fields Errors_](/guides/gatsby/git/empty-field-errors) - [Step 6: _Creating New Files_](/guides/gatsby/git/create-new-files) - [Step 7: _New File Configuration_](/guides/gatsby/git/configuration) - [Step 8: _Deleting Files_](/guides/gatsby/git/deleting-files) - [Step 9: _Next Steps_](/guides/gatsby/git/next-steps)

> Reference the [Next.js](/docs/integrations/nextjs) or [Gatsby](/docs/integrations/gatsby) Integration pages to see all of the blogs, packages, and guides specific to each framework.
