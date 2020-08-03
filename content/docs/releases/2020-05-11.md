---
title: '2020-05-11 Release Notes: Tidying Up'
date: '2020-05-11T10:19:38-03:00'
author: Nolan Phillips
---
Today marks the second week of the TinaCMS core team's 2 week cool down.

During this cooldown we're taking a step back to tie up some loose ends and get some perspective on the project. On Thursday we will be getting together to decide what's next.

Until then, here's some of the additions and fixes we put together last week.

## Changes

### Features

**@tinacms/core**

* A new concept that allows disparate parts of the CMS to communicate. More on this later.

**react-tinacms-github**

* The `GithubClient` constructor accepts an optional `scope`. This defaults to `public_repo` but can be set to `repo` if you need to support private repositories.

### Bug Fixes

**gatsby-tinacms-plugins:**

* Fixed the `@types` dependencies for the gatsby packages

**react-tinacms-editor:**

* Disable the link button if no text is selected.
* Fixed issue that required multiple clicks to trigger table-menu items.
* Fixed regression that broke the menu's sticky behaviour

**react-tinacms-github:**

* Fixed a call-stack error when accessing `githubClient.branchName` during SSR
* Actions can be set on `useGithubForm`
* The `options` argument of `useGithubForm` is now optional
* Display a modal to handle errors thrown while creating Pull Requests or Branches

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 50 | Nolan Phillips |
| 7 | jpuri |
| 2 | 🎉 Brandon Shackelford 🎉 |
| 1 | Scott Byrne |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/22?closed=1) for all the details on this weeks release!