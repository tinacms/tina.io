---
title: Add fields to settings modal
---

## Configure meta fields for style

Our Hero block is coming along nicely, but it's pretty bare bones. Let's say we wanted to **control the background color** of the component. Or if we wanted to provide the option to 'align' the block contents. We would need to use a color or select field to edit these values.

This type of metadata is difficult to edit directly inline. To provide a way to edit this data in a more _traditional_ form, you can pass in an array of `Fields` in the block template that will render in a _Settings Modal_.

Head to `components/Hero.js` and make these changes:

**components/Hero.js**

```jsx
import React from 'react'
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'
import '../styles/hero.css'

// 1. Define `data` to use in the styles
export function Hero({ data, index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: { x: -5, y: -20 }, borderRadius: 8 }}
      insetControls={true}
    >
      {/** 2. Add dynamic inline styles */}
      <div
        className="hero"
        style={{
          color: `${data.text_color || '#000'}`,
          backgroundColor: `${data.background_color || 'aliceblue'}`,
          textAlign: `${data.align}`,
          justifyContent: `${data.align === 'left' ? 'start' : data.align}`,
        }}
      >
        <div className="wrapper wrapper--narrow">
          <h1>
            <InlineTextarea name="headline" focusRing={false} />
          </h1>
          <p>
            <InlineTextarea name="subtext" focusRing={false} />
          </p>
        </div>
      </div>
    </BlocksControls>
  )
}

// 3. Update defaults and add fields
export const hero_template = {
  label: 'Hero',
  defaultItem: {
    headline: 'Suspended in a Sunbeam',
    subtext: 'Dispassionate extraterrestrial observer',
    background_color: 'rgb(5, 30, 38)',
    text_color: '#fffaf4',
    align: 'center',
  },
  fields: [
    {
      name: 'background_color',
      label: 'Background Color',
      component: 'color',
      widget: 'block',
      colors: [
        'rgb(5, 30, 38)',
        'aliceblue',
        'antiquewhite',
        'aqua',
        'azure',
        'darkslategray',
      ],
    },
    {
      name: 'text_color',
      label: 'Text Color',
      component: 'select',
      options: ['white', 'black'],
    },
    {
      name: 'align',
      label: 'Alignment',
      component: 'select',
      options: ['center', 'left'],
    },
  ],
}
```

In this example, we are setting the dynamic _styles inline_, but you could also use a _css-in-js_ library to manipulate styles with these custom values. Or you could toggle class names based on the values. There's lots of different ways to approach this type of custom styling — it depends on the needs of your project!

## Update the source data

Now we can **update the data file** with some basic values for these fields. Copy this into `data/data.json`:

**data/data.json**

```json
{
  "blocks": [
    {
      "_template": "hero",
      "background_color": "rgb(5, 30, 38)",
      "text_color": "#fffaf4",
      "headline": "Suspended in a Sunbeam",
      "subtext": "Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions inconspicuous motes of rock and gas a mote of dust suspended in a sunbeam great turbulent clouds.",
      "align": "center"
    }
  ]
}
```

If you restart the dev server, you should see a new 'pencil' icon in the _Blocks Controls_. If you click on that it will open the _Settings Modal_ where the fields we defined will render.

![inline-settings](/img/inline-editing-guide/settings-modal.png)

You can add any [Tina fields](https://tinacms.org/docs/fields) to the _Settings Modal_, just like you can in a regular sidebar form. This additional interface should allow you to cover your bases to edit page and block metadata.

<!-- *Note:* the color field is pretty janky with the settings modal. We either need to fix it or use another example. -->

[👋 Checkout Step 5]()
