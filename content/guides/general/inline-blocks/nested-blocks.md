---
title: Nested Blocks
---

_Nested Blocks_ are blocks that render more blocks 🤯. This can be helpful if you're creating a _page builder_ experience. You may have layout level blocks, and then within a single layout block you will have more blocks for editors to add / manage.

One example could be a gallery block. The gallery may be a part of a top-level group of blocks that render other parts of the page, but this gallery block also renders a group of image blocks.

The ability to configure nested blocks is incredibly flexible. But it's also important to keep control of the user experience and limit complexity.

## Make a _FeatureList_ Block

The last block we are going to add is a Features List. The `FeatureList` block will render another set of `InlineBlocks` — _nested blocks_.

Create a new file, `components/FeatureList.js`, add the following code:

**components/FeatureList.js**

```jsx,copy
import React from 'react'
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline'
import '../styles/features.css'

/**
 * 1. Define the Block Component
 */
function FeatureList({ index }) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div className="wrapper">
        <InlineBlocks name="features" blocks={FEATURE_BLOCKS} />
      </div>
    </BlocksControls>
  )
}

/**
 * 2. Define the FeatureList Block
 */
export const featureListBlock = {
  Component: FeatureList,
  template: {
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
  },
}

/**
 * 3. Define the block options
 * for FeatureList to render, we will add
 * a block to this next
 */
const FEATURE_BLOCKS = {}
```

## Make a _Feature_ Block

Next, we'll create the Feature block component & template. Create a new file, `components/Feature.js`, and add the following code:

**components/Feature.js**

```jsx,copy
import React from 'react'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import '../styles/features.css'

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

export const featureBlock = {
  Component: Feature,
  template: {
    label: 'Feature',
    defaultItem: {
      _template: 'feature',
      heading: 'Marie Skłodowska Curie',
      supporting_copy:
        'Rich in mystery muse about vastness is bearable only through love Ut enim ad minima veniam at the edge of forever are creatures of the cosmos. ',
    },
    fields: [],
  },
}
```

## Add the _Feature_ to _FeatureList_

Now that we make our `Feature` block, we need to add that to the `FEATURE_BLOCKS` options in `FeatureList`.

**components/FeatureList.js**

```diff
import React from 'react';
import { BlocksControls, InlineBlocks } from 'react-tinacms-inline';
import '../styles/features.css';
+import { featureBlock } from './Feature';

function FeatureList({ index }) {
  //...
}

export const featureListBlock = {
  //...
}

-const FEATURE_BLOCKS = {}
+const FEATURE_BLOCKS = {
+  feature: featureBlock,
+}
```

## Add _FeatureList_ to Home page blocks

Finally, we'll add the `FeatureList` block to the Home page block options.

Head to `Home.js` and add this code:

**Home.js**

```diff
// Other imports...
+ import { featureListBlock } from './components/FeatureList'

export default function Home() {
  //...
}

const HOME_BLOCKS = {
  hero: heroBlock
  images: imagesBlock,
  paragraph: paragraphBlock,
+ features: featureListBlock,
}

```

So our nested blocks are wired up! The `FeatureList` block renders another set of `Feature` blocks. To take this further, you could add another block option for `FeatureList`.

There's **no limit to the amount of nesting** you can do. That said, we recommend keeping it _less than three levels deep_ to minimize confusion.

Although it works, the layout styles for this block could be improved — let's do that next.
