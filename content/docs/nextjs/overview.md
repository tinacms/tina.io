---
id: /docs/nextjs/overview
title: Using Tina with NextJS
next: /docs/nextjs/bootstrapping
---

NextJS is a relatively open-ended framework and there are many different ways to build with it. These docs will give you an idea of the packages to work with when implementing Tina functionality on a NextJS project.

## Guides

For direction on specific use-cases, please refer to these [guides](/guides):

- [Adding Tina to a NextJS starter blog without setting up backend]()
- [Setting up a Git backend and editing local content]()
- [Implementing Open Authoring using GitHub as a content source]()

## Packages

Depending on your project, these are the **NextJS-specific Tina packages**:

- [_next-tinacms-github_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-github): This package provides helpers for managing the github auth token for requests, as well as providing helpers for loading content from the Github API.
- [_next-tinacms-json_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-json): This package provides Git form helpers for editing content stored in JSON files in the local filesystem.
- [_next-tinacms-markdown_](https://github.com/tinacms/tinacms/tree/master/packages/next-tinacms-markdown): This package provides Git form helpers for editing content stored in Markdown files in the local filesystem.
