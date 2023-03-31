---
title: TinaCMS V1.3.2
date: '2023-03-10T04:00:00.000Z'
last_edited: '2023-03-10T04:00:00.000Z'
author: James O'Halloran
---

TinaCMS Version `1.3.2` (and `@tinacms/cli@1.3.2`) improves media, adds support for special characters in field names, and some other fixes and improvements.

## Using Field names with special characters (using nameOverride)

Tina now supports fields with special characters through the use of the `nameOverride` property.

```
// fields
{
  name: 'my_field',
  nameOverride: 'my-field',
  type: 'string'
}
```

You can also use nameOverride to use special restricted field names like `id`

```
// fields
{
  name: 'custom_id',
  nameOverride: 'id',
  type: 'string'
}
```

The above field will read/write to the frontmatter key `id`, which previously wasn't possible.

## Media Manager Updates

Editors can now browse media in the media library through a grid view. A sidebar slides out to show some image metadata: filename, image URL (coming soon).

![Media Grid View](https://res.cloudinary.com/forestry-demo/image/upload/v1678481393/tina-io/blog/media-manager_uuaotf.png "Media Grid View")

Editors can also easily copy the absolute image URL from the media library.

## PDF Uploads

Editors can now upload some non-image file types to the media library. When inserted into a rich-text field, files are inserted as links, while images are inserted as markdown images.

[See Pull Request](https://github.com/tinacms/tinacms/pull/3655 "")

## Other fixes & improvements

* fix: Improve error message when indexing hasn't finished, and build is triggered.
* fix: When current branch doesn't exist, handle error more gracefully
* Remove warning about TinaProvider being deprecated.
* security: update some 3rd party dependencies
* feat: Add docusaurus starter to create-tina-app CLI
* fix: "Previous Directory" link in Tina MediaManager (Thanks @coreyaus)!
