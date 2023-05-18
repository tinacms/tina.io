---
title: Collections
id: collections
last_edited: '2023-03-01T15:51:56.737Z'
next: /docs/reference/fields
prev: /docs/reference/schema
---

Collections represent a type of content (EX, blog post, page, author, etc). We recommend using singular naming in a collection (Ex: use post and not posts).

## Overview

| Property                          | Description                                                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`name`](#name)                   | The name of the collection                                                                                                                                                                                                           |
| [`path`](#path)                   | The path (relative to where the CLI is running) to a folder where the content is stored.                                                                                                                                             |
| [`format`](#format)               | The extension of all the documents in this collection (Default is "md"). Must be one of `"md"`, `"markdown"`, `"mdx"`,`"json"`, `"toml"`, or `"yaml"`.                                                                               |
| [`match.include`](#match.include) | A [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) (without the file extension) that will be used to match a subset of the files in the `path` folder.                                                             |
| [`match.exclude`](#match.exclude) | A [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) (without the file extension) that will be used to exclude a subset of the files in the `path` folder.                                                           |
| `label`                           | A human friendly label that will be displayed to the user                                                                                                                                                                            |
| `fields`                          | An array of [fields](/docs/reference/fields/)                                                                                                                                                                                        |
| `templates`                       | An array of [templates](/docs/reference/templates/)                                                                                                                                                                                  |
| [`defaultItem`](#defaultitem)     | An object or a function that returns an object. The object that is returned will be the data used as the default data when a new document is created.                                                                                |
| `frontmatterFormat`               | The format used to parse the frontmatter. This can be `"yaml"` ,`"toml"`, or `"json"`. It defaults to `"yaml"`                                                                                                                       |
| `frontmatterDelimiters`           | The Delimiters used for the frontmatter for a document. This is what Has type `string \| [string, string]` . The default is `---`. Read more about delimiters [here](https://github.com/jonschlinkert/gray-matter#optionsdelimiters) |
| `ui.filename`                     | See [Filename customization](/docs/extending-tina/filename-customization/)                                                                                                                                                           |
| `ui.global`                       | A boolean that if true will make this collection Global. (_optional_)                                                                                                                                                                |
| `ui.router`                       | A function that takes in a document and returns the route for it. If nothing is returned the basic editor will be used. Read more about visual editing [here](/docs/contextual-editing/router/#the-router-property)(_optional_)      |
| `ui.allowedActions.create`        | If this is false, the create button will not appear in the collection list page. See [example](#example-with-allowed-actions). (_optional_)                                                                                          |
| `ui.allowedActions.delete`        | If this is false, the create delete button will not appear in the collection list page. See [example](#example-with-allowed-actions). (_optional_)                                                                                   |

> Note: Must provide only one of `fields` or `templates` but never both

## Name

The name of the collection that is used in the GraphQL schema. A name can only be used once and an error will occur if two or more collections have the same name. This name cannot have spaces, dashes, or special characters. It must be a valid GraphQL name. We recommend using singular naming in a collection (Ex: use post and not posts).

## Path

The path to a folder where the content is stored. By default, the path is relative to where the CLI is running but this can be changed by using the [`--rootPath`](/docs/cli-overview) CLI flag. Paths do not have to be unique across collections as long as a different [`format`](#format) or [`match`](#match) is specified. The CLI will print a warning if there are overlapping documents.

## Format

The file extension of all the documents in this collection. (Default extension is "md"). Must be one of `"md"`, `"markdown"`, `"mdx"`,`"json"`, `"toml"`, or `"yaml"`.

The format is used to determine the parser that will be used to parse the document. The format is also used to determine the extension of the file when a new document is created. We do not support more then one format per collection but you can work around this by doing the following:

```ts

// Fields for all posts
const fields = [
  // an array of fields
]
export const defineConfig({
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        fields,
      },
      {
        name: 'posts-json',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'json',
        fields,
      },
    ],
  },
})
```

## match.include

A [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) that will be used to match a subset of the files in the `path` directory.

The provided pattern does not have to include the file extension. The extension will be added automatically based on the [`format`](#format) of the collection. The final pattern that is used will be determined by `match`, `format` and `path`.

`<path>/<match.include>.<format>`

For example, if you have a collection with the following:

```ts
{
  path: 'content/posts',
  match: {
    include: '*',
  },
  format: 'md'
}
```

The final pattern used would be
`content/posts/*.md`

### Basic Syntax

- `?` matches a single character
- `*` matches any number of any characters (except `/`).
- `[abc]` matches any one character in the given set
- `[a-z]` matches a range.
- `{foo,bar}` matches any whole word in the given set

### Some common glob patterns

#### Don't match subdirectories `*`

Example:

```ts
{
  path: 'content/posts',
  match: {
    include: '*',
  },
  format: 'md'
}
```

Matches all files in `content/posts` folder but does not match subdirectories. It would match `content/posts/hello-world.md` but not `content/posts/subfolder/foo.md`

#### Match on a single file

Example:

```ts
{
  path: 'content/config',
  match: {
    include: 'index',
  },
  format: 'json'
}
```

This matches a single file `content/config/index.json`. It will not match on anything else.

#### Match on a set of files

Example:

```ts
{
  path: 'content/config',
  match: {
    include: '{foo,bar}',
  },
  format: 'json'
}
```

This matches on `content/config/foo.json` and `content/config/bar.json`. It will not match on anything else.

#### Match on a set of files with a prefix

Example:

```ts
{
  path: 'content/config',
  match: {
    include:'foo-{bar,baz}',
  },
  format: 'json'
}
```

This will match on `content/config/foo-bar.json` and `content/config/foo-baz.json`. It will not match on anything else.

## match.exclude

This works the same as `match.include` but will exclude any files that match the pattern. This is useful for excluding files that you don't want to be editable or that are a part of a different collection.

The resulting pattern is the same except that it is prefixed with `!`

`!(<path>/<match.exclude>.<format>)`

### Example with match.exclude

```ts
{
  path: 'content/posts',
  match: {
    exclude: '**/index',
  },
  format: 'md'
}
```

This will exclude all `index.md` files from your collection.

## defaultItem

The default item that will be used when a new document is created. This is useful for setting default values for fields. The default item can be a function that takes in the `collection` and returns the default item. This is useful for setting default values that are based on the collection.

> Note: This will not updated existing documents. It will only be used when a new document is created.

### Default Item Example

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        defaultItem: () => {
          return {
            title: 'New Post',
            date: new Date().toISOString(),
          }
        },
        fields: [
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'date',
            type: 'datetime',
          },
        ],
      },
    ],
  },
})
```

Now when a new document is created the name and date fields will have default values.

## Examples

### Basic Example

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        fields: [
          // An array of fields
        ],
      },
    ],
  },
})
```

### Example with router and global

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        ui: {
          router: ({ document }) => {
            // navigate to the post that was clicked
            return `/post/${document._sys.filename}`
          },
        },
        fields: [
          // An array of fields
        ],
      },
      {
        label: 'Global',
        name: 'global',
        path: 'content/global',
        ui: {
          global: true,
        },
        format: 'json',
        fields: [
          // An array of fields
        ],
      },
    ],
  },
})
```

### Example with default item

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        name: 'posts',
        label: 'Blog Posts',
        path: 'content/posts',
        format: 'mdx',
        defaultItem: () => {
          return {
            // Return a default title and the current date as the default date
            title: 'new post',
            date: new Date().toISOString(),
          }
        },
        fields: [
          {
            label: 'Title',
            name: 'title',
            type: 'string',
          },
          {
            label: 'Date',
            name: 'date',
            type: 'date',
          },
        ],
      },
    ],
  },
})
```

For more information [check out the content modeling docs](/docs/schema/)

### Example with allowed actions

```ts
export default defineConfig({
  //...
  schema: {
    collections: [
      {
        label: 'Navigation',
        name: 'navigation',
        path: 'content/navigation',
        ui: {
          // Don't allow editors to create new navigation items
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        format: 'json',
        fields: [
          // An array of fields
        ],
      },
    ],
  },
})
```
