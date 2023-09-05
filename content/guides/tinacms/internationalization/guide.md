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

Update your config.js to include multiple collections for each locale.

```jsx
export const config = {
  collections: [
    {
      label: 'English Blog',
      name: 'en_blog',
      path: './content/blog/en',
      // ...other settings
    },
    {
      label: 'French Blog',
      name: 'fr_blog',
      path: './content/blog/fr',
      // ...other settings
    },
  ],
}
```

#### Routing and File Structure:

Your Next.js \_app.js or routing logic should be updated to pick the correct locale based on either the URL or user setting.

```jsx
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale } = router
  // ...logic to load content based on locale
}
```

> For more info on setting up the routing for NextJS-specific implementations, see [our guide](/guides/tinacms/nextjs-internationalization/guide/)

#### Content Management

With this setup, the TinaCMS sidebar will show collections based on locale, making it easy to manage content for different languages.

### Field-Based Localization

In this approach, each content file contains fields for multiple languages. For example, a single Markdown file might look like this:

```md
---
title_en: 'Hello'
title_fr: 'Bonjour'
---

content_en: "Welcome to our site."
content_fr: "Bienvenue sur notre site."
```

#### Steps to Implement Field-Based Localization

You will need to modify your TinaCMS schema to include localized fields.

```js
export const pageSchema = {
  label: 'Page',
  name: 'page',
  fields: [
    {
      label: 'English Title',
      name: 'title_en',
      component: 'text',
    },
    {
      label: 'French Title',
      name: 'title_fr',
      component: 'text',
    },
    // ...other fields
  ],
}
```

#### Display Localized Content:

In your React components, you can then choose the correct localized field to display based on the current locale.

```jsx
const PageComponent = ({ data }) => {
  const router = useRouter()
  const { locale } = router
  const title = locale === 'en' ? data.title_en : data.title_fr
  // ...display content
}
```

#### Content Management:

TinaCMS will display all localized fields in the sidebar, allowing you to manage content for different languages within the same file.

Both these strategies can be combined or used individually based on your project's needs. For a full working example of TinaCMS with internationalization, you can check out our Multilingual Starter.
