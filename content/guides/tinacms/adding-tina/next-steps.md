---
title: Next Steps
---

At this point, we've bootstrapped Tina into the Next.js blog starter. We were able to do so by making a few small modifications:

1. Added <a href="/guides/tinacms/adding-tina/project-setup/#setting-up-client-side-content-transformation" target="_blank">client-side content transformation</a> to the `Post` component
2. Wrapped the site in <a href="/guides/tinacms/adding-tina/adding-tina-provider/#adding-the-provider" target="_blank">the Tina provider</a>
3. <a href="/guides/tinacms/adding-tina/creating-forms" target="_blank">Created a form</a> to edit some values in the `Post` component

This guide is intended to get you started with the frontend components of TinaCMS, but to make a fully-functional CMS there is a little more setup to do.

## Add More Fields

Our simplified example only exposes the title and post body to the Tina form. Take a look at our [fields](/docs/plugins/fields) documentation and try adding fields for the rest of the post data in the blog demo.

## Saving Content

Now that you understand the basics of working with TinaCMS on a Next.js site, the question becomes - where do I save my content?

### Introducing the TinaCMS Backend 🚀

We have recently released a Tina friendly backend to work seamlessly with our frontend libraries. This Tina backend is our hosted service designed to make Git-based content management more powerful and accessible for cross-functional teams.

Learn more about it [here](/cloud/)
