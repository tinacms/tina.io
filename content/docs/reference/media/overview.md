---
title: Media Overview
last_edited: '2022-06-29T00:00:00.000Z'
next: /docs/reference/media/repo-based
---

TinaCMS provides multiple options for managing media.

![media-manager-image](/img/media-manager-ui.png)

All of the media configuration is done in the `defineSchema` function under `config.media`.

Example:

```ts
// .tina/schema.{ts,js,tsx,jsx}

const schema = defineSchema({
  config: {
    media:{
        // Media config
        tina: {
            // Repo-based Media config
        },
        // function that loads  the media store
        loadCustomStore: async ()=>{},
    }
    //.. Other config
  }
  collections: [
    //..Array of collections
  ],
})

// ...

export default schema
```

> Note: Can only Repo-based Media or an External Media Provider but **not both**

## Repo-based Media (default)

With the built-in repo-based media option, media is stored within the site's repository.

[Read more about repo-based media here](/docs/reference/media/repo-based)

## External Media Providers

TinaCMS also supports pluggable external media providers.

[Read more about the external media store implementation here](/docs/reference/media/external/authentication)
