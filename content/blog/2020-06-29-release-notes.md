---
title: 2020-06-29 Release Notes
date: '2020-06-28T21:00:00-03:00'
author: Nolan Phillips
---

This week we have a few breaking changes, a couple small features, and some bug fixes to share with you!

Last week the TinaCMS team finished up it's first [6-week project on improving inline editing with blocks](). To learn more about inline editing checkout our new guide: [Working with Inline Blocks](https://tinacms.org/guides/general/inline-blocks/overview). We are no taking 2 weeks to cool down, reorient, and pick our next round of projects.

Have any questions about the release or opinions on what we should focus on next? Head over to the [the Forum Topic](https://community.tinacms.org/t/release-notes-june-29-2020/233) for this week's release and leave a comment!

## Breaking Changes

### _react-tinacms-date_ 💥

The date field plugin is no longer one of the default fields provided by `tinacms`.

**This change has reduced the js bundle impact of tinacms by over 700kb**

#### How to Upgrade

To use the `DateFieldPlugin` on your website you must now install `react-tinacms-date` and register it with your `cms`.

```js
import { DateFieldPlugin } from 'react-tinacms-date'

cms.plugins.add(DateFieldPlugin)
```

For more information on how you can reduce the size of your bundle by dynamically loading the `DateFieldPlugin` checkout the[ Pull Request](https://github.com/tinacms/tinacms/pull/1281) or visit [the docs](/docs/plugins).

---

### _react-tinacms-github_ 💥

Since this package was made back in the days before we had `cms.events` or `cms.enabled` there is a bit of an awkward interaction between it and the CMS. This week we [released a change](https://github.com/tinacms/tinacms/pull/1287) that addressed those issues.

#### How to Upgrade

First we need to change the `TinaGithubProvider` props to:

1. Remove `editMode`
2. Rename `enterEditMode` to `onLogin`
3. Rename `exitEditMode` to `onLogout`

```diff
<TinaGithubProvider
  error={pageProps.error}
- editMode={pageProps.preview}
- enterEditMode={enterEditMode}
- exitEditMode={exitEditMode}
+ onLogin={enterEditMode}
+ onLogout={exitEditMode}
/>
```

Next you'll want to replace all references `useGithubEditing` with `useCMS` . For example:

```diff
- import { useGithubEditing } from 'react-tinacms-github'
+ import { useCMS } from 'tinacms'

export const EditLink = () => {
- const github = useGithubEditing()
+ const cms = useCMS()

  return (
    <button
      onClick={
-       github.editMode ? github.exitEditMode : github.enterEditMode
+       () => cms.toggle()
      }
    >
-     {isEditing ? 'Exit Edit Mode' : 'Edit This Site'}
+     {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

---

### _tinacms 💥_

**The third breaking change of this release is updates to the Sidebar and Toolbar** APIs. Due to an awkward transition period, those APIs were inconsistent and awkward to work with. This [pull request]() tries to address that.

- Both the Sidebar and Toolbar are opt-in now
- Passing `true` is enough; no need for a full config object.
- The `hidden` property is removed from both the Sidebar and the Toolbar. This is instead controlled via `cms.enabled` .

[Checkout the docs to learn more.](/docs/ui)

## Other Changes

### _react-tinacms-inline_

**Maximum and Minimum Block Count**

The `InlineBlocks` field now accepts two more props: `max` and `min` . These optional fields can be used to limit how many blocks the user can add and remove from the field.

```tsx
<InlineBlocks name="feature-list" blocks={FEATURE_BLOCKS} min={1} max={3} />
```

For more information on how blocks work, check out the [docs]() or read [the new guide](/guides/general/inline-blocks/overview)

---

#### _react-tinacms-editor_

**Bug Fixes**

- Fixed an issue where creating a table added an extra paragraph to the document.
- When a Code Block is copied the language setting is now preserved.

## Contributors

Thanks to everyone for contributing!

| # Commits | Name              |
| --------- | ----------------- |
| 29        | Nolan Phillips    |
| 8         | Kendall Strautman |
| 7         | Scott Byrne       |
| 2         | Logan Anderson    |
| 2         | jpuri             |
| 1         | Jeff See          |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/30?closed=1) for all the details on this weeks release!
