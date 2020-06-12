---
title: 2020-06-08 Release Notes
date: '2020-06-08T10:15:41-03:00'
author: Nolan Phillips
---
We missed release notes for the June 1st release so this week's notes are packed!

There's been a lot of work on the Inline Editing experience in the past couple of weeks. The most notable changes are:

* Simplified API for nesting groups and blocks
* An improved focus ring and blocks UI
* Improved focus setting behavior for groups and blocks

Besides these, many other small improvements and bug fixes have been released.

## Changes

### Enhancements

**tinacms**

* **cms.enabled:** This new `enabled` flag has been added to the CMS class.

**react-tinacms-inline**

* **InlineGroup:** Added a new `InlineGroup` component.
* **Improved Focus Ring Control:** You can now customize the border radius and offset of the focus ring around Inline Blocks and Groups.

  ```tsx
  <InlineGroup
    name="frontmatter"
    focusRing={{
      borderRadius: 5,
      offset: 0,
    }}
  >
   ...
  </InlineGroup> 
  ```
* **Improved Block Controls:** The controls for editing, moving, and removing blocks has been [restyled](https://github.com/tinacms/tinacms/pull/1203) to match the Editor's menu, and [the location of the controls can now be configured.](https://github.com/tinacms/tinacms/pull/1210)
* **Cancel Block/Group Settings Changes:** It is now possible to cancel (and thus undo) any changes made to a group or block from within its [Settings modal](https://github.com/tinacms/tinacms/pull/1204).
* **Image Upload Errors:** When an [error](https://github.com/tinacms/tinacms/pull/1173) occurs during image upload, an alert will now be displayed.

**react-tinacms-editor**

* **Edit Raw Markdown:** You can now switch to [a plain textarea](https://github.com/tinacms/tinacms/issues/626) if you need to edit the raw Markdown.

**react-tinacms-github**

* **fetchFile:** added a method to the `GithubClient` that allows individual files to be fetched via the GitHub API.
* **Errors Messages:** The error message modal now [displays the message](https://github.com/tinacms/tinacms/pull/1183) from the GitHub API.

**@tinacms/forms**

* **onChange:** Added a new `onChange` method to the options for creating a form.

**gatsby-tinacms-markdown**

* **Register Markdown Field:** This field now [dynamically imports](https://github.com/tinacms/tinacms/pull/1175) the `MarkdownFieldPlugin` from `react-tinacms-editor` and registers it with the `cms`.

### Bug Fixes

**tinacms**

* **useForm:** The `loadInitialValues` prop will only be executed if the cms is enabled.
* **TinaProvider:** a check has been added to assert that the object being passed as `cms` is in fact an instance of `TinaCMS`.
* **Time Formatting:** fixed the [time formatting](https://github.com/tinacms/tinacms/pull/1150) of the DateFieldPlugin.

**react-tinacms-inline**

* **Nested Blocks & Groups:** Fixed various issues around nesting inline Blocks and Groups in multiple layers.

**react-tinacms-github**

* **Saving after Navigating:** Fixed an issue where navigating between pages would silently break the ability to save changes.

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
| 79 | Nolan Phillips |
| 70 | Kendall Strautman |
| 30 | Scott Byrne |
| 12 | Brent Mitton |
| 3 | Logan Anderson |
| 3 | Sean MacKay |
| 2 | Jyoti Puri |
| 1 | DJ Walker |

## GitHub Milestones

Check out the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/26?closed=1) for all the details on this week's release!