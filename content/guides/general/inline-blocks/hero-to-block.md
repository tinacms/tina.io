---
title: Converting Hero to a Block
---

## Make a Component

This simple inline editing configuration is a great start, but the end goal of this demo is to create a Home page built with [_Inline Blocks_](https://tinacms.org/docs/inline-editing/inline-blocks), so let's convert our `Hero` into a block.

[Inline Blocks](https://tinacms.org/docs/inline-editing/inline-blocks#creating-a-block) are made up of **a component** to render while editing and **a template** to configure defaults, add fields, and other required data. Let's make the _Hero Block Component_ first.

> If you're wanting to get a better feel for the 'Blocks' concept, there is a great blog that dives deeper into [_what blocks are_](/blog/what-are-blocks).

**components/hero.js**

```diff
import React from 'react';
import {
  InlineTextarea,
+  BlocksControls,
} from 'react-tinacms-inline';
import '../styles/hero.css';

-export function Hero() {
+ export function Hero({index}) {
  return (
+   <BlocksControls index={index}>
      <div className="hero">
        <div className="wrapper wrapper--narrow">
          <h1>
-           <InlineTextarea name="hero.headline" />
+           <InlineTextarea name="headline" />
          </h1>
          <p>
-           <InlineTextarea name="hero.subtext" />
+           <InlineTextarea name="subtext" />
          </p>
        </div>
      </div>
+   </BlocksControls>
  );
}
```

Here we're wrapping `Hero` in _Block Controls_ to provide a UI for reordering, deleting, and adding new blocks.

Notice the `index` being passed as props to `BlockControls` — this helps to keep track of the block order. We'll need to configure a parent `InlineBlocks` component for this to actually work, but _more on that in a moment._

You may have also seen that the `name` values were updated for our inline fields. The path for a block's source data references from the parent `InlineBlocks`. So the `name` value passed to the parent (`InlineBlocks`) will be the starting reference point for all children block paths. This should make more sense when we add `InlineBlocks`.

## Make a Template

Our Hero block still needs a template to be complete. This template allows us to create the `hero` block type and provide default values for newly created blocks. The `fields` array is empty for now, but this is where we can add additional metadata to edit in a [_Settings Modal_](/guides/general/inline-blocks/settings-modal).

Add this code below the `Hero` component definition:

**components/hero.js**

```jsx
export function Hero({ index }) {
  //...
}

export const hero_template = {
  label: 'Hero',
  defaultItem: {
    headline: 'Suspended in a Sunbeam',
    subtext:
      'Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions.',
  },
  fields: [],
}
```

## Add _InlineBlocks_

Now we need to add an `InlineBlocks` field. This field will accept the Hero block and handle the block order.

Head to `Home.js` and make these changes:

**Home.js**

```jsx
import React from 'react'
import { useForm } from 'tinacms'

// 1. Import `InlineBlocks`
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { Hero, hero_template } from './components/Hero'
import data from './data/data.json'

export default function Home() {
  // 2. Update initial values with 'blocks' data
  const formConfig = {
    id: './data/data.json',
    initialValues: {
      blocks: data.blocks,
    },
    onSubmit() {},
  }

  const [, form] = useForm(formConfig)

  return (
    <div className="home">
      <InlineForm form={form} initialStatus="active">
        {/* 3. Replace `Hero` with `InlineBlocks`*/}
        <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
      </InlineForm>
    </div>
  )
}

// 4. Define the blocks for `InlineBlocks`
const HOME_BLOCKS = {
  hero: {
    Component: Hero,
    template: hero_template,
  },
}
```

## Adjust Source Data

Notice how we swapped out the `initialValues` in the form config? We need to update our source data with the `blocks` data that the `initialValues` point to.

Replace the entire contents of `data/data.json` with this:

**data/data.json**

```json
{
  "blocks": [
    {
      "_template": "hero",
      "headline": "Suspended in a Sunbeam",
      "subtext": "Dispassionate extraterrestrial observer are creatures of the cosmos courage of our questions inconspicuous motes of rock and gas a mote of dust suspended in a sunbeam great turbulent clouds."
    }
  ]
}
```

Restart the dev server and click on the hero block. You should be able to add numerous hero blocks by hitting the 'plus' icon.

![hero block](/img/inline-editing-guide/step8-hero-block.png)

Even though we got this working, there's a few things to adjust. See how the controls bleed off the page? Let's fix that next.

> **Tip:** You can control the orientation of the 'Add Block' icons by setting `direction: 'column' | 'row'` as a prop on `InlineBlocks`

<!-- - Note margin collapse bug? -->
