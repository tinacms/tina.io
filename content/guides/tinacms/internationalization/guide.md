---
title: Internationalization with TinaCMS
last_edited: '2023-09-05T10:00:00.000Z'
---

## Internationalization with TinaCMS

Managing multilingual content is essential for global reach. TinaCMS provides versatile options to facilitate this. This guide focuses on two main strategies:

- Directory-Based Localization
- Directory-Based Localization

### Directory-Based Localization

With directory-based localization, your content should be structured in a directory-based manner, where the locale (e.g., en, fr) lives underneath the collection root (e.g., blog, docs). For example:

```text
.
├── /blog/
│   ├── /en/
│   │   └── hello-world.md
│   └── /fr/
│       └── hello-world.md
└── /docs/
    ├── /en/
    │   └── my-doc.md
    └── /fr/
        └── my-doc.md
```

#### Steps to Implement Directory-Based Localization

In your config.ts, you likely will have one collection that contains all your locales

```jsx
export const config = {
  collections: [
    {
      label: 'Blog',
      name: 'blog',
      path: 'content/blog',
      // ...other settings
    },
}
```

#### Routing and File Structure:

Whether your using Next.js, or another framework, your routing logic should be updated to pick the correct locale based on either the URL or user setting.

```jsx
// Example: Fetching the page list in NextJS
const getStaticPaths = async({ locales }) {

  // ...
})
```

Using the the locale, you can filter for document(s) based on the path

```jsx
/**
 * /pages/post/[filename].tsx
 */

// `locale` is provided alongside `params`
const getStaticProps = async({ params, locale }) {
  const tinaProps = await client.BlogPostQuery({
    // compose `relativePath` where `locale` is a sub-folder to the `post`
    relativePath: `${locale}/${params.filename}.mdx`,
  });

  return {
    props: {
      ...tinaProps
    }
  }
}
```

> For more info on setting up the routing for NextJS-specific implementations, see [our guide](/guides/tinacms/nextjs-internationalization/guide/)

#### Content Management

With this setup, editors will browse locales for each collection via the document list.

![Localized List](https://res.cloudinary.com/forestry-demo/image/upload/v1694005020/tina-io/docs/i18n/lang-folders.png)

If a user wants to create a new localized version of an existing document, they can click "duplicate document" from the document list, and prepend the desired locale in the new document's filename.

### Field-Based Localization

In this approach, each localizad field contains nested values for multiple languages. For example, a single Markdown file might look like this:

```json
{
  "title": {
    "en": "Hello",
    "fr": "Bonjour"
  }
}
```

#### Steps to Implement Field-Based Localization

You will need to modify your TinaCMS schema to include localized fields.

```js
export const pageSchema = {
  label: 'Page',
  name: 'page',
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          label: 'English',
        },
        {
          type: 'string',
          name: 'fr',
          label: 'French',
        },
      ],
    },
    // ...other fields
  ],
}
```

> Note: If you are using markdown/mdx content, and want to use the markdown body for your content, you might prefer using the directory-based approach to localization.

#### Display Localized Content:

In your site's components, you can then choose the correct localized field to display based on the current locale.

```jsx
const PageComponent = ({ data, locale }) => {
  const title = data.title[locale]
  // ...display content
}
```

#### Content Management:

TinaCMS will display all localized fields as children of the root-level field.

![Localized Fields](https://res.cloudinary.com/forestry-demo/image/upload/v1694006057/tina-io/docs/i18n/localized-fields.png)
