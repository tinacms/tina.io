---
title: v0.25.0 Release Notes
date: '2020-07-27T11:54:54-03:00'
author: Nolan Phillips
---
You may have noticed that there's been fewer changes to Tina in the last couple weeks, and if you did you may also have noticed that there's been a ton of changes to the documentation!

**Documentation Updates**

The TinaCMS core team's focus for the [July-August cycle]() is Documentation and Education. The original structure of the docs was centered around getting people up and running as quickly as possible using Gatsby and the Git-Filesystem. Since then we've added support for more use cases and produced a lot of changes. With all those changes the initial structure has made keeping the docs up to date difficult.

So far we've made some changes we hope you'll like

* Added a [Docs Index]() to make finding what you need even easier
* Updated the left-hand navigation to better reflect Tina's architecture
* Added a Table of Contents to the Docs and Guides
* Turned the Gatsby Docs into a set of guides.
* Added a "Packages" section
* and more!

**We're also planning on doing some user research sessions!** If you're interested in helping us get better explaining Tina in the docs and marketing then [get in touch with Daniel](https://community.tinacms.org/t/feedback-for-the-tina-team/276) in the Forum!

## Changes v0.25.0

### New Packages

* **🎉react-tinacms-strapi🎉:** a new package for using Strapi as a backend for your website. [Checkout this guide to learn more!](/guides/nextjs/tina-with-strapi/overview)

### Features

* **react-tinacms-github:** added github delete action docs to readme ([dc58e59](https://github.com/tinacms/tinacms/commit/dc58e590f0fdc4874ed243989d83a795e4930d88))
* **next-tinacms-github:** getGithubFile let's you fetch and parse a file without the entire preview props ([17cb428](https://github.com/tinacms/tinacms/commit/17cb42840b080a671d69ca91ee2b85a57fec6db9))

### Bug Fixes

* **react-tinacms-editor**
  * table delete icon should be visible only if whole table is selected ([dd3313b](https://github.com/tinacms/tinacms/commit/dd3313b8215ab30ccbdfd377bbd92883570ad8a9))
  * table row add delete icons overlapping ([cfa9949](https://github.com/tinacms/tinacms/commit/cfa9949c4580d09481362071e562fd7f795496d0))
  * UX improvements hide title input from link modal ([6e5ab20](https://github.com/tinacms/tinacms/commit/6e5ab20631435508b1e16f7261b772008c3dda1d))

### Fixed Versioning

For a long time we've struggled with [tying release notes to version numbers](https://github.com/tinacms/tinacms/issues/1331) and generating too many releases. As such, we've switched Tina to a [fixed versioning system]() to try and mitigate the issue. Besides a clear association between version numbers and release notes, this also allows us to generate a project wide [CHANGELOG]() in the repository. 

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 32 | Nolan Phillips |
| 15 | Kendall Strautman |
| 9 | Brent Mitton |
| 3 | jpuri |
| 1 | logan-anderson |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/33?closed=1) for all the details on this weeks release!