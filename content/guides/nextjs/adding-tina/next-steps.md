---
title: Next Steps
---
At this point, we've bootstrapped Tina into the Next.js blog starter. We were able to do so by making a few small modifications:

1. Added [client-side content transformation](/guides/nextjs/adding-tina/project-setup) to the `Post` component
2. Wrapped the site in [the Tina provider](/guides/nextjs/adding-tina/adding-tina-provider)
3. [Created a form](http://localhost:3000/guides/nextjs/adding-tina/creating-forms) to edit some values in the `Post` component

This guide is intended as a jumping off point to get you started with Tina, but to make a fully-functional CMS there is a little more work to do.

## Add More Fields

Our simplified example only exposes the title and post body to the Tina form. Take a look at our [fields](/docs/plugins/fields) documentation and try adding fields for the rest of the post data in the blog demo.

> **Image Fields**
>
> Support for image fields in Tina is still a work-in-progress. Handling images requires setting up a [media store](/docs/media) that integrates with your strategy for saving content. Expect more information on this front soon!

## Inline Editing

Consider creating an **inline editing** experience for your blog, where content is edited directly where it appears on the site instead of in the sidebar. Take a look at our [inline editing docs](/docs/ui/inline-editing) for more information.

👉 Follow the [**Working with Inline Blocks**](https://tinacms.org/guides/general/inline-blocks/overview)

## Saving Content

The [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) offered by Next.js allows us to load a separate set of data [depending on the "edit" (or "preview") mode](https://tinacms.org/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode). With the help of the GitHub API, editors can fork or branch off the repository, make changes, and create a pull request from the Tina UI.

This type of backend can support [Open Authoring](https://tinacms.org/blog/introducing-visual-open-authoring#using-nextjs-to-enable-edit-mode) workflows for public repositories, where anyone (with a GitHub account) can submit content changes for review.

👉 Follow the [**Using Github with Next.js Tutorial**](https://tinacms.org/guides/nextjs/github/initial-setup)
