---
title: Media Overview
last_edited: '2022-06-29T00:00:00.000Z'
next: /docs/reference/media/repo-based
---

TinaCMS provides multiple options for managing media.

![media-manager-image](/img/media-manager-ui.png)

All of the media configuration is done in the `defineConfig` function under `config.media`.

Example:

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      // Array of collections
    ],
  },
  media: {
    // Media config
    tina: {
      // Repo-based Media config
    },
    // function that loads  the media store
    loadCustomStore: async () => {},
  },
  //.. Other config
})
```

> Note: Only Repo-based Media or an External Media Provider can be configured, but **not both**

## Repo-based Media (default)

With the built-in repo-based media option, media is stored within the site's repository.

[Read more about repo-based media here](/docs/reference/media/repo-based)

## External Media Providers

TinaCMS also supports pluggable external media providers.

[Read more about the external media store implementation here](/docs/reference/media/external/authentication)

## Video Tutorial

For those who prefer to learn from video, you can check out a snippet on media from our ["TinaCMS Deep Dive"](https://www.youtube.com/watch?v=PcgnJDILv4w&list=PLPar4H9PHKVqoCwZy79PHr8-W_vA3lAOB&pp=iAQB) series.

<div style="position:relative;padding-top:56.25%;">
  <iframe width="560" frameborder="0" allowfullscreen
      style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/x0ACBQeNcts?start=388&end=469" title="TinaCMS Deep Dive (Media)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
  </iframe>
</div>
