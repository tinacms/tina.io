---
title: TinaCMS V1.3.0
date: '2023-03-08T04:00:00.000Z'
last_edited: '2023-03-08T04:00:00.000Z'
author: James O'Halloran
---

TinaCMS Version `1.3.0` (and `@tinacms/cli@1.2.1`) improves media, adds support for special characters in field names, and some other fixes and improvements.

## Using Field names with special characters (using nameOverride)

Tina now supports using fields special characters (or using other special field names like `id`) through the use of the `nameOverride` property.

```
// fields
{
  name: 'custom_id',
  nameOverride: 'id',
  type: 'string'
}
```

The above field will read/write to the frontmatter key `id`, which previously wasn't possible.

## Media Manager Grid View

Editors can now browse media in the media library through a grid view. A sidebar slides out to show some image metadata: filename, image URL (coming soon).

![Media Grid View](https://user-images.githubusercontent.com/5075484/222774276-a1cf302d-ef7d-4816-9e68-e9cdfa6f9ebc.png 'Media Grid View')

## PDF Uploads

Editors can now upload some non-image file types to the media library. When inserted into a rich-text field, files are inserted as links, while images are inserted as markdown images.

[See Pull Request](https://github.com/tinacms/tinacms/pull/3655)

## Other fixes & improvements

- fix: Improve error message when indexing hasn't finished, and build is triggered.
- fix: When current branch doesn't exist, handle error more gracefully
- Remove warning about TinaProvider being deprecated.
- security: update some 3rd party dependencies
- feat: Add docusaurus starter to create-tina-app CLI
- fix: "Previous Directory" link in Tina MediaManager (Thanks @coreyaus)!
