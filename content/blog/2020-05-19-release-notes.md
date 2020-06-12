---
title: '2020-05-19 Release Notes: Deprecating Default Editors'
date: '2020-05-19T10:24:35-03:00'
author: Nolan Phillips
---
Last Friday marked the end of the TinaCMS core team's Cool Down period and now that [the long weekend](https://en.wikipedia.org/wiki/Victoria_Day "Victoria Day") is over we're ready to get back to work!

On Thursday we ran [a betting table](https://basecamp.com/shapeup/2.2-chapter-08#the-betting-table "Shape Up: Chapter 8") where team members pitched different projects that would guide us for the next 6 weeks. Here are the projects we came up with.

### Project 1: Marketing Page Builder Demo

The aim of TinaCMS is to let developers create amazing editing experiences. A large part of that is the inline editing experience. To help push this forward we will be creating a prototypical page-builder. Although this project may be used as a reference for future work, the goal of this particular project is _not_ to create a production-ready template for people looking to create marketing sites. Instead, the goal is to improve the inline editing experience (both UX and DX) so that Tina can be used with complex design systems

### Project 2: Cross-platform GitHub Workflow

Our current workflow for using TinaCMS with GitHub requires developers to use Next.js, and involves running a lot of server-side code. In order to expand the range of possible use-cases, we will be spending some time to figure out how to create a vendor-agnostic workflow for GitHub; the eventual goal is to support a GitHub-based workflow for people building sites with Create React App, Gatsby, or any other SSG.

## Deprecation

### Markdown and HTML Fields as Default Plugins

The WYSIWYG component defined in `react-tinacms-editor` is a huge part of `tinacms`. I mean that both figuratively and literally. The WYSIWYG is a necessity for editing content, but it takes a lot of code to build an Editor.

Minimizing bundle-size is incredibly important for frontend development and as it stands the `react-tinacms-editor` is responsible for **over 60% of the bundle-size** impact by TinaCMS. Since the Markdown and HTML fields are included by default with `tinacms`, every website that uses Tina will be negatively impacted by that extra code, even if they aren't using them.

As such, we've decided to deprecate the Markdown and HTML fields as _default_ plugins. This goes a long way toward improving the performance of sites using TinaCMS. **These plugins are still available** however you will need to install them and include them manually.

**This change will be released next week (May 25th 2020).**

[**For more information check out the active Pull Request.**](https://github.com/tinacms/tinacms/pull/1134)

## Changes

### Features

**react-tinacms-editor**

* Added Strikethrough Support

## Contributors

Thanks to [Jyoti Puri]() for contributing!

## GitHub Milestones

Check out the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/23?closed=1) for all the details on this week's release!