---
title: Media
prev: /docs/events
next: /docs/apis
last_edited: '2020-09-29T15:53:15.812Z'
---

**Media** in Tina refers to a set of APIs to allow packages to interact with a central store of files.

## Media Store

A **Media Store** handles media files for the CMS. Media Stores provide a set of functions to specify how media should be sourced, deleted, and saved, among other things.

> ### Supported Media Stores
>
> - [`GithubMediaStore`](/packages/react-tinacms-github): Saves and sources media to/from your Git repository through the GitHub API.
> - [`NextGithubMediaStore`](/packages/next-tinacms-github#nextgithubmediastore): Configures media sourced from GitHub specifically for Next.js projects.
> - [`StrapiMediaStore`](/packages/react-tinacms-strapi/): Handles media stored in a Strapi instance.
> - [`GitMediaStore`](/guides/nextjs/git/adding-backend): Saves media to your Git repository by writing to the local system and commiting directly.

### Creating a Media Store

While there are a few media stores provided by Tina packages, you can create your own media store by implementing the `MediaStore` interface:

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

#### Media Store

| Key          | Description                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`     | The [input accept string](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that describes what kind of files the Media Store will accept. |
| `persist`    | Uploads a set of files to the Media Store and returns a Promise containing the Media objects for those files.                                                         |
| `previewSrc` | Given a `src` string, it returns a url for previewing that content. This is helpful in cases where the file may not be available in production yet.                   |
| `list`       | Lists all media in a specific directory. Used in the media manager.                                                                                                   |
| `delete`     | Deletes a media object from the store.                                                                                                                                |

#### Media

This represents an individual file in the `MediaStore`.

| Key          | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `type`       | Indicates whether the object represents a file or a directory. |
| `id`         | A unique identifier for the media item.                        |
| `directory`  | The path to the file in the store. e.g. `public/images`        |
| `filename`   | The name of the file. e.g.`boat.jpg`                           |
| `previewSrc` | _Optional:_ A url that provides an image preview of the file.  |

#### Media List

This represents a paginated query to the `MediaStore` and its results.

| Key          | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `items`      | An array of `Media` objects.                                                |
| `limit`      | The number of records returned by the current query.                        |
| `offset`     | A number representing the beginning of the current record set.              |
| `nextOffset` | _Optional:_ A number representing the beginning of the next set of records. |
| `totalCount` | The total number of records available.                                      |

#### Media Upload Options

| Key         | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `directory` | The directory where the file should be uploaded.                                  |
| `file`      | The [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to be uploaded. |

#### Media List Options

| Key         | Description                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `directory` | _Optional:_ The current directory to list media from.                                                  |
| `limit`     | _Optional:_ The number of records that should be returned.                                             |
| `offset`    | _Optional:_ A number representing how far into the list the store should begin returning records from. |

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

### Extending a Media Store

There may be times when you want to adjust or customize the functionality of a particular media store. For example, with `GitMediaStore`, you may want to override the `previewSrc` function to specify exactly how the image previews in the media manager list should be sourced.

**Override a method on an extended media store**

```js
import { GitMediaStore } from '@tinacms/git-client'

export class MyGitMediaStore extends GitMediaStore {
  previewSrc(src) {
    return /jpg|jpeg|png|svg|gif$/.test(src.toLowerCase())
      ? src.replace('/public', '')
      : null
  }
}
```

**Add the new media store to your app**

```js
const client = new GitClient('http://localhost:3000/___tina')

this.cms = new TinaCMS({
  enabled: process.env.NODE_ENV !== 'production',
  toolbar: true,
  sidebar: {
    position: 'overlay',
  },
  apis: {
    git: client,
  },
  media: new MyGitMediaStore(client),
})
```

This is exactly how the [`NextGithubMediaStore`](https://github.com/tinacms/tinacms/blob/master/packages/next-tinacms-github/src/next-github-media-store.ts) works — it extends `GithubMediaStore` to customize the functions specifically for Next.js project configuration.

## Media Manager

The media manager is an interface for interacting with the Media Store. The media manager can be accessed by clicking on image fields, or through the [global form menu](/docs/plugins/screens/#name-icon--component).

![tinacms-media-manager](/img/media-manager-ui.png)

The manager lists all the available files and directories in the store. When entering the media manager from an image field, editors can select or upload an image to _insert_ into the field. When entering from the global menu, editors can delete media files.
