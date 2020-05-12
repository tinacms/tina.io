---
title: 2020-03-30 Release Notes
date: '2020-03-30T10:32:43-03:00'
author: Nolan Phillips
---

Another week gone and another week closer to Open Authoring for everyone! Refactoring on tinacms.org is going well and a good API is becoming visible. To keep in touch with where Tina is headed in the near term take a look at our two ongoing GitHub projects:

- [Open Authoring with GitHub + Next.js](https://github.com/orgs/tinacms/projects/1 'Open Authoring with GitHub + Next.js')
- [Markdown Wysiwym](https://github.com/tinacms/tinacms/projects/5 'Markdown Wysiwym')

There is also a tinacms/rfcs repository where larger changes are described and discussed. There are currently two RFCs related to Open Authoring:

- [Toolbar Widgets](https://github.com/tinacms/rfcs/pull/5/files)
- [Tinacms Open Authoring Packages](https://github.com/tinacms/rfcs/pull/6/files)

If you're interested in getting involved then jump into the #dev channel in the [TinaCMS Slack](https://join.slack.com/t/tinacms/shared_invite/enQtNzgxNDY1OTA3ODI3LTNkNWEwYjQyYTA2ZDZjZGQ2YmI5Y2ZlOWVmMjlkYmYxMzVmNjM0YTk2MWM2MTIzMmMxMDg3NWIxN2EzOWQ0NDM 'TinaCMS Slack') group or take a look through the list of [open issues](https://github.com/tinacms/tinacms/issues 'TinaCMS Issues'). And don't forget to Star Tina on GitHub!

### Enhancements

- **Blocks, Groups, & Group List:** These fields now use the description attribute
- **Wysiwyg:** Dragging images onto the Wysiwyg will now try to upload them. This API is not yet documented.

### Refactoring

- `@tinacms/react-forms`: Extracted from _tinacms_. This package defines the Components used for rendering forms in the Sidebar and in Modals.
- `@tinacms/fields`: Added field plugins from _tinacms._

## Contributors

Thanks to everyone for contributing.

| # Commits | Name              |
| --------- | ----------------- |
| 17        | ncphillips        |
| 9         | Jeff See          |
| 6         | jpuri             |
| 6         | Jeff See          |
| 4         | DJ                |
| 3         | Kendall Strautman |
| 3         | Scott Byrne       |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/18?closed=1 'GitHub MIlestone') for all the details on this weeks release!
