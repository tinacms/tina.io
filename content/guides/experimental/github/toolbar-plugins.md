---
title: Set Up Toolbar Plugins
---

Tina provides a few _Toolbar Plugins_ that expose more information and functionality for the Open Authoring workflow. Here's an example of how to use those plugins:

**pages/index.tsx**

```diff
 import Head from 'next/head'
 import {
   useGithubJsonForm,
+  useGithubToolbarPlugins,
 } from 'react-tinacms-github'
 import { GetStaticProps } from 'next'

 export default function Home({ file, preview }) {
   const formOptions = {
     label: 'Home Page',
     fields: [{ name: 'title', component: 'text' }],
   }

   const [data, form] = useGithubJsonForm(file, formOptions)
   usePlugin(form)

+  useGithubToolbarPlugins()

   return (
     // ...
   )
 }
```

The toolbar in your `create-next-app` should now look something like this, notice the additional widgets:

![toolbar-plugins](/img/github-open-auth-cna/toolbar-plugins.png)

The _PR Plugin_ enables someone to open a PR from a fork. And the _Fork Name Plugin_ provides metadata about the _Working Repository_ where the content is being sourced from.

> Note that if you're the repository owner on the master branch, you won't be able to create a pull request.
