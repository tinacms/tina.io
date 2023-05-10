---
title: Config Reference
id: /docs/reference/config/
last_edited: '2022-09-29T15:51:56.737Z'
next: /docs/reference/schema
prev: /docs/reference/overview
---

<!-- TODO: Move this info somewhere -->

<!-- In contrast to traditional TinaCMS setups, static mode doesn't require you to wrap your site in a `TinaCMS` component.
The only requirement for enabling "visual editing" is the `useTina` hook. -->

# The config file

When you provide a file at `tina/config.{ts,tsx,js,jsx}` that exports a `defineConfig` function,
Tina will automatically generate TinaCMS as a static asset. Note that it **must be** the default export of this file.

<div class="short-code-warning">
  <div>
    <p>The location for the config file was previously at <code>.tina/config.{ts,tsx,js,jsx}</code>
  </div>

  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 464h448L256 48 32 464zm248-64h-48v-48h48v48zm0-80h-48v-96h48v96z" />
  </svg>
</div>

## Definition

| Property             | Description                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `branch`             | The branch that will be used to query content on Tina Cloud (Not used in local mode)                                        |
| `clientId`           | The ClientId [generated on Tina Cloud](/docs/tina-cloud/dashboard/) (Not used in local mode)                                |
| `token`              | A read only token [generated on Tina Cloud](/docs/tina-cloud/dashboard/projects/#read-only-tokens) (Not used in local mode) |
| `build`              | Build configuration for storing Tina as a static asset                                                                      |
| `build.publicFolder` | The public asset folder for your framework                                                                                  |
| `build.outputFolder` | Within the public asset folder, the desired output location                                                                 |
| `build.basePath`     | If your site will be served at a sub-path like `my-domain.com/my-site`, provide `"my-site"`                                 |
| `media`              | [Media configuration](/docs/reference/media/overview/) for external and git backed media                                    |
| `schema`             | The [schema](/docs/reference/schema/) defines the shape of your content.                                                    |

## Example

```ts
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main'

export default defineConfig({
  branch,
  token: '<Your Read Only Token>' // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  build: {
    publicFolder: 'public', // The public asset folder for your framework
    outputFolder: 'admin'  // within the public folder
  }
  // See https://tina.io/docs/reference/schema/ for more information
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
