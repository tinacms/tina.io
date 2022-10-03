---
title: Repo-based Media (default)
last_edited: '2022-06-29T00:00:00.000Z'
prev: content/docs/reference/media/overview.md
next: content/docs/reference/media/cloudinary.md
---

Repo-based media storage is the default media storage solution for TinaCMS.

## Configuration

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

E.g, For any NextJS site, (such as our [tina-cloud-starter](https://github.com/tinacms/tina-cloud-starter/tree/main/public)), this value would be `"public"`

### `mediaRoot`

The path to your media folder, relative to the `publicFolder` value.

E.g, in our [tina-cloud-starter](https://github.com/tinacms/tina-cloud-starter/tree/main/public), this value would be `"uploads"`

> Note, anything in this directory will be synced with Tina Cloud's media server, and the images will be publicly accessible.

`mediaRoot` can be set to "", if you want your media to be uploaded to the root of your `publicFolder`.

### next/image

If you are using Next images, you will need to add the following to your `next.config.js` file to allow access to external images hosted on the Tina media hostname:

```js
module.exports = {
  images: {
    domains: ['assets.tina.io'],
  },
}
````

See the [next/image docs](https://nextjs.org/docs/api-reference/next/image#domains) for more information.

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

## Branching Caveats

Repo-based media is designed to be used around a single-branch workflow. If your project is using the [experimental branching plugin](https://tina.io/docs/tina-cloud/branching/), there's some known caveats to be aware of.

- Images cannot be altered, once uploaded any subsequent changes to an asset will not be reflected.
- If you only have a single branch with media enabled, the media store will source/upload images to/from that branch.
- If you have multiple branches with media enabled, then all media will be sourced/uploaded to/from the repository's default branch.
