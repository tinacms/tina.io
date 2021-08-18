---
title: Using GitHub Forms
---

You may have noticed that the Tina sidebar is still empty, that's because we need to create a [Form](/docs/plugins/forms) to edit the content. Any forms that we have on our site can be created with the `useGithubJsonForm` or `useGithubMarkdownForm` helpers. These helpers will fetch and post data through the GitHub API via the `GithubClient` we registered in `_app.tsx`.

**pages/index.tsx**

```diff
//...
+ import { usePlugin } from 'tinacms'
+ import { useGithubJsonForm } from 'react-tinacms-github'

export default function Home({ file }) {
-  const data = file.data
+  const formOptions = {
+    label: 'Home Page',
+    fields: [{ name: 'title', component: 'text' }],
+  }

  // Registers a JSON Tina Form
+  const [data, form] = useGithubJsonForm(file, formOptions)
+  usePlugin(form)

  return (
    // ...
  )
}

//...
```

> **How does this compare to the Tina-Git form helpers?**
>
> Tina-GitHub takes a different approach to editing content. Instead of writing locally to the filesystem via Git, the Tina-GitHub helpers source data and commit to a _Working GitHub Repository_.

Start up the dev server, enter "Edit Mode" **open the sidebar and edit the title**! You've set up GitHub editing with Tina. If you "Save", that will commit your master branch.

After updating and saving content changes, if you toggle edit mode you may notice a difference in the content source. When you're not in edit mode, the site will reference _local content_. When you go into edit mode, it will reference content in the associated GitHub repository (i.e. _Working Repository_).
