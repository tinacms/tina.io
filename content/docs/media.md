---
title: Media
prev: /docs/events
next: /docs/apis
last_edited: '2020-09-10T17:32:06.911Z'
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
  previewSrc(src: string): Promise<string>
}

interface MediaUploadOptions {
  directory: string
  file: File
}

interface Media {
  type: "file" | "dir"
  directory: string
  filename: string
}
```

**Media Store**

| Key | Description |
| --- | --- |
| `accept` | The [input accept string](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that describes what kind of files the Media Store will accept. |
| `persist` | Uploads a set of files to the Media Store and returns a Promise containing the Media objects for those files. |
| `previewSrc` | Given a `src` string it returns a url for previewing that content. This is helpful in cases where the file may not be available in production yet. |

**Media**

This represents an individual file in the `MediaStore`.

| Key | Description |
| --- | --- |
| `type` | Indicates whether the object represents a file or a directory. |
| `directory` | The path to the file in the store. e.g. `public/images`  |
| `filename` | The name of the file. e.g.`boat.jpg` |

**Media Upload Options**

| Key | Description |
| --- | --- |
| `directory` | The directory where the file should be uploaded. |
| `file` | The [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to be uploaded. |

### Adding a Media Store

Add the media store by assigning it to `cms.media.store` in a context where you have access to the CMS object.

```javascript
import { MyMediaStore } from './my-media-store'

cms.media.store = new MyMediaStore()
```

> #### Supported Media Stores
>
> * [`GitMediaStore`](/guides/nextjs/git/adding-backend): Saves media to your Git repository by writing to the local system and commiting directly.
> * [`GithubMediaStore`](/packages/react-tinacms-github): Saves media to to your Git repository through the Github API.