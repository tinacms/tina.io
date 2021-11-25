---
title: Markdown
id: '/docs/editing/markdown'
next: '/docs/editing/mdx'
---

Editing a markdown file (with front matter and a body) is the simplest use-case of editing with Tina

## Defining our schema

Let's say your content looks something like:

```md
---
title: 'My first post'
date: '2021-01-01T00:00:00.000Z'
// ...
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies urna ut ex varius, sed fringilla nibh posuere. Vestibulum a pulvinar eros, vel varius orci. Sed convallis purus sed tellus pellentesque ornare quis non velit. Quisque eget nibh nec nisl volutpat aliquet. Donec pharetra turpis vitae diam aliquam rutrum. Sed porta elit ut mi vehicula suscipit. Ut in pulvinar nunc.
```

You would model this collection as:

```ts
// .tina/schema.ts
import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [
    {
      // ...
      fields: [
        {
          type: 'string'
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
  ],
})
```

Notice that the first field (`title`) maps to a frontmatter field. We can add any other metadata fields that we want here.

Our `body` field has the `isBody` property set, which will use the [markdown](http://localhost:3000/docs/reference/toolkit/fields/markdown/) field plugin.

## Registering the field plugins

The majority of our built-in field plugins work out of the box, but some of the larger field plugins (like the "markdown" editor) need to be manually imported and registered.

First, install the markdown editor package with:

```copy
yarn add react-tinacms-editor
```

or

```copy
npm install react-tinacms-editor
```

Inside the `pages/_app.js` file we need to import the `MarkdownFieldPlugin` and add it to the CMS callback:

```diff
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import '../styles/index.css'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })
const App = ({ Component, pageProps }) => {
  return (
    <>
      <TinaEditProvider
        editMode={
          <TinaCMS
            { /* ... */ }
+            cmsCallback={cms => {
+                import('react-tinacms-editor').then((field)=>{
+                  cms.plugins.add(field.MarkdownFieldPlugin)
+                  })
+            }}
          >
            { /* ... */ }
          </TinaCMS>
        }
      >
        <Component {...pageProps} />
      </TinaEditProvider>
    </>
  )
}

export default App
```

Now, editors should be able to start editing markdown content!

![markdown-editing](/gif/markdown.gif)
