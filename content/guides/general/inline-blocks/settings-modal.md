---
title: Add fields to settings modal
---

## Step 10 — Configure meta fields for style

Our Hero block is coming along nicely, but it's pretty bare bones. Let's say we wanted to **control the background color** of the component. Or if we wanted to provide the option to 'align' the block contents. We would need to add a color or select field to edit these values.

With Inline Blocks, you can pass in an array of`Fields` that will render in a _Settings Modal_ to edit data like this. Let's add that to our block template.

**components/hero.js**

```diff
import React from 'react';
import {
  InlineTextarea,
  BlocksControls,
} from 'react-tinacms-inline';
import '../styles/Hero.css';

-export function Hero({index}){
+export function Hero({ index, data }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div
        className="hero"
+       style={{ backgroundColor: `${data.background_color}` }}
+       textAlign: `${data.align}`,
+       alignItems: `${data.align === 'left' ? 'start' : data.align}`,
      >
        <h1>
          <InlineTextarea name="headline" focusRing={false} />
        </h1>
        <p>
          <InlineTextarea name="subtext" focusRing={false} />
        </p>
      </div>
    </BlocksControls>
  );
}

export const hero_template = {
  label: 'Hero',
  defaultItem: {
    headline: 'Suspended in a Sunbeam',
    subtext:
      'Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions.',
+   background_color: 'aliceblue',
+   align: 'center',
  },
  fields: [
+   {
+     name: 'background_color',
+     label: 'Background Color',
+     component: 'color',
+     widget: 'block',
+     colors: ['aliceblue', 'antiquewhite', 'aqua', 'azure', 'darkslategray'],
+   },
+   {
+     name: 'align',
+     label: 'Alignment',
+     component: 'select',
+     options: ['center', 'left'],
+   },
  ],
};
```

And we can **update the data file** with some basic values for these fields.

**data/data.json**

```json
{
  "blocks": [
    {
      "_template": "hero",
      "headline": "Suspended in a Sunbeam",
      "subtext": "Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions inconspicuous motes of rock and gas a mote of dust suspended in a sunbeam great turbulent clouds.",
      "background_color": "aliceblue",
      "align": "center"
    }
  ]
}
```

In this example, we are setting the dynamic _styles inline_, but you could also use a _css-in-js_ library to manipulate styles with these custom values. Or you could toggle class names based on the values. There's lots of different ways to approach this type of custom styling — it depends on the needs of your project!

<!-- *Note:* the color field is pretty janky with the settings modal. We either need to fix it or use another example. -->
