---
title: Nested Blocks
---

_Nested Blocks_ are blocks that render more blocks 🤯. This can be helpful if you're creating a _page builder_ experience. You may have layout level blocks, and then within a single layout block you will have more blocks for editors to add / manage.

One example could be a gallery block. The gallery may be a part of a top-level group of blocks that render other parts of the page, but this gallery block also renders a group of image blocks.

The ability to configure nested blocks is incredibly flexible. But it's also important to keep control of the user experience and limit complexity.

## Make a _FeatureList_ Block

The last block we are going to add is a Features List. The `FeatureList` block will render another set of `InlineBlocks` — _nested blocks_.

![gif of feature blocks?]()

**components/FeatureList.js**

```jsx
import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import '../styles/features.css'
import { Feature, feature_template } from './Feature'

/**
 * 1. Define the block component
 */
export function FeatureList({ index }) {
  return (
    <BlocksControls
      index={index}
      focusRing={{ offset: 0 }}
      insetControls={true}
    >
      <div className="wrapper">
        {/* The 'nested blocks'*/}
        <InlineBlocks
          name="features"
          blocks={FEATURE_BLOCKS}
          direction="horizontal"
          className="feature-list"
        />
      </div>
    </BlocksControls>
  )
}

/**
 * 2. Define the block template
 */
export const feature_list_template = {
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

/**
 *  3. Define the 'blocks', we will make the `Feature`
 *  component and template next
 */
const FEATURE_BLOCKS = {
  feature: {
    Component: Feature,
    template: feature_template,
  },
}
```

## Make a _Feature_ Block

Next, we'll create the Feature block component & template.

Both of these are already defined in the `FEATURE_BLOCKS` object, which is passed to `InlineBlocks` in `FeatureList`.

**components/Feature.js**

```jsx
import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import '../styles/features.css'

export function Feature({ index }) {
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

export const feature_template = {
  label: 'Feature',
  defaultItem: {
    _template: 'feature',
    heading: 'Marie Skłodowska Curie',
    supporting_copy:
      'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
  },
  fields: [],
}
```

## Update the source data

Now let's update the source file. Take care to not delete the previously defined block data. It's removed from this example for brevity. Copy and paste the `features` block object and **add it below the other blocks**.

**data/data.json**

```json
{
  "blocks": [
    /**
     * Additional Block Data...
     */
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

Finally, we'll add the `FeatureList` block to the Home page block options.

Head to `Home.js` and add this code:

```diff
// Other imports...
+ import { FeatureList, feature_list_template } from './components/FeatureList'

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
+   Component: FeatureList,
+   template: feature_list_template,
+ },
}

```

So our nested blocks are wired up! The `FeatureList` block renders another set of `Feature` blocks. To take this further, you could add another block option for `FeatureList`.

There's **no limit to the amount of nesting** you can do. That said, we recommend keeping it _less than three levels deep_ to minimize confusion.

Although it works, the layout styles for this block could be improved — let's do that next.
