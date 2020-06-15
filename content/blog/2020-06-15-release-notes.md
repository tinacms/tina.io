---
title: 2020-06-15 Release Notes
date: '2020-06-14T21:00:00-03:00'
author: Nolan Phillips
---
This week we've continued down the road of taking Inline Editing to the next level. Here's a quick video we put together demonstrating what's possible using **TinaCMS Inline Editing:**

<iframe width="560" height="315" src="https://www.youtube.com/embed/4qGz0cP_DSA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

We're taking a break from development now to put together a simple guide on how to setup inline editing on your own website!

## Changes

### @tinacms/fields

Improvements

* Cleaned up the Toggle field styles
* Removed unnecessary `type` attribute from the `BlockTemplate` interface
* `ImageFieldPlugin` works with async `previewSrc`

Bug Fixes

* The Tag field prevents empty strings from being added as a tag.
* Select field no longer shows default browser outline

### @tinacms/react-sidebar

Features

* A `placeholder` component can be declared which is rendered in the sidebar when there are no forms on the page.

### @tinacms/react-toolbar

Features

* Added an Exit Tina button to the actions menu on the right.

### **react-tinacms-inline**

Improvements

* The items within `InlineBlocks` can now be re-ordered via drag and drop.
* Removed extra `<div>` around Blocks and Groupd
* `InlineTextarea` shows the focus ring by default
* `InlineGroup` focusRing offset can be set with separate x and y values

Bug Fixes

* Fixed click event handling in the Settings modal. This fixed an issue that broke the Toggle Field. 
* In the Settings modal the Block and Group stay within the modal

### react-tinacms-editor

Bug Fixes

* Editor no longer changes scroll position when switching between Raw Text and Wysiwyg modes.
* Fixed the code block
* Inline code cannot be mixed with bold, italic, or strikethrough

### react-dismissible

Features

* Dismissible behaviour is available via the `useDismissible` hook

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 18 | Nolan Phillips |
| 14 | Kendall Strautman |
| 9 | Jyoti Puri |
| 5 | DJ |
| 3 | Dani Tulp |
| 1 | James O'Halloran |
| 1 | 🎉 Isabella Brookes 🎉 |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/27?closed=1) for all the details on this weeks release!