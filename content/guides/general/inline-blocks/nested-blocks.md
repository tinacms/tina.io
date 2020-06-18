---
title: Creating Nested Blocks
---

_Nested Blocks_ are blocks that render more blocks 🤯. This can be helpful if you're creating a _page builder_ experience. You may have layout level blocks, and then within a single layout block you will have more blocks for editors to add / manage.

One example could be a gallery block. The gallery may be a part of a top-level group of blocks that render other parts of the page, but this gallery block also renders a group of image blocks.

The ability to configure nested blocks is incredibly flexible. But it's also important to keep control of the user experience and limit complexity.

## Make a _FeaturesList_ Block

The last block we are going to add is a Features List. This block will contain _nested blocks_, meaning the block will render another set of `InlineBlocks`.

![gif of feature blocks?]()

**components/Features.js**

```jsx
import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import '../styles/features.css'

// 1. Define the component
export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="wrapper">
        {/** The 'nested blocks' */}
        <InlineBlocks name="features" blocks={} />
      </div>
    </BlocksControls>
  )
}

// 2. Define the template
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

Now let's adjust our source file:

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

## Make a _Feature_ Block

Next, we'll create a feature block component & template and pass that to the `InlineBlocks` in `FeaturesList`.

**components/Features.js**

```jsx
// 1. Import new `InlineTextarea` field
import React from 'react'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import '../styles/features.css'

export function FeaturesList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="wrapper">
        {/* 2. Pass FEATURE_BLOCKS to blocks, defined further down */}
        <InlineBlocks name="features" blocks={FEATURE_BLOCKS} />
      </div>
    </BlocksControls>
  )
}

// 3. Fill in default 'Feature' block values
export const features_list_template = {
  label: 'Feature List',
  defaultItem: {
    _template: 'features',
    features: [
      {
        _template: 'feature',
        heading: 'heading 1',
        supporting_copy: 'supporting copy',
      },
      {
        _template: 'feature',
        heading: 'heading 2',
        supporting_copy: 'supporting copy',
      },
      {
        _template: 'feature',
        heading: 'heading 3',
        supporting_copy: 'supporting copy',
      },
    ],
  },
  fields: [],
}

// 4. Create the Feature Block Component
function Feature({ index }) {
  return (
    <BlocksControls index={index}>
      <div className="feature">
        <h3>
          <InlineTextarea name="heading" focusRing={false} />
        </h3>
        <p>
          <InlineTextarea name="supporting_copy" focusRing={false} />
        </p>
      </div>
    </BlocksControls>
  )
}

// 5. Create the Feature Block Template
const feature_template = {
  label: 'Feature',
  defaultItem: {
    _template: 'feature',
    heading: 'Marie Skłodowska Curie',
    supporting_copy:
      'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
  },
  fields: [],
}

// 6. Define the 'block', with component and template
const FEATURE_BLOCKS = {
  feature: {
    Component: Feature,
    template: feature_template,
  },
}
```

Once again let's update the source file.

**data/data.json**

```json
{
  "blocks": [
    // Other blocks...
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

## Add _FeatureList_ to Home page blocks

Finally, we'll add the `FeaturesList` block to the Home page block options.

Head to `Home.js` and add this code:

```diff
// Other imports...
+ import { FeaturesList, features_list_template } from './components/Features'

export default function Home() {
  //...
}

const HOME_BLOCKS = {
  hero: {
    Component: Hero,
    template: hero_template,
  },
  images: {
    Component: Images,
    template: images_template,
  },
  paragraph: {
    Component: Paragraph,
    template: paragraph_template,
  },
+ features: {
+   Component: FeaturesList,
+   template: features_list_template,
+ },
}

```

So our nested blocks are wired up! The `FeaturesList` block renders another set of `Feature` blocks. To take this further, you could add another block option for `FeaturesList`.

There's **no limit to the amount of nesting** you can do. That said, we recommend keeping it _less than three levels deep_ to minimize confusion.

Although it works, the layout styles for this block could be improved — let's do that next.
