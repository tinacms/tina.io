---
title: Creating Nested Blocks
---

### Step 8

The last block we are going to add is a Features List. This block will contain _nested blocks_, meaning the block will render another set of Inline Blocks.

**components/Features.js**

```jsx
import React from 'react'
import styled from 'styled-components'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import '../styles/features.css'

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <InlineBlocks name="features" blocks={} />
    </BlocksControls>
  )
}

export const features_list_template = {
  label: 'Feature List',
  defaultItem: {
    _template: 'features',
    features: [
      //.. Default feature blocks will go here
    ],
  },
  fields: [],
}
```

Now let's adjust our source file.

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
    },
    {
      "_template": "images",
      "left": {
        "src": "../assets/ivan-bandura-unsplash-square.jpg",
        "alt": "Some alt text"
      },
      "right": {
        "src": "../assets/martin-sanchez-unsplash-square.jpg",
        "alt": "Some alt text"
      }
    },
    {
      "_template": "paragraph",
      "text": "Take root and flourish quis nostrum exercitationem ullam corporis suscipit laboriosam culture Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur descended from astronomers encyclopaedia galactica? Nisi ut aliquid ex ea commodi consequatur something incredible is waiting to be known sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem "
    },
    {
      "_template": "features",
      "features": [
        //.. Feature blocks will go here
      ]
    }
  ]
}
```

Now let's create a feature block component & template and pass that to `FeaturesList`.

**components/Features.js**

```diff
import React from 'react';
import styled from 'styled-components';
import {
  BlocksControls,
  InlineBlocks,
+ InlineText,
+ InlineTextarea,
} from 'react-tinacms-inline';
import '../styles/features.css';

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <InlineBlocks
        name="features"
-       blocks={}
+       blocks={FEATURE_BLOCKS}
      />
    </BlocksControls>
  );
}

export const features_list_template = {
  label: 'Feature List',
  defaultItem: {
    _template: 'features',
    features: [
+     {
+       _template: 'feature',
+       heading: 'heading 1',
+       supporting_copy: 'supporting copy',
+     },
+     {
+       _template: 'feature',
+       heading: 'heading 2',
+       supporting_copy: 'supporting copy',
+     },
+     {
+       _template: 'feature',
+       heading: 'heading 3',
+       supporting_copy: 'supporting copy',
+     },
    ],
  },
  fields: [],
};

+function Feature({ index }) {
+ return (
+   <BlocksControls index={index} focusRing={{ offset: 0 }}>
+     <div className="feature">
+       <h3>
+         <InlineText name="heading" focusRing={false} />
+       </h3>
+       <p>
+         <InlineTextarea name="supporting_copy" focusRing={false} />
+       </p>
+     </div>
+   </BlocksControls>
+ );
+}

+const feature_template = {
+ label: 'Feature',
+ defaultItem: {
+   _template: 'feature',
+   heading: 'Marie Skłodowska Curie',
+   supporting_copy:
+     'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
+ },
+ fields: [],
+};

+const FEATURE_BLOCKS = {
+ feature: {
+   Component: Feature,
+   template: feature_template,
+ },
+};
```

Once again let's update the source file.

**data/data.json**

```json
{
  "blocks": [
    //...
    {
      "_template": "features",
      "features": [
        {
          "_template": "feature",
          "heading": "Drake Equation",
          "supporting_copy": "Light years gathered by gravity Rig Veda dispassionate extraterrestrial observer rich in mystery galaxies and shores of the cosmic ocean."
        },
        {
          "_template": "feature",
          "heading": "Jean-François Champollion",
          "supporting_copy": "Not a sunrise but a galaxyrise citizens of distant epochs the sky calls to us ship of the imagination made in the interiors of collapsing stars."
        },
        {
          "_template": "feature",
          "heading": "Sea of Tranquility",
          "supporting_copy": "Bits of moving fluff take root and flourish brain is the seed of intelligence consciousness finite but unbounded the only home we've ever known."
        }
      ]
    }
  ]
}
```

So our nested blocks are wired up! The `FeaturesList` block renders another set of `Feature` blocks. There's no limit to the amount of nesting you can do. Although, we recommend keeping it < 3 levels deep to minimize confusion in the UX.
