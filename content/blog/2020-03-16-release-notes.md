---
title: 2020-03-16 Release Notes
date: '2020-03-16T05:00:00.000Z'
author: Nolan Phillips
---

## Changes

### Contributing Experience

- **Conventional Commits:** Prevent contributors from commiting unconventional messages by having husky execute commitlint.

### Enhancements

- **tinacms:** Renamed the `<Tina>` component to `<TinaProvider>`.
- **react-tinacms-inline:** introduced components created in [tinacms.org](http://github.com/tinacms/tinacms/org)
  - Add `InlineTextarea` component
  - Add `BlockTextarea` component
  - Improved styling of block controls

### Fixes

- **Next.js:** `useJsonForm` and `useMarkdownForm` suppliy default form fields based on the initial values
- **Sidebar:** Always render the form's label in the sidebar.
- **TinaCMS:** Constructor no longer needs to be given a config object.\
   Before:
  ```js
  const cms = new TinaCMS({})
  ```
  After:
  ```js
  const cms = new TinaCMS()
  ```

## Deprecations

### _import { Tina } from "tinacms"_

As stated above, the `Tina` component has been renamed to `TinaProvider`. This new name better
describes the purpose of that component.

For now this component can still be accessed as `Tina`.

## Contributors

A big thanks to all our contributors for this release! <3

| # Commits | Name              |
| --------- | ----------------- |
| 28        | Kendall Strautman |
| 21        | Nolan Phillips    |
| 4         | Scott Byrne       |
| 1         | Marc Mintel       |

## GitHub Milestone

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/16?closed=1 '2020-03-16 Release') for all the details on this weeks release!
