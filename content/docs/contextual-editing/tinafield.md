---
title: 'The tinafield helper'
id: '/docs/contextual-editing/tinafield'
---

## Introduction

Tina's "click to edit" feature allows editors to select the element they want to edit on the page in order to see it in the sidebar.

<video
className="video"
autoPlay="true"
loop
muted
playsInline><source
src="https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/v1684344056/tina-io/docs/quick-edit-demo.mp4"
type="video/webm"
/><source
src="https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/v1684344056/tina-io/docs/quick-edit-demo.mp4"
type="video/mp4"
/>
</video>

> [Try the demo](https://quick-edit-demo.vercel.app/admin#/~)!

In order for this to work, Tina needs to know what document and field the
element is associated with. Tina makes this easy with the `tinaField` helper
function. Using this function, developers can add the appropriate metadata
to the `[data-tina-field]` attribute.

```jsx
import { useTina, tinaField } from 'tinacms/dist/react'

const Page = (props) => {
  const { data } = useTina(props)
  return (
    <div>
      <h1 data-tina-field={tinaField(data, 'title')}>{data.title}</h1>
    </div>
  )
}
```

Now, when you open the Tina sidebar you'll see editing overlays on any element
that's been configured.

> "Click to edit" will work for any field in your query, this means you can also click on fields from references as well.

The `tinaField` function used above is a _type-safe_ helper designed to pluck the metadata out of the data object for the given
property to be used on the `[data-tina-field]` attribute:

```js
// Get metadata for the 'object' field
tinaField(data)
// Get metadata for the `data.title` field
tinaField(data, 'title')
```

## How does the `tinaField` helper work?

When not in edit-mode, the `data` returned by the `useTina` hook might look like this:

```js
{
  page: {
    title: 'Hello, world',
    blocks: [{
      __typename: 'PageBlocksHero',
      heading: 'Hi, again!',
      description: 'Some description'
      links: [{
        label: "About Us",
        url: '/about=us'
      }]
    }]
  }
}
```

Once edit-mode is enabled, Tina will update each nested object with `_tina_metadata`:

```js
{
  page: {
    title: 'Hello, world',
    blocks: [{
      __typename: 'PageBlocksHero',
      heading: 'Hi, again!',
      description: 'Some description'
      links: [{
        label: "About Us",
        url: '/about=us',
        _tina_metadata: {
          formId: "content/pages/hello-world.md",
          fields: {
            // tinaField(link, 'label') -> `023nsk-page.blocks.0.links.0.label`
            label: "page.blocks.0.links.0.label",
            url: "page.blocks.0.links.0.link",
          }
        }
      }],
      _tina_metadata: {...}
    }],
    _tina_metadata: {...}
  }
}
```

The `tinaField` helper simply plucks out the appropriate information from the `_tina_metadata` object.

## API Reference

| Argument   | Description                                                                                                | Type   | Required |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------ | -------- |
| `object`   | The object which holds the field you're accessing                                                          | Object | Yes      |
| `property` | The property from the object which you're accessing, omitting this will return the object field's metadata | String | No       |

```jsx
// components/blocks/hero
import { tinaField } from 'tinacms/dist/react'

export const HeroComponent = (props) => {
  return (
    <div>
      <h4 data-tina-field={tinaField(props, 'heading')}>{props.heading}</h4>
      <p data-tina-field={tinaField(props, 'message')}>{props.message}</p>
      <ul data-tina-field={tinaField(props, 'links')}>
        {props.links.map((link) => (
          <li>
            <a data-tina-field={tinaField(link)} href={link.url}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

Notice that the `<a>` tag's data attribute only needs access to the `link` data object.

## Styling the visual editing interface

When Tina finds an element with the `[data-tina-field]` attribute, it will attach some CSS to it when in edit mode, clicking on the element triggers
the Tina form to open and focus the matching field.

Since Tina uses CSS to achieve the interface, it's possible for styles to collide. Overriding and customizing Tina's
styles are encouraged. Here's an example of overriding the outline color to red:

```css
.__tina-quick-editing-enabled [data-tina-field] {
  outline: 2px dashed rgba(254, 34, 56, 0.5);
}
.__tina-quick-editing-enabled [data-tina-field]:hover {
  outline: 2px dashed rgba(254, 34, 56, 1);
}
```
