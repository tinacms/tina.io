---
title: 2020-04-06 Release notes
date: '2020-04-06T11:28:19-03:00'
author: Nolan Phillips
---
The TinaCMS core team continues to work towards making [Open Authoring with GitHub + Next.js](https://github.com/orgs/tinacms/projects/1) a viable solution for all open source projects!

Last week the team finished the bulk of the refactoring needed to make this possible. The main `tinacms` package has been decoupled from the Sidebar UI, the changes from [RFC 0005](https://github.com/tinacms/rfcs/blob/master/0005-toolbar-widget.md) have been implemented, and a draft PR has been created to [add the Toolbar package](https://github.com/tinacms/tinacms/pull/973).

A [pull request has also been opened to add a new `react-tinacms-github` package](https://github.com/tinacms/tinacms/pull/960) to the repository. This package provides all the front-end code needed to use TinaCMS to authenticate and edit content via the GitHub API. We'll be testing the pre-release of this package this week on this very site!

Another draft PR has started for `next-tinacms-github`, a package of helpers for setting up your Next.js website to work with `react-tinacms-github`. This package will help you setup the new [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) introduced in Next 9.3

Those PRs are still in progress so here are some highlights from the changes we released this week!

## Changes

### Features

* **Wysiwyg:** A new "image" menu item makes it easier for users to upload images using the Wysiwyg. [#929](https://github.com/tinacms/tinacms/milestone/19?closed=1)

### Fixes

* **Wysiwyg:** Fixed an issue preventing the user from exiting inline-code to the right. [#962](https://github.com/tinacms/tinacms/pull/962)
* **Inline Editing:** Improved the way inline blocks keep track of focus. [#952](https://github.com/tinacms/tinacms/pull/952)
* **z-index:** Added new variables to better handle some z-index issues. [#964](https://github.com/tinacms/tinacms/pull/964)

### New Packages

Continuing the [refactoring planned a few weeks ago](https://tinacms.org/blog/tinacms-ui-whats-next), we introduced two new packages:

* @tinacms/react-sidebar
* @tinacms/react-screens

## Contributors

Thanks to everyone for contributing!

And a special thanks to Brandon Landried for making his first contribution to Tina!

| # Commits | Name |
| --- | --- |
| 37 | Nolan Phillips |
| 24 | Scott Byrne |
| 6 | Kendall Strautman |
| 3 | jpuri |
| 2 | Frank Taillandier |
| 2 | Brandon Landried |

## GitHub Milestone

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/19?closed=1 "GitHub MIlestone") for all the details on this weeks release.
