---
title: Media Overview
last_edited: '2022-06-29T00:00:00.000Z'
next: /docs/reference/media/repo-based
---

Repo-based media storage is the default media storage solution for TinaCMS.

## Congfiguration

To configure repo-based media in your project, add the following to your schema definition in `.tina/schema.ts`

```ts
//.tina/schema.ts

const schema = defineSchema(
  // ...
  config: {
     media: {
        tina: {
            publicFolder: "",
            mediaRoot: ""
          },
     }
  }
)
```

### `publicFolder`

TODO

### `mediaRoot`

TODO
