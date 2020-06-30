---
title: 2020-06-23 Release Notes
date: '2020-06-23T10:55:49-03:00'
author: Nolan Phillips
---
This week is a bit lighter on changes. The TinaCMS team is wrapping up a couple projects and working on some new guides.

[**🚨 SECURITY UPDATE 🚨**](/blog/upgrade-notice-improved-github-security)

This week we're releasing an update to `next-tinacms-github` which improves the security around GitHub authentication and requests.

[**Please see this blog post for more details**](/blog/upgrade-notice-improved-github-security)

## Changes

### next-tinacms-github

#### Security Update

* The authentication flow has been updated to better protect against CSRF attacks. 

### react-tinacms-github

#### Features

* **New Event:** When switching branches a new event of type `github:branch:checkout` is dispatched.
* **Closing Modals:** The auth and branch switching modals are closed automatically on success.

### react-tinacms-inline

#### Features

* **InlineBlocks:** Additional props can be passed to block items via the `itemProps` prop.

#### Fixes

* **InlineBlocks Direction:**  Renamed acceptable values to match `react-beautiful-dnd`.
  * `"row"` => `"horizontal"`
  * `"column"` => `"vertical"`

### react-tinacms-editor

#### Feature

* **Selecting text** and clicking the Code Block menu item will put all that text in a code block
* **CMD-ALT-0** keyboard shortcut will toggle a Code Block

Fixes

* **Table Menu Item** is disabled when inside Code Blocks

### tinacms

#### Fixes

* **useCMS:** Triggers an update when the `cms.enabled` state is changed.

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 9 | Nolan Phillips |
| 7 | Joel Huggett |
| 6 | DJ |
| 4 | Logan Anderson |
| 2 | 🎉 sakulstra 🎉 |
| 2 | Kendall Strautman |
| 2 | jpuri |
| 1 | 🎉 Lukas Strassel 🎉 |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/29?closed=1) for all the details on this weeks release!