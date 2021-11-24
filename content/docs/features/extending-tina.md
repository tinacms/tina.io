---
title: Extending Tina
id: '/docs/features/extending-tina'
next: '/docs/tina-cloud'
---

TinaCMS exposes some hooks that make it easy to extend. Most of these hooks exist on the `<TinaCMS>` container

## Using a custom field plugin

When we add a field to our Tina schema, this field will be editable through a field plugin in the sidebar. The type of field plugin will change depending on properties like `type`, `isBody`, `list`, `options`, etc.

For example:

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
          type: 'string', // The default field plugin will be a "textfield" field plugin
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string', // The default field plugin will be a "textfield" field plugin
          label: 'Description',
          name: 'desription',
        },
        // ...
      ],
    },
  ],
})
```

If you want to override the field plugin used for a field, you can use the `ui` property.

```ts
// ...
        {
          type: 'string',
          label: 'Description',
          name: 'desription',
          ui: {
            component: "textarea" // Use a textarea instead of a textfield
          }
        },
// ...
```

The component property can be any registered field. Below is a list of default fields.

### Default Field Plugins

- [text](/docs/reference/toolkit/fields/text/)
- [textarea](/docs/reference/toolkit/fields/textarea/)
- [number](/docs/reference/toolkit/fields/number/)
- [image](/docs/reference/toolkit/fields/image/)
- [color](/docs/reference/toolkit/fields/color/)
- [toggle](/docs/reference/toolkit/fields/toggle/)
- [radio-group](/docs/reference/toolkit/fields/radio-group/)
- [select](/docs/reference/toolkit/fields/select/)
- [tags](/docs/reference/toolkit/fields/tags/)
- [list](/docs/reference/toolkit/fields/list/)
- [group](/docs/reference/toolkit/fields/group/)
- [group-list](/docs/reference/toolkit/fields/group-list/)
- [blocks](/docs/reference/toolkit/fields/blocks/)
- [date](/docs/reference/toolkit/fields/date/)

Some fields must be imported and registered from [`react-tinacms-editor`](/packages/react-tinacms-editor/)

- [markdown](/docs/reference/toolkit/fields/markdown/)
- [html](/docs/reference/toolkit/fields/html/)

You can also extend any of these fields, or create your own from scratch. [Read more about creating/registering custom field plugins](https://tina.io/docs/advanced-features/custom-fields/).

## Customizing a form

With Tina, the form definition for a piece of content is generated automatically.

If you'd like to control the output of those forms, tap into the `formifyCallback` callback parameter on the root `<TinaCMS>` container.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      formifyCallback={({ formConfig, createForm, skip }) => {
        if (formConfig.id === 'getSiteNavsDocument') {
          const form = new Form(formConfig)
          // The site nav will be a global plugin
          cms.plugins.add(new GlobalFormPlugin(form))
          return form
        }

        return createForm(formConfig)
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

## Customizing the CMS instance

The root `<TinaCMS>` container has an optional `cmsCallback` parameter that can be added to customize the CMS instance.

```tsx
// pages/_app.js
import TinaCMS from 'tinacms'

const App = ({ Component, pageProps }) => {
  return (
    <TinaCMS
      // ...
      cmsCallback={cms => {
        cms.sidebar.position = 'overlay'
      }}
    >
      {livePageProps => <Component {...livePageProps} />}
    </TinaCMS>
  )
}

export default App
```

`cmsCallback` might be used to alter Tina's UI, dynamically hide the sidebar on certain pages, tap into the CMS event bus, etc.
