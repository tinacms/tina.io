---
title: How Tina Works
id: /docs/getting-started/how-tina-works
prev: /docs/getting-started/introduction
next: /docs/cms
---

## Real-Time Feedback

Static sites work by taking structured content from a source, such as markdown files, and processing them through a template to transform them into HTML pages. Tina sits in the middle of this process, exposing this structured content directly to the end-user via form fields in the browser, while simultaneously passing the same content through to the templating engine.

![tina-diagram](/img/how_tina_works_asset.png)

The end result is a system that gives editors immediate feedback as they edit content, and gives developers precise control over which fields can be edited and how they are presented in the browser.

## Git-Backed by Default

Tina started as a side project of Forestry.io and inherits its git-backed approach to persistence by default. Changes made to content in Tina's editor are immediately saved back to their Markdown source files, those are committed and pushed to an origin Git remote when the save button is pressed.

## Dig Deeper

To gain a better understanding of how Tina works, start by digging into some core Tina concepts:

- [The CMS](https://tinacms.org/docs/cms).
- [Forms](https://tinacms.org/docs/plugins/forms) — these expose editable content to Tina.
- [Fields](https://tinacms.org/docs/plugins/fields) — an individual component that makes up the forms.
