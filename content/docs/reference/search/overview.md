---
title: Search Overview
last_edited: '2023-06-08T04:00:00.000Z'
prev: /docs/reference/media/external/s3
next: /docs/graphql/overview
---

TinaCMS provides built-in search functionality for content. This is useful for allowing editors to quickly finding content in a site. Tina Cloud's content search is powered by [Fergus McDowall](https://github.com/fergiemcdowall "Fergus McDowall")'s [search-index](https://www.npmjs.com/package/search-index "search-index") library.

> Note: Search is not currently supported in self-hosted Tina.

## Configuration

To enable search functionality, you will need to populate the `search` field in your Tina configuration. The only required element of the search configuration when using Tina Cloud search is the `search.tina.indexerToken` field. This can be obtained from the Tina Cloud [dashboard](/docs/tina-cloud/dashboard/projects/#api-tokens) for the project.

```javascript
export default defineConfig({
  //...
  schema: {
    collections: [
      // Array of collections
    ],
  },
  search: {
    tina: {
      indexerToken: '<Your Search Token>',
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  //.. Other config
})
```

### Definition

| Property                           | Description                                                                                                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search.tina.indexerToken`         | Tina Cloud search token (*required*)                                                                                                                                                                        |
| `search.tina.stopwordLanguages`    | Optional array of string stopword languages. Defaults to `['eng']`. See the [stopword](https://github.com/fergiemcdowall/stopword#language-code) GitHub repository for a full list of supported languages.  |
| `search.indexBatchSize`            | Used by the indexing process to determine the number of documents to index per request. Defaults to `100`.                                                                                                  |
| `search.maxSearchIndexFieldLength` | For variable length text fields, this controls how much of the text is considered when indexing. A higher value will increase the indexing time and size of the search index. Defaults to `100` characters. |

## Building the search index

### Development

When search is configured and a site is running locally with the `dev` command, content will be automatically indexed at startup. Any changes to local content will also trigger updates to the (local) search index.

### Production

When search is configured and a site is being built for production using the `build` command, the search index will be automatically created and uploaded to Tina Cloud. Each Git branch for your site has a separate search index.

Note that the search index is "live" once the site is built, so any newly added or removed content may be reflected in the search index before the site has been deployed. Building the search index can be skipped by passing the `--skip-search-index` cli option to the `build` command. Then the [search-index](/docs/cli-overview/#tinacms-search-index) command can be run separately once the site deployment completes.

## Customizing search indexing

### Excluding fields

By default, all collection field types (except `image`) are including in the search index. You can improve discoverability of content by controlling which fields are included in the search index. This is done by setting the optional `searchable` property on fields in the collection schema. For example, to disable indexing for an author field, use something like:\\

```javascript
// ...
fields: [
  // ...
  {
    label: 'Author',
    name: 'author',
    type: 'reference',
    collections: ['author'],
    searchable: false, // Disable indexing of the author field
  },
]
//
```

### Limiting text fields

By default, only the first 100 characters of a text field are used when building the search index. This can be adjusted globally in the `search` configuration (see above), but can also be done on a per field basis like so:

```javascript
// ...
fields: [
  // ...
  {
    label: 'Post Body',
    name: 'body',
    type: 'string',
    maxSearchIndexFieldLength: 50, // Only index the first 50 characters of this field
  },
]
//
```

## Alternative Search Providers

Currently only Tina Cloud's search API is supported but we plan to provide alternative providers in the near future, as well as documentation for implementing custom search providers. If you'd like support for a specific search provider, [let us know](https://github.com/tinacms/tinacms/discussions).
