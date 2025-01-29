---
title: 'File is Multiple Collections Error'
---

This error occurs when a file is in multiple collections. This is usually caused by overlapping paths in in your collections or an error in a [match property](/docs/reference/collections#matchinclude).

The common fix for this is updating or adding the [match property](/docs/reference/collections#matchinclude) to exclude or include certain files.

## Example with exclude

```ts
// tina/schema.ts
export default defineConfig({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      // ..
    },
    {
      label: 'Featured Posts',
      name: 'featuredPosts',
      path: 'content/posts/featured',
      // ...
    },
    //..
  ],
  // ...
})
```

The example configuration above would cause an overlap because the Blog Post collection will contain all of the files in the Featured Posts collection. This can be fixed by updating the [`match.exclude` property](/docs/reference/collections#matchexclude) on the Blog Posts collection to exclude all of the files in the Features Posts collection.

```ts
// tina/schema.ts
export default defineConfig({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      match: {
        exclude: 'featured/**/**',
      },
      // ..
    },
    {
      label: 'Featured Posts',
      name: 'featuredPosts',
      path: 'content/posts/featured',
      // ...
    },
    //..
  ],
  // ...
})
```

## Example with include

An example of include could be if you only wanted to include files with a certain name. For example if you wanted to include all of the files in the `content/posts` directory that had the name `index`.

```ts
// tina/schema.ts
export default defineConfig({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      match: {
        include: '**/**/index',
      },
      // ..
    },
    //..
  ],
  // ...
})
```
