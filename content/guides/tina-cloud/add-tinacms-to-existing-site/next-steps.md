---
title: Next Steps
last_edited: '2021-07-30T20:18:26.925Z'
---

## Overview

You now have knowledge of how TinaCMS works, how to use it with our GraphQL content-api, how to deploy and connect to Tina Cloud. This is a basic usage of TinaCMS + Tina Cloud, below are some ideas on how you could improve this futher!

## Add Media Management Support Via Cloudinary

One powerful feature that TinaCMS has, is media management, it allows content creators to upload, swap and delete media assets for a page and see the changes immediately. We use Cloudinary to handle this and you can read about how to set it up in our [documentation](/docs/media-cloudinary/).

You can then update the `schema.ts` for the `Cover Image` to use `image`, instead of a `string`.

## Add the ability to add a new page.

It's great that we can edit pages, but what if we wanted our content team to create new blog posts? Tina provides [`useDocumentCreatorPlugin`](/docs/tinacms-context-advanced/#usedocumentcreatorplugin) which gives you the ability to add new pages in a safe manner. The implementation is lightweight and can provide great flexibity to a site.

## Use Date picker

We also provide a date picker to give a rich experience to select the date and time. This would allow content creators to edit a post and update the Date and Time with a few clicks, versus typing it in the correct format. You can find out how to add this using our [schema documentation](/docs/schema/#scalar).
