---
title: Content Modeling with TinaCMS
---

The Tina schema is a way of defining the shape of your content for your entire site. With traditional content management systems you may have done this sort of content modeling via GUI, however, given its tight coupling to Git, TinaCMS considers the filesystem the ultimate source of truth and leverages a "content-modeling as code" approach.

To that end, your schema is defined in a file called `.tina/schema.ts` (only `.ts` is supported for now).

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'reference',
          label: 'Author',
          name: 'author',
          collection: 'author',
        },
      ],
    },
    {
      label: 'Authors',
      name: 'author',
      path: 'content/authors',
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
        },
        {
          type: 'string',
          label: 'Avatar',
          name: 'avatar',
        },
      ],
    },
  ],
})
```

# `collections`

The top-level key in the schema is an array of _collections_, a `collection` informs the API about _where_ to save content. You can see from the example that a `posts` document would be stored in `content/posts`. You can supply either `fields` or `templates` to define shape of your collection. If all your collection documents share the same fields, just use `fields`, but if you need to use different templates inside a collection (e.g about page, pricing page, jobs page inside a pagescollections) then use templates.

```ts
{
  label: 'Blog Posts',
  name: 'post',          // The unique identifier for your collection
  path: 'content/posts', // Where your collection documents will be stored
  format: "json" .       // Documents are stored as markdown by default
  // You can define either an array of `fields` OR `templates`
  fields: [...]
  // OR
  templates: [...]
}
```

# `fields`

Fields determine the shape of your content:

```js
{
  label: "Title",
  name: "title",
  type: "string"
}
```

There are a few key ingredients to building out any shape you could want:

## The `type` property

Types fall into two general categories: _scalar_ types and _nonscalar_ types. A _scalar_ type refers to a single value, for example: `"Hello, World"`, `true`, `3` are all scalar values.

### _scalar_

- `string`
- `datetime`
- `boolean`
- `image`
- `number`

### _nonscalar_

- `reference`
- `object`

Once you're familiar with _scalar_ types and how to define them, read more about _nonscalar_ types in the ["Nonscalar Types"](#nonscalar-types) section below.

The `authors` collection above is simple because it only has _scalar_ fields, a document in the authors collection might look like this:

```md
---
name: Napolean
avatar: https://path.to/my-avatar.jpg
---
```

## The `list` property

Specifying `list: true` on _any_ field type will turn that field into an array of items:

```js
{
  label: "Categories",
  name: "categories",
  type: "string",
  list: true
}
```

The resulting field in your TinaCMS form will be a `list` field. And the resulting data structure would be: `["movies", "art"]`.

## The `options` property

Any _scalar_ field can accept an `options` array, note that in the example below we're using both `options` and `list` properties:

```js
{
  label: "Categories",
  name: "categories",
  type: "string",
  options: ["movies", "art", "food", "sports"],
  list: true
}
```

In this example, the resulting field in your TinaCMS form will be a `checkbox` field. Omitting `list: true` (or setting it to `false`) would result in a `radio` field.

## The `isBody` property

For `markdown` collections, all data is stored as frontmatter by default. But for fields whose type is `string` and `list: false`, you can also specify `isBody: true`. This would store the specified field in the body of the markdown file. Note that you can only set this property on one field in your `fields` array.

## The `ui` property

Under the hood, TinaCMS is powered by the TinaCMS Toolkit, an expressive UI system which allows you to place forms and other content management controls into your Next.js application or website. To that end, most of what we've discussed so far has been about how data is structured and served. But when you use TinaCMS, all of this data can be edited from the context of your website with minimal frontend setup. And it's often desirable to tap into the UI for better control of how it behaves. Let's see how we might use the `ui` property to enhance the editing experience.

For a `string` type you'll get the [`text` field](/docs/fields/text/) by default. If you'd rather use a `textarea` field you can specify it in the `ui` property:

```js
{
  label: "Description",
  name: "description",
  type: "string",
  ui: {
    component: "textarea"
  }
}
```

The `component` property can be any [registered field](http://localhost:3000/docs/advanced-features/custom-fields/#2-register-a-field-plugin). Below is a list of default fields. 
### Default Fields
* [text](docs/fields/text/)
* [textarea](/docs/fields/textarea/)
* [number](docs/fields/number/)
* [image](/docs/fields/image/)
* [color](/docs/fields/color/)
* [toggle](/docs/fields/toggle/)
* [radio-group](/docs/fields/radio-group/)
* [select](/docs/fields/select/)
* [tags](/docs/fields/tags/)
* [list](/docs/fields/list/)
* [group](/docs/fields/group/)
* [group-list](/docs/fields/group-list/)
* [blocks](/docs/fields/blocks/)
* [date](/docs/fields/date/)

Some fields must be imported and registered from [`react-tinacms-editor`](/packages/react-tinacms-editor/)

* [markdown](/docs/fields/markdown/)
* [html](/docs/fields/html/)


To extend these fields with validation logic or to provide a custom fields component a [field plugin can be registered](/docs/advanced-features/custom-fields/).


## Nonscalar Types

If _scalar_ types are the building blocks for a schema, _nonscalar_ types allow you to represent almost any data structure you could want for you content.

### The `object` property

An object type takes either a `fields` or `templates` property (just like the `collections` definition). The simplest kind of `object` is one with `fields`:

```js
{
  label: "Social Media",
  name: "socialMedia",
  type: "object",
  fields: [{
    label: "Handle",
    name: "handle",
    type: "string"
  }, {
    label: "Service",
    name: "service",
    type: "string",
    options: ["twitter", "instagram", "tiktok"]
  }]
}
```

The resulting data structure would be:

```js
{
  socialMedia: {
    handle: "tinacms",
    service: "twitter"
  }
}
```

Setting `list: true` would turn the values into an array:

```js
{
  socialMedia: [
    {
      handle: 'tinacms',
      service: 'twitter',
    },
    {
      handle: 'tinacms',
      service: 'instagram',
    },
  ]
}
```

More complex shapes can be built by supplying a `templates` array, here's an example of a page-builder structure:

```js
{
  type: "object",
  label: "Page Sections",
  name: "pageSections",
  list: true,
  templates: [{
    label: "Hero",
    name: "hero",
    fields: [{
      label: "Title",
      name: "title",
      type: "string"
    },{
      label: "Background Image",
      name: "backgroundImage",
      type: "image"
    }]
  }]
}
```

And its data structure (note that `_template` is required):

```js
{
  pageSections: [
    {
      title: 'Hello, World!',
      backgroundImage: 'https://path.to/my-img.jpg',
      _template: 'hero',
    },
  ]
}
```

### The `reference` type

A `reference` field connects one document to another, and only needs to be defined on _one_ side of the relationship. You can specify any number of collections you'd like to connect:

```js
{
  label: "Author",
  name: "author",
  type: "reference",
  collections: ["author"] // points to a collection with the name "author"
}
```

This will result in a resolvable node in your GraphQL structure:

```graphql
{
  getPostDocument(relativePath: $relativePath) {
    data {
      author {
        # disambiguate because could have _many_ collections
        ... on AuthorDocument {
          name
        }
      }
    }
  }
}
```

The resulting field in your TinaCMS form will be a `select` field, whose `options` are all of the documents in the given collections.

> Note: _reverse_ relationships are not yet supported. For example, you'd likely want to view all of a given `author`'s `posts`. This is on our roadmap but not yet supported.
