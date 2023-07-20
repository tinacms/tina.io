---
title: TinaCMS Version 1.5.9
date: '2023-06-13T03:00:00.000Z'
last_edited: '2023-06-13T03:00:00.000Z'
author: James O'Halloran
---

Today we are excited to release `tinacms@1.5.9` and `@tinacms/clil@1.5.18`. The full list of changes can be found[ in the changeset PR](https://github.com/tinacms/tinacms/pull/3995 "In the changeset PR").

## Improved Search

It's now easier than ever to find your documents in TinaCMS. TinaCMS's search was previously limited to filtering on specific fields, search was case-sensitive, and it was difficult for editors to use without knowing the exact value of a field. Now editors can search for documents across any of its fields. 

![](https://res.cloudinary.com/forestry-demo/image/upload/v1686669366/tina-io/blog/changelog/search_uxd1di.png)

Setting up search does require some light configuration to be enabled. Learn more about setting up search [in the docs](/docs/reference/search/overview/ "in the docs").

## Recent Updates

Since our last [changelog post](/blog/TinaCMS-Version-1-5/ "Changelog post"), there's been several improvements to Tina

### Media Syncing

When repo-based media is setup on a project, we need to trigger an initial sync on the project's configured asset directory. This was previously done in the CMS' media-manager, but its UX caused some confusion. It was also a bit black-box in terms of which branch was being used as the media source-of-truth.\
\
We've since added a "Media" tab to the Tina Cloud dashboard to improve this experience.

![](https://res.cloudinary.com/forestry-demo/image/upload/v1686670223/tina-io/blog/changelog/media-dashboard_qjwkr2.png)

When new projects are setup, Tina media can be enabled from this tab.\
We plan on adding configuration to this tab in the future, and we hope it improves the initial media setup in the meantime.

### Click-to-Edit

We recently announced some improvements to Visual Editing with our new "Click to Edit" functionality.

<CloudinaryVideo src="https://res.cloudinary.com/forestry-demo/video/upload/v1684428946/blog-media/click-to-edit-may-2023/click-to-edit-demo" />

Read more about that announcement [here](/blog/Click-to-Edit-Comes-to-Visual-Editing/ "here").

### Bug fixes & Other Improvements

See our [changeset PRs](https://github.com/tinacms/tinacms/issues?q=created%3A%222023-04-28+..+2023-06-13%22+author%3Aapp%2Fgithub-actions "changeset PRs") for full details.
