---
title: Static Mode (experimental)
id: /docs/reference/config/
last_edited: '2022-09-29T15:51:56.737Z'
next: /docs/reference/schema
prev: /docs/reference/overview
---

{{ WarningCallout text="This is an experimental feature, and the API is subject to change. We don't yet suggest using this for production use-cases. Have any thoughts? Let us know in the chat, or through the [GitHub discussion](https://github.com/tinacms/tinacms/discussions)!" }}

In contrast to traditional TinaCMS setups, static mode doesn't require you to wrap your site in a `TinaCMS` component.
The only requirement for enabling "visual editing" is the `useTina` hook.

> Read the [experimental guide to enabling static mode](/guides/tinacms/non-react-based-ssg/guide/) on a non-NextJS site.

# The config file

When you provide a file at `.tina/config.{ts,tsx,js,jsx}` that exports a `defineStaticConfig` function,
Tina will automatically generate TinaCMS as a static asset. Note that it **must be** the default export of this file.

## Definition

| Property             | Description                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `branch`             | The branch that will be used to query content on Tina Cloud (Not used in local mode)                                        |
| `clientId`           | The ClientId [generated on Tina Cloud](/docs/tina-cloud/dashboard/) (Not used in local mode)                                |
| `token`              | A read only token [generated on Tina Cloud](/docs/tina-cloud/dashboard/projects/#read-only-tokens) (Not used in local mode) |
| `build`              | Build configuration for storing Tina as a static asset                                                                      |
| `build.publicFolder` | The public asset folder for your framework                                                                                  |
| `build.outputFolder` | Within the public asset folder, the desired output location                                                                 |
| `media`              | [Media configuration](/docs/reference/media/overview/) for external and git backed media                                    |
| `schema`             | The [schema](/docs/reference/schema/) defines the shape of your content.                                                    |

## Example

```ts
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

export default defineStaticConfig({
  branch,
  token: '<Your Read Only Token>' // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  build: {
    publicFolder: 'public', // The public asset folder for your framework
    outputFolder: 'admin'  // within the public folder
  }
  schema: {
    collections: [
      //..Array of collections
    ],
  }
})
```

In this example, the TinaCMS admin will be viewable at `<my-site-url>/admin/index.html`.
For more information [check out the content modeling section](/docs/schema/)

# Enabling visual editing

> We're in the early stages of adding visual editing support in static mode, check back for more details soon!

For NextJS sites, the [visual-editing](/docs/tinacms-context/) guide is still applicable for static mode, with 2 key differences:

1. The `useTina` hook should be imported from `tinacms/dist/react`.
2. Visual mode is only enabled when you visit your site _through_ the Tina CMS iframe. For the example config
   above, this would be at `<my-site-url>/admin/index.html#/preview`.
