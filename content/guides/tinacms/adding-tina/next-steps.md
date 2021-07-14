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

## Saving Content

Now that you understand the basics of working with Tina on a Next.js site, the question becomes - where do I save my content?

### Introducing Tina Cloud 🚀

Tina Cloud is our hosted service designed to make Git-based content management more powerful and accessible for cross-functional teams.

Learn more about [Tina Cloud](/cloud/)
