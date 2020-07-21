---
id: /docs/nextjs/overview
title: Using Tina with NextJS
next:
---

NextJS is a relatively open-ended framework and there are many different ways to build with it. If you're new to NextJS, [this blog](/blog/simple-markdown-blog-nextjs) is a great place to start getting familiar with the framework.

## Guides

For direction on specific use-cases, please refer to these [guides](/guides):

- [Add Tina to a NextJS starter blog without a backend](/guides/nextjs/adding-tina/overview)
- [Set up a Git backend and edit local content](/guides/nextjs/git/getting-started)
- [Implement Open Authoring using GitHub as a content source](/guides/nextjs/github-open-authoring/initial-setup)

## Packages

Depending on your project, these are the **NextJS-specific Tina packages** to work with:

- [_next-tinacms-github_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-github): This package provides helpers for managing the github auth token for requests, as well as providing helpers for loading content from the Github API.
- [_next-tinacms-json_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-json): This package provides Git form helpers for editing content stored in JSON files in the local filesystem.
- [_next-tinacms-markdown_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-markdown): This package provides Git form helpers for editing content stored in Markdown files in the local filesystem.

## Blogs

- [Creating a Markdown Blog with Next.js](/blog/simple-markdown-blog-nextjs)
- [Using TinaCMS with Next.js (Git-based approach)](/blog/using-tinacms-with-nextjs)
