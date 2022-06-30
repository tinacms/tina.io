---
title: Repo-based Media (default)
last_edited: '2022-06-29T00:00:00.000Z'
prev: /docs/reference/media/overview
next: /docs/media-cloudinary
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
            publicFolder: "public",
            mediaRoot: "uploads"
          },
     }
  }
)
```

### `publicFolder`

The path to your site's "public" folder. This path is relative to your project's root.

E.g, in our [tina-cloud-starter](https://github.com/tinacms/tina-cloud-starter/tree/main/public), this value would be `"public"`

### `mediaRoot`

The path to your media folder, relative to the `publicFolder` value.

E.g, in our [tina-cloud-starter](https://github.com/tinacms/tina-cloud-starter/tree/main/public), this value would be `"uploads"`

> Note, anything in this directory will be synced with Tina Cloud's media server, and the images will be publicly accessible.

`mediaRoot` can be set to "", if you want your media to be uploaded to the root of your `publicFolder`.

## Usage

Once media has been configured, you can use `image` fields in your collections.

In your `.tina/schema.ts` add a new `image` field to a collection, e.g:

```ts
 // ...
 {
  name: 'hero',
  type: 'image',
  label: 'Hero Image',
 }
```

When your editors add an image to a document, the value that is saved will be a relative path:

`"/<mediaRoot>/<imgName>"`
