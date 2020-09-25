---
title: Media
prev: /docs/events
next: /docs/apis
last_edited: '2020-09-22T15:53:15.812Z'
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
  previewSrc(
    src: string,
    fieldPath?: string,
    formValues?: any
  ): Promise<string> | string
  list(options?: MediaListOptions): Promise<MediaList>
  delete(media: Media): Promise<void>
}

interface Media {
  type: 'file' | 'dir'
  id: string
  directory: string
  filename: string
  previewSrc?: string
}

interface MediaList {
  items: Media[]
  limit: number
  offset: number
  nextOffset?: number
  totalCount: number
}

interface MediaUploadOptions {
  directory: string
  file: File
}

interface MediaListOptions {
  directory?: string
  limit?: number
  offset?: number
}
```

**Media Store**

| Key          | Description                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`     | The [input accept string](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that describes what kind of files the Media Store will accept. |
| `persist`    | Uploads a set of files to the Media Store and returns a Promise containing the Media objects for those files.                                                         |
| `previewSrc` | Given a `src` string, it returns a url for previewing that content. This is helpful in cases where the file may not be available in production yet.                   |
| `list`       | Lists all media in a specific directory. Used in the media manager.                                                                                                   |
| `delete`     | Deletes a media object from the store.                                                                                                                                |

**Media**

This represents an individual file in the `MediaStore`.

| Key          | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `type`       | Indicates whether the object represents a file or a directory. |
| `id`         | A unique identifier for the media item.                        |
| `directory`  | The path to the file in the store. e.g. `public/images`        |
| `filename`   | The name of the file. e.g.`boat.jpg`                           |
| `previewSrc` | A url that provides an image preview of the file.              |

**Media List**

This represents a paginated query to the `MediaStore` and its results.

| Key          | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `items`      | An array of `Media` objects.                                    |
| `limit`      | The number of records returned by the current query.            |
| `offset`     | A number representing the beginning of the current record set.  |
| `nextOffset` | A number representing the beginning of the next set of records. |
| `totalCount` | The total number of records available.                          |

**Media Upload Options**

| Key         | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `directory` | The directory where the file should be uploaded.                                  |
| `file`      | The [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to be uploaded. |

**Media List Options**

| Key         | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| `directory` | The current directory to list media from.                                                  |
| `limit`     | The number of records that should be returned.                                             |
| `offset`    | A number representing how far into the list the store should begin returning records from. |

### Adding a Media Store

Add the media store by assigning it to `cms.media.store` in a context where you have access to the CMS object.

```javascript
import { MyMediaStore } from './my-media-store'

cms.media.store = new MyMediaStore()
```

Or you can define it in the [CMS config](/docs/getting-started/cms-set-up/#configure-the-cms-object) object:

```js
const github = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.BASE_REPO_FULL_NAME,
})

const tinaConfig = {
  enabled: pageProps.preview,
  toolbar: pageProps.preview,
  apis: {
    github,
  },
  media: new GithubMediaStore(github),
  plugins: [BlogPostCreatorPlugin, ReleaseNotesCreatorPlugin],
}

const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])
```

> #### Supported Media Stores
>
> - [`GitMediaStore`](/guides/nextjs/git/adding-backend): Saves media to your Git repository by writing to the local system and commiting directly.
> - [`GithubMediaStore`](/packages/react-tinacms-github): Saves media to to your Git repository through the GitHub API.
> - [`StrapiMediaStore`](https://tinacms.org/packages/react-tinacms-strapi/): Handles media stored in a Strapi instance.

<!-- TODO....

## Media Manager

....explain how it works, upload a photo, how it can be accessed and customized etc.
-->
