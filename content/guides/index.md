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

- [**Working with Inline Blocks**](/guides/general/inline-blocks/overview): Set up [inline editing](/docs/ui/inline-editing) and [inline blocks](/docs/ui/inline-editing/inline-blocks) in a [CRA demo](https://logan-anderson.github.io/cra-hosted-demo/). [Step 1: Overview](/guides/general/inline-blocks/overview) | [ Step 2: Inline Form & Fields](/guides/general/inline-blocks/inline-form-fields) | [ Step 3: Convert Hero Component to a Block](/guides/general/inline-blocks/hero-to-block) | [Step 4: Customize Blocks Controls](/guides/general/inline-blocks/customize-controls) | [Step 5: Settings Modal Fields](/guides/general/inline-blocks/settings-modal) | [Step 6: Add More Blocks](/guides/general/inline-blocks/add-more-blocks)| [Step 7: Nested Blocks](/guides/general/inline-blocks/nested-blocks) | [Step 8: Extend Styles](/guides/general/inline-blocks/extend-styles) | [Step 9: Wrap Up](/guides/general/inline-blocks/wrap-up)

### Next.js

- [**Adding Tina**](/guides/nextjs/adding-tina/overview): Set up Tina without a backend in a [Next.js blog starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter). [Step 1: Overview](/guides/nextjs/adding-tina/overview) | [Step 2: Project Setup](/guides/nextjs/adding-tina/project-setup) | [Step 3: Adding the Tina Provider](/guides/nextjs/adding-tina/adding-tina-provider) | [Step 4: Creating Forms](/guides/nextjs/adding-tina/creating-forms) | [Step 5: Next Steps](/guides/nextjs/adding-tina/next-steps)<br><br>

* [**Using a Git Backend**](/guides/nextjs/git/getting-started): Set up filesystem-based content management with Git & Next.js.[Step 1: Getting Started](/guides/nextjs/git/getting-started) | [Step 2: Adding a Backend](/guides/nextjs/git/adding-backend) | [Step 3: Creating Git Forms](/guides/nextjs/git/creating-git-forms)
  <br><br>
* [**Using a GitHub Backend**](/guides/nextjs/github/initial-setup): Learn how to manage content in a Next.js site via the GitHub API with [`create-next-app`](https://nextjs.org/docs#setup). This guide is appropriate for public or private repositories and can also be used to implement [Open Authoring](/blog/introducing-visual-open-authoring). [Step 1: Initial Setup](/guides/nextjs/github/initial-setup) | [Step 2: Setup the GitHub OAuth App](/guides/nextjs/github/github-oauth-app) | [Step 3: Adding API Functions](/guides/nextjs/github/api-functions) | [Step 4: Create an Auth Redirect Page](/guides/nextjs/github/auth-redirect) | [Step 5: Configure the Custom App File](/guides/nextjs/github/configure-custom-app) | [Step 6: Loading Content From GitHub](/guides/nextjs/github/loading-github-content) | [Step 7: Using GitHub Forms](/guides/nextjs/github/github-forms) | [Step 8: Setup Toolbar Plugins](/guides/nextjs/github/toolbar-plugins) | [Step 9: Add a Custom Document for Styles](/guides/nextjs/github/custom-doc-styled-components) | [Step 10: Hosting With Vercel](/guides/nextjs/github/hosting-vercel) <br><br>

- [**Using a Strapi Backend**](/guides/nextjs/tina-with-strapi/overview): Set up Tina on a Next.js site using [Strapi](https://strapi.io/) as a content source. [Step 1: Overview](/guides/nextjs/tina-with-strapi/overview) | [Step 2: Setting up Strapi](/guides/nextjs/tina-with-strapi/strapi-setup) | [Step 3: Front end Setup](/guides/nextjs/tina-with-strapi/front-end-setup) | [Step 4: Querying Strapi](/guides/nextjs/tina-with-strapi/querying-strapi) | [Step 5: Authenticating with Strapi](/guides/nextjs/tina-with-strapi/authenticating-with-strapi) | [Step 6: Editing with Tina](/guides/nextjs/tina-with-strapi/editing-with-tina) | [Step 7: Saving to Strapi](/guides/nextjs/tina-with-strapi/saving-to-strapi)

### Gatsby

- [**Adding Tina**](/guides/gatsby/adding-tina/project-setup): Set up Tina without a backend on the [`gatsby-starter-blog`](https://www.gatsbyjs.org/starters/gatsbyjs/gatsby-starter-blog/). [Step 1: Project Setup](/guides/gatsby/adding-tina/project-setup) | [Step 2: Creating Forms](/guides/gatsby/adding-tina/creating-forms) | [Step 3: Next Steps](/guides/gatsby/adding-tina/next-steps)
  <br><br>
- [**Using a Git Backend**](/guides/gatsby/git/installation): Set up local filesystem-based content management with Git & Gatsby. [Step 1: Installation](/guides/gatsby/git/installation) | [Step 2: Creating Remark Forms](/guides/gatsby/git/create-remark-form) | [Step 3: Creating JSON Forms](/guides/gatsby/git/create-json-form) | [Step 4: Customizing Forms](/guides/gatsby/git/customize-form) | [Step 5: Avoid Empty Fields Errors](/guides/gatsby/git/empty-field-errors) | [Step 6: Creating New Files](/guides/gatsby/git/create-new-files) | [Step 7: New File Configuration](/guides/gatsby/git/configuration) | [Step 8: Deleting Files](/guides/gatsby/git/deleting-files) | [Step 9: Next Steps](/guides/gatsby/git/next-steps)

> Reference the [Next.js](/docs/integrations/nextjs) or [Gatsby](/docs/integrations/gatsby) Integration pages to see all of the blogs, packages, and guides specific to each framework.
