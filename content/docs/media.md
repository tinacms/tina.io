---
title: Media
prev: /docs/plugins/fields
next: /docs/inline-editing
---

**Media** in Tina refers to a set of APIs to allow packages to interact with a central store of files.

## Media Store

A **Media Store** is how the CMS handles saving and loading media files.

### Creating a Media Store

You can create your own media store by implementing the `MediaStore` interface:

```typescript
interface MediaStore {
  accept: string
  persist(files: MediaUploadOptions[]): Promise<Media[]>
}

interface MediaUploadOptions {
  directory: string
  file: File
}

interface Media {
  directory: string
  filename: string
}
```

### Adding a Media Store

Add the media store by assigning it to `cms.media.store` in a context where you have access to the CMS object.

```javascript
import { MyMediaStore } from './my-media-store'

cms.media.store = new MyMediaStore()
```

> #### Supported Media Stores
>
> - [`GitMediaStore`](/guides/nextjs/git-based/adding-backend): Saves media to your Git repository by writing to the local system and commiting directly.
> - `GithubMediaStore`: **Coming Soon.** Saves media to to your Git repository through the Github API.
