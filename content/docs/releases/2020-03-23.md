---
title: 2020-03-23 Release Notes
date: '2020-03-23T10:40:21-03:00'
author: Nolan Phillips
---
Two weeks ago we revealed [Visual Open Authoring](https://tinacms.org/blog/introducing-visual-open-authoring "Introducing Visual Open Authoring") on the TinaCMS website and we have been working hard to make this feature available for everyone.

Since most of the development for Open Authoring was done directly in the [tinacms.org repository](https://github.com/tinacms/tinacms.org "GitHub: tinacms.org") itself some house keeping is in order. We changed the [theming system](/blog/designing-an-extensible-styling-system) to be more compatible with inline editing, started moving over our new blocks, and started refactoring `tinacms` to better accommodate the new [Toolbar UI](https://tinacms.org/blog/tinacms-ui-whats-next "TinaCMS UI: What's Next?"). To help make this process smoother, Jeff created the [**@tinacms/webpack-helpers**](https://github.com/tinacms/tinacms/tree/master/packages/@tinacms/webpack-helpers "@tinacms/webpack-helpers") package to make it easy to test changes to tinacms from outside the monorepo.

This week the TinaCMS core team will continue down the path towards Open Authoring for everyone. We will be doing some refactoring in tinacms.org and looking into how the Toolbar UI will relate to the Sidebar in order to get a better idea of what packages and guides we will need to create. We're also exploring ways to introduce a versioned API reference for all the `tinacms/tinacms` packages.

If you're interested in getting involved then jump into the #dev channel in the [TinaCMS Slack](https://join.slack.com/t/tinacms/shared_invite/enQtNzgxNDY1OTA3ODI3LTNkNWEwYjQyYTA2ZDZjZGQ2YmI5Y2ZlOWVmMjlkYmYxMzVmNjM0YTk2MWM2MTIzMmMxMDg3NWIxN2EzOWQ0NDM "TinaCMS Slack") group or take a look through the list of [open issues](https://github.com/tinacms/tinacms/issues "TinaCMS Issues").

### Enhancements

#### **@tinacms/styles**

* theming is done using CSS custom properties

#### **react-tinacms-inline**

* **Improved Blocks UI:** See the [PR for more details](https://github.com/tinacms/tinacms/pull/908 "Inline Block Fixes")
* **New Component:** `BlockImage` lets users add images to blocks.

#### **gatsby-tinacms-git:**

* **Delete Action:** a generic form action that works for both json and markdown

### Refactoring

The following packages were created as part of the `tinacms` refactoring. Extracting these packages makes it easier to build custom interfaces for TinaCMS. Most people will not need to use these directly.

* New Package: `@tinacms/react-modals`
* New Package: `@tinacms/alerts`
* New Package: `@tinacms/react-alerts`
* New Package: `@tinacms/media`

### Contributing

**New Package: @tinacms/webpack-helpers**

Linking apps to a monorepo can be tricky. Tools like `npm link` are buggy and introduce inconsistencies with module resolution. If multiple modules rely on the same package you can easily end up with multiple instances of that package, this is problematic for packages like `react` which expect only one instance. If your app uses `webpack` you can get around these issues by ensuring that your dependencies come from a specific path on your system. This is especially helpful for working on the TinaCMS monorepo while using its packages in your app. `@tinacms/webpack-helpers` makes it easy to set up.

[Checkout the README](https://github.com/tinacms/tinacms/tree/master/packages/@tinacms/webpack-helpers "@tinacms/webpack-helpers") to learn how to develop TinaCMS with your website.

## Contributors

Thanks to everyone for contributing.

| # Commits | Name |
| --- | --- |
| 29 | Scott Byrne |
| 29 | Kendall Strautman |
| 28 | ncphillips |
| 6 | Jeff See |
| 3 | Marc Mintel |
| 2 | jpuri |
| 2 | Frank Taillandier |
| 1 | Mitch MacKenzie |
| 1 | dwalkr |
| 1 | Chris Flannery |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/17?closed=1 "GitHub MIlestone") for all the details on this weeks release!
