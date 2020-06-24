---
title: 2020-06-29 Release Notes
date: '2020-06-28T21:00:00-03:00'
author: Nolan Phillips
---
* What is the core team's current objectives?
* What was accomplished in the last week?
* What's next for the core team?
* Link to any relevant projects

## Changes

### react-tinacms-dates 💥

The date field plugin is no longer one of the default fields provided by `tinacms`.

**This change has reduced the js bundle impact of tinacms by over 700kb**

#### How to Upgrade

To use the `DateFieldPlugin` on your website you must now install `react-tinacms-date` and register it with your `cms`.

```js
import { DateFieldPlugin } from "react-tinacms-date"

cms.plugins.add(DateFieldPlugin)
```

For more information on how you can reduce the size of your bundle by dynamically loading the `DateFieldPlugin` checkout the[ Pull Request](https://github.com/tinacms/tinacms/pull/1281) or visit [the docs](/docs/plugins).

### react-tinacms-github 💥

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
+       cms.enabled ? cms.disable() : cms.enable()
      }
    >
-     {isEditing ? 'Exit Edit Mode' : 'Edit This Site'}
+     {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}
```

## Contributors

Thanks to everyone for contributing!

| # Commits | Name |
| --- | --- |
|  |  |
|  |  |
|  |  |
|  |  |

## GitHub Milestones

Checkout the [GitHub Milestone](https://github.com/tinacms/tinacms/milestone/1?closed=1) for all the details on this weeks release!