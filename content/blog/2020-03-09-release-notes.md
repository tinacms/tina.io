---
title: 2020-03-09 Release Notes
date: '2020-03-09T05:00:00.000Z'
author: Nolan Phillips
---
## Enhancements

* **Markdown/HTML Fields**
  * Added **Undo** and **Redo** buttons to the Menu
  * Added the ability to set the top-offset of the Menu by passing a string as the `sticky` prop when using inline edting:

    ```jsx
    <Wysiwyg sticky="16px" />
    ```

## Bug Fixes

* **Markdown/HTML Fields**
  * Fixed the position of the modals for editing image and link properties.
  * Fixed a bug that caused the page scroll to jump when editing text inline.
  * Fixed a z-index issue with the Menu
  * Fixed an issue where the table and image menus were re-rendering unnecessarily.
* **Select Field:** Loosened Typescript types around the Label
* **React Warnings:** Fixed a number of warnings related to the `key` prop not being set for arrays.

## Contributors

A big thanks to all our contributors for this release! <3

| # Commits | Name |
| --- | --- |
| 23 | Nolan Phillips |
| 4 | jpuri |
| 2 | Scott Byrne |
| 1 | DJ |
| 1 | Kendall Strautman |
| 1 | Maciej Grzybek |

## GitHub Milestone

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/15?closed=1 "2020-03-09 Release") for all the details on this weeks release!
