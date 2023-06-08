---
title: The Schema
id: /docs/reference/schema/
last_edited: '2022-06-15T15:51:56.737Z'
next: /docs/reference/collections
prev: /docs/reference/overview
---

The Schema is located in `tina/config.{ts,tsx,js,jsx}` and it is used to define the shape of the content.

## Definition

| Property          | Description                                                                                  |
| ----------------- |----------------------------------------------------------------------------------------------|
| `collections`     | An array of [collections](/docs/reference/collections/).                                     |
| `config`          | The configuration for tinaCMS                                                                |
| `config.branch`   | The branch that will be used to query content on Tina Cloud. (Not used in local mode )       |
| `config.clientId` | The ClientId [generated on Tina Cloud](/docs/tina-cloud/dashboard/)                          |
| `config.token`    | A read only token [generated on Tina Cloud](/docs/tina-cloud/dashboard/projects/#api-tokens) |
| `config.media`    | [Media configuration](/docs/reference/media/overview/) for external and git backed media     |

## Example

```ts
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  ''

export default defineConfig({
  //...
  branch,
  token: '<Your Read Only Token>', // generated on app.tina.io
  clientId: '<Your Client ID>', // generated on app.tina.io
  schema: {
    collections: [
      //..Array of collections
    ]
  }
})
```

For more information [check out the content modeling section](/docs/schema/)
